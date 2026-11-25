# Claude Code 인계 — YUNASLAB AI 음악 감상실

## 현재 기준 및 역할

이 폴더에는 **Suno 음원과 썸네일을 넣지 않았습니다.** 사용자가 이미 카테고리별로 분류한 MoodyMusic 원본 폴더는 현 상태 그대로 유지해야 합니다.

- 작업 위치: `#/works/music`
- 기존 표시 컨테이너: `<section id="music-room-root" data-music-slot="true" class="music-slot">…</section>`
- 코드: `app.js`의 `categoryPage('music')` 분기
- 공통 테마: `styles.css`의 CSS 변수 (`--bg`, `--panel`, `--accent`), Noto Sans KR, WORKS 헤더.
- 기존 이미지: `assets/images/cover_music.webp` (사용자 승인 턴테이블 이미지). 변경 금지.

## 지켜야 할 작업 방식

1. 사용자의 기존 음악 카테고리 이름과 소속 곡을 **그대로** 존중할 것.
2. 사용자가 가진 **원본 썸네일과 곡명**을 각 음원과 1:1로 연결할 것.
3. 카테고리를 **한 번에 하나씩** 확인·구현·검수하고 사용자의 승인을 받을 것.
4. 음원/이미지 원본 삭제, 임의 이동, 새로운 커버 생성, 장르 재분류 금지.
5. 감상실 카드를 눌렀을 때 해당 곡만 재생하며, 모바일에서 제목·썸네일·버튼이 잘리지 않도록 구현할 것.
6. `index.html`의 HOME/ABOUT/WORKS/TOOLS, 다른 WORKS 카테고리, 한옥 영상 10개, Page Flow 규칙은 손대지 말 것.
7. 로컬 37GB 원본을 그대로 GitHub 저장소에 업로드하지 말 것. 음원 호스팅 및 용량 계획은 사용자와 따로 승인받을 것.
8. 창작자 표기는 사용자의 검토에 따라 `손유나 · Sohn Yuna / AI-assisted Music Production` 등으로 명확하게 하고, 독립적 완전 수동 작곡을 주장하지 말 것.

## 제안하는 다음 작업

사용자의 로컬 MoodyMusic 카테고리 폴더 구조를 읽어 파일 목록(음원/썸네일/연결 짝)을 작성한 후, **첫 번째 카테고리만** 렌더링하고 실제 재생을 검증하여 승인받는다. 승인 후 다음 카테고리로 넘어간다.
