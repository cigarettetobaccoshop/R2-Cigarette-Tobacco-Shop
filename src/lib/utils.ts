export function formatHarga(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
}

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

// Placeholder produk: SVG bermotif inisial nama + warna brand, dipakai selama
// foto asli belum diunggah ke /public/assets/products/{slug}.jpg
const PLACEHOLDER_PALETTE = ['#8B5A2B', '#6B4423', '#A9762F', '#5C3A1E'];

export function productPlaceholder(name: string, category: string): string {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
  const hash = [...name].reduce((a, c) => a + c.charCodeAt(0), 0);
  const bg = PLACEHOLDER_PALETTE[hash % PLACEHOLDER_PALETTE.length];
  const gold = '#D4AF37';
  const label = category === 'resmi' ? 'RESMI' : 'R2';
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'>
    <rect width='400' height='400' fill='${bg}'/>
    <rect x='16' y='16' width='368' height='368' fill='none' stroke='${gold}' stroke-width='2'/>
    <text x='200' y='190' font-family='Poppins, sans-serif' font-size='96' font-weight='700' fill='${gold}' text-anchor='middle'>${initials}</text>
    <text x='200' y='250' font-family='Inter, sans-serif' font-size='22' letter-spacing='4' fill='#F5EBD8' text-anchor='middle'>${label}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function productImage(p: { image?: string; name: string; category: string }): string {
  return p.image || productPlaceholder(p.name, p.category);
}
