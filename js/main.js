/* ============================================================
   main.js — 바닐라 JS
   1) 맨 위로 버튼  2) 스크롤 등장(reveal)  3) 프로젝트 팝업(Work)  4) 사이트 검색(nav)  5) Contact 폼(mailto)
   각 IIFE는 필요한 요소가 없으면 즉시 return → 모든 페이지에서 안전하게 로드된다.
   ============================================================ */

/* ---------- 1) 맨 위로 버튼 ---------- */
(function toTop() {
  var btn = document.querySelector(".to-top");
  if (!btn) return;

  var footer = document.querySelector(".site-footer");

  function update() {
    btn.classList.toggle("is-visible", window.scrollY > 400);
    /* 푸터가 화면에 들어오면 그만큼 버튼을 올려 푸터 위까지만 배치 */
    if (footer) {
      var lift = Math.max(0, window.innerHeight - footer.getBoundingClientRect().top);
      btn.style.setProperty("--to-top-lift", lift + "px");
    }
  }

  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
})();

/* ---------- 2) 스크롤 등장 효과 ---------- */
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
    { rootMargin: "0px 0px -5% 0px", threshold: 0.05 }
  );

  items.forEach(function (el) {
    observer.observe(el);
  });
})();

/* ---------- 3) 프로젝트 팝업 (참고: Behance 프로젝트 모달 — 페이지 전환 없음) ----------
   · 이전/다음 프로젝트 버튼 + 키보드 ← → (팝업을 닫지 않고 이동)
   · 주소 해시(#id) 연동: 열면 해시가 붙고, 브라우저 뒤로가기로 닫히며, 해시가 있는 주소로 들어오면 바로 열린다
   · 하단 "More projects" 목록, 닫기 = 우상단 X · Esc · 바깥 클릭, 열림 중 배경 스크롤 잠금, 닫히면 트리거로 포커스 복귀 */
(function projectModal() {
  var triggers = Array.prototype.slice.call(document.querySelectorAll(".project-open"));
  var dialog = document.querySelector(".project-modal");
  if (!triggers.length || !dialog || typeof dialog.showModal !== "function") return;

  var bodyEl = dialog.querySelector(".project-modal__body");
  var moreEl = dialog.querySelector(".project-modal__more-list");
  var closeBtn = dialog.querySelector(".project-modal__close");
  var prevBtn = dialog.querySelector(".project-modal__nav--prev");
  var nextBtn = dialog.querySelector(".project-modal__nav--next");
  var index = -1;
  var lastTrigger = null;
  var pushed = false;

  // 컨트롤(닫기 · 이전 · 다음) 아이콘 색: 버튼 뒤의 실제 이미지 밝기를 샘플링해 어두우면 화이트, 밝으면 블랙으로 반전한다.
  var controls = [closeBtn, prevBtn, nextBtn];
  var probe = document.createElement("canvas");
  probe.width = probe.height = 8;
  var probeCtx = probe.getContext("2d", { willReadFrequently: true });
  var toneQueued = false;

  function lumaUnder(cx, cy, size) {
    var dr = dialog.getBoundingClientRect();
    if (cx < dr.left || cx > dr.right || cy < dr.top || cy > dr.bottom) return 0; // 딤 처리된 배경 = 어두움
    var stack = document.elementsFromPoint(cx, cy);
    for (var i = 0; i < stack.length; i++) {
      var el = stack[i];
      if (controls.indexOf(el) !== -1 || controls.some(function (c) { return c.contains(el); })) continue;
      if (el.closest(".project-modal__more")) return 0; // 블랙 딤 위 캡션 영역
      var tint = el.closest(".module-text--tinted"); // 밝은 배경색을 가진 제목 블록: 배경색 밝기를 쓴다
      if (tint) {
        var m = window.getComputedStyle(tint).backgroundColor.match(/\d+/g);
        if (m) return 0.299 * m[0] + 0.587 * m[1] + 0.114 * m[2];
      }
      if (el.tagName !== "IMG") return 0; // 텍스트 모듈 · 패널 배경(어두운 면)
      var r = el.getBoundingClientRect();
      if (!el.naturalWidth || !r.width) return 0;
      var kx = el.naturalWidth / r.width;
      var ky = el.naturalHeight / r.height;
      var sx = Math.max(0, (cx - r.left - size / 2) * kx);
      var sy = Math.max(0, (cy - r.top - size / 2) * ky);
      var sw = Math.min(size * kx, el.naturalWidth - sx);
      var sh = Math.min(size * ky, el.naturalHeight - sy);
      if (sw < 1 || sh < 1) return 0;
      try {
        probeCtx.drawImage(el, sx, sy, sw, sh, 0, 0, 8, 8);
        var px = probeCtx.getImageData(0, 0, 8, 8).data;
        var sum = 0;
        for (var p = 0; p < px.length; p += 4) sum += 0.299 * px[p] + 0.587 * px[p + 1] + 0.114 * px[p + 2];
        return sum / (px.length / 4);
      } catch (e) {
        return 0; // 캔버스 접근 불가(file:// 등) — 어두운 배경으로 간주
      }
    }
    return 0;
  }

  function updateTones() {
    toneQueued = false;
    if (!dialog.open) return;
    controls.forEach(function (btn) {
      var r = btn.getBoundingClientRect();
      var l = lumaUnder(r.left + r.width / 2, r.top + r.height / 2, r.width);
      var cur = btn.getAttribute("data-tone") === "light";
      var light = cur ? l > 135 : l > 165; // 히스테리시스: 경계 밝기에서 깜빡이지 않게
      btn.setAttribute("data-tone", light ? "light" : "dark");
    });
  }

  function scheduleTone() {
    if (toneQueued) return;
    toneQueued = true;
    window.requestAnimationFrame(updateTones);
  }

  function data(trigger) {
    var thumb = trigger.querySelector("img");
    return {
      id: trigger.getAttribute("data-id") || "",
      title: trigger.querySelector(".project-open__title").textContent.trim(),
      sub: trigger.querySelector(".project-open__sub").textContent.trim(),
      thumb: thumb ? thumb.getAttribute("src") : "",
      tpl: document.getElementById("tpl-" + trigger.getAttribute("data-id"))
    };
  }

  function wrap(i) {
    return (i + triggers.length) % triggers.length;
  }

  function preload(i) {
    var d = data(triggers[wrap(i)]);
    var first = d.tpl && d.tpl.content.querySelector("img");
    if (first) new Image().src = first.getAttribute("src");
  }

  function render(i) {
    index = wrap(i);
    var d = data(triggers[index]);

    dialog.setAttribute("aria-label", d.title);

    bodyEl.textContent = "";
    if (d.tpl) {
      bodyEl.appendChild(d.tpl.content.cloneNode(true));
      Array.prototype.forEach.call(bodyEl.querySelectorAll("img"), function (img) {
        if (img.complete && img.naturalWidth) img.classList.add("is-loaded");
        else img.addEventListener("load", function () { img.classList.add("is-loaded"); scheduleTone(); });
      });
    }

    // 하단 More projects: 현재 다음부터 4개
    moreEl.textContent = "";
    for (var k = 1; k <= Math.min(4, triggers.length - 1); k++) {
      (function (target) {
        var m = data(triggers[target]);
        var li = document.createElement("li");
        var b = document.createElement("button");
        b.type = "button";
        b.className = "project-modal__more-item";
        var im = document.createElement("img");
        im.src = m.thumb;
        im.alt = "";
        im.loading = "lazy";
        var cap = document.createElement("span");
        cap.className = "project-modal__more-caption";
        var tt = document.createElement("span");
        tt.className = "project-modal__more-name";
        tt.textContent = m.title;
        var yy = document.createElement("span");
        yy.className = "project-modal__more-year";
        yy.textContent = m.sub;
        cap.appendChild(tt);
        cap.appendChild(yy);
        b.appendChild(im);
        b.appendChild(cap);
        b.addEventListener("click", function () { go(target); });
        li.appendChild(b);
        moreEl.appendChild(li);
      })(wrap(index + k));
    }

    prevBtn.title = data(triggers[wrap(index - 1)]).title;
    nextBtn.title = data(triggers[wrap(index + 1)]).title;
    dialog.scrollTop = 0;
    scheduleTone();
    preload(index + 1);
    preload(index - 1);
  }

  function setHash(id, push) {
    if (!id) return;
    var url = location.pathname + location.search + "#" + id;
    if (push) {
      history.pushState({ projectModal: true }, "", url);
      pushed = true;
    } else {
      history.replaceState(history.state, "", url);
    }
  }

  function clearHash() {
    history.replaceState(null, "", location.pathname + location.search);
  }

  function open(i, trigger) {
    lastTrigger = trigger || triggers[wrap(i)];
    render(i);
    if (!dialog.open) {
      dialog.showModal();
      document.documentElement.classList.add("is-modal-open");
      setHash(data(triggers[index]).id, true);
    }
    dialog.scrollTop = 0;
  }

  // 팝업을 닫지 않고 다른 프로젝트로 이동(Behance 처럼 부드럽게 교체)
  function go(i) {
    bodyEl.classList.add("is-switching");
    window.setTimeout(function () {
      render(i);
      setHash(data(triggers[index]).id, false);
      bodyEl.classList.remove("is-switching");
    }, 140);
  }

  // 정리는 멱등 — 어떤 닫힘 경로(버튼 · 백드롭 · Esc · 뒤로가기)에서도 스크롤 잠금이 남지 않도록 직접 호출한다
  function cleanup() {
    document.documentElement.classList.remove("is-modal-open");
    bodyEl.textContent = "";
    if (lastTrigger) lastTrigger.focus();
  }

  function close() {
    if (dialog.open) dialog.close();
    cleanup();
    if (pushed) {
      pushed = false;
      history.back();
    } else if (location.hash) {
      clearHash();
    }
  }

  triggers.forEach(function (trigger, i) {
    trigger.addEventListener("click", function () { open(i, trigger); });
  });

  dialog.addEventListener("scroll", scheduleTone, { passive: true });
  window.addEventListener("resize", scheduleTone);
  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", function () { go(index - 1); });
  nextBtn.addEventListener("click", function () { go(index + 1); });

  // 패널 바깥(백드롭) 클릭으로 닫기
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) close();
  });

  // Esc 는 cancel → close 순서로 온다. cancel 에서 먼저 정리하고, close 는 보험.
  dialog.addEventListener("cancel", function () {
    cleanup();
    if (pushed) {
      pushed = false;
      history.back();
    } else if (location.hash) {
      clearHash();
    }
  });
  dialog.addEventListener("close", function () {
    if (!dialog.open) cleanup();
  });

  document.addEventListener("keydown", function (event) {
    if (!dialog.open) return;
    if (event.key === "ArrowRight") { event.preventDefault(); go(index + 1); }
    if (event.key === "ArrowLeft") { event.preventDefault(); go(index - 1); }
  });

  // 뒤로가기/앞으로가기 · 해시가 있는 주소 진입
  function fromHash() {
    var id = location.hash.slice(1);
    var i = triggers.findIndex(function (t) { return t.getAttribute("data-id") === id; });
    if (i >= 0) {
      if (!dialog.open) { lastTrigger = triggers[i]; render(i); dialog.showModal(); document.documentElement.classList.add("is-modal-open"); }
      else render(i);
    } else if (dialog.open) {
      pushed = false;
      dialog.close();
      cleanup();
    }
  }
  window.addEventListener("popstate", fromHash);
  if (location.hash) fromHash();
})();

/* ---------- 4) 사이트 검색: nav 우측 아이콘 → 프로젝트 제목 · 연도로 필터, 선택하면 해당 프로젝트 팝업(다른 페이지에서는 index.html#id) ---------- */
(function siteSearch() {
  var header = document.getElementById("site-header");
  var toggle = header && header.querySelector(".site-search-toggle");
  var panel = document.getElementById("site-search");
  var dataEl = document.getElementById("search-data");
  if (!toggle || !panel || !dataEl) return;

  var projects;
  try { projects = JSON.parse(dataEl.textContent); } catch (e) { return; }

  var form = panel.querySelector(".site-search__form");
  var input = panel.querySelector(".site-search__input");
  var list = panel.querySelector(".site-search__results");
  var empty = panel.querySelector(".site-search__empty");
  var closeBtn = panel.querySelector(".site-search__close");

  function norm(s) {
    return String(s).toLowerCase().replace(/[\s.\-_\/'’&]+/g, "");
  }

  projects.forEach(function (p) {
    p.hay = norm(p.title + " " + p.year + " " + p.id + " " + (p.keywords || ""));
  });

  function render(query) {
    var words = query.trim().toLowerCase().split(/\s+/).map(norm).filter(Boolean);
    list.textContent = "";
    var count = 0;
    projects.forEach(function (p) {
      if (!words.every(function (w) { return p.hay.indexOf(w) !== -1; })) return;
      count++;
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.className = "site-search__item";
      a.href = "index.html#" + p.id;
      var img = document.createElement("img");
      img.src = p.cover;
      img.alt = "";
      img.loading = "lazy";
      var cap = document.createElement("span");
      cap.className = "site-search__caption";
      var name = document.createElement("span");
      name.className = "site-search__name";
      name.textContent = p.title;
      var year = document.createElement("span");
      year.className = "site-search__year";
      year.textContent = p.year;
      cap.appendChild(name);
      cap.appendChild(year);
      a.appendChild(img);
      a.appendChild(cap);
      a.addEventListener("click", function (event) {
        event.preventDefault();
        choose(p.id);
      });
      li.appendChild(a);
      list.appendChild(li);
    });
    empty.hidden = count > 0;
  }

  function choose(id) {
    var trigger = document.querySelector('.project-open[data-id="' + id + '"]');
    closeSearch(false);
    if (trigger) trigger.click();
    else window.location.href = "index.html#" + id;
  }

  function openSearch() {
    panel.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    render(input.value);
    input.focus();
  }

  function closeSearch(returnFocus) {
    if (panel.hidden) return;
    panel.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    input.value = "";
    if (returnFocus !== false) toggle.focus();
  }

  toggle.addEventListener("click", function () {
    if (panel.hidden) openSearch();
    else closeSearch();
  });
  closeBtn.addEventListener("click", function () { closeSearch(); });
  input.addEventListener("input", function () { render(input.value); });
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var first = list.querySelector(".site-search__item");
    if (first) first.click();
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !panel.hidden) closeSearch();
  });
  document.addEventListener("click", function (event) {
    if (!panel.hidden && !header.contains(event.target)) closeSearch(false);
  });
})();

/* ---------- 4-1) 모바일 메뉴: 햄버거 ↔ 전체 화면 메뉴 오버레이 ---------- */
(function siteMenu() {
  var header = document.getElementById("site-header");
  var toggle = header && header.querySelector(".site-menu-toggle");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;
  var root = document.documentElement;
  var desktop = window.matchMedia("(min-width: 768px)");

  function setOpen(open) {
    header.classList.toggle("is-menu-open", open);
    root.classList.toggle("is-menu-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  toggle.addEventListener("click", function () {
    setOpen(!header.classList.contains("is-menu-open"));
  });
  nav.addEventListener("click", function (event) {
    if (event.target.closest("a")) setOpen(false);
  });
  /* 검색을 열면 메뉴는 닫는다 */
  var searchToggle = header.querySelector(".site-search-toggle");
  if (searchToggle) searchToggle.addEventListener("click", function () { setOpen(false); });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && header.classList.contains("is-menu-open")) {
      setOpen(false);
      toggle.focus();
    }
  });
  function onChange(e) { if (e.matches) setOpen(false); }
  if (desktop.addEventListener) desktop.addEventListener("change", onChange);
  else desktop.addListener(onChange);
})();

/* ---------- 5) Contact 폼: 서버가 없으므로 작성한 내용으로 메일 앱을 연다 ---------- */
(function contactForm() {
  var form = document.getElementById("contact-form");
  if (!form) return;
  var sent = form.querySelector(".contact-form__sent");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;
    var data = new FormData(form);
    var subject = "Portfolio contact from " + data.get("name");
    var body = data.get("message") + "\n\n— " + data.get("name") + " (" + data.get("email") + ")";
    window.location.href =
      "mailto:hyoeunkwak@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    if (sent) sent.hidden = false;
  });
})();
