import { useMemo } from 'react';

const StarField = () => {
  const stars = useMemo(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 3,
    })),
  []);

  return (
    <div className="star-field">
      {stars.map(s => (
        <div
          key={s.id}
          className="absolute rounded-full bg-primary/60 animate-twinkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            '--twinkle-duration': `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default StarField;
