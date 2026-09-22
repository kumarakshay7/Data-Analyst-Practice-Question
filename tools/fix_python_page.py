from pathlib import Path
import re

p=Path('python_practice.html')
s=p.read_text(encoding='utf-8')

# Extra UI styles
needle='.tip{background:#fff9df;border-left:5px solid #eab308;border-radius:8px;padding:12px;line-height:1.5}'
extra='.detail{background:#f8fafc;border:1px solid var(--line);border-radius:9px;padding:15px;line-height:1.7;font-size:14px}.detail h4{margin:0 0 7px;font-size:15px}.sample{background:#eef6ff;border-left:5px solid var(--blue);border-radius:8px;padding:12px;margin:10px 0;line-height:1.55}.sample pre{background:#0b1220;color:#e5edf8;border-radius:7px;padding:12px;overflow:auto;margin:8px 0;font:12px/1.5 Consolas,monospace}.warn{background:#fff7ed;border:1px solid #fed7aa;border-left:5px solid #f97316;border-radius:9px;padding:12px;line-height:1.55;font-size:13px}'
if '.detail{' not in s and needle in s:
    s=s.replace(needle,needle+extra,1)

# Replace the theory rendering with a detailed interview explanation.
pat=r"if\(mode==='theory'\)\{.*?\n  \}else\{"
rep="""if(mode==='theory'){
    $('subtitle').textContent='Detailed Python and Pandas explanations with examples, Data Analyst use cases, and interview-ready answers.';
    $('page').innerHTML='<div class=\"card\"><span class=\"badge\">Python Theory</span><span class=\"badge\">'+q[2]+'</span><div class=\"question\">🐍 '+esc(q[1])+'</div></div><div class=\"card\"><h3>💡 Detailed explanation</h3>'+theoryDetails(q)+'</div><div class=\"card\"><h3>🎯 Interview-ready answer</h3><div class=\"answer\">'+esc(interviewAnswer(q))+'</div></div><div class=\"card\"><h3>🎯 Interview tip</h3><div class=\"tip\">Start with the definition, give a small example, then explain where you would use it in a Data Analyst project. If asked a follow-up, mention one limitation or common mistake.</div></div>';
  }else{"""
s2,n=re.subn(pat,rep,s,count=1,flags=re.S)
if n!=1: raise SystemExit('theory block not found')
s=s2

# Insert helpers before show().
marker='function show(id){'
helpers=r'''function theoryDetails(q){
  const a=esc(q[3]), text=(q[1]+' '+q[3]).toLowerCase();
  let example='Example: start with a small dataset, apply the concept, and inspect the result before using the same logic on the full dataset.';
  let use='For a Data Analyst, this helps with data cleaning, transformation, validation, automation, reporting, or analysis. After important transformations, validate row counts, nulls, duplicates, data types, and business rules.';
  if(text.includes('list')||text.includes('tuple')||text.includes('set')||text.includes('dictionary')) example='Example: <code>numbers=[10,20,20,30]</code>. Lists keep order, sets keep unique values, and dictionaries store key-value pairs.';
  else if(text.includes('pandas')||text.includes('dataframe')||text.includes('series')) example='Example: <code>df["salary"].mean()</code> calculates an average and <code>df[df["salary"]&gt;50000]</code> filters rows.';
  else if(text.includes('groupby')) example='Example: <code>df.groupby("department")["salary"].mean()</code> calculates the average salary for each department.';
  else if(text.includes('merge')||text.includes('join')) example='Example: merge employee and department tables using <code>department_id</code>, similar to a SQL JOIN.';
  else if(text.includes('missing')) example='Example: inspect with <code>df.isna().sum()</code>, then choose <code>dropna()</code> or <code>fillna()</code> according to the business meaning.';
  else if(text.includes('datetime')||text.includes('date')) example='Example: <code>df["date"]=pd.to_datetime(df["date"])</code>, then use <code>df["date"].dt.month</code> for monthly analysis.';
  else if(text.includes('outlier')||text.includes('iqr')) example='Example: calculate Q1 and Q3, set IQR=Q3-Q1, then flag values outside Q1−1.5×IQR and Q3+1.5×IQR.';
  else if(text.includes('function')||text.includes('lambda')) example='Example: <code>def add_tax(price): return price*1.18</code> creates reusable logic. Lambda is useful for short expressions.';
  else if(text.includes('generator')||text.includes('iterator')) example='Example: a generator uses <code>yield</code> to produce one value at a time, which is useful for large datasets.';
  else if(text.includes('exception')||text.includes('error')) example='Example: put a risky operation inside <code>try</code>, catch the expected exception in <code>except</code>, and keep the failure visible.';
  else if(text.includes('csv')) example='Example: <code>pd.read_csv("sales.csv",usecols=["date","sales"])</code> loads only the columns required for analysis.';
  else if(text.includes('vector')) example='Example: <code>df["revenue"]=df["price"]*df["quantity"]</code> performs a column-level calculation without a row loop.';
  else if(text.includes('big o')||text.includes('complexity')) example='Example: one pass through n rows is generally O(n), while repeatedly scanning the same data can become O(n²).';
  if(text.includes('performance')||text.includes('slow')||text.includes('memory')||text.includes('big o')) use='Performance matters as datasets grow. Measure the bottleneck first, then reduce repeated work, memory usage, and unnecessary row-wise operations.';
  return '<div class="detail"><h4>1. In simple words</h4><p>'+a+'</p><h4>2. Example</h4><p>'+example+'</p><h4>3. Why it matters for a Data Analyst</h4><p>'+use+'</p><h4>4. What to remember</h4><p>Know the definition, basic syntax, a practical use case, and one limitation or common mistake. In an interview, explain the idea first and show a short code example when asked.</p></div>';
}
function interviewAnswer(q){return q[3]+' In an interview, I would explain the concept briefly, give a small example, and connect it to a real data-analysis task such as cleaning, joining, aggregating, validating, or analyzing data.';}
'''
if marker not in s: raise SystemExit('show marker not found')
s=s.replace(marker,helpers+marker,1)

# Replace practical rendering with a visible sample input/reference output.
old="""$('page').innerHTML='<div class=\"card\"><span class=\"badge\">Practical Python</span><span class=\"badge\">'+q[2]+'</span><div class=\"question\">🐍 '+esc(q[1])+'</div><p class=\"meta\">Write your code before looking at the solution.</p></div><div class=\"card\"><h3>🤔 Think first</h3><div class=\"hint\">Identify the input, the transformation, and the expected output before coding.</div></div><div class=\"card\"><h3>✍️ Write your Python</h3><textarea id=\"editor\" class=\"editor\"># Write your solution here</textarea><div class=\"buttons\"><button class=\"btn run\" id=\"runBtn\">▶ Run Python</button><button class=\"btn check\" id=\"checkBtn\">✓ Check Answer</button><button class=\"btn show\" id=\"showBtn\">Show Correct Code</button><button class=\"btn clear\" id=\"clearBtn\">Clear</button></div><div id=\"result\"></div></div><div class=\"card\"><h3>💡 Solution</h3><pre class=\"code\" id=\"solution\">Click “Show Correct Code” when you are ready.</pre></div>';"""
new="""$('page').innerHTML='<div class=\"card\"><span class=\"badge\">Practical Python</span><span class=\"badge\">'+q[2]+'</span><div class=\"question\">🐍 '+esc(q[1])+'</div><p class=\"meta\">Write your code before looking at the solution.</p><div class=\"sample\"><b>📌 Sample input</b><pre>'+esc(sampleInput(q[3]))+'</pre><b>Expected output</b><pre id=\"expectedPreview\">Calculating...</pre></div><div class=\"warn\">Use the sample input shown above when checking your answer. If you change the numbers or data, your output may be correct for your new input but it will not match the reference output used by Check Answer.</div></div><div class=\"card\"><h3>🤔 Think first</h3><div class=\"hint\">Identify the input, the transformation, and the expected output before coding.</div></div><div class=\"card\"><h3>✍️ Write your Python</h3><textarea id=\"editor\" class=\"editor\"># Use the sample input shown above\n# Write your solution here</textarea><div class=\"buttons\"><button class=\"btn run\" id=\"runBtn\">▶ Run Python</button><button class=\"btn check\" id=\"checkBtn\">✓ Check Answer</button><button class=\"btn show\" id=\"showBtn\">Show Correct Code</button><button class=\"btn clear\" id=\"clearBtn\">Clear</button></div><div id=\"result\"></div></div><div class=\"card\"><h3>💡 Solution</h3><pre class=\"code\" id=\"solution\">Click “Show Correct Code” when you are ready.</pre></div>';"""
if old not in s: raise SystemExit('practical block not found')
s=s.replace(old,new,1)

# Add sampleInput and expected-output preview.
marker2='async function runPython(){'
helper2=r'''function sampleInput(code){
  const lines=code.split(/\n/).filter(x=>x.trim()&&!x.trim().startsWith('#'));
  const defs=[];
  for(const line of lines){
    const t=line.trim();
    if(!/^[A-Za-z_][A-Za-z0-9_]*\s*=\s*/.test(t)) continue;
    if(/^(previous|change|change_pct|running_total|rolling_avg|pct_change|rank|year|month|revenue|dept_avg|idx|iqr|cutoff|customer_total|x|report|kpi|missing|result|total)\s*=/.test(t)) continue;
    defs.push(t); if(defs.length>=4) break;
  }
  return defs.length?defs.join('\n'):'Use the exact sample data shown in the solution.';
}
'''
if marker2 not in s: raise SystemExit('run marker not found')
s=s.replace(marker2,helper2+marker2,1)
oldbind="$('runBtn').onclick=runPython;$('checkBtn').onclick=checkPython;$('showBtn').onclick=showSolution;$('clearBtn').onclick=()=>{$('editor').value='';$('result').innerHTML=''};"
newbind="$('runBtn').onclick=runPython;$('checkBtn').onclick=checkPython;$('showBtn').onclick=showSolution;$('clearBtn').onclick=()=>{$('editor').value='';$('result').innerHTML=''};setTimeout(async()=>{try{const p=await getPyodide();let expected='';p.setStdout({batched:x=>expected+=x});await p.runPythonAsync(q[3]);const e=$('expectedPreview');if(e)e.textContent=expected||'(no printed output)'}catch(e){}},0);"
if oldbind not in s: raise SystemExit('binding not found')
s=s.replace(oldbind,newbind,1)

p.write_text(s,encoding='utf-8')
print('updated python_practice.html')
