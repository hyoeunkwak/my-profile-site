# ROADMAP

HTML / CSS / AI 도구만으로 만드는 반응형 **디지털 디자이너 포트폴리오**(영문).
이 문서가 개발 순서·범위·완료 기준의 **유일한 소스**다. 작업 시작 전 참고하고, 진행에 맞춰 체크박스를 갱신한다.

> **현재 상태**: 메인 페이지 완성. 콘텐츠는 실제 인물 **Hyoeun Kwak**(디지털 디자이너) 기준 — bio·연락처·
> 프로젝트 설명은 검토용 초안. 타이포 전면 재설정(단일 서체 **Inter**, 대문자 타이틀, 위계 = 사이즈+무게,
> 네비·탭 22px / 이름 32px), Work는 탭 + 배경 패널 **4열 이미지 그리드**(15개, 링크 없음). 거의 모노크롬 +
> 미세한 블루, 상단 고정 헤더 + 우측 하단 플로팅 테마 토글. 로컬 git 커밋.
> **다음**: 케이스 스터디 15종 + `_template.html` + `css/work.css`(12) → bio·이메일·소셜·프로젝트 설명/이미지
> 확정(9) → 품질 점검(10) → GitHub 배포(11, `sumin-portfolio` / public 예정).

---

## 핵심 제약

- 빌드 도구·번들러·프레임워크 없음. 순수 HTML5 + CSS3.
- JavaScript는 `js/main.js` 하나, 최소한의 바닐라 JS만. 프레임워크 금지.
- 백엔드·DB·CMS 없음. 정적 사이트로 배포.
- 색·폰트·간격·비율은 `css/variables.css`의 커스텀 프로퍼티(디자인 토큰)를 통해서만. 하드코딩 지양.
- 모바일 우선(Mobile First), 브레이크포인트 768px.

---

## 단계별 체크리스트

### 1. 프로젝트 셋업
- [x] 디렉터리 구조(`css/`, `js/`, `assets/img/work/`)
- [x] `.gitignore`, `.nojekyll`, `README.md`
- [x] git 초기화 + 첫 커밋 (로컬)

### 2. 디자인 설계
- [x] 팔레트: **거의 모노크롬(화이트/잉크/그레이) + 미세한 블루**(기능 요소 한정) — 라이트/다크
- [x] 헤더: **상단 고정 + 이름·메뉴만**, 스크롤 시 헤어라인+블러(`.is-scrolled`)
- [x] **테마 토글은 우측 하단 플로팅 버튼**(상단바에서 분리)
- [x] **단일 서체 Inter**(Aktiv Grotesk 스타일). 위계 = 사이즈(`--fs-50`~`--fs-700`) + 무게(`--fw-*`)
- [x] **내용 제외 모든 타이틀·버튼·네비·탭·라벨 대문자**. 네비·탭 22px / 이름(HYOEUN K) 32px
- [x] Work: 탭 + `--color-surface` 배경 패널 안 **4열 이미지 그리드**(≤900px 2열 / ≤520px 1열)
- [x] 작품 썸네일 비율 **3:2** (`--ratio-work`)
- [x] **간격 일관성**: `.container` 하나 + `--section-y` 통일 리듬, 헤어라인은 내부 컴포넌트만

### 3. 공통 CSS · 디자인 토큰
- [x] `css/reset.css`
- [x] `css/variables.css` — 색(3중 정의) / 타이포 / 간격 / 레이아웃(`--header-height`) / 모션(`--ease`)
- [x] `css/style.css` 공통부 — 고정 topbar, 본문 오프셋(`body padding-top` + `scroll-padding-top`), footer, `.reveal`, `@media print`

### 4. 메인 페이지 마크업 (`index.html`)
- [x] `<head>` — 메타/OG, favicon, Google Fonts, FOUC 방지 인라인 스크립트
- [x] `.topbar` (이름 → `.nav`), `.theme-toggle`는 `<body>` 직속 플로팅
- [x] `#hero` (h1 대문자 · 스테이트먼트 · `.hero__cta`) — 상단 메타 라인 제거
- [x] `#work` (`<h2>WORK</h2>` + 탭 `.filters` + `.work-panel > .work-grid` 안 `figure.work-item[data-category]` 15개, 링크 없음)
- [x] `#about` (eyebrow + `.prose` + `.summary-list` + 이력서 다운로드 링크) — 이름 `<h2>` 제거
- [x] `#contact` (`.contact-links`)
- [x] `.footer`

### 5. 메인 페이지 스타일 (`css/style.css`)
- [x] Inter 단일 서체, 대문자 타이틀/버튼/네비/탭, 위계 = 사이즈+무게
- [x] hero(유동 h1 대문자) / section-head(대문자 h2, contact도 동일 사이즈)
- [x] 탭 필터 22px + 활성 하단 액센트 언더라인, 모바일 가로 스크롤
- [x] `.work-panel`(배경색) + `.work-grid` 4열(≤900px 2열 / ≤520px 1열) + hover 미세 줌
- [x] about(이름 h2 없음) / contact / `.btn` / `.tag`
- [x] 반응형 640/768/900/1024px, 모바일 네비·탭 축소, 플로팅 토글

### 6. 다크 모드
- [x] `<head>` FOUC 방지 스크립트 (`localStorage.theme` → `<html data-theme>`)
- [x] `variables.css` — `:root[data-theme="dark"]` + `@media (prefers-color-scheme: dark)` 양쪽 정의 (모노크롬 리파인)
- [x] `main.js` 토글 IIFE (전환 + 저장 + `aria-pressed` 동기화)

### 7. 작품 필터
- [x] `.filters [data-filter]` 클릭 → `.work-item[data-category]`의 `hidden` 토글
- [x] `aria-pressed` 갱신, "All" 복원
- [x] `.filters` 없으면 즉시 return (케이스 페이지 안전)

### 8. 인터랙션 & 부가
- [x] 스크롤 스파이 — `IntersectionObserver`로 현재 섹션의 `.nav a`에 `.is-active`
- [x] 스크롤 등장 효과 — `.reveal` → `.is-visible` (work 그리드 `:nth-child` 스태거)
- [x] 헤더 스크롤 상태 — `headerState` IIFE가 `.topbar.is-scrolled` 토글
- [x] `prefers-reduced-motion` 대응
- [x] `.skip-link`, `:focus-visible` 전역 스타일

### 9. 실제 콘텐츠 · 에셋 교체
- [x] 가상 인물 → 실제 인물 **Hyoeun Kwak**, 프로젝트 15개(실제 제목/연도), 영문화
- [ ] bio 2문단 · summary-list 값 · 직함 확정 (현재 검토용 초안, HTML `<!-- TODO(review) -->`)
- [ ] 공개 이메일 · LinkedIn URL (현재 플레이스홀더)
- [ ] `assets/img/work/thumb-1~15` → 실제 작품 썸네일(3:2, 최적화)
- [ ] `assets/img/work/case-*` → 케이스 스터디 이미지
- [ ] `assets/favicon.svg` + `favicon.ico` (og-image는 반영됨)
- [ ] `assets/resume.pdf` → 실제 영문 이력서
- [ ] 프로젝트별 카테고리 확정 (현재 추정: product/campaign/visual/earlier)
- [ ] `index.html`의 OG `og:url` 실제 배포 URL로

### 10. 품질 점검
- [ ] HTML/CSS 검증 (validator.w3.org) — 메인 + 케이스 페이지 전부
- [ ] Lighthouse 접근성·SEO **90점 이상** (완료 기준)
- [ ] 크로스 브라우저: Chrome, Safari, Firefox
- [ ] 작품 필터 / "Next project" 순환 링크 / 다크 모드 유지 클릭 테스트
- [ ] 반응형 375 / 768 / 1280px, 가로 스크롤 없음
- [ ] 인쇄 미리보기 (헤더 숨김, 상단 여백 0)

### 11. 배포
- [ ] `gh` CLI 설치 + `gh auth login` (또는 github.com에서 `sumin-portfolio` 리포 수동 생성)
- [ ] `git remote add origin …` + `git push -u origin main`
- [ ] GitHub Pages 활성화 (Settings → Pages → Source: `main` / `/`)
- [ ] 배포 URL에서 `assets/` 상대경로 · 이미지 · 폰트 로드 재확인
- [ ] `README.md` · 이 문서에 배포 URL 기입 + `index.html`의 `og:url` 갱신
- [ ] (선택) 커스텀 도메인 + `CNAME`
- [ ] `_template.html`은 배포에서 제외 확인 (케이스 스터디 단계에서)

### 12. 케이스 스터디 추가 절차 (작품 1건당 반복)
1. `work/_template.html` → `work/project-N.html` 복제 후 내용 교체
2. `assets/img/work/`에 이미지 추가 (`case-N-a/b/c`)
3. `index.html` `.work-grid`에 `figure.work-item` 한 줄 추가 (또는 기존 링크 연결)
4. 이전 작품의 "Next project" 링크를 새 페이지로 연결 (순환)
5. `css/work.css` — 케이스 스터디 전용 스타일(풀블리드 이미지, `case-meta` 등). **아직 미생성.**

> 현재 `index.html`의 6개 작품은 `work/project-1~6.html`로 링크돼 있으나 해당 페이지는 아직 없다.
> 케이스 스터디 페이지를 만들기 전까지 클릭 시 404.

---

## 로컬 미리보기

```
python3 -m http.server 8000   # http://localhost:8000
```
