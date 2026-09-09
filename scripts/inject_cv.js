// Hexo treats paginated indexes as `home`, while this experience belongs only
// to the primary landing page. Detect the landing page's unique banner in the
// completed HTML so `/page/2/` and all other pages stay free of these assets.
const HOME_STYLESHEET = '<link rel="stylesheet" href="/css/cv-home.css">';
const HOME_SCRIPT = '<script id="cv-home-script" defer src="/js/cv-home.js"></script>';
const HOME_LOADER = `
  <div id="loader-overlay">
    <div class="cube-loader-container">
      <div class="action-rays"></div>
      <div class="pop-burst">
        <div class="word"></div>
      </div>
      <div class="stage">
        <div class="cube">
          <div class="face f-1"><span class="panel-num">01</span><span class="panel-label">Start</span></div>
          <div class="face f-2"><span class="panel-num">02</span><span class="panel-label">Hello</span></div>
          <div class="face f-3"><span class="panel-num">03</span><span class="panel-label">Please</span></div>
          <div class="face f-4"><span class="panel-num">04</span><span class="panel-label">Wait</span></div>
          <div class="face f-5"><span class="panel-num">05</span><span class="panel-label">Boom</span></div>
          <div class="face f-6"><span class="panel-num">06</span><span class="panel-label">Loading</span></div>
        </div>
        <div class="shadow-floor"></div>
      </div>
    </div>
    <div class="loader">
      <div class="loading-text">
        Loading<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>
      </div>
    </div>
  </div>
`;

hexo.extend.filter.register("after_render:html", function injectHomeExperience(html) {
  if (
    !html.includes('class="home-banner-container') ||
    !html.includes("</head>") ||
    !html.includes("</body>")
  ) {
    return html;
  }

  return html
    .replace("</head>", `${HOME_STYLESHEET}</head>`)
    .replace(/(<body[^>]*>)/, `$1${HOME_LOADER}`)
    .replace("</body>", `${HOME_SCRIPT}</body>`);
});

// Keep a tiny cached bridge on other pages so Swup navigation back to Home can
// load the full Home assets before initializing the page experience.
hexo.extend.injector.register(
  "body_end",
  '<script defer src="/js/cv-home-loader.js"></script>',
);
