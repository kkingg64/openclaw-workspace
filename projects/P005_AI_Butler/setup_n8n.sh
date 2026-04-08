#!/bin/bash
# P005 n8n Setup Script
# Run on VPS: bash /opt/p005-setup.sh

set -e

echo "=== P005 AI Butler - n8n Setup ==="

# Start n8n container
docker run -d --name p005_n8n \
  --network openclaw-network \
  -p 5678:5678 \
  -e N8N_BASIC_AUTH_ACTIVE=true \
  -e N8N_BASIC_AUTH_USER=admin \
  -e N8N_BASIC_AUTH_PASSWORD=N8nAdmin2026! \
  -e N8N_HOST=ai.madhorse.cloud \
  -e WEBHOOK_URL=http://ai.madhorse.cloud:5678/ \
  -v p005_n8n_data:/home/node/.n8n \
  n8nio/n8n:latest

echo "Waiting for n8n to start..."
sleep 20

# Create simple workflow
echo "Creating workflow..."

docker exec p005_n8n node -e "
const fs = require('fs');
const workflow = {
  id: 'p005-main',
  name: 'P005 AI Butler',
  nodes: [
    {
      id: 'webhook',
      name: 'WhatsApp Webhook',
      type: 'n8n-nodes-base.webhook',
      typeVersion: 1,
      position: [100, 300],
      parameters: {
        httpMethod: 'POST',
        path: 'whatsapp',
        responseMode: 'responseNode'
      },
      webhookId: 'p005-whatsapp'
    },
    {
      id: 'respond',
      name: 'Respond',
      type: 'n8n-nodes-base.respondToWebhook',
      typeVersion: 1,
      position: [300, 300],
      parameters: {
        respondWith: 'json',
        responseBody: '{\"status\": \"ok\"}'
      }
    }
  ],
  connections: {
    'webhook': {
      'main': [[{'node': 'respond', 'type': 'main', 'index': 0}]]
    }
  },
  active: false,
  settings: {}
};
fs.writeFileSync('/tmp/wf.json', JSON.stringify(workflow));
"

docker exec p005_n8n n8n import:workflow --input=/tmp/wf.json
docker exec p005_n8n n8n publish:workflow --id p005-main

echo "Restarting n8n..."
docker restart p005_n8n

sleep 10

echo "=== Setup Complete ==="
echo "n8n URL: http://76.13.215.13:5678"
echo "User: admin"
echo "Pass: N8nAdmin2026!"
echo "Webhook URL: http://76.13.215.13:5678/webhook/whatsapp"
