import { Link } from "react-router-dom";
import { Heart, Eye, Calendar, Bed, Bath, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Property, formatPrice } from "@/data/listings";
import { motion } from "framer-motion";

interface PropertyCardProps {
  property: Property;
  onQuickView: (property: Property) => void;
}

export default function PropertyCard({ property, onQuickView }: PropertyCardProps) {
  const customEasing: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (

    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: customEasing }}
      className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-primary/20"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Link to={`/property/${property.id}`} className="block h-full w-full">
          <img
            src={property.image}
            alt={`${property.address} — ${property.neighborhood}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <motion.div
            initial={{ x: "0%" }}
            whileInView={{ x: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1], delay: 0.1 }}
            className="absolute inset-0 bg-primary z-10 pointer-events-none"
          />
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none" />


        {/* Quick actions overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 transition-opacity group-hover:opacity-100 z-20">
          <Button
            size="sm"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onQuickView(property); }}
            className="gap-1.5"
            data-event="quick_view"
          >
            <Eye className="h-3.5 w-3.5" /> Quick View
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full"
            aria-label="Save listing"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Price badge */}
        <div className="absolute left-3 top-3 rounded-md bg-card/90 px-2.5 py-1 text-sm font-semibold text-card-foreground backdrop-blur-sm z-20">
          {formatPrice(property.price)}
        </div>
      </div>


      {/* Info */}
      <div className="p-4">
        <Link to={`/property/${property.id}`} className="block">
          <h3 className="font-heading text-lg font-semibold text-card-foreground hover:text-primary transition-colors">
            {property.address}
          </h3>
        </Link>
        <p className="mt-0.5 text-sm text-muted-foreground">{property.neighborhood}, Austin</p>

        <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Bed className="h-3.5 w-3.5" /> {property.beds} bd</span>
          <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5" /> {property.baths} ba</span>
          <span className="flex items-center gap-1"><Maximize className="h-3.5 w-3.5" /> {property.sqft.toLocaleString()} sqft</span>
        </div>

        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{property.description}</p>

        <div className="mt-4 flex gap-2">
          <Button size="sm" variant="outline" className="flex-1 gap-1.5" onClick={() => onQuickView(property)} data-event="schedule_showing">
            <Calendar className="h-3.5 w-3.5" /> Schedule
          </Button>
          <Button size="sm" asChild className="flex-1" data-event="view_details">
            <Link to={`/property/${property.id}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
