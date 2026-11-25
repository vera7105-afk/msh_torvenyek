'use client';

import React from 'react';
import { UserProgress } from '@/types';
import { Star, BookOpen, Award, Volume2, VolumeX, Sparkles, RotateCcw } from 'lucide-react';
import { sound } from '@/utils/sound';

interface HeaderProps {
  progress: UserProgress;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenTheory: () => void;
  onOpenBadges: () => void;
  onResetProgress: () => void;
  onHomeClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  progress,
  isMuted,
  onToggleMute,
  onOpenTheory,
  onOpenBadges,
  onResetProgress,
  onHomeClick
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-indigo-100 shadow-xs px-3 sm:px-6 py-3 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        
        {/* Bal oldal: Logó / Cím */}
        <button
          onClick={() => {
            sound.playClick();
            onHomeClick();
          }}
          className="flex items-center gap-2.5 text-left group transition"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300" />
          </div>
          <div>
            <span className="block text-sm sm:text-base font-black text-indigo-950 tracking-tight group-hover:text-indigo-600 transition">
              Mássalhangzótörvények
            </span>
            <span className="block text-[11px] sm:text-xs text-indigo-500 font-semibold">
              5. osztályos gyakorló
            </span>
          </div>
        </button>

        {/* Közép / Jobb: Pontok és Akciógombok */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          
          {/* Csillagok / Pontszám pill */}
          <div className="flex items-center gap-1.5 bg-amber-50 border-2 border-amber-200 px-3 py-1.5 rounded-2xl shadow-xs">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 fill-amber-400" />
            <span className="font-black text-amber-900 text-sm sm:text-base">
              {progress.stars}
            </span>
            <span className="hidden md:inline text-xs font-bold text-amber-700">
              csillag
            </span>
          </div>

          {/* Kisokos gomb */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenTheory();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-2xl border-2 border-indigo-200 text-xs sm:text-sm transition active:scale-95 shadow-xs"
            title="Mássalhangzó kisokos és szabályok"
          >
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span className="hidden sm:inline">Kisokos</span>
          </button>

          {/* Jelvények gomb */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenBadges();
            }}
            className="relative flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-yellow-50 hover:bg-yellow-100 text-amber-800 font-bold rounded-2xl border-2 border-yellow-300 text-xs sm:text-sm transition active:scale-95 shadow-xs"
            title="Megszerzett jelvények"
          >
            <Award className="w-4 h-4 text-amber-600" />
            <span className="hidden sm:inline">Jelvények</span>
            {progress.badges.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white rounded-full text-[10px] flex items-center justify-center font-black shadow-xs">
                {progress.badges.length}
              </span>
            )}
          </button>

          {/* Némítás gomb */}
          <button
            onClick={onToggleMute}
            className="p-2 sm:p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl border-2 border-slate-200 transition active:scale-95"
            title={isMuted ? 'Hang bekapcsolása' : 'Hang némítása'}
            aria-label="Hang némítása vagy bekapcsolása"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
            ) : (
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
            )}
          </button>

          {/* Haladás törlése gomb (reset) */}
          <button
            onClick={onResetProgress}
            className="p-2 sm:p-2.5 bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-2xl border-2 border-slate-200 hover:border-rose-200 transition active:scale-95"
            title="Eredmények alaphelyzetbe állítása"
            aria-label="Eredmények nullázása"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

        </div>

      </div>
    </header>
  );
};
