# Test wstępny modułu 0: konfiguracja narzędzi od zera jest nowa

Test wstępny modułu 0 (2026-10-19) zakończył się po dwóch pytaniach, bo na oba z rzędu padło „nie wiem”: nie było znajomości `pnpm-workspace.yaml` ani `--filter` (zamiast tego `pnpm run dev` w katalogu głównym) i nie było znajomości flag włączanych przez `strict` w TypeScript. Żaden punkt modułu 0 nie zostaje pominięty.

**Evidence:** pytanie 1 (pnpm workspace + uruchomienie skryptu w jednym pakiecie): 0 z 2. Pytanie 2 (flagi `strict` + przykłady błędów): „nie wiem”.

**Implications:** osiem lat frontendu nie oznacza znajomości konfiguracji narzędzi. Hipoteza do sprawdzenia: Nuxt i szablony projektów ukrywały tę konfigurację. W module 0 przy każdym pliku konfiguracyjnym pytamy „co się stanie, jeśli usuniesz tę linię?”. Nie zakładamy wiedzy o tsconfig, ESLint ani bundlerze.
