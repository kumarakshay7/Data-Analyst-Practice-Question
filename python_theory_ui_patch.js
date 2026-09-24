(() => {
  function page(){ return document.getElementById('page'); }
  function buttons(){ return [...document.querySelectorAll('#nav .qbtn')].filter(b=>getComputedStyle(b).display!=='none'&&!b.disabled); }
  function clean(t){ return String(t||'').replace(/^PY-[TP]\d+\s*[·•:\-]\s*/i,'').replace(/^Q\s*\d+\s*[·•:\-]\s*/i,'').replace(/^🧑‍💼\s*/u,'').replace(/^🐍\s*/u,'').trim(); }
  function formatNav(){ buttons().forEach((b,i)=>{ const t=clean(b.textContent); const w=`Q${i+1} · ${t}`; if(t&&b.textContent!==w)b.textContent=w; }); }
  function formatTitle(){ const title=document.getElementById('title'); if(!title)return; const bs=buttons(); const active=bs.findIndex(b=>b.classList.contains('active')); const n=active>=0?active+1:1; const t=clean(bs[n-1]?.textContent||title.textContent); if(t&&!/^Python Theory Questions$/i.test(t)) title.textContent=`Q${n} · 🧑‍💼 ${t}`; }
  function removeDuplicate(){ const root=page(); if(!root)return; [...root.children].filter(x=>x.classList?.contains('card')&&x.querySelector('.question')).forEach(x=>x.remove()); }
  function interviewCard(){ const root=page(); if(!root)return null; return [...root.children].find(c=>c.classList?.contains('card')&&[...c.querySelectorAll('h3')].some(h=>/interview answer/i.test(h.textContent)))||null; }
  function styleNext(b){ if(!b)return; b.id='pythonTheoryNextBtn'; b.type='button'; b.textContent='Next →'; Object.entries({background:'#7c3aed',color:'#fff',border:'0',borderRadius:'8px',padding:'10px 16px',fontWeight:'700',cursor:'pointer'}).forEach(([k,v])=>b.style.setProperty(k,v,'important')); b.onclick=nextQuestion; }
  function addNext(){ const card=interviewCard(); if(!card)return; let b=card.querySelector('#pythonTheoryNextBtn'); if(!b){ const wrap=document.createElement('div'); wrap.className='python-theory-next-wrap'; wrap.style.cssText='display:flex;justify-content:flex-end;margin-top:16px;width:100%'; b=document.createElement('button'); wrap.appendChild(b); card.appendChild(wrap); } styleNext(b); }
  function nextQuestion(){
    const bs=buttons(); if(!bs.length)return;
    const title=document.getElementById('title');
    const currentText=clean(title?.textContent||'');
    let i=bs.findIndex(b=>clean(b.textContent)===currentText);
    if(i<0)i=bs.findIndex(b=>b.classList.contains('active'));
    if(i<0)i=0;
    const next=bs[(i+1)%bs.length];
    if(!next)return;
    next.click();
    window.scrollTo({top:0,behavior:'smooth'});
    setTimeout(apply,0); setTimeout(apply,80);
  }
  function apply(){ removeDuplicate(); formatNav(); formatTitle(); addNext(); }
  function boot(){ const timer=setInterval(()=>{ if(page()&&document.querySelector('#nav .qbtn')){clearInterval(timer); const root=page(); if(!root.dataset.pythonTheoryPatchAttached){root.dataset.pythonTheoryPatchAttached='true'; let scheduled=false; new MutationObserver(()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;apply();});}).observe(root,{childList:true,subtree:true});} apply(); } },100); setTimeout(()=>clearInterval(timer),15000); }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
