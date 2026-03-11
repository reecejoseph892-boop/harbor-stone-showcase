import { useState } from "react";
import { Phone, Mail, MapPin, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { agents } from "@/data/listings";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

const faqs = [
  { q: "How much does it cost to book a showing?", a: "Nothing! Showings are completely free with no obligation." },
  { q: "How quickly will I hear back?", a: "We confirm showings within 1 business hour and respond to inquiries within 24 hours." },
  { q: "Do I need a pre-approval to tour homes?", a: "No, but having one can speed up the process if you find a home you love." },
  { q: "What are your agent fees?", a: "Buyer representation is typically free — the seller covers the commission. Seller fees are competitive and discussed upfront." },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", intent: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email is required";
    if (!form.message.trim()) e.message = "Message is required";
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

      {submitted ? (
        /* Success confirmation */
        <section className="container flex flex-1 flex-col items-center justify-center py-20 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-heading text-3xl font-bold">Message Sent!</h1>
            <p className="mt-3 max-w-md text-muted-foreground">
              Thanks, {form.name.split(" ")[0]}! A member of our team will get back to you within 24 hours. In the meantime:
            </p>
            <div className="mt-2">
              <a href={`tel:${agents[0].phone}`} className="inline-flex items-center gap-1.5 text-primary hover:underline">
                <Phone className="h-4 w-4" /> Call us now: {agents[0].phone}
              </a>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild><Link to="/listings">Browse Listings</Link></Button>
              <Button variant="outline" asChild><Link to="/sell">Get a Valuation</Link></Button>
            </div>
          </motion.div>
        </section>
      ) : (
        <section className="container py-12 md:py-16">
          <div className="mx-auto max-w-4xl">
            <h1 className="font-heading text-3xl font-bold md:text-4xl">Get in Touch</h1>
            <p className="mt-2 text-muted-foreground">Questions, showing requests, or just want to chat — we're here.</p>

            <div className="mt-10 grid gap-10 md:grid-cols-5">
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 md:col-span-3">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="c-name">Full Name</Label>
                    <Input id="c-name" placeholder="Jane Smith" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" />
                    {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="c-email">Email</Label>
                    <Input id="c-email" type="email" placeholder="jane@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" />
                    {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="c-phone">Phone</Label>
                    <Input id="c-phone" type="tel" placeholder="(512) 555-1234" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} autoComplete="tel" />
                  </div>
                  <div>
                    <Label>I'm interested in…</Label>
                    <Select value={form.intent} onValueChange={(v) => setForm({ ...form, intent: v })}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="buying">Buying a Home</SelectItem>
                        <SelectItem value="selling">Selling My Home</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                        <SelectItem value="question">General Question</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="c-message">Message</Label>
                  <Textarea id="c-message" placeholder="Tell us about what you're looking for…" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                  {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                </div>
                <Button type="submit" size="lg" className="w-full sm:w-auto" data-event="contact_form_submit">
                  Send Message
                </Button>
              </form>

              {/* Sidebar info */}
              <div className="space-y-6 md:col-span-2">
                <div>
                  <h3 className="font-heading text-lg font-semibold">Office</h3>
                  <div className="mt-2 space-y-2 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> 1200 S Lamar Blvd, Austin TX 78704</p>
                    <a href="tel:+15125550178" className="flex items-center gap-2 hover:text-foreground"><Phone className="h-4 w-4" /> (512) 555-0178</a>
                    <a href="mailto:hello@harborandstone.com" className="flex items-center gap-2 hover:text-foreground"><Mail className="h-4 w-4" /> hello@harborandstone.com</a>
                  </div>
                </div>
                {/* Map placeholder */}
                <div className="rounded-lg border border-border bg-muted p-10 text-center">
                  <MapPin className="mx-auto h-6 w-6 text-muted-foreground" />
                  <p className="mt-1 text-xs text-muted-foreground">Map placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {!submitted && (
        <section className="bg-secondary py-16">
          <div className="container mx-auto max-w-2xl">
            <h2 className="text-center font-heading text-2xl font-bold">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="mt-8">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
