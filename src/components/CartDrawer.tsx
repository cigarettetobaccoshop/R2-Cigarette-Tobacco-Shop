import Link from 'next/link';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatHarga, productImage } from '@/lib/utils';

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, removeItem, total, count } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={closeCart}
      />
      <aside
        className={`widget_shopping_cart fixed right-0 top-0 z-50 h-full w-full max-w-sm transform bg-white shadow-2xl transition-transform duration-300 dark:bg-neutral-900 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 p-4 dark:border-neutral-800">
          <h2 className="font-poppins text-lg font-bold">Keranjang ({count})</h2>
          <button onClick={closeCart} aria-label="Tutup">
            <X size={22} />
          </button>
        </div>

        <div className="flex h-[calc(100%-160px)] flex-col gap-3 overflow-y-auto p-4">
          {items.length === 0 && (
            <p className="mt-10 text-center text-sm text-neutral-500">Keranjang masih kosong.</p>
          )}
          {items.map((it) => (
            <div key={it.product.id} className="flex gap-3 border-b border-neutral-100 pb-3 dark:border-neutral-800">
              <img src={productImage(it.product)} alt={it.product.name} className="h-16 w-16 rounded-md object-cover" />
              <div className="flex-1">
                <p className="line-clamp-1 text-sm font-medium">{it.product.name}</p>
                <p className="text-sm font-bold text-tembakau-700 dark:text-emas-400">{formatHarga(it.product.price)}</p>
                <div className="mt-1 flex items-center gap-2">
                  <button
                    onClick={() => updateQty(it.product.id, it.qty - 1)}
                    className="rounded border border-neutral-300 p-1 dark:border-neutral-700"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-6 text-center text-sm">{it.qty}</span>
                  <button
                    onClick={() => updateQty(it.product.id, it.qty + 1)}
                    className="rounded border border-neutral-300 p-1 dark:border-neutral-700"
                  >
                    <Plus size={14} />
                  </button>
                  <button onClick={() => removeItem(it.product.id)} className="ml-auto text-neutral-400 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 w-full border-t border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="mb-3 flex justify-between text-sm font-semibold">
            <span>Total</span>
            <span>{formatHarga(total)}</span>
          </div>
          <Link
            href="/checkout"
            onClick={closeCart}
            className={`block w-full rounded-lg py-3 text-center text-sm font-semibold text-white ${
              items.length === 0 ? 'pointer-events-none bg-neutral-300' : 'bg-tembakau-700 hover:bg-tembakau-800'
            }`}
          >
            Checkout
          </Link>
        </div>
      </aside>
    </>
  );
}
