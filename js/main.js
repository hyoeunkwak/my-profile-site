/* ============================================================
   main.js — 다섯 개의 독립 IIFE
   1) 테마 토글  2) 스크롤 스파이  3) 스크롤 등장(reveal)  4) 헤더 스크롤 상태  5) 탑 버튼
   각 IIFE는 필요한 요소가 없으면 즉시 return → 프로젝트 상세 페이지에서도 안전하게 로드된다.
   ============================================================ */

/* ---------- 1) 테마 토글 ---------- */
(function themeToggle() {
  var btn = document.querySelector(".theme-toggle");
  if (!btn) return;

  var root = document.documentElement;

  function currentTheme() {
    var attr = root.getAttribute("data-theme");
    if (attr === "dark" || attr === "light") return attr;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function sync() {
    var isDark = currentTheme() === "dark";
    btn.setAttribute("aria-pressed", String(isDark));
    btn.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  }

  btn.addEventListener("click", function () {
    var next = currentTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {
      /* 스토리지 차단 환경 무시 */
    }
    sync();
  });

  sync();
})();

/* ---------- 2) 스크롤 스파이 (활성 네비) ---------- */
(function scrollSpy() {
  var nav = document.querySelector(".nav");
  var sections = document.querySelectorAll("main > section[id]");
  if (!nav || !sections.length || !("IntersectionObserver" in window)) return;

  var links = {};
  nav.querySelectorAll('a[href*="#"]').forEach(function (a) {
    var id = a.getAttribute("href").split("#")[1];
    if (id) links[id] = a;
  });

  function setActive(id) {
    Object.keys(links).forEach(function (key) {
      links[key].classList.toggle("is-active", key === id);
    });
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && links[entry.target.id]) {
          setActive(entry.target.id);
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();

/* ---------- 3) 스크롤 등장 효과 ---------- */
(function reveal() {
  var items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
  );

  items.forEach(function (el) {
    observer.observe(el);
  });
})();

/* ---------- 4) 헤더 스크롤 상태 ---------- */
(function headerState() {
  var bar = document.querySelector(".topbar");
  if (!bar) return;

  function update() {
    bar.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  update();
  window.addEventListener("scroll", update, { passive: true });
})();

/* ---------- 5) 탑 버튼 (스크롤 후 표시 + 맨 위로) ---------- */
(function toTop() {
  var btn = document.querySelector(".to-top");
  if (!btn) return;

  function update() {
    btn.classList.toggle("is-visible", window.scrollY > 400);
  }

  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  update();
  window.addEventListener("scroll", update, { passive: true });
})();
