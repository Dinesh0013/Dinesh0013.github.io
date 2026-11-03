/*
 * Blog renderer. Posts live in blog/posts.js; this file turns them into the list view
 * (blog.html) or a single article (blog.html?post=<slug>).
 */
(function () {
  'use strict';

  var root = document.getElementById('blog-root');
  var util = window.SiteUtil;
  var posts = (window.BLOG_POSTS || []).slice().sort(function (a, b) {
    return b.date.localeCompare(a.date);
  });

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function wrap() { return el('div', 'wrap'); }

  function postUrl(post) { return 'blog.html?post=' + encodeURIComponent(post.slug); }

  function setTitle(title, description) {
    document.title = title + ' — Dinesh Sangwan';
    var meta = document.querySelector('meta[name="description"]');
    if (meta && description) meta.setAttribute('content', description);
  }

  function meta(spans) {
    var row = el('div', 'meta');
    spans.forEach(function (text) { row.appendChild(el('span', '', text)); });
    return row;
  }

  /* ── List ── */
  function renderList() {
    root.textContent = '';

    var head = el('section', 'notebook-head');
    var headWrap = wrap();
    headWrap.appendChild(el('h1', '', 'Blog'));
    headWrap.appendChild(el('p', 'lede',
      'A technical notebook on automotive security, cryptanalysis and the engineering behind them.'));
    head.appendChild(headWrap);
    root.appendChild(head);

    var body = wrap();

    if (!posts.length) {
      body.appendChild(el('p', 'empty', 'No posts yet. Check back soon.'));
      root.appendChild(body);
      return;
    }

    var list = el('ul', 'entries');
    posts.forEach(function (post) {
      var item = el('li', 'entry');

      var date = el('div', 'entry-date');
      date.appendChild(el('strong', '', util.formatDate(post.date)));
      date.appendChild(document.createTextNode(util.readingLabel(post.content)));
      item.appendChild(date);

      var main = el('div');
      var title = el('h2');
      var link = el('a');
      link.href = postUrl(post);
      link.appendChild(el('span', '', post.title));
      title.appendChild(link);
      main.appendChild(title);
      main.appendChild(el('p', '', post.summary));
      if (post.tags && post.tags.length) main.appendChild(el('p', 'tags', post.tags.join(', ')));
      item.appendChild(main);

      list.appendChild(item);
    });

    body.appendChild(list);
    root.appendChild(body);
    setTitle('Blog');
  }

  /* ── Article ── */
  function slugify(text, used) {
    var base = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section';
    var id = base, n = 2;
    while (used[id]) id = base + '-' + n++;
    used[id] = true;
    return id;
  }

  function buildToc(prose, rail) {
    var headings = [].slice.call(prose.querySelectorAll('h2'));
    if (headings.length < 2) { rail.hidden = true; return; }

    var used = {};
    var list = el('ol');
    var links = {};

    headings.forEach(function (h) {
      h.id = slugify(h.textContent, used);
      var li = el('li');
      var a = el('a', '', h.textContent);
      a.href = '#' + h.id;
      li.appendChild(a);
      list.appendChild(li);
      links[h.id] = a;
    });

    rail.appendChild(el('h2', '', 'On this page'));
    rail.appendChild(list);

    if (!('IntersectionObserver' in window)) return;
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        Object.keys(links).forEach(function (id) { links[id].removeAttribute('aria-current'); });
        links[entry.target.id].setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-15% 0px -75% 0px' });
    headings.forEach(function (h) { spy.observe(h); });
  }

  function trackProgress(prose) {
    var bar = el('div', 'progress');
    var fill = document.createElement('i');
    bar.appendChild(fill);
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);

    var ticking = false;
    function update() {
      var rect = prose.getBoundingClientRect();
      var total = rect.height - window.innerHeight * 0.5;
      var done = window.innerHeight * 0.5 - rect.top;
      var ratio = total > 0 ? Math.min(1, Math.max(0, done / total)) : 0;
      fill.style.transform = 'scaleX(' + ratio.toFixed(4) + ')';
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  function renderPost(post) {
    root.textContent = '';

    var top = el('header', 'wrap article-top');
    var back = el('a', 'back', 'Back to the blog');
    back.href = 'blog.html';
    top.appendChild(back);
    top.appendChild(el('h1', '', post.title));
    top.appendChild(el('p', 'deck', post.summary));
    var info = [util.formatDate(post.date), util.readingLabel(post.content)];
    if (post.tags && post.tags.length) info.push(post.tags.join(', '));
    top.appendChild(meta(info));
    root.appendChild(top);

    var layout = el('div', 'wrap article-layout');
    var rail = el('aside', 'toc');
    rail.setAttribute('aria-label', 'On this page');
    var prose = el('article', 'prose');
    prose.innerHTML = post.content; // trusted: authored in blog/posts.js, never taken from the URL
    [].forEach.call(prose.querySelectorAll('pre'), function (pre) { pre.tabIndex = 0; });

    layout.appendChild(rail);
    layout.appendChild(prose);

    var end = el('footer', 'article-end');
    var more = el('a', 'go', 'Back to all posts');
    more.href = 'blog.html';
    end.appendChild(more);
    layout.appendChild(end);

    root.appendChild(layout);

    buildToc(prose, rail);
    trackProgress(prose);
    setTitle(post.title, post.summary);
  }

  function renderNotFound() {
    root.textContent = '';
    var top = el('header', 'wrap article-top');
    var back = el('a', 'back', 'Back to the blog');
    back.href = 'blog.html';
    top.appendChild(back);
    top.appendChild(el('h1', '', 'Post not found'));
    top.appendChild(el('p', 'deck', 'That post does not exist or has moved. The blog lists everything published so far.'));
    root.appendChild(top);
    setTitle('Post not found');
  }

  var slug = new URLSearchParams(window.location.search).get('post');
  if (!slug) { renderList(); return; }

  var match = posts.filter(function (p) { return p.slug === slug; })[0];
  if (match) renderPost(match); else renderNotFound();
})();
