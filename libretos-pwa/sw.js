// Service worker de Libretos: funciona sin conexión y recibe archivos compartidos desde otras apps.
const VERSION = 'libretos-v1';
const BASE = ['./', './index.html', './manifest.webmanifest', './icon.svg', './icon-192.png', './icon-512.png', './icon-maskable-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(BASE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== VERSION && k !== 'compartidos').map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  const url = new URL(req.url);

  // "Compartir" un .md (o texto) desde Archivos, Drive, Telegram… hacia la app
  if (req.method === 'POST' && url.pathname.endsWith('/compartir')) {
    e.respondWith((async () => {
      const fd = await req.formData();
      const items = [];
      for (const f of fd.getAll('libreto')) {
        if (f && typeof f.text === 'function') items.push({ nombre: f.name, texto: await f.text() });
      }
      const texto = fd.get('text');
      if (!items.length && texto) items.push({ nombre: (fd.get('title') || 'Libreto compartido') + '.md', texto });
      const c = await caches.open('compartidos');
      await c.put(new URL('__compartido', self.registration.scope).href, new Response(JSON.stringify(items)));
      return Response.redirect(new URL('./?compartido=1', self.registration.scope).href, 303);
    })());
    return;
  }

  if (req.method !== 'GET') return;

  // Fuentes de Google: usar la copia guardada y actualizarla en segundo plano
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(VERSION).then(async c => {
      const hit = await c.match(req);
      const red = fetch(req).then(r => { if (r.ok || r.type === 'opaque') c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || red;
    }));
    return;
  }

  if (url.origin !== self.location.origin) return;

  // Archivos de la app: red primero (para recibir actualizaciones), copia guardada si no hay conexión
  e.respondWith(
    fetch(req).then(r => {
      if (r.ok) { const copia = r.clone(); caches.open(VERSION).then(c => c.put(req, copia)); }
      return r;
    }).catch(async () => {
      const hit = await caches.match(req, { ignoreSearch: true });
      if (hit) return hit;
      if (req.mode === 'navigate') return caches.match('./index.html');
      return Response.error();
    })
  );
});
