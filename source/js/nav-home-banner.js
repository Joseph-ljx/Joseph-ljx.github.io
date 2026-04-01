(function () {
  function tick() {
    if (!document.querySelector(".navbar-content.has-home-banner")) {
      document.body.classList.remove("past-home-banner");
      return;
    }
    document.body.classList.toggle(
      "past-home-banner",
      window.scrollY > window.innerHeight * 0.92
    );
  }

  function bindSwup(swup) {
    if (!swup || !swup.hooks || swup.__navHomeBannerHooked) {
      return;
    }
    swup.__navHomeBannerHooked = true;
    swup.hooks.on("page:view", tick);
  }

  tick();

  if (!window.__navHomeBannerListeners) {
    window.__navHomeBannerListeners = true;
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick, { passive: true });
    window.addEventListener("redefine:swup:ready", function (ev) {
      bindSwup(ev.detail && ev.detail.swup);
    });
  }

  bindSwup(window.swup);
})();
