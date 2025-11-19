'use client';

import React, { useState, useEffect, useRef } from 'react';

interface WaterDropletProps {
  id: number;
  onComplete: (id: number) => void;
}

export default function WaterDroplet({ id, onComplete }: WaterDropletProps) {
  const [position, setPosition] = useState({ x: Math.random() * 20 + 40, y: -10 });
  const [active, setActive] = useState(true);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    const duration = 3000;

    const animate = (time: number) => {
      if (startRef.current === null) startRef.current = time;
      const elapsed = time - startRef.current;
      const progress = Math.min(elapsed / duration, 1);

      setPosition(prev => ({
        x: prev.x + Math.sin(progress * Math.PI * 2) * 0.5,
        y: -10 + 120 * progress
      }));

      if (progress < 1 && mountedRef.current) {
        rafRef.current = requestAnimationFrame(animate);
      } else if (mountedRef.current) {
        setActive(false);
        onComplete(id);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      mountedRef.current = false;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [id, onComplete]);

  if (!active) return null;

  return (
    <div
      className="absolute pointer-events-none z-30"
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
    >
      <svg width="20" height="26" viewBox="0 0 16 20" fill="none" aria-hidden>
        <path
          d="M8 0C8 0 0 8 0 13C0 16.866 3.58172 20 8 20C12.4183 20 16 16.866 16 13C16 8 8 0 8 0Z"
          fill="url(#droplet-gradient)"
          style={{
            filter: 'drop-shadow(0 4px 12px rgba(6, 182, 212, 0.8)) drop-shadow(0 0 20px rgba(34, 211, 238, 0.6))'
          }}
        />
        <defs>
          <linearGradient id="droplet-gradient" x1="8" y1="0" x2="8" y2="20">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="1" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
            <stop offset="100%" stopColor="#67e8f9" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}