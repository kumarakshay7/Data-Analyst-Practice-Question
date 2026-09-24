(() => {
  function filteredQuestions(){
    const search=document.getElementById('search');
    const difficulty=document.getElementById('difficulty');
    const s=(search?.value||'').toLowerCase().trim();
    const d=difficulty?.value||'All';
    return BANK.filter(q =>
      (mode==='practice' ? practicalIds.has(q.n) : !practicalIds.has(q.n)) &&
      (!s || q.title.toLowerCase().includes(s) || q.id.toLowerCase().includes(s)) &&
      (d==='All' || q.difficulty===d)
    );
  }

  function addNextButton(){
    const clear=document.querySelector('#page .buttons .clear');
    if(!clear || document.getElementById('nextQuestionBtn')) return;
    const button=document.createElement('button');
    button.id='nextQuestionBtn';
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
    const index=arr.findIndex(q=>current && q.n===current.n);
    const next=arr[(index+1+arr.length)%arr.length];
    show(next.n);
    window.scrollTo({top:0,behavior:'smooth'});
    setTimeout(addNextButton,0);
  }

  document.addEventListener('click',event=>{
    if(event.target.closest('.qbtn,#practiceTab,#theoryTab')) setTimeout(addNextButton,0);
  });
  document.getElementById('search')?.addEventListener('input',()=>setTimeout(addNextButton,0));
  document.getElementById('difficulty')?.addEventListener('change',()=>setTimeout(addNextButton,0));
  setTimeout(addNextButton,0);
  setTimeout(addNextButton,500);
})();
