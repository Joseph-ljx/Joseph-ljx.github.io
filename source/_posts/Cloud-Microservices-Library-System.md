---
title: 🛠️ Cloud Microservices Library System Project
date: 2023-01-15
cover: /images/aws-project/aws-project.jpg
categories:
  - Project
tags:
  - Cloud Computing
  - Microservices
  - Kubernetes (EKS)
---

<style>
  /* 容器 */
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
    <span><i class="fa-solid fa-location-dot"></i> AWS Cloud</span>
    <span class="separator">|</span>
    <span><i class="fa-regular fa-calendar"></i>Jan 2023 - May 2023</span>
  </div>
</div>

<div class="cv-glass-wrap">
  <div class="cv-glass-card">
    <p class="cv-glass-title"><b>Project Scope</b></p>
    <p class="cv-glass-desc">
      Designed and deployed a <b>cloud-native microservices backend system</b> for managing library operations, enabling scalable handling of customer and book data. 
      The system leverages <b>AWS EKS, Docker, and Kafka</b> to ensure high availability, fault tolerance, and asynchronous processing, while integrating <b>JWT-based authentication and circuit breaker patterns</b> for security and resilience.
    </p>
  </div>
</div>

---

### ☁️ Cloud Architecture & Microservices

- Built a **distributed microservices system** deployed on AWS using **EKS (Kubernetes)** and Docker containers.
- Designed multiple services including **Customer Service, Book Service, BFF layers, and CRM consumer**, ensuring modular and scalable architecture.
- Implemented **health checks, load balancing, and replica-based scaling** for high availability.

<div style="margin: 1.5rem 0; text-align: center;">
  <img src="/images/aws-project/aws-project-topology.png" style="max-width: 100%; border-radius: 12px;" />
</div>

### ⚡ Backend Engineering & API Design

- Developed **30+ RESTful APIs** supporting full CRUD operations with robust error handling (400, 404, 422, 500, 503, 504).
- Implemented **BFF (Backend-for-Frontend) pattern** to tailor responses based on client device (mobile vs desktop).
- Integrated **JWT authentication middleware** for secure, stateless service communication.

### 🔄 Distributed Systems & Messaging

- Designed **Kafka-based asynchronous pipeline**:
  - Customer service acts as producer
  - CRM service consumes events and triggers email notifications
- Enabled **event-driven architecture** to decouple services and improve system responsiveness.

<div style="margin: 1.5rem 0; text-align: center;">
  <img src="/images/aws-project/aws-project-flow.png" style="max-width: 100%; border-radius: 12px;" />
</div>

### 🛡️ Reliability & Resilience Engineering

- Implemented **Circuit Breaker pattern**:
  - Timeout protection (3s threshold)
  - Automatic fail-fast (503) during outage windows
  - Recovery logic with half-open state
- Ensured **graceful degradation under external service failure**

### 🗄️ Data & Cloud Infrastructure

- Integrated **MySQL (local) + AWS RDS (production)** with replication and load balancing.
- Designed secure infrastructure using:
  - VPC, subnets, security groups
  - EC2 for management & operations
- Simulated **ETL pipelines with 200+ test data entries**

<div style="margin: 1.5rem 0; text-align: center;">
  <img src="/images/aws-project/aws-project-vpc.png" style="max-width: 100%; border-radius: 12px;" />
</div>

---

<div class="skill-group">
  <div class="skill-list">
    <div class="skill-pill">Node.js</div>
    <div class="skill-pill">Express.js</div>
    <div class="skill-pill">MySQL</div>
    <div class="skill-pill">AWS</div>
    <div class="skill-pill">Docker</div>
    <div class="skill-pill">Kubernetes (EKS)</div>
    <div class="skill-pill">Kafka</div>
    <div class="skill-pill">JWT</div>
    <div class="skill-pill">REST API</div>
    <div class="skill-pill">Microservices</div>
    <div class="skill-pill">Circuit Breaker</div>
    <div class="skill-pill">Distributed Systems</div>
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
          <img class="travolta-img" alt="Lost"/>
        </div>
        <div class="bottom-label">
          <div class="error-text">Wait... Where are we?</div>
          <div class="comic-brutal-button-container" style="padding: 0;">
            <button class="comic-brutal-button" onclick="window.location.href='/'">
              <div class="button-inner">
                <span class="button-text">Take Me Home</span>
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
