import { createFileRoute } from "@tanstack/react-router";
import { Truck, Home, User } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ZoneCard } from "@/components/ZoneCard";
import { zones, deliveryStatus } from "@/lib/mockData";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Delivery Routes — FarmFair Admin" },
      { name: "description", content: "Today's delivery clusters and route optimization for FarmFair operations." },
    ],
  }),
  component: AdminDashboard,
});

const statusStyles: Record<string, string> = {
  "Out for Delivery": "bg-accent/20 text-accent-foreground",
  "Delivered": "bg-success/15 text-success",
  "Packed": "bg-primary/10 text-primary",
};

function AdminDashboard() {
  return (
    <div className="min-h-screen">
      <Header adminBadge />

      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
        <p className="text-sm font-semibold text-accent-foreground/80">Operations</p>
        <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">Today's Delivery Clusters</h1>
        <p className="mt-1 text-sm text-muted-foreground">June 3, 2026</p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Total Orders", value: "24" },
            { label: "Delivery Zones", value: "3" },
            { label: "Total Distance", value: "47 km" },
            { label: "Est. Cost / Order", value: "₹42" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border bg-card p-4 shadow-sm">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="mt-1 text-2xl font-extrabold text-primary">{s.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-3">
        {zones.map((z) => <ZoneCard key={z.id} z={z} />)}
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6">
        <h2 className="mb-4 text-xl font-bold">Route Visualization — Zone 1</h2>
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="relative flex items-center justify-between gap-4 overflow-x-auto py-6">
            <div className="absolute left-10 right-10 top-1/2 -z-0 -translate-y-1/2 border-t-2 border-dashed border-primary/40" />

            <div className="relative z-10 flex shrink-0 flex-col items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl text-primary-foreground shadow-lg">🌾</div>
              <p className="mt-2 text-xs font-semibold">Farm<br />Palacode</p>
            </div>

            {["Priya M.", "Ravi K.", "Meena S.", "Senthil"].map((name) => (
              <div key={name} className="relative z-10 flex shrink-0 flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-card shadow">
                  <Home className="h-5 w-5 text-primary" />
                </div>
                <div className="mt-1 flex items-center gap-1 text-[11px] font-medium">
                  <User className="h-3 w-3" /> {name}
                </div>
              </div>
            ))}

            <div className="relative z-10 flex shrink-0 flex-col items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg">
                <Truck className="h-6 w-6" />
              </div>
              <p className="mt-2 text-xs font-semibold">End</p>
            </div>
          </div>
          <div className="mt-2 text-center text-sm font-semibold text-muted-foreground">
            Total route: <span className="text-primary">12 km</span> · 4 stops · 1 vehicle
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6">
        <h2 className="mb-4 text-xl font-bold">Delivery Status</h2>
        <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-primary/5 text-left text-xs uppercase tracking-wide text-foreground/60">
                <tr>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Items</th>
                  <th className="px-4 py-3">Zone</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Driver</th>
                </tr>
              </thead>
              <tbody>
                {deliveryStatus.map((r) => (
                  <tr key={r.id} className="border-t">
                    <td className="px-4 py-3 font-mono text-xs">{r.id}</td>
                    <td className="px-4 py-3 font-semibold">{r.customer}</td>
                    <td className="px-4 py-3">{r.items}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.zone}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyles[r.status]}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">{r.driver}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
