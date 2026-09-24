(() => {
  // SQL Practical Next button: follows the current filtered question order.
  function filteredQuestions() {
    const search = document.getElementById('search');
    const difficulty = document.getElementById('difficulty');
    const s = (search?.value || '').toLowerCase().trim();
    const d = difficulty?.value || 'All';

    return BANK.filter(q =>
      mode === 'practice' &&
      practicalIds.has(q.n) &&
      (!s || q.title.toLowerCase().includes(s) || q.id.toLowerCase().includes(s)) &&
      (d === 'All' || q.difficulty === d)
    );
  }

  function addNextButton() {
    if (typeof mode !== 'undefined' && mode !== 'practice') return;

    const buttons = document.querySelector('#page .buttons');
    const clear = buttons?.querySelector('.clear');
    if (!buttons || !clear || document.getElementById('nextQuestionBtn')) return;

    const button = document.createElement('button');
    button.id = 'nextQuestionBtn';
    button.type = 'button';
    button.className = 'btn clear';
    button.textContent = 'Next →';
    button.title = 'Open the next SQL practical question';
    button.addEventListener('click', nextQuestion);

    clear.insertAdjacentElement('afterend', button);
  }

  function nextQuestion() {
    const arr = filteredQuestions();
    if (!arr.length) return;

    const index = arr.findIndex(q => current && q.n === current.n);
    const next = arr[(index + 1 + arr.length) % arr.length];

    show(next.n);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function watchPage() {
    const page = document.getElementById('page');
    if (!page) return;

    const observer = new MutationObserver(() => addNextButton());
    observer.observe(page, { childList: true, subtree: true });

    addNextButton();
  }

  document.addEventListener('DOMContentLoaded', watchPage);
})();
