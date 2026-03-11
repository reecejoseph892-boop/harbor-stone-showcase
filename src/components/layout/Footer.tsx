import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-primary-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <span className="font-heading text-xl font-bold">Harbor & Stone</span>
            <p className="mt-2 text-sm text-primary-foreground/70">
              Boutique residential real estate in Austin, TX. Guided showings, transparent offers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground/60">Navigate</h4>
            <nav className="flex flex-col gap-2 text-sm" aria-label="Footer navigation">
              <Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground">Home</Link>
              <Link to="/listings" className="text-primary-foreground/80 hover:text-primary-foreground">Listings</Link>
              <Link to="/about" className="text-primary-foreground/80 hover:text-primary-foreground">About Us</Link>
              <Link to="/sell" className="text-primary-foreground/80 hover:text-primary-foreground">Sell Your Home</Link>
              <Link to="/contact" className="text-primary-foreground/80 hover:text-primary-foreground">Contact</Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground/60">Contact</h4>
            <div className="flex flex-col gap-2.5 text-sm text-primary-foreground/80">
              <a href="tel:+15125550178" className="flex items-center gap-2 hover:text-primary-foreground">
                <Phone className="h-4 w-4" /> (512) 555-0178
              </a>
              <a href="mailto:hello@harborandstone.com" className="flex items-center gap-2 hover:text-primary-foreground">
                <Mail className="h-4 w-4" /> hello@harborandstone.com
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> 1200 S Lamar Blvd, Austin TX
              </span>
            </div>
          </div>

          {/* CTA */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground/60">Get Started</h4>
            <p className="mb-4 text-sm text-primary-foreground/70">Ready to find your next home?</p>
            <Link
              to="/listings"
              className="inline-block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              data-event="footer_cta"
            >
              Browse Listings
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-primary-foreground/10 pt-6 text-center text-xs text-primary-foreground/50">
          © {new Date().getFullYear()} Harbor & Stone Realty. All rights reserved.{" "}
          <span className="mx-1">|</span> Austin, TX
        </div>
      </div>
    </footer>
  );
}
