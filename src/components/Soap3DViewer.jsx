import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { SOAP_PRODUCTS } from '../data/soaps';

/**
 * Soap3DViewer - Interactive 3D Product Box for Ananta Vijaya / Lotica Glow Soaps
 *
 * Renders an exact 90 x 60 x 35 mm 3D soap box packaging in Three.js with:
 * - High-definition packaging textures on all 6 faces
 * - Shared GPU texture cache across instances and switches to prevent black frames
 * - Instantaneous smooth texture swapping without scene recreation
 * - Touch & mouse 360° drag rotation with smooth damping
 * - Scroll / pinch zoom
 * - Gentle ambient floating & auto-rotation
 * - Transparent background floating over pedestal
 * - Subtle reset / interaction controls
 */

// Global shared texture cache across all soaps & switches
const textureCache = new Map();
let hasPreloadedAll = false;

function getTexture(url, maxAnisotropy = 4, onLoaded) {
  if (!url || typeof window === 'undefined') return null;

  if (textureCache.has(url)) {
    const tex = textureCache.get(url);
    if (tex.image && tex.image.complete && tex.image.naturalWidth !== 0) {
      if (onLoaded) setTimeout(onLoaded, 0);
    } else if (onLoaded && tex.image) {
      tex.image.addEventListener('load', () => onLoaded(), { once: true });
    }
    return tex;
  }

  const loader = new THREE.TextureLoader();
  const tex = loader.load(url, () => {
    if (onLoaded) onLoaded();
  });
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  textureCache.set(url, tex);
  return tex;
}

function preloadAllSoapTextures(products, maxAnisotropy = 4) {
  if (hasPreloadedAll || typeof window === 'undefined' || !products) return;
  hasPreloadedAll = true;
  products.forEach((p) => {
    if (p && p.textures3d) {
      ['right', 'left', 'top', 'bottom', 'front', 'back'].forEach((face) => {
        if (p.textures3d[face]) {
          getTexture(p.textures3d[face], maxAnisotropy);
        }
      });
    }
  });
}

// Background preload on idle
if (typeof window !== 'undefined') {
  setTimeout(() => {
    try {
      preloadAllSoapTextures(SOAP_PRODUCTS);
    } catch {
      // safe fallback for SSR
    }
  }, 50);
}

export default function Soap3DViewer({
  textures,
  dimensions = [9, 6, 3.5],
  cameraDistance = 17.5,
  initialRotation = [0.35, 0.68],
  autoRotate = true,
  title = 'Kamalam Soap',
  className = '',
  pillClassName = ''
}) {
  const mountRef = useRef(null);
  const soapMeshRef = useRef(null);
  const materialsRef = useRef([]);
  const rendererRef = useRef(null);

  const [isRotating, setIsRotating] = useState(autoRotate);
  const [, setHasInteracted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // References to control Three.js scene externally
  const controlsRef = useRef({
    reset: () => {},
    toggleRotation: () => {}
  });

  // 1. Initial Scene Setup (runs once per mount)
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // SCENE SETUP
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0, cameraDistance);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);

    const canvas = renderer.domElement;
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.outline = 'none';
    mount.appendChild(canvas);
    rendererRef.current = renderer;

    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    preloadAllSoapTextures(SOAP_PRODUCTS, maxAnisotropy);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(-4, 7, 12);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
    fillLight.position.set(8, 3, -5);
    scene.add(fillLight);

    const bottomBounce = new THREE.DirectionalLight(0xf5e8d0, 0.5);
    bottomBounce.position.set(0, -6, 6);
    scene.add(bottomBounce);

    // MATERIALS & TEXTURES
    let loadedCount = 0;
    const onFaceLoaded = () => {
      loadedCount++;
      if (loadedCount >= 6) {
        setIsLoaded(true);
      }
    };

    const createMaterial = (url) => {
      const tex = getTexture(url, maxAnisotropy, onFaceLoaded);
      return new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.92,
        metalness: 0.04,
        side: THREE.FrontSide,
        color: 0xffffff
      });
    };

    // Three.js BoxGeometry face order: right (+x), left (-x), top (+y), bottom (-y), front (+z), back (-z)
    const materials = [
      createMaterial(textures?.right),
      createMaterial(textures?.left),
      createMaterial(textures?.top),
      createMaterial(textures?.bottom),
      createMaterial(textures?.front),
      createMaterial(textures?.back)
    ];
    materialsRef.current = materials;

    const [dimX, dimY, dimZ] = dimensions;
    const geometry = new THREE.BoxGeometry(dimX, dimY, dimZ);
    const soapMesh = new THREE.Mesh(geometry, materials);
    scene.add(soapMesh);
    soapMeshRef.current = soapMesh;

    // INITIAL ORIENTATION & STATE
    const DEFAULT_ROT_X = initialRotation[0] !== undefined ? initialRotation[0] : 0.35;
    const DEFAULT_ROT_Y = initialRotation[1] !== undefined ? initialRotation[1] : 0.68;
    const DEFAULT_ZOOM = cameraDistance;

    let targetX = DEFAULT_ROT_X;
    let targetY = DEFAULT_ROT_Y;
    let zoom = DEFAULT_ZOOM;
    let rotating = autoRotate;
    let userWantsSpin = autoRotate;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let idleTimer = null;

    soapMesh.rotation.set(targetX, targetY, 0);

    // RESIZE OBSERVER
    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(mount);
    handleResize();

    // INTERACTION HELPERS
    const scheduleAutoResume = () => {
      if (!userWantsSpin) return;
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        rotating = true;
        setIsRotating(true);
      }, 3500);
    };

    controlsRef.current.reset = () => {
      targetX = DEFAULT_ROT_X;
      targetY = DEFAULT_ROT_Y;
      zoom = DEFAULT_ZOOM;
      userWantsSpin = true;
      rotating = true;
      setIsRotating(true);
      if (idleTimer) clearTimeout(idleTimer);
    };

    controlsRef.current.toggleRotation = () => {
      userWantsSpin = !userWantsSpin;
      rotating = userWantsSpin;
      setIsRotating(userWantsSpin);
      if (!rotating && idleTimer) clearTimeout(idleTimer);
    };

    // POINTER EVENTS
    const onPointerDown = (e) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      mount.setPointerCapture?.(e.pointerId);
      rotating = false;
      setIsRotating(false);
      setHasInteracted(true);
      if (idleTimer) clearTimeout(idleTimer);
    };

    const onPointerMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      targetY += dx * 0.008;
      targetX += dy * 0.008;
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const onPointerUp = () => {
      if (dragging) {
        dragging = false;
        scheduleAutoResume();
      }
    };

    const onPointerCancel = () => {
      if (dragging) {
        dragging = false;
        scheduleAutoResume();
      }
    };

    // WHEEL ZOOM
    const minZoom = cameraDistance * 0.65;
    const maxZoom = cameraDistance * 1.5;
    const onWheel = (e) => {
      e.preventDefault();
      setHasInteracted(true);
      zoom = Math.max(minZoom, Math.min(maxZoom, zoom + e.deltaY * 0.015));
      scheduleAutoResume();
    };

    // TOUCH PINCH ZOOM
    let initialPinchDistance = 0;
    const onTouchMove = (e) => {
      if (e.touches.length === 2) {
        const a = e.touches[0];
        const b = e.touches[1];
        const distance = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
        if (initialPinchDistance > 0) {
          const delta = initialPinchDistance - distance;
          zoom = Math.max(minZoom, Math.min(maxZoom, zoom + delta * 0.035));
        }
        initialPinchDistance = distance;
      }
    };

    const onTouchEnd = () => {
      initialPinchDistance = 0;
    };

    mount.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    mount.addEventListener('pointercancel', onPointerCancel);
    mount.addEventListener('wheel', onWheel, { passive: false });
    mount.addEventListener('touchmove', onTouchMove, { passive: true });
    mount.addEventListener('touchend', onTouchEnd, { passive: true });

    // ANIMATION LOOP
    let animId = null;
    let lastTime = performance.now();

    const animate = (currentTime) => {
      animId = requestAnimationFrame(animate);
      const dt = Math.min(0.06, (currentTime - lastTime) / 1000);
      lastTime = currentTime;

      // Gentle auto-spin when enabled
      if (rotating) {
        targetY += dt * 0.35;
      }

      // Smooth damping interpolation
      soapMesh.rotation.x += (targetX - soapMesh.rotation.x) * Math.min(1, dt * 10);
      soapMesh.rotation.y += (targetY - soapMesh.rotation.y) * Math.min(1, dt * 10);
      camera.position.z += (zoom - camera.position.z) * Math.min(1, dt * 9);

      // Subtle gentle floating on top of pedestal
      soapMesh.position.y = Math.sin(currentTime * 0.0016) * 0.22;

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    // CLEANUP
    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (idleTimer) clearTimeout(idleTimer);
      resizeObserver.disconnect();

      mount.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      mount.removeEventListener('pointercancel', onPointerCancel);
      mount.removeEventListener('wheel', onWheel);
      mount.removeEventListener('touchmove', onTouchMove);
      mount.removeEventListener('touchend', onTouchEnd);

      geometry.dispose();
      materials.forEach((mat) => mat.dispose());
      renderer.dispose();

      if (canvas.parentNode === mount) {
        mount.removeChild(canvas);
      }
      soapMeshRef.current = null;
      materialsRef.current = [];
      rendererRef.current = null;
    };
  }, []);

  // 2. Smooth Texture Update on Prop Change (without tearing down Three.js scene)
  useEffect(() => {
    if (!materialsRef.current.length || !textures) return;
    const materials = materialsRef.current;
    const maxAnisotropy = rendererRef.current ? rendererRef.current.capabilities.getMaxAnisotropy() : 4;
    const faces = ['right', 'left', 'top', 'bottom', 'front', 'back'];

    faces.forEach((face, idx) => {
      const url = textures[face];
      if (url && materials[idx]) {
        const tex = getTexture(url, maxAnisotropy);
        if (materials[idx].map !== tex) {
          materials[idx].map = tex;
          materials[idx].needsUpdate = true;
        }
      }
    });
    setIsLoaded(true);
  }, [textures]);

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center select-none ${className}`}
      style={{ touchAction: 'none' }}
    >
      {/* 3D Canvas Mount with zero-black-flash opacity transition */}
      <div
        ref={mountRef}
        className={`w-full h-full cursor-grab active:cursor-grabbing relative z-10 transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        title={`${title} - Drag to rotate in 360°, scroll to zoom`}
      />

      {/* Subtle 360° Interaction Hint & Controls */}
      <div className={`absolute inset-x-0 z-20 flex items-center justify-center gap-2 pointer-events-none px-2 ${pillClassName || '-bottom-10 sm:-bottom-16'}`}>
        <div className="pointer-events-auto flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/85 backdrop-blur-md border border-[#C59A45]/30 shadow-[0_4px_12px_rgba(57,37,29,0.08)] text-[11px] sm:text-[12px] font-sans font-medium text-[#7B5802] transition-all duration-300 hover:bg-white hover:border-[#C59A45]/60">
          <span className="material-symbols-outlined text-[15px] text-[#C59A45] animate-spin-slow">
            360
          </span>
          <span>360° Interactive Bar</span>
          <span className="text-[#C59A45]/40">•</span>
          <button
            type="button"
            onClick={() => controlsRef.current.toggleRotation()}
            className="hover:text-[#173D32] transition-colors underline decoration-dotted underline-offset-2 ml-0.5"
            title={isRotating ? 'Pause auto-spin' : 'Resume auto-spin'}
          >
            {isRotating ? 'Pause' : 'Spin'}
          </button>
          <span className="text-[#C59A45]/40">•</span>
          <button
            type="button"
            onClick={() => controlsRef.current.reset()}
            className="hover:text-[#173D32] transition-colors underline decoration-dotted underline-offset-2"
            title="Reset to default angle"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
