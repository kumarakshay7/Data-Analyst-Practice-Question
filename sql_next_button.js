(() => {
  // UI helper for SQL Practical / Theory pages.
  // Important: do NOT use a MutationObserver here. The page re-renders the
  // question area, and observing that same area can create a render loop that
  // makes the browser show "Page Unresponsive".

  function filteredQuestions() {
    const search = document.getElementById('search');
    const difficulty = document.getElementById('difficulty');
    const s = (search?.value || '').toLowerCase().trim();
    const d = difficulty?.value || 'All';

    return BANK.filter(q =>
      mode === 'practice' &&
      practicalIds.has(q.n) &&
      (!s || q.title.toLowerCase().includes(s) || q.id.toLowerCase().includes(s)) &&
      (d === 'All' || q.difficulty === d)
    );
  }

  function addNextButton() {
    if (typeof mode !== 'undefined' && mode !== 'practice') return;

    const buttons = document.querySelector('#page .buttons');
    const clear = buttons?.querySelector('.clear');
    if (!buttons || !clear || document.getElementById('nextQuestionBtn')) return;

    const button = document.createElement('button');
    button.id = 'nextQuestionBtn';
    button.type = 'button';
    button.className = 'btn clear';
    button.textContent = 'Next →';
    button.title = 'Open the next SQL practical question';
    button.addEventListener('click', nextQuestion);
    clear.insertAdjacentElement('afterend', button);
  }

  function nextQuestion() {
    const arr = filteredQuestions();
    if (!arr.length) return;

    const index = arr.findIndex(q => current && q.n === current.n);
    const next = arr[(index + 1 + arr.length) % arr.length];

    show(next.n);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(addNextButton, 0);
  }

  function cleanPracticalHeader() {
    const header = document.querySelector('.header');
    const title = document.getElementById('title');
    const subtitle = document.getElementById('subtitle');
    if (!header) return;

    if (typeof mode !== 'undefined' && mode === 'practice') {
      header.style.display = 'none';
    } else {
      header.style.display = 'flex';
      if (title) title.textContent = 'SQL Theory Questions';
      if (subtitle) subtitle.textContent = 'SQL concepts and interview-focused explanations, from basic to advanced.';
    }
  }

  function removePracticalDuplicateCard() {
    if (typeof mode !== 'undefined' && mode !== 'practice') return;

    const page = document.getElementById('page');
    if (!page) return;

    const cards = page.querySelectorAll(':scope > .card');
    if (!cards.length) return;

    // Practical SQL has a duplicate question card below the main question.
    // Hide only that duplicate card, not the main Q-number/question heading.
    const firstCard = cards[0];
    if (
      firstCard &&
      firstCard.querySelector('.question') &&
      firstCard.querySelector('.meta')
    ) {
      firstCard.classList.add('sql-practice-duplicate-card');
    }

    if (!document.getElementById('sqlDuplicateCardStyle')) {
      const style = document.createElement('style');
      style.id = 'sqlDuplicateCardStyle';
      style.textContent = '.sql-practice-duplicate-card { display: none !important; }';
      document.head.appendChild(style);
    }
  }

  function renumberTheoryQuestions() {
    if (
      typeof mode === 'undefined' ||
      mode !== 'theory' ||
      typeof BANK === 'undefined' ||
      typeof practicalIds === 'undefined'
    ) return;

    const theory = BANK
      .filter(q => !practicalIds.has(q.n))
      .sort((a, b) => a.n - b.n);

    if (!theory.length) return;

    const displayNumber = new Map(
      theory.map((q, index) => [q.n, index + 1])
    );

    // Sidebar: Q1, Q2, Q3... instead of source IDs such as Q030.
    document.querySelectorAll('#nav .qbtn').forEach(button => {
      const text = button.textContent.trim();
      const match = text.match(/^Q\d+\s*[·.-]\s*(.*)$/s);
      if (!match) return;

      const title = match[1].trim();
      const question = theory.find(
        q => q.title === title || text.includes(q.title)
      );
      if (!question) return;

      const newText = `Q${displayNumber.get(question.n)} · ${question.title}`;
      if (button.textContent !== newText) {
        button.textContent = newText;
      }
    });

    // Current question heading.
    if (typeof current !== 'undefined' && current) {
      const number = displayNumber.get(current.n);
      const questionHeading = document.querySelector('#page .question');
      if (number && questionHeading) {
        const newText = `Q${number} · 🧑‍💼 ${current.title}`;
        if (questionHeading.textContent !== newText) {
          questionHeading.textContent = newText;
        }
      }
    }
  }

  function applyExtraQuestions() {
    if (
      window.__extraSqlQuestionsApplied ||
      typeof BANK === 'undefined' ||
      !Array.isArray(BANK) ||
      !BANK.length
    ) return false;

    if (typeof extraQuestions === 'undefined' || !Array.isArray(extraQuestions)) {
      return false;
    }

    window.__extraSqlQuestionsApplied = true;

    for (const q of extraQuestions) {
      if (!BANK.some(x => x.n === q.n)) {
        BANK.push({
          n: q.n,
          id: 'Q' + q.n,
          title: q.title,
          difficulty: q.difficulty
        });
        practicalIds.add(q.n);
      }
    }

    const originalMeta = meta;
    const originalSolution = solution;
    const extraById = new Map(extraQuestions.map(q => [q.n, q]));

    meta = function(q) {
      const extra = extraById.get(q.n);
      return extra ? [extra.schema, extra.hint] : originalMeta(q);
    };

    solution = function(q) {
      const extra = extraById.get(q.n);
      return extra ? extra.sql : originalSolution(q);
    };

    const practical = BANK
      .filter(q => practicalIds.has(q.n))
      .sort((a, b) => a.n - b.n);

    practical.forEach((q, index) => {
      q.id = 'Q' + (index + 1);
    });

    if (typeof render === 'function') render();
    return true;
  }

  function waitForQuestionBank() {
    if (applyExtraQuestions()) return;

    const timer = setInterval(() => {
      if (applyExtraQuestions()) clearInterval(timer);
    }, 100);

    setTimeout(() => clearInterval(timer), 10000);
  }

  function refreshUI() {
    // Run after the application's own render function has finished.
    setTimeout(() => {
      cleanPracticalHeader();
      removePracticalDuplicateCard();
      addNextButton();
      renumberTheoryQuestions();
    }, 0);
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Initial UI setup.
    refreshUI();
    waitForQuestionBank();

    // SQL Theory / Practical SQL switches re-render the page.
    document.getElementById('theoryTab')?.addEventListener('click', refreshUI);
    document.getElementById('practiceTab')?.addEventListener('click', refreshUI);

    // Navigation/search/filter also re-render the question list.
    document.getElementById('search')?.addEventListener('input', refreshUI);
    document.getElementById('difficulty')?.addEventListener('change', refreshUI);

    // Clicking a question in the sidebar renders a new question.
    document.getElementById('nav')?.addEventListener('click', () => {
      refreshUI();
    });
  });
})();
