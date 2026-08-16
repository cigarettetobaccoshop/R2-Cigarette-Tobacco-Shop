// Dijalankan otomatis setelah `next build` (lihat script "postbuild" di package.json).
// Menghasilkan public/sitemap.xml berisi semua halaman statis + halaman produk.
const fs = require('fs');
const path = require('path');

const SITE = 'https://www.r2nusantara.com';

function loadProducts() {
  const raw = fs.readFileSync(path.join(__dirname, '../src/data/products.ts'), 'utf-8');
  const match = raw.match(/export const products: Product\[\] = (\[[\s\S]*?\n\]);/);
  if (!match) return [];
  // eslint-disable-next-line no-eval
  return eval(match[1]);
}

const staticPaths = ['/', '/katalog', '/faq', '/kontak', '/tentang', '/checkout'];
const products = loadProducts();
const productPaths = products.map((p) => `/produk/${p.slug}`);

const urls = [...staticPaths, ...productPaths]
  .map((p) => `  <url><loc>${SITE}${p}</loc></url>`)
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), xml);
console.log(`sitemap.xml dibuat dengan ${staticPaths.length + productPaths.length} URL`);
