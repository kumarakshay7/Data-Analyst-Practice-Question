(() => {
  function filteredQuestions() {
    const search = document.getElementById('search');
    const difficulty = document.getElementById('difficulty');
    const s = (search?.value || '').toLowerCase().trim();
    const d = difficulty?.value || 'All';
    return BANK.filter(q => mode === 'practice' && practicalIds.has(q.n) && (!s || q.title.toLowerCase().includes(s) || q.id.toLowerCase().includes(s)) && (d === 'All' || q.difficulty === d));
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
    if (typeof mode !== 'undefined' && mode === 'practice') {
      if (title && current) title.textContent = `${current.id} · ${current.title}`;
      if (subtitle) subtitle.textContent = 'Query-writing questions are separated from theory questions. Write SQL, run it, and check your result.';
    } else {
      if (title) title.textContent = 'Practical SQL Questions';
      if (subtitle) subtitle.textContent = 'Query-writing questions are separated from theory questions. Write SQL, run it, and check your result.';
    }
  }
  function removePracticalDuplicateCard() {
    if (typeof mode !== 'undefined' && mode !== 'practice') return;
    const page = document.getElementById('page');
    if (!page) return;

    const cards = page.querySelectorAll(':scope > .card');
    if (!cards.length) return;

    // The first card in Practical SQL is the duplicate question/details card.
    // Keep the main Q-number header at the top and remove only this card.
    const firstCard = cards[0];
    if (firstCard && firstCard.querySelector('.question') && firstCard.querySelector('.meta')) {
      firstCard.classList.add('sql-practice-duplicate-card');
    }

    if (!document.getElementById('sqlDuplicateCardStyle')) {
      const style = document.createElement('style');
      style.id = 'sqlDuplicateCardStyle';
      style.textContent = '.sql-practice-duplicate-card { display: none !important; }';
      document.head.appendChild(style);
    }
  }
  function watchPage() {
    const page = document.getElementById('page');
    if (!page) return;
    const observer = new MutationObserver(() => {
      addNextButton();
      cleanPracticalHeader();
      removePracticalDuplicateCard();
    });
    observer.observe(page, { childList: true, subtree: true });
    addNextButton();
    cleanPracticalHeader();
    removePracticalDuplicateCard();
  }
  function expandMainLayout() {
    if (document.getElementById('fullWidthLayoutFix')) return;
    const style = document.createElement('style');
    style.id = 'fullWidthLayoutFix';
    style.textContent = `.main { max-width: none !important; width: 100% !important; margin: 0 !important; }`;
    document.head.appendChild(style);
  }

  function applyExtraQuestions() {
    if (window.__extraSqlQuestionsApplied || typeof BANK === 'undefined' || !Array.isArray(BANK) || !BANK.length) return false;
    window.__extraSqlQuestionsApplied = true;
    for (const q of extraQuestions) {
      BANK.push({n:q.n,id:'Q'+q.n,title:q.title,difficulty:q.difficulty});
      practicalIds.add(q.n);
    }
    const originalMeta = meta;
    const originalSolution = solution;
    const extraById = new Map(extraQuestions.map(q => [q.n,q]));
    meta = function(q) {
      const extra = extraById.get(q.n);
      if (extra) return [extra.schema,extra.hint];
      return originalMeta(q);
    };
    solution = function(q) {
      const extra = extraById.get(q.n);
      if (extra) return extra.sql;
      return originalSolution(q);
    };
    const practical = BANK.filter(q => practicalIds.has(q.n)).sort((a,b) => a.n-b.n);
    practical.forEach((q,index) => { q.id = 'Q' + (index + 1); });
    if (typeof render === 'function') render();
    return true;
  }
  function waitForQuestionBank() {
    if (applyExtraQuestions()) return;
    const timer = setInterval(() => { if (applyExtraQuestions()) clearInterval(timer); }, 50);
    setTimeout(() => clearInterval(timer), 10000);
  }
  document.addEventListener('DOMContentLoaded', () => {
    expandMainLayout();
    watchPage();
    waitForQuestionBank();
  });
})();
