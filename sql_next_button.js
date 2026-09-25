(() => {
  // SQL Theory + Practical navigation/UI helper.
  // Practical: Q1, Q2, Q3... inside the question heading.
  // Theory: keep the existing Q numbering, remove duplicate prefixes/badges,
  // and place Next at the bottom-right of the Simple Answer card.

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

  function getSimpleAnswerCard() {
    const page = document.getElementById('page');
    if (!page) return null;

    return Array.from(page.children).find(card => {
      if (!card.classList?.contains('card')) return false;
      const heading = card.querySelector('h3');
      return heading && heading.textContent.toLowerCase().includes('simple answer');
    }) || null;
  }

  function addQuestionNumber() {
    const card = getQuestionCard();
    if (!card) return;

    const question = card.querySelector('.question');
    if (!question) return;

    const questionNumber = getQuestionNumber();
    if (!questionNumber) return;

    card.querySelectorAll('.sql-question-number').forEach(el => {
      if (el.parentElement !== question) el.remove();
    });

    const existingPrefix = question.textContent.match(/^\s*Q\d+\s*[·.-]\s*/);
    if (existingPrefix) return;

    let badge = question.querySelector('.sql-question-number');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'sql-question-number';
      badge.style.cssText = 'font-weight:700;white-space:nowrap;';
      question.insertBefore(badge, question.firstChild);
    }

    badge.textContent = `Q${questionNumber} · `;
    if (question.firstChild !== badge) question.insertBefore(badge, question.firstChild);
  }

  function removeTheoryBadges() {
    if (typeof mode === 'undefined' || mode !== 'theory') return;
    const card = getQuestionCard();
    if (!card) return;

    card.querySelectorAll('.badge').forEach(el => el.remove());
  }

  function removePracticalBadges() {
    if (typeof mode === 'undefined' || mode !== 'practice') return;
    const card = getQuestionCard();
    if (!card) return;

    // Remove the "Practical SQL" and difficulty badges from the top of the
    // practical question card. The question itself remains unchanged.
    card.querySelectorAll('.badge').forEach(el => el.remove());
  }

  function removeInstructionLine() {
    const card = getQuestionCard();
    if (!card) return;

    Array.from(card.querySelectorAll('.meta, p, div, span')).forEach(el => {
      const text = (el.textContent || '').trim();
      if (text === 'Write your query before looking at the solution.' ||
          text === 'Write your SQL before looking at the solution.') {
        el.remove();
      }
    });
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

      clear.insertAdjacentElement('afterend', createNextButton());
      return;
    }

    const answerCard = getSimpleAnswerCard();
    if (!answerCard) return;

    const buttonWrap = document.createElement('div');
    buttonWrap.className = 'buttons theory-next-wrap';
    buttonWrap.style.cssText = 'display:flex;justify-content:flex-end;margin-top:18px;';
    buttonWrap.appendChild(createNextButton());
    answerCard.appendChild(buttonWrap);
  }

  function createNextButton() {
    const button = document.createElement('button');
    button.id = 'nextQuestionBtn';
    button.type = 'button';
    button.className = 'btn clear';
    button.textContent = 'Next →';
    button.title = 'Open the next question';
    // Only change the button colors. Size, position, spacing and behavior stay unchanged.
    button.style.background = '#7c3aed';
    button.style.color = '#ffffff';
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

    requestAnimationFrame(() => {
      addQuestionNumber();
      removeTheoryBadges();
      removePracticalBadges();
      removeInstructionLine();
      addNextButton();
    });
  }

  function updateLayout() {
    if (typeof mode === 'undefined') return;

    if (mode === 'practice') {
      const header = document.querySelector('.header');
      if (header) header.style.display = 'none';
    }

    addQuestionNumber();
    removeTheoryBadges();
    removePracticalBadges();
    removeInstructionLine();
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
