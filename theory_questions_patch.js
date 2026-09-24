(() => {
  // Safe SQL theory extension.
  // This file only adds the extra theory questions and updates their display
  // numbers. It never observes DOM mutations and never calls render from a
  // click handler, which keeps Theory navigation lightweight.

  const titles = [
    'What is SQL and why is it used in data analysis?',
    'What is a database, table, row and column?',
    'What is a primary key?',
    'What is a foreign key?',
    'What is the difference between PRIMARY KEY and UNIQUE KEY?',
    'What is NULL in SQL?',
    'What is DISTINCT?',
    'What is an alias in SQL?',
    'What is the difference between WHERE and ORDER BY?',
    'What is LIMIT or TOP used for?',
    'What is the CASE statement?',
    'What is COALESCE?',
    'What is the difference between DELETE, TRUNCATE and DROP?',
    'What is UNION vs UNION ALL?',
    'What is an INNER JOIN?',
    'What is a LEFT JOIN?',
    'What is a CROSS JOIN?',
    'What is GROUP BY?',
    'What is an aggregate function?',
    'What is the difference between COUNT(*) and COUNT(column)?',
    'What is a subquery?',
    'What is the difference between IN and EXISTS?',
    'What is a correlated subquery?',
    'What is conditional aggregation?',
    'What is a self join?',
    'What is a window function?',
    'What is PARTITION BY in a window function?',
    'What is a running total?',
    'What is a moving average?',
    'What are LAG and LEAD?',
    'What is a window frame?',
    'How do you find duplicate records in SQL?',
    'How can you remove duplicate rows while keeping one record?',
    'How do you find the second-highest salary?',
    'How do you find the top three employees in each department?',
    'What is a CTE and when is it useful?',
    'What is a recursive CTE?',
    'What is an anti-join?',
    'How do you calculate a percentage of total?',
    'How do you calculate month-over-month growth?',
    'How do you calculate customer retention?',
    'What is a gaps-and-islands problem?',
    'How do you find consecutive login days?',
    'What is a transaction and what is ACID?',
    'What are transaction isolation levels?',
    'What is an index and what is the trade-off?',
    'What is a query execution plan?',
    'How do you investigate unexpected row multiplication after a JOIN?',
    'How would you optimize a SQL query on a very large table?'
  ];

  function addQuestions() {
    if (window.__safeTheoryQuestionsApplied) return true;
    if (typeof BANK === 'undefined' || !Array.isArray(BANK) || !BANK.length) return false;
    if (typeof practicalIds === 'undefined') return false;

    for (let i = 0; i < titles.length; i++) {
      const n = 173 + i;
      if (!BANK.some(q => q.n === n)) {
        BANK.push({
          n,
          id: 'Q' + n,
          title: titles[i],
          difficulty: n <= 193 ? 'Easy' : n <= 208 ? 'Medium' : 'Hard'
        });
      }
    }

    window.__safeTheoryQuestionsApplied = true;
    return true;
  }

  function theoryList() {
    if (typeof BANK === 'undefined' || typeof practicalIds === 'undefined') return [];
    return BANK.filter(q => !practicalIds.has(q.n)).sort((a, b) => a.n - b.n);
  }

  function renumberTheory() {
    if (typeof mode === 'undefined' || mode !== 'theory') return;

    const list = theoryList();
    if (!list.length) return;

    const display = new Map(list.map((q, index) => [q.n, index + 1]));

    document.querySelectorAll('#nav .qbtn').forEach(button => {
      const match = button.textContent.trim().match(/^Q\d+\s*[·.-]\s*(.*)$/s);
      if (!match) return;

      const title = match[1].trim();
      const question = list.find(q => q.title === title || title.includes(q.title));
      if (!question) return;

      button.textContent = `Q${display.get(question.n)} · ${question.title}`;
    });

    if (typeof current !== 'undefined' && current) {
      const number = display.get(current.n);
      const heading = document.querySelector('#page .question');
      if (number && heading) {
        heading.textContent = `Q${number} · 🧑‍💼 ${current.title}`;
      }
      const title = document.getElementById('title');
      if (number && title) title.textContent = `Q${number} · ${current.title}`;
    }

    const stats = document.getElementById('stats');
    if (stats) stats.textContent = `Theory: ${list.length} questions`;
  }

  function start() {
    let attempts = 0;
    const timer = setInterval(() => {
      attempts += 1;
      if (addQuestions()) {
        clearInterval(timer);
        if (typeof render === 'function') render();
        setTimeout(renumberTheory, 0);
      } else if (attempts >= 50) {
        clearInterval(timer);
      }
    }, 100);

    document.getElementById('theoryTab')?.addEventListener('click', () => {
      setTimeout(renumberTheory, 0);
    }, { passive: true });

    document.getElementById('practiceTab')?.addEventListener('click', () => {
      setTimeout(renumberTheory, 0);
    }, { passive: true });

    document.getElementById('search')?.addEventListener('input', () => {
      setTimeout(renumberTheory, 0);
    }, { passive: true });

    document.getElementById('difficulty')?.addEventListener('change', () => {
      setTimeout(renumberTheory, 0);
    }, { passive: true });

    document.getElementById('nav')?.addEventListener('click', () => {
      setTimeout(renumberTheory, 0);
    }, { passive: true });
  }

  document.addEventListener('DOMContentLoaded', start, { once: true });
})();
