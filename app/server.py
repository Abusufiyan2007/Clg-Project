#!/usr/bin/env python3
"""
SHIFA CLINIC: Outpatient Department High-Performance Backend Server
Serves clinical static assets and handles OPD Token Confirmation Email dispatch,
SMTP relay integration, outbox logging, and live queue telemetry.
"""

import os
import sys
import json
import smtplib
import ssl
from datetime import datetime
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 3456
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
os.makedirs(DATA_DIR, exist_ok=True)

EMAILS_FILE = os.path.join(DATA_DIR, "emails_log.json")
SMTP_CONFIG_FILE = os.path.join(DATA_DIR, "smtp_config.json")

# Initialize persistent logs if missing
if not os.path.exists(EMAILS_FILE):
    with open(EMAILS_FILE, "w", encoding="utf-8") as f:
        json.dump([], f, indent=2)

if not os.path.exists(SMTP_CONFIG_FILE):
    default_config = {
        "enabled": False,
        "host": "smtp.gmail.com",
        "port": 587,
        "user": "",
        "password": "",
        "fromEmail": "noreply@shifaclinic.com",
        "fromName": "SHIFA CLINIC Pernambut"
    }
    with open(SMTP_CONFIG_FILE, "w", encoding="utf-8") as f:
        json.dump(default_config, f, indent=2)


def get_smtp_config():
    try:
        with open(SMTP_CONFIG_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {"enabled": False}


def save_smtp_config(cfg):
    with open(SMTP_CONFIG_FILE, "w", encoding="utf-8") as f:
        json.dump(cfg, f, indent=2)


def log_email_record(record):
    try:
        emails = []
        if os.path.exists(EMAILS_FILE):
            with open(EMAILS_FILE, "r", encoding="utf-8") as f:
                emails = json.load(f)
        emails.insert(0, record)
        # Cap outbox history at 200 records
        if len(emails) > 200:
            emails = emails[:200]
        with open(EMAILS_FILE, "w", encoding="utf-8") as f:
            json.dump(emails, f, indent=2)
    except Exception as e:
        print(f"[ERROR] Failed to log email: {e}", file=sys.stderr)


def attempt_smtp_send(to_email, subject, html_content, text_content):
    cfg = get_smtp_config()
    if not cfg.get("enabled") or not cfg.get("user") or not cfg.get("password"):
        return {
            "delivered": False,
            "mode": "queued_outbox",
            "message": "Saved to Clinic Outbox. Configure SMTP in Front Desk to relay directly."
        }

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        from_header = f"{cfg.get('fromName', 'SHIFA CLINIC')} <{cfg.get('fromEmail') or cfg.get('user')}>"
        msg["From"] = from_header
        msg["To"] = to_email

        part1 = MIMEText(text_content, "plain", "utf-8")
        part2 = MIMEText(html_content, "html", "utf-8")
        msg.attach(part1)
        msg.attach(part2)

        host = cfg.get("host", "smtp.gmail.com")
        port = int(cfg.get("port", 587))
        context = ssl.create_default_context()

        with smtplib.SMTP(host, port, timeout=10) as server:
            server.ehlo()
            server.starttls(context=context)
            server.ehlo()
            server.login(cfg["user"], cfg["password"])
            server.sendmail(msg["From"], [to_email], msg.as_string())

        return {
            "delivered": True,
            "mode": "live_smtp",
            "message": f"Successfully relayed via {host} to {to_email}"
        }
    except Exception as err:
        return {
            "delivered": False,
            "mode": "smtp_error",
            "message": f"SMTP Relay failed: {str(err)}"
        }


class ClinicRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def do_GET(self):
        # API: Query Outbox Emails
        if self.path == "/api/emails":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            try:
                with open(EMAILS_FILE, "r", encoding="utf-8") as f:
                    data = f.read()
                self.wfile.write(data.encode("utf-8"))
            except Exception:
                self.wfile.write(b"[]")
            return

        # API: Query SMTP Status
        if self.path == "/api/smtp-config":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            cfg = get_smtp_config().copy()
            # Mask password
            if "password" in cfg and cfg["password"]:
                cfg["password"] = "********"
            self.wfile.write(json.dumps(cfg).encode("utf-8"))
            return

        # Fallback to standard static file server
        super().do_GET()

    def do_POST(self):
        # API: Dispatch Patient OPD Confirmation Email
        if self.path == "/api/send-email":
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length)
            try:
                payload = json.loads(body.decode("utf-8"))
                to_email = payload.get("to") or payload.get("to_email") or ""
                patient_name = payload.get("patientName") or payload.get("patient_name") or "Patient"
                token = payload.get("token") or "SHF-OPD"
                subject = payload.get("subject") or f"SHIFA CLINIC Confirmation: Token {token} - {patient_name}"
                html_body = payload.get("htmlBody") or payload.get("html") or ""
                text_body = payload.get("textBody") or payload.get("text") or ""
                doctor_name = payload.get("doctorName") or payload.get("doctor_name") or ""
                specialty = payload.get("specialty") or ""
                date = payload.get("date") or ""
                time_slot = payload.get("time") or ""
                room = payload.get("room") or ""

                if not to_email or "@" not in to_email:
                    self.send_response(400)
                    self.send_header("Content-Type", "application/json")
                    self.send_header("Access-Control-Allow-Origin", "*")
                    self.end_headers()
                    self.wfile.write(json.dumps({"success": False, "status": "error", "error": "Valid recipient email required"}).encode())
                    return

                # Send or queue email
                delivery_result = attempt_smtp_send(to_email, subject, html_body, text_body)

                email_record = {
                    "id": f"mail_{datetime.now().strftime('%Y%m%d_%H%M%S')}_{token}",
                    "to": to_email,
                    "patientName": patient_name,
                    "token": token,
                    "doctorName": doctor_name,
                    "specialty": specialty,
                    "date": date,
                    "time": time_slot,
                    "room": room,
                    "subject": subject,
                    "dispatchedAt": datetime.now().isoformat(),
                    "status": "Delivered" if delivery_result["delivered"] else "Dispatched (Outbox Logged)",
                    "mode": delivery_result["mode"],
                    "deliveryDetails": delivery_result["message"],
                    "htmlBody": html_body,
                    "textBody": text_body
                }
                log_email_record(email_record)

                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(json.dumps({
                    "success": True,
                    "emailId": email_record["id"],
                    "status": email_record["status"],
                    "delivery": delivery_result
                }).encode("utf-8"))
            except Exception as e:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": str(e)}).encode("utf-8"))
            return

        # API: Update SMTP Settings
        if self.path == "/api/smtp-config":
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length)
            try:
                new_cfg = json.loads(body.decode("utf-8"))
                current_cfg = get_smtp_config()
                # Preserve existing password if placeholder passed
                if new_cfg.get("password") == "********":
                    new_cfg["password"] = current_cfg.get("password", "")
                save_smtp_config(new_cfg)

                # Test connection if enabled
                test_result = {"tested": False}
                if new_cfg.get("enabled") and new_cfg.get("user") and new_cfg.get("password"):
                    try:
                        host = new_cfg.get("host", "smtp.gmail.com")
                        port = int(new_cfg.get("port", 587))
                        context = ssl.create_default_context()
                        with smtplib.SMTP(host, port, timeout=5) as s:
                            s.ehlo()
                            s.starttls(context=context)
                            s.login(new_cfg["user"], new_cfg["password"])
                        test_result = {"tested": True, "success": True, "message": "SMTP Connection Verified!"}
                    except Exception as err:
                        test_result = {"tested": True, "success": False, "message": str(err)}

                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(json.dumps({"success": True, "test": test_result}).encode("utf-8"))
            except Exception as e:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": str(e)}).encode("utf-8"))
            return

        super().do_POST()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()


if __name__ == "__main__":
    server_address = ("127.0.0.1", PORT)
    httpd = ThreadingHTTPServer(server_address, ClinicRequestHandler)
    print(f"[SHIFA ENGINE] Clinical HTTP & Dispatch Server running on http://127.0.0.1:{PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        httpd.server_close()
