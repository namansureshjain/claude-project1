import * as THREE from 'three';

/**
 * A procedurally generated lunar surface.
 *
 * This is deliberately NOT presented as a photographic map of the Moon — no
 * lunar imagery is bundled with this project, so rather than pass off an
 * invented map as real, this draws a plausible cratered surface. At the size
 * the Moon occupies on screen it reads correctly; it should not be used to
 * identify any actual feature.
 */

/** Small deterministic PRNG, so the Moon looks the same on every load. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createMoonTexture(size = 1024): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size / 2;
  const ctx = canvas.getContext('2d')!;
  const rand = mulberry32(20260718);

  const W = canvas.width;
  const H = canvas.height;

  ctx.fillStyle = '#8f8b84';
  ctx.fillRect(0, 0, W, H);

  // Maria: the large dark basalt plains.
  for (let i = 0; i < 14; i += 1) {
    const x = rand() * W;
    const y = H * 0.25 + rand() * H * 0.5;
    const r = (0.04 + rand() * 0.11) * W;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, 'rgba(84,81,78,0.85)');
    g.addColorStop(0.7, 'rgba(96,93,89,0.45)');
    g.addColorStop(1, 'rgba(120,116,110,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(x, y, r, r * (0.6 + rand() * 0.5), rand() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }

  // Craters, thinned out toward the poles where the projection smears badly.
  const craters = 900;
  for (let i = 0; i < craters; i += 1) {
    const y = rand() * H;
    const polar = Math.abs(y / H - 0.5) * 2;
    if (rand() < polar * 0.85) continue;

    const x = rand() * W;
    const r = Math.pow(rand(), 3.1) * 0.022 * W + 1.2;
    const shade = 0.5 + rand() * 0.35;

    // Floor.
    ctx.fillStyle = `rgba(${Math.round(104 * shade)},${Math.round(101 * shade)},${Math.round(97 * shade)},0.75)`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();

    // Rim, lit from upper-left to match the scene's key light.
    if (r > 2.2) {
      ctx.strokeStyle = 'rgba(206,201,192,0.55)';
      ctx.lineWidth = Math.max(0.6, r * 0.16);
      ctx.beginPath();
      ctx.arc(x, y, r, Math.PI * 0.75, Math.PI * 1.75);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(58,56,53,0.4)';
      ctx.beginPath();
      ctx.arc(x, y, r, Math.PI * 1.75, Math.PI * 2.75);
      ctx.stroke();
    }
  }

  // Bright ejecta rays from a few young craters.
  for (let i = 0; i < 5; i += 1) {
    const x = rand() * W;
    const y = H * 0.2 + rand() * H * 0.6;
    for (let k = 0; k < 18; k += 1) {
      const a = rand() * Math.PI * 2;
      const len = (0.03 + rand() * 0.1) * W;
      ctx.strokeStyle = `rgba(196,192,184,${0.05 + rand() * 0.09})`;
      ctx.lineWidth = 0.8 + rand() * 1.8;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(a) * len, y + Math.sin(a) * len);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}
