/** @type {import('next').NextConfig} */
const isStaticExport = process.env.STATIC_EXPORT === '1';

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],

  // `npm run export` writes a fully static build to `out/`, for any host that
  // serves files (Netlify, Vercel, S3, GitHub Pages, `npx serve out`). The app
  // is entirely client-rendered, so the export loses nothing.
  //
  // Assets are referenced from the site root, so serve `out/` at the root of a
  // domain. To host it under a subpath instead, set `basePath` to that subpath
  // here — `next/font` rejects relative asset prefixes, so a prefix-free
  // export is not an option.
  ...(isStaticExport ? { output: 'export', images: { unoptimized: true } } : {}),
};

export default nextConfig;
