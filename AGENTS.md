# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## 프로젝트 개요

HTML / CSS / AI 도구만으로 만드는 반응형 **디지털 디자이너 포트폴리오** 사이트(영문). 작업 중심 큐레이션이며, 이력서 정보는 About 섹션에 요약 + PDF 다운로드로만 제공한다. **멀티 페이지** 구조를 목표로 하되(메인 `index.html` + 작품별 케이스 스터디 `work/project-*.html`), **현재는 메인 페이지만 구현**되어 있다. 콘텐츠는 실제 인물 **Hyoeun Kwak**(디지털 디자이너, `hyoeunkwak.myportfolio.com`) 기준이며 bio·연락처·프로젝트 설명은 **검토용 초안**(HTML `<!-- TODO(review) -->` 주석 표시).

전체 개발 순서·범위·완료 기준·단계별 체크리스트는 `ROADMAP.md`가 유일한 소스이므로, 작업 시작 전 반드시 참고하고 진행 상황에 맞춰 체크박스를 갱신한다.

남은 작업: 케이스 스터디 페이지 15종 + `work/_template.html` + `css/work.css` 생성(ROADMAP 12), bio·이메일·소셜·프로젝트별 설명/이미지 확정(ROADMAP 9), `favicon.ico` / `resume.pdf` 실제 파일(9), 품질 점검(10), 배포(11).

## 핵심 제약 (ROADMAP 기준)

- 빌드 도구·번들러·프레임워크 없음. 순수 HTML5 + CSS3.
- JavaScript는 최소한의 바닐라 JS만 (`js/main.js` 하나). 프레임워크 도입 금지.
- 백엔드·DB·CMS 없음. 정적 사이트로 GitHub Pages 등에 배포.
- CSS는 `css/variables.css`의 커스텀 프로퍼티(디자인 토큰)를 통해서만 색·폰트·간격·비율을 사용. 값 하드코딩 지양.
- 모바일 우선(Mobile First), 브레이크포인트 768px 기준.

## 구조

```
index.html              # 메인: hero → work(탭 + 배경 패널 4열 이미지 그리드) → about(이력 요약) → contact
css/reset.css           # 브라우저 기본 스타일 초기화
css/variables.css       # 디자인 토큰 (라이트/다크, 거의 모노크롬 + 블루 액센트 1색, 단일 서체 Inter,
                        #   위계 스케일 --fs-50~700 + 무게 --fw-*, --header-height / --ratio-work(3/2) / --ease)
css/style.css           # 공통(고정 topbar/플로팅 토글/footer/reveal/print) + 메인 페이지
js/main.js              # 테마 토글 + 스크롤 스파이 + reveal + 작품 필터 + 헤더 스크롤 상태 (다섯 개의 독립 IIFE)
assets/img/work/        # thumb-1~15.svg — 플레이스홀더, 교체 대상 (3:2, 모노크롬)
assets/favicon.svg      # 플레이스홀더 (favicon.ico 추가 예정)
assets/og-image.png     # 1200×630 플레이스홀더
assets/resume.pdf       # 플레이스홀더 (영문 이력으로 교체 예정)

# --- 다음 단계에서 생성 예정 (ROADMAP 12) ---
work/_template.html     # 케이스 스터디 템플릿 (배포 제외 — 파일명 앞 _)
work/project-1~15.html  # 케이스 스터디, ../ 상대경로로 css/js/assets 참조
css/work.css            # 케이스 스터디 전용 (풀블리드 이미지, case-meta 등)
assets/img/work/case-*  # 케이스 스터디 이미지
```

## 아키텍처 노트

- **상단바 + 우측 하단 플로팅 컨트롤**: `.topbar`는 `position: fixed` (높이 `var(--header-height)`), 마크업은 이름 → `.nav`만이고 CSS가 `.nav { margin-left: auto }`로 메뉴를 오른쪽에 붙인다. 기본은 투명이며 `js/main.js`의 `headerState` IIFE가 `window.scrollY > 8`에 `.topbar.is-scrolled`를 붙여 헤어라인 보더 + `backdrop-filter` 블러를 켠다. **우측 하단 `<div class="floating-ctrl">`**(상단바 밖 `<body>` 직속, `position: fixed`)에 위→아래로 **① `.theme-toggle`(테마 전환) ② `.to-top`(맨 위로)** 순서. `.to-top`은 `toTop` IIFE가 `scrollY > 400`에 `.is-visible`을 붙여 표시하고 클릭 시 `scrollTo({top:0, behavior:"smooth"})`. 고정 헤더이므로 `body { padding-top }` + `:root { scroll-padding-top }`로 겹침 방지. **새 페이지는 이 헤더 마크업·오프셋·플로팅 컨트롤을 그대로 따른다.**
- **스크롤 스파이**: `js/main.js`의 IIFE가 `IntersectionObserver`로 화면 중앙(`rootMargin: -45% 0 -45%`)의 `main > section[id]`을 찾아 대응하는 `.nav a[href*="#id"]`에 `.is-active`(액센트 언더라인)를 부여. `.nav` 또는 `section[id]`가 없으면 return → 케이스 페이지에서 무동작.
- **작품 그리드 & 탭 필터**: `#work`는 `<h2>WORK</h2>` + `.filters`(탭 스타일, 폰트 `--fs-400` = 네비와 동일 22px) + `.work-panel`(배경 `--color-surface` 패널, 컨테이너 폭 100%) 안의 `.work-grid`(`grid-template-columns: repeat(4, 1fr)`, ≤900px 2열 / ≤520px 1열). 각 작품은 **`figure.work-item[data-category]`**(현재 링크 없음 — 프로젝트 페이지는 ROADMAP 12), 카테고리: `product` / `campaign` / `visual` / `earlier`. 썸네일은 `aspect-ratio: var(--ratio-work)` (= `3 / 2`) + `object-fit: cover` → SVG/실제 이미지 3:2. `figcaption`은 제목(대문자) 위 / `분류 · 연도`(muted 대문자) 아래. `.filters [data-filter aria-pressed]` 클릭 시 `js/main.js` 필터 IIFE가 `item.hidden` 토글(활성 탭만 하단 액센트 언더라인). `.filters` 없으면 즉시 return.
- **케이스 스터디 추가 절차**: `ROADMAP.md` 12단계 참조.
- **다크 모드**: 모든 HTML `<head>`의 인라인 스크립트가 `localStorage.theme`를 읽어 `<html data-theme>` 설정(FOUC 방지) → `variables.css`가 `:root[data-theme="dark"]`와 `@media (prefers-color-scheme: dark)` 양쪽 정의 → `main.js`의 토글 IIFE가 전환. 새 페이지를 만들 때 이 스크립트를 반드시 포함한다. (OS 다크 + 명시적 라이트 토글 충돌을 막으려 `@media` 규칙은 `:root:not([data-theme="light"])`로 가드.)
- **스크롤 등장 효과**: `.reveal` 클래스 opt-in. `.is-visible`이 붙으며 나타난다. `prefers-reduced-motion` 시 즉시 표시.
- **팔레트**: 거의 모노크롬(화이트/잉크/중성 그레이). `--color-accent`(블루)는 토큰 유지하되 **기능 요소에만** — `:focus-visible` 아웃라인 / 활성 네비·탭 언더라인 / `.prose a` / `.hero__cta`·`.contact-links` hover. 그 외에는 잉크(`--color-text`)·그레이만.
- **타이포 시스템**: **단일 서체 Inter**(`--font-sans`, Aktiv Grotesk 스타일 대체). 위계는 **사이즈 + 무게** — `--fs-50`(12) / `--fs-100`(14) / `--fs-200`(16) / `--fs-300`(17, 본문) / `--fs-400`(22, 네비·탭·contact 링크) / `--fs-500`(32, 이름) / `--fs-600`(35, **섹션 타이틀** Work/About/Contact — `--fw-regular`, 라인·장식 없음) / `--fs-700`(60, hero h1 — `--fw-semibold`, 문장 표기), 무게 `--fw-regular`~`--fw-black`. **네비·탭·라벨·버튼·`dt`·섹션 타이틀은 대문자**(`text-transform: uppercase` + `--tracking-caps`/`--tracking-label`), **본문·hero h1·hero 스테이트먼트는 정상 표기**. HTML 텍스트 자체는 항상 정상 표기(이름은 `Hyoeun K`, CSS로 대문자화).
- **섹션 배경**: `#work`·`#contact` **두 섹션만** `background: var(--color-surface)` + `border-block` 헤어라인으로 가로 100% 색 블록 → 섹션 구분. hero·about은 기본 배경.
- **간격·컨테이너**: 모든 섹션이 `.container`(=`--container-max` + `--container-pad`) 하나만 쓰고 좌우 패딩을 개별 지정하지 않는다. `main > section`은 `padding-block: var(--section-y)`로 리듬 통일. `.section-head`는 `<h2>` 하나(+contact는 설명 `<p>`). 12열 그리드 유틸 `.grid` 존재. Work 그리드는 `repeat(4, 1fr)`, 캡션은 2줄 클램프로 행 정렬.
- **풀블리드 이미지**(케이스 페이지용, 예정): `work.css`의 `.case-figure--bleed`가 `width:100vw` + 음수 마진으로 컨테이너를 넘어 확장한다.
- Inter는 Google Fonts에서 로드. 오프라인/폰트 차단 시 `--font-sans` 폴백(system-ui …)으로 표시.

## 로컬 미리보기

상대경로(`work/`, `../`)와 `fetch` 없는 정적 파일이므로 서버 없이 열어도 되지만, 서버 권장:

```
python3 -m http.server 8000   # http://localhost:8000
```

## 품질 확인 (ROADMAP 10단계)

- HTML/CSS 검증(validator.w3.org) — 메인 + 케이스 페이지 전부
- Lighthouse 접근성·SEO 90점 이상이 완료 기준
- 크로스 브라우저: Chrome, Safari, Firefox
- 작품 필터, "Next project" 순환 링크, 다크 모드 유지 클릭 테스트

## 배포

`main` 브랜치를 GitHub에 푸시 후 GitHub Pages 활성화(대안: Netlify / Vercel / Cloudflare Pages). 배포 후 `work/` 상대경로와 이미지 로드를 URL에서 재확인. `_template.html`은 배포에서 제외.
