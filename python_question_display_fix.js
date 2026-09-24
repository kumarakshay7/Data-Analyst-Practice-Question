// Python question display fix
// Final visible format: Q1.🧑‍💼Question text
// Safely removes any number of previously-added Q/emoji prefixes.
(() => {
  const page = () => document.getElementById('page');
  const nav = () => document.getElementById('nav');

  function visibleQuestions() {
    return [...document.querySelectorAll('#nav .qbtn')].filter(btn => {
      const style = getComputedStyle(btn);
      return style.display !== 'none' && style.visibility !== 'hidden' && !btn.disabled;
    });
  }

  function clean(text) {
    let value = String(text || '').trim();
    let previous;
    do {
      previous = value;
      value = value
        .replace(/^PY-[TP]\d+\s*[·•.:\-]\s*/i, '')
        .replace(/^Q\s*\d+\s*[·•.:\-]\s*/i, '')
        .replace(/^🧑‍💼\s*/u, '')
        .replace(/^🐍\s*/u, '')
        .trim();
    } while (value !== previous);
    return value;
  }

  function currentIndex() {
    const qs = visibleQuestions();
    if (!qs.length) return -1;
    const active = qs.findIndex(q => q.classList.contains('active'));
    return active >= 0 ? active : 0;
  }

  function formatSidebar() {
    visibleQuestions().forEach((button, index) => {
      const text = clean(button.textContent);
      if (!text) return;
      const wanted = `Q${index + 1}.🧑‍💼${text}`;
      if (button.textContent !== wanted) button.textContent = wanted;
    });
  }

  function formatMainTitle() {
    const qs = visibleQuestions();
    const index = currentIndex();
    if (index < 0 || !qs[index]) return;

    const navText = clean(qs[index].textContent);
    if (!navText) return;

    const title = document.getElementById('title');
    if (title) {
      const wanted = `Q${index + 1}.🧑‍💼${navText}`;
      if (title.textContent !== wanted) title.textContent = wanted;
    }

    const question = page()?.querySelector('.question');
    if (question) {
      const text = clean(question.textContent) || navText;
      const wanted = `Q${index + 1}.🧑‍💼${text}`;
      if (question.textContent !== wanted) question.textContent = wanted;
    }
  }

  function apply() {
    if (!nav() || !page()) return;
    formatSidebar();
    formatMainTitle();
  }

  let scheduled = false;
  function scheduleApply() {
    if (scheduled) return;
    scheduled = true;
    setTimeout(() => {
      scheduled = false;
      apply();
    }, 0);
  }

  document.addEventListener('click', event => {
    if (event.target.closest('#nav .qbtn, #pythonTheoryTab, #pythonPracticeTab')) {
      setTimeout(apply, 0);
      setTimeout(apply, 100);
      setTimeout(apply, 300);
    }
  }, true);

  document.getElementById('search')?.addEventListener('input', () => {
    setTimeout(apply, 0);
    setTimeout(apply, 100);
  });

  document.getElementById('difficulty')?.addEventListener('change', () => {
    setTimeout(apply, 0);
    setTimeout(apply, 100);
  });

  const observer = new MutationObserver(scheduleApply);
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });

  function boot() {
    apply();
    setTimeout(apply, 100);
    setTimeout(apply, 500);
    setTimeout(apply, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
