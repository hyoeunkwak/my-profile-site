# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## 프로젝트 개요

HTML / CSS / AI 도구만으로 만드는 반응형 **디지털 디자이너 포트폴리오** 사이트(영문). 작업 중심 큐레이션이며, 이력서 정보는 About 섹션에 요약으로 제공한다(이력서 PDF 다운로드는 실제 영문 이력서 준비 전까지 비활성). **멀티 페이지** 구조(메인 `index.html` + 프로젝트 상세 `work/*.html`)이며, 지원 포지션(PTKOREA — Samsung.com 글로벌 관련)에 맞춰 **Samsung 프로젝트(2022–2024) → LG 프로젝트(2025–현재)** 경력 흐름을 전달하도록 구성되어 있다. 대표 프로젝트 3건은 **01 Switch to Galaxy / 02 Data Center Solutions(LG.com B2B) / 03 SmartThings Compatible Devices**이며 각각 `work/switch-to-galaxy.html` · `data-center-solutions.html` · `smartthings-compatible-devices.html`로 연결된다. 콘텐츠는 실제 인물 **Hyoeun Kwak**(디지털 디자이너, `hyoeunkwak.myportfolio.com`) 기준이다.

**공개 페이지 원칙**: 확인된 사실만 화면에 쓰고, 미확인 항목(담당 여부 · 런칭 상태 · URL · NDA · 수치 등)은 **화면에 표시하지 않은 채 HTML `<!-- TODO(review) -->` 주석으로만** 남긴다. NDA·고객 사용 승인이 확인되지 않은 이미지는 게시하지 않으며(현재 이미지는 전부 플레이스홀더), 정량 성과·평가는 만들지 않는다.

**용어 규칙**: 직접 디자인한 결과물과 본인 기여 범위를 보여주는 것이 목적이므로 연구·사례 보고서식 용어를 쓰지 않는다. 상세 페이지는 *Project Detail* 또는 프로젝트명, 링크는 *View Project*, 보조 목록은 *More Work*, 상세 섹션은 *What I Designed* · *Final Deliverables* · *More Projects*, 개요 항목은 *Role* · *Contribution* · *Constraints* · *Deliverables* · *Key decisions* · *Takeaway*로 통일한다.

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
index.html              # 메인: hero(헤드라인 + 서브) → work(대표 프로젝트 3 + MORE WORK 8) → about(선언문 · 사실 · Working approach) → contact(선언문 · 이메일)
css/reset.css           # 브라우저 기본 스타일 초기화
css/variables.css       # 디자인 토큰 (라이트/다크, 거의 모노크롬 + 블루 액센트 1색, 단일 서체 Inter,
                        #   위계 스케일 --fs-50~700 + 무게 --fw-*, --header-height / --ratio-work(3/2) · --ratio-wide(16/9) · --ratio-mobile(9/16) / --ease)
css/style.css           # 공통(고정 GNB 알약/플로팅 토글/footer/reveal/print) + 메인 페이지(.hero, .feature, .more-grid, .about-*, .approach, .contact-*)
css/work.css            # 프로젝트 상세 전용 (.project-hero/.project-meta/.project-path/.project-section/.project-figure--bleed/.project-nav)
js/main.js              # 테마 토글 + 스크롤 스파이 + reveal + 헤더(알약 + 모바일 메뉴) + 탑 버튼 + More work 팝업 (여섯 개의 독립 IIFE — 마지막이 More work 팝업)
data/projects.json      # 전체 프로젝트 데이터 보존(사이트가 읽지 않음) — display: featured / more / candidate / archive
work/_template.html     # 프로젝트 상세 템플릿 — {{TOKEN}} 자리표시자, 배포 시 제외 검토
work/switch-to-galaxy.html · data-center-solutions.html · smartthings-compatible-devices.html   # 대표 프로젝트 상세 3종 (Previous/Next 순환, ../ 상대경로)
assets/img/work/        # thumb-1~15.svg(썸네일) · feature-*.svg(대표 3종) · project-placeholder-*.svg — 모두 플레이스홀더, 교체 대상
assets/favicon.svg      # 플레이스홀더 (favicon.ico 추가 예정)
assets/og-image.png     # 1200×630 플레이스홀더
# (assets/resume.pdf 는 가상 인물 파일이라 제거함 — 실제 영문 이력서 준비 후 추가하고 Hero·About의 다운로드 링크 복원)
```

## 아키텍처 노트

- **GNB(상단바 · 참고: wolffolins.com)**: `<header class="topbar">` > `.topbar__bar`(알약) > `a.topbar__name`(워드마크 35px bold) · `button.topbar__toggle`(모바일 햄버거, `aria-expanded` · `aria-controls="primary-nav"`) · `nav.nav#primary-nav`(링크 20px regular 연한 색, 현재 섹션만 진하게 — 밑줄 없음). **상단(scrollY ≤ 8)**: 콘텐츠 폭 + 좌우 24의 전폭 투명 바(워드마크 글자가 콘텐츠 가장자리에 정렬). **스크롤(`.topbar.is-scrolled`)**: 가운데로 모이는 알약 — `clamp(32rem, 70%, 56rem)`(모바일 `min(24rem, 100% - 32px)`), 배경 `--color-surface` 85% + `backdrop-filter: blur(24px)`(`::before`가 200ms 페이드), 반경 32, 폭 전환 **650ms `--ease-quint`**. **모바일(<768px)**: 햄버거로 알약이 아래로 펼쳐지며(`.is-open`, `max-height` 300ms) 링크가 35px로 세로 정렬, 열림 중에는 배경이 항상 보이고, 링크 클릭 · Esc · 768px↑ 전환 시 닫힘(`js/main.js` `header` IIFE). 닫힌 모바일 메뉴 링크는 `visibility: hidden`이라 포커스를 받지 않는다. `.topbar`는 `position: fixed`(`--header-height` 72 → 88, `pointer-events: none`이고 바만 `auto`), `body { padding-top }` + `:root { scroll-padding-top }`로 겹침 방지. **우측 하단 `<div class="floating-ctrl">`**(상단바 밖 `<body>` 직속)에 위→아래로 **① `.theme-toggle` ② `.to-top`**(스크롤 > 400에 표시). **새 페이지는 이 헤더 마크업·플로팅 컨트롤을 그대로 따른다**(프로젝트 상세는 링크가 `../index.html#…`, Work 링크만 정적 `is-active` + `aria-current`).
- **스크롤 스파이**: `js/main.js`의 IIFE가 `IntersectionObserver`로 화면 중앙(`rootMargin: -45% 0 -45%`)의 `main > section[id]`을 찾아 대응하는 `.nav a[href*="#id"]`에 `.is-active`(액센트 언더라인)를 부여. `.nav` 또는 `section[id]`가 없으면 return → 프로젝트 상세 페이지에서 무동작.
- **Work 구조(대표 프로젝트 + MORE WORK)**: `#work`는 `<h2>Work</h2>` 하나이고 **중간 제목 없이** 대표 프로젝트 3건(`article.feature`: Switch to Galaxy / Data Center Solutions / SmartThings Compatible Devices)이 바로 이어진다. 카드는 `article.feature > a.feature__link`(카드 전체가 하나의 링크)이며, 참고 사이트(wolffolins.com/work)처럼 **12열 그리드(`.feature-grid`)에 크기가 다른 카드를 엇갈려 배치**한다 — 01 `--wide` 전폭(12열) / 02 `--left` 1~6열 / 03 `--right` 8~12열(5열), 쌍은 세로 중앙 정렬, 행 간격 64 → 1024px↑ 96, 모바일은 한 줄. 카드 구성은 3:2 이미지(`.feature__media`, 호버 시 1.05배 + 중앙 `.feature__hint`) → 제목(`h3` 20px 흰색) → 한 줄 설명(`.feature__tagline` 20px 회색) → 태그(`ul.feature__tags` 14px 알약: 플랫폼 · 기간 · Role 항목). 번호 · `View Project` 버튼 · 메타 표는 두지 않는다(상세 페이지에서 제공). **페이지 전체의 열 기준선은 1열 / 7열(2열 분할) · 1/4/7/10열(More work 4열)뿐이며, 텍스트가 시작하는 선은 모두 이 선 위에 둔다**(Hero 국문 · About · Contact · More work 3번째 열이 같은 7열 선). 그 아래 **`h3 More work`** + `ul.more-grid`(4열 × 2행 = 8건 → ≤900px 2열 → ≤520px 1열, 작은 3:2 썸네일 + 가벼운 캡션; 항목 전체가 `button.more-item__open`이라 **클릭하면 페이지 전환 없이 `<dialog class="project-modal">` 팝업(비핸스식)이 열린다** — 제목 · 메타 · 이미지 스택, 닫기 = 우상단 고정 원형 X · Esc · 바깥(백드롭) 클릭, 닫히면 트리거로 포커스 복귀, 열림 중 `html.is-modal-open`으로 배경 스크롤 잠금, 모바일은 전체 화면 시트. 이미지는 버튼의 `data-images="경로1, 경로2"`로 늘리고 없으면 썸네일 1장. 상세 페이지는 만들지 않으므로 404 없음): LG RAC / Aircare Buying Guide · LG Flatbed Microwave Oven PDP · #YouMake 2H Promotion · LG Global / PH HVAC Main Page · Galaxy A15 LTE / 5G PDP · LG B2B Commercial Laundry Page · Samsung B2B Home Appliances Asset · EPP Flash Sale Campaign. 남은 후보와 아카이브는 `data/projects.json`(`candidate` / `archive`). Design Operations는 프로젝트가 아니므로 About의 `Working approach`(`.approach`)로 설명한다. 필터는 제거했다(git 기록 참조). **썸네일은 선(보더·점선 프레임) 없이 이미지가 프레임을 가득 채우며**(플레이스홀더 SVG도 단색 면 + 라벨만), 마우스오버·키보드 포커스(`.feature:focus-within`) 시 이미지가 1.05배 확대된다. 대표 카드는 추가로 `.feature__hint`(이미지 중앙의 48px 원형 → 버튼, 단색 반전, `aria-hidden`)가 확대되며 나타나고, More work는 링크가 없으므로 확대만 적용한다. `prefers-reduced-motion`에서는 확대·이동을 끈다.
- **프로젝트 상세**(참고: wolffolins.com/work/instacart의 구조): `work/_template.html`에서 복제. **상단 대표 이미지**(`figure--hero`, 제목보다 먼저) → **개요**(`.project-overview`, ≥1024px 12열: 좌 4열 = `h1` + `dl.project-facts`(Client/Platform · Period, 라벨 진하게/값 연하게), 우 8열 = 한 문장 `.project-lede`(영문|국문, 22px) → `dl.project-rows`(Role · Contribution) → **More Info** `<details class="project-more">`(접이식, JS 없음: Constraints · Deliverables · Key decisions · Takeaway)) → What I Designed(2-up) → Final Deliverables(전폭 · 모바일 1은 24rem) → **More Projects**(이전/다음 = 이미지 **아래**에 제목 + `Previous/Next Project` 메타, 호버 확대 · Back to Work). **블록 사이 간격은 `--section-y`(64 → 96 → 128) 하나로 통일**(`.project > .container { display: grid; gap: var(--section-y) }`), 페이지 하단 여백 160, 이미지 간격은 `--grid-gap`. 선·배경 밴드 없음. 텍스트는 개요에만 두고 **Context · My Role · Design Approach · Project Notes 섹션은 두지 않는다**(요구사항 · 가이드는 Constraints 한 줄, 판단은 Key decisions, 배운 점은 Takeaway로 병합 — 사실 항목은 삭제하지 않음). 개요 우측에서 처음 보이는 영문은 약 60~80단어이고 나머지는 More Info에 접혀 있다. 헤더·플로팅 컨트롤·FOUC 스크립트·`../` 경로·`css/work.css`·`../js/main.js` 포함. 스크롤 스파이는 `section[id]`가 없어 무동작이고 헤더 Work 링크는 정적 `is-active`. **미확인 항목은 화면에 표시하지 않고 페이지 상단 `TODO(review)` 주석에 모은다.** **내용 글은 영문(좌) · 국문(우) 2단**(`.bi` / `.bi-list`, 모바일은 영문 → 국문 순으로 쌓음)이며 국문은 사용자 브리프 원문(축약만)을 쓴다(캡션 국문만 번역). 제목·라벨·프로젝트명은 영문 단독. 영/국 쌍 사이에는 `p + p` 간격을 주지 않는다(국문이 아래로 밀리는 버그 방지). 추가 절차는 `ROADMAP.md` 12단계.
- **다크 모드**: 모든 HTML `<head>`의 인라인 스크립트가 `localStorage.theme`를 읽어 `<html data-theme>` 설정(FOUC 방지) → `variables.css`가 `:root[data-theme="dark"]`와 `@media (prefers-color-scheme: dark)` 양쪽 정의 → `main.js`의 토글 IIFE가 전환. 새 페이지를 만들 때 이 스크립트를 반드시 포함한다. (OS 다크 + 명시적 라이트 토글 충돌을 막으려 `@media` 규칙은 `:root:not([data-theme="light"])`로 가드.)
- **스크롤 등장 효과**: `.reveal` 클래스 opt-in. `.is-visible`이 붙으며 나타난다. `prefers-reduced-motion` 시 즉시 표시.
- **팔레트**: 거의 모노크롬(화이트/잉크/중성 그레이). `--color-accent`(블루)는 토큰 유지하되 **기능 요소에만** — `:focus-visible` 아웃라인 / `.btn`·`.contact-links` hover. 그 외에는 잉크(`--color-text`)·그레이만.
- **타이포 시스템(메인 페이지, 한 스케일 · 굵기 regular — 위계는 크기 + 색)**: **단일 서체 Inter**. **L1 64px**(`--fs-700`, 자간 `--tracking-display`, line-height 1) hero 헤드라인 **하나만** / **L2 35px**(`--fs-600`) 섹션 타이틀(Work · About · Contact · More work) · About/Contact 선언문 · Working approach 제목 · 이메일 · 워드마크 / **L3 20px**(`--fs-350`) 프로젝트 제목(흰색) · 한 줄 설명(회색) · 국문 서브/선언문 번역 줄(hero · About · Contact — 영문보다 작고 연하게) · 서브/리드 · 요약 · 목록 · 보조 링크 · GNB / **L4 16px**(`--fs-200`) 메타 라벨(진하게)·값(연하게) · 사실 목록 · More work 항목명 · `.btn` / **L5 14px**(`--fs-100`) 캡션 · 번호 · 푸터. 대문자(`text-transform`) · 12px · 17px · 22px · 32px · semibold는 메인에서 쓰지 않는다(굵기 예외는 워드마크 bold). 프로젝트 상세(`work.css`)는 기존 `--fs-400`(22) 등을 계속 쓴다.
- **섹션 구분(선 없이 배경 명암)**: 섹션 경계에 헤어라인을 쓰지 않는다. `main > section`을 배경 토큰으로 교차시킨다 — hero(`--color-bg`) → `#work`(`--color-surface`) → `#about`(bg) → `#contact`(surface) → footer(bg). hero는 **영문 헤드라인(그리드 밖 전폭, ≥1280px에서 두 줄 고정) + 그 아래 국문 서브만**(경력 흐름 · CTA 없음; 패딩 위 96 / 아래 160, 모바일 64/96). About(참고: wolffolins.com/about) = 라벨 → 35px 선언문(`.about-statement`) + 국문 줄(`.statement-ko`) → `라벨 | 내용` 3행(`.about-facts`: Experience 타임라인 `.about-timeline` · Tools · Working approach 6줄 `.about-list`). Working approach 설명문 · 번호 · 큰 소제목은 중복이라 두지 않는다. **About · Contact 선언문은 `.statement-grid` 2단 분할 — 영문(좌 1~6열) | 국문 · Contact 링크(우 7~12열)로 가로 겹침 없이 첫 줄 기준선을 맞추고(≥1024px), 1024px 미만은 영문 아래에 쌓는다.** About의 라벨|내용(`.about-facts > div`, ≥768px 2열)도 같은 7열 선에서 내용이 시작한다. Contact = 라벨 → 35px 선언문(`.contact-statement`) + 국문 줄 → 큰 이메일 링크 + 보조 링크. 선언문은 `text-wrap: balance`. 하위 제목 밑줄 없음. 남은 선은 `.btn` 밑줄(링크 신호)과 스크롤 시 알약 헤더의 블러 배경뿐이다(표 성격의 행 구분선도 제거).
- **간격·그리드(8px 체계)**: 모든 margin · padding · gap은 **8px 배수**만 쓴다. `--space-N` = N × 8px(`1`=8 · `2`=16 · `3`=24 · `4`=32 · `5`=40 · `6`=48 · `7`=56 · `8`=64 · `9`=72 · `10`=80 · `12`=96 · `16`=128 · `20`=160). 화면 폭에 따라 연속으로 변하는 `clamp()` 대신 **단계값**만 쓴다 — `--container-pad` 24 → 768px↑ 40 → 1280px↑ 56(≤359px는 16), `--section-y` 64 → 96 → 128, `--grid-gap` 16 → 24 → 32, `--header-height` 72 → 88, `--container-max` 1408. 라벨 열(10rem=160 · 8rem=128 · 2rem=32)과 버튼(3rem=48)도 8배수. 라벨과 값이 같은 줄에 놓이는 곳은 `padding-top` 광학 보정 대신 `align-items: baseline`을 쓴다. 허용 예외: 헤어라인/보더 두께, 마이크로 모션 이동량(4px 힌트), 자동 중앙 정렬 마진. 모든 섹션이 `.container`(=`--container-max` + `--container-pad`) 하나만 쓰고 좌우 패딩을 개별 지정하지 않는다. `main > section`은 `padding-block: var(--section-y)`(프로젝트 상세 섹션은 64 → 96). `.section-head`는 `<h2>` 하나(+contact는 설명 `<p>`). 12열 그리드 유틸 `.grid` 존재. MORE WORK 그리드는 `repeat(4, 1fr)`.
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
