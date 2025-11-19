'use client';

import React from 'react';
import WaterDroplet from './WaterDroplet';

interface PrototypeVisualizationProps {
  droplets: Array<{ id: number; timestamp: number }>;
  isGenerating: boolean;
  onDropletComplete: (id: number) => void;
}

export default function PrototypeVisualization({
  droplets,
  isGenerating,
  onDropletComplete
}: PrototypeVisualizationProps) {
  return (
    <div className="relative lg:h-[700px] flex items-center justify-center">
      {/* Glow backdrop */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-96 h-96 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full"
          style={{ filter: 'blur(100px)', animation: 'glow-pulse 3s ease-in-out infinite' }}
        />
      </div>

      {/* Water droplets */}
      {droplets.map((droplet) => (
        <WaterDroplet key={droplet.id} id={droplet.id} onComplete={onDropletComplete} />
      ))}

      {/* Device container */}
      <div className="relative z-20" style={{ animation: 'float 6s ease-in-out infinite' }}>
        <div className="relative w-80">
          {/* Water source label */}
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 flex items-center gap-3 px-4 py-2 glass-card rounded-full">
            <svg width="24" height="24" viewBox="0 0 16 20" fill="currentColor" className="text-cyan-400">
              <path d="M8 0C8 0 0 8 0 13C0 16.866 3.58172 20 8 20C12.4183 20 16 16.866 16 13C16 8 8 0 8 0Z" />
            </svg>
            <span className="text-cyan-400 text-sm font-bold tracking-wider">H₂O FLOW</span>
          </div>

          {/* Inlet tube */}
          <div className="h-24 w-16 mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/40 to-cyan-500/60 rounded-t-3xl blur-sm" />
            <div className="relative w-full h-full bg-gradient-to-b from-cyan-400/60 to-cyan-500/80 rounded-t-3xl border-2 border-cyan-400/70 glow-cyan" />
          </div>

          {/* Copper electrode */}
          <div className="relative h-12 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 border-2 border-orange-400 flex items-center justify-between px-6 glow-orange mb-2">
            <div className="absolute inset-0 shimmer" />
            <span className="relative text-sm font-bold text-white tracking-wider drop-shadow-lg">COPPER</span>
            <div className="relative w-8 h-8 rounded-full bg-orange-300 flex items-center justify-center text-orange-900 font-bold text-lg shadow-inner">+</div>
            {isGenerating && (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-300/40 to-transparent" style={{ animation: 'shimmer 1s ease-in-out' }} />
                <div className="absolute inset-0 bg-orange-300/30" style={{ animation: 'electric-pulse 0.3s ease-in-out' }} />
              </>
            )}
          </div>

          {/* PTFE layer */}
          <div className="relative h-24 bg-gradient-to-br from-slate-200 via-slate-100 to-gray-200 border-4 border-slate-300 flex items-center justify-center shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent" />
            <span className="relative text-lg font-bold text-slate-800 tracking-[0.3em]">PTFE</span>

            {isGenerating && (
              <>
                <div
                  className="absolute inset-0 border-4 border-cyan-400 rounded-sm shadow-lg shadow-cyan-500/50"
                  style={{ animation: 'pulse-ring 0.8s ease-out' }}
                />
                <div className="absolute inset-0 bg-cyan-400/40" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-cyan-400 rounded-full" style={{ filter: 'blur(20px)', animation: 'electric-pulse 0.3s ease-in-out' }} />

                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-cyan-300 rounded-full"
                    style={{
                      left: `${30 + Math.random() * 40}%`,
                      top: `${30 + Math.random() * 40}%`,
                      animation: 'pulse-ring 0.5s ease-out',
                      animationDelay: `${i * 0.05}s`,
                      filter: 'blur(1px)'
                    }}
                  />
                ))}
              </>
            )}
          </div>

          {/* Aluminum electrode */}
          <div className="relative h-12 bg-gradient-to-br from-slate-400 via-slate-500 to-slate-600 border-2 border-slate-500 flex items-center justify-between px-6 shadow-xl shadow-slate-900/50 mt-2">
            <div className="absolute inset-0 shimmer" />
            <span className="relative text-sm font-bold text-white tracking-wider drop-shadow-lg">ALUMINUM</span>
            <div className="relative w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center text-slate-900 font-bold text-lg shadow-inner">−</div>
            {isGenerating && (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-300/30 to-transparent" style={{ animation: 'shimmer 1s ease-in-out reverse' }} />
                <div className="absolute inset-0 bg-slate-300/20" style={{ animation: 'electric-pulse 0.3s ease-in-out' }} />
              </>
            )}
          </div>

          {/* Outlet tube */}
          <div className="h-24 w-16 mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/60 to-cyan-600/40 rounded-b-3xl blur-sm" />
            <div className="relative w-full h-full bg-gradient-to-b from-cyan-500/70 to-cyan-600/50 rounded-b-3xl border-2 border-cyan-500/70 glow-cyan" />
          </div>

          {/* Circuit wires and LED */}
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
            <path
              d="M 310 35 L 360 35 L 360 95"
              stroke={isGenerating ? '#fbbf24' : '#334155'}
              strokeWidth="4"
              fill="none"
              strokeDasharray={isGenerating ? '8 4' : undefined}
              strokeLinecap="round"
              style={{
                filter: isGenerating ? 'drop-shadow(0 0 8px #fbbf24)' : undefined,
                animation: isGenerating ? 'flow 0.6s linear infinite' : undefined
              }}
            />

            <path
              d="M 310 175 L 360 175 L 360 125"
              stroke={isGenerating ? '#3b82f6' : '#334155'}
              strokeWidth="4"
              fill="none"
              strokeDasharray={isGenerating ? '8 4' : undefined}
              strokeLinecap="round"
              style={{
                filter: isGenerating ? 'drop-shadow(0 0 8px #3b82f6)' : undefined,
                animation: isGenerating ? 'flow 0.6s linear infinite reverse' : undefined
              }}
            />1

            <circle
              cx="360"
              cy="110"
              r="18"
              fill={isGenerating ? '#fbbf24' : '#0f172a'}
              stroke={isGenerating ? '#f59e0b' : '#1e293b'}
              strokeWidth="3"
              style={{
                filter: isGenerating ? 'drop-shadow(0 0 20px #fbbf24)' : undefined
              }}
            />
            {isGenerating && (
              <>
                <circle cx="360" cy="110" r="18" fill="none" stroke="#fbbf24" strokeWidth="2" opacity={0} style={{ animation: 'pulse-ring 1s ease-out infinite' }} />
                <circle cx="360" cy="110" r="28" fill="none" stroke="#fbbf24" strokeWidth="1" opacity={0} style={{ animation: 'pulse-ring 1s ease-out infinite 0.2s' }} />
              </>
            )}
            <text x="360" y="116" textAnchor="middle" fill={isGenerating ? '#000' : '#334155'} fontSize="11" fontWeight="bold">LED</text>
          </svg>
        </div>
      </div>
    </div>
  );
}