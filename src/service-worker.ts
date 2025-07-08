/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

import { build, files, version } from '$service-worker';

declare const self: ServiceWorkerGlobalScope;

// Generate unique ID for new cache
const cacheId = `cache${version}`;

// Build files + /static files
const cachePayloadArr = [...build, ...files];
const cachePayloadSet = new Set(cachePayloadArr);

self.addEventListener('install', function (event: ExtendableEvent) {
	event.waitUntil(
		caches
			.open(cacheId)
			.then((cache) => cache.addAll(cachePayloadArr))
			.then(() => self.skipWaiting())
	);
});

self.addEventListener('activate', function (event: ExtendableEvent) {
	event.waitUntil(
		caches.keys().then(async (keys) => {
			for (const key of keys) {
				if (key !== cacheId) await caches.delete(key);
			}

			self.clients.claim();
		})
	);
});

// prettier-ignore
self.addEventListener('fetch', (event: FetchEvent) => {
	if (
		event.request.method !== 'GET' || 
		event.request.headers.has('range')
	) return

	const { 
		isHttp, 
		isLocal, 
		isStaticAsset, 
		isUncached 
	} = checks(event)

	if (isHttp && isLocal && !isUncached) {
		event.respondWith(
			(async () => {
				const cachedAsset =
					isStaticAsset && 
					(await caches.match(event.request))

				return cachedAsset || fetchAndCache(event.request)
			})()
		)
	}
})

// prettier-ignore
function checks(event: FetchEvent) {
	const url = new URL(event.request.url)

	// Omit data urls, etc...
	const isHttp = url.protocol.startsWith('http')

	// Is the resource within the scope of the app?
	const isLocal =
		url.hostname === self.location.hostname &&
		url.port === self.location.port

	const isStaticAsset =
		url.host === self.location.host && 
		cachePayloadSet.has(url.pathname)

	// Was the resource cached on install?
	const isUncached =
		event.request.cache === 'only-if-cached' && 
		!isStaticAsset

	return {
		isHttp,
		isLocal,
		isStaticAsset,
		isUncached
	}
}

async function fetchAndCache(request: Request) {
	const cache = await caches.open(`offline${version}`);

	try {
		const response = await fetch(request);
		cache.put(request, response.clone());

		return response;
	} catch (err) {
		const response = await cache.match(request);
		if (response) return response;

		throw err;
	}
}
