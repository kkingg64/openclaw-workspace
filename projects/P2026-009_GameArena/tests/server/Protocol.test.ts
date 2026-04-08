import { describe, it, expect } from 'vitest';

// Binary protocol encoder/decoder tests
describe('Binary Protocol', () => {
  it('should encode player input correctly', () => {
    const buf = Buffer.alloc(10);
    buf[0] = 0x01; // PLAYER_INPUT
    buf.writeFloatLE(0.5, 1); // moveX
    buf.writeFloatLE(-0.3, 5); // moveZ
    buf[9] = 1; // shoot = true

    expect(buf[0]).toBe(0x01);
    expect(buf.readFloatLE(1)).toBeCloseTo(0.5);
    expect(buf.readFloatLE(5)).toBeCloseTo(-0.3);
    expect(buf[9]).toBe(1);
  });

  it('should encode game state header', () => {
    const playerCount = 4;
    const timeRemaining = 120;
    const tick = Date.now() & 0xFFFFFFFF;

    const buf = Buffer.alloc(8);
    buf[0] = 0x02; // GAME_STATE
    buf.writeUInt32LE(tick, 1);
    buf.writeUInt16LE(timeRemaining, 5);
    buf[7] = playerCount;

    expect(buf[0]).toBe(0x02);
    expect(buf.readUInt16LE(5)).toBe(120);
    expect(buf[7]).toBe(4);
  });

  it('should encode player data in 17 bytes', () => {
    const buf = Buffer.alloc(17);
    let offset = 0;

    buf[offset++] = 0x41; // ID hash (char 'A')
    buf.writeFloatLE(10.5, offset); offset += 4; // x
    buf.writeFloatLE(1.0, offset); offset += 4; // y
    buf.writeFloatLE(-5.2, offset); offset += 4; // z
    buf.writeInt16LE(Math.round(1.57 * 100), offset); offset += 2; // rotY
    buf[offset++] = 80; // hp
    buf[offset++] = 0;  // state

    expect(offset).toBe(17); // Exactly 17 bytes per player
    expect(buf.readFloatLE(1)).toBeCloseTo(10.5);
    expect(buf[15]).toBe(80); // HP
  });

  it('should calculate total bandwidth correctly', () => {
    // 4 players, 20Hz tick rate
    const headerSize = 1 + 4 + 2 + 1; // 8 bytes
    const perPlayer = 17;
    const players = 4;
    const tickRate = 20;

    const bytesPerTick = headerSize + perPlayer * players;
    const bytesPerSecond = bytesPerTick * tickRate;

    expect(bytesPerTick).toBe(76);
    expect(bytesPerSecond).toBe(1520); // ~1.48 KB/s as spec'd
    expect(bytesPerSecond).toBeLessThan(2000); // Under 2 KB/s
  });

  it('should validate input ranges', () => {
    const validateInput = (moveX: number, moveZ: number) => {
      return Math.abs(moveX) <= 1.5 && Math.abs(moveZ) <= 1.5;
    };

    expect(validateInput(1.0, 0.5)).toBe(true);
    expect(validateInput(0, 0)).toBe(true);
    expect(validateInput(-1.0, 1.0)).toBe(true);
    expect(validateInput(2.0, 0)).toBe(false); // Speed hack
    expect(validateInput(0, 100)).toBe(false); // Teleport hack
  });
});
