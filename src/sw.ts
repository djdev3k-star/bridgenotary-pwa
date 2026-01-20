/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope;

// Cache configuration
const CACHE_VERSION = 'v1';
const RUNTIME_CACHE = `bridgenotary-runtime-${CACHE_VERSION}`;
const STATIC_CACHE = `bridgenotary-static-${CACHE_VERSION}`;
const API_CACHE = `bridgenotary-api-${CACHE_VERSION}`;

// Files to cache on install
const STATIC_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
];

/**
 * Install event: cache static assets
 */
self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_FILES).catch((err) => {
        console.warn('Failed to cache static files:', err);
      });
    })
  );
  self.skipWaiting();
});

/**
 * Activate event: clean up old caches
 */
self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (
            name !== STATIC_CACHE &&
            name !== RUNTIME_CACHE &&
            name !== API_CACHE &&
            name.startsWith('bridgenotary-')
          ) {
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

/**
 * Fetch event: implement caching strategies
 */
self.addEventListener('fetch', (event: FetchEvent) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // API calls: network-first with fallback to cache
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Images & assets: cache-first with network fallback
  if (/\.(png|jpg|jpeg|svg|gif|webp|css|js)$/.test(url.pathname)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // HTML & documents: network-first
  event.respondWith(networkFirst(request));
});

/**
 * Network-first strategy: try network, fallback to cache
 */
async function networkFirst(request: Request): Promise<Response> {
  try {
    const response = await fetch(request);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    // Cache successful responses
    const cache = await caches.open(RUNTIME_CACHE);
    cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) return cached;
    return new Response('Offline - Resource not available', { status: 503 });
  }
}

/**
 * Cache-first strategy: use cache, fallback to network
 */
async function cacheFirst(request: Request): Promise<Response> {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const cache = await caches.open(STATIC_CACHE);
    cache.put(request, response.clone());
    return response;
  } catch (error) {
    return new Response('Offline - Resource not available', { status: 503 });
  }
}

/**
 * Handle background sync for form submissions
 */
self.addEventListener('sync', (event: any) => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncFormSubmissions());
  }
});

async function syncFormSubmissions(): Promise<void> {
  try {
    const db = await openIndexedDB();
    const pending = await getPendingSubmissions(db);

    for (const submission of pending) {
      try {
        await fetch('/api/request-form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submission.data),
        });
        await deletePendingSubmission(db, submission.id);
      } catch (error) {
        console.error('Form sync failed, will retry:', error);
      }
    }
  } catch (error) {
    console.error('Background sync error:', error);
  }
}

function openIndexedDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('bridgenotary', 1);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

function getPendingSubmissions(db: IDBDatabase): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['pendingSubmissions'], 'readonly');
    const store = transaction.objectStore('pendingSubmissions');
    const request = store.getAll();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

function deletePendingSubmission(db: IDBDatabase, id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['pendingSubmissions'], 'readwrite');
    const store = transaction.objectStore('pendingSubmissions');
    const request = store.delete(id);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

export {};
