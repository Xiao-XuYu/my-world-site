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
    "revision": "ab7b9537a342173f1868986f475036b0"
  }, {
    "url": "favicon.svg",
    "revision": "204f66905990453009b37a953bbc0762"
  }, {
    "url": "devbook.html",
    "revision": "fe0c4e451221f423db7d4dba38e89932"
  }, {
    "url": "icons/icon-maskable-512.png",
    "revision": "d1b3629bdfdc2541a76160b0d00e8ce8"
  }, {
    "url": "icons/icon-512.png",
    "revision": "b4d357029d18a4dfe792ce704049e252"
  }, {
    "url": "icons/icon-192.png",
    "revision": "c50e52412f5afca70d097a112a8c85ae"
  }, {
    "url": "assets/workbox-window.prod.es5-Bd17z0YL.js",
    "revision": null
  }, {
    "url": "assets/theme-E1y3u0Rn.css",
    "revision": null
  }, {
    "url": "assets/theme-CKMAaWVJ.js",
    "revision": null
  }, {
    "url": "assets/main-Du3JEmn4.js",
    "revision": null
  }, {
    "url": "assets/main-CjLztX1H.css",
    "revision": null
  }, {
    "url": "assets/devbook-DPcdzUeN.js",
    "revision": null
  }, {
    "url": "assets/devbook-D5v-zDzm.css",
    "revision": null
  }, {
    "url": "favicon.svg",
    "revision": "204f66905990453009b37a953bbc0762"
  }, {
    "url": "icons/icon-192.png",
    "revision": "c50e52412f5afca70d097a112a8c85ae"
  }, {
    "url": "icons/icon-512.png",
    "revision": "b4d357029d18a4dfe792ce704049e252"
  }, {
    "url": "icons/icon-maskable-512.png",
    "revision": "d1b3629bdfdc2541a76160b0d00e8ce8"
  }, {
    "url": "manifest.webmanifest",
    "revision": "34bb079c35eaa12cef0e786423d53458"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html"), {
    denylist: [/devbook\.html$/]
  }));

}));
