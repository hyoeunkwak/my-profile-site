# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

**디지털 디자이너 Hyoeun Kwak의 포트폴리오 사이트**(영문, 순수 HTML / CSS / 바닐라 JS). 기준은 본인의 Adobe Portfolio 사이트 `https://hyoeunkwak.myportfolio.com/` — **같은 구성·같은 프로젝트 15건**으로 구현한다(Work 그리드 · Contact 폼 · 프로젝트 본문). 상세 페이지는 따로 두지 않고 프로젝트를 **팝업(Behance 방식)** 으로 연다. 원격: `hyoeunkwak/my-profile-site`.

**공개 페이지 원칙**: 확인된 사실만 화면에 쓴다. 프로젝트명 · 연도 · 본문(이미지 · 텍스트)은 Adobe 사이트 원문 그대로이며(예: "(페이지 업데이트 예정)" 표기 포함) 새로 지어내지 않는다. NDA·고객 사용 승인 확인은 `index.html` 상단 `TODO(review)`로 남기고, **GitHub Pages가 이미 배포 중이므로 검토 전 push 금지.**

전체 개발 순서·범위·완료 기준은 `ROADMAP.md`가 소스이다(일부 항목은 이전 디자인 기준이라 이 문서가 우선).

## 핵심 제약 (ROADMAP 기준)

- 빌드 도구·번들러·프레임워크 없음. 순수 HTML5 + CSS3.
- JavaScript는 최소한의 바닐라 JS만(`js/main.js` 하나). 프레임워크 도입 금지.
- 백엔드·DB·CMS 없음. 정적 사이트로 GitHub Pages 등에 배포.
- CSS는 `css/variables.css`의 커스텀 프로퍼티(디자인 토큰)를 통해서만 색·폰트·간격·비율을 사용. 값 하드코딩 지양.
- 모바일 우선(Mobile First), 브레이크포인트 768px 기준.

## 구조

```
index.html              # Work(홈): 고정 nav(H 로고 · 메뉴 · 검색) → 2단 프로젝트 그리드(15) → 팝업 <dialog> + 프로젝트별 <template id="tpl-슬러그">
experiences.html        # Experiences: 타임라인 · Tools · Working approach
contact.html            # Contact: 이름 · 이메일 · 메시지 폼(제출 시 mailto)
css/reset.css           # 브라우저 기본 스타일 초기화
css/variables.css       # 디자인 토큰(단일 서체 Inter, 어두운 테마 #000000(순흑) 고정 — <html data-theme="dark">)
css/style.css           # 헤더 · .work-grid/.tile · Contact · .to-top · 팝업(.project-modal*) · 본문 모듈(.module-row/.module-text)
js/main.js              # 맨 위로 버튼 · reveal · 프로젝트 팝업 · 사이트 검색 · Contact mailto (바닐라 IIFE 6개)
assets/img/portfolio/{slug}/cover.jpg · m-1.jpg…   # 커버(1200px) + 본문 이미지(가로 ≤1600px JPEG)
assets/favicon.svg · favicon.ico · apple-touch-icon.png · og-image.png
assets/resource/        # 작업 원본(PDF · 보드 · PSD · xlsx) — .gitignore 로 git 제외
(이전 디자인 잔재: work/*.html · css/work.css · assets/img/work/* — 사이트에서 링크하지 않는다, 정리 대상)
```

## 아키텍처 노트

- **참고 사이트**: `hyoeunkwak.myportfolio.com` — 어두운 배경(#111), 2단 커버 그리드, 프로젝트 본문은 이미지 · 텍스트 모듈을 세로로 쌓음, 우하단 원형 ↑ 버튼(푸터가 보이면 푸터 높이만큼 올라가 푸터 위까지만 배치 — `--to-top-lift`), Contact 폼. 서체는 Adobe Fonts(타이프킷 `tscy`)라 쓸 수 없어 Inter로 대체한다.
- **헤더(nav)**: 검정 바(`--color-nav-bg`)가 **스크롤해도 상단 고정**(`position: fixed`, 높이 64 → 80, **전폭 · 좌우 여백 = 콘텐츠와 같은 `--page-pad`(48, 모바일 32)** — 로고는 왼쪽 여백선, 메뉴는 화면 가운데, 검색은 오른쪽 여백선; 참고: digitas.com/en-us/work). 구성 = 좌 **H 화이트 로고**(`.site-logo`, Home 링크 · 글리프 20×20px 정사각 · 모양은 파비콘 H 와 동일(`assets/favicon.svg`의 path, 굵은 세로줄)) · 중앙 **Work / Experiences / Contact**(`.site-nav`, 현재 페이지 밑줄) · 우 **검색 아이콘**(`.site-search-toggle`). **모바일(<768px)에서는 가운데 메뉴가 숨고 우측에 검색 + 햄버거(가로 3줄) 버튼**이 놓이며, 햄버거를 누르면 헤더 아래 **전체 화면 블랙 오버레이**에 큰 메뉴(Work · Experiences, Contact 는 흰 알약 버튼)가 뜨고 아이콘은 X 로 바뀐다(Esc · 링크 클릭 · 검색 열기 · 데스크톱 폭 전환 시 닫힘, 열림 중 `html.is-menu-open` 스크롤 잠금; `siteMenu` IIFE). 모든 페이지가 같은 마크업을 쓴다. `body { padding-top: var(--header-height) }`.
- **검색**: 아이콘을 누르면 nav 아래로 블랙 패널(`.site-search`)이 펼쳐지고, 입력하면 프로젝트 제목 · 연도로 실시간 필터(여러 단어는 모두 일치). 결과(4:3 썸네일 위에 프로젝트명 · 연도를 블랙 딤으로 표기)를 누르면 index 에서는 팝업이 바로 열리고, 다른 페이지에서는 `index.html#슬러그` 로 이동해 팝업이 열린다. Enter = 첫 결과, Esc · ✕ · 바깥 클릭 = 닫기. 검색 데이터는 각 페이지의 `<script type="application/json" id="search-data">`(프로젝트 15건: id · cover · title · year · 화면에 표시하지 않는 `keywords`). **한글 · 영문 · 브랜드명 검색**(삼성 · samsung · LG · 엘지 · 포켓라이스 · 노스페이스 …)이 되도록 `keywords`에 각 프로젝트 **오버뷰 이미지에 적힌 텍스트**(Global Site 문구 · 개요 · Client · 제품명)와 `data/projects.json`의 확인된 client · 이전 프로젝트명만 넣는다 — 이미지에 없는 사실은 지어내지 않는다. 비교는 대소문자 · 공백 · 구두점을 무시한다(`스마트 싱스` = `스마트싱스`, `dr martens` = `Dr. Martens`). 새 프로젝트를 추가하면 `keywords`도 함께 쓴다.
- **공통 페이지 포맷(Experiences · Contact)**: Experiences · Contact 모두 `<html class="page-light">`로 **화이트 배경**(nav 만 블랙)(`variables.css`의 `:root.page-light` 토큰 오버라이드 — nav 는 `--color-nav-*` 라 블랙 유지), `main.page` = **중앙 정렬 · 1600px 캔버스**(좌우 `--page-pad` 포함 최대 1600) + **페이지명이 아닌 카피 헤드라인**(64px `h1.page__title`) + 보조 문장 `.page__lede`(참고: digitas.com lets-connect · what-we-do).
- **Contact(`contact.html`)**: 헤드라인 "Let’s connect." · 밑줄형 필드(이름/이메일 2열 + 메시지) · 알약 전송 버튼 · 하단 **푸터**(Work · Experiences · Contact 공통 `footer.site-footer`, 상단 헤어라인, 배경 = `--color-footer-bg`(#000000 블랙) · 안쪽 `.site-footer__inner`는 최대 1600(좌우 `--page-pad` 포함)에서 **좌측 저작권 `©2026 HYOEUN KWAK`(`.site-footer__legal`, 12px(`--fs-50`) · 색 `--color-footer-text` #777777, 연도는 정적 값 — 해가 바뀌면 갱신) · 우측 소셜 글리프 4개**(좁은 폭에서는 줄바꿈) · 페이지 하단에 고정 `body.has-footer`)에 **Gmail · YouTube Music(플레이리스트) · Tistory · LinkedIn 순서의 24px 화이트 단색 글리프 4개**(아이콘마다 viewBox 로 시각 크기를 맞춤, 아이콘 사이 시각 간격 40px 이하, 라벨 없음; 본문 → 푸터 160(모바일 128), 푸터 상하 40; 새 창, `rel="noopener noreferrer"`; Gmail 은 작성 창 `mail.google.com/mail/?view=cm&to=…`). 서버가 없어 제출하면 `mailto:`로 메일 앱이 열린다.
- **Experiences(`experiences.html`)**: 카피 헤드라인 "Designing experiences, end to end." → Experience 타임라인 카드 3 → **Tools 단일 패널**(제목 "Tools"를 패널 배경 안에 넣고 Fields of work 와 같은 5:7 2단 — 왼쪽 제목 · 오른쪽 아이콘, 왼쪽 정렬; Figma · Adobe Firefly · Photoshop · Illustrator · ChatGPT · Claude Code — `assets/img/logos/` 의 App Store 앱 아이콘, Illustrator 는 로컬 설치 앱 아이콘, Claude Code 는 Claude 앱 아이콘; 개별 카드로 쪼개지 않는다) → **Fields of work**(왼쪽 소개는 스크롤 시 고정(sticky) · 오른쪽 분야 목록 `ol.field-list` — Campaigns(#YouMake · EPP) · Marketing Pages(Switch to Galaxy · Healthcare · Fashion · Retail CRM) · Product Detail Pages · UX/UI · B2B Asset · Product Design(F&B Brand Product Design — 촬영/패키지/웹디자인) · Exhibition Graphic & Editorial(2011–2012, World IT Show KT 부스 · 브로슈어 등), 분야마다 포트폴리오 프로젝트 링크 `index.html#슬러그`로 15건을 한 번씩; 참고: digitas.com what-we-do). 순서: Experience → Fields of work → Tools. 페이지 하단에 Contact 와 **같은 푸터**(`footer.site-footer`, `body.has-footer`)를 쓴다. 이전 About 의 확인된 사실만 사용(회사명 · 기간은 `TODO(review)`).
- **Work 그리드(`.work-grid`)**: 모바일 1열 → ≥768px **2열**. **썸네일은 4:3(`.tile__link`)** — 좌우 마진 `--page-pad`(48), 썸네일 사이(가로 · 세로) 간격 `--grid-gap`(24). **프로젝트명(대문자) · 연도는 이미지 위 가운데 정렬**(`.tile__caption`, 어두운 막 `--scrim`, 호버 시 `--scrim-strong` + 이미지 1.04배). 순서 = Flatbed Microwave Oven · Compatible Devices Page · Switch to Galaxy · Watch Bands Product Page · #YouMake 2023 Campaign · EPP Flash Sale Campaign · Home Appliances B2B Key Visual · Galaxy A15 Product Page · OLED TV S95C · S90C Product Page · Healthcare Contents & Marketing · F&B Product Design · Fashion Contents · Retail CRM & Marketing · Exhibition Graphic · Editorial. 커버는 Adobe 사이트의 커버 이미지 그대로.
- **프로젝트 팝업(Behance 참고)**: 카드(`button.tile__link.project-open[data-id]`)를 누르면 `<dialog class="project-modal">`이 열린다. **제목 영역은 두지 않고 이미지만 노출**하며(접근성용 `aria-label`만 JS로 설정), 본문은 `<template id="tpl-{id}">`(이미지 · `.module-row`(2단 이미지) · `.module-text`)를 복제해 틈 없이 쌓는다(**`.module-text`는 패널 폭 1600 기준 좌우 160px 마진을 뺀 1280px 영역(좌우 10%)을 쓰고, 텍스트 모듈 사이 간격 80px · 텍스트 묶음의 위/아래 마진 160px(모바일 96px), 프로젝트 정보는 라벨 | 값 2열 `.module-facts`**)(로드 시 페이드 인). 하단 **You may also like**(다음 4건, 블랙 딤 `--scrim-more`)는 메인 그리드처럼 **4:3 썸네일 위 가운데 정렬 캡션(프로젝트명 대문자 + 연도, 어두운 막, 호버 확대)**. **이전/다음 · 닫기는 같은 규격의 배경 없는 글리프 아이콘**(48px 박스 · stroke 2 미디엄 무게). **아이콘 색은 뒤 배경 밝기에 따라 자동 반전**(어두우면 화이트 · 밝으면 블랙) — `js/main.js`가 버튼 아래 이미지를 캔버스로 샘플링해 `data-tone="light|dark"`를 설정(스크롤 · 리사이즈 · 이미지 로드마다 갱신, 딤 배경 · 텍스트 모듈 · You may also like 영역은 어두움 취급). 위치: **≥1024px 패널 폭 `min(100% - 192px, 1600px)`(팝업 최대 1600)로 좌우 거터를 만들고 버튼은 화면 좌우 `--page-pad`(48)**, <1024px 는 콘텐츠 위에 얹음; **닫기는 모든 폭에서 우상단, 이전/다음은 좌 · 우 세로 가운데**. 키보드 ← → 도 지원. **주소 해시 연동**(`#slug`), 닫기 = 우상단 X · Esc · 백드롭 클릭(**딤 60% — 배경이 살짝 비침**, `--color-backdrop`), 스크롤바 숨김, 닫히면 트리거로 포커스 복귀, 열림 중 `html.is-modal-open` 스크롤 잠금. 열릴 때 포커스는 본문(`tabindex="-1" autofocus`)으로 가서 닫기 버튼에 포커스 링이 뜨지 않는다.
- **Contact**: 서버가 없어 제출하면 입력 내용으로 메일 앱(`mailto:hyoeunkwak@gmail.com`)이 열린다.
- **이미지 규칙**: 본문 이미지는 가로 ≤1600px JPEG. 긴 보드는 **빈 줄에서만 잘라**(슬라이스를 이어 붙이면 원본이 복원) 고정 높이로 자르지 않는다. 보드가 로컬에 있는 8건(Compatible · Switch · Watch Bands · YouMake · EPP · B2B · A15 · OLED)은 `assets/resource` 원본을 슬라이스하고, 나머지(Flatbed · Healthcare · F&B · Fashion · Retail CRM · Exhibition · Editorial)와 모든 커버는 Adobe 사이트에서 받은 이미지이다.
- **간격 · 토큰**: **콘텐츠 좌우 마진 `--page-pad` = 32(모바일) → 768px↑ 48, 콘텐츠 사이 간격 `--grid-gap` = 24(모든 폭 고정)** — 모든 페이지(Work · Experiences · Contact · 팝업 More 영역 · 검색 결과)가 같은 값을 쓴다. 그 밖의 margin · padding · gap은 8px 배수(`--space-N`). 색 · 폰트 크기는 토큰만 사용. 허용 예외: 헤어라인/보더, 마이크로 모션 이동량.
- **접근성**: 팝업은 네이티브 `<dialog>`(포커스 트랩 · Esc), 버튼은 `aria-haspopup="dialog"`, `prefers-reduced-motion`에서 확대·페이드를 끈다.

## 로컬 미리보기

`fetch` 없는 정적 파일이므로 서버 없이 열어도 되지만, 서버 권장:

```
python3 -m http.server 8000   # http://localhost:8000
```

## 품질 확인 (ROADMAP 10단계)

- HTML/CSS 검증(validator.w3.org) — 메인 + 프로젝트 상세 페이지 전부
- Lighthouse 접근성·SEO 90점 이상이 완료 기준
- 크로스 브라우저: Chrome, Safari, Firefox
- 팝업 15건 열기 · 이전/다음 · ← → · Esc · 해시 진입 · Contact mailto 클릭 테스트

## 배포

GitHub Pages(`hyoeunkwak/my-profile-site`, `main` / `/`)가 **이미 활성화**되어 있어 `main` push = 라이브 변경이다(라이브: `https://hyoeunkwak.github.io/my-profile-site/`). 검토 전 push 금지. 배포 후 이미지 로드를 URL에서 재확인. 이전 디자인 잔재(`work/` · `css/work.css` · `assets/img/work/`)는 배포 전에 정리한다.
