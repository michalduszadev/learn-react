// Talia fiszek: jedyne źródło prawdy dla powtórek (edytuje Claude, zasady w CLAUDE.md).
// Pola: id, front (pytanie), back (odpowiedź), src (lekcja lub "błąd"), box (1–5, Leitner),
// due (data "RRRR-MM-DD" albo null = nieaktywna, czeka na ukończenie lekcji).
// Interwały: box 1 → 1 dzień, 2 → 3, 3 → 7, 4 → 16, 5 → 35.
window.CARDS = [
  {
    id: "c0001", src: "lekcja 0001", box: 1, due: null,
    front: "Co robi React, gdy w handlerze wywołasz setCount(nowaWartość)?",
    back: "Planuje ponowny render: wywoła funkcję komponentu jeszcze raz z nowym stanem, porówna wynik z poprzednim i zmieni w DOM tylko różnice. Wartość count w bieżącym handlerze się nie zmienia.",
  },
  {
    id: "c0002", src: "lekcja 0001", box: 1, due: null,
    front: "count = 0; handler wywołuje trzy razy setCount(count + 1). Ile pokaże UI po kliknięciu i jak dostać +3?",
    back: "1, bo count to zdjęcie stanu z bieżącego renderu i każde wywołanie ustawia 0 + 1. Na +3: setCount(c => c + 1) trzy razy (funkcja aktualizująca, kolejka).",
  },
  {
    id: "c0003", src: "lekcja 0001", box: 1, due: null,
    front: "Jak w React zrobić odpowiednik computed z Vue (np. fullName z firstName i lastName)?",
    back: "Policzyć wartość zwykłym wyrażeniem w ciele komponentu. useMemo tylko dla drogich obliczeń. Nie synchronizować drugiego stanu przez useEffect.",
  },
  {
    id: "c0004", src: "lekcja 0001", box: 1, due: null,
    front: "Ile razy wykonuje się setup() w Vue, a ile funkcja komponentu w React?",
    back: "setup() raz na instancję komponentu. Funkcja komponentu Reacta przy każdym renderze (pierwszym i po każdej zmianie stanu swojej lub rodzica).",
  },
  {
    id: "c0005", src: "lekcja 0001", box: 1, due: null,
    front: "Dlaczego items.push(x) nie odświeży listy w React i jak zrobić to dobrze?",
    back: "Mutacja nie zmienia referencji i nie planuje renderu, a React porównuje referencje. Poprawnie: setItems([...items, x]).",
  },
  {
    id: "c0006", src: "lekcja 0001", box: 1, due: null,
    front: "Po co Strict Mode w trybie deweloperskim wywołuje komponent dwa razy?",
    back: "Żeby ujawnić efekty uboczne w ciele komponentu. Render musi być czysty, bo React może go wywoływać wielokrotnie.",
  },
  {
    id: "c0007", src: "lekcja 0001", box: 1, due: null,
    front: "Do czego naprawdę służy useEffect i czym różni się od watch z Vue?",
    back: "Do synchronizacji z systemem zewnętrznym (API przeglądarki, subskrypcja, biblioteka spoza Reacta). Na zmianę stanu reaguje się w handlerze zdarzenia, które ją wywołało, a nie w efekcie.",
  },
  {
    id: "c0008", src: "lekcja 0001", box: 1, due: null,
    front: "Czym różni się useRef od useState?",
    back: "Oba przechowują wartość między renderami. Zmiana stanu z useState planuje render, zmiana ref.current nie.",
  },
  {
    id: "c0009", src: "lekcja 0001", box: 1, due: null,
    front: "Co oznaczają fazy „render” i „commit” w React?",
    back: "Render: React wywołuje komponenty i wylicza nowy wynik (JSX). Commit: React nanosi na DOM tylko różnice względem poprzedniego renderu.",
  },
  {
    id: "c0010", src: "lekcja 0001", box: 1, due: null,
    front: "count = 5; handler: setCount(count + 1); console.log(count). Co pokaże konsola?",
    back: "5. W ramach bieżącego renderu count jest stałą; nowa wartość pojawi się w następnym wywołaniu komponentu.",
  },
];
