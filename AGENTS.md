# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## 프로젝트 개요

HTML / CSS / AI 도구만으로 만드는 반응형 **디지털 디자이너 포트폴리오** 사이트(영문). 작업 중심 큐레이션이며, 이력서 정보는 About 섹션에 요약으로 제공한다(이력서 PDF 다운로드는 실제 영문 이력서 준비 전까지 비활성). **멀티 페이지** 구조(메인 `index.html` + 프로젝트 상세 `work/*.html`)이며, 지원 포지션(PTKOREA — Samsung.com 글로벌 관련)에 맞춰 **Samsung 프로젝트(2022–2024) → LG 프로젝트(2025–현재)** 경력 흐름을 전달하도록 구성되어 있다. 대표 프로젝트 3건은 **01 Switch to Galaxy / 02 Data Center Solutions(LG.com B2B) / 03 SmartThings Compatible Devices**이며 각각 `work/switch-to-galaxy.html` · `data-center-solutions.html` · `smartthings-compatible-devices.html`로 연결된다. 콘텐츠는 실제 인물 **Hyoeun Kwak**(디지털 디자이너, `hyoeunkwak.myportfolio.com`) 기준이다.

**공개 페이지 원칙**: 확인된 사실만 화면에 쓰고, 미확인 항목(담당 여부 · 런칭 상태 · URL · NDA · 수치 등)은 **화면에 표시하지 않은 채 HTML `<!-- TODO(review) -->` 주석으로만** 남긴다. NDA·고객 사용 승인이 확인되지 않은 이미지는 게시하지 않으며(현재 이미지는 전부 플레이스홀더), 정량 성과·평가는 만들지 않는다.

**용어 규칙**: 직접 디자인한 결과물과 본인 기여 범위를 보여주는 것이 목적이므로 연구·사례 보고서식 용어를 쓰지 않는다. 상세 페이지는 *Project Detail* 또는 프로젝트명, 링크는 *View Project*, 보조 목록은 *More Work*, 섹션은 *Context* · *My Role* · *Design Approach* · *What I Designed* · *Final Deliverables* · *Project Notes*로 통일한다.

전체 개발 순서·범위·완료 기준·단계별 체크리스트는 `ROADMAP.md`가 유일한 소스이므로, 작업 시작 전 반드시 참고하고 진행 상황에 맞춰 체크박스를 갱신한다.

남은 작업: **실제 프로젝트 이미지 연결(NDA·고객 승인 확인 후)**, 프로젝트별 `TODO(review)`(기간 · 런칭 상태 · URL · 팀/담당 범위) 확정(ROADMAP 9·12), LinkedIn URL · 실제 영문 이력서 PDF(가상 인물 `resume.pdf`는 working tree에서 제거함 — **라이브에는 push 전까지 남아 있음**), `favicon.ico` · `og-image.png`(9), 시각 검토 등 품질 점검(10), 검토 후 배포(11). **GitHub Pages가 이미 배포 중이므로 검토 전 push 금지.** 원격: `hyoeunkwak/my-profile-site`.

## 핵심 제약 (ROADMAP 기준)

- 빌드 도구·번들러·프레임워크 없음. 순수 HTML5 + CSS3.
- JavaScript는 최소한의 바닐라 JS만 (`js/main.js` 하나). 프레임워크 도입 금지.
- 백엔드·DB·CMS 없음. 정적 사이트로 GitHub Pages 등에 배포.
- CSS는 `css/variables.css`의 커스텀 프로퍼티(디자인 토큰)를 통해서만 색·폰트·간격·비율을 사용. 값 하드코딩 지양.
- 모바일 우선(Mobile First), 브레이크포인트 768px 기준.

## 구조

```
index.html              # 메인: hero(경력 흐름) → work(대표 프로젝트 3 + MORE WORK 8) → about(요약 + Working approach) → contact(이메일 · Blog)
css/reset.css           # 브라우저 기본 스타일 초기화
css/variables.css       # 디자인 토큰 (라이트/다크, 거의 모노크롬 + 블루 액센트 1색, 단일 서체 Inter,
                        #   위계 스케일 --fs-50~700 + 무게 --fw-*, --header-height / --ratio-work(3/2) · --ratio-wide(16/9) · --ratio-mobile(9/16) / --ease)
css/style.css           # 공통(고정 topbar/플로팅 토글/footer/reveal/print) + 메인 페이지(.hero__path, .feature, .more-grid, .approach)
css/work.css            # 프로젝트 상세 전용 (.project-hero/.project-meta/.project-path/.project-section/.project-figure--bleed/.project-nav)
js/main.js              # 테마 토글 + 스크롤 스파이 + reveal + 헤더 스크롤 상태 + 탑 버튼 (다섯 개의 독립 IIFE)
data/projects.json      # 전체 프로젝트 데이터 보존(사이트가 읽지 않음) — display: featured / more / candidate / archive
work/_template.html     # 프로젝트 상세 템플릿 — {{TOKEN}} 자리표시자, 배포 시 제외 검토
work/switch-to-galaxy.html · data-center-solutions.html · smartthings-compatible-devices.html   # 대표 프로젝트 상세 3종 (Previous/Next 순환, ../ 상대경로)
assets/img/work/        # thumb-1~15.svg(썸네일) · feature-*.svg(대표 3종) · project-placeholder-*.svg — 모두 플레이스홀더, 교체 대상
assets/favicon.svg      # 플레이스홀더 (favicon.ico 추가 예정)
assets/og-image.png     # 1200×630 플레이스홀더
# (assets/resume.pdf 는 가상 인물 파일이라 제거함 — 실제 영문 이력서 준비 후 추가하고 Hero·About의 다운로드 링크 복원)
```

## 아키텍처 노트

- **상단바 + 우측 하단 플로팅 컨트롤**: `.topbar`는 `position: fixed` (높이 `var(--header-height)`), 마크업은 이름 → `.nav`만이고 CSS가 `.nav { margin-left: auto }`로 메뉴를 오른쪽에 붙인다. 기본은 투명이며 `js/main.js`의 `headerState` IIFE가 `window.scrollY > 8`에 `.topbar.is-scrolled`를 붙여 헤어라인 보더 + `backdrop-filter` 블러를 켠다. **우측 하단 `<div class="floating-ctrl">`**(상단바 밖 `<body>` 직속, `position: fixed`)에 위→아래로 **① `.theme-toggle`(테마 전환) ② `.to-top`(맨 위로)** 순서. `.to-top`은 `toTop` IIFE가 `scrollY > 400`에 `.is-visible`을 붙여 표시하고 클릭 시 `scrollTo({top:0, behavior:"smooth"})`. 고정 헤더이므로 `body { padding-top }` + `:root { scroll-padding-top }`로 겹침 방지. **새 페이지는 이 헤더 마크업·오프셋·플로팅 컨트롤을 그대로 따른다.**
- **스크롤 스파이**: `js/main.js`의 IIFE가 `IntersectionObserver`로 화면 중앙(`rootMargin: -45% 0 -45%`)의 `main > section[id]`을 찾아 대응하는 `.nav a[href*="#id"]`에 `.is-active`(액센트 언더라인)를 부여. `.nav` 또는 `section[id]`가 없으면 return → 프로젝트 상세 페이지에서 무동작.
- **Work 구조(대표 프로젝트 + MORE WORK)**: `#work`는 `<h2>Work</h2>` 하나이고 **중간 제목 없이** 대표 프로젝트 3건(`article.feature`: Switch to Galaxy / Data Center Solutions / SmartThings Compatible Devices)이 바로 이어진다. 각 항목은 이미지(`a.feature__media`, `tabindex=-1 aria-hidden`로 중복 탭 정지 방지) + `.feature__body`(`.feature__head`(index · `h3`) · `dl.feature__meta` Client/Platform · Period · My role · `.feature__text`(요약 + `View Project` `.btn`)). 모바일 세로 → ≥768px 12열(이미지 7 / 텍스트 4, 짝수 항목 좌우 반전) → 첫 항목(`.feature--lead`)은 ≥1024px에서 이미지를 16:9 전폭으로 두고 텍스트를 아래 3단으로 배치. 그 아래 **`h3 More work`** + `ul.more-grid`(4열 × 2행 = 8건 → ≤900px 2열 → ≤520px 1열, 작은 3:2 썸네일 + 가벼운 캡션, **링크 없음 → 404 방지**): LG RAC / Aircare Buying Guide · LG Flatbed Microwave Oven PDP · #YouMake 2H Promotion · LG Global / PH HVAC Main Page · Galaxy A15 LTE / 5G PDP · LG B2B Commercial Laundry Page · Samsung B2B Home Appliances Asset · EPP Flash Sale Campaign. 남은 후보와 아카이브는 `data/projects.json`(`candidate` / `archive`). Design Operations는 프로젝트가 아니므로 About의 `Working approach`(`.approach`)로 설명한다. 필터는 제거했다(git 기록 참조).
- **프로젝트 상세**: `work/_template.html`에서 복제(순서: Project Hero(대표 이미지 `figure--hero` 포함 · 메타) → Context(Project requirements) → My Role(What I did · Judgment & proposals · Guidelines applied) → Design Approach(실제 수행 단계만) → What I Designed(모듈/비주얼 2) → Final Deliverables(확인된 Outcome 목록 + 데스크톱 1~2 · 모바일 1, 없는 산출물은 만들지 않음) → Project Notes → Project Navigation(Previous / Back to Work / Next)). 헤더·플로팅 컨트롤·FOUC 스크립트·`../` 경로·`css/work.css`·`../js/main.js` 포함. 섹션에는 `id`를 두지 않아(`aria-labelledby`만) 스크롤 스파이가 무동작이고 헤더 Work 링크는 정적 `is-active`. **미확인 항목은 화면에 표시하지 않고 페이지 상단 `TODO(review)` 주석에 모은다.** 본인 기여는 `I designed… / My contribution included…` 문형으로 팀·프로젝트 목적과 구분하고, 실제로 하지 않은 업무·리서치·수치는 쓰지 않는다. 추가 절차는 `ROADMAP.md` 12단계.
- **다크 모드**: 모든 HTML `<head>`의 인라인 스크립트가 `localStorage.theme`를 읽어 `<html data-theme>` 설정(FOUC 방지) → `variables.css`가 `:root[data-theme="dark"]`와 `@media (prefers-color-scheme: dark)` 양쪽 정의 → `main.js`의 토글 IIFE가 전환. 새 페이지를 만들 때 이 스크립트를 반드시 포함한다. (OS 다크 + 명시적 라이트 토글 충돌을 막으려 `@media` 규칙은 `:root:not([data-theme="light"])`로 가드.)
- **스크롤 등장 효과**: `.reveal` 클래스 opt-in. `.is-visible`이 붙으며 나타난다. `prefers-reduced-motion` 시 즉시 표시.
- **팔레트**: 거의 모노크롬(화이트/잉크/중성 그레이). `--color-accent`(블루)는 토큰 유지하되 **기능 요소에만** — `:focus-visible` 아웃라인 / 활성 네비·탭 언더라인 / `.prose a` / `.hero__cta`·`.contact-links` hover. 그 외에는 잉크(`--color-text`)·그레이만.
- **타이포 시스템**: **단일 서체 Inter**(`--font-sans`, Aktiv Grotesk 스타일 대체). 위계는 **사이즈 + 무게** — `--fs-50`(12) / `--fs-100`(14) / `--fs-200`(16) / `--fs-300`(17, 본문) / `--fs-400`(22, 네비·탭·contact 링크) / `--fs-500`(32, 이름) / `--fs-600`(35, **섹션 타이틀** Work/About/Contact — `--fw-regular`, 라인·장식 없음) / `--fs-700`(60, hero h1 — `--fw-semibold`, 문장 표기), 무게 `--fw-regular`~`--fw-black`. **네비·탭·라벨·버튼·`dt`·섹션 타이틀은 대문자**(`text-transform: uppercase` + `--tracking-caps`/`--tracking-label`), **본문·hero h1·hero 스테이트먼트는 정상 표기**. HTML 텍스트 자체는 항상 정상 표기(이름은 `Hyoeun K`, CSS로 대문자화).
- **섹션 배경**: `#work`·`#contact` **두 섹션만** `background: var(--color-surface)` + `border-block` 헤어라인으로 가로 100% 색 블록 → 섹션 구분. hero·about은 기본 배경.
- **간격·컨테이너**: 모든 섹션이 `.container`(=`--container-max` + `--container-pad`) 하나만 쓰고 좌우 패딩을 개별 지정하지 않는다. `main > section`은 `padding-block: var(--section-y)`로 리듬 통일. `.section-head`는 `<h2>` 하나(+contact는 설명 `<p>`). 12열 그리드 유틸 `.grid` 존재. MORE WORK 그리드는 `repeat(4, 1fr)`.
- **풀블리드 이미지**(프로젝트 상세): `work.css`의 `.project-figure--bleed`가 `width:100vw` + `margin-inline: calc(50% - 50vw)`로 컨테이너를 넘어 확장하고, 세로 스크롤바 폭 때문에 가로 스크롤이 생기지 않도록 `.project-output { overflow-x: clip }`.
- Inter는 Google Fonts에서 로드. 오프라인/폰트 차단 시 `--font-sans` 폴백(system-ui …)으로 표시.

## 로컬 미리보기

상대경로(`work/`, `../`)와 `fetch` 없는 정적 파일이므로 서버 없이 열어도 되지만, 서버 권장:

```
python3 -m http.server 8000   # http://localhost:8000
```

## 품질 확인 (ROADMAP 10단계)

- HTML/CSS 검증(validator.w3.org) — 메인 + 프로젝트 상세 페이지 전부
- Lighthouse 접근성·SEO 90점 이상이 완료 기준
- 크로스 브라우저: Chrome, Safari, Firefox
- "Previous/Next Project" 순환 링크, 다크 모드 유지 클릭 테스트

## 배포

GitHub Pages(`hyoeunkwak/my-profile-site`, `main` / `/`)가 **이미 활성화**되어 있어 `main` push = 라이브 변경이다(라이브: `https://hyoeunkwak.github.io/my-profile-site/`). 검토 전 push 금지. 배포 후 `work/` 상대경로와 이미지 로드를 URL에서 재확인. `_template.html`은 배포에서 제외하거나 삭제 검토(Pages는 `_` 파일도 서빙).
