# 🎓 Mássalhangzótörvények Gyakorló Alkalmazás — 5. osztály

Interaktív, modern és játékos magyar nyelvtan oktató és gyakorló webalkalmazás 5. osztályos tanulók számára.

Készült: **Next.js 14**, **TypeScript**, **Tailwind CSS**, **Lucide ikonok** és **Web Audio API** technológiákkal.

---

## 🌟 Főbb Jellemzők

1. **Lépcsőzetes nehézségi szintek (Progression):**
   - 🟢 **1. szint: Ismerkedő & Alapok (Könnyű)** – kiejtési alakok kiválasztása, alapszabályok, közvetlen minták.
   - 🟡 **2. szint: Elemző & Szétválogató (Közepes)** – csoportosító kosaras játék (pl. zöngésedés vs. zöngétlenedés; írásban jelölt vs. nem jelölt teljes hasonulás).
   - 🔴 **3. szint: Mester & Detektív Kihívás (Nehéz)** – toldalékolás, összetett hangtani elemzés, mondatban rejtőzködő mássalhangzótörvények megtalálása.

2. **Külön-külön gyakorló feladat mind az 5 törvényre:**
   - 🔶 **Részleges hasonulás:**
     - Zöngésség szerinti (zöngésedés és zöngétlenedés)
     - Képzés helye szerinti ($n + p/b \rightarrow m$)
   - 🔷 **Teljes hasonulás:**
     - Írásban jelölt (toldalékok: *-val/-vel*, *-vá/-vé*, *ez/az* névmások)
     - Írásban nem jelölt (családnevek, szavak kiejtése)
   - 🟢 **Összeolvadás:**
     - Új, harmadik hosszú hang képződése ($t+j \rightarrow [tty]$, $d+j \rightarrow [ggy]$, $d+sz \rightarrow [cc]$, $t+s \rightarrow [ccs]$, $n+j \rightarrow [nny]$)
   - 🟣 **Mássalhangzó-rövidülés:**
     - Hosszú és rövid mássalhangzó találkozásakor a hosszú megrövidül a kiejtésben (pl. *otthon* $\rightarrow$ *[othon]*, *jobbra* $\rightarrow$ *[jobra]*)
   - 🔴 **Mássalhangzó-kiesés:**
     - Három különböző mássalhangzó torlódásakor a középső kiesik (pl. *mindnyájan* $\rightarrow$ *[minnyájan]*, *azt hitte* $\rightarrow$ *[az hitte]*)
   - 🏆 **Nagy Bajnokság Kaland:**
     - Vegyes tudáspróba az összes törvényből!

3. **Mássalhangzó Kisokos (Tudástár):**
   - Zöngés-Zöngétlen párok színes, áttekinthető táblázata ($b \leftrightarrow p$, $d \leftrightarrow t$, $g \leftrightarrow k$, $z \leftrightarrow sz$, $zs \leftrightarrow s$, $v \leftrightarrow f$, $gy \leftrightarrow ty$, $dz \leftrightarrow c$, $dzs \leftrightarrow cs$).
   - Páratlan zöngések ($m, n, ny, l, r, j$) és a páratlan zöngétlen ($h$).
   - Érthető gégerezgéses trükk és aranyszabályok minden témakörhöz.

4. **Játékosítás és motiváció (Gamification):**
   - ✍️ **Helyesírási beírós feladatok:** kiejtett alak alapján [baráccság] a tanulónak be kell gépelnie a helyes írásmódot (barátság).
   - 🎲 **Kevert válaszlehetőségek:** a feleletválasztós kérdéseknél a jó válasz mindig véletlenszerű helyen jelenik meg.
   - ⭐ **Csillaggyűjtés** és szintértékelés (1–3 csillag minden pályán).
   - 🏅 **Jelvényrendszer:** kitüntetések a témakörök és a bajnokság teljesítéséért.
   - 🎉 **Konfettieső** és beépített tiszta szintetizált sikerhangok (offline is működik, nem kell külső hangfájl).
   - 💡 **Kérhető segítség (Tipp)** minden kérdésnél, ha a diák elakadna.
   - 💬 **Részletes magyarázat** minden válaszadás után (nemcsak a helyes választ közli, hanem azt is, hogy miért az a helyes).

---

## 🚀 Futtatás helyi környezetben

Az alkalmazás indításához a terminálban futtasd a következő parancsot:

```bash
npm run dev
```

Ezután nyisd meg a böngészőben a következő címet:
👉 **http://localhost:3000**

---

## 📁 Projekt Felépítés

```
mshtörvények/
├── src/
│   ├── app/
│   │   ├── globals.css          # Egyedi dizájn és Tailwind direktívák
│   │   ├── layout.tsx           # Alkalmazás keret és metaadatok
│   │   └── page.tsx             # Főoldal, állapotkezelés és szintválasztás
│   ├── components/
│   │   ├── Header.tsx           # Fejléc pontokkal, csillagokkal, némítással
│   │   ├── LawCard.tsx          # Törvénykártyák a főoldalon
│   │   ├── ExerciseView.tsx     # Kérdéskártya, animációk, visszajelzések
│   │   ├── SortExercise.tsx     # Kosaras csoportosító játék
│   │   ├── LevelCompleteView.tsx# Sikeres szintbefejezés és érmék
│   │   ├── TheoryModal.tsx      # Részletes Kisokos és hangtani táblázat
│   │   └── BadgesModal.tsx      # Jelvények áttekintése
│   ├── data/
│   │   ├── laws.ts              # 5. osztályos tananyag, definíciók és párok
│   │   └── questions.ts         # Több mint 75 lépcsőzetes feladat és helyesírási beírós feladvány
│   ├── types/
│   │   └── index.ts             # TypeScript interfészek és típusok
│   └── utils/
│       ├── confetti.ts          # Konfetti animációk
│       ├── sound.ts             # Web Audio API hangeffektek
│       └── storage.ts           # Előrehaladás mentése (localStorage)
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```
