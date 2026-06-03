import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { MessageCircle, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { farmerListings, weeklyEarnings } from "@/lib/mockData";

export const Route = createFileRoute("/farmer")({
  head: () => ({
    meta: [
      { title: "For Farmers — FarmFair" },
      { name: "description", content: "Sell directly to consumers and earn 3x more. List your produce on FarmFair in under a minute." },
      { property: "og:title", content: "Sell Directly. Earn More. — FarmFair" },
      { property: "og:description", content: "Earn 87% of the sale price by listing produce on FarmFair." },
    ],
  }),
  component: FarmerPortal,
});

function FarmerPortal() {
  const [produceName, setProduceName] = useState("");
  const today = new Date().toISOString().slice(0, 10);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = produceName || "Tomato";
    toast.success(`✅ உங்கள் ${name} பட்டியல் சேமிக்கப்பட்டது! Your listing is live.`);
  };

  return (
    <div className="min-h-screen">
      <Header />

      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6">
        <p className="font-semibold text-accent-foreground/80">For Farmers · விவசாயிகளுக்கு</p>
        <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">
          Sell Directly. <span className="text-primary">Earn More.</span>
        </h1>
        <p className="mt-3 max-w-2xl text-foreground/70">
          Cut out the broker. List your harvest in 60 seconds — by form, or by WhatsApp.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Stat label="You earn" value="₹22/kg" tone="green" />
          <Stat label="Mandi price" value="₹8/kg" tone="red" strike />
          <Stat label="Your gain" value="+₹14/kg" tone="orange" />
        </div>
      </section>

      <section className="mx-auto mt-12 grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2">
        <form onSubmit={submit} className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold">List Your Produce Today</h2>
          <p className="mt-1 text-sm text-muted-foreground">Fields marked with * are required.</p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label="Farmer Name *" placeholder="Murugan R." />
            <Field label="Village *" placeholder="Palacode" />
            <Field label="WhatsApp Number *" type="tel" placeholder="+91 9XXXXXXXXX" />
            <Field
              label="Produce Name *"
              placeholder="e.g. Tomato"
              value={produceName}
              onChange={(v) => setProduceName(v)}
            />
            <Field label="Tamil Name" placeholder="e.g. தக்காளி" tamil />
            <Field label="Quantity (kg) *" type="number" placeholder="50" />
            <Field label="Price per kg (₹) *" type="number" placeholder="22" />
            <Field label="Harvest Date" type="date" defaultValue={today} />
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground shadow hover:brightness-110"
          >
            Submit Listing
          </button>
        </form>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border bg-muted/50 p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground/70">
              <MessageCircle className="h-5 w-5 text-success" />
              Or just WhatsApp us:
            </div>
            <a
              href="https://wa.me/910000000000"
              className="mt-3 block w-full rounded-xl bg-success py-3 text-center font-semibold text-white shadow hover:brightness-110"
            >
              Send 'LIST Tomato 50kg 22' to +91-XXXXX-XXXXX
            </a>

            <div className="mt-5 rounded-2xl bg-[#e5ddd5] p-3">
              <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-tr-sm bg-[#dcf8c6] px-3 py-2 text-sm shadow">
                LIST Tomato 50kg 22
                <div className="mt-1 text-right text-[10px] text-foreground/50">10:24 AM ✓✓</div>
              </div>
              <div className="mt-2 w-fit max-w-[90%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 text-sm shadow">
                <p className="font-tamil">✅ உங்கள் தக்காளி பட்டியல் சேமிக்கப்பட்டது!</p>
                <p className="mt-1">50 kg @ ₹22/kg — வாங்குபவர்களுக்கு அறிவிக்கப்பட்டது.</p>
                <div className="mt-1 text-right text-[10px] text-foreground/50">10:24 AM</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">Earnings</h3>
              <TrendingUp className="h-5 w-5 text-success" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div><p className="text-xs text-muted-foreground">This Week</p><p className="text-lg font-extrabold text-primary">₹2,340</p></div>
              <div><p className="text-xs text-muted-foreground">This Month</p><p className="text-lg font-extrabold text-primary">₹9,870</p></div>
              <div><p className="text-xs text-muted-foreground">Avg / order</p><p className="text-lg font-extrabold text-primary">₹292</p></div>
            </div>
            <div className="mt-4 h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyEarnings}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="earnings" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6">
        <h2 className="mb-4 text-xl font-bold">My Listings — Murugan R.</h2>
        <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-primary/5 text-left text-xs uppercase tracking-wide text-foreground/60">
                <tr>
                  <th className="px-4 py-3">Produce</th>
                  <th className="px-4 py-3">Qty</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Orders</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {farmerListings.map((l) => (
                  <tr key={l.produce} className="border-t">
                    <td className="px-4 py-3 font-semibold">{l.produce}</td>
                    <td className="px-4 py-3">{l.qty}</td>
                    <td className="px-4 py-3">{l.price}</td>
                    <td className="px-4 py-3">{l.orders}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                          l.status === "Active" ? "bg-success/15 text-success" : "bg-accent/20 text-accent-foreground"
                        }`}
                      >
                        ● {l.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold text-primary">{l.revenue}</td>
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

function Stat({ label, value, tone, strike }: { label: string; value: string; tone: "green" | "red" | "orange"; strike?: boolean }) {
  const tones = {
    green: "border-success/40 bg-success/10 text-success",
    red: "border-destructive/30 bg-destructive/5 text-destructive",
    orange: "border-accent/40 bg-accent/15 text-accent-foreground",
  };
  return (
    <div className={`rounded-2xl border-2 p-5 ${tones[tone]}`}>
      <p className="text-xs font-semibold uppercase tracking-wide opacity-80">{label}</p>
      <p className={`mt-1 text-3xl font-extrabold ${strike ? "line-through" : ""}`}>{value}</p>
    </div>
  );
}

function Field({
  label, type = "text", placeholder, defaultValue, value, onChange, tamil,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (v: string) => void;
  tamil?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-foreground/70">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className={`w-full rounded-xl border bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30 ${tamil ? "font-tamil" : ""}`}
      />
    </label>
  );
}
