import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Phone, Star, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { type Property, formatPrice } from "@/data/listings";
import { agents } from "@/data/listings";
import BookShowingForm from "./BookShowingForm";
import OfferEstimateForm from "./OfferEstimateForm";
import { motion, AnimatePresence } from "framer-motion";

interface QuickViewModalProps {
  property: Property | null;
  onClose: () => void;
}

type ModalView = "info" | "book" | "estimate";

export default function QuickViewModal({ property, onClose }: QuickViewModalProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [view, setView] = useState<ModalView>("info");

  if (!property) return null;

  const agent = agents[0];
  const nextImage = () => setCurrentImage((p) => (p + 1) % property.images.length);
  const prevImage = () => setCurrentImage((p) => (p - 1 + property.images.length) % property.images.length);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-label={`Quick view of ${property.address}`}>
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 mx-4 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-lg bg-card shadow-2xl md:flex-row"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute right-3 top-3 z-20 rounded-full bg-card/80 p-1.5 text-card-foreground backdrop-blur-sm transition-colors hover:bg-card"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Left: Image carousel */}
          <div className="relative aspect-[4/3] w-full md:aspect-auto md:w-1/2">
            <img
              src={property.images[currentImage]}
              alt={`${property.address} photo ${currentImage + 1}`}
              className="h-full w-full object-cover"
            />
            {property.images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-card/70 p-1.5 backdrop-blur-sm hover:bg-card" aria-label="Previous image">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-card/70 p-1.5 backdrop-blur-sm hover:bg-card" aria-label="Next image">
                  <ChevronRight className="h-4 w-4" />
                </button>
                <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
                  {property.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={`h-2 w-2 rounded-full transition-colors ${i === currentImage ? "bg-card" : "bg-card/50"}`}
                      aria-label={`Go to image ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Right: Content */}
          <div className="flex flex-1 flex-col overflow-y-auto p-5 md:p-6">
            {view === "info" && (
              <div className="flex flex-1 flex-col">
                <p className="text-2xl font-bold font-heading text-card-foreground">{formatPrice(property.price)}</p>
                <h2 className="mt-1 font-heading text-lg font-semibold text-card-foreground">{property.address}</h2>
                <p className="text-sm text-muted-foreground">{property.neighborhood}, Austin TX</p>

                <div className="mt-3 flex gap-4 text-sm text-muted-foreground">
                  <span>{property.beds} bed</span>
                  <span>{property.baths} bath</span>
                  <span>{property.sqft.toLocaleString()} sqft</span>
                  <span>Built {property.yearBuilt}</span>
                </div>

                <div className="mt-3 space-y-1">
                  {property.highlights.map((h) => (
                    <p key={h} className="flex items-center gap-1.5 text-sm text-card-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> {h}
                    </p>
                  ))}
                </div>

                <p className="mt-2 text-xs text-accent">3 people have viewed this listing in the past week.</p>

                {/* CTAs */}
                <div className="mt-5 flex flex-col gap-2.5">
                  <Button className="w-full" onClick={() => setView("book")} data-event="book_showing_modal">
                    Book a Showing
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => setView("estimate")} data-event="get_estimate_modal">
                    Get an Offer Estimate
                  </Button>
                  <Button variant="ghost" asChild className="w-full text-sm" data-event="view_full_details">
                    <Link to={`/property/${property.id}`} onClick={onClose}>View Full Details →</Link>
                  </Button>
                </div>

                {/* Agent card */}
                <div className="mt-5 rounded-md border border-border p-3">
                  <div className="flex items-center gap-3">
                    <img src={agent.image} alt={agent.name} className="h-10 w-10 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-medium text-card-foreground">{agent.name}</p>
                      <p className="text-xs text-muted-foreground">{agent.title}</p>
                    </div>
                  </div>
                  <a href={`tel:${agent.phone}`} className="mt-2 flex items-center gap-1.5 text-sm text-primary hover:underline">
                    <Phone className="h-3.5 w-3.5" /> {agent.phone}
                  </a>
                </div>

                {/* Trust */}
                <p className="mt-3 text-xs text-muted-foreground flex items-center gap-1">
                  <Star className="h-3 w-3 text-accent" /> No-pressure showings. Cancel anytime.
                </p>
              </div>
            )}

            {view === "book" && (
              <BookShowingForm
                propertyAddress={property.address}
                onBack={() => setView("info")}
              />
            )}

            {view === "estimate" && (
              <OfferEstimateForm
                propertyAddress={property.address}
                onBack={() => setView("info")}
              />
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
