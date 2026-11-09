// Shows one language: ?lang=en / ?lang=tr, else the last choice, else the browser language.
(function () {
  var root = document.documentElement;
  var pick = new URLSearchParams(location.search).get('lang');
  if (pick !== 'tr' && pick !== 'en') {
    try { pick = localStorage.getItem('mm-lang'); } catch (e) { pick = null; }
  }
  if (pick !== 'tr' && pick !== 'en') {
    pick = (navigator.language || '').toLowerCase().indexOf('tr') === 0 ? 'tr' : 'en';
  }
  var set = function (lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);
    document.title = root.getAttribute('data-title-' + lang) || document.title;
  };
  set(pick);
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-set]');
    if (!b) return;
    set(b.getAttribute('data-set'));
    try { localStorage.setItem('mm-lang', b.getAttribute('data-set')); } catch (err) {}
  });
})();
