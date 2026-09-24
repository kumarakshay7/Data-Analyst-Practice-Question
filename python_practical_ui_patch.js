// Python Practical UI patch
// Keeps Q1/Q2/Q3 labels, removes duplicate Think First card,
// and makes Next navigation independent of the active CSS class.
(() => {
  const page=()=>document.getElementById('page');
  function buttons(){return [...document.querySelectorAll('#nav .qbtn')].filter(b=>getComputedStyle(b).display!=='none'&&!b.disabled)}
  function clean(t){return String(t||'').replace(/^PY-[TP]\d+\s*[·•:\-]\s*/i,'').replace(/^Q\s*\d+\s*[·•:\-]\s*/i,'').replace(/^🧑‍💼\s*/u,'').replace(/^🐍\s*/u,'').trim()}
  function number(){const bs=buttons();const a=bs.findIndex(b=>b.classList.contains('active'));return a>=0?a+1:1}
  function formatHeading(){const q=document.querySelector('#page .question');if(!q)return;const t=clean(q.textContent);if(t)q.textContent=`Q${number()} · 🧑‍💼 ${t}`}
  function removeThink(){document.querySelectorAll('#page .card').forEach(c=>{if(/think first/i.test(c.textContent||''))c.remove()})}
  function styleNext(b){if(!b)return;b.id='nextPythonBtn';b.type='button';b.textContent='Next →';Object.entries({background:'#7c3aed',color:'#fff',border:'0',borderRadius:'8px',padding:'10px 16px',fontWeight:'700',cursor:'pointer'}).forEach(([k,v])=>b.style.setProperty(k,v,'important'));b.onclick=nextQuestion}
  function addNext(){removeThink();let b=document.getElementById('nextPythonBtn');const clear=document.getElementById('clearBtn');if(!clear)return;if(!b){b=document.createElement('button');b.className='btn clear';clear.insertAdjacentElement('afterend',b)}styleNext(b)}
  function nextQuestion(){
    const bs=buttons();if(!bs.length)return;
    const q=document.querySelector('#page .question');
    const currentText=clean(q?.textContent||'');
    let i=bs.findIndex(b=>clean(b.textContent)===currentText);
    if(i<0){const title=document.getElementById('title');i=bs.findIndex(b=>clean(b.textContent)===clean(title?.textContent||''))}
    if(i<0)i=bs.findIndex(b=>b.classList.contains('active'));
    if(i<0)i=0;
    const next=bs[(i+1)%bs.length];if(!next)return;
    next.click();window.scrollTo({top:0,behavior:'smooth'});
    setTimeout(apply,0);setTimeout(apply,80);
  }
  function expand(){if(document.getElementById('fullWidthLayoutFix'))return;const s=document.createElement('style');s.id='fullWidthLayoutFix';s.textContent='.main{max-width:none!important;width:100%!important;margin:0!important}';document.head.appendChild(s)}
  function apply(){removeThink();formatHeading();addNext()}
  function boot(){expand();apply();setTimeout(apply,300);setTimeout(apply,800)}
  document.addEventListener('DOMContentLoaded',boot,{once:true});
  document.addEventListener('click',e=>{if(e.target.closest('.qbtn,#pythonPracticeTab,#pythonTheoryTab')){setTimeout(apply,0);setTimeout(apply,80)}});
  document.getElementById('search')?.addEventListener('input',()=>setTimeout(apply,0));
  document.getElementById('difficulty')?.addEventListener('change',()=>setTimeout(apply,0));
  if(document.readyState!=='loading')boot();
})();
