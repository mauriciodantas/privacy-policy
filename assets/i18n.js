/**
 * Minimal PT/EN switch. Every translatable node carries data-pt / data-en;
 * the choice is persisted in localStorage and reflected on <html lang>.
 */
(function () {
  var STORAGE_KEY = 'lang';
  var root = document.documentElement;
  var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-lang-btn]'));

  function read() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function write(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* private mode — the toggle still works for this visit */
    }
  }

  function initial() {
    var fromQuery = new URLSearchParams(window.location.search).get('lang');
    if (fromQuery === 'pt' || fromQuery === 'en') return fromQuery;

    var saved = read();
    if (saved === 'pt' || saved === 'en') return saved;

    var browser = (navigator.language || 'pt').toLowerCase();
    return browser.indexOf('pt') === 0 ? 'pt' : 'en';
  }

  function apply(lang) {
    root.lang = lang === 'pt' ? 'pt-BR' : 'en';

    var nodes = document.querySelectorAll('[data-pt][data-en]');
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].textContent = nodes[i].getAttribute('data-' + lang);
    }

    var titled = document.querySelector('[data-title-pt][data-title-en]');
    if (titled) {
      document.title = titled.getAttribute('data-title-' + lang);
    }

    for (var j = 0; j < buttons.length; j++) {
      var btn = buttons[j];
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-lang-btn') === lang));
    }
  }

  for (var k = 0; k < buttons.length; k++) {
    buttons[k].addEventListener('click', function (event) {
      var lang = event.currentTarget.getAttribute('data-lang-btn');
      write(lang);
      apply(lang);
    });
  }

  apply(initial());
})();
