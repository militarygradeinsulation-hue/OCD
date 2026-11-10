import React, { useState } from 'react';
import { AlertOctagon, Wrench, RefreshCw, Pizza, Music, X } from 'lucide-react';
import { Error404Screen } from '../types';
import { RANDOM_404_ERRORS } from '../data/mockData';
import { soundHazard } from '../utils/audioEngine';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenPizza: () => void;
  onGoToPolka: () => void;
}

export const Random404Modal: React.FC<Props> = ({
  isOpen,
  onClose,
  onOpenPizza,
  onGoToPolka,
}) => {
  const [errorIndex, setErrorIndex] = useState<number>(0);
  const [hammerSmacks, setHammerSmacks] = useState<number>(0);
  const [isShaking, setIsShaking] = useState<boolean>(false);

  // Pick new random error whenever modal opens or retry clicked
  React.useEffect(() => {
    if (isOpen) {
      const idx = Math.floor(Math.random() * RANDOM_404_ERRORS.length);
      setErrorIndex(idx);
      soundHazard.playToolCrash();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentError = RANDOM_404_ERRORS[errorIndex] || RANDOM_404_ERRORS[0];

  const handleHammerSmack = () => {
    soundHazard.playToolCrash();
    setHammerSmacks((prev) => prev + 1);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 450);

    // After 3 smacks, rotate to a new error
    if (hammerSmacks % 3 === 2) {
      setErrorIndex((prev) => (prev + 1) % RANDOM_404_ERRORS.length);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md overflow-y-auto">
      <div
        className={`max-w-2xl w-full bg-zinc-950 border-4 border-red-600 rounded-lg p-6 md:p-8 shadow-[0_0_60px_rgba(239,68,68,0.5)] font-mono text-zinc-100 relative transition-transform ${
          isShaking ? 'scale-105 rotate-2 translate-x-2' : '-rotate-0.5'
        }`}
      >
        {/* Top Machine Console Bar */}
        <div className="flex items-center justify-between border-b-2 border-red-700 pb-3 mb-5">
          <div className="flex items-center gap-2 text-red-500">
            <AlertOctagon className="w-6 h-6 animate-pulse" />
            <span className="font-black text-sm tracking-widest uppercase">
              HAAS CNC OPERATOR SYSTEM FAILURE
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white p-1 rounded hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Code Headline */}
        <div className="bg-red-950/70 border-2 border-red-500 p-4 rounded mb-5 text-center">
          <div className="text-3xl md:text-5xl font-black text-red-500 tracking-wider">
            {currentError.code}
          </div>
          <div className="text-sm md:text-base font-bold text-yellow-300 mt-1 uppercase">
            {currentError.title}
          </div>
        </div>

        {/* Error Diagnostics Table */}
        <div className="space-y-3 bg-zinc-900 border border-zinc-800 p-4 rounded text-xs">
          <div>
            <span className="text-zinc-500 font-bold uppercase block">FAILURE DIAGNOSIS:</span>
            <p className="text-zinc-200 mt-0.5 text-sm leading-relaxed">{currentError.reason}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-zinc-800 text-[11px]">
            <div>
              <span className="text-zinc-500 font-bold uppercase block">Coolant Spill Level:</span>
              <span className="text-yellow-400 font-semibold">{currentError.coolantSpillLevel}</span>
            </div>
            <div>
              <span className="text-zinc-500 font-bold uppercase block">Spindle Runout:</span>
              <span className="text-red-400 font-semibold">+18.42mm (Uncontrolled)</span>
            </div>
          </div>

          <div className="pt-2 border-t border-zinc-800">
            <span className="text-zinc-500 font-bold uppercase block">RECOMMENDED WORKAROUND:</span>
            <p className="text-emerald-400 italic mt-0.5">{currentError.advice}</p>
          </div>
        </div>

        {/* Humorous Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-5 text-xs font-bold">
          <button
            onClick={handleHammerSmack}
            className="bg-yellow-500 hover:bg-yellow-400 text-black py-2.5 px-3 rounded flex items-center justify-center gap-1.5 cursor-pointer transition active:scale-95 shadow-md"
          >
            <Wrench className="w-4 h-4" />
            SMACK MACHINE WITH HAMMER ({hammerSmacks})
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenPizza();
            }}
            className="bg-red-700 hover:bg-red-600 text-white py-2.5 px-3 rounded flex items-center justify-center gap-1.5 cursor-pointer transition active:scale-95 shadow-md"
          >
            <Pizza className="w-4 h-4" />
            ROUTER TO GINO’S PIZZA HOTLINE
          </button>

          <button
            onClick={() => {
              onClose();
              onGoToPolka();
            }}
            className="bg-zinc-800 hover:bg-zinc-700 text-yellow-300 border border-zinc-700 py-2.5 px-3 rounded flex items-center justify-center gap-1.5 cursor-pointer transition active:scale-95"
          >
            <Music className="w-4 h-4" />
            LISTEN TO EMERGENCY POLKA
          </button>

          <button
            onClick={onClose}
            className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 py-2.5 px-3 rounded flex items-center justify-center gap-1.5 cursor-pointer transition active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            RETURN TO CROOKED HOMEPAGE
          </button>
        </div>

        <div className="text-[10px] text-zinc-600 text-center mt-4">
          All navigation hyperlinks at OCD CNC are deliberately mapped to dead ends because standard navigation conforms to perpendicular conventions.
        </div>
      </div>
    </div>
  );
};
