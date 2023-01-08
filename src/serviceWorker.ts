// Basic passthrough service worker
self.addEventListener('fetch', function (event) {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	event.respondWith(fetch(event.request))
})
