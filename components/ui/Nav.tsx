'use client';

import { useEffect, useState } from 'react';
import { useExplorer, type SectionId } from '@/lib/store';

const LINKS: { id: SectionId; label: string; href: string }[] = [
  { id: 'rocket', label: 'Rocket', href: '#rocket' },
  { id: 'anatomy', label: 'Anatomy', href: '#anatomy' },
  { id: 'payloads', label: 'Payloads', href: '#payloads' },
  { id: 'mission', label: 'Mission', href: '#mission' },
  { id: 'supply', label: 'Supply chain', href: '#supply' },
  { id: 'learn', label: 'Learn', href: '#learn' },
];

export default function Nav() {
  const section = useExplorer((s) => s.section);
  const setSection = useExplorer((s) => s.setSection);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track which section is in view so the nav reflects position without
  // hijacking scrolling.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setSection(visible.target.id as SectionId);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.2, 0.6] },
    );
    LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [setSection]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[90] transition-colors duration-500 ${
        scrolled ? 'border-b border-white/[0.07] bg-void/80 backdrop-blur-xl' : ''
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[110rem] items-center justify-between gap-4 px-5 py-3.5 md:px-8"
      >
        <a href="#rocket" className="group flex items-baseline gap-2.5">
          <span className="font-mono text-[11px] uppercase tracking-mission text-paper">Vikram-1</span>
          <span className="hidden font-mono text-[9px] uppercase tracking-mission text-smoke sm:inline">
            Anatomy &amp; mission explorer
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={l.href}
                aria-current={section === l.id ? 'true' : undefined}
                className={`block px-3 py-1.5 font-mono text-[10px] uppercase tracking-mission
                            transition-colors duration-200 ${
                              section === l.id ? 'text-ember' : 'text-smoke hover:text-bone'
                            }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="btn-ghost lg:hidden"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>

      {open && (
        <ul
          id="mobile-nav"
          className="border-t border-white/[0.07] bg-void/95 px-5 py-2 backdrop-blur-xl lg:hidden"
        >
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block border-b border-white/[0.05] py-3 font-mono text-[11px] uppercase
                            tracking-mission ${section === l.id ? 'text-ember' : 'text-smoke'}`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
