import * as THREE from 'three';

/**
 * Procedural geometry for the Vikram-1 visualization.
 *
 * Skyroot has not published engineering drawings for Vikram-1, so these shapes
 * are built from the published overall height (~20 m), diameter (~1.7 m) and
 * four-stage architecture. They are representative, not measured.
 */

/** Tangent-ogive nose profile, returned as lathe points in the XY plane. */
export function ogiveProfile(radius: number, noseLength: number, barrelLength: number, segments = 24) {
  const pts: THREE.Vector2[] = [];
  pts.push(new THREE.Vector2(0.001, 0));
  pts.push(new THREE.Vector2(radius, 0));
  pts.push(new THREE.Vector2(radius, barrelLength));

  // Tangent ogive: rho is the radius of the generating arc.
  const rho = (radius * radius + noseLength * noseLength) / (2 * radius);
  for (let i = 1; i <= segments; i += 1) {
    const x = (i / segments) * noseLength;
    // r(h) = sqrt(rho^2 - h^2) + R - rho, with h measured up from the ogive base.
    const r = Math.sqrt(Math.max(rho * rho - x * x, 0)) + radius - rho;
    pts.push(new THREE.Vector2(Math.max(r, 0.004), barrelLength + x));
  }
  return pts;
}

/** Full fairing shell. `thetaLength` lets it be built as two partable halves. */
export function fairingGeometry(
  radius: number,
  length: number,
  thetaStart: number,
  thetaLength: number,
  quality: number,
) {
  const noseLength = length * 0.62;
  const barrelLength = length - noseLength;
  const pts = ogiveProfile(radius, noseLength, barrelLength, Math.round(14 * quality) + 6);
  const geo = new THREE.LatheGeometry(pts, Math.round(24 * quality) + 12, thetaStart, thetaLength);
  geo.translate(0, -length / 2, 0);
  geo.computeVertexNormals();
  return geo;
}

/** Slightly tapered stage barrel — reads as a real airframe rather than a tube. */
export function stageGeometry(
  radiusBottom: number,
  radiusTop: number,
  length: number,
  quality: number,
) {
  const geo = new THREE.CylinderGeometry(
    radiusTop,
    radiusBottom,
    length,
    Math.round(28 * quality) + 12,
    1,
    false,
  );
  return geo;
}

/** Bell nozzle: a flared skirt, open at both ends. */
export function nozzleGeometry(throatRadius: number, exitRadius: number, length: number, quality: number) {
  const pts: THREE.Vector2[] = [];
  const steps = Math.round(10 * quality) + 6;
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    // Bell contour: fast initial expansion, then flattening.
    const r = throatRadius + (exitRadius - throatRadius) * Math.pow(t, 0.62);
    pts.push(new THREE.Vector2(r, -t * length));
  }
  const geo = new THREE.LatheGeometry(pts, Math.round(24 * quality) + 12);
  geo.computeVertexNormals();
  return geo;
}

/** Thin raised band used for interstages and structural rings. */
export function bandGeometry(radius: number, length: number, quality: number) {
  return new THREE.CylinderGeometry(radius, radius, length, Math.round(28 * quality) + 12, 1, true);
}

export function disposeObject(obj: THREE.Object3D) {
  obj.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (mesh.geometry) mesh.geometry.dispose();
    const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
    if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
    else mat?.dispose();
  });
}
