import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#07080a',
        carbon: '#0e1013',
        graphite: '#16191e',
        steel: '#232830',
        ash: '#3a414c',
        smoke: '#8b939f',
        bone: '#e6e3dd',
        paper: '#f5f3ef',
        ember: '#ff6b1f',
        emberdim: '#c2531a',
        signal: '#4ea1ff',
        verified: '#5bc98a',
        caution: '#e8b13b',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        mission: '0.22em',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.8)', opacity: '0.9' },
          '70%': { transform: 'scale(1.6)', opacity: '0' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
      animation: {
        scanline: 'scanline 7s linear infinite',
        fadeUp: 'fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both',
        pulseRing: 'pulseRing 2.4s cubic-bezier(0.16,1,0.3,1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
