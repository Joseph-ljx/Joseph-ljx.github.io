---
title: 💼 Network Engineer / Automation System Developer @ China Telecom
date: 2024-05-20
cover: /images/GFlcl3LXwAEexKV.jpg
categories:
  - Experience
tags:
  - Network Automation
  - Backbone Network
  - Django
  - NOC Platform
---

<style>
  /* 容器 */
  .skill-group {
    margin-bottom: 2rem;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  }
  
  /* 标题 */
  .skill-title {
    margin-bottom: 1rem;
    font-size: 1.25rem; /* text-xl */
    font-weight: 700;   /* font-bold */
    color: #333;        /* 适配亮色主题，如果是深色模式可以改 #fff */
  }

  /* 列表布局 */
  .skill-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem; /* gap-2 */
  }

  /* 胶囊样式 */
  .skill-pill {
    display: flex;
    align-items: center;
    gap: 0.5rem; /* gap-2 */
    cursor: default;
    border-radius: 9999px; /* rounded-full */
    
    /* 核心配色 (仿照你的截图) */
    border: 1px solid #e5e5e5;  /* border-neutral-200 (亮色适配) */
    background-color: #f5f5f5;  /* bg-neutral-100 */
    color: #404040;             /* text-neutral-700 */
    
    /* 如果你希望强制黑色背景（如截图），请使用下面这组：
    border: 1px solid #262626;
    background-color: #171717; 
    color: #d4d4d4; 
    */

    padding: 0.5rem 1rem; /* px-4 py-2 */
    font-size: 0.875rem;  /* text-sm */
    transition: all 0.2s ease;
    line-height: 1;
  }

  /* 悬停效果 (蓝色高亮) */
  .skill-pill:hover {
    border-color: #3b82f6; /* hover:border-blue-500 */
    color: #2563eb;        /* hover:text-blue-600 */
    transform: translateY(-1px);
    background-color: white;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  }

  /* SVG 图标尺寸 */
  .skill-icon {
    height: 1rem; 
    width: 1rem;
    fill: currentColor;
  }
</style>

<div class="job-header">
  <div class="job-meta">
    <span><i class="fa-solid fa-location-dot"></i> Los Angeles, United States</span>
    <span class="separator">|</span>
    <span><i class="fa-regular fa-calendar"></i> Aug 2023 – Present</span>
  </div>
</div>

<div class="cv-glass-wrap">
  <div class="cv-glass-card">
    <p class="cv-glass-title"><b>Problem and Work Scope</b></p>
    <p class="cv-glass-desc">
      China Telecom Americas operates a multi-site backbone environment that requires reliable day-to-day operations, faster troubleshooting, and better visibility across devices, circuits, and physical infrastructure. I focused on combining <b>network engineering, automation, and platform development</b> to improve operational efficiency, centralize monitoring, and build scalable workflows for the AS36678 network.
    </p>
  </div>
</div>

---

### 🌐 Network Operations Across AS36678
* **Backbone Operations:** Managed and operated Layer 1-3 infrastructure including **OTN, SDH, Ethernet, and IP/MPLS VPN** services across the **AS36678** backbone network.
* **Incident Response:** Performed operational checks, troubleshooting, and service validation for routers, switches, transport links, and customer-facing circuits.
* **Coverage:** Supported a distributed environment spanning **10 data center cages and 100+ network devices** across the United States.

### 🤖 Automation Engineering For NOC Workflows
* **Python Automation:** Developed automation scripts to configure devices, execute batch commands, perform health checks, and accelerate incident investigation.
* **Scheduled Pipelines:** Built **Linux crontab + Python** workflows to parse vendor hotcut emails, generate structured reports, and trigger automated alerts for NOC teams.
* **Routing Assurance:** Implemented **RPKI-based prefix validation** and automated operational checks to reduce routing risks and improve troubleshooting speed.

### 🏗️ Operations Platform Development
* **Centralized Platform:** Designed and implemented a monitoring and operations platform using **Django Admin + PostgreSQL** with RESTful APIs.
* **Operational Visibility:** Delivered device and circuit inventory, rack and cage topology mapping, operational logs, and UPS **SNMP trap** monitoring in one place.
* **Workflow Support:** Enabled collaboration across operations by tracking tasks, changes, and infrastructure status through a unified backend system.

### 🧩 Key System Architecture
#### Network Automation & Monitoring Platform (AS36678)

Designed and implemented an **automation and monitoring platform** to centrally manage network infrastructure across **10 data center cages and 100+ backbone devices** in the AS36678 network.  
The system provides **topology visualization, configuration automation, alarm monitoring, and operational workflow management** for NOC teams.

#### System Architecture

<div style="display:flex; justify-content:center;">
<pre>
                      +-------------------------+
                      |  Vendor Hotcut Emails   |
                      +-----------+-------------+
                                  |
                                  v
                      +-------------------------+
                      |  Email Parsing Engine   |
                      |  (Python Automation)    |
                      +-----------+-------------+
                                  |
                                  v
                      +-------------------------+
                      |  Automation Framework   |
                      |  (Crontab + Python)     |
                      +-----------+-------------+
                                  |
                                  v
+-----------------+     +------------------------+    +----------------+
| Network Devices | ->  | Data Processing Layer  | -> |  PostgreSQL DB |
| (Routers/Switch)|     | Netmiko / Nornir / API |    |  Asset Storage |
+-----------------+     +------------------------+    +----------------+
                                  |
                                  v
                      +------------------------+
                      | Django Backend System  |
                      | RESTful API Services   |
                      +-----------+------------+
                                  |
                                  v
                  +-------------------------------+
                  | Web Admin / Monitoring Portal |
                  | Topology / Logs / Alarms      |
                  +-------------------------------+
</pre>
</div>

#### Core Features

* **Network Topology Monitoring:** Real-time visualization of data center cages, racks, device connections, and health status for interfaces, circuits, and routing sessions.
* **Configuration Automation:** Batch command execution on network devices with **Netmiko / Nornir**, plus automated validation and operational checks.
* **Alarm & Event Handling:** Device health monitoring via **SNMP traps**, circuit alerting, and automated notifications for NOC engineers.
* **Asset & Operations Management:** Centralized inventory records, topology mapping, change logging, and workflow tracking for daily operations.

#### Automation Pipeline

<div style="display:flex; justify-content:center;">
<pre>
                    Vendor Notification
                            |
                            v
                  Email Parser (Python)
                            |
                            v
                  Event Classification
                            |
                            v
                    Database Storage
                            |
                            v
                      Alert System
                            |
                            v
            NOC Dashboard / Email Notification
</pre>
</div>

<div class="skill-group">
  <div class="skill-list">
    <div class="skill-pill">
      <i class="fa-brands fa-python skill-icon"></i>
      Python
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-network-wired skill-icon"></i>
      Network Operations
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-server skill-icon"></i>
      Django
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-database skill-icon"></i>
      PostgreSQL
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-gears skill-icon"></i>
      Netmiko / Nornir
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-arrows-rotate skill-icon"></i>
      Crontab Automation
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-bell skill-icon"></i>
      SNMP Monitoring
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-shield-halved skill-icon"></i>
      RPKI Validation
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-code-branch skill-icon"></i>
      RESTful APIs
    </div>
    <div class="skill-pill">
      <i class="fa-brands fa-linux skill-icon"></i>
      Linux
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
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23181f2a'/%3E%3Ccircle cx='200' cy='150' r='68' fill='%232f81f7' fill-opacity='0.22'/%3E%3Crect x='82' y='240' width='236' height='14' rx='7' fill='%23dbeafe' fill-opacity='0.9'/%3E%3Crect x='108' y='270' width='184' height='12' rx='6' fill='%2394a3b8' fill-opacity='0.8'/%3E%3Cpath d='M118 208 L170 156 L210 188 L266 130 L300 164' stroke='%2360a5fa' stroke-width='12' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ctext x='200' y='92' text-anchor='middle' font-family='Arial' font-size='24' fill='white'%3EAS36678%3C/text%3E%3C/svg%3E"
            class="travolta-img"
            alt="Resume Snapshot"
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
