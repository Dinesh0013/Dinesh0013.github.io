/*
 * Shared behaviour: mobile menu, nav position indicator, page fade, below-the-fold fade-in,
 * and the latest-post teaser on the home page. No dependencies.
 */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Helpers shared with js/blog.js */
  window.SiteUtil = {
    formatDate: function (iso) {
      return new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric'
      });
    },
    readingMinutes: function (html) {
      var words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
      return Math.max(1, Math.ceil(words / 200));
    },
    readingLabel: function (html) {
      var m = this.readingMinutes(html);
      return m + ' minute read';
    }
  };

  /* Mobile menu */
  var menuBtn = document.querySelector('.menu-btn');
  var nav = document.getElementById('site-nav');

  if (menuBtn && nav) {
    var setOpen = function (open) {
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.textContent = open ? 'Close' : 'Menu';
      nav.classList.toggle('is-open', open);
    };

    menuBtn.addEventListener('click', function () {
      setOpen(menuBtn.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        menuBtn.focus();
      }
    });
  }

  /* Nav position indicator: mark the section currently in view */
  var navLinks = [].slice.call(document.querySelectorAll('.nav a'));
  var spyTargets = {};

  navLinks.forEach(function (a) {
    if (a.hash) spyTargets[a.hash.slice(1)] = a;
    else if (a.getAttribute('href') === 'blog.html' && document.getElementById('blog')) spyTargets.blog = a;
  });

  if ('IntersectionObserver' in window && Object.keys(spyTargets).length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) { a.removeAttribute('aria-current'); });
        var link = spyTargets[entry.target.id];
        if (link) link.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    ['top'].concat(Object.keys(spyTargets)).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) spy.observe(el);
    });
  }

  /* Page fade between pages of this site */
  document.addEventListener('click', function (e) {
    if (reduceMotion || e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    var a = e.target.closest('a');
    if (!a || a.target || a.hasAttribute('download')) return;

    var url = new URL(a.href, window.location.href);
    if (url.origin !== window.location.origin) return;
    if (url.pathname === window.location.pathname && url.search === window.location.search) return;

    e.preventDefault();
    root.classList.add('leaving');
    window.setTimeout(function () { window.location.href = a.href; }, 130);
  });

  window.addEventListener('pageshow', function (e) {
    if (e.persisted) root.classList.remove('leaving');
  });

  /* Fade in content that starts below the fold. Content already visible is never hidden. */
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var reveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        reveal.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    var viewportHeight = window.innerHeight;
    [].forEach.call(document.querySelectorAll('.project, .role, .edu-grid, .edu-more, .note-feature, .closing'), function (el) {
      if (el.getBoundingClientRect().top <= viewportHeight) return;
      el.classList.add('reveal');
      reveal.observe(el);
    });
  }

  /* Home page: keep the latest-post teaser in sync with blog/posts.js */
  var teaser = document.querySelector('.note-feature');
  var posts = (window.BLOG_POSTS || []).slice().sort(function (a, b) { return b.date.localeCompare(a.date); });

  if (teaser && posts.length) {
    var latest = posts[0];
    var set = function (selector, text) {
      var node = teaser.querySelector(selector);
      if (node) node.textContent = text;
    };
    set('[data-note-date]', window.SiteUtil.formatDate(latest.date));
    set('[data-note-read]', window.SiteUtil.readingLabel(latest.content));
    set('[data-note-title]', latest.title);
    set('[data-note-summary]', latest.summary);
    var link = teaser.querySelector('[data-note-link]');
    if (link) link.href = 'blog.html?post=' + encodeURIComponent(latest.slug);
  }
})();
