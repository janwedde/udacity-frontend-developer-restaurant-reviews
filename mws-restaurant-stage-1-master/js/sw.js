// Create variable for cache
let staticCache = 'cache-rr-v1';
// Create variable for array of urls to cache
let cacheUrls = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/js/sw.js',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
];
// Installation of serviceWorker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCache).then(cache => {
    // Put urls to cache
    return cache.addAll(cacheUrls);
    }).catch(error => {
    console.log('Installation failed')
    })
  );
});
// Fetch files from cache or network
self.addEventListener('fetch', event => {
  event.respondWith(
    // Check if files are already in the cache
    caches.match(event.request).then(response => {
      // If data already exists return it
      if (response) {
        return response;
      }
      // If no data exists fetch it from the network
      return fetch(event.request).then(response => {
        // Add fetched data to the cache
        return caches.open(staticCache).then(cache => {
          cache.put(event.request, response(clone));
          return response;
        });
      // Check for network error
    }).catch(error => {
        console.log('Data could not be added to the cache due to network error');
      })
    })
  );
});
//Delete old files from cache
self.addEventListener('activate', event => {
  event.waitUntil(
    // Get all names of files that exist in the cache
    caches.keys().then(cacheNames => {
      return Promise.all(
        // Filter names of old files
        cacheNames.filter(cacheName => {
          return cacheName.startsWith('cache-rr-') && cacheName != staticCache;
        // Delete old files from cache
      }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
