---
title: Natural Disaster Monitor @ BUPT
date: 2021-06-05
cover: /images/disaster-monitor.png
type: project
categories:
  - Projects
tags:
  - Vue.js
  - Full Stack
  - Data Visualization
  - Social Media
  - JavaScript
---

<style>
  /* Container */
  .skill-group {
    margin-bottom: 2rem;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  }

  /* Title */
  .skill-title {
    margin-bottom: 1rem;
    font-size: 1.25rem;
    font-weight: 700;
    color: #333;
  }

  /* List layout */
  .skill-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  /* Pill style */
  .skill-pill {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: default;
    border-radius: 9999px;
    border: 1px solid #e5e5e5;
    background-color: #f5f5f5;
    color: #404040;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    transition: all 0.2s ease;
    line-height: 1;
  }

  /* Hover effect */
  .skill-pill:hover {
    border-color: #3b82f6;
    color: #2563eb;
    transform: translateY(-1px);
    background-color: white;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  }

  /* SVG icon size */
  .skill-icon {
    height: 1rem;
    width: 1rem;
    fill: currentColor;
  }
</style>

<div class="job-header">
  <div class="job-meta">
    <span><i class="fa-solid fa-location-dot"></i> Beijing, CN</span>
    <span class="separator">|</span>
    <span><i class="fa-regular fa-calendar"></i> Sep 2020 – Apr 2021</span>
  </div>
</div>

<div class="cv-glass-wrap">
  <div class="cv-glass-card">
    <p class="cv-glass-title"><b>Problem and Work Scope</b></p>
    <p class="cv-glass-desc">
      When disasters strike, authoritative sources like government seismic bureaus capture the facts &mdash; but the real texture of public reaction, eyewitness accounts, and social sentiment is scattered across platforms like Weibo and SINA News, largely untapped and unstructured.
    </p>
    <p class="cv-glass-desc">
      This undergraduate thesis project addresses that gap by designing and deploying a <b>full-stack data visualization website</b> that ingests multi-source social media data, fuses it into structured earthquake &ldquo;events&rdquo;, and presents them through an interactive, multi-dimensional front-end system &mdash; covering maps, knowledge graphs, heat rivers, word clouds, timelines, and real-time opinion feeds in one unified platform.
    </p>
  </div>
</div>

---

### 📚 Award and Patent

**·** [Accepted by the 38th China National Database Conference(NDBC 2021)](https://conf.ccf.org.cn/web/html7/index.html?globalId=m7932170268931563521609159276471&type=1)

**·** [China Patent for Invention: Patent #No = ZL 2020 1 1494854. 1](https://github.com/Joseph-ljx/VUE-Social-Media-Monitor-System/blob/main/Patent.jpg)

### 🗺️ Multi-Dimensional Data Visualization

- **Earthquake Event Model:** Aggregated raw crawled data from Weibo and SINA News into structured &ldquo;events&rdquo; &mdash; each tagged with magnitude, location, focal depth, credibility, regional distribution, and social media heat &mdash; enabling consistent multi-perspective analysis across the entire dataset.
- **Interactive China Maps:** Rendered national earthquake distribution heatmaps and per-event opinion distribution maps using **E-Charts**, with colour-coded regional intensity, floating tooltips, and live data binding. A separate **MapTalks** layer provides a 2D/3D marker-based geographic map where every event pin is clickable and self-adapts the viewport on hover.
- **Heat Theme River:** Implemented a time-series thematic river chart quantifying each event's social media heat over time using a composite formula combining forward count, comment count, and like count &mdash; surfacing how public attention rises and falls around individual disasters.
- **Knowledge Graph:** Built a draggable, zoomable entity-relationship knowledge map per event, linking attributes like magnitude, location, casualty figures, popular keywords, human perception, and geographic coordinates as nodes and edges &mdash; providing relational context beyond tabular data.

### 📊 Event Analytics & Source Intelligence

- **Word Cloud Engine:** Deployed dual word cloud components per event &mdash; a **Heat Cloud** for high-frequency search terms and a **Topic Cloud** for multi-word phrases &mdash; with every element clickable to redirect users to live Weibo search results for real-time source exploration.
- **Event & Location Timelines:** Built chronological event-line components linking all earthquakes sharing a location, with inline attribute cards (province, city, area, magnitude, focal depth) and cross-page re-search triggered on card click &mdash; enabling fluid horizontal navigation across related events.
- **Statistical Breakdown:** Presented per-event pie chart comparisons covering forward vs. original Weibo posts, News vs. Weibo content ratio, and certified vs. general user authorship &mdash; with interactive legend filtering and dynamic angular re-rendering.
- **Real-Time Opinion Feed:** Streamed the latest 1,000 Weibo opinions and top News articles per disaster type in real time, surfacing engagement metrics (comments, forwards, likes) alongside credibility and relevance scores, with source-linked redirection to original posts.

### 🏗️ Front-End Architecture & Engineering

- **Vue.js MVC Framework:** Architected the entire front-end as a **Vue.js** single-page application with strict Model-View-Controller separation, enabling reactive component updates, low coupling, and clean front/back-end decoupling via **AXIOS**-based async API calls.
- **Layered Package Design:** Structured the project into a **Mock layer** (static JS data for fixed pages and login simulation), a **Background Data layer** (async REST calls to the back-end at `http://152.136.59.62:8000/`), a **Source layer** (router, utils, view pages, permission config, reusable components), and a **Public layer** (ESLint, deploy configs, system docs).
- **CDN-Backed Static Resources:** Hosted documentation content, images, and static scripts in a GitHub repository and served via **jsDelivr CDN** &mdash; decoupling content updates from server deployments and enabling live documentation edits without re-deploying.
- **Role-Based Permission System:** Implemented a token-based access control flow where login submits credentials to a mock interceptor, assigns role-specific `Access-Token` values (admin / editor / tester), and gates page permissions through a global Vue router guard.

---

### System Architecture

<div style="display:flex; justify-content:center;">
<pre>
+------------------------------------------------------------------+
|               VIEW LAYER  (Vue.js + Element-UI)                   |
|  +------------------------------------------------------------+  |
|  |  Index / Statistical Overview  |  Earthquake Event List   |  |
|  |  Detail Information Page  |  Latest Opinion Feed          |  |
|  |  Distribution Map (MapTalks)  |  Location Event Line       |  |
|  |  User / Role Management  |  Login  |  Documentation        |  |
|  +------------------------------------------------------------+  |
+------------------------------------------------------------------+
                           |  AXIOS (async API calls)
+------------------------------------------------------------------+
|                   DATA LAYER                                      |
|  +------------------------------------------------------------+  |
|  |  Mock Layer  (static JS — fixed pages, login simulation)  |  |
|  |  Background Data Layer  (REST → back-end at :8000)        |  |
|  +------------------------------------------------------------+  |
+------------------------------------------------------------------+
                           |  HTTP POST  /linktype/linkNo?attr=?
+------------------------------------------------------------------+
|                   BACK-END SYSTEM  (Team)                         |
|  +------------------------------------------------------------+  |
|  |  NLP / Crawler Models  (Weibo + SINA News scraping)       |  |
|  |  Event Fusion Engine  |  Data Classification & Storage    |  |
|  |  REST API Server  (Django / Flask — teammate's scope)     |  |
|  +------------------------------------------------------------+  |
+------------------------------------------------------------------+
                           |  Raw Data Sources
+------------------------------------------------------------------+
|                   EXTERNAL DATA                                   |
|  +------------------------------------------------------------+  |
|  |  Weibo  (personal posts, comments, reposts)               |  |
|  |  SINA News  (certified media, official seismic channels)  |  |
|  |  jsDelivr CDN  (static resources via GitHub releases)     |  |
|  +------------------------------------------------------------+  |
+------------------------------------------------------------------+
</pre>
</div>

### Event Detail Page Components

<div style="display:flex; justify-content:center;">
<pre>
         User selects Earthquake Event
                      |
                      v
         Detail Information Page
                      |
       +--------------+--------------+
       |              |              |
       v              v              v
  Heat Theme     Word Clouds    Pie Charts
  River Chart    (Heat Cloud    (forward /
  (social heat   + Topic Cloud) media / source
   over time)         |         breakdown)
       |               v              |
       |         Weibo search    Legend-driven
       |         redirection     dynamic update
       |
       v
  China Distribution Map
  (per-event Weibo/News density)
       |
       v
  Knowledge Graph
  (entity-relation, drag & zoom)
       |
       v
  Event / Location Timeline
  (chronological, cross-page re-search)
       |
       v
  Source Data List
  (Weibo posts + News articles,
   each linking to original source)
</pre>
</div>

### Page Coverage

| Page                    | Core Features                                                                                                                    |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Index**               | Total event & opinion counts, monthly trend line chart, magnitude pie chart, national earthquake & opinion distribution heatmaps |
| **Earthquake Events**   | Full data table with region colour-coding, credibility filter, fuzzy region search, pagination                                   |
| **Detail Information**  | Heat river, word clouds (heat + topic), pie charts, per-event China map, knowledge graph, event-line, source data list           |
| **Latest Opinion**      | Real-time top-1000 Weibo opinions + News articles, relevance filter, engagement metrics, source redirection                      |
| **Distribution Map**    | MapTalks 2D/3D China map, per-event markers with hover cards, viewport self-adaptation, browsing history tracking                |
| **Location Event Line** | Chronological earthquake history per location, credibility & area search, redirection to detail pages                            |
| **Documentation**       | Sunburst logic map, JsDelivr-hosted markdown docs, dependency & version table, vertical update timeline                          |
| **User / Role Mgmt**    | Admin CRUD interfaces for user accounts and role access codes (simulated front-end only)                                         |

---

### Testing & Results

- **White-Box Testing:** Traced every page branch and navigation jump in a flow diagram &mdash; all tested paths returned Success or intermittent partial success (for edge cases with sparse event data); zero hard failures recorded.
- **Black-Box Testing:** Independent user evaluation confirmed the system met functional expectations with no severe defects, with feedback requesting broader disaster type and media platform coverage.
- **Pressure Testing (Postman):** Ran 100 iterations across all Detail and Opinion page API endpoints (1,800 total requests) with a 1,000ms response time threshold &mdash; **only 2 requests exceeded the threshold**, yielding a **99.9% pass rate** and confirming back-end stability under concurrent load.
- **Live Deployment:** System successfully deployed and served at `http://152.136.59.62/` with all pages operational and data updated in real time during active back-end processing.

<div class="skill-group">
  <div class="skill-list">
    <div class="skill-pill">
      <i class="fa-brands fa-vuejs skill-icon"></i>
      Vue.js
    </div>
    <div class="skill-pill">
      <i class="fa-brands fa-js skill-icon"></i>
      JavaScript (ES6+)
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-layer-group skill-icon"></i>
      Element-UI
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-chart-pie skill-icon"></i>
      E-Charts
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-map-location-dot skill-icon"></i>
      MapTalks
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-rotate skill-icon"></i>
      AXIOS / AJAX
    </div>
    <div class="skill-pill">
      <i class="fa-brands fa-github skill-icon"></i>
      jsDelivr CDN
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-diagram-project skill-icon"></i>
      Knowledge Graph
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-cloud skill-icon"></i>
      Word Cloud
    </div>
    <div class="skill-pill">
      <i class="fa-brands fa-html5 skill-icon"></i>
      HTML / CSS
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-route skill-icon"></i>
      Vue Router
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-vial skill-icon"></i>
      Postman (Load Testing)
    </div>
    <div class="skill-pill">
      <i class="fa-brands fa-linux skill-icon"></i>
      Linux Server
    </div>
    <div class="skill-pill">
      <i class="fa-brands fa-github skill-icon"></i>
      Git / GitHub
    </div>
  </div>
</div>

<div class="wrapper-404">
  <div class="flash-overlay"></div>
  <div class="scene">
    <div class="camera">
      <div class="camera-body">
        <div class="texture-overlay"></div>
        <div class="flash-bulb"></div>
        <div class="lens">
          <div class="glass-reflex"></div>
        </div>
        <div class="stripe"></div>
        <div class="led-indicator"></div>
      </div>
    </div>
    <div class="polaroid-group">
      <div class="polaroid">
        <div class="photo-container">
          <img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23181f2a'/%3E%3Ccircle cx='200' cy='150' r='68' fill='%2322c55e' fill-opacity='0.18'/%3E%3Crect x='82' y='240' width='236' height='14' rx='7' fill='%23dcfce7' fill-opacity='0.9'/%3E%3Crect x='108' y='270' width='184' height='12' rx='6' fill='%2394a3b8' fill-opacity='0.8'/%3E%3Ccircle cx='120' cy='160' r='6' fill='%2386efac'/%3E%3Ccircle cx='160' cy='140' r='5' fill='%2386efac'/%3E%3Ccircle cx='200' cy='155' r='7' fill='%2322c55e'/%3E%3Ccircle cx='245' cy='135' r='5' fill='%2386efac'/%3E%3Ccircle cx='285' cy='150' r='6' fill='%2386efac'/%3E%3Cpath d='M80 200 Q140 170 200 180 Q260 190 320 165' stroke='%2334d399' stroke-width='2' fill='none' stroke-dasharray='4 2'/%3E%3Ctext x='200' y='92' text-anchor='middle' font-family='Arial' font-size='20' fill='white'%3EDisaster Monitor%3C/text%3E%3C/svg%3E"
            class="travolta-img"
            alt="Disaster Monitoring Website"
          />
          <div class="chemical-layer"></div>
        </div>
        <div class="bottom-label">
          <div class="error-text">Want the full resume?</div>
          <div class="comic-brutal-button-container" style="padding: 0;">
            <button class="comic-brutal-button" onclick="window.location.href='/about/'">
              <div class="button-inner">
                <span class="button-text">View Resume</span>
                <div class="halftone-overlay"></div>
                <div class="ink-splatter"></div>
              </div>
              <div class="button-shadow"></div>
              <div class="button-frame"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
