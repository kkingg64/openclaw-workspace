import { useEffect, useCallback } from 'react';
import { useGameStore } from './useGameState';

export function useInput() {
  const setKey = useGameStore((s) => s.setKey);
  const setPlayerRotation = useGameStore((s) => s.setPlayerRotation);
  const shoot = useGameStore((s) => s.shoot);
  const addKill = useGameStore((s) => s.addKill);
  const setHitConfirm = useGameStore((s) => s.setHitConfirm);

  // Keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKey(e.key.toLowerCase(), true);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      setKey(e.key.toLowerCase(), false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [setKey]);

  // Mouse input (aim + shoot)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Horizontal mouse movement → player rotation
      const sensitivity = 0.003;
      setPlayerRotation(useGameStore.getState().playerRotation + e.movementX * sensitivity);
    };

    const handleClick = () => {
      shoot();

      // Simulate hit detection (demo: 30% chance to hit)
      if (Math.random() < 0.3) {
        setHitConfirm(true);
        setTimeout(() => setHitConfirm(false), 200);
        // Random chance this is a kill
        if (Math.random() < 0.2) {
          addKill();
        }
      }
    };

    // Request pointer lock for FPS-style mouse control
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('click', () => {
        canvas.requestPointerLock();
      });
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
    };
  }, [shoot, setPlayerRotation, addKill, setHitConfirm]);
}
