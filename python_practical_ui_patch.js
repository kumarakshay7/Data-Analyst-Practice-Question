// Python practical UI patch
// Sample rendering is handled by python_samples_force_fix.js.
// This file intentionally avoids a MutationObserver to keep question navigation responsive.
(() => {
  const page = document.getElementById('page');
  if (page) page.setAttribute('data-python-ui-patch', 'safe-v3');

  function filteredQuestions(){
    const search=document.getElementById('search');
    const difficulty=document.getElementById('difficulty');
    const s=(search?.value||'').toLowerCase().trim();
    const d=difficulty?.value||'All';
    const list=window.PYTHON_PRACTICAL?.list||[];
    return list.filter(q =>
      (!s || q[0].toLowerCase().includes(s) || q[1].toLowerCase().includes(s)) &&
      (d==='All' || q[2]===d)
    );
  }

  function addNextButton(){
    const clear=document.getElementById('clearBtn');
    if(!clear || document.getElementById('nextPythonBtn')) return;
    const button=document.createElement('button');
    button.id='nextPythonBtn';
    button.type='button';
    button.className='btn clear';
    button.textContent='Next →';
    button.title='Open the next question';
    button.onclick=nextQuestion;
    clear.insertAdjacentElement('afterend',button);
  }

  function nextQuestion(){
    const arr=filteredQuestions();
    if(!arr.length) return;
    const active=document.querySelector('#nav .qbtn.active');
    const currentId=active ? active.textContent.split(' · ')[0].trim() : '';
    const index=arr.findIndex(q=>q[0]===currentId);
    const next=arr[(index+1+arr.length)%arr.length];
    const nextButton=[...document.querySelectorAll('#nav .qbtn')].find(b=>b.textContent.startsWith(next[0]+' · '));
    if(nextButton) nextButton.click();
    window.scrollTo({top:0,behavior:'smooth'});
    setTimeout(addNextButton,0);
  }

  document.addEventListener('click',event=>{
    if(event.target.closest('.qbtn,#pythonPracticeTab,#pythonTheoryTab')) setTimeout(addNextButton,0);
  });
  document.getElementById('search')?.addEventListener('input',()=>setTimeout(addNextButton,0));
  document.getElementById('difficulty')?.addEventListener('change',()=>setTimeout(addNextButton,0));
  setTimeout(addNextButton,0);
  setTimeout(addNextButton,500);
})();
