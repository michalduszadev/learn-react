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
// Przed odpowiedzią trzeba wybrać pewność (25/50/75/95%) albo kliknąć „Nie wiem”.
// Po ostatniej odpowiedzi pod wynikiem pojawia się linijka do wklejenia Claude'owi w czacie,
// np. „Quiz 0002-xyz 2026-10-24: 3/5 · 1+75 2+95 3-95 „6” 4-nw 5+50”.
// Każde .q wysyła zdarzenie "quiz:answered" (bubbles) z detail = { ok, conf, picked, dontKnow };
// korzysta z niego assets/steps.js w lekcjach krokowych.

(function () {
  function shuffle(list) {
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }

  const questions = Array.from(document.querySelectorAll(".quiz .q"));
  const scoreEl = document.querySelector(".quiz ~ .score") || document.querySelector(".score");
  const LEVELS = [[25, "strzelam"], [50, "pół na pół"], [75, "raczej tak"], [95, "pewny"]];
  const lesson = decodeURIComponent(location.pathname.split("/").pop() || "").replace(/\.html$/, "");
  const results = new Array(questions.length);
  let answered = 0;
  let correct = 0;

  function resultLine() {
    const date = new Date().toLocaleDateString("sv-SE");
    // format: 1+75 (dobrze, pewność 75%), 4-95 „6” (źle przy 95%: utrwalone złe przekonanie), 5-nw (nie wiem)
    const marks = results
      .map((r, i) => (r.dontKnow ? `${i + 1}-nw` : r.ok ? `${i + 1}+${r.conf}` : `${i + 1}-${r.conf} „${r.picked}”`))
      .join(" ");
    const preds = (window.LESSON_PREDICTIONS || []).filter(Boolean);
    const predPart = preds.length ? ` · przewidywania: ${preds.map((p, i) => `${i + 1} „${p.slice(0, 90)}”`).join(" ")}` : "";
    return `Quiz ${lesson} ${date}: ${correct}/${questions.length} · ${marks}${predPart}`;
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

    // Pewność wybierana PRZED odpowiedzią: odpowiedzi są nieaktywne, dopóki jej nie wybierzesz.
    let conf = null;
    const confRow = document.createElement("div");
    confRow.className = "conf";
    confRow.setAttribute("role", "group");
    confRow.setAttribute("aria-label", "Pewność odpowiedzi");
    const confLabel = document.createElement("span");
    confLabel.className = "conf-label";
    confLabel.textContent = "Najpierw pewność:";
    confRow.append(confLabel);
    for (const [v, label] of LEVELS) {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = `${v}% · ${label}`;
      b.setAttribute("aria-pressed", "false");
      b.addEventListener("click", () => {
        conf = v;
        confRow.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
        buttons.forEach((o) => { o.disabled = false; });
      });
      confRow.append(b);
    }
    const dunno = document.createElement("button");
    dunno.type = "button";
    dunno.className = "dunno";
    dunno.textContent = "Nie wiem";
    confRow.append(dunno);
    opts.before(confRow);
    buttons.forEach((o) => { o.disabled = true; });

    function finish(entry) {
      buttons.forEach((b) => {
        b.disabled = true;
        if (b.hasAttribute("data-correct")) b.classList.add("right");
      });
      confRow.querySelectorAll("button").forEach((x) => { x.disabled = true; });
      if (explain) explain.hidden = false;
      answered += 1;
      if (entry.ok) correct += 1;
      results[qi] = entry;
      updateScore();
      q.dispatchEvent(new CustomEvent("quiz:answered", { bubbles: true, detail: entry }));
      if (answered === questions.length) showResultLine();
    }

    dunno.addEventListener("click", () => finish({ ok: false, dontKnow: true, picked: "nie wiem", conf: null }));

    buttons.forEach((btn) => {
      btn.type = "button";
      btn.addEventListener("click", () => {
        const isRight = btn.hasAttribute("data-correct");
        if (!isRight) btn.classList.add("wrong");
        finish({ ok: isRight, picked: btn.textContent.trim(), conf });
      });
    });
  });

  updateScore();
})();
