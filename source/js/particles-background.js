(function () {
  var hostId = "particles-js";
  var activePalette = "white";
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
      particles: ["#e0f2fe", "#bae6fd", "#f8fafc"],
      lines: "#c7e7f7"
    },
    violet: {
      particles: ["#c4b5fd", "#93c5fd", "#f5f3ff"],
      lines: "#b7a8ec"
    },
    white: {
      particles: ["#0f172a", "#1e3a5f", "#075985"],
      lines: "#334e63"
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
    document.body.dataset.particlesPalette = activePalette;

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
    var lightSurface = activePalette === "white";

    window.particlesJS(hostId, {
      particles: {
        number: {
          value: compact ? 48 : 82,
          density: { enable: true, value_area: compact ? 640 : 900 }
        },
        color: { value: palette.particles },
        shape: {
          type: "circle",
          stroke: { width: 0, color: "#000000" },
          polygon: { nb_sides: 5 },
          image: { src: "", width: 100, height: 100 }
        },
        opacity: {
          value: lightSurface ? (compact ? 0.62 : 0.52) : (compact ? 0.54 : 0.5),
          random: true,
          anim: { enable: false, speed: 0.8, opacity_min: 0.12, sync: false }
        },
        size: {
          value: compact ? 2.35 : 2.7,
          random: true,
          anim: { enable: false, speed: 10, size_min: 0.2, sync: false }
        },
        line_linked: {
          enable: true,
          distance: compact ? 125 : 155,
          color: palette.lines,
          opacity: lightSurface ? (compact ? 0.32 : 0.24) : (compact ? 0.3 : 0.27),
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
