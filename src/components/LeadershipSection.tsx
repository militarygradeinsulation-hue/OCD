import React, { useState } from 'react';
import { LEADERSHIP_TEAM } from '../data/mockData';
import { Compass, RotateCcw, AlertTriangle, Crosshair } from 'lucide-react';
import { soundHazard } from '../utils/audioEngine';

export const LeadershipSection: React.FC = () => {
  const [activeLeader, setActiveLeader] = useState<string | null>(null);
  const [compassSlipAngle, setCompassSlipAngle] = useState<{ [key: string]: number }>({});

  const handleCompassSlip = (id: string) => {
    soundHazard.playToolCrash();
    setCompassSlipAngle((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + (Math.random() > 0.5 ? 24 : -32),
    }));
  };

  return (
    <section id="leadership" className="py-16 px-4 bg-zinc-950 border-t-4 border-red-700 font-mono text-zinc-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-red-950/80 border border-red-600 px-3 py-1 rounded text-red-400 text-xs font-bold mb-3 uppercase tracking-wider">
            <Compass className="w-4 h-4 text-red-500 animate-spin" style={{ animationDuration: '9s' }} />
            EXECUTIVE DRAFTING TABLE
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
            LEADERSHIP DRAWN WITH A BROKEN COMPASS
          </h2>
          <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
            Every executive portrait below was personally rendered using an uncalibrated 1984 draftsman’s compass with a stripped pivot screw and dry pencil graphite. Notice how none of their eyes share a common focal plane.
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {LEADERSHIP_TEAM.map((leader) => {
            const slip = compassSlipAngle[leader.id] || 0;
            return (
              <div
                key={leader.id}
                onMouseEnter={() => setActiveLeader(leader.id)}
                onMouseLeave={() => setActiveLeader(null)}
                className="bg-zinc-900/90 border-2 border-zinc-700 hover:border-red-500 rounded-lg p-5 transition-all duration-300 relative group flex flex-col justify-between shadow-lg"
                style={{
                  transform: `rotate(${leader.id === 'chuck-wobbly' ? '-0.8deg' : leader.id === 'brenda-caliper' ? '0.7deg' : leader.id === 'sven-cross-thread' ? '-1.2deg' : '0.9deg'})`,
                }}
              >
                {/* Compass Drift Badge */}
                <div className="flex justify-between items-center text-[10px] text-zinc-500 border-b border-zinc-800 pb-2 mb-3">
                  <span className="flex items-center gap-1 text-red-400 font-bold">
                    <Crosshair className="w-3 h-3" />
                    DRIFT: {leader.compassDrift}
                  </span>
                  <span>{leader.yearsWithoutCalibrating} yrs uncalibrated</span>
                </div>

                {/* Broken Compass Caricature SVG */}
                <div
                  onClick={() => handleCompassSlip(leader.id)}
                  className="bg-zinc-950 border border-zinc-800 rounded p-3 mb-4 cursor-pointer relative overflow-hidden flex items-center justify-center min-h-[220px] transition-transform hover:scale-105"
                  title="Click to slip the compass needle"
                >
                  {/* Grid Lines in background */}
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px]" />

                  {/* SVG Caricatures made with broken compass circles */}
                  <svg
                    viewBox="0 0 200 200"
                    className="w-44 h-44 transition-transform duration-500"
                    style={{ transform: `rotate(${slip}deg)` }}
                  >
                    {/* Broken Compass Leg Graphic */}
                    <line x1="20" y1="20" x2="100" y2="100" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,3" />
                    <circle cx="100" cy="100" r="3" fill="#ef4444" />

                    {leader.id === 'chuck-wobbly' && (
                      <g stroke="#ffffff" strokeWidth="2" fill="none">
                        {/* Cranium: Two concentric circles that missed each other */}
                        <circle cx="100" cy="85" r="55" stroke="#ffffff" />
                        <circle cx="112" cy="78" r="52" stroke="#dc2626" strokeDasharray="4,2" />
                        {/* Broken spectacles: One square, one wobbly oval */}
                        <circle cx="82" cy="88" r="16" stroke="#facc15" strokeWidth="2.5" />
                        <ellipse cx="126" cy="82" rx="20" ry="14" stroke="#facc15" strokeWidth="2.5" />
                        <line x1="98" y1="88" x2="106" y2="82" stroke="#facc15" strokeWidth="2" />
                        {/* Off-center pupils */}
                        <circle cx="78" cy="86" r="4" fill="#ffffff" />
                        <circle cx="132" cy="80" r="5" fill="#ef4444" />
                        {/* Misaligned nose: Compass arc that jumped */}
                        <path d="M 104 90 A 15 15 0 0 1 114 115" stroke="#ffffff" strokeWidth="2.5" />
                        {/* Smirking mouth: Broken wavy curve */}
                        <path d="M 80 135 Q 105 150 135 125" stroke="#ef4444" strokeWidth="3" />
                        {/* Compass center pin prick */}
                        <circle cx="100" cy="85" r="2" fill="#ef4444" />
                        <text x="105" y="83" fill="#ef4444" fontSize="8" fontFamily="monospace">pivot slip</text>
                      </g>
                    )}

                    {leader.id === 'brenda-caliper' && (
                      <g stroke="#ffffff" strokeWidth="2" fill="none">
                        {/* Head: Triangle-circle hybrid from slipping compass */}
                        <ellipse cx="96" cy="95" rx="58" ry="64" stroke="#ffffff" />
                        <path d="M 45 70 A 55 55 0 0 1 155 70" stroke="#facc15" strokeWidth="3" strokeDasharray="6,3" />
                        {/* Caliper hair style */}
                        <line x1="50" y1="50" x2="80" y2="20" stroke="#dc2626" strokeWidth="2.5" />
                        <line x1="80" y1="20" x2="120" y2="20" stroke="#dc2626" strokeWidth="2.5" />
                        <line x1="120" y1="20" x2="150" y2="50" stroke="#dc2626" strokeWidth="2.5" />
                        {/* Cat-eye glasses drawn with slipping radius */}
                        <path d="M 65 92 Q 85 75 102 92 Q 85 105 65 92 Z" stroke="#38bdf8" strokeWidth="2" />
                        <path d="M 108 90 Q 128 72 148 90 Q 128 102 108 90 Z" stroke="#38bdf8" strokeWidth="2" />
                        <circle cx="83" cy="91" r="3" fill="#ffffff" />
                        <circle cx="127" cy="88" r="4" fill="#38bdf8" />
                        {/* Confident asymmetrical grin */}
                        <path d="M 85 130 C 95 145, 120 148, 138 128" stroke="#ef4444" strokeWidth="3" />
                        {/* Stray compass dimension annotation */}
                        <text x="50" y="170" fill="#facc15" fontSize="8" fontFamily="monospace">R=58.4? ±8mm</text>
                      </g>
                    )}

                    {leader.id === 'sven-cross-thread' && (
                      <g stroke="#ffffff" strokeWidth="2" fill="none">
                        {/* Heavy jaw: Concentric arcs that went rogue */}
                        <path d="M 50 80 A 50 60 0 0 0 150 80 L 145 135 A 40 40 0 0 1 55 135 Z" stroke="#ffffff" />
                        {/* Wild eyebrows made of crosshatch thread taps */}
                        <line x1="65" y1="75" x2="95" y2="70" stroke="#facc15" strokeWidth="4" />
                        <line x1="108" y1="65" x2="140" y2="78" stroke="#facc15" strokeWidth="4" />
                        {/* Threaded eyes */}
                        <circle cx="80" cy="88" r="8" stroke="#dc2626" />
                        <circle cx="125" cy="88" r="14" stroke="#dc2626" />
                        <circle cx="80" cy="88" r="3" fill="#dc2626" />
                        <circle cx="125" cy="88" r="3" fill="#ffffff" />
                        {/* Mustache: Sawtooth tap teeth */}
                        <path d="M 70 120 L 80 126 L 90 120 L 100 126 L 110 120 L 120 126 L 130 120" stroke="#ffffff" strokeWidth="2.5" />
                        <line x1="85" y1="138" x2="115" y2="135" stroke="#ef4444" strokeWidth="3" />
                      </g>
                    )}

                    {leader.id === 'milton-flange' && (
                      <g stroke="#ffffff" strokeWidth="2" fill="none">
                        {/* Perfectly circular head, but with 6 ears */}
                        <circle cx="100" cy="95" r="50" stroke="#ffffff" />
                        {/* Accordion bellows ears */}
                        <path d="M 45 80 L 35 85 L 45 90 L 35 95 L 45 100" stroke="#facc15" strokeWidth="2.5" />
                        <path d="M 155 80 L 165 85 L 155 90 L 165 95 L 155 100" stroke="#facc15" strokeWidth="2.5" />
                        {/* Wide open mouth singing polka */}
                        <ellipse cx="100" cy="120" rx="18" ry="12" stroke="#ef4444" fill="#ef4444" fillOpacity="0.2" />
                        {/* Musical notes wafting */}
                        <text x="125" y="115" fill="#facc15" fontSize="14">🪗</text>
                        {/* Hypnotized concentric spiral eyes from listening to polka */}
                        <path d="M 80 85 A 6 6 0 0 1 80 95 A 10 10 0 0 1 80 80" stroke="#38bdf8" strokeWidth="1.8" />
                        <path d="M 120 85 A 6 6 0 0 1 120 95 A 10 10 0 0 1 120 80" stroke="#38bdf8" strokeWidth="1.8" />
                      </g>
                    )}
                  </svg>

                  {/* Click-to-slip prompt overlay */}
                  <div className="absolute bottom-1 right-1 text-[9px] text-zinc-500 bg-zinc-900/90 px-1.5 py-0.5 rounded flex items-center gap-1">
                    <RotateCcw className="w-2.5 h-2.5 text-red-400" />
                    <span>Click to slip compass</span>
                  </div>
                </div>

                {/* Leader Bio Info */}
                <div>
                  <h3 className="text-base font-black text-white group-hover:text-red-400 transition">
                    {leader.name}
                  </h3>
                  <div className="text-xs text-yellow-300 font-bold mb-2">
                    {leader.title}
                  </div>
                  <blockquote className="text-[11px] text-red-300 italic mb-2 border-l-2 border-red-600 pl-2">
                    {leader.quote}
                  </blockquote>
                  <p className="text-zinc-400 text-[11px] leading-relaxed">
                    {leader.bio}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
