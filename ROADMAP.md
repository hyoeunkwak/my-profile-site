# ROADMAP

HTML / CSS / AI 도구만으로 만드는 반응형 **디지털 디자이너 포트폴리오**(영문).
이 문서가 개발 순서·범위·완료 기준의 **유일한 소스**다. 작업 시작 전 참고하고, 진행에 맞춰 체크박스를 갱신한다.

> **현재 상태**: 메인 페이지 + 대표 프로젝트 상세 3종 **확정 브리프 반영 완료 — 이미지는 NDA·고객 승인 확인 전이라 플레이스홀더**.
> 대표: **01 Switch to Galaxy / 02 Data Center Solutions(LG.com B2B) / 03 SmartThings Compatible Devices**
> (`work/switch-to-galaxy.html` · `data-center-solutions.html` · `smartthings-compatible-devices.html`).
> MORE WORK 8건(4×2): LG RAC / Aircare Buying Guide · LG Flatbed Microwave Oven PDP · #YouMake 2H Promotion · LG Global / PH HVAC Main Page ·
> Galaxy A15 LTE / 5G PDP · LG B2B Commercial Laundry Page · Samsung B2B Home Appliances Asset · EPP Flash Sale Campaign.
> 남은 후보(Galaxy Watch7 / X2 Bands · LG AX-R Washing Machine PDP)와 아카이브는 `data/projects.json`. 경력 흐름: Samsung 2022–2024 → LG 2025–현재.
> **확인된 사실만 화면에 쓰고, 미확인 항목은 화면에 표시하지 않은 채 `TODO(review)` 주석으로만 남긴다.**
> 가상 인물 `assets/resume.pdf`는 working tree에서 삭제(스테이징됨)했다 — **라이브에는 push 전까지 남아 있다.**
> 원격은 `https://github.com/hyoeunkwak/my-profile-site.git`(`main`, GitHub Pages **이미 배포 중** — 배포본은 개편
> 이전 버전). **검토 전에는 push 금지.**

---

## 핵심 제약

- 빌드 도구·번들러·프레임워크 없음. 순수 HTML5 + CSS3.
- JavaScript는 `js/main.js` 하나, 최소한의 바닐라 JS만. 프레임워크 금지.
- 백엔드·DB·CMS 없음. 정적 사이트로 배포.
- 색·폰트·간격·비율은 `css/variables.css`의 커스텀 프로퍼티(디자인 토큰)를 통해서만. 하드코딩 지양.
- 모바일 우선(Mobile First), 브레이크포인트 768px.
- 공개되지 않은 성과·수치·역할·고객 평가를 만들지 않는다. 확인이 필요한 내용은 HTML `<!-- TODO(review) -->`.
- 내부 가이드 원본·NDA 위반 가능성이 있는 내용은 노출하지 않는다.

---

## 단계별 체크리스트

### 1. 프로젝트 셋업
- [x] 디렉터리 구조(`css/`, `js/`, `assets/img/work/`, `work/`, `data/`)
- [x] `.gitignore`, `.nojekyll`, `README.md`
- [x] git 초기화 + 첫 커밋, 원격 `hyoeunkwak/my-profile-site` 연결

### 2. 디자인 설계
- [x] 팔레트: **거의 모노크롬(화이트/잉크/그레이) + 미세한 블루**(기능 요소 한정) — 라이트/다크
- [x] 헤더: **상단 고정 + 이름·메뉴만**, 스크롤 시 헤어라인+블러(`.is-scrolled`)
- [x] **테마 토글은 우측 하단 플로팅 버튼**(상단바에서 분리)
- [x] **단일 서체 Inter**(Aktiv Grotesk 스타일). 위계 = 사이즈(`--fs-50`~`--fs-700`) + 무게(`--fw-*`)
- [x] **내용 제외 모든 타이틀·버튼·네비·탭·라벨 대문자**. 네비·탭 22px / 이름(HYOEUN K) 32px
- [x] Work: **대표 프로젝트 3(첫 항목 전폭 + 이후 좌우 교차) + MORE WORK 8(작은 썸네일, 4열 × 2행 → 2열 → 1열)**
- [x] 작품 썸네일 비율 **3:2** (`--ratio-work`), 프로젝트 상세 와이드 16:9 (`--ratio-wide`), 모바일 결과물 9:16 (`--ratio-mobile`)
- [x] Work 썸네일: **선 없이 프레임 가득**(플레이스홀더의 점선 프레임 제거) + **마우스오버 · 포커스 확대**(대표는 중앙 원형 → 버튼 추가, reduced-motion 대응)
- [x] **간격 일관성**: `.container` 하나 + `--section-y` 통일 리듬, 헤어라인은 내부 컴포넌트만
- [x] **섹션 구분은 선 없이 배경 명암**(hero bg → Work surface → About bg → Contact surface → footer bg), 하위 제목 밑줄 · hero 경력 흐름 상단선 · footer 상단선 제거

### 3. 공통 CSS · 디자인 토큰
- [x] `css/reset.css`
- [x] `css/variables.css` — 색(3중 정의) / 타이포 / 간격 / 레이아웃(`--header-height`) / 비율 / 모션(`--ease`)
- [x] **8px 간격 체계**: `--space-N` = N×8px(4px·12px 토큰 제거), 컨테이너 패딩 · 섹션 패딩 · 그리드 갭을 연속 `clamp()`에서 **8배수 단계값**(768px / 1280px)으로 전환, 라벨 광학 패딩 → `align-items: baseline`, 상세 페이지 섹션 상하 여백 확대(64 → 96). 모든 요소의 computed margin/padding/gap 8배수 검수 통과(375/768/1280/1518px)
- [x] `css/style.css` 공통부 — 고정 topbar, 본문 오프셋(`body padding-top` + `scroll-padding-top`), footer, `.reveal`, `@media print`

### 4. 메인 페이지 마크업 (`index.html`)
- [x] `<head>` — 메타/OG(Samsung.com + LG.com 문구), favicon, Google Fonts, FOUC 방지 인라인 스크립트
- [x] `.topbar` (이름 → `.nav`), `.theme-toggle`는 `<body>` 직속 플로팅
- [x] `#hero` (h1 · 설명 · 경력 흐름 `.hero__path`(2022–2024 → 2025–Present) · CTA: View selected work)
- [x] `#work` — `<h2>Work</h2>` 하나 + 대표 프로젝트 `article.feature` 3건(중간 제목 없음, `View Project` 링크) + `h3 More work`(`ul.more-grid` 4건, 링크 없음)
- [x] 노출하지 않는 프로젝트는 `data/projects.json`에 보존(featured / more / candidate / archive, HTML 주석 코드 없음)
- [x] `#about` (짧은 소개 2문단 + `.summary-list` + **Working approach**) — 이력서 다운로드 링크는 실제 PDF 준비 전까지 숨김
- [x] `#contact` (`.contact-links`)
- [x] `.footer`

### 5. 메인 페이지 스타일 (`css/style.css`)
- [x] Inter 단일 서체, 대문자 타이틀/버튼/네비/탭, 위계 = 사이즈+무게
- [x] hero(유동 h1) + 경력 흐름 / section-head(대문자 h2, contact도 동일 사이즈)
- [x] 탭 필터 22px + 활성 하단 액센트 언더라인, 모바일 가로 스크롤
- [x] `.feature`(+`--lead`) 배치 + `.more-grid` 4열 + `.approach`
- [x] about / contact / `.btn` / `.tag`
- [x] 반응형 320/340/400/640/768/900/1024px (375px에서 헤더 메뉴가 잘리지 않도록 보정)

### 6. 다크 모드
- [x] `<head>` FOUC 방지 스크립트 (`localStorage.theme` → `<html data-theme>`) — 프로젝트 상세 페이지 포함
- [x] `variables.css` — `:root[data-theme="dark"]` + `@media (prefers-color-scheme: dark)` 양쪽 정의
- [x] `main.js` 토글 IIFE (전환 + 저장 + `aria-pressed`/`aria-label` 동기화, 영문)

### 7. 작품 필터
- [x] **제거함** — HTML · CSS(`.filters`/`.filter-btn`) · JS(필터 IIFE) 모두 삭제(프로젝트 수가 적어 실익 없음, git 기록으로 복구 가능). 공통 코드(`backdrop-filter` 등)는 유지

### 8. 인터랙션 & 부가
- [x] 스크롤 스파이 — `IntersectionObserver`로 현재 섹션의 `.nav a`에 `.is-active` (프로젝트 상세 페이지는 `section[id]` 없음 → 무동작, 헤더 Work는 정적 `is-active`)
- [x] 스크롤 등장 효과 — `.reveal` → `.is-visible`
- [x] 헤더 스크롤 상태 / 탑 버튼(숨김 상태에서는 `visibility: hidden`으로 포커스 제외)
- [x] `prefers-reduced-motion` 대응
- [x] `.skip-link`, `:focus-visible` 전역 스타일

### 9. 실제 콘텐츠 · 에셋 교체
- [x] 가상 인물 → 실제 인물 **Hyoeun Kwak**, 프로젝트 데이터 영문화
- [x] 확정 브리프 반영: 대표 3건(기간 · 역할 · Contribution · Deliverables · Requirements · Approach · Notes), MORE WORK 8건, 경력 기간(Samsung 2022–2024 / LG 2025–현재), 공개 이메일 `hyoeunkwak@gmail.com`
- [x] 가상 인물 `assets/resume.pdf` 제거 + Hero·About 다운로드 링크 숨김 (복원 방법은 `index.html` TODO 주석)
- [ ] **실제 프로젝트 이미지 연결** — 대표 3건(Hero · What I Designed 2 · Final Deliverables) + MORE WORK 8건. NDA·고객 사용 승인·내부 가이드/어드민/코멘트/사내 수치 제거 확인 후. 현재는 `feature-*.svg` · `project-placeholder-*.svg` · `thumb-*.svg` 플레이스홀더
- [ ] 프로젝트별 미확인 항목(상세 페이지 상단 `TODO(review)`): 정확한 기간 · 런칭 상태 · 공개 URL · 팀 구성 · 담당 범위 체크 · 미확인 Requirements/Process 항목 · 모바일 산출물
- [ ] Data Center Solutions 공개 표기명 확정 ("Data Center Solutions" vs "LG Data Center Solutions"), 페이지 전체 UX/UI 단독 수행으로 읽히지 않는지 확인
- [ ] MORE WORK: RAC/Aircare Buying Guide · HVAC Main Page · B2B Commercial Laundry Page 연도, 기존 항목(Galaxy A15 · B2B Home Appliances Asset · EPP)과의 동일 여부, 남은 후보 2개(`candidate`) 승격 여부, 아카이브(Pocket Rice · World IT Show 2012 · Tripitaka 2011) 역할 서술·영문 명칭 검수
- [ ] LinkedIn URL (미확정 → 목록에서 제외, 이전 값은 `index.html` 주석)
- [ ] 실제 영문 이력서 PDF → `assets/resume.pdf` 추가 후 다운로드 링크 복원
- [ ] bio 2문단 · summary-list(Tools · Experience "2012 – present") · 직함 확정
- [ ] `assets/favicon.svg` + `favicon.ico`, `assets/og-image.png`(이전 문구 "Product · Campaign · Visual" → 새 포지셔닝)
- [x] `index.html`의 `og:url` / `og:image` → `https://hyoeunkwak.github.io/my-profile-site/` (커스텀 도메인 사용 시 재변경)

### 10. 품질 점검
- [ ] HTML/CSS 검증 (validator.w3.org) — 메인 + 프로젝트 상세 페이지 전부
- [ ] Lighthouse 접근성·SEO **90점 이상** (완료 기준)
- [ ] 크로스 브라우저: Chrome, Safari, Firefox
- [x] "Previous / Next Project" 순환 · Back to Work · 다크 모드 토글 동작 확인 (로컬, DOM 기준)
- [x] 반응형 375 / 768 / 1280px 가로 스크롤 없음 (메인 + 프로젝트 상세 3종, iframe 측정)
- [x] 내부 링크·상대경로 점검 (깨진 링크 0, 상세 3종 상호 순환)
- [x] 텍스트 명도 대비 AA(4.5:1) — 라이트/다크 토큰 쌍 계산 확인
- [ ] 실제 브라우저에서 시각 검토(스크린샷) — 개발 환경의 미리보기 패널이 너무 좁아 육안 검토 미실시
- [ ] 키보드 단독 조작 실측(Tab 순서는 DOM 기준 확인, 포커스 링 육안 확인 필요)
- [ ] 인쇄 미리보기 (헤더 숨김, 상단 여백 0)

### 11. 배포
- [x] 원격 `hyoeunkwak/my-profile-site` 연결, `main` push 상태 (로컬 = 원격 `7299b17`, 개편 전)
- [x] GitHub Pages 활성화 — `https://hyoeunkwak.github.io/my-profile-site/` 200 확인 (개편 전 버전)
- [ ] **개편 내용 검토 후** commit(승인 후) → push(별도 요청 시). 가상 이력서 제거는 push 해야 라이브에 반영됨
- [ ] 배포 URL에서 `assets/` · `work/` 상대경로 · 이미지 · 폰트 로드 재확인
- [ ] (선택) 커스텀 도메인 + `CNAME`
- [ ] `_template.html`은 배포에서 제외 확인 (GitHub Pages는 `_` 파일도 서빙하므로 필요 시 삭제/이동)

### 12. 프로젝트 상세
대표 3건 구조·카피 구현 완료, 이미지는 플레이스홀더.
- [x] `css/work.css` (Project Hero · 메타 · 섹션 · 갤러리/풀블리드 · Project Navigation)
- [x] 상세 페이지 내용 글 **영문(좌) · 국문(우) 2단**(국문은 브리프 원문, 모바일은 쌓임) + **헤어라인 제거**(여백·배경 밴드로 구분), 목록 들여쓰기 수정
- [x] `work/_template.html` (Hero(대표 이미지 + 메타 표: Contribution · Constraints · Deliverables) → What I Designed → Final Deliverables → Project Notes(Key decisions · Takeaway) → Project Navigation) — **Context · My Role · Design Approach 폐지, 텍스트는 메타 표와 Project Notes 두 곳**
- [x] More Projects: 이전/다음을 **이미지 아래에 제목**을 두는 카드로 변경(이미지 위 글씨 + 스크림 방식 폐기), Back to Work
- [x] `work/switch-to-galaxy.html` / `data-center-solutions.html` / `smartthings-compatible-devices.html` (Previous / Next 순환, Back to Work)
- [ ] 이미지·캡션(영문/국문)·alt 를 실제 원본 기준으로 교체 (캡션 초안은 현재 반영됨, 국문 캡션은 번역본이라 검수)
- [ ] 미확인 항목 확정 후 해당 섹션에 반영 (화면에 표시하지 않던 항목은 확정되면 추가)
- [ ] 이후 프로젝트 추가 시: README의 "프로젝트 추가" 절차

### 13. 지원용 개편 (PTKOREA — Samsung.com 글로벌 관련 포지션)
- [x] Hero: 새 헤드라인/설명 + 경력 흐름 + CTA
- [x] Work: WORK 하나 안에서 대표 3 + MORE WORK 8 위계 분리, 필터 제거, 용어 통일(Project Detail 계열)
- [x] 대표 프로젝트 확정(Switch to Galaxy / Data Center Solutions / SmartThings Compatible Devices), 확정 브리프 카피 반영
- [x] About 단문화 + Working approach(Design Operations를 프로젝트 카드 대신 역량으로)
- [x] 메타 설명 / OG 문구, README · ROADMAP 저장소/배포 정보 정리
- [x] 404로 가는 링크 없음, 미확인 항목 비표시(TODO 주석 관리), 가상 이력서 제거
- [ ] 위 9·12단계 이미지·미확인 항목 확정 후 사용자 검토 → 배포

---

## 로컬 미리보기

```
python3 -m http.server 8000   # http://localhost:8000
```
