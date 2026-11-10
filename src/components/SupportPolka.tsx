import React, { useState } from 'react';
import { Music, PhoneCall, Headphones, HelpCircle, Volume2, ShieldAlert } from 'lucide-react';
import { soundHazard } from '../utils/audioEngine';

export const SupportPolka: React.FC = () => {
  const [callerQueue, setCallerQueue] = useState<number>(4921);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isCalling, setIsCalling] = useState<boolean>(false);

  const handleCallSupport = async () => {
    setIsCalling(true);
    await soundHazard.unlock();
    soundHazard.setPolkaState(true);
    setCallerQueue((prev) => prev + 1);
  };

  const faqs = [
    {
      q: 'Why won’t my pump flange bolt to the OCD CNC engine block?',
      a: 'This is working as intended. The holes are drilled in a Fibonacci spiral to honor our deep respect for mathematics. Please rotate your pump 17 degrees and hammer until flush.',
    },
    {
      q: 'Can I speak with a real human machinist to request a refund?',
      a: 'All human representatives were permanently replaced in 2008 by an unceasing loop of upbeat Bavarian polka. Research indicates polka lowers refund requests by 99.8%.',
    },
    {
      q: 'Why is the polka playing in 2/4 time while my drill bit is spinning at 60Hz?',
      a: 'The polyrhythm created between the polka and the spindle creates a resonant frequency that naturally vibrates all fasteners into a permanent state of cross-threading.',
    },
    {
      q: 'Can I silence this polka music?',
      a: 'Under Section 12-B of our Terms of Imprecision, customers who mute the polka forfeit their right to complain about non-perpendicular surfaces.',
    },
  ];

  return (
    <section id="support" className="py-16 px-4 bg-zinc-900 border-t-4 border-amber-500 font-mono text-zinc-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500 px-3 py-1 rounded text-amber-400 text-xs font-bold mb-3 uppercase tracking-wider">
            <Music className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
            24/7 SENSORY CUSTOMER ASSISTANCE
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
            SUPPORT DESK (POLKA ONLY ON LOOP)
          </h2>
          <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
            Need urgent technical help with your lopsided assembly? Our automated support hotline does not accept voice inputs, emails, or tickets. We only transmit upbeat, relentless 120-BPM Bavarian polka directly into your eardrums.
          </p>
        </div>

        {/* Interactive Support Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Polka Player & Live Operator Terminal */}
          <div className="lg:col-span-7 bg-zinc-950 border-4 border-amber-500 p-6 rounded-lg shadow-2xl relative overflow-hidden transform -rotate-0.5">
            {/* Visualizer Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-5">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
                <Headphones className="w-5 h-5 animate-pulse" />
                <span>BAVARIAN POLKA BROADCAST NODE #7</span>
              </div>
              <div className="flex items-center gap-1.5 bg-amber-950 px-2 py-1 rounded border border-amber-600 text-[10px] text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                LIVE POLKA STREAM
              </div>
            </div>

            {/* Animated Accordionist SVG */}
            <div className="bg-zinc-900 border border-zinc-800 rounded p-4 flex flex-col sm:flex-row items-center justify-around gap-6 mb-6">
              {/* Accordion Graphic */}
              <div className="text-center">
                <svg viewBox="0 0 160 140" className="w-40 h-36">
                  {/* Tuba */}
                  <path d="M 20 120 C 10 90, 10 50, 45 40 L 45 60 C 30 65, 30 90, 35 120 Z" fill="#f59e0b" />
                  <ellipse cx="45" cy="40" rx="18" ry="12" fill="#d97706" />
                  
                  {/* Accordion Bellows (Pumping animation) */}
                  <g className="animate-pulse" style={{ animationDuration: '0.5s' }}>
                    <rect x="60" y="45" width="10" height="60" fill="#dc2626" rx="2" />
                    <rect x="72" y="42" width="10" height="66" fill="#facc15" rx="2" />
                    <rect x="84" y="45" width="10" height="60" fill="#dc2626" rx="2" />
                    <rect x="96" y="42" width="10" height="66" fill="#facc15" rx="2" />
                    <rect x="108" y="45" width="10" height="60" fill="#dc2626" rx="2" />
                  </g>
                  {/* Accordion Keys */}
                  <rect x="120" y="40" width="14" height="70" fill="#ffffff" stroke="#18181b" strokeWidth="2" />
                  <rect x="123" y="45" width="4" height="15" fill="#000000" />
                  <rect x="123" y="65" width="4" height="15" fill="#000000" />
                  <rect x="123" y="85" width="4" height="15" fill="#000000" />
                  {/* Left Bass Buttons */}
                  <rect x="46" y="40" width="12" height="70" fill="#ffffff" stroke="#18181b" strokeWidth="2" />
                  <circle cx="52" cy="50" r="2" fill="#000000" />
                  <circle cx="52" cy="62" r="2" fill="#000000" />
                  <circle cx="52" cy="74" r="2" fill="#000000" />
                  <circle cx="52" cy="86" r="2" fill="#000000" />
                  {/* Sound Wave Rings */}
                  <circle cx="145" cy="30" r="8" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" />
                  <circle cx="150" cy="25" r="14" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,4" />
                </svg>
                <div className="text-[11px] font-bold text-amber-400 mt-1">
                  Synthetic Accordion Mk IV
                </div>
              </div>

              {/* Bouncing Equalizer Bars */}
              <div className="flex-1 w-full flex flex-col justify-center">
                <div className="text-[10px] text-zinc-400 uppercase tracking-widest mb-1.5 flex justify-between">
                  <span>Polka Harmonic Output:</span>
                  <span className="text-yellow-400 font-bold">120 BPM OOM-PAH</span>
                </div>
                <div className="flex items-end gap-1.5 h-16 bg-black/80 p-2 rounded border border-zinc-800">
                  {[45, 85, 30, 95, 60, 100, 75, 40, 90, 65, 80, 50, 95, 70].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-amber-500 rounded-t animate-pulse"
                      style={{
                        height: `${h}%`,
                        animationDuration: `${0.3 + (i % 4) * 0.15}s`,
                        animationDelay: `${i * 0.05}s`,
                      }}
                    />
                  ))}
                </div>
                <div className="text-[9px] text-zinc-500 mt-1 flex justify-between">
                  <span>Tuba Bass (49Hz)</span>
                  <span>Lead Accordion (523Hz)</span>
                </div>
              </div>
            </div>

            {/* Hold Queue Status */}
            <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded mb-5 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">YOUR CURRENT CALL QUEUE POSITION:</span>
                <span className="text-2xl font-black text-amber-400">#{callerQueue}</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-zinc-500">Estimated Human Operator Wait:</span>
                <span className="text-red-400 font-bold">19 Business Weeks</span>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded overflow-hidden">
                <div className="bg-amber-500 h-full w-[2%]"></div>
              </div>
            </div>

            {/* Dispatch Call Button */}
            <button
              onClick={handleCallSupport}
              className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black py-3 px-4 rounded text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg transition active:scale-95"
            >
              <PhoneCall className="w-5 h-5" />
              {isCalling ? 'POLKA DISPATCH ACTIVATED (ENJOY)' : 'CALL SUPPORT & UNLEASH POLKA'}
            </button>
          </div>

          {/* FAQ & Policy Panel */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-zinc-950 border-2 border-zinc-800 p-5 rounded-lg">
              <h3 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-2 mb-3">
                <HelpCircle className="w-5 h-5 text-amber-400" />
                FREQUENTLY UNANSWERED QUESTIONS
              </h3>
              
              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="border border-zinc-800 bg-zinc-900/60 rounded overflow-hidden text-xs"
                  >
                    <button
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      className="w-full p-3 text-left font-bold text-zinc-200 hover:text-amber-400 flex justify-between items-center cursor-pointer transition"
                    >
                      <span>{faq.q}</span>
                      <span className="text-amber-500 ml-2">{activeFaq === idx ? '−' : '+'}</span>
                    </button>
                    {activeFaq === idx && (
                      <div className="p-3 bg-zinc-950/80 border-t border-zinc-800 text-zinc-400 leading-relaxed text-[11px]">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer box */}
            <div className="bg-red-950/40 border border-red-600/60 p-4 rounded text-[11px] text-zinc-300 flex items-start gap-2.5">
              <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-red-400 uppercase block font-bold">
                  POLKA RETENTION GUARANTEE
                </strong>
                If the upbeat polka fails to soothe your fury over a 6mm misaligned bolt pattern, please listen for an additional 40 minutes before calling an ambulance.
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
