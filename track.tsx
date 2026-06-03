import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, MessageCircle, Clock } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StatusStepper } from "@/components/StatusStepper";
import { trackOrder } from "@/lib/mockData";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "Track Your Order — FarmFair" },
      { name: "description", content: "Track your FarmFair order in real time using your order ID or WhatsApp number." },
    ],
  }),
  component: TrackOrder,
});

function TrackOrder() {
  const [input, setInput] = useState("");
  const show = input.trim().toUpperCase().replace(/\s/g, "") === "#FF-0241" || input.trim() === "FF-0241";

  return (
    <div className="min-h-screen">
      <Header />

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p className="text-sm font-semibold text-accent-foreground/80">Track Order</p>
        <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">Where's my produce?</h1>
        <p className="mt-2 text-foreground/70">
          Try order ID <button onClick={() => setInput("#FF-0241")} className="font-mono font-semibold text-primary underline">#FF-0241</button>
        </p>

        <div className="mt-6 flex items-center gap-2 rounded-2xl border bg-card p-2 shadow-sm">
          <Search className="ml-2 h-5 w-5 text-muted-foreground" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your Order ID or WhatsApp number"
            className="flex-1 bg-transparent px-2 py-2 text-sm outline-none"
          />
        </div>

        {show && (
          <div className="mt-8 rounded-2xl border bg-card p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase text-muted-foreground">Order</p>
                <p className="font-mono text-lg font-bold text-primary">{trackOrder.id}</p>
              </div>
              <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent-foreground">
                In Progress
              </span>
            </div>

            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              <Row label="Items" value={trackOrder.items} />
              <Row label="Farm" value={trackOrder.farm} />
              <Row label="Total" value={<span className="font-bold text-primary">{trackOrder.total}</span>} />
              <Row label="Delivery" value={trackOrder.delivery} />
            </dl>

            <div className="my-8 border-t pt-8">
              <StatusStepper steps={trackOrder.steps} />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-primary/5 p-4">
              <div>
                <p className="text-xs text-muted-foreground">Driver</p>
                <p className="font-bold">{trackOrder.driver}</p>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-foreground/70">
                <Clock className="h-4 w-4" /> ETA {trackOrder.eta}
              </div>
              <a
                href="https://wa.me/910000000000"
                className="inline-flex items-center gap-1.5 rounded-full bg-success px-4 py-2 text-sm font-semibold text-white shadow"
              >
                <MessageCircle className="h-4 w-4" /> Contact Driver
              </a>
            </div>
          </div>
        )}

        {!show && input.trim() !== "" && (
          <div className="mt-8 rounded-2xl border-2 border-dashed bg-card/50 p-8 text-center text-sm text-muted-foreground">
            🔍 No order found. Try <span className="font-mono font-semibold text-primary">#FF-0241</span>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-background/60 px-3 py-2">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 text-sm font-medium">{value}</dd>
    </div>
  );
}
