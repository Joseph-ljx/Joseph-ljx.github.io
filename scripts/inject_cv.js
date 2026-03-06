// scripts/inject_cv.js

hexo.extend.injector.register('head_end', `
  <script src="https://cdnjs.cloudflare.com/ajax/libs/tween.js/18.6.4/tween.umd.js"></script>
  <script async src="https://unpkg.com/es-module-shims@1.6.3/dist/es-module-shims.js"></script>
    <script type="importmap">
      {
        "imports": {
          "three": "https://unpkg.com/three@0.154.0/build/three.module.js",
          "three/addons/": "https://unpkg.com/three@0.154.0/examples/jsm/"
        }
      }
    </script>

  <style>
    /* 3D Earth Container */
    #scene-container {
        position: relative;
        width: 100%; 
        height: 100vh;  
        z-index: 1; 
        opacity: 0;
        transition: opacity 1.5s ease;
        margin-top: 50px;
        pointer-events: none;  
    }
    body.starry-night {
        background-color: #050505 !important;
        transition: background-color 2s ease;
    }
    /* Ensure parent containers don't hide the dark background if they are white */
    body.starry-night .main-content-container,
    body.starry-night .page-container,
    body.starry-night #app {
        background: transparent !important;
        transition: background 0.5s ease;
    }
    
    /* 全屏遮罩层 */
    #loader-overlay {
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background-color: #ffffff; 
        z-index: 99999999;  
        transition: opacity 0.5s ease-out, visibility 0.5s ease-out;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    /* === 新的 3D Cube Loader 样式 === */
    /* 重命名 .container 为 .cube-loader-container 防止冲突 */
    .cube-loader-container {
      --bg: #ff4500;
      --ink: #000000;
      --paper: #ffffff;
      --accent-1: #00d2ff;
      --accent-2: #ff00ff;
      --accent-3: #ffef00;
      --size: 110px;
      --half: 55px;
      --smooth-snap: cubic-bezier(0.85, 0, 0.15, 1);
      margin: 0;
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      perspective: 1500px;
      transform: scale(1.25);
    }
    .action-rays {
      position: absolute;
      width: 300vmax;
      height: 300vmax;
      z-index: -1;
    }
    .cube-loader-container::after {
      content: "";
      position: absolute;
      inset: 0;
      background-image: radial-gradient(var(--ink) 1px, transparent 1px);
      background-size: 15px 15px;
      opacity: 0.1;
      pointer-events: none;
    }
    .stage {
      position: relative;
      width: var(--size);
      height: var(--size);
      transform-style: preserve-3d;
      animation: stageJump 3s var(--smooth-snap) infinite;
    }
    @keyframes stageJump {
      0%, 100% { transform: scale(1) rotateX(-20deg) rotateY(0deg); }
      50% { transform: scale(1.3) rotateX(160deg) rotateY(180deg); }
    }
    .cube {
      position: absolute;
      inset: 0;
      transform-style: preserve-3d;
      animation: autoRotate 6s linear infinite;
    }
    @keyframes autoRotate {
      to { transform: rotateY(360deg) rotateZ(360deg); }
    }
    .face {
      position: absolute;
      width: 100%;
      height: 100%;
      background: var(--paper);
      border: 5px solid var(--ink);
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      backface-visibility: visible;
      overflow: hidden;
      box-shadow: 12px 12px 0 var(--ink);
    }
    .f-1 { transform: rotateY(0deg) translateZ(var(--half)); background: var(--accent-1); }
    .f-2 { transform: rotateY(180deg) translateZ(var(--half)); background: var(--accent-2); }
    .f-3 { transform: rotateY(90deg) translateZ(var(--half)); background: var(--accent-3); }
    .f-4 { transform: rotateY(-90deg) translateZ(var(--half)); background: var(--paper); }
    .f-5 { transform: rotateX(90deg) translateZ(var(--half)); background: #ff5252; }
    .f-6 { transform: rotateX(-90deg) translateZ(var(--half)); background: #00e676; }
    .face::before {
      content: "";
      position: absolute;
      width: 150%;
      height: 20px;
      background: var(--ink);
      transform: rotate(-45deg) translateY(-40px);
      opacity: 0.2;
    }
    .panel-num {
      font-family: "Arial Black", sans-serif;
      font-size: 40px;
      color: var(--ink);
      line-height: 1;
      margin: 0;
      transform: skew(-10deg);
      z-index: 2;
    }
    .panel-label {
      font-family: "Arial Black", sans-serif;
      font-size: 12px;
      background: var(--ink);
      color: #fff;
      padding: 2px 8px;
      margin-top: 5px;
      text-transform: uppercase;
      z-index: 2;
    }
    .pop-burst {
      position: absolute;
      width: 100%;
      height: 100%;
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
    }
    .word {
      position: absolute;
      font-family: "Arial Black", sans-serif;
      font-size: 60px;
      color: var(--paper);
      -webkit-text-stroke: 3px var(--ink);
      text-shadow: 8px 8px 0 var(--accent-2);
      opacity: 0;
      animation: comicFlash 3s var(--smooth-snap) infinite;
    }
    @keyframes comicFlash {
      0%, 48%, 52%, 100% { opacity: 0; transform: scale(0.5) rotate(-20deg); }
      50% { opacity: 1; transform: scale(1.4) rotate(5deg); }
    }
    .shadow-floor {
      position: absolute;
      bottom: -100px;
      width: 150px;
      height: 40px;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 50%;
      filter: blur(10px);
      animation: shadowPulse 3s var(--smooth-snap) infinite;
    }
    @keyframes shadowPulse {
      0%, 100% { transform: scale(1); opacity: 0.5; }
      50% { transform: scale(0.4); opacity: 0.1; }
    }

    /* gsperandio */ 
    .cubes {
      position: absolute;
      top: 50%;
      left: 50%;
      transform-style: preserve-3d;
    }
    .loop {
      transform: rotateX(-35deg) rotateY(-45deg) translateZ(1.5625em);
    }
    @keyframes s {
      to {
        transform: scale3d(0.2, 0.2, 0.2);
      }
    }
    .item {
      margin: -1.5625em;
      width: 3.125em;
      height: 3.125em;
      transform-origin: 50% 50% -1.5625em;
      box-shadow: 0 0 0.125em currentColor;
      background: currentColor;
      animation: s 0.6s cubic-bezier(0.45, 0.03, 0.51, 0.95) infinite alternate;
    }
    .item:before,
    .item:after {
      position: absolute;
      width: inherit;
      height: inherit;
      transform-origin: 0 100%;
      box-shadow: inherit;
      background: currentColor;
      content: "";
    }
    .item:before {
      bottom: 100%;
      transform: rotateX(90deg);
    }
    .item:after {
      left: 100%;
      transform: rotateY(90deg);
    }
    .item:nth-child(1) {
      margin-top: 6.25em;
      color: #fe1e52;
      animation-delay: -1.2s;
    }
    .item:nth-child(1):before {
      color: #ff6488;
    }
    .item:nth-child(1):after {
      color: #ff416d;
    }
    .item:nth-child(2) {
      margin-top: 3.125em;
      color: #fe4252;
      animation-delay: -1s;
    }
    .item:nth-child(2):before {
      color: #ff8892;
    }
    .item:nth-child(2):after {
      color: #ff6572;
    }
    .item:nth-child(3) {
      margin-top: 0em;
      color: #fe6553;
      animation-delay: -0.8s;
    }
    .item:nth-child(3):before {
      color: #ffa499;
    }
    .item:nth-child(3):after {
      color: #ff8476;
    }
    .item:nth-child(4) {
      margin-top: -3.125em;
      color: #fe8953;
      animation-delay: -0.6s;
    }
    .item:nth-child(4):before {
      color: #ffb999;
    }
    .item:nth-child(4):after {
      color: #ffa176;
    }
    .item:nth-child(5) {
      margin-top: -6.25em;
      color: #feac54;
      animation-delay: -0.4s;
    }
    .item:nth-child(5):before {
      color: #ffce9a;
    }
    .item:nth-child(5):after {
      color: #ffbd77;
    }
    .item:nth-child(6) {
      margin-top: -9.375em;
      color: #fed054;
      animation-delay: -0.2s;
    }
    .item:nth-child(6):before {
      color: #ffe49a;
    }
    .item:nth-child(6):after {
      color: #ffda77;
    }


    /* --- 新增 Loading 文字样式 --- */
    .loader {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 5px;      
      position: absolute;
      top: 80%; 
      left: 50%;
      transform: translateX(-50%);
      z-index: 10;
    }
    .loading-text {
      color: #000;
      font-size: 24pt;
      font-weight: 800;
      margin-left: 10px;
      font-family: "Arial Black", sans-serif;
      letter-spacing: 1px;
    }
    .dot {
      margin-left: 3px;
      color: inherit;
      animation: blink 1.5s infinite;
      display: inline-block;
    }
    .dot:nth-child(2) { animation-delay: 0.3s; }
    .dot:nth-child(3) { animation-delay: 0.6s; }
    @keyframes blink {
      0%, 100% { opacity: 0; }
      50% { opacity: 1; }
    }


    .home-article-list, .sidebar-content .statistics { display: none !important; }
    .pagination,
    .page-number,
    .paginator { 
        display: none !important; 
    }
    .author .label {
        display: none !important;
    }


    /* === 头像特殊处理 === */
    .sidebar-content .avatar {
        width: 118px !important;
        height: 118px !important;
        min-width: 118px !important;  
        min-height: 118px !important;  
        margin: 20px auto 10px auto !important;  
        border-radius: 50% !important;
        background: none !important;
        opacity: 1 !important;
        visibility: visible !important;
        display: flex !important;  
        justify-content: center;
        align-items: center;
        flex: 0 0 auto !important;  
    }
    .sidebar-content .avatar img {
        display: block !important;
        width: 100% !important;
        height: 100% !important;
        border-radius: 50% !important;
        border: 4px solid #fff;  
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        object-fit: cover !important;  
        opacity: 1 !important;
        visibility: visible !important;
        max-width: none !important;
    }


    .sidebar-wrapper{
      position: relative;
      border-radius: 20px;
      padding: 3px;
      overflow: visible;
      width: 300px !important; 
      max-width: 100% !important;
    }    
    @media (min-width: 1024px) {
        .home-sidebar-container {
            width: 330px !important;
            min-width: 330px !important;            
            flex-basis: 320px !important;
            flex-grow: 0 !important;
            flex-shrink: 0 !important;
            max-width: none !important;
        }
        .home-sidebar-container .sticky-container {
            width: 100% !important;
        }
        .sticky-container {
            width: 100% !important;
        }
        .sidebar-content {
             width: 100% !important;
             padding: 15px 6px !important;
        }
        .sidebar-wrapper {
            width: 100% !important;
            max-width: 100% !important;
        }
    }
    @media (min-width: 1600px) {
        .home-sidebar-container {
            width: 340px !important;
            min-width: 340px !important;
            flex-basis: 340px !important;
        }
    }
    .sidebar-wrapper::before{
      content:"";
      position:absolute;
      inset:0;
      border-radius: 20px;
      background: linear-gradient(163deg, #FFC107 0%, #FF5722 60%, #D50000 100%);
      opacity: 0;                  
      transition: opacity .25s ease;
      z-index: 0;
    }
    .sidebar-wrapper:hover::before{
      opacity: 1;
      box-shadow: 0 0 30px 1px rgba(0,255,117,.30);
    }
    .sidebar-content {
        width: 100% !important;
        height: 100% !important;
        position: relative !important; 
        z-index: 1 !important;        
        background: rgba(255,255,255,0.65) !important;
        backdrop-filter: blur(12px) !important; 
        -webkit-backdrop-filter: blur(12px) !important;
        border-radius: 18px !important; 
        transition: transform 0.2s ease, border-radius 0.2s ease !important;
        overflow: visible !important;
    }
    .sidebar-content:hover {
      transform: scale(0.98) !important;
      border-radius: 18px !important;
    }
    .sidebar-content::after { display: none !important; }
    

    /* =========================================================================
       6. 通用玻璃卡片样式 (全局可用 - Uiverse Card) 
       ========================================================================= */
    .cv-glass-wrap {
      position: relative; width: 100%; margin: 45px 0 45px;
      display: flex; justify-content: center; align-items: center; z-index: 0;
      min-height: 360px; padding: 28px 20px; background: transparent;
    }
    /* 大圆背景 */
    .cv-glass-wrap::after {
      content: " "; position: absolute; height: 120px; width: 120px; left: 50%; top: 18px;
      transform: translateX(-140%); background-image: linear-gradient(orange, magenta);
      border-radius: 50%; z-index: -1; border: 2px solid #ffffffa6;
      box-shadow: inset 10px 0px 20px #fff; animation: cvGlassAni 10s ease-in-out infinite;
    }
    /* 小圆背景 */
    .cv-glass-wrap::before {
      content: " "; position: absolute; height: 56px; width: 56px; left: 50%; bottom: 10px;
      transform: translateX(-110%); background-image: linear-gradient(90deg, orange, magenta);
      border-radius: 50%; z-index: -1; border: 2px solid #ffffffa6;
      box-shadow: inset 10px 0px 20px #fff;
    }
    /* 卡片主体 */
    .cv-glass-card {
      width: 100%; padding: 10px 10px; height: auto;
      border: 1px solid #ffffff56; border-radius: 18px; backdrop-filter: blur(10.5px);
      position: relative; box-shadow: inset 2px 1px 6px #ffffff45; overflow: hidden; z-index: 0;
    }
    /* 光泽条 */
    .cv-glass-card::after {
      z-index: -1; content: " "; position: absolute; width: 150%; top: 0; left: 0; height: 10px;
      background: #ffffff; transform: rotateZ(50deg); filter: blur(30px);
      animation: cvGlassShine 8s ease infinite;
    }
    /* 标题样式 */
    .cv-glass-title {
      font-family: inherit !important;
      color: transparent; -webkit-background-clip: text;
      background-image: linear-gradient(90deg, rgb(0, 0, 0), rgb(116, 111, 111));
      font-weight: 900; 
      font-size: 33px; 
      line-height: 1.15; 
      margin: 8px 0 16px; 
      letter-spacing: -0.3px;
    }
    /* 描述样式 */
    .cv-glass-desc {
      font-family: inherit !important; margin: 0; padding: 0; color: #3a3939; font-size: 17px; line-height: 1.75; width: 100%; max-width: none;
    }
    /* 动画定义 (防止冲突，已改名) */
    @keyframes cvGlassAni {
      0% { transform: translateX(0%) scale(1); }
      50% { transform: translateX(-100%) scale(0.85); }
      100% { transform: translateX(0%) scale(1); }
    }
    @keyframes cvGlassShine {
      0% { top: 100%; left: -100%; }
      50%, 100% { top: 0%; left: 70%; }
    }
    @media (max-width: 520px) {
      .cv-glass-wrap { min-height: 320px; margin: 36px 0 44px; padding: 18px 12px; }
      .cv-glass-wrap::after { height: 100px; width: 100px; top: 10px; transform: translateX(-130%); }
      .cv-glass-wrap::before { height: 48px; width: 48px; bottom: 8px; transform: translateX(-105%); }
      .cv-glass-card { padding: 22px 20px 20px; border-radius: 16px; }
      .cv-glass-title { font-size: 28px; margin: 6px 0 12px; }
      .cv-glass-desc { font-size: 15px; line-height: 1.7; }
    }

    /* === 首页 Banner 样式 === */
    .home-banner { 
        margin-top: 0 !important; 
        padding-top: 0 !important;
        background-size: contain !important; 
        background-repeat: no-repeat !important; 
        background-position: center center !important; 
        background-color: #252525 !important; 
        min-height: 100vh !important; 
    }
    .home-banner .banner-title, .home-banner h1 { font-size: 5rem !important; font-weight: 800 !important; }
    .home-banner .subtitle, .home-banner .banner-subtitle, .home-banner .typed-cursor { font-size: 2rem !important; line-height: 1.5 !important; font-weight: 600 !important; }
    @media (max-width: 768px) {
      .home-banner .banner-title, .home-banner h1 { font-size: 3.5rem !important; }
      .home-banner .subtitle, .home-banner .banner-subtitle { font-size: 1.5rem !important; }
    }
    
    /* === Bio 样式 === */
    .cv-sidebar-bio { padding: 0 10px 20px; text-align: center; font-size: 14px; line-height: 1.6; color: #555; animation: fadeIn 0.5s ease; }
    .cv-skill-divider {
        height: 1px;
        width: 80%;            
        background-color: #7e7d7d;  
        margin: 12px auto;      
        border: none;
    }
    .cv-sidebar-tags { 
        display: flex !important; 
        flex-wrap: wrap !important; 
        justify-content: center !important; 
        gap: 6px !important; 
    }
    .cv-sidebar-tag { 
        display: inline-flex !important;       
        align-items: center !important;
        gap: 6px !important; 
        border-radius: 50px !important;      
        border: 1px solid #e5e5e5 !important;
        background-color: #f5f5f5 !important;
        color: #404040 !important;
        padding: 5px 10px !important;          
        font-size: 12px !important;  
        line-height: 1 !important;
        cursor: default !important;
        text-decoration: none !important;
        transition: all 0.2s ease !important;
        margin: 0 !important;
    }
    .cv-sidebar-tag:hover {
        border-color: #3b82f6 !important; 
        color: #2563eb !important;       
        background-color: white !important;
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(0,0,0,0.08) !important;
    }
    .cv-sidebar-tag i { color: inherit !important; margin: 0 !important; }
    .cv-contact-btn { display: inline-block; margin-top: 20px; padding: 8px 20px; background: #3b82f6; color: white !important; border-radius: 20px; font-weight: bold; text-decoration: none; font-size: 13px; transition: background 0.3s; }
    .cv-contact-btn:hover { background: #2563eb; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }


    /* === 简历卡片样式 === */
    .cv-home-sections { max-width: 900px; margin: 0 auto; padding: 0 10px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }    
    .cv-section-title { 
        font-size: 35px; 
        font-weight: 800; 
        margin: 40px 0 25px; 
        display: flex; 
        align-items: center; 
        gap: 12px; 
        padding-bottom: 15px;
        
        /* 修改为白色，并增加阴影 */
        color: #ffffff !important; 
        text-shadow: 0 4px 10px rgba(0,0,0,0.3);
        /* 下划线改为半透明白 */
        border-bottom: 2px solid rgba(255,255,255,0.3); 
    }
    .cv-edu-section .cv-section-title {
        margin-top: 0 !important;
    }
    .cv-grid { display: flex; flex-direction: column; gap: 20px; }
    .cv-card { display: flex; align-items: flex-start; gap: 20px; text-decoration: none !important; color: inherit; background: rgba(255,255,255,0.65); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(0,0,0,0.06); border-radius: 16px; padding: 24px; transition: all 0.3s ease; position: relative; z-index: 10; }
    .cv-card:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,0.08); background: rgba(255,255,255,0.85); }
    .cv-logo-box { width: 60px; height: 60px; flex-shrink: 0; border-radius: 12px; background: #fff; display: flex; align-items: center; justify-content: center; overflow: hidden; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 4px 10px rgba(0,0,0,0.03); }
    .cv-logo-box img { width: 100% !important; height: 100% !important; object-fit: cover !important; padding: 0 !important; }
    .cv-logo-box i { font-size: 30px; opacity: 0.7; }
    .cv-content-box { flex: 1; min-width: 0; }
    .cv-card-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 4px; }
    .cv-card-subheader { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
    .cv-role { font-size: 19px; font-weight: 700; color: #111; line-height: 1.2; }
    .cv-org { font-size: 17.5px; font-weight: 500; color: #444; }
    .cv-time { font-size: 16px; opacity: 0.5; font-family: monospace; white-space: nowrap; margin-left: 10px; }
    .cv-gpa { font-size: 16px; font-weight: 600; opacity: 0.8; font-family: monospace; color: #444; background: rgba(0,0,0,0.04); padding: 2px 6px; border-radius: 4px; }
    .cv-desc { font-size: 15.5px; opacity: 0.75; line-height: 1.6; margin-top: 5px; }

    .job-header h2 {
        border-bottom: none !important;
        margin-bottom: 8px !important;
        margin-top: 10px !important;
        padding-bottom: 0 !important;
        color: #111 !important;
    }
    .job-header .job-meta {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        color: #666;
        font-size: 15px;
        border-bottom: 1px solid #eee;
        padding-bottom: 20px;
        margin-bottom: 30px;
        display: flex;
        align-items: center;
        gap: 15px;
    }
    .job-header .job-meta i {
        color: #888;
        margin-right: 5px;
    }
    .job-header .job-meta .separator {
        color: #ddd;
    }
    @media (max-width: 600px) { .cv-card { padding: 18px; gap: 15px; } .cv-logo-box { width: 48px; height: 48px; } .cv-card-header, .cv-card-subheader { flex-direction: column; align-items: flex-start; gap: 2px; } .cv-time, .cv-gpa { margin-left: 0; font-size: 12px; margin-top: 2px; } }
    
    /* === 首页底部 Preloader 动画 === */
    .center-preloader-box {
        width: 550px;
        height: 550px;
        flex-shrink: 0;  
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
    .preloader {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      filter: drop-shadow(0 0 2px #fff);
    }
    .crack {
      position: absolute;
      width: 10%;
      aspect-ratio: 1;
      background-color: #fef3fc;
      clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
      animation: rotate 6s infinite;
    }
    .crack2 { width: 12%; animation-delay: 1s; }
    .crack3 { width: 14%; animation-delay: 1.5s; }
    .crack4 { width: 16%; animation-delay: 2s; }
    .crack5 { width: 18%; animation-delay: 2.5s; }
    @keyframes rotate { to { rotate: 360deg; } }


    /* Modified for Sidebar */ 
    .contact-card {
      padding: 0;               
      border: none;             
      background: transparent;  
      backdrop-filter: none;    
      box-shadow: none;        
      
      width: 100%;             
      margin-top: 20px;        
      overflow: visible;
    }
    .contact-wrap {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      position: relative;
      z-index: 10;
      border: 0.5px solid #525252;
      border-radius: 8px;
      overflow: hidden;
    }
    .contact-terminal {
      display: flex;
      flex-direction: column;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    }
    .contact-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      overflow: hidden;
      min-height: 32px; 
      padding-inline: 12px;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      background-color: #202425;
    }
    .contact-title {
      display: flex;
      align-items: center;
      gap: 8px;
      height: 2.5rem;
      user-select: none;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #8e8e8e;
      font-size: 12px;  
      margin: 0;
    }
    .contact-title > svg {
      height: 16px;
      width: 16px;
      margin-top: 2px;
      color: #006adc;
    }
    .copy_toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.25rem;
      border: 0.65px solid #c1c2c5;
      margin-left: auto;
      border-radius: 6px;
      background-color: #202425;
      color: #8e8e8e;
      cursor: pointer;
      transition: all 0.2s;
    }
    .copy_toggle:hover {
        background-color: #444;
        color: #fff;
    }
    .copy_toggle > svg {
      width: 16px;
      height: 16px;
    }
    .copy_toggle:active > svg > path,
    .copy_toggle:focus-within > svg > path {
      animation: clipboard-check 500ms linear forwards;
    }
    .contact-body {
      display: flex;
      flex-direction: column;
      position: relative;
      border-bottom-right-radius: 8px;
      border-bottom-left-radius: 8px;
      overflow-x: auto;  
      padding: 10px;
      line-height: 19px;
      color: white;
      background-color: black;
      white-space: nowrap;
    }
    .contact-pre {
      display: flex;
      flex-direction: row;
      align-items: center;
      text-wrap: nowrap;
      white-space: pre;
      background-color: transparent;
      overflow: hidden;
      box-sizing: border-box;
      font-size: 13px; 
      margin: 0;
    }
    .contact-pre code:nth-child(1) {
      color: #575757;
    }
    .contact-pre code:nth-child(2) {
      color: #e34ba9;
    }
    .contact-cmd {
      height: 19px;
      position: relative;
      display: flex;
      align-items: center;
      flex-direction: row;
      color: #e0e0e0 !important;
    }
    .contact-cmd::before {
      content: attr(data-cmd);
      position: relative;
      display: block;
      white-space: nowrap;
      overflow: hidden;
      background-color: transparent;
      animation: inputs 8s steps(22) infinite;
    }
    .contact-cmd::after {
      content: "";
      position: relative;
      display: block;
      height: 100%;
      overflow: hidden;
      background-color: transparent;
      border-right: 0.15em solid #e34ba9;
      animation: cursor 0.5s step-end infinite alternate, blinking 0.5s infinite;
    }
    @keyframes blinking {
      20%, 80% { transform: scaleY(1); }
      50% { transform: scaleY(0); }
    }
    @keyframes cursor {
      50% { border-right-color: transparent; }
    }
    @keyframes inputs {
      0%, 100% { width: 0; }
      10%, 90% { width: 58px; }
      30%, 70% { width: 100%; max-width: max-content; }
    }
    @keyframes clipboard-check {
      100% {
        color: #fff;
        d: path("M 9 5 H 7 a 2 2 0 0 0 -2 2 v 12 a 2 2 0 0 0 2 2 h 10 a 2 2 0 0 0 2 -2 V 7 a 2 2 0 0 0 -2 -2 h -2 M 9 5 a 2 2 0 0 0 2 2 h 2 a 2 2 0 0 0 2 -2 M 9 5 a 2 2 0 0 1 2 -2 h 2 a 2 2 0 0 1 2 2 m -6 9 l 2 2 l 4 -4");
      }
    }

    .wheel-and-hamster {
      --dur: 1s;
      position: relative;
      width: 12em;
      height: 12em;
      font-size: 15px;    
      
      margin-left: auto;   
      margin-right: 12px;  
      flex-shrink: 0;
    }
    .wheel,
    .hamster,
    .hamster div,
    .spoke {
      position: absolute;
    }
    .wheel,
    .spoke {
      border-radius: 50%;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .wheel {
      background: radial-gradient(100% 100% at center,hsla(0,0%,60%,0) 47.8%,hsl(0,0%,60%) 48%);
      z-index: 2;
    }
    .hamster {
      animation: hamster var(--dur) ease-in-out infinite;
      top: 50%;
      left: calc(50% - 3.5em);
      width: 7em;
      height: 3.75em;
      transform: rotate(4deg) translate(-0.8em,1.85em);
      transform-origin: 50% 0;
      z-index: 1;
    }
    .hamster__head {
      animation: hamsterHead var(--dur) ease-in-out infinite;
      background: hsl(30,90%,55%);
      border-radius: 70% 30% 0 100% / 40% 25% 25% 60%;
      box-shadow: 0 -0.25em 0 hsl(30,90%,80%) inset,
            0.75em -1.55em 0 hsl(30,90%,90%) inset;
      top: 0;
      left: -2em;
      width: 2.75em;
      height: 2.5em;
      transform-origin: 100% 50%;
    }
    .hamster__ear {
      animation: hamsterEar var(--dur) ease-in-out infinite;
      background: hsl(0,90%,85%);
      border-radius: 50%;
      box-shadow: -0.25em 0 hsl(30,90%,55%) inset;
      top: -0.25em;
      right: -0.25em;
      width: 0.75em;
      height: 0.75em;
      transform-origin: 50% 75%;
    }
    .hamster__eye {
      animation: hamsterEye var(--dur) linear infinite;
      background-color: hsl(0,0%,0%);
      border-radius: 50%;
      top: 0.375em;
      left: 1.25em;
      width: 0.5em;
      height: 0.5em;
    }
    .hamster__nose {
      background: hsl(0,90%,75%);
      border-radius: 35% 65% 85% 15% / 70% 50% 50% 30%;
      top: 0.75em;
      left: 0;
      width: 0.2em;
      height: 0.25em;
    }
    .hamster__body {
      animation: hamsterBody var(--dur) ease-in-out infinite;
      background: hsl(30,90%,90%);
      border-radius: 50% 30% 50% 30% / 15% 60% 40% 40%;
      box-shadow: 0.1em 0.75em 0 hsl(30,90%,55%) inset,
            0.15em -0.5em 0 hsl(30,90%,80%) inset;
      top: 0.25em;
      left: 2em;
      width: 4.5em;
      height: 3em;
      transform-origin: 17% 50%;
      transform-style: preserve-3d;
    }
    .hamster__limb--fr,
    .hamster__limb--fl {
      clip-path: polygon(0 0,100% 0,70% 80%,60% 100%,0% 100%,40% 80%);
      top: 2em;
      left: 0.5em;
      width: 1em;
      height: 1.5em;
      transform-origin: 50% 0;
    }
    .hamster__limb--fr {
      animation: hamsterFRLimb var(--dur) linear infinite;
      background: linear-gradient(hsl(30,90%,80%) 80%,hsl(0,90%,75%) 80%);
      transform: rotate(15deg) translateZ(-1px);
    }
    .hamster__limb--fl {
      animation: hamsterFLLimb var(--dur) linear infinite;
      background: linear-gradient(hsl(30,90%,90%) 80%,hsl(0,90%,85%) 80%);
      transform: rotate(15deg);
    }
    .hamster__limb--br,
    .hamster__limb--bl {
      border-radius: 0.75em 0.75em 0 0;
      clip-path: polygon(0 0,100% 0,100% 30%,70% 90%,70% 100%,30% 100%,40% 90%,0% 30%);
      top: 1em;
      left: 2.8em;
      width: 1.5em;
      height: 2.5em;
      transform-origin: 50% 30%;
    }
    .hamster__limb--br {
      animation: hamsterBRLimb var(--dur) linear infinite;
      background: linear-gradient(hsl(30,90%,80%) 90%,hsl(0,90%,75%) 90%);
      transform: rotate(-25deg) translateZ(-1px);
    }
    .hamster__limb--bl {
      animation: hamsterBLLimb var(--dur) linear infinite;
      background: linear-gradient(hsl(30,90%,90%) 90%,hsl(0,90%,85%) 90%);
      transform: rotate(-25deg);
    }
    .hamster__tail {
      animation: hamsterTail var(--dur) linear infinite;
      background: hsl(0,90%,85%);
      border-radius: 0.25em 50% 50% 0.25em;
      box-shadow: 0 -0.2em 0 hsl(0,90%,75%) inset;
      top: 1.5em;
      right: -0.5em;
      width: 1em;
      height: 0.5em;
      transform: rotate(30deg) translateZ(-1px);
      transform-origin: 0.25em 0.25em;
    }
    .spoke {
      animation: spoke var(--dur) linear infinite;
      background: radial-gradient(100% 100% at center,hsl(0,0%,60%) 4.8%,hsla(0,0%,60%,0) 5%),
            linear-gradient(hsla(0,0%,55%,0) 46.9%,hsl(0,0%,65%) 47% 52.9%,hsla(0,0%,65%,0) 53%) 50% 50% / 99% 99% no-repeat;
    }
    @keyframes hamster { from, to { transform: rotate(4deg) translate(-0.8em,1.85em); } 50% { transform: rotate(0) translate(-0.8em,1.85em); } }
    @keyframes hamsterHead { from, 25%, 50%, 75%, to { transform: rotate(0); } 12.5%, 37.5%, 62.5%, 87.5% { transform: rotate(8deg); } }
    @keyframes hamsterEye { from, 90%, to { transform: scaleY(1); } 95% { transform: scaleY(0); } }
    @keyframes hamsterEar { from, 25%, 50%, 75%, to { transform: rotate(0); } 12.5%, 37.5%, 62.5%, 87.5% { transform: rotate(12deg); } }
    @keyframes hamsterBody { from, 25%, 50%, 75%, to { transform: rotate(0); } 12.5%, 37.5%, 62.5%, 87.5% { transform: rotate(-2deg); } }
    @keyframes hamsterFRLimb { from, 25%, 50%, 75%, to { transform: rotate(50deg) translateZ(-1px); } 12.5%, 37.5%, 62.5%, 87.5% { transform: rotate(-30deg) translateZ(-1px); } }
    @keyframes hamsterFLLimb { from, 25%, 50%, 75%, to { transform: rotate(-30deg); } 12.5%, 37.5%, 62.5%, 87.5% { transform: rotate(50deg); } }
    @keyframes hamsterBRLimb { from, 25%, 50%, 75%, to { transform: rotate(-60deg) translateZ(-1px); } 12.5%, 37.5%, 62.5%, 87.5% { transform: rotate(20deg) translateZ(-1px); } }
    @keyframes hamsterBLLimb { from, 25%, 50%, 75%, to { transform: rotate(20deg); } 12.5%, 37.5%, 62.5%, 87.5% { transform: rotate(-60deg); } }
    @keyframes hamsterTail { from, 25%, 50%, 75%, to { transform: rotate(30deg) translateZ(-1px); } 12.5%, 37.5%, 62.5%, 87.5% { transform: rotate(10deg) translateZ(-1px); } }
    @keyframes spoke { from { transform: rotate(0); } to { transform: rotate(-1turn); } }

    /* === 书签页 (Bookmarks) 样式修正 (修复版) === */
    @media (min-width: 768px) {
        .md\:w-48 {
            width: 250px !important; 
            flex-basis: 300px !important;
            min-width: 300px !important; 
        }        
        .bookmark-nav-item {
            white-space: normal !important;   
            height: auto !important;        
            overflow: visible !important;    
            text-overflow: clip !important;  
            line-height: 1.5 !important;    
            padding-top: 10px !important;     
            padding-bottom: 10px !important;
        }
    }
    a[data-category="separator"] {
        height: 1px !important;
        padding: 0 !important;
        margin: 15px 10px !important;  
        background-color: #e5e7eb !important;          
        font-size: 0 !important;
        color: transparent !important;        
        pointer-events: none !important;
        cursor: default !important;
        border: none !important;
    }
    @media (prefers-color-scheme: dark) {
        a[data-category="separator"] {
            background-color: #374151 !important; 
        }
    }
    #separator {
        display: none !important;
    }


    /* === 地球控制按钮组 === */
    .earth-controls {
        position: absolute;
        top: 50%;
        right: 0%;  
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        gap: 20px;  
        z-index: 100; 
        pointer-events: auto !important;  
        opacity: 0;
        animation: fadeInRight 1s ease 1s forwards;  
    }
    /* === Uiverse Tooltip Button 样式 (适配版) === */
    .tooltip-container {
      --background: #333333;
      --color: #404040;
      
      position: relative;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
      font-size: 16px; 
      font-weight: 600;
      color: var(--color);

      padding: 0.7em 1.8em;
      border-radius: 50px;  
      text-transform: uppercase;
      height: 50px;  
      width: 170px;  
      display: grid;
      place-items: center;

      background: #f5f5f5 !important;
      border: 1px solid #e5e5e5;
      backdrop-filter: blur(4px);
      box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    }
    .text {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: grid;
      place-items: center;
      transform-origin: -100%;
      transform: scale(1);
      transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    }
    .tooltip-container span:last-child {
      position: absolute;
      top: 0%;
      left: 100%;
      width: 100%;
      height: 100%;
      border-radius: 50px;  
      opacity: 1;

      background-color: var(--background);
      color: #ffffff; 

      z-index: -1;
      border: 2px solid var(--color);
      transform: scale(0);
      transform-origin: 0;
      transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
      display: grid;
      place-items: center;
      font-size: 20px;  
    }
    /* 上方弹出的 Tooltip */
    .tooltip {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      padding: 0.3em 0.6em;
      opacity: 0;
      pointer-events: none;
      transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
      
      background: var(--background);
      color: rgba(255,255,255,0.65) !important;
      
      z-index: -1;
      border-radius: 8px;
      scale: 0;
      transform-origin: 0 0;
      text-transform: capitalize;
      font-weight: 700;
      font-size: 14px;
      box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
      white-space: nowrap;
    }
    .tooltip::before {
      position: absolute;
      content: "";
      height: 0.6em;
      width: 0.6em;
      bottom: -0.2em;
      left: 50%;
      transform: translate(-50%) rotate(45deg);
      background: var(--color);
    }
    .tooltip-container:hover .tooltip {
      top: -120%; 
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
      scale: 1;
      animation: shake 0.5s ease-in-out both;
    }
    .tooltip-container:hover {
      box-shadow: 0 0 20px rgba(0, 242, 255, 0.4);
      border-color: transparent;
    }
    .tooltip-container:hover span:last-child {
      transform: scale(1);
      left: 0;
    }
    .tooltip-container:hover .text {
      opacity: 0;
      top: 0%;
      left: 100%;
      transform: scale(0);
    }
    @keyframes shake {
      0% { rotate: 0; }
      25% { rotate: 7deg; }
      50% { rotate: -7deg; }
      75% { rotate: 1deg; }
      100% { rotate: 0; }
    }
    @keyframes fadeInRight {
        from { opacity: 0; transform: translate(30px, -50%); }
        to { opacity: 1; transform: translate(0, -50%); }
    }
    @media (max-width: 768px) {
        .earth-controls {
            top: auto;
            bottom: 30px;
            right: 0;
            left: 0;
            transform: none;
            flex-direction: row;
            justify-content: center;
            flex-wrap: wrap;
            padding: 0 10px;
        }
        .tooltip-container {
            width: 140px;  
            height: 45px;
            font-size: 14px;
        }
    }

    /* gustavo_9243 */ 
    .wrapper-404 {
      --bg-dark: #fefefe;
      --cam-body: #222;
      --accent: #ff4757;
      --paper: #ffffff;
      font-family: "Segoe UI", system-ui, sans-serif;
      position: relative;
      width: 100%;
      min-height: 100vh;
      background: var(--bg-dark);
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      isolation: isolate;
      cursor: crosshair;
    }
    .wrapper-404 *,
    .wrapper-404 *::before,
    .wrapper-404 *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    .flash-overlay {
      position: absolute;
      inset: 0;
      background: #ffffff;
      opacity: 0;
      pointer-events: none;
      z-index: 100;
    }
    .wrapper-404:hover .flash-overlay {
      animation: flash-burst 0.2s ease-out forwards;
    }
    .scene {
      position: relative;
      width: 100%;
      min-height: 820px;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding-top: 50px;
    }
    .camera {
      position: relative;
      z-index: 50;
      width: 400px;
      height: 260px;
      transform-style: preserve-3d;
      animation: camera-hover 6s ease-in-out infinite;
    }
    .camera-body {
      width: 100%;
      height: 100%;
      background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
      border-radius: 35px;
      box-shadow:
        0 30px 60px rgba(0, 0, 0, 0.7),
        inset 0 1px 2px rgba(255, 255, 255, 0.15);
      position: relative;
      overflow: hidden;
    }
    .texture-overlay {
      position: absolute;
      inset: 0;
      opacity: 0.12;
      background-image: radial-gradient(#ffffff 1px, transparent 0);
      background-size: 4px 4px;
      mix-blend-mode: overlay;
      pointer-events: none;
    }
    .stripe {
      position: absolute;
      top: 45%;
      left: 0;
      width: 100%;
      height: 20px;
      background: linear-gradient(90deg, #ff5e57, #ffdd59, #0be881, #4bcffa);
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
    }
    .lens {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 160px;
      height: 160px;
      background: radial-gradient(circle at 30% 30%, #444444, #000000);
      border-radius: 50%;
      border: 7px solid #333333;
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.6);
      overflow: hidden;
    }
    .glass-reflex {
      position: absolute;
      top: 20%;
      right: 20%;
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.18);
      border-radius: 50%;
      filter: blur(3px);
    }
    .led-indicator {
      position: absolute;
      top: 30px;
      left: 40px;
      width: 16px;
      height: 16px;
      background: #ff4757;
      border-radius: 50%;
      box-shadow: 0 0 12px #ff4757;
      transition: opacity 0.3s;
      opacity: 0.6;
    }
    .wrapper-404:hover .led-indicator {
      opacity: 1;
      box-shadow: 0 0 20px #ff4757;
    }
    .flash-bulb {
      position: absolute;
      top: 30px;
      right: 40px;
      width: 60px;
      height: 40px;
      background: #eeeeee;
      border-radius: 8px;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }
    .polaroid-group {
      position: absolute;
      top: 50px;
      left: 50%;
      transform: translateX(-50%) translateY(0);
      z-index: 10;
      transition: transform 0.8s cubic-bezier(0.2, 1, 0.4, 1);
    }
    .wrapper-404:hover .polaroid-group {
      transform: translateX(-50%) translateY(280px);
      transition-delay: 0.2s;
    }
    .polaroid {
      width: 340px;
      background: #ffffff;
      padding: 18px 18px 0 18px;
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
      border-radius: 8px;
      text-align: center;
      overflow: hidden;
    }
    .photo-container {
      position: relative;
      width: 100%;
      height: 280px;
      background: #000000;
      overflow: hidden;
    }
    .travolta-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: grayscale(100%) brightness(0.1) blur(4px);
      transition: filter 0.5s ease;
    }
    .wrapper-404:hover .travolta-img {
      filter: grayscale(0%) brightness(1) blur(0px);
      transition: filter 2.5s ease-in-out 0.8s;
    }
    .chemical-layer {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.15), transparent);
      mix-blend-mode: overlay;
    }
    .bottom-label {
      height: 140px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 15px;
    }
    .error-text {
      font-family: "Courier New", Courier, monospace;
      font-weight: 800;
      font-size: 20px;
      color: #1a1a1a;
      letter-spacing: -0.5px;
    }
    @keyframes flash-burst {
      0% {
        opacity: 0;
      }
      15% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
    @keyframes camera-hover {
      0%,
      100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-12px);
      }
    }
    .comic-brutal-button {
      --primary-color: #ff3d3d;
      --secondary-color: #3d3dff;
      --text-color: #000000;
      --accent-color: #ffef00;
      --panel-color: #ffffff;
      --shadow-color: rgba(0, 0, 0, 0.75);

      position: relative;
      font-size: 15px; /* Adjusted size to fit layout */
      border: none;
      background: none;
      cursor: pointer;
      padding: 0;
      transform: rotate(-2deg);
      transform-origin: center;
      transition: transform 0.15s cubic-bezier(0.22, 0.61, 0.36, 1), opacity 0.5s ease;
  
      /* Initial state: hidden */
      opacity: 0;
      text-decoration: none; /* In case it's an <a> tag */
      display: inline-block;
    }
    /* Fade in animation logic */
    .wrapper-404:hover .comic-brutal-button {
      opacity: 1;
      transition: opacity 0.8s ease 1s, transform 0.15s cubic-bezier(0.22, 0.61, 0.36, 1);
    }
    .button-inner {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--primary-color);
      color: var(--text-color);
      padding: 0.8em 1.5em;
      z-index: 3;
      overflow: hidden;
      transform: skew(-3deg, 1deg);
      transition: transform 0.15s cubic-bezier(0.22, 0.61, 0.36, 1);
      clip-path: polygon(
        0% 10%,
        3% 0%,
        97% 0%,
        100% 10%,
        100% 90%,
        97% 100%,
        3% 100%,
        0% 90%
      );
    }

    .button-text {
      position: relative;
      font-weight: 900;
      font-size: 1.2em;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      z-index: 5;
      color: var(--text-color);
      text-shadow:
        0.05em 0.05em 0 var(--panel-color),
        -0.05em -0.05em 0 var(--panel-color),
        0.05em -0.05em 0 var(--panel-color),
        -0.05em 0.05em 0 var(--panel-color);
      transform: rotate(2deg);
    }
    .button-frame {
      position: absolute;
      top: -0.3em;
      left: -0.3em;
      right: -0.3em;
      bottom: -0.3em;
      background-color: var(--accent-color);
      border: 0.15em solid var(--text-color);
      z-index: 1;
      transition: transform 0.15s cubic-bezier(0.22, 0.61, 0.36, 1);
    }
    .button-shadow {
      position: absolute;
      top: 0.4em;
      left: 0.4em;
      right: -0.4em;
      bottom: -0.4em;
      background-color: var(--shadow-color);
      z-index: 0;
      transition: all 0.15s cubic-bezier(0.22, 0.61, 0.36, 1);
    }
    /* Halftone effect using CSS */
    .halftone-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: radial-gradient(
        circle at 30% 30%,
        rgba(0, 0, 0, 0.2) 0.1em,
        transparent 0.1em
      );
      background-size: 0.5em 0.5em;
      background-position: 0 0;
      opacity: 0.3;
      z-index: 2;
      mix-blend-mode: multiply;
    }
    /* Ink splatter effect using CSS gradients */
    .ink-splatter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      opacity: 0;
      transition: opacity 0.2s ease;
      background: radial-gradient(
          circle at 20% 30%,
          rgba(0, 0, 0, 0.15) 0%,
          rgba(0, 0, 0, 0.08) 20%,
          transparent 50%
        ),
        radial-gradient(
          circle at 70% 65%,
          rgba(0, 0, 0, 0.15) 0%,
          rgba(0, 0, 0, 0.08) 25%,
          transparent 50%
        ),
        radial-gradient(
          circle at 40% 50%,
          rgba(0, 0, 0, 0.15) 0%,
          rgba(0, 0, 0, 0.08) 30%,
          transparent 60%
        ),
        radial-gradient(
          circle at 85% 15%,
          rgba(0, 0, 0, 0.15) 0%,
          rgba(0, 0, 0, 0.08) 15%,
          transparent 40%
        );
    }
    /* Button hover state */
    .comic-brutal-button:hover {
      transform: rotate(-1deg) scale(1.05);
    }
    .comic-brutal-button:hover .button-inner {
      transform: skew(-5deg, 2deg);
      background-color: var(--secondary-color);
    }
    .comic-brutal-button:hover .button-text {
      color: var(--panel-color);
      text-shadow:
        0.05em 0.05em 0 var(--text-color),
        -0.05em -0.05em 0 var(--text-color),
        0.05em -0.05em 0 var(--text-color),
        -0.05em 0.05em 0 var(--text-color);
    }
    .comic-brutal-button:hover .button-shadow {
      transform: translate(0.2em, 0.2em);
    }
    .comic-brutal-button:hover .ink-splatter {
      opacity: 1;
    }
    /* Button focus state */
    .comic-brutal-button:focus {
      outline: none;
    }
    .comic-brutal-button:focus .button-frame {
      border-color: var(--secondary-color);
    }
    /* Button active state */
    .comic-brutal-button:active {
      transform: rotate(0) scale(0.98);
    }
    .comic-brutal-button:active .button-inner {
      transform: skew(0, 0);
    }
    .comic-brutal-button:active .button-shadow {
      transform: translate(0.1em, 0.1em);
    }
    /* Comic burst animation */
    @keyframes burst {
      0% { transform: scale(0.95); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    .comic-brutal-button:active .button-text {
      animation: burst 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    /* Add comic-style border on focus */
    @keyframes dash {
      to { stroke-dashoffset: -20; }
    }
    .comic-brutal-button:focus::after {
      content: "";
      position: absolute;
      top: -0.5em;
      left: -0.5em;
      right: -0.5em;
      bottom: -0.5em;
      border: 0.15em dashed var(--text-color);
      z-index: 0;
      animation: dash 1s linear infinite;
      pointer-events: none;
    }
    /* Additional brutalist comic book elements */
    .comic-brutal-button::before {
      content: "";
      position: absolute;
      top: 0.4em;
      left: 0.8em;
      width: 1em;
      height: 1em;
      background-color: var(--accent-color);
      border-radius: 50%;
      z-index: 2;
      opacity: 0;
      transition: opacity 0.2s ease;
    }
    .comic-brutal-button:hover::before {
      opacity: 0.7;
    }
    /* Action lines on click */
    @keyframes action-lines {
      0% {
        opacity: 0;
        transform: scale(0.7);
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0;
        transform: scale(1.2);
      }
    }
    .comic-brutal-button:active::before {
      content: "";
      position: absolute;
      top: -1em;
      left: -1em;
      right: -1em;
      bottom: -1em;
      background-image: radial-gradient(var(--text-color) 0%, transparent 70%),
        repeating-conic-gradient(
          transparent 0%,
          transparent 5%,
          var(--text-color) 5%,
          var(--text-color) 6%
        );
      opacity: 0;
      z-index: 6;
      mix-blend-mode: overlay;
      pointer-events: none;
      animation: action-lines 0.5s ease-out forwards;
    }

  </style>
`);

hexo.extend.injector.register('body_begin', `
  <div id="loader-overlay">
    <div class="cube-loader-container">
      <div class="action-rays"></div>
      <div class="pop-burst">
        <div class="word"></div>
      </div>
      <div class="stage">
        <div class="cube">
          <div class="face f-1">
            <span class="panel-num">01</span>
            <span class="panel-label">Start</span>
          </div>
          <div class="face f-2">
            <span class="panel-num">02</span>
            <span class="panel-label">Hello</span>
          </div>
          <div class="face f-3">
            <span class="panel-num">03</span>
            <span class="panel-label">Please</span>
          </div>
          <div class="face f-4">
            <span class="panel-num">04</span>
            <span class="panel-label">Wait</span>
          </div>
          <div class="face f-5">
            <span class="panel-num">05</span>
            <span class="panel-label">Boom</span>
          </div>
          <div class="face f-6">
            <span class="panel-num">06</span>
            <span class="panel-label">Loading</span>
          </div>
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
`);

hexo.extend.injector.register('body_end', `
  <script>
    // === 🎵 全局点击播放功能 ===
    function initGlobalClickToPlay() {
        var clickToPlayHandler = function() {
            var playBtn = document.querySelector('.aplayer-button.aplayer-play');
            if (playBtn) {
                console.log("🎵 检测到全屏点击：触发音乐播放");
                playBtn.click();  
            } else {
                var meting = document.querySelector('meting-js');
                if (meting && meting.aplayer && meting.aplayer.audio.paused) {
                    meting.aplayer.play();
                }
            }
            document.removeEventListener('click', clickToPlayHandler);
        };
        document.addEventListener('click', clickToPlayHandler);
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGlobalClickToPlay);
    } else {
        initGlobalClickToPlay();
    }
    document.addEventListener("pjax:complete", function() {
        initGlobalClickToPlay();
    });

    // 定义隐藏 Loader 的函数
    function hideLoader() {
        var loader = document.getElementById('loader-overlay');
        if (loader) {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            setTimeout(function() {
                loader.remove();  
            }, 500);
        }
    }
    setTimeout(hideLoader, 4000);

    // 2. Pjax 兼容
    document.addEventListener("pjax:send", function() {
      document.body.classList.remove('starry-night');
        /*
        if (!document.getElementById('loader-overlay')) {
            var loaderHTML = '<div id="loader-overlay" style="opacity:1; visibility:visible;">...同上...</div>';
            document.body.insertAdjacentHTML('afterbegin', loaderHTML);
        }
        */
    });

    document.addEventListener("pjax:complete", function() {
        runCVInjection();
    });

    function manageHomeLayout() {
       var isHome = (window.location.pathname === '/' || window.location.pathname === '/index.html');
       var styleId = 'cv-home-layout-fix';
       var existingStyle = document.getElementById(styleId);

       if (isHome) {
           if (!existingStyle) {
               var style = document.createElement('style');
               style.id = styleId;
               style.innerHTML = \`
                  html, body { margin-top: 0 !important; padding-top: 0 !important; }
                  .main-content-container, .page-container, #app { padding-top: 0 !important; margin-top: 0 !important; }
               \`;
               document.head.appendChild(style);
           }
       } else {
           if (existingStyle) {
               existingStyle.remove();
           }
       }
    }

    // 定义注入逻辑
    function runCVInjection() {
      manageHomeLayout();

      if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
          document.body.classList.remove('starry-night');  
          return;
      }
      
      // === 侧边栏改造  ===
      var sideCard = document.querySelector('.sidebar-content');
      
      if (sideCard) {
          if (!sideCard.parentElement.classList.contains('sidebar-wrapper')) {
              var wrapperDiv = document.createElement('div');
              wrapperDiv.className = 'sidebar-wrapper';

              sideCard.parentNode.insertBefore(wrapperDiv, sideCard);
              wrapperDiv.appendChild(sideCard);
          }
          var avatarContainer = sideCard.querySelector('.avatar');
          
          if (avatarContainer) {
              var img = avatarContainer.querySelector('img');
              var currentSrc = img ? img.getAttribute('src') : '';
              
              if (!img || !currentSrc.includes('avatar.png')) {
                  console.log("正在重写头像 HTML...");
                  avatarContainer.innerHTML = '<img src="/images/avatar.png?v=' + new Date().getTime() + '" style="opacity: 1 !important; display: block !important;">';
              }
          }

          // 插入 Bio
          if (!sideCard.querySelector('.cv-sidebar-bio')) {
              var bioHTML = \`
                <div class="cv-sidebar-bio">
                    <p>Let everything unfold and go with the flow.</p>
                    
                    <div class="cv-skill-divider"></div>

                    <div class="cv-sidebar-tags">
                        <div class="cv-sidebar-tag"><i class="fa-brands fa-python"></i> Python</div>
                        <div class="cv-sidebar-tag"><i class="fa-brands fa-java"></i> Java</div>
                        <div class="cv-sidebar-tag"><i class="fa-solid fa-server skill-icon"></i> Spark</div>
                        <div class="cv-sidebar-tag"><i class="fa-solid fa-fire"></i> PyTorch</div>
                        <div class="cv-sidebar-tag"><i class="fa-brands fa-docker"></i> Docker</div>
                        <div class="cv-sidebar-tag"><i class="fa-brands fa-git-alt"></i> Git</div>
                    </div>

                    <div class="cv-skill-divider"></div>

                    <div class="cv-sidebar-tags">
                        <div class="cv-sidebar-tag"><i class="fa-solid fa-brain"></i> Machine Learning</div>
                        <div class="cv-sidebar-tag"><i class="fa-solid fa-gears"></i> MLOps</div>
                        <div class="cv-sidebar-tag"><i class="fa-solid fa-network-wired"></i> Deep Learning</div>
                        <div class="cv-sidebar-tag"><i class="fa-solid fa-comments"></i> NLP</div>
                        <div class="cv-sidebar-tag"><i class="fa-solid fa-wand-magic-sparkles"></i> LLMs</div>
                    </div>

                    <div class="cv-skill-divider"></div>

                    <div class="cv-sidebar-tags">
                        <div class="cv-sidebar-tag"><i class="fa-solid fa-database"></i> MySQL</div>
                        <div class="cv-sidebar-tag"><i class="fa-solid fa-file-lines"></i></i> NoSQL</div>
                        <div class="cv-sidebar-tag"><i class="fa-brands fa-aws"></i> AWS</div>
                        <div class="cv-sidebar-tag"><i class="fa-brands fa-microsoft"></i> Azure</div>
                        <div class="cv-sidebar-tag"><i class="fa-solid fa-cloud"></i> Snowflake</div>
                    </div>

                    <div class="cv-skill-divider"></div>

                    <div class="cv-sidebar-tags">
                        <div class="cv-sidebar-tag"><i class="fa-solid fa-chart-simple"></i> Tableau</div>
                        <div class="cv-sidebar-tag"><i class="fa-solid fa-chart-pie"></i> PowerBI</div>
                        <div class="cv-sidebar-tag"><i class="fa-solid fa-chart-area"></i> Qlik</div>
                    </div>

                    <div class="contact-card">
                      <div class="contact-wrap">
                        <div class="contact-terminal">
                          <hgroup class="contact-head">
                            <p class="contact-title">
                              <svg width="16px" height="16px" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="currentColor" fill="none">
                                <path d="M7 15L10 12L7 9M13 15H17M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"></path>
                              </svg>
                              zsh — Contact
                            </p>
                            <button class="copy_toggle" tabindex="-1" type="button" onclick="navigator.clipboard.writeText('ddl1208@icloud.com'); alert('Email copied!');">
                              <svg width="16px" height="16px" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="currentColor" fill="none">
                                <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path>
                                <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"></path>
                              </svg>
                            </button>
                          </hgroup>
                          <div class="contact-body">
                            <pre class="contact-pre">
                              <code>~ </code>
                              <code>Email </code>
                              <code class="contact-cmd" data-cmd="ddl1208@icloud.com"></code>
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              \`;
              var wrapper = document.createElement('div');
              wrapper.innerHTML = bioHTML;
              sideCard.appendChild(wrapper);
          }
      }

      // === 简历内容替换 ===
      var targetList = document.querySelector('.home-article-list');
      if (targetList) {
          console.log("CV Injection: Target list detected, running replacement...");
          var cvHTML = \`
            <div class="cv-home-sections">

              <!-- 3D Earth Container Hook -->
              <div style="position: relative; width: 100%; height: 100vh; margin-top: 50px;">
                  <div id="scene-container" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; margin: 0;"></div>
                  
                  <div class="earth-controls">
                      <div class="tooltip-container" onclick="window.focusLocation(30.57, 104.06, 'chengdu')">
                          <span class="tooltip">I was born here, this is my hometown</span>
                          <span class="text">🐼 Chengdu</span>
                          <span>🌶️ 🍲 🇨🇳</span>
                      </div>

                      <div class="tooltip-container" onclick="window.focusLocation(-34.93, 138.60, 'adelaide')">
                          <span class="tooltip">Came here alone at 15 for high school</span>
                          <span class="text">🍷 Adelaide</span>
                          <span>🦘 🌊 🇦🇺</span>
                      </div>

                      <div class="tooltip-container" onclick="window.focusLocation(-27.47, 153.02, 'brisbane')">
                          <span class="tooltip">Where my journey in CS and DS began</span>
                          <span class="text">🏖️ Brisbane</span>
                          <span>🎣 ☀️ 🇦🇺</span>
                      </div>

                      <div class="tooltip-container" onclick="window.focusLocation(40.44, -79.99, 'pittsburgh')">
                          <span class="tooltip">Earned my degree at a world-leading DS institution</span>
                          <span class="text">💻 Pittsburgh</span>
                          <span>🏙️ 🌉 🇺🇸</span>
                      </div>

                      <div class="tooltip-container" onclick="window.focusLocation(34.05, -118.24, 'la')">
                          <span class="tooltip">I lived for six months after graduation, I loved Here</span>
                          <span class="text">🌴 Los Angeles</span>
                          <span>🎬 🌅 🇺🇸</span>
                      </div>

                      <div class="tooltip-container" onclick="window.focusLocation(30.04, 31.23, 'cairo')">
                          <span class="tooltip">My first step onto Africa, land of Pharaohs</span>
                          <span class="text">🏺 Cairo</span>
                          <span>🐫 🏜️ 🇪🇬</span>
                      </div>

                      <div class="tooltip-container" onclick="window.focusLocation(-1.29, 36.82, 'nairobi')">
                          <span class="tooltip">The Heart of Safari and Wild Nature</span>
                          <span class="text">🦒 Nairobi</span>
                          <span>🐘 🦓 🇰🇪</span>
                      </div>

                      <div class="tooltip-container" onclick="window.resetView()">
                          <span class="tooltip">Reset View</span>
                          <span class="text">🌍 Orbit View</span>
                          <span><i class="fa-solid fa-satellite"></i></span>
                      </div>
                  </div>
              </div>

              <div class="cv-edu-section">
                <div class="cv-section-title"><i class="fa-solid fa-graduation-cap"></i> Education</div>
                <div class="cv-grid">
                  <a href="/2023/09/28/MISM-Carnegie-Mellon-University/" class="cv-card">
                    <div class="cv-logo-box">
                        <img src="/images/CMU.png" alt="CMU">
                    </div>
                    <div class="cv-content-box">
                      <div class="cv-card-header"><span class="cv-role">Carnegie Mellon University</span><span class="cv-time">Sep 2023 - Dec 2024</span></div>
                      <div class="cv-card-subheader"><span class="cv-org">Master of Information Systems</span><span class="cv-gpa">GPA: 3.8 / 4.0</span></div>
                      <div class="cv-desc">Focus: Data Science, Machine Learning in Production.</div>
                    </div>
                  </a>
                  <a href="/2019/02/11/BCompSci-Data-Science-University-of-Queensland/" class="cv-card">
                    <div class="cv-logo-box">
                        <img src="/images/uq2.png" alt="UQ">
                    </div>
                    <div class="cv-content-box">
                      <div class="cv-card-header"><span class="cv-role">University of Queensland</span><span class="cv-time">Feb 2019 - Dec 2022</span></div>
                      <div class="cv-card-subheader"><span class="cv-org">Bachelor of Computer Science & Data Science</span><span class="cv-gpa">GPA: 3.88 / 4.0</span></div>
                      <div class="cv-desc">Focus: Algorithms, Database Managements, Statistics.</div>
                    </div>
                  </a>
                </div>
              </div>

              <div class="cv-exp-section">
                <div class="cv-section-title"><i class="fa-solid fa-briefcase"></i> Work Experience</div>
                <div class="cv-grid">
                  <a href="/2025/05/26/AI-Data-Scientist-Intel/" class="cv-card">
                    <div class="cv-logo-box">
                        <img src="/images/intel.png" alt="intel">
                    </div>
                    <div class="cv-content-box">
                      <div class="cv-card-header"><span class="cv-role">Intel Corporation</span><span class="cv-time">May 2025 - Present</span></div>
                      <div class="cv-card-subheader"><span class="cv-org">AI Data Scientist</span></div>
                      <div class="cv-desc">Driving AI-powered capacity planning and global supply-chain transformation through scalable forecasting systems and executive decision platforms.</div>
                    </div>
                  </a>
                  <a href="/2024/05/20/Strategic-Sourcing-Data-Analyst-MSA-Safety/" class="cv-card">
                     <div class="cv-logo-box">
                        <img src="/images/msa.jpg" alt="msa">
                    </div>
                     <div class="cv-content-box">
                       <div class="cv-card-header"><span class="cv-role">MSA Safety</span><span class="cv-time">May 2024 - Dec 2024</span></div>
                       <div class="cv-card-subheader"><span class="cv-org">Data Analyst Internship</span></div>
                       <div class="cv-desc">Optimizing global procurement and supplier strategy through data analytics, machine learning, and executive-level business intelligence.</div>
                     </div>
                  </a>
                  <a href="/2023/02/18/Data-Scientist-Intern-LVMH/" class="cv-card">
                    <div class="cv-logo-box">
                        <img src="/images/lvmh.jpg" alt="lvmg">
                    </div>
                    <div class="cv-content-box">
                      <div class="cv-card-header"><span class="cv-role">LVMH</span><span class="cv-time">Feb 2023 - Jul 2023</span></div>
                      <div class="cv-card-subheader"><span class="cv-org">Data Scientist Internship</span></div>
                      <div class="cv-desc">Enabling data-driven growth for luxury retail by applying advanced analytics to user segmentation, forecasting, and performance marketing optimization.</div>
                    </div>
                  </a>
                  <a href="/2021/12/13/Data-Expert-Intern-Signify/" class="cv-card">
                    <div class="cv-logo-box">
                        <img src="/images/signifycompany_logo.jpg" alt="signify">
                    </div>
                    <div class="cv-content-box">
                      <div class="cv-card-header"><span class="cv-role">Signify</span><span class="cv-time">Dec 2021 - Sep 2022</span></div>
                      <div class="cv-card-subheader"><span class="cv-org">Data Expert Internship</span></div>
                      <div class="cv-desc">Advancing supply-chain efficiency and digital transformation through automation, analytics, and operational data optimization.</div>
                    </div>
                  </a>
                </div>
              </div>

              <div class="cv-proj-section">
                <div class="cv-section-title"><i class="fa-solid fa-code"></i> Selected Projects</div>
                <div class="cv-grid">
                  
                  <a href="/2024/08/19/Capstone-Emotion-Classification-with-LLMs/" class="cv-card">
                    <div class="cv-logo-box">
                        <img src="/images/tcs.png" alt="tcs">
                    </div>
                    <div class="cv-content-box">
                      <div class="cv-card-header"><span class="cv-role">CMU & Tata Consultancy Services</span><span class="cv-time">Aug 2024 - Dec 2024</span></div>
                      <div class="cv-card-subheader"><span class="cv-org">Data Scientist - Emotion Classification with LLMs and NLP Models Capstone Project</span></div>
                      <div class="cv-desc">Developed and deployed an end-to-end NLP solution leveraging transformer-based models to enable scalable emotion understanding and intelligent text classification in real-world applications. </div>
                    </div>
                  </a>

                  <a href="/2024/01/12/Recognition-Fault-Detection-System/" class="cv-card">
                    <div class="cv-logo-box">
                        <img src="/images/GE-Logo.png" alt="ge">
                    </div>
                    <div class="cv-content-box">
                      <div class="cv-card-header"><span class="cv-role">CMU & General Electric</span><span class="cv-time">Jan 2024 - May 2024</span></div>
                      <div class="cv-card-subheader"><span class="cv-org">Data Scientist - Recognition and Fault Detection System Project</span></div>
                      <div class="cv-desc">Built a real-time, production-oriented computer vision system integrating deep learning and streaming architectures to enhance industrial fault detection and operational reliability. </div>
                    </div>
                  </a>

                  <a href="/2023/09/30/Movie-Recommendations-Platform" class="cv-card">
                    <div class="cv-logo-box">
                        <img src="/images/Netflix-Symbol.png" alt="netflix">
                    </div>
                    <div class="cv-content-box">
                      <div class="cv-card-header"><span class="cv-role">CMU & Netflix</span><span class="cv-time">Sep 2023 - Dec 2023</span></div>
                      <div class="cv-card-subheader"><span class="cv-org">Data Scientist - Movie Recommendations Platform Project</span></div>
                      <div class="cv-desc">Designed a large-scale recommendation platform with real-time APIs, distributed data pipelines, and MLOps automation to support high-throughput personalization at scale.</div>
                    </div>
                  </a>
                  
                  

                </div>
              </div>
              <div style="height: 60px;"></div>
            </div>
            </div>
           \`;
          targetList.outerHTML = cvHTML;
      }

      // === 注入首页底部中间动画 ===
      var scrollBtn = document.querySelector('[onclick="scrollToMain()"]');      
      var bottomBar = scrollBtn ? scrollBtn.parentElement : null;      
      var rightSideElement = bottomBar ? bottomBar.lastElementChild : null;
      if (bottomBar && rightSideElement && !bottomBar.querySelector('.center-preloader-box')) {
          console.log("Preloader: Bottom bar found, injecting animation..."); //用于调试
          var preloaderHTML = \`
            <div class="center-preloader-box">
                <div class="preloader">
                  <div class="crack crack1"></div>
                  <div class="crack crack2"></div>
                  <div class="crack crack3"></div>
                  <div class="crack crack4"></div>
                  <div class="crack crack5"></div>
                </div>
            </div>
          \`;
          rightSideElement.insertAdjacentHTML('beforebegin', preloaderHTML);
      } else {
          if(!bottomBar) console.log("Preloader Error: Could not find bottom bar container.");
      }
      
      // 注入仓鼠 
      var socialContactsDiv = document.querySelector('.social-contacts');
      if (socialContactsDiv && !document.querySelector('.wheel-and-hamster')) {
        console.log("Adding Hamster to the Left...");
        var hamsterHTML = \`
          <div aria-label="Orange and tan hamster running in a metal wheel" role="img" class="wheel-and-hamster">
              <div class="wheel"></div>
              <div class="hamster">
                  <div class="hamster__body">
                      <div class="hamster__head">
                          <div class="hamster__ear"></div>
                          <div class="hamster__eye"></div>
                          <div class="hamster__nose"></div>
                      </div>
                      <div class="hamster__limb hamster__limb--fr"></div>
                      <div class="hamster__limb hamster__limb--fl"></div>
                      <div class="hamster__limb hamster__limb--br"></div>
                      <div class="hamster__limb hamster__limb--bl"></div>
                      <div class="hamster__tail"></div>
                  </div>
              </div>
              <div class="spoke"></div>
          </div>
        \`;
        socialContactsDiv.insertAdjacentHTML('beforebegin', hamsterHTML);
      }
    }
    var observer = new MutationObserver(function(mutations) {
        runCVInjection();
    });
    
    // 启动监控
    observer.observe(document.body, { childList: true, subtree: true });

    // 初始运行
    document.addEventListener("DOMContentLoaded", runCVInjection);
    document.addEventListener("pjax:complete", runCVInjection);
  </script>

  <script type="module">
    import * as THREE from 'three';

    let scene, camera, renderer;
    let earthGroup; 
    let stars;
    let isSceneInit = false;
    let isAutoRotating = true;  
    const siteMarkers = {};     
    let currentPulseTweens = [];  
    
    const CONFIG = {
        earthRadius: 10,
        glowRadius: 10.3, 
        rotateSpeed: 0.0005 
    };

    // 2. 初始化主函数
    function initEarth3D() {
        if (document.getElementById('scene-container-canvas')) return; 
        
        const container = document.getElementById('scene-container');
        if (!container) return;

        // Scene
        scene = new THREE.Scene();
        
        // Camera
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.set(0, 0, 32); 
        
        // Renderer
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.domElement.id = 'scene-container-canvas';
        container.appendChild(renderer.domElement);

        // Lights
        const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
        sunLight.position.set(-50, 20, 30); 
        scene.add(sunLight);
        
        const ambientLight = new THREE.AmbientLight(0x404040, 0.3); 
        scene.add(ambientLight);
        
        const backLight = new THREE.SpotLight(0x00f2ff, 1.5); 
        backLight.position.set(0, 20, -50);
        scene.add(backLight);

        // Group
        earthGroup = new THREE.Group();
        earthGroup.rotation.z = 0 * Math.PI / 180; 
        if (window.innerWidth > 768) {
            earthGroup.position.x = -1; 
        } else {
            earthGroup.position.y = -6; 
        }
        scene.add(earthGroup);

        // Objects
        createStars();
        createRealisticEarth();
        createAtmosphere();
        
        initMarkers();
        
        // Resize
        window.addEventListener('resize', onWindowResize);
        
        // Animation
        animate();
        
        isSceneInit = true;
        
        // Initial Check for scroll
        checkScroll();
        window.addEventListener('scroll', checkScroll);
    }

    function createRealisticEarth() {
        const geometry = new THREE.SphereGeometry(CONFIG.earthRadius, 64, 64);
        const loader = new THREE.TextureLoader();

        const material = new THREE.MeshPhongMaterial({
            map: loader.load('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg'),
            bumpMap: loader.load('https://unpkg.com/three-globe/example/img/earth-topology.png'),
            bumpScale: 0.15,
            specularMap: loader.load('https://unpkg.com/three-globe/example/img/earth-water.png'),
            specular: new THREE.Color(0x333333),
            shininess: 15
        });

        const earth = new THREE.Mesh(geometry, material);
        earthGroup.add(earth);
    }

    function createAtmosphere() {
        const vertexShader = \`
            varying vec3 vNormal;
            void main() {
                vNormal = normalize(normalMatrix * normal);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        \`;
        const fragmentShader = \`
            varying vec3 vNormal;
            void main() {
                float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 3.0);
                gl_FragColor = vec4(0.0, 0.8, 1.0, 1.0) * intensity * 1.5;
            }
        \`;

        const geometry = new THREE.SphereGeometry(CONFIG.glowRadius, 64, 64);
        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide,
            transparent: true,
            depthWrite: false
        });

        const atmosphere = new THREE.Mesh(geometry, material);
        earthGroup.add(atmosphere);
    }

    function createStars() {
        const geometry = new THREE.BufferGeometry();
        const count = 20000;
        const posArray = new Float32Array(count * 3);
        for(let i=0; i<count*3; i++) {
            posArray[i] = (Math.random() - 0.5) * 600; 
        }
        geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        const loader = new THREE.TextureLoader();
        const starTexture = loader.load('https://threejs.org/examples/textures/sprites/disc.png');

        const material = new THREE.PointsMaterial({
            size: 0.75,           
            color: 0xffffff,     
            transparent: true,   
            opacity: 0.8,
            map: starTexture,     
            alphaTest: 0.5       
        });
      
        stars = new THREE.Points(geometry, material);
        scene.add(stars);
    }

    // --- 新增：坐标转换函数 ---
    function latLonToVector3(lat, lon, radius) {        
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180) * (Math.PI / 180);
        const x = -(radius * Math.sin(phi) * Math.cos(theta));
        const z = (radius * Math.sin(phi) * Math.sin(theta));
        const y = (radius * Math.cos(phi));
        return new THREE.Vector3(x, y, z);
    }

    // --- 添加标记点函数 ---
    function addMarker(lat, lon, id) {
        const pos = latLonToVector3(lat, lon, CONFIG.earthRadius);            
        // 标记线
        const lineGeo = new THREE.BufferGeometry().setFromPoints([
            pos, 
            pos.clone().multiplyScalar(1.25)
        ]);
        const lineMat = new THREE.LineBasicMaterial({ color: 0xff0055, transparent: true, opacity: 0.8 });
        const line = new THREE.Line(lineGeo, lineMat);
        earthGroup.add(line);
        
        // 标记点
        const dotGeo = new THREE.SphereGeometry(0.12, 16, 16);
        const dotMat = new THREE.MeshBasicMaterial({ color: 0xff0055 });
        const dot = new THREE.Mesh(dotGeo, dotMat);
        dot.position.copy(pos.clone().multiplyScalar(1.25));
        earthGroup.add(dot);
        
        // 底部光圈
        const baseGeo = new THREE.RingGeometry(0.1, 0.3, 32);
        const baseMat = new THREE.MeshBasicMaterial({ 
            color: 0xff0055, side: THREE.DoubleSide, transparent:true, opacity:0.5 
        });
        const base = new THREE.Mesh(baseGeo, baseMat);
        base.position.copy(pos.clone().multiplyScalar(1.005));
        base.lookAt(new THREE.Vector3(0,0,0)); 
        earthGroup.add(base);

        siteMarkers[id] = dot;
    }

    // --- 初始化所有坐标 ---
    function initMarkers() {
        addMarker(30.57, 104.06, 'chengdu');
        addMarker(-34.93, 138.60, 'adelaide');
        addMarker(-27.47, 153.02, 'brisbane');   
        addMarker(40.44, -79.99, 'pittsburgh');  
        addMarker(34.05, -118.24, 'la');
        addMarker(30.04, 31.23, 'cairo');   
        addMarker(-1.29, 36.82, 'nairobi');
    }

    // --- 暴露给 Window 的点击事件 ---
    window.focusLocation = function(lat, lon, id) {
        if(!earthGroup || !window.TWEEN) return;
        
        isAutoRotating = false;
        
        // 计算目标旋转角度
        const targetY = - (lon * Math.PI / 180) - Math.PI / 2;
        const targetX = lat * (Math.PI / 180);
        
        // 地球旋转动画
        new window.TWEEN.Tween(earthGroup.rotation)
            .to({ x: targetX, y: targetY, z: 0 }, 1500) 
            .easing(window.TWEEN.Easing.Cubic.InOut)
            .start();

        // 清除之前的脉冲动画
        if (currentPulseTweens.length > 0) {
            currentPulseTweens.forEach(t => t.stop());
            currentPulseTweens = [];
        }

        // 重置所有标记点状态
        for (const key in siteMarkers) {
            siteMarkers[key].scale.set(1, 1, 1);
            siteMarkers[key].material.color.setHex(0xff0055); 
            siteMarkers[key].material.opacity = 1;  
        }

        // 对选中点添加脉冲动画
        const targetDot = siteMarkers[id];
        if (targetDot) {
            const endColor = { r: 0.7, g: 0.0, b: 1.0 }; // 变成紫色
            
            const scaleTween = new window.TWEEN.Tween(targetDot.scale)
                .to({ x: 3.0, y: 3.0, z: 3.0 }, 1000) 
                .yoyo(true)
                .repeat(Infinity)
                .easing(window.TWEEN.Easing.Quadratic.InOut)
                .start();
            
            const colorTween = new window.TWEEN.Tween(targetDot.material.color)
                .to({ r: endColor.r, g: endColor.g, b: endColor.b }, 1000) 
                .yoyo(true)
                .repeat(Infinity)
                .easing(window.TWEEN.Easing.Quadratic.InOut)
                .start();
                
            currentPulseTweens.push(scaleTween, colorTween);
        }
    };

    window.resetView = function() {
        if(!earthGroup || !window.TWEEN) return;
        
        isAutoRotating = true; // 恢复自动旋转

        if (currentPulseTweens.length > 0) {
            currentPulseTweens.forEach(t => t.stop());
            currentPulseTweens = [];
        }
        // 重置点颜色
        for (const key in siteMarkers) {
            siteMarkers[key].scale.set(1, 1, 1);
            siteMarkers[key].material.color.setHex(0xff0055);
        }
        
        // 恢复地球默认角度
        new window.TWEEN.Tween(earthGroup.rotation)
            .to({ x: 0, z: 0 * Math.PI / 180 }, 1000)
            .start();
    };

    function onWindowResize() {
        const container = document.getElementById('scene-container');
        if(!container || !camera || !renderer) return;
        
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }

    function animate(time) {
        requestAnimationFrame(animate);

        // --- 更新 TWEEN 动画 ---
        if (window.TWEEN) {
            window.TWEEN.update(time);
        }

        if (isAutoRotating && earthGroup) {
            earthGroup.rotation.y += CONFIG.rotateSpeed;
        }
        if (renderer && scene && camera) {
            renderer.render(scene, camera);
        }
    }
    
    function checkScroll() {
        const container = document.getElementById('scene-container');
        // === 修复核心：如果找不到容器（说明切走了），也要移除类名 ===
        if (!container) {
            document.body.classList.remove('starry-night');
            return;
        }
        
        const rect = container.getBoundingClientRect();
        const viewHeight = window.innerHeight;
        
        if (rect.top <= viewHeight * 0.9) { 
            container.style.opacity = '1';
            document.body.classList.add('starry-night');
        } else {
            container.style.opacity = '0';
            document.body.classList.remove('starry-night');
        }
    }
    
    const observer = new MutationObserver((mutations) => {
        if (document.getElementById('scene-container') && !document.getElementById('scene-container-canvas')) {
            initEarth3D();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  </script>
`);