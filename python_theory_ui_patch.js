(() => {
  const state = { index: -1 };
  const page = () => document.getElementById('page');

  function buttons() {
    return [...document.querySelectorAll('#nav .qbtn')].filter(b =>
      getComputedStyle(b).display !== 'none' && !b.disabled
    );
  }

  function clean(text) {
    return String(text || '')
      .replace(/^PY-[TP]\d+\s*[·•:\-]\s*/i, '')
      .replace(/^Q\s*\d+\s*[·•:\-]\s*/i, '')
      .replace(/^🧑‍💼\s*/u, '')
      .replace(/^🐍\s*/u, '')
      .trim();
  }

  function syncIndex() {
    const bs = buttons();
    if (!bs.length) return -1;
    const active = bs.findIndex(b => b.classList.contains('active'));
    if (active >= 0) state.index = active;
    if (state.index < 0 || state.index >= bs.length) state.index = 0;
    return state.index;
  }

  function formatNav() {
    buttons().forEach((b, i) => {
      const text = clean(b.textContent);
      if (text) b.textContent = `Q${i + 1} · 🧑‍💼 ${text}`;
    });
  }

  function removeDuplicateQuestionCard() {
    const root = page();
    if (!root) return;
    const cards = [...root.children].filter(c =>
      c.classList?.contains('card') && c.querySelector('.question')
    );
    cards.forEach(c => c.remove());
  }

  function interviewCard() {
    const root = page();
    if (!root) return null;
    return [...root.children].find(c =>
      c.classList?.contains('card') &&
      [...c.querySelectorAll('h3')].some(h => /interview answer/i.test(h.textContent))
    ) || null;
  }

  function styleNext(button) {
    if (!button) return;
    button.id = 'pythonTheoryNextBtn';
    button.type = 'button';
    button.textContent = 'Next →';
    Object.entries({
      background: '#7c3aed', color: '#fff', border: '0', borderRadius: '8px',
      padding: '10px 16px', fontWeight: '700', cursor: 'pointer'
    }).forEach(([k, v]) => button.style.setProperty(k, v, 'important'));
    button.onclick = nextQuestion;
  }

  function addNext() {
    const card = interviewCard();
    if (!card) return;
    let button = card.querySelector('#pythonTheoryNextBtn');
    if (!button) {
      const wrap = document.createElement('div');
      wrap.style.cssText = 'display:flex;justify-content:flex-end;margin-top:16px;width:100%';
      button = document.createElement('button');
      wrap.appendChild(button);
      card.appendChild(wrap);
    }
    styleNext(button);
  }

  function nextQuestion() {
    const bs = buttons();
    if (!bs.length) return;

    // Keep our own position. Do not depend on the app's active CSS class.
    syncIndex();
    state.index = (state.index + 1) % bs.length;
    const next = bs[state.index];
    if (!next) return;

    next.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleQuestionClick(event) {
    const button = event.target.closest('#nav .qbtn');
    if (!button) return;
    const bs = buttons();
    const i = bs.indexOf(button);
    if (i >= 0) state.index = i;
    setTimeout(apply, 0);
  }

  function apply() {
    syncIndex();
    formatNav();
    removeDuplicateQuestionCard();
    addNext();
  }

  document.addEventListener('click', handleQuestionClick, true);
  document.addEventListener('click', event => {
    if (event.target.closest('#pythonTheoryTab')) {
      state.index = 0;
      setTimeout(apply, 0);
      setTimeout(apply, 100);
    }
  });

  document.getElementById('search')?.addEventListener('input', () => {
    state.index = 0;
    setTimeout(apply, 0);
  });
  document.getElementById('difficulty')?.addEventListener('change', () => {
    state.index = 0;
    setTimeout(apply, 0);
  });

  function boot() {
    let tries = 0;
    const timer = setInterval(() => {
      tries++;
      if (page() && document.querySelector('#nav .qbtn')) {
        clearInterval(timer);
        apply();
      }
      if (tries > 150) clearInterval(timer);
    }, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
