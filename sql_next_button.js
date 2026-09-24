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
    style.textContent = `.main { max-width: none !important; width: 100% !important; margin: 0 !important; }`;
    document.head.appendChild(style);
  }

  const extraQuestions = [
    {n:1001,title:'List all customers with their names and email addresses.',difficulty:'Easy',schema:'customers(customer_id, customer_name, email, date_of_birth, signup_date)',hint:'Select the customer_name and email columns from customers.',sql:'SELECT customer_name,email FROM customers;'},
    {n:1002,title:'Find products with a price greater than 10000.',difficulty:'Easy',schema:'products(product_id, product_name, category, price)',hint:'Filter the price column with a WHERE condition.',sql:'SELECT * FROM products WHERE price>10000;'},
    {n:1003,title:'Find customers whose names start with A.',difficulty:'Easy',schema:'customers(customer_id, customer_name, email)',hint:"Use LIKE 'A%'.",sql:"SELECT * FROM customers WHERE customer_name LIKE 'A%';"},
    {n:1004,title:'Find all Electronics orders.',difficulty:'Easy',schema:'orders(order_id, customer_id, product_id, order_date, amount, category)',hint:"Filter category = 'Electronics'.",sql:"SELECT * FROM orders WHERE category='Electronics';"},
    {n:1005,title:'Count the total number of orders.',difficulty:'Easy',schema:'orders(order_id, customer_id, product_id, order_date, amount)',hint:'Use COUNT(*) on the orders table.',sql:'SELECT COUNT(*) AS order_count FROM orders;'},
    {n:1006,title:'Calculate the total revenue from all orders.',difficulty:'Easy',schema:'orders(order_id, customer_id, product_id, order_date, amount)',hint:'Use SUM(amount).',sql:'SELECT SUM(amount) AS total_revenue FROM orders;'},
    {n:1007,title:'Calculate the average order value.',difficulty:'Easy',schema:'orders(order_id, customer_id, product_id, order_date, amount)',hint:'Use AVG(amount).',sql:'SELECT AVG(amount) AS average_order_value FROM orders;'},
    {n:1008,title:'Find the most expensive product.',difficulty:'Easy',schema:'products(product_id, product_name, category, price)',hint:'Sort price from highest to lowest and keep one row.',sql:'SELECT * FROM products ORDER BY price DESC LIMIT 1;'},
    {n:1009,title:'Count the number of orders in each category.',difficulty:'Easy',schema:'orders(order_id, customer_id, product_id, order_date, amount, category)',hint:'GROUP BY category and COUNT(*).',sql:'SELECT category,COUNT(*) AS order_count FROM orders GROUP BY category;'},
    {n:1010,title:'Find total revenue by category.',difficulty:'Easy',schema:'orders(order_id, customer_id, product_id, order_date, amount, category)',hint:'GROUP BY category and SUM(amount).',sql:'SELECT category,SUM(amount) AS total_revenue FROM orders GROUP BY category;'},
    {n:1011,title:'Find customers whose total spend is greater than 50000.',difficulty:'Medium',schema:'orders(order_id, customer_id, amount)',hint:'Group by customer_id and use HAVING on SUM(amount).',sql:'SELECT customer_id,SUM(amount) AS total_spend FROM orders GROUP BY customer_id HAVING SUM(amount)>50000;'},
    {n:1012,title:'Show each employee with the department name.',difficulty:'Medium',schema:'employees(employee_id, employee_name, department_id)\ndepartments(department_id, department_name)',hint:'Join employees.department_id to departments.department_id.',sql:'SELECT e.employee_id,e.employee_name,d.department_name FROM employees e LEFT JOIN departments d ON e.department_id=d.department_id;'},
    {n:1013,title:'Find employees whose salary is above the company average.',difficulty:'Medium',schema:'employees(employee_id, employee_name, salary)',hint:'Compare each salary with SELECT AVG(salary) FROM employees.',sql:'SELECT * FROM employees WHERE salary>(SELECT AVG(salary) FROM employees);'},
    {n:1014,title:'Find the second-highest distinct employee salary.',difficulty:'Medium',schema:'employees(employee_id, employee_name, salary)',hint:'Use DENSE_RANK or a correlated subquery so duplicate salaries do not create a false second rank.',sql:'SELECT DISTINCT salary FROM employees e WHERE 1=(SELECT COUNT(DISTINCT e2.salary) FROM employees e2 WHERE e2.salary>e.salary);'},
    {n:1015,title:'Find the top two highest-paid employees in each department.',difficulty:'Medium',schema:'employees(employee_id, employee_name, salary, department_id)',hint:'Use ROW_NUMBER or DENSE_RANK partitioned by department_id and ordered by salary DESC.',sql:'WITH r AS (SELECT e.*,ROW_NUMBER() OVER(PARTITION BY department_id ORDER BY salary DESC) rn FROM employees e) SELECT * FROM r WHERE rn<=2;'},
    {n:1016,title:'Calculate a running total of monthly sales.',difficulty:'Medium',schema:'monthly_sales(month, sales)',hint:'Use SUM(sales) OVER(ORDER BY month).',sql:'SELECT month,sales,SUM(sales) OVER(ORDER BY month) AS running_sales FROM monthly_sales;'},
    {n:1017,title:'Calculate month-over-month sales change.',difficulty:'Medium',schema:'monthly_sales(month, sales)',hint:'Use LAG(sales) and subtract the previous month from the current month.',sql:'SELECT month,sales,sales-LAG(sales) OVER(ORDER BY month) AS mom_change FROM monthly_sales;'},
    {n:1018,title:'Find the latest order for every customer.',difficulty:'Medium',schema:'orders(order_id, customer_id, order_date, amount)',hint:'Use ROW_NUMBER partitioned by customer_id and order by order_date DESC.',sql:'WITH r AS (SELECT o.*,ROW_NUMBER() OVER(PARTITION BY customer_id ORDER BY order_date DESC) rn FROM orders o) SELECT * FROM r WHERE rn=1;'},
    {n:1019,title:'Find customers who have never placed an order.',difficulty:'Medium',schema:'customers(customer_id, customer_name)\norders(order_id, customer_id)',hint:'LEFT JOIN customers to orders and keep rows where the order key is NULL.',sql:'SELECT c.* FROM customers c LEFT JOIN orders o ON c.customer_id=o.customer_id WHERE o.order_id IS NULL;'},
    {n:1020,title:'Find products that have never been ordered.',difficulty:'Medium',schema:'products(product_id, product_name)\norders(order_id, product_id)',hint:'LEFT JOIN products to orders and filter missing order rows.',sql:'SELECT p.* FROM products p LEFT JOIN orders o ON p.product_id=o.product_id WHERE o.order_id IS NULL;'},
    {n:1021,title:'Find duplicate customer email addresses.',difficulty:'Medium',schema:'customers(customer_id, customer_name, email)',hint:'GROUP BY email and use HAVING COUNT(*) > 1.',sql:'SELECT email,COUNT(*) AS duplicate_count FROM customers GROUP BY email HAVING COUNT(*)>1;'},
    {n:1022,title:'Find the top customer by revenue in each product category.',difficulty:'Hard',schema:'orders(order_id, customer_id, product_id, amount)\nproducts(product_id, product_name, category)',hint:'Aggregate customer revenue by category, rank within each category, then keep rank 1.',sql:'WITH x AS (SELECT p.category,o.customer_id,SUM(o.amount) revenue FROM orders o JOIN products p ON o.product_id=p.product_id GROUP BY p.category,o.customer_id),r AS (SELECT *,ROW_NUMBER() OVER(PARTITION BY category ORDER BY revenue DESC) rn FROM x) SELECT * FROM r WHERE rn=1;'},
    {n:1023,title:'Find customers who purchased every Electronics product.',difficulty:'Hard',schema:'orders(order_id, customer_id, product_id)\nproducts(product_id, category)',hint:'For each customer, count distinct purchased Electronics products and compare it with the total number of Electronics products.',sql:"SELECT o.customer_id FROM orders o JOIN products p ON o.product_id=p.product_id WHERE p.category='Electronics' GROUP BY o.customer_id HAVING COUNT(DISTINCT o.product_id)=(SELECT COUNT(*) FROM products WHERE category='Electronics');"},
    {n:1024,title:'Find the longest gap between consecutive orders for each customer.',difficulty:'Hard',schema:'orders(order_id, customer_id, order_date)',hint:'Use LAG(order_date), calculate the date difference, then take MAX per customer.',sql:'WITH x AS (SELECT customer_id,order_date,LAG(order_date) OVER(PARTITION BY customer_id ORDER BY order_date) prev_date FROM orders),g AS (SELECT customer_id,order_date,prev_date,julianday(order_date)-julianday(prev_date) gap_days FROM x WHERE prev_date IS NOT NULL) SELECT customer_id,MAX(gap_days) AS longest_gap_days FROM g GROUP BY customer_id;'},
    {n:1025,title:'Calculate revenue contribution from new vs returning customers by month.',difficulty:'Hard',schema:'customers(customer_id, signup_date)\norders(order_id, customer_id, order_date, amount)',hint:'Identify each customer\'s first order month, classify each order month as New or Returning, then aggregate revenue.',sql:"WITH first_order AS (SELECT customer_id,MIN(order_date) first_order_date FROM orders GROUP BY customer_id),classified AS (SELECT o.order_id,o.customer_id,o.order_date,o.amount,CASE WHEN strftime('%Y-%m',o.order_date)=strftime('%Y-%m',f.first_order_date) THEN 'New' ELSE 'Returning' END customer_type FROM orders o JOIN first_order f ON o.customer_id=f.customer_id) SELECT strftime('%Y-%m',order_date) month,customer_type,SUM(amount) revenue FROM classified GROUP BY month,customer_type ORDER BY month,customer_type;"}
  ];

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
    practical.forEach((q,index) => {
      q.id = 'Q' + String(index + 1).padStart(3,'0');
    });

    if (typeof render === 'function') render();
    return true;
  }

  function waitForQuestionBank() {
    if (applyExtraQuestions()) return;
    const timer = setInterval(() => {
      if (applyExtraQuestions()) clearInterval(timer);
    }, 50);
    setTimeout(() => clearInterval(timer), 10000);
  }

  document.addEventListener('DOMContentLoaded', () => {
    expandMainLayout();
    watchPage();
    waitForQuestionBank();
  });
})();
