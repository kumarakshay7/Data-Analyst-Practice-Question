(() => {
  // Python Theory UI patch:
  // 1) Remove the duplicate question card rendered above "Simple explanation".
  // 2) Add a working Next button to the bottom-right of the Interview answer card.

  function page() {
    return document.getElementById('page');
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

  function getVisibleQuestionButtons() {
    return Array.from(document.querySelectorAll('#nav .qbtn')).filter(btn => {
      const style = window.getComputedStyle(btn);
      return style.display !== 'none' && !btn.disabled;
    });
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
    if (!card || card.querySelector('#pythonTheoryNextBtn')) return;

    card.style.position = 'relative';

    const wrap = document.createElement('div');
    wrap.className = 'python-theory-next-wrap';
    wrap.style.cssText = 'display:flex;justify-content:flex-end;margin-top:16px;';

    const button = document.createElement('button');
    button.id = 'pythonTheoryNextBtn';
    button.type = 'button';
    button.className = 'btn clear';
    button.textContent = 'Next →';
    button.title = 'Open the next Python Theory question';
    button.addEventListener('click', nextQuestion);

    wrap.appendChild(button);
    card.appendChild(wrap);
  }

  function apply() {
    removeDuplicateQuestionCard();
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
