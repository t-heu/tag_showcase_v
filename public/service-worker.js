/* eslint-env browser */
const CACHE_NAME = 'd24m06y22.v1';

self.addEventListener('install', event => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll([
        // '/',
        '/assets/css/home.css',
        '/assets/css/label.css',
        '/assets/css/hubcap_table.css',
        '/assets/js/main.js',
        '/ModeloDeEtiqueta.xlsx',
        '/ModeloDeCalota.ods',
        '/assets/fonts/ConnectCode39.ttf',
        '/assets/fonts/Roboto/Roboto-Regular.ttf',
        '/assets/fonts/Roboto/Roboto-Bold.ttf',
        '/assets/img/back_hubcap.png'
      ]),
    ),
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          if (cacheName.indexOf(CACHE_NAME) !== 0) {
            caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches
      .match(event.request)
      .then(cachedResponse => cachedResponse || fetch(event.request)),
  );
});
