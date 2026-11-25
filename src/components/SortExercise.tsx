'use client';

import React, { useState } from 'react';
import { Question } from '@/types';
import { sound } from '@/utils/sound';
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';

interface SortExerciseProps {
  question: Question;
  onComplete: (isCorrect: boolean) => void;
}

export const SortExercise: React.FC<SortExerciseProps> = ({
  question,
  onComplete
}) => {
  const config = question.categoriesForSorting;
  if (!config) return null;

  // Az elemek listája és helye: 'pool' (középen), 'left' vagy 'right'
  const [itemsState, setItemsState] = useState<
    { word: string; group: 'left' | 'right'; phonetic: string; targetGroup: 'left' | 'right' }[]
  >(
    config.items.map((it) => ({
      ...it,
      targetGroup: it.group,
      group: 'left' // kezdetben tegyük a választékba
    }))
  );

  // Még ki nem osztott elemek indexe
  const [unassignedItems, setUnassignedItems] = useState<
    { id: number; word: string; targetGroup: 'left' | 'right'; phonetic: string }[]
  >(config.items.map((it, idx) => ({ id: idx, word: it.word, targetGroup: it.group, phonetic: it.phonetic })));

  const [leftBucket, setLeftBucket] = useState<{ id: number; word: string; phonetic: string }[]>([]);
  const [rightBucket, setRightBucket] = useState<{ id: number; word: string; phonetic: string }[]>([]);
  const [selectedItem, setSelectedItem] = useState<{ id: number; word: string; targetGroup: 'left' | 'right'; phonetic: string } | null>(
    unassignedItems[0] || null
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [resultFeedback, setResultFeedback] = useState<string | null>(null);

  const handlePlaceItem = (target: 'left' | 'right') => {
    if (!selectedItem || isSubmitted) return;
    sound.playClick();

    if (target === 'left') {
      setLeftBucket((prev) => [...prev, selectedItem]);
    } else {
      setRightBucket((prev) => [...prev, selectedItem]);
    }

    const nextUnassigned = unassignedItems.filter((it) => it.id !== selectedItem.id);
    setUnassignedItems(nextUnassigned);
    setSelectedItem(nextUnassigned[0] || null);
  };

  const handleCheck = () => {
    sound.playClick();
    setIsSubmitted(true);

    // Ellenőrzés: bal és jobb kosár minden eleme megfelel-e
    let allCorrect = true;
    for (const item of leftBucket) {
      const original = config.items[item.id];
      if (original.group !== 'left') allCorrect = false;
    }
    for (const item of rightBucket) {
      const original = config.items[item.id];
      if (original.group !== 'right') allCorrect = false;
    }

    if (leftBucket.length + rightBucket.length !== config.items.length) {
      allCorrect = false;
    }

    if (allCorrect) {
      sound.playCorrect();
      setResultFeedback('Remek munka! Mindegyik szót a helyes csoportba válogattad!');
      onComplete(true);
    } else {
      sound.playIncorrect();
      setResultFeedback('Néhány szó nem a megfelelő csoportba került. Olvasd el a magyarázatot!');
      onComplete(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Aktuálisan válogatandó szó kártya */}
      {selectedItem && !isSubmitted && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-3 border-amber-300 rounded-3xl p-5 text-center shadow-md animate-bounce-short">
          <div className="text-xs uppercase font-extrabold tracking-wider text-amber-700 mb-1">
            Kattints arra a kosárra, ahová a szó tartozik:
          </div>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 mb-2">
            {selectedItem.word}
          </div>
          <div className="text-sm font-bold text-amber-800 bg-amber-200/60 inline-block px-3 py-1 rounded-xl">
            Kiejtése: {selectedItem.phonetic}
          </div>

          <div className="flex items-center justify-center gap-3 sm:gap-6 mt-4">
            <button
              onClick={() => handlePlaceItem('left')}
              className="flex-1 max-w-[200px] py-3 px-4 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-2xl shadow-md transition active:scale-95 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Bal kosár</span>
            </button>
            <button
              onClick={() => handlePlaceItem('right')}
              className="flex-1 max-w-[200px] py-3 px-4 bg-sky-500 hover:bg-sky-600 text-white font-black rounded-2xl shadow-md transition active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Jobb kosár</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* A két gyűjtőkosár */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bal kosár */}
        <div className="bg-amber-50/70 border-3 border-amber-200 rounded-3xl p-4 flex flex-col min-h-[220px]">
          <div className="font-black text-amber-900 text-base sm:text-lg mb-3 flex items-center gap-2 border-b-2 border-amber-200 pb-2">
            <span className="w-4 h-4 rounded-full bg-amber-500"></span>
            {config.leftCategory}
          </div>

          <div className="flex-1 space-y-2">
            {leftBucket.map((it) => (
              <div
                key={it.id}
                className="bg-white border-2 border-amber-200 rounded-xl p-2.5 font-bold text-slate-800 shadow-2xs flex items-center justify-between"
              >
                <span>{it.word}</span>
                <span className="text-xs text-amber-700 bg-amber-100 px-2 py-0.5 rounded-lg">
                  {it.phonetic}
                </span>
              </div>
            ))}
            {leftBucket.length === 0 && (
              <div className="h-full flex items-center justify-center text-amber-400 text-sm font-semibold italic py-8">
                Ide kerülnek a bal oldali szavak...
              </div>
            )}
          </div>
        </div>

        {/* Jobb kosár */}
        <div className="bg-sky-50/70 border-3 border-sky-200 rounded-3xl p-4 flex flex-col min-h-[220px]">
          <div className="font-black text-sky-900 text-base sm:text-lg mb-3 flex items-center gap-2 border-b-2 border-sky-200 pb-2">
            <span className="w-4 h-4 rounded-full bg-sky-500"></span>
            {config.rightCategory}
          </div>

          <div className="flex-1 space-y-2">
            {rightBucket.map((it) => (
              <div
                key={it.id}
                className="bg-white border-2 border-sky-200 rounded-xl p-2.5 font-bold text-slate-800 shadow-2xs flex items-center justify-between"
              >
                <span>{it.word}</span>
                <span className="text-xs text-sky-700 bg-sky-100 px-2 py-0.5 rounded-lg">
                  {it.phonetic}
                </span>
              </div>
            ))}
            {rightBucket.length === 0 && (
              <div className="h-full flex items-center justify-center text-sky-400 text-sm font-semibold italic py-8">
                Ide kerülnek a jobb oldali szavak...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Ellenőrzés gomb, ha minden szó el van helyezve */}
      {unassignedItems.length === 0 && !isSubmitted && (
        <div className="text-center pt-2">
          <button
            onClick={handleCheck}
            className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg rounded-2xl shadow-lg transition active:scale-95 flex items-center justify-center gap-2 mx-auto"
          >
            <Check className="w-6 h-6" />
            <span>Kész vagyok, ellenőrzés!</span>
          </button>
        </div>
      )}

      {/* Eredmény visszajelzés */}
      {resultFeedback && (
        <div className="p-4 bg-white border-2 border-indigo-200 rounded-2xl shadow-sm text-center">
          <p className="font-black text-slate-800 text-base sm:text-lg">
            {resultFeedback}
          </p>
        </div>
      )}
    </div>
  );
};
