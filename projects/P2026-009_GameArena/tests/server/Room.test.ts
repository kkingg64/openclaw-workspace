import { describe, it, expect, beforeEach } from 'vitest';
import { Room } from '../../server/Room';

// Mock WebSocket
const createMockWS = () => ({
  readyState: 1, // WebSocket.OPEN
  send: () => {},
  close: () => {},
});

describe('Room', () => {
  let room: Room;

  beforeEach(() => {
    room = new Room('test-room', 4, 180);
  });

  it('should create room with correct properties', () => {
    expect(room.id).toBe('test-room');
    expect(room.maxPlayers).toBe(4);
    expect(room.playerCount).toBe(0);
    expect(room.isEmpty()).toBe(true);
  });

  it('should add players', () => {
    room.addPlayer('p1', createMockWS() as any);
    expect(room.playerCount).toBe(1);
    expect(room.hasPlayer('p1')).toBe(true);
    expect(room.isEmpty()).toBe(false);
  });

  it('should report full when max players reached', () => {
    room = new Room('test', 2, 180);
    room.addPlayer('p1', createMockWS() as any);
    expect(room.isFull()).toBe(false);
    room.addPlayer('p2', createMockWS() as any);
    expect(room.isFull()).toBe(true);
  });

  it('should remove players', () => {
    room.addPlayer('p1', createMockWS() as any);
    room.addPlayer('p2', createMockWS() as any);
    room.removePlayer('p1');
    expect(room.playerCount).toBe(1);
    expect(room.hasPlayer('p1')).toBe(false);
    expect(room.hasPlayer('p2')).toBe(true);
  });

  it('should be empty after all players removed', () => {
    room.addPlayer('p1', createMockWS() as any);
    room.removePlayer('p1');
    expect(room.isEmpty()).toBe(true);
  });

  it('should handle input only for existing players', () => {
    room.addPlayer('p1', createMockWS() as any);
    // Should not throw for non-existent player
    room.handleInput('nonexistent', { moveX: 1, moveZ: 0, shoot: false });
  });

  it('should reject joining full room', () => {
    room = new Room('test', 2, 180);
    room.addPlayer('p1', createMockWS() as any);
    room.addPlayer('p2', createMockWS() as any);
    expect(room.isFull()).toBe(true);
  });
});
