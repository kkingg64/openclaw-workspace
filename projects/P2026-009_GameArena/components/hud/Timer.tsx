'use client';

interface TimerProps {
  seconds: number;
}

export function Timer({ seconds }: TimerProps) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const display = `${mins}:${secs.toString().padStart(2, '0')}`;

  const getColor = () => {
    if (seconds <= 10) return 'text-red-500 animate-pulse';
    if (seconds <= 30) return 'text-yellow-400';
    return 'text-zinc-100';
  };

  return (
    <div className={`font-mono text-3xl font-bold ${getColor()} drop-shadow-lg`}>
      {display}
    </div>
  );
}
