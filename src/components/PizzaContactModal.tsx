import React, { useState } from 'react';
import { Pizza, Send, AlertTriangle, CheckCircle, Phone, Truck, ShieldAlert, X } from 'lucide-react';
import { soundHazard } from '../utils/audioEngine';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const PizzaContactModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    companyName: 'Lockheed-Martin-ish',
    engineerName: 'Frank Asymmetry',
    alloy: 'Titanium Ti-6Al-4V (Aerospace)',
    tolerance: '±3.4mm (Guaranteed Crooked)',
    fileAttached: 'flange_spec_final_v12_DO_NOT_OFFCENTER.step',
    notes: 'Please ensure bolt holes line up with existing pump. This is critical.',
  });

  const [state, setState] = useState<'form' | 'routing' | 'pizza_confirmed'>('form');
  const [orderNumber, setOrderNumber] = useState<string>('GINO-9941');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setState('routing');
    soundHazard.playToolCrash();

    // After 1.2s of "routing", flip to Gino's Pizza receipt
    setTimeout(() => {
      setOrderNumber('GINO-' + Math.floor(1000 + Math.random() * 9000));
      setState('pizza_confirmed');
    }, 1300);
  };

  const handleReset = () => {
    setState('form');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="max-w-2xl w-full bg-zinc-950 border-4 border-red-600 rounded-lg p-6 md:p-8 shadow-[0_0_50px_rgba(220,38,38,0.5)] font-mono text-zinc-100 relative my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white p-1 rounded hover:bg-zinc-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {state === 'form' && (
          <div>
            {/* Header */}
            <div className="border-b-2 border-red-700 pb-3 mb-5">
              <div className="flex items-center gap-2 text-red-500">
                <ShieldAlert className="w-6 h-6" />
                <span className="text-xs uppercase tracking-widest font-bold text-zinc-400">
                  Customer RFQ Portal • Rev 4.19
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-red-500 uppercase tracking-tight mt-1">
                TRANSMIT RFQ TO ENGINEERING
              </h2>
              <p className="text-zinc-400 text-xs mt-1">
                Submit your precision blueprint. Our 5-axis machines will carefully adjust all coordinates by at least 3.4mm.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-400 font-bold block mb-1">Company / Organization:</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-white font-mono focus:border-red-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-zinc-400 font-bold block mb-1">Lead Engineer Name:</label>
                  <input
                    type="text"
                    value={formData.engineerName}
                    onChange={(e) => setFormData({ ...formData, engineerName: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-white font-mono focus:border-red-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-400 font-bold block mb-1">Raw Metal Alloy:</label>
                  <select
                    value={formData.alloy}
                    onChange={(e) => setFormData({ ...formData, alloy: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-white font-mono focus:border-red-500 focus:outline-none"
                  >
                    <option>Titanium Ti-6Al-4V (Aerospace)</option>
                    <option>6061-T6 Billet Aluminum</option>
                    <option>Hardened 4140 Chromoly</option>
                    <option>Mystery Scrap Found in Coolant Dump</option>
                  </select>
                </div>
                <div>
                  <label className="text-zinc-400 font-bold block mb-1">Required Tolerance:</label>
                  <select
                    value={formData.tolerance}
                    onChange={(e) => setFormData({ ...formData, tolerance: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-white font-mono focus:border-red-500 focus:outline-none"
                  >
                    <option>±3.4mm (Standard OCD Precision)</option>
                    <option>±14.8mm (Extra Shaky Hand)</option>
                    <option>±0.0001mm (Machine Will Chuck It Out Window)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1">CAD / Blueprint File:</label>
                <div className="border border-dashed border-zinc-700 bg-zinc-900/60 p-3 rounded text-center">
                  <span className="text-yellow-400 font-bold">{formData.fileAttached}</span>
                  <span className="text-zinc-500 text-[10px] block mt-1">(File will be rotated 4.2° upon upload)</span>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1">Machinist Instructions & Notes:</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-white font-mono focus:border-red-500 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-500 text-white font-black py-3 rounded uppercase tracking-wider text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg transition active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  TRANSMIT BLUEPRINT TO MACHINE SHOP
                </button>
              </div>
            </form>
          </div>
        )}

        {state === 'routing' && (
          <div className="text-center py-12 space-y-4">
            <div className="inline-block animate-spin text-red-500">
              <AlertTriangle className="w-16 h-16" />
            </div>
            <h3 className="text-xl font-black text-red-500 uppercase tracking-widest animate-pulse">
              ROUTING PACKET ACROSS INDUSTRIAL GATEWAY...
            </h3>
            <p className="text-zinc-400 text-xs">
              Resolving 192.168.1.4:5000 (Machining Server) ➔ <span className="text-yellow-400">FAILED</span>
            </p>
            <p className="text-red-400 text-xs font-mono font-bold">
              SWITCHBOARD ERROR #88: RJ45 PATCH CABLE DROPPED INTO DEEP FRYER
            </p>
          </div>
        )}

        {state === 'pizza_confirmed' && (
          <div>
            {/* Gino's Pizza Header */}
            <div className="bg-amber-600/20 border-2 border-amber-500 p-4 rounded mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-amber-500 text-black p-2 rounded-full">
                  <Pizza className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-amber-400 uppercase tracking-wide">
                    GINO & SAL’S 24/7 WOODFIRED PIZZA & BRAKE REPAIR
                  </h3>
                  <p className="text-[11px] text-zinc-300">
                    "We don't know what a 5-axis CNC is, but your large pie is in the oven!"
                  </p>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <span className="text-[10px] text-zinc-400 block">ORDER #</span>
                <span className="text-amber-400 font-bold text-sm">{orderNumber}</span>
              </div>
            </div>

            {/* Pizza Receipt & Order Details */}
            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded text-xs space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-400 font-bold">ORDER STATUS:</span>
                <span className="bg-emerald-950 text-emerald-400 border border-emerald-600 px-2 py-0.5 rounded text-[10px] font-bold">
                  DOUGH TOSSING IN PROGRESS
                </span>
              </div>

              <div className="space-y-1.5 text-zinc-300">
                <div className="flex justify-between">
                  <span>1x Large 18" Pepperoni Pie (Sliced into 7 uneven pieces)</span>
                  <span className="font-bold text-white">$26.50</span>
                </div>
                <div className="flex justify-between text-zinc-400 text-[11px]">
                  <span>+ Extra Anchovies & 400g Titanium Ti-6Al-4V Shavings</span>
                  <span>$4.00</span>
                </div>
                <div className="flex justify-between text-zinc-400 text-[11px]">
                  <span>+ Side of Garlic Knots baked in 10W-30 Lathe Spindle Oil</span>
                  <span>$3.50</span>
                </div>
                <div className="flex justify-between border-t border-zinc-800 pt-2 font-bold text-white text-sm">
                  <span>TOTAL CHARGED TO {formData.companyName.toUpperCase()}:</span>
                  <span className="text-yellow-400">$34.00</span>
                </div>
              </div>

              {/* Pizza Tracker Timeline */}
              <div className="bg-black/70 p-3 rounded border border-zinc-800 mt-3 space-y-2 text-[11px]">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>Dough tossed 3.4mm off-center (Completed)</span>
                </div>
                <div className="flex items-center gap-2 text-yellow-400 font-bold">
                  <Pizza className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />
                  <span>Marinara sauce applied in non-concentric spirals (Current)</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-500">
                  <Truck className="w-4 h-4" />
                  <span>Sal driving rusted 1997 Civic toward your machine shop (ETA: 18 min)</span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-2 justify-center mt-5">
              <button
                onClick={handleReset}
                className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold px-4 py-2 rounded text-xs cursor-pointer"
              >
                TRY TRANSMITTING CAD AGAIN
              </button>
              <button
                onClick={onClose}
                className="bg-amber-500 hover:bg-amber-400 text-black font-extrabold px-5 py-2 rounded text-xs cursor-pointer"
              >
                ACCEPT PIZZA INSTEAD OF CNC QUOTE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
