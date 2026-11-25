'use client';

import React, { useState } from 'react';
import { LAWS_INFO, CONSONANT_PAIRS, UNPAIRED_CONSONANTS } from '@/data/laws';
import { LawCategory } from '@/types';
import { X, BookOpen, Volume2, Sparkles, CheckCircle2, Lightbulb, ListChecks, Layers } from 'lucide-react';
import { sound } from '@/utils/sound';

interface TheoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: LawCategory | 'table' | 'all';
}

export const TheoryModal: React.FC<TheoryModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'reszleges_hasonulas'
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-4xl max-h-[92vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border-4 border-indigo-200">
        
        {/* Modál Fejléc */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-4 sm:p-5 text-white flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-2.5 bg-white/20 rounded-2xl backdrop-blur-md">
              <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-300" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-black tracking-wide">
                Mássalhangzó kisokos 📚
              </h2>
              <p className="text-xs sm:text-sm text-indigo-100 font-medium">
                Mind az 5 mássalhangzótörvény részletes 5. osztályos szabályai és példái!
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

        {/* Fülek / Navigáció - TÖBB SORBA TÖRŐ (wrap), jól látható gombokkal! */}
        <div className="flex flex-wrap gap-1.5 p-3 bg-slate-100 border-b border-slate-200 shrink-0">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('table');
            }}
            className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-1.5 ${
              activeTab === 'table'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <Volume2 className="w-4 h-4 text-amber-500" />
            <span>Zöngés-Zöngétlen Párok</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('all');
            }}
            className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl font-black text-xs sm:text-sm transition flex items-center gap-1.5 ${
              activeTab === 'all'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200'
            }`}
          >
            <Layers className="w-4 h-4 text-yellow-400" />
            <span>Mind az 5 törvény egyben!</span>
          </button>

          {LAWS_INFO.map((law, idx) => (
            <button
              key={law.id}
              onClick={() => {
                sound.playClick();
                setActiveTab(law.id);
              }}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-1.5 ${
                activeTab === law.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-800 text-[10px] flex items-center justify-center font-black">
                {idx + 1}
              </span>
              <span>{law.title}</span>
            </button>
          ))}
        </div>

        {/* Tartalom terület */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* 1. FÜL: ZÖNGÉS-ZÖNGÉTLEN TÁBLÁZAT */}
          {activeTab === 'table' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 text-blue-900">
                <h3 className="font-bold text-base sm:text-lg flex items-center gap-2 mb-1">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  Hogyan ismerheted fel a zöngésséget?
                </h3>
                <p className="text-sm leading-relaxed">
                  Tedd a kezed a torkodra (a gégédre)! Ha kimondod: <strong>„zzzzz”</strong> vagy <strong>„bbbb”</strong>, érzed a rezgést? Ez a <strong>ZÖNGÉS</strong> hang. Ha kimondod: <strong>„ssssz”</strong> vagy <strong>„pppp”</strong>, nincs rezgés: ez a <strong>ZÖNGÉTLEN</strong> hang!
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 text-base mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-500" />
                  Mássalhangzó-párok (Zöngés ⟷ Zöngétlen)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {CONSONANT_PAIRS.map((pair, idx) => (
                    <div
                      key={idx}
                      className="bg-white border-2 border-indigo-100 hover:border-indigo-300 rounded-2xl p-3 shadow-xs flex items-center justify-between"
                    >
                      <div className="flex flex-col items-center flex-1 bg-amber-50 rounded-xl py-2">
                        <span className="text-[10px] text-amber-700 font-bold uppercase">Zöngés</span>
                        <span className="text-xl font-black text-amber-900">{pair.voiced}</span>
                      </div>
                      <span className="px-2 text-indigo-400 font-bold">⟷</span>
                      <div className="flex flex-col items-center flex-1 bg-sky-50 rounded-xl py-2">
                        <span className="text-[10px] text-sky-700 font-bold uppercase">Zöngétlen</span>
                        <span className="text-xl font-black text-sky-900">{pair.voiceless}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4">
                  <h4 className="font-bold text-amber-900 mb-1 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
                    Páratlan Zöngés mássalhangzók:
                  </h4>
                  <p className="text-xs text-amber-700 mb-2">
                    Mindig zöngések, nincs zöngétlen párjuk:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {UNPAIRED_CONSONANTS.voiced.map((c) => (
                      <span
                        key={c}
                        className="px-3 py-1.5 bg-white text-amber-900 font-black text-lg rounded-xl shadow-xs border border-amber-200"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-4">
                  <h4 className="font-bold text-sky-900 mb-1 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-sky-500 inline-block"></span>
                    Páratlan Zöngétlen mássalhangzó:
                  </h4>
                  <p className="text-xs text-sky-700 mb-2">
                    Csak egyetlenegy van belőle a magyarban:
                  </p>
                  <div>
                    <span className="px-4 py-1.5 bg-white text-sky-900 font-black text-xl rounded-xl shadow-xs border border-sky-200 inline-block">
                      h
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. FÜL: MIND AZ 5 TÖRVÉNY EGYBEN VAGY ADOTT TÖRVÉNY */}
          {LAWS_INFO.filter((l) => activeTab === 'all' || l.id === activeTab).map((law, lawIndex) => (
            <div key={law.id} className="space-y-4 pt-2 border-b-4 border-slate-100 pb-8 last:border-b-0 animate-fadeIn">
              
              {/* Törvény fejléc kártya */}
              <div className={`p-4 sm:p-5 rounded-2xl border-2 ${law.borderLight} ${law.bgLight}`}>
                <div className="flex items-center gap-2.5 font-black text-lg sm:text-xl text-slate-900 mb-2">
                  <span className="w-7 h-7 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">
                    {lawIndex + 1}
                  </span>
                  <span>{law.title}</span>
                </div>
                <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed mb-3">
                  {law.shortDescription}
                </p>
                <div className="inline-block bg-white/90 border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-slate-900 shadow-xs">
                  💡 <strong>Aranyszabály:</strong> {law.keyRule}
                </div>
              </div>

              {/* Altípusok és képletek */}
              <div className="space-y-4">
                {law.subtypes.map((sub, idx) => (
                  <div key={idx} className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3">
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 text-xs flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      {sub.name}
                    </h4>

                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                      {sub.rule}
                    </p>

                    {sub.formula && (
                      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-2.5 text-xs sm:text-sm font-mono font-bold text-indigo-900">
                        📐 Képlet: {sub.formula}
                      </div>
                    )}

                    {sub.hint && (
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs sm:text-sm text-amber-900 flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span><strong>Hasznos trükk:</strong> {sub.hint}</span>
                      </div>
                    )}

                    {/* Példák kártyák */}
                    <div className="pt-2">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Gyakorlati példák az 5. osztályos tananyagból:
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {sub.examples.map((ex, exIdx) => (
                          <div
                            key={exIdx}
                            className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs flex flex-col justify-between"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-black text-slate-900 text-base">{ex.word}</span>
                              <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-xs font-bold rounded-lg font-mono">
                                {ex.phonetic}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600">{ex.explanation}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}

        </div>

        {/* Modál Lábléc */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition active:scale-95"
          >
            Bezárás
          </button>
        </div>

      </div>
    </div>
  );
};
