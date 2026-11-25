/* YUNASLAB 명리 계산 모듈 v1.0. 기존 계산 함수와 표 데이터를 새 UI에서 재검증하여 사용. 절기 근사값, KST 기준. */
const STEMS=['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const BRANCHES=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const STEM_EL=['木','木','火','火','土','土','金','金','水','水'];
const STEM_YIN=[false,true,false,true,false,true,false,true,false,true];
const BRANCH_MAIN_STEM={子:'癸',丑:'己',寅:'甲',卯:'乙',辰:'戊',巳:'丙',午:'丁',未:'己',申:'庚',酉:'辛',戌:'戊',亥:'壬'};
const BRANCH_EL={子:'水',丑:'土',寅:'木',卯:'木',辰:'土',巳:'火',午:'火',未:'土',申:'金',酉:'金',戌:'土',亥:'水'};
const EL_CLASS={'木':'element-wood','火':'element-fire','土':'element-earth','金':'element-metal','水':'element-water'};
const STERM=[0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758];

const LUNAR_INFO=[
0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,0x06ca0,0x0b550,0x15355,0x04da0,0x0a5d0,0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0,0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b5a0,0x195a6,0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x05ac0,0x0ab60,0x096d5,0x092e0,0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,0x14b63,0x09370,0x049f8,0x04970,0x064b0,0x168a6,0x0ea50,0x06b20,0x1a6c4,0x0aae0,0x0a2e0,0x0d2e3,0x0c960,0x0d557,0x0d4a0,0x0da50,0x05d55,0x056a0,0x0a6d0,0x055d4,0x052d0,0x0a9b8,0x0a950,0x0b4a0,0x0b6a6,0x0ad50,0x055a0,0x0aba4,0x0a5b0,0x052b0,0x0b273,0x06930,0x07337,0x06aa0,0x0ad50,0x14b55,0x04b60,0x0a570,0x054e4,0x0d160,0x0e968,0x0d520,0x0daa0,0x16aa6,0x056d0,0x04ae0,0x0a9d4,0x0a2d0,0x0d150,0x0f252,0x0d520
];

const GOD_SHORT={
 '비견':'독립심·동료','겁재':'경쟁심·승부욕','식신':'꾸준한 생산력','상관':'표현력·아이디어',
 '편재':'기회·사업감각','정재':'안정적 돈관리','편관':'압박·실행력','정관':'책임·직장·신뢰',
 '편인':'직감·독창적 학습','정인':'배움·문서·지원'
};
const GOD_LONG={
 '비견':'나와 비슷한 사람, 동료, 독립심을 뜻합니다. 스스로 결정하고 자기 방식대로 해내려는 힘으로 볼 수 있습니다. 많다고 무조건 고집이 세다는 뜻은 아니며, 협업에서 주도권을 어떻게 나누는지가 중요합니다.',
 '겁재':'경쟁심, 승부욕, 빠른 행동, 사람과 돈을 나누는 문제를 상징합니다. 경쟁 상황에서 추진력으로 나타날 수 있지만, 급하게 결정하거나 자원을 과하게 쓰는 모습으로 나타날 수도 있습니다.',
 '식신':'꾸준히 만들고 일하는 힘, 생활력, 실무 능력, 표현을 뜻합니다. 말 그대로 “계속 생산해내는 힘”에 가깝고, 결과물을 차근차근 만드는 사람에게 잘 드러납니다.',
 '상관':'아이디어, 표현력, 비판적 사고, 기존 틀을 깨는 힘을 뜻합니다. 창의성과 문제 제기에 강하지만, 답답한 규칙이나 권위에 민감하게 반응하는 모습으로도 나타날 수 있습니다.',
 '편재':'기회를 잡는 돈, 사업·거래 감각, 외부 활동을 뜻합니다. 월급처럼 정해진 돈보다 사람·시장·거래·새로운 기회를 통해 움직이는 현실 감각에 가깝습니다.',
 '정재':'꾸준히 버는 돈, 예산, 저축, 생활 관리, 현실적인 자원 관리를 뜻합니다. 안정적인 수입과 지출 관리처럼 “생활을 굴러가게 하는 돈의 감각”으로 보면 이해하기 쉽습니다.',
 '편관':'경쟁, 압박, 책임, 위기 대응을 뜻합니다. 부담이 있는 상황에서도 행동하게 만드는 힘으로 볼 수 있으며, 과하면 스트레스나 긴장감으로 느껴질 수 있습니다.',
 '정관':'직장, 규칙, 책임감, 사회적 평판과 신뢰를 뜻합니다. 약속을 지키고 맡은 역할을 제대로 해내려는 성향과 연결해 볼 수 있습니다.',
 '편인':'직감, 독창적인 관점, 혼자 깊게 파고드는 공부를 뜻합니다. 정해진 방식보다 자신만의 방식으로 이해하려는 성향과 연결되며, 생각이 많아지면 실행이 늦어질 수도 있습니다.',
 '정인':'배움, 자격, 문서, 보호, 도움을 받는 힘을 뜻합니다. 정석적인 공부, 자료 정리, 자격증, 누군가의 지원이나 조언과 연결해서 해석합니다.'
};
const STEM_MEANING={
 '甲':'큰 나무처럼 곧고 추진력이 있는 편','乙':'화초처럼 유연하고 관계 감각이 섬세한 편',
 '丙':'태양처럼 표현력이 크고 분위기를 밝히는 편','丁':'촛불처럼 집중력이 있고 감정의 결을 세밀하게 보는 편',
 '戊':'큰 산처럼 안정과 책임을 중시하는 편','己':'밭흙처럼 실용적이고 돌봄·관리 능력이 좋은 편',
 '庚':'큰 쇠처럼 결단력과 직선성이 강한 편','辛':'보석처럼 기준이 분명하고 디테일과 완성도를 중시하는 편',
 '壬':'큰물처럼 시야가 넓고 변화 대응력이 좋은 편','癸':'비나 이슬처럼 관찰력·감수성·정보 수집력이 섬세한 편'
};
const ELEMENT_RECS={
 '木':'장기 계획을 세우거나, 새로운 공부·취미·프로젝트를 시작해보세요. “조금씩 성장시키는 일”을 생활에 넣는 방식이 잘 맞습니다.',
 '火':'말하기·발표·창작·운동처럼 에너지를 밖으로 표현하는 활동을 늘려보세요. 사람들과 교류하거나 햇빛을 받으며 움직이는 것도 도움이 됩니다.',
 '土':'규칙적인 생활, 일정 관리, 예산 정리, 정리정돈처럼 생활의 기반을 잡는 습관을 만들어보세요. 급한 결정보다 한 번 점검하는 습관도 좋습니다.',
 '金':'우선순위를 정하고, 불필요한 것을 정리하고, “내 기준”을 문장으로 만들어보세요. 결정할 때 체크리스트를 쓰는 방식도 도움이 됩니다.',
 '水':'충분히 생각할 시간, 독서·정보 탐색, 기록, 휴식을 확보해보세요. 한 가지 방법만 고집하기보다 상황에 맞게 바꾸는 연습도 좋습니다.'
};


function mod(n,m){return ((n%m)+m)%m}
function leapMonth(y){return LUNAR_INFO[y-1900]&0xf}
function leapDays(y){return leapMonth(y)?((LUNAR_INFO[y-1900]&0x10000)?30:29):0}
function monthDays(y,m){return (LUNAR_INFO[y-1900]&(0x10000>>m))?30:29}
function lunarYearDays(y){let sum=348;for(let i=0x8000;i>0x8;i>>=1)sum+=(LUNAR_INFO[y-1900]&i)?1:0;return sum+leapDays(y)}
function lunarToSolar(y,m,d,isLeap){
  if(y<1900||y>2100)throw new Error('음력 변환은 1900~2100년까지 지원합니다.');
  let offset=0;for(let yy=1900;yy<y;yy++)offset+=lunarYearDays(yy);
  const lm=leapMonth(y);for(let mm=1;mm<m;mm++){offset+=monthDays(y,mm);if(mm===lm)offset+=leapDays(y)}
  if(isLeap){if(lm!==m)throw new Error('해당 월은 윤달이 아닙니다.');offset+=monthDays(y,m)}
  offset+=d-1;const dt=new Date(Date.UTC(1900,0,31)+offset*86400000);
  return {y:dt.getUTCFullYear(),m:dt.getUTCMonth()+1,d:dt.getUTCDate()}
}
function termUTC(y,n){return Date.UTC(1900,0,6,2,5)+31556925974.7*(y-1900)+STERM[n]*60000}
function relationElement(dayEl,otherEl){
  const gen={'木':'火','火':'土','土':'金','金':'水','水':'木'},ctl={'木':'土','土':'水','水':'火','火':'金','金':'木'};
  if(dayEl===otherEl)return'same';if(gen[dayEl]===otherEl)return'output';if(gen[otherEl]===dayEl)return'resource';
  if(ctl[dayEl]===otherEl)return'wealth';if(ctl[otherEl]===dayEl)return'officer';
}
function tenGod(dayStem,otherStem){
  const di=STEMS.indexOf(dayStem),oi=STEMS.indexOf(otherStem),rel=relationElement(STEM_EL[di],STEM_EL[oi]),same=STEM_YIN[di]===STEM_YIN[oi];
  if(rel==='same')return same?'비견':'겁재';if(rel==='output')return same?'식신':'상관';if(rel==='wealth')return same?'편재':'정재';
  if(rel==='officer')return same?'편관':'정관';if(rel==='resource')return same?'편인':'정인';return'-';
}

function calcPillars(y,m,d,h,min){
  const instant=Date.UTC(y,m-1,d,h-9,min),lichun=termUTC(y,2),pillarYear=instant<lichun?y-1:y,yearIdx=mod(pillarYear-4,60);
  let monthNo;
  if(instant<termUTC(y,2)){if(instant>=termUTC(y,0))monthNo=12;else if(instant>=termUTC(y-1,22))monthNo=11;else monthNo=10}
  else{monthNo=1;for(let no=1;no<=11;no++){const ti=2+(no-1)*2;if(instant>=termUTC(y,ti))monthNo=no}}
  const ys=yearIdx%10,tiger=mod((ys%5)*2+2,10),ms=mod(tiger+monthNo-1,10),mb=mod(2+monthNo-1,12);
  const day0=Date.UTC(1900,0,31),offset=Math.floor((Date.UTC(y,m-1,d)-day0)/86400000),dayIdx=mod(offset+40,60),ds=dayIdx%10,db=dayIdx%12;
  const hb=mod(Math.floor((h+1)/2),12),hs=mod((ds%5)*2+hb,10);
  return {
    year:{stem:STEMS[yearIdx%10],branch:BRANCHES[yearIdx%12]},
    month:{stem:STEMS[ms],branch:BRANCHES[mb]},
    day:{stem:STEMS[ds],branch:BRANCHES[db]},
    hour:{stem:STEMS[hs],branch:BRANCHES[hb]}
  }
}
function calcDaewoon(chart,gender,y,m,d,h,min){
  const yearStemIdx=STEMS.indexOf(chart.year.stem),yang=!STEM_YIN[yearStemIdx],forward=(gender==='남'&&yang)||(gender==='여'&&!yang);
  const instant=Date.UTC(y,m-1,d,h-9,min);let candidates=[];
  for(let yy=y-1;yy<=y+1;yy++){for(let i=0;i<24;i+=2)candidates.push(termUTC(yy,i))}
  candidates.sort((a,b)=>a-b);
  const boundary=forward?candidates.find(t=>t>instant):[...candidates].reverse().find(t=>t<instant);
  const startAge=Math.abs(boundary-instant)/86400000/3;
  const msi=STEMS.indexOf(chart.month.stem),mbi=BRANCHES.indexOf(chart.month.branch),arr=[];
  for(let k=1;k<=9;k++){
    const si=mod(msi+(forward?k:-k),10),bi=mod(mbi+(forward?k:-k),12);
    arr.push({age:startAge+(k-1)*10,stem:STEMS[si],branch:BRANCHES[bi]});
  }
  return{forward,startAge,arr}
}
function yearPillar(y){const idx=mod(y-4,60);return{stem:STEMS[idx%10],branch:BRANCHES[idx%12]}}
function solarMonthPillar(y,monthNo){
  const yp=yearPillar(y),ys=STEMS.indexOf(yp.stem),tiger=mod((ys%5)*2+2,10);
  return{stem:STEMS[mod(tiger+monthNo-1,10)],branch:BRANCHES[mod(2+monthNo-1,12)]}
}


function elementCounts(p){
 const c={'木':0,'火':0,'土':0,'金':0,'水':0};
 for(const x of [p.hour,p.day,p.month,p.year]){c[STEM_EL[STEMS.indexOf(x.stem)]]++;c[BRANCH_EL[x.branch]]++}
 return c;
}
