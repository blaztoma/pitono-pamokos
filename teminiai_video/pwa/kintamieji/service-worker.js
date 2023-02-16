/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["data/apple-touch-icon.png","e56f25831315af606a4beab1e74b64eb"],["data/browsersupport.js","d755522f966f7f613ba31cdf4904691d"],["data/favicon.ico","0bba7aa68d2c7d87fffb22d9f3fd39b9"],["data/fnt0.woff","62b528cb7b5d38c22ab14355c5ef8c95"],["data/fnt1.woff","03b4c2e9adcdf65d5c79de5127a21977"],["data/fnt2.woff","d6ec328c1b166d3916a75f893d3912c4"],["data/fnt3.woff","4182ffe8c0522cec0a8f9492e23ec2cf"],["data/fnt4.woff","45ebda4b7b421397759d4671accb8f5f"],["data/fnt5.woff","7394d80bbe7fa02b3e7e26b7682a85cd"],["data/html5-unsupported.html","9b1f38f1f66f00e398c375fe7970952a"],["data/html5.png","fd55494d616882b055f19d0af9bbd599"],["data/img1.png","8b30436e0b78d735c64fe0235342c3d1"],["data/img10.png","abcd16b313642ee32a3047b4103c7896"],["data/img11.png","e12a111d3c58521a3b0c93b556faf8c3"],["data/img12.png","cccd9586ead203402750e15f1ba761ef"],["data/img13.png","6a76e7b9f19dc91fd4b759501227d00e"],["data/img14.png","d13f047bdf9b041debd29ac244336619"],["data/img16.png","c719ec4a827cc0b8363f40ff8948d013"],["data/img17.png","4ff5b7cdc9a1305707de6fd2abac87ae"],["data/img18.png","d013c01be0d3293759d20c92b455ae42"],["data/img19.png","374b1621b56d87214b237d10965ff770"],["data/img2.png","1136e4c44ae756e74446a85a098a449e"],["data/img20.png","0628a4695a7951c60ab7fd3d141912a5"],["data/img22.png","2968a148c8f9603dc746a74dbaeebb49"],["data/img23.png","3e582173e6de1afbbe7d4993a35296dd"],["data/img24.png","02f7692f3acc6e310101a4e6e44f254e"],["data/img25.png","112011855ddd90d0a2489a02551fd271"],["data/img26.png","14a1ae6ef380cc02bb2eb7dfd0795e9a"],["data/img28.png","86cb171b9a42b61348e2af82b91f4739"],["data/img29.png","11f1772318015baedd6ac9205a38dec8"],["data/img3.png","610716f9d42d0f38a97a35b5a4e46f24"],["data/img30.png","7447c470b45129ad00cb47adf9044709"],["data/img31.png","ac00877e008c3861fd2e3af5f82ba80c"],["data/img32.png","110abb346f3cc71a4068d2727e0aea5b"],["data/img33.png","a75418bc8d9b568e60ecca33aecdbc1d"],["data/img4.png","b322549089a98372a9c4edfed025b7be"],["data/img5.png","d8ac353199efc5d625cefabdef4be008"],["data/img6.png","80fd9cf21dbb04f4dded856ae3e901e6"],["data/img7.png","4513543aa7ca8958ffe43bc273c33d98"],["data/img8.png","d80ee478283df3902a186f332df3523a"],["data/player.js","13e59e7666207e723d77101df088882c"],["data/slide1.css","6c33d20d7d87a89af46ef440114a9bb1"],["data/slide1.js","9e6ee0c022a03b3ffd89c5209a0cbdcb"],["data/slide10.css","b4b806046a109543ef38105e0ff21e33"],["data/slide10.js","2b978ca22ea9aad005451918b6620c1e"],["data/slide11.css","f150c5055a2ae5590884f287ede92303"],["data/slide11.js","ea293b171943be23ef075d9eed0ae75b"],["data/slide12.css","8f35d86295df9069e97900c93b6fc7f8"],["data/slide12.js","0f5aabb945c7d788defd8f5c083452bd"],["data/slide13.css","e77e329b0be154901b18ef427b42d339"],["data/slide13.js","144753ab12c4fb48f6b5ba2b6f5d4bde"],["data/slide14.css","e1ab1c16523885599d6926948e714ec8"],["data/slide14.js","289ec4f4b83c22a8185fac9ddaac03ee"],["data/slide15.css","05cd9d9828a2792b2615bd2fe2b33a86"],["data/slide15.js","9f51ede13c6daa1b0bb7648f1d3ac19a"],["data/slide16.css","c00edbb62a2a34ced44817fae8f20c3c"],["data/slide16.js","37743803f57d3b79425b170cc84e74c1"],["data/slide2.css","12000d0927f33d9c552486204078915a"],["data/slide2.js","85f3a114d14354630d3e0812bc8c7c2d"],["data/slide3.css","4f08793408ba41328cebbf22d81c6bdd"],["data/slide3.js","a6afc3edd5e53c7ce682a55d7a393d59"],["data/slide4.css","ba5fc518c8b63880e5b8afdfd883bc0c"],["data/slide4.js","cb59e82042790158d60ca47f559a11ef"],["data/slide5.css","ac7e32a74d4d67925bfa5445111e428b"],["data/slide5.js","3c19f7cbbc28a3c612dfc17ee2642a1c"],["data/slide6.css","b309be4e370624f43e0eb1f916c8b402"],["data/slide6.js","660c71f0358b81bbed6c4d5bfd5e9434"],["data/slide7.css","466461d0196b1b8390320ec86ce02dd3"],["data/slide7.js","65c02d1ad8a93374b2e0215921c17850"],["data/slide8.css","efcc018694222768761e6dd7db4f5273"],["data/slide8.js","48d2809afe39fbccda67c12cfe5227e3"],["data/slide9.css","ca96354d685b8b97fc81c972149444fe"],["data/slide9.js","6c7e526e3fc573033f2c2a1c02149a11"],["data/video1.mp4","08121223754aaa557c168c6d7d62a5e2"],["data/video2.mp4","d515712c2b73041f05f74974e2ad17e0"],["data/video3.mp4","9cb6e3773b5c96d80694aeedabe8326c"],["data/video4.mp4","9358a2e909da178d14867b2b1ccd1595"],["data/video5.mp4","030c582b38273dafad1a5e884d2bd19c"],["index.html","943cabe9228173021519cc6839626939"],["manifest.json","120f08ac7bc96874c79cc33dd8157221"],["myscripts.js","ba9bc69b098f4f2fdf27e9afe79d1481"],["package.json","d945889212acc83fd4c2496c3d7616ad"],["swimmer.png","e12c46798b612b458d5ef9dc331d1472"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







