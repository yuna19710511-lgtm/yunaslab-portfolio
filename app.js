/* YUNASLAB 2026 — original approved assets + native navigation and video playback.
   All routes work in a static GitHub Pages deployment using URL hashes.
   Suno music slot is intentionally independent for later Claude Code integration. */
'use strict';
const IMG='images/';
const BEYOND_THUMB_FALLBACK='data:image/webp;base64,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';

const VID=''; /* 영상은 저장소 최상위에 있음 (밀레니엄만 videos/) */
const external={
  hanok:'https://www.youtube.com/@KoreanHanokKitchen',
  cutting:'https://yuna19710511-lgtm.github.io/jaedannote-test/',
  youtube:'https://youtube-analyzer-kr.netlify.app/',
  qr:'https://qr-maker-kr.netlify.app/',
  moviemind:'https://moviemind-ai-ai-movie-curator-632730400153.us-west1.run.app/',
  website:'https://sdhaus.co.kr/',
  manse:'https://manseryeok-kr.netlify.app/',
  recipe:'https://fridge-recipe-app.ai.studio/',
  door:'https://doorframe-calc.netlify.app/'
};
const CAT=[
 {id:'video',title:'AI 영상 제작',tag:'AI VIDEO',text:'영상 콘텐츠 제작과 편집',image:'cover_video.webp'},
 {id:'apps',title:'앱·프로그램 제작',tag:'WORKFLOW / APP',text:'직접 개발한 앱·프로그램',image:'cover_apps.webp'},
 {id:'web',title:'홈페이지 제작',tag:'WEBSITE',text:'반응형 웹사이트 기획·제작',image:'cover_web.webp'},
 {id:'manse',title:'만세력',tag:'PROGRAM',text:'사주 분석 프로그램',image:'thumbnail_04_manse.webp'},
 {id:'recipe',title:'요리 앱',tag:'APP',text:'냉장고 털기 AI',image:'thumbnail_05_recipe.webp'}
];
const FILMS=[
 {id:'hanok',title:'KoreanHanokKitchen',tag:'AI COOKING VIDEO',text:'한옥의 분위기와 한국 요리 이야기',image:'thumbnail_01_hanok_edited.webp',target:'works/video/hanok'},
 {id:'xuankong',title:'현공사',tag:'AI SHORT FILM',text:'절벽 위 사찰의 건축 구조를 다룬 AI 영상',image:'xuankong_real.webp',target:'works/video/xuankong'},
 {id:'chair',title:'안마의자 홍보영상',tag:'PROMOTIONAL VIDEO',text:'AI 영상 제작 광고 프로젝트',image:'chair_real.webp',target:'works/video/chair'},
 {id:'millennium',title:'밀레니엄 — 또 다른 나',tag:'EXPERIMENTAL FILM',text:'1999.12.31 23:59',image:'millennium_actual.webp',target:'works/video/millennium'},
 {id:'crystal',title:'CRYSTAL BITE ASMR',tag:'ASMR VIDEO',text:'크리스탈의 질감과 소리를 담은 영상',image:'crystal_original.webp',target:'works/video/crystal'},
 {id:'beyond',title:'BEYOND THE SCREEN',tag:'AI MOVIE TRAILER',text:'현실과 스크린 속 세계의 경계를 넘나드는 영화 예고편',image:'beyond-the-screen.webp',target:'works/video/beyond'}
];
const APPS=[
 {id:'cutting',title:'AI 재단노트',tag:'CUTTING / WORKFLOW',text:'재단 계획을 정리하는 작업용 도구',image:'thumbnail_02_cutting_original.webp',preview:'cutting.webp',desc:'판재 규격과 재단 조건을 반영해 계획을 정리하는 프로젝트입니다.',url:external.cutting},
 {id:'youtube',title:'유튜브 영상 분석기',tag:'VIDEO CONTENT ANALYSIS',text:'영상 내용 요약·핵심 포인트·질문',image:'app_youtube.webp',preview:'app_youtube.webp',desc:'영상 주소를 바탕으로 실제 영상 내용을 분석해 요약과 핵심 포인트를 확인하는 도구입니다. 채널 조회수나 구독자 통계 분석기가 아닙니다.',url:external.youtube},
 {id:'qr',title:'QR코드 생성기',tag:'UTILITY',text:'주소를 QR코드로 변환하는 도구',image:'qr.webp',preview:'qr.webp',desc:'주소와 텍스트를 QR코드로 만들어 활용할 수 있는 도구입니다.',url:external.qr},
 {id:'moviemind',title:'MovieMind.AI',tag:'AI MOVIE CURATOR',text:'기분에서 시작하는 영화 추천',image:'app_moviemind.webp',preview:'app_moviemind.webp',desc:'지금의 기분과 취향을 바탕으로 보고 싶은 영화를 찾아보는 AI 영화 추천 프로젝트입니다.',url:external.moviemind},
 {id:'shorts',title:'자동 쇼츠 제작 시스템',tag:'WORKFLOW / PROTOTYPE',text:'30초 광고 영상 자동화 실험',image:'cover_video.webp',preview:'cover_video.webp',desc:'사진과 로고, 자막 등의 요소를 연결해 짧은 영상을 만드는 자동화 시스템을 기획하고 실험한 프로젝트입니다.',url:null,status:'실험 및 개발 단계 · 공개 실행 주소 미제공'},
 {id:'door',title:'문틀·도어 계산기',tag:'UTILITY / CALCULATOR',text:'문틀과 도어 규격 계산',image:'app_door.webp',preview:'app_door.webp',desc:'문틀 외경과 도어 크기 등 현장 계산을 도울 수 있도록 기획한 도구입니다.',url:external.door}
];
const FOODS=[
 {id:'gimbap',title:'김밥'}, {id:'dakbok',title:'닭볶음탕'}, {id:'bibimbap',title:'돌솥비빔밥'},
 {id:'tteok',title:'떡볶이'}, {id:'omelet',title:'불닭오믈렛'}, {id:'japchae',title:'잡채'},
 {id:'pajeon',title:'파전'}, {id:'galbijjim',title:'갈비찜'}, {id:'gamjatang',title:'감자탕'}, {id:'sujebi',title:'수제비'}
];
const CAPABILITIES=[
 ['AI 콘텐츠 제작','이미지와 영상 등 창작 콘텐츠를 기획하고 제작합니다.'],
 ['기획 및 디자인','아이디어를 사용자 경험과 화면 구성으로 구체화합니다.'],
 ['업무 자동화','반복되는 작업을 연결하고 실용적인 흐름으로 정리합니다.'],
 ['프로그램 및 웹서비스','실제로 활용할 수 있는 도구와 웹서비스를 설계하고 구현합니다.']
];
const TOOLS=[
 ['생성형 AI','ChatGPT','Claude','Gemini','Google AI Studio','뤼튼'],
 ['이미지·영상·음악','Midjourney','Higgsfield','Google Flow','Premiere Pro','Suno','Canva','미리캔버스'],
 ['기획·문서','Gamma','Notion','Google NotebookLM'],
 ['자동화·콘텐츠 연결','n8n','Make','KIE','Creatomate'],
 ['코드·배포','GitHub','Netlify','Firebase','Google Cloud Run']
];
const TOOL_URLS={
 "ChatGPT": "https://chatgpt.com/",
 "Claude": "https://claude.ai/",
 "Gemini": "https://gemini.google.com/",
 "Google AI Studio": "https://aistudio.google.com/",
 "뤼튼": "https://wrtn.ai/",
 "Midjourney": "https://www.midjourney.com/",
 "Higgsfield": "https://higgsfield.ai/",
 "Google Flow": "https://labs.google/fx/ko/tools/flow",
 "Premiere Pro": "https://www.adobe.com/kr/products/premiere.html",
 "Suno": "https://suno.com/",
 "Canva": "https://www.canva.com/ko_kr/",
 "미리캔버스": "https://www.miricanvas.com/ko",
 "Gamma": "https://gamma.app/",
 "Notion": "https://www.notion.so/ko",
 "Google NotebookLM": "https://notebooklm.google.com/",
 "n8n": "https://n8n.io/",
 "Make": "https://www.make.com/",
 "KIE": "https://kie.ai/",
 "Creatomate": "https://creatomate.com/",
 "GitHub": "https://github.com/",
 "Netlify": "https://www.netlify.com/",
 "Firebase": "https://firebase.google.com/",
 "Google Cloud Run": "https://cloud.google.com/run?hl=ko"
};
const app=document.getElementById('app');
const dialog=document.getElementById('video-dialog');
const dialogVideo=document.getElementById('dialog-video');
const dialogTitle=document.getElementById('dialog-title');
const menu=document.getElementById('mobile-nav');
const menuButton=document.getElementById('mobile-menu-button');
let currentFilter='all';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const route=path=>'#/'+path;
const img=(name,alt,more='')=>`<img src="${IMG+encodeURIComponent(name)}" alt="${esc(alt)}" loading="eager" ${name==='beyond-the-screen.webp'?`onerror="this.onerror=null;this.src=BEYOND_THUMB_FALLBACK"`: ''} ${more}>`;
const ext=(url,text,klass='primary-button')=>`<a class="${klass}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(text)} ↗</a>`;
const back=(path,label)=>`<a class="back-link" href="${route(path)}">← ${esc(label)}</a>`;
function navActive(){
 const seg=(location.hash.replace(/^#\/?/,'').split('/')[0]||'home');
 document.querySelectorAll('[data-nav]').forEach(a=>{let on=a.dataset.nav===seg;a.classList.toggle('active',on);if(on)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
 document.querySelectorAll('.mobile-nav a').forEach(a=>a.classList.toggle('active',a.hash===route(seg)));
}
function flow(active){
 const items=[['home','01 HOME'],['about','02 ABOUT'],['works','03 WORKS'],['music','04 AI 음악 감상실'],['tools','05 TOOLS']];
 return `<aside class="flow-rail" aria-label="Page Flow"><h2>Page Flow</h2><nav class="flow-track" aria-label="페이지 이동">${items.map(([id,title])=>`<a href="${route(id)}" class="${id===active?'active':''}" ${id===active?'aria-current="page"':''}><span class="flow-dot" aria-hidden="true"></span>${title}</a>`).join('')}</nav></aside>`;
}
function inStage(body,active='works'){return `<div class="stage-layout"><div class="stage-content">${body}</div>${flow(active)}</div>`}
function card(item,i,path,extraClass=''){
 const title=item.title,href=route(path||(item.id==='manse'?'works/manse/app':item.id==='recipe'?'works/recipe/app':'works/'+item.id));
 return `<a class="work-card ${extraClass}" href="${href}" aria-label="${esc(title)} 보기"><figure>${img(item.image,title+' 대표 이미지')}<span class="number">${String(i+1).padStart(2,'0')}</span></figure><div class="body"><div><small>${esc(item.tag||'PROJECT')}</small><strong>${esc(title)}</strong><p>${esc(item.text||'')}</p></div><span class="round-arrow" aria-hidden="true">→</span></div></a>`;
}
/* WORKS 하위 작품 갤러리: 상위 카테고리 및 HOME 공통 카드는 변경하지 않습니다. */
function galleryCard(item,i,path,total){
 const title=item.title,href=route(path),n=String(i+1).padStart(2,'0');
 // Gallery image uses no numbered badge or sequence indicator.
 return `<a class="work-card gallery-work-card" href="${href}" aria-label="${esc(title)} 작품 보기"><figure>${img(item.image,title+' 대표 이미지')}<span class="gallery-open" aria-hidden="true">↗</span></figure><div class="body"><div><small>${esc(item.tag||'PROJECT')}</small><strong>${esc(title)}</strong><p>${esc(item.text||'')}</p></div></div></a>`;
}
function home(){
 const main=`<section class="home-featured"><div class="home-hero-copy"><div class="eyebrow">YUNASLAB / 2026</div><div class="home-script-title" aria-label="Creative Portfolio">CREATIVE PORTFOLIO</div><h1>AI로 기획하고,<br>만들고, <em>연결합니다.</em></h1><p>아이디어를 실제 콘텐츠와 서비스로 옮기는 작업들을 모았습니다.</p><div class="home-actions"><a href="${route('works')}" class="primary-button">WORKS 살펴보기 →</a><a href="${route('about')}" class="secondary-button">ABOUT 보기</a></div></div><div class="section-head"><h2>FEATURED WORKS</h2><a class="text-link" href="${route('works')}">전체 작품 보기 →</a></div><div class="card-grid home-cards">${[CAT[0],CAT[1]].map((item,i)=>card(item,i,'works/'+item.id)).join('')}<a href="${route('works')}" class="work-card more-card" aria-label="전체 작품 더보기"><div class="more-icon" aria-hidden="true">▷</div><strong>MORE</strong><span>더 많은 작업 보기 →</span></a></div></section>`;
 return `<div class="page home-page">${inStage(main,'home').replace('class="stage-layout"','class="stage-layout home-stage"')}</div>`;
}
function about(){
 return `<div class="page"><div class="about-banner"><div class="section-overline">02 / ABOUT</div><h1 class="page-title">아이디어를 현실로,<br>배움을 결과물로.</h1><div class="about-name">손유나 · Sohn Yuna</div><p class="about-intro">AI와 디지털 도구를 배우고, 기획한 것을 직접 만들며, 실제로 활용할 수 있는 결과물로 연결합니다.<span class="about-break">영상 콘텐츠부터 웹서비스와 업무 도구까지 다양한 형태의 작업을 이어가고 있습니다.</span></p></div>
 ${inStage(`<div class="cap-grid">${CAPABILITIES.map(([title,text],i)=>`<article class="cap-card"><span class="cap-number">0${i+1} / CAPABILITY</span><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join('')}</div><div class="about-notes"><div><h3>LEARNING</h3><p>세종사이버대학교 AI 실무활용학과에서 공부하며,<span class="about-break">다양한 프로젝트로 학습 내용을 적용하고 있습니다.</span></p></div><div><h3>BACKGROUND</h3><p>동국대학교 졸업<span class="about-break">새로운 도구를 배워 실제 작업에 활용하는 과정을 이어가고 있습니다.</span></p></div></div>`,'about')}</div>`;
}
function works(){
 const tags=[['all','전체'],['video','AI 영상'],['apps','앱·프로그램'],['web','홈페이지'],['manse','만세력'],['recipe','요리 앱']];
 const chips=`<div class="filter-row" role="group" aria-label="작품 분야 필터">${tags.map(([id,title])=>`<button class="filter-chip ${currentFilter===id?'selected':''}" type="button" data-filter="${id}" aria-pressed="${currentFilter===id}">${esc(title)}</button>`).join('')}</div>`;
 const filtered=currentFilter==='all'?CAT:CAT.filter(x=>x.id===currentFilter);
 return `<div class="page"><header class="stage-heading"><div class="section-overline">03 / WORKS</div><h1>WORKS</h1><p class="lead">작업 분야를 선택하면 해당 분야의 개별 작품을 볼 수 있습니다.</p></header>${inStage(`${chips}<div class="card-grid" id="works-gallery">${filtered.map(x=>card(x,CAT.indexOf(x))).join('')}</div>`,'works')}</div>`;
}
function categoryPage(id){
 const c=CAT.find(x=>x.id===id);if(!c)return notFound();
 const crumbs=back('works','WORKS 전체로 돌아가기');
 let body='';
 if(id==='video')body=`<div class="card-grid gallery-grid">${FILMS.map((item,i)=>galleryCard(item,i,item.target,FILMS.length)).join('')}</div>`;
 if(id==='apps')body=`<div class="card-grid gallery-grid">${APPS.map((item,i)=>galleryCard(item,i,'works/apps/'+item.id,APPS.length)).join('')}</div>`;
 if(id==='web')body=`<div class="card-grid gallery-grid">${galleryCard({title:'SD HAUS',tag:'WEBSITE',text:'실제 제작 홈페이지',image:'sdhaus.webp'},0,'works/web/sdhaus',1)}</div>`;
 if(id==='manse')body=`<div class="card-grid gallery-grid">${galleryCard({title:'만세력',tag:'FOUR PILLARS',text:'사주 분석 프로그램',image:'thumbnail_04_manse.webp'},0,'works/manse/app',1)}</div>`;
 if(id==='recipe')body=`<div class="card-grid gallery-grid">${galleryCard({title:'냉장고 털기 AI',tag:'RECIPE APP',text:'재료에서 레시피를 찾는 웹앱',image:'thumbnail_05_recipe.webp'},0,'works/recipe/app',1)}</div>`;
 return `<div class="page">${crumbs}<header class="stage-heading"><div class="section-overline">03 / WORKS · ${esc(c.tag)}</div><h1>${esc(c.title)}</h1><p class="lead">${esc(c.text)}</p></header>${inStage(body)}</div>`;
}
function detailVideo(id){
 const base=FILMS.find(x=>x.id===id);if(!base || id==='hanok')return notFound();
 const data={
  xuankong:{desc:'절벽에 매달린 중국 현공사의 독특한 구조와 하중 전달 원리를 AI 영상으로 재구성한 작품입니다.',tag:'AI SHORT FILM',format:'가로형 · 30초 · 한국어 자막·오디오 포함',video:'xuankong.mp4',poster:'xuankong_real.webp',portrait:false},
  chair:{desc:'안마의자를 중심으로 편안한 휴식의 분위기를 영상으로 구성한 광고 제작 프로젝트입니다.',tag:'AI PROMO FILM',format:'세로형 · 약 51초 · 브랜드 엔딩 포함',video:'chair.mp4',poster:'chair_real.webp',portrait:true},
  millennium:{desc:'1999년 12월 31일, 새천년의 문턱에서 마주한 또 다른 나의 이야기.',tag:'EXPERIMENTAL FILM',format:'가로형 · 46초 · 원본 영상 및 음성',video:'videos/millennium.mp4',poster:'millennium_actual.webp',portrait:false},
  crystal:{desc:'투명한 크리스탈의 질감과 소리를 담은 감각적인 AI ASMR 영상입니다.',tag:'AI ASMR FILM',format:'세로형 · ASMR',video:'crystal.mp4',poster:'crystal_real.webp',portrait:true},
  beyond:{desc:'한 여성이 오래된 극장에서 스크린 너머의 세계와 마주하며 현실과 환상의 경계가 무너지는 이야기를 담은 AI 영화 예고편입니다.',tag:'AI MOVIE TRAILER',format:'가로형 · 약 22초 · 음악 포함',video:'beyond-the-screen.mp4',poster:'beyond-the-screen.webp',portrait:false}
 }[id];if(!data)return notFound();
 const imageAlt=id==='millennium'?'검은 배경의 MILLENNIUM 1999.12.31 23:59 승인 타이틀':base.title+' 실제 영상 화면';
 const media=data.video?`<div class="watch-player ${data.portrait?'portrait-player':'wide-player'}"><video src="${VID+data.video}" poster="${id==='beyond'?BEYOND_THUMB_FALLBACK:IMG+data.poster}" controls preload="metadata" playsinline aria-label="${esc(base.title)} 영상 재생">브라우저가 HTML5 비디오를 지원하지 않습니다.</video></div>`:`<div class="video-missing">${img(data.poster,imageAlt)}<span>확정된 타이틀 이미지입니다. 밀레니엄 완성 MP4는 현재 이 제작본에 포함되지 않아 재생 연결을 대기하고 있습니다.</span></div>`;
 const metadata=`<div class="meta-row"><span class="meta-tag">${esc(data.format)}</span><span class="meta-tag">${esc(data.tag)}</span></div>`;
 if(data.portrait){
  return `<div class="page detail-page project-${esc(id)}">${back('works/video','AI 영상 제작 목록으로 돌아가기')}<header class="detail-top"><div class="section-overline">03 / WORKS · ${esc(data.tag)}</div><h1>${esc(base.title)}</h1></header><div class="watch-surface portrait-layout">${media}<div class="detail-copy"><div class="section-overline">WORK DETAIL</div><h2>${esc(base.title)}</h2><p>${esc(data.desc)}</p>${metadata}<div class="detail-return">${back('works/video','AI 영상 제작 목록으로 돌아가기')}</div></div></div></div>`;
 }
 return `<div class="page detail-page wide-detail-page">${back('works/video','AI 영상 제작 목록으로 돌아가기')}<header class="detail-top"><div class="section-overline">03 / WORKS · ${esc(data.tag)}</div><h1>${esc(base.title)}</h1><p>${esc(data.desc)}</p></header><div class="watch-surface wide">${media}<div class="detail-copy"><div class="section-overline">${esc(data.tag)}</div><h2>${esc(base.title)}</h2>${metadata}</div></div><div class="detail-return">${back('works/video','AI 영상 제작 목록으로 돌아가기')}</div></div>`;
}
function hanok(){
 return `<div class="page detail-page" id="hanok-gallery">${back('works/video','AI 영상 제작 목록으로 돌아가기')}
  <div class="hanok-banner"><picture><source media="(max-width:720px)" srcset="${IMG}hanok_actual_banner_mobile.webp">${img('hanok_actual_banner.webp','실제 KoreanHanokKitchen 유튜브 채널 배너')}</picture><span class="hanok-mobile-title">KoreanHanokKitchen</span><a class="channel-button" href="${external.hanok}" target="_blank" rel="noopener noreferrer" aria-label="유튜브 KoreanHanokKitchen 채널 열기">YouTube 채널 바로가기 ↗</a></div>
  <header class="hanok-intro"><div><div class="section-overline">AI COOKING FILM COLLECTION</div><h1>KoreanHanokKitchen</h1><p>한옥 부엌의 풍경과 요리 이야기 · 총 ${FOODS.length}편</p></div><span class="eyebrow">ORIGINAL VIDEO COLLECTION</span></header>
  <div class="hanok-grid">${FOODS.map((f,i)=>`<button type="button" class="food-card" data-food="${f.id}" aria-label="${esc(f.title)} 영상 재생"><div class="food-visual">${img('food_'+f.id+'.webp',f.title+' 실제 영상의 음식 또는 인물 장면')}<span class="play-pill" aria-hidden="true">▶</span></div><div class="food-title"><span>${String(i+1).padStart(2,'0')}. ${esc(f.title)}</span><small>재생하기 →</small></div></button>`).join('')}</div>
  <div class="detail-return">${back('works/video','AI 영상 제작 목록으로 돌아가기')}</div></div>`;
}
function appDetail(kind,id){
 let entry=null,title='',preview='',description='',url=null,tag='PROJECT',status=null;
 const backPath=(kind==='manse'||kind==='recipe')?'works':kind==='apps'?'works/apps':'works/'+kind;
 const backTitle=kind==='apps'?'앱·프로그램 제작 목록으로 돌아가기':kind==='web'?'홈페이지 제작 목록으로 돌아가기':(kind==='manse'||kind==='recipe')?'WORKS 전체로 돌아가기':'WORKS 전체로 돌아가기';
 if(kind==='apps'){entry=APPS.find(x=>x.id===id);if(!entry)return notFound(); ({title,desc:description,preview,url,tag,status}=entry);}
 if(kind==='web'&&id==='sdhaus'){title='SD HAUS';description='실제 제작한 인테리어 자재 브랜드 홈페이지입니다.';preview='sdhaus.webp';url=external.website;tag='WEBSITE';}
 if(kind==='manse'&&id==='app'){title='만세력';description='2026년 새로 구성한 명리 학습용 만세력입니다. 양력·음력·윤달·출생 시각을 입력하면 사주 원국과 오행·십성·대운·세운·월운을 살펴볼 수 있습니다. 《연해자평》《삼명통회》《적천수》《자평진전》《궁통보감》의 주요 관점을 참고한 해설과 다중 인물 저장 기능을 제공합니다. 절기 경계와 해석은 정밀 검증이 필요한 참고용입니다.';preview='thumbnail_04_manse.webp';url='manse-2026.html';tag='FOUR PILLARS / NEW 2026';}
 if(kind==='recipe'&&id==='app'){title='냉장고 털기 AI';description='냉장고에 있는 재료를 바탕으로 가능한 요리를 찾아보는 AI 레시피 앱입니다.';preview='thumbnail_05_recipe.webp';url=external.recipe;tag='RECIPE WEB APP';}
 if(!title)return notFound();
 return `<div class="page detail-page">${back(backPath,backTitle)}<header class="detail-top"><div class="section-overline">03 / WORKS · ${esc(tag)}</div><h1>${esc(title)}</h1></header><div class="app-detail ${kind==='manse'||kind==='recipe'?'equal-panels':''}"><div class="app-preview">${img(preview,title+' 승인된 실제 화면')}</div><div class="app-description"><div class="eyebrow">PROJECT OVERVIEW</div><h2>${esc(title)}</h2><p>${esc(description)}</p>${url?ext(url,kind==='manse'?'새 만세력 실행하기':'실제 서비스 열기'):`<div class="meta-row"><span class="meta-tag">${esc(status||'외부 실행 링크 미제공')}</span></div>`}<p class="small-note">${url?'새 탭에서 실제 사이트 또는 프로그램이 열립니다.':'공개된 실행 주소가 확인되기 전에는 작동하지 않는 링크를 만들지 않습니다.'}</p>${back(backPath,backTitle)}</div></div></div>`;
}
function tools(){
 return `<div class="page"><header class="stage-heading"><div class="section-overline">05 / TOOLS</div><h1>TOOLS</h1><p class="lead">작업에 활용하고 배우는 도구들을 분야별로 정리했습니다.</p></header>${inStage(`<div class="tool-groups">${TOOLS.map(([title,...list])=>`<section class="tool-group"><h2>${esc(title)}</h2><div class="tool-tags">${list.map(x=>`<a class="tool-tag" href="${esc(TOOL_URLS[x])}" target="_blank" rel="noopener noreferrer" title="${esc(x)} 공식 사이트 열기">${esc(x)} <span class="tool-out" aria-hidden="true">↗</span></a>`).join('')}</div></section>`).join('')}</div>`,'tools')}</div>`;
}
function notFound(){return `<div class="page detail-page"><h1>페이지를 찾을 수 없습니다.</h1><p>주소를 확인하거나 WORKS 목록으로 이동해 주세요.</p><a href="${route('works')}" class="primary-button">WORKS로 돌아가기 →</a></div>`}
function render(){
 closeDialog();
 const path=decodeURIComponent(location.hash.replace(/^#\/?/,'')).split('/').filter(Boolean), [head,...tail]=path;
 if(head==='works'&&tail[0]==='music'){location.replace(route(['music',...tail.slice(1)].join('/')));return;} /* 예전 음악 주소 → 새 주소 */
 let html='';
 if(!head||head==='home')html=home();
 else if(head==='about')html=about();
 else if(head==='works'&&tail.length===0)html=works();
 else if(head==='works'&&tail.length===1)html=categoryPage(tail[0]);
 else if(head==='works'&&tail[0]==='video'&&tail[1]==='hanok')html=hanok();
 else if(head==='works'&&tail[0]==='video'&&tail.length===2)html=detailVideo(tail[1]);
 else if(head==='works'&&['apps','web','manse','recipe'].includes(tail[0])&&tail.length===2)html=appDetail(tail[0],tail[1]);
 else if(head==='music'&&tail.length===0&&typeof MusicRoom!=='undefined')html=MusicRoom.page();
 else if(head==='music'&&tail.length===1&&typeof MusicRoom!=='undefined')html=MusicRoom.category(tail[0]);
 else if(head==='tools')html=tools();
 else html=notFound();
 app.innerHTML=html;navActive();
 {const fa=app.querySelector('.flow-track a.active');if(fa){const t=fa.parentElement;t.scrollLeft=fa.offsetLeft-(t.clientWidth-fa.offsetWidth)/2;}} /* 모바일 가로 Page Flow: 현재 위치를 가운데로 */
 menu.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','메뉴 열기');
 if(window.scrollY>0)window.scrollTo({top:0,behavior:'instant'});
 document.title='YUNASLAB | '+(head==='works'?'WORKS':head==='music'?'AI 음악 감상실':head==='about'?'ABOUT':head==='tools'?'TOOLS':'HOME');
}
function closeDialog(){
 if(!dialog)return;
 try{dialogVideo.pause();dialogVideo.removeAttribute('src');dialogVideo.load();if(dialog.open)dialog.close();}catch(e){}
}
function openFood(id){
 const food=FOODS.find(f=>f.id===id);if(!food)return;
 dialogTitle.textContent=food.title+' · KoreanHanokKitchen';
 dialogVideo.src=VID+food.id+'.mp4';
 dialogVideo.poster=IMG+'food_'+food.id+'.webp';
 dialog.showModal();
 dialogVideo.play().catch(()=>{/* user can press native play */});
}
app.addEventListener('click',e=>{
 const filter=e.target.closest('[data-filter]');
 if(filter){currentFilter=filter.dataset.filter;render();return;}
 const food=e.target.closest('[data-food]');if(food){openFood(food.dataset.food);return;}
});
menuButton.addEventListener('click',()=>{const show=menu.hidden;menu.hidden=!show;menuButton.setAttribute('aria-expanded',String(show));menuButton.setAttribute('aria-label',show?'메뉴 닫기':'메뉴 열기')});
document.getElementById('dialog-close').addEventListener('click',closeDialog);
dialog.addEventListener('close',()=>{dialogVideo.pause();dialogVideo.removeAttribute('src');dialogVideo.load()});
window.addEventListener('hashchange',render);
render();
