# Hyoeun Kwak — Digital Designer Portfolio

순수 HTML5 + CSS3 + 최소 바닐라 JS로 만든 반응형 정적 포트폴리오(영문). 빌드 도구·프레임워크 없음.

- **라이브**: _(배포 후 기입: `https://<owner>.github.io/<repo>/`)_
- **현재 상태**: 메인 페이지 골격 완료. bio·연락처·프로젝트 설명은 검토용 초안(HTML `<!-- TODO(review) -->`), 이미지·favicon·resume는 플레이스홀더.
- 다음 작업·완료 기준은 [`ROADMAP.md`](ROADMAP.md), 아키텍처는 [`CLAUDE.md`](CLAUDE.md).

## 로컬 미리보기

```bash
python3 -m http.server 8000   # http://localhost:8000
```

정적 파일이라 `index.html`을 브라우저로 바로 열어도 되지만, 상대경로 확인을 위해 서버 실행을 권장.

## 구조

```
index.html          메인 (hero → work → about → contact)
css/                reset · variables(디자인 토큰) · style
js/main.js          테마 토글 · 스크롤 스파이 · reveal · 작품 필터 · 헤더 스크롤 상태 (5개 IIFE)
assets/             SVG 썸네일 · favicon · og-image · resume (모두 플레이스홀더)
```

## 배포

`main` 브랜치를 GitHub에 푸시 → GitHub Pages(Settings → Pages → Source: `main` / `/`) 활성화.
`.nojekyll`이 포함돼 있어 Jekyll 처리 없이 그대로 서빙된다.
