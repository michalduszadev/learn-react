# React i fullstack: źródła

## Knowledge

### Kontekst i decyzje
- [Raport: „Co poza Reactem?” (analiza 667 ofert + badania, październik 2026)](https://claude.ai/artifact/STBJWjS3BjLfB2qhfL3NWq)
  Dlaczego ten stack i ta kolejność. Do czego: wracaj, gdy wahasz się, czy coś warto się uczyć.

### Jak się uczyć (metoda)
- [Roediger & Karpicke (2006), „Test-enhanced learning”, Psychological Science](https://pubmed.ncbi.nlm.nih.gov/16507066/)
  Klasyczne badanie efektu testowania: ponowne czytanie wygrywa po 5 minutach, testowanie wygrywa po tygodniu. Do czego: uzasadnienie quizów, fiszek i zasady „odpowiadaj z pamięci”.
- [Nick Saraev: „How I Learn Complex Skills & Difficult Subjects So Fast with AI” (YouTube)](https://www.youtube.com/watch?v=FSXHk4hMrY8)
  Dziesięć ról AI w nauce (interviewer, mapmaker, explainer, socratic, examiner, checker, listener, diagnostician, sparring, clerk) i ryzyka „skrótu przez AI”. Praktyczny framework autora, nie badanie; na jego podstawie wprowadziliśmy pętlę „zrób od nowa”, zakaz przytakiwania, ćwiczenia z błędami, fiszki z harmonogramem oraz test wstępny i egzamin modułu.

### React (moduły 1–2)
- [react.dev/learn: oficjalny kurs Reacta](https://react.dev/learn)
  Podstawowe źródło. Do czego: każda lekcja z modułu 1 odsyła do konkretnego rozdziału.
- [Render and Commit](https://react.dev/learn/render-and-commit) i [State as a Snapshot](https://react.dev/learn/state-as-a-snapshot)
  Model mentalny Reacta: co dzieje się przy zmianie stanu. Do czego: lekcja 0001, czyli największa różnica względem Vue.
- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
  Najczęstszy błąd ludzi z Vue (`useEffect` jako `watch`). Do czego: zanim napiszesz pierwszy `useEffect`.
- [Thinking in React](https://react.dev/learn/thinking-in-react)
  Jak dzielić UI na komponenty i gdzie trzymać stan. Do czego: planowanie ekranów Job Trackera.
- [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
  Odpowiednik composables. Do czego: wyciąganie logiki z komponentów.
- [React Compiler](https://react.dev/learn/react-compiler)
  Automatyczna memoizacja; zmienia sposób myślenia o `useMemo`/`useCallback`. Do czego: moduł 2 i wydajność.
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
  Typowanie propsów, eventów, hooków. Do czego: gdy TS w JSX stawia opór.
- [Overreacted (Dan Abramov)](https://overreacted.io/)
  Głębokie eseje o modelu Reacta. Do czego: pogłębianie zrozumienia po opanowaniu podstaw.

### Narzędzia frontendu (moduły 0–3)
- [Vite guide](https://vite.dev/guide/) i [pnpm workspaces](https://pnpm.io/workspaces): moduł 0.
- [React Router](https://reactrouter.com/home): routing w module 1.
- [TanStack Query: overview](https://tanstack.com/query/latest/docs/framework/react/overview) i [TkDodo: Practical React Query](https://tkdodo.eu/blog/practical-react-query)
  Stan serwera. Blog TkDodo (maintainer biblioteki) to najlepsze objaśnienia wzorców. Do czego: moduł 2.
- [Zustand](https://zustand.docs.pmnd.rs/learn/getting-started/introduction): mały store na stan klienta (odpowiednik Pinii), moduł 2.
- [React Hook Form](https://react-hook-form.com/get-started) i [Zod](https://zod.dev/): formularze i walidacja; schematy Zod współdzielone z backendem. Moduł 2.
- [MSW](https://mswjs.io/docs/): udawane API w przeglądarce i testach. Moduły 2–3.
- [Vitest](https://vitest.dev/guide/) i [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/): testy jednostkowe i komponentów. Moduł 3.
- [Kent C. Dodds: Common mistakes with React Testing Library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library): jak pisać testy, które nie pękają przy refaktorze.
- [Playwright](https://playwright.dev/docs/intro): testy e2e. Moduł 3.
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html): gdy potrzebujesz głębiej zrozumieć typy.

### Backend i dane (moduły 4–5)
- [NestJS docs](https://docs.nestjs.com/): moduły, kontrolery, DI, walidacja. Moduł 4.
- [PostgreSQL tutorial](https://www.postgresql.org/docs/current/tutorial.html): SQL od strony bazy, nie tylko ORM-a.
- [Prisma](https://www.prisma.io/docs) / [Drizzle](https://orm.drizzle.team/docs/overview): kandydaci na ORM; wybór w ADR na starcie modułu 4.
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/) i [OWASP Top 10](https://owasp.org/www-project-top-ten/): bezpieczeństwo i auth. Moduł 5.

### DevOps, Next.js, AI (moduły 6–8)
- [Docker: Get started](https://docs.docker.com/get-started/) i [GitHub Actions](https://docs.github.com/en/actions): moduł 6.
- [Next.js docs](https://nextjs.org/docs) i [Next.js Learn](https://nextjs.org/learn): moduł 7; porównuj z Nuxtem.
- [web.dev: Web Vitals](https://web.dev/articles/vitals) i [WCAG 2.2 quick reference](https://www.w3.org/WAI/WCAG22/quickref/): wydajność i dostępność. Moduł 7.
- [Claude API: structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs): ekstrakcja danych z ogłoszeń do schematu. Moduł 8.

### Vue, do porównań
- [Vue: Reactivity in Depth](https://vuejs.org/guide/extras/reactivity-in-depth.html), [Computed](https://vuejs.org/guide/essentials/computed.html), [Watchers](https://vuejs.org/guide/essentials/watchers.html)
  Do czego: precyzyjne porównania w lekcjach (co Vue robi inaczej i dlaczego).

## Wisdom (Communities)

- [Reactiflux (Discord)](https://www.reactiflux.com/)
  Największa społeczność Reacta, z kanałami na pytania i code review. Do czego: gdy chcesz opinii innych praktyków.
- [r/reactjs](https://www.reddit.com/r/reactjs/)
  Dyskusje o trendach i decyzjach. Do czego: „czy ktoś używa X w produkcji?”.
- [meet.js](https://meetjs.pl/) i [WarsawJS](https://warsawjs.com/)
  Polskie meetupy JS. Do czego: networking i realny feedback; dobre miejsce, żeby kiedyś opowiedzieć o Job Trackerze.

## Gaps
- Dobre źródło o NestJS + Postgres „na produkcji” (migracje, transakcje, testy integracyjne): do znalezienia na starcie modułu 4.
- Materiały o ewaluacji funkcji LLM w aplikacjach webowych: do znalezienia przed modułem 8.
