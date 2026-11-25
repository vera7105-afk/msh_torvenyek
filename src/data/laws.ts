import { LawInfo } from '@/types';

export const LAWS_INFO: LawInfo[] = [
  {
    id: 'reszleges_hasonulas',
    title: 'Részleges hasonulás',
    shortDescription: 'Két szomszédos mássalhangzó közül az egyik csak részben változik meg: a másikhoz hasonul zöngésségben vagy képzési helyben.',
    badgeTitle: 'Hasonulás Kutatója',
    iconName: 'ArrowRightLeft',
    color: 'from-amber-500 to-orange-500',
    bgLight: 'bg-amber-50',
    borderLight: 'border-amber-200',
    textColor: 'text-amber-800',
    keyRule: 'Két hang találkozik: az egyik hasonul a másikhoz, de NEM válnak teljesen azonossá!',
    summary: 'Részleges hasonuláskor a két találkozó mássalhangzó közül az egyik átveszi a szomszédja zöngésségét (zöngésedés / zöngétlenedés) vagy képzési helyét (n -> m).',
    subtypes: [
      {
        name: 'Zöngésség szerinti részleges hasonulás',
        rule: 'Ha egy zöngés és egy zöngétlen hang találkozik, a hátul álló második hang megváltoztatja az elöl álló első hang zöngésségét.',
        formula: '1. hang + 2. hang ➔ a 2. hang eldönti, milyen legyen az 1. hang!',
        hint: 'Képzeld el, hogy a második hang a "főnök"! Ha ő zöngés, az első is zöngés lesz (zöngésedés: p -> b). Ha zöngétlen, az első is megijed és zöngétlen lesz (zöngétlenedés: z -> sz).',
        examples: [
          { word: 'népdal', phonetic: '[nébdal]', explanation: 'A "p" (zöngétlen) a "d" (zöngés) előtt zöngés "b" hanggá válik ➔ zöngésedés.' },
          { word: 'vasgolyó', phonetic: '[vazsgolyó]', explanation: 'Az "s" (zöngétlen) a "g" (zöngés) előtt zöngés "zs" hanggá változik ➔ zöngésedés.' },
          { word: 'hozta', phonetic: '[hoszta]', explanation: 'A "z" (zöngés) a "t" (zöngétlen) előtt zöngétlen "sz" hanggá válik ➔ zöngétlenedés.' },
          { word: 'vágta', phonetic: '[vákta]', explanation: 'A "g" (zöngés) a "t" (zöngétlen) előtt "k" (zöngétlen) lesz ➔ zöngétlenedés.' }
        ]
      },
      {
        name: 'Képzés helye szerinti részleges hasonulás',
        rule: 'Az "n" hang "p" vagy "b" előtt ajakhanggá válik, azaz "m"-nek ejtjük.',
        formula: 'n + p/b ➔ kiejtve: [m + p/b]',
        hint: 'Figyeld meg a szádat: a "p" és "b" hangot két ajakkal képezzük. Sokkal kényelmesebb előtte "m" hangot képezni az "n" helyett!',
        examples: [
          { word: 'színpad', phonetic: '[szímpad]', explanation: 'A "szín" n-je a "p" előtt "m"-mé változik kiejtésben.' },
          { word: 'azonban', phonetic: '[azomban]', explanation: 'Az "n" a "b" előtt könnyedén "m"-mé alakul kiejtve.' },
          { word: 'különben', phonetic: '[külömben]', explanation: 'Az "n" a "b" előtt ajakhanggá, "m"-mé alakul.' }
        ]
      }
    ]
  },
  {
    id: 'teljes_hasonulas',
    title: 'Teljes hasonulás',
    shortDescription: 'Két mássalhangzó találkozásakor az egyik teljesen olyanná válik, mint a másik: egy hosszú mássalhangzó jön létre!',
    badgeTitle: 'Ikresítő Bajnok',
    iconName: 'Copy',
    color: 'from-blue-600 to-indigo-600',
    bgLight: 'bg-blue-50',
    borderLight: 'border-blue-200',
    textColor: 'text-blue-800',
    keyRule: 'Két mássalhangzóból teljesen azonos, hosszú mássalhangzó lesz!',
    summary: 'A teljes hasonulás lehet írásban jelölt (le is írjuk hosszan: pl. kézzel) vagy írásban nem jelölt (csak kiejtésben hallatszik hosszan: pl. anyja [annya]).',
    subtypes: [
      {
        name: 'Írásban jelölt teljes hasonulás',
        rule: 'A -val/-vel, -vá/-vé ragok "v" betűje, valamint az "ez, az" mutató névmások z-je teljesen hasonul a kapcsolódó szóhoz, és EZT LE IS ÍRJUK!',
        formula: 'szótő + -val/-vel vagy ez/az + toldalék ➔ megkettőződik a mássalhangzó írásban is!',
        hint: 'Ha a leírt szóban kettőzött betűt látsz, amit egy rag (-val/-vel, -vá/-vé) vagy az ez/az szó okozott, az mindig írásban jelölt teljes hasonulás!',
        examples: [
          { word: 'lábbal', phonetic: '[lábbal]', explanation: 'láb + val = a "v" teljesen azonossá vált a "b"-vel ➔ lábbal.' },
          { word: 'késsel', phonetic: '[késsel]', explanation: 'kés + vel = késsel.' },
          { word: 'ebben', phonetic: '[ebben]', explanation: 'ez + ben = ebben (a "z" teljesen átváltozott "b"-re).' },
          { word: 'virággá', phonetic: '[virággá]', explanation: 'virág + vá = virággá.' }
        ]
      },
      {
        name: 'Írásban nem jelölt teljes hasonulás',
        rule: 'Kiejtésben az egyik hang teljesen azonossá válik a másikkal (hosszú hangot hallunk), de ezt helyesírásilag NEM jelöljük a leíráskor!',
        formula: 'Írásban két különböző betű ➔ Kiejtésben a második hang megduplázódik!',
        hint: 'Gondolj a családtagokra: "anyja", "apja", "bátyja"! Leírva ny+j vagy ty+j, de kiejtve [annya], [báttya], vagyis a j teljesen beolvadt!',
        examples: [
          { word: 'anyja', phonetic: '[annya]', explanation: 'Írva: ny + j, kiejtve hosszú [nny] hang hallatszik.' },
          { word: 'egészség', phonetic: '[egésség]', explanation: 'Írva: sz + s, kiejtve hosszú [ss] hangot ejtünk.' },
          { word: 'község', phonetic: '[kösség]', explanation: 'Írva: z + s, kiejtve tiszta hosszú [ss] hang.' },
          { word: 'bátyja', phonetic: '[báttya]', explanation: 'Írva: ty + j, kiejtve hosszú [tty] hang.' }
        ]
      }
    ]
  },
  {
    id: 'osszeolvadas',
    title: 'Összeolvadás',
    shortDescription: 'Két különböző mássalhangzó találkozik, és egy teljesen új, harmadik, hosszú mássalhangzó keletkezik belőlük!',
    badgeTitle: 'Összeolvadás Mestere',
    iconName: 'Sparkles',
    color: 'from-emerald-500 to-teal-600',
    bgLight: 'bg-emerald-50',
    borderLight: 'border-emerald-200',
    textColor: 'text-emerald-800',
    keyRule: '1. hang + 2. hang = egy teljesen ÚJ 3. hang (hosszúan ejtve)!',
    summary: 'Összeolvadásnál sem az első, sem a második hang nem marad meg eredeti formájában; helyettük egy új, harmadik hosszú mássalhangzót (pl. [ty], [gy], [c], [cs]) ejtünk.',
    subtypes: [
      {
        name: '1. csoport: t / d + j találkozása ➔ [tty] vagy [ggy]',
        rule: 'A t + j hangokból hosszú [tty], a d + j hangokból pedig hosszú [ggy] keletkezik.',
        formula: 't + j ➔ [tty] | d + j ➔ [ggy]',
        hint: 'A "j" igazi varázsló: a t-ből [ty]-t csinál (látja ➔ [láttya]), a d-ből pedig [gy]-t varázsol (adja ➔ [aggya])!',
        examples: [
          { word: 'látja', phonetic: '[láttya]', explanation: 'A "t" és "j" összeolvad, kiejtve hosszú [tty] lesz.' },
          { word: 'adja', phonetic: '[aggya]', explanation: 'A "d" és "j" összeolvad, kiejtve hosszú [ggy] lesz.' },
          { word: 'tudja', phonetic: '[tuggya]', explanation: 'A "d" és "j" helyett hosszú [ggy]-t ejtünk.' },
          { word: 'bontja', phonetic: '[bonttya]', explanation: 'A "t" és "j" helyett hosszú [tty]-t hallunk.' }
        ]
      },
      {
        name: '2. csoport: t / d + sz találkozása ➔ hosszú [cc]',
        rule: 'A t + sz és a d + sz hangkapcsolatból hosszú [cc] hang jön létre kiejtéskor.',
        formula: 't + sz ➔ [cc] | d + sz ➔ [cc]',
        hint: 'Gondolj az igei személyragokra: te adsz ➔ [acc], te látsz ➔ [lácc]!',
        examples: [
          { word: 'adsz', phonetic: '[acc]', explanation: 'A "d" és "sz" találkozásából hosszú [cc] hang keletkezik.' },
          { word: 'látsz', phonetic: '[lácc]', explanation: 'A "t" és "sz" találkozásából hosszú [cc] hang lesz.' },
          { word: 'tudsz', phonetic: '[tucc]', explanation: 'A "d" és "sz" összeolvad hosszú [cc]-vé.' }
        ]
      },
      {
        name: '3. csoport: t + s találkozása ➔ hosszú [ccs]',
        rule: 'A t + s hangok összeolvadásakor hosszú [ccs] hangot ejtünk.',
        formula: 't + s ➔ [ccs]',
        hint: 'Keresd a barátság szót: barát + ság ➔ [baráccság], vagy tanít + sa ➔ [taníccsa]!',
        examples: [
          { word: 'barátság', phonetic: '[baráccság]', explanation: 'A "t" és "s" összeolvad: leírva barátság, kiejtve [baráccság].' },
          { word: 'tanítsa', phonetic: '[taníccsa]', explanation: 'A "t" és "s" helyett kiejtve hosszú [ccs] hallatszik.' },
          { word: 'fűtse', phonetic: '[fűccse]', explanation: 'A "t" és "s" helyett [ccs]-t ejtünk.' }
        ]
      },
      {
        name: '4. csoport: n + j találkozása ➔ hosszú [nny]',
        rule: 'Az n + j hangkapcsolat összeolvad, és hosszú [nny] hangot eredményez.',
        formula: 'n + j ➔ [nny]',
        hint: 'Például: fon + ja ➔ [fonnya], bán + ja ➔ [bánnya]!',
        examples: [
          { word: 'fonja', phonetic: '[fonnya]', explanation: 'Az "n" és "j" összeolvadásakor hosszú [nny] keletkezik.' },
          { word: 'bánja', phonetic: '[bánnya]', explanation: 'Az "n" és "j" helyett kiejtve [nny]-t mondunk.' },
          { word: 'kenje', phonetic: '[kennye]', explanation: 'Az "n" és "j" helyett hosszú [nny] hallatszik.' }
        ]
      }
    ]
  },
  {
    id: 'rovidules',
    title: 'Mássalhangzó-rövidülés',
    shortDescription: 'Egy hosszú mássalhangzó mellett egy másik mássalhangzó áll: ilyenkor a hosszú mássalhangzót a beszédben röviden ejtjük.',
    badgeTitle: 'Gyorsaság Bajnoka',
    iconName: 'Minimize2',
    color: 'from-purple-600 to-pink-600',
    bgLight: 'bg-purple-50',
    borderLight: 'border-purple-200',
    textColor: 'text-purple-800',
    keyRule: 'Hosszú (kettőzött) msh + egy másik msh ➔ a hosszú hangot RÖVIDEN ejtjük!',
    summary: 'A magyar kiejtésben nehéz és fárasztó egy hosszú és egy rövid mássalhangzót egymás mellett kimondani, ezért a beszéd kényelme miatt a hosszú hangot megrövidítjük.',
    subtypes: [
      {
        name: '1. eset: Hosszú mássalhangzó egy másik mássalhangzó előtt',
        rule: 'Ha egy hosszú (kettőzött) mássalhangzó után egy másik mássalhangzó következik, a hosszút megrövidítjük a kiejtésben.',
        formula: 'Hosszú msh (tt, bb, rr...) + Rövid msh ➔ Kiejtve: mindkettő rövid!',
        hint: 'Keresd a szavakban a kettőzött betűt (tt, bb, rr)! Ha mellette mássalhangzó áll, próbáld kimondani: nem fogod elnyújtani!',
        examples: [
          { word: 'otthon', phonetic: '[othon]', explanation: 'A leírt hosszú "tt" után ott a "h", így kiejtésben rövid "t"-t mondunk: [othon].' },
          { word: 'jobbra', phonetic: '[jobra]', explanation: 'A hosszú "bb" az "r" előtt megrövidül a kiejtésben: [jobra].' },
          { word: 'szebbre', phonetic: '[szebre]', explanation: 'A leírt "bbr" hangokból rövid [b]-t ejtünk: [szebre].' },
          { word: 'varrhat', phonetic: '[varhat]', explanation: 'A hosszú "rr" a "h" előtt megrövidül: [varhat].' }
        ]
      },
      {
        name: '2. eset: Hosszú mássalhangzó egy másik mássalhangzó után',
        rule: 'Ha a hosszú mássalhangzó előtt áll egy másik mássalhangzó, a hosszú hang ugyanúgy megrövidül a beszédben.',
        formula: 'Rövid msh + Hosszú msh (ll, ssz...) ➔ Kiejtve röviden mondjuk!',
        hint: 'Például hall + gat: a két "l" után jön a "g", megrövidül: [halgat]!',
        examples: [
          { word: 'hallgat', phonetic: '[halgat]', explanation: 'A leírt "llg" kapcsolatban a hosszú "ll" helyett rövid "l"-t ejtünk.' },
          { word: 'álljunk', phonetic: '[áljunk]', explanation: 'A hosszú "ll" a "j" előtt megrövidül: [áljunk].' },
          { word: 'visszahoz', phonetic: '[viszahoz]', explanation: 'A leírt "ssz" a "h" előtt röviden hangzik: [viszahoz].' },
          { word: 'kulcscsomó', phonetic: '[kulcsomó]', explanation: 'A "kulcs" cs-je és a "csomó" cs-je találkozásakor a hangot röviden mondjuk.' }
        ]
      }
    ]
  },
  {
    id: 'kieses',
    title: 'Mássalhangzó-kiesés',
    shortDescription: 'Három különböző mássalhangzó találkozásakor a kényelmesebb kiejtés miatt a középső hang egyszerűen kiesik!',
    badgeTitle: 'Nyomolvasó Mester',
    iconName: 'UserMinus',
    color: 'from-rose-500 to-red-600',
    bgLight: 'bg-rose-50',
    borderLight: 'border-rose-200',
    textColor: 'text-rose-800',
    keyRule: '3 különböző mássalhangzó egymás mellett ➔ a középső KIESIK a beszédben!',
    summary: 'Három egymást követő mássalhangzót (torlódást) kimondani túl fárasztó a nyelvünknek, ezért a középső hangot a kiejtés során elhagyjuk.',
    subtypes: [
      {
        name: '1. eset: Kiesés szótő és toldalék találkozásakor',
        rule: 'Ha a szótő végi két mássalhangzóhoz egy újabb mássalhangzóval kezdődő toldalék járul, a középső hang kimarad.',
        formula: '1. msh + [2. msh] + 3. msh ➔ a középső elpárolog!',
        hint: 'Számold meg a betűket! n-d-t (mondta) vagy l-d-t (küldte) esetén a középső d hangot észrevétlenül kihagyod!',
        examples: [
          { word: 'mondta', phonetic: '[monta]', explanation: 'Az "n-d-t" hármasból a középső "d" kiesik a kiejtésben: [monta].' },
          { word: 'küldte', phonetic: '[külte]', explanation: 'Az "l-d-t" torlódásból a középső "d" hang elmarad: [külte].' },
          { word: 'mindnyájan', phonetic: '[minnyájan]', explanation: 'Az "n-d-ny" három hangból a középső "d" teljesen eltűnik: [minnyájan].' },
          { word: 'ajánlkozott', phonetic: '[ajánkozott]', explanation: 'Az "n-l-k" hangkapcsolatból a középső "l" kiesik: [ajánkozott].' }
        ]
      },
      {
        name: '2. eset: Kiesés szókapcsolatokban és összetett szavakban',
        rule: 'Két szó találkozásakor vagy összetett szavak határán a három mássalhangzóból a középső kiesik.',
        formula: 'Szóhatáron lévő 3 msh ➔ középső kiesik a beszédben!',
        hint: 'Gondolj az "azt hitte" kifejezésre: a z-t-h közül a t hangot senki sem mondja ki!',
        examples: [
          { word: 'azt hitte', phonetic: '[az hitte]', explanation: 'A "z-t-h" mássalhangzó-torlódásban a középső "t" kiesik: [az hitte].' },
          { word: 'rendhagyó', phonetic: '[renhagyó]', explanation: 'Az "n-d-h" kapcsolatban a középső "d" kiesik: [renhagyó].' },
          { word: 'csukd be', phonetic: '[csug be]', explanation: 'A "k-d-b" torlódásból a "d" kiesik (a k pedig zöngésedik g-vé).' }
        ]
      }
    ]
  }
];

export const CONSONANT_PAIRS = [
  { voiced: 'b', voiceless: 'p', pairName: 'b ⟷ p' },
  { voiced: 'd', voiceless: 't', pairName: 'd ⟷ t' },
  { voiced: 'g', voiceless: 'k', pairName: 'g ⟷ k' },
  { voiced: 'z', voiceless: 'sz', pairName: 'z ⟷ sz' },
  { voiced: 'zs', voiceless: 's', pairName: 'zs ⟷ s' },
  { voiced: 'v', voiceless: 'f', pairName: 'v ⟷ f' },
  { voiced: 'gy', voiceless: 'ty', pairName: 'gy ⟷ ty' },
  { voiced: 'dz', voiceless: 'c', pairName: 'dz ⟷ c' },
  { voiced: 'dzs', voiceless: 'cs', pairName: 'dzs ⟷ cs' },
];

export const UNPAIRED_CONSONANTS = {
  voiced: ['m', 'n', 'ny', 'l', 'r', 'j'],
  voiceless: ['h']
};
