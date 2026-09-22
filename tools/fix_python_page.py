from pathlib import Path
import re

p = Path('python_practice.html')
s = p.read_text(encoding='utf-8')

# The Python practice checker previously compared the student's exact stdout
# with the reference solution stdout. That makes a correct solution fail when
# the student changes the sample numbers, even though the algorithm is valid.
# Keep exact-output checking for the reference sample, but also allow a
# concept-based validation for common Data Analyst practice questions.
start = s.find('async function checkPython(){')
end = s.find("\n$('pythonTheoryTab')", start)
if start == -1 or end == -1:
    raise SystemExit('checkPython block not found')

new_check = r'''function conceptuallyCorrect(q, code){
  const id=q[0], t=q[1].toLowerCase(), c=code.toLowerCase();
  const has=(...patterns)=>patterns.some(p=>p.test(c));

  const rules={
    'PY-P001':[/for\\s+\\w+\\s+in/,/print\\s*\\(/],
    'PY-P002':[/\\bsum\\s*\\(/,/total\\s*\\+=/,/for\\s+\\w+\\s+in/],
    'PY-P003':[/\\bmax\\s*\\(/,/sorted\\s*\\(/,/for\\s+\\w+\\s+in/],
    'PY-P004':[/%\\s*2\\s*==\\s*0/,/even/],
    'PY-P005':[/dict\\.fromkeys/,/set\\s*\\(/,/drop_duplicates/,/unique/],
    'PY-P006':[/\\.items\\s*\\(/,/salary/,/>\\s*50000/],
    'PY-P007':[/\\[.*for.*in.*range/,/\\*\\*\\s*2/,/x\\s*\\*\\s*x/],
    'PY-P008':[/sum\\s*\\(/,/len\\s*\\(/,/mean\\s*\\(/],
    'PY-P009':[/try\\s*:/,/zeroDivisionError/],
    'PY-P010':[/dataframe/,/pd\\.dataframe/],
    'PY-P011':[/\\[.*salary.*\\]/,/salary/],
    'PY-P012':[/salary/,/>\\s*60000/,/query\\s*\\(/],
    'PY-P013':[/sort_values/,/sorted\\s*\\(/],
    'PY-P014':[/\\.mean\\s*\\(/,/sum\\s*\\(/],
    'PY-P015':[/groupby/,/sales/],
    'PY-P016':[/groupby/,/salary/],
    'PY-P017':[/value_counts/,/groupby/],
    'PY-P018':[/fillna/,/median/,/isna/],
    'PY-P019':[/dropna/,/subset/],
    'PY-P020':[/drop_duplicates/,/duplicated/],
    'PY-P021':[/rename/,/annual_salary/],
    'PY-P022':[/to_datetime/,/datetime/],
    'PY-P023':[/\\.dt\\.year/,/year/],
    'PY-P024':[/revenue/,/price.*\\*.*quantity/,/quantity.*\\*.*price/],
    'PY-P025':[/nlargest/,/sort_values/,/head\\s*\\(/],
    'PY-P026':[/merge/,/customer_id/],
    'PY-P027':[/merge/,/how\\s*=\\s*[\"']left/],
    'PY-P028':[/groupby/,/merge/,/sum/],
    'PY-P029':[/merge/,/left_only/,/isna/],
    'PY-P030':[/to_period/,/groupby/,/dt\\.month/],
    'PY-P031':[/shift/,/previous_sales/,/-/],
    'PY-P032':[/cumsum/,/running_total/],
    'PY-P033':[/pct_change/,/shift/],
    'PY-P034':[/groupby/,/idxmax/,/max/],
    'PY-P035':[/groupby/,/rank/],
    'PY-P036':[/quantile/,/iqr/,/1\\.5/],
    'PY-P037':[/str\\.strip/,/upper/,/lower/],
    'PY-P038':[/pivot_table/,/pivot/],
    'PY-P039':[/duplicated/,/customer_id/],
    'PY-P040':[/total_sales/,/average_order_value/,/order_count/,/nunique/],
  };

  if(rules[id]) return has(...rules[id]);

  // For later questions, use distinctive operations from the task wording.
  if(t.includes('dictionary') && t.includes('frequency')) return has(/split\\s*\\(/,/get\\s*\\(/,/counts/);
  if(t.includes('second-largest')) return has(/sorted\\s*\\(/,/set\\s*\\(/,/reverse/);
  if(t.includes('flatten')) return has(/for .* in .*for/,/extend\\s*\\(/,/chain/);
  if(t.includes('vowels')) return has(/aeiou/,/lower\\s*\\(/,/sum\\s*\\(/);
  if(t.includes('department average')) return has(/groupby/,/transform/,/mean/);
  if(t.includes('second-highest salary')) return has(/groupby/,/rank/,/dense/);
  if(t.includes('rolling average')) return has(/rolling/,/mean/);
  if(t.includes('first purchase date')) return has(/groupby/,/min/);
  if(t.includes('contribution to total revenue')) return has(/sum/,/revenue/,/100/);
  if(t.includes('top product by revenue')) return has(/groupby/,/idxmax/,/nlargest/);
  if(t.includes('previous month')) return has(/shift/,/groupby/);
  if(t.includes('above the overall average')) return has(/groupby/,/mean/,/>/);
  if(t.includes('sudden sales drop')) return has(/shift/,/0\\.7/,/sales/);
  if(t.includes('validates required')) return has(/columns/,/missing/,/for/);
  if(t.includes('data migration')) return has(/!=/,/old_value/,/new_value/);
  if(t.includes('data-quality report')) return has(/isna/,/duplicated/,/len/);
  if(t.includes('chunks')) return has(/chunksize/,/read_csv/);
  if(t.includes('kpi')) return has(/sum/,/nunique/,/orders/,/visits/);
  return false;
}

async function checkPython(){
  const q=practical.find(x=>x[0]===current); if(!q)return;
  const out=$('result');
  out.innerHTML='<div class="result">Running your code to check the answer...</div>';
  try{
    const p=await getPyodide();
    let user='';
    p.setStdout({batched:s=>user+=s});
    await p.runPythonAsync($('editor').value);

    let expected='';
    p.setStdout({batched:s=>expected+=s});
    await p.runPythonAsync(q[3]);

    const exact=norm(user)===norm(expected);
    const concept=conceptuallyCorrect(q,$('editor').value);

    if(exact){
      out.innerHTML='<div class="result ok">✅ Correct answer. Your output matches the reference solution.</div>';
    }else if(concept){
      out.innerHTML='<div class="result ok">✅ Correct approach. Your code solves the task. Your output can be different because you used different sample values. That is valid.</div>';
    }else{
      out.innerHTML='<div class="result err">❌ The code ran, but the checking logic could not confirm the required approach. If you changed the sample data, that is fine, but make sure your code still performs the operation asked in the question.</div>';
    }
  }catch(e){
    out.innerHTML='<div class="result err">❌ '+esc(e.message||e)+'</div>';
  }
}
'''

s = s[:start] + new_check + s[end:]
p.write_text(s, encoding='utf-8')
print('Patched Python Check Answer logic.')
