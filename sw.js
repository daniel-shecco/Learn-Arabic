// Offline support: cache the app shell; network-first so updates arrive promptly.
const CACHE = 'lingua-path-v1';
const SHELL = [
  './', './index.html', './css/app.css', './manifest.webmanifest', './icons/icon.svg',
  './js/app.js', './js/text.js', './js/srs.js', './js/state.js', './js/gamify.js', './js/session.js',
  './js/speech.js', './js/sfx.js', './js/ai.js',
  './js/ui/dom.js', './js/ui/exercises.js', './js/ui/player.js', './js/ui/keyboard.js', './js/ui/tracer.js',
  './js/data/index.js', './js/data/ar/units.js', './js/data/ar/script.js', './js/data/it/units.js', './js/data/it/sounds.js',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.hostname === 'api.anthropic.com') return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        if (res.ok && (url.origin === location.origin || url.hostname.includes('fonts.g'))) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
        }
        return res;
      })
      .catch(() => caches.match(e.request).then((r) => r || caches.match('./index.html'))),
  );
});
