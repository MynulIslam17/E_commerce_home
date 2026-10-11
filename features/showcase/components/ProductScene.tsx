'use client';

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { loadVeraModel, LoadedVeraModel } from './ProductModel';
import {
  STAGE_VERTEX,
  STAGE_FRAGMENT,
  createProceduralVideoTextures,
  createWordmarkTexture,
} from './BackgroundShader';
import { MistParticleSystem } from './MistEffect';
import { SHOWCASE_CONFIG } from '../config/showcaseConfig';

export interface ProductSceneHandle {
  setScrollProgress: (progress: number) => void;
  triggerSpray: () => void;
  setBottleScaleMultiplier: (multiplier: number) => void;
}

interface ProductSceneProps {
  onLoaded?: () => void;
}

export const ProductScene = forwardRef<ProductSceneHandle, ProductSceneProps>(function ProductScene(
  { onLoaded },
  ref
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneStateRef = useRef<{
    renderer: THREE.WebGLRenderer | null;
    camera: THREE.PerspectiveCamera | null;
    scene: THREE.Scene | null;
    bottleModel: LoadedVeraModel | null;
    bottlePivot: THREE.Group | null;
    mistSystem: MistParticleSystem | null;
    shaderMaterial: THREE.ShaderMaterial | null;
    videoTextures: THREE.CanvasTexture[];
    mouseTarget: THREE.Vector2;
    mouseCurrent: THREE.Vector2;
    targetRotationY: number;
    currentRotationY: number;
    targetRotationX: number;
    currentRotationX: number;
    scaleMultiplier: number;
    currentScale: number;
    lastTime: number;
    startTime: number;
    animFrameId: number;
  }>({
    renderer: null,
    camera: null,
    scene: null,
    bottleModel: null,
    bottlePivot: null,
    mistSystem: null,
    shaderMaterial: null,
    videoTextures: [],
    mouseTarget: new THREE.Vector2(0.5, 0.5),
    mouseCurrent: new THREE.Vector2(0.5, 0.5),
    targetRotationY: 0,
    currentRotationY: 0,
    targetRotationX: 0,
    currentRotationX: 0,
    scaleMultiplier: 1.0,
    currentScale: 1.0,
    lastTime: 0,
    startTime: 0,
    animFrameId: 0,
  });

  useImperativeHandle(ref, () => ({
    setScrollProgress: (progress: number) => {
      const state = sceneStateRef.current;
      if (!state.shaderMaterial || !state.bottlePivot) return;

      // Update shader uniforms
      // progress ranges from 0.0 (hero) to 3.0 (final chapter)
      state.shaderMaterial.uniforms.uChapter.value = progress;

      // Interpolate words in the background shader
      // 0.0 -> word 0 (LUMINA)
      // 1.0 -> word 1 (VERA)
      // 2.0 -> word 2 (HYDRA)
      // 3.0 -> word 3 (CELLULAR)
      const wordIndex = Math.min(Math.floor(progress), 2);
      const wordMix = progress - wordIndex;
      state.shaderMaterial.uniforms.uWordA.value = wordIndex;
      state.shaderMaterial.uniforms.uWordB.value = Math.min(wordIndex + 1, 3);
      state.shaderMaterial.uniforms.uWordMix.value = wordMix;

      // Rotate bottle along Y axis: full 360-degree rotation across scroll
      // progress 0.0 -> 0 rad
      // progress 1.0 -> 0.65 * PI
      // progress 2.0 -> 1.35 * PI
      // progress 3.0 -> 2.0 * PI
      const totalRotation = progress * (Math.PI * (2.0 / 3.0));
      state.targetRotationY = totalRotation;

      // Subtle tilt variation per chapter
      state.targetRotationX = Math.sin(progress * Math.PI) * 0.08;
    },
    triggerSpray: () => {
      const state = sceneStateRef.current;
      if (state.mistSystem && state.bottlePivot) {
        // Calculate nozzle direction based on current bottle rotation
        const forward = new THREE.Vector3(0.1, 0.35, 0.85);
        forward.applyAxisAngle(new THREE.Vector3(0, 1, 0), state.currentRotationY);
        state.mistSystem.spray(140, forward);

        // Ripple pulse on background shader
        if (state.shaderMaterial) {
          state.shaderMaterial.uniforms.uRipple.value.set(0.5, 0.45, 0.0);
        }
      }
    },
    setBottleScaleMultiplier: (multiplier: number) => {
      sceneStateRef.current.scaleMultiplier = multiplier;
    },
  }));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Dimensions
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const isMobile = window.innerWidth < 1024;

    // 1. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2.0));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 2. Scene & Camera
    const scene = new THREE.Scene();

    // 28° lens for compressed editorial beauty shot
    const camera = new THREE.PerspectiveCamera(28, width / height, 0.1, 50);
    camera.position.set(0, 0, isMobile ? 7.6 : 6.8);

    // 3. Environment Map (PMREMGenerator + RoomEnvironment) for realistic glass
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    pmremGenerator.dispose();

    // 4. Studio Lighting
    const keyLight = new THREE.DirectionalLight('#fff8f0', 3.0);
    keyLight.position.set(-3.5, 4.0, 5.0);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight('#fde68a', 4.5); // Golden amber rim
    rimLight.position.set(3.5, 2.5, -4.0);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight('#e0f2fe', 1.8);
    fillLight.position.set(2.0, -1.0, 3.5);
    scene.add(fillLight);

    const frontLight = new THREE.DirectionalLight('#ffffff', 1.4); // Crisp front light for label legibility
    frontLight.position.set(0.0, 0.5, 5.0);
    scene.add(frontLight);

    const ambientLight = new THREE.AmbientLight('#ffffff', 1.1);
    scene.add(ambientLight);

    // 5. Background Shader Quad (Rendered first as background stage)
    const videoTextures = createProceduralVideoTextures();
    const wordTexture = createWordmarkTexture(SHOWCASE_CONFIG.shaderWords);

    const shaderMaterial = new THREE.ShaderMaterial({
      vertexShader: STAGE_VERTEX,
      fragmentShader: STAGE_FRAGMENT,
      uniforms: {
        uV0: { value: videoTextures[0] },
        uV1: { value: videoTextures[1] },
        uV2: { value: videoTextures[2] },
        uWords: { value: wordTexture },
        uRes: { value: new THREE.Vector2(width, height) },
        uVideoRes: { value: new THREE.Vector2(16, 9) },
        uChapter: { value: 0.0 },
        uWordA: { value: 0.0 },
        uWordB: { value: 1.0 },
        uWordMix: { value: 0.0 },
        uWordAlpha: { value: 0.92 },
        uWordCenter: { value: new THREE.Vector2(0.5, isMobile ? 0.62 : 0.54) },
        uWordSize: { value: new THREE.Vector2(isMobile ? 1.05 : 0.88, isMobile ? 0.35 : 0.28) },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uLens: { value: 0.0 },
        uLensR: { value: 190.0 },
        uRipple: { value: new THREE.Vector3(0.5, 0.5, -1.0) },
        uTime: { value: 0.0 },
        uDpr: { value: Math.min(window.devicePixelRatio || 1, 2) },
        uTide: { value: new THREE.Color('#0f0803') },
        uFoam: { value: new THREE.Color('#fdfcf8') },
      },
      depthTest: false,
      depthWrite: false,
      toneMapped: false,
    });

    const backgroundQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMaterial);
    backgroundQuad.frustumCulled = false;
    backgroundQuad.renderOrder = -1000; // Always render strictly before 3D foreground objects
    scene.add(backgroundQuad);

    // 6. Bottle Pivot Group & Model Loading
    const bottlePivot = new THREE.Group();
    bottlePivot.position.set(0, isMobile ? 0.08 : -0.06, 0);
    scene.add(bottlePivot);

    const mistSystem = new MistParticleSystem(400);
    bottlePivot.add(mistSystem.points);

    let loadedModel: LoadedVeraModel | null = null;
    loadVeraModel('/models/vera_hydra_serum.glb')
      .then((res) => {
        loadedModel = res;
        bottlePivot.add(res.root);
        mistSystem.setOrigin(res.nozzlePosition);
        sceneStateRef.current.bottleModel = res;
        if (onLoaded) onLoaded();
      })
      .catch((err) => {
        console.error('Failed to load VERA GLB model:', err);
      });

    // Save state
    const state = sceneStateRef.current;
    state.renderer = renderer;
    state.camera = camera;
    state.scene = scene;
    state.bottlePivot = bottlePivot;
    state.mistSystem = mistSystem;
    state.shaderMaterial = shaderMaterial;
    state.videoTextures = videoTextures;

    // Mouse movement listener (Pointer tracking)
    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      state.mouseTarget.set(x, 1.0 - y);
      if (shaderMaterial) {
        shaderMaterial.uniforms.uLens.value = 1.0;
      }
    };

    const onPointerLeave = () => {
      if (shaderMaterial) {
        shaderMaterial.uniforms.uLens.value = 0.0;
      }
    };

    if (!isMobile) {
      window.addEventListener('mousemove', onPointerMove, { passive: true });
      container.addEventListener('mouseleave', onPointerLeave);
    }

    // Resize handler
    const onResize = () => {
      if (!container || !renderer || !camera) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const mobileNow = w < 1024;

      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobileNow ? 1.5 : 2.0));

      camera.aspect = w / h;
      camera.position.z = mobileNow ? 8.2 : 6.8;
      camera.updateProjectionMatrix();

      if (shaderMaterial) {
        shaderMaterial.uniforms.uRes.value.set(w, h);
        shaderMaterial.uniforms.uWordCenter.value.set(0.5, mobileNow ? 0.62 : 0.54);
        shaderMaterial.uniforms.uWordSize.value.set(mobileNow ? 1.05 : 0.88, mobileNow ? 0.35 : 0.28);
      }

      if (bottlePivot) {
        bottlePivot.position.y = mobileNow ? 0.08 : -0.06;
      }
    };

    window.addEventListener('resize', onResize);

    // 7. Render Animation Loop
    state.startTime = performance.now() * 0.001;
    state.lastTime = state.startTime;

    const animate = () => {
      const now = performance.now() * 0.001;
      const delta = Math.min(now - state.lastTime, 0.1);
      state.lastTime = now;
      const elapsed = now - state.startTime;

      // Update procedural background textures
      videoTextures.forEach((vt) => {
        if ('renderFrame' in vt) {
          (vt as any).renderFrame(elapsed * 1000);
        }
      });

      // Update shader uniforms
      if (shaderMaterial) {
        shaderMaterial.uniforms.uTime.value = elapsed;

        // Smooth mouse lerping
        state.mouseCurrent.lerp(state.mouseTarget, 0.08);
        shaderMaterial.uniforms.uMouse.value.copy(state.mouseCurrent);

        // Ripple decay
        if (shaderMaterial.uniforms.uRipple.value.z >= 0) {
          shaderMaterial.uniforms.uRipple.value.z += delta * 1.2;
          if (shaderMaterial.uniforms.uRipple.value.z > 1.4) {
            shaderMaterial.uniforms.uRipple.value.z = -1.0;
          }
        }
      }

      // Update bottle transforms
      if (bottlePivot) {
        // Smooth rotation Y
        state.currentRotationY += (state.targetRotationY - state.currentRotationY) * 0.1;
        bottlePivot.rotation.y = state.currentRotationY;

        // Mouse tilt + scroll tilt
        const mouseTiltX = (state.mouseCurrent.y - 0.5) * -0.25;
        const mouseTiltY = (state.mouseCurrent.x - 0.5) * 0.35;

        state.currentRotationX += (state.targetRotationX + mouseTiltX - state.currentRotationX) * 0.08;
        bottlePivot.rotation.x = state.currentRotationX;
        bottlePivot.rotation.z = mouseTiltY * -0.15;

        // Scale lerp
        state.currentScale += (state.scaleMultiplier - state.currentScale) * 0.1;
        bottlePivot.scale.setScalar(state.currentScale);
      }

      // Update mist particles
      if (mistSystem) {
        mistSystem.update(delta);
      }

      renderer.render(scene, camera);
      state.animFrameId = requestAnimationFrame(animate);
    };

    state.animFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('mouseleave', onPointerLeave);
      cancelAnimationFrame(state.animFrameId);

      renderer.dispose();
      videoTextures.forEach((vt) => vt.dispose());
      wordTexture.dispose();
      shaderMaterial.dispose();
      mistSystem.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onLoaded]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0"
      aria-hidden="true"
    />
  );
});
