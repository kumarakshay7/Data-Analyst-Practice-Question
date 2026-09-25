// Show concrete input data for every Python Practical question.
(() => {
  const PRACTICAL_SAMPLES = {
    1: {label:'Example input', code:'names = ["Akshay", "Rahul", "Priya"]', output:'Akshay, Rahul, Priya'},
    2: {label:'Example input', code:'numbers = [10, 20, 30, 40]', output:'100'},
    3: {label:'Example input', code:'numbers = [10, 45, 22, 90, 31]', output:'90'},
    4: {label:'Example input', code:'numbers = [1, 2, 4, 7, 8, 10]', output:'4 even numbers'},
    5: {label:'Example input', code:'values = [1, 2, 2, 3, 1, 4]', output:'[1, 2, 3, 4]'},
    6: {label:'Example input', code:'employees = {"Amit": 45000, "Priya": 65000, "Rahul": 75000}', output:'Priya 65000; Rahul 75000'},
    7: {label:'Example input', code:'numbers = range(1, 11)', output:'[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]'},
    8: {label:'Example input', code:'numbers = [10, 20, 30]', output:'20.0'},
    9: {label:'Example input', code:'10 / 0', output:'Cannot divide by zero'},
    10: {label:'Example input', code:'name = ["A", "B", "C"]\nsalary = [50000, 60000, 70000]', output:'DataFrame with 3 employees'},
    11: {label:'Example input', code:'name = ["A", "B"]\nsalary = [50000, 70000]', output:'salary column: 50000, 70000'},
    12: {label:'Example input', code:'name = ["A", "B", "C"]\nsalary = [50000, 70000, 90000]', output:'Employees B and C'},
    13: {label:'Example input', code:'salary = [50000, 90000, 70000]', output:'90000, 70000, 50000'},
    14: {label:'Example input', code:'salary = [50000, 60000, 70000]', output:'60000.0'},
    15: {label:'Example input', code:'department = ["IT", "IT", "HR"]\nsales = [100, 200, 150]', output:'HR=150, IT=300'},
    16: {label:'Example input', code:'department = ["IT", "IT", "HR"]\nsalary = [50000, 70000, 60000]', output:'HR=60000, IT=60000'},
    17: {label:'Example input', code:'department = ["IT", "IT", "HR", "Sales"]', output:'IT=2, HR=1, Sales=1'},
    18: {label:'Example input', code:'salary = [50000, None, 70000, 60000]', output:'missing value replaced with median 60000'},
    19: {label:'Example input', code:'name=["A","B","C"]\ndepartment=["IT",None,"HR"]', output:'rows A/IT and C/HR'},
    20: {label:'Example input', code:'employee_id=[1,2,2,3]\nname=["A","B","B","C"]', output:'duplicate employee B row removed'},
    21: {label:'Example input', code:'salary = [50000, 60000]', output:'column renamed to annual_salary'},
    22: {label:'Example input', code:'date = ["2026-01-01", "2026-02-15"]', output:'date converted to datetime'},
    23: {label:'Example input', code:'date = ["2026-01-01", "2025-06-10"]', output:'years 2026 and 2025'},
    24: {label:'Example input', code:'price=[10,20,15]\nquantity=[2,3,4]', output:'revenue=[20,60,60]'},
    25: {label:'Example input', code:'product=["A","B","C","D"]\nrevenue=[100,500,250,700]', output:'D=700, B=500, C=250'},
    26: {label:'Example input', code:'customers=(1,A),(2,B)\norders=(1,100),(1,200),(2,150)', output:'3 matched order rows'},
    27: {label:'Example input', code:'customers=[1,2,3]\norders=[(1,100),(1,200),(2,150)]', output:'all customers retained; customer 3 has no order'},
    28: {label:'Example input', code:'customer 1: 100+200\ncustomer 2: 150', output:'A=300, B=150'},
    29: {label:'Example input', code:'customers=[1,2,3]\norders=[1,2]', output:'customer 3 has no orders'},
    30: {label:'Example input', code:'dates=[2026-01-05,2026-01-20,2026-02-02]\nsales=[100,200,150]', output:'2026-01=300, 2026-02=150'}
  };

  const escapeHtml = value => String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  let lastQuestion = null;

  function getQuestionNumber() {
    const title = document.getElementById('title');
    const match = title && title.textContent.match(/^Q\s*(\d+)/i);
    return match ? Number(match[1]) : null;
  }

  function renderSample() {
    const page = document.getElementById('page');
    const n = getQuestionNumber();
    const sample = PRACTICAL_SAMPLES[n];
    if (!page || !sample || lastQuestion === n) return;

    const writeCard = [...page.querySelectorAll('.card')].find(card => /Write your Python/i.test(card.textContent || ''));
    if (!writeCard) return;

    page.querySelectorAll('.practical-example-card').forEach(el => el.remove());

    const card = document.createElement('section');
    card.className = 'card practical-example-card';
    card.innerHTML = `
      <h3 style="margin:0 0 14px;font-size:20px">🧪 Example input</h3>
      <div style="background:#eef6ff;border-left:5px solid #2563eb;border-radius:8px;padding:14px">
        <div style="font-weight:700;margin-bottom:8px">Use this data for the question:</div>
        <pre style="margin:0;background:#0b1220;color:#e5edf8;border-radius:7px;padding:14px;overflow:auto;font:13px/1.55 Consolas,monospace;white-space:pre-wrap">${escapeHtml(sample.code)}</pre>
        <div style="margin-top:12px"><strong>Expected output:</strong> ${escapeHtml(sample.output)}</div>
      </div>`;
    writeCard.parentNode.insertBefore(card, writeCard);
    lastQuestion = n;
  }

  const observer = new MutationObserver(() => requestAnimationFrame(renderSample));
  const page = document.getElementById('page');
  const title = document.getElementById('title');
  if (page) observer.observe(page, {childList:true, subtree:true});
  if (title) observer.observe(title, {childList:true, characterData:true, subtree:true});
  setInterval(() => {
    const n = getQuestionNumber();
    if (n !== lastQuestion) renderSample();
  }, 300);
  renderSample();
})();
