import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Bed, Bath, Maximize, CalendarDays, CheckCircle2, Phone, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { listings, formatPrice, agents, type Property } from "@/data/listings";
import PropertyCard from "@/components/PropertyCard";
import QuickViewModal from "@/components/QuickViewModal";
import BookShowingForm from "@/components/BookShowingForm";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const property = listings.find((p) => p.id === id);
  const [currentImage, setCurrentImage] = useState(0);
  const [showBooking, setShowBooking] = useState(false);
  const [quickViewProperty, setQuickViewProperty] = useState<Property | null>(null);
  const agent = agents[0];
  const similar = listings.filter((p) => p.id !== id).slice(0, 2);

  if (!property) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="container flex flex-1 items-center justify-center py-20 text-center">
          <div>
            <h1 className="font-heading text-3xl font-bold">Property Not Found</h1>
            <p className="mt-2 text-muted-foreground">This listing may have been removed.</p>
            <Button className="mt-6" asChild><Link to="/listings">Browse Listings</Link></Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const nextImage = () => setCurrentImage((p) => (p + 1) % property.images.length);
  const prevImage = () => setCurrentImage((p) => (p - 1 + property.images.length) % property.images.length);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Image Gallery */}
      <section className="relative aspect-[16/9] w-full overflow-hidden bg-muted md:aspect-[21/9] lg:aspect-[3/1]">
        <img
          src={property.images[currentImage]}
          alt={`${property.address} photo ${currentImage + 1}`}
          className="h-full w-full object-cover"
        />

        {property.images.length > 1 && (
          <>
            <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-card/80 p-2 backdrop-blur-sm hover:bg-card" aria-label="Previous image">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-card/80 p-2 backdrop-blur-sm hover:bg-card" aria-label="Next image">
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {property.images.map((_, i) => (
                <button key={i} onClick={() => setCurrentImage(i)}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${i === currentImage ? "bg-card" : "bg-card/50"}`}
                  aria-label={`Image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </section>

      <div className="container py-8 md:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            <Link to="/listings" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <ChevronLeft className="h-4 w-4" /> Back to Listings
            </Link>

            <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">{property.address}</h1>
            <p className="mt-1 flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-4 w-4" /> {property.neighborhood}, Austin TX
            </p>
            <p className="mt-3 font-heading text-3xl font-bold text-primary">{formatPrice(property.price)}</p>
            <p className="text-sm text-muted-foreground">Est. ${property.mortgageEst.toLocaleString()}/mo mortgage</p>

            <div className="mt-6 flex flex-wrap gap-6 border-t border-b border-border py-5">
              <div className="flex items-center gap-2"><Bed className="h-5 w-5 text-muted-foreground" /> <span className="font-medium">{property.beds}</span> <span className="text-sm text-muted-foreground">Beds</span></div>
              <div className="flex items-center gap-2"><Bath className="h-5 w-5 text-muted-foreground" /> <span className="font-medium">{property.baths}</span> <span className="text-sm text-muted-foreground">Baths</span></div>
              <div className="flex items-center gap-2"><Maximize className="h-5 w-5 text-muted-foreground" /> <span className="font-medium">{property.sqft.toLocaleString()}</span> <span className="text-sm text-muted-foreground">sqft</span></div>
              <div className="flex items-center gap-2"><CalendarDays className="h-5 w-5 text-muted-foreground" /> <span className="font-medium">{property.yearBuilt}</span> <span className="text-sm text-muted-foreground">Built</span></div>
            </div>

            <div className="mt-6">
              <h2 className="font-heading text-xl font-semibold">About This Property</h2>
              <p className="mt-2 text-muted-foreground">{property.description}</p>
              <div className="mt-4 space-y-2">
                {property.highlights.map((h) => (
                  <p key={h} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" /> {h}
                  </p>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="mt-8 rounded-lg border border-border bg-muted p-12 text-center">
              <MapPin className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">Interactive map placeholder</p>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            {showBooking ? (
              <div className="rounded-lg border border-border bg-card p-5">
                <BookShowingForm propertyAddress={property.address} onBack={() => setShowBooking(false)} />
              </div>
            ) : (
              <div className="rounded-lg border border-border bg-card p-5">
                {/* Agent card */}
                <div className="flex items-center gap-3">
                  <img src={agent.image} alt={agent.name} className="h-14 w-14 rounded-full object-cover" />
                  <div>
                    <p className="font-medium text-card-foreground">{agent.name}</p>
                    <p className="text-sm text-muted-foreground">{agent.title}</p>
                  </div>
                </div>
                <a href={`tel:${agent.phone}`} className="mt-3 flex items-center gap-1.5 text-sm text-primary hover:underline">
                  <Phone className="h-4 w-4" /> {agent.phone}
                </a>
                <div className="mt-5 flex flex-col gap-2.5">
                  <Button className="w-full" onClick={() => setShowBooking(true)} data-event="detail_book_showing">
                    Book a Showing
                  </Button>
                  <Button variant="outline" className="w-full" asChild data-event="detail_contact">
                    <Link to="/contact">Message Agent</Link>
                  </Button>
                </div>
                <p className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-3 w-3 text-accent" /> No-pressure showings. Cancel anytime.
                </p>
              </div>
            )}
          </aside>
        </div>

        {/* Similar Listings */}
        {similar.length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-bold text-foreground">Similar Homes</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {similar.map((p) => (
                <PropertyCard key={p.id} property={p} onQuickView={setQuickViewProperty} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />

      {quickViewProperty && (
        <QuickViewModal property={quickViewProperty} onClose={() => setQuickViewProperty(null)} />
      )}
    </div>
  );
}
