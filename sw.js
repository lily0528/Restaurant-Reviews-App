const staticCache = 'my-cache-1';
self.addEventListener('activate', event =>{
    event.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(
            cacheNames.filter(function(cacheName){
                return cacheName.startsWith('my-')&& cacheName !== staticCache
            }).map(function(cacheName){
                return caches.delete(cacheName);
            })
            );
        })
    );
})
self.addEventListener('install',(event) =>{
    event.waitUntil(
        caches.open(staticCache).then(function(cache){
        return cache.addAll(
            ['img/1.jpg',
            'img/2.jpg',
            'img/3.jpg',
            'img/4.jpg',
            'img/5.jpg',
            'img/6.jpg',
            'img/7.jpg',
            'img/8.jpg',
            'img/9.jpg',
            'img/10.jpg',
            'data/image/M-1.png',
            'data/image/M-2.png',
            'data/restaurants.json',
            'data/manifest.json',
            'css/styles.css',
              'js/dbhelper.js',
              'js/main.js',
              'js/restaurant_info.js',
            'restaurant.html',
            'sw.js',
            'index.html']
        );
        })
    );
})


self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then(function(response){
            return response || fetch(event.request)
        })
    );
    });
