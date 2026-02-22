(function () {
  // Ano do rodapé
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Dark mode com localStorage
  var themeToggle = document.getElementById('themeToggle');
  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  var saved = localStorage.getItem('sm_theme');
  var isDark = saved ? saved === 'dark' : prefersDark;

  function applyTheme(dark) {
    if (dark) {
      document.documentElement.classList.add('dark-mode');
      document.body.classList.add('dark-mode');
      if (themeToggle) themeToggle.textContent = '☀️';
      localStorage.setItem('sm_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark-mode');
      document.body.classList.remove('dark-mode');
      if (themeToggle) themeToggle.textContent = '🌙';
      localStorage.setItem('sm_theme', 'light');
    }
  }

  // Aplica tema inicial
  applyTheme(isDark);

  // Botão de toggle
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      isDark = !isDark; // agora troca de verdade
      applyTheme(isDark);
      this.setAttribute('aria-pressed', String(isDark));
    });
  }

  // Cookie banner (LGPD)
  var cookieBanner = document.getElementById('cookieBanner');
  var acceptCookies = document.getElementById('acceptCookies');
  var consent = localStorage.getItem('sm_cookie_consent');
  if (cookieBanner && !consent) {
    cookieBanner.hidden = false;
  }
  if (acceptCookies) {
    acceptCookies.addEventListener('click', function () {
      localStorage.setItem('sm_cookie_consent', 'accepted');
      cookieBanner.hidden = true;
    });
  }

  // Suave: links com classe .smooth
  Array.from(document.querySelectorAll('a.smooth')).forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (this.hash && document.querySelector(this.hash)) {
        e.preventDefault();
        document.querySelector(this.hash).scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
