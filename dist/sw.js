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
    "revision": "1d6f89d46153e7425d75bdd001254190"
  }, {
    "url": "favicon.svg",
    "revision": "b68f4a4a1fdddffc5e24d04d005539cb"
  }, {
    "url": "devbook.html",
    "revision": "56c08ca200d89cd49f739773e875344f"
  }, {
    "url": "icons/icon-maskable-512.png",
    "revision": "9405ca40cf283a7b6c0fae0f73e5191e"
  }, {
    "url": "icons/icon-512.png",
    "revision": "832dd4fad3e1179db11bf5797adac073"
  }, {
    "url": "icons/icon-192.png",
    "revision": "c3102c406fb6b178d18c8bdb86fbd37d"
  }, {
    "url": "assets/workbox-window.prod.es5-Bd17z0YL.js",
    "revision": null
  }, {
    "url": "assets/theme-DB9Ze2FH.css",
    "revision": null
  }, {
    "url": "assets/theme-Bnc6zkVM.js",
    "revision": null
  }, {
    "url": "assets/main-Da5PtcLW.js",
    "revision": null
  }, {
    "url": "assets/main-D7huCsuz.css",
    "revision": null
  }, {
    "url": "assets/devbook-D9kHILtw.js",
    "revision": null
  }, {
    "url": "assets/devbook-CpTZH8t7.css",
    "revision": null
  }, {
    "url": "favicon.svg",
    "revision": "b68f4a4a1fdddffc5e24d04d005539cb"
  }, {
    "url": "icons/icon-192.png",
    "revision": "c3102c406fb6b178d18c8bdb86fbd37d"
  }, {
    "url": "icons/icon-512.png",
    "revision": "832dd4fad3e1179db11bf5797adac073"
  }, {
    "url": "icons/icon-maskable-512.png",
    "revision": "9405ca40cf283a7b6c0fae0f73e5191e"
  }, {
    "url": "manifest.webmanifest",
    "revision": "bb44755301714758b0edaa4492559a9c"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html"), {
    denylist: [/devbook\.html$/]
  }));

}));
