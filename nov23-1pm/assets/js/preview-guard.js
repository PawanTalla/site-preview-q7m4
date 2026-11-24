/* Hosted preview only: checkout is switched off. On the live site this hands off to Shopify checkout. */
(function () {
  'use strict';
  var MSG = 'Checkout is turned off in this preview. On the live site, this button takes you to the secure Shopify checkout.';
  function note() {
    var d = document.getElementById('pv-note');
    if (!d) {
      d = document.createElement('div'); d.id = 'pv-note'; d.setAttribute('role', 'status');
      d.style.cssText = 'position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:2147483647;max-width:min(92vw,460px);padding:14px 18px;border-radius:14px;background:#1F2550;color:#fff;font:600 15px/1.45 system-ui,sans-serif;box-shadow:0 12px 32px rgba(0,0,0,.25);text-align:center';
      document.body.appendChild(d);
    }
    d.textContent = MSG; d.hidden = false;
    clearTimeout(note.t); note.t = setTimeout(function () { d.hidden = true; }, 4500);
  }
  var K = window.KIT;
  if (K) { K.checkout = function () { note(); }; K.permalink = function () { return '#'; }; }
  document.addEventListener('kit:checkout', function (e) { e.preventDefault(); e.stopImmediatePropagation(); note(); }, true);
  document.addEventListener('submit', function (e) { var a = (e.target && e.target.action) || ''; if (/\/cart|\/checkout/.test(a)) { e.preventDefault(); note(); } }, true);
  var open = window.open;
  window.open = function (u) { if (/\/cart|\/checkout/.test(String(u || ''))) { note(); return null; } return open.apply(window, arguments); };
})();
