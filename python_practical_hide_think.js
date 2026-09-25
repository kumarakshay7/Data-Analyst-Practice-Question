// Hide the Practical Python "Think first" card.
(() => {
  function hideThinkFirst() {
    const page = document.getElementById('page');
    if (!page) return;

    page.querySelectorAll('.card').forEach((card) => {
      const text = (card.textContent || '').replace(/\s+/g, ' ').trim();
      if (/🤔?\s*Think first/i.test(text) || /Think first/i.test(text)) {
        card.remove();
      }
    });
  }

  function boot() {
    hideThinkFirst();
    const observer = new MutationObserver(hideThinkFirst);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
