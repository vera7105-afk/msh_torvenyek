export type LawCategory = 
  | 'reszleges_hasonulas'
  | 'teljes_hasonulas'
  | 'osszeolvadas'
  | 'rovidules'
  | 'kieses';

export type LawSubtype = 
  | 'zongesseg_szerinti'
  | 'kepzes_helye_szerinti'
  | 'irasban_jelolt'
  | 'irasban_nem_jelolt'
  | 'osszeolvadas_altalanos'
  | 'rovidules_altalanos'
  | 'kieses_altalanos';

export type DifficultyLevel = 1 | 2 | 3; // 1: Könnyű (Alapok), 2: Közepes (Kiejtés & Elemzés), 3: Mester (Kihívás & Alkotás)

export type ExerciseType = 
  | 'multiple_choice'   // Hagyományos feleletválasztós (Melyik törvény? Hogyan ejtjük?)
  | 'pronunciation'     // Kiejtési alak megadása / kitalálása
  | 'word_formation'    // Szóalkotás (pl. kéz + vel = ?)
  | 'categorization'    // Két csoportba válogatás
  | 'detective'         // Mi történt a hangokkal? (Melyik hang mivé változott?)
  | 'spelling';         // Diáknak kell beírnia a helyesen leírt szót (pl. kiejtve: [baráccság] -> írd le: barátság)

export interface Question {
  id: string;
  category: LawCategory;
  subtype?: LawSubtype;
  difficulty: DifficultyLevel;
  type: ExerciseType;
  prompt: string;               // A feladat utasítása (pl. "Melyik mássalhangzótörvény érvényesül ebben a szóban?")
  word: string;                 // A vizsgált szó (pl. "népdal")
  writtenForm?: string;         // Írott alak
  phoneticForm?: string;        // Kiejtett alak (pl. "[nébdal]")
  lettersInvolved?: string;     // Érintett betűk kiemelése (pl. "pd -> bd")
  options: string[];            // Lehetséges válaszok
  correctAnswer: string;        // Helyes válasz
  explanation: string;          // Részletes, 5.-eseknek szóló magyarázat
  ruleHint?: string;            // Segítség / trükk
  categoriesForSorting?: {      // Csoportosító feladathoz
    leftCategory: string;
    rightCategory: string;
    items: { word: string; group: 'left' | 'right'; phonetic: string }[];
  };
}

export interface LawInfo {
  id: LawCategory;
  title: string;
  shortDescription: string;
  badgeTitle: string;
  iconName: string;
  color: string;
  bgLight: string;
  borderLight: string;
  textColor: string;
  subtypes: {
    name: string;
    rule: string;
    formula?: string;
    examples: { word: string; phonetic: string; explanation: string }[];
    hint: string;
  }[];
  summary: string;
  keyRule: string;
}

export interface UserProgress {
  stars: number;
  completedLevels: Record<string, boolean>; // pl: "reszleges_hasonulas-1": true
  scores: Record<string, number>;          // max pontszám témakörönként
  badges: string[];
}
