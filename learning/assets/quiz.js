// learn-react: widżet quizu wielokrotnego użytku.
// Użycie w lekcji:
//   <div class="quiz">
//     <div class="q">
//       <p class="prompt">Pytanie?</p>
//       <div class="opts">
//         <button class="opt" data-correct>Poprawna</button>
//         <button class="opt">Błędna</button>
//       </div>
//       <p class="explain" hidden>Wyjaśnienie pokazywane po odpowiedzi.</p>
//     </div>
//   </div>
//   <p class="score" aria-live="polite"></p>
//   <script src="../assets/quiz.js"></script>
// Kolejność odpowiedzi jest losowana, żeby pozycja nie zdradzała poprawnej.
// Po ostatniej odpowiedzi pod wynikiem pojawia się linijka do wklejenia Claude'owi w czacie,
// np. „Quiz 0001-model-mentalny-reacta 2026-10-19: 4/5 · 1+ 2+ 3+ 4- „6” 5+”.

(function () {
  function shuffle(list) {
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }

  const questions = Array.from(document.querySelectorAll(".quiz .q"));
  const scoreEl = document.querySelector(".quiz ~ .score");
  const lesson = decodeURIComponent(location.pathname.split("/").pop() || "").replace(/\.html$/, "");
  const results = new Array(questions.length);
  let answered = 0;
  let correct = 0;

  function resultLine() {
    const date = new Date().toLocaleDateString("sv-SE");
    const marks = results.map((r, i) => (r.ok ? `${i + 1}+` : `${i + 1}- „${r.picked}”`)).join(" ");
    return `Quiz ${lesson} ${date}: ${correct}/${questions.length} · ${marks}`;
  }

  function showResultLine() {
    if (!scoreEl) return;
    const box = document.createElement("div");
    box.className = "result";
    const line = document.createElement("p");
    line.className = "result-line";
    line.textContent = resultLine();
    const copy = document.createElement("button");
    copy.type = "button";
    copy.textContent = "Kopiuj wynik";
    copy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(line.textContent);
        copy.textContent = "Skopiowano";
      } catch {
        copy.textContent = "Zaznacz linijkę i skopiuj ręcznie";
      }
    });
    const hint = document.createElement("p");
    hint.className = "result-hint";
    hint.textContent = "Wklej tę linijkę w czacie. Z błędnych odpowiedzi powstaną nowe fiszki.";
    box.append(line, copy, hint);
    scoreEl.after(box);
  }

  function updateScore() {
    if (!scoreEl) return;
    scoreEl.textContent =
      answered === questions.length
        ? `Wynik: ${correct} / ${questions.length}. ${correct === questions.length ? "Świetnie." : "Wróć do pytań oznaczonych na czerwono i przeczytaj wyjaśnienia."}`
        : `Odpowiedziano: ${answered} / ${questions.length}`;
  }

  questions.forEach((q, qi) => {
    const opts = q.querySelector(".opts");
    const buttons = shuffle(Array.from(opts.querySelectorAll("button.opt")));
    buttons.forEach((b) => opts.appendChild(b));
    const explain = q.querySelector(".explain");

    buttons.forEach((btn) => {
      btn.type = "button";
      btn.addEventListener("click", () => {
        const isRight = btn.hasAttribute("data-correct");
        buttons.forEach((b) => {
          b.disabled = true;
          if (b.hasAttribute("data-correct")) b.classList.add("right");
        });
        if (!isRight) btn.classList.add("wrong");
        if (explain) explain.hidden = false;
        answered += 1;
        if (isRight) correct += 1;
        results[qi] = { ok: isRight, picked: btn.textContent.trim() };
        updateScore();
        if (answered === questions.length) showResultLine();
      });
    });
  });

  updateScore();
})();
