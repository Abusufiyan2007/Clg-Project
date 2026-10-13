# SHIFA CLINIC — Outpatient (OPD) & Queue Management Platform

High-performance healthcare portal and real-time outpatient queue management system for **SHIFA CLINIC** located in Pernambut, Tirupattur District, Tamil Nadu.

---

## Quick Start

### Option 1: One-Click Launch Script
```bash
chmod +x serve.sh
./serve.sh
```
- Spawns the local Python backend on port `3456`.
- Automatically opens a Cloudflare Public Tunnel if `cloudflared` is installed, or serves at `http://localhost:3456`.

### Option 2: Direct Python Server
```bash
cd app
python3 server.py 3456
```
Open your browser at: `http://localhost:3456`

---

## Staff & Doctor Portal Credentials

Access the Front Desk / Doctor Console via the **Staff Portal** link in the header or `#admin` route:

| Role | Username | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Consulting Physician** | `doctor` | `doctor@123` | Doctor Console (`Dr. M. K. Imran`) |
| **Front Desk Operator** | `nurse` | `nurse@123` | Operator Nurse (`Desk 1`) |

---

## Project Structure

```
clinic-limno/
├── README.md                 # Project quickstart & operational guide
├── serve.sh                  # One-click local server & tunnel launcher
├── docs/
│   └── PROJECT_SPEC.md       # Architecture specification & Viva defense notes
└── app/
    ├── index.html            # Main portal & appointment booking flow
    ├── queue.html            # Real-time OPD live queue status board
    ├── departments.html      # Clinical departments directory
    ├── doctors.html          # Consulting physicians profile directory
    ├── contact.html          # Emergency intake & location directory
    ├── styles.css            # Unified responsive healthcare UI stylesheet
    ├── app.js                # Core state engine, appointment bookings & live queue
    ├── server.py             # HTTP server with email dispatch & SMTP API
    ├── data/
    │   ├── smtp_config.json  # SMTP credentials & outgoing email configuration
    │   └── emails_log.json   # Outbox archive of patient consultation slips
    └── assets/
        └── images/
            ├── shifa-logo-emblem.png   # Transparent clinic emblem (stethoscope + heart)
            ├── shifa-logo-full.png     # Full horizontal clinic logo with title
            ├── hero-clean-banner.png   # Production desktop hero background
            ├── hero-doctor-asset.png   # Production mobile doctor asset
            ├── favicon-192.png         # Web manifest & mobile touch icon
            └── favicon-512.png         # PWA high-res icon
```

---

## Key Features

- **Instant Appointment Booking**: 60-second specialist booking with real-time slot locking.
- **Live OPD Queue Board**: Live queue position tracking with estimated wait times and direct token verification.
- **Automated OPD Pass Generation**: Generates digital consultation slips with QR codes and WhatsApp share triggers.
- **Outbox Email Service**: Built-in SMTP email dispatch with fallback outbox logging.
- **Doctor & Staff Desk**: Live queue calling, walk-in triage, doctor availability toggles, and CSV audit export.

---

## Clinic Contact Information

- **Facility**: SHIFA CLINIC
- **Location**: #42, High Road (Opposite Clock Tower, Near Old Bus Stand), Pernambut, Tirupattur District, Tamil Nadu — 635810
- **Reception Desk**: +91 93424 88966
- **Desk Email**: desk@shifaclinic.com
- **Operating Hours**: Monday to Saturday, 08:30 AM to 08:30 PM (Emergency Care 24/7)
