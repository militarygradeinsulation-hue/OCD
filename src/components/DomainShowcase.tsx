import React from 'react';
import { ExternalLink, ShieldCheck, CheckCircle2, Globe, Sparkles, ArrowRight } from 'lucide-react';
import { DOMAIN_LISTINGS } from '../data/mockData';

export const DomainShowcase: React.FC = () => {
  return (
    <section id="domains" className="py-16 px-4 bg-zinc-950 border-t-4 border-red-600 font-mono text-zinc-100 relative overflow-hidden">
      {/* Background Graphic Accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Banner Headline */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400 px-3 py-1 rounded text-yellow-300 text-xs font-black mb-3 uppercase tracking-wider animate-pulse">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            OFFICIAL DOMAIN PORTFOLIO SALE
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-tight">
            WANT TO OWN THESE DOMAINS AND CONTROL THIS SITE?{' '}
            <span className="text-red-500 underline decoration-yellow-400 decoration-wavy">
              BUY HERE.
            </span>
          </h2>

          <p className="text-zinc-300 text-sm md:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
            Acquire the complete brand authority, trademarks, and internet real estate of the infamous{' '}
            <strong className="text-white">OCD CNC</strong> manufacturing legacy.
            Transactions are hosted on <strong className="text-yellow-400">Atom.com</strong>{' '}
            <span className="text-yellow-300 font-semibold">for a quick, secure transfer of ownership.</span>
          </p>

          {/* Atom Escrow Guarantee Badges */}
          <div className="flex flex-wrap justify-center items-center gap-4 mt-6 text-xs text-zinc-400">
            <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Atom.com Buyer Escrow Protection</span>
            </div>
            <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded">
              <CheckCircle2 className="w-4 h-4 text-yellow-400" />
              <span>Quick, Secure Transfer of Ownership</span>
            </div>
            <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded">
              <Globe className="w-4 h-4 text-blue-400" />
              <span>Immediate Registrar Push / Auth Code</span>
            </div>
          </div>
        </div>

        {/* Domain Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {DOMAIN_LISTINGS.map((domain, index) => (
            <div
              key={index}
              className={`bg-zinc-900/90 border-2 rounded-lg p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-xl relative ${
                domain.highlight
                  ? 'border-red-500 hover:border-yellow-400 shadow-[0_0_20px_rgba(239,68,68,0.2)]'
                  : 'border-zinc-700 hover:border-zinc-500'
              }`}
            >
              {domain.highlight && (
                <div className="absolute -top-3 right-4 bg-red-600 text-white font-black text-[10px] px-2 py-0.5 rounded uppercase tracking-wider shadow">
                  KEY ASSET
                </div>
              )}

              <div>
                <div className="flex items-center justify-between text-xs text-zinc-500 mb-2">
                  <span className="flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Atom Verified Domain</span>
                  </span>
                  <span className="text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-300">
                    Escrow Ready
                  </span>
                </div>

                <div className="text-xl md:text-2xl font-black text-white hover:text-yellow-400 transition break-all">
                  {domain.displayName}
                </div>

                <p className="text-zinc-400 text-xs mt-2 leading-relaxed">
                  {domain.tagline}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-4 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-[11px] text-zinc-400">
                  Transfers via <strong className="text-zinc-200">Atom.com</strong>
                </span>

                <a
                  href={domain.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold px-3 py-1.5 rounded text-xs flex items-center gap-1.5 shadow transition transform active:scale-95"
                >
                  <span>BUY HERE</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Global Transfer Notice Footer */}
        <div className="mt-10 bg-zinc-900 border border-zinc-800 p-6 rounded-lg text-center max-w-3xl mx-auto">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
            HOW THE OWNERSHIP TRANSFER WORKS
          </h4>
          <p className="text-xs text-zinc-400 leading-relaxed mb-4">
            Clicking any domain link securely routes you to the verified Atom.com domain management terminal. Atom acts as the licensed escrow agent to ensure rapid release of the EPP transfer authorization key or internal registrar account push.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://www.atom.com/name/OcdCnc"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-500 text-white font-black px-5 py-2 rounded text-xs uppercase flex items-center gap-2 shadow"
            >
              <span>OWN THE FLAGSHIP (OcdCnc)</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
