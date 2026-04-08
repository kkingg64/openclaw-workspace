#!/usr/bin/env node
const http = require('http');

const base = "http://76.13.215.13:4401/mcp";
const h = {
    "Content-Type": "application/json",
    "Accept": "application/json, text/event-stream"
};

function post(data) {
    return new Promise((resolve, reject) => {
        const body = JSON.stringify(data);
        const req = http.request(base, { method: 'POST', headers: h }, (res) => {
            let d = '';
            res.on('data', chunk => d += chunk);
            res.on('end', () => resolve({ body: d, headers: res.headers }));
        });
        req.on('error', reject);
        req.write(body);
        req.end();
    });
}

(async () => {
    // Step 1: Initialize
    console.log('=== STEP 1: Initialize ===');
    const r1 = await post({"jsonrpc":"2.0","id":0,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"cdo","version":"1"}}});
    console.log('Response:', r1.body.substring(0, 1000));
    console.log('Session ID:', r1.headers['mcp-session-id'] || 'none');
    
    if (r1.headers['mcp-session-id']) {
        h['mcp-session-id'] = r1.headers['mcp-session-id'];
    }

    // Step 2: notifications/initialized
    console.log('\n=== STEP 2: Send initialized notification ===');
    await post({"jsonrpc":"2.0","method":"notifications/initialized"});
    console.log('Notification sent OK');

    // Step 3: execute_code - Create red Rectangle
    console.log('\n=== STEP 3: Create Red Rectangle 100x100 ===');
    const code = `
const r = penpot.createRectangle();
r.name = "Test Rectangle 100x100 Red";
r.resize(100, 100);
r.fills = [{fillColor: "#FF0000", fillOpacity: 1}];
r.x = 200;
r.y = 200;
return r.name + " | pos: " + r.x + "," + r.y + " | size: " + r.width + "x" + r.height;
`;
    const r3 = await post({"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"execute_code","arguments":{"code":code}}});
    console.log('Result:', r3.body.substring(0, 2000));
    
    console.log('\n=== ALL STEPS COMPLETE ===');
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
