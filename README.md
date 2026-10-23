# Hyoeun Kwak — Digital Designer Portfolio

순수 HTML5 + CSS3 + 최소 바닐라 JS로 만든 반응형 정적 포트폴리오(영문). 빌드 도구·프레임워크 없음.
Samsung 프로젝트(2022–2024) → LG 프로젝트(2025–현재) 경력 흐름을 중심으로 구성.

- **저장소**: <https://github.com/hyoeunkwak/my-profile-site>
- **라이브**: <https://hyoeunkwak.github.io/my-profile-site/> (GitHub Pages — 현재 배포본은 개편 이전 버전)
- **현재 상태**: 메인 + 대표 프로젝트 상세 3종(Switch to Galaxy · Data Center Solutions · SmartThings Compatible Devices) 반영. 확인된 사실만 화면에 쓰고 미확인 항목은 HTML `<!-- TODO(review) -->` 주석으로만 남김. **이미지는 NDA·고객 승인 확인 전이라 전부 플레이스홀더.** 가상 인물 `resume.pdf`는 제거했고(라이브에는 push 전까지 남아 있음), 실제 영문 이력서가 준비되면 다운로드 링크를 복원.
- 다음 작업·완료 기준은 [`ROADMAP.md`](ROADMAP.md), 아키텍처는 [`CLAUDE.md`](CLAUDE.md).

## 로컬 미리보기

```bash
python3 -m http.server 8000   # http://localhost:8000
```

정적 파일이라 `index.html`을 브라우저로 바로 열어도 되지만, 상대경로 확인을 위해 서버 실행을 권장.

## 구조

```
index.html          메인 (hero → work[대표 프로젝트 3 + MORE WORK 8] → about[+ Working approach] → contact)
work/               프로젝트 상세 (switch-to-galaxy · data-center-solutions · smartthings-compatible-devices) + _template.html
css/                reset · variables(디자인 토큰) · style(공통+메인) · work(프로젝트 상세)
js/main.js          테마 토글 · 스크롤 스파이 · reveal · 헤더 스크롤 상태 · 탑 버튼
data/projects.json  전체 프로젝트 데이터 보존(사이트가 읽지 않음) — 노출 상태(featured / more / candidate / archive)
assets/             SVG 썸네일/플레이스홀더 · favicon · og-image (모두 플레이스홀더)
```

## 프로젝트 추가

1. `work/_template.html`을 `work/<slug>.html`로 복제하고 `{{TOKEN}}`을 교체(확인되지 않은 내용은 `project-pending` + `TODO(review)`).
2. 대표 프로젝트면 `index.html`의 `article.feature`에 추가, 아니면 `.more-grid`에 `li.more-item` 추가(`candidate` 항목은 콘텐츠·이미지가 준비되면 승격). 데이터는 `data/projects.json`에도 반영.
3. 상세 페이지들의 Previous / Next 링크를 순환이 유지되도록 갱신.
4. 이미지는 NDA·고객 사용 승인을 확인한 뒤에만 연결.

## 배포

`main` 브랜치를 GitHub에 푸시하면 GitHub Pages(Source: `main` / `/`)가 갱신된다. 이미 활성화되어 있으므로 **push = 라이브 변경**이다. 검토 후에만 push할 것.
`.nojekyll`이 포함돼 있어 Jekyll 처리 없이 그대로 서빙된다. `work/_template.html`은 템플릿이므로 배포 시 제외/삭제를 검토.
