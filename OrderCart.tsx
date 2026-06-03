import { X, Minus, Plus, MessageCircle, Check } from "lucide-react";
import { toast } from "sonner";
import type { Produce } from "@/lib/mockData";

export type CartItem = { p: Produce; qty: number };

export function OrderCart({
  open, onClose, items, setQty, remove,
}: {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
}) {
  const total = items.reduce((s, i) => s + i.p.price * i.qty, 0);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-dvh w-full max-w-md flex-col bg-card shadow-2xl transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Order basket"
      >
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <h2 className="text-xl font-bold">Your Order</h2>
            <p className="font-tamil text-sm text-muted-foreground">உங்கள் ஆர்டர்</p>
          </div>
          <button onClick={onClose} className="rounded-full p-2.5 hover:bg-muted" aria-label="Close basket">
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="py-16 text-center">
              <div className="text-5xl">🧺</div>
              <p className="mt-3 text-base font-medium text-muted-foreground">Basket is empty</p>
              <p className="font-tamil text-sm text-muted-foreground">கூடை காலியாக உள்ளது</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map(({ p, qty }) => (
                <li key={p.id} className="flex items-center gap-3 rounded-xl border bg-background/50 p-3">
                  <span className="text-4xl" aria-hidden>{p.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-tamil text-base font-bold leading-tight">{p.nameTamil}</p>
                    <p className="text-xs text-muted-foreground">{p.name} · ₹{p.price}/kg</p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full border bg-card px-1">
                    <button onClick={() => setQty(p.id, Math.max(1, qty - 1))} className="p-2 hover:text-primary" aria-label="Decrease quantity">
                      <Minus className="h-4 w-4" aria-hidden />
                    </button>
                    <span className="w-8 text-center text-base font-bold">{qty}</span>
                    <button onClick={() => setQty(p.id, qty + 1)} className="p-2 hover:text-primary" aria-label="Increase quantity">
                      <Plus className="h-4 w-4" aria-hidden />
                    </button>
                  </div>
                  <button onClick={() => remove(p.id)} className="text-xs font-medium text-muted-foreground hover:text-destructive" aria-label={`Remove ${p.name}`}>
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}

          {items.length > 0 && (
            <div className="mt-6 space-y-2">
              <label className="block">
                <span className="block text-sm font-bold text-foreground/80">Delivery Address</span>
                <span className="font-tamil block text-xs text-muted-foreground">டெலிவரி முகவரி</span>
                <textarea
                  rows={2}
                  placeholder="Door no, street, area, pincode"
                  className="mt-1.5 w-full rounded-lg border bg-background px-3 py-2.5 text-base outline-none focus:ring-2 focus:ring-primary/40"
                />
              </label>
            </div>
          )}
        </div>

        <div className="border-t bg-background/60 px-5 py-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="font-tamil text-xs text-muted-foreground">மொத்தம்</p>
            </div>
            <span className="text-3xl font-extrabold text-primary">₹{total}</span>
          </div>
          <button
            disabled={items.length === 0}
            onClick={() => {
              toast.success("✅ Order placed! · ஆர்டர் வெற்றிகரமாக சேமிக்கப்பட்டது!");
              onClose();
            }}
            className="flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-lg font-bold text-primary-foreground shadow disabled:opacity-50"
          >
            <Check className="h-5 w-5" aria-hidden />
            Place Order · <span className="font-tamil">ஆர்டர் செய்</span>
          </button>
          <a
            href="https://wa.me/910000000000"
            className="mt-3 flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-success bg-success/10 py-2.5 text-sm font-bold text-success"
          >
            <MessageCircle className="h-5 w-5" aria-hidden />
            Order on WhatsApp · <span className="font-tamil">வாட்ஸ்ஆப்</span>
          </a>
        </div>
      </aside>
    </>
  );
}
