(() => {
  // Lightweight SQL Practical UI helper.
  // This script intentionally does not observe DOM mutations and does not
  // attach extra handlers to the Theory/Python navigation.

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
    setTimeout(addNextButton, 0);
  }

  function updatePracticalLayout() {
    if (typeof mode !== 'undefined' && mode !== 'practice') return;

    const header = document.querySelector('.header');
    if (header) header.style.display = 'none';

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
