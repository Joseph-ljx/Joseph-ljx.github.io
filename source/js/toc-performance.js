(function () {
  "use strict";

  var activeAnimationFrame = 0;
  var activeAnimationToken = 0;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function disableSlowHashAnimation(swup) {
    if (!swup || typeof swup.findPlugin !== "function") {
      return;
    }

    var scrollPlugin = swup.findPlugin("SwupScrollPlugin");
    var animateScroll = scrollPlugin && scrollPlugin.options
      ? scrollPlugin.options.animateScroll
      : null;

    // Keep page-to-page animation, but replace the plugin's long spring for
    // same-page hashes with the short, interruptible animation below.
    if (animateScroll && typeof animateScroll === "object") {
      animateScroll.samePageWithHash = false;
    }
  }

  function easeOutQuint(progress) {
    return 1 - Math.pow(1 - progress, 5);
  }

  function cancelActiveScroll() {
    activeAnimationToken += 1;
    if (activeAnimationFrame) {
      cancelAnimationFrame(activeAnimationFrame);
      activeAnimationFrame = 0;
    }
    document.documentElement.classList.remove("toc-scroll-active");
  }

  function getScrollDuration(distance) {
    // Nearby headings feel immediate; long jumps remain deliberately brief.
    return Math.round(Math.min(340, Math.max(240, 220 + distance * 0.04)));
  }

  function scrollToTarget(target) {
    cancelActiveScroll();

    var startY = window.scrollY || window.pageYOffset;
    var targetY = Math.max(
      0,
      target.getBoundingClientRect().top + startY - 80
    );
    var distance = Math.abs(targetY - startY);

    if (reducedMotion.matches || distance < 2) {
      window.scrollTo(0, targetY);
      return;
    }

    var token = activeAnimationToken;
    var duration = getScrollDuration(distance);
    var startedAt = performance.now();
    document.documentElement.classList.add("toc-scroll-active");

    function step(now) {
      if (token !== activeAnimationToken) {
        return;
      }

      var progress = Math.min(1, (now - startedAt) / duration);
      var nextY = startY + (targetY - startY) * easeOutQuint(progress);
      window.scrollTo(0, nextY);

      if (progress < 1) {
        activeAnimationFrame = requestAnimationFrame(step);
      } else {
        activeAnimationFrame = 0;
        document.documentElement.classList.remove("toc-scroll-active");
      }
    }

    activeAnimationFrame = requestAnimationFrame(step);
  }

  function handleTocClick(event) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    var link = event.target.closest(".post-toc a.nav-link");
    if (!link) {
      return;
    }

    var href = link.getAttribute("href");
    if (!href || href.charAt(0) !== "#") {
      return;
    }

    var target;
    try {
      target = document.getElementById(decodeURIComponent(href.slice(1)));
    } catch (error) {
      return;
    }

    if (!target) {
      return;
    }

    event.preventDefault();
    event.stopImmediatePropagation();

    if (location.hash !== href) {
      history.pushState(null, "", href);
    }
    scrollToTarget(target);
  }

  function tuneCurrentSwup() {
    disableSlowHashAnimation(window.swup);
  }

  window.addEventListener("redefine:swup:ready", function (event) {
    disableSlowHashAnimation(event.detail && event.detail.swup);
  });

  // Capture the click before Swup's delegated spring-scroll handler.
  document.addEventListener("click", handleTocClick, true);
  window.addEventListener("wheel", cancelActiveScroll, { passive: true });
  window.addEventListener("touchstart", cancelActiveScroll, { passive: true });
  window.addEventListener("keydown", function (event) {
    if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) {
      cancelActiveScroll();
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", tuneCurrentSwup, { once: true });
  } else {
    tuneCurrentSwup();
  }
})();
