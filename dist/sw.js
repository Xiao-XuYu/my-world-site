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
    "revision": "3792fe455d51912c0cb40f58db125fc3"
  }, {
    "url": "favicon.svg",
    "revision": "5eda7d5fe764f3391cbeaf08ef72a864"
  }, {
    "url": "devbook.html",
    "revision": "d4c216b7825a5e0538f6849f67a92ff0"
  }, {
    "url": "icons/icon-maskable-512.png",
    "revision": "783e0360971fe05ad2d1b2548494177c"
  }, {
    "url": "icons/icon-512.png",
    "revision": "8a0f7a29f81b7a5c3ab6cd64c5261f64"
  }, {
    "url": "icons/icon-192.png",
    "revision": "733def5793b1539a6d75886a02abb661"
  }, {
    "url": "assets/workbox-window.prod.es5-Bd17z0YL.js",
    "revision": null
  }, {
    "url": "assets/theme-E1y3u0Rn.css",
    "revision": null
  }, {
    "url": "assets/theme-CWQUwAGh.js",
    "revision": null
  }, {
    "url": "assets/main-Tex-A2BR.js",
    "revision": null
  }, {
    "url": "assets/main-DvABibHQ.css",
    "revision": null
  }, {
    "url": "assets/devbook-D5v-zDzm.css",
    "revision": null
  }, {
    "url": "assets/devbook-C8JsvyHi.js",
    "revision": null
  }, {
    "url": "favicon.svg",
    "revision": "5eda7d5fe764f3391cbeaf08ef72a864"
  }, {
    "url": "icons/icon-192.png",
    "revision": "733def5793b1539a6d75886a02abb661"
  }, {
    "url": "icons/icon-512.png",
    "revision": "8a0f7a29f81b7a5c3ab6cd64c5261f64"
  }, {
    "url": "icons/icon-maskable-512.png",
    "revision": "783e0360971fe05ad2d1b2548494177c"
  }, {
    "url": "manifest.webmanifest",
    "revision": "34bb079c35eaa12cef0e786423d53458"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html"), {
    denylist: [/devbook\.html$/]
  }));

}));
