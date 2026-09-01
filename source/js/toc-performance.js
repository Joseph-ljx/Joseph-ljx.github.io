(function () {
  "use strict";

  function disableSlowHashAnimation(swup) {
    if (!swup || typeof swup.findPlugin !== "function") {
      return;
    }

    var scrollPlugin = swup.findPlugin("SwupScrollPlugin");
    var animateScroll = scrollPlugin && scrollPlugin.options
      ? scrollPlugin.options.animateScroll
      : null;

    // A TOC is direct navigation. The plugin's spring animation calls every
    // page scroll listener on every frame, including Redefine's layout-heavy
    // TOC tracker. Keep page-to-page animation, but make same-page hashes jump.
    if (animateScroll && typeof animateScroll === "object") {
      animateScroll.samePageWithHash = false;
    }
  }

  function tuneCurrentSwup() {
    disableSlowHashAnimation(window.swup);
  }

  window.addEventListener("redefine:swup:ready", function (event) {
    disableSlowHashAnimation(event.detail && event.detail.swup);
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", tuneCurrentSwup, { once: true });
  } else {
    tuneCurrentSwup();
  }
})();
