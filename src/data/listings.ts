export interface Property {
  id: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  description: string;
  neighborhood: string;
  type: "house" | "condo" | "townhouse";
  image: string;
  images: string[];
  highlights: string[];
  yearBuilt: number;
  mortgageEst: number;
}

export const listings: Property[] = [
  {
    id: "1224-willow",
    address: "1224 Willow Lane",
    price: 789000,
    beds: 3,
    baths: 2.5,
    sqft: 2100,
    description: "Remodeled kitchen, backyard patio, 10 min to downtown.",
    neighborhood: "Zilker",
    type: "house",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    ],
    highlights: ["Updated chef's kitchen", "Private backyard with mature oaks"],
    yearBuilt: 2004,
    mortgageEst: 4250,
  },
  {
    id: "408-eastwood",
    address: "408 Eastwood Ave",
    price: 1250000,
    beds: 4,
    baths: 3,
    sqft: 3000,
    description: "Hilltop views, solar panels, chef's kitchen.",
    neighborhood: "Barton Hills",
    type: "house",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
    ],
    highlights: ["Panoramic hilltop views", "Solar-powered, energy-efficient"],
    yearBuilt: 2018,
    mortgageEst: 6750,
  },
  {
    id: "900-riverside",
    address: "900 Riverside Dr, Unit 5B",
    price: 465000,
    beds: 2,
    baths: 2,
    sqft: 1120,
    description: "Walkable condo near shops, modern finishes.",
    neighborhood: "East Riverside",
    type: "condo",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    ],
    highlights: ["Walk Score 92", "Modern open floor plan"],
    yearBuilt: 2021,
    mortgageEst: 2500,
  },
];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);
}

export interface Testimonial {
  name: string;
  quote: string;
  role: string;
  image: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    name: "Maya R.",
    quote: "Harbor & Stone made selling simple — we closed in 10 days.",
    role: "Seller, Austin",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    rating: 5,
  },
  {
    name: "James & Priya T.",
    quote: "They found us the perfect home on our first weekend of showings.",
    role: "Buyers, Zilker",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    rating: 5,
  },
  {
    name: "Carlos M.",
    quote: "Transparent, fast, and zero pressure. Exactly what we needed.",
    role: "Buyer, East Austin",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
    rating: 5,
  },
];

export interface Agent {
  id: string;
  name: string;
  title: string;
  bio: string;
  phone: string;
  email: string;
  image: string;
}

export const agents: Agent[] = [
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    title: "Founding Broker",
    bio: "15 years in Austin real estate. Sarah specializes in helping first-time buyers navigate the market with confidence.",
    phone: "(512) 555-0178",
    email: "sarah@harborandstone.com",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80",
  },
  {
    id: "marcus-bell",
    name: "Marcus Bell",
    title: "Senior Agent",
    bio: "Barton Hills & Zilker specialist. Marcus has closed over 200 homes and brings calm, expert guidance to every deal.",
    phone: "(512) 555-0234",
    email: "marcus@harborandstone.com",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80",
  },
  {
    id: "elena-voss",
    name: "Elena Voss",
    title: "Listing Specialist",
    bio: "Known for record-setting sale prices. Elena combines staging expertise with sharp negotiation to maximize your return.",
    phone: "(512) 555-0345",
    email: "elena@harborandstone.com",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80",
  },
];

export const stats = [
  { label: "Years in Austin", value: "15+" },
  { label: "Homes Sold in 2025", value: "127" },
  { label: "Avg. Days to Close", value: "18" },
  { label: "Client Satisfaction", value: "98%" },
];
