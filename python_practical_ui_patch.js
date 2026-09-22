(() => {
  const SAMPLES = {
    'PY-P001': ['Sample list', '["Akshay", "Rahul", "Priya"]', 'Expected output', 'Akshay, Rahul, Priya'],
    'PY-P002': ['Sample list', '[10, 20, 30, 40]', 'Expected output', '100'],
    'PY-P003': ['Sample list', '[10, 45, 22, 90, 31]', 'Expected output', '90'],
    'PY-P004': ['Sample list', '[1, 2, 4, 7, 8, 10]', 'Expected output', '4 even numbers'],
    'PY-P005': ['Sample list', '[1, 2, 2, 3, 1, 4]', 'Expected output', '[1, 2, 3, 4]'],
    'PY-P006': ['Sample dictionary', '{"Amit": 45000, "Priya": 65000, "Rahul": 75000}', 'Expected output', 'Priya 65000; Rahul 75000'],
    'PY-P007': ['Sample range', 'numbers from 1 to 10', 'Expected output', '[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]'],
    'PY-P008': ['Sample list', '[10, 20, 30]', 'Expected output', '20.0'],
    'PY-P009': ['Sample calculation', '10 / 0', 'Expected output', 'Cannot divide by zero'],
    'PY-P010': ['Sample employee data', 'name=[A,B,C], salary=[50000,60000,70000]', 'Expected output', 'DataFrame with 3 employees and 2 columns'],
    'PY-P011': ['Sample DataFrame', 'name=[A,B], salary=[50000,70000]', 'Expected output', 'salary column containing 50000 and 70000'],
    'PY-P012': ['Sample DataFrame', 'name=[A,B,C], salary=[50000,70000,90000]', 'Expected output', 'employees B and C'],
    'PY-P013': ['Sample DataFrame', 'name=[A,B,C], salary=[50000,90000,70000]', 'Expected output', 'rows sorted by salary 90000, 70000, 50000'],
    'PY-P014': ['Sample salaries', '[50000, 60000, 70000]', 'Expected output', '60000.0'],
    'PY-P015': ['Sample data', 'department=[IT,IT,HR], sales=[100,200,150]', 'Expected output', 'HR=150, IT=300'],
    'PY-P016': ['Sample data', 'department=[IT,IT,HR], salary=[50000,70000,60000]', 'Expected output', 'HR=60000, IT=60000'],
    'PY-P017': ['Sample departments', '[IT, IT, HR, Sales]', 'Expected output', 'IT=2, HR=1, Sales=1'],
    'PY-P018': ['Sample salaries', '[50000, None, 70000, 60000]', 'Expected output', 'missing value replaced with median 60000'],
    'PY-P019': ['Sample data', 'name=[A,B,C], department=[IT,None,HR]', 'Expected output', 'rows A/IT and C/HR'],
    'PY-P020': ['Sample data', 'employee_id=[1,2,2,3], name=[A,B,B,C]', 'Expected output', 'duplicate employee B row removed'],
    'PY-P021': ['Sample DataFrame', 'salary=[50000,60000]', 'Expected output', 'column renamed to annual_salary'],
    'PY-P022': ['Sample dates', '[2026-01-01, 2026-02-15]', 'Expected output', 'date column converted to datetime'],
    'PY-P023': ['Sample dates', '[2026-01-01, 2025-06-10]', 'Expected output', 'years 2026 and 2025'],
    'PY-P024': ['Sample data', 'price=[10,20,15], quantity=[2,3,4]', 'Expected output', 'revenue=[20,60,60]'],
    'PY-P025': ['Sample products', 'A=100, B=500, C=250, D=700 revenue', 'Expected output', 'D=700, B=500, C=250'],
    'PY-P026': ['Sample customers', '(1,A),(2,B); orders=(1,100),(1,200),(2,150)', 'Expected output', '3 matched order rows'],
    'PY-P027': ['Sample data', 'customers=[1,2,3]; orders=[(1,100),(1,200),(2,150)]', 'Expected output', 'all 3 customers retained; customer 3 has no order'],
    'PY-P028': ['Sample data', 'customers=(1,A),(2,B); orders=(1,100),(1,200),(2,150)', 'Expected output', 'A=300, B=150'],
    'PY-P029': ['Sample data', 'customers=[1,2,3]; orders=[1,2]', 'Expected output', 'customer 3 has no orders'],
    'PY-P030': ['Sample data', 'dates=2026-01-05,2026-01-20,2026-02-02; sales=100,200,150', 'Expected output', '2026-01=300, 2026-02=150'],
    'PY-P031': ['Sample monthly sales', '2026-01=100, 2026-02=120, 2026-03=150', 'Expected output', 'changes are NaN, 20, 30'],
    'PY-P032': ['Sample sales', '[100, 150, 200]', 'Expected output', 'running total [100, 250, 450]'],
    'PY-P033': ['Sample sales', '[100, 120, 150]', 'Expected output', 'percentage changes are NaN, 20%, 25%'],
    'PY-P034': ['Sample data', 'IT salaries=50000,70000; HR salary=65000', 'Expected output', 'IT=70000, HR=65000'],
    'PY-P035': ['Sample employees', 'IT A=50000,B=70000; HR C=65000,D=55000', 'Expected output', 'B rank 1/A rank 2; C rank 1/D rank 2'],
    'PY-P036': ['Sample salaries', '[40000,45000,50000,52000,55000,200000]', 'Expected output', '200000 detected as an outlier'],
    'PY-P037': ['Sample departments', '[" IT ", "it", "HR", " hr "]', 'Expected output', '[IT, IT, HR, HR]'],
    'PY-P038': ['Sample data', 'North-A=100, North-B=200, South-A=150', 'Expected output', 'pivot with regions as rows and products as columns'],
    'PY-P039': ['Sample customer IDs', '[1, 2, 2, 3, 3, 3]', 'Expected output', 'duplicate rows for IDs 2 and 3'],
    'PY-P040': ['Sample orders', 'order_id=[1,2,3], amount=[100,200,300]', 'Expected output', 'total_sales=600, average_order_value=200, order_count=3'],
    'PY-P041': ['Sample sentence', '"data analysis data python"', 'Expected output', 'data=2, analysis=1, python=1'],
    'PY-P042': ['Sample list', '[10, 40, 20, 40, 30]', 'Expected output', '30'],
    'PY-P043': ['Sample nested list', '[[1,2],[3,4],[5]]', 'Expected output', '[1, 2, 3, 4, 5]'],
    'PY-P044': ['Sample string', '"Data Analyst"', 'Expected output', '4 vowels'],
    'PY-P045': ['Sample salaries', 'IT=[50000,80000], HR=[60000,40000]', 'Expected output', 'employees B and C are above their department average'],
    'PY-P046': ['Sample salaries', 'IT=[50000,80000,70000], HR=[60000,55000]', 'Expected output', 'IT second-highest=70000; HR second-highest=55000'],
    'PY-P047': ['Sample sales', '[100,120,150,180,200]', 'Expected output', '3-period rolling averages: 123.33, 150, 176.67'],
    'PY-P048': ['Sample daily sales', '[10,12,11,14,15,13,16,18,17,20]', 'Expected output', '7-day rolling average starts at 13.0 on day 7'],
    'PY-P049': ['Sample purchases', 'customer 1: 2026-02-01, 2026-01-10; customer 2: 2026-03-02, 2026-02-20', 'Expected output', 'customer 1=2026-01-10; customer 2=2026-02-20'],
    'PY-P050': ['Sample revenue', 'A=100, B=300, C=600', 'Expected output', 'A=10%, B=30%, C=60%'],
    'PY-P051': ['Sample revenue', 'North A=100,B=250; South A=300,B=200', 'Expected output', 'North-B=250; South-A=300'],
    'PY-P052': ['Sample sales', 'North Jan=100,Feb=130; South Jan=200,Feb=180', 'Expected output', 'North change=+30%; South change=-10%'],
    'PY-P053': ['Sample orders', 'customer 1=100+200, customer 2=500, customer 3=50+100', 'Expected output', 'customer 1 and customer 2 are above average customer value'],
    'PY-P054': ['Sample daily sales', '[100,110,105,60,100]', 'Expected output', 'the 60-sales day is detected as a sudden drop'],
    'PY-P055': ['Sample DataFrame columns', '[id, sales]; required=[id, sales, date]', 'Expected output', 'missing column [date]'],
    'PY-P056': ['Sample data', 'IT sales=[100,300]; HR sales=[200]', 'Expected output', 'IT range=200; HR range=0'],
    'PY-P057': ['Sample data', 'old_value=[10,20,30]; new_value=[10,25,30]', 'Expected output', 'row where old_value=20 and new_value=25'],
    'PY-P058': ['Sample data', 'id=[1,2,2,3]; name=[A,None,B,C]', 'Expected output', 'rows=4, duplicate_rows=0, null_cells=1'],
    'PY-P059': ['Sample sales.csv', 'sales=[100,200,150,300,250]', 'Expected output', 'total sales=1000. Put these rows in sales.csv before running.'],
    'PY-P060': ['Sample data', 'customer_id=[1,2,1,3], revenue=[100,200,150,50], visits=[10,20,15,5], orders=[1,1,1,0]', 'Expected output', 'total_revenue=500, unique_customers=3, average_order_value=166.67, conversion_rate=7.5%']
  };

  function escapeHtml(s) {
    return String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function patchCurrentQuestion() {
    const title = document.getElementById('title');
    const page = document.getElementById('page');
    if (!title || !page) return;

    const match = title.textContent.match(/^(PY-P\d{3})/);
    if (!match) return;
    const id = match[1];
    const sample = SAMPLES[id];
    if (!sample) return;

    const card = page.querySelector('.card');
    const question = card && card.querySelector('.question');
    const meta = card && card.querySelector('.meta');
    if (!question || !meta || card.dataset.samplePatched === id) return;

    const q = window.PYTHON_PRACTICAL && window.PYTHON_PRACTICAL.list
      ? window.PYTHON_PRACTICAL.list.find(x => x[0] === id)
      : null;

    if (q) question.innerHTML = '🐍 ' + escapeHtml(q[1]);

    meta.innerHTML = '<strong>' + escapeHtml(sample[0]) + ':</strong> ' + escapeHtml(sample[1]) + '<br><strong>' + escapeHtml(sample[2]) + ':</strong> ' + escapeHtml(sample[3]) + '<br><span>Use this sample data first. You can also test your solution with other valid values.</span>';
    card.dataset.samplePatched = id;
  }

  const observer = new MutationObserver(patchCurrentQuestion);
  observer.observe(document.body, { childList: true, subtree: true });
  document.addEventListener('DOMContentLoaded', patchCurrentQuestion);
  patchCurrentQuestion();
})();
