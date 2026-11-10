import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { SoundHazardBanner } from './components/SoundHazardBanner';
import { Hero } from './components/Hero';
import { DomainShowcase } from './components/DomainShowcase';
import { LopsidedGallery } from './components/LopsidedGallery';
import { LeadershipSection } from './components/LeadershipSection';
import { SupportPolka } from './components/SupportPolka';
import { Footer } from './components/Footer';
import { EnduranceGauge } from './components/EnduranceGauge';
import { CombustionModal } from './components/CombustionModal';
import { Random404Modal } from './components/Random404Modal';
import { PizzaContactModal } from './components/PizzaContactModal';

export default function App() {
  const [isCombustOpen, setIsCombustOpen] = useState<boolean>(false);
  const [is404Open, setIs404Open] = useState<boolean>(false);
  const [isPizzaOpen, setIsPizzaOpen] = useState<boolean>(false);
  const [brokenMobileMode, setBrokenMobileMode] = useState<boolean>(false);

  const handleGoToPolka = () => {
    const el = document.getElementById('support');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`min-h-screen bg-zinc-950 text-white font-mono selection:bg-red-600 selection:text-white transition-all ${
        brokenMobileMode
          ? 'overflow-x-scroll w-[103vw] max-w-none transform rotate-[0.3deg]'
          : 'overflow-x-hidden'
      }`}
    >
      {/* Sound Hazard Warning & Audio Player Controls */}
      <SoundHazardBanner onCombustRequest={() => setIsCombustOpen(true)} />

      {/* Main Navbar with Pointy X Logo & 404 Links */}
      <Navbar
        onTrigger404={() => setIs404Open(true)}
        onOpenCombust={() => setIsCombustOpen(true)}
        onOpenPizza={() => setIsPizzaOpen(true)}
      />

      {/* Hero Section with Brutalist Asymmetry & Spontaneously Combust CTA */}
      <main>
        <Hero
          onOpenCombust={() => setIsCombustOpen(true)}
          onOpenPizza={() => setIsPizzaOpen(true)}
          onTrigger404={() => setIs404Open(true)}
        />

        {/* Featured Domain Sale Section (Atom.com) */}
        <DomainShowcase />

        {/* Interactive Lopsided Widgets & Misaligned Bolt Hole Gallery */}
        <LopsidedGallery />

        {/* Leadership Team (Drawn with Broken Compass) */}
        <LeadershipSection />

        {/* Support Section (Looping Upbeat Polka Music Only) */}
        <SupportPolka />
      </main>

      {/* Footer */}
      <Footer
        onTrigger404={() => setIs404Open(true)}
        onOpenCombust={() => setIsCombustOpen(true)}
        onOpenPizza={() => setIsPizzaOpen(true)}
        brokenMobileMode={brokenMobileMode}
        onToggleBrokenMobile={() => setBrokenMobileMode(!brokenMobileMode)}
      />

      {/* Persistent / Hidden Endurance Timer */}
      <EnduranceGauge onCombustRequest={() => setIsCombustOpen(true)} />

      {/* Spontaneous Combustion Blast & Certificate Modal */}
      <CombustionModal
        isOpen={isCombustOpen}
        onClose={() => setIsCombustOpen(false)}
      />

      {/* 404 Error Screen Modal for all navigation links */}
      <Random404Modal
        isOpen={is404Open}
        onClose={() => setIs404Open(false)}
        onOpenPizza={() => setIsPizzaOpen(true)}
        onGoToPolka={handleGoToPolka}
      />

      {/* Accidental Gino's Pizza Contact Modal */}
      <PizzaContactModal
        isOpen={isPizzaOpen}
        onClose={() => setIsPizzaOpen(false)}
      />
    </div>
  );
}
