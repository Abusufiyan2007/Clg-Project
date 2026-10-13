#!/usr/bin/env bash
# Shifa Clinic: Live Web Preview Launcher
# Starts local HTTP server and exposes it via Cloudflare Tunnel

PORT=3456
APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/app" && pwd)"

echo "--------------------------------------------------------"
echo "  Shifa Clinic: Starting Live Deployment Engine"
echo "--------------------------------------------------------"

# Kill existing instances if running on port
fuser -k ${PORT}/tcp 2>/dev/null

echo "[1/2] Launching backend server on port ${PORT}..."
python3 "${APP_DIR}/server.py" ${PORT} > /dev/null 2>&1 &
SERVER_PID=$!

# Cleanup on exit
trap "kill ${SERVER_PID} 2>/dev/null; exit 0" SIGINT SIGTERM

if command -v cloudflared >/dev/null 2>&1; then
  echo "[2/2] Spawning Cloudflare Public Tunnel..."
  cloudflared tunnel --url "http://127.0.0.1:${PORT}"
else
  echo "[2/2] Local server active at: http://localhost:${PORT}"
  echo "      (Cloudflare CLI not detected. Press Ctrl+C to terminate.)"
  wait ${SERVER_PID}
fi
