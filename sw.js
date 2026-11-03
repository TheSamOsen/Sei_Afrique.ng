const V='sei-v9',F=['./','./index.html','./manifest.json','./logo.png','./icon-192.png','./icon-512.png'],X=['www.gstatic.com','cdn.jsdelivr.net'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!='GET')return;const u=new URL(r.url);
 if(X.includes(u.hostname)){e.respondWith(caches.match(r).then(h=>h||fetch(r).then(res=>{const c=res.clone();caches.open(V).then(x=>x.put(r,c));return res})));return}
 if(u.origin!=location.origin)return;
 e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(V).then(x=>x.put(r,c));return res}).catch(()=>caches.match(r).then(h=>h||caches.match('./index.html'))))});
