/*
 * Quark 2 — navigation, dropdowns, scroll state.
 */
(function () {
  'use strict';

  var body = document.body;

  // --site-header-height tracks the real (sticky, breakpoint-dependent)
  // header height so full-viewport sections (e.g. the hero) can size
  // themselves as "100vh minus the header" instead of a guessed constant.
  var header = document.getElementById('header');
  if (header) {
    var setHeaderHeightVar = function () {
      document.documentElement.style.setProperty('--site-header-height', header.offsetHeight + 'px');
    };
    setHeaderHeightVar();
    window.addEventListener('resize', setHeaderHeightVar);
    if (window.ResizeObserver) {
      new ResizeObserver(setHeaderHeightVar).observe(header);
    }
  }

  // Mark nav items that have children so CSS can draw a caret
  document.querySelectorAll('.dropmenu li').forEach(function (li) {
    if (li.querySelector(':scope > ul')) li.classList.add('has-children');
  });

  // Click-to-open on touch devices (hover is flaky on iOS)
  var isTouch = matchMedia('(hover: none)').matches;
  if (isTouch) {
    document.querySelectorAll('.dropmenu li.has-children > a').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var li = a.parentNode;
        if (!li.classList.contains('open')) {
          e.preventDefault();
          document.querySelectorAll('.dropmenu li.open').forEach(function (other) {
            if (other !== li && !other.contains(li)) other.classList.remove('open');
          });
          li.classList.add('open');
        }
      });
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.dropmenu')) {
        document.querySelectorAll('.dropmenu li.open').forEach(function (li) { li.classList.remove('open'); });
      }
    });
  }

  // Mobile menu toggle
  var toggle = document.getElementById('toggle');
  var overlay = document.getElementById('overlay');
  if (toggle && overlay) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      overlay.classList.toggle('open');
      document.body.classList.toggle('overlay-open');
    });
    overlay.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        toggle.classList.remove('active');
        overlay.classList.remove('open');
        document.body.classList.remove('overlay-open');
      }
    });
  }

  // Background parallax for hero sections tagged `.parallax`.
  // Vanilla port of Quark 1's parallaxBackground(); rAF-throttled and
  // disabled when the visitor prefers reduced motion. Driven off the same
  // scroll listener as the scroll-state below so there's only one handler.
  var parallaxNodes = document.querySelectorAll('.hero.parallax');
  var parallaxOn = parallaxNodes.length && !matchMedia('(prefers-reduced-motion: reduce)').matches;
  var parallaxTicking = false;
  function applyParallax() {
    var offset = window.scrollY * 0.3;
    parallaxNodes.forEach(function (el) {
      el.style.backgroundPositionY = offset + 'px';
    });
    parallaxTicking = false;
  }

  // Scroll state (for sticky header shadow + animated shrink)
  // Hysteresis: the navbar shrinks by 12px when `.scrolled` is on, which
  // shifts layout and can flip scrollY back over a single threshold. The
  // 16px dead zone between ON_AT and OFF_AT is wider than that delta so a
  // toggle-induced layout shift can never re-cross the opposite threshold.
  var SCROLL_ON_AT = 20;
  var SCROLL_OFF_AT = 4;
  var lastScrolled = false;
  function onScroll() {
    var y = window.scrollY;
    var scrolled = lastScrolled ? y > SCROLL_OFF_AT : y > SCROLL_ON_AT;
    if (scrolled !== lastScrolled) {
      body.classList.toggle('scrolled', scrolled);
      lastScrolled = scrolled;
    }
    if (parallaxOn && !parallaxTicking) {
      window.requestAnimationFrame(applyParallax);
      parallaxTicking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // The dashboard/device-mockup illustrations (skills, experience, about,
  // contact) are drawn as dark "screen" mockups — swap in a light-mode
  // counterpart (same filename + "-light" suffix) so they don't look like
  // a stray dark box once the page itself switches to light mode.
  var THEMED_ILLUSTRATIONS = ['skills-dashboard.svg', 'career-path.svg', 'workspace-setup.svg', 'contact-message.svg', 'server-rack.svg'];
  function updateThemedIllustrations() {
    var isLight = document.documentElement.getAttribute('data-theme') === 'light';
    document.querySelectorAll('img.portfolio-image').forEach(function (img) {
      var src = img.getAttribute('src');
      if (!src) return;
      var darkSrc = src.replace('-light.svg', '.svg');
      var filename = darkSrc.split('/').pop();
      if (THEMED_ILLUSTRATIONS.indexOf(filename) === -1) return;
      var wanted = isLight ? darkSrc.replace('.svg', '-light.svg') : darkSrc;
      if (src !== wanted) img.setAttribute('src', wanted);
    });
  }
  updateThemedIllustrations();
  if (window.MutationObserver) {
    new MutationObserver(updateThemedIllustrations).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
  }

  // Detail modal — [data-modal-trigger] cards (project cards, experience
  // timeline entries, specialisation cards) hold a hidden
  // <template class="modal-content-template"> with the expanded write-up;
  // clicking the card clones that into the shared #detail-modal overlay.
  (function () {
    var backdrop = document.getElementById('detail-modal-backdrop');
    var modal = document.getElementById('detail-modal');
    var body = document.getElementById('detail-modal-body');
    var closeBtn = document.getElementById('detail-modal-close');
    if (!backdrop || !modal || !body || !closeBtn) return;

    var lastTrigger = null;

    function closeModal() {
      modal.hidden = true;
      backdrop.hidden = true;
      body.innerHTML = '';
      document.body.classList.remove('detail-modal-open');
      if (lastTrigger) lastTrigger.focus();
    }

    function openModal(trigger) {
      var template = trigger.querySelector('.modal-content-template');
      if (!template) return;
      body.innerHTML = '';
      body.appendChild(template.content.cloneNode(true));
      lastTrigger = trigger;
      modal.hidden = false;
      backdrop.hidden = false;
      document.body.classList.add('detail-modal-open');
      closeBtn.focus();
    }

    document.querySelectorAll('[data-modal-trigger]').forEach(function (trigger) {
      if (!trigger.hasAttribute('tabindex')) trigger.setAttribute('tabindex', '0');
      // Note: deliberately not role="button" — Pico's base stylesheet
      // styles any [role=button] as a solid primary-color button
      // (background/border/padding), which fought every card's own look.
      trigger.classList.add('has-modal-trigger');
      trigger.addEventListener('click', function (e) {
        // Let tag popovers / links inside the card handle their own clicks.
        if (e.target.closest('[data-info], a')) return;
        openModal(trigger);
      });
      trigger.addEventListener('keydown', function (e) {
        if (e.target !== trigger) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(trigger);
        }
      });
    });

    backdrop.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) closeModal();
    });
  })();

  // Click-to-reveal info popovers: any [data-info="..."] element becomes
  // clickable/focusable and shows a small bubble with that text. Used on
  // skill/tag cards so visitors can tap "Docker" and see what it's for.
  function closeInfo(el) {
    el.classList.remove('info-open');
    var bubble = el.querySelector('.info-popover');
    if (bubble) bubble.remove();
  }
  function openInfo(el) {
    document.querySelectorAll('.info-open').forEach(function (o) {
      if (o !== el) closeInfo(o);
    });
    el.classList.add('info-open');
    var bubble = document.createElement('div');
    bubble.className = 'info-popover';
    bubble.textContent = el.getAttribute('data-info');
    el.appendChild(bubble);
  }
  document.querySelectorAll('[data-info]').forEach(function (el) {
    el.classList.add('has-info');
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
    // Note: deliberately not role="button" — see the modal-trigger wiring
    // above for why (Pico styles [role=button] as a solid primary button).
    el.setAttribute('aria-expanded', 'false');
    el.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = el.classList.contains('info-open');
      if (isOpen) {
        closeInfo(el);
        el.setAttribute('aria-expanded', 'false');
      } else {
        openInfo(el);
        el.setAttribute('aria-expanded', 'true');
      }
    });
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        el.click();
      } else if (e.key === 'Escape') {
        closeInfo(el);
        el.setAttribute('aria-expanded', 'false');
      }
    });
  });
  document.addEventListener('click', function () {
    document.querySelectorAll('.info-open').forEach(function (el) {
      closeInfo(el);
      el.setAttribute('aria-expanded', 'false');
    });
  });

  // Simple tab widgets: [data-tabs] > buttons with [data-tab-target] toggle
  // sibling [data-tab-panel] elements with the matching value.
  document.querySelectorAll('[data-tabs]').forEach(function (widget) {
    var tabs = widget.querySelectorAll('[data-tab-target]');
    var panels = widget.querySelectorAll('[data-tab-panel]');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.getAttribute('data-tab-target');
        tabs.forEach(function (t) {
          t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
        });
        panels.forEach(function (panel) {
          panel.hidden = panel.getAttribute('data-tab-panel') !== target;
        });
      });
    });
  });

  // Smooth-scroll to #start for "angle-down" hero chevron
  var toStart = document.getElementById('to-start');
  if (toStart) {
    toStart.addEventListener('click', function () {
      var target = document.getElementById('start');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
})();
