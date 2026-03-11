

# Harbor & Stone Realty — Full Website Prototype

## Design System
- **Palette**: Off-white (`#F8F7F4`) background, Charcoal (`#2C2C2C`) text, Deep Teal (`#1B4D4F`) primary CTAs, Warm Gold (`#C5A55A`) trust accents, Light Gray (`#E8E6E1`) cards/borders
- **Typography**: Playfair Display for headings, Inter for body/UI. Large hero text (48–64px desktop), generous line height
- **Spacing**: 8px grid, airy whitespace, card-based layouts with subtle rounded corners and minimal shadows
- **Buttons**: Teal filled primary, outlined secondary, gold accents on trust elements

## Pages & Components

### 1. Home / Landing
- Full-width hero with large neighborhood photo, bold Playfair headline, subhead, two CTAs (Book a Showing / Get Free Valuation)
- Quick search bar (location, price range, beds) — navigates to listings page
- Featured listings carousel (3 property cards)
- Lead magnet strip: "7-step buying checklist" email capture
- Trust strip: stats (years in business, homes sold), 3 testimonials with photos
- Footer: contact info, click-to-call, social links, nav

### 2. Listings / Search Results
- Filter bar (price, beds, property type, sort)
- Responsive card grid with property photos, price, details, quick actions (Quick View, Save heart, Schedule)
- Sticky bottom CTA bar on mobile
- Cards open Quick-View modal or navigate to full detail page

### 3. Property Quick-View Modal (Conversion Centerpiece)
- Overlay modal with image carousel (swipeable on mobile)
- Property info: price, address, beds/baths/sqft, 2-line selling points
- Two primary CTAs:
  - **Book a Showing** → 1-step inline form (name, email, phone, date/time quick picks) → success confirmation with agent phone + "Add to Calendar"
  - **Get Offer Estimate** → 2-step flow: Step 1 (contact info), Step 2 (owner status, timeline) → success state
- Agent sidebar card with photo, bio, click-to-call, message form
- Urgency microcopy ("3 people viewed this week")
- Trust blurb + sold examples

### 4. Property Detail Page (Full Route)
- Same content as modal but full-page layout with larger image gallery, neighborhood map placeholder, mortgage estimate section, similar listings grid at bottom
- Sticky sidebar with agent card and Book Showing CTA on desktop

### 5. Agent / About Page
- Brand story section
- Team member cards with photos, bios, individual contact CTAs
- Social proof: stats, awards, testimonials

### 6. Seller Landing (Lead Funnel)
- Hero = valuation form (address + email) — minimal distractions
- 3-step process explanation with icons
- Testimonial slider
- CTA: "Get Your Free Home Valuation"

### 7. Contact / Confirmation Page
- Success state after form submission: next steps, agent phone, "Browse Similar Listings" CTA
- Also serves as standalone contact page with form, map placeholder, phone/email

## Conversion Flows (Interactive)
- **Book a Showing**: Card tap → Modal → Book CTA → Inline form → Confirm → Success with calendar link
- **Get Offer Estimate**: Card tap → Modal → Estimate CTA → Step 1 → Step 2 → Success
- **Seller Valuation**: Seller page → Address form → Success
- All forms show validation states (error/success), smart placeholders, inline errors

## Cross-Cutting Features
- **Sticky header**: Logo, nav links, prominent "Book a Showing" CTA button — collapses to hamburger on mobile
- **Lead capture on every page**: contextual CTAs (showing, valuation, checklist download)
- **Mobile-first responsive**: all layouts adapt across 375px, 768px, 1440px
- **Animations**: card hover zoom, smooth modal transitions (200-300ms), success checkmark animation
- **Accessibility**: AA+ contrast, keyboard-navigable modals/forms, ARIA labels, semantic HTML, focus rings
- **Lazy loading** for images, performance-optimized
- **Analytics placeholders**: commented GA4/FB pixel scripts, `data-event` attributes on all CTAs
- **Form endpoints**: placeholder POST actions with code comments for Typeform/HubSpot integration

## Sample Data
Three pre-populated listings:
1. 1224 Willow Lane — $789,000 — 3bd/2.5ba/2,100sqft
2. 408 Eastwood Ave — $1,250,000 — 4bd/3ba/3,000sqft
3. 900 Riverside Dr, Unit 5B — $465,000 — 2bd/2ba/1,120sqft

All conversion copy from the brief will be built into components as editable text constants.

