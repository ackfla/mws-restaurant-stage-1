
// Listen for 'fetch' event
self.addEventListener('fetch', function(event) {

    // Overide default response
    event.respondWith(

        // Open cache called 'restaurant-v1' (creates one if doesn't already exist)
        caches.open('restaurant-v1').then(cache => {

            // Look to see if cache contains request
            return cache.match(event.request).then(response => {

                // Return if exists or request from network
                return response || fetch(event.request).then(response => {

                    // Store network response in cache
                    cache.put(event.request, response.clone());
                    // Return response
                    return response;

                })
            })
        })
    )
});
