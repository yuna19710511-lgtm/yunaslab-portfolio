/* YUNASLAB — AI 음악 감상실 (상단 메뉴 'AI 음악 감상실' · 주소 #/music, #/music/<카테고리>)
   app.js의 공용 함수(esc, route, back, inStage, img)를 사용합니다. app.js보다 먼저 로드되며,
   함수는 호출 시점에만 실행되므로 순서에 문제가 없습니다.
   음원 저장 위치를 옮길 때는 MUSIC_BASE 한 줄만 바꾸면 됩니다. */
'use strict';
const MUSIC_BASE='music/';
const MUSIC_CREDIT='손유나 · Sohn Yuna / AI-assisted Music Production (Suno)';

/* 카테고리명은 원본 폴더명 그대로. ready:false 는 아직 승인 전(준비 중). */
const MUSIC_CATS=[
 {id:'study',name:'공부할때 듣는 음악',en:'Late Night Study & Focus',ready:true,playTop:true, /* 썸네일 하단에 제목이 있어 재생 버튼을 오른쪽 위로 */
  note:'썸네일은 원본 그대로 사용했으며, 곡 제목은 썸네일에 표기된 제목을 기준으로 표시했습니다.',
  desc:'생각의 조각들이 연결되는 시간. 몰입과 기록, 나만의 아지트에서 듣는 공부·집중 음악 18곡입니다.',
  tracks:[
   [1,'흩어진 생각 줍기','Gathering Scattered Thoughts',343],
   [2,'반음계의 새벽','Chromatic Dawn',271],
   [3,'첫 번째 노드','The First Node',201],
   [4,'궤도 비행','Orbital Flight',203], /* 화면 표시는 썸네일 기준(사용자 승인). 음원 파일명·Suno 제목은 '무중력의 시간' */
   [5,'별의 조각들','Stardust Fragments',214],
   [6,'자정의 루프','Midnight Loop',150],
   [7,'숨겨진 샛길','Hidden Bylanes',264],
   [8,'조용한 바닷가 카페','Quiet Seaside Café',289],
   [9,'흐릿한 수평선','Blurred Horizon',263],
   [10,'낯선 여행지의 오후','Afternoon in a Strange Town',230],
   [11,'비 오는 도시','Raining City',242],
   [12,'마지막 전차','The Last Streetcar',311],
   [13,'새벽의 연주','Dawn Sonata',291],
   [14,'안개 속의 섬','Island in the Mist',354],
   [15,'시간의 흐름','Flow of Time',313],
   [16,'잠들지 않는 도시','Unsleeping City',173],
   [17,'마지막 노드','The Final Node',295],
   [18,'새벽의 기적','Dawn Miracle',239]
  ]},
 {id:'night-sea',name:'밤바다',en:'Summer Night Beach Playlist',ready:true,
  desc:'여름밤, 밤바다를 걸으며 듣는 노래. 네온빛 해변에서 새벽 전의 바다까지 이어지는 15곡입니다.',
  tracks:[
   [1,'네온빛 해변','Neon Beach',172],
   [2,'밤바다 산책','Midnight Beach Walk',270],
   [3,'여름밤의 바람','Summer Night Breeze',219],
   [4,'멀리 빛나는 도시','Distant City Lights',290],
   [5,'모래 위의 발자국','Footprints on the Sand',163],
   [6,'파도 사이로 흐르는 노래','Song Between the Waves',269],
   [7,'달빛 아래 파도','Waves Under the Moonlight',173],
   [8,'조용한 바닷가 카페','Quiet Seaside Café',220],
   [9,'별빛 아래 캠프파이어','Campfire Under the Stars',268],
   [10,'밤의 끝, 드라이브','Drive to the End of the Night',233],
   [11,'달이 비친 수평선','Moonlit Horizon',268],
   [12,'잠들지 않는 여름','Sleepless Summer',225],
   [13,'새벽 전의 바다','The Sea Before Dawn',201],
   [14,'느린 파도, 긴 밤','Slow Waves, Long Night',250],
   [15,'다시 돌아오는 물결','Waves That Return Again',271]
  ]},
 {id:'rainy-day',name:'비오는날 듣기 좋은 노래',en:'Songs for a Rainy Day',ready:true,
  desc:'감성 가득한 1시간 플레이리스트. 창가에 머문 비에서 비가 그치면 우리도까지, 비 오는 날 듣기 좋은 15곡입니다.',
  tracks:[
   [1,'창가에 머문 비','Rain Stayed by the Window',208],
   [2,'비가 지나간 자리','Where the Rain Passed By',257],
   [3,'빗소리 속 너의 이름','Your Name in the Rain',290],
   [4,'젖은 밤의 끝에서','At the End of the Rainy Night',275],
   [5,'비가 와도 나는 걸어','I’ll Walk Through the Rain',264],
   [6,'비에 기대어 잠든 마음','A Heart Asleep in the Rain',368],
   [7,'같은 비를 듣고 있어','Listening to the Same Rain',317],
   [8,'비가 머무는 정원','A Garden Where Rain Stays',260],
   [9,'빗속의 불빛','Lights in the Rain',259],
   [10,'검은 비 아래서','Under the Black Rain',262],
   [11,'비가 그친 새벽','Dawn After the Rain',259],
   [12,'우산 없이 걷는 길','Walking Without an Umbrella',228],
   [13,'비처럼 남은 너','You Remain Like Rain',274],
   [14,'비가 그치면 나는','When the Rain Ends',339],
   [15,'비가 그치면 우리도','When the Rain Finally Ends',220]
  ]},
 {id:'citypop-drive',name:'시티팝드라이브',en:'Sunset Drive City Pop Playlist',ready:true,playLeft:true, /* 썸네일 제목이 오른쪽·로고가 왼쪽 위에 있어 재생 버튼을 왼쪽 아래로 */
  desc:'해질녘 노을을 보며 달리는 퇴근길 드라이브. 노을을 향해 출발에서 새벽이 오면까지 이어지는 시티팝 15곡입니다.',
  tracks:[
   [1,'노을을 향해 출발','Sunset Drive',375],
   [2,'오늘 하루, 잘했어','Good Job Today',325],
   [3,'리듬 타고 달려','Ride the Rhythm',290],
   [4,'젖은 밤의 끝에서','At the End of the Rainy Night',334],
   [5,'밤이 내려앉는 시간에','When the Night Falls',240],
   [6,'바람 속 스케치','Sketch in the Wind',363],
   [7,'우리의 이야기가 흐르는 밤','The Night Our Stories Flow',329],
   [8,'오래된 테이프 속 우리','Old Tape, Our Story',304],
   [9,'잠들지 않는 도시','The City Never Sleeps',317],
   [10,'늦은 밤의 네 온도','Your Temperature at Midnight',333],
   [11,'도시의 불빛 따라','City Lights, My Way',374],
   [12,'밤하늘을 스치는 바람','Night Wind',305],
   [13,'널 생각하는 밤','Thinking of You Tonight',349],
   [14,'돌아갈 수 있다면','If I Could Go Back',351],
   [15,'새벽이 오면','When the Dawn Breaks',386] /* 화면 표시는 썸네일 기준(사용자 승인). 음원 파일명·Suno 제목은 'When the Dawn Comes' */
  ]},
 {id:'tropical-night',name:'열대야',ready:true, /* 썸네일 제목이 가운데에 있어 재생 버튼은 기본 위치(오른쪽 아래). 대표 썸네일에 영문 부제가 없어 en 없음 */
  desc:'열대야에 잠 못 드는 밤, 이 노래 틀어봐. 너도 못 자?에서 해가 뜨고 나서야까지 이어지는 15곡입니다.',
  tracks:[
   [1,'너도 못 자?',"Can't Sleep Either",203], /* 화면 표시는 썸네일 기준 물음표 포함(사용자 승인). 원본 파일명에는 ? 없음 */
   [2,'땀이 식지 않는 밤',"The Night That Won't Cool Down",218],
   [3,'창문 너머','Beyond the Window',263],
   [4,'이 더위에','In This Heat',252],
   [5,'선풍기 소리','Sound of the Fan',189],
   [6,'녹아내릴 것 같아',"I Think I'm Melting",217],
   [7,'밤 11시','11 PM',180],
   [8,'열대야 블루스','',222], /* 원본에 영문 제목 없음 — 한글만 표시(사용자 승인) */
   [9,'잠이 오지 않아',"Sleep Won't Come",169],
   [10,'새벽 2시의 온도','Temperature at 2 AM',212],
   [11,'여름밤의 끝','End of a Summer Night',214],
   [12,'선잠','Half-Sleep',238], /* 원본 파일명 '12선잠 (Half-Sleep).wav' 그대로 */
   [13,'이런 밤엔','On Nights Like This',207],
   [14,'새벽이 오기 전에','Before Dawn Comes',211],
   [15,'해가 뜨고 나서야','Only After the Sun Rose',234] /* 한글은 썸네일, 영문은 원본 파일명 기준(사용자 승인) */
  ]},
 {id:'cleaning',name:'청소할때 듣기좋은 노래',en:'Cleaning Playlist',ready:true,nowRight:true, /* 재생 버튼 기본 위치(오른쪽 아래), 왼쪽 위 로고를 가리지 않도록 '재생 중' 표시는 재생 버튼 옆 */
  desc:'청소할 때 듣기 좋은 노래. 햇살 가득한 하루에서 새로운 하루, 새로운 나까지 이어지는 15곡입니다.',
  tracks:[
   [1,'햇살 가득한 하루','Sunshine in My Room',235],
   [2,'먼저 창문을 열어','Open the Windows First',229],
   [3,'가볍게 쓸어내려','Sweep It Light',245],
   [4,'반짝이는 오후','Shining Afternoon',220],
   [5,'리듬 따라 정리해','Tidy to the Rhythm',205],
   [6,'바람 따라 한 바퀴','One Spin with the Breeze',215], /* 화면 표시는 썸네일 기준(사용자 승인). 원본 파일명·Suno 제목은 'A Walk with the Wind' */
   [7,'깨끗해진 마음','A Cleaner Heart',288],
   [8,'햇살 아래 스텝','Steps in the Sunlight',233],
   [9,'작은 춤을 춰','A Little Dance',224],
   [10,'오늘도 산뜻하게','Fresh Again Today',260], /* 썸네일 기준(사용자 승인). 원본 파일명·Suno 제목·가사 후렴은 '고요한 아침의 빛 (Quiet Morning Light)' */
   [11,'정리된 오후의 노래','Song for a Tidy Afternoon',305], /* 썸네일 기준. 원본은 'Song of a Tidy Afternoon' */
   [12,'비 오는 날도 좋아','Rainy Days Are Good',243], /* 썸네일 기준(사용자 승인). 원본 파일명·Suno 제목·가사 후렴은 '비 오는 날의 정리 (Rainy Day Reset)' */
   [13,'함께여서 더 좋아','Better Together',260],
   [14,'내일도 괜찮을 거야','Tomorrow Will Be Okay',310],
   [15,'새로운 하루, 새로운 나','New Day, New Me',254]
  ]}
];

const mFile=(cat,no,ext)=>`${MUSIC_BASE}${cat}/${String(no).padStart(2,'0')}.${ext}`;
const mTime=s=>{s=Math.max(0,Math.round(s||0));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};
const mTotal=c=>Math.round(c.tracks.reduce((a,t)=>a+t[3],0)/60);

const MusicRoom={
 /* 감상실 소개 + 카테고리 목록 (메인 페이지 본문) */
 intro(){
  const cards=MUSIC_CATS.map((c,i)=>{
   const n=String(i+1).padStart(2,'0');
   if(!c.ready)return `<div class="mr-cat is-pending" aria-disabled="true"><div class="mr-cat-visual"><span class="number">${n}</span><span class="mr-soon">준비 중</span></div><div class="mr-cat-body"><strong>${esc(c.name)}</strong><small>순서대로 공개 예정</small></div></div>`;
   return `<a class="mr-cat" href="${route('music/'+c.id)}" aria-label="${esc(c.name)} 카테고리 듣기"><div class="mr-cat-visual"><img src="${mFile(c.id,'cover','webp')}" alt="${esc(c.name)} 플레이리스트 대표 썸네일" loading="lazy"><span class="number">${n}</span></div><div class="mr-cat-body"><strong>${esc(c.name)}</strong><small>${c.tracks.length}곡 · ${mTotal(c)}분</small></div><span class="round-arrow" aria-hidden="true">→</span></a>`;
  }).join('');
  return `<section id="music-room-root" class="music-slot mr-intro">${img('cover_music.webp','검은색 턴테이블 대표 이미지')}<div><h2>YUNA'S MUSIC ROOM</h2><p>Suno로 직접 기획하고 제작한 음악을 주제별로 모았습니다. 각 곡은 유튜브 플레이리스트에 쓰인 원본 제목과 썸네일 그대로입니다. 카테고리를 고르고 곡을 눌러 감상해 보세요.</p><span class="mr-credit">${esc(MUSIC_CREDIT)}</span></div></section>
  <h2 class="mr-section-title">주제별 카테고리</h2><div class="mr-cat-grid">${cards}</div>`;
 },
 /* #/music — 감상실 메인 페이지 (상단 메뉴에서 바로 진입) */
 page(){
  return `<div class="page"><header class="stage-heading"><div class="section-overline">04 / AI 음악 감상실</div><h1>AI 음악 감상실</h1><p class="lead">Suno로 만든 음악 감상실</p></header>${inStage(MusicRoom.intro(),'music')}</div>`;
 },
 /* #/music/<id> — 카테고리 상세 */
 category(id){
  const c=MUSIC_CATS.find(x=>x.id===id);
  if(!c||!c.ready)return notFound();
  const list=c.tracks.map(([no,ko,en,dur])=>`<button type="button" class="mr-track" data-mr-cat="${c.id}" data-mr-no="${no}" aria-label="${no}번 ${esc(ko)} 재생"><div class="mr-track-visual"><img src="${mFile(c.id,no,'webp')}" alt="${esc(ko)} 원본 썸네일" loading="lazy"><span class="mr-play" aria-hidden="true"><i class="mr-icon-play"></i></span><span class="mr-now">재생 중</span></div><div class="mr-track-body"><span class="mr-no">${String(no).padStart(2,'0')}</span><span class="mr-names"><strong>${esc(ko)}</strong>${en?`<small>${esc(en)}</small>`:''}</span><span class="mr-dur">${mTime(dur)}</span></div></button>`).join('');
  const body=`<div class="mr-hero"><img src="${mFile(c.id,'cover','webp')}" alt="${esc(c.name)} 플레이리스트 대표 썸네일"><div class="mr-hero-copy"><div class="section-overline">${esc(c.en||'PLAYLIST')}</div><p>${esc(c.desc||'')}</p><div class="meta-row"><span class="meta-tag">${c.tracks.length}곡 · 약 ${mTotal(c)}분</span><span class="meta-tag">Suno · AI 음악</span></div><button type="button" class="primary-button mr-playall" data-mr-cat="${c.id}" data-mr-no="${c.tracks[0][0]}">▶ 처음부터 전체 재생</button></div></div>
   <div class="mr-track-grid${c.playTop?' mr-play-top':''}${c.playLeft?' mr-play-left':''}${c.nowRight?' mr-now-right':''}">${list}</div><p class="mr-credit mr-credit-foot">${esc(MUSIC_CREDIT)} · ${esc(c.note||'모든 곡의 제목과 썸네일은 원본 그대로 사용했습니다.')}</p>`;
  return `<div class="page">${back('music','음악 감상실로 돌아가기')}<header class="stage-heading"><div class="section-overline">04 / AI 음악 감상실</div><h1>${esc(c.name)}</h1></header>${inStage(body,'music')}</div>`;
 }
};

/* ── 하단 플레이어: 페이지를 이동해도 계속 재생됩니다 ── */
const MusicPlayer=(()=>{
 let audio,bar,cat=null,idx=-1;
 const $=s=>bar.querySelector(s);
 function build(){
  audio=new Audio();audio.preload='metadata';
  bar=document.createElement('div');bar.className='mr-player';bar.hidden=true;bar.setAttribute('role','region');bar.setAttribute('aria-label','음악 플레이어');
  bar.innerHTML=`<div class="mr-player-inner"><img class="mr-p-thumb" alt=""><div class="mr-p-info"><strong class="mr-p-title"></strong><small class="mr-p-sub"></small></div>
   <div class="mr-p-controls"><button type="button" class="mr-p-btn" data-act="prev" aria-label="이전 곡">⏮</button><button type="button" class="mr-p-btn mr-p-main" data-act="toggle" aria-label="재생"><i class="mr-icon-play"></i></button><button type="button" class="mr-p-btn" data-act="next" aria-label="다음 곡">⏭</button></div>
   <div class="mr-p-seek"><span class="mr-p-cur">0:00</span><input type="range" min="0" max="1000" value="0" aria-label="재생 위치"><span class="mr-p-dur">0:00</span></div>
   <div class="mr-p-volume"><span aria-hidden="true">🔊</span><input type="range" min="0" max="100" value="100" step="1" aria-label="음악 볼륨 조절"><output aria-live="off">100%</output></div>
   <button type="button" class="mr-p-btn mr-p-close" data-act="close" aria-label="플레이어 닫기">✕</button></div>`;
  document.body.appendChild(bar);
  bar.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b)return;({prev:()=>step(-1),next:()=>step(1),toggle,close})[b.dataset.act]()});
  const seek=$('.mr-p-seek input');
  const volume=$('.mr-p-volume input');
  const volumeLabel=$('.mr-p-volume output');
  volume.addEventListener('input',()=>{audio.volume=Number(volume.value)/100;volumeLabel.textContent=volume.value+'%'});
  seek.addEventListener('input',()=>{if(audio.duration)audio.currentTime=seek.value/1000*audio.duration});
  audio.addEventListener('timeupdate',()=>{if(audio.duration){seek.value=audio.currentTime/audio.duration*1000;$('.mr-p-cur').textContent=mTime(audio.currentTime)}});
  audio.addEventListener('loadedmetadata',()=>{$('.mr-p-dur').textContent=mTime(audio.duration)});
  audio.addEventListener('play',sync);audio.addEventListener('pause',sync);
  audio.addEventListener('ended',()=>{if(idx<cat.tracks.length-1)step(1);else sync()});
  audio.addEventListener('error',()=>{$('.mr-p-sub').textContent='음원을 불러오지 못했습니다'});
  /* 다른 영상(한옥·현공사 등)이 재생되면 음악을 멈춰 소리가 겹치지 않게 함 */
  document.addEventListener('play',e=>{if(e.target!==audio&&e.target.tagName==='VIDEO')audio.pause()},true);
  if('mediaSession' in navigator){const ms=navigator.mediaSession;ms.setActionHandler('previoustrack',()=>step(-1));ms.setActionHandler('nexttrack',()=>step(1));}
 }
 function load(c,i,autoplay=true){
  if(!audio)build();
  cat=c;idx=i;const [no,ko,en]=c.tracks[i];
  audio.src=mFile(c.id,no,'mp3');
  $('.mr-p-thumb').src=mFile(c.id,no,'webp');
  $('.mr-p-title').textContent=`${String(no).padStart(2,'0')}. ${ko}`;
  $('.mr-p-sub').textContent=(en?en+' · ':'')+c.name;
  $('.mr-p-seek input').value=0;$('.mr-p-cur').textContent='0:00';$('.mr-p-dur').textContent=mTime(c.tracks[i][3]);
  bar.hidden=false;document.body.classList.add('mr-player-open');
  if('mediaSession' in navigator)navigator.mediaSession.metadata=new MediaMetadata({title:ko,artist:'Sohn Yuna (Suno)',album:c.name,artwork:[{src:mFile(c.id,no,'webp'),type:'image/webp'}]});
  if(autoplay)audio.play().catch(sync);
  sync();
 }
 function step(d){if(!cat)return;const j=idx+d;if(j>=0&&j<cat.tracks.length)load(cat,j)}
 function toggle(){if(!cat)return;audio.paused?audio.play().catch(()=>{}):audio.pause()}
 function close(){audio.pause();bar.hidden=true;document.body.classList.remove('mr-player-open');cat=null;idx=-1;sync()}
 function sync(){
  const playing=audio&&!audio.paused,cur=cat?cat.tracks[idx][0]:null;
  if(bar){const m=$('.mr-p-main');m.innerHTML=playing?'<i class="mr-icon-pause"></i>':'<i class="mr-icon-play"></i>';m.setAttribute('aria-label',playing?'일시정지':'재생');}
  document.querySelectorAll('.mr-track').forEach(el=>{
   const on=cat&&el.dataset.mrCat===cat.id&&Number(el.dataset.mrNo)===cur;
   el.classList.toggle('is-current',!!on);el.classList.toggle('is-playing',!!(on&&playing));
   el.setAttribute('aria-pressed',on&&playing?'true':'false');
  });
 }
 return {
  pick(catId,no,restart=false){
   const c=MUSIC_CATS.find(x=>x.id===catId);if(!c)return;
   const i=c.tracks.findIndex(t=>t[0]===no);
   if(!restart&&cat===c&&idx===i){toggle();return;} /* 같은 곡을 다시 누르면 일시정지/재생 */
   load(c,i);
  },
  sync
 };
})();

/* 카드·전체재생 클릭 처리, 페이지 이동 후 현재 곡 표시 복원 */
document.addEventListener('click',e=>{
 const t=e.target.closest('[data-mr-cat]');if(!t)return;
 MusicPlayer.pick(t.dataset.mrCat,Number(t.dataset.mrNo),t.classList.contains('mr-playall'));
});
window.addEventListener('hashchange',()=>setTimeout(MusicPlayer.sync,0));
