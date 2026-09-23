'use client';

import { useState } from 'react';
import { systemTree } from '@/data/learning';
import { componentById } from '@/data/components';
import type { SystemNode } from '@/data/types';
import { useExplorer } from '@/lib/store';

/**
 * System View — the vehicle as a hierarchy rather than a shape.
 *
 * Drilling down here is how systems engineering actually reads: a vehicle is
 * a tree of subsystems, each of which is someone's whole job.
 */
export default function SystemExplorer() {
  return (
    <div className="border border-white/[0.08]">
      <Node node={systemTree} depth={0} defaultOpen />
    </div>
  );
}

function Node({
  node,
  depth,
  defaultOpen = false,
}: {
  node: SystemNode;
  depth: number;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const selectComponent = useExplorer((s) => s.selectComponent);
  const setExploded = useExplorer((s) => s.setExploded);

  const hasChildren = Boolean(node.children?.length);
  const hasComponents = Boolean(node.componentIds?.length);

  return (
    <div
      className={depth > 0 ? 'border-t border-white/[0.07]' : ''}
      style={{ paddingLeft: depth > 0 ? 0 : undefined }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-4 p-4 text-left transition-colors
                   hover:bg-white/[0.03] md:p-5"
        style={{ paddingLeft: `${indentFor(depth)}px` }}
      >
        <span className="min-w-0">
          <span
            className={`block leading-snug tracking-[-0.01em] ${
              depth === 0
                ? 'text-xl font-light text-paper md:text-2xl'
                : 'text-[15px] font-normal text-bone'
            }`}
          >
            {node.name}
          </span>
          <span className="mt-1 block max-w-xl text-[12px] leading-relaxed text-smoke">
            {node.summary}
          </span>
        </span>
        <span className="mt-1 shrink-0 font-mono text-[11px] text-smoke" aria-hidden>
          {open ? '−' : '+'}
        </span>
      </button>

      {open && (
        <>
          {hasComponents && (
            <ul
              className="flex flex-wrap gap-1.5 pb-4 pr-4 md:pb-5 md:pr-5"
              style={{ paddingLeft: `${indentFor(depth + 1)}px` }}
            >
              {node.componentIds!.map((cid) => {
                const c = componentById.get(cid);
                if (!c) return null;
                return (
                  <li key={cid}>
                    <button
                      type="button"
                      onClick={() => {
                        setExploded(true);
                        selectComponent(cid);
                        document
                          .getElementById('rocket')
                          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className="border border-white/12 px-2.5 py-1.5 font-mono text-[9px] uppercase
                                 tracking-mission text-smoke transition-colors
                                 hover:border-ember/60 hover:text-bone"
                    >
                      <span className="text-ember">{c.code}</span>
                      <span className="mx-1.5 text-white/20">/</span>
                      {c.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
          {hasChildren &&
            node.children!.map((child) => <Node key={child.id} node={child} depth={depth + 1} />)}
        </>
      )}
    </div>
  );
}

function indentFor(depth: number) {
  return 16 + depth * 18;
}
