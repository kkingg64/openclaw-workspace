import { WebSocketServer, WebSocket } from 'ws';
import { Room } from './Room';
import crypto from 'crypto';

const PORT = Number(process.env.WS_PORT) || 3001;
const MAX_CONNECTIONS_PER_IP = 3;

// Track connections per IP
const ipConnections = new Map<string, number>();

const wss = new WebSocketServer({ port: PORT });
const rooms = new Map<string, Room>();

console.log(`[GameServer] WebSocket server running on port ${PORT}`);

wss.on('connection', (ws: WebSocket, req) => {
  const ip = req.socket.remoteAddress || 'unknown';

  // Rate limit connections per IP
  const currentCount = ipConnections.get(ip) || 0;
  if (currentCount >= MAX_CONNECTIONS_PER_IP) {
    ws.close(1008, 'Too many connections from this IP');
    return;
  }
  ipConnections.set(ip, currentCount + 1);

  // Generate session token
  const sessionToken = crypto.randomUUID();
  const playerId = crypto.randomUUID().slice(0, 8);

  console.log(`[GameServer] Player ${playerId} connected from ${ip}`);

  ws.on('message', (data: Buffer) => {
    try {
      // Binary protocol: first byte = message type
      if (data.length < 1) return;

      const type = data[0];

      switch (type) {
        case 0x01: // PLAYER_INPUT
          handlePlayerInput(playerId, data);
          break;
        case 0x03: // JOIN_ROOM
          handleJoinRoom(playerId, ws, data);
          break;
        case 0x10: // CREATE_ROOM
          handleCreateRoom(playerId, ws, data);
          break;
        default:
          console.warn(`[GameServer] Unknown message type: ${type}`);
      }
    } catch (err) {
      console.error(`[GameServer] Error processing message:`, err);
    }
  });

  ws.on('close', () => {
    ipConnections.set(ip, Math.max(0, (ipConnections.get(ip) || 1) - 1));

    // Remove player from their room
    for (const [, room] of rooms) {
      if (room.hasPlayer(playerId)) {
        room.removePlayer(playerId);
        if (room.isEmpty()) {
          rooms.delete(room.id);
          console.log(`[GameServer] Room ${room.id} destroyed (empty)`);
        }
        break;
      }
    }

    console.log(`[GameServer] Player ${playerId} disconnected`);
  });

  // Send session token
  const tokenBuffer = Buffer.alloc(1 + 36);
  tokenBuffer[0] = 0xFF; // SESSION_TOKEN message type
  tokenBuffer.write(sessionToken, 1, 'utf8');
  ws.send(tokenBuffer);
});

function handlePlayerInput(playerId: string, data: Buffer) {
  if (data.length < 10) return;

  // Parse binary input: [type:1][moveX:4][moveZ:4][shoot:1]
  const moveX = data.readFloatLE(1);
  const moveZ = data.readFloatLE(5);
  const shoot = data[9] === 1;

  // Validate input ranges (anti-cheat)
  if (Math.abs(moveX) > 1.5 || Math.abs(moveZ) > 1.5) {
    return; // Invalid movement, reject
  }

  for (const [, room] of rooms) {
    if (room.hasPlayer(playerId)) {
      room.handleInput(playerId, { moveX, moveZ, shoot });
      break;
    }
  }
}

function handleJoinRoom(playerId: string, ws: WebSocket, data: Buffer) {
  // Parse room ID from message
  const roomId = data.toString('utf8', 1, 37); // UUID is 36 chars
  const room = rooms.get(roomId);

  if (!room) {
    sendError(ws, 'Room not found');
    return;
  }

  if (room.isFull()) {
    sendError(ws, 'Room is full');
    return;
  }

  room.addPlayer(playerId, ws);
  console.log(`[GameServer] Player ${playerId} joined room ${roomId}`);
}

function handleCreateRoom(playerId: string, ws: WebSocket, data: Buffer) {
  const roomId = crypto.randomUUID();
  const maxPlayers = data.length > 1 ? Math.min(4, Math.max(2, data[1])) : 4;
  const timeLimit = data.length > 3 ? data.readUInt16LE(2) : 180;

  const room = new Room(roomId, maxPlayers, timeLimit);
  rooms.set(roomId, room);
  room.addPlayer(playerId, ws);

  console.log(`[GameServer] Room ${roomId} created by ${playerId} (max: ${maxPlayers}, time: ${timeLimit}s)`);
}

function sendError(ws: WebSocket, message: string) {
  const buf = Buffer.alloc(1 + message.length);
  buf[0] = 0xFE; // ERROR message type
  buf.write(message, 1, 'utf8');
  ws.send(buf);
}

// Health check HTTP endpoint
import { createServer } from 'http';
const httpServer = createServer((req, res) => {
  if (req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      rooms: rooms.size,
      players: Array.from(rooms.values()).reduce((sum, r) => sum + r.playerCount, 0),
    }));
  } else if (req.url === '/api/rooms') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(
      Array.from(rooms.values()).map((r) => ({
        id: r.id,
        players: r.playerCount,
        maxPlayers: r.maxPlayers,
        status: r.isFull() ? 'full' : 'open',
      }))
    ));
  } else {
    res.writeHead(404);
    res.end();
  }
});

httpServer.listen(PORT + 1, () => {
  console.log(`[GameServer] HTTP health check on port ${PORT + 1}`);
});
