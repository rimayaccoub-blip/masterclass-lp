// Language switch (AR default, EN via toggle or ?lang=en) + header + reveal
(function () {
  var root = document.documentElement;
  var KEY = 'ry_lang';
  function get() {
    var q = new URLSearchParams(location.search).get('lang');
    if (q === 'en' || q === 'ar') return q;
    try { var s = localStorage.getItem(KEY); if (s === 'en' || s === 'ar') return s; } catch (e) {}
    return 'ar';
  }
  function set(l) {
    root.lang = l;
    root.dir = l === 'ar' ? 'rtl' : 'ltr';
    document.title = root.getAttribute('data-title-' + l) || document.title;
    var d = document.querySelector('meta[name="description"]');
    if (d && root.getAttribute('data-desc-' + l)) d.setAttribute('content', root.getAttribute('data-desc-' + l));
    try { localStorage.setItem(KEY, l); } catch (e) {}
  }
  set(get());
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-lang-toggle]');
    if (!b) return;
    set(root.lang === 'ar' ? 'en' : 'ar');
  });

  var head = document.querySelector('.site-head');
  function onScroll() { if (head) head.classList.toggle('scrolled', window.scrollY > 30); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  var els = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } });
    }, { threshold: .12 });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('in'); }); }

  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
})();
