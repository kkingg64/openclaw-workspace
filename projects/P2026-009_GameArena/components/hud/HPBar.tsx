'use client';

interface HPBarProps {
  value: number;
  maxValue: number;
}

export function HPBar({ value, maxValue }: HPBarProps) {
  const percent = Math.max(0, Math.min(100, (value / maxValue) * 100));

  const getColor = () => {
    if (percent > 50) return 'from-arena-cyan to-green-500';
    if (percent > 25) return 'from-yellow-500 to-yellow-400';
    return 'from-red-500 to-red-400';
  };

  const getPulseClass = () => {
    if (percent <= 25) return 'animate-pulse';
    return '';
  };

  return (
    <div className="w-48 md:w-56">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-red-400 text-sm">♥</span>
        <span className="font-mono text-sm text-zinc-300">{Math.round(percent)}%</span>
      </div>
      <div className="h-3 bg-zinc-800/80 rounded-full overflow-hidden border border-zinc-700/50">
        <div
          className={`h-full bg-gradient-to-r ${getColor()} ${getPulseClass()} rounded-full transition-all duration-300`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
