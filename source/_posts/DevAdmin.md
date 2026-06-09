---
title: 🌐 Network Automation & Monitoring Platform @ CTA
date: 2024-06-01
cover: /images/DevAdmin_bg.png
categories:
  - Projects
tags:
  - Network Automation
  - Django
  - Nornir
  - SNMP Monitoring
  - Backbone Network
  - NOC Platform
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
    <span><i class="fa-solid fa-location-dot"></i> Los Angeles, United States</span>
    <span class="separator">|</span>
    <span><i class="fa-regular fa-calendar"></i> 2024 – Present</span>
  </div>
</div>

<div class="cv-glass-wrap">
  <div class="cv-glass-card">
    <p class="cv-glass-title"><b>Problem and Work Scope</b></p>
    <p class="cv-glass-desc">
      Managing a multi-vendor backbone network across <b>10+ data center cages and 100+ network devices</b> demands real-time visibility, rapid incident response, and repeatable operational workflows. Manual CLI-based monitoring does not scale. 
    </p>
    <p class="cv-glass-desc">
      <b>DevAdmin</b> is a full-stack network automation and monitoring platform I designed and built from the ground up to solve this &mdash; providing <b>centralized device management, automated health monitoring, traffic analytics, configuration lifecycle management, and intelligent alerting</b> for the AS36678 backbone network.
    </p>
  </div>
</div>

---

### 🏗️ Multi-Vendor Device Management

- **Unified Inventory:** Centralized device registry supporting **Cisco IOS/XE, IOS XR, NX-OS** and **Juniper Junos** with per-device metadata including location, model, series, connection protocol, and monitoring toggles.
- **Encrypted Credentials:** All SSH/Telnet and SNMPv3 credentials are encrypted at the field level using **django-cryptography**, ensuring secrets are protected at rest in the database.
- **Multi-Protocol Access:** Supports SSH, Telnet, SNMPv3, and gNMI connections per device with configurable timeouts and ports, adapting to heterogeneous network environments.
- **Bulk Onboarding:** Excel-based bulk device import via **openpyxl** allows NOC teams to onboard entire PoPs in a single upload.

### 🔧 Real-Time Network Monitoring

- **Interface Health Tracking:** Continuous monitoring of physical, protocol, and administrative interface states across all managed devices with automatic change detection and event logging.
- **BGP Peer Monitoring:** Tracks BGP neighbor sessions including state, peer type (eBGP/iBGP), accepted prefix count, and session uptime &mdash; with alerts on peer state transitions.
- **IS-IS Neighbor Discovery:** Automated IS-IS adjacency monitoring feeds the backbone link auto-discovery engine, mapping the network topology in real time.
- **RPKI Validation:** Monitors RPKI sessions on edge routers to ensure route origin validation is active and healthy, supporting **MANRS** compliance.
- **VLAN & MAC Tracking:** Layer 2 visibility through VLAN membership and MAC address table collection for switch environments.
- **Device Reachability:** Scheduled ICMP-based reachability checks (**ping3**) with automatic status flagging and NOC email alerts on device down events.

### 📊 Traffic Analytics & Telemetry

- **SNMPv3 Traffic Polling:** High-frequency interface counter collection (every 5 minutes) via **pysnmp** with SNMPv3 authentication and privacy, stored as raw traffic samples.
- **Multi-Granularity Aggregation:** Automated aggregation pipeline compresses raw samples into **5-minute, 30-minute, 2-hour, and 1-day** time-series buckets for efficient long-term storage and dashboard rendering.
- **Akvorado Integration:** Deep traffic flow analytics through integration with the **Akvorado** NetFlow/sFlow collector for per-flow visibility.
- **Telemetry Subscriptions:** gNMI-based model-driven telemetry with configurable YANG sensor paths and sample intervals per device.

### ⚙️ Automation Engineering

- **Nornir Orchestration:** All device interactions are parallelized through the **Nornir** automation framework with **Netmiko** transport, executing tasks concurrently across 100+ devices with configurable worker pools.
- **TextFSM Parsing:** Structured data extraction from raw CLI output using **TextFSM** templates and **ntc-templates**, covering 10+ command types across Cisco and Juniper platforms.
- **Daily Configuration Backup:** Automated nightly config collection and versioned storage for all managed devices, with configurable retention and stale config cleanup.
- **Prefix List & ACL Management:** Automated customer prefix list and ACL generation, validation against IRR/ROA data, and push to edge routers with change verification.
- **Bogon List Updates:** Daily automated bogon prefix list retrieval and device-level ACL updates to filter invalid routes.

### 🤖 Intelligent Alerting System

- **State-Change Detection:** The backend engine maintains in-memory snapshots of the previous monitoring cycle and performs diff-based change detection &mdash; only true state transitions trigger alerts.
- **14 Email Templates:** Purpose-built notification templates covering device down, interface flap, BGP peer loss, backbone circuit disruption, RPKI session failure, config change review, and more.
- **Exchange Integration:** Email delivery via **Microsoft Exchange** using OAuth/NTLM authentication through the **exchangelib** library, with per-device notification recipient lists.
- **Event Log Retention:** All network events are timestamped and stored in a queryable event log with 7+ day retention for post-incident analysis.

### Platform Architecture

<div style="display:flex; justify-content:center;">
<pre>
+------------------------------------------------------------------+
|                    WEB UI LAYER (Django)                          |
|  +------------------------------------------------------------+  |
|  |  SimpleUI Admin Dashboard                                  |  |
|  |  Network Topology Visualization                            |  |
|  |  Traffic Analytics (Akvorado)                              |  |
|  |  Syslog Query (Loki)  |  BGP Route Query (OpenBMP)        |  |
|  |  RESTful APIs  |  Config Viewer  |  Event Logs             |  |
|  +------------------------------------------------------------+  |
+------------------------------------------------------------------+
                            |  Read / Write
+------------------------------------------------------------------+
|                  DATABASE LAYER (MySQL + PostgreSQL)              |
|  +------------------------------------------------------------+  |
|  |  Device Inventory & Encrypted Credentials                  |  |
|  |  Interface State  |  BGP Peers  |  IS-IS Adjacencies       |  |
|  |  Traffic Samples (Raw & Aggregated Time-Series)            |  |
|  |  Backbone Circuits  |  RPKI Sessions  |  VLAN/MAC Tables   |  |
|  |  Config Backups  |  Events Log  |  Change Tasks            |  |
|  +------------------------------------------------------------+  |
+------------------------------------------------------------------+
                            |  Query / Update
+------------------------------------------------------------------+
|              BACKEND AUTOMATION LAYER (Python / Nornir)           |
|  +------------------------------------------------------------+  |
|  |  Main Monitoring Loop (BackendService)                     |  |
|  |  +------------------------------------------------------+  |  |
|  |  |  Nornir Worker Pool (100+ concurrent connections)    |  |  |
|  |  |  Platform Parsers (Cisco IOS/XR/NX-OS, Juniper)     |  |  |
|  |  |  TextFSM Structured Data Extraction                  |  |  |
|  |  |  State-Change Detection Engine                       |  |  |
|  |  +------------------------------------------------------+  |  |
|  |                                                            |  |
|  |  Scheduled Tasks (24 cron-driven pipelines)                |  |
|  |  +------------------------------------------------------+  |  |
|  |  |  Traffic Polling (SNMPv3, every 5 min)               |  |  |
|  |  |  Reachability Checks  |  Config Backups              |  |  |
|  |  |  Bogon/ROA Updates  |  Backbone Stability Checks     |  |  |
|  |  |  Prefix List & ACL Sync  |  Log Collection           |  |  |
|  |  +------------------------------------------------------+  |  |
|  |                                                            |  |
|  |  Email Alert Engine (Exchange / 14 notification templates) |  |
|  +------------------------------------------------------------+  |
+------------------------------------------------------------------+
                            |  SSH / Telnet / SNMPv3 / gNMI
+------------------------------------------------------------------+
|                    MANAGED NETWORK (AS36678)                      |
|  +------------------------------------------------------------+  |
|  |  Cisco IOS/XE  |  Cisco IOS XR  |  Cisco NX-OS            |  |
|  |  Juniper Junos  |  OTN/SDH Transport                      |  |
|  |  10+ Data Center Cages  |  100+ Backbone Devices           |  |
|  +------------------------------------------------------------+  |
+------------------------------------------------------------------+
</pre>
</div>

### Monitoring Loop & Data Pipeline

<div style="display:flex; justify-content:center;">
<pre>
              Device Inventory (MySQL)
                        |
                        v
              Nornir Worker Pool
              (Parallel SSH/Telnet)
                        |
                        v
          +-------------+-------------+
          |             |             |
          v             v             v
     Cisco Tasks   Juniper Tasks   SNMP Poller
    (IOS/XR/NXOS)   (Junos)       (pysnmp v3)
          |             |             |
          v             v             v
     TextFSM Parse  TextFSM Parse  Counter Calc
          |             |             |
          +------+------+------+------+
                 |             |
                 v             v
           State-Change     Traffic Raw
            Detection       Samples DB
                 |             |
                 v             v
          +------+------+  Aggregation
          |      |      |  (5m/30m/2h/1d)
          v      v      v       |
       Events  Email   DB      v
        Log    Alert  Update  Traffic
                              Dashboard
</pre>
</div>

### Scheduled Automation Pipeline

The platform runs **24 cron-driven automated tasks** that cover the full operational lifecycle:

| Category                | Tasks                                                                     | Frequency         |
| ----------------------- | ------------------------------------------------------------------------- | ----------------- |
| **Health Monitoring**   | Device reachability, interface info, service checks, syslog server health | Hourly / 2-hourly |
| **Traffic Collection**  | SNMPv3 interface counter polling, multi-granularity aggregation           | Every 5 minutes   |
| **Configuration Mgmt**  | Daily config backup, outdated config cleanup, config diff detection       | Daily             |
| **Routing Security**    | Bogon prefix updates, ROA CSV sync, MANRS compliance checks               | Daily             |
| **Customer Operations** | Prefix list/ACL updates, customer service validation, change task review  | On-demand / Daily |
| **Log & Diagnostics**   | C8000 show-tech retrieval, log collection, backbone stability analysis    | Periodic          |

### Security & Operational Design

- **Field-Level Encryption:** All device credentials and SNMPv3 secrets encrypted at the database column level, not just at transport.
- **Per-Device Monitoring Toggles:** Granular control over which monitoring features are active per device (interface, BGP, ISIS, RPKI, VLAN, telemetry, config backup, alarm).
- **RPKI & MANRS:** Automated ROA validation and bogon filtering to maintain routing security posture in compliance with MANRS (Mutually Agreed Norms for Routing Security).
- **Audit Trail:** Comprehensive event logging with timestamped records of all state changes, configuration modifications, and operational actions.

<div class="skill-group">
  <div class="skill-list">
    <div class="skill-pill">
      <i class="fa-brands fa-python skill-icon"></i>
      Python
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-server skill-icon"></i>
      Django
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-database skill-icon"></i>
      MySQL
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-database skill-icon"></i>
      PostgreSQL
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-network-wired skill-icon"></i>
      Nornir
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-terminal skill-icon"></i>
      Netmiko
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-bell skill-icon"></i>
      SNMPv3 Monitoring
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-satellite-dish skill-icon"></i>
      gNMI Telemetry
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-shield-halved skill-icon"></i>
      RPKI / MANRS
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-file-code skill-icon"></i>
      TextFSM
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-arrows-rotate skill-icon"></i>
      Crontab Automation
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-code-branch skill-icon"></i>
      RESTful APIs
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-envelope skill-icon"></i>
      Exchange Email
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-chart-line skill-icon"></i>
      Akvorado Analytics
    </div>
    <div class="skill-pill">
      <i class="fa-solid fa-lock skill-icon"></i>
      django-cryptography
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
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23181f2a'/%3E%3Ccircle cx='200' cy='150' r='68' fill='%232f81f7' fill-opacity='0.22'/%3E%3Crect x='82' y='240' width='236' height='14' rx='7' fill='%23dbeafe' fill-opacity='0.9'/%3E%3Crect x='108' y='270' width='184' height='12' rx='6' fill='%2394a3b8' fill-opacity='0.8'/%3E%3Cpath d='M118 208 L170 156 L210 188 L266 130 L300 164' stroke='%2360a5fa' stroke-width='12' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ctext x='200' y='92' text-anchor='middle' font-family='Arial' font-size='24' fill='white'%3EDevAdmin%3C/text%3E%3C/svg%3E"
            class="travolta-img"
            alt="DevAdmin Platform Snapshot"
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
