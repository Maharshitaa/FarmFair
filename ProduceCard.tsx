import { BadgeCheck, Star, MapPin, Plus } from "lucide-react";
import type { Produce } from "@/lib/mockData";

export function ProduceCard({ p, onAdd }: { p: Produce; onAdd: (p: Produce) => void }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border-2 border-border/70 bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative flex h-44 items-center justify-center bg-gradient-to-br from-accent/15 to-primary/10 text-8xl">
        <span aria-hidden>{p.emoji}</span>
        {p.verified && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-primary-foreground shadow">
            <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
            <span>Verified</span>
            <span className="font-tamil">· சரிபார்க்கப்பட்டது</span>
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-card/95 px-2 py-1 text-[11px] font-semibold text-foreground/80 shadow-sm">
          🌱 {p.harvested === "Harvested today" ? <>Today · <span className="font-tamil">இன்று</span></> : <>Yesterday · <span className="font-tamil">நேற்று</span></>}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="font-tamil text-2xl font-bold leading-tight text-foreground">{p.nameTamil}</h3>
          <p className="text-sm font-semibold text-foreground/70">{p.name}</p>
        </div>

        <p className="flex items-center gap-1.5 text-sm text-foreground/70">
          <MapPin className="h-4 w-4 text-primary" aria-hidden />
          <span>{p.farmer}</span>
          <span className="text-foreground/40">·</span>
          <span>{p.village}</span>
        </p>

        <div className="flex items-end justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-primary">₹{p.price}</span>
              <span className="text-sm text-muted-foreground line-through">₹{p.marketPrice}</span>
            </div>
            <p className="text-xs font-medium text-foreground/70">
              per kg · <span className="font-tamil">ஒரு கிலோ</span>
            </p>
            <p className="mt-1 text-xs text-foreground/60">
              {p.stockKg} kg <span className="font-tamil">இருப்பு</span>
            </p>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-1.5 text-sm font-bold text-success">
            <Star className="h-4 w-4 fill-current" aria-hidden />
            {p.rating}
          </div>
        </div>

        <button
          onClick={() => onAdd(p)}
          className="mt-1 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-base font-bold text-primary-foreground shadow-sm transition hover:brightness-110 active:scale-[0.98]"
          aria-label={`Add ${p.name} to order`}
        >
          <Plus className="h-5 w-5" aria-hidden />
          <span>Add</span>
          <span className="font-tamil">· சேர்</span>
        </button>
      </div>
    </article>
  );
}
