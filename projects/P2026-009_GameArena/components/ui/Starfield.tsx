'use client';

export function Starfield() {
  const stars = Array.from({ length: 100 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    duration: `${Math.random() * 3 + 2}s`,
    delay: `${Math.random() * 3}s`,
  }));

  return (
    <div className="starfield">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            '--duration': star.duration,
            '--delay': star.delay,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
