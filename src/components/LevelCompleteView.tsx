'use client';

import React, { useEffect } from 'react';
import { sound } from '@/utils/sound';
import { fireCelebrationConfetti } from '@/utils/confetti';
import { Trophy, Star, ArrowRight, RotateCcw, Home } from 'lucide-react';

interface LevelCompleteViewProps {
  score: number;
  totalQuestions: number;
  lawTitle: string;
  difficultyTitle: string;
  earnedStars: number;
  newBadgeTitle?: string;
  onRetry: () => void;
  onChooseNext: () => void;
  onGoHome: () => void;
}

export const LevelCompleteView: React.FC<LevelCompleteViewProps> = ({
  score,
  totalQuestions,
  lawTitle,
  difficultyTitle,
  earnedStars,
  newBadgeTitle,
  onRetry,
  onChooseNext,
  onGoHome
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  useEffect(() => {
    sound.playVictory();
    fireCelebrationConfetti();
  }, []);

  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-xl border-4 border-amber-300 text-center space-y-6 animate-scaleUp">
      
      {/* Serleg / Trófea ikon */}
      <div className="relative inline-block">
        <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-amber-900 shadow-xl animate-bounce-short">
          <Trophy className="w-14 h-14 sm:w-16 sm:h-16 text-amber-950" />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-pink-500 text-white font-black px-3 py-1 rounded-full text-xs shadow-md">
          {percentage}%
        </div>
      </div>

      {/* Címek */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          Szép volt, Bajnok! 🌟
        </h2>
        <p className="text-sm sm:text-base text-slate-600 font-bold mt-1">
          {lawTitle} — {difficultyTitle}
        </p>
      </div>

      {/* Eredménykártya csillagokkal */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-6 space-y-3">
        <div className="text-xs uppercase font-extrabold tracking-wider text-amber-800">
          Megszerzett csillagok ezen a szinten:
        </div>
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3].map((starNum) => (
            <Star
              key={starNum}
              className={`w-10 h-10 transition-transform ${
                starNum <= earnedStars
                  ? 'text-amber-500 fill-amber-400 scale-110'
                  : 'text-slate-300 fill-slate-200'
              }`}
            />
          ))}
        </div>
        <div className="text-base sm:text-lg font-black text-slate-800">
          Helyes válaszok: <span className="text-indigo-600">{score}</span> / {totalQuestions}
        </div>
      </div>

      {/* Új jelvény értesítés (ha feloldódott) */}
      {newBadgeTitle && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-pink-300 rounded-2xl p-4 text-purple-900 flex items-center justify-center gap-3 animate-fadeIn">
          <span className="text-2xl">🎖️</span>
          <div className="text-left">
            <div className="text-xs font-bold uppercase text-pink-600">Új jelvényt szereztél!</div>
            <div className="font-black text-base">{newBadgeTitle}</div>
          </div>
        </div>
      )}

      {/* Akciógombok */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          onClick={() => {
            sound.playClick();
            onRetry();
          }}
          className="w-full sm:w-auto px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition active:scale-95 flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Újrapróbálkozás</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onGoHome();
          }}
          className="w-full sm:w-auto px-5 py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-2xl border-2 border-indigo-200 transition active:scale-95 flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          <span>Főoldal</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onChooseNext();
          }}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black rounded-2xl shadow-md transition active:scale-95 flex items-center justify-center gap-2"
        >
          <span>Tovább a következő szintre</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
