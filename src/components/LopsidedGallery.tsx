import React, { useState } from 'react';
import { WIDGET_PARTS } from '../data/mockData';
import { WidgetPart } from '../types';
import { Crosshair, Sliders, AlertTriangle, Eye, Ruler, ShoppingCart, RefreshCw, Layers } from 'lucide-react';
import { soundHazard } from '../utils/audioEngine';

export const LopsidedGallery: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<WidgetPart>(WIDGET_PARTS[0]);
  const [imprecisionMultiplier, setImprecisionMultiplier] = useState<number>(1.0);
  const [scrapCount, setScrapCount] = useState<number>(0);
  const [showInspector, setShowInspector] = useState<boolean>(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredParts = categoryFilter === 'all'
    ? WIDGET_PARTS
    : WIDGET_PARTS.filter((p) => p.category === categoryFilter);

  const handleAddToScrap = (part: WidgetPart) => {
    soundHazard.playToolCrash();
    setScrapCount((prev) => prev + 1);
  };

  const handleInspect = (part: WidgetPart) => {
    setSelectedPart(part);
    setShowInspector(true);
    soundHazard.playToolCrash();
  };

  // Render SVG Blueprint for each part based on its renderType and imprecision multiplier
  const renderPartSVG = (type: string, multiplier: number = 1.0) => {
    const offset = 8 * multiplier;

    switch (type) {
      case '5bolt-flange':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Outer Flange Ring */}
            <circle cx="100" cy="100" r="85" fill="#27272a" stroke="#ffffff" strokeWidth="2" />
            {/* Inner fluid passage */}
            <circle cx="100" cy="100" r="38" fill="#18181b" stroke="#71717a" strokeWidth="1.5" />
            {/* Theoretical bolt circle guide (Dashed blue) */}
            <circle cx="100" cy="100" r="62" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" />
            
            {/* Bolt 1 (Accurate-ish) */}
            <circle cx="100" cy="38" r="7" fill="#dc2626" stroke="#ffffff" strokeWidth="1.5" />
            {/* Bolt 2 (Drifted) */}
            <circle cx={160 + offset * 0.4} cy="75" r="7" fill="#dc2626" stroke="#ffffff" strokeWidth="1.5" />
            {/* Bolt 3 (Drifted Down) */}
            <circle cx="138" cy={155 + offset * 0.6} r="7" fill="#dc2626" stroke="#ffffff" strokeWidth="1.5" />
            {/* Bolt 4 (Too far left) */}
            <circle cx={42 - offset * 0.5} cy="148" r="7" fill="#dc2626" stroke="#ffffff" strokeWidth="1.5" />
            {/* Bolt 5 (Punched into the inner fluid channel!) */}
            <circle cx={62 + offset * 0.6} cy="85" r="7" fill="#ef4444" stroke="#facc15" strokeWidth="2" />
            {/* Bolt 6 (Rogue hole drilled through the outer lip!) */}
            <circle cx={100 + offset * 0.8} cy={185 + offset * 0.2} r="7" fill="#facc15" stroke="#ffffff" strokeWidth="2" />

            {/* Error Marker Annotation */}
            <line x1={62 + offset * 0.6} y1="85" x2="30" y2="40" stroke="#facc15" strokeWidth="1.5" />
            <text x="10" y="32" fill="#facc15" fontSize="9" fontFamily="monospace">BOLT 5 BREACHES BORE</text>
          </svg>
        );

      case 'crooked-bracket':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* 89.17-degree Right Angle Bracket */}
            <path
              d={`M 35 30 L 70 30 L 70 135 L ${165 + offset} ${138 - offset * 0.4} L ${163 + offset} ${168 - offset * 0.4} L 35 170 Z`}
              fill="#27272a"
              stroke="#ffffff"
              strokeWidth="2"
            />
            {/* Unaligned bolt holes on vertical leg */}
            <circle cx="52" cy="55" r="6" fill="#dc2626" stroke="#ffffff" strokeWidth="1" />
            <circle cx={58 + offset * 0.4} cy="95" r="6" fill="#dc2626" stroke="#ffffff" strokeWidth="1" />
            {/* Unaligned bolt holes on horizontal leg */}
            <circle cx="105" cy="152" r="6" fill="#dc2626" stroke="#ffffff" strokeWidth="1" />
            <circle cx={145 + offset * 0.6} cy={155 - offset * 0.3} r="6" fill="#dc2626" stroke="#ffffff" strokeWidth="1" />

            {/* Angle measurement arc */}
            <path d="M 70 120 A 25 25 0 0 1 95 135" fill="none" stroke="#facc15" strokeWidth="1.5" />
            <text x="80" y="115" fill="#facc15" fontSize="10" fontFamily="monospace">89.17° (CROOKED)</text>
          </svg>
        );

      case 'seven-sided-nut':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Heptagon (7 sides) instead of hexagon */}
            <polygon
              points="100,25 162,55 180,120 138,175 62,175 20,120 38,55"
              fill="#27272a"
              stroke="#ffffff"
              strokeWidth="2.5"
            />
            {/* Interior oval thread bore */}
            <ellipse cx={100 + offset * 0.4} cy="100" rx={35 + offset * 0.2} ry="32" fill="#18181b" stroke="#facc15" strokeWidth="2" strokeDasharray="5,2" />
            <text x="55" y="104" fill="#ef4444" fontSize="9" fontFamily="monospace">7 FLATS / NO SOCKET</text>
          </svg>
        );

      case 'wobbly-bearing':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Outer Race */}
            <circle cx="100" cy="100" r="80" fill="#27272a" stroke="#ffffff" strokeWidth="2.5" />
            {/* Inner Race with terrible off-center offset */}
            <circle cx={100 + offset * 1.4} cy="100" r="44" fill="#18181b" stroke="#ffffff" strokeWidth="2" />
            {/* Axle hole severely off-center */}
            <circle cx={100 + offset * 1.8} cy="100" r="22" fill="#000000" stroke="#facc15" strokeWidth="2" />
            {/* Crushed uneven ball bearings */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((ang, i) => {
              const rad = (ang * Math.PI) / 180;
              const rDist = 62 + (i % 2 === 0 ? offset * 0.6 : -offset * 0.4);
              return (
                <circle
                  key={i}
                  cx={100 + Math.cos(rad) * rDist}
                  cy={100 + Math.sin(rad) * rDist}
                  r="9"
                  fill="#dc2626"
                  stroke="#ffffff"
                  strokeWidth="1"
                />
              );
            })}
            <text x="35" y="185" fill="#facc15" fontSize="9" fontFamily="monospace">RUNOUT: +14.8mm (VIBRATING)</text>
          </svg>
        );

      case 'slanted-heatsink':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Heatsink Base */}
            <rect x="25" y="145" width="150" height="25" fill="#3f3f46" stroke="#ffffff" strokeWidth="2" />
            {/* Crooked cooling fins */}
            {[35, 50, 65, 80, 95, 110, 125, 140, 155].map((x, i) => {
              const slant = (i % 2 === 0 ? 12 : -18) * multiplier;
              return (
                <line
                  key={i}
                  x1={x}
                  y1="145"
                  x2={x + slant}
                  y2="40"
                  stroke="#ef4444"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              );
            })}
            <text x="30" y="30" fill="#facc15" fontSize="9" fontFamily="monospace">AIRFLOW REVERSED</text>
          </svg>
        );

      case 'stripped-screw':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Screw Head Top View */}
            <circle cx="100" cy="100" r="75" fill="#27272a" stroke="#ffffff" strokeWidth="2.5" />
            {/* Mangled rounded-out socket */}
            <path
              d="M 100 60 C 115 65, 135 80, 140 100 C 135 125, 115 135, 100 140 C 80 135, 65 120, 60 100 C 65 75, 85 62, 100 60 Z"
              fill="#18181b"
              stroke="#ef4444"
              strokeWidth="3"
            />
            {/* Swarf metal curls in center */}
            <path d="M 85 90 Q 100 100 115 88" stroke="#facc15" strokeWidth="2" fill="none" />
            <path d="M 92 110 Q 105 105 110 118" stroke="#facc15" strokeWidth="2" fill="none" />
            <text x="35" y="185" fill="#facc15" fontSize="9" fontFamily="monospace">100% PRE-STRIPPED</text>
          </svg>
        );

      case 'leaky-coupler':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Hydraulic cylinder body */}
            <rect x="40" y="60" width="100" height="80" fill="#27272a" stroke="#ffffff" strokeWidth="2" />
            {/* Angled Coupler Stem */}
            <path
              d={`M 140 75 L ${180 + offset} 60 L ${185 + offset} 95 L 140 105 Z`}
              fill="#3f3f46"
              stroke="#ef4444"
              strokeWidth="2"
            />
            {/* Sideways Hydraulic Spray Jets */}
            <line x1={180 + offset} y1="60" x2="200" y2="20" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="3,2" />
            <line x1={185 + offset} y1="75" x2="200" y2="45" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="3,2" />
            <line x1={185 + offset} y1="95" x2="200" y2="80" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="3,2" />
            <text x="25" y="165" fill="#facc15" fontSize="9" fontFamily="monospace">SPRAYS AT 45° ANGLE</text>
          </svg>
        );

      case 'oval-washer':
      default:
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Lopsided Oval Outer Ring */}
            <ellipse cx="100" cy="100" rx="82" ry={60 + offset * 0.8} fill="#27272a" stroke="#ffffff" strokeWidth="2" />
            {/* Severely offset inner hole (almost breaking the wall) */}
            <circle cx={145 + offset * 0.6} cy="100" r="28" fill="#18181b" stroke="#ef4444" strokeWidth="2.5" />
            <line x1="173" y1="100" x2="182" y2="100" stroke="#facc15" strokeWidth="2" />
            <text x="20" y="180" fill="#facc15" fontSize="9" fontFamily="monospace">0.2mm WALL REMAINING</text>
          </svg>
        );
    }
  };

  return (
    <section id="gallery" className="py-16 px-4 bg-zinc-950 font-mono text-zinc-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-4 border-red-600 pb-6 mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-red-950 text-red-400 border border-red-600 px-3 py-1 rounded text-xs font-bold uppercase mb-2">
              <Crosshair className="w-4 h-4 text-red-500 animate-spin" style={{ animationDuration: '8s' }} />
              CATALOG OF SUB-STANDARD PRECISION
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
              LOPSIDED WIDGETS & MISALIGNED BOLTS
            </h2>
            <p className="text-zinc-400 text-xs md:text-sm mt-1 max-w-2xl">
              Every component is machined on multi-axis equipment programmed by engineers who reject right angles on moral grounds.
            </p>
          </div>

          {/* Interactive Imprecision Multiplier Slider */}
          <div className="bg-zinc-900 border-2 border-red-600 p-3 rounded-lg flex flex-col gap-1.5 min-w-[240px]">
            <div className="flex justify-between items-center text-xs">
              <span className="text-yellow-400 font-bold flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5" />
                Imprecision Multiplier:
              </span>
              <span className="text-white font-black bg-red-950 px-2 py-0.5 rounded border border-red-600">
                {imprecisionMultiplier.toFixed(1)}x
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="3.0"
              step="0.1"
              value={imprecisionMultiplier}
              onChange={(e) => setImprecisionMultiplier(parseFloat(e.target.value))}
              className="accent-red-500 cursor-pointer h-1.5 bg-zinc-800 rounded"
            />
            <span className="text-[10px] text-zinc-500">
              Slide right to make bolt holes wander further into the abyss
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8 text-xs">
          {['all', 'flange', 'bracket', 'fastener', 'bearing', 'thermal', 'hydraulic'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded uppercase font-bold transition cursor-pointer border ${
                categoryFilter === cat
                  ? 'bg-red-600 text-white border-red-500 shadow-md'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-600'
              }`}
            >
              {cat}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 text-xs text-yellow-300 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded">
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Scrap Bucket: <strong>{scrapCount}</strong> parts collected</span>
          </div>
        </div>

        {/* Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredParts.map((part) => (
            <div
              key={part.id}
              className="bg-zinc-900/90 border-2 border-zinc-800 hover:border-red-500 rounded-lg p-4 flex flex-col justify-between transition-all duration-200 group shadow-lg relative overflow-hidden"
            >
              {/* Part ID Badge */}
              <div className="flex justify-between items-center text-[10px] text-zinc-500 border-b border-zinc-800 pb-2 mb-3">
                <span className="font-bold text-red-400">{part.partNumber}</span>
                <span className="bg-zinc-800 px-1.5 py-0.5 rounded uppercase text-zinc-400">{part.category}</span>
              </div>

              {/* Interactive SVG Blueprint Display */}
              <div
                onClick={() => handleInspect(part)}
                className="bg-zinc-950 border border-zinc-800 rounded p-3 mb-3 aspect-square cursor-pointer relative overflow-hidden flex items-center justify-center group-hover:border-red-500 transition"
                title="Click to open digital caliper inspection station"
              >
                {/* Blueprint Background Grid */}
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:16px_16px]" />
                
                {renderPartSVG(part.renderType, imprecisionMultiplier)}

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  <span className="bg-black/90 text-yellow-300 text-[10px] px-2 py-1 rounded font-bold border border-yellow-400 flex items-center gap-1 shadow">
                    <Ruler className="w-3 h-3" />
                    MEASURE WITH CALIPERS
                  </span>
                </div>
              </div>

              {/* Part Description & Delta */}
              <div className="space-y-2">
                <h3 className="font-black text-sm text-white group-hover:text-red-400 transition leading-snug">
                  {part.name}
                </h3>
                
                <div className="bg-black/70 p-2 rounded border border-zinc-800 text-[11px] space-y-1">
                  <div>
                    <span className="text-zinc-500 uppercase text-[9px] block">Target Blueprint:</span>
                    <span className="text-zinc-300 font-medium">{part.nominalSpecs}</span>
                  </div>
                  <div>
                    <span className="text-red-400 uppercase text-[9px] block font-bold">Factory Defect:</span>
                    <span className="text-red-300 font-semibold">{part.actualFlaw}</span>
                  </div>
                </div>

                <div className="text-[10px] text-yellow-300 font-mono font-bold">
                  ⚠️ {part.toleranceDelta}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between gap-2">
                <span className="text-xs font-black text-white">{part.price}</span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => handleInspect(part)}
                    className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-yellow-400 rounded border border-zinc-700 cursor-pointer transition"
                    title="Inspect with Digital Calipers"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleAddToScrap(part)}
                    className="bg-red-600 hover:bg-red-500 text-white font-extrabold px-2.5 py-1.5 rounded text-[11px] cursor-pointer transition active:scale-95 shadow flex items-center gap-1"
                  >
                    <ShoppingCart className="w-3 h-3" />
                    BUY RUINED
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Digital Caliper Inspection Modal */}
        {showInspector && selectedPart && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <div className="max-w-3xl w-full bg-zinc-950 border-4 border-red-600 rounded-lg p-6 font-mono text-zinc-100 shadow-[0_0_60px_rgba(239,68,68,0.4)] relative">
              <button
                onClick={() => setShowInspector(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded"
              >
                ✕
              </button>

              <div className="flex items-center gap-2 text-red-500 text-xs font-bold uppercase mb-2">
                <Ruler className="w-4 h-4" />
                DIGITAL MITUTOYO SUB-ACCURACY CALIPER STATION
              </div>
              <h3 className="text-2xl font-black text-white uppercase">
                INSPECTING: {selectedPart.name}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 items-center">
                {/* SVG Blueprint Canvas */}
                <div className="bg-zinc-900 border-2 border-red-500/60 rounded p-4 aspect-square flex items-center justify-center relative">
                  <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:16px_16px]" />
                  {renderPartSVG(selectedPart.renderType, imprecisionMultiplier * 1.3)}
                </div>

                {/* Digital Caliper Readout Panel */}
                <div className="space-y-4">
                  {/* Digital LCD screen */}
                  <div className="bg-[#1f2937] border-4 border-[#374151] p-4 rounded shadow-inner">
                    <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest flex justify-between">
                      <span>Mitutoyo LCD Readout</span>
                      <span className="text-red-400 animate-pulse">BATTERY DYING</span>
                    </div>
                    <div className="text-4xl font-black text-emerald-300 font-mono tracking-wider my-2">
                      {(25.0 + 8.42 * imprecisionMultiplier).toFixed(3)} mm
                    </div>
                    <div className="text-[11px] text-zinc-400 flex justify-between border-t border-zinc-700 pt-1">
                      <span>Nominal Blueprint: 25.000mm</span>
                      <span className="text-red-400 font-bold">Delta: +{(8.42 * imprecisionMultiplier).toFixed(3)}mm</span>
                    </div>
                  </div>

                  {/* Quality Assurance Certificate */}
                  <div className="bg-zinc-900 p-3 rounded border border-zinc-800 text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-zinc-500 uppercase">QA Status:</span>
                      <span className="text-red-400 font-black">REJECTED BY REALITY</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500 uppercase">Perpendicularity:</span>
                      <span className="text-yellow-400 font-bold">Unrecognizable</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500 uppercase">Suggested Solution:</span>
                      <span className="text-zinc-300">Force it with a 10-ton hydraulic press</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      handleAddToScrap(selectedPart);
                      setShowInspector(false);
                    }}
                    className="w-full bg-red-600 hover:bg-red-500 text-white font-black py-2.5 rounded uppercase tracking-wider text-xs cursor-pointer shadow transition active:scale-95"
                  >
                    SHIP THIS EXACT CROOKED PART TO MY SHOP
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
