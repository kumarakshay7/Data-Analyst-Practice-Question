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

  function cleanPracticalHeader() {
    const title = document.getElementById('title');
    const subtitle = document.getElementById('subtitle');
    const header = document.querySelector('.header');

    if (!title || !subtitle || !header) return;

    if (typeof mode !== 'undefined' && mode === 'practice') {
      // The question is already displayed inside the question card.
      // Remove the duplicate question heading above it, matching the Python layout.
      title.style.display = 'none';
      subtitle.style.display = 'none';
      header.style.marginBottom = '0';
      header.style.minHeight = '0';
    } else {
      title.style.display = '';
      subtitle.style.display = '';
      header.style.marginBottom = '';
      header.style.minHeight = '';
    }
  }

  function watchPage() {
    const page = document.getElementById('page');
    if (!page) return;

    const observer = new MutationObserver(() => {
      addNextButton();
      cleanPracticalHeader();
    });
    observer.observe(page, { childList: true, subtree: true });

    addNextButton();
    cleanPracticalHeader();
  }

  function expandMainLayout() {
    if (document.getElementById('fullWidthLayoutFix')) return;
    const style = document.createElement('style');
    style.id = 'fullWidthLayoutFix';
    style.textContent = `
      .main {
        max-width: none !important;
        width: 100% !important;
        margin: 0 !important;
      }
    `;
    document.head.appendChild(style);
  }

  document.addEventListener('DOMContentLoaded', () => {
    expandMainLayout();
    watchPage();
  });
})();
