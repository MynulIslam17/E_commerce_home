import * as THREE from 'three';

export const STAGE_VERTEX = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 1.0, 1.0);
}
`;

export const STAGE_FRAGMENT = `
uniform sampler2D uV0;
uniform sampler2D uV1;
uniform sampler2D uV2;
uniform sampler2D uWords;
uniform vec2 uRes;
uniform vec2 uVideoRes;
uniform float uChapter;
uniform float uWordA;
uniform float uWordB;
uniform float uWordMix;
uniform float uWordAlpha;
uniform vec2 uWordCenter;
uniform vec2 uWordSize;
uniform vec2 uMouse;
uniform float uLens;
uniform float uLensR;
uniform vec3 uRipple;
uniform float uTime;
uniform float uDpr;
uniform vec3 uTide;
uniform vec3 uFoam;
varying vec2 vUv;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

vec2 cover(vec2 uv) {
    float sa = uRes.x / max(uRes.y, 1.0);
    float va = uVideoRes.x / max(uVideoRes.y, 1.0);
    vec2 s = sa > va ? vec2(1.0, va / sa) : vec2(sa / va, 1.0);
    return (uv - 0.5) * s + 0.5;
}

float wordAt(vec2 q, float row) {
    float a = texture2D(uWords, vec2(q.x, 1.0 - (row + 1.0 - q.y) / 4.0)).a;
    vec2 inside = step(0.0, q) * step(q, vec2(1.0));
    return a * inside.x * inside.y;
}

vec3 scene(vec2 suv, float n) {
    vec2 cuv = cover(suv);
    vec3 c0 = texture2D(uV0, cuv).rgb;
    vec3 c1 = texture2D(uV1, cuv).rgb;
    vec3 c2 = texture2D(uV2, cuv).rgb;

    float a1 = clamp(uChapter * 1.8 - 0.4 + (n - 0.5) * 0.9, 0.0, 1.0);
    float a2 = clamp((uChapter - 1.0) * 1.8 - 0.4 + (n - 0.5) * 0.9, 0.0, 1.0);
    vec3 col = mix(mix(c0, c1, smoothstep(0.0, 1.0, a1)), c2, smoothstep(0.0, 1.0, a2));

    // Scrim: subtle darkening gradient for readability
    float scrim = mix(0.72, 0.22, smoothstep(0.0, 0.5, vUv.y));
    col = mix(col, uTide, scrim);

    vec2 q = (suv - uWordCenter) / uWordSize + 0.5;
    float word = max(wordAt(q, uWordA) * (1.0 - smoothstep(0.0, 0.5, uWordMix)),
                     wordAt(q, uWordB) * smoothstep(0.5, 1.0, uWordMix));
    return mix(col, uFoam, word * uWordAlpha);
}

void main() {
    vec2 px = vUv * uRes;
    vec2 d = px - uMouse * uRes;
    float r = length(d);
    float R = uLensR * uDpr;
    float f = smoothstep(R, 0.0, r);
    vec2 dir = d / max(r, 1.0);

    // Lens refraction / liquid droplet magnification
    float bend = f * (1.0 - f * 0.35);
    vec2 off = -d * bend * 0.55 * uLens;

    if (uRipple.z >= 0.0) {
        vec2 rd = px - uRipple.xy * uRes;
        float rr = length(rd);
        float front = uRipple.z * 1100.0 * uDpr;
        float w = exp(-pow((rr - front) / (70.0 * uDpr), 2.0)) * exp(-uRipple.z * 1.4);
        off += (rd / max(rr, 1.0)) * w * 34.0 * uDpr;
    }

    vec2 suv = (px + off) / uRes;
    float n = noise(suv * vec2(3.0, 2.0) + uTime * 0.04);
    vec3 col = scene(suv, n);

    // Chromatic aberration at the refracted lens rim
    float rim = f * (1.0 - f) * 4.0 * uLens;
    if (rim > 0.01) {
        vec2 split = dir * rim * 7.0 * uDpr / uRes;
        col.r = scene(suv + split, n).r;
        col.b = scene(suv - split, n).b;
        col += uFoam * rim * 0.05;
    }

    float vig = smoothstep(1.35, 0.35, length(vUv - 0.5));
    col *= mix(0.75, 1.0, vig);

    gl_FragColor = vec4(col, 1.0);
}
`;

/**
 * Creates dynamic procedural textures simulating cinematic liquid motion
 * so the scene looks stunning even before custom MP4 footage is provided.
 */
export function createProceduralVideoTextures(): THREE.CanvasTexture[] {
  const textures: THREE.CanvasTexture[] = [];
  const configs = [
    // Scene 0: Liquid Amber Nectar (Hero)
    { colorA: '#451a03', colorB: '#b45309', colorC: '#0c0702', glow: '#fbbf24', freq: 0.003 },
    // Scene 1: Botanical Emerald & Aloe Lipids (Ingredients)
    { colorA: '#062d22', colorB: '#047857', colorC: '#051811', glow: '#34d399', freq: 0.0025 },
    // Scene 2: Deep Atlas Cedarwood & Smoke (Formula)
    { colorA: '#381608', colorB: '#c2410c', colorC: '#090503', glow: '#fdba74', freq: 0.0035 },
  ];

  for (const cfg of configs) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    // Animation painter function attached to texture
    (texture as any).renderFrame = (time: number) => {
      const w = canvas.width;
      const h = canvas.height;
      const t = time * cfg.freq;

      const grad = ctx.createRadialGradient(
        w * (0.5 + Math.sin(t) * 0.25),
        h * (0.45 + Math.cos(t * 0.8) * 0.2),
        20,
        w * 0.5,
        h * 0.5,
        w * 0.75
      );
      grad.addColorStop(0, cfg.glow);
      grad.addColorStop(0.3, cfg.colorB);
      grad.addColorStop(0.7, cfg.colorA);
      grad.addColorStop(1, cfg.colorC);

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Liquid caustics wave overlays
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      for (let i = 0; i < 4; i++) {
        const offset = i * 1.5;
        ctx.beginPath();
        ctx.arc(
          w * (0.5 + Math.cos(t * 1.2 + offset) * 0.3),
          h * (0.5 + Math.sin(t * 0.9 + offset) * 0.3),
          120 + Math.sin(t + offset) * 40,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      texture.needsUpdate = true;
    };

    // Initial render
    (texture as any).renderFrame(0);
    textures.push(texture);
  }

  return textures;
}

/**
 * Creates the typography atlas texture containing the oversized chapter words:
 * "LUMINA", "VERA", "HYDRA", "CELLULAR"
 */
export function createWordmarkTexture(words: string[]): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const rowHeight = canvas.height / 4;

  words.forEach((word, idx) => {
    let fontSize = 380;
    ctx.font = `400 ${fontSize}px "Castoro", Georgia, serif`;
    if ('letterSpacing' in ctx) {
      (ctx as any).letterSpacing = '0.06em';
    }

    const textWidth = ctx.measureText(word).width;
    fontSize *= Math.min(1.4, (canvas.width * 0.92) / textWidth);
    ctx.font = `400 ${fontSize}px "Castoro", Georgia, serif`;

    const y = rowHeight * idx + rowHeight * 0.55;
    ctx.fillText(word, canvas.width / 2, y);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}
