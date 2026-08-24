const SHELL = "scp-shell-v1";
const FEED_CACHE = "scp-feed-v1";
const FEED = "https://ivenkurz.github.io/supercharger-price/europe.json";
const BASE = new URL("./", self.location).pathname;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL).then((cache) =>
      cache.addAll([BASE, BASE + "index.html", BASE + "manifest.webmanifest", BASE + "icon-192.png", BASE + "icon-512.png"]).catch(() => undefined),
    ),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== "GET") return;
  if (url.href === FEED) {
    event.respondWith(
      fetch(event.request).then((res) => {
        const copy = res.clone();
        caches.open(FEED_CACHE).then((c) => c.put(FEED, copy));
        return res;
      }).catch(() => caches.open(FEED_CACHE).then((c) => c.match(FEED)).then((h) => h || Promise.reject("offline")))
    );
    return;
  }
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request).then((hit) => {
        const fetched = fetch(event.request).then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(SHELL).then((c) => c.put(event.request, copy));
          }
          return res;
        }).catch(() => hit);
        return hit || fetched;
      })
    );
  }
});
