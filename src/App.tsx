import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import ScrollToTop from "@/components/layout/ScrollToTop";
import Index from "./pages/Index";




import Listings from "./pages/Listings";
import PropertyDetail from "./pages/PropertyDetail";
import About from "./pages/About";
import SellerLanding from "./pages/SellerLanding";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import { Analytics } from "@vercel/analytics/react";

import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ScrollToTop />
        <SmoothScroll>
          <Routes key={pathname}>
            <Route path="/" element={<Index />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/sell" element={<SellerLanding />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SmoothScroll>
        <Analytics />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
