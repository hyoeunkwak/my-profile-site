/* ============================================================
   main.js — 여섯 개의 독립 IIFE
   1) 테마 토글  2) 스크롤 스파이  3) 스크롤 등장(reveal)  4) 헤더(알약 + 모바일 메뉴)  5) 탑 버튼  6) More work 팝업
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

/* ---------- 4) 헤더: 스크롤 시 알약 모양 + 모바일 메뉴 ---------- */
(function header() {
  var bar = document.querySelector(".topbar");
  if (!bar) return;

  function update() {
    bar.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  update();
  window.addEventListener("scroll", update, { passive: true });

  var btn = bar.querySelector(".topbar__toggle");
  var nav = bar.querySelector(".nav");
  if (!btn || !nav) return;

  function setOpen(open) {
    bar.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  btn.addEventListener("click", function () {
    setOpen(!bar.classList.contains("is-open"));
  });

  nav.addEventListener("click", function (event) {
    if (event.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && bar.classList.contains("is-open")) {
      setOpen(false);
      btn.focus();
    }
  });

  window.matchMedia("(min-width: 768px)").addEventListener("change", function (event) {
    if (event.matches) setOpen(false);
  });
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

/* ---------- 6) More work 팝업 (비핸스식, 페이지 전환 없음) ---------- */
(function moreWorkModal() {
  var triggers = document.querySelectorAll(".more-item__open");
  var dialog = document.querySelector(".project-modal");
  if (!triggers.length || !dialog || typeof dialog.showModal !== "function") return;

  var titleEl = dialog.querySelector(".project-modal__title");
  var metaEl = dialog.querySelector(".project-modal__meta");
  var bodyEl = dialog.querySelector(".project-modal__body");
  var closeBtn = dialog.querySelector(".project-modal__close");
  var lastTrigger = null;

  function open(trigger) {
    var title = trigger.querySelector(".more-item__title").textContent.trim();
    var thumb = trigger.querySelector("img");
    var sources = (trigger.getAttribute("data-images") || "")
      .split(",")
      .map(function (s) { return s.trim(); })
      .filter(Boolean);
    if (!sources.length && thumb) sources = [thumb.getAttribute("src")];

    titleEl.textContent = title;
    metaEl.textContent = trigger.querySelector(".more-item__meta").textContent.trim();
    bodyEl.textContent = "";
    sources.forEach(function (src, i) {
      var img = document.createElement("img");
      img.src = src;
      img.width = 1200;
      img.height = 800;
      img.alt = title + (sources.length > 1 ? " — image " + (i + 1) : "");
      bodyEl.appendChild(img);
    });

    lastTrigger = trigger;
    dialog.showModal();
    dialog.scrollTop = 0;
    document.documentElement.classList.add("is-modal-open");
  }

  triggers.forEach(function (trigger) {
    trigger.addEventListener("click", function () { open(trigger); });
  });

  // 정리는 멱등 — 어떤 닫힘 경로(버튼 · 백드롭 · Esc)에서도 스크롤 잠금이 남지 않도록 직접 호출한다
  function cleanup() {
    document.documentElement.classList.remove("is-modal-open");
    bodyEl.textContent = "";
    if (lastTrigger) lastTrigger.focus();
  }

  function close() {
    if (dialog.open) dialog.close();
    cleanup();
  }

  closeBtn.addEventListener("click", close);

  // 패널 바깥(백드롭) 클릭으로 닫기
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) close();
  });

  // Esc 는 cancel → close 순서로 온다. cancel 에서 먼저 정리하고, close 는 보험.
  // 늦게 도착한 이전 close 이벤트가 다시 열린 팝업을 지우지 않도록 닫혀 있을 때만 정리한다
  dialog.addEventListener("cancel", cleanup);
  dialog.addEventListener("close", function () {
    if (!dialog.open) cleanup();
  });
})();
