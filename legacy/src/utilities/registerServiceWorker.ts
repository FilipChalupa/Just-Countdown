export async function registerServiceWorker() {
	if ('serviceWorker' in navigator) {
		await navigator.serviceWorker.register('/serviceWorker.js')
	}
}
