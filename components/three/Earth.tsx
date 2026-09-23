'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { SRIHARIKOTA, latLonToVector3, orientLatLonToward } from '@/lib/geo';

/**
 * Earth as seen from low Earth orbit.
 *
 * Surface, city lights, topography and cloud cover are NASA imagery (public
 * domain) — see public/textures/CREDITS.md. The globe is oriented so India
 * faces the viewer, which is where Mission Aagaman launched from.
 *
 * What is real here: the coastlines, the city lights, the cloud field, and the
 * fact that the lit and unlit sides meet at a terminator. What is staged: the
 * sun's direction and the viewing altitude, both chosen to compose the shot.
 */

/**
 * Placed behind and below the vehicle rather than directly underneath it.
 * A globe this size sitting under the camera puts its near face below the
 * bottom of the frame, leaving only a grazing sliver of surface visible; set
 * back along the view axis, the lit face is in shot and the limb cuts across
 * the lower third.
 */
const EARTH_RADIUS = 150;
export const EARTH_CENTER = new THREE.Vector3(0, -181, -316);

/** Direction from the globe's centre toward the hero camera. */
const VIEW_DIR = new THREE.Vector3(0, 181.5, 356).normalize();

/** Shared with the scene key light so the Earth's terminator, the Moon's phase
 *  and the highlights on the vehicle all agree on where the sun is. */
export const SUN_DIR = new THREE.Vector3(-0.52, 0.7, 0.49).normalize();

/**
 * Orientation of the globe. Constant, so it is computed once at module scope.
 *
 * The two angles were solved for by projecting Sriharikota into screen space:
 * they put the launch site clear to the left of the vehicle, on the lit face,
 * at a readable angle. The roll was solved the same way, by rotating until a
 * point due north of the site projects straight up the screen - without it the
 * globe lands very nearly upside down. Changing the camera or the globe's
 * position invalidates all three.
 */
export const EARTH_ORIENTATION = (() => {
  const target = VIEW_DIR.clone()
    .applyAxisAngle(new THREE.Vector3(0, 1, 0), THREE.MathUtils.degToRad(-22))
    .applyAxisAngle(new THREE.Vector3(1, 0, 0), THREE.MathUtils.degToRad(-40))
    .normalize();
  const q = orientLatLonToward(SRIHARIKOTA.lat, SRIHARIKOTA.lon, target);
  const northUp = new THREE.Quaternion().setFromAxisAngle(
    target,
    THREE.MathUtils.degToRad(-179),
  );
  return northUp.multiply(q);
})();

/** World position of the launch site on the oriented globe. */
export const LAUNCH_SITE_POSITION = latLonToVector3(SRIHARIKOTA.lat, SRIHARIKOTA.lon)
  .applyQuaternion(EARTH_ORIENTATION)
  .multiplyScalar(EARTH_RADIUS * 1.004)
  .add(EARTH_CENTER);

const surfaceVert = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vViewDir;

  void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vViewDir = normalize(cameraPosition - worldPos.xyz);
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const surfaceFrag = /* glsl */ `
  uniform sampler2D uDay;
  uniform sampler2D uNight;
  uniform sampler2D uTopo;
  uniform vec3 uSun;
  uniform vec3 uAtmo;

  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vViewDir;

  // ShaderMaterial does not get three.js's automatic texture decode, so the
  // sRGB source images are linearised here before any lighting maths.
  vec3 toLinear(vec3 c) { return pow(c, vec3(2.2)); }

  void main() {
    vec3 N = normalize(vNormalW);
    vec3 L = normalize(uSun);
    vec3 V = normalize(vViewDir);

    vec3 day = toLinear(texture2D(uDay, vUv).rgb);
    vec3 night = toLinear(texture2D(uNight, vUv).rgb);

    // Relief: perturb the normal along the texture gradient of the elevation
    // map so mountain ranges catch the light near the terminator.
    vec2 texel = vec2(1.0 / 2048.0, 1.0 / 1024.0);
    float hL = texture2D(uTopo, vUv - vec2(texel.x, 0.0)).r;
    float hR = texture2D(uTopo, vUv + vec2(texel.x, 0.0)).r;
    float hD = texture2D(uTopo, vUv - vec2(0.0, texel.y)).r;
    float hU = texture2D(uTopo, vUv + vec2(0.0, texel.y)).r;
    vec3 bumped = normalize(N + vec3((hL - hR) * 0.65, (hD - hU) * 0.65, 0.0));

    float lambert = dot(bumped, L);

    // A soft terminator. The real one is a few hundred km wide, which at this
    // scale is a narrow but definitely not hard edge.
    float dayAmt = smoothstep(-0.14, 0.26, lambert);

    // Ocean, picked out by how much bluer than red the surface is, gets a
    // specular highlight; land does not.
    float water = smoothstep(0.015, 0.13, day.b - day.r);
    vec3 H = normalize(L + V);
    float spec = pow(max(dot(bumped, H), 0.0), 90.0) * water * dayAmt * 0.32;

    // Lifted shadows, gentler gain: at a higher multiplier the deserts clip to
    // white while the mid-tones stay muddy.
    vec3 lit = day * (0.12 + 1.75 * max(lambert, 0.0));
    vec3 lights = night * (1.0 - dayAmt) * 2.2;

    // Limb darkening plus a thin band of atmosphere against the black.
    // Kept deliberately thin. Seen from orbit the atmosphere is a narrow band
    // on the limb, not a glow over the whole planet.
    float fresnel = pow(1.0 - max(dot(N, V), 0.0), 4.5);
    vec3 rim = uAtmo * fresnel * (0.12 + dayAmt * 0.5);

    gl_FragColor = vec4(lit * dayAmt + lights + spec + rim, 1.0);
  }
`;

const atmoVert = /* glsl */ `
  varying vec3 vNormalW;
  varying vec3 vViewDir;
  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vViewDir = normalize(cameraPosition - worldPos.xyz);
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const atmoFrag = /* glsl */ `
  uniform vec3 uSun;
  uniform vec3 uAtmo;
  varying vec3 vNormalW;
  varying vec3 vViewDir;

  void main() {
    vec3 N = normalize(vNormalW);
    float rim = pow(1.0 - abs(dot(N, normalize(vViewDir))), 3.2);
    float lit = max(dot(N, normalize(uSun)), 0.0);
    gl_FragColor = vec4(uAtmo, rim * (0.06 + lit * 0.55) * 0.55);
  }
`;

export default function Earth({
  quality = 1,
  animate = true,
  clouds: showClouds = true,
  sun = SUN_DIR,
}: {
  quality?: number;
  animate?: boolean;
  /** Dropped on weak hardware: the cloud layer is the most expensive pass. */
  clouds?: boolean;
  sun?: THREE.Vector3;
}) {
  const clouds = useRef<THREE.Mesh>(null);

  const [day, night, topo, cloudTex] = useTexture([
    '/textures/earth-day.jpg',
    '/textures/earth-night.jpg',
    '/textures/earth-topology.jpg',
    '/textures/earth-clouds.webp',
  ]);

  useMemo(() => {
    for (const t of [day, night, topo]) {
      // Decoded by hand in the shader, so three.js must not also decode them.
      t.colorSpace = THREE.NoColorSpace;
      t.anisotropy = 8;
      t.wrapS = THREE.RepeatWrapping;
    }
    // Clouds go through a standard material, which does handle colour space.
    cloudTex.colorSpace = THREE.SRGBColorSpace;
    cloudTex.anisotropy = 8;
    cloudTex.wrapS = THREE.RepeatWrapping;
  }, [day, night, topo, cloudTex]);

  const sunDir = useMemo(() => sun.clone().normalize(), [sun]);

  const surfaceUniforms = useMemo(
    () => ({
      uDay: { value: day },
      uNight: { value: night },
      uTopo: { value: topo },
      uSun: { value: sunDir },
      uAtmo: { value: new THREE.Color('#6fb4ff') },
    }),
    [day, night, topo, sunDir],
  );

  const atmoUniforms = useMemo(
    () => ({
      uSun: { value: sunDir },
      uAtmo: { value: new THREE.Color('#5aa2ff') },
    }),
    [sunDir],
  );

  /**
   * Turn the globe so India sits under the vehicle, then roll slightly about
   * that same axis so the continents are not bolt-upright.
   */
  useFrame((_, delta) => {
    // Cloud fields drift; the surface does not, so India stays where it is.
    if (animate && clouds.current) clouds.current.rotation.y += delta * 0.0035;

  });

  const seg = Math.max(48, Math.round(128 * quality));

  return (
    <group position={EARTH_CENTER} quaternion={EARTH_ORIENTATION}>
      <mesh renderOrder={-2}>
        <sphereGeometry args={[EARTH_RADIUS, seg, Math.round(seg / 2)]} />
        <shaderMaterial
          vertexShader={surfaceVert}
          fragmentShader={surfaceFrag}
          uniforms={surfaceUniforms}
        />
      </mesh>

      {showClouds && (
      <mesh ref={clouds} renderOrder={-1}>
        <sphereGeometry args={[EARTH_RADIUS * 1.006, Math.round(seg * 0.6), Math.round(seg / 3)]} />
        <meshStandardMaterial
          map={cloudTex}
          alphaMap={cloudTex}
          transparent
          opacity={0.5}
          depthWrite={false}
          roughness={1}
          metalness={0}
          fog={false}
        />
      </mesh>
      )}

      <mesh renderOrder={-1} scale={1.012}>
        <sphereGeometry args={[EARTH_RADIUS, Math.round(seg * 0.5), Math.round(seg / 4)]} />
        <shaderMaterial
          vertexShader={atmoVert}
          fragmentShader={atmoFrag}
          uniforms={atmoUniforms}
          transparent
          depthWrite={false}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

useTexture.preload([
  '/textures/earth-day.jpg',
  '/textures/earth-night.jpg',
  '/textures/earth-topology.jpg',
  '/textures/earth-clouds.webp',
]);
