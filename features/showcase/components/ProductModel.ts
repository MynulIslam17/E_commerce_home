import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export interface LoadedVeraModel {
  root: THREE.Group;
  materials: Record<string, THREE.Material>;
  nozzlePosition: THREE.Vector3;
}

export async function loadVeraModel(url = '/models/vera_hydra_serum.glb'): Promise<LoadedVeraModel> {
  const loader = new GLTFLoader();

  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (gltf) => {
        const root = gltf.scene;
        const materialsMap: Record<string, THREE.Material> = {};

        // Rotate model so Z-up becomes Y-up and front faces +Z
        root.rotation.x = -Math.PI / 2;
        root.updateMatrixWorld(true);

        // Compute bounding box and center the model after rotation
        const box = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Center model geometry at origin
        root.position.x -= center.x;
        root.position.y -= center.y;
        root.position.z -= center.z;

        // Wrap in parent group for clean hierarchical transforms
        const wrapperGroup = new THREE.Group();
        wrapperGroup.add(root);

        // Normalize model height to ~2.65 units in 3D world space (perfect viewport proportion)
        const targetHeight = 2.65;
        const scaleFactor = targetHeight / (size.y || 1);
        wrapperGroup.scale.setScalar(scaleFactor);

        // High-end PBR Materials
        const amberGlassMat = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#d97706'), // Warm luminous amber
          transmission: 0.52,                // Allows seeing inner serum and tube with rich amber body
          opacity: 0.95,
          transparent: true,
          roughness: 0.08,
          metalness: 0.08,
          ior: 1.52,                         // Optical flint glass
          thickness: 1.3,
          attenuationColor: new THREE.Color('#78350f'), // Deep amber absorption
          attenuationDistance: 0.75,
          specularIntensity: 1.0,
          specularColor: new THREE.Color('#ffffff'),
          clearcoat: 1.0,
          clearcoatRoughness: 0.04,
        });

        const thickBaseMat = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#ffffff'),
          transmission: 0.88,
          opacity: 0.95,
          transparent: true,
          roughness: 0.04,
          metalness: 0.0,
          ior: 1.54,
          thickness: 1.6,
          attenuationColor: new THREE.Color('#fef3c7'),
          attenuationDistance: 1.5,
          clearcoat: 1.0,
          clearcoatRoughness: 0.03,
        });

        const goldenSerumMat = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#f59e0b'), // Radiant gold
          emissive: new THREE.Color('#b45309'),
          emissiveIntensity: 0.35,           // Subtle inner golden luminescence
          roughness: 0.12,
          metalness: 0.15,
          transmission: 0.35,
          transparent: true,
          opacity: 0.96,
          ior: 1.38,                         // Liquid refractive index
        });

        const bronzePumpMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color('#1c120c'), // Luxury dark bronze satin finish
          metalness: 0.88,
          roughness: 0.22,
        });

        const innerTubeMat = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#ffffff'),
          transmission: 0.82,
          opacity: 0.75,
          transparent: true,
          roughness: 0.15,
          thickness: 0.25,
        });

        materialsMap['glass'] = amberGlassMat;
        materialsMap['base'] = thickBaseMat;
        materialsMap['serum'] = goldenSerumMat;
        materialsMap['pump'] = bronzePumpMat;
        materialsMap['tube'] = innerTubeMat;

        // Traverse and assign materials based on mesh names
        root.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            const name = (child.name || '').toLowerCase();

            if (name.includes('bottle_glass')) {
              child.material = amberGlassMat;
            } else if (name.includes('thick_glass') || name.includes('base')) {
              child.material = thickBaseMat;
            } else if (name.includes('serum') || name.includes('liquid')) {
              child.material = goldenSerumMat;
            } else if (name.includes('pump') || name.includes('collar') || name.includes('neck') || name.includes('head')) {
              child.material = bronzePumpMat;
            } else if (name.includes('tube') || name.includes('pipette')) {
              child.material = innerTubeMat;
            } else if (name.includes('label')) {
              // Preserve high-res label texture with crisp satin sheen
              if (child.material) {
                const mat = child.material as THREE.MeshStandardMaterial;
                mat.roughness = 0.35;
                mat.metalness = 0.05;
                mat.depthWrite = true;
                mat.polygonOffset = true;
                mat.polygonOffsetFactor = -1;
                mat.polygonOffsetUnits = -1;
                mat.side = THREE.DoubleSide;

                // Flip texture UV horizontally so front text reads correctly VERA
                if (mat.map) {
                  mat.map.repeat.x = -1;
                  mat.map.offset.x = 1;
                  mat.map.needsUpdate = true;
                }
              }
            }
          }
        });

        // Nozzle position at top of pump head in world space
        const nozzlePos = new THREE.Vector3(0, 1.25, 0.2);

        resolve({
          root: wrapperGroup,
          materials: materialsMap,
          nozzlePosition: nozzlePos,
        });
      },
      undefined,
      (err) => reject(err)
    );
  });
}
