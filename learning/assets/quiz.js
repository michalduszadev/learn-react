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

(function () {
  function shuffle(list) {
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }

  const questions = Array.from(document.querySelectorAll(".quiz .q"));
  const scoreEl = document.querySelector(".score");
  let answered = 0;
  let correct = 0;

  function updateScore() {
    if (!scoreEl) return;
    scoreEl.textContent =
      answered === questions.length
        ? `Wynik: ${correct} / ${questions.length}. ${correct === questions.length ? "Świetnie." : "Wróć do pytań oznaczonych na czerwono i przeczytaj wyjaśnienia."}`
        : `Odpowiedziano: ${answered} / ${questions.length}`;
  }

  questions.forEach((q) => {
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
        updateScore();
      });
    });
  });

  updateScore();
})();
