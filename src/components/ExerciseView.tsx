'use client';

import React, { useState, useEffect } from 'react';
import { Question } from '@/types';
import { sound } from '@/utils/sound';
import { fireConfetti } from '@/utils/confetti';
import { SortExercise } from './SortExercise';
import { 
  ArrowLeft, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Volume2, 
  Sparkles, 
  Lightbulb 
} from 'lucide-react';

interface ExerciseViewProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  lawTitle: string;
  onNext: (isCorrect: boolean) => void;
  onBack: () => void;
}

export const ExerciseView: React.FC<ExerciseViewProps> = ({
  question,
  questionIndex,
  totalQuestions,
  lawTitle,
  onNext,
  onBack
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [typedAnswer, setTypedAnswer] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isCorrectState, setIsCorrectState] = useState<boolean>(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  // Kérdésváltáskor tiszta lapot nyitunk és véletlenszerűen megkeverjük a válaszokat
  useEffect(() => {
    setSelectedAnswer(null);
    setTypedAnswer('');
    setIsAnswered(false);
    setShowHint(false);
    setIsCorrectState(false);

    if (question.options && question.options.length > 0) {
      const arr = [...question.options];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      setShuffledOptions(arr);
    } else {
      setShuffledOptions([]);
    }
  }, [question.id]);

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
    setIsAnswered(true);

    const correct = option === question.correctAnswer;
    setIsCorrectState(correct);

    if (correct) {
      sound.playCorrect();
      fireConfetti();
    } else {
      sound.playIncorrect();
    }
  };

  const handleCheckSpelling = () => {
    if (isAnswered || !typedAnswer.trim()) return;
    setIsAnswered(true);

    const normalizedTyped = typedAnswer.trim().toLowerCase();
    const normalizedCorrect = question.correctAnswer.trim().toLowerCase();
    const correct = normalizedTyped === normalizedCorrect;
    setIsCorrectState(correct);

    if (correct) {
      sound.playCorrect();
      fireConfetti();
    } else {
      sound.playIncorrect();
    }
  };

  const handleSortComplete = (isCorrect: boolean) => {
    setIsAnswered(true);
    setIsCorrectState(isCorrect);
  };

  const handleNextClick = () => {
    sound.playClick();
    onNext(isCorrectState);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Felső navigációs sáv és haladásjelző */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border-2 border-indigo-100 space-y-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              sound.playClick();
              onBack();
            }}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-indigo-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Vissza a szintekhez</span>
          </button>

          <span className="text-xs sm:text-sm font-extrabold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            {lawTitle}
          </span>

          <span className="text-xs sm:text-sm font-black text-slate-800">
            {questionIndex + 1} / {totalQuestions}
          </span>
        </div>

        {/* Progress bar csík */}
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300 rounded-full"
            style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Fő Kérdés Kártya */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-3 border-indigo-100 space-y-6">
        
        {/* Utasítás */}
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
            {question.prompt}
          </h2>
        </div>

        {/* Vizsgált szó kiemelése (csak ha NEM szétválogató ÉS NEM helyesírási beírós típus) */}
        {question.type !== 'categorization' && question.type !== 'spelling' && (
          <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-2 border-indigo-200/80 rounded-3xl p-6 text-center shadow-inner relative overflow-hidden">
            <div className="text-xs uppercase font-extrabold tracking-widest text-indigo-500 mb-1">
              A vizsgált kifejezés
            </div>
            
            <div className="text-3xl sm:text-5xl font-black text-slate-900 tracking-wide my-2">
              {question.word}
            </div>

            {/* Kiegészítő hangtani segédlet */}
            {question.lettersInvolved && (
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/80 border border-indigo-200 rounded-xl text-xs sm:text-sm font-bold text-indigo-900 shadow-2xs mt-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Találkozó hangok: {question.lettersInvolved}</span>
              </div>
            )}
          </div>
        )}

        {/* Feladat nézet típus szerint */}
        {question.type === 'categorization' ? (
          <SortExercise key={question.id} question={question} onComplete={handleSortComplete} />
        ) : question.type === 'spelling' ? (
          /* Beírós / Helyesírási feladat */
          <div className="space-y-4">
            <div className="bg-amber-50/80 border-2 border-amber-300 rounded-3xl p-5 text-center">
              <div className="text-xs uppercase font-extrabold tracking-wider text-amber-800 mb-1">
                Kiejtett alak (hallgasd meg a fejedben):
              </div>
              <div className="text-3xl sm:text-5xl font-black text-amber-950 font-mono tracking-wide my-1">
                {question.phoneticForm || question.word}
              </div>
              <div className="text-xs sm:text-sm text-amber-800 font-bold mt-2">
                ✍️ Írd be alább, hogyan kell helyesen leírni ezt a szót a füzetedbe!
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                autoFocus
                disabled={isAnswered}
                value={typedAnswer}
                onChange={(e) => setTypedAnswer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCheckSpelling();
                  }
                }}
                placeholder="Ide gépeld be a szót..."
                className={`flex-1 px-5 py-4 text-xl sm:text-2xl font-black rounded-2xl border-3 transition-all outline-none shadow-inner ${
                  isAnswered
                    ? isCorrectState
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                      : 'bg-rose-50 border-rose-400 text-rose-950'
                    : 'bg-white border-indigo-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 text-slate-900'
                }`}
              />

              {!isAnswered && (
                <button
                  onClick={handleCheckSpelling}
                  disabled={!typedAnswer.trim()}
                  className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-black text-lg rounded-2xl shadow-md transition active:scale-95 flex items-center justify-center gap-2 shrink-0"
                >
                  <CheckCircle2 className="w-6 h-6" />
                  <span>Ellenőrzés</span>
                </button>
              )}
            </div>

            {isAnswered && (
              <div className="flex items-center gap-2 text-sm font-bold">
                <span className="text-slate-500">Helyes írásmód:</span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-900 font-black rounded-xl text-base">
                  {question.correctAnswer}
                </span>
              </div>
            )}
          </div>
        ) : (
          /* Hagyományos / Kiejtés / Szóalkotó opciók (véletlenszerű sorrendben!) */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {shuffledOptions.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const isCorrectOption = option === question.correctAnswer;

              let btnClass = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-indigo-50/70 hover:border-indigo-300';

              if (isAnswered) {
                if (isCorrectOption) {
                  btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-md ring-2 ring-emerald-400';
                } else if (isSelected && !isCorrectOption) {
                  btnClass = 'bg-rose-50 border-rose-400 text-rose-900 opacity-80';
                } else {
                  btnClass = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(option)}
                  className={`p-4 sm:p-5 rounded-2xl border-3 font-bold text-base sm:text-lg text-left transition-all duration-150 flex items-center justify-between gap-3 active:scale-98 ${btnClass}`}
                >
                  <span>{option}</span>
                  {isAnswered && isCorrectOption && (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  )}
                  {isAnswered && isSelected && !isCorrectOption && (
                    <XCircle className="w-6 h-6 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Segítség / Tipp gomb */}
        {question.ruleHint && !isAnswered && (
          <div className="pt-2">
            {!showHint ? (
              <button
                onClick={() => {
                  sound.playClick();
                  setShowHint(true);
                }}
                className="text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 transition"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Kérek egy kis segítséget! 💡</span>
              </button>
            ) : (
              <div className="p-3 bg-amber-50 border-2 border-amber-200 rounded-2xl text-xs sm:text-sm text-amber-900 flex items-start gap-2 animate-fadeIn">
                <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span><strong>Segítség:</strong> {question.ruleHint}</span>
              </div>
            )}
          </div>
        )}

        {/* Magyarázat és Tovább gomb a válaszadás után */}
        {isAnswered && (
          <div className="pt-4 border-t-2 border-slate-100 space-y-4 animate-fadeIn">
            <div
              className={`p-4 sm:p-5 rounded-2xl border-2 ${
                isCorrectState
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-amber-50 border-amber-200 text-amber-950'
              }`}
            >
              <div className="flex items-center gap-2 font-black text-base sm:text-lg mb-1">
                {isCorrectState ? (
                  <>
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    <span>Kiváló! Eltaláltad! 🎉</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-6 h-6 text-amber-600" />
                    <span>Nézzük meg a helyes megoldást! 🧐</span>
                  </>
                )}
              </div>
              <p className="text-sm sm:text-base leading-relaxed font-medium">
                {question.explanation}
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleNextClick}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black text-base rounded-2xl shadow-lg transition active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Következő feladat</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
