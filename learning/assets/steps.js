// learn-react: lekcje krokowe w cyklu PRZEWIDŹ → WYJAŚNIENIE → SPRAWDZENIE.
// Każdy krok to jedna mała porcja wiedzy. Wyjaśnienie jest zablokowane, dopóki nie zapiszesz
// przewidywania; kolejny krok odblokowuje się dopiero po odpowiedzi na pytania sprawdzające.
// Nic nie jest budowane na kroku, który nie został sprawdzony.
//
// Użycie w lekcji (po quiz.js):
//   <section class="step">
//     <div class="step-head"><span class="label">Krok 1</span><h2>Tytuł kroku</h2></div>
//     <div class="predict">
//       <p class="prompt">Co wypisze ten kod i dlaczego?</p>
//       <pre><code>…</code></pre>
//     </div>
//     <div class="teach"> …wyjaśnienie, które zaczyna się od rozstrzygnięcia przewidywania… </div>
//     <div class="check quiz"> <div class="q">…</div> </div>
//   </section>
//   … kolejne .step …
//   <p class="score" aria-live="polite"></p>
//   <script src="../assets/quiz.js"></script>
//   <script src="../assets/steps.js"></script>
//
// Bez JavaScriptu (np. wydruk) wszystko jest widoczne. Przewidywania trafiają do
// window.LESSON_PREDICTIONS, a quiz.js dopisuje je do linijki wyników dla Claude'a.

(function () {
  const steps = Array.from(document.querySelectorAll(".step"));
  if (!steps.length) return;
  window.LESSON_PREDICTIONS = window.LESSON_PREDICTIONS || [];
  let predictionNo = 0;

  function lock(step, n) {
    step.hidden = true;
    const note = document.createElement("p");
    note.className = "step-locked";
    note.textContent = `Krok ${n} odblokuje się po sprawdzeniu poprzedniego.`;
    step.after(note);
    step._lockNote = note;
  }

  // krok bez przewidywania i bez pytań (np. podsumowanie) niczego nie blokuje
  const isPassive = (step) => !step.querySelector(".predict") && !step.querySelector(".check .q");

  function unlock(step) {
    if (!step || !step.hidden) return;
    step.hidden = false;
    step._lockNote?.remove();
    step.querySelector(".predict textarea")?.focus({ preventScroll: true });
    if (isPassive(step)) unlock(steps[step._idx + 1]);
  }

  steps.forEach((step, idx) => {
    step._idx = idx;
    const predict = step.querySelector(".predict");
    const teach = step.querySelector(".teach");
    const check = step.querySelector(".check");
    const questions = check ? Array.from(check.querySelectorAll(".q")) : [];

    if (predict && teach) {
      const myNo = predictionNo++;
      teach.hidden = true;
      if (check) check.hidden = true;

      const area = document.createElement("textarea");
      area.placeholder = "Twoje przewidywanie i krótko dlaczego. Zgaduj śmiało, liczy się próba.";
      area.setAttribute("aria-label", "Twoje przewidywanie");
      const commit = document.createElement("button");
      commit.type = "button";
      commit.className = "commit";
      commit.textContent = "Zapisz przewidywanie i czytaj dalej";
      commit.disabled = true;
      const noIdea = document.createElement("button");
      noIdea.type = "button";
      noIdea.textContent = "Nie mam pomysłu";
      const row = document.createElement("div");
      row.className = "row";
      row.append(commit, noIdea);
      predict.append(area, row);

      area.addEventListener("input", () => { commit.disabled = area.value.trim().length < 3; });
      area.addEventListener("keydown", (e) => { if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && !commit.disabled) commit.click(); });

      const reveal = (text) => {
        area.disabled = true;
        row.remove();
        window.LESSON_PREDICTIONS[myNo] = text || "brak pomysłu";
        const echo = document.createElement("p");
        echo.className = "your-prediction";
        echo.textContent = `Twoje przewidywanie: ${text || "brak pomysłu"}`;
        teach.prepend(echo);
        teach.hidden = false;
        if (check) check.hidden = false;
        if (!questions.length) unlock(steps[idx + 1]);
      };
      commit.addEventListener("click", () => reveal(area.value.trim()));
      noIdea.addEventListener("click", () => reveal(""));
    }

    if (questions.length) {
      const done = new Set();
      step.addEventListener("quiz:answered", (e) => {
        const q = e.target.closest(".q");
        if (q) done.add(q);
        if (done.size === questions.length) unlock(steps[idx + 1]);
      });
    }

    if (idx > 0) lock(step, idx + 1);
  });

  if (isPassive(steps[0])) unlock(steps[1]);
})();
