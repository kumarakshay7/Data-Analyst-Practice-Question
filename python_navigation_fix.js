// Consolidated Python Theory + Practical UI/navigation fix.
// This file intentionally owns the Next button and display formatting so
// multiple older UI patches cannot attach competing click handlers.
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

  const currentIndex = () => {
    const questions = visibleQuestions();
    const active = questions.findIndex((button) => button.classList.contains('active'));
    return active >= 0 ? active : 0;
  };

  function formatQuestionDisplay() {
    const questions = visibleQuestions();

    questions.forEach((button, index) => {
      const text = clean(button.textContent);
      if (text) button.textContent = `Q${index + 1}.🧑‍💼${text}`;
    });

    const question = document.querySelector(`${SELECTORS.page} .question`);
    if (question) {
      const text = clean(question.textContent);
      if (text) question.textContent = `Q${currentIndex() + 1}.🧑‍💼${text}`;
    }

    const title = document.getElementById('title');
    if (title && questions.length) {
      const text = clean(questions[currentIndex()]?.textContent);
      if (text) title.textContent = `Q${currentIndex() + 1}.🧑‍💼${text}`;
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

    // Keep the button in the same area as the interview answer.
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
    const next = questions[(index + 1) % questions.length];
    if (!next) return;

    // Use the application's original sidebar navigation. We do not attach
    // handlers to the sidebar buttons, so there is no handler conflict.
    next.click();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(apply, 0);
    setTimeout(apply, 100);
    setTimeout(apply, 250);
  }

  // One delegated handler for one Next button. It survives page re-renders.
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
