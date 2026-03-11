import { Link } from "react-router-dom";
import { Phone, Mail, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { agents, stats, testimonials } from "@/data/listings";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-3xl font-bold text-primary-foreground md:text-5xl"
          >
            About Harbor & Stone
          </motion.h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
            We're a boutique residential agency rooted in Austin, built on honest guidance and a genuine love for connecting people with the right home.
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="container py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl font-bold md:text-3xl">Our Story</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Founded in 2010 by Sarah Chen, Harbor & Stone started with a simple belief: buying or selling a home should be clear, calm, and even enjoyable. Over 15 years we've helped hundreds of Austin families find their perfect fit — from first condos to forever homes. Our team combines deep local knowledge with a modern, no-pressure approach that puts you first.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-secondary py-12">
        <div className="container grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-heading text-3xl font-bold text-primary">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="container py-16 md:py-20">
        <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">Meet Our Team</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {agents.map((a) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-lg border border-border bg-card p-6 text-center"
            >
              <img src={a.image} alt={a.name} className="mx-auto h-28 w-28 rounded-full object-cover" loading="lazy" />
              <h3 className="mt-4 font-heading text-lg font-semibold text-card-foreground">{a.name}</h3>
              <p className="text-sm text-accent">{a.title}</p>
              <p className="mt-3 text-sm text-muted-foreground">{a.bio}</p>
              <div className="mt-4 flex flex-col gap-2">
                <a href={`tel:${a.phone}`} className="flex items-center justify-center gap-1.5 text-sm text-primary hover:underline">
                  <Phone className="h-3.5 w-3.5" /> {a.phone}
                </a>
                <a href={`mailto:${a.email}`} className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
                  <Mail className="h-3.5 w-3.5" /> {a.email}
                </a>
              </div>
              <Button className="mt-4 w-full" size="sm" asChild>
                <Link to="/contact">Contact {a.name.split(" ")[0]}</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-secondary py-16">
        <div className="container">
          <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">Client Testimonials</h2>
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

      {/* CTA */}
      <section className="container py-16 text-center">
        <h2 className="font-heading text-2xl font-bold md:text-3xl">Work With Us</h2>
        <p className="mt-2 text-muted-foreground">Ready to find your next home or sell with confidence?</p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button size="lg" asChild><Link to="/listings">Browse Listings</Link></Button>
          <Button size="lg" variant="outline" asChild><Link to="/sell">Sell Your Home</Link></Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
