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
    const questionHeaders = document.querySelectorAll('#page > .card:first-child .question');

    if (typeof mode !== 'undefined' && mode === 'practice') {
      // Keep the current question number + title in the main header at the top.
      // Remove only the duplicate question heading inside the first card.
      if (title && current) {
        title.textContent = `${current.id} · ${current.title}`;
      }
      if (subtitle) {
        subtitle.textContent = 'Query-writing questions are separated from theory questions. Write SQL, run it, and check your result.';
      }
      questionHeaders.forEach(el => {
        el.style.display = 'none';
      });
    } else {
      if (title) title.textContent = 'Practical SQL Questions';
      if (subtitle) subtitle.textContent = 'Query-writing questions are separated from theory questions. Write SQL, run it, and check your result.';
      questionHeaders.forEach(el => {
        el.style.display = '';
      });
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
