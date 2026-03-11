import { useState } from "react";
import { ArrowLeft, CheckCircle2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { agents } from "@/data/listings";

interface OfferEstimateFormProps {
  propertyAddress: string;
  onBack: () => void;
}

export default function OfferEstimateForm({ propertyAddress, onBack }: OfferEstimateFormProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", isOwner: "", timeline: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (!form.isOwner) e.isOwner = "Please select";
    if (!form.timeline) e.timeline = "Please select";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep2()) {
      // Replace with your endpoint
      // fetch("https://your-endpoint.com/offer-estimate", { method: "POST", body: JSON.stringify({ ...form, property: propertyAddress }) });
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="h-7 w-7 text-primary" />
        </div>
        <h3 className="font-heading text-xl font-semibold text-card-foreground">Estimate Requested!</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          We'll prepare a personalized offer estimate for <strong>{propertyAddress}</strong> and reach out within 24 hours.
        </p>
        <a href={`tel:${agents[0].phone}`} className="mt-3 flex items-center gap-1.5 text-sm text-primary hover:underline">
          <Phone className="h-4 w-4" /> {agents[0].phone}
        </a>
        <Button variant="ghost" size="sm" className="mt-4" onClick={onBack}>
          Browse similar homes
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <button onClick={step === 1 ? onBack : () => setStep(1)} className="mb-3 flex items-center gap-1 text-sm text-muted-foreground hover:text-card-foreground">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>
      <h3 className="font-heading text-lg font-semibold text-card-foreground">Get an Offer Estimate</h3>
      <p className="mt-1 text-xs text-muted-foreground">Step {step} of 2</p>

      {step === 1 && (
        <div className="mt-4 flex flex-1 flex-col gap-3">
          <div>
            <Label htmlFor="est-name">Full Name</Label>
            <Input id="est-name" placeholder="Jane Smith" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" />
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
          </div>
          <div>
            <Label htmlFor="est-email">Email</Label>
            <Input id="est-email" type="email" placeholder="jane@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" />
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
          </div>
          <div>
            <Label htmlFor="est-phone">Phone</Label>
            <Input id="est-phone" type="tel" placeholder="(512) 555-1234" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} autoComplete="tel" />
            {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
          </div>
          <Button className="mt-auto w-full" onClick={handleNext}>
            Next →
          </Button>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className="mt-4 flex flex-1 flex-col gap-3">
          <div>
            <Label>Are you the current owner?</Label>
            <Select value={form.isOwner} onValueChange={(v) => setForm({ ...form, isOwner: v })}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes, I own this property</SelectItem>
                <SelectItem value="no">No, I'm a buyer</SelectItem>
                <SelectItem value="agent">I'm an agent</SelectItem>
              </SelectContent>
            </Select>
            {errors.isOwner && <p className="mt-1 text-xs text-destructive">{errors.isOwner}</p>}
          </div>
          <div>
            <Label>Selling / Buying Timeline</Label>
            <Select value={form.timeline} onValueChange={(v) => setForm({ ...form, timeline: v })}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="asap">As soon as possible</SelectItem>
                <SelectItem value="1-3">1–3 months</SelectItem>
                <SelectItem value="3-6">3–6 months</SelectItem>
                <SelectItem value="exploring">Just exploring</SelectItem>
              </SelectContent>
            </Select>
            {errors.timeline && <p className="mt-1 text-xs text-destructive">{errors.timeline}</p>}
          </div>
          <Button type="submit" className="mt-auto w-full" data-event="submit_estimate">
            Get My Estimate
          </Button>
        </form>
      )}
    </div>
  );
}
