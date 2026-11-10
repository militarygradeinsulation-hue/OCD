import React, { useState, useEffect } from 'react';
import { Timer, AlertOctagon, Brain, Award, XCircle, RotateCcw } from 'lucide-react';

interface Props {
  onCombustRequest: () => void;
}

export const EnduranceGauge: React.FC<Props> = ({ onCombustRequest }) => {
  const [seconds, setSeconds] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [hasSurrendered, setHasSurrendered] = useState<boolean>(false);
  const [finalSurrenderTime, setFinalSurrenderTime] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getDeteriorationStage = (sec: number) => {
    if (sec < 12) {
      return {
        stage: 'Stage 1: Mild Head Tilt',
        desc: 'Still believing the holes will line up if you zoom out.',
        severityColor: 'text-emerald-400',
        badge: '🟢 Optimistic Rookie',
      };
    }
    if (sec < 25) {
      return {
        stage: 'Stage 2: Right Eye Involuntary Spasm',
        desc: 'Visual cortex attempting to reconcile an 89° right angle.',
        severityColor: 'text-yellow-400',
        badge: '🟡 Twitching Observer',
      };
    }
    if (sec < 50) {
      return {
        stage: 'Stage 3: Physical Discomfort',
        desc: 'Reaching for a carpenter’s square to measure screen pixels.',
        severityColor: 'text-amber-400',
        badge: '🟠 Distressed Machinist',
      };
    }
    if (sec < 90) {
      return {
        stage: 'Stage 4: Auditory Polka Hallucination',
        desc: 'The accordion has replaced your internal monologue.',
        severityColor: 'text-orange-400',
        badge: '🔴 Semi-Conscious Victim',
      };
    }
    if (sec < 150) {
      return {
        stage: 'Stage 5: Perpendicular Resignation',
        desc: 'Accepting that straight lines are an artificial social construct.',
        severityColor: 'text-red-400',
        badge: '🟣 Asymmetry Convert',
      };
    }
    return {
      stage: 'Stage 6: Ascended Saboteur',
      desc: 'Brain fully adapted to 3.4mm offsets. You are now unhireable.',
      severityColor: 'text-rose-500 font-black',
      badge: '💀 Terminal Endurance Survivor',
    };
  };

  const currentStatus = getDeteriorationStage(seconds);

  const handleSurrender = () => {
    setFinalSurrenderTime(seconds);
    setHasSurrendered(true);
  };

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Floating Endurance Widget */}
      <div className="fixed bottom-4 right-4 z-40 font-mono">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-zinc-900 border-2 border-red-600 hover:border-yellow-400 text-white p-3 rounded-lg shadow-2xl flex items-center gap-2 cursor-pointer transition transform hover:scale-105"
            title="Inspect Psychological Endurance"
          >
            <Timer className="w-5 h-5 text-red-500 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="font-bold text-xs text-yellow-300">
              ENDURED: {formatTime(seconds)}
            </span>
          </button>
        ) : (
          <div className="bg-zinc-950 border-2 border-red-600 rounded-lg p-3 w-80 shadow-2xl text-zinc-100 transform -rotate-0.5 border-dashed">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-red-500">
                <Brain className="w-4 h-4 text-red-500 animate-pulse" />
                <span>ENDURANCE TELEMETRY</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-500 hover:text-zinc-300 text-xs px-1"
                title="Minimize Telemetry"
              >
                ✕
              </button>
            </div>

            {/* Timer Readout */}
            <div className="bg-black/90 p-2.5 rounded border border-zinc-800 mb-2.5">
              <div className="text-[10px] text-zinc-400 uppercase tracking-widest flex justify-between">
                <span>Time Spent Enduring:</span>
                <span className="text-yellow-400 font-bold">LIVE GAUGE</span>
              </div>
              <div className="text-3xl font-black text-red-500 tracking-wider flex items-baseline gap-2 mt-0.5">
                <span>{formatTime(seconds)}</span>
                <span className="text-xs text-zinc-500 font-normal">
                  ({seconds} seconds)
                </span>
              </div>
            </div>

            {/* Psychological Diagnosis */}
            <div className="text-[11px] mb-3">
              <div className="flex items-center justify-between font-bold">
                <span className={currentStatus.severityColor}>{currentStatus.stage}</span>
              </div>
              <p className="text-zinc-400 text-[10px] mt-0.5 leading-snug">
                {currentStatus.desc}
              </p>
              <div className="mt-1.5 inline-block text-[9px] bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded font-mono">
                {currentStatus.badge}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 text-[10px]">
              <button
                onClick={handleSurrender}
                className="flex-1 bg-red-950/80 hover:bg-red-900 border border-red-600 text-red-200 font-bold py-1.5 px-2 rounded flex items-center justify-center gap-1 cursor-pointer transition active:scale-95"
              >
                <XCircle className="w-3.5 h-3.5 text-red-400" />
                GIVE UP / RAGE QUIT
              </button>
              <button
                onClick={onCombustRequest}
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold py-1.5 px-2 rounded cursor-pointer transition active:scale-95"
                title="Escape via immediate combustion"
              >
                COMBUST
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Surrender / Rage Quit Modal */}
      {hasSurrendered && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-900 border-4 border-red-600 p-6 max-w-lg w-full shadow-2xl text-white font-mono text-center transform rotate-1">
            <Award className="w-16 h-16 text-yellow-400 mx-auto mb-3 animate-bounce" />
            <h2 className="text-2xl font-black text-red-500 uppercase">
              CERTIFICATE OF EARLY SURRENDER
            </h2>
            <div className="bg-zinc-950 border border-zinc-800 p-4 my-4 text-left text-xs space-y-2">
              <p className="text-zinc-300">
                <strong className="text-white">SURVIVOR TIME:</strong>{' '}
                <span className="text-yellow-400 text-lg font-black">{finalSurrenderTime} SECONDS</span> ({formatTime(finalSurrenderTime)})
              </p>
              <p className="text-zinc-300">
                <strong className="text-white">FAILURE REASON:</strong> Human visual cortex rejected persistent 3.4mm offset and relentless polka harmonic frequencies.
              </p>
              <p className="text-zinc-300">
                <strong className="text-white">PHYSICIAN RECOMMENDATION:</strong> Go stare at a standard 90-degree carpenter’s square for 45 minutes and drink water.
              </p>
            </div>

            <p className="text-zinc-400 text-xs italic">
              "You gave up faster than our apprentice when asked to bore an aligned hole." — Chuck Wobbly
            </p>

            <div className="flex gap-3 justify-center mt-6">
              <button
                onClick={() => setHasSurrendered(false)}
                className="bg-zinc-700 hover:bg-zinc-600 text-white font-bold px-4 py-2 rounded text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                RESUME ENDURING
              </button>
              <button
                onClick={() => {
                  setHasSurrendered(false);
                  onCombustRequest();
                }}
                className="bg-red-600 hover:bg-red-500 text-white font-extrabold px-4 py-2 rounded text-xs cursor-pointer"
              >
                SPONTANEOUSLY COMBUST INSTEAD
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
