import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { listings, type Property } from "@/data/listings";
import PropertyCard from "@/components/PropertyCard";
import QuickViewModal from "@/components/QuickViewModal";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";

export default function Listings() {
  const [quickViewProperty, setQuickViewProperty] = useState<Property | null>(null);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Filter Bar */}
      <section className="border-b border-border bg-card">
        <div className="container flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
          <h1 className="font-heading text-2xl font-bold text-card-foreground">Austin Listings</h1>
          <div className="flex flex-wrap items-center gap-2">
            <Select defaultValue="any-price">
              <SelectTrigger className="w-[140px]"><SelectValue placeholder="Price" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="any-price">Any Price</SelectItem>
                <SelectItem value="under500">Under $500K</SelectItem>
                <SelectItem value="500-800">$500K – $800K</SelectItem>
                <SelectItem value="800-1m">$800K – $1M</SelectItem>
                <SelectItem value="over1m">$1M+</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="any-beds">
              <SelectTrigger className="w-[100px]"><SelectValue placeholder="Beds" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="any-beds">Any</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="any-type">
              <SelectTrigger className="w-[130px]"><SelectValue placeholder="Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="any-type">All Types</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="newest">
              <SelectTrigger className="w-[120px]"><SelectValue placeholder="Sort" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-asc">Price: Low</SelectItem>
                <SelectItem value="price-desc">Price: High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Listing Grid */}
      <section className="container flex-1 py-8 md:py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((p) => (
            <PropertyCard key={p.id} property={p} onQuickView={setQuickViewProperty} />
          ))}
        </div>

        {listings.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-lg text-muted-foreground">No matches yet. Expand filters or ask us to notify you.</p>
            <Button className="mt-4" asChild><Link to="/contact">Notify Me</Link></Button>
          </div>
        )}
      </section>

      {/* Sticky mobile CTA */}
      <div className="sticky bottom-0 border-t border-border bg-card p-3 md:hidden">
        <Button className="w-full" asChild data-event="sticky_schedule">
          <Link to="/contact">Schedule a Showing</Link>
        </Button>
      </div>

      <Footer />

      {quickViewProperty && (
        <QuickViewModal property={quickViewProperty} onClose={() => setQuickViewProperty(null)} />
      )}
    </div>
  );
}
