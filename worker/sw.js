const CACHE_NAME = 'digibiz-v1';
const cacheData = [

    //html
    '/',
    //js

    '/framework/assets/js/js.cookie.js',
    '/framework/assets/js/handlebars.min.js',
    '/framework/assets/js/jquery-3.3.1.min.js',
    '/framework/crossplat.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(cache =>
                cache.addAll(cacheData)
            )
    )
});

self.addEventListener('activate', function (event) {
    var cacheKeeplist = ['digibiz-v1'];
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (cacheKeeplist.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        })
    );
});


self.addEventListener('fetch', function (event) {

    if (event.request.method != "POST") {
        event.respondWith(
            caches.match(event.request)
                .then(function (response) {
                    // Cache hit - return response
                    if (response) {
                        return response;
                    }

                    return fetch(event.request).then(
                        function (response) {
                            // Check if we received a valid response
                            if (!response || response.status !== 200 || response.type !== 'basic') {
                                return response;
                            }

                            // IMPORTANT: Clone the response. A response is a stream
                            // and because we want the browser to consume the response
                            // as well as the cache consuming the response, we need
                            // to clone it so we have two streams.
                            var responseToCache = response.clone();

                            caches.open(CACHE_NAME)
                                .then(function (cache) {
                                    cache.put(event.request, responseToCache);
                                });

                            return response;
                        }
                    );
                })
        );
    }
});