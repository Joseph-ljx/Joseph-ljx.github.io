(function () {
  "use strict";

  var HOME_PATHS = ["/", "/index.html"];

  function isHomeUrl(value) {
    try {
      var url = new URL(value, window.location.href);
      return url.origin === window.location.origin && HOME_PATHS.includes(url.pathname);
    } catch (error) {
      return false;
    }
  }

  function ensureHomeAssets() {
    if (!document.querySelector('link[href="/css/cv-home.css"]')) {
      var stylesheet = document.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href = "/css/cv-home.css";
      document.head.appendChild(stylesheet);
    }

    if (document.getElementById("cv-home-script")) {
      return;
    }

    var script = document.createElement("script");
    script.id = "cv-home-script";
    script.src = "/js/cv-home.js";
    script.onload = function () {
      if (isHomeUrl(window.location.href) && typeof window.runCVInjection === "function") {
        window.runCVInjection();
      }
    };
    document.body.appendChild(script);
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest("a[href]");
    if (link && isHomeUrl(link.href)) {
      ensureHomeAssets();
    }
  }, true);

  function bindSwup(swup) {
    if (!swup || !swup.hooks || swup.__cvHomeLoaderHooked) {
      return;
    }

    swup.__cvHomeLoaderHooked = true;
    swup.hooks.on("page:view", function () {
      if (isHomeUrl(window.location.href)) {
        ensureHomeAssets();
      }
    });
  }

  window.addEventListener("redefine:swup:ready", function (event) {
    bindSwup(event.detail && event.detail.swup);
  });
  bindSwup(window.swup);
})();
