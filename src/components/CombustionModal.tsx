import React, { useEffect, useRef, useState } from 'react';
import { Flame, Skull, RefreshCw, Printer, AlertTriangle } from 'lucide-react';
import { soundHazard } from '../utils/audioEngine';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
}

export const CombustionModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [combustionStep, setCombustionStep] = useState<'exploding' | 'certified'>('exploding');
  const [ashWeight, setAshWeight] = useState<string>('0.14 kg');
  const [sparksCount, setSparksCount] = useState<number>(0);

  useEffect(() => {
    if (!isOpen) {
      setCombustionStep('exploding');
      return;
    }

    // Play explosion sound effect
    soundHazard.playCombustionBlast();
    setCombustionStep('exploding');
    setAshWeight((0.08 + Math.random() * 0.2).toFixed(2) + ' kg');

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#ef4444', '#f97316', '#eab308', '#ffffff', '#71717a', '#000000'];
    const particles: Particle[] = [];

    // Spawn 220 explosive particles from screen center
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < 240; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 18;
      particles.push({
        x: centerX + (Math.random() - 0.5) * 60,
        y: centerY + (Math.random() - 0.5) * 60,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 3 + Math.random() * 12,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: 0.007 + Math.random() * 0.015,
      });
    }

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // gravity
        p.alpha -= p.decay;

        if (p.alpha > 0) {
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      if (particles.some((p) => p.alpha > 0)) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    // After 1.6s, show the certificate
    const certTimer = setTimeout(() => {
      setCombustionStep('certified');
    }, 1600);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(certTimer);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      {/* Particle Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-10 w-full h-full"
      />

      {combustionStep === 'exploding' ? (
        <div className="relative z-20 text-center text-white font-mono animate-bounce">
          <Flame className="w-24 h-24 text-red-500 mx-auto animate-pulse" />
          <h1 className="text-4xl md:text-6xl font-black text-red-500 uppercase tracking-widest drop-shadow-[0_0_25px_rgba(239,68,68,0.9)]">
            CRITICAL THERMAL EVENT IN PROGRESS
          </h1>
          <p className="text-yellow-300 text-lg mt-3">
            DISSOLVING MOLECULAR BONDS ACROSS ALL 3.4mm MISALIGNED AXES...
          </p>
          <div className="mt-4 text-xs text-zinc-400">
            Hold tight. Collecting remaining carbon flakes.
          </div>
        </div>
      ) : (
        <div className="relative z-20 max-w-2xl w-full bg-zinc-950 border-4 border-red-600 p-6 md:p-8 rounded-lg shadow-[0_0_50px_rgba(220,38,38,0.4)] text-zinc-100 font-mono transform rotate-0.5 my-8">
          {/* Header banner */}
          <div className="text-center border-b-2 border-dashed border-red-700 pb-4 mb-6">
            <div className="flex justify-center items-center gap-2 text-red-500 mb-1">
              <Skull className="w-8 h-8 text-red-500 animate-spin" style={{ animationDuration: '8s' }} />
              <span className="text-xs uppercase tracking-widest font-black text-zinc-400">
                Department of Uncontrolled Thermodynamic Release
              </span>
              <Skull className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-red-500 uppercase tracking-tight">
              CERTIFICATE OF SPONTANEOUS COMBUSTION
            </h2>
            <p className="text-xs text-yellow-300 mt-1">
              DOCUMENT NO: OCD-PYRO-9941-FLAME • CLASSIFICATION: 100% UNINTENDED
            </p>
          </div>

          {/* Certificate Body */}
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded text-xs space-y-3 leading-relaxed">
            <p>
              This document solemnly attests that on{' '}
              <strong className="text-white underline decoration-red-500">
                {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
              </strong>
              , the esteemed site visitor voluntarily (and with baffling enthusiasm) clicked the red button marked{' '}
              <strong className="text-red-400">"Click Here To Spontaneously Combust"</strong> and achieved instantaneous 
              molecular vaporization.
            </p>

            <div className="grid grid-cols-2 gap-3 bg-black/60 p-3 rounded border border-zinc-800 text-[11px]">
              <div>
                <span className="text-zinc-500 uppercase block">Remaining Carbon Ash:</span>
                <span className="text-yellow-400 font-bold text-sm">{ashWeight}</span>
              </div>
              <div>
                <span className="text-zinc-500 uppercase block">Estimated Scrap Value:</span>
                <span className="text-emerald-400 font-bold text-sm">$0.14 USD</span>
              </div>
              <div>
                <span className="text-zinc-500 uppercase block">Peak Temperature Reached:</span>
                <span className="text-red-400 font-bold text-sm">4,812° F</span>
              </div>
              <div>
                <span className="text-zinc-500 uppercase block">Nearest Pizza Shop Notified:</span>
                <span className="text-white font-bold text-sm">Gino's Brick Oven</span>
              </div>
            </div>

            <p className="text-zinc-400 italic">
              "We told you not to click it. We put hazard tape on it. We made it neon red. Yet here you are, a pile of warm dust on our clean shop floor. Someone bring the shop vacuum."
            </p>

            <div className="flex justify-between items-center pt-2 border-t border-zinc-800 text-[10px] text-zinc-500">
              <div>
                <div className="font-bold text-zinc-300">C. "CHUCK" WOBBLY</div>
                <div>Chief Combustion Officer</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-zinc-300">DR. BRENDA CALIPER</div>
                <div>Witness of Ash Dispersal</div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 justify-center mt-6">
            <button
              onClick={onClose}
              className="bg-red-600 hover:bg-red-500 text-white font-black px-6 py-2.5 rounded shadow-lg flex items-center gap-2 cursor-pointer transition transform active:scale-95 text-xs uppercase"
            >
              <RefreshCw className="w-4 h-4" />
              REASSEMBLE FLESH PARTICLES (RESET)
            </button>

            <button
              onClick={() => window.print()}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold px-4 py-2.5 rounded border border-zinc-700 flex items-center gap-1.5 cursor-pointer text-xs uppercase"
            >
              <Printer className="w-4 h-4" />
              PRINT ASH CERTIFICATE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
