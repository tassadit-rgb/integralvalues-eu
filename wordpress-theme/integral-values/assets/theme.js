(function () {
  var toggle = document.querySelector('.iv-nav__toggle');
  var nav = document.getElementById('iv-primary-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
})();
