import * as THREE from 'three';

export const MIST_VERTEX = `
attribute float aSize;
attribute float aLife;
varying float vLife;
uniform float uDpr;

void main() {
    vLife = aLife;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uDpr * (240.0 / -mvPosition.z) * smoothstep(0.0, 0.2, vLife);
    gl_Position = projectionMatrix * mvPosition;
}
`;

export const MIST_FRAGMENT = `
varying float vLife;
uniform vec3 uFoam;

void main() {
    vec2 c = gl_PointCoord - 0.5;
    float dist = length(c);
    float a = smoothstep(0.5, 0.0, dist);
    a *= smoothstep(1.0, 0.8, vLife) * vLife * 0.35;
    if (a <= 0.002) discard;
    gl_FragColor = vec4(uFoam * a, a);
}
`;

export class MistParticleSystem {
  public points: THREE.Points;
  private geometry: THREE.BufferGeometry;
  private material: THREE.ShaderMaterial;
  private particleCount: number;
  private positions: Float32Array;
  private velocities: Float32Array;
  private sizes: Float32Array;
  private lives: Float32Array;
  private maxLives: Float32Array;
  private origin: THREE.Vector3;

  constructor(particleCount = 500, origin = new THREE.Vector3(0, 1.35, 0.2)) {
    this.particleCount = particleCount;
    this.origin = origin;

    this.positions = new Float32Array(particleCount * 3);
    this.velocities = new Float32Array(particleCount * 3);
    this.sizes = new Float32Array(particleCount);
    this.lives = new Float32Array(particleCount);
    this.maxLives = new Float32Array(particleCount);

    // Initialize all to dormant
    for (let i = 0; i < particleCount; i++) {
      this.positions[i * 3 + 0] = origin.x;
      this.positions[i * 3 + 1] = origin.y;
      this.positions[i * 3 + 2] = origin.z;
      this.lives[i] = 0;
      this.sizes[i] = 20.0 + Math.random() * 25.0;
    }

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    this.geometry.setAttribute('aSize', new THREE.BufferAttribute(this.sizes, 1));
    this.geometry.setAttribute('aLife', new THREE.BufferAttribute(this.lives, 1));

    this.material = new THREE.ShaderMaterial({
      vertexShader: MIST_VERTEX,
      fragmentShader: MIST_FRAGMENT,
      uniforms: {
        uFoam: { value: new THREE.Color('#fef3c7') },
        uDpr: { value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.points.frustumCulled = false;
  }

  /**
   * Fires a burst of fine atomized serum particles
   */
  public spray(count = 120, direction = new THREE.Vector3(0.1, 0.4, 0.8)) {
    let spawned = 0;
    for (let i = 0; i < this.particleCount && spawned < count; i++) {
      if (this.lives[i] <= 0) {
        this.positions[i * 3 + 0] = this.origin.x + (Math.random() - 0.5) * 0.05;
        this.positions[i * 3 + 1] = this.origin.y + (Math.random() - 0.5) * 0.05;
        this.positions[i * 3 + 2] = this.origin.z + (Math.random() - 0.5) * 0.05;

        // Dispersed cone spray velocity
        const spread = 0.45;
        this.velocities[i * 3 + 0] = direction.x + (Math.random() - 0.5) * spread;
        this.velocities[i * 3 + 1] = direction.y + (Math.random() - 0.2) * spread;
        this.velocities[i * 3 + 2] = direction.z + (Math.random() - 0.5) * spread * 0.5;

        const speed = 1.2 + Math.random() * 1.5;
        this.velocities[i * 3 + 0] *= speed;
        this.velocities[i * 3 + 1] *= speed;
        this.velocities[i * 3 + 2] *= speed;

        this.lives[i] = 1.0;
        this.maxLives[i] = 0.8 + Math.random() * 0.6;
        spawned++;
      }
    }
  }

  public update(delta: number) {
    let hasActive = false;
    const posAttr = this.geometry.attributes.position as THREE.BufferAttribute;
    const lifeAttr = this.geometry.attributes.aLife as THREE.BufferAttribute;

    for (let i = 0; i < this.particleCount; i++) {
      if (this.lives[i] > 0) {
        hasActive = true;
        this.lives[i] -= delta / this.maxLives[i];
        if (this.lives[i] < 0) this.lives[i] = 0;

        // Drag and slight buoyancy
        this.velocities[i * 3 + 0] *= 0.94;
        this.velocities[i * 3 + 1] *= 0.94;
        this.velocities[i * 3 + 2] *= 0.94;

        this.positions[i * 3 + 0] += this.velocities[i * 3 + 0] * delta;
        this.positions[i * 3 + 1] += this.velocities[i * 3 + 1] * delta;
        this.positions[i * 3 + 2] += this.velocities[i * 3 + 2] * delta;
      }
    }

    if (hasActive) {
      posAttr.needsUpdate = true;
      lifeAttr.needsUpdate = true;
    }
  }

  public setOrigin(origin: THREE.Vector3) {
    this.origin.copy(origin);
  }

  public dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}
