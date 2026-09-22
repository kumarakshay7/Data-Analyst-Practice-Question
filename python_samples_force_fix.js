(() => {
  const SAMPLES = {
    'PY-P001':['Sample list','["Akshay", "Rahul", "Priya"]','Expected output','Akshay, Rahul, Priya'],
    'PY-P002':['Sample list','[10, 20, 30, 40]','Expected output','100'],
    'PY-P003':['Sample list','[10, 45, 22, 90, 31]','Expected output','90'],
    'PY-P004':['Sample list','[1, 2, 4, 7, 8, 10]','Expected output','4'],
    'PY-P005':['Sample list','[1, 2, 2, 3, 1, 4]','Expected output','[1, 2, 3, 4]'],
    'PY-P006':['Sample dictionary','{"Amit":45000,"Priya":65000,"Rahul":75000}','Expected output','Priya 65000; Rahul 75000'],
    'PY-P007':['Sample range','1 to 10','Expected output','[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]'],
    'PY-P008':['Sample list','[10, 20, 30]','Expected output','20.0'],
    'PY-P009':['Sample calculation','10 / 0','Expected output','Cannot divide by zero'],
    'PY-P010':['Sample employee data','name=[A,B,C], salary=[50000,60000,70000]','Expected output','DataFrame with 3 employees'],
    'PY-P011':['Sample DataFrame','name=[A,B], salary=[50000,70000]','Expected output','salary column: 50000, 70000'],
    'PY-P012':['Sample DataFrame','name=[A,B,C], salary=[50000,70000,90000]','Expected output','B and C'],
    'PY-P013':['Sample DataFrame','name=[A,B,C], salary=[50000,90000,70000]','Expected output','90000, 70000, 50000'],
    'PY-P014':['Sample salaries','[50000, 60000, 70000]','Expected output','60000.0'],
    'PY-P015':['Sample data','department=[IT,IT,HR], sales=[100,200,150]','Expected output','HR=150, IT=300'],
    'PY-P016':['Sample data','department=[IT,IT,HR], salary=[50000,70000,60000]','Expected output','HR=60000, IT=60000'],
    'PY-P017':['Sample departments','[IT, IT, HR, Sales]','Expected output','IT=2, HR=1, Sales=1'],
    'PY-P018':['Sample salaries','[50000, None, 70000, 60000]','Expected output','None replaced with median 60000'],
    'PY-P019':['Sample data','name=[A,B,C], department=[IT,None,HR]','Expected output','A/IT and C/HR rows'],
    'PY-P020':['Sample data','employee_id=[1,2,2,3], name=[A,B,B,C]','Expected output','duplicate B row removed'],
    'PY-P021':['Sample DataFrame','salary=[50000,60000]','Expected output','salary renamed to annual_salary'],
    'PY-P022':['Sample dates','[2026-01-01, 2026-02-15]','Expected output','date converted to datetime'],
    'PY-P023':['Sample dates','[2026-01-01, 2025-06-10]','Expected output','years 2026 and 2025'],
    'PY-P024':['Sample data','price=[10,20,15], quantity=[2,3,4]','Expected output','revenue=[20,60,60]'],
    'PY-P025':['Sample products','A=100, B=500, C=250, D=700','Expected output','D=700, B=500, C=250'],
    'PY-P026':['Sample customers/orders','customers=(1,A),(2,B); orders=(1,100),(1,200),(2,150)','Expected output','3 matched order rows'],
    'PY-P027':['Sample data','customers=[1,2,3]; orders=[(1,100),(1,200),(2,150)]','Expected output','all 3 customers retained; customer 3 has no order'],
    'PY-P028':['Sample data','customers=(1,A),(2,B); orders=(1,100),(1,200),(2,150)','Expected output','A=300, B=150'],
    'PY-P029':['Sample data','customers=[1,2,3]; orders=[1,2]','Expected output','customer 3 has no orders'],
    'PY-P030':['Sample data','dates=2026-01-05,2026-01-20,2026-02-02; sales=100,200,150','Expected output','2026-01=300, 2026-02=150'],
    'PY-P031':['Sample monthly sales','2026-01=100, 2026-02=120, 2026-03=150','Expected output','changes: NaN, 20, 30'],
    'PY-P032':['Sample sales','[100, 150, 200]','Expected output','[100, 250, 450]'],
    'PY-P033':['Sample sales','[100, 120, 150]','Expected output','NaN, 20%, 25%'],
    'PY-P034':['Sample data','IT salaries=50000,70000; HR salary=65000','Expected output','IT=70000, HR=65000'],
    'PY-P035':['Sample employees','IT A=50000,B=70000; HR C=65000,D=55000','Expected output','B=1, A=2; C=1, D=2'],
    'PY-P036':['Sample salaries','[40000,45000,50000,52000,55000,200000]','Expected output','200000 is detected as an outlier'],
    'PY-P037':['Sample departments','[" IT ", "it", "HR", " hr "]','Expected output','[IT, IT, HR, HR]'],
    'PY-P038':['Sample data','North-A=100, North-B=200, South-A=150','Expected output','pivot: regions as rows, products as columns'],
    'PY-P039':['Sample customer IDs','[1, 2, 2, 3, 3, 3]','Expected output','duplicate IDs 2 and 3'],
    'PY-P040':['Sample orders','order_id=[1,2,3], amount=[100,200,300]','Expected output','total=600, average=200, count=3'],
    'PY-P041':['Sample sentence','"data analysis data python"','Expected output','data=2, analysis=1, python=1'],
    'PY-P042':['Sample list','[10, 40, 20, 40, 30]','Expected output','30'],
    'PY-P043':['Sample nested list','[[1,2],[3,4],[5]]','Expected output','[1, 2, 3, 4, 5]'],
    'PY-P044':['Sample string','"Data Analyst"','Expected output','4 vowels'],
    'PY-P045':['Sample salaries','IT=[50000,80000], HR=[60000,40000]','Expected output','B and C are above their department average'],
    'PY-P046':['Sample salaries','IT=[50000,80000,70000], HR=[60000,55000]','Expected output','IT=70000; HR=55000'],
    'PY-P047':['Sample sales','[100,120,150,180,200]','Expected output','123.33, 150.00, 176.67'],
    'PY-P048':['Sample daily sales','[10,12,11,14,15,13,16,18,17,20]','Expected output','first 7-day average = 13.0'],
    'PY-P049':['Sample purchases','customer 1: 2026-02-01, 2026-01-10; customer 2: 2026-03-02, 2026-02-20','Expected output','customer 1=2026-01-10; customer 2=2026-02-20'],
    'PY-P050':['Sample revenue','A=100, B=300, C=600','Expected output','A=10%, B=30%, C=60%'],
    'PY-P051':['Sample revenue','North A=100,B=250; South A=300,B=200','Expected output','North-B=250; South-A=300'],
    'PY-P052':['Sample sales','North Jan=100,Feb=130; South Jan=200,Feb=180','Expected output','North=+30%; South=-10%'],
    'PY-P053':['Sample orders','customer 1=100+200, customer 2=500, customer 3=50+100','Expected output','customer 2 is above the average customer value'],
    'PY-P054':['Sample daily sales','[100,110,105,60,100]','Expected output','60-sales day is detected as a sudden drop'],
    'PY-P055':['Sample DataFrame columns','existing=[id, sales]; required=[id, sales, date]','Expected output','missing column: date'],
    'PY-P056':['Sample data','IT sales=[100,300]; HR sales=[200]','Expected output','IT range=200; HR range=0'],
    'PY-P057':['Sample data','old_value=[10,20,30]; new_value=[10,25,30]','Expected output','old_value=20 changed to new_value=25'],
    'PY-P058':['Sample data','id=[1,2,2,3]; name=[A,None,B,C]','Expected output','rows=4, null cells=1'],
    'PY-P059':['Sample sales.csv','sales=[100,200,150,300,250]','Expected output','total sales=1000. Put these rows in sales.csv before running.'],
    'PY-P060':['Sample data','customer_id=[1,2,1,3], revenue=[100,200,150,50], visits=[10,20,15,5], orders=[1,1,1,0]','Expected output','revenue=500, unique customers=3, AOV=166.67, conversion=6%']
  };

  function esc(value){
    return String(value ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function forceSample(){
    const title=document.getElementById('title');
    const page=document.getElementById('page');
    if(!title || !page) return;
    const match=title.textContent.match(/PY-P\d{3}/);
    if(!match) return;
    const id=match[0];
    const sample=SAMPLES[id];
    if(!sample) return;
    const card=page.querySelector('.card');
    if(!card) return;
    const meta=card.querySelector('.meta');
    if(!meta) return;
    meta.innerHTML='<strong>'+esc(sample[0])+':</strong> '+esc(sample[1])+'<br><strong>'+esc(sample[2])+':</strong> '+esc(sample[3])+'<br><span>Use this sample data first. You can also test your solution with other valid values.</span>';
    card.dataset.forceSample=id;
  }

  new MutationObserver(forceSample).observe(document.body,{childList:true,subtree:true});
  document.addEventListener('DOMContentLoaded',forceSample);
  setInterval(forceSample,250);
  forceSample();
})();
