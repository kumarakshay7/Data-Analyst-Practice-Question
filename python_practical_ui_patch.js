// Python practical UI patch
// - Remove duplicate question card / Think First card.
// - Show sequential Q1, Q2, Q3... in the practical question heading.
// - Remove the internal PY-P001, PY-P002... code from the visible heading.
// - Keep Next button working and use a distinct purple color.
(() => {
  const page = document.getElementById('page');
  if (page) page.setAttribute('data-python-ui-patch', 'safe-v6');

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

  function visibleQuestionButtons(){
    return [...document.querySelectorAll('#nav .qbtn')].filter(btn=>{
      const style=window.getComputedStyle(btn);
      return style.display!=='none' && !btn.disabled;
    });
  }

  function currentQuestionNumber(){
    const buttons=visibleQuestionButtons();
    const activeIndex=buttons.findIndex(btn=>btn.classList.contains('active'));
    return activeIndex>=0 ? activeIndex+1 : 1;
  }

  function cleanQuestionText(text){
    return String(text||'')
      .replace(/^Q\s*\d+\s*[·•:\-]\s*/i,'')
      .replace(/^PY-P\d+\s*[·•:\-]\s*/i,'')
      .replace(/^🧑‍💼\s*/u,'')
      .replace(/^🐍\s*/u,'')
      .trim();
  }

  function formatQuestionHeading(){
    const question=document.querySelector('#page .question');
    if(!question) return;

    const text=cleanQuestionText(question.textContent);
    if(!text) return;

    const wanted=`Q${currentQuestionNumber()} · 🧑‍💼 ${text}`;
    if(question.textContent!==wanted) question.textContent=wanted;
  }

  function removeThinkFirst(){
    document.querySelectorAll('#page .card').forEach(card=>{
      if(/think first/i.test(card.textContent||'')) card.remove();
    });
  }

  function styleNextButton(button){
    if(!button) return;

    button.id='nextPythonBtn';
    button.type='button';
    button.textContent='Next →';

    const styles={
      background:'#7c3aed',
      color:'#ffffff',
      border:'0',
      borderRadius:'8px',
      padding:'10px 16px',
      fontWeight:'700',
      cursor:'pointer',
      transition:'background .15s ease, transform .15s ease'
    };

    Object.entries(styles).forEach(([key,value])=>
      button.style.setProperty(key,value,'important')
    );

    button.onmouseenter=()=>button.style.setProperty('background','#6d28d9','important');
    button.onmouseleave=()=>button.style.setProperty('background','#7c3aed','important');
    button.onmousedown=()=>button.style.setProperty('transform','translateY(1px)','important');
    button.onmouseup=()=>button.style.setProperty('transform','translateY(0)','important');
    button.onclick=nextQuestion;
  }

  function injectNextStyle(){
    let style=document.getElementById('pythonPracticalNextStyle');
    if(!style){
      style=document.createElement('style');
      style.id='pythonPracticalNextStyle';
      document.head.appendChild(style);
    }
    style.textContent=`
      #nextPythonBtn{
        background:#7c3aed !important;
        color:#fff !important;
        border:0 !important;
        border-radius:8px !important;
        padding:10px 16px !important;
        font-weight:700 !important;
        cursor:pointer !important;
      }
      #nextPythonBtn:hover{
        background:#6d28d9 !important;
        color:#fff !important;
      }
    `;
  }

  function addNextButton(){
    removeThinkFirst();
    injectNextStyle();

    const clear=document.getElementById('clearBtn');
    if(!clear) return;

    let button=document.getElementById('nextPythonBtn');
    if(!button){
      button=document.createElement('button');
      button.type='button';
      button.className='btn clear';
      button.textContent='Next →';
      clear.insertAdjacentElement('afterend',button);
    }

    styleNextButton(button);
  }

  function nextQuestion(){
    const buttons=visibleQuestionButtons();
    if(!buttons.length) return;

    const activeIndex=buttons.findIndex(btn=>btn.classList.contains('active'));
    const nextIndex=activeIndex>=0 ? (activeIndex+1)%buttons.length : 0;
    const nextButton=buttons[nextIndex];
    if(!nextButton) return;

    // Use the app's own question-navigation button so all existing rendering
    // and state updates continue to work.
    nextButton.click();
    window.scrollTo({top:0,behavior:'smooth'});

    setTimeout(()=>{
      removeThinkFirst();
      formatQuestionHeading();
      addNextButton();
    },0);
    setTimeout(()=>{
      removeThinkFirst();
      formatQuestionHeading();
    },80);
  }

  function expandMainLayout(){
    if(document.getElementById('fullWidthLayoutFix')) return;
    const style=document.createElement('style');
    style.id='fullWidthLayoutFix';
    style.textContent=`
      .main{
        max-width:none !important;
        width:100% !important;
        margin:0 !important;
      }
    `;
    document.head.appendChild(style);
  }

  function apply(){
    removeThinkFirst();
    formatQuestionHeading();
    addNextButton();
  }

  document.addEventListener('DOMContentLoaded',()=>{
    expandMainLayout();
    apply();
  });

  document.addEventListener('click',event=>{
    if(event.target.closest('.qbtn,#pythonPracticeTab,#pythonTheoryTab')){
      setTimeout(apply,0);
      setTimeout(apply,80);
    }
  });

  document.getElementById('search')?.addEventListener('input',()=>setTimeout(apply,0));
  document.getElementById('difficulty')?.addEventListener('change',()=>setTimeout(apply,0));

  setTimeout(apply,0);
  setTimeout(apply,500);
})();
