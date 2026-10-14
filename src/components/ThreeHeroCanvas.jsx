import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createCyberEarthTexture, createEarthCloudsTexture } from './earthTexture';

/**
 * Creates soft radial glow texture for orbital stardust
 */
function createHeroGlowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  grad.addColorStop(0.25, 'rgba(0, 242, 254, 0.9)');
  grad.addColorStop(0.6, 'rgba(59, 130, 246, 0.4)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function ThreeHeroCanvas() {
  const mountRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 520;
    let height = container.clientHeight || 500;
    const initialAspect = width / height;
    const initialCamZ = initialAspect < 1 ? 7.5 + (1 - initialAspect) * 4.2 : 7.5;

    // ── 1. Scene, Camera, High-Fidelity Tone-Mapped Renderer ─────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, initialAspect, 0.1, 100);
    camera.position.set(0, 0.35, initialCamZ);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // Main 3D Pivot Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Multi-Directional Cinematic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.4);
    sunLight.position.set(6, 4.5, 5);
    scene.add(sunLight);

    const blueRimLight = new THREE.PointLight(0x00f2fe, 3.2, 20);
    blueRimLight.position.set(-6, -2, -3);
    scene.add(blueRimLight);

    const purpleFillLight = new THREE.PointLight(0x8b5cf6, 2.4, 18);
    purpleFillLight.position.set(0, -5, 4.5);
    scene.add(purpleFillLight);

    // ── 2. Earth Sphere (Realistic Continents & City Lights) ─────
    const earthCanvas = createCyberEarthTexture();
    const earthTexture = new THREE.CanvasTexture(earthCanvas);
    earthTexture.wrapS = THREE.RepeatWrapping;
    earthTexture.wrapT = THREE.ClampToEdgeWrapping;

    const earthGeo = new THREE.SphereGeometry(1.8, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.35,
      metalness: 0.22,
      emissive: 0x031838,
      emissiveIntensity: 0.65,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    coreGroup.add(earthMesh);

    // ── 3. Rotating Atmospheric Weather & Cloud Layer ───────────
    const cloudsCanvas = createEarthCloudsTexture();
    const cloudsTexture = new THREE.CanvasTexture(cloudsCanvas);
    cloudsTexture.wrapS = THREE.RepeatWrapping;

    const cloudsGeo = new THREE.SphereGeometry(1.83, 48, 48);
    const cloudsMat = new THREE.MeshStandardMaterial({
      map: cloudsTexture,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      roughness: 0.8,
    });
    const cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
    coreGroup.add(cloudsMesh);

    // ── 4. Atmospheric Rayleigh Scattering Fresnel Halo ─────────
    const atmosGeo = new THREE.SphereGeometry(1.89, 48, 48);
    const atmosMat = new THREE.ShaderMaterial({
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
          float intensity = pow(0.68 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(0.0, 0.95, 1.0, 1.0) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    coreGroup.add(atmosMesh);

    // ── 5. Concentric Geodesic Defense Barrier / Forcefield ─────
    const shieldGeo = new THREE.IcosahedronGeometry(2.26, 2);

    const shieldMembraneMat = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7,
      emissive: 0x00f2fe,
      emissiveIntensity: 0.36,
      transparent: true,
      opacity: 0.22,
      roughness: 0.08,
      metalness: 0.88,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      transmission: 0.7,
      thickness: 0.5,
    });
    const shieldMesh = new THREE.Mesh(shieldGeo, shieldMembraneMat);

    const shieldLatticeMat = new THREE.LineBasicMaterial({
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.85,
      linewidth: 1.5,
    });
    const shieldEdges = new THREE.EdgesGeometry(shieldGeo);
    const shieldLines = new THREE.LineSegments(shieldEdges, shieldLatticeMat);

    coreGroup.add(shieldMesh);
    coreGroup.add(shieldLines);

    // ── 6. Gyroscopic Magnetic Flux Energy Rings ────────────────
    const ringsGroup = new THREE.Group();
    coreGroup.add(ringsGroup);

    const createFluxRing = (radius, tiltX, tiltY, color = 0x00f2fe, opacity = 0.28) => {
      const ringGeo = new THREE.BufferGeometry();
      const pts = [];
      const segs = 96;
      for (let i = 0; i <= segs; i++) {
        const theta = (i / segs) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius, 0));
      }
      ringGeo.setFromPoints(pts);
      const ringMesh = new THREE.Line(
        ringGeo,
        new THREE.LineBasicMaterial({ color, transparent: true, opacity })
      );
      ringMesh.rotation.x = tiltX;
      ringMesh.rotation.y = tiltY;
      return ringMesh;
    };

    const ringEquator = createFluxRing(2.38, Math.PI / 2.1, 0.15, 0x00f2fe, 0.35);
    const ringPolar = createFluxRing(2.44, 0.3, Math.PI / 3, 0x8b5cf6, 0.25);
    ringsGroup.add(ringEquator);
    ringsGroup.add(ringPolar);

    // ── 7. Defense Satellites Orbiting Outside Shield ───────────
    const defenseSatellites = [];
    for (let i = 0; i < 3; i++) {
      const satOrbit = new THREE.Group();
      satOrbit.rotation.x = (i * Math.PI) / 3;
      satOrbit.rotation.z = (i * Math.PI) / 4;

      const satGeo = new THREE.SphereGeometry(0.045, 12, 12);
      const satMat = new THREE.MeshBasicMaterial({ color: 0x00f2fe });
      const sat = new THREE.Mesh(satGeo, satMat);
      sat.position.set(2.7, 0, 0);

      const orbitCircleGeo = new THREE.BufferGeometry();
      const pts = [];
      for (let j = 0; j <= 64; j++) {
        const theta = (j / 64) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(theta) * 2.7, Math.sin(theta) * 2.7, 0));
      }
      orbitCircleGeo.setFromPoints(pts);
      const orbitLine = new THREE.Line(
        orbitCircleGeo,
        new THREE.LineBasicMaterial({ color: 0x00f2fe, transparent: true, opacity: 0.18 })
      );

      satOrbit.add(sat);
      satOrbit.add(orbitLine);
      coreGroup.add(satOrbit);

      defenseSatellites.push({ group: satOrbit, speed: 0.6 + i * 0.3 });
    }

    // ── 8. Orbital Space Dust Embers ────────────────────────────
    const particleCount = 750;
    const particleGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colCyan = new THREE.Color(0x00f2fe);
    const colBlue = new THREE.Color(0x3b82f6);

    for (let i = 0; i < particleCount; i++) {
      const dist = 3.2 + Math.random() * 4.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = dist * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = dist * Math.cos(phi);

      const pick = Math.random();
      const col = pick < 0.6 ? colCyan : colBlue;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    const heroGlowTexture = createHeroGlowTexture();

    particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particles = new THREE.Points(
      particleGeom,
      new THREE.PointsMaterial({
        size: 0.12,
        map: heroGlowTexture,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    scene.add(particles);

    // ── 9. Forcefield Deflection Shockwaves on Click ────────────
    const shockwaves = [];
    const shockwaveMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.85,
      wireframe: true,
    });

    function triggerDeflectionWave(x = 0, y = 0) {
      const ringG = new THREE.RingGeometry(0.1, 0.22, 32);
      const ringM = new THREE.Mesh(ringG, shockwaveMat.clone());
      ringM.position.set(x, y, 0);
      scene.add(ringM);
      shockwaves.push({ mesh: ringM, scale: 0.1, opacity: 0.85 });
    }

    // ── 10. Pointer Interaction (360° Drag & Smooth Momentum) ───
    let mouseX = 0;
    let mouseY = 0;
    let targetRotY = 0.5;
    let targetRotX = 0.15;
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0]?.clientY) || 0;

      mouseX = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const dx = clientX - prevX;
        const dy = clientY - prevY;
        targetRotY += dx * 0.007;
        targetRotX += dy * 0.007;
        prevX = clientX;
        prevY = clientY;
      }
    };

    const onPointerDown = (e) => {
      isDragging = true;
      setIsInteracting(true);
      const clientX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0]?.clientY) || 0;
      prevX = clientX;
      prevY = clientY;

      const rect = container.getBoundingClientRect();
      const clickX = (((clientX - rect.left) / rect.width) * 2 - 1) * 3;
      const clickY = -(((clientY - rect.top) / rect.height) * 2 - 1) * 3;
      triggerDeflectionWave(clickX, clickY);
    };

    const onPointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    container.addEventListener('pointermove', onPointerMove, { passive: true });
    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
    window.addEventListener('touchend', onPointerUp);
    window.addEventListener('touchcancel', onPointerUp);

    // Pause animation when scrolled off-screen
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // ── 11. Animation Loop ──────────────────────────────────────
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      // Continuous planetary rotation with damping
      if (!isDragging) {
        targetRotY += 0.0035;
        targetRotX = Math.sin(elapsed * 0.4) * 0.08 + mouseY * 0.15;
      }

      coreGroup.rotation.y += (targetRotY - coreGroup.rotation.y) * 0.06;
      coreGroup.rotation.x += (targetRotX - coreGroup.rotation.x) * 0.06;

      // Earth & Cloud Multi-Layer Rotation (differential speeds)
      earthMesh.rotation.y += 0.002;
      cloudsMesh.rotation.y += 0.0035;

      // Forcefield counter-rotation & gentle respiration pulse
      shieldMesh.rotation.y = -elapsed * 0.04;
      shieldLines.rotation.y = -elapsed * 0.04;

      const pulse = 1 + Math.sin(elapsed * 2.2) * 0.02;
      shieldMesh.scale.set(pulse, pulse, pulse);
      shieldLines.scale.set(pulse, pulse, pulse);

      // Gyroscopic magnetic flux rings orbit
      ringEquator.rotation.z = elapsed * 0.05;
      ringPolar.rotation.z = -elapsed * 0.04;

      // Orbiting satellites
      defenseSatellites.forEach((sat) => {
        sat.group.rotation.y = elapsed * sat.speed;
      });

      // Stars drift
      particles.rotation.y = elapsed * 0.015;

      // Update Shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.scale += 0.13;
        sw.opacity -= 0.025;
        sw.mesh.scale.set(sw.scale, sw.scale, sw.scale);
        sw.mesh.material.opacity = Math.max(0, sw.opacity);

        if (sw.opacity <= 0) {
          scene.remove(sw.mesh);
          sw.mesh.geometry.dispose();
          sw.mesh.material.dispose();
          shockwaves.splice(i, 1);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 360;
      const h = container.clientHeight || 360;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      camera.position.z = camera.aspect < 1 ? 7.5 + (1 - camera.aspect) * 4.2 : 7.5;
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // ── 12. Cleanup ─────────────────────────────────────────────
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('touchcancel', onPointerUp);

      earthGeo.dispose();
      earthMat.dispose();
      earthTexture.dispose();
      cloudsGeo.dispose();
      cloudsMat.dispose();
      cloudsTexture.dispose();
      atmosGeo.dispose();
      atmosMat.dispose();
      shieldGeo.dispose();
      shieldMembraneMat.dispose();
      shieldEdges.dispose();
      shieldLatticeMat.dispose();
      particleGeom.dispose();
      particles.material.dispose();
      heroGlowTexture.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="three-hero-container">
      <div
        ref={mountRef}
        className={`three-canvas-viewport ${isInteracting ? 'is-dragging' : ''}`}
        title="Interactive Earth with Defense Shield • Drag to rotate"
      />
    </div>
  );
}
