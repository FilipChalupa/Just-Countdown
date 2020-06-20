// Basic passthrough service worker
self.addEventListener('fetch', function (event) {
	// @ts-ignore
	event.respondWith(fetch(event.request))
})
