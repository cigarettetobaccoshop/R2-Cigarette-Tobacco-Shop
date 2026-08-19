import Link from 'next/link';
import { useState } from 'react';
import { Product } from '@/types';
import { formatHarga, productImage } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Check } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  const outOfStock = product.stock <= 0;
  const lowStock = product.stock > 0 && product.stock <= 5;

  return (
    <li className="product group relative flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
      <Link href={`/produk/${product.slug}`} className="flex flex-1 flex-col">
        <div className="relative aspect-square overflow-hidden bg-tembakau-50">
          <img
            src={productImage(product)}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <span
            className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[11px] font-semibold tracking-wide text-white shadow ${
              product.category === 'resmi' ? 'bg-tembakau-700' : 'bg-emas-600'
            }`}
          >
            {product.category === 'resmi' ? 'RESMI' : 'R2'}
          </span>
          {lowStock && !outOfStock && (
            <span className="absolute right-2 top-2 rounded-full bg-orange-500 px-2 py-0.5 text-[11px] font-semibold text-white shadow">
              Stok Menipis
            </span>
          )}
          {outOfStock && (
            <span className="absolute right-2 top-2 rounded-full bg-neutral-700 px-2 py-0.5 text-[11px] font-semibold text-white shadow">
              Habis
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-1 p-3">
          {product.subcategory && (
            <span className="text-[11px] uppercase tracking-wide text-neutral-400">
              {product.subcategory}
            </span>
          )}
          <h3 className="line-clamp-2 text-sm font-medium text-neutral-800 dark:text-neutral-100">
            {product.name}
          </h3>
          <div className="mt-auto flex items-baseline gap-2 pt-1">
            {product.compareAtPrice && (
              <span className="text-xs text-neutral-400 line-through">
                {formatHarga(product.compareAtPrice)}
              </span>
            )}
            <span className="text-base font-bold text-tembakau-700 dark:text-emas-400">
              {formatHarga(product.price)}
            </span>
          </div>
        </div>
      </Link>
      <button
        onClick={handleAdd}
        disabled={outOfStock}
        className="add_to_cart_button ajax_add_to_cart m-3 mt-0 flex items-center justify-center gap-2 rounded-lg bg-tembakau-700 py-2 text-sm font-semibold text-white transition-colors hover:bg-tembakau-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
      >
        {added ? <Check size={16} /> : <ShoppingCart size={16} />}
        {added ? 'Ditambahkan' : outOfStock ? 'Stok Habis' : 'Tambah ke Keranjang'}
      </button>
    </li>
  );
}
