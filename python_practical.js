(() => {
  const PRACTICAL = [
    ['PY-P001','Create a list of employee names and print each name.','Easy','names=["Akshay","Rahul","Priya"]\nfor name in names:\n    print(name)',['for','print']],
    ['PY-P002','Find the sum of all numbers in a list.','Easy','numbers=[10,20,30,40]\nprint(sum(numbers))',['sum','for']],
    ['PY-P003','Find the maximum value in a list.','Easy','numbers=[10,45,22,90,31]\nprint(max(numbers))',['max','sorted']],
    ['PY-P004','Count how many even numbers are in a list.','Easy','numbers=[1,2,4,7,8,10]\nprint(sum(1 for x in numbers if x%2==0))',['%','2','even']],
    ['PY-P005','Remove duplicates from a list while keeping unique values.','Easy','values=[1,2,2,3,1,4]\nprint(list(dict.fromkeys(values)))',['set','dict.fromkeys','unique']],
    ['PY-P006','Create a dictionary containing employee names and salaries, then print salaries above 50000.','Easy','employees={"Amit":45000,"Priya":65000,"Rahul":75000}\nfor name,salary in employees.items():\n    if salary>50000:\n        print(name,salary)',['items','salary','50000']],
    ['PY-P007','Use a list comprehension to create squares from 1 to 10.','Easy','print([x*x for x in range(1,11)])',['for','range','*']],
    ['PY-P008','Write a function that returns the average of a list of numbers.','Easy','def average(values):\n    return sum(values)/len(values)\nprint(average([10,20,30]))',['def','sum','len']],
    ['PY-P009','Handle a division-by-zero error using try/except.','Easy','try:\n    print(10/0)\nexcept ZeroDivisionError:\n    print("Cannot divide by zero")',['try','except','ZeroDivisionError']],
    ['PY-P010','Create a Pandas DataFrame from employee data and display it.','Easy','import pandas as pd\ndf=pd.DataFrame({"name":["A","B","C"],"salary":[50000,60000,70000]})\nprint(df)',['pandas','DataFrame']],
    ['PY-P011','Select the salary column from a DataFrame.','Easy','import pandas as pd\ndf=pd.DataFrame({"name":["A","B"],"salary":[50000,70000]})\nprint(df["salary"])',['salary']],
    ['PY-P012','Filter employees whose salary is greater than 60000.','Easy','import pandas as pd\ndf=pd.DataFrame({"name":["A","B","C"],"salary":[50000,70000,90000]})\nprint(df[df["salary"]>60000])',['salary','>','60000']],
    ['PY-P013','Sort employees by salary from highest to lowest.','Easy','import pandas as pd\ndf=pd.DataFrame({"name":["A","B","C"],"salary":[50000,90000,70000]})\nprint(df.sort_values("salary",ascending=False))',['sort_values','salary','ascending']],
    ['PY-P014','Find the average salary in a DataFrame.','Easy','import pandas as pd\ndf=pd.DataFrame({"salary":[50000,60000,70000]})\nprint(df["salary"].mean())',['salary','mean']],
    ['PY-P015','Find total sales by department using groupby.','Easy','import pandas as pd\ndf=pd.DataFrame({"department":["IT","IT","HR"],"sales":[100,200,150]})\nprint(df.groupby("department")["sales"].sum())',['groupby','sales','sum']],
    ['PY-P016','Find average salary by department.','Easy','import pandas as pd\ndf=pd.DataFrame({"department":["IT","IT","HR"],"salary":[50000,70000,60000]})\nprint(df.groupby("department")["salary"].mean())',['groupby','salary','mean']],
    ['PY-P017','Count employees in each department.','Easy','import pandas as pd\ndf=pd.DataFrame({"department":["IT","IT","HR","Sales"]})\nprint(df["department"].value_counts())',['value_counts','department']],
    ['PY-P018','Replace missing salary values with the median salary.','Easy','import pandas as pd\ndf=pd.DataFrame({"salary":[50000,None,70000,60000]})\ndf["salary"]=df["salary"].fillna(df["salary"].median())\nprint(df)',['fillna','median']],
    ['PY-P019','Remove rows with missing department values.','Easy','import pandas as pd\ndf=pd.DataFrame({"name":["A","B","C"],"department":["IT",None,"HR"]})\nprint(df.dropna(subset=["department"]))',['dropna','department']],
    ['PY-P020','Remove duplicate employee rows.','Easy','import pandas as pd\ndf=pd.DataFrame({"employee_id":[1,2,2,3],"name":["A","B","B","C"]})\nprint(df.drop_duplicates())',['drop_duplicates']],
    ['PY-P021','Rename a column from salary to annual_salary.','Easy','import pandas as pd\ndf=pd.DataFrame({"salary":[50000,60000]})\nprint(df.rename(columns={"salary":"annual_salary"}))',['rename','annual_salary']],
    ['PY-P022','Convert a date column to datetime.','Easy','import pandas as pd\ndf=pd.DataFrame({"date":["2026-01-01","2026-02-15"]})\ndf["date"]=pd.to_datetime(df["date"])\nprint(df.dtypes)',['to_datetime','date']],
    ['PY-P023','Extract year from a datetime column.','Easy','import pandas as pd\ndf=pd.DataFrame({"date":pd.to_datetime(["2026-01-01","2025-06-10"])})\ndf["year"]=df["date"].dt.year\nprint(df)',['dt.year','year']],
    ['PY-P024','Calculate revenue as price multiplied by quantity.','Easy','import pandas as pd\ndf=pd.DataFrame({"price":[10,20,15],"quantity":[2,3,4]})\ndf["revenue"]=df["price"]*df["quantity"]\nprint(df)',['revenue','price','quantity']],
    ['PY-P025','Find the top 3 products by revenue.','Medium','import pandas as pd\ndf=pd.DataFrame({"product":["A","B","C","D"],"revenue":[100,500,250,700]})\nprint(df.nlargest(3,"revenue"))',['nlargest','revenue']],
    ['PY-P026','Merge customers and orders using customer_id.','Medium','import pandas as pd\ncustomers=pd.DataFrame({"customer_id":[1,2],"name":["A","B"]})\norders=pd.DataFrame({"customer_id":[1,1,2],"amount":[100,200,150]})\nprint(customers.merge(orders,on="customer_id",how="inner"))',['merge','customer_id']],
    ['PY-P027','Perform a left merge of customers and orders.','Medium','import pandas as pd\ncustomers=pd.DataFrame({"customer_id":[1,2,3]})\norders=pd.DataFrame({"customer_id":[1,1,2],"amount":[100,200,150]})\nprint(customers.merge(orders,on="customer_id",how="left"))',['merge','how="left"','customer_id']],
    ['PY-P028','Calculate total revenue by customer after merging customer and order data.','Medium','import pandas as pd\ncustomers=pd.DataFrame({"customer_id":[1,2],"name":["A","B"]})\norders=pd.DataFrame({"customer_id":[1,1,2],"amount":[100,200,150]})\nx=customers.merge(orders,on="customer_id",how="left")\nprint(x.groupby(["customer_id","name"],as_index=False)["amount"].sum())',['merge','groupby','sum']],
    ['PY-P029','Find customers with no orders using a left merge.','Medium','import pandas as pd\ncustomers=pd.DataFrame({"customer_id":[1,2,3]})\norders=pd.DataFrame({"customer_id":[1,2]})\nx=customers.merge(orders,on="customer_id",how="left",indicator=True)\nprint(x[x["_merge"]=="left_only"])',['merge','left_only','indicator']],
    ['PY-P030','Calculate monthly sales from a date column.','Medium','import pandas as pd\ndf=pd.DataFrame({"date":pd.to_datetime(["2026-01-05","2026-01-20","2026-02-02"]),"sales":[100,200,150]})\ndf["month"]=df["date"].dt.to_period("M")\nprint(df.groupby("month")["sales"].sum())',['to_period','groupby','sales']],
    ['PY-P031','Calculate month-over-month sales change.','Medium','import pandas as pd\ndf=pd.DataFrame({"month":["2026-01","2026-02","2026-03"],"sales":[100,120,150]})\ndf["previous_sales"]=df["sales"].shift()\ndf["change"]=df["sales"]-df["previous_sales"]\nprint(df)',['shift','previous_sales']],
    ['PY-P032','Calculate a running total of sales.','Medium','import pandas as pd\ndf=pd.DataFrame({"sales":[100,150,200]})\ndf["running_total"]=df["sales"].cumsum()\nprint(df)',['cumsum','running_total']],
    ['PY-P033','Calculate percentage change in sales.','Medium','import pandas as pd\ndf=pd.DataFrame({"sales":[100,120,150]})\ndf["pct_change"]=df["sales"].pct_change()*100\nprint(df)',['pct_change','sales']],
    ['PY-P034','Find the highest salary in each department.','Medium','import pandas as pd\ndf=pd.DataFrame({"department":["IT","IT","HR"],"name":["A","B","C"],"salary":[50000,70000,65000]})\nprint(df.loc[df.groupby("department")["salary"].idxmax()])',['groupby','idxmax','salary']],
    ['PY-P035','Rank employees by salary within each department.','Hard','import pandas as pd\ndf=pd.DataFrame({"department":["IT","IT","HR","HR"],"name":["A","B","C","D"],"salary":[50000,70000,65000,55000]})\ndf["rank"]=df.groupby("department")["salary"].rank(method="dense",ascending=False)\nprint(df.sort_values(["department","rank"]))',['groupby','rank','dense']],
    ['PY-P036','Detect outliers in a salary column using IQR.','Hard','import pandas as pd\ndf=pd.DataFrame({"salary":[40000,45000,50000,52000,55000,200000]})\nq1=df["salary"].quantile(.25); q3=df["salary"].quantile(.75); iqr=q3-q1\nprint(df[(df["salary"]<q1-1.5*iqr)|(df["salary"]>q3+1.5*iqr)])',['quantile','iqr','1.5']],
    ['PY-P037','Standardize inconsistent department text values.','Medium','import pandas as pd\ndf=pd.DataFrame({"department":[" IT ","it","HR"," hr "]})\ndf["department"]=df["department"].str.strip().str.upper()\nprint(df)',['strip','upper','department']],
    ['PY-P038','Create a pivot table of sales by region and product.','Medium','import pandas as pd\ndf=pd.DataFrame({"region":["North","North","South"],"product":["A","B","A"],"sales":[100,200,150]})\nprint(pd.pivot_table(df,index="region",columns="product",values="sales",aggfunc="sum",fill_value=0))',['pivot_table','region','product']],
    ['PY-P039','Find duplicate customer IDs.','Medium','import pandas as pd\ndf=pd.DataFrame({"customer_id":[1,2,2,3,3,3]})\nprint(df[df.duplicated("customer_id",keep=False)].sort_values("customer_id"))',['duplicated','customer_id']],
    ['PY-P040','Create a KPI summary with total sales, average order value, and order count.','Hard','import pandas as pd\ndf=pd.DataFrame({"order_id":[1,2,3],"amount":[100,200,300]})\nkpi={"total_sales":df["amount"].sum(),"average_order_value":df["amount"].mean(),"order_count":df["order_id"].nunique()}\nprint(kpi)',['sum','mean','nunique']],
    ['PY-P041','Calculate the frequency of each word in a sentence using a dictionary.','Medium','text="data analysis data python"\ncounts={}\nfor word in text.split():\n    counts[word]=counts.get(word,0)+1\nprint(counts)',['split','counts','get']],
    ['PY-P042','Find the second-largest unique number in a list.','Medium','values=[10,40,20,40,30]\nprint(sorted(set(values),reverse=True)[1])',['sorted','set','reverse']],
    ['PY-P043','Flatten a list of lists into one list.','Easy','values=[[1,2],[3,4],[5]]\nprint([x for group in values for x in group])',['for','group']],
    ['PY-P044','Create a function that returns the number of vowels in a string.','Easy','def count_vowels(text):\n    return sum(ch.lower() in "aeiou" for ch in text)\nprint(count_vowels("Data Analyst"))',['def','aeiou','lower']],
    ['PY-P045','Find employees whose salary is above the department average.','Hard','import pandas as pd\ndf=pd.DataFrame({"department":["IT","IT","HR","HR"],"name":["A","B","C","D"],"salary":[50000,80000,60000,40000]})\ndf["dept_avg"]=df.groupby("department")["salary"].transform("mean")\nprint(df[df["salary"]>df["dept_avg"]])',['groupby','transform','mean']],
    ['PY-P046','Find the second-highest salary in each department.','Hard','import pandas as pd\ndf=pd.DataFrame({"department":["IT","IT","IT","HR","HR"],"salary":[50000,80000,70000,60000,55000]})\ndf["rank"]=df.groupby("department")["salary"].rank(method="dense",ascending=False)\nprint(df[df["rank"]==2])',['groupby','rank','dense']],
    ['PY-P047','Calculate a 3-period rolling average of sales.','Medium','import pandas as pd\ndf=pd.DataFrame({"sales":[100,120,150,180,200]})\ndf["rolling_avg"]=df["sales"].rolling(3).mean()\nprint(df)',['rolling','mean']],
    ['PY-P048','Calculate a 7-day rolling average for daily sales.','Medium','import pandas as pd\ndf=pd.DataFrame({"date":pd.date_range("2026-01-01",periods=10),"sales":[10,12,11,14,15,13,16,18,17,20]})\ndf["rolling_7d"]=df["sales"].rolling(7).mean()\nprint(df)',['rolling','7','sales']],
    ['PY-P049','Find the first purchase date for each customer.','Medium','import pandas as pd\ndf=pd.DataFrame({"customer_id":[1,1,2,2],"date":pd.to_datetime(["2026-02-01","2026-01-10","2026-03-02","2026-02-20"])})\nprint(df.groupby("customer_id")["date"].min().reset_index())',['groupby','min','customer_id']],
    ['PY-P050','Calculate each product contribution to total revenue as a percentage.','Medium','import pandas as pd\ndf=pd.DataFrame({"product":["A","B","C"],"revenue":[100,300,600]})\ndf["pct_of_total"]=df["revenue"]/df["revenue"].sum()*100\nprint(df)',['revenue','sum','100']],
    ['PY-P051','Find the top product by revenue in each region.','Hard','import pandas as pd\ndf=pd.DataFrame({"region":["North","North","South","South"],"product":["A","B","A","B"],"revenue":[100,250,300,200]})\nidx=df.groupby("region")["revenue"].idxmax()\nprint(df.loc[idx])',['groupby','idxmax','revenue']],
    ['PY-P052','Compare current month sales with previous month sales by region.','Hard','import pandas as pd\ndf=pd.DataFrame({"region":["North","North","South","South"],"month":["2026-01","2026-02","2026-01","2026-02"],"sales":[100,130,200,180]})\ndf=df.sort_values(["region","month"])\ndf["previous_sales"]=df.groupby("region")["sales"].shift()\ndf["change_pct"]=(df["sales"]/df["previous_sales"]-1)*100\nprint(df)',['groupby','shift','previous_sales']],
    ['PY-P053','Find customers whose total order value is above the overall average customer value.','Hard','import pandas as pd\norders=pd.DataFrame({"customer_id":[1,1,2,3,3],"amount":[100,200,500,50,100]})\ncustomer_total=orders.groupby("customer_id",as_index=False)["amount"].sum()\ncutoff=customer_total["amount"].mean()\nprint(customer_total[customer_total["amount"]>cutoff])',['groupby','mean','amount']],
    ['PY-P054','Detect a sudden sales drop when today is less than 70% of the previous day.','Medium','import pandas as pd\ndf=pd.DataFrame({"date":pd.date_range("2026-01-01",periods=5),"sales":[100,110,105,60,100]})\ndf["previous"]=df["sales"].shift()\nprint(df[df["sales"]<0.7*df["previous"]])',['shift','0.7','sales']],
    ['PY-P055','Create a reusable function that validates required DataFrame columns.','Medium','import pandas as pd\ndef validate_columns(df,required):\n    return [c for c in required if c not in df.columns]\ndf=pd.DataFrame({"id":[1],"sales":[100]})\nprint(validate_columns(df,["id","sales","date"]))',['def','columns','required']],
    ['PY-P056','Use a custom function with groupby to calculate a sales range by department.','Hard','import pandas as pd\ndf=pd.DataFrame({"department":["IT","IT","HR"],"sales":[100,300,200]})\nresult=df.groupby("department")["sales"].agg(lambda x:x.max()-x.min())\nprint(result)',['groupby','agg','max','min']],
    ['PY-P057','Find rows where two columns disagree after a data migration.','Medium','import pandas as pd\ndf=pd.DataFrame({"old_value":[10,20,30],"new_value":[10,25,30]})\nprint(df[df["old_value"]!=df["new_value"]])',['old_value','new_value','!=']],
    ['PY-P058','Build a data-quality report showing null count, duplicate count, and row count.','Hard','import pandas as pd\ndf=pd.DataFrame({"id":[1,2,2,3],"name":["A",None,"B","C"]})\nreport={"rows":len(df),"duplicate_rows":df.duplicated().sum(),"null_cells":df.isna().sum().sum()}\nprint(report)',['len','duplicated','isna']],
    ['PY-P059','Process a large CSV in chunks and calculate total sales without loading all rows at once.','Hard','import pandas as pd\ntotal=0\nfor chunk in pd.read_csv("sales.csv",usecols=["sales"],chunksize=100000):\n    total += chunk["sales"].sum()\nprint(total)',['read_csv','chunksize','sum']],
    ['PY-P060','Create a final KPI summary with total revenue, unique customers, average order value, and conversion rate.','Hard','import pandas as pd\ndf=pd.DataFrame({"customer_id":[1,2,1,3],"revenue":[100,200,150,50],"visits":[10,20,15,5],"orders":[1,1,1,0]})\nkpi={"total_revenue":df["revenue"].sum(),"unique_customers":df["customer_id"].nunique(),"average_order_value":df["revenue"].sum()/df["orders"].sum(),"conversion_rate":df["orders"].sum()/df["visits"].sum()*100}\nprint(kpi)',['sum','nunique','orders','visits']]
  ];

  const P = window.PYTHON_PRACTICAL = { list: PRACTICAL };
  const esc = s => String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  let current = null;
  const $ = id => document.getElementById(id);
  const nav = () => $('nav');
  const render = () => {
    if (!$('pythonPracticeTab') || !$('pythonPracticeTab').classList.contains('active')) return;
    const term = (($('search').value || '').toLowerCase().trim());
    const diff = $('difficulty').value || 'All';
    const arr = PRACTICAL.filter(q => (!term || q[0].toLowerCase().includes(term) || q[1].toLowerCase().includes(term)) && (diff==='All' || q[2]===diff));
    $('stats').textContent = 'Practical: ' + arr.length + ' questions';
    nav().innerHTML='';
    if (!arr.length) { $('page').innerHTML='<div class="card"><div class="question">No questions match your filter.</div></div>'; return; }
    arr.forEach(q => { const b=document.createElement('button'); b.className='qbtn'; b.textContent=q[0]+' · '+q[1]; b.onclick=()=>show(q[0]); nav().appendChild(b); });
    show(arr[0][0]);
  };
  const show = id => {
    const q=PRACTICAL.find(x=>x[0]===id); if(!q)return; current=id;
    document.querySelectorAll('.qbtn').forEach(b=>b.classList.toggle('active',b.textContent.startsWith(id+' · ')));
    $('title').textContent=q[0]+' · '+q[1]; $('subtitle').textContent='Write Python first, run it, check your answer, then compare with the solution.';
    $('page').innerHTML='<div class="card"><span class="badge">Practical Python</span><span class="badge">'+q[2]+'</span><div class="question">🐍 '+esc(q[1])+'</div><p class="meta">Use the sample data in the question or change it yourself. Different sample values are valid if your approach solves the task.</p></div><div class="card"><h3>🤔 Think first</h3><div class="hint">Identify the input, transformation, expected output, and edge cases before coding.</div></div><div class="card"><h3>✍️ Write your Python</h3><textarea id="editor" class="editor"># Write your solution here</textarea><div class="buttons"><button class="btn run" id="runBtn">▶ Run Python</button><button class="btn check" id="checkBtn">✓ Check Answer</button><button class="btn show" id="showBtn">Show Correct Code</button><button class="btn clear" id="clearBtn">Clear</button></div><div id="result"></div></div><div class="card"><h3>💡 Solution</h3><pre class="code" id="solution">Click “Show Correct Code” when ready.</pre></div>';
    $('runBtn').onclick=runPython; $('checkBtn').onclick=checkPython; $('showBtn').onclick=()=>{$('solution').textContent=q[3]}; $('clearBtn').onclick=()=>{$('editor').value='';$('result').innerHTML=''};
  };
  let pyodide=null, loading=null;
  async function getPyodide(){
    if(pyodide)return pyodide;
    if(!loading) loading=new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/pyodide/v0.27.2/full/pyodide.js';s.onload=async()=>{try{pyodide=await loadPyodide();resolve(pyodide)}catch(e){reject(e)}};s.onerror=reject;document.head.appendChild(s)});
    return loading;
  }
  async function runPython(){
    const out=$('result'); out.innerHTML='<div class="result">Loading Python runtime...</div>';
    try{const p=await getPyodide();let output='';p.setStdout({batched:s=>output+=s});await p.runPythonAsync($('editor').value);out.innerHTML='<div class="result ok"><b>Output:</b><pre>'+esc(output||'(no printed output)')+'</pre></div>'}
    catch(e){out.innerHTML='<div class="result err"><b>Python error:</b><pre>'+esc(e.message||e)+'</pre></div>'}
  }
  async function checkPython(){
    const q=PRACTICAL.find(x=>x[0]===current); if(!q)return;
    const code=$('editor').value; const out=$('result');
    if(!code.trim()){out.innerHTML='<div class="result err">❌ Write some Python code first.</div>';return;}
    out.innerHTML='<div class="result">Checking your Python code...</div>';
    try{
      const p=await getPyodide(); let user=''; p.setStdout({batched:s=>user+=s}); await p.runPythonAsync(code);
      const lower=code.toLowerCase(); const matched=q[4].filter(k=>lower.includes(k.toLowerCase())).length; const threshold=Math.max(1,Math.ceil(q[4].length*0.6));
      if(matched>=threshold) out.innerHTML='<div class="result ok">✅ Correct approach. Your code contains the required logic. Your sample values and output may differ, and that is valid.</div>';
      else out.innerHTML='<div class="result err">❌ Your code runs, but the checker could not confirm the required approach. Review the task and make sure it performs the requested operation.</div>';
    }catch(e){out.innerHTML='<div class="result err">❌ Python error: '+esc(e.message||e)+'</div>'}
  }
  function activatePractical(){
    $('pythonPracticeTab').classList.add('active'); $('pythonTheoryTab').classList.remove('active');
    $('search').value=''; $('difficulty').value='All'; render();
  }
  function wire(){
    $('pythonPracticeTab').onclick=activatePractical;
    $('search').addEventListener('input',()=>{if($('pythonPracticeTab').classList.contains('active'))render()});
    $('difficulty').addEventListener('change',()=>{if($('pythonPracticeTab').classList.contains('active'))render()});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',wire); else wire();
})();