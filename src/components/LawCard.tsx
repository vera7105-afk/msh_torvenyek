'use client';

import React from 'react';
import { LawInfo, UserProgress } from '@/types';
import { sound } from '@/utils/sound';
import { Star, ChevronRight, Sparkles, BookOpen, Volume2, Copy, Minimize2, UserMinus } from 'lucide-react';

interface LawCardProps {
  law: LawInfo;
  progress: UserProgress;
  onSelectLaw: (lawId: string) => void;
  onOpenTheory: (lawId: string) => void;
}

export const LawCard: React.FC<LawCardProps> = ({
  law,
  progress,
  onSelectLaw,
  onOpenTheory
}) => {
  // Számoljuk össze, hogy ezen a törvényen hány szintet teljesített a tanuló (1, 2, 3)
  const completedCount = [1, 2, 3].filter(
    (lvl) => progress.completedLevels[`${law.id}-${lvl}`]
  ).length;

  const getGradient = () => {
    switch (law.id) {
      case 'reszleges_hasonulas':
        return 'from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-amber-200';
      case 'teljes_hasonulas':
        return 'from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-200';
      case 'osszeolvadas':
        return 'from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-emerald-200';
      case 'rovidules':
        return 'from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-purple-200';
      case 'kieses':
        return 'from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 shadow-rose-200';
      default:
        return 'from-indigo-600 to-purple-600 shadow-indigo-200';
    }
  };

  const getIcon = () => {
    switch (law.id) {
      case 'reszleges_hasonulas':
        return <Volume2 className="w-7 h-7 text-white" />;
      case 'teljes_hasonulas':
        return <Copy className="w-7 h-7 text-white" />;
      case 'osszeolvadas':
        return <Sparkles className="w-7 h-7 text-white" />;
      case 'rovidules':
        return <Minimize2 className="w-7 h-7 text-white" />;
      case 'kieses':
        return <UserMinus className="w-7 h-7 text-white" />;
      default:
        return <Sparkles className="w-7 h-7 text-white" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 border-3 border-indigo-100 flex flex-col justify-between group hover:-translate-y-1">
      
      <div>
        {/* Felső sáv: Ikon és Szint-jelzők */}
        <div className="flex items-center justify-between mb-4">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${law.color} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
            {getIcon()}
          </div>

          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
            <span className="text-xs font-black text-amber-900">
              {completedCount} / 3 szint
            </span>
            <Star className={`w-4 h-4 ${completedCount === 3 ? 'text-amber-500 fill-amber-400' : 'text-slate-300 fill-slate-200'}`} />
          </div>
        </div>

        {/* Törvény címe */}
        <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition">
          {law.title}
        </h3>

        {/* Rövid leírás 5. osztályosoknak */}
        <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mb-4">
          {law.shortDescription}
        </p>

        {/* Kulcsszabály pill */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-700 font-bold mb-4">
          💡 {law.keyRule}
        </div>
      </div>

      {/* Gombok */}
      <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
        <button
          onClick={() => {
            sound.playClick();
            onOpenTheory(law.id);
          }}
          className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl transition active:scale-95 shrink-0"
          title="Szabályok és magyarázat megtekintése"
        >
          <BookOpen className="w-5 h-5 text-indigo-700" />
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onSelectLaw(law.id);
          }}
          className={`flex-1 py-3.5 px-4 rounded-2xl font-black text-sm text-white bg-gradient-to-r ${getGradient()} shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2`}
        >
          <span className="text-white drop-shadow-xs">Gyakorlás indítása</span>
          <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
};
