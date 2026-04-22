// Service Worker for Petra's Game
// Network-first strategy: always check for updates, fall back to cache offline
const CACHE_NAME = 'petra-game-v4';
const ASSETS = [
  '/',
  '/index.html',
  '/favicon.png',
  '/game/assets/art/apple-touch-icon.png',
  '/game/assets/art/icon.svg'
];

self.addEventListener('install', event => {
  // Take over immediately
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', event => {
  // Claim all clients immediately & clear old caches
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
  // Network-first: try fresh version, fall back to cache
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cache the fresh response
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
