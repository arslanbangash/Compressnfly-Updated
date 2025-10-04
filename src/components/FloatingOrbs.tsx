import { useEffect, useState } from 'react';

const FloatingOrbs = () => {
  const [orbs, setOrbs] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    opacity: number;
  }>>([]);

  useEffect(() => {
    // Create random orbs
    const newOrbs = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 120 + 40, // 40-160px
      duration: Math.random() * 20 + 15, // 15-35s
      delay: Math.random() * 10, // 0-10s
      opacity: Math.random() * 0.3 + 0.1, // 0.1-0.4
    }));
    setOrbs(newOrbs);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="absolute rounded-full floating-orb"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            background: `radial-gradient(circle, hsl(var(--primary) / ${orb.opacity}) 0%, hsl(var(--primary) / 0) 70%)`,
            animationDuration: `${orb.duration}s`,
            animationDelay: `${orb.delay}s`,
            filter: 'blur(1px)',
          }}
        />
      ))}
      
      {/* Additional accent orbs with different blue tones */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={`accent-${i}`}
          className="absolute rounded-full floating-orb-slow"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 80 + 60}px`,
            height: `${Math.random() * 80 + 60}px`,
            background: `radial-gradient(circle, hsl(262 83% 58% / ${Math.random() * 0.2 + 0.05}) 0%, hsl(262 83% 58% / 0) 70%)`,
            animationDuration: `${Math.random() * 25 + 20}s`,
            animationDelay: `${Math.random() * 15}s`,
            filter: 'blur(2px)',
          }}
        />
      ))}
    </div>
  );
};

export default FloatingOrbs;