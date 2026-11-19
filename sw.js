const CACHE_NAME = 'studio-avlis-v19';
const SHELL = ['/', '/index.html', '/manifest.json', '/icons/icon-192.png', '/icons/icon-512.png'];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL)).catch(()=>{})
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Network-first: always try to get the latest version; fall back to cache only when offline.
self.addEventListener('fetch', (event) => {
  if(event.request.method !== 'GET') return;
  const url = event.request.url;
  if(url.includes('firestore.googleapis') || url.includes('/google.firestore')) return;
  event.respondWith(
    fetch(event.request).then((resp) => {
      if(resp && (resp.ok || resp.type === 'opaque')){
        const copy = resp.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)).catch(()=>{});
      }
      return resp;
    }).catch(() => caches.match(event.request).then((cached) => cached || caches.match('/index.html')))
  );
});
