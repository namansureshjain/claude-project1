import * as THREE from 'three';

/**
 * Geographic helpers for orienting a textured globe.
 *
 * These assume an equirectangular texture (longitude -180..180 left to right,
 * north at the top) on a default THREE.SphereGeometry, which maps
 * u = 0.5 + lon/360 and v = (lat + 90)/180.
 */

/** Unit vector pointing at a lat/lon on an unrotated sphere. */
export function latLonToVector3(latDeg: number, lonDeg: number): THREE.Vector3 {
  const u = 0.5 + lonDeg / 360;
  const v = (latDeg + 90) / 180;

  const phi = u * Math.PI * 2;
  const theta = (1 - v) * Math.PI;

  return new THREE.Vector3(
    -Math.cos(phi) * Math.sin(theta),
    Math.cos(theta),
    Math.sin(phi) * Math.sin(theta),
  ).normalize();
}

/**
 * Rotation that brings a given lat/lon round to face `target`.
 *
 * Used to put India under the vehicle rather than leaving whatever part of the
 * globe the texture happened to start on.
 */
export function orientLatLonToward(
  latDeg: number,
  lonDeg: number,
  target: THREE.Vector3,
): THREE.Quaternion {
  const from = latLonToVector3(latDeg, lonDeg);
  const to = target.clone().normalize();
  return new THREE.Quaternion().setFromUnitVectors(from, to);
}

/** Roughly central India — the point the hero globe is oriented around. */
export const INDIA = { lat: 21, lon: 78, name: 'India' };

/** Sriharikota, the launch site: 13.72N, 80.23E. */
export const SRIHARIKOTA = { lat: 13.72, lon: 80.23, name: 'Satish Dhawan Space Centre' };
