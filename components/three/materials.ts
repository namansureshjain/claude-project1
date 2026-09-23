import * as THREE from 'three';
import type { ComponentCategory } from '@/data/types';

/**
 * A restrained aerospace palette: composite charcoal, machined alloy, and a
 * single warm accent. Colours carry meaning (category), never decoration.
 */
export const categoryColor: Record<ComponentCategory, string> = {
  propulsion: '#6f7680',
  structures: '#8d949e',
  'payload-systems': '#a7aeb8',
  avionics: '#626871',
  gnc: '#626871',
  separation: '#4e545c',
  'mission-interfaces': '#5b616a',
};

export const accent = new THREE.Color('#ff6b1f');
export const hoverTint = new THREE.Color('#ffb183');

export function makeShellMaterial(color: string) {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    metalness: 0.62,
    roughness: 0.38,
    envMapIntensity: 1.15,
  });
}
