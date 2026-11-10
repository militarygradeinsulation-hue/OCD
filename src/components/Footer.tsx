import React from 'react';
import { Globe, AlertTriangle, ExternalLink, ShieldCheck, Flame } from 'lucide-react';
import { DOMAIN_LISTINGS } from '../data/mockData';

interface Props {
  onTrigger404: () => void;
  onOpenCombust: () => void;
  onOpenPizza: () => void;
  brokenMobileMode: boolean;
  onToggleBrokenMobile: () => void;
}

export const Footer: React.FC<Props> = ({
  onTrigger404,
  onOpenCombust,
  onOpenPizza,
  brokenMobileMode,
  onToggleBrokenMobile,
}) => {
  return (
    <footer className="bg-black border-t-4 border-red-600 font-mono text-zinc-400 py-12 px-4 text-xs">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Domain Buy Banner */}
        <div className="bg-zinc-950 border-2 border-dashed border-red-600 p-6 rounded-lg mb-10 text-center">
          <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
            WANT TO OWN THESE DOMAINS AND CONTROL THIS SITE?{' '}
            <span className="text-yellow-400">BUY HERE.</span>
          </h3>
          <p className="text-zinc-300 text-xs sm:text-sm mt-2 max-w-2xl mx-auto">
            Available on <strong className="text-yellow-400">Atom.com</strong> for a quick, secure transfer of ownership. Acquire the complete digital footprint:
          </p>

          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {DOMAIN_LISTINGS.map((d, i) => (
              <a
                key={i}
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 hover:border-yellow-400 px-3 py-1.5 rounded text-[11px] font-bold flex items-center gap-1 transition"
              >
                <span>{d.displayName}</span>
                <ExternalLink className="w-3 h-3 text-yellow-400" />
              </a>
            ))}
          </div>
        </div>

        {/* 4-column footer links (All dead ends to 404) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 text-[11px]">
          <div>
            <h4 className="font-black text-white uppercase mb-3 text-xs tracking-wider">
              IMPRECISION SPECS
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={onTrigger404} className="hover:text-red-400 transition cursor-pointer">
                  The 359° Circle Standard
                </button>
              </li>
              <li>
                <button onClick={onTrigger404} className="hover:text-red-400 transition cursor-pointer">
                  Negative Clearance Milling
                </button>
              </li>
              <li>
                <button onClick={onTrigger404} className="hover:text-red-400 transition cursor-pointer">
                  Tapered Flange Leaks
                </button>
              </li>
              <li>
                <button onClick={onTrigger404} className="hover:text-red-400 transition cursor-pointer">
                  Metre-to-Inch Disasters
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-white uppercase mb-3 text-xs tracking-wider">
              CERTIFICATIONS
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={onTrigger404} className="hover:text-red-400 transition cursor-pointer">
                  ISO -9001:2026 (Revoked)
                </button>
              </li>
              <li>
                <button onClick={onTrigger404} className="hover:text-red-400 transition cursor-pointer">
                  OSHA Near-Miss Honor Roll
                </button>
              </li>
              <li>
                <button onClick={onTrigger404} className="hover:text-red-400 transition cursor-pointer">
                  Institute of Guesswork
                </button>
              </li>
              <li>
                <button onClick={onTrigger404} className="hover:text-red-400 transition cursor-pointer">
                  Ballpark Precision Lab
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-white uppercase mb-3 text-xs tracking-wider">
              CUSTOMER RELATIONS
            </h4>
            <ul className="space-y-1.5">
              <li>
                <a href="#support" className="hover:text-amber-400 transition">
                  24/7 Polka Music Desk
                </a>
              </li>
              <li>
                <button onClick={onOpenPizza} className="hover:text-amber-400 transition cursor-pointer">
                  Gino's Pizza Emergency Order
                </button>
              </li>
              <li>
                <button onClick={onTrigger404} className="hover:text-amber-400 transition cursor-pointer">
                  Submit Warranty Complaint (404)
                </button>
              </li>
              <li>
                <button onClick={onOpenCombust} className="text-red-400 font-bold hover:text-red-300 transition cursor-pointer">
                  Spontaneous Combustion Portal
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-white uppercase mb-3 text-xs tracking-wider">
              MOBILE FIDELITY ENGINE
            </h4>
            <p className="text-zinc-500 text-[10px] leading-relaxed mb-3">
              Per strict corporate guidelines, mobile layouts are deliberately misaligned by 3.4mm.
            </p>
            <button
              onClick={onToggleBrokenMobile}
              className={`w-full py-2 px-3 rounded font-bold text-[10px] uppercase border transition cursor-pointer ${
                brokenMobileMode
                  ? 'bg-red-600 text-white border-red-400 shadow-md animate-pulse'
                  : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:border-zinc-500'
              }`}
            >
              📱 Mobile Brokenness: {brokenMobileMode ? 'MAXIMUM ROGUE (ACTIVE)' : 'STANDARD CROOKED'}
            </button>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="border-t border-zinc-900 pt-6 text-[10px] text-zinc-600 space-y-2 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>
            © {new Date().getFullYear()} OCD CNC Manufacturing Corp. All rights non-perpendicular. All bolt holes guaranteed 3.4mm to the left of your intended coordinates.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 font-bold">Atom.com Verified Escrow</span>
            <span>•</span>
            <span className="text-red-500 font-bold">Kazoo Powered</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
