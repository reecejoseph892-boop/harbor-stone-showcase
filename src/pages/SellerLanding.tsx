import { useState } from "react";
import { CheckCircle2, Home, BarChart3, Handshake, Star, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { testimonials, agents } from "@/data/listings";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

const steps = [
  { icon: Home, title: "Tell Us About Your Home", desc: "Enter your address and a few details. Takes 30 seconds." },
  { icon: BarChart3, title: "Get a Market Analysis", desc: "We'll prepare a personalized valuation based on current comps." },
  { icon: Handshake, title: "Sell With Confidence", desc: "Our team handles staging, marketing, and negotiations." },
];

export default function SellerLanding() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ address: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero with Valuation Form */}
      <section className="relative overflow-hidden bg-primary py-20 md:py-28">
        <div className="container relative z-10">
          <div className="mx-auto max-w-xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-3xl font-bold text-primary-foreground md:text-5xl"
            >
              Sell With Harbor & Stone
            </motion.h1>
            <p className="mt-3 text-lg text-primary-foreground/80">
              Get your free, no-obligation home valuation in under 2 minutes.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 rounded-lg bg-card p-8 text-center shadow-lg"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle2 className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-card-foreground">Valuation Requested!</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  We'll prepare your personalized market analysis and reach out within 24 hours.
                </p>
                <a href={`tel:${agents[0].phone}`} className="mt-3 inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
                  <Phone className="h-4 w-4" /> {agents[0].phone}
                </a>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                onSubmit={handleSubmit}
                className="mt-8 rounded-lg bg-card p-6 text-left shadow-lg md:p-8"
              >
                <h3 className="font-heading text-lg font-semibold text-card-foreground">Get Your Free Home Valuation</h3>
                <div className="mt-4 space-y-3">
                  <div>
                    <Label htmlFor="sell-address">Property Address</Label>
                    <Input id="sell-address" placeholder="123 Main St, Austin TX" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} autoComplete="street-address" />
                    {errors.address && <p className="mt-1 text-xs text-destructive">{errors.address}</p>}
                  </div>
                  <div>
                    <Label htmlFor="sell-email">Email</Label>
                    <Input id="sell-email" type="email" placeholder="you@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" />
                    {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                  </div>
                  <div>
                    <Label htmlFor="sell-phone">Phone (optional)</Label>
                    <Input id="sell-phone" type="tel" placeholder="(512) 555-1234" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} autoComplete="tel" />
                  </div>
                  <Button type="submit" className="w-full" size="lg" data-event="seller_valuation_submit">
                    Get My Free Valuation
                  </Button>
                </div>
              </motion.form>
            )}
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="container py-16 md:py-20">
        <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">How It Works</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <s.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-secondary py-16">
        <div className="container">
          <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">Sellers Love Working With Us</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-lg bg-card p-6 shadow-sm">
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-card-foreground italic">"{t.quote}"</p>
                <div className="mt-4 flex items-center gap-3">
                  <img src={t.image} alt={t.name} className="h-10 w-10 rounded-full object-cover" loading="lazy" />
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="container py-16 text-center">
        <p className="text-sm text-muted-foreground">
          <Star className="mr-1 inline h-4 w-4 text-accent" />
          No-pressure valuation. No hidden fees. Cancel your listing anytime.
        </p>
      </section>

      <Footer />
    </div>
  );
}
