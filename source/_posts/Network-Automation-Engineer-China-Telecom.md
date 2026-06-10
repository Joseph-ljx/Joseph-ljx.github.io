---
title: 💼 Network & Automation Engineer @ China Telecom Americas
date: 2023-08-20
cover: /images/NE_3.png
categories:
  - Work Experience
tags:
  - Network Automation
  - Backbone Network
  - Django
  - NOC Platform
  - Full Stack
---

<style>
  .skill-group {
    margin-bottom: 2rem;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  }

  .skill-title {
    margin-bottom: 1rem;
    font-size: 1.25rem;
    font-weight: 700;
    color: #333;
  }

  .skill-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

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

  .skill-pill:hover {
    border-color: #3b82f6;
    color: #2563eb;
    transform: translateY(-1px);
    background-color: white;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  }

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
      China Telecom Americas operates a multi-site backbone environment — the <b>AS36678</b> network — spanning 10 US data center cages with 100+ routers, switches, and transport circuits. Day-to-day NOC operations were burdened by manual email triage for OTN alarms, disconnected spreadsheets for circuit tracking, ad-hoc vendor maintenance coordination, and no centralized visibility into infrastructure health.
    </p>
    <p class="cv-glass-desc">
      My role combined <b>hands-on network engineering</b> (Layer 1–3 operations, incident response, routing assurance) with <b>full-stack platform development</b> — designing and building the production internal tooling that powers the NOC today: an automation engine, a circuit intelligence portal, and an AI-assisted operations layer that transforms how the team handles alarms, maintenance, and infrastructure management.
    </p>
  </div>
</div>

---

### 🌐 Backbone Network Operations (AS36678)

- **Layer 1–3 Infrastructure:** Operated and maintained **OTN, SDH, Ethernet, and IP/MPLS VPN** services across the AS36678 backbone, supporting CN2, 163, DWDM, Ciena, Peering, and IRU circuit types.
- **Incident Response & Troubleshooting:** Performed service validation, fault isolation, and recovery across routers, switches, and transport links — spanning **10 US data center cages and 100+ backbone devices**.
- **Routing Assurance:** Implemented **RPKI-based prefix validation** and automated routing health checks to detect anomalies and reduce BGP security risks.
- **Python Network Automation:** Developed device automation scripts using **Netmiko / Nornir / TextFSM** for batch command execution, configuration push, and structured data extraction from multi-vendor CLI output.

### 🏗️ NOC Operations Portal — Full-Stack Platform Development

Built a **production-grade Django web application** from scratch as the single source of truth for all network infrastructure, circuit inventory, and NOC operational workflows across CTA's US infrastructure.

- **Relational Data Model:** Architected a PostgreSQL schema covering multi-type circuits, data center infrastructure (cages, racks, devices, panels/ports), maintenance records, OTN alarm logs, vendor contacts, inventory, and UPS monitoring — with full audit trails via change logs.
- **Operator UI:** Delivered a feature-rich admin interface using **Unfold** with filterable list views, bulk actions, Excel import/export (django-import-export), and role-based access control for NOC staff and administrators.
- **REST API Layer:** Built Django REST Framework endpoints to expose task triggers and data feeds, enabling programmatic workflow control and external dashboard integration.
- **Embedded Monitoring:** Integrated live **Grafana** metric dashboards and **Akvorado** NetFlow visualizations directly into the portal — giving NOC engineers unified traffic and circuit health visibility in one place.

### 🤖 Intelligent Automation & Alarm Processing

- **OTN Alarm Engine:** Built a **Celery**-powered background worker that polls OTN alarm emails from CTG INMS (Beijing) every **5 minutes** via Microsoft Exchange — parsing multi-table HTML bodies with BeautifulSoup, updating circuit health states (outage / recovery), deduplicating by Exchange message-ID, and dispatching **reply-all HTML notifications** with enriched context. Eliminated manual email triage entirely.
- **Vendor Maintenance Automation:** Integrated **Microsoft Exchange (exchangelib)** to auto-scan inbound vendor maintenance notifications, extract circuit IDs and maintenance windows, and create structured database records — replacing manual data entry.
- **Scheduled Reporting:** Automated daily NOC environment health reports (cage temperature, UPS, rectifier) and weekly inventory alerts via **Celery Beat**, with formatted HTML delivery to stakeholders on schedule.
- **Automation Pipelines:** Built **Linux crontab + Python** workflows to parse vendor hotcut emails, generate structured circuit impact reports, and trigger automated alert dispatch to NOC teams.

### 📋 Operational Workflow Systems

- **Maintenance Lifecycle Management:** Built a full-lifecycle internal ticketing system (Initiating → In Progress → Postponed → Rolled Back → Solved → Closed) with severity levels (Sev1–Sev3), multi-party assignments, before/after config snapshots, work progress logs, file attachments, and ZD/vendor ticket cross-referencing.
- **Change Freeze Enforcement:** Developed moratorium period management with automated vendor notification emails, preventing unauthorized changes during critical blackout windows.
- **Circuit State Tracking:** Implemented real-time circuit health state management across the full network inventory, with a strictly-monitored flag for high-value services enabling prioritized alerting.
- **Asset & Inventory Management:** Delivered multi-category inventory tracking with stock thresholds, unit pricing, supplier links, and a purchase request workflow (Pending → Ordered → Received → Cancelled).
- **Follow-Up Ticket System:** Built a lightweight tracking module for ongoing incidents and customer escalations, with circuit linkage, priority levels, file attachments, and external reference URLs.

### 🧠 AI-Assisted Network Intelligence

- **LLM Integration:** Embedded AI-assisted network analysis into the portal, enabling natural-language querying of network state, automated summarization of alarm patterns, and intelligent troubleshooting guidance for NOC engineers.
- **Context-Aware Operations:** Combined real-time circuit inventory, alarm history, and topology data as LLM context — enabling the system to surface actionable insights rather than raw data.

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
      <i class="fa-solid fa-bolt skill-icon"></i>
      Celery / Redis
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-bell skill-icon"></i>
      SNMP Monitoring
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-shield-halved skill-icon"></i>
      RPKI / BGP
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-code-branch skill-icon"></i>
      RESTful APIs
    </div>
    <div class="skill-pill">
      <i class="fa-brands fa-linux skill-icon"></i>
      Linux
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-chart-area skill-icon"></i>
      Grafana / Akvorado
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-envelope skill-icon"></i>
      Microsoft Exchange
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-robot skill-icon"></i>
      LLM / AI Integration
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-arrows-rotate skill-icon"></i>
      Automation Pipelines
    </div>
    <div class="skill-pill">
      <i class="fa-brands fa-docker skill-icon"></i>
      Docker
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-sitemap skill-icon"></i>
      TextFSM
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
