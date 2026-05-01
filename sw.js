// Service Worker for Petra's Game
// Network-first strategy: always check for updates, fall back to cache offline
const CACHE_NAME = 'petra-game-v4.7';
const ASSETS = [
  './',
  './index.html',
  './favicon.png',
  './game/assets/art/apple-touch-icon.png',
  './game/assets/art/icon.svg'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all([
        self.clients.claim(),
        ...keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ])
    )
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;

  // Only handle GET requests to same-origin http(s) URLs
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (!url.protocol.startsWith('http')) return;

  event.respondWith(
    fetch(req)
      .then(response => {
        // Only cache full 200 same-origin responses (skip 206 partials, redirects)
        if (response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, clone)).catch(() => {});
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(req);
        if (cached) return cached;
        // Offline navigation falls back to cached index
        if (req.mode === 'navigate') {
          return (await caches.match('./index.html')) ||
                 new Response('Offline', { status: 503, statusText: 'Offline' });
        }
        return new Response('', { status: 504, statusText: 'Offline' });
      })
  );
});
