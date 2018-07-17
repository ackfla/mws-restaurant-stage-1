
// Listen for 'fetch' event
self.addEventListener('fetch', function(event) {
    let response;
    // Override default 'fetch' event
    event.respondWith(
        // Check for match in cache first
        caches.match(event.request).then(function(r){
            response = r;
            // If match return the cached item
            if (response) {
                return response;
            // If no match, carry on with default fetching from network
            } else {
                return fetch(event.request).then(function(response) {
                    // Return network response
                    return response;
                    // Then store in 'restaurant-static' cache
                    caches.open('restaurant-static').then(function(cache) {
                        cache.put(event.request, response);
                    })
                })
            }
        })
    );
});
