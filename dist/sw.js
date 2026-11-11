/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-7e5eb42b'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "index.html",
    "revision": "193727565e61cfe55ee59c76cf9bb9a3"
  }, {
    "url": "favicon.svg",
    "revision": "e7a41959706887f7c8c7b542177153fd"
  }, {
    "url": "devbook.html",
    "revision": "c9b833ad6c7083ba45a20221593bbf1d"
  }, {
    "url": "icons/icon-maskable-512.png",
    "revision": "ec66d3ee2b9d1c5b6d457d799724cc5c"
  }, {
    "url": "icons/icon-512.png",
    "revision": "5d73ffd20fe3fb180b4a25c73179e7d0"
  }, {
    "url": "icons/icon-192.png",
    "revision": "79bd25b36bc7d9986b6db6b34171c6ea"
  }, {
    "url": "assets/workbox-window.prod.es5-Bd17z0YL.js",
    "revision": null
  }, {
    "url": "assets/theme-E1y3u0Rn.css",
    "revision": null
  }, {
    "url": "assets/theme-C1cDkxEg.js",
    "revision": null
  }, {
    "url": "assets/main-CxpjepOA.css",
    "revision": null
  }, {
    "url": "assets/main-C9XmKU6A.js",
    "revision": null
  }, {
    "url": "assets/devbook-DrqxMYHG.js",
    "revision": null
  }, {
    "url": "assets/devbook-D5v-zDzm.css",
    "revision": null
  }, {
    "url": "favicon.svg",
    "revision": "e7a41959706887f7c8c7b542177153fd"
  }, {
    "url": "icons/icon-192.png",
    "revision": "79bd25b36bc7d9986b6db6b34171c6ea"
  }, {
    "url": "icons/icon-512.png",
    "revision": "5d73ffd20fe3fb180b4a25c73179e7d0"
  }, {
    "url": "icons/icon-maskable-512.png",
    "revision": "ec66d3ee2b9d1c5b6d457d799724cc5c"
  }, {
    "url": "manifest.webmanifest",
    "revision": "34bb079c35eaa12cef0e786423d53458"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html"), {
    denylist: [/devbook\.html$/]
  }));

}));
