// Custom homepage assets. Keep the Hexo injector small; implementation lives
// under source/css and source/js so the browser can cache each concern separately.
hexo.extend.injector.register(
  "head_end",
  '<link rel="stylesheet" href="/css/cv-home.css">',
);

hexo.extend.injector.register(
  "body_begin",
  `
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
`,
);

hexo.extend.injector.register(
  "body_end",
  '<script defer src="/js/cv-home.js"></script>',
);
