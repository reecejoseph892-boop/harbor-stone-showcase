import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight, Star, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { listings, formatPrice, testimonials, stats } from "@/data/listings";
import PropertyCard from "@/components/PropertyCard";
import QuickViewModal from "@/components/QuickViewModal";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { type Property } from "@/data/listings";
import { motion } from "framer-motion";

export default function Index() {
  const [quickViewProperty, setQuickViewProperty] = useState<Property | null>(null);
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [checklist, setChecklist] = useState("");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* ===== HERO ===== */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-foreground">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"
          alt="Beautiful Austin neighborhood home"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 to-foreground/40" />
        <div className="container relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="font-heading text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
              Find your next home in Austin — quickly, clearly, confidently.
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80 md:text-xl">
              Local expertise, easy scheduling, and transparent offers — start with a showing or get a free valuation.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild data-event="hero_book_showing">
                <Link to="/listings">Book a Showing</Link>
              </Button>
              <Button size="lg" variant="secondary" className="bg-gold text-gold-foreground hover:bg-gold/90 border-none px-8" asChild data-event="hero_valuation">
                <Link to="/sell">Get a Free Valuation</Link>
              </Button>
            </div>
          </motion.div>

          {/* Quick Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 max-w-3xl rounded-lg bg-card/85 p-4 shadow-2xl backdrop-blur-md border border-white/10 md:p-5"
          >
            <form className="flex flex-col gap-3 md:flex-row md:items-end">
              <div className="flex-1">
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Location</label>
                <Select defaultValue="austin">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="austin">Austin, TX</SelectItem>
                    <SelectItem value="zilker">Zilker</SelectItem>
                    <SelectItem value="barton">Barton Hills</SelectItem>
                    <SelectItem value="east">East Austin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Price Range</label>
                <Select defaultValue="any">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Price</SelectItem>
                    <SelectItem value="under500">Under $500K</SelectItem>
                    <SelectItem value="500-800">$500K – $800K</SelectItem>
                    <SelectItem value="800-1m">$800K – $1M</SelectItem>
                    <SelectItem value="over1m">$1M+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Beds</label>
                <Select defaultValue="any">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button asChild className="gap-1.5" data-event="hero_search">
                <Link to="/listings"><Search className="h-4 w-4" /> Search</Link>
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURED LISTINGS ===== */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="container py-24 md:py-32"
      >
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-5xl">Featured Listings</h2>
            <p className="mt-2 text-lg text-muted-foreground">Hand-picked homes in Austin's best neighborhoods</p>
          </div>
          <Link to="/listings" className="hidden items-center gap-2 text-sm font-semibold text-primary hover:underline md:flex">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((p) => (
            <PropertyCard key={p.id} property={p} onQuickView={setQuickViewProperty} />
          ))}
        </div>
        <Link to="/listings" className="mt-8 flex items-center justify-center gap-1 text-sm font-medium text-primary hover:underline md:hidden">
          View all listings <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.section>

      {/* ===== LEAD MAGNET ===== */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-primary py-20 md:py-28"
      >
        <div className="container text-center">
          <h2 className="font-heading text-3xl font-bold text-primary-foreground md:text-4xl">
            Get Our 7-Step Buying Checklist
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
            Everything first-time and move-up buyers need to know before touring Austin homes.
          </p>
          {emailCaptured ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 flex items-center justify-center gap-2 text-primary-foreground">
              <CheckCircle2 className="h-5 w-5" /> Check your inbox!
            </motion.div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); if (checklist.includes("@")) setEmailCaptured(true); }}
              className="mx-auto mt-6 flex max-w-md gap-2"
            >
              <Input
                type="email"
                placeholder="you@email.com"
                value={checklist}
                onChange={(e) => setChecklist(e.target.value)}
                className="bg-primary-foreground text-foreground"
                aria-label="Email for buying checklist"
                required
              />
              <Button type="submit" variant="secondary" data-event="checklist_download">
                <Mail className="mr-1.5 h-4 w-4" /> Send It
              </Button>
            </form>
          )}
        </div>
      </motion.section>

      {/* ===== TRUST / STATS ===== */}
      <section className="container py-24 md:py-32">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {stats.map((s, idx) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center"
            >
              <p className="font-heading text-4xl font-bold text-primary md:text-5xl">{s.value}</p>
              <p className="mt-2 text-sm font-medium uppercase tracking-widest text-muted-foreground/80">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="bg-secondary/50 py-24 md:py-32">
        <div className="container">
          <h2 className="text-center font-heading text-3xl font-bold text-foreground md:text-5xl">What Our Clients Say</h2>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-xl bg-card p-8 shadow-sm border border-border/50 hover:shadow-md transition-shadow"
              >
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-lg leading-relaxed text-card-foreground italic">"{t.quote}"</p>
                <div className="mt-6 flex items-center gap-4">
                  <img src={t.image} alt={t.name} className="h-12 w-12 rounded-full object-cover border-2 border-primary/10" loading="lazy" />
                  <div>
                    <p className="font-bold text-card-foreground">{t.name}</p>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA STRIP ===== */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container py-24 text-center md:py-32"
      >
        <h2 className="font-heading text-4xl font-bold text-foreground md:text-5xl">Ready to get started?</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          Whether you're buying or selling, our team is here to guide you to your next chapter in Austin.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" className="px-10" asChild data-event="bottom_book_showing">
            <Link to="/listings">Book a Showing</Link>
          </Button>
          <Button size="lg" variant="outline" className="px-10" asChild data-event="bottom_sell">
            <Link to="/sell">Sell Your Home</Link>
          </Button>
        </div>
      </motion.section>

      <Footer />

      {/* Quick View Modal */}
      {quickViewProperty && (
        <QuickViewModal property={quickViewProperty} onClose={() => setQuickViewProperty(null)} />
      )}
    </div>
  );
}
