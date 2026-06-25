---
title: 🌐 NOC Operations Portal @ CTA
date: 2026-01-20
cover: /images/cta-portal-cover.png
categories:
  - Projects
tags:
  - Django
  - Full Stack
  - Network Operations
  - Automation
  - Python
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
    <span><i class="fa-solid fa-location-dot"></i> Los Angeles, CA</span>
    <span class="separator">|</span>
    <span><i class="fa-regular fa-calendar"></i> Mar 2025 – Present</span>
  </div>
</div>

<div class="cv-glass-wrap">
  <div class="cv-glass-card">
    <p class="cv-glass-title"><b>Problem and Work Scope</b></p>
    <p class="cv-glass-desc">
      China Telecom Americas' NOC team managed a sprawling network of hundreds of circuits, recurring vendor maintenance windows, and high-volume OTN alarms entirely through manual email triage, disconnected spreadsheets, and ad-hoc tooling &mdash; creating critical blind spots and delayed incident response. 
    </p>
    <p class="cv-glass-desc">
      This motivated the design and development of a <b>production-grade, full-stack internal web portal</b> that consolidates circuit inventory, automates alarm handling, orchestrates maintenance workflows, and embeds real-time monitoring visibility into a single unified platform.
    </p>
  </div>
</div>

---

### 🏗️ Full-Stack Portal Engineering

- **End-to-End Development:** Designed and built a production Django web application from scratch, serving as the **single source of truth** for all network infrastructure, circuit inventory, and NOC operational workflows across CTA's US data centers.
- **Rich Relational Data Model:** Architected a PostgreSQL schema spanning multi-type circuits (CN2, 163, DWDM, Ciena, Peering, IRU), data center infrastructure (cages, racks, devices, panels/ports), maintenance records, inventory, vendor contacts, and OTN alarms &mdash; with full **audit trails** via change logs and parent/child circuit relationships.
- **Advanced Admin Interface:** Delivered a feature-rich operator UI using **Unfold** with filterable list views, bulk actions, Excel import/export (django-import-export), and role-based access control for NOC staff and administrators.
- **REST API Layer:** Built Django REST Framework endpoints to expose task triggers and data feeds, enabling programmatic workflow control and integration with external dashboards.

### 🤖 Intelligent Automation & Alarm Processing

- **OTN Alarm Engine:** Implemented a **Celery**-powered background worker that polls OTN alarm emails from CTG INMS every **5 minutes**, parses multi-table HTML email bodies with BeautifulSoup, extracts affected customer and supplier data, updates circuit health states (outage / recovery), deduplicates by Exchange message-id, and fires **reply-all HTML notifications** with enriched context &mdash; eliminating manual email triage entirely.
- **Vendor Maintenance Automation:** Integrated with **Microsoft Exchange** via exchangelib to auto-scan inbound vendor maintenance notifications, extract circuit IDs and maintenance windows, and create structured database records &mdash; drastically reducing manual data-entry workload.
- **Scheduled Reporting Pipeline:** Automated daily NOC environment health reports (cage temperature, UPS, rectifier status) and weekly inventory low-stock alerts via **Celery Beat**, with formatted HTML email delivery to relevant stakeholders on schedule.
- **Timezone-Aware Processing:** Handled multi-timezone coordination between Beijing (CST) and Los Angeles (PST/PDT), ensuring all alarm timestamps and maintenance windows are correctly converted and displayed.

### 📊 Network Visibility & Monitoring

- **Grafana & Akvorado Integration:** Embedded live **Grafana** metric dashboards and **Akvorado** netflow traffic visualizations directly into the portal, giving NOC engineers a unified view of circuit utilization and traffic patterns without switching tools.
- **Real-Time Circuit State Tracking:** Implemented circuit health state management across the full network inventory, with a **strictly-monitored flag** for high-value services enabling prioritized alerting and targeted notifications.
- **Power & UPS Monitoring:** Captured SNMP trap alarms from PDUs and UPS units, tracking source, trap type, and system uptime &mdash; surfaced directly in the portal dashboard.
- **Geographic Topology Mapping:** Mapped data center cage locations with geographic coordinates for visual infrastructure planning and cross-site connectivity awareness.

### 🔧 Operational Workflow Systems

- **Maintenance Lifecycle Management:** Built a full-lifecycle internal ticketing system (Initiating → In_Progress → Postponed → Rolled_Back → Solved → Closed) with severity levels (Sev1–Sev3, Minor), multi-party assignments (Initiator / Reviewer / Follower), before/after configuration snapshots, step-by-step work progress logs, file attachments, and ZD/vendor ticket cross-referencing.
- **Moratorium Period Enforcement:** Developed change-freeze window management with automated vendor moratorium email notifications, preventing unauthorized changes during critical blackout periods.
- **Inventory & Asset Management:** Delivered multi-category inventory tracking (office supplies, fiber equipment, cage accessories) with stock thresholds, unit pricing, supplier links, and a purchase request workflow (Pending → Ordered → Received → Cancelled).
- **Follow-Up Ticket System:** Built a lightweight follow-up tracking module for ongoing incidents and customer escalations, with circuit linkage, priority levels (IMPORTANT / CUSTOMER / NETWORK / OTHER), file attachments, and external reference URLs.

---

### Platform Architecture

<div style="display:flex; justify-content:center;">
<pre>
+------------------------------------------------------------------+
|               WEB UI LAYER  (Django + Unfold)                     |
|  +------------------------------------------------------------+  |
|  |  Unfold Admin Dashboard  |  Circuit Inventory & Search    |  |
|  |  Maintenance Ticket Portal  |  Follow-Up Tracker          |  |
|  |  Grafana (embedded)  |  Akvorado NetFlow (embedded)       |  |
|  |  REST APIs  |  Inventory Manager  |  Power & UPS Monitor  |  |
|  +------------------------------------------------------------+  |
+------------------------------------------------------------------+
                           |  Read / Write
+------------------------------------------------------------------+
|                   DATABASE LAYER  (PostgreSQL)                    |
|  +------------------------------------------------------------+  |
|  |  Circuits (CN2 / 163 / DWDM / Ciena / Peering / IRU)     |  |
|  |  Cages / Racks / Devices / Panels & Ports                 |  |
|  |  Maintenance Records  |  Change Logs  |  OTN Alarm Log    |  |
|  |  Vendor Contacts & Credentials  |  Moratorium Periods     |  |
|  |  Inventory & Assets  |  Follow-Ups  |  Power / UPS Traps  |  |
|  +------------------------------------------------------------+  |
+------------------------------------------------------------------+
                           |  Query / Update
+------------------------------------------------------------------+
|        AUTOMATION LAYER  (Celery + Redis + exchangelib)           |
|  +------------------------------------------------------------+  |
|  |  OTN Alarm Engine  (Celery Beat — every 5 min)            |  |
|  |  +------------------------------------------------------+  |  |
|  |  |  Exchange Scanner → BeautifulSoup HTML Parser        |  |  |
|  |  |  Circuit State Updater  |  Dedup by Message-ID       |  |  |
|  |  |  Auto-Reply Engine  |  Timezone Converter (CST→PST)  |  |  |
|  |  +------------------------------------------------------+  |  |
|  |                                                            |  |
|  |  Vendor Maintenance Scanner  (hourly)                     |  |
|  |  Daily NOC Report Generator  |  Weekly Inventory Alerts   |  |
|  |  Moratorium Notification Engine  (event-driven)           |  |
|  +------------------------------------------------------------+  |
+------------------------------------------------------------------+
                           |  Exchange (IMAP / SMTP)
+------------------------------------------------------------------+
|                      EXTERNAL SYSTEMS                             |
|  +------------------------------------------------------------+  |
|  |  CTG INMS  (OTN Alarm Source, Beijing)                    |  |
|  |  Vendor Email Accounts  (maintenance notifications)       |  |
|  |  Grafana  (137.97.2.111:3000)  |  Akvorado NetFlow        |  |
|  |  Microsoft Exchange Server  |  Stakeholder Recipients     |  |
|  +------------------------------------------------------------+  |
+------------------------------------------------------------------+
</pre>
</div>

### OTN Alarm Processing Pipeline

<div style="display:flex; justify-content:center;">
<pre>
         CTG INMS  (Beijing, CST)
                 |
                 |  OTN Alarm Email  (HTML table body)
                 v
         Microsoft Exchange Mailbox
                 |
         Celery Beat  (every 5 min)
                 |
                 v
         exchangelib Scanner
         (fetch unseen messages only)
                 |
                 v
         BeautifulSoup Parser
         (multi-table HTML extraction)
                 |
          +------+------+
          |             |
          v             v
       Outage        Recovery
       Detected      Detected
     (中断 keyword)  (恢复 keyword)
          |             |
          v             v
       Mark           Mark
       Circuit        Circuit
       Abnormal       Normal
          |             |
          +------+------+
                 |
                 v
         Dedup Check
         (Exchange message-id)
                 |
          +------+------+
          |             |
          v             v
       DB Record     Auto-Reply
       Created       Sent (HTML)
                     CST → PST
                     timestamp
</pre>
</div>

### Scheduled Automation Tasks

The platform runs automated tasks across the full NOC operational lifecycle:

| Category                     | Tasks                                                                                                                           | Frequency        |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| **OTN Alarm Processing**     | Scan CTG INMS alarm emails, parse HTML tables, update circuit outage / recovery states, send reply-all notifications            | Every 5 min      |
| **Vendor Maintenance**       | Scan vendor maintenance email accounts, extract circuit IDs & time windows, create structured DB records                        | Hourly           |
| **Daily NOC Reports**        | Aggregate cage environment metrics (temperature, UPS, rectifier), compile alarm statistics, HTML email delivery to stakeholders | Daily            |
| **Inventory Alerts**         | Low-stock threshold scan across all categories, generate purchase request notifications                                         | Weekly (1st Wed) |
| **Moratorium Notifications** | Change-freeze start / end alerts to vendor contacts, DLR rollback tracking                                                      | Event-driven     |
| **Monthly Reports**          | IP traffic & transport utilization report archival with multi-file attachments                                                  | Monthly          |

---

### Security & Operational Design

- **Role-Based Access Control:** Admin flag at the user model level gates sensitive operations; staff authentication required for maintenance ticket creation, circuit modifications, and system task triggers.
- **Audit Trails:** All circuit and infrastructure changes are recorded in a dedicated change log with timestamps, modified fields, and operator identity &mdash; providing full forensic traceability.
- **Alarm Deduplication:** OTN alarm engine performs message-id-based deduplication against the Exchange server to prevent duplicate DB records and notification storms across polling cycles.
- **Structured Error Logging:** Application-level logging separated by module (`debug.log`, `otn_alarm.log`) with automatic log rotation, ensuring operational visibility without uncontrolled disk growth.
- **Systemd Service Supervision:** All production processes (Gunicorn, PostgreSQL, Redis, Celery worker, Celery Beat) run as independent systemd units with automatic restart-on-failure and 5-second recovery delay, ensuring high availability.

<div class="skill-group">
  <div class="skill-list">
    <div class="skill-pill">
      <i class="fa-brands fa-python skill-icon"></i>
      Python
    </div>
    <div class="skill-pill">
      <svg class="skill-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.146 0h3.924l.56 3.412h1.302c.51 0 .877.195 1.045.566.146.322.09.736-.162 1.17l-1.6 2.684 1.086 6.66H24l-4.097 2.84-1.097-2.125-1.097 2.125L13.612 15l1.097-6.708-1.6-2.684c-.25-.434-.308-.848-.162-1.17.168-.37.535-.566 1.045-.566h1.302L11.146 0zm-5.984 4.79h7.145L11.146 0H5.162l.56 3.412H4.42c-.51 0-.877.195-1.045.566-.146.322-.09.736.162 1.17l1.6 2.684-1.086 6.66H0l4.097 2.84 1.097-2.125 1.097 2.125 4.097-2.84-1.097-6.708 1.6-2.684c.25-.434.308-.848.162-1.17C10.885 4.985 10.518 4.79 10.008 4.79H8.706L8.146 1.378H5.722L5.162 4.79z"/></svg>
      Django
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-database skill-icon"></i>
      PostgreSQL
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-server skill-icon"></i>
      Celery & Redis
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-envelope skill-icon"></i>
      Microsoft Exchange
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-chart-area skill-icon"></i>
      Grafana
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-network-wired skill-icon"></i>
      Akvorado (NetFlow)
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-code-branch skill-icon"></i>
      REST API (DRF)
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-magnifying-glass skill-icon"></i>
      BeautifulSoup
    </div>
    <div class="skill-pill">
      <i class="fa-brands fa-html5 skill-icon"></i>
      HTML / CSS
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-file-excel skill-icon"></i>
      openpyxl / Excel I/O
    </div>
    <div class="skill-pill">
      <i class="fa-brands fa-linux skill-icon"></i>
      Linux (systemd)
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-gears skill-icon"></i>
      Gunicorn / WhiteNoise
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
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23181f2a'/%3E%3Ccircle cx='200' cy='150' r='68' fill='%232f81f7' fill-opacity='0.18'/%3E%3Crect x='82' y='240' width='236' height='14' rx='7' fill='%23dbeafe' fill-opacity='0.9'/%3E%3Crect x='108' y='270' width='184' height='12' rx='6' fill='%2394a3b8' fill-opacity='0.8'/%3E%3Cpath d='M80 210 L130 170 L175 190 L230 140 L280 160 L320 130' stroke='%2360a5fa' stroke-width='10' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ccircle cx='130' cy='170' r='5' fill='%2360a5fa'/%3E%3Ccircle cx='175' cy='190' r='5' fill='%2360a5fa'/%3E%3Ccircle cx='230' cy='140' r='5' fill='%2360a5fa'/%3E%3Ccircle cx='280' cy='160' r='5' fill='%2360a5fa'/%3E%3Ctext x='200' y='92' text-anchor='middle' font-family='Arial' font-size='22' fill='white'%3ECTA Portal%3C/text%3E%3C/svg%3E"
            class="travolta-img"
            alt="CTA NOC Portal"
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
