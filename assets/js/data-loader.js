/**
 * data-loader.js
 * --------------------------------------------------------------
 * Tiny JSON loader for static pages. Caches responses in memory
 * for the duration of the page lifetime so multiple components
 * can share the same fetch.
 *
 * Usage:
 *   const profile = await DataLoader.load('profile');
 *   const skills  = await DataLoader.load('skills');
 *
 * All JSON files live in /data/<name>.json and are loaded
 * relative to the page so the site works on any GitHub Pages
 * sub-path (e.g. /username.github.io/repo/).
 * --------------------------------------------------------------
 */

(function () {
  'use strict';

  const cache = new Map();
  const inflight = new Map();

  /**
   * Resolve a data path relative to the current page so it works
   * for both root deployments and project-page deployments.
   */
  function resolvePath(name) {
    // Walk up from the current page to the site root. The repo
    // structure is flat (all HTML pages at the root), so we can
    // simply ask for "data/<name>.json" relative to the doc.
    return `data/${name}.json`;
  }

  async function load(name) {
    if (cache.has(name)) return cache.get(name);
    if (inflight.has(name)) return inflight.get(name);

    const path = resolvePath(name);
    const promise = fetch(path, { credentials: 'same-origin' })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load ${path}: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        cache.set(name, data);
        inflight.delete(name);
        return data;
      })
      .catch((err) => {
        inflight.delete(name);
        // Surface error in console; pages handle missing data gracefully.
        console.warn('[DataLoader]', err.message);
        return null;
      });

    inflight.set(name, promise);
    return promise;
  }

  /** Load multiple datasets in parallel. */
  async function loadMany(names) {
    const results = await Promise.all(names.map((n) => load(n)));
    return names.reduce((acc, name, i) => {
      acc[name] = results[i];
      return acc;
    }, {});
  }

  window.DataLoader = { load, loadMany };
})();
