// UX goal checks for tasks/todo.md. Paste into the browser console (or run
// via the preview browser) on http://localhost:5174 at the viewport under
// test. Resolves to { goal: { pass, detail } }. Not shipped with the site.
(async () => {
  // A hidden/background pane pauses smooth-scroll animation and scroll events
  // (both run on the rendering loop), and it doesn't always report itself as
  // hidden. So the checks always jump instead of animating and fire the
  // scroll event themselves; the smooth animation itself is native browser
  // behaviour and is checked by eye.
  {
    const native = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = function (opts) {
      native.call(this, typeof opts === 'object' ? { ...opts, behavior: 'auto' } : opts);
      window.dispatchEvent(new Event('scroll'));
    };
    const nativeScrollTo = window.scrollTo.bind(window);
    window.scrollTo = (...args) => {
      nativeScrollTo(...args);
      window.dispatchEvent(new Event('scroll'));
    };
  }
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const vw = innerWidth;
  const vh = innerHeight;
  const mobile = vw <= 720;
  const stacked = vw <= 1120;
  const out = {};
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none';
  };

  // G1: selecting on a stacked layout brings the chakra name on screen.
  if (stacked) {
    const pickers = mobile
      ? [...document.querySelectorAll('.chakra-chip')]
      : [...document.querySelectorAll('.chakra-list button')];
    const orbs = [...document.querySelectorAll('.body-chakra')];
    const misses = [];
    for (const [label, list] of [['picker', pickers], ['orb', orbs]]) {
      for (const i of [3, 6, 0]) {
        scrollTo(0, 0);
        await wait(150);
        list[i].click();
        await wait(700);
        const h2 = document.querySelector('.right-panel h2');
        const r = h2.getBoundingClientRect();
        const name = h2.textContent;
        if (!(r.top >= 0 && r.bottom <= vh)) misses.push(`${label} ${i}: ${name} top=${Math.round(r.top)}`);
      }
    }
    out.G1 = { pass: misses.length === 0, detail: misses.length ? misses : 'name on screen after every tap' };
  } else {
    out.G1 = { pass: true, detail: 'n/a on side-by-side desktop (content always visible)' };
  }

  // G2: tap targets >= 44x44 on mobile; chakra orb hit areas never overlap.
  {
    const problems = [];
    if (mobile) {
      const exempt = (el) => el.classList.contains('body-chakra') || el.closest('.chakra-bar:not(.visible)');
      for (const el of document.querySelectorAll('button, a, textarea')) {
        if (!visible(el) || exempt(el)) continue;
        const r = el.getBoundingClientRect();
        if (r.width < 44 || r.height < 44) {
          problems.push(`${el.className || el.tagName} "${(el.getAttribute('aria-label') || el.textContent).trim().slice(0, 20)}" ${Math.round(r.width)}x${Math.round(r.height)}`);
        }
      }
    }
    const orbs = [...document.querySelectorAll('.body-chakra')].map((o) => o.getBoundingClientRect());
    for (let i = 0; i < orbs.length; i++)
      for (let j = i + 1; j < orbs.length; j++) {
        const a = orbs[i], b = orbs[j];
        if (a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom) problems.push(`orbs ${i}&${j} overlap`);
      }
    out.G2 = { pass: problems.length === 0, detail: problems.length ? [...new Set(problems)] : 'all targets ok' };
  }

  // G4: sticky bar visible while reading, and its arrows change chakra.
  if (stacked) {
    const bar = document.querySelector('.chakra-bar');
    const detail = [];
    let pass = !!bar;
    if (bar) {
      const acc = document.querySelector('.accordion');
      scrollTo(0, acc.getBoundingClientRect().top + scrollY - 100);
      await wait(400);
      bar.getAnimations().forEach((a) => a.finish()); // transitions stall in a hidden pane
      const headerGone = document.querySelector('.right-header').getBoundingClientRect().bottom < 0;
      const shown = bar.classList.contains('visible') && bar.getBoundingClientRect().top >= 0;
      if (!headerGone) {
        if (shown) { pass = false; detail.push('bar shown while chakra header is still on screen'); }
        else detail.push('page too short to scroll past the header here; bar correctly hidden');
      } else if (!shown) { pass = false; detail.push('bar not visible inside content'); }
      const before = document.querySelector('.right-panel h2').textContent;
      bar.querySelectorAll('.bar-step')[1].click();
      await wait(800);
      const after = document.querySelector('.right-panel h2').textContent;
      if (before === after) { pass = false; detail.push('next did not change chakra'); }
      const h2r = document.querySelector('.right-panel h2').getBoundingClientRect();
      if (h2r.top < 0 || h2r.bottom > vh) { pass = false; detail.push('after next, name off screen'); }
      scrollTo(0, 0);
      await wait(400);
      if (bar.classList.contains('visible')) { pass = false; detail.push('bar still visible at top of page'); }
    }
    out.G4 = { pass, detail: detail.length ? detail : 'bar shows in content, next works, hides at top' };
  } else {
    out.G4 = { pass: true, detail: 'n/a on side-by-side desktop' };
  }

  // G9 (partial, in-page): overlays open/close, arrow keys, aria state.
  {
    const detail = [];
    const links = [...document.querySelectorAll(mobile ? '.mobile-footer .footer-link:not(.sound-toggle)' : '.left-panel footer .footer-link:not(.sound-toggle)')];
    for (const l of links) {
      l.click();
      await wait(200);
      if (!document.querySelector('[role=dialog]')) detail.push(`${l.textContent.trim()} did not open`);
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await wait(200);
      if (document.querySelector('[role=dialog]')) detail.push(`${l.textContent.trim()} did not close`);
    }
    const first = document.querySelector('.right-panel h2').textContent;
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', cancelable: true }));
    await wait(300);
    if (document.querySelector('.right-panel h2').textContent === first && first !== 'Sahasrara') detail.push('arrow key did not advance');
    if (document.querySelectorAll('.body-chakra[aria-pressed="true"]').length !== 1) detail.push('orb aria-pressed not set on exactly one');
    out.G9 = { pass: detail.length === 0, detail: detail.length ? detail : 'overlays, arrows, aria ok' };
  }

  // G3: reading text >= 16px (mobile) / 15px (desktop), line-height >= 1.5.
  {
    const min = mobile ? 14 : 13; // lowered 2px in total at your request (2026-11-19)
    const bad = [];
    document.querySelector('.accordion-item:not(.open) .accordion-row')?.click();
    await wait(300);
    for (const el of document.querySelectorAll('.intro, .summary, .accordion-inner p, .accordion-inner li')) {
      if (!visible(el)) continue;
      const cs = getComputedStyle(el);
      const fs = parseFloat(cs.fontSize);
      const lh = parseFloat(cs.lineHeight) / fs;
      if (fs < min || lh < 1.5) bad.push(`${el.className || el.tagName} ${fs}px lh ${lh.toFixed(2)}`);
    }
    out.G3 = { pass: bad.length === 0, detail: bad.length ? [...new Set(bad)] : `reading text >= ${min}px, lh >= 1.5` };
  }

  // G5: no visible text < 12px; ALL-CAPS only for <= 3 words; contrast >= 4.5:1.
  {
    const lum = ([r, g, b]) => [r, g, b].map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }).reduce((a, v, i) => a + v * [0.2126, 0.7152, 0.0722][i], 0);
    const rgba = (c) => { const x = document.createElement('canvas').getContext('2d'); x.fillStyle = c; x.fillRect(0, 0, 1, 1); const d = x.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
    const bg = rgba(getComputedStyle(document.documentElement).getPropertyValue('--bg').trim());
    const bad = new Set();
    for (const el of document.querySelectorAll('body *')) {
      const txt = [...el.childNodes].filter((n) => n.nodeType === 3 && n.textContent.trim()).map((n) => n.textContent.trim()).join(' ');
      if (!txt || !visible(el)) continue;
      const cs = getComputedStyle(el);
      // Chip numbers (two digits, under a colour dot) are 11px by request (2026-11-19).
      if (parseFloat(cs.fontSize) < (el.classList.contains('chip-id') ? 11 : 12)) bad.add(`small ${cs.fontSize}: "${txt.slice(0, 24)}"`);
      const words = txt.split(/\s+/).filter((w) => /[a-z]/i.test(w));
      if (cs.textTransform === 'uppercase' && words.length > 3) bad.add(`caps ${words.length} words: "${txt.slice(0, 24)}"`);
      const c = rgba(cs.color);
      const fg = c.slice(0, 3).map((v, i) => v * c[3] + bg[i] * (1 - c[3]));
      const L1 = lum(fg), L2 = lum(bg);
      const cr = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
      if (cr < 4.5) bad.add(`contrast ${cr.toFixed(2)}: "${txt.slice(0, 24)}"`);
    }
    out.G5 = { pass: bad.size === 0, detail: bad.size ? [...bad] : 'sizes, caps and contrast ok' };
  }

  // G7: sections live in 3 tabs (<= 4 each), all 11 reachable, keyboard works.
  {
    const detail = [];
    const tabs = [...document.querySelectorAll('.section-tab')];
    if (tabs.length !== 3) detail.push(`expected 3 tabs, found ${tabs.length}`);
    const seen = new Set();
    for (const tab of tabs) {
      tab.click();
      await wait(150);
      const titles = [...document.querySelectorAll('#section-panel .accordion-row strong')].map((t) => t.textContent);
      if (titles.length > 4) detail.push(`${tab.textContent} has ${titles.length} sections`);
      titles.forEach((t) => seen.add(t));
      if (tab.getAttribute('aria-selected') !== 'true') detail.push(`${tab.textContent} not aria-selected after click`);
    }
    const total = document.querySelectorAll('.right-panel').length && 11;
    if (seen.size !== total) detail.push(`reached ${seen.size} of ${total} sections`);
    tabs[0]?.click();
    await wait(100);
    tabs[0]?.focus();
    tabs[0]?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await wait(150);
    if (document.activeElement !== tabs[1] || tabs[1].getAttribute('aria-selected') !== 'true') detail.push('ArrowRight did not move to next tab');
    const before = document.querySelector('.right-panel h2').textContent;
    tabs[1]?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await wait(150);
    if (document.querySelector('.right-panel h2').textContent !== before) detail.push('arrow key on a tab changed the chakra');
    tabs[0]?.click();
    out.G7 = { pass: detail.length === 0, detail: detail.length ? detail : `3 tabs, ${seen.size} sections reachable, keyboard ok` };
  }

  // G6: desktop left panel fits without scrolling or clipping.
  if (!stacked) {
    const lp = document.querySelector('.left-panel');
    const over = lp.scrollHeight - lp.clientHeight;
    out.G6 = { pass: over <= 0, detail: over <= 0 ? 'left panel fits' : `overflows by ${over}px` };
  } else {
    out.G6 = { pass: true, detail: 'n/a on stacked layouts (panel flows with the page)' };
  }

  scrollTo(0, 0);
  return { viewport: `${vw}x${vh}`, ...out };
})();
