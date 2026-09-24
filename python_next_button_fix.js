// Final Python Next-button fix.
// Replaces any previously patched Next button so old click handlers cannot
// conflict with the navigation logic used by the main Python question app.
(() => {
  const page = () => document.getElementById('page');
  const nav = () => document.getElementById('nav');

  function questions() {
    return [...document.querySelectorAll('#nav .qbtn')].filter(btn => {
      const s = getComputedStyle(btn);
      return s.display !== 'none' && s.visibility !== 'hidden' && !btn.disabled;
    });
  }

  function currentIndex(qs) {
    const active = qs.findIndex(q => q.classList.contains('active'));
    return active >= 0 ? active : 0;
  }

  function replaceButton(oldButton) {
    if (!oldButton || oldButton.dataset.finalNextFix === '1') return oldButton;

    // Cloning removes all listeners installed by previous UI patches.
    const button = oldButton.cloneNode(true);
    button.dataset.finalNextFix = '1';
    button.id = oldButton.id || 'pythonNextButton';
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
    }).forEach(([key, value]) => button.style.setProperty(key, value, 'important'));

    button.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();

      const qs = questions();
      if (!qs.length) return;

      const index = currentIndex(qs);
      const nextIndex = (index + 1) % qs.length;
      const target = qs[nextIndex];
      if (!target) return;

      // Use the application's own sidebar question handler. This keeps all
      // existing rendering, answer, example and search/filter behaviour intact.
      target.click();

      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        apply();
      }, 50);
    });

    oldButton.replaceWith(button);
    return button;
  }

  function findNextButtons() {
    const root = page();
    if (!root) return [];

    return [...root.querySelectorAll('button')].filter(button => {
      const text = (button.textContent || '').trim().toLowerCase();
      return text === 'next →' || text === 'next ->' || text === 'next';
    });
  }

  function apply() {
    if (!nav() || !page()) return;
    findNextButtons().forEach(replaceButton);
  }

  const observer = new MutationObserver(() => {
    // The app rebuilds #page after every question click. Re-bind the new
    // Next button after that render.
    setTimeout(apply, 0);
  });

  function boot() {
    apply();
    setTimeout(apply, 100);
    setTimeout(apply, 300);
    setTimeout(apply, 700);
    observer.observe(page() || document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
