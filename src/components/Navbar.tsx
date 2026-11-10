import React from 'react';
import { Flame, AlertTriangle, ShieldCheck, ShoppingCart, Menu, Globe } from 'lucide-react';

interface Props {
  onTrigger404: () => void;
  onOpenCombust: () => void;
  onOpenPizza: () => void;
}

export const Navbar: React.FC<Props> = ({
  onTrigger404,
  onOpenCombust,
  onOpenPizza,
}) => {
  return (
    <nav className="bg-zinc-950/95 border-b-2 border-red-600 font-mono text-zinc-100 sticky top-7 z-40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        
        {/* Pointy X + OCD Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2 group cursor-pointer select-none transform -rotate-1 hover:rotate-1 transition-transform"
        >
          {/* Logo SVG: Sharp Pointy X entwined with O C D */}
          <div className="relative w-10 h-10 flex items-center justify-center bg-zinc-900 border-2 border-red-500 rounded p-1 shadow-[0_0_15px_rgba(239,68,68,0.4)]">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Pointy sharp X in Red */}
              <polygon
                points="15,10 50,45 85,10 95,20 60,55 95,90 85,100 50,65 15,100 5,90 40,55 5,20"
                fill="#dc2626"
                stroke="#ffffff"
                strokeWidth="2"
              />
              {/* Entwined letters O C D with intentional offset */}
              <text
                x="50"
                y="58"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="24"
                fontWeight="900"
                fontFamily="monospace"
                className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
              >
                OCD
              </text>
            </svg>
            {/* Visual off-center crosshair indicator */}
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-yellow-400 rounded-full animate-ping" />
          </div>

          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black tracking-tighter text-white group-hover:text-red-500 transition">
                OCD<span className="text-red-500">CNC</span>
              </span>
              <span className="text-[10px] text-zinc-500 font-bold hidden sm:inline">
                MFG.
              </span>
            </div>
            <div className="text-[9px] text-red-400 font-mono tracking-widest uppercase -mt-1">
              TOLERANCE: ±NEVER
            </div>
          </div>
        </a>

        {/* Navigation links - ALL ROUTED TO 404 */}
        <div className="hidden lg:flex items-center gap-1 text-xs">
          {[
            { label: 'Precision Standards', tag: 'OFF-CENTER' },
            { label: 'ISO -9001 Specs', tag: 'RECALLED' },
            { label: '5-Axis Spindles', tag: 'WOBBLY' },
            { label: 'Careers (Shaky Hands)', tag: 'HIRING' },
            { label: 'Investor Panic', tag: 'BEARISH' },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={onTrigger404}
              className="px-2.5 py-1.5 text-zinc-300 hover:text-white hover:bg-red-950/60 rounded border border-transparent hover:border-red-600 transition cursor-pointer flex items-center gap-1 text-[11px]"
              title={`Click to navigate to ${item.label} (Guaranteed 404)`}
            >
              <span>{item.label}</span>
              <span className="text-[9px] bg-zinc-800 text-yellow-400 px-1 py-0.2 rounded font-mono">
                {item.tag}
              </span>
            </button>
          ))}
        </div>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2">
          
          {/* Domains Portfolio Quick Link */}
          <a
            href="#domains"
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold px-2.5 py-1.5 rounded text-xs flex items-center gap-1 shadow cursor-pointer transition transform hover:scale-105"
            title="Want to own these domains and control this site? Buy here."
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">BUY DOMAINS</span>
            <span className="sm:hidden">DOMAINS</span>
          </a>

          {/* Pizza Quote Link */}
          <button
            onClick={onOpenPizza}
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-bold px-2.5 py-1.5 rounded text-xs cursor-pointer transition hidden md:flex items-center gap-1"
          >
            <span>GET QUOTE (PIZZA)</span>
          </button>

          {/* The Idiotic CTA in Nav */}
          <button
            onClick={onOpenCombust}
            className="bg-red-600 hover:bg-red-500 text-white font-black px-3 py-1.5 rounded text-xs uppercase flex items-center gap-1 shadow-[0_0_15px_rgba(220,38,38,0.6)] cursor-pointer transition transform active:scale-95 animate-pulse"
            title="Click Here To Spontaneously Combust"
          >
            <Flame className="w-3.5 h-3.5 text-yellow-300" />
            <span className="hidden md:inline">SPONTANEOUSLY COMBUST</span>
            <span className="md:hidden">COMBUST</span>
          </button>

          {/* Mobile hamburger menu (also triggers 404!) */}
          <button
            onClick={onTrigger404}
            className="lg:hidden p-1.5 bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white rounded"
            title="Menu (Leads to 404)"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

      </div>
    </nav>
  );
};
