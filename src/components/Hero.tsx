import React, { useState } from 'react';
import { Flame, AlertTriangle, Compass, Music, Crosshair, ArrowDown, ExternalLink, ShieldAlert, Zap } from 'lucide-react';
import { soundHazard } from '../utils/audioEngine';

interface Props {
  onOpenCombust: () => void;
  onOpenPizza: () => void;
  onTrigger404: () => void;
}

export const Hero: React.FC<Props> = ({
  onOpenCombust,
  onOpenPizza,
  onTrigger404,
}) => {
  const [combustHoverCount, setCombustHoverCount] = useState<number>(0);
  const [jitterAngle, setJitterAngle] = useState<number>(-0.8);

  const handleCombustMouseEnter = () => {
    setCombustHoverCount((prev) => prev + 1);
    setJitterAngle((prev) => (prev > 0 ? -1.4 : 1.2));
  };

  return (
    <section id="hero" className="relative pt-12 pb-20 px-4 bg-zinc-950 text-white font-mono overflow-hidden">
      {/* Industrial Grid Lines & Visual Distortion */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Off-Center Warning Stripe Tape (Diagonal) */}
      <div className="absolute -top-6 left-0 right-0 h-4 bg-[repeating-linear-gradient(45deg,#dc2626,#dc2626_15px,#000000_15px,#000000_30px)] shadow-md" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Machinery Dispatch Tag */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 bg-red-950 border-2 border-red-600 px-3 py-1 rounded text-red-400 text-xs font-black uppercase tracking-wider transform -rotate-1">
            <Crosshair className="w-4 h-4 text-red-500 animate-spin" style={{ animationDuration: '6s' }} />
            <span>SUB-MILLIMETER IMPRECISION GUARANTEE • ±3.4mm OFFSET</span>
          </div>

          <div className="text-[11px] text-zinc-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>SHOP FLOOR STATUS: <strong className="text-yellow-400">UNCONTROLLABLY ASYMMETRIC</strong></span>
          </div>
        </div>

        {/* Main Brutalist Hero Heading */}
        <div className="max-w-5xl">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none select-none">
            <span className="text-white block">WE MACHINE</span>
            <span className="text-red-600 block transform -rotate-0.5 mt-1">
              EVERY PART
            </span>
            <span className="text-zinc-400 block text-3xl sm:text-5xl md:text-6xl mt-2 tracking-normal">
              SLIGHTLY <span className="underline decoration-red-600 decoration-wavy text-white">OFF-CENTER</span>
            </span>
          </h1>

          <p className="text-zinc-300 text-sm sm:text-base md:text-lg mt-6 max-w-3xl leading-relaxed border-l-4 border-red-600 pl-4 bg-zinc-900/60 p-3 rounded-r">
            Welcome to <strong className="text-white">OCD CNC Manufacturing</strong>. We operate multi-million dollar, 5-axis German machining centers with laser interferometers, exclusively programmed to ensure no two bolt holes ever share a bolt circle. If your assembly fits on the first try, we will happily recall the entire batch and drill it crooked for free.
          </p>
        </div>

        {/* The Idiotic CTA: Click Here To Spontaneously Combust */}
        <div className="my-10 p-6 bg-zinc-900/90 border-4 border-red-600 rounded-xl shadow-[0_0_40px_rgba(220,38,38,0.35)] relative overflow-hidden transform -rotate-0.5">
          {/* Hazard Border Stripes */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-[repeating-linear-gradient(45deg,#facc15,#facc15_10px,#000000_10px,#000000_20px)]" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-yellow-400 font-black text-xs uppercase tracking-widest">
                <AlertTriangle className="w-4 h-4 text-yellow-400 animate-bounce" />
                PEAK ABSURDITY DISPATCH PROTOCOL
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase">
                READY TO SURRENDER YOUR FLESH TO ASYMMETRY?
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm max-w-xl">
                For visitors experiencing acute sensory overload from our misaligned flanges, relentless kazoo, and looping polka:
              </p>
            </div>

            {/* THE IDIOTIC CTA BUTTON */}
            <div className="shrink-0 text-center">
              <button
                onClick={onOpenCombust}
                onMouseEnter={handleCombustMouseEnter}
                style={{ transform: `rotate(${jitterAngle}deg)` }}
                className="group relative bg-red-600 hover:bg-red-500 text-white font-black px-8 py-5 rounded-lg text-base sm:text-lg uppercase tracking-wider shadow-[0_0_35px_rgba(239,68,68,0.8)] border-4 border-yellow-400 cursor-pointer transition-all duration-150 active:scale-95 animate-pulse"
              >
                <div className="flex items-center gap-3">
                  <Flame className="w-7 h-7 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
                  <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-black">
                    CLICK HERE TO SPONTANEOUSLY COMBUST
                  </span>
                  <Flame className="w-7 h-7 text-yellow-300" />
                </div>
              </button>

              <div className="text-[10px] text-zinc-500 mt-2 font-mono">
                {combustHoverCount > 0
                  ? `[Hesitation detected: ${combustHoverCount} hovers. Just click it.]`
                  : '⚠️ OSHA Safety Waiver automatically signed upon physical contact'}
              </div>
            </div>
          </div>
        </div>

        {/* Live Shop Floor Telemetry Readouts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-8 text-xs">
          <div className="bg-zinc-900 border border-zinc-800 p-3 rounded">
            <span className="text-zinc-500 block uppercase text-[10px]">Average Hole Misalignment:</span>
            <span className="text-xl font-black text-red-500 font-mono tracking-wider">+3.42 mm</span>
            <span className="text-[10px] text-zinc-400 block mt-0.5">Checked with bent wire</span>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-3 rounded">
            <span className="text-zinc-500 block uppercase text-[10px]">Right Angle Tolerance:</span>
            <span className="text-xl font-black text-yellow-400 font-mono tracking-wider">89.17°</span>
            <span className="text-[10px] text-zinc-400 block mt-0.5">Consistently tilted</span>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-3 rounded">
            <span className="text-zinc-500 block uppercase text-[10px]">Polka Hold Loop Tempo:</span>
            <span className="text-xl font-black text-amber-400 font-mono tracking-wider">120 BPM</span>
            <span className="text-[10px] text-zinc-400 block mt-0.5">Endless Bavarian joy</span>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-3 rounded">
            <span className="text-zinc-500 block uppercase text-[10px]">Chances Part Will Fit:</span>
            <span className="text-xl font-black text-emerald-400 font-mono tracking-wider">0.00%</span>
            <span className="text-[10px] text-zinc-400 block mt-0.5">Certified by ISO -9001</span>
          </div>
        </div>

        {/* Navigation CTAs to Key Sections */}
        <div className="flex flex-wrap gap-3 items-center justify-start pt-4 border-t border-zinc-800">
          <a
            href="#gallery"
            className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-4 py-2 rounded text-xs flex items-center gap-2 border border-zinc-700 transition"
          >
            <span>INSPECT LOPSIDED WIDGETS</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>

          <a
            href="#domains"
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold px-4 py-2 rounded text-xs flex items-center gap-2 shadow transition"
          >
            <span>OWN THESE DOMAINS ON ATOM.COM</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href="#leadership"
            className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold px-4 py-2 rounded text-xs flex items-center gap-2 border border-zinc-800 transition"
          >
            <Compass className="w-3.5 h-3.5 text-red-500" />
            <span>BROKEN COMPASS LEADERSHIP</span>
          </a>

          <a
            href="#support"
            className="bg-zinc-900 hover:bg-zinc-800 text-amber-400 font-bold px-4 py-2 rounded text-xs flex items-center gap-2 border border-zinc-800 transition"
          >
            <Music className="w-3.5 h-3.5 text-amber-400" />
            <span>24/7 POLKA HOTLINE</span>
          </a>

          <button
            onClick={onOpenPizza}
            className="bg-red-950/80 hover:bg-red-900 text-red-300 font-bold px-4 py-2 rounded text-xs flex items-center gap-2 border border-red-700 transition cursor-pointer"
          >
            <span>REQUEST QUOTE (ACCIDENTAL PIZZA)</span>
          </button>
        </div>

      </div>
    </section>
  );
};
