import { Truck, MapPin, ArrowRight } from "lucide-react";

type Zone = {
  name: string;
  pin: string;
  orders: number;
  km: number;
  vehicles: number;
  color: string;
  orderList: { name: string; items: string; total: string }[];
  more: number;
};

const colorMap: Record<string, string> = {
  primary: "border-primary/40 bg-primary/5",
  harvest: "border-accent/50 bg-accent/10",
  success: "border-success/40 bg-success/10",
};
const dotMap: Record<string, string> = {
  primary: "bg-primary",
  harvest: "bg-accent",
  success: "bg-success",
};

export function ZoneCard({ z }: { z: Zone }) {
  return (
    <div className={`rounded-2xl border-2 p-5 shadow-sm ${colorMap[z.color]}`}>
      <div className="mb-3 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${dotMap[z.color]}`} />
            <h3 className="text-lg font-bold">{z.name}</h3>
          </div>
          <p className="text-xs text-muted-foreground">PIN {z.pin}</p>
        </div>
        <Truck className="h-5 w-5 text-foreground/40" />
      </div>

      <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium">
        <span>{z.orders} orders</span>
        <span className="text-muted-foreground">·</span>
        <span>{z.km} km route</span>
        <span className="text-muted-foreground">·</span>
        <span>{z.vehicles} vehicle</span>
      </div>

      <ul className="mb-3 space-y-1.5 text-sm">
        {z.orderList.map((o) => (
          <li key={o.name} className="flex items-center justify-between gap-2 rounded-lg bg-card/70 px-2.5 py-1.5">
            <span className="truncate">
              <span className="font-semibold">{o.name}</span>{" "}
              <span className="text-foreground/60">— {o.items}</span>
            </span>
            <span className="shrink-0 font-semibold text-primary">{o.total}</span>
          </li>
        ))}
        {z.more > 0 && <li className="px-2.5 text-xs text-muted-foreground">+ {z.more} more...</li>}
      </ul>

      <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
        <MapPin className="h-4 w-4" /> View Route on Map <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
