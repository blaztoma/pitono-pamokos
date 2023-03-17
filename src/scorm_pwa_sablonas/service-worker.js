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

var precacheConfig = [["adlcp_rootv1p2.xsd","d574ff030bbb0217dfab6a9c0e7a7795"],["images/lena.png","814a0034f5549e957ee61360d87457e5"],["images/teapot.png","88c004b1a9465fc603214b90ec106b97"],["images/test.png","bd65ef97980297182befcd34a631e0ba"],["ims_xml.xsd","4f550f4771e8b40270c49947d1b19142"],["imscp_rootv1p1p2.xsd","ee6cf8dbdd91e8fdbb6b1aade679a315"],["imslrm.xml","888b6bca7ff5d595f90352f3782571f3"],["imsmanifest.xml","74cc28781ee969d7e951fd7fbb048a60"],["imsmd_rootv1p2p1.xsd","5930c9d69201ba90900e759e2f8324bc"],["index.html","03fad770c9efd363c76400a7ae0d8887"],["javascript/FileSaver.min.js","2b3d66a7b7d778a5a3d8ed701f38b5a0"],["javascript/SCOFunctions.js","1a7c892fc336e9e5b78a70d60e9c6a57"],["javascript/SCORM_API_wrapper.js","8b91f9d3f08b25fb70e8736cbf02cab4"],["javascript/codemirror.js","6d9e7c944acc814b895cdcfbbbe35e9a"],["javascript/jquery.min.js","a1a8cb16a060f6280a767187fd22e037"],["javascript/lz-string.js","e58a36ae86d81b870ff4e7778eb9f1c7"],["javascript/matchbrackets.js","2d2902edcfd32a8f481124c0957889ff"],["javascript/processing.min.js","47849f9d5b17ad2a1a1720dc6b0afe59"],["javascript/python.js","6102b7662bc513c5103b46bf7e97dda0"],["javascript/pythonide.js","21c8024633d70171c2b4e2afc47f4e67"],["javascript/pythoninteractive.js","f469468e0c1bdd15a027ec3d4ac37eda"],["javascript/skulpt-stdlib.js","44a467d0f1693832d790925a4c22bbc1"],["javascript/skulpt.es5.min.js","c25f064833f6b60ebc1bbf4acea3243a"],["javascript/skulpt.min.js","4314f903531752df74c4cf76a56d7342"],["manifest.json","c1a34825217441fc6b10ed90d0898a98"],["maskable_192.png","7e724261ec546769fc53d4d29f700447"],["pages/images/body-bg.png","356724184a3b6fddbed93c37a430480d"],["pages/images/highlight-bg.jpg","4603f244bdc991af6019b9029869e236"],["pages/images/hr.png","6002921db578c7428a8ba3ef08e3189a"],["pages/images/octocat-icon.png","10bfcce9d5fb9ab83200d4939f2922ad"],["pages/images/tar-gz-icon.png","6258b0deb9811f0e64bc6f691a10e13c"],["pages/images/zip-icon.png","5cbbfc1edadf9e11893b3f91b3c49f44"],["pages/javascripts/main.js","3b6364c7d05cda10475ceda51d9ed9c6"],["pages/stylesheets/github-dark.css","156c4eddf581f2e98a88e43935b22e8d"],["pages/stylesheets/print.css","0603f48d90795449e94f6faf9a73b610"],["pages/stylesheets/stylesheet.css","da08d7d0f8e53a0033d90b49f239a49b"],["python_192.png","b5b823e14ed2d05916f119baf6dfdf75"],["python_512.png","469fc6dad063760aaf987cee80705d68"],["style/codemirror.css","ce804ae97aeaad9428a30a79b5990e94"],["style/dracula.css","41905bdb70daf702a6089a4b094e3e21"],["style/interactive.css","0858ad723a181468686dd2ce9520ea61"],["style/skulptide.css","82272eb07dfd3f152c0e235807ba7b2f"],["style/solarized.css","4862ce6db08fb8f263a2b6b5d4a71f64"],["task/task.xml","e7093bf7203ef5bc55055c56814ea633"],["task/tests.xml","38d2ca99247da63ff3c09bbb03430ce4"]];
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







