import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Listings", to: "/listings" },
  { label: "About", to: "/about" },
  { label: "Sell", to: "/sell" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location.pathname === "/";

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
        ? "border-b border-border/60 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 py-0 shadow-sm"
        : isHome
          ? "border-b border-transparent bg-transparent py-2"
          : "border-b border-border/60 bg-background/95 backdrop-blur-md py-0"
      }`}>
      <div className={`container flex items-center justify-between transition-all duration-300 ${scrolled ? "h-16" : "h-16 md:h-24"
        }`}>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" aria-label="Harbor & Stone Realty home">
          <span className="font-heading text-xl font-bold tracking-tight text-foreground md:text-2xl">
            Harbor <span className="text-primary">&</span> Stone
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${location.pathname === link.to ? "text-primary" : "text-muted-foreground"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          <a href="tel:+15125550178" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
            <Phone className="h-4 w-4" />
            (512) 555-0178
          </a>
          <Button asChild data-event="header_book_showing">
            <Link to="/listings">Book a Showing</Link>
          </Button>
        </div>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <nav className="mt-8 flex flex-col gap-2" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-3 py-2.5 text-base font-medium transition-colors hover:bg-muted ${location.pathname === link.to ? "text-primary" : "text-foreground"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 border-t border-border pt-4">
                <a href="tel:+15125550178" className="mb-3 flex items-center gap-2 px-3 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" /> (512) 555-0178
                </a>
                <Button className="w-full" asChild data-event="mobile_book_showing">
                  <Link to="/listings" onClick={() => setOpen(false)}>Book a Showing</Link>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
