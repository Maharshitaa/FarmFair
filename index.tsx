import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, ShoppingBasket } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProduceCard } from "@/components/ProduceCard";
import { OrderCart, type CartItem } from "@/components/OrderCart";
import { produce, heroStats, type Produce } from "@/lib/mockData";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FarmFair — Farm Fresh. No Middlemen. Fair Price." },
      { name: "description", content: "Order directly from farmers within 30 km of you. Direct-to-consumer marketplace for rural Tamil Nadu." },
      { property: "og:title", content: "FarmFair — Farm Fresh. No Middlemen." },
      { property: "og:description", content: "Order directly from farmers within 30 km of you." },
    ],
  }),
  component: Marketplace,
});

const categories = [
  { en: "All", ta: "அனைத்தும்", emoji: "🌾" },
  { en: "Vegetables", ta: "காய்கறி", emoji: "🥕" },
  { en: "Fruits", ta: "பழங்கள்", emoji: "🍌" },
  { en: "Grains", ta: "தானியம்", emoji: "🌽" },
] as const;

function Marketplace() {
  const [cat, setCat] = useState<(typeof categories)[number]["en"]>("All");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(
    () =>
      produce.filter(
        (p) =>
          (cat === "All" || p.category === cat) &&
          (query === "" ||
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.nameTamil.includes(query)),
      ),
    [cat, query],
  );

  const addToCart = (p: Produce) => {
    setCart((c) => {
      const existing = c.find((i) => i.p.id === p.id);
      if (existing) return c.map((i) => (i.p.id === p.id ? { ...i, qty: i.qty + 1 } : i));
      return [...c, { p, qty: 1 }];
    });
    setCartOpen(true);
  };

  return (
    <div className="min-h-dvh">
      <Header />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 sm:pt-16">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 px-3 py-1.5 text-xs font-bold text-success">
              🌱 Live in Dharmapuri & Krishnagiri ·{" "}
              <span className="font-tamil">தர்மபுரி · கிருஷ்ணகிரி</span>
            </span>

            <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
              <span className="font-tamil block text-2xl text-primary sm:text-4xl">
                நேரடியாக விவசாயிகளிடம் இருந்து வாங்குங்கள்
              </span>
              <span className="mt-2 block">
                Farm Fresh. <span className="text-primary">No Middlemen.</span>{" "}
                <span className="text-accent-foreground">Fair Price.</span>
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-base text-foreground/70 sm:text-lg">
              Order directly from farmers within 30 km.
              <br />
              <span className="font-tamil text-sm">விவசாயிக்கு நேரடி பணம் — தரகர் இல்லை.</span>
            </p>

            <label className="mt-7 flex max-w-2xl items-center gap-2 rounded-2xl border-2 bg-card p-2 shadow-sm focus-within:border-primary">
              <Search className="ml-2 h-5 w-5 text-muted-foreground" aria-hidden />
              <span className="sr-only">Search produce</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search · தேடுங்கள் (e.g. தக்காளி, Tomato)"
                className="flex-1 bg-transparent px-2 py-2.5 text-base outline-none placeholder:text-muted-foreground"
              />
            </label>

            <div className="mt-5 grid grid-cols-4 gap-2 sm:flex sm:flex-wrap">
              {categories.map((c) => {
                const active = cat === c.en;
                return (
                  <button
                    key={c.en}
                    onClick={() => setCat(c.en)}
                    aria-pressed={active}
                    className={`flex min-h-16 flex-col items-center justify-center gap-0.5 rounded-2xl border-2 px-3 py-2 text-center transition ${
                      active
                        ? "border-primary bg-primary text-primary-foreground shadow-md"
                        : "border-border bg-card text-foreground/80 hover:border-primary/40"
                    }`}
                  >
                    <span className="text-xl" aria-hidden>{c.emoji}</span>
                    <span className="text-[11px] font-bold sm:text-sm">{c.en}</span>
                    <span className="font-tamil text-[11px] font-semibold opacity-90 sm:text-xs">{c.ta}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 rounded-2xl border bg-card/70 p-4 backdrop-blur sm:grid-cols-4">
              {heroStats.map((s) => (
                <div key={s.label} className="flex items-center gap-3">
                  <span className="text-3xl" aria-hidden>{s.icon}</span>
                  <div>
                    <p className="text-xl font-extrabold leading-tight text-primary">{s.value}</p>
                    <p className="text-xs leading-tight text-muted-foreground">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-extrabold sm:text-3xl">Fresh from the farm</h2>
              <p className="font-tamil text-sm text-muted-foreground">பண்ணையில் இருந்து புதியதாக</p>
            </div>
            <p className="text-sm font-semibold text-muted-foreground">{filtered.length} items</p>
          </div>

          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-[380px] rounded-2xl shimmer" />
              ))}
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <ProduceCard key={p.id} p={p} onAdd={addToCart} />
              ))}
            </div>
          )}
        </section>
      </main>

      {cart.length > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 z-30 flex min-h-14 items-center gap-2 rounded-full bg-primary px-5 py-3.5 text-base font-bold text-primary-foreground shadow-xl"
          aria-label="Open basket"
        >
          <ShoppingBasket className="h-5 w-5" aria-hidden />
          {cart.reduce((s, i) => s + i.qty, 0)} ·{" "}
          <span className="font-tamil text-sm">பொருட்கள்</span> · ₹
          {cart.reduce((s, i) => s + i.p.price * i.qty, 0)}
        </button>
      )}

      <OrderCart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        setQty={(id, qty) => setCart((c) => c.map((i) => (i.p.id === id ? { ...i, qty } : i)))}
        remove={(id) => setCart((c) => c.filter((i) => i.p.id !== id))}
      />

      <Footer />
    </div>
  );
}
