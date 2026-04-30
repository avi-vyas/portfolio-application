/**
 * easter-eggs.js
 * --------------------------------------------------------------
 * Small, tasteful hidden interactions:
 *   1. Shift + J  -> "Java Mode Activated" modal
 *   2. Type "springboot" -> "ApplicationContext Loaded Successfully"
 *   3. Click brand logo -> "Version 3.2.1 Stable"
 *
 * All effects are non-intrusive and require active user input.
 * --------------------------------------------------------------
 */

(function () {
  'use strict';

  /* -----------------------------
     1. Shift + J -> Java Mode modal
     ----------------------------- */
  function ensureModal() {
    let modal = document.querySelector('[data-modal="java"]');
    if (modal) return modal;

    modal = document.createElement('div');
    modal.className = 'modal';
    modal.setAttribute('data-modal', 'java');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'java-modal-title');
    modal.innerHTML = `
      <div class="modal__panel">
        <h2 class="modal__title" id="java-modal-title">// Java Mode Activated</h2>
        <p class="muted">
          public class You {<br>
          &nbsp;&nbsp;public static void main(String[] args) {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;System.out.println("Welcome, fellow engineer.");<br>
          &nbsp;&nbsp;}<br>
          }
        </p>
        <button type="button" class="modal__close">Close</button>
      </div>`;
    document.body.appendChild(modal);

    const close = () => modal.classList.remove('is-open');
    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    });
    modal.querySelector('.modal__close').addEventListener('click', close);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });

    return modal;
  }

  function isTypingTarget(el) {
    if (!el) return false;
    const tag = el.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || el.isContentEditable;
  }

  document.addEventListener('keydown', (e) => {
    if (isTypingTarget(e.target)) return;
    // Shift + J (case-insensitive). Avoid firing for common shortcuts.
    if (e.shiftKey && (e.key === 'J' || e.key === 'j') && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      ensureModal().classList.add('is-open');
    }
  });

  /* -----------------------------
     2. Type "springboot" -> toast
     ----------------------------- */
  const SECRET = 'springboot';
  let buffer = '';
  let bufferTimer = null;

  document.addEventListener('keydown', (e) => {
    if (isTypingTarget(e.target)) return;
    if (e.key.length !== 1) return; // ignore arrows, modifiers, etc.

    buffer = (buffer + e.key.toLowerCase()).slice(-SECRET.length);

    clearTimeout(bufferTimer);
    bufferTimer = setTimeout(() => {
      buffer = '';
    }, 1500);

    if (buffer === SECRET) {
      buffer = '';
      if (window.PortfolioApp && typeof window.PortfolioApp.toast === 'function') {
        window.PortfolioApp.toast('ApplicationContext Loaded Successfully', { variant: 'success' });
      }
    }
  });

  /* -----------------------------
     3. Click brand logo -> version toast
     ----------------------------- */
  document.addEventListener('click', (e) => {
    const brand = e.target.closest('[data-easter="logo"]');
    if (!brand) return;
    // Only trigger when clicking on the brand mark (small "PA" tile),
    // not when navigating via the text. Keeps it discoverable but
    // non-disruptive for normal home navigation.
    const mark = e.target.closest('.nav__brand-mark');
    if (!mark) return;
    e.preventDefault();
    if (window.PortfolioApp && typeof window.PortfolioApp.toast === 'function') {
      window.PortfolioApp.toast('Version 3.2.1 Stable', { variant: 'info' });
    }
  });
})();
