// Talia fiszek: jedyne źródło prawdy dla powtórek (edytuje Claude, zasady w CLAUDE.md).
// Pola: id, front (pytanie), back (odpowiedź), src (lekcja lub "błąd"), box (1–5, Leitner),
// due (data "RRRR-MM-DD" albo null = nieaktywna, czeka na ukończenie lekcji),
// archived (opcjonalne, data "RRRR-MM-DD": karta opanowana, nie wraca do powtórek; wtedy due: null).
// Interwały: box 1 → 1 dzień, 2 → 3, 3 → 7, 4 → 16, 5 → 35. Poprawna odpowiedź w pudełku 5 → archiwum.
window.CARDS = [
  {
    id: "c0001", src: "lekcja 0001", box: 1, due: "2026-10-20",
    front: "Co robi React, gdy w handlerze wywołasz setCount(nowaWartość)?",
    back: "Planuje ponowny render: wywoła funkcję komponentu jeszcze raz z nowym stanem, porówna wynik z poprzednim i zmieni w DOM tylko różnice. Wartość count w bieżącym handlerze się nie zmienia.",
  },
  {
    id: "c0002", src: "lekcja 0001", box: 1, due: "2026-10-20",
    front: "count = 0; handler wywołuje trzy razy setCount(count + 1). Ile pokaże UI po kliknięciu i jak dostać +3?",
    back: "1, bo count to zdjęcie stanu z bieżącego renderu i każde wywołanie ustawia 0 + 1. Na +3: setCount(c => c + 1) trzy razy (funkcja aktualizująca, kolejka).",
  },
  {
    id: "c0003", src: "lekcja 0001", box: 1, due: "2026-10-20",
    front: "Jak w React zrobić odpowiednik computed z Vue (np. fullName z firstName i lastName)?",
    back: "Policzyć wartość zwykłym wyrażeniem w ciele komponentu. useMemo tylko dla drogich obliczeń. Nie synchronizować drugiego stanu przez useEffect.",
  },
  {
    id: "c0004", src: "lekcja 0001", box: 1, due: "2026-10-20",
    front: "Ile razy wykonuje się setup() w Vue, a ile funkcja komponentu w React?",
    back: "setup() raz na instancję komponentu. Funkcja komponentu Reacta przy każdym renderze (pierwszym i po każdej zmianie stanu swojej lub rodzica).",
  },
  {
    id: "c0005", src: "lekcja 0001", box: 1, due: "2026-10-20",
    front: "Dlaczego items.push(x) nie odświeży listy w React i jak zrobić to dobrze?",
    back: "Mutacja nie zmienia referencji i nie planuje renderu, a React porównuje referencje. Poprawnie: setItems([...items, x]).",
  },
  {
    id: "c0006", src: "lekcja 0001", box: 1, due: "2026-10-20",
    front: "Po co Strict Mode w trybie deweloperskim wywołuje komponent dwa razy?",
    back: "Żeby ujawnić efekty uboczne w ciele komponentu. Render musi być czysty, bo React może go wywoływać wielokrotnie.",
  },
  {
    id: "c0007", src: "lekcja 0001", box: 1, due: "2026-10-20",
    front: "Do czego naprawdę służy useEffect i czym różni się od watch z Vue?",
    back: "Do synchronizacji z systemem zewnętrznym (API przeglądarki, subskrypcja, biblioteka spoza Reacta). Na zmianę stanu reaguje się w handlerze zdarzenia, które ją wywołało, a nie w efekcie.",
  },
  {
    id: "c0008", src: "lekcja 0001", box: 1, due: "2026-10-20",
    front: "Czym różni się useRef od useState?",
    back: "Oba przechowują wartość między renderami. Zmiana stanu z useState planuje render, zmiana ref.current nie.",
  },
  {
    id: "c0009", src: "lekcja 0001", box: 1, due: "2026-10-20",
    front: "Co oznaczają fazy „render” i „commit” w React?",
    back: "Render: React wywołuje komponenty i wylicza nowy wynik (JSX). Commit: React nanosi na DOM tylko różnice względem poprzedniego renderu.",
  },
  {
    id: "c0010", src: "lekcja 0001", box: 1, due: "2026-10-20",
    front: "count = 5; handler: setCount(count + 1); console.log(count). Co pokaże konsola?",
    back: "5. W ramach bieżącego renderu count jest stałą; nowa wartość pojawi się w następnym wywołaniu komponentu.",
  },
  {
    id: "c0011", src: "błąd (test wstępny M0)", box: 1, due: "2026-10-20",
    front: "Który plik w katalogu głównym mówi pnpm, które katalogi są pakietami workspace'u, i jak wygląda jego zawartość?",
    back: "pnpm-workspace.yaml z listą globów w polu packages, np. packages: ['apps/*', 'packages/*'].",
  },
  {
    id: "c0012", src: "błąd (test wstępny M0)", box: 1, due: "2026-10-20",
    front: "Co zrobi pnpm run dev w katalogu głównym monorepo i jak uruchomić dev tylko w jednym pakiecie?",
    back: "Uruchomi skrypt dev z głównego package.json (o ile istnieje), a nie z pakietów. Jeden pakiet: pnpm --filter <nazwa-z-package.json> dev (albo pnpm -C apps/web dev). Wszystkie: pnpm -r dev.",
  },
  {
    id: "c0013", src: "błąd (test wstępny M0)", box: 1, due: "2026-10-20",
    front: "Podaj dwie flagi, które włącza \"strict\": true w tsconfig, i do każdej błąd, który dzięki niej TypeScript złapie.",
    back: "Np. strictNullChecks: user.name, gdy user może być undefined. noImplicitAny: parametr funkcji bez typu, który po cichu dostałby any. Inne: strictFunctionTypes, strictPropertyInitialization, useUnknownInCatchVariables (catch (e) daje unknown), noImplicitThis, alwaysStrict, strictBindCallApply.",
  },
  {
    id: "c0014", src: "błąd (quiz 0001, pyt. 4)", box: 1, due: "2026-10-20",
    front: "count = 5. Handler: setCount(count + 1), a zaraz potem fetch('/api/save', { body: String(count) }). Co wyśle fetch i jak wysłać nową wartość?",
    back: "\"5\", bo count to zdjęcie z bieżącego renderu. Nową wartość policz do zmiennej i użyj jej w obu miejscach: const next = count + 1; setCount(next); fetch(..., { body: String(next) }).",
  },
  {
    id: "c0015", src: "błąd (pytanie rekrutacyjne 0001)", box: 1, due: "2026-10-20",
    front: "Mechanizm, nie składnia: skąd Vue wie, co przerysować po zmianie stanu, a co robi React?",
    back: "Vue: Proxy zapamiętuje, które efekty (render, computed, watch) czytały dane pole, i po zmianie uruchamia tylko je. React nie śledzi zależności: setState planuje ponowne wywołanie funkcji komponentu (i jego dzieci), porównuje nowy JSX z poprzednim i nanosi na DOM tylko różnice.",
  },
  {
    id: "c0016", src: "błąd (pytanie rekrutacyjne 0001)", box: 1, due: "2026-10-20",
    front: "Vue: w handlerze count.value++, a zaraz potem czytasz count.value i tekst przycisku w DOM. Co zobaczysz?",
    back: "count.value ma już nową wartość, ale DOM jeszcze starą: Vue buforuje aktualizacje DOM do nextTick. W React w tym samym handlerze nie zmieni się nawet zmienna count.",
  },
];
