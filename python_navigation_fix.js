// Stable Python Theory + Practical navigation and Next-button placement.
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

  function isPractical() {
    return document.getElementById('pythonPracticeTab')?.classList.contains('active') || /practical/i.test(document.getElementById('subtitle')?.textContent || '');
  }

  function clean(value) {
    let text = String(value || '').trim();
    let old;
    do {
      old = text;
      text = text.replace(/^PY-[TP]\d+\s*[·•.:\-]\s*/i, '').replace(/^Q\s*\d+\s*[·•.:\-]?\s*/i, '').replace(/^🧑‍💼\s*/u, '').trim();
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

  function practicalContainer() {
    const page = document.getElementById('page');
    if (!page) return null;
    return page.querySelector('.buttons') || page.querySelector('.editor')?.parentElement || page;
  }

  function placeTheoryButton(button, card) {
    let wrap = card.querySelector('[data-python-next-wrap]');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.setAttribute('data-python-next-wrap', '1');
      wrap.style.display = 'flex';
      wrap.style.justifyContent = 'flex-end';
      wrap.style.alignItems = 'center';
      wrap.style.width = '100%';
      wrap.style.marginTop = '16px';
      wrap.style.boxSizing = 'border-box';
      card.appendChild(wrap);
    }
    if (button.parentElement !== wrap) wrap.appendChild(button);
  }

  function ensureNext() {
    const qs = questions();
    if (!qs.length) return;
    const practical = isPractical();
    const container = practical ? practicalContainer() : interviewCard();
    if (!container) return;

    let button = document.getElementById('pythonNextButton');
    if (!button) {
      button = document.createElement('button');
      button.id = 'pythonNextButton';
      button.type = 'button';
      button.textContent = 'Next →';
      button.setAttribute('data-python-next', '1');
    }

    button.className = practical ? 'btn' : '';
    Object.assign(button.style, {
      background: '#7c3aed', color: '#fff', border: '0', borderRadius: '8px',
      padding: '10px 16px', fontWeight: '700', cursor: 'pointer',
      pointerEvents: 'auto', opacity: '1', display: 'inline-block',
      marginLeft: practical ? 'auto' : '0', float: 'none'
    });
    button.disabled = false;
    button.removeAttribute('disabled');
    button.onclick = function (event) {
      event.preventDefault();
      event.stopPropagation();
      goNext();
    };

    if (practical) {
      if (button.parentElement !== container) container.appendChild(button);
    } else {
      placeTheoryButton(button, container);
    }
  }

  function goNext() {
    const current = questions();
    if (!current.length) return;
    let currentIndex = current.findIndex((q) => q.classList.contains('active'));
    if (currentIndex < 0) currentIndex = state.index;
    if (currentIndex < 0 || currentIndex >= current.length) currentIndex = 0;
    const nextIndex = currentIndex + 1 < current.length ? currentIndex + 1 : 0;
    state.index = nextIndex;
    const next = current[nextIndex];
    if (!next) return;
    next.click();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => { formatDisplay(); ensureNext(); }, 50);
    setTimeout(() => { formatDisplay(); ensureNext(); }, 200);
  }

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
      setTimeout(ensureNext, 300);
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

  const observer = new MutationObserver(() => {
    setTimeout(() => { formatDisplay(); ensureNext(); }, 0);
  });
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });

  function boot() {
    setTimeout(formatDisplay, 0);
    setTimeout(ensureNext, 100);
    setTimeout(formatDisplay, 300);
    setTimeout(ensureNext, 400);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
