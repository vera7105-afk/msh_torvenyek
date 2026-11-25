'use client';

import React, { useState, useEffect } from 'react';
import { LAWS_INFO } from '@/data/laws';
import { QUESTIONS, BADGES } from '@/data/questions';
import { LawCategory, Question, UserProgress } from '@/types';
import { loadUserProgress, saveUserProgress, resetUserProgress } from '@/utils/storage';
import { sound } from '@/utils/sound';
import { Header } from '@/components/Header';
import { LawCard } from '@/components/LawCard';
import { TheoryModal } from '@/components/TheoryModal';
import { BadgesModal } from '@/components/BadgesModal';
import { ExerciseView } from '@/components/ExerciseView';
import { LevelCompleteView } from '@/components/LevelCompleteView';
import { 
  Trophy, 
  Sparkles, 
  BookOpen, 
  ArrowLeft, 
  Star, 
  ChevronRight, 
  CheckCircle2, 
  HelpCircle,
  Flame,
  GraduationCap
} from 'lucide-react';

export default function Home() {
  const [progress, setProgress] = useState<UserProgress>({
    stars: 0,
    completedLevels: {},
    scores: {},
    badges: []
  });

  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isTheoryOpen, setIsTheoryOpen] = useState<boolean>(false);
  const [theoryInitialTab, setTheoryInitialTab] = useState<LawCategory | 'table'>('reszleges_hasonulas');
  const [isBadgesOpen, setIsBadgesOpen] = useState<boolean>(false);

  // Navigációs állapotok: 'home' | 'law_levels' | 'exercise' | 'level_complete'
  const [view, setView] = useState<'home' | 'law_levels' | 'exercise' | 'level_complete'>('home');
  const [selectedLawId, setSelectedLawId] = useState<string>('reszleges_hasonulas');
  const [selectedLevel, setSelectedLevel] = useState<1 | 2 | 3 | 'all'>(1);

  // Aktuális feladatsor állapotai
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [earnedStarsForLevel, setEarnedStarsForLevel] = useState<number>(0);
  const [newlyUnlockedBadge, setNewlyUnlockedBadge] = useState<string | undefined>(undefined);

  // Inicializálás: localStorage adatok betöltése
  useEffect(() => {
    const saved = loadUserProgress();
    setProgress(saved);
  }, []);

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sound.setMuted(nextMuted);
    if (!nextMuted) sound.playClick();
  };

  const handleOpenTheory = (tab?: string) => {
    if (tab && (tab === 'table' || LAWS_INFO.some((l) => l.id === tab))) {
      setTheoryInitialTab(tab as LawCategory | 'table');
    } else {
      setTheoryInitialTab('table');
    }
    setIsTheoryOpen(true);
  };

  const handleResetProgress = () => {
    if (confirm('Biztosan törölni szeretnéd a pontjaidat és eredményeidet?')) {
      const reset = resetUserProgress();
      setProgress(reset);
      sound.playClick();
    }
  };

  // Törvény kiválasztása a főoldalon ➔ szintek képernyő
  const handleSelectLaw = (lawId: string) => {
    setSelectedLawId(lawId);
    setView('law_levels');
  };

  // Szint indítása (1, 2, 3 vagy 'all' - teljes 12-15 feladatos gyakorló)
  const handleStartLevel = (level: 1 | 2 | 3 | 'all') => {
    setSelectedLevel(level);

    let filtered: Question[] = [];

    if (selectedLawId === 'bajnoksag') {
      if (level === 'all') {
        filtered = [...QUESTIONS];
      } else {
        filtered = QUESTIONS.filter((q) => q.difficulty === level);
      }
    } else {
      if (level === 'all') {
        // Mind a 15 feladat az adott törvényből, szigorúan lépcsőzetes nehézségi sorrendben (1 -> 2 -> 3)!
        filtered = QUESTIONS.filter((q) => q.category === selectedLawId).sort(
          (a, b) => a.difficulty - b.difficulty
        );
      } else {
        // Adott törvény adott nehézségi szintű kérdései
        filtered = QUESTIONS.filter(
          (q) => q.category === selectedLawId && q.difficulty === level
        );
      }
    }

    // Ha nincs elég kérdés egy szinten, vegyük a legközelebbi kérdéseket is
    if (filtered.length === 0) {
      filtered = QUESTIONS.filter((q) => q.category === selectedLawId);
    }

    setCurrentQuestions(filtered);
    setCurrentQuestionIndex(0);
    setCurrentScore(0);
    setView('exercise');
  };

  // Következő kérdés kezelése
  const handleNextQuestion = (wasCorrect: boolean) => {
    const nextScore = wasCorrect ? currentScore + 1 : currentScore;
    setCurrentScore(nextScore);

    if (currentQuestionIndex + 1 < currentQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Feladatsor befejezése: pontozás és mentés
      finishLevel(nextScore, currentQuestions.length);
    }
  };

  // Szint lezárása
  const finishLevel = (finalScore: number, totalQ: number) => {
    const percentage = Math.round((finalScore / totalQ) * 100);
    let stars = 1;
    if (percentage >= 80) stars = 3;
    else if (percentage >= 50) stars = 2;

    setEarnedStarsForLevel(stars);

    const levelKey = `${selectedLawId}-${selectedLevel}`;
    const alreadyCompleted = progress.completedLevels[levelKey];

    // Új csillagok kiszámolása
    const prevScore = progress.scores[levelKey] || 0;
    const additionalStars = alreadyCompleted ? Math.max(0, stars - (progress.scores[levelKey] ? Math.round((progress.scores[levelKey] / totalQ) * 3) : 0)) : stars;
    const nextStarsTotal = progress.stars + additionalStars;

    const newCompletedLevels = { ...progress.completedLevels, [levelKey]: true };
    const newScores = { ...progress.scores, [levelKey]: Math.max(prevScore, finalScore) };

    // Jelvények ellenőrzése
    const unlockedBadges = [...progress.badges];
    let justUnlockedTitle: string | undefined = undefined;

    const grantBadge = (badgeId: string) => {
      if (!unlockedBadges.includes(badgeId)) {
        unlockedBadges.push(badgeId);
        const b = BADGES.find((x) => x.id === badgeId);
        if (b) justUnlockedTitle = b.title;
      }
    };

    grantBadge('badge_first_step');

    if (selectedLawId === 'reszleges_hasonulas') grantBadge('badge_reszleges');
    if (selectedLawId === 'teljes_hasonulas') grantBadge('badge_teljes');
    if (selectedLawId === 'osszeolvadas') grantBadge('badge_osszeolvadas');
    if (selectedLawId === 'rovidules') grantBadge('badge_rovidules');
    if (selectedLawId === 'kieses') grantBadge('badge_kieses');

    if (nextStarsTotal >= 15) grantBadge('badge_champion');

    setNewlyUnlockedBadge(justUnlockedTitle);

    const updatedProgress: UserProgress = {
      stars: nextStarsTotal,
      completedLevels: newCompletedLevels,
      scores: newScores,
      badges: unlockedBadges
    };

    setProgress(updatedProgress);
    saveUserProgress(updatedProgress);

    setView('level_complete');
  };

  const currentLaw = LAWS_INFO.find((l) => l.id === selectedLawId);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Fejléc */}
      <Header
        progress={progress}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenTheory={() => handleOpenTheory()}
        onOpenBadges={() => setIsBadgesOpen(true)}
        onResetProgress={handleResetProgress}
        onHomeClick={() => setView('home')}
      />

      {/* Fő tartalom */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* ========================================================= */}
        {/* 1. NÉZET: FŐOLDAL (HOME)                                   */}
        {/* ========================================================= */}
        {view === 'home' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Hős szekció / Üdvözlő kártya */}
            <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-3xl p-6 sm:p-10 text-white shadow-xl">
              <div className="max-w-2xl space-y-4 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs sm:text-sm font-bold text-yellow-300">
                  <Sparkles className="w-4 h-4" />
                  <span>5. osztályos magyar nyelvtan gyakorló</span>
                </div>
                
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                  Tanuld meg és gyakorold a mássalhangzótörvényeket!
                </h1>

                <p className="text-indigo-100 text-sm sm:text-base leading-relaxed font-medium">
                  Lépésről lépésre haladunk a könnyűtől a nehéz feladatok felé. Ismerd meg mind az öt mássalhangzótörvényt, gyűjts csillagokat és szerezz bajnoki jelvényeket!
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => {
                      sound.playClick();
                      handleOpenTheory('table');
                    }}
                    className="px-6 py-3 bg-white text-indigo-900 font-black rounded-2xl shadow-md hover:bg-indigo-50 transition active:scale-95 flex items-center gap-2"
                  >
                    <BookOpen className="w-5 h-5 text-indigo-600" />
                    <span>Mássalhangzó kisokos 📖</span>
                  </button>

                  <button
                    onClick={() => {
                      sound.playClick();
                      handleSelectLaw('bajnoksag');
                    }}
                    className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black rounded-2xl shadow-md transition active:scale-95 flex items-center gap-2"
                  >
                    <Trophy className="w-5 h-5" />
                    <span>Vegyes bajnokság 🏆</span>
                  </button>
                </div>
              </div>

              {/* Dekoratív háttérkörök */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-12 -right-6 w-48 h-48 bg-yellow-400/20 rounded-full blur-xl pointer-events-none" />
            </div>

            {/* Törvények szekció cím */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Válassz egy mássalhangzótörvényt!
                </h2>
                <p className="text-sm text-slate-600 font-medium">
                  Minden témakörben külön 3 fokozatú feladatsor vár rád.
                </p>
              </div>
            </div>

            {/* Törvénykártyák Grid (Mind az 5 külön-külön) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {LAWS_INFO.map((law) => (
                <LawCard
                  key={law.id}
                  law={law}
                  progress={progress}
                  onSelectLaw={handleSelectLaw}
                  onOpenTheory={(id) => handleOpenTheory(id)}
                />
              ))}

              {/* 6. Extra Kártya: Nagy Bajnokság (Vegyes gyakorló) */}
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-6 text-white shadow-lg flex flex-col justify-between group hover:shadow-2xl transition hover:-translate-y-1">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-md">
                      <Trophy className="w-8 h-8 text-yellow-200" />
                    </div>
                    <span className="px-3 py-1 bg-white/25 rounded-full text-xs font-black uppercase tracking-wider">
                      Minden törvényből
                    </span>
                  </div>

                  <h3 className="text-xl font-black mb-2">
                    Nagy bajnokság kaland
                  </h3>
                  <p className="text-amber-100 text-xs sm:text-sm font-medium leading-relaxed mb-4">
                    Tedd próbára az össztudásodat! Itt mind az 5 törvényből kapsz vegyes feladatokat a könnyűtől a mester szintig!
                  </p>
                </div>

                <button
                  onClick={() => {
                    sound.playClick();
                    handleSelectLaw('bajnoksag');
                  }}
                  className="w-full py-3.5 bg-white text-orange-900 font-black rounded-2xl shadow-md hover:bg-amber-50 transition active:scale-95 flex items-center justify-center gap-2 mt-4"
                >
                  <span>Bajnokság indítása</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* 2. NÉZET: SZINTEK KIVÁLASZTÁSA (LAW LEVELS)              */}
        {/* ========================================================= */}
        {view === 'law_levels' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
            
            {/* Vissza gomb és Cím */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  sound.playClick();
                  setView('home');
                }}
                className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-indigo-600 transition"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Vissza a témakörökhöz</span>
              </button>

              <button
                onClick={() => handleOpenTheory(selectedLawId)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 font-bold rounded-xl text-xs sm:text-sm border border-indigo-200"
              >
                <BookOpen className="w-4 h-4" />
                <span>Kisokos elolvasása</span>
              </button>
            </div>

            {/* Törvény bemutató kártya */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-3 border-indigo-100 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-md">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                    {selectedLawId === 'bajnoksag' ? 'Nagy bajnokság' : currentLaw?.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 font-bold">
                    Válaszd ki a nehézségi szintet: haladj lépcsőzetesen!
                  </p>
                </div>
              </div>

              {currentLaw && (
                <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-4 text-xs sm:text-sm text-indigo-950 font-medium leading-relaxed">
                  💡 <strong>Összefoglaló:</strong> {currentLaw.summary}
                </div>
              )}
            </div>

            {/* Lépcsőzetes Szintek Listája (Kiemelt 15 feladatos nagyteszt + 1., 2., 3. szint) */}
            <div className="space-y-4">
              
              {/* KIEMELT: MIND A 15 FELADAT EGYBEN (LÉPCSŐZETES GYAKORLÓ) */}
              <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-6 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-2xl shrink-0">
                    <Sparkles className="w-8 h-8 text-yellow-300" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xl font-black">
                        Teljes Törvény-Gyakorló (15 feladat)
                      </h4>
                      <span className="px-2.5 py-0.5 bg-yellow-400 text-yellow-950 text-xs font-black rounded-full uppercase">
                        Ajánlott!
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-indigo-100 mt-1 font-medium">
                      Menj végig az összes feladaton lépcsőzetesen: az egyszerű kiejtéstől a szétválogatáson át a helyesírási beírásig!
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    sound.playClick();
                    handleStartLevel('all');
                  }}
                  className="px-7 py-4 bg-yellow-400 hover:bg-yellow-300 text-yellow-950 font-black rounded-2xl shadow-md transition active:scale-95 flex items-center justify-center gap-2 shrink-0 text-base"
                >
                  <span>15 feladat indítása</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* 1. SZINT: KÖNNYŰ */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition border-3 border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-xl shrink-0">
                    1
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-black text-slate-900">
                        1. szint: Ismerkedő & Alapok
                      </h4>
                      <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[11px] font-black rounded-full uppercase">
                        Könnyű (5 feladat)
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      Kiejtési alakok felismerése, egyszerű minták és alapszabályok.
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-xs font-bold text-amber-700">
                      <Star className={`w-4 h-4 ${progress.completedLevels[`${selectedLawId}-1`] ? 'text-amber-500 fill-amber-400' : 'text-slate-300'}`} />
                      <span>{progress.completedLevels[`${selectedLawId}-1`] ? 'Teljesítve!' : 'Még nem teljesítve'}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    sound.playClick();
                    handleStartLevel(1);
                  }}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl shadow-md transition active:scale-95 flex items-center justify-center gap-2 shrink-0"
                >
                  <span>5 feladat</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* 2. SZINT: KÖZEPES */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition border-3 border-amber-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-black text-xl shrink-0">
                    2
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-black text-slate-900">
                        2. szint: Elemző & Szétválogató
                      </h4>
                      <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 text-[11px] font-black rounded-full uppercase">
                        Közepes (5 feladat)
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      Csoportosítás (zöngésedés vs zöngétlenedés), írásban jelölt vs nem jelölt és beírós gyakorlatok.
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-xs font-bold text-amber-700">
                      <Star className={`w-4 h-4 ${progress.completedLevels[`${selectedLawId}-2`] ? 'text-amber-500 fill-amber-400' : 'text-slate-300'}`} />
                      <span>{progress.completedLevels[`${selectedLawId}-2`] ? 'Teljesítve!' : 'Még nem teljesítve'}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    sound.playClick();
                    handleStartLevel(2);
                  }}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-2xl shadow-md transition active:scale-95 flex items-center justify-center gap-2 shrink-0"
                >
                  <span>5 feladat</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* 3. SZINT: NEHÉZ (MESTER) */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition border-3 border-rose-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center font-black text-xl shrink-0">
                    3
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-black text-slate-900">
                        3. szint: Mester & Detektív Kihívás
                      </h4>
                      <span className="px-2.5 py-0.5 bg-rose-100 text-rose-800 text-[11px] font-black rounded-full uppercase">
                        Mester (5 feladat)
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      Összetett hangváltások, helyesírási beírás (pl. barátság, mindnyájan) és mondatelemzés.
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-xs font-bold text-amber-700">
                      <Star className={`w-4 h-4 ${progress.completedLevels[`${selectedLawId}-3`] ? 'text-amber-500 fill-amber-400' : 'text-slate-300'}`} />
                      <span>{progress.completedLevels[`${selectedLawId}-3`] ? 'Teljesítve!' : 'Még nem teljesítve'}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    sound.playClick();
                    handleStartLevel(3);
                  }}
                  className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-black rounded-2xl shadow-md transition active:scale-95 flex items-center justify-center gap-2 shrink-0"
                >
                  <span>5 feladat</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* 3. NÉZET: GYAKORLÓ FELADAT (EXERCISE VIEW)                */}
        {/* ========================================================= */}
        {view === 'exercise' && currentQuestions.length > 0 && (
          <ExerciseView
            key={currentQuestions[currentQuestionIndex].id}
            question={currentQuestions[currentQuestionIndex]}
            questionIndex={currentQuestionIndex}
            totalQuestions={currentQuestions.length}
            lawTitle={selectedLawId === 'bajnoksag' ? 'Nagy bajnokság' : (currentLaw?.title || 'Gyakorló')}
            onNext={handleNextQuestion}
            onBack={() => setView('law_levels')}
          />
        )}

        {/* ========================================================= */}
        {/* 4. NÉZET: SZINT BEFEJEZVE (LEVEL COMPLETE VIEW)           */}
        {/* ========================================================= */}
        {view === 'level_complete' && (
          <LevelCompleteView
            score={currentScore}
            totalQuestions={currentQuestions.length}
            lawTitle={selectedLawId === 'bajnoksag' ? 'Nagy bajnokság' : (currentLaw?.title || 'Gyakorló')}
            difficultyTitle={selectedLevel === 'all' ? 'Teljes Gyakorló (15 feladat)' : `${selectedLevel}. szint`}
            earnedStars={earnedStarsForLevel}
            newBadgeTitle={newlyUnlockedBadge}
            onRetry={() => handleStartLevel(selectedLevel)}
            onChooseNext={() => {
              if (selectedLevel !== 'all' && selectedLevel < 3) {
                handleStartLevel((selectedLevel + 1) as 1 | 2 | 3);
              } else {
                setView('home');
              }
            }}
            onGoHome={() => setView('home')}
          />
        )}

      </main>

      {/* Kisokos Modál */}
      <TheoryModal
        isOpen={isTheoryOpen}
        onClose={() => setIsTheoryOpen(false)}
        initialTab={theoryInitialTab}
      />

      {/* Jelvények Modál */}
      <BadgesModal
        isOpen={isBadgesOpen}
        onClose={() => setIsBadgesOpen(false)}
        progress={progress}
      />

      {/* Lábléc */}
      <footer className="mt-12 py-6 border-t border-slate-200/80 bg-white/50 text-center text-xs text-slate-500 font-medium">
        <p>Mássalhangzótörvények gyakorló alkalmazás 5. osztályos diákok számára 🇭🇺</p>
        <p className="mt-1 text-slate-400">Részleges hasonulás • Teljes hasonulás • Összeolvadás • Rövidülés • Kiesés</p>
      </footer>

    </div>
  );
}
