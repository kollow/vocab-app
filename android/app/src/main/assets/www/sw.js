/**
 * Service Worker - 离线缓存
 * 缓存策略：Cache First
 * 注意：file:// 协议下 Service Worker 不生效，但通过浏览器访问时可正常工作
 */
var CACHE_NAME = 'vocab-app-v2.0.0';

var CACHE_FILES = [
  './',
  './index.html',
  './css/style.css',
  './js/app.js',
  './js/vocab.js',
  './js/storage.js',
  './js/study.js',
  './js/review.js',
  './js/tts.js',
  './js/wordlist.js',
  './js/importer.js',
  './manifest.json',
  './icons/icon-192.svg',
  './icons/icon-512.svg'
];

// 安装事件：缓存所有文件
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('[SW] Caching app files');
      return cache.addAll(CACHE_FILES);
    }).then(function() {
      // 跳过等待，立即激活
      return self.skipWaiting();
    })
  );
});

// 激活事件：清理旧缓存
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache: ' + cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(function() {
      // 接管所有客户端
      return self.clients.claim();
    })
  );
});

// 请求拦截：Cache First 策略
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        // 缓存命中，返回缓存
        return response;
      }
      // 缓存未命中，发起网络请求
      return fetch(event.request).then(function(networkResponse) {
        // 只缓存成功响应
        if (networkResponse && networkResponse.status === 200) {
          var responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      }).catch(function() {
        // 网络也失败，返回离线页面或提示
        return new Response('离线状态，无法加载此资源', {
          status: 503,
          statusText: 'Service Unavailable'
        });
      });
    })
  );
});
