(() => {
  // Python Theory UI patch
  // - Remove duplicate question card.
  // - Show sequential Q1, Q2, Q3... in the navigation and top question title.
  // - Use the requested interviewer icon in the top title.
  // - Keep Next in the bottom-right of Interview answer.
  // - Force the Next button to use the teal/green SQL-style color.

  function page() {
    return document.getElementById('page');
  }

  function visibleQuestionButtons() {
    return Array.from(document.querySelectorAll('#nav .qbtn')).filter(btn => {
      const style = window.getComputedStyle(btn);
      return style.display !== 'none' && !btn.disabled;
    });
  }

  function cleanText(text) {
    return String(text || '')
      .replace(/^PY-T\d+\s*[·•:\-]\s*/i, '')
      .replace(/^Q\s*\d+\s*[·•:\-]\s*/i, '')
      .replace(/^🧑‍💼\s*/u, '')
      .replace(/^🐍\s*/u, '')
      .trim();
  }

  function currentNumber() {
    const buttons = visibleQuestionButtons();
    const active = buttons.findIndex(btn => btn.classList.contains('active'));
    return active >= 0 ? active + 1 : 1;
  }

  function formatNavigation() {
    visibleQuestionButtons().forEach((btn, index) => {
      const text = cleanText(btn.textContent);
      if (text) btn.textContent = `Q${index + 1} · ${text}`;
    });
  }

  function formatTopQuestion() {
    const title = document.getElementById('title');
    if (!title) return;

    const buttons = visibleQuestionButtons();
    const number = currentNumber();
    const active = buttons[number - 1];
    const text = cleanText(active ? active.textContent : title.textContent);

    if (text && !/^Python Theory Questions$/i.test(text)) {
      title.textContent = `Q${number} · 🧑‍💼 ${text}`;
    }
  }

  function removeDuplicateQuestionCard() {
    const root = page();
    if (!root) return;

    const cards = Array.from(root.children).filter(el => el.classList?.contains('card'));
    cards.filter(card => card.querySelector('.question')).forEach(card => card.remove());
  }

  function getInterviewCard() {
    const root = page();
    if (!root) return null;

    return Array.from(root.children).find(card =>
      card.classList?.contains('card') &&
      Array.from(card.querySelectorAll('h3')).some(h =>
        h.textContent.trim().toLowerCase().includes('interview answer')
      )
    ) || null;
  }

  function styleNextButton(button) {
    if (!button) return;

    button.id = 'pythonTheoryNextBtn';
    button.textContent = 'Next →';
    button.type = 'button';

    const styles = {
      background: '#0f8b78',
      color: '#ffffff',
      border: '0',
      borderRadius: '8px',
      padding: '10px 16px',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'background .15s ease, transform .15s ease'
    };

    Object.entries(styles).forEach(([key, value]) => {
      button.style.setProperty(key, value, 'important');
    });

    button.onmouseenter = () => button.style.setProperty('background', '#0b6f61', 'important');
    button.onmouseleave = () => button.style.setProperty('background', '#0f8b78', 'important');
    button.onmousedown = () => button.style.setProperty('transform', 'translateY(1px)', 'important');
    button.onmouseup = () => button.style.setProperty('transform', 'translateY(0)', 'important');
    button.onclick = nextQuestion;
  }

  function injectStyle() {
    let style = document.getElementById('pythonTheoryNextStyle');
    if (!style) {
      style = document.createElement('style');
      style.id = 'pythonTheoryNextStyle';
      document.head.appendChild(style);
    }

    style.textContent = `
      #pythonTheoryNextBtn,
      .python-theory-next-wrap #pythonTheoryNextBtn {
        background: #0f8b78 !important;
        color: #fff !important;
        border: 0 !important;
        border-radius: 8px !important;
        padding: 10px 16px !important;
        font-weight: 700 !important;
        cursor: pointer !important;
      }
      #pythonTheoryNextBtn:hover,
      .python-theory-next-wrap #pythonTheoryNextBtn:hover {
        background: #0b6f61 !important;
        color: #fff !important;
      }
    `;
  }

  function nextQuestion() {
    const buttons = visibleQuestionButtons();
    if (!buttons.length) return;

    const activeIndex = buttons.findIndex(btn => btn.classList.contains('active'));
    const nextIndex = activeIndex >= 0 ? (activeIndex + 1) % buttons.length : 0;
    buttons[nextIndex].click();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function addNextButton() {
    const card = getInterviewCard();
    if (!card) return;

    injectStyle();

    let button = card.querySelector('#pythonTheoryNextBtn');

    // If another script already created a Next button, reuse it and force the style.
    if (!button) {
      button = Array.from(card.querySelectorAll('button')).find(btn =>
        /^Next\s*→?$/i.test(btn.textContent.trim())
      );
    }

    if (!button) {
      const wrap = document.createElement('div');
      wrap.className = 'python-theory-next-wrap';
      wrap.style.cssText = 'display:flex;justify-content:flex-end;margin-top:16px;width:100%;';

      button = document.createElement('button');
      wrap.appendChild(button);
      card.appendChild(wrap);
    } else if (!button.parentElement.classList.contains('python-theory-next-wrap')) {
      const wrap = document.createElement('div');
      wrap.className = 'python-theory-next-wrap';
      wrap.style.cssText = 'display:flex;justify-content:flex-end;margin-top:16px;width:100%;';
      button.parentNode.insertBefore(wrap, button);
      wrap.appendChild(button);
    }

    styleNextButton(button);
  }

  function apply() {
    removeDuplicateQuestionCard();
    formatNavigation();
    formatTopQuestion();
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
      if (page() && document.querySelector('#nav .qbtn')) {
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
