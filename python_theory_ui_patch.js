(() => {
  // Python Theory UI patch:
  // 1) Remove the duplicate question card rendered above "Simple explanation".
  // 2) Display sequential Q1, Q2, Q3... instead of PY-T001, PY-T002...
  // 3) Keep the Next button in the bottom-right of the Interview answer card.
  // 4) Give the Next button a teal/green color matching the SQL Run button.

  function page() {
    return document.getElementById('page');
  }

  function getVisibleQuestionButtons() {
    return Array.from(document.querySelectorAll('#nav .qbtn')).filter(btn => {
      const style = window.getComputedStyle(btn);
      return style.display !== 'none' && !btn.disabled;
    });
  }

  function getCurrentQuestionNumber() {
    const buttons = getVisibleQuestionButtons();
    const activeIndex = buttons.findIndex(btn => btn.classList.contains('active'));
    return activeIndex >= 0 ? activeIndex + 1 : 1;
  }

  function cleanQuestionText(text) {
    return String(text || '')
      .replace(/^PY-T\d+\s*[·•:-]\s*/i, '')
      .replace(/^Q\d+\s*[·•:-]\s*/i, '')
      .trim();
  }

  function formatQuestionNumbers() {
    const buttons = getVisibleQuestionButtons();

    buttons.forEach((btn, index) => {
      const text = cleanQuestionText(btn.textContent);
      if (text) btn.textContent = `Q${index + 1} · ${text}`;
    });

    const number = getCurrentQuestionNumber();
    const title = document.getElementById('title');
    if (title) {
      const text = cleanQuestionText(title.textContent);
      if (text && !/^Python Theory Questions$/i.test(text)) {
        title.textContent = `Q${number} · ${text}`;
      }
    }

    const root = page();
    if (root) {
      root.querySelectorAll('.question').forEach(el => {
        const text = cleanQuestionText(el.textContent);
        if (text) el.textContent = `Q${number} · ${text}`;
      });
    }
  }

  function removeDuplicateQuestionCard() {
    const root = page();
    if (!root) return;

    const cards = Array.from(root.children).filter(el => el.classList?.contains('card'));
    const duplicate = cards.find(card => card.querySelector('.question'));
    if (duplicate) duplicate.remove();
  }

  function getInterviewCard() {
    const root = page();
    if (!root) return null;

    return Array.from(root.children).find(card =>
      card.classList?.contains('card') &&
      Array.from(card.querySelectorAll('h3')).some(h =>
        h.textContent.trim().includes('Interview answer')
      )
    ) || null;
  }

  function injectButtonStyle() {
    if (document.getElementById('pythonTheoryNextStyle')) return;

    const style = document.createElement('style');
    style.id = 'pythonTheoryNextStyle';
    style.textContent = `
      #pythonTheoryNextBtn {
        background: #0f8b78 !important;
        color: #ffffff !important;
        border: 0 !important;
        border-radius: 8px !important;
        padding: 10px 16px !important;
        font-weight: 700 !important;
        cursor: pointer !important;
        transition: background .15s ease, transform .15s ease !important;
      }
      #pythonTheoryNextBtn:hover {
        background: #0b6f61 !important;
        color: #ffffff !important;
      }
      #pythonTheoryNextBtn:active {
        transform: translateY(1px);
      }
    `;
    document.head.appendChild(style);
  }

  function nextQuestion() {
    const buttons = getVisibleQuestionButtons();
    if (!buttons.length) return;

    const activeIndex = buttons.findIndex(btn => btn.classList.contains('active'));
    const nextIndex = activeIndex >= 0
      ? (activeIndex + 1) % buttons.length
      : 0;

    buttons[nextIndex].click();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function addNextButton() {
    const card = getInterviewCard();
    if (!card) return;

    let button = card.querySelector('#pythonTheoryNextBtn');
    if (!button) {
      card.style.position = 'relative';

      const wrap = document.createElement('div');
      wrap.className = 'python-theory-next-wrap';
      wrap.style.cssText = 'display:flex;justify-content:flex-end;margin-top:16px;';

      button = document.createElement('button');
      button.id = 'pythonTheoryNextBtn';
      button.type = 'button';
      button.textContent = 'Next →';
      button.title = 'Open the next Python Theory question';
      button.addEventListener('click', nextQuestion);

      wrap.appendChild(button);
      card.appendChild(wrap);
    }

    injectButtonStyle();
  }

  function apply() {
    removeDuplicateQuestionCard();
    formatQuestionNumbers();
    addNextButton();
  }

  function startObserver() {
    const root = page();
    if (!root || root.dataset.pythonTheoryPatchAttached) return;

    root.dataset.pythonTheoryPatchAttached = 'true';
    let scheduled = false;

    const observer = new MutationObserver(() => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        apply();
      });
    });

    observer.observe(root, { childList: true, subtree: true });
    apply();
  }

  function boot() {
    const timer = setInterval(() => {
      if (document.getElementById('page') && document.querySelector('#nav .qbtn')) {
        clearInterval(timer);
        startObserver();
      }
    }, 100);

    setTimeout(() => clearInterval(timer), 15000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
