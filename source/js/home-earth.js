import * as THREE from "https://unpkg.com/three@0.154.0/build/three.module.js";

const CONFIG = {
  earthRadius: 10,
  glowRadius: 11.5,
  rotateSpeed: 0.0005
};

let scene;
let camera;
let renderer;
let earthGroup;
let stars;
let animationFrameId;
let sceneObserver;
let isSceneNearViewport = false;
let isAutoRotating = true;
let tweenLoader;
const siteMarkers = {};
let currentPulseTweens = [];

function ensureTween() {
  if (window.TWEEN) {
    return Promise.resolve(window.TWEEN);
  }

  if (!tweenLoader) {
    tweenLoader = new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-home-earth-tween]');

      if (existing) {
        existing.addEventListener("load", () => resolve(window.TWEEN), { once: true });
        existing.addEventListener("error", reject, { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/tween.js/18.6.4/tween.umd.js";
      script.dataset.homeEarthTween = "true";
      script.addEventListener("load", () => resolve(window.TWEEN), { once: true });
      script.addEventListener("error", reject, { once: true });
      document.head.appendChild(script);
    });
  }

  return tweenLoader;
}

function createRealisticEarth() {
  const geometry = new THREE.SphereGeometry(CONFIG.earthRadius, 32, 32);
  const loader = new THREE.TextureLoader();
  const base = "https://cdn.jsdelivr.net/npm/three-globe@2.33.0/example/img/";
  const material = new THREE.MeshPhongMaterial({
    map: loader.load(base + "earth-blue-marble.jpg"),
    bumpMap: loader.load(base + "earth-topology.png"),
    bumpScale: 0.15,
    specularMap: loader.load(base + "earth-water.png"),
    specular: new THREE.Color(0x333333),
    shininess: 15
  });

  earthGroup.add(new THREE.Mesh(geometry, material));
}

function createAtmosphere() {
  const geometry = new THREE.SphereGeometry(CONFIG.glowRadius, 32, 32);
  const material = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      void main() {
        float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 3.0);
        gl_FragColor = vec4(0.0, 0.8, 1.0, 1.0) * intensity * 1.5;
      }
    `,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    transparent: true,
    depthWrite: false
  });

  earthGroup.add(new THREE.Mesh(geometry, material));
}

function createStars() {
  const geometry = new THREE.BufferGeometry();
  const count = 6000;
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < positions.length; index += 1) {
    positions[index] = (Math.random() - 0.5) * 600;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    size: 0.75,
    color: 0xffffff,
    transparent: true,
    opacity: 0.8,
    map: new THREE.TextureLoader().load(
      "https://cdn.jsdelivr.net/npm/three@0.154.0/examples/textures/sprites/disc.png"
    ),
    alphaTest: 0.5
  });

  stars = new THREE.Points(geometry, material);
  scene.add(stars);
}

function latLonToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function addMarker(lat, lon, id) {
  const position = latLonToVector3(lat, lon, CONFIG.earthRadius);
  const markerPosition = position.clone().multiplyScalar(1.25);
  const lineGeometry = new THREE.BufferGeometry().setFromPoints([position, markerPosition]);
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xff0055,
    transparent: true,
    opacity: 0.8
  });
  const dotGeometry = new THREE.SphereGeometry(0.12, 16, 16);
  const dotMaterial = new THREE.MeshBasicMaterial({ color: 0xff0055 });
  const dot = new THREE.Mesh(dotGeometry, dotMaterial);
  const ringGeometry = new THREE.RingGeometry(0.1, 0.3, 32);
  const ringMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0055,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.5
  });
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);

  earthGroup.add(new THREE.Line(lineGeometry, lineMaterial));
  dot.position.copy(markerPosition);
  earthGroup.add(dot);
  ring.position.copy(position.clone().multiplyScalar(1.005));
  ring.lookAt(new THREE.Vector3(0, 0, 0));
  earthGroup.add(ring);
  siteMarkers[id] = dot;
}

function initMarkers() {
  addMarker(34.05, -118.24, "la");
  addMarker(40.44, -79.99, "pittsburgh");
  addMarker(40.65, -73.78, "new york");
  addMarker(-37.8, 144.96, "melbourne");
  addMarker(-34.93, 138.6, "adelaide");
  addMarker(51.52, -0.04, "london");
  addMarker(39.9, 116.4, "beijing");
  addMarker(23.12, 113.26, "guangzhou");
}

function onWindowResize() {
  const container = document.getElementById("scene-container");

  if (!container || !camera || !renderer) {
    return;
  }

  const width = container.clientWidth;
  const height = container.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function checkScroll() {
  const container = document.getElementById("scene-container");

  if (!container) {
    document.body.classList.remove("starry-night");
    return;
  }

  const rect = container.getBoundingClientRect();
  const visible = rect.top <= window.innerHeight * 0.9;
  container.style.opacity = visible ? "1" : "0";
  document.body.classList.toggle("starry-night", visible);

  if (!("IntersectionObserver" in window)) {
    isSceneNearViewport = rect.bottom >= -200 && rect.top <= window.innerHeight + 200;
    syncAnimationState();
  }
}

function shouldRender() {
  return Boolean(renderer && scene && camera && isSceneNearViewport && !document.hidden);
}

function syncAnimationState() {
  if (shouldRender()) {
    if (!animationFrameId) {
      animationFrameId = requestAnimationFrame(animate);
    }
  } else if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = undefined;
  }
}

function animate(time) {
  animationFrameId = undefined;

  if (!shouldRender()) {
    return;
  }

  if (window.TWEEN) {
    window.TWEEN.update(time);
  }

  if (isAutoRotating && earthGroup) {
    earthGroup.rotation.y += CONFIG.rotateSpeed;
  }

  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }

  animationFrameId = requestAnimationFrame(animate);
}

function disposeMaterial(material) {
  Object.values(material).forEach((value) => {
    if (value && value.isTexture) {
      value.dispose();
    }
  });
  material.dispose();
}

export function destroyHomeEarth() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = undefined;
  }

  window.removeEventListener("resize", onWindowResize);
  window.removeEventListener("scroll", checkScroll);
  document.removeEventListener("visibilitychange", syncAnimationState);
  if (sceneObserver) {
    sceneObserver.disconnect();
    sceneObserver = undefined;
  }
  currentPulseTweens.forEach((tween) => tween.stop());
  currentPulseTweens = [];

  if (scene) {
    scene.traverse((object) => {
      if (object.geometry) {
        object.geometry.dispose();
      }
      if (Array.isArray(object.material)) {
        object.material.forEach(disposeMaterial);
      } else if (object.material) {
        disposeMaterial(object.material);
      }
    });
  }

  if (renderer) {
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
  }

  Object.keys(siteMarkers).forEach((key) => delete siteMarkers[key]);
  document.body.classList.remove("starry-night");
  scene = undefined;
  camera = undefined;
  renderer = undefined;
  earthGroup = undefined;
  stars = undefined;
  isSceneNearViewport = false;
  isAutoRotating = true;
}

export function initHomeEarth() {
  const container = document.getElementById("scene-container");

  if (!container || container.querySelector("#scene-container-canvas")) {
    return;
  }

  destroyHomeEarth();
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 33);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.id = "scene-container-canvas";
  container.appendChild(renderer.domElement);

  const sunLight = new THREE.DirectionalLight(0xffffff, 2);
  sunLight.position.set(-50, 20, 30);
  scene.add(sunLight);
  scene.add(new THREE.AmbientLight(0x404040, 0.3));

  const backLight = new THREE.SpotLight(0x00f2ff, 1.5);
  backLight.position.set(0, 20, -50);
  scene.add(backLight);

  earthGroup = new THREE.Group();
  if (window.innerWidth > 768) {
    earthGroup.position.x = -1;
  } else {
    earthGroup.position.y = -6;
  }
  scene.add(earthGroup);

  createStars();
  createRealisticEarth();
  createAtmosphere();
  initMarkers();
  window.addEventListener("resize", onWindowResize);
  window.addEventListener("scroll", checkScroll, { passive: true });
  document.addEventListener("visibilitychange", syncAnimationState);

  const initialRect = container.getBoundingClientRect();
  isSceneNearViewport =
    initialRect.bottom >= -200 && initialRect.top <= window.innerHeight + 200;

  if ("IntersectionObserver" in window) {
    sceneObserver = new IntersectionObserver((entries) => {
      isSceneNearViewport = entries.some((entry) => entry.isIntersecting);
      syncAnimationState();
    }, {
      rootMargin: "200px 0px",
      threshold: 0
    });
    sceneObserver.observe(container);
  }

  checkScroll();
  syncAnimationState();
}

window.focusLocation = async function focusLocation(lat, lon, id) {
  if (!earthGroup) {
    return;
  }

  const TWEEN = await ensureTween();
  if (!TWEEN || !earthGroup) {
    return;
  }

  isAutoRotating = false;
  new TWEEN.Tween(earthGroup.rotation)
    .to({
      x: lat * (Math.PI / 180),
      y: -(lon * Math.PI / 180) - Math.PI / 2,
      z: 0
    }, 1500)
    .easing(TWEEN.Easing.Cubic.InOut)
    .start();

  currentPulseTweens.forEach((tween) => tween.stop());
  currentPulseTweens = [];

  Object.values(siteMarkers).forEach((dot) => {
    dot.scale.set(1, 1, 1);
    dot.material.color.setHex(0xff0055);
    dot.material.opacity = 1;
  });

  const target = siteMarkers[id];
  if (target) {
    const scaleTween = new TWEEN.Tween(target.scale)
      .to({ x: 3, y: 3, z: 3 }, 1000)
      .yoyo(true)
      .repeat(Infinity)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
    const colorTween = new TWEEN.Tween(target.material.color)
      .to({ r: 0.7, g: 0, b: 1 }, 1000)
      .yoyo(true)
      .repeat(Infinity)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();

    currentPulseTweens.push(scaleTween, colorTween);
  }
};

window.resetView = async function resetView() {
  if (!earthGroup) {
    return;
  }

  const TWEEN = await ensureTween();
  if (!TWEEN || !earthGroup) {
    return;
  }

  isAutoRotating = true;
  currentPulseTweens.forEach((tween) => tween.stop());
  currentPulseTweens = [];
  Object.values(siteMarkers).forEach((dot) => {
    dot.scale.set(1, 1, 1);
    dot.material.color.setHex(0xff0055);
  });
  new TWEEN.Tween(earthGroup.rotation).to({ x: 0, z: 0 }, 1000).start();
};
