/* YUNASLAB 2026 — original approved assets + native navigation and video playback.
   All routes work in a static GitHub Pages deployment using URL hashes.
   Suno music slot is intentionally independent for later Claude Code integration. */
'use strict';
const IMG='assets/images/';
const VID='assets/videos/';
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
 {id:'recipe',title:'요리 앱',tag:'APP',text:'냉장고 털기 AI',image:'thumbnail_05_recipe.webp'},
 {id:'music',title:'AI 음악 프로젝트',tag:'AI MUSIC',text:'음악 감상실 연동 준비',image:'cover_music.webp'}
];
const FILMS=[
 {id:'hanok',title:'KoreanHanokKitchen',tag:'AI COOKING VIDEO',text:'한옥의 분위기와 한국 요리 이야기',image:'thumbnail_01_hanok_edited.webp',target:'works/video/hanok'},
 {id:'xuankong',title:'현공사',tag:'AI SHORT FILM',text:'절벽 위 사찰의 건축 구조를 다룬 AI 영상',image:'xuankong_real.webp',target:'works/video/xuankong'},
 {id:'chair',title:'안마의자 홍보영상',tag:'PROMOTIONAL VIDEO',text:'AI 영상 제작 광고 프로젝트',image:'chair_real.webp',target:'works/video/chair'},
 {id:'millennium',title:'밀레니엄 — 또 다른 나',tag:'EXPERIMENTAL FILM',text:'1999.12.31 23:59',image:'millennium_actual.webp',target:'works/video/millennium'},
 {id:'crystal',title:'CRYSTAL BITE ASMR',tag:'ASMR VIDEO',text:'크리스탈의 질감과 소리를 담은 영상',image:'crystal_original.webp',target:'works/video/crystal'}
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
const img=(name,alt,more='')=>`<img src="${IMG+encodeURIComponent(name)}" alt="${esc(alt)}" loading="eager" ${more}>`;
const ext=(url,text,klass='primary-button')=>`<a class="${klass}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(text)} ↗</a>`;
const back=(path,label)=>`<a class="back-link" href="${route(path)}">← ${esc(label)}</a>`;
function navActive(){
 const seg=(location.hash.replace(/^#\/?/,'').split('/')[0]||'home');
 document.querySelectorAll('[data-nav]').forEach(a=>{let on=a.dataset.nav===seg;a.classList.toggle('active',on);if(on)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
 document.querySelectorAll('.mobile-nav a').forEach(a=>a.classList.toggle('active',a.hash===route(seg)));
}
function flow(active){
 const items=[['home','01 HOME'],['about','02 ABOUT'],['works','03 WORKS'],['tools','04 TOOLS']];
 return `<aside class="flow-rail" aria-label="Page Flow"><h2>Page Flow</h2><nav class="flow-track" aria-label="페이지 이동">${items.map(([id,title])=>`<a href="${route(id)}" class="${id===active?'active':''}" ${id===active?'aria-current="page"':''}><span class="flow-dot" aria-hidden="true"></span>${title}</a>`).join('')}</nav></aside>`;
}
function inStage(body,active='works'){return `<div class="stage-layout"><div class="stage-content">${body}</div>${flow(active)}</div>`}
function card(item,i,path,extraClass=''){
 const title=item.title,href=route(path||(item.id==='manse'?'works/manse/app':item.id==='recipe'?'works/recipe/app':'works/'+item.id));
 return `<a class="work-card ${extraClass}" href="${href}" aria-label="${esc(title)} 보기"><figure>${img(item.image,title+' 대표 이미지')}<span class="number">${String(i+1).padStart(2,'0')}</span></figure><div class="body"><div><small>${esc(item.tag||'PROJECT')}</small><strong>${esc(title)}</strong><p>${esc(item.text||'')}</p></div><span class="round-arrow" aria-hidden="true">→</span></div></a>`;
}
function home(){
 const main=`<section class="home-featured"><div class="home-hero-copy"><div class="eyebrow">YUNASLAB · CREATIVE PORTFOLIO / 2026</div><h1>AI로 기획하고,<br>만들고, <em>연결합니다.</em></h1><p>아이디어를 실제 콘텐츠와 서비스로 옮기는 작업들을 모았습니다.</p><div class="home-actions"><a href="${route('works')}" class="primary-button">WORKS 살펴보기 →</a><a href="${route('about')}" class="secondary-button">ABOUT 보기</a></div></div><div class="section-head"><h2>FEATURED WORKS</h2><a class="text-link" href="${route('works')}">전체 작품 보기 →</a></div><div class="card-grid home-cards">${[CAT[0],CAT[1]].map((item,i)=>card(item,i,'works/'+item.id)).join('')}<a href="${route('works')}" class="work-card more-card" aria-label="전체 작품 더보기"><div class="more-icon" aria-hidden="true">▷</div><strong>MORE</strong><span>더 많은 작업 보기 →</span></a></div></section>`;
 return `<div class="page home-page">${inStage(main,'home').replace('class="stage-layout"','class="stage-layout home-stage"')}</div>`;
}
function about(){
 return `<div class="page"><div class="about-banner"><div class="section-overline">02 / ABOUT</div><h1 class="page-title">아이디어를 현실로,<br>배움을 결과물로.</h1><div class="about-name">손유나 · Sohn Yuna</div><p class="about-intro">AI와 디지털 도구를 배우고, 기획한 것을 직접 만들며, 실제로 활용할 수 있는 결과물로 연결합니다.<span class="about-break">영상 콘텐츠부터 웹서비스와 업무 도구까지 다양한 형태의 작업을 이어가고 있습니다.</span></p></div>
 ${inStage(`<div class="cap-grid">${CAPABILITIES.map(([title,text],i)=>`<article class="cap-card"><span class="cap-number">0${i+1} / CAPABILITY</span><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join('')}</div><div class="about-notes"><div><h3>LEARNING</h3><p>세종사이버대학교 AI 실무활용학과에서 공부하며,<span class="about-break">다양한 프로젝트로 학습 내용을 적용하고 있습니다.</span></p></div><div><h3>BACKGROUND</h3><p>동국대학교 졸업<span class="about-break">새로운 도구를 배워 실제 작업에 활용하는 과정을 이어가고 있습니다.</span></p></div></div>`,'about')}</div>`;
}
function works(){
 const tags=[['all','전체'],['video','AI 영상'],['apps','앱·프로그램'],['web','홈페이지'],['manse','만세력'],['recipe','요리 앱'],['music','음악']];
 const chips=`<div class="filter-row" role="group" aria-label="작품 분야 필터">${tags.map(([id,title])=>`<button class="filter-chip ${currentFilter===id?'selected':''}" type="button" data-filter="${id}" aria-pressed="${currentFilter===id}">${esc(title)}</button>`).join('')}</div>`;
 const filtered=currentFilter==='all'?CAT:CAT.filter(x=>x.id===currentFilter);
 return `<div class="page"><header class="stage-heading"><div class="section-overline">03 / WORKS</div><h1>WORKS</h1><p class="lead">작업 분야를 선택하면 해당 분야의 개별 작품을 볼 수 있습니다.</p></header>${inStage(`${chips}<div class="card-grid" id="works-gallery">${filtered.map(x=>card(x,CAT.indexOf(x))).join('')}</div>`,'works')}</div>`;
}
function categoryPage(id){
 const c=CAT.find(x=>x.id===id);if(!c)return notFound();
 const crumbs=back('works','WORKS 전체로 돌아가기');
 let body='';
 if(id==='video')body=`<div class="card-grid">${FILMS.map((item,i)=>card(item,i,item.target)).join('')}</div>`;
 if(id==='apps')body=`<div class="card-grid">${APPS.map((item,i)=>card(item,i,'works/apps/'+item.id)).join('')}</div>`;
 if(id==='web')body=`<div class="card-grid">${card({title:'SD HAUS',tag:'WEBSITE',text:'실제 제작 홈페이지',image:'sdhaus.webp'},0,'works/web/sdhaus')}</div>`;
 if(id==='manse')body=`<div class="card-grid">${card({title:'만세력',tag:'FOUR PILLARS',text:'사주 분석 프로그램',image:'thumbnail_04_manse.webp'},0,'works/manse/app')}</div>`;
 if(id==='recipe')body=`<div class="card-grid">${card({title:'냉장고 털기 AI',tag:'RECIPE APP',text:'재료에서 레시피를 찾는 웹앱',image:'thumbnail_05_recipe.webp'},0,'works/recipe/app')}</div>`;
 if(id==='music')body=`<section id="music-room-root" data-music-slot="true" class="music-slot">${img('cover_music.webp','검은색 턴테이블 대표 이미지')}<div><div class="section-overline">YUNA'S MUSIC ROOM</div><h2>AI 음악 감상실</h2><p>기존 음악 카테고리와 개별 곡, 원본 썸네일을 연결할 공간입니다. Suno 음원 파일과 실제 음악 플레이어는 이번 HTML 작업에서 제외했으며, 별도 후속 작업으로 연동합니다.</p><span class="status-pending">음원 연동 전 · 기존 폴더 분류 유지 예정</span></div></section>`;
 return `<div class="page">${crumbs}<header class="stage-heading"><div class="section-overline">03 / WORKS · ${esc(c.tag)}</div><h1>${esc(c.title)}</h1><p class="lead">${esc(c.text)}</p></header>${inStage(body)}</div>`;
}
function detailVideo(id){
 const base=FILMS.find(x=>x.id===id);if(!base || id==='hanok')return notFound();
 const data={
  xuankong:{desc:'절벽에 매달린 중국 현공사의 독특한 구조와 하중 전달 원리를 AI 영상으로 재구성한 작품입니다.',tag:'AI SHORT FILM',format:'가로형 · 30초 · 한국어 자막·오디오 포함',video:'xuankong.mp4',poster:'xuankong_real.webp',portrait:false},
  chair:{desc:'안마의자를 중심으로 편안한 휴식의 분위기를 영상으로 구성한 광고 제작 프로젝트입니다.',tag:'AI PROMO FILM',format:'세로형 · 약 45초 · 로고 없는 웹 편집본',video:'chair.mp4',poster:'chair_real.webp',portrait:true},
  millennium:{desc:'1999년 12월 31일, 새천년의 문턱에서 마주한 또 다른 나의 이야기.',tag:'EXPERIMENTAL FILM',format:'가로형 · 46초 · 원본 영상 및 음성',video:'millennium.mp4',poster:'millennium_actual.webp',portrait:false},
  crystal:{desc:'투명한 크리스탈의 질감과 소리를 담은 감각적인 AI ASMR 영상입니다.',tag:'AI ASMR FILM',format:'세로형 · ASMR',video:'crystal.mp4',poster:'crystal_real.webp',portrait:true}
 }[id];if(!data)return notFound();
 const imageAlt=id==='millennium'?'검은 배경의 MILLENNIUM 1999.12.31 23:59 승인 타이틀':base.title+' 실제 영상 화면';
 const media=data.video?`<div class="watch-player ${data.portrait?'portrait-player':'wide-player'}"><video src="${VID+data.video}" poster="${IMG+data.poster}" controls preload="metadata" playsinline aria-label="${esc(base.title)} 영상 재생">브라우저가 HTML5 비디오를 지원하지 않습니다.</video></div>`:`<div class="video-missing">${img(data.poster,imageAlt)}<span>확정된 타이틀 이미지입니다. 밀레니엄 완성 MP4는 현재 이 제작본에 포함되지 않아 재생 연결을 대기하고 있습니다.</span></div>`;
 const metadata=`<div class="meta-row"><span class="meta-tag">${esc(data.format)}</span><span class="meta-tag">${esc(data.tag)}</span></div>`;
 if(data.portrait){
  return `<div class="page detail-page project-${esc(id)}">${back('works/video','AI 영상 제작 목록으로 돌아가기')}<header class="detail-top"><div class="section-overline">03 / WORKS · ${esc(data.tag)}</div><h1>${esc(base.title)}</h1></header><div class="watch-surface portrait-layout">${media}<div class="detail-copy"><div class="section-overline">WORK DETAIL</div><h2>${esc(base.title)}</h2><p>${esc(data.desc)}</p>${metadata}<div class="detail-return">${back('works/video','AI 영상 제작 목록으로 돌아가기')}</div></div></div></div>`;
 }
 return `<div class="page detail-page">${back('works/video','AI 영상 제작 목록으로 돌아가기')}<header class="detail-top"><div class="section-overline">03 / WORKS · ${esc(data.tag)}</div><h1>${esc(base.title)}</h1><p>${esc(data.desc)}</p></header><div class="watch-surface wide">${media}<div class="detail-copy"><div class="section-overline">${esc(data.tag)}</div><h2>${esc(base.title)}</h2>${metadata}</div></div><div class="detail-return">${back('works/video','AI 영상 제작 목록으로 돌아가기')}</div></div>`;
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
 if(kind==='manse'&&id==='app'){title='만세력';description='2026년 새로 구성한 명리 학습용 만세력입니다. 양력·음력·윤달·출생 시각을 입력하면 사주 원국과 오행·십성·대운·세운·월운을 살펴볼 수 있습니다. 《연해자평》《삼명통회》《적천수》《자평진전》《궁통보감》의 주요 관점을 참고한 해설과 다중 인물 저장 기능을 제공합니다. 절기 경계와 해석은 정밀 검증이 필요한 참고용입니다.';preview='thumbnail_04_manse.webp';url='programs/manse-2026.html';tag='FOUR PILLARS / NEW 2026';}
 if(kind==='recipe'&&id==='app'){title='냉장고 털기 AI';description='냉장고에 있는 재료를 바탕으로 가능한 요리를 찾아보는 AI 레시피 앱입니다.';preview='thumbnail_05_recipe.webp';url=external.recipe;tag='RECIPE WEB APP';}
 if(!title)return notFound();
 return `<div class="page detail-page">${back(backPath,backTitle)}<header class="detail-top"><div class="section-overline">03 / WORKS · ${esc(tag)}</div><h1>${esc(title)}</h1></header><div class="app-detail ${kind==='manse'||kind==='recipe'?'equal-panels':''}"><div class="app-preview">${img(preview,title+' 승인된 실제 화면')}</div><div class="app-description"><div class="eyebrow">PROJECT OVERVIEW</div><h2>${esc(title)}</h2><p>${esc(description)}</p>${url?ext(url,kind==='manse'?'새 만세력 실행하기':'실제 서비스 열기'):`<div class="meta-row"><span class="meta-tag">${esc(status||'외부 실행 링크 미제공')}</span></div>`}<p class="small-note">${url?'새 탭에서 실제 사이트 또는 프로그램이 열립니다.':'공개된 실행 주소가 확인되기 전에는 작동하지 않는 링크를 만들지 않습니다.'}</p>${back(backPath,backTitle)}</div></div></div>`;
}
function tools(){
 return `<div class="page"><header class="stage-heading"><div class="section-overline">04 / TOOLS</div><h1>TOOLS</h1><p class="lead">작업에 활용하고 배우는 도구들을 분야별로 정리했습니다.</p></header>${inStage(`<div class="tool-groups">${TOOLS.map(([title,...list])=>`<section class="tool-group"><h2>${esc(title)}</h2><div class="tool-tags">${list.map(x=>`<a class="tool-tag" href="${esc(TOOL_URLS[x])}" target="_blank" rel="noopener noreferrer" title="${esc(x)} 공식 사이트 열기">${esc(x)} <span class="tool-out" aria-hidden="true">↗</span></a>`).join('')}</div></section>`).join('')}</div>`,'tools')}</div>`;
}
function notFound(){return `<div class="page detail-page"><h1>페이지를 찾을 수 없습니다.</h1><p>주소를 확인하거나 WORKS 목록으로 이동해 주세요.</p><a href="${route('works')}" class="primary-button">WORKS로 돌아가기 →</a></div>`}
function render(){
 closeDialog();
 const path=decodeURIComponent(location.hash.replace(/^#\/?/,'')).split('/').filter(Boolean), [head,...tail]=path;
 let html='';
 if(!head||head==='home')html=home();
 else if(head==='about')html=about();
 else if(head==='works'&&tail.length===0)html=works();
 else if(head==='works'&&tail.length===1)html=categoryPage(tail[0]);
 else if(head==='works'&&tail[0]==='video'&&tail[1]==='hanok')html=hanok();
 else if(head==='works'&&tail[0]==='video'&&tail.length===2)html=detailVideo(tail[1]);
 else if(head==='works'&&['apps','web','manse','recipe'].includes(tail[0])&&tail.length===2)html=appDetail(tail[0],tail[1]);
 else if(head==='tools')html=tools();
 else html=notFound();
 app.innerHTML=html;navActive();
 menu.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','메뉴 열기');
 if(window.scrollY>0)window.scrollTo({top:0,behavior:'instant'});
 document.title='YUNASLAB | '+(head==='works'?'WORKS':head==='about'?'ABOUT':head==='tools'?'TOOLS':'HOME');
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
