import { useState } from "react";
import { ArrowLeft, CheckCircle2, CalendarPlus, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { agents } from "@/data/listings";

interface BookShowingFormProps {
  propertyAddress: string;
  onBack: () => void;
}

const timeSlots = ["Morning (9–12)", "Afternoon (12–4)", "Evening (4–7)"];

export default function BookShowingForm({ propertyAddress, onBack }: BookShowingFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", time: timeSlots[1] });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email is required";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10) e.phone = "Valid phone is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Replace with your Typeform/HubSpot endpoint
      // fetch("https://your-endpoint.com/book-showing", { method: "POST", body: JSON.stringify({ ...form, property: propertyAddress }) });
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="h-7 w-7 text-primary" />
        </div>
        <h3 className="font-heading text-xl font-semibold text-card-foreground">Showing Confirmed!</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          We'll confirm your {form.time.toLowerCase()} showing at <strong>{propertyAddress}</strong> within 1 business hour.
        </p>
        <a href={`tel:${agents[0].phone}`} className="mt-3 flex items-center gap-1.5 text-sm text-primary hover:underline">
          <Phone className="h-4 w-4" /> {agents[0].phone}
        </a>
        <div className="mt-5 flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5" data-event="add_to_calendar">
            <CalendarPlus className="h-3.5 w-3.5" /> Add to Calendar
          </Button>
          <Button variant="ghost" size="sm" onClick={onBack}>View similar homes</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <button onClick={onBack} className="mb-3 flex items-center gap-1 text-sm text-muted-foreground hover:text-card-foreground">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>
      <h3 className="font-heading text-lg font-semibold text-card-foreground">Book a Showing</h3>
      <p className="mt-1 text-sm text-muted-foreground">Pick a time. We'll confirm within 1 business hour.</p>

      {/* Replace action with your Typeform/HubSpot endpoint */}
      <form onSubmit={handleSubmit} className="mt-4 flex flex-1 flex-col gap-3">
        <div>
          <Label htmlFor="book-name">Full Name</Label>
          <Input id="book-name" placeholder="Jane Smith" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" />
          {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
        </div>
        <div>
          <Label htmlFor="book-email">Email</Label>
          <Input id="book-email" type="email" placeholder="jane@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" />
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
        </div>
        <div>
          <Label htmlFor="book-phone">Phone</Label>
          <Input id="book-phone" type="tel" placeholder="(512) 555-1234" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} autoComplete="tel" />
          {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
        </div>
        <div>
          <Label>Preferred Time</Label>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setForm({ ...form, time: slot })}
                className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
                  form.time === slot
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-card-foreground hover:border-primary/50"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
        <Button type="submit" className="mt-auto w-full" data-event="confirm_booking">
          Confirm Showing
        </Button>
      </form>
    </div>
  );
}
