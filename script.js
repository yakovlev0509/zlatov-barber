/* ============================================================================
   script.js — вся логика сайта. Данные не здесь, а в config.js.
   Трогать этот файл обычно не нужно.
   ========================================================================== */
(function () {
  'use strict';

  var C = window.CONFIG;
  if (!C) return;

  var LANGS = ['bg', 'ru', 'en'];
  var lang = 'bg';

  /* ---------- 1. Выбор языка --------------------------------------------- */
  function pickLang() {
    var q = new URLSearchParams(location.search).get('lang');
    if (LANGS.indexOf(q) > -1) return q;
    try {
      var saved = localStorage.getItem('zl-lang');
      if (LANGS.indexOf(saved) > -1) return saved;
    } catch (e) { /* приватный режим — просто игнорируем */ }
    /* По умолчанию всегда болгарский: это основной язык сайта и то,
       что должен видеть поисковик. Язык браузера намеренно не учитываем. */
    return 'bg';
  }

  /* ---------- 2. Ссылки-действия ----------------------------------------- */
  function links() {
    var c = C.contacts;
    return {
      booking: c.booking || '',
      ig: c.instagram ? 'https://ig.me/m/' + c.instagram : '',
      igProfile: c.instagram ? 'https://www.instagram.com/' + c.instagram + '/' : '',
      wa: c.whatsapp
        ? 'https://wa.me/' + String(c.whatsapp).replace(/\D/g, '') +
          '?text=' + encodeURIComponent(c.whatsappText[lang] || c.whatsappText.bg)
        : '',
      tel: c.phone ? 'tel:' + String(c.phone).replace(/[^\d+]/g, '') : '',
      map: 'https://www.google.com/maps/search/?api=1&query=' + C.address.lat + ',' + C.address.lng
    };
  }

  function setLink(id, href) {
    var el = document.getElementById(id);
    if (!el) return;
    if (href) { el.href = href; el.classList.remove('is-hidden'); }
    else { el.classList.add('is-hidden'); }
  }

  function applyLinks() {
    var L = links();
    ['heroCta', 'bookCta', 'stickyCta', 'hdrCta'].forEach(function (id) { setLink(id, L.booking); });
    setLink('igCta', L.ig);
    setLink('stickyIg', L.ig);
    setLink('waCta', L.wa);
    setLink('stickyWa', L.wa);
    setLink('telCta', L.tel);
    setLink('mapLink', L.map);
    setLink('kyoneLink', C.contacts.partnerUrl || '');

    var ig = document.getElementById('igLink');
    if (ig && L.igProfile) { ig.href = L.igProfile; ig.textContent = '@' + C.contacts.instagram; }
  }

  /* ---------- 3. Услуги --------------------------------------------------- */
  function fmtDuration(mins) {
    var t = C.i18n[lang];
    if (mins < 60) return mins + ' ' + t.min;
    var h = Math.floor(mins / 60), m = mins % 60;
    return h + ' ' + t.hour + (m ? ' ' + m + ' ' + t.min : '');
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  /* Строка прайса собрана как строка меню:
     название — точечное заполнение — цена, описание вторым уровнем. */
  function renderServices() {
    var box = document.getElementById('svcs');
    if (!box) return;
    box.innerHTML = '';

    C.services.forEach(function (s) {
      var li = el('li', 'svc');

      var line = el('div', 'svc__line');
      line.appendChild(el('h3', 'svc__name', s.name[lang] || s.name.bg));
      line.appendChild(el('span', 'svc__dots'));

      var price = el('p', 'svc__price');
      price.appendChild(el('span', 'svc__eur', s.price + ' €'));
      if (s.priceBgn) price.appendChild(el('span', 'svc__bgn', s.priceBgn.toFixed(2) + ' лв'));
      line.appendChild(price);
      li.appendChild(line);

      var foot = el('div', 'svc__foot');
      foot.appendChild(el('p', 'svc__time', fmtDuration(s.mins)));
      var d = s.desc && (s.desc[lang] || s.desc.bg);
      if (d) foot.appendChild(el('p', 'svc__desc', d));
      li.appendChild(foot);

      box.appendChild(li);
    });

    /* Диапазон цен в шапке секции считается сам — не разъедется с прайсом */
    var range = document.getElementById('svcsRange');
    if (range && C.services.length) {
      var ps = C.services.map(function (s) { return s.price; });
      var lo = Math.min.apply(null, ps), hi = Math.max.apply(null, ps);
      range.textContent = (lo === hi ? lo : lo + ' — ' + hi) + ' €';
    }
  }

  /* ---------- 4. Работы --------------------------------------------------- */
  function renderWorks() {
    var box = document.getElementById('works');
    if (!box) return;
    box.innerHTML = '';
    C.works.forEach(function (w, i) {
      var fig = document.createElement('figure');
      var img = document.createElement('img');
      img.src = 'images/' + w.src + '-460.webp';
      img.srcset = 'images/' + w.src + '-460.webp 460w, images/' + w.src + '-720.webp 720w';
      img.sizes = '(min-width:900px) 32vw, 48vw';
      img.width = w.w; img.height = w.h;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.alt = (w.alt && (w.alt[lang] || w.alt.bg)) || '';
      fig.appendChild(img);

      /* подпись как в каталоге — короткая, фактическая */
      var cap = w.cap && (w.cap[lang] || w.cap.bg);
      if (cap) fig.appendChild(el('figcaption', null, cap));

      box.appendChild(fig);
      if (i === 0) img.loading = 'eager';
    });
  }

  /* ---------- 4b. Отзывы ---------------------------------------------------
     Секция появляется только если есть настоящие отзывы, либо если
     явно включён режим примера. В режиме примера каждая карточка несёт
     плашку «Пример», а над списком стоит предупреждение — опубликовать
     это как настоящие отзывы можно только намеренно. */
  function renderReviews() {
    var sec = document.getElementById('reviews');
    var list = document.getElementById('reviewsList');
    if (!sec || !list) return;

    var t = C.i18n[lang];
    var R = C.reviews || { demo: false, items: [] };
    var items = R.items || [];
    var isDemo = !items.length && R.demo === true;
    var show = items.length > 0 || isDemo;

    sec.classList.toggle('is-hidden', !show);
    if (show) sec.removeAttribute('hidden'); else sec.setAttribute('hidden', '');

    var navLink = document.getElementById('navReviews');
    if (navLink) navLink.classList.toggle('is-hidden', !show);

    var meta = document.getElementById('reviewsMeta');
    if (meta) meta.textContent = isDemo ? t.reviewsDemoBadge : (items.length ? String(items.length) : '');

    list.innerHTML = '';
    if (!show) return;

    /* Разная длина текстов — чтобы секция показывала реальный ритм колонок,
       а не три одинаковых блока */
    var demoSrc = ['Google', 'Instagram', 'Google'];
    var data = isDemo
      ? [1, 2, 3].map(function (n, i) {
          return {
            name: t.reviewsDemoName,
            source: demoSrc[i],
            text: t['reviewsDemoText' + n],
            demo: true
          };
        })
      : items.map(function (r) {
          return {
            name: r.name || '',
            source: r.source || '',
            text: (r.text && (r.text[lang] || r.text.bg)) || '',
            demo: false
          };
        });

    data.forEach(function (r) {
      var li = el('li', 'review' + (r.demo ? ' review--demo' : ''));
      if (r.demo) li.appendChild(el('span', 'review__badge', t.reviewsDemoBadge));
      li.appendChild(el('p', 'review__text', r.text));
      var who = el('p', 'review__who');
      who.appendChild(el('span', 'review__name', r.name));
      if (r.source) who.appendChild(el('span', 'review__src', r.source));
      li.appendChild(who);
      list.appendChild(li);
    });
  }

  /* ---------- 5. Тексты --------------------------------------------------- */
  function applyText() {
    var t = C.i18n[lang];
    if (!t) return;

    document.documentElement.lang = lang;
    document.title = t.metaTitle;
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute('content', t.metaDesc);

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var v = t[el.getAttribute('data-i18n')];
      if (v == null) return;
      if (v.indexOf('<br>') > -1) el.innerHTML = v;   // только имя в hero
      else el.textContent = v;
    });

    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(',').forEach(function (pair) {
        var kv = pair.split(':');
        var v = t[kv[1]];
        if (v != null) el.setAttribute(kv[0].trim(), v);
      });
    });

    /* легенда карты: город и координаты берём из CONFIG,
       чтобы они менялись вместе с адресом */
    var coords =
      Math.abs(C.address.lat).toFixed(4) + '° ' + (C.address.lat >= 0 ? 'N' : 'S') + ' · ' +
      Math.abs(C.address.lng).toFixed(4) + '° ' + (C.address.lng >= 0 ? 'E' : 'W');

    var lp = document.getElementById('legPlaceVal');
    if (lp) lp.textContent = (lang === 'en' ? C.master.cityLat : C.master.city) + ' · ' + coords;

    var cc = document.getElementById('contactCoord');
    if (cc) cc.textContent = coords;

    var mc = document.querySelector('.mapcard__coord');
    if (mc) mc.textContent = coords;

    var col = document.getElementById('ftrColophon');
    if (col) col.textContent = t.colophon + ' · ' + coords;

    /* адрес: показываем улицу только когда она реально есть */
    var addr = document.getElementById('addrVal');
    if (addr && C.address.exact && C.address.street) {
      var parts = [C.address.street];
      if (C.address.district) parts.push(C.address.district);
      parts.push(C.master.city);
      var hint = C.address.landmark && C.address.landmark[lang];
      addr.textContent = parts.join(', ') + (hint ? '. ' + hint : '');
    }

    /* график: фиксированные часы, если заполнены */
    var hrs = document.getElementById('hoursVal');
    if (hrs && !C.hours.freeSchedule && C.hours.weekly) {
      hrs.textContent = Object.keys(C.hours.weekly)
        .map(function (d) { return d.toUpperCase() + ' ' + C.hours.weekly[d]; })
        .join(' · ');
    }

    document.querySelectorAll('.lang__btn').forEach(function (b) {
      var on = b.dataset.lang === lang;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    var burger = document.getElementById('burger');
    if (burger) {
      var open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-label', open ? t.menuClose : t.menuOpen);
    }
  }

  function setLang(next) {
    lang = next;
    try { localStorage.setItem('zl-lang', next); } catch (e) {}
    applyText();
    renderServices();
    renderWorks();
    renderReviews();
    applyLinks();
  }

  /* ---------- 6. Меню ----------------------------------------------------- */
  function initMenu() {
    var burger = document.getElementById('burger');
    var nav = document.getElementById('nav');
    if (!burger || !nav) return;

    var lastFocused = null;

    function focusables() {
      return Array.prototype.slice.call(nav.querySelectorAll('a[href]'));
    }

    function open() {
      lastFocused = document.activeElement;
      nav.classList.add('is-open');
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', C.i18n[lang].menuClose);
      document.body.style.overflow = 'hidden';
      /* ждём кадр: пока visibility ещё hidden, элемент нельзя сфокусировать */
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          var f = focusables(); if (f[0]) f[0].focus();
        });
      });
    }
    function close() {
      nav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', C.i18n[lang].menuOpen);
      document.body.style.overflow = '';
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }
    function isOpen() { return nav.classList.contains('is-open'); }

    burger.addEventListener('click', function () { isOpen() ? close() : open(); });
    nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') close(); });

    document.addEventListener('keydown', function (e) {
      if (!isOpen()) return;
      if (e.key === 'Escape') { close(); return; }
      if (e.key !== 'Tab') return;
      /* ловушка фокуса: из открытого меню табом не выпрыгиваем */
      var f = focusables().concat([burger]);
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      var a = document.activeElement;
      if (f.indexOf(a) === -1) { e.preventDefault(); first.focus(); return; }
      if (e.shiftKey && a === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && a === last) { e.preventDefault(); first.focus(); }
    });

    /* при переходе на десктоп меню всегда открыто как обычная навигация */
    var mq = window.matchMedia('(min-width:900px)');
    (mq.addEventListener ? mq.addEventListener.bind(mq, 'change') : mq.addListener.bind(mq))(function () {
      if (mq.matches && isOpen()) close();
    });
  }

  /* ---------- 7. Мелочи --------------------------------------------------- */
  function initHeaderShadow() {
    var hdr = document.getElementById('hdr');
    if (!hdr) return;
    var tick = false;
    window.addEventListener('scroll', function () {
      if (tick) return;
      tick = true;
      requestAnimationFrame(function () {
        hdr.classList.toggle('is-stuck', window.scrollY > 8);
        tick = false;
      });
    }, { passive: true });
  }

  function initReveal() {
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;

    var targets = document.querySelectorAll('.sec, .ftr');
    targets.forEach(function (el) { el.classList.add('reveal'); });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-in');
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

    targets.forEach(function (el) { io.observe(el); });
  }

  function initLangButtons() {
    document.querySelectorAll('.lang__btn').forEach(function (b) {
      b.addEventListener('click', function () { setLang(b.dataset.lang); });
    });
  }

  /* ---------- 8. Старт ---------------------------------------------------- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  setLang(pickLang());
  initLangButtons();
  initMenu();
  initHeaderShadow();
  initReveal();
})();
