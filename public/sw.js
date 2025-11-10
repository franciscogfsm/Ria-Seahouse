// Service Worker for aggressive image caching
const CACHE_NAME = "riaseahouse-images-v1";
const IMAGES_TO_CACHE = [
  "/images/capa1.avif",
  "/images/capa2.avif",
  "/images/capa3.avif",
  "/images/entrada1.avif",
  "/images/entrada2.avif",
  "/images/sala1.avif",
  "/images/sala2.avif",
  "/images/sala4.avif",
  "/images/sala5.avif",
  "/images/sala6.avif",
  "/images/sala7.avif",
  "/images/sala8.avif",
  "/images/sala9.avif",
  "/images/cozinha1.avif",
  "/images/cozinha2.avif",
  "/images/quartobaixo1.avif",
  "/images/quartobaixo2.avif",
  "/images/quartobaixo3.avif",
  "/images/quartocima2.avif",
  "/images/casadebanho1.avif",
  "/images/casadebanho2.avif",
  "/images/casadebanho3.avif",
  "/images/casadebanho4.avif",
  "/images/casadebanho5.avif",
  "/images/casadebanho6.avif",
  "/images/varanda1.avif",
  "/images/vista1.avif",
  "/images/vista2.avif",
  "/images/vista3.avif",
  "/images/vista4.avif",
  "/images/vista5.avif",
  "/images/vista6.avif",
  "/images/vista7.avif",
  "/images/vista8.avif",
  "/images/vista9.avif",
  "/images/vista10.avif",
  "/images/vista11.avif",
  "/images/escadas1.avif",
  "/images/saida1.avif",
  "/images/condominio1.avif",
];

// Install event - cache all images immediately
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching all gallery images...");
      return cache.addAll(IMAGES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache first, then network
self.addEventListener("fetch", (event) => {
  // Only cache image requests
  if (event.request.url.includes("/images/")) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        // Return cached version or fetch from network
        return (
          response ||
          fetch(event.request).then((fetchResponse) => {
            // Cache new images
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, fetchResponse.clone());
              return fetchResponse;
            });
          })
        );
      })
    );
  }
});
