import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, AlertTriangle, Music, Zap, Flame } from 'lucide-react';
import { soundHazard } from '../utils/audioEngine';

interface Props {
  onCombustRequest: () => void;
}

export const SoundHazardBanner: React.FC<Props> = ({ onCombustRequest }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isKazooOn, setIsKazooOn] = useState<boolean>(true);
  const [isPolkaOn, setIsPolkaOn] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [pitch, setPitch] = useState<number>(1.2);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [showWarningModal, setShowWarningModal] = useState<boolean>(false);

  // Auto-listen to any click on document to unlock audio if user hasn't already
  useEffect(() => {
    const handleFirstClick = () => {
      if (!hasInteracted) {
        soundHazard.unlock().then((ok) => {
          if (ok) {
            setIsPlaying(true);
            setHasInteracted(true);
          }
        });
      }
    };
    window.addEventListener('click', handleFirstClick, { once: true });
    return () => window.removeEventListener('click', handleFirstClick);
  }, [hasInteracted]);

  const handleStartAudio = async () => {
    await soundHazard.unlock();
    setIsPlaying(true);
    setHasInteracted(true);
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isPlaying) {
      handleStartAudio();
      return;
    }
    // Funny barrier before muting
    if (!isMuted) {
      setShowWarningModal(true);
    } else {
      const muted = soundHazard.toggleMute();
      setIsMuted(muted);
    }
  };

  const confirmMute = () => {
    const muted = soundHazard.toggleMute();
    setIsMuted(muted);
    setShowWarningModal(false);
  };

  const handleKazooToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !isKazooOn;
    setIsKazooOn(next);
    soundHazard.setKazooState(next);
  };

  const handlePolkaToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !isPolkaOn;
    setIsPolkaOn(next);
    soundHazard.setPolkaState(next);
  };

  const handlePitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setPitch(val);
    soundHazard.setKazooPitch(val);
  };

  return (
    <>
      {/* Top Sticky Sound Hazard Bar */}
      <div className="sticky top-0 z-50 bg-red-600 text-white border-b-4 border-red-900 shadow-xl overflow-hidden font-mono text-xs select-none">
        <div className="flex flex-wrap items-center justify-between px-3 py-1.5 gap-2 max-w-7xl mx-auto">
          
          {/* Audio Engine Status / Alarm */}
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isPlaying && !isMuted ? 'bg-yellow-300' : 'bg-zinc-400'} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isPlaying && !isMuted ? 'bg-yellow-400' : 'bg-zinc-500'}`}></span>
            </span>
            <AlertTriangle className="w-4 h-4 text-yellow-300 animate-bounce" />
            <span className="font-black tracking-wider uppercase text-yellow-200">
              SOUND HAZARD ADVISORY:
            </span>
            <span className="hidden sm:inline text-white/90">
              Frantic Kazoo + Endless Polka Active
            </span>
          </div>

          {/* Quick Audio Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            {!isPlaying ? (
              <button
                onClick={handleStartAudio}
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold px-3 py-1 rounded shadow-md border border-black flex items-center gap-1.5 animate-pulse cursor-pointer transition-transform hover:scale-105"
              >
                <Zap className="w-3.5 h-3.5 fill-black" />
                ENGAGE KAZOO & POLKA AUDIO
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-red-800/80 px-2 py-0.5 rounded border border-red-500">
                {/* Kazoo switch */}
                <button
                  onClick={handleKazooToggle}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold border transition ${
                    isKazooOn && !isMuted
                      ? 'bg-yellow-400 text-black border-yellow-500'
                      : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                  }`}
                  title="Toggle Frantic Kazoo"
                >
                  🎺 Kazoo: {isKazooOn && !isMuted ? 'BLARING' : 'OFF'}
                </button>

                {/* Polka switch */}
                <button
                  onClick={handlePolkaToggle}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold border transition ${
                    isPolkaOn && !isMuted
                      ? 'bg-amber-400 text-black border-amber-500'
                      : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                  }`}
                  title="Toggle Upbeat Polka"
                >
                  🪗 Polka: {isPolkaOn && !isMuted ? 'BOUNCING' : 'OFF'}
                </button>

                {/* Kazoo Pitch Slider */}
                <div className="hidden md:flex items-center gap-1 text-[10px] text-yellow-200">
                  <span>Pitch:</span>
                  <input
                    type="range"
                    min="0.7"
                    max="2.2"
                    step="0.1"
                    value={pitch}
                    onChange={handlePitchChange}
                    className="w-16 accent-yellow-400 cursor-pointer h-1 bg-red-950"
                    title={`Kazoo pitch factor: ${pitch}x`}
                  />
                  <span>{pitch.toFixed(1)}x</span>
                </div>

                {/* Mute Button */}
                <button
                  onClick={handleToggleMute}
                  className="p-1 hover:bg-red-700 rounded text-white flex items-center gap-1 transition"
                  title="Silence the Madness (Breaks Factory Warranty)"
                >
                  {isMuted ? (
                    <VolumeX className="w-3.5 h-3.5 text-zinc-300" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
                  )}
                  <span className="text-[10px] hidden sm:inline">{isMuted ? 'UNMUTE' : 'MUTE'}</span>
                </button>
              </div>
            )}

            {/* Micro Spontaneous Combustion Trigger */}
            <button
              onClick={onCombustRequest}
              className="bg-black hover:bg-zinc-900 text-red-400 hover:text-red-300 border border-red-500 font-bold px-2 py-1 rounded text-[10px] flex items-center gap-1 cursor-pointer transition transform active:scale-95"
            >
              <Flame className="w-3 h-3 text-red-500" />
              <span>COMBUST NOW</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mute Warning Confirmation Modal (Absurdist UX) */}
      {showWarningModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border-4 border-red-600 p-6 max-w-md w-full shadow-2xl text-white font-mono text-center transform -rotate-1">
            <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto mb-3 animate-bounce" />
            <h3 className="text-xl font-black text-red-500 uppercase tracking-wide">
              OSHA REGULATION #404-B VIOLATION
            </h3>
            <p className="text-zinc-300 text-sm mt-3 leading-relaxed">
              Silencing the high-pitched kazoo and upbeat polka voids your factory tolerance warranty and permits all drill bits within 5 miles to wander by an additional 12mm.
            </p>
            <p className="text-yellow-300 text-xs mt-2 font-bold">
              Are you mentally prepared for the eerie silence of a misaligned shop floor?
            </p>
            <div className="flex gap-3 justify-center mt-6">
              <button
                onClick={() => setShowWarningModal(false)}
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold px-4 py-2 rounded text-sm cursor-pointer"
              >
                KEEP KAZOO RUNNING (WISE)
              </button>
              <button
                onClick={confirmMute}
                className="bg-zinc-800 hover:bg-zinc-700 text-zinc-400 font-bold px-4 py-2 rounded text-sm border border-zinc-600 cursor-pointer"
              >
                MUTE ANYWAY (COWARD)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
