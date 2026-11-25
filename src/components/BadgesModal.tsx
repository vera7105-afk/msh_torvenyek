'use client';

import React from 'react';
import { BADGES } from '@/data/questions';
import { UserProgress } from '@/types';
import { X, Award, CheckCircle2, Lock } from 'lucide-react';
import { sound } from '@/utils/sound';

interface BadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
}

export const BadgesModal: React.FC<BadgesModalProps> = ({
  isOpen,
  onClose,
  progress
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-2xl max-h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border-4 border-amber-300">
        
        {/* Fejléc */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 p-4 sm:p-6 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-3 bg-white/20 rounded-2xl backdrop-blur-md">
              <Award className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-200" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-wide">
                Jelvények és Kitüntetések 🏅
              </h2>
              <p className="text-xs sm:text-sm text-amber-100 font-medium">
                Gyűjtsd össze az összeset a feladatok sikeres megoldásával!
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 bg-white/10 hover:bg-white/25 rounded-2xl transition duration-150 active:scale-95 text-white"
            aria-label="Bezárás"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Jelvények listája */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {BADGES.map((badge) => {
              const isUnlocked = progress.badges.includes(badge.id);

              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 ${
                    isUnlocked
                      ? 'bg-amber-50 border-amber-300 shadow-sm'
                      : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                      isUnlocked
                        ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    {isUnlocked ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <Lock className="w-5 h-5" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-800 text-sm sm:text-base truncate">
                        {badge.title}
                      </h4>
                      {isUnlocked && (
                        <span className="px-2 py-0.5 bg-amber-200 text-amber-900 text-[10px] font-black rounded-full uppercase">
                          Megszerezve
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5 leading-snug">
                      {badge.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lábléc */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-between items-center">
          <div className="text-xs sm:text-sm font-bold text-slate-600">
            Megszerezve: <span className="text-amber-600 font-black">{progress.badges.length}</span> / {BADGES.length}
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-5 py-2 bg-slate-700 hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition"
          >
            Bezárás
          </button>
        </div>

      </div>
    </div>
  );
};
