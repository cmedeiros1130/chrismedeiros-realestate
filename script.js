/* ============================================================
   Christopher Medeiros — Realtor site
   script.js  (vanilla JS, no dependencies)
   ============================================================ */
(function () {
  "use strict";

  document.documentElement.classList.add("js");
  document.addEventListener("DOMContentLoaded", init);

  function init() {
    setYear();
    setupHeaderShadow();
    setupScrollSpy();
    setupReveal();
    setupCalculator();
  }

  /* ---------- Footer year ---------- */
  function setYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- Header shadow on scroll ---------- */
  function setupHeaderShadow() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    function onScroll() { header.classList.toggle("scrolled", window.scrollY > 8); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Subtle active-section highlight in the slim header ---------- */
  function setupScrollSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.header-nav a[href^="#"]'));
    if (!links.length || !("IntersectionObserver" in window)) return;

    var map = {}, sections = [];
    links.forEach(function (link) {
      var sec = document.getElementById(link.getAttribute("href").slice(1));
      if (sec) { map[sec.id] = link; sections.push(sec); }
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.classList.remove("active"); });
          if (map[entry.target.id]) map[entry.target.id].classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---------- Scroll reveal (auto-tagged, so HTML stays clean) ---------- */
  function setupReveal() {
    var selectors = [
      ".hero-copy", ".section-head", ".about-photo", ".about-intro",
      ".pillar-row > li", ".review-card", ".zp-card", ".zp-stats", ".zp-sales-title", ".zp-sale", ".zillow-link", ".step",
      ".calc-controls", ".calc-readout", ".disclaimer", ".offer-item", ".offer-note",
      ".faq-card", ".pros-row > li", ".contact-methods", ".contact-sign", ".script-accent"
    ];
    var items = [];
    selectors.forEach(function (sel) {
      Array.prototype.forEach.call(document.querySelectorAll(sel), function (el) {
        el.classList.add("reveal");
        items.push(el);
      });
    });
    if (!items.length) return;

    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Payment estimator ---------- */
  function setupCalculator() {
    var form = document.getElementById("calc-form");
    if (!form) return;

    var price = document.getElementById("home-price");
    var downPct = document.getElementById("down-pct");
    var rate = document.getElementById("rate");
    var termBtns = Array.prototype.slice.call(document.querySelectorAll(".term-btn"));

    var priceOut = document.getElementById("home-price-out");
    var downPctOut = document.getElementById("down-pct-out");
    var downAmtOut = document.getElementById("down-amt-out");
    var rateOut = document.getElementById("rate-out");
    var outPI = document.getElementById("out-pi");
    var outLoan = document.getElementById("out-loan");
    var outDown = document.getElementById("out-down");

    var term = 30;

    var money0 = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

    function num(el) { var v = parseFloat(el && el.value); return isNaN(v) ? 0 : v; }

    function calc() {
      var p = Math.max(0, num(price));
      var dp = Math.min(100, Math.max(0, num(downPct)));
      var r = Math.max(0, num(rate));

      var downAmount = p * (dp / 100);
      var loan = Math.max(0, p - downAmount);

      var monthlyRate = r / 100 / 12;
      var n = term * 12;
      var pi;
      if (monthlyRate === 0) { pi = n > 0 ? loan / n : 0; }
      else { var f = Math.pow(1 + monthlyRate, n); pi = loan * (monthlyRate * f) / (f - 1); }
      if (!isFinite(pi) || pi < 0) pi = 0;

      priceOut.textContent = money0.format(p);
      downPctOut.textContent = dp + "%";
      downAmtOut.textContent = money0.format(downAmount);
      rateOut.textContent = (Math.round(r * 1000) / 1000) + "%";
      outPI.textContent = money0.format(pi);
      outLoan.textContent = money0.format(loan);
      outDown.textContent = money0.format(downAmount);
    }

    form.addEventListener("input", calc);
    form.addEventListener("submit", function (e) { e.preventDefault(); });

    termBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        termBtns.forEach(function (b) {
          b.classList.remove("is-active");
          b.setAttribute("aria-pressed", "false");
        });
        btn.classList.add("is-active");
        btn.setAttribute("aria-pressed", "true");
        term = parseInt(btn.getAttribute("data-term"), 10) || 30;
        calc();
      });
    });

    calc();
  }
})();
