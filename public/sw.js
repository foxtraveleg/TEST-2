// Service Worker for SmartBack Belt App
const CACHE_NAME = "smartback-v1"

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("[ServiceWorker] Installing...")
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[ServiceWorker] Activating...")
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("[ServiceWorker] Deleting old cache:", cacheName)
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
  self.clients.claim()
})

// Fetch event - Network first, fall back to cache
self.addEventListener("fetch", (event) => {
  const { request } = event

  // Skip non-GET requests
  if (request.method !== "GET") {
    return
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        // Only cache successful responses
        if (response && response.status === 200) {
          const responseToCache = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache)
          })
        }
        return response
      })
      .catch(() => {
        // Return from cache on network failure
        return caches.match(request).then((response) => {
          return (
            response ||
            new Response("Offline - content not cached", {
              status: 503,
              statusText: "Service Unavailable",
            })
          )
        })
      }),
  )
})
