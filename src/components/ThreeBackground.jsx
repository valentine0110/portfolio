import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Generates a soft radial glow sprite texture for luminous particles
 */
function createGlowSpriteTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  grad.addColorStop(0.2, 'rgba(0, 242, 254, 0.9)');
  grad.addColorStop(0.5, 'rgba(59, 130, 246, 0.45)');
  grad.addColorStop(0.8, 'rgba(139, 92, 246, 0.15)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Generates a soft diffuse bokeh sprite for foreground floating light motes
 */
function createBokehSpriteTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, 'rgba(165, 243, 252, 0.55)');
  grad.addColorStop(0.25, 'rgba(56, 189, 248, 0.35)');
  grad.addColorStop(0.6, 'rgba(139, 92, 246, 0.15)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function ThreeBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // ── 1. Scene, Camera, Renderer ──────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x04060a, 0.00085);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      1,
      2500
    );
    camera.position.set(0, 40, 460);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    container.appendChild(renderer.domElement);

    const glowSprite = createGlowSpriteTexture();
    const bokehSprite = createBokehSpriteTexture();

    // ── 2. Deep Cosmic Nebula Star Dust (1,500 Luminous Stars) ──
    const starCount = 1500;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);

    const cWhite = new THREE.Color(0xffffff);
    const cCyan = new THREE.Color(0x00f2fe);
    const cSky = new THREE.Color(0x38bdf8);
    const cBlue = new THREE.Color(0x3b82f6);
    const cViolet = new THREE.Color(0x8b5cf6);

    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 2200;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 1800;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 1600;

      const pick = Math.random();
      const col =
        pick < 0.25
          ? cWhite
          : pick < 0.55
          ? cCyan
          : pick < 0.75
          ? cSky
          : pick < 0.9
          ? cBlue
          : cViolet;

      starColors[i * 3] = col.r;
      starColors[i * 3 + 1] = col.g;
      starColors[i * 3 + 2] = col.b;

      // Varied star brightness & size
      starSizes[i] = 1.8 + Math.random() * 4.2;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 4.5,
      map: glowSprite,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // ── 3. Foreground Cinematic Bokeh Orbs (45 Soft Light Spheres) ─
    const bokehCount = 45;
    const bokehGeo = new THREE.BufferGeometry();
    const bokehPos = new Float32Array(bokehCount * 3);
    const bokehDrift = [];

    for (let i = 0; i < bokehCount; i++) {
      bokehPos[i * 3] = (Math.random() - 0.5) * 1000;
      bokehPos[i * 3 + 1] = (Math.random() - 0.5) * 800;
      bokehPos[i * 3 + 2] = 50 + Math.random() * 320; // in front of camera

      bokehDrift.push({
        baseX: bokehPos[i * 3],
        baseY: bokehPos[i * 3 + 1],
        speed: 0.3 + Math.random() * 0.7,
        phase: Math.random() * Math.PI * 2,
        radius: 20 + Math.random() * 45,
      });
    }

    bokehGeo.setAttribute('position', new THREE.BufferAttribute(bokehPos, 3));

    const bokehMat = new THREE.PointsMaterial({
      size: 34,
      map: bokehSprite,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const bokehMesh = new THREE.Points(bokehGeo, bokehMat);
    scene.add(bokehMesh);

    // ── 4. Interactive Constellation Network with Physics Cursor Displace ──
    const nodeCount = 120;
    const nodeGeo = new THREE.BufferGeometry();
    const nodePos = new Float32Array(nodeCount * 3);
    const nodeVelocities = [];
    const nodeBasePos = [];

    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * 950;
      const y = (Math.random() - 0.5) * 750;
      const z = (Math.random() - 0.5) * 500;

      nodePos[i * 3] = x;
      nodePos[i * 3 + 1] = y;
      nodePos[i * 3 + 2] = z;

      nodeBasePos.push({ x, y, z });
      nodeVelocities.push({
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        vz: (Math.random() - 0.5) * 0.25,
        pushX: 0,
        pushY: 0,
      });
    }

    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePos, 3));

    const nodeMat = new THREE.PointsMaterial({
      color: 0x67e8f9,
      size: 6.5,
      map: glowSprite,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const nodePoints = new THREE.Points(nodeGeo, nodeMat);
    scene.add(nodePoints);

    // Dynamic Connecting Laser-lines between nearby nodes
    const maxLineSegments = 360;
    const lineGeo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(maxLineSegments * 6);
    const lineColors = new Float32Array(maxLineSegments * 6);

    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lineSegments = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lineSegments);

    // ── 5. Cyber-Horizon Wave Matrix (Undulating Digital Topography) ──
    const waveWidth = 2000;
    const waveDepth = 1400;
    const waveSegmentsX = 64;
    const waveSegmentsY = 40;
    const waveGeo = new THREE.PlaneGeometry(
      waveWidth,
      waveDepth,
      waveSegmentsX,
      waveSegmentsY
    );
    waveGeo.rotateX(-Math.PI / 2.3);
    waveGeo.translate(0, -310, -120);

    const waveVertexCount = waveGeo.attributes.position.count;
    const waveBasePositions = waveGeo.attributes.position.clone();

    // Dynamically colored wave mesh: Cyan on peaks, Violet/Indigo in troughs
    const waveMeshColors = new Float32Array(waveVertexCount * 3);
    waveGeo.setAttribute('color', new THREE.BufferAttribute(waveMeshColors, 3));

    const waveMat = new THREE.MeshBasicMaterial({
      vertexColors: true,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const waveMesh = new THREE.Mesh(waveGeo, waveMat);
    scene.add(waveMesh);

    // Glowing coordinate matrix points on the wave vertices
    const wavePointMat = new THREE.PointsMaterial({
      size: 3.5,
      map: glowSprite,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const wavePointMesh = new THREE.Points(waveGeo, wavePointMat);
    scene.add(wavePointMesh);

    // ── 6. Pointer & Scroll Physics Interaction ─────────────────
    let mouseX = 0;
    let mouseY = 0;
    let pointerWorldX = 0;
    let pointerWorldY = 0;
    let targetCamX = 0;
    let targetCamY = 40;
    let scrollY = 0;
    let targetScrollY = 0;

    const onPointerMove = (e) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;

      mouseX = normX * 120;
      mouseY = normY * 90;

      // Project approx pointer location in background world coordinates
      pointerWorldX = normX * 450;
      pointerWorldY = normY * 350;
    };

    const onScroll = () => {
      targetScrollY = (window.scrollY || window.pageYOffset) * 0.24;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    // ── 7. Animation Loop ───────────────────────────────────────
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth Camera Lerp
      targetCamX += (mouseX - targetCamX) * 0.045;
      scrollY += (targetScrollY - scrollY) * 0.055;
      targetCamY = 40 - scrollY - mouseY * 0.2;

      camera.position.x = targetCamX;
      camera.position.y = targetCamY;
      camera.lookAt(targetCamX * 0.15, -scrollY * 0.45, 0);

      // Starfield Slow Cosmic Rotation & Twinkle
      starField.rotation.y = elapsed * 0.012;
      starField.rotation.x = Math.sin(elapsed * 0.008) * 0.02;

      // Bokeh Orbs Drift
      const bPos = bokehGeo.attributes.position.array;
      for (let i = 0; i < bokehCount; i++) {
        const d = bokehDrift[i];
        bPos[i * 3] = d.baseX + Math.sin(elapsed * d.speed + d.phase) * d.radius;
        bPos[i * 3 + 1] = d.baseY + Math.cos(elapsed * d.speed * 0.8 + d.phase) * d.radius;
      }
      bokehGeo.attributes.position.needsUpdate = true;

      // Update Constellation Nodes with Cursor Repulsion & Inertia
      const nPos = nodeGeo.attributes.position.array;
      for (let i = 0; i < nodeCount; i++) {
        const idx = i * 3;
        const vel = nodeVelocities[i];

        // Standard drift
        nPos[idx] += vel.vx;
        nPos[idx + 1] += vel.vy;
        nPos[idx + 2] += vel.vz;

        // Subtle fluid cursor repulsion
        const dx = nPos[idx] - pointerWorldX;
        const dy = nPos[idx + 1] - pointerWorldY;
        const distSq = dx * dx + dy * dy;

        if (distSq < 35000 && distSq > 1) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / 187) * 0.9;
          vel.pushX += (dx / dist) * force;
          vel.pushY += (dy / dist) * force;
        }

        // Apply push with friction damping
        nPos[idx] += vel.pushX;
        nPos[idx + 1] += vel.pushY;
        vel.pushX *= 0.91;
        vel.pushY *= 0.91;

        // Soft containment boundary bounce
        if (Math.abs(nPos[idx]) > 520) vel.vx *= -1;
        if (Math.abs(nPos[idx + 1]) > 420) vel.vy *= -1;
        if (Math.abs(nPos[idx + 2]) > 300) vel.vz *= -1;
      }
      nodeGeo.attributes.position.needsUpdate = true;

      // Dynamic Laser Proximity Filaments
      let lineIndex = 0;
      const lPos = lineGeo.attributes.position.array;
      const lCol = lineGeo.attributes.color.array;
      const maxDist = 145;

      for (let i = 0; i < nodeCount && lineIndex < maxLineSegments; i++) {
        for (let j = i + 1; j < nodeCount && lineIndex < maxLineSegments; j++) {
          const dx = nPos[i * 3] - nPos[j * 3];
          const dy = nPos[i * 3 + 1] - nPos[j * 3 + 1];
          const dz = nPos[i * 3 + 2] - nPos[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDist) {
            const alpha = 1 - dist / maxDist;
            const lIdx = lineIndex * 6;

            lPos[lIdx] = nPos[i * 3];
            lPos[lIdx + 1] = nPos[i * 3 + 1];
            lPos[lIdx + 2] = nPos[i * 3 + 2];

            lPos[lIdx + 3] = nPos[j * 3];
            lPos[lIdx + 4] = nPos[j * 3 + 1];
            lPos[lIdx + 5] = nPos[j * 3 + 2];

            // Color gradient from cyan (0, 0.95, 1) to soft violet (0.55, 0.36, 0.96)
            const r = 0.1 * alpha;
            const g = 0.85 * alpha;
            const b = 1.0 * alpha;

            lCol[lIdx] = r;
            lCol[lIdx + 1] = g;
            lCol[lIdx + 2] = b;
            lCol[lIdx + 3] = r * 0.7;
            lCol[lIdx + 4] = g * 0.6;
            lCol[lIdx + 5] = b;

            lineIndex++;
          }
        }
      }

      // Zero out unused line segments
      for (let k = lineIndex * 6; k < maxLineSegments * 6; k++) {
        lPos[k] = 0;
        lCol[k] = 0;
      }
      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.color.needsUpdate = true;

      // Undulating Cyber Horizon Wave Dynamics with Peak-Trough Shading
      const wPos = waveGeo.attributes.position.array;
      const bWPos = waveBasePositions.array;
      const wCol = waveGeo.attributes.color.array;

      for (let i = 0; i < waveVertexCount; i++) {
        const idx = i * 3;
        const x = bWPos[idx];
        const y = bWPos[idx + 1];

        // Complex multi-harmonic flowing surface
        const elevation =
          Math.sin(x * 0.007 + elapsed * 1.35) * 18 +
          Math.cos(y * 0.005 + elapsed * 1.05) * 15 +
          Math.sin((x + y) * 0.0035 + elapsed * 0.75) * 12;

        wPos[idx + 2] = bWPos[idx + 2] + elevation;

        // Dynamic vertex color based on height:
        // High peaks: Cyan (0x00f2fe)
        // Mid levels: Azure / Electric Blue (0x38bdf8 / 0x3b82f6)
        // Low troughs: Deep violet (0x6366f1)
        const normH = Math.max(0, Math.min(1, (elevation + 45) / 90));
        wCol[idx] = 0.05 + 0.3 * (1 - normH); // red
        wCol[idx + 1] = 0.2 + 0.75 * normH;    // green
        wCol[idx + 2] = 0.55 + 0.45 * normH;   // blue
      }

      waveGeo.attributes.position.needsUpdate = true;
      waveGeo.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // ── 8. Window Resize Handler ────────────────────────────────
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // ── 9. Cleanup ──────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleResize);

      starGeo.dispose();
      starMat.dispose();
      bokehGeo.dispose();
      bokehMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      waveGeo.dispose();
      waveMat.dispose();
      wavePointMat.dispose();
      glowSprite.dispose();
      bokehSprite.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="three-bg-canvas" aria-hidden="true" />;
}
