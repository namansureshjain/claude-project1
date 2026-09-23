import * as THREE from 'three';

/**
 * Skyroot livery, drawn onto canvas textures at runtime.
 *
 * Colours, the chevron treatment, the white airframe and the blue base with the
 * SKYROOT wordmark follow Skyroot's published vehicle renders. Note that the
 * reference render most often circulated is labelled Vikram II; Skyroot uses
 * the same livery family across the Vikram vehicles, so this is a faithful
 * livery, not a measured reproduction of Vikram-1's exact markings.
 *
 * The Skyroot logo mark itself is deliberately not drawn: it could not be
 * reproduced accurately here, and an approximation would be worse than leaving
 * it off.
 *
 * UV note: the stage cylinders are built with thetaStart = -PI, which puts
 * u = 0.5 at the front of the vehicle (+Z) and hides the texture seam at the
 * back. Canvas y = 0 is the top of the section.
 */

export const LIVERY = {
  white: '#f4f5f7',
  shadow: '#dcdee2',
  panel: '#c9ccd2',
  blue: '#123a8f',
  blueDeep: '#0d2a68',
  orange: '#f0631f',
  amber: '#f5a623',
  yellow: '#ffd24a',
  saffron: '#ff9933',
  green: '#138808',
  navy: '#000080',
  ink: '#2b2f36',
};

function makeCanvas(width: number, height: number) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function finish(canvas: HTMLCanvasElement): THREE.CanvasTexture {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.wrapS = THREE.RepeatWrapping;
  return texture;
}

/** Texture height that keeps the drawing square-ish on the real cylinder. */
function sizeFor(circumference: number, length: number, width = 1024) {
  const h = Math.round((width * length) / Math.max(circumference, 0.001));
  return { width, height: THREE.MathUtils.clamp(h, 256, 2048) };
}

/** Faint lengthwise panel seams, so large white areas are not dead flat. */
function panelLines(ctx: CanvasRenderingContext2D, W: number, H: number, count = 6) {
  ctx.save();
  ctx.strokeStyle = 'rgba(0,0,0,0.07)';
  ctx.lineWidth = Math.max(1, W / 512);
  for (let i = 0; i < count; i += 1) {
    const x = (i / count) * W;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  ctx.restore();
}

/** Horizontal ring seam at a given fraction down the section. */
function ringSeam(ctx: CanvasRenderingContext2D, W: number, y: number, weight = 2) {
  ctx.save();
  ctx.strokeStyle = 'rgba(0,0,0,0.13)';
  ctx.lineWidth = weight;
  ctx.beginPath();
  ctx.moveTo(0, y);
  ctx.lineTo(W, y);
  ctx.stroke();
  ctx.restore();
}

/**
 * One chevron band. Apex points up at the front of the vehicle (canvas centre)
 * and the band drops away toward the seam at the back, which is how a chevron
 * wraps a cylinder.
 */
function chevronBand(
  ctx: CanvasRenderingContext2D,
  W: number,
  baseY: number,
  thickness: number,
  amplitude: number,
  color: string,
) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, baseY);
  ctx.lineTo(W / 2, baseY - amplitude);
  ctx.lineTo(W, baseY);
  ctx.lineTo(W, baseY + thickness);
  ctx.lineTo(W / 2, baseY - amplitude + thickness);
  ctx.lineTo(0, baseY + thickness);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

/** Letters stacked down the vehicle, each upright — as on the real airframe. */
function verticalText(
  ctx: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  startY: number,
  fontSize: number,
  color: string,
  letterGap = 1.06,
) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.font = `600 ${fontSize}px "Helvetica Neue", Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  let y = startY;
  for (const ch of text) {
    ctx.fillText(ch, centerX, y);
    y += fontSize * letterGap;
  }
  ctx.restore();
}

/** The Ashoka Chakra: navy circle, 24 spokes. */
function ashokaChakra(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  ctx.save();
  ctx.strokeStyle = LIVERY.navy;
  ctx.fillStyle = LIVERY.navy;
  ctx.lineWidth = Math.max(1, r * 0.075);

  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.13, 0, Math.PI * 2);
  ctx.fill();

  ctx.lineWidth = Math.max(0.7, r * 0.045);
  for (let i = 0; i < 24; i += 1) {
    const a = (i / 24) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * r * 0.16, cy + Math.sin(a) * r * 0.16);
    ctx.lineTo(cx + Math.cos(a) * r * 0.93, cy + Math.sin(a) * r * 0.93);
    ctx.stroke();
  }
  ctx.restore();
}

/** Indian flag decal, 3:2, drawn flat onto the airframe. */
function flagDecal(ctx: CanvasRenderingContext2D, x: number, y: number, w: number) {
  const h = w * (2 / 3);
  ctx.save();
  ctx.fillStyle = LIVERY.saffron;
  ctx.fillRect(x, y, w, h / 3);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x, y + h / 3, w, h / 3);
  ctx.fillStyle = LIVERY.green;
  ctx.fillRect(x, y + (2 * h) / 3, w, h / 3);
  ashokaChakra(ctx, x + w / 2, y + h / 2, h / 6.6);
  ctx.strokeStyle = 'rgba(0,0,0,0.18)';
  ctx.lineWidth = 1;
  ctx.strokeRect(x, y, w, h);
  ctx.restore();
}

/** First stage: white above, the chevron run, then the blue base. */
export function createStageOneTexture(circumference: number, length: number): THREE.CanvasTexture {
  const { width: W, height: H } = sizeFor(circumference, length, 1024);
  const canvas = makeCanvas(W, H);
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = LIVERY.white;
  ctx.fillRect(0, 0, W, H);
  panelLines(ctx, W, H, 8);
  ringSeam(ctx, W, H * 0.18);
  ringSeam(ctx, W, H * 0.4);

  // Blue base occupying the lower third.
  const blueTop = H * 0.66;
  ctx.fillStyle = LIVERY.blue;
  ctx.fillRect(0, blueTop, W, H - blueTop);

  // Chevrons climbing out of the blue, in the order the livery uses.
  const amp = H * 0.075;
  const t = H * 0.026;
  const bands: [string, number][] = [
    [LIVERY.blue, 0],
    [LIVERY.orange, 1.15],
    [LIVERY.amber, 2.3],
    [LIVERY.yellow, 3.45],
    [LIVERY.panel, 4.75],
    [LIVERY.shadow, 5.9],
  ];
  for (const [color, step] of bands) {
    chevronBand(ctx, W, blueTop - step * t, t * 1.02, amp, color);
  }

  verticalText(ctx, 'SKYROOT', W / 2, blueTop + H * 0.085, W * 0.062, '#ffffff', 1.12);

  return finish(canvas);
}

/** Long upper body: the VIKRAM-1 wordmark. */
export function createBodyTexture(circumference: number, length: number): THREE.CanvasTexture {
  const { width: W, height: H } = sizeFor(circumference, length, 1024);
  const canvas = makeCanvas(W, H);
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = LIVERY.white;
  ctx.fillRect(0, 0, W, H);
  panelLines(ctx, W, H, 8);
  ringSeam(ctx, W, H * 0.12);
  ringSeam(ctx, W, H * 0.88);

  verticalText(ctx, 'VIKRAM-1', W / 2, H * 0.3, W * 0.055, LIVERY.ink, 1.1);

  return finish(canvas);
}

/** Section carrying the national flag. */
export function createFlagSectionTexture(
  circumference: number,
  length: number,
): THREE.CanvasTexture {
  const { width: W, height: H } = sizeFor(circumference, length, 1024);
  const canvas = makeCanvas(W, H);
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = LIVERY.white;
  ctx.fillRect(0, 0, W, H);
  panelLines(ctx, W, H, 8);

  const fw = W * 0.17;
  flagDecal(ctx, W / 2 - fw / 2, H * 0.3, fw);

  return finish(canvas);
}

/** Plain painted section: white airframe, or grey for interstages. */
export function createPlainTexture(
  circumference: number,
  length: number,
  base: string,
): THREE.CanvasTexture {
  const { width: W, height: H } = sizeFor(circumference, length, 512);
  const canvas = makeCanvas(W, H);
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = base;
  ctx.fillRect(0, 0, W, H);
  panelLines(ctx, W, H, 6);
  ringSeam(ctx, W, H * 0.5, 1.5);

  return finish(canvas);
}
