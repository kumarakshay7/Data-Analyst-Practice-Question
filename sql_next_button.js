(() => {
  // Lightweight SQL Practical UI helper.
  // Adds the Next button and keeps the practical question number visible.

  function getPracticalQuestions() {
    if (typeof BANK === 'undefined' || typeof practicalIds === 'undefined') return [];

    const search = document.getElementById('search');
    const difficulty = document.getElementById('difficulty');
    const s = (search?.value || '').toLowerCase().trim();
    const d = difficulty?.value || 'All';

    return BANK.filter(q =>
      practicalIds.has(q.n) &&
      (!s || q.title.toLowerCase().includes(s) || q.id.toLowerCase().includes(s)) &&
      (d === 'All' || q.difficulty === d)
    ).sort((a, b) => a.n - b.n);
  }

  function getQuestionNumber() {
    if (typeof current === 'undefined' || !current) return null;

    const questions = getPracticalQuestions();
    const index = questions.findIndex(q => q.n === current.n);

    // Sequential number for Practical SQL: Q1, Q2, Q3 ...
    return index >= 0 ? index + 1 : null;
  }

  function addQuestionNumber() {
    if (typeof mode !== 'undefined' && mode !== 'practice') return;

    const page = document.getElementById('page');
    if (!page) return;

    const questionNumber = getQuestionNumber();
    if (!questionNumber) return;

    // The first visible question card contains the Practical SQL badge/title.
    // Add the number to the top-right without changing the question text.
    const cards = Array.from(page.children).filter(el => el.classList?.contains('card'));
    const card = cards.find(el => el.querySelector('.question')) || cards[0];
    if (!card) return;

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
        'line-height:1'
      ].join(';');
      card.appendChild(badge);
    }

    badge.textContent = `Q${questionNumber}`;
  }

  function addNextButton() {
    if (typeof mode !== 'undefined' && mode !== 'practice') return;

    const buttons = document.querySelector('#page .buttons');
    if (!buttons) return;
    if (document.getElementById('nextQuestionBtn')) return;

    const clear = buttons.querySelector('.clear');
    if (!clear) return;

    const button = document.createElement('button');
    button.id = 'nextQuestionBtn';
    button.type = 'button';
    button.className = 'btn clear';
    button.textContent = 'Next →';
    button.title = 'Open the next SQL practical question';
    button.onclick = nextQuestion;

    clear.insertAdjacentElement('afterend', button);
  }

  function nextQuestion() {
    const questions = getPracticalQuestions();
    if (!questions.length || typeof current === 'undefined') return;

    let index = questions.findIndex(q => q.n === current?.n);
    if (index < 0) index = -1;

    const next = questions[(index + 1) % questions.length];
    if (!next || typeof show !== 'function') return;

    show(next.n);
    window.scrollTo(0, 0);
    setTimeout(() => {
      addQuestionNumber();
      addNextButton();
    }, 0);
  }

  function updatePracticalLayout() {
    if (typeof mode !== 'undefined' && mode !== 'practice') return;

    const header = document.querySelector('.header');
    if (header) header.style.display = 'none';

    addQuestionNumber();
    addNextButton();
  }

  function removeDuplicatePracticalCard() {
    if (typeof mode !== 'undefined' && mode !== 'practice') return;

    const page = document.getElementById('page');
    if (!page) return;

    const firstCard = page.querySelector(':scope > .card');
    if (!firstCard) return;

    // Hide only the duplicate practical question card when it matches the
    // question/meta structure. The main question remains untouched.
    if (firstCard.querySelector('.question') && firstCard.querySelector('.meta')) {
      firstCard.style.display = 'none';
    }
  }

  function apply() {
    if (typeof BANK === 'undefined' || !Array.isArray(BANK) || !BANK.length) return false;

    updatePracticalLayout();
    removeDuplicatePracticalCard();
    return true;
  }

  function waitForApp() {
    let attempts = 0;
    const timer = setInterval(() => {
      attempts += 1;
      if (apply() || attempts >= 50) clearInterval(timer);
    }, 100);
  }

  document.addEventListener('DOMContentLoaded', waitForApp, { once: true });
})();
