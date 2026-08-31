// Optional playful decorations. Keep their implementations below so they
// can be restored without rewriting the home layout.
var HOME_DECORATIONS = {
  centerStar: false,
  hamster: false
};
var homeEarthModulePromise = null;

function isHomePage() {
  return window.location.pathname === '/' || window.location.pathname === '/index.html';
}

function loadHomeEarth() {
  if (!isHomePage() || !document.getElementById('scene-container')) {
    return;
  }

  if (!homeEarthModulePromise) {
    homeEarthModulePromise = import('/js/home-earth.js').catch(function(error) {
      homeEarthModulePromise = null;
      throw error;
    });
  }

  homeEarthModulePromise.then(function(module) {
    if (isHomePage() && document.getElementById('scene-container')) {
      module.initHomeEarth();
    }
  }).catch(function(error) {
    console.error('Unable to initialize the home Earth scene.', error);
  });
}

function destroyHomeEarth() {
  if (homeEarthModulePromise) {
    homeEarthModulePromise.then(function(module) {
      module.destroyHomeEarth();
    }).catch(function() {});
  }
}

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
  destroyHomeEarth();
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
           style.innerHTML = `
              html, body { margin-top: 0 !important; padding-top: 0 !important; }
              .main-content-container, .page-container, #app { padding-top: 0 !important; margin-top: 0 !important; }
           `;
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

  if (!isHomePage()) {
      document.body.classList.remove('starry-night');
      destroyHomeEarth();
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
          var bioHTML = `
            <div class="cv-sidebar-bio">
                <p>With dedicated passion and energy.</p>
                
                <div class="cv-skill-divider"></div>

                <div class="cv-sidebar-tags">
                    <div class="cv-sidebar-tag"><i class="fa-brands fa-python"></i> Python</div>
                    <div class="cv-sidebar-tag"><i class="fa-brands fa-java"></i> Java</div>
                    <div class="cv-sidebar-tag"><i class="fa-solid fa-server skill-icon"></i> Netmiko</div>
                    <div class="cv-sidebar-tag"><i class="fa-solid fa-fire"></i> Django</div>
                    <div class="cv-sidebar-tag"><i class="fa-brands fa-docker"></i> Docker</div>
                    <div class="cv-sidebar-tag"><i class="fa-brands fa-git-alt"></i> Git</div>
                </div>

                <div class="cv-skill-divider"></div>

                <div class="cv-sidebar-tags">
                    <div class="cv-sidebar-tag"><i class="fa-solid fa-network-wired"></i> Network Engineering</div>
                    <div class="cv-sidebar-tag"><i class="fa-solid fa-gears"></i> DevOps</div>
                    <div class="cv-sidebar-tag"><i class="fa-solid fa-brain"></i> AI Coding</div>
                    <div class="cv-sidebar-tag"><i class="fa-solid fa-rectangle-code"></i> Prompt Engineering</div>
                    <div class="cv-sidebar-tag"><i class="fa-solid fa-message-bot"></i> Automation</div>
                    <div class="cv-sidebar-tag"><i class="fa-solid fa-block-brick-fire"></i> Network Security</div>
                    <div class="cv-sidebar-tag"><i class="fa-solid fa-network-wired"></i> Data Center Operation</div>
                    
                </div>

                <div class="cv-skill-divider"></div>

                <div class="cv-sidebar-tags">
                    <div class="cv-sidebar-tag"><i class="fa-solid fa-database"></i> PostgreSQL</div>
                    <div class="cv-sidebar-tag"><i class="fa-solid fa-file-lines"></i></i> MySQL</div>
                    <div class="cv-sidebar-tag"><i class="fa-brands fa-aws"></i> AWS</div>
                    <div class="cv-sidebar-tag"><i class="fa-brands fa-microsoft"></i> Ubuntu</div>
                    <div class="cv-sidebar-tag"><i class="fa-thin fa-circle-nodes"></i> Wireshark</div>
                    <div class="cv-sidebar-tag"><i class="fa-regular fa-command"></i> Linux</div>
                    <div class="cv-sidebar-tag"><i class="fa-regular fa-registered"></i> Redis</div>
                    <div class="cv-sidebar-tag"><i class="fa-light fa-screwdriver-wrench"></i> Nornir</div>
                    <div class="cv-sidebar-tag"><i class="fa-light fa-timer"></i> Crontab</div>
                </div>

                <div class="cv-skill-divider"></div>

                <div class="cv-sidebar-tags">
                    <div class="cv-sidebar-tag"><i class="fa-solid fa-router"></i> Router</div>
                    <div class="cv-sidebar-tag"><i class="fa-regular fa-light-switch"></i> Switch</div>
                    <div class="cv-sidebar-tag"><i class="fa-solid fa-server"></i> Server</div>
                    <div class="cv-sidebar-tag"><i class="fa-solid fa-cloud"></i> Cloud</div>
                    <div class="cv-sidebar-tag"><i class="fa-solid fa-block-brick-fire"></i> SDN</div>
                    <div class="cv-sidebar-tag"><i class="fa-solid fa-abacus"></i> OTN</div>
                </div>

                <div class="cv-skill-divider"></div>

                <div class="cv-sidebar-tags">
                    <div class="cv-sidebar-tag"><i class="fa-regular fa-certificate"></i> CCNA</div>
                    <div class="cv-sidebar-tag"><i class="fa-solid fa-certificate"></i> CCNP</div>
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
                        <button class="copy_toggle" tabindex="-1" type="button" onclick="navigator.clipboard.writeText('jianxian2023@gmail.com'); alert('Email copied!');">
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
                          <code class="contact-cmd" data-cmd="jianxian2023@gmail.com"></code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          `;
          var wrapper = document.createElement('div');
          wrapper.innerHTML = bioHTML;
          sideCard.appendChild(wrapper);
      }
  }

  // === 简历内容替换 ===
  var targetList = document.querySelector('.home-article-list');
  if (targetList) {
      console.log("CV Injection: Target list detected, running replacement...");
      var cvHTML = `
        <div class="cv-home-sections">

          <!-- 3D Earth Container Hook -->
          <div style="position: relative; width: 100%; height: 100vh; margin-top: 50px;">
              <div id="scene-container" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; margin: 0;"></div>
              
              <div class="earth-controls">
                  <div class="tooltip-container" onclick="window.focusLocation(34.05, -118.24, 'la')">
                      <span class="tooltip">Still continuing my work and life here...</span>
                      <span class="text"> Los Angeles</span>
                      <span>US</span>
                  </div>

                  <div class="tooltip-container" onclick="window.focusLocation(40.44, -79.99, 'pittsburgh')">
                      <span class="tooltip">Challenging but rewarding graduate studies at CMU<br>earned me a world-leading IS institution degree</span>
                      <span class="text">Pittsburgh</span>
                      <span>US</span>
                  </div>

                  <div class="tooltip-container" onclick="window.focusLocation(40.65, -73.78, 'new york')">
                      <span class="tooltip">The short but fulfilling internship & trip<br>appreciate the richness and diversity of the world.</span>
                      <span class="text">New York</span>
                      <span>US</span>
                  </div>

                  <div class="tooltip-container" onclick="window.focusLocation(-37.80, 144.96, 'melbourne')">
                      <span class="tooltip">Internships, studies, experiences. <br>Even a corner of the world can be vibrant and colorful.</span>
                      <span class="text">Melbourne</span>
                      <span>AU</span>
                  </div>

                  <div class="tooltip-container" onclick="window.focusLocation(-34.93, 138.60, 'adelaide')">
                      <span class="tooltip">The first and the beginning of my study abroad</span>
                      <span class="text">Adelaide</span>
                      <span>AU</span>
                  </div>

                  <div class="tooltip-container" onclick="window.focusLocation(51.52, -0.04, 'london')">
                      <span class="tooltip">Nobility is an attitude. </span>
                      <span class="text">London</span>
                      <span>UK</span>
                  </div>

                  <div class="tooltip-container" onclick="window.focusLocation(39.90, 116.40, 'beijing')">
                      <span class="tooltip">Unforgettable, challenging yet fulfilling <br>my university life</span>
                      <span class="text">Beijing</span>
                      <span>China</span>
                  </div>

                  <div class="tooltip-container" onclick="window.focusLocation(23.12, 113.26, 'guangzhou')">
                      <span class="tooltip">My sweet and familiar hometown</span>
                      <span class="text">Guangzhou</span>
                      <span>China</span>
                  </div>

                  <div class="tooltip-container" onclick="window.resetView()">
                      <span class="tooltip">Reset View</span>
                      <span class="text">Orbit View</span>
                      <span><i class="fa-solid fa-satellite"></i></span>
                  </div>
              </div>
          </div>

          <div class="cv-edu-section">
            <div class="cv-section-title"><i class="fa-solid fa-graduation-cap"></i> Education</div>
            <div class="cv-grid">
              <a href="/2023/06/28/CMU/" class="cv-card">
                <div class="cv-logo-box">
                    <img src="/images/CMU.png" alt="CMU">
                </div>
                <div class="cv-content-box">
                  <div class="cv-card-header"><span class="cv-role">Carnegie Mellon University</span><span class="cv-time">Sep 2021 - Jun 2023</span></div>
                  <div class="cv-card-subheader"><span class="cv-org">Master of Information Systems</span><span class="cv-gpa">GPA: 3.8 / 4.0</span></div>
                  <div class="cv-desc">Focus: Search Engine, Software Engineering, Machine Learning in Production.</div>
                </div>
              </a>
              <a href="/2021/06/28/BUPT/" class="cv-card">
                <div class="cv-logo-box">
                    <img src="/images/BUPT.png" alt="BUPT">
                </div>
                <div class="cv-content-box">
                  <div class="cv-card-header"><span class="cv-role">Beijing University of Post and Telecommunication</span><span class="cv-time">Sep 2017 - May 2021</span></div>
                  <div class="cv-card-subheader"><span class="cv-org">Bachelor of Engineering</span><span class="cv-gpa">GPA: 3.85 / 4.0</span></div>
                  <div class="cv-desc">Focus: Algorithms, Database Managements, Statistics.</div>
                </div>
              </a>
              <a href="/2021/07/30/QMUL/" class="cv-card">
                <div class="cv-logo-box">
                    <img src="/images/QMUL.png" alt="QMUL">
                </div>
                <div class="cv-content-box">
                  <div class="cv-card-header"><span class="cv-role">Queen Mary University of London</span><span class="cv-time">Sep 2017 - May 2021</span></div>
                  <div class="cv-card-subheader"><span class="cv-org">Dual Degree: Bachelor of E-Commerce and Law</span><span class="cv-gpa">GPA: 3.70 / 4.0</span></div>
                  <div class="cv-desc">Focus: E-Commerce Engineering, E-Commerce Law, Statistics.</div>
                </div>
              </a>
            </div>
          </div>

          <div class="cv-exp-section">
            <div class="cv-section-title"><i class="fa-solid fa-briefcase"></i> Work Experience</div>
            <div class="cv-grid">
              <a href="/2023/08/20/Network-Automation-Engineer-China-Telecom/" class="cv-card">
                 <div class="cv-logo-box">
                    <img src="/images/cta.png" alt="cta">
                </div>
                 <div class="cv-content-box">
                   <div class="cv-card-header"><span class="cv-role">China Telecom Americas</span><span class="cv-time">Aug 2023 - Now</span></div>
                   <div class="cv-card-subheader"><span class="cv-org">Network & Automation Engineer</span></div>
                   <div class="cv-desc">Building AI and automation-driven backbone network operations platforms and NOC toolings, to centralize monitoring, accelerate all layers network troubleshooting, and scale infrastructure management.</div>
                 </div>
              </a>
              <a href="/2023/01/20/HMC/" class="cv-card">
                <div class="cv-logo-box">
                    <img src="/images/hmc_logo.jpg" alt="hmc">
                </div>
                <div class="cv-content-box">
                  <div class="cv-card-header"><span class="cv-role">Harvard Management Company</span><span class="cv-time">Jan 2023 - May 2023</span></div>
                  <div class="cv-card-subheader"><span class="cv-org">Backend & Data Engineer </span></div>
                  <div class="cv-desc">Driving investment research and portfolio intelligence through scalable ETL pipelines, predictive analytics, and graph-based financial data platforms built from 1,200+ hedge fund reports.</div>
                </div>
              </a>
              <a href="/2022/05/01/Tencent/" class="cv-card">
                <div class="cv-logo-box">
                    <img src="/images/Tencent_logo.png" alt="tencent">
                </div>
                <div class="cv-content-box">
                  <div class="cv-card-header"><span class="cv-role">Tencent</span><span class="cv-time">May 2022 - Aug 2022</span></div>
                  <div class="cv-card-subheader"><span class="cv-org">Software Engineer Intern</span></div>
                  <div class="cv-desc">A React Native mobile app with 30+ components and Keycloak auth, developed Golang/PostgreSQL backend for enterprise reimbursement workflows, and improved codebase efficiency by 12% via CI/CD automation with Jenkins.</div>
                </div>
              </a>
              <a href="/2020/06/01/CT-CheLuLu/" class="cv-card">
                <div class="cv-logo-box">
                    <img src="/images/cta.png" alt="cta">
                </div>
                <div class="cv-content-box">
                  <div class="cv-card-header"><span class="cv-role">China Telecom · Internet of Vehicle</span><span class="cv-time">Jun 2020 - Sep 2020</span></div>
                  <div class="cv-card-subheader"><span class="cv-org">Backend Software Engineer Intern</span></div>
                  <div class="cv-desc">Built Java backend services on SSM framework to monitor 12 production servers, developed SMS alerting and two-factor authentication with Redis cache, improving security and login speed by 25%.</div>
                </div>
              </a>
            </div>
          </div>

          <div class="cv-proj-section">
            <div class="cv-section-title"><i class="fa-solid fa-code"></i> Selected Projects</div>
            <div class="cv-grid">
              
              <a href="/2026/01/20/CTA-Portal-Blog/" class="cv-card">
                <div class="cv-logo-box">
                    <img src="/images/cta.png" alt="cta">
                </div>
                <div class="cv-content-box">
                  <div class="cv-card-header">
                    <span class="cv-role">China Telecom Americas</span>
                    <span class="cv-time">Mar 2025 - Present</span>
                  </div>
                  <div class="cv-card-subheader">
                    <span class="cv-org">AI Full-Stack Developer - NOC Operations Portal</span>
                  </div>
                  <div class="cv-desc">
                    A production-grade Django web portal for NOC operations, centralizing circuit inventory, maintenance workflows, OTN alarm processing, vendor notifications, and real-time network monitoring into a unified internal platform.
                  </div>
                </div>
              </a>

              <a href="/2025/06/01/DevAdmin/" class="cv-card">
                <div class="cv-logo-box">
                  <img src="/images/cta.png" alt="cta">
                </div>
                <div class="cv-content-box">
                  <div class="cv-card-header">
                    <span class="cv-role">China Telecom Americas</span>
                    <span class="cv-time">Jun 2024 - Present</span>
                  </div>
                  <div class="cv-card-subheader">
                    <span class="cv-org">Network Automation Engineer - DevAdmin Monitoring Platform</span>
                  </div>
                  <div class="cv-desc">
                    A full-stack network automation and monitoring platform for the AS36678 backbone network, enabling centralized multi-vendor device management, real-time interface/BGP/IS-IS/RPKI monitoring, SNMPv3 traffic analytics, automated configuration backups, and intelligent Exchange-based NOC alerting.
                  </div>
                </div>
              </a>

              <a href="/2023/01/15/Cloud-Microservices-Library-System/" class="cv-card">
                <div class="cv-logo-box">
                    <img src="/images/aws-logo.png" alt="aws">
                </div>
                <div class="cv-content-box">
                  <div class="cv-card-header"><span class="cv-role">CMU & AWS</span><span class="cv-time">Jan 2024 - May 2024</span></div>
                  <div class="cv-card-subheader"><span class="cv-org">Backend - Cloud Microservices Library System Project</span></div>
                  <div class="cv-desc">A cloud-based microservices backend system deployed on AWS EKS that manages library data (books and customers), provides scalable REST APIs, implements Kafka-based asynchronous processing, JWT authentication, and resilience patterns like circuit breakers. </div>
                </div>
              </a>

              <a href="/2021/06/05/Disaster-Monitor" class="cv-card">
                <div class="cv-logo-box">
                    <img src="/images/patent_logo.png" alt="disaster-monitor">
                </div>
                <div class="cv-content-box">
                  <div class="cv-card-header"><span class="cv-role">CN Patent - BUPT Capstone</span><span class="cv-time">Sep 2020 - Apr 2021</span></div>
                  <div class="cv-card-subheader"><span class="cv-org">Machine Learning & Developer - Natural Disaster Monitoring</span></div>
                  <div class="cv-desc">A full-stack data visualization platform aggregating multi-source social media data from Weibo and SINA News into structured earthquake events, with interactive maps, knowledge graphs, heat rivers, and real-time opinion feeds.</div>
                </div>
              </a>
              
              

            </div>
          </div>
          <div style="height: 60px;"></div>
        </div>
        </div>
       `;
      targetList.outerHTML = cvHTML;
  }

  loadHomeEarth();

  // === 注入首页底部中间动画 ===
  var scrollBtn = document.querySelector('[onclick="scrollToMain()"]');      
  var bottomBar = scrollBtn ? scrollBtn.parentElement : null;      
  var rightSideElement = bottomBar ? bottomBar.lastElementChild : null;
  var existingCenterStar = bottomBar ? bottomBar.querySelector('.center-preloader-box') : null;
  if (!HOME_DECORATIONS.centerStar && existingCenterStar) {
      existingCenterStar.remove();
  } else if (HOME_DECORATIONS.centerStar && bottomBar && rightSideElement && !existingCenterStar) {
      console.log("Preloader: Bottom bar found, injecting animation..."); //用于调试
      var preloaderHTML = `
        <div class="center-preloader-box">
            <div class="preloader">
              <div class="crack crack1"></div>
              <div class="crack crack2"></div>
              <div class="crack crack3"></div>
              <div class="crack crack4"></div>
              <div class="crack crack5"></div>
            </div>
        </div>
      `;
      rightSideElement.insertAdjacentHTML('beforebegin', preloaderHTML);
  } else if (HOME_DECORATIONS.centerStar && !bottomBar) {
      if(!bottomBar) console.log("Preloader Error: Could not find bottom bar container.");
  }
  
  // 注入仓鼠 
  var socialContactsDiv = document.querySelector('.social-contacts');
  var existingHamster = document.querySelector('.wheel-and-hamster');
  if (!HOME_DECORATIONS.hamster && existingHamster) {
    existingHamster.remove();
  } else if (HOME_DECORATIONS.hamster && socialContactsDiv && !existingHamster) {
    console.log("Adding Hamster to the Left...");
    var hamsterHTML = `
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
    `;
    socialContactsDiv.insertAdjacentHTML('beforebegin', hamsterHTML);
  }
}
var cvInjectionTimer = null;
var CV_INJECTION_THROTTLE_MS = 600;
function throttledRunCVInjection() {
    if (cvInjectionTimer) return;
    cvInjectionTimer = setTimeout(function() {
        cvInjectionTimer = null;
        runCVInjection();
    }, CV_INJECTION_THROTTLE_MS);
}
var observer = new MutationObserver(function(mutations) {
    if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') return;
    throttledRunCVInjection();
});

// 启动监控
observer.observe(document.body, { childList: true, subtree: true });

// 初始运行
document.addEventListener("DOMContentLoaded", runCVInjection);

function bindSwup(swup) {
  if (!swup || !swup.hooks || swup.__cvHomeHooked) {
    return;
  }

  swup.__cvHomeHooked = true;
  swup.hooks.on("page:view", runCVInjection);
}

window.addEventListener("redefine:swup:ready", function(event) {
  bindSwup(event.detail && event.detail.swup);
});
bindSwup(window.swup);
