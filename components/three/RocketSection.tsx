'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import type { RocketComponent } from '@/data/types';
import { categoryColor } from './materials';
import { fairingGeometry, nozzleGeometry, stageGeometry } from '@/lib/geometry';
import {
  LIVERY,
  createBodyTexture,
  createFlagSectionTexture,
  createPlainTexture,
  createStageOneTexture,
} from '@/lib/liveryTextures';

/** thetaStart for wrapped sections: puts u = 0.5 at the front (+Z), so drawn
 *  livery faces the camera and the texture seam hides at the back. */
const SEAM_AT_BACK = -Math.PI;

const HOVER_EMISSIVE = 0.07;
const SELECTED_EMISSIVE = 0.14;
const DIMMED = 0.16;

interface Props {
  component: RocketComponent;
  exploded: boolean;
  hovered: boolean;
  selected: boolean;
  /** True when some OTHER section is selected, so this one should recede. */
  dimmed: boolean;
  quality: number;
  animate: boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}

/**
 * One section of the vehicle.
 *
 * Owns its own geometry, its assembled/exploded position and its hover,
 * selected and dimmed states. Every visual state is damped rather than
 * snapped, so the exploded transition reads as hardware moving apart.
 */
export default function RocketSection({
  component,
  exploded,
  hovered,
  selected,
  dimmed,
  quality,
  animate,
  onHover,
  onSelect,
}: Props) {
  const group = useRef<THREE.Group>(null);
  const leftHalf = useRef<THREE.Group>(null);
  const rightHalf = useRef<THREE.Group>(null);
  const materials = useRef<THREE.MeshStandardMaterial[]>([]);

  const baseColor = useMemo(
    () => new THREE.Color(liveryTint(component.id) ?? categoryColor[component.category]),
    [component.id, component.category],
  );

  // Livery is drawn to a canvas rather than downloaded, so it stays sharp at
  // any zoom and costs nothing to load.
  const livery = useMemo(() => {
    const circumference = 2 * Math.PI * component.radius;
    switch (component.id) {
      case 'stage-1':
        return createStageOneTexture(circumference, component.length);
      case 'stage-2':
        return createBodyTexture(circumference, component.length);
      case 'stage-3':
        return createFlagSectionTexture(circumference, component.length);
      case 'stage-4-oam':
        return createPlainTexture(circumference, component.length, LIVERY.white);
      case 'interstage-1-2':
      case 'interstage-2-3':
        return createPlainTexture(circumference, component.length, LIVERY.panel);
      case 'payload-fairing':
        return null;
      default:
        return null;
    }
  }, [component.id, component.radius, component.length]);

  useEffect(() => () => livery?.dispose(), [livery]);

  const painted = isPainted(component.id);

  const registerMaterial = (m: THREE.MeshStandardMaterial | null) => {
    if (m && !materials.current.includes(m)) materials.current.push(m);
  };

  const geometry = useMemo(() => buildGeometry(component, quality), [component, quality]);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;

    const targetY = exploded ? component.position + component.explodedOffset : component.position;
    const rate = animate ? 4.2 : 1000;
    g.position.y = THREE.MathUtils.damp(g.position.y, targetY, rate, delta);

    // Hovered or selected sections ease very slightly outward, like a drawer.
    const targetScale = selected ? 1.028 : hovered ? 1.014 : 1;
    const s = THREE.MathUtils.damp(g.scale.x, targetScale, 8, delta);
    g.scale.setScalar(s);

    // The fairing lifts away whole. Parting the two halves sideways made the
    // nose look like it was opening outwards instead of the stack separating
    // cleanly in order, so the halves stay together.
    const part = 0;
    if (leftHalf.current) {
      leftHalf.current.position.x = THREE.MathUtils.damp(leftHalf.current.position.x, -part, rate, delta);
    }
    if (rightHalf.current) {
      rightHalf.current.position.x = THREE.MathUtils.damp(rightHalf.current.position.x, part, rate, delta);
    }

    const targetEmissive = selected ? SELECTED_EMISSIVE : hovered ? HOVER_EMISSIVE : 0;
    const targetOpacity = dimmed ? DIMMED : 1;
    for (const m of materials.current) {
      m.emissiveIntensity = THREE.MathUtils.damp(m.emissiveIntensity, targetEmissive, 9, delta);
      m.opacity = THREE.MathUtils.damp(m.opacity, targetOpacity, 7, delta);
      m.transparent = m.opacity < 0.995;
    }
  });

  const handleOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    onHover(component.id);
  };
  const handleOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    onHover(null);
  };
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onSelect(component.id);
  };

  const shell = (
    <meshStandardMaterial
      ref={registerMaterial}
      map={livery ?? undefined}
      color={livery ? '#ffffff' : baseColor}
      metalness={painted ? 0.08 : 0.55}
      roughness={painted ? 0.46 : 0.36}
      emissive="#ff6b1f"
      emissiveIntensity={0}
      envMapIntensity={painted ? 0.75 : 1.4}
      side={THREE.DoubleSide}
    />
  );

  return (
    <group
      ref={group}
      position={[0, component.position, 0]}
      onPointerOver={handleOver}
      onPointerOut={handleOut}
      onClick={handleClick}
    >
      {component.id === 'payload-fairing' ? (
        <>
          <group ref={leftHalf}>
            <mesh geometry={geometry.primary} castShadow receiveShadow>
              {shell}
            </mesh>
          </group>
          <group ref={rightHalf}>
            <mesh geometry={geometry.secondary!} castShadow receiveShadow>
              <meshStandardMaterial
                ref={registerMaterial}
                color={baseColor}
                metalness={0.08}
                roughness={0.46}
                emissive="#ff6b1f"
                emissiveIntensity={0}
                envMapIntensity={0.75}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        </>
      ) : (
        <mesh geometry={geometry.primary} castShadow receiveShadow>
          {shell}
        </mesh>
      )}

      {/* Detail passes: rings, engine bells, payload blocks. */}
      {geometry.details.map((d, i) => (
        <mesh key={i} geometry={d.geometry} position={d.position} rotation={d.rotation}>
          <meshStandardMaterial
            ref={registerMaterial}
            color={d.color}
            metalness={d.metalness ?? 0.75}
            roughness={d.roughness ?? 0.3}
            emissive="#ff6b1f"
            emissiveIntensity={0}
            envMapIntensity={1.55}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

/** Painted airframe reads very differently from bare metal, so it gets its own
 *  material response: low metalness, higher roughness, restrained reflections. */
function isPainted(id: string) {
  return [
    'payload-fairing',
    'payload-adapter',
    'stage-1',
    'stage-2',
    'stage-3',
    'stage-4-oam',
    'interstage-1-2',
    'interstage-2-3',
  ].includes(id);
}

/** Base colour for painted sections that carry no drawn livery. */
function liveryTint(id: string): string | null {
  switch (id) {
    case 'payload-fairing':
      return LIVERY.white;
    case 'payload-adapter':
      return LIVERY.panel;
    default:
      return null;
  }
}

function deckPlate(radius: number, length: number, segments: number) {
  const geo = new THREE.CylinderGeometry(radius, radius, 0.07, segments);
  geo.translate(0, -length / 2 + 0.035, 0);
  return geo;
}

interface Detail {
  geometry: THREE.BufferGeometry;
  position: [number, number, number];
  rotation?: [number, number, number];
  color: string;
  metalness?: number;
  roughness?: number;
}

interface BuiltGeometry {
  primary: THREE.BufferGeometry;
  secondary?: THREE.BufferGeometry;
  details: Detail[];
}

/**
 * Representative geometry, derived from the published 20 m height and 1.7 m
 * diameter and the published four-stage architecture. Not an engineering model.
 */
function buildGeometry(c: RocketComponent, quality: number): BuiltGeometry {
  const details: Detail[] = [];
  const ringSegments = Math.round(28 * quality) + 12;

  const ring = (radius: number, y: number, thickness = 0.035, color = '#8f979f') => {
    details.push({
      geometry: new THREE.TorusGeometry(radius, thickness, 6, ringSegments),
      position: [0, y, 0],
      rotation: [Math.PI / 2, 0, 0],
      color,
    });
  };

  switch (c.id) {
    case 'payload-fairing': {
      return {
        primary: fairingGeometry(c.radius, c.length, 0, Math.PI, quality),
        secondary: fairingGeometry(c.radius, c.length, Math.PI, Math.PI, quality),
        details: [],
      };
    }

    case 'payload-section': {
      // An open cage rather than a drum: the payloads are the point, so they
      // have to be visible. Positions on the deck are a layout choice, not a
      // documented arrangement.
      const blockColors = ['#ff6b1f', '#4ea1ff', '#5bc98a', '#e8b13b', '#cfd6e2', '#e4c07a'];
      blockColors.forEach((color, i) => {
        const angle = (i / blockColors.length) * Math.PI * 2;
        const r = i < 4 ? 0.2 : 0.3;
        const h = i < 4 ? 0.5 : 0.18;
        details.push({
          geometry: new THREE.BoxGeometry(0.17, h, 0.17),
          position: [Math.cos(angle) * r, -c.length / 2 + h / 2 + 0.12, Math.sin(angle) * r],
          color,
          metalness: 0.45,
          roughness: 0.45,
        });
      });
      // Four longerons and two rings hold the cage together.
      for (let i = 0; i < 4; i += 1) {
        const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
        details.push({
          geometry: new THREE.BoxGeometry(0.05, c.length, 0.05),
          position: [Math.cos(angle) * c.radius * 0.94, 0, Math.sin(angle) * c.radius * 0.94],
          color: '#9aa2ab',
        });
      }
      ring(c.radius * 0.94, c.length / 2 - 0.03, 0.028, '#9aa2ab');
      return {
        // The deck plate the payloads stand on.
        primary: deckPlate(c.radius, c.length, ringSegments),
        details,
      };
    }

    case 'payload-adapter': {
      ring(c.radius * 1.02, 0, 0.03);
      return {
        primary: new THREE.CylinderGeometry(
          c.radius * 0.84,
          c.radius,
          c.length,
          ringSegments,
          1,
          false,
          SEAM_AT_BACK,
        ),
        details,
      };
    }

    case 'stage-4-oam': {
      // Four Raman-1 engine bells, as publicly reported.
      for (let i = 0; i < 4; i += 1) {
        const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
        details.push({
          geometry: nozzleGeometry(0.045, 0.11, 0.26, quality),
          position: [Math.cos(angle) * 0.26, -c.length / 2 + 0.02, Math.sin(angle) * 0.26],
          color: '#b9c0c9',
          metalness: 0.85,
          roughness: 0.25,
        });
      }
      ring(c.radius * 1.01, c.length / 2 - 0.08, 0.028);
      return {
        primary: stageGeometry(c.radius, c.radius * 0.92, c.length, quality),
        details,
      };
    }

    case 'stage-3':
    case 'stage-2':
    case 'stage-1': {
      // No structural rings: the drawn livery carries the detail now, and a
      // raised ring cut straight across the first stage's chevrons.
      const topR = c.id === 'stage-1' ? c.radius : c.radius * 0.96;
      return { primary: stageGeometry(c.radius, topR, c.length, quality), details };
    }

    case 'interstage-1-2':
    case 'interstage-2-3': {
      ring(c.radius * 1.02, -c.length / 2 + 0.03, 0.03, '#b9bfc7');
      ring(c.radius * 1.02, c.length / 2 - 0.03, 0.03, '#b9bfc7');
      return {
        primary: new THREE.CylinderGeometry(
          c.radius * 0.95,
          c.radius,
          c.length,
          ringSegments,
          1,
          true,
          SEAM_AT_BACK,
        ),
        details,
      };
    }

    case 'propulsion-nozzle-s1': {
      // A boat-tail skirt narrowing to the throat, then the bell flaring to the exit.
      const skirt = new THREE.CylinderGeometry(c.radius, 0.34, 0.62, ringSegments, 1, true);
      skirt.translate(0, c.length / 2 - 0.31, 0);

      const bell = nozzleGeometry(0.3, c.radius * 0.76, 0.78, quality);
      details.push({
        geometry: bell,
        position: [0, c.length / 2 - 0.62, 0],
        color: '#aab2bb',
        metalness: 0.9,
        roughness: 0.2,
      });
      ring(c.radius * 1.005, c.length / 2 - 0.03, 0.03, '#9aa2ab');
      return { primary: skirt, details };
    }

    default:
      return { primary: stageGeometry(c.radius, c.radius, c.length, quality), details };
  }
}
