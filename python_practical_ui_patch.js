// Python Practical UI patch
// Keeps sequential Q numbers, removes Think First, and provides reliable Next navigation.
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

  function formatHeading() {
    const question = document.querySelector('#page .question');
    if (!question) return;
    const text = clean(question.textContent);
    if (text) {
      syncIndex();
      question.textContent = `Q${Math.max(0, state.index) + 1} · 🧑‍💼 ${text}`;
    }
  }

  function removeThinkFirst() {
    document.querySelectorAll('#page .card').forEach(card => {
      if (/think first/i.test(card.textContent || '')) card.remove();
    });
  }

  function styleNext(button) {
    if (!button) return;
    button.id = 'nextPythonBtn';
    button.type = 'button';
    button.textContent = 'Next →';
    Object.entries({
      background: '#7c3aed', color: '#fff', border: '0', borderRadius: '8px',
      padding: '10px 16px', fontWeight: '700', cursor: 'pointer'
    }).forEach(([k, v]) => button.style.setProperty(k, v, 'important'));
    button.onclick = nextQuestion;
  }

  function addNext() {
    removeThinkFirst();
    const clear = document.getElementById('clearBtn');
    if (!clear) return;

    let button = document.getElementById('nextPythonBtn');
    if (!button) {
      button = document.createElement('button');
      button.className = 'btn clear';
      clear.insertAdjacentElement('afterend', button);
    }
    styleNext(button);
  }

  function nextQuestion() {
    const bs = buttons();
    if (!bs.length) return;

    syncIndex();
    state.index = (state.index + 1) % bs.length;
    const next = bs[state.index];
    if (!next) return;

    next.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(apply, 0);
    setTimeout(apply, 100);
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
    removeThinkFirst();
    formatHeading();
    addNext();
  }

  function expand() {
    if (document.getElementById('fullWidthLayoutFix')) return;
    const style = document.createElement('style');
    style.id = 'fullWidthLayoutFix';
    style.textContent = '.main{max-width:none!important;width:100%!important;margin:0!important}';
    document.head.appendChild(style);
  }

  document.addEventListener('click', handleQuestionClick, true);
  document.addEventListener('click', event => {
    if (event.target.closest('#pythonPracticeTab')) {
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
    expand();
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
