/* YUNASLAB 2026 / NEW Manse UI — separate responsive user experience.
 * Calendar and 24-season calculation uses the existing 1900–2099 reference tables.
 * Interpretations explicitly provide learning perspectives, not determined forecasts. */
'use strict';
const MKEY='yunaslab_manse_2026_people_v1';
const $=id=>document.getElementById(id);
const htm=s=>String(s??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
let personId=null,current=null, currentYear=2026;
const EL_NAMES={'木':'목','火':'화','土':'토','金':'금','水':'수'};
const EL_THOUGHT={'木':'성장·확장·계획·시작','火':'표현·열정·활동·드러남','土':'안정·현실·조율·버팀','金':'판단·기준·결단·정리','水':'생각·정보·유연·감수성'};
const STEM_KR={'甲':'갑','乙':'을','丙':'병','丁':'정','戊':'무','己':'기','庚':'경','辛':'신','壬':'임','癸':'계'};
const BRANCH_KR={'子':'자','丑':'축','寅':'인','卯':'묘','辰':'진','巳':'사','午':'오','未':'미','申':'신','酉':'유','戌':'술','亥':'해'};
function pair(p){return p?`${p.stem}${p.branch}`:'—'}
function pairKo(p){return p?`${STEM_KR[p.stem]}${BRANCH_KR[p.branch]}`:'—'}
function cleanInt(id){return Number($(id).value)}
function solarValid(y,m,d){let dt=new Date(Date.UTC(y,m-1,d));return dt.getUTCFullYear()===y&&dt.getUTCMonth()===m-1&&dt.getUTCDate()===d}
function readBirth(){
 const name=$('name').value.trim(),calendar=$('calendar').value,gender=$('gender').value,
       y=cleanInt('year'),m=cleanInt('month'),d=cleanInt('day'),unknown=$('time-unknown').checked;
 if(!name)throw new Error('이름을 입력해 주세요.');
 if(!Number.isInteger(y)||y<1901||y>2099||!Number.isInteger(m)||m<1||m>12||!Number.isInteger(d)||d<1||d>31)throw new Error('1901~2099년의 올바른 날짜를 입력해 주세요.');
 const clock=$('birth-time').value||'12:00',parts=clock.split(':').map(Number);
 if(parts.length<2||!Number.isInteger(parts[0])||parts[0]<0||parts[0]>23||!Number.isInteger(parts[1])||parts[1]<0||parts[1]>59)throw new Error('출생 시간을 올바르게 선택해 주세요.');
 const leap=calendar==='음력'&&$('is-leap').value==='yes';
 if(calendar==='양력'&&!solarValid(y,m,d))throw new Error('존재하지 않는 양력 날짜입니다.');
 if(calendar==='음력'){
   const lm=leapMonth(y); if(leap&&lm!==m)throw new Error(`${y}년 음력 ${m}월은 윤달이 아닙니다.`);
   const max=leap?leapDays(y):monthDays(y,m); if(d>max)throw new Error(`해당 음력 월은 ${max}일까지입니다.`);
 }
 return {name,gender,calendar,y,m,d,leap,clock,unknown};
}
function evaluate(person){
 let {y,m,d}=person;
 if(person.calendar==='음력')({y,m,d}=lunarToSolar(y,m,d,person.leap));
 if(!solarValid(y,m,d))throw new Error('날짜 변환 결과가 유효하지 않습니다.');
 const [hh,mi]=person.clock.split(':').map(Number),hour=person.unknown?12:hh;
 const pillars=calcPillars(y,m,d,hour,mi),element=elementCounts(pillars);
 if(person.unknown) {element[STEM_EL[STEMS.indexOf(pillars.hour.stem)]]--;element[BRANCH_EL[pillars.hour.branch]]--;}
 const dae=calcDaewoon(pillars,person.gender,y,m,d,hour,mi);
 return {person,solar:{y,m,d},hour,mi,pillars,element,dae};
}
function status(message,error=false){$('status').textContent=message;$('status').style.color=error?'#ffc3c8':'#c7efd9'}
function monthSeason(monthBranch){
 const z={寅:'초봄, 성장의 시작',卯:'봄, 확장되는 시기',辰:'봄에서 여름으로 넘어가는 전환기',巳:'초여름, 활동의 상승',午:'한여름, 열기가 강한 시기',未:'늦여름, 계절의 전환',申:'초가을, 수렴의 시작',酉:'가을, 정리의 시기',戌:'가을에서 겨울로 넘어가는 전환기',亥:'초겨울, 수렴과 축적',子:'한겨울, 저장의 계절',丑:'늦겨울, 다음 계절을 준비하는 시기'}; return z[monthBranch]||'계절의 흐름';
}
function elementsSentence(ctx){
 const list=Object.entries(ctx.element),zero=list.filter(x=>x[1]===0).map(x=>`${EL_NAMES[x[0]]}(${x[0]})`),max=[...list].sort((a,b)=>b[1]-a[1])[0];
 const intro=`사주의 겉에 드러난 글자 ${ctx.person.unknown?'6':'8'}개를 단순히 세면, ${EL_NAMES[max[0]]}(${max[0]}) 기운이 가장 많이 나타납니다. `;
 return intro+(zero.length?`표면에 나타나지 않은 오행은 ${zero.join(', ')}이지만, 이를 성향이 없다는 의미로 해석하면 안 됩니다. `:'다섯 기운의 개수만으로 길흉이나 강약을 확정할 수는 없습니다. ')+`생활에서 균형을 생각할 때는 성장·표현·안정·판단·휴식의 활동을 고르게 살펴보세요.`;
}
function classicsView(c){
 const ds=c.pillars.day.stem,month=c.pillars.month,dayStemElement=STEM_EL[STEMS.indexOf(ds)];
 const primaryG=tenGod(ds,c.pillars.month.stem),season=monthSeason(month.branch);
 const compare=c.pillars.year.branch===c.pillars.month.branch?'연지와 월지가 같은 지지를 갖습니다.':'연지와 월지가 달라 서로 다른 배경과 환경의 상징을 보여줍니다.';
 return [
 ['연해자평','일간·십성·생극 관계',`일간은 ${ds}(${STEM_KR[ds]})으로 ${EL_NAMES[dayStemElement]}에 속합니다. 월간과의 관계는 ${primaryG}(${GOD_SHORT[primaryG]||'십성 관계'})입니다. 이를 ‘나와 환경이 어떤 관계를 맺는가’라는 관점에서 살펴볼 수 있습니다.`],
 ['삼명통회','년·월·일·시의 구조',`연주 ${pair(c.pillars.year)}, 월주 ${pair(month)}, 일주 ${pair(c.pillars.day)}${c.person.unknown?'이며 시주는 미상입니다.':`, 시주 ${pair(c.pillars.hour)}입니다.`} ${compare} 각 기둥을 따로 단정하지 않고 전체 배치와 관계로 읽어 봅니다.`],
 ['적천수','오행의 기세와 흐름',`월지는 ${month.branch}이고, ${season}입니다. 오행 구성에서는 ${EL_NAMES[Object.entries(c.element).sort((a,b)=>b[1]-a[1])[0][0]]}이 상대적으로 두드러집니다. 개수만으로 신강·신약을 결론 내리기보다, 상생·상극과 계절에 따라 기운이 어떻게 이동하는지 검토하는 관점입니다.`],
 ['자평진전','월령·격국을 살피는 관점',`월주 ${pair(month)}를 출발점으로, 월지 ${month.branch}의 계절적 영향과 월간의 십성 ${primaryG}를 봅니다. 정확한 격국 판별에는 지장간·투출·합충·통근 등을 함께 검토해야 하므로 여기서는 격국을 확정하지 않습니다.`],
 ['궁통보감','조후 · 한난조습',`일간 ${ds}(${STEM_KR[ds]})가 ${season}에 태어난 것으로 계산됩니다. 그 계절의 추위·열기·건조·습함을 살펴 균형을 이해하는 조후의 시각을 제공합니다. 정확한 조후용신은 별도의 정밀 명식 분석이 필요합니다.`]
 ];
}
function renderResults(c){
 current=c;const {person,solar,pillars:p}=c;
 $('date-info').textContent=`${solar.y}.${String(solar.m).padStart(2,'0')}.${String(solar.d).padStart(2,'0')} 양력 · ${person.unknown?'시간 미상':person.clock+' (KST)'}`;
 const slots=[['시주',person.unknown?null:p.hour],['일주',p.day],['월주',p.month],['연주',p.year]];
 $('pillars').innerHTML=slots.map(([label,x])=>`<article class="pillar ${x?'':'unknown'}"><header>${label}</header><div class="god${label==='일주'?' self':''}">${label==='일주'?'일간 · 나':x?tenGod(p.day.stem,x.stem):'—'}</div><div class="hanja stem">${x?x.stem:'?'}</div><div class="hanja branch">${x?x.branch:'?'}</div><footer>${x?pairKo(x):'시각 미상'}</footer></article>`).join('');
 $('elements').innerHTML=['木','火','土','金','水'].map(el=>`<article class="element"><b>${el}</b><span>${EL_NAMES[el]} ${c.element[el]}</span><div class="bar"><div class="fill" style="width:${c.element[el]/(person.unknown?6:8)*100}%"></div></div><small>${EL_THOUGHT[el]}</small></article>`).join('');
 $('overview').textContent=elementsSentence(c);
 $('classics').innerHTML=classicsView(c).map(([title,subtitle,description])=>`<article class="classic-card"><h3>《${title}》</h3><small>${subtitle}</small><p>${htm(description)}</p></article>`).join('');
 $('dae-info').textContent=`${c.dae.forward?'순행':'역행'} · 시작 나이 약 ${c.dae.startAge.toFixed(1)}세 (절기 근사)`;
 const now=(new Date()).getFullYear();currentYear=now;
 $('dae-list').innerHTML=c.dae.arr.map((x,i)=>`<button type="button" class="cycle" data-dae="${i}" aria-pressed="${i===0}"><small>약 ${x.age.toFixed(1)}세~</small><strong>${pair(x)}</strong><small>${pairKo(x)}</small></button>`).join('');
 $('year-list').innerHTML=Array.from({length:13},(_,i)=>now-5+i).map(y=>`<button class="cycle" type="button" data-year="${y}" aria-pressed="${y===now}"><small>${y}년</small><strong>${pair(yearPillar(y))}</strong><small>${pairKo(yearPillar(y))}</small></button>`).join('');
 selectDae(0);selectYear(now);$('result').hidden=false;
 $('result').scrollIntoView({behavior:'smooth',block:'start'});
}
function activate(selector,attribute,value){document.querySelectorAll(selector).forEach(b=>b.setAttribute('aria-pressed',String(b.getAttribute(attribute)===String(value))))}
function describeCycle(ganji,ds,label){const g=tenGod(ds,ganji.stem);return `${label}은 ${pair(ganji)}(${pairKo(ganji)})입니다. 일간과 천간의 관계는 ${g}이며, 전통 명리에서는 ${GOD_SHORT[g]||'서로 다른 기운'}이라는 상징으로 해석합니다. 실제 삶의 선택이나 미래를 확정하는 예언이 아니라, 시기별 주제를 돌아보는 참고 자료로 보세요.`}
function selectDae(index){if(!current)return;const x=current.dae.arr[index];$('dae-detail').textContent=`약 ${x.age.toFixed(1)}세부터 10년간의 대운. `+describeCycle(x,current.pillars.day.stem,'이 대운의 간지');activate('[data-dae]','data-dae',index)}
function monthFor(y,cal){let monthNo=cal===1?12:cal-1;let yp=yearPillar(cal===1?y-1:y);const tiger=mod((STEMS.indexOf(yp.stem)%5)*2+2,10);return {stem:STEMS[mod(tiger+monthNo-1,10)],branch:BRANCHES[mod(2+monthNo-1,12)]}}
function selectYear(y){if(!current)return;currentYear=y;$('year-detail').textContent=describeCycle(yearPillar(y),current.pillars.day.stem,`${y}년의 세운`);$('month-year').textContent=`${y}년의 월운 (절기 기준 근사)`;activate('[data-year]','data-year',y);
 $('month-list').innerHTML=Array.from({length:12},(_,i)=>i+1).map(m=>`<button type="button" class="cycle" data-month="${m}" aria-pressed="${m===1}"><small>${m}월</small><strong>${pair(monthFor(y,m))}</strong><small>${pairKo(monthFor(y,m))}</small></button>`).join(''); selectMonth(1);}
function selectMonth(m){if(!current)return;const p=monthFor(currentYear,m);$('month-detail').textContent=describeCycle(p,current.pillars.day.stem,`${currentYear}년 ${m}월의 월운`)+ ' 월 구분은 달력 1일이 아니라 절입일을 기준으로 달라질 수 있습니다.';activate('[data-month]','data-month',m)}
function loadPeople(){try{const list=JSON.parse(localStorage.getItem(MKEY)||'[]');return Array.isArray(list)?list.filter(x=>x&&typeof x.name==='string'&&typeof x.id==='string').slice(0,1000):[]}catch(e){return []}}
function storePeople(people){localStorage.setItem(MKEY,JSON.stringify(people))}
function renderPeople(){let q=$('person-search').value.trim().toLowerCase(),people=loadPeople().filter(x=>x.name.toLowerCase().includes(q));$('people').innerHTML=people.length?people.map(x=>`<button type="button" class="person-card ${x.id===personId?'active':''}" data-person="${htm(x.id)}"><b>${htm(x.name)}</b><small>${htm(x.y)}.${htm(x.m)}.${htm(x.d)} · ${htm(x.calendar)}</small></button>`).join(''):'<p class="muted">저장된 사람이 없습니다.</p>'}
function setForm(p){$('name').value=p.name;$('gender').value=p.gender;$('calendar').value=p.calendar;$('year').value=p.y;$('month').value=p.m;$('day').value=p.d;$('is-leap').value=p.leap?'yes':'no';$('birth-time').value=p.clock||'12:00';$('time-unknown').checked=!!p.unknown;toggleFields()}
function newPerson(){personId=null;$('name').value='';$('gender').value='여';$('calendar').value='양력';$('is-leap').value='no';$('year').value='1990';$('month').value='1';$('day').value='1';$('birth-time').value='12:00';$('time-unknown').checked=false;$('result').hidden=true;toggleFields();renderPeople();status('새 사람 입력 상태입니다. 기존 저장 인물은 그대로 유지됩니다.');$('name').focus()}
function analyze(){try{const p=readBirth();renderResults(evaluate(p));status('사주 원국과 대운·세운·월운을 계산했어요.')}catch(e){status(e.message,true)}}
function addPerson(){try{const p=readBirth();evaluate(p);const all=loadPeople();let id=(globalThis.crypto&&crypto.randomUUID)?crypto.randomUUID():String(Date.now())+'-'+Math.random().toString(16).slice(2);all.push({...p,id});storePeople(all);personId=id;renderPeople();status(`${p.name}님을 새 인물로 저장했어요. 기존 인물은 변경하지 않았어요.`)}catch(e){status(e.message,true)}}
function updatePerson(){if(!personId){status('먼저 왼쪽에서 수정할 사람을 선택해 주세요.',true);return;}try{const p=readBirth();evaluate(p);const all=loadPeople(),index=all.findIndex(x=>x.id===personId);if(index<0)throw new Error('선택한 저장 정보를 찾지 못했습니다.');if(!confirm(`${all[index].name}님의 저장 정보를 지금 입력으로 덮어쓸까요?`))return;all[index]={...p,id:personId};storePeople(all);renderPeople();status('선택한 인물만 업데이트했어요.')}catch(e){status(e.message,true)}}
function deletePerson(){if(!personId){status('먼저 삭제할 사람을 선택해 주세요.',true);return;}const all=loadPeople(),selected=all.find(x=>x.id===personId);if(!selected)return;if(!confirm(`${selected.name}님을 삭제할까요? 이 작업은 되돌릴 수 없어요.`))return;if(!confirm('한 번 더 확인: 정말 삭제하겠어요?'))return;storePeople(all.filter(x=>x.id!==personId));personId=null;renderPeople();status('선택 인물만 삭제했어요. 다른 인물은 그대로 있습니다.')}
function downloadBackup(){const list=loadPeople(),blob=new Blob([JSON.stringify({format:'yunaslab-manse-2026',version:1,people:list},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='YUNASLAB_만세력_백업_'+new Date().toISOString().slice(0,10)+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status(`${list.length}명 백업 파일을 만들었어요.`)}
async function importBackup(e){const file=e.target.files?.[0];if(!file)return;try{if(file.size>5_000_000)throw new Error('백업 파일이 너무 큽니다.');const parsed=JSON.parse(await file.text());if(parsed?.format!=='yunaslab-manse-2026'||!Array.isArray(parsed.people))throw new Error('지원되는 YUNASLAB 백업 파일이 아닙니다.');if(parsed.people.length>1000)throw new Error('백업 인원 수가 너무 많습니다.');const old=loadPeople(),existing=new Set(old.map(x=>x.id)),incoming=[];for(const p of parsed.people){const test={...p};delete test.id;for(const key of ['name','gender','calendar','y','m','d','clock'])if(test[key]===undefined)throw new Error('필수 출생 정보가 없는 백업입니다.');evaluate(test);let id=String(p.id||'');if(!id||existing.has(id))id='i_'+Date.now()+'_'+Math.random().toString(36).slice(2);existing.add(id);incoming.push({...test,id})}if(!confirm(`현재 저장된 ${old.length}명은 보존하고 백업의 ${incoming.length}명을 추가할까요?`))return;storePeople([...old,...incoming]);renderPeople();status('백업을 가져왔어요. 기존 저장 인물은 덮어쓰지 않았어요.')}catch(err){status(err.message,true)}finally{e.target.value=''}}
function toggleFields(){$('leap-label').hidden=$('calendar').value!=='음력';$('birth-time').disabled=$('time-unknown').checked}
$('birth-form').addEventListener('submit',e=>{e.preventDefault();analyze()});
$('calendar').addEventListener('change',toggleFields);$('time-unknown').addEventListener('change',toggleFields);
$('save-person').addEventListener('click',addPerson);$('update-person').addEventListener('click',updatePerson);
$('new-person').addEventListener('click',newPerson);$('delete-person').addEventListener('click',deletePerson);
$('export-json').addEventListener('click',downloadBackup);$('import-json').addEventListener('change',importBackup);
$('person-search').addEventListener('input',renderPeople);
$('people').addEventListener('click',e=>{const b=e.target.closest('[data-person]');if(!b)return;const p=loadPeople().find(x=>x.id===b.dataset.person);if(!p)return;personId=p.id;setForm(p);renderPeople();analyze()});
document.addEventListener('click',e=>{let b=e.target.closest('[data-dae]');if(b)return selectDae(Number(b.dataset.dae));b=e.target.closest('[data-year]');if(b)return selectYear(Number(b.dataset.year));b=e.target.closest('[data-month]');if(b)return selectMonth(Number(b.dataset.month));});
toggleFields();renderPeople();

/* v6: Keep left archive panel bottom aligned to the entry panel bottom on desktop. */
function alignArchivePanel(){
 const sidebar=document.querySelector('.sidebar'), entry=document.querySelector('.entry');
 if(!sidebar||!entry)return;
 if(window.innerWidth<=720){sidebar.style.height='';return;}
 sidebar.style.height='';
 const offset=Math.round(entry.getBoundingClientRect().bottom-sidebar.getBoundingClientRect().top);
 const needed=sidebar.scrollHeight;
 sidebar.style.height=Math.max(needed,offset)+'px';
}
window.addEventListener('resize',alignArchivePanel,{passive:true});
window.addEventListener('load',alignArchivePanel);
requestAnimationFrame(alignArchivePanel);
