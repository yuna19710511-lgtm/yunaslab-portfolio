/* YUNASLAB 만세력 — 화면 배치 전용 스크립트 (2026-11 반응형 개선).
   계산·저장·백업 로직과 무관하며, 태블릿·모바일에서 '저장한 사람' 영역을 접고 펼치는 기능과
   저장 인원 수 표시만 담당합니다. PC(1100px 이상)에서는 항상 펼쳐진 상태로 보입니다. */
'use strict';
(function(){
 const side=document.getElementById('sidebar'),btn=document.getElementById('side-toggle'),
       people=document.getElementById('people'),count=document.getElementById('people-count');
 if(!side||!btn||!people)return;
 function setOpen(open){side.classList.toggle('is-open',open);btn.setAttribute('aria-expanded',String(open));}
 btn.addEventListener('click',()=>setOpen(!side.classList.contains('is-open')));
 function updateCount(){
  let n=0;
  try{const list=JSON.parse(localStorage.getItem('yunaslab_manse_2026_people_v1')||'[]');n=Array.isArray(list)?list.length:0;}
  catch(e){n=people.querySelectorAll('.person-card').length;}
  if(count)count.textContent=n+'명';
 }
 new MutationObserver(updateCount).observe(people,{childList:true});
 updateCount();
})();
