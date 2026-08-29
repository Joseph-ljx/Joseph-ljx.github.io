(function () {
  var hostId = "particles-js";
  var activePalette = "ice";
  var palettes = {
    default: {
      particles: ["#7dd3fc", "#c4b5fd", "#f8fafc"],
      lines: "#93c5fd"
    },
    champagne: {
      particles: ["#f4e4c1", "#d6b36a", "#fffaf0"],
      lines: "#e3c88b"
    },
    ice: {
      particles: ["#bae6fd", "#7dd3fc", "#f8fafc"],
      lines: "#a5d8f3"
    },
    violet: {
      particles: ["#c4b5fd", "#93c5fd", "#f5f3ff"],
      lines: "#b7a8ec"
    }
  };
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function ensureHost() {
    var host = document.getElementById(hostId);

    if (!host) {
      host = document.createElement("div");
      host.id = hostId;
      host.setAttribute("aria-hidden", "true");
      document.body.prepend(host);
    }

    host.dataset.particlesPalette = activePalette;

    return host;
  }

  function initParticles() {
    var host = ensureHost();

    if (
      host.dataset.particlesReady === "true" ||
      reducedMotion.matches ||
      typeof window.particlesJS !== "function"
    ) {
      return;
    }

    var compact = window.matchMedia("(max-width: 767px)").matches;
    var palette = palettes[activePalette] || palettes.default;

    window.particlesJS(hostId, {
      particles: {
        number: {
          value: compact ? 42 : 76,
          density: { enable: true, value_area: compact ? 760 : 920 }
        },
        color: { value: palette.particles },
        shape: {
          type: "circle",
          stroke: { width: 0, color: "#000000" },
          polygon: { nb_sides: 5 },
          image: { src: "", width: 100, height: 100 }
        },
        opacity: {
          value: 0.42,
          random: true,
          anim: { enable: false, speed: 0.8, opacity_min: 0.12, sync: false }
        },
        size: {
          value: compact ? 2.2 : 2.6,
          random: true,
          anim: { enable: false, speed: 10, size_min: 0.2, sync: false }
        },
        line_linked: {
          enable: true,
          distance: compact ? 125 : 155,
          color: palette.lines,
          opacity: 0.22,
          width: 1
        },
        move: {
          enable: true,
          speed: compact ? 0.75 : 1.05,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: { enable: true, rotateX: 1400, rotateY: 1800 }
        }
      },
      interactivity: {
        detect_on: "window",
        events: {
          onhover: { enable: !compact, mode: "grab" },
          onclick: { enable: !compact, mode: "push" },
          resize: true
        },
        modes: {
          grab: { distance: 180, line_linked: { opacity: 0.55 } },
          bubble: { distance: 240, size: 5, duration: 1.2, opacity: 0.65, speed: 2 },
          repulse: { distance: 130, duration: 0.4 },
          push: { particles_nb: 3 },
          remove: { particles_nb: 2 }
        }
      },
      retina_detect: true
    });

    host.dataset.particlesReady = "true";
  }

  function syncVisibility() {
    initParticles();
    document.body.classList.toggle(
      "particles-background-active",
      Boolean(document.querySelector("#swup .home-banner-background"))
    );
  }

  function bindSwup(swup) {
    if (!swup || !swup.hooks || swup.__particlesBackgroundHooked) {
      return;
    }

    swup.__particlesBackgroundHooked = true;
    swup.hooks.on("page:view", syncVisibility);
  }

  syncVisibility();

  if (!window.__particlesBackgroundListeners) {
    window.__particlesBackgroundListeners = true;
    window.addEventListener("redefine:swup:ready", function (event) {
      bindSwup(event.detail && event.detail.swup);
    });
  }

  bindSwup(window.swup);
})();
