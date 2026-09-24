// Stable Python Theory + Practical navigation.
// Uses a small internal index instead of reading the formatted Q1/Q2 labels.
(() => {
  const navSelector = '#nav .qbtn';
  const state = window.__pythonNavigationState || { index: 0 };
  window.__pythonNavigationState = state;

  function questions() {
    return [...document.querySelectorAll(navSelector)].filter((button) => {
      const style = getComputedStyle(button);
      return style.display !== 'none' && style.visibility !== 'hidden' && !button.disabled;
    });
  }

  function clean(value) {
    let text = String(value || '').trim();
    let old;
    do {
      old = text;
      text = text
        .replace(/^PY-[TP]\d+\s*[·•.:\-]\s*/i, '')
        .replace(/^Q\s*\d+\s*[·•.:\-]?\s*/i, '')
        .replace(/^🧑‍💼\s*/u, '')
        .trim();
    } while (text !== old);
    return text;
  }

  function formatDisplay() {
    const qs = questions();
    if (!qs.length) return;
    if (state.index >= qs.length) state.index = qs.length - 1;
    if (state.index < 0) state.index = 0;

    qs.forEach((button, i) => {
      const text = clean(button.textContent);
      if (text) button.textContent = `Q${i + 1}.🧑‍💼${text}`;
      button.classList.toggle('active', i === state.index);
    });

    const pageQuestion = document.querySelector('#page .question');
    if (pageQuestion) {
      const text = clean(pageQuestion.textContent);
      if (text) pageQuestion.textContent = `Q${state.index + 1}.🧑‍💼${text}`;
    }

    const title = document.getElementById('title');
    if (title && qs[state.index]) {
      const text = clean(qs[state.index].textContent);
      if (text) title.textContent = `Q${state.index + 1}.🧑‍💼${text}`;
    }
  }

  function interviewCard() {
    const page = document.getElementById('page');
    if (!page) return null;
    return [...page.querySelectorAll('.card')].find((card) => /interview answer/i.test(card.textContent || '')) || null;
  }

  function ensureNext() {
    const qs = questions();
    const card = interviewCard();
    if (!qs.length || !card) return;

    let button = document.getElementById('pythonNextButton');
    if (!button) {
      button = document.createElement('button');
      button.id = 'pythonNextButton';
      button.type = 'button';
      button.textContent = 'Next →';
      button.setAttribute('data-python-next', '1');
    }

    button.onclick = function (event) {
      event.preventDefault();
      event.stopPropagation();

      const current = questions();
      if (!current.length) return;

      state.index = state.index >= current.length - 1 ? 0 : state.index + 1;
      const next = current[state.index];
      if (!next) return;

      next.click();
      setTimeout(formatDisplay, 0);
      setTimeout(formatDisplay, 100);
      setTimeout(ensureNext, 150);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    Object.assign(button.style, {
      background: '#7c3aed', color: '#fff', border: '0', borderRadius: '8px',
      padding: '10px 16px', fontWeight: '700', cursor: 'pointer',
      pointerEvents: 'auto', opacity: '1', display: 'inline-block'
    });

    let wrap = card.querySelector('[data-python-next-wrap]');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.setAttribute('data-python-next-wrap', '1');
      Object.assign(wrap.style, { display: 'flex', justifyContent: 'flex-end', marginTop: '16px', width: '100%' });
      card.appendChild(wrap);
    }
    if (button.parentElement !== wrap) wrap.appendChild(button);
  }

  // Capture sidebar clicks before the original inline question handler.
  document.addEventListener('click', (event) => {
    const button = event.target.closest?.(navSelector);
    if (!button) return;
    const qs = questions();
    const index = qs.indexOf(button);
    if (index >= 0) {
      state.index = index;
      setTimeout(formatDisplay, 0);
      setTimeout(ensureNext, 50);
    }
  }, true);

  document.addEventListener('click', (event) => {
    if (event.target.closest?.('#pythonTheoryTab, #pythonPracticeTab')) {
      state.index = 0;
      setTimeout(formatDisplay, 50);
      setTimeout(ensureNext, 100);
    }
  }, true);

  document.getElementById('search')?.addEventListener('input', () => {
    state.index = 0;
    setTimeout(formatDisplay, 50);
    setTimeout(ensureNext, 100);
  });

  document.getElementById('difficulty')?.addEventListener('change', () => {
    state.index = 0;
    setTimeout(formatDisplay, 50);
    setTimeout(ensureNext, 100);
  });

  // Repair only display/button placement. This observer never changes state.
  const observer = new MutationObserver(() => {
    setTimeout(() => { formatDisplay(); ensureNext(); }, 0);
  });
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });

  function boot() {
    setTimeout(formatDisplay, 0);
    setTimeout(ensureNext, 50);
    setTimeout(formatDisplay, 300);
    setTimeout(ensureNext, 350);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
