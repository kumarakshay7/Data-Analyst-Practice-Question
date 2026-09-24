(() => {
  const extraTheory = [
    [173, 'What is SQL and why is it used in data analysis?', 'Easy', '<p><b>SQL</b> is a language used to query and work with relational data.</p><p>Data analysts use SQL to filter, join, aggregate and transform data, and to calculate business metrics directly from databases.</p>'],
    [174, 'What is a database, table, row and column?', 'Easy', '<p>A <b>database</b> is a collection of related data. A <b>table</b> stores data in rows and columns. A <b>row</b> represents one record, while a <b>column</b> represents an attribute.</p><p>For example, an employees table can have one row per employee and columns such as employee_id, name and salary.</p>'],
    [175, 'What is a primary key?', 'Easy', '<p>A <b>primary key</b> uniquely identifies each row in a table. It cannot contain NULL values and a table has one primary-key definition, which can contain one or multiple columns.</p><pre>employee_id INT PRIMARY KEY</pre>'],
    [176, 'What is a foreign key?', 'Easy', '<p>A <b>foreign key</b> links a column in one table to a key in another table. It helps maintain referential integrity.</p><p>For example, employees.department_id can reference departments.department_id.</p>'],
    [177, 'What is the difference between PRIMARY KEY and UNIQUE KEY?', 'Easy', '<p>Both enforce uniqueness, but a <b>PRIMARY KEY</b> identifies the main row identity and cannot be NULL. A <b>UNIQUE</b> constraint also prevents duplicate values, while NULL handling depends on the database.</p>'],
    [178, 'What is NULL in SQL?', 'Easy', '<p><b>NULL</b> means a value is missing, unknown or not applicable. It is not the same as zero or an empty string.</p><p>Use <code>IS NULL</code> or <code>IS NOT NULL</code>, not <code>= NULL</code>.</p>'],
    [179, 'What is DISTINCT?', 'Easy', '<p><code>DISTINCT</code> removes duplicate combinations from the selected columns.</p><pre>SELECT DISTINCT department_id FROM employees;</pre><p>Use it when the business question asks for unique values.</p>'],
    [180, 'What is an alias in SQL?', 'Easy', '<p>An <b>alias</b> gives a temporary name to a table or column. It improves readability and is especially useful with joins.</p><pre>SELECT e.employee_name FROM employees AS e;</pre>'],
    [181, 'What is the difference between WHERE and ORDER BY?', 'Easy', '<p><b>WHERE</b> filters rows. <b>ORDER BY</b> sorts the result after the rows have been selected.</p><pre>SELECT * FROM employees WHERE salary &gt; 50000 ORDER BY salary DESC;</pre>'],
    [182, 'What is LIMIT or TOP used for?', 'Easy', '<p>These clauses restrict the number of rows returned. The exact syntax depends on the database.</p><p>For example, MySQL and PostgreSQL commonly use <code>LIMIT 10</code>, while SQL Server uses <code>TOP 10</code>.</p>'],
    [183, 'What is the CASE statement?', 'Easy', '<p><code>CASE</code> adds conditional logic to SQL.</p><pre>CASE WHEN salary &gt;= 100000 THEN 'High' ELSE 'Standard' END</pre><p>It is commonly used to create business categories and conditional calculations.</p>'],
    [184, 'What is COALESCE?', 'Easy', '<p><code>COALESCE</code> returns the first non-NULL expression.</p><pre>COALESCE(department_name, 'Unknown')</pre><p>It is useful when a report needs a readable fallback for missing values.</p>'],
    [185, 'What is the difference between DELETE, TRUNCATE and DROP?', 'Easy', '<p><b>DELETE</b> removes selected rows and can use a WHERE clause. <b>TRUNCATE</b> removes all rows from a table using database-specific transactional rules. <b>DROP</b> removes the table object itself.</p><p>Exact logging and rollback behavior depends on the database.</p>'],
    [186, 'What is UNION vs UNION ALL?', 'Easy', '<p><b>UNION</b> combines compatible result sets and removes duplicate rows. <b>UNION ALL</b> keeps duplicates and generally avoids the duplicate-removal work.</p>'],
    [187, 'What is an INNER JOIN?', 'Easy', '<p>An <b>INNER JOIN</b> returns rows where the join condition matches in both tables.</p><pre>SELECT e.employee_name, d.department_name
FROM employees e
JOIN departments d ON e.department_id = d.department_id;</pre>'],
    [188, 'What is a LEFT JOIN?', 'Easy', '<p>A <b>LEFT JOIN</b> keeps every row from the left table and adds matching rows from the right. Missing right-side values become NULL.</p>'],
    [189, 'What is a CROSS JOIN?', 'Easy', '<p>A <b>CROSS JOIN</b> returns the Cartesian product. Every row from the first table is combined with every row from the second.</p><p>If table A has 3 rows and table B has 4 rows, the result can contain 12 rows.</p>'],
    [190, 'What is GROUP BY?', 'Easy', '<p><code>GROUP BY</code> creates groups so aggregate functions such as <code>SUM</code>, <code>COUNT</code> and <code>AVG</code> can be calculated per group.</p><pre>SELECT department_id, AVG(salary)
FROM employees
GROUP BY department_id;</pre>'],
    [191, 'What is an aggregate function?', 'Easy', '<p>Aggregate functions calculate one result from multiple rows. Common examples are <code>COUNT</code>, <code>SUM</code>, <code>AVG</code>, <code>MIN</code> and <code>MAX</code>.</p>'],
    [192, 'What is the difference between COUNT(*) and COUNT(column)?', 'Easy', '<p><code>COUNT(*)</code> counts rows. <code>COUNT(column)</code> counts only non-NULL values in that column.</p><p>Use <code>COUNT(DISTINCT column)</code> when the requirement is to count unique non-NULL values.</p>'],
    [193, 'What is a subquery?', 'Easy', '<p>A <b>subquery</b> is a query nested inside another SQL statement. It can return a single value, a list of values or a table-like result depending on how it is used.</p>'],
    [194, 'What is the difference between IN and EXISTS?', 'Medium', '<p><code>IN</code> compares a value with a set of values returned by an expression or subquery. <code>EXISTS</code> checks whether the subquery returns at least one row.</p><p>For correlated checks on large datasets, <code>EXISTS</code> can be a natural way to express the business condition. The optimizer may transform either form, so measure performance rather than assuming one is always faster.</p>'],
    [195, 'What is a correlated subquery?', 'Medium', '<p>A <b>correlated subquery</b> refers to a column from the outer query, so its logic is evaluated in relation to the current outer row.</p><p>It is useful for row-by-row conditions, but a JOIN or window function can sometimes express the same requirement more clearly.</p>'],
    [196, 'What is conditional aggregation?', 'Medium', '<p>Conditional aggregation combines an aggregate function with a condition, commonly using <code>CASE</code>.</p><pre>SUM(CASE WHEN status = 'Completed' THEN amount ELSE 0 END)</pre><p>This is useful for calculating multiple business KPIs in one grouped query.</p>'],
    [197, 'What is a self join?', 'Medium', '<p>A <b>self join</b> joins a table to itself using different aliases.</p><p>A common example is an employee-manager relationship where employee.manager_id points back to employee.employee_id.</p>'],
    [198, 'What is a window function?', 'Medium', '<p>A <b>window function</b> calculates across related rows without collapsing the result to one row per group.</p><p>Examples include <code>ROW_NUMBER</code>, <code>RANK</code>, <code>SUM() OVER</code>, <code>LAG</code> and <code>LEAD</code>.</p>'],
    [199, 'What is PARTITION BY in a window function?', 'Medium', '<p><code>PARTITION BY</code> divides rows into independent groups for a window calculation.</p><pre>ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC)</pre><p>This produces a separate ranking sequence for each department.</p>'],
    [200, 'What is a running total?', 'Medium', '<p>A <b>running total</b> is a cumulative sum ordered by a business sequence such as date.</p><pre>SUM(sales) OVER (ORDER BY month)</pre><p>For separate customers or departments, add the appropriate <code>PARTITION BY</code>.</p>'],
    [201, 'What is a moving average?', 'Medium', '<p>A <b>moving average</b> calculates an average over a rolling window of rows.</p><pre>AVG(sales) OVER (ORDER BY month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)</pre><p>The exact window should match the business requirement.</p>'],
    [202, 'What are LAG and LEAD?', 'Medium', '<p><code>LAG</code> accesses a previous row and <code>LEAD</code> accesses a following row within a window.</p><p>They are useful for month-over-month comparisons, previous salary, next purchase and change calculations.</p>'],
    [203, 'What is a window frame?', 'Medium', '<p>A <b>window frame</b> defines which rows around the current row are included in a window calculation.</p><p>For example, <code>ROWS BETWEEN 6 PRECEDING AND CURRENT ROW</code> can represent a seven-row rolling calculation.</p>'],
    [204, 'How do you find duplicate records in SQL?', 'Medium', '<p>Group by the columns that define a duplicate business key and use <code>HAVING COUNT(*) &gt; 1</code>.</p><pre>SELECT email, COUNT(*)
FROM customers
GROUP BY email
HAVING COUNT(*) &gt; 1;</pre><p>Always define what "duplicate" means for the business before deleting anything.</p>'],
    [205, 'How can you remove duplicate rows while keeping one record?', 'Medium', '<p>A common approach is <code>ROW_NUMBER()</code> over the business key and a deterministic ordering, then keep the row with number 1.</p><pre>ROW_NUMBER() OVER (PARTITION BY email ORDER BY customer_id)</pre><p>The ordering rule should reflect which record should be retained.</p>'],
    [206, 'How do you find the second-highest salary?', 'Medium', '<p>Use <code>DENSE_RANK()</code> ordered by salary descending and filter for rank 2 when ties should share the same rank.</p><pre>DENSE_RANK() OVER (ORDER BY salary DESC)</pre>'],
    [207, 'How do you find the top three employees in each department?', 'Medium', '<p>Partition the ranking by department and order salary descending.</p><pre>ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC)</pre><p>Use <code>DENSE_RANK</code> instead when tied salaries should share a position.</p>'],
    [208, 'What is a CTE and when is it useful?', 'Medium', '<p>A <b>CTE</b> is a named query defined with <code>WITH</code>. It is useful for breaking complex logic into readable steps and for reusing a logical result within a statement.</p>'],
    [209, 'What is a recursive CTE?', 'Hard', '<p>A <b>recursive CTE</b> repeatedly references its own result until a termination condition is reached.</p><p>It is useful for hierarchical data such as employee-manager trees, category trees and graph-like relationships.</p>'],
    [210, 'What is an anti-join?', 'Hard', '<p>An <b>anti-join</b> returns rows from one dataset that have no matching row in another.</p><p>It can be expressed with <code>NOT EXISTS</code> or a <code>LEFT JOIN</code> followed by a NULL check. <code>NOT EXISTS</code> often makes the business intent clear.</p>'],
    [211, 'How do you calculate a percentage of total?', 'Hard', '<p>Calculate the group value and divide it by the overall total, using <code>NULLIF</code> where appropriate to avoid division by zero.</p><pre>SUM(amount) * 100.0 / NULLIF(SUM(SUM(amount)) OVER (), 0)</pre><p>The exact expression depends on the desired grouping and database.</p>'],
    [212, 'How do you calculate month-over-month growth?', 'Hard', '<p>First calculate the monthly metric, then use <code>LAG</code> to obtain the previous month and calculate the percentage change.</p><pre>(current_value - previous_value) * 100.0 / NULLIF(previous_value,0)</pre>'],
    [213, 'How do you calculate customer retention?', 'Hard', '<p>Define retention first, for example customers active in both a cohort period and a later period. Build the cohort and retained-customer sets, then divide retained customers by the original cohort size.</p><p>The date definition and activity event must be explicit.</p>'],
    [214, 'What is a gaps-and-islands problem?', 'Hard', '<p>A <b>gaps-and-islands</b> problem identifies consecutive sequences and the breaks between them.</p><p>Typical solutions use date differences, <code>ROW_NUMBER</code>, cumulative grouping or other window techniques to assign an island identifier.</p>'],
    [215, 'How do you find consecutive login days?', 'Hard', '<p>Start with distinct login dates per user, order them, and create a sequence number. Compare the date with the sequence to form groups representing consecutive-day streaks.</p><p>Then aggregate each group to find streak length.</p>'],
    [216, 'What is a transaction and what is ACID?', 'Hard', '<p>A database transaction is a unit of work that should follow the database's transaction rules.</p><p><b>ACID</b> stands for Atomicity, Consistency, Isolation and Durability. Together these properties describe important guarantees for reliable transactional processing.</p>'],
    [217, 'What are transaction isolation levels?', 'Hard', '<p>Isolation levels control how one transaction can observe changes made by other concurrent transactions.</p><p>Common levels include Read Uncommitted, Read Committed, Repeatable Read and Serializable. Exact behavior varies by database.</p>'],
    [218, 'What is an index and what is the trade-off?', 'Hard', '<p>An <b>index</b> helps the database locate rows efficiently for suitable filters, joins and ordering.</p><p>The trade-offs include storage and additional work when rows are inserted, updated or deleted. Index usefulness should be validated with the execution plan and workload.</p>'],
    [219, 'What is a query execution plan?', 'Hard', '<p>An <b>execution plan</b> shows how the database intends to execute a query, including scans, joins, sorts and aggregations.</p><p>Use it to locate expensive operations and compare estimated versus actual row counts where available.</p>'],
    [220, 'How do you investigate unexpected row multiplication after a JOIN?', 'Hard', '<p>First identify the intended grain of the result. Then check whether the join key is unique on each side, compare row counts before and after the join, and inspect one-to-many or many-to-many relationships.</p><p>Unexpected multiplication is often a data-model or join-grain issue rather than a SQL syntax problem.</p>'],
    [221, 'How would you optimize a SQL query on a very large table?', 'Hard', '<p>Start with the execution plan and the business grain. Reduce unnecessary rows and columns, verify joins, consider suitable indexes or partitioning, and avoid accidental many-to-many joins.</p><p>Measure the query before and after each change rather than assuming an optimization helped.</p>']
  ];

  const extraMap = new Map(extraTheory.map(x => [x[0], x[3]]));
  const extraTitles = new Map(extraTheory.map(x => [x[0], x[1]]));

  function addQuestions() {
    if (window.__theoryQuestionsPatchApplied || typeof BANK === 'undefined' || !Array.isArray(BANK) || !BANK.length) return false;
    window.__theoryQuestionsPatchApplied = true;
    for (const [n, title, difficulty] of extraTheory) {
      if (!BANK.some(q => q.n === n)) BANK.push({ n, id: 'Q' + n, title, difficulty });
    }
    return true;
  }

  function theoryQuestions() {
    if (typeof BANK === 'undefined' || typeof practicalIds === 'undefined') return [];
    return BANK.filter(q => !practicalIds.has(q.n)).sort((a, b) => a.n - b.n);
  }

  function renumberTheoryUI() {
    if (typeof mode === 'undefined' || mode !== 'theory') return;
    const list = theoryQuestions();
    if (!list.length) return;
    const display = new Map(list.map((q, i) => [q.n, i + 1]));
    window.__theoryDisplayMap = display;

    document.querySelectorAll('#nav .qbtn').forEach(btn => {
      const match = btn.textContent.match(/^Q(\d+)\s*[·.-]\s*(.*)$/s);
      if (!match) return;
      const original = list.find(q => q.id === 'Q' + match[1]);
      if (!original) return;
      btn.textContent = `Q${display.get(original.n)} · ${original.title}`;
    });

    const title = document.getElementById('title');
    if (title && typeof current !== 'undefined' && current) {
      const number = display.get(current.n);
      if (number) title.textContent = `Q${number} · ${current.title}`;
    }

    const stats = document.getElementById('stats');
    if (stats) stats.textContent = `Theory: ${list.length} questions`;

    const answer = document.querySelector('#page .answer');
    if (answer && typeof current !== 'undefined' && current && extraMap.has(current.n)) {
      answer.innerHTML = extraMap.get(current.n);
      answer.dataset.detailed = '1';
    }
  }

  function refresh() {
    if (!addQuestions()) return;
    if (typeof render === 'function') render();
    setTimeout(renumberTheoryUI, 0);
  }

  document.addEventListener('click', event => {
    if (event.target.closest && event.target.closest('#theoryTab, #practiceTab, .qbtn')) {
      setTimeout(() => {
        addQuestions();
        renumberTheoryUI();
      }, 0);
      setTimeout(renumberTheoryUI, 40);
    }
  });

  document.getElementById('search')?.addEventListener('input', () => setTimeout(renumberTheoryUI, 0));
  document.getElementById('difficulty')?.addEventListener('change', () => setTimeout(renumberTheoryUI, 0));

  const timer = setInterval(() => {
    if (addQuestions()) {
      clearInterval(timer);
      setTimeout(renumberTheoryUI, 50);
    }
  }, 50);
  setTimeout(() => clearInterval(timer), 10000);
})();
