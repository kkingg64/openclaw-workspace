#!/usr/bin/env python3
import urllib.request, json, sys

base = "http://76.13.215.13:4401/mcp"
h = {
    "Content-Type": "application/json",
    "Accept": "application/json, text/event-stream"
}

# Step 1: Initialize
payload = {"jsonrpc":"2.0","id":0,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"cdo","version":"1"}}}
req = urllib.request.Request(base, data=json.dumps(payload).encode(), headers=h)
try:
    resp = urllib.request.urlopen(req, timeout=8)
    body = resp.read().decode()
    print("=== INITIALIZE RESPONSE ===")
    print(body[:2000])
    
    # Extract session ID
    session_id = resp.headers.get("mcp-session-id", "")
    if session_id:
        print(f"\n[mcp-session-id obtained: {session_id[:20]}...]")
        h["mcp-session-id"] = session_id
except Exception as e:
    print(f"INITIALIZE FAILED: {e}")
    sys.exit(1)

# Step 2: notifications/initialized
payload2 = {"jsonrpc":"2.0","method":"notifications/initialized"}
req2 = urllib.request.Request(base, data=json.dumps(payload2).encode(), headers=h)
try:
    resp2 = urllib.request.urlopen(req2, timeout=8)
    print("\n=== INITIALIZED NOTIFICATION: OK ===")
except Exception as e:
    print(f"\nNOTIFICATION FAILED (non-fatal): {e}")

# Step 3: execute_code - Create red 100x100 Rectangle
code = """
const r = penpot.createRectangle();
r.name = "Test Rectangle 100x100 Red";
r.resize(100, 100);
r.fills = [{fillColor: "#FF0000", fillOpacity: 1}];
r.x = 200;
r.y = 200;
return r.name + " created at x=" + r.x + " y=" + r.y + " size=" + r.width + "x" + r.height;
"""

payload3 = {"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"execute_code","arguments":{"code":code}}}
req3 = urllib.request.Request(base, data=json.dumps(payload3).encode(), headers=h)
try:
    resp3 = urllib.request.urlopen(req3, timeout=15)
    body3 = resp3.read().decode()
    print("\n=== EXECUTE_CODE RESPONSE ===")
    print(body3[:3000])
except Exception as e:
    print(f"\nEXECUTE_CODE FAILED: {e}")
    sys.exit(1)

print("\n=== TEST COMPLETE ===")
