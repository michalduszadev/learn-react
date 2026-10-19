# Roadmapa: React → fullstack przez projekt Job Tracker

**Job Tracker** to aplikacja do śledzenia rekrutacji: zapisujesz oferty i ich status, a na końcu LLM analizuje wklejone ogłoszenie i ocenia dopasowanie do Twojego profilu.

Zasady:
- **Bez terminów.** Moduły robisz po kolei, każdy kończy się działającą aplikacją.
- **Kod piszesz Ty.** Claude jest mentorem (zasady w [`CLAUDE.md`](CLAUDE.md)).
- **Każdy moduł zaczyna się testem wstępnym**: pytania od łatwych do trudnych w czacie. To, co już umiesz, oznaczamy jako „pominięte (test wstępny)” i nie przerabiamy.
- **Moduł jest ukończony**, gdy: wszystkie punkty są odhaczone lub pominięte, spełniasz „definicję ukończenia”, zdałeś egzamin końcowy (pytania o rosnącej trudności), zaliczyłeś sesję `/grilling` i potrafisz odpowiedzieć na pytania rekrutacyjne z danego modułu.
- **Po podpowiedzi z 3. lub 4. szczebla** zadanie kończy się dopiero, gdy odtworzysz ten fragment od zera, bez pomocy.
- **Powtórki:** fiszki w [`learning/cards/`](learning/cards/cards.js) (system pudełek Leitnera), ćwiczysz w czacie albo w [`learning/practice/`](learning/practice/index.html). Każdy błąd staje się nową fiszką.
- Zadania z bieżącego modułu są w [GitHub Issues](../../issues). Moduły rozbijamy na issues dopiero, gdy do nich dochodzisz.
- Uzasadnienie stacku: [raport z analizy rynku](https://claude.ai/artifact/STBJWjS3BjLfB2qhfL3NWq). Materiały: [`learning/`](learning/).

Status: ⬜ nie zaczęty · 🟦 w trakcie · ✅ ukończony

---

## 🟦 Moduł 0 · Warsztat

**Cel:** monorepo z aplikacją React + TypeScript, które sam postawiłeś i rozumiesz każdy plik.

- [x] Test wstępny: pomijamy to, co już umiesz (2026-10-19: nic nie pominięte, zob. learning record 0002)
- [ ] Lekcja 0001: model mentalny Reacta + quiz + odpowiedź na pytanie rekrutacyjne w czacie (2026-10-19: quiz 4/5, odpowiedź 1,5 z 3; druga próba z pamięci na następnej sesji)
- [x] Pierwszy commit (pliki warsztatu) i push na GitHuba
- [ ] pnpm workspace (`pnpm-workspace.yaml`, główny `package.json`)
- [ ] `apps/web` z szablonu Vite `react-ts`; uruchomione `pnpm dev`
- [ ] TypeScript w trybie `strict` (+ `noUncheckedIndexedAccess`); rozumiesz, co dają te flagi
- [ ] ESLint (z regułami hooków) + Prettier; skrypty `lint`, `format`, `typecheck`
- [ ] Przejście po każdym wygenerowanym pliku: do czego służy (`index.html`, `main.tsx`, `vite.config.ts`, `tsconfig*.json`)
- [ ] Egzamin końcowy (rosnąca trudność), potem `/grilling`

**Definicja ukończenia:** `pnpm dev`, `pnpm lint` i `pnpm typecheck` działają z katalogu głównego; potrafisz wyjaśnić, co robi każdy plik konfiguracyjny.
**Pytania rekrutacyjne:** Czym różni się render w React od reaktywności Vue? · Po co `strict` w TS? · Czym Vite różni się od webpacka?

## ⬜ Moduł 1 · Rdzeń Reacta

**Cel:** lista ofert z dodawaniem, edycją statusu i filtrowaniem; dane w `localStorage`.

- [ ] Test wstępny: pomijamy to, co już umiesz
- [ ] Komponenty i JSX, props z typami TS, kompozycja przez `children`
- [ ] `useState`, zdarzenia, stan jako zdjęcie, funkcje aktualizujące, niemutowalne aktualizacje
- [ ] Listy i `key`; renderowanie warunkowe
- [ ] Kontrolowany formularz dodawania oferty (bez bibliotek, żeby poczuć problem)
- [ ] Wartości pochodne (filtrowanie, liczniki) bez `useEffect`
- [ ] Gdzie trzymać stan: lifting state up („Thinking in React”)
- [ ] `useEffect` tam, gdzie jest uzasadniony: synchronizacja z `localStorage`
- [ ] Własny hook `useOffers()` (odpowiednik composable)
- [ ] Context dla motywu lub ustawień
- [ ] React Router: lista ofert, szczegóły oferty, 404
- [ ] Egzamin końcowy (rosnąca trudność), potem `/grilling`

**Definicja ukończenia:** da się dodać ofertę, zmienić jej status (np. „wysłane → rozmowa → oferta/odrzucone”) i filtrować; dane przetrwają odświeżenie strony; zero ostrzeżeń ESLint dotyczących hooków.
**Pytania rekrutacyjne:** Po co `key` i co się stanie z indeksem jako kluczem? · Kiedy `useEffect`, a kiedy nie? · Lifting state up vs Context? · Co wywołuje re-render?

## ⬜ Moduł 2 · Dane i formularze

**Cel:** aplikacja rozmawia z „serwerem” (udawanym przez MSW) jak z prawdziwym API.

- [ ] Test wstępny: pomijamy to, co już umiesz
- [ ] MSW: udawane endpointy REST dla ofert
- [ ] TanStack Query: `useQuery`, klucze, `staleTime`, stany ładowania i błędów
- [ ] `useMutation` + unieważnianie cache; optimistic update przy zmianie statusu
- [ ] Zustand dla stanu klienta (filtry, UI); świadome rozdzielenie stanu serwera i stanu klienta
- [ ] React Hook Form + Zod: walidacja formularza, komunikaty błędów
- [ ] Suspense i Error Boundary dla widoku szczegółów
- [ ] Profilowanie re-renderów (React DevTools); `useMemo` tylko tam, gdzie pomiar to uzasadnia
- [ ] Egzamin końcowy (rosnąca trudność), potem `/grilling`

**Definicja ukończenia:** wyłączenie „sieci” w MSW daje sensowny komunikat błędu; po zmianie statusu lista aktualizuje się bez ręcznego odświeżania.
**Pytania rekrutacyjne:** Stan serwera vs stan klienta? · Jak działa cache TanStack Query i kiedy dane są „stale”? · Czym jest optimistic update i jak go wycofać?

## ⬜ Moduł 3 · Testy frontendu

**Cel:** testy, które łapią regresje i nie pękają przy refaktorze.

- [ ] Test wstępny: pomijamy to, co już umiesz
- [ ] Vitest + React Testing Library: testy komponentów z perspektywy użytkownika
- [ ] MSW w testach (te same handlery co w dev)
- [ ] TDD (`/tdd`): jedna funkcja zbudowana od czerwonego testu
- [ ] Playwright: e2e „dodaj ofertę → zmień status → filtruj”
- [ ] Pokrycie kluczowych ścieżek, nie procentów
- [ ] Egzamin końcowy (rosnąca trudność), potem `/grilling`

**Definicja ukończenia:** `pnpm test` i `pnpm test:e2e` przechodzą; zmiana nazwy wewnętrznej funkcji nie psuje żadnego testu.
**Pytania rekrutacyjne:** Co testujesz w komponencie, a czego nie? · Unit vs integration vs e2e: proporcje? · Dlaczego `getByRole` zamiast `getByTestId`?

## ⬜ Moduł 4 · Backend: NestJS + PostgreSQL

**Cel:** prawdziwe API; frontend przechodzi z MSW na backend.

- [ ] Test wstępny: pomijamy to, co już umiesz
- [ ] Instalacja Dockera; PostgreSQL w `docker-compose`
- [ ] `/domain-modeling`: `GLOSSARY.md` (Oferta, Aplikacja, Etap, Umiejętność…) + model danych
- [ ] ADR: wybór ORM (Prisma vs Drizzle)
- [ ] `apps/api` w NestJS: moduły, kontrolery, serwisy, dependency injection
- [ ] Walidacja DTO (schematy Zod współdzielone z frontem w `packages/`)
- [ ] Migracje, relacje (oferta ↔ umiejętności: wiele-do-wielu), indeksy
- [ ] Paginacja, filtrowanie, sortowanie po stronie API; obsługa błędów (kody HTTP)
- [ ] Dokumentacja OpenAPI (Swagger)
- [ ] Testy integracyjne API na testowej bazie
- [ ] Frontend przełączony z MSW na API (MSW zostaje w testach)
- [ ] Egzamin końcowy (rosnąca trudność), potem `/grilling`

**Definicja ukończenia:** `docker compose up` + `pnpm dev` uruchamia całość; dane żyją w Postgresie; testy API przechodzą.
**Pytania rekrutacyjne:** Jak działa DI w NestJS? · Kiedy indeks pomaga, a kiedy szkodzi? · N+1 queries: co to i jak uniknąć? · PUT vs PATCH, 400 vs 422?

## ⬜ Moduł 5 · Auth i bezpieczeństwo

**Cel:** konta użytkowników; każdy widzi tylko swoje oferty.

- [ ] Test wstępny: pomijamy to, co już umiesz
- [ ] Rejestracja i logowanie: hashowanie haseł (argon2), sesja w ciasteczku `httpOnly`
- [ ] ADR: sesje vs JWT, z uzasadnieniem
- [ ] Logowanie przez GitHuba (OAuth / OIDC)
- [ ] Autoryzacja: guardy w NestJS, izolacja danych użytkowników
- [ ] CORS, CSRF, nagłówki bezpieczeństwa, rate limiting
- [ ] Przegląd pod kątem OWASP Top 10
- [ ] Egzamin końcowy (rosnąca trudność), potem `/grilling`

**Definicja ukończenia:** użytkownik A nie może odczytać ani zmienić danych użytkownika B (jest na to test).
**Pytania rekrutacyjne:** Gdzie trzymać token po stronie przeglądarki i dlaczego? · Jak działa CSRF i jak mu zapobiec? · Uwierzytelnianie vs autoryzacja?

## ⬜ Moduł 6 · DevOps i chmura

**Cel:** publiczne demo pod linkiem z CV.

- [ ] Test wstępny: pomijamy to, co już umiesz
- [ ] Dockerfile dla `web` i `api` (multi-stage), pełny `docker-compose`
- [ ] GitHub Actions: lint, typecheck, testy, build przy każdym PR
- [ ] ADR: Azure vs AWS; wdrożenie (kontenery + zarządzany Postgres)
- [ ] Sekrety i zmienne środowiskowe, osobne środowiska
- [ ] Sentry (błędy frontu i API), strukturalne logi
- [ ] Badge CI i link do demo w README
- [ ] Egzamin końcowy (rosnąca trudność), potem `/grilling`

**Definicja ukończenia:** merge do `main` automatycznie wdraża nową wersję; błąd na produkcji widać w Sentry.
**Pytania rekrutacyjne:** Po co multi-stage build? · Co powinno być w pipeline CI, a co w CD? · Jak bezpiecznie przekazać sekrety do kontenera?

## ⬜ Moduł 7 · Next.js i wydajność

**Cel:** frontend zmigrowany do Next.js (App Router), szybki i dostępny.

- [ ] Test wstępny: pomijamy to, co już umiesz
- [ ] App Router: layouty, routing plikowy (porównanie z Nuxtem)
- [ ] Server Components vs Client Components: gdzie leży granica i dlaczego
- [ ] Server Actions dla formularzy; strategie cache i rewalidacji
- [ ] SSR / SSG / streaming: dobór strategii per widok
- [ ] Web Vitals + Lighthouse: pomiar przed i po
- [ ] Audyt dostępności (WCAG 2.2): klawiatura, czytniki, kontrast
- [ ] Egzamin końcowy (rosnąca trudność), potem `/grilling`

**Definicja ukończenia:** Lighthouse ≥ 90 we wszystkich kategoriach na kluczowych widokach; zero krytycznych błędów dostępności.
**Pytania rekrutacyjne:** Czym Server Component różni się od SSR? · Kiedy `"use client"`? · LCP, INP, CLS: co mierzą i jak je poprawić?

## ⬜ Moduł 8 · AI w produkcie

**Cel:** „wklej ogłoszenie → dopasowanie”.

- [ ] Test wstępny: pomijamy to, co już umiesz
- [ ] Claude API: wywołanie z backendu, klucz w sekretach, limity i koszty
- [ ] Structured output: ekstrakcja (stanowisko, poziom, technologie wymagane i mile widziane) do schematu Zod
- [ ] Ocena dopasowania do profilu użytkownika; wyjaśnienie wyniku
- [ ] Streaming odpowiedzi do UI (SSE)
- [ ] Obsługa błędów, timeoutów, nietrafionych odpowiedzi; walidacja wyjścia
- [ ] Mini-ewaluacja: zestaw kilkunastu prawdziwych ogłoszeń i oczekiwanych wyników, mierzenie trafności
- [ ] (opcjonalnie) ta funkcja jako osobny serwis w Python + FastAPI
- [ ] Egzamin końcowy (rosnąca trudność), potem `/grilling`

**Definicja ukończenia:** ekstrakcja przechodzi ewaluację na ustalonym progu trafności; błędy modelu nie psują UI.
**Pytania rekrutacyjne:** Jak testować funkcję opartą o LLM? · Jak kontrolować koszty i opóźnienia? · Co zrobić, gdy model zwróci niepoprawny JSON?

## ⬜ Moduł 9 · Poziom seniora

**Cel:** projekt gotowy do pokazania na rozmowie.

- [ ] Test wstępny: pomijamy to, co już umiesz
- [ ] `/codebase-design`: przegląd architektury i refaktor najsłabszego modułu
- [ ] Kolejka zadań (BullMQ + Redis) dla analizy AI: asynchronicznie, z ponawianiem
- [ ] Komplet ADR-ów; README jako case study (problem, architektura, decyzje, wyniki)
- [ ] Symulacje rozmów: `/grilling` z całego projektu + system design „jak to skalować ×100”
- [ ] Punkty do CV i opis projektu na LinkedIn
- [ ] Egzamin końcowy (rosnąca trudność), potem `/grilling`

**Definicja ukończenia:** potrafisz przez 15 minut opowiedzieć o projekcie, bronić każdej decyzji i wskazać, co zrobiłbyś inaczej.

---

## Ścieżki dodatkowe (po module 9, pod konkretną ofertę)

Kubernetes · Kafka / RabbitMQ · micro-frontendy (Module Federation) · GraphQL · Java + Spring lub .NET · React Native
