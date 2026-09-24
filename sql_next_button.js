(() => {
  // Navigation/UI helper for both SQL Practical and SQL Theory.
  // Shows sequential Q1, Q2, Q3... and provides a working Next button.

  function getVisibleQuestions() {
    if (typeof BANK === 'undefined' || typeof practicalIds === 'undefined') return [];

    const search = document.getElementById('search');
    const difficulty = document.getElementById('difficulty');
    const s = (search?.value || '').toLowerCase().trim();
    const d = difficulty?.value || 'All';
    const isTheory = typeof mode !== 'undefined' && mode === 'theory';

    return BANK
      .filter(q => {
        const inSection = isTheory ? !practicalIds.has(q.n) : practicalIds.has(q.n);
        return inSection &&
          (!s || q.title.toLowerCase().includes(s) || q.id.toLowerCase().includes(s)) &&
          (d === 'All' || q.difficulty === d);
      })
      .sort((a, b) => a.n - b.n);
  }

  function getQuestionNumber() {
    if (typeof current === 'undefined' || !current) return null;
    const questions = getVisibleQuestions();
    const index = questions.findIndex(q => q.n === current.n);
    return index >= 0 ? index + 1 : null;
  }

  function getQuestionCard() {
    const page = document.getElementById('page');
    if (!page) return null;

    const cards = Array.from(page.children).filter(el => el.classList?.contains('card'));
    return cards.find(el => {
      const style = window.getComputedStyle(el);
      return style.display !== 'none' && el.querySelector('.question');
    }) || null;
  }

  function addQuestionNumber() {
    const card = getQuestionCard();
    if (!card) return;

    const questionNumber = getQuestionNumber();
    if (!questionNumber) return;

    card.style.position = 'relative';

    let badge = card.querySelector('.sql-question-number');
    if (!badge) {
      badge = document.createElement('div');
      badge.className = 'sql-question-number';
      badge.style.cssText = [
        'position:absolute',
        'top:18px',
        'right:20px',
        'background:#e9eef6',
        'color:#172033',
        'border:1px solid #d5dce7',
        'border-radius:8px',
        'padding:7px 11px',
        'font-size:12px',
        'font-weight:700',
        'line-height:1',
        'z-index:2'
      ].join(';');
      card.appendChild(badge);
    }

    badge.textContent = `Q${questionNumber}`;
  }

  function addNextButton() {
    const page = document.getElementById('page');
    if (!page) return;

    const isTheory = typeof mode !== 'undefined' && mode === 'theory';
    const isPractice = typeof mode !== 'undefined' && mode === 'practice';
    if (!isTheory && !isPractice) return;

    if (document.getElementById('nextQuestionBtn')) return;

    if (isPractice) {
      const buttons = page.querySelector('.buttons');
      if (!buttons) return;

      const clear = buttons.querySelector('.clear');
      if (!clear) return;

      const button = createNextButton();
      clear.insertAdjacentElement('afterend', button);
      return;
    }

    // Theory has no editor button row, so place Next at the bottom of the
    // first question card without changing the existing answer/tip cards.
    const card = getQuestionCard();
    if (!card) return;

    const buttonWrap = document.createElement('div');
    buttonWrap.className = 'buttons theory-next-wrap';
    buttonWrap.style.cssText = 'justify-content:flex-end;margin-top:18px;';
    buttonWrap.appendChild(createNextButton());
    card.appendChild(buttonWrap);
  }

  function createNextButton() {
    const button = document.createElement('button');
    button.id = 'nextQuestionBtn';
    button.type = 'button';
    button.className = 'btn clear';
    button.textContent = 'Next →';
    button.title = 'Open the next question';
    button.onclick = nextQuestion;
    return button;
  }

  function nextQuestion() {
    const questions = getVisibleQuestions();
    if (!questions.length || typeof current === 'undefined') return;

    let index = questions.findIndex(q => q.n === current?.n);
    if (index < 0) index = -1;

    const next = questions[(index + 1) % questions.length];
    if (!next || typeof show !== 'function') return;

    show(next.n);
    window.scrollTo(0, 0);

    // show() rebuilds #page, so wait for the new DOM before adding controls.
    requestAnimationFrame(() => {
      addQuestionNumber();
      addNextButton();
    });
  }

  function updateLayout() {
    if (typeof mode === 'undefined') return;

    // Keep the existing compact Practical SQL layout.
    if (mode === 'practice') {
      const header = document.querySelector('.header');
      if (header) header.style.display = 'none';
    }

    addQuestionNumber();
    addNextButton();
  }

  function apply() {
    if (typeof BANK === 'undefined' || !Array.isArray(BANK) || !BANK.length) return false;
    updateLayout();
    return !!getQuestionCard();
  }

  function watchPageChanges() {
    const page = document.getElementById('page');
    if (!page || page.dataset.navigationObserverAttached) return;

    page.dataset.navigationObserverAttached = 'true';
    let scheduled = false;

    const observer = new MutationObserver(() => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        apply();
      });
    });

    observer.observe(page, { childList: true, subtree: true });
  }

  function waitForApp() {
    let attempts = 0;
    const timer = setInterval(() => {
      attempts += 1;
      if (typeof BANK !== 'undefined' && Array.isArray(BANK) && BANK.length) {
        apply();
        watchPageChanges();
        clearInterval(timer);
      } else if (attempts >= 100) {
        clearInterval(timer);
      }
    }, 100);
  }

  document.addEventListener('DOMContentLoaded', waitForApp, { once: true });
})();
