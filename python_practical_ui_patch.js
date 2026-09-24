// Python Practical UI patch
// Reliable sequential Q1, Q2, Q3... numbering and Next navigation.
(() => {
  const state = { index: 0, navigating: false };
  const page = () => document.getElementById('page');
  const nav = () => document.getElementById('nav');

  function visibleQuestions() {
    return [...document.querySelectorAll('#nav .qbtn')].filter(btn => {
      const s = getComputedStyle(btn);
      return s.display !== 'none' && s.visibility !== 'hidden' && !btn.disabled;
    });
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
    const qs = visibleQuestions();
    if (!qs.length) return -1;
    const active = qs.findIndex(q => q.classList.contains('active'));
    if (active >= 0) state.index = active;
    if (state.index < 0 || state.index >= qs.length) state.index = 0;
    return state.index;
  }

  function formatHeading() {
    const question = page()?.querySelector('.question');
    if (!question) return;
    const text = clean(question.textContent);
    if (!text) return;
    const index = syncIndex();
    if (index < 0) return;
    const wanted = `Q${index + 1} · 🧑‍💼 ${text}`;
    if (question.textContent !== wanted) question.textContent = wanted;
  }

  function removeThinkFirst() {
    page()?.querySelectorAll('.card').forEach(card => {
      if (/think first/i.test(card.textContent || '')) card.remove();
    });
  }

  function styleNext(button) {
    if (!button) return;
    button.id = 'nextPythonBtn';
    button.type = 'button';
    button.textContent = 'Next →';
    button.disabled = false;
    button.removeAttribute('disabled');
    Object.entries({
      background: '#7c3aed',
      color: '#fff',
      border: '0',
      borderRadius: '8px',
      padding: '10px 16px',
      fontWeight: '700',
      cursor: 'pointer',
      pointerEvents: 'auto',
      opacity: '1'
    }).forEach(([k, v]) => button.style.setProperty(k, v, 'important'));

    // Replace any previous handler so the button always uses this navigation.
    button.onclick = null;
    button.addEventListener('click', nextQuestion, { capture: true });
  }

  function addNext() {
    removeThinkFirst();
    const buttons = page()?.querySelector('.buttons');
    const clear = document.getElementById('clearBtn');
    if (!clear && !buttons) return;

    let button = document.getElementById('nextPythonBtn');
    if (!button) {
      button = document.createElement('button');
      button.className = 'btn clear';
      button.type = 'button';
      if (clear) clear.insertAdjacentElement('afterend', button);
      else buttons.appendChild(button);
    }

    // Prevent duplicate listeners created by repeated MutationObserver passes.
    if (button.dataset.nextBound !== '1') {
      button.dataset.nextBound = '1';
      button.addEventListener('click', nextQuestion, { capture: true });
    }
    styleNextWithoutRebinding(button);
  }

  function styleNextWithoutRebinding(button) {
    if (!button) return;
    button.id = 'nextPythonBtn';
    button.type = 'button';
    button.textContent = 'Next →';
    button.disabled = false;
    button.removeAttribute('disabled');
    Object.entries({
      background: '#7c3aed', color: '#fff', border: '0', borderRadius: '8px',
      padding: '10px 16px', fontWeight: '700', cursor: 'pointer',
      pointerEvents: 'auto', opacity: '1'
    }).forEach(([k, v]) => button.style.setProperty(k, v, 'important'));
  }

  function activateQuestion(target) {
    if (!target) return false;

    // Native click is important here because the Python app owns the real
    // question-navigation handler on these sidebar buttons.
    try { target.focus({ preventScroll: true }); } catch (_) {}
    try { target.click(); } catch (_) {
      target.dispatchEvent(new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      }));
    }
    return true;
  }

  function nextQuestion(event) {
    event?.preventDefault();
    event?.stopImmediatePropagation();
    if (state.navigating) return;
    state.navigating = true;

    const qs = visibleQuestions();
    if (!qs.length) {
      state.navigating = false;
      return;
    }

    let currentIndex = qs.findIndex(q => q.classList.contains('active'));
    if (currentIndex < 0) currentIndex = state.index;
    if (currentIndex < 0 || currentIndex >= qs.length) currentIndex = 0;

    const nextIndex = currentIndex + 1 < qs.length ? currentIndex + 1 : 0;
    state.index = nextIndex;
    const target = qs[nextIndex];

    activateQuestion(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // The main app rebuilds #page after the sidebar click. Re-apply our UI
    // after that render without trying to navigate a second time.
    setTimeout(() => {
      state.navigating = false;
      apply();
    }, 50);
    setTimeout(apply, 200);
  }

  function handleQuestionClick(event) {
    if (state.navigating) return;
    const button = event.target.closest?.('#nav .qbtn');
    if (!button) return;
    const qs = visibleQuestions();
    const i = qs.indexOf(button);
    if (i >= 0) state.index = i;
    setTimeout(apply, 0);
    setTimeout(apply, 100);
  }

  function apply() {
    if (!nav() || !page()) return;
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
    if (event.target.closest?.('#pythonPracticeTab')) {
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
      if (page() && nav()?.querySelector('.qbtn')) {
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
