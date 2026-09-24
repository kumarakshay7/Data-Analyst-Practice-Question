// Consolidated Python Theory + Practical UI/navigation fix.
// Important: the original question renderer identifies the active sidebar
// item by its old PY-Txxx/PY-Pxxx text. Our display formatter intentionally
// replaces that text with Q1.🧑‍💼..., so navigation must NOT depend on the
// original .active class. This file tracks the current question by its
// visible question text instead.
(() => {
  const SELECTORS = {
    nav: '#nav',
    questions: '#nav .qbtn',
    page: '#page'
  };

  const clean = (value) => {
    let text = String(value || '').trim();
    let previous;
    do {
      previous = text;
      text = text
        .replace(/^PY-[TP]\d+\s*[·•.:\-]\s*/i, '')
        .replace(/^Q\s*\d+\s*[·•.:\-]\s*/i, '')
        .replace(/^🧑‍💼\s*/u, '')
        .replace(/^🐍\s*/u, '')
        .trim();
    } while (text !== previous);
    return text;
  };

  const visibleQuestions = () => [...document.querySelectorAll(SELECTORS.questions)].filter((button) => {
    const style = getComputedStyle(button);
    return style.display !== 'none' && style.visibility !== 'hidden' && !button.disabled;
  });

  // The original renderer's .active class cannot be trusted because the
  // question labels are intentionally changed from PY-Txxx/PY-Pxxx to Qx.
  // Find the current question from the question displayed in #page instead.
  const currentIndex = () => {
    const questions = visibleQuestions();
    if (!questions.length) return -1;

    const displayed = document.querySelector('#page .question');
    const displayedText = clean(displayed?.textContent || '');

    if (displayedText) {
      const match = questions.findIndex((button) => clean(button.textContent) === displayedText);
      if (match >= 0) return match;
    }

    // Fallback for a newly rendered page before .question exists.
    const title = clean(document.getElementById('title')?.textContent || '');
    if (title) {
      const match = questions.findIndex((button) => clean(button.textContent) === title);
      if (match >= 0) return match;
    }

    return 0;
  };

  function formatQuestionDisplay() {
    const questions = visibleQuestions();
    const index = currentIndex();

    questions.forEach((button, i) => {
      const text = clean(button.textContent);
      if (text) button.textContent = `Q${i + 1}.🧑‍💼${text}`;
      button.classList.toggle('active', i === index);
    });

    const question = document.querySelector(`${SELECTORS.page} .question`);
    if (question) {
      const text = clean(question.textContent);
      if (text) question.textContent = `Q${index + 1}.🧑‍💼${text}`;
    }

    const title = document.getElementById('title');
    if (title && questions[index]) {
      const text = clean(questions[index].textContent);
      if (text) title.textContent = `Q${index + 1}.🧑‍💼${text}`;
    }
  }

  function getInterviewCard() {
    const page = document.querySelector(SELECTORS.page);
    if (!page) return null;
    return [...page.querySelectorAll('.card')].find((card) =>
      /interview answer/i.test(card.textContent || '')
    ) || null;
  }

  function ensureNextButton() {
    const page = document.querySelector(SELECTORS.page);
    if (!page || !visibleQuestions().length) return;

    let button = document.getElementById('pythonNextButton');
    if (!button) {
      button = document.createElement('button');
      button.id = 'pythonNextButton';
      button.type = 'button';
      button.setAttribute('data-python-next', '1');
      button.textContent = 'Next →';
    }

    Object.assign(button.style, {
      background: '#7c3aed',
      color: '#fff',
      border: '0',
      borderRadius: '8px',
      padding: '10px 16px',
      fontWeight: '700',
      cursor: 'pointer',
      pointerEvents: 'auto',
      opacity: '1',
      display: 'inline-block'
    });

    const card = getInterviewCard();
    if (card) {
      let wrap = card.querySelector('[data-python-next-wrap]');
      if (!wrap) {
        wrap = document.createElement('div');
        wrap.setAttribute('data-python-next-wrap', '1');
        Object.assign(wrap.style, {
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '16px',
          width: '100%'
        });
        card.appendChild(wrap);
      }
      if (button.parentElement !== wrap) wrap.appendChild(button);
    } else if (!button.parentElement) {
      page.appendChild(button);
    }
  }

  function goNext() {
    const questions = visibleQuestions();
    if (!questions.length) return;

    const index = currentIndex();
    const nextIndex = index < 0 ? 0 : (index + 1) % questions.length;
    const next = questions[nextIndex];
    if (!next) return;

    // The original renderer already has the correct question-loading logic.
    // Trigger that existing qbtn handler, but determine the next item from
    // the visible question text rather than its broken .active state.
    next.click();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(apply, 0);
    setTimeout(apply, 100);
    setTimeout(apply, 250);
  }

  // One delegated handler for the Next button.
  document.addEventListener('click', (event) => {
    const button = event.target.closest?.('[data-python-next="1"]');
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    goNext();
  }, true);

  function apply() {
    if (!document.querySelector(SELECTORS.page) || !document.querySelector(SELECTORS.nav)) return;
    formatQuestionDisplay();
    ensureNextButton();
  }

  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    setTimeout(() => {
      queued = false;
      apply();
    }, 0);
  };

  const observer = new MutationObserver(schedule);
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });

  document.addEventListener('click', (event) => {
    if (event.target.closest?.('#nav .qbtn, #pythonTheoryTab, #pythonPracticeTab')) {
      setTimeout(apply, 0);
      setTimeout(apply, 100);
      setTimeout(apply, 250);
    }
  });

  document.getElementById('search')?.addEventListener('input', () => {
    setTimeout(apply, 0);
    setTimeout(apply, 100);
  });

  document.getElementById('difficulty')?.addEventListener('change', () => {
    setTimeout(apply, 0);
    setTimeout(apply, 100);
  });

  window.addEventListener('load', () => {
    setTimeout(apply, 0);
    setTimeout(apply, 300);
  });

  setTimeout(apply, 0);
  setTimeout(apply, 300);
  setTimeout(apply, 1000);
})();
