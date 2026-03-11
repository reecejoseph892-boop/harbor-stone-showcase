# IMPLEMENTATION_ADVANCED_EXPERIENCE (Phase 2)

This plan outlines the implementation of high-end, advanced design features to elevate the Harbor Stone Showcase website to an elite digital experience.

## Proposed Changes

### 1. Motion Architecture & Fluidity
- **Smooth Scroll**: Integrate [Lenis](https://github.com/darkroomengineering/lenis) for weight-based, fluid scrolling across all pages.
- **Hero Parallax**: Add a subtle vertical parallax effect to the hero image in `Index.tsx` to create depth on entry.
- **Section Reveals**: Refine the `whileInView` animations in `Index.tsx` to use more nuanced easing (e.g., `[0.22, 1, 0.36, 1]`) and staggered delays.

### 2. Custom Interactions
- **Themed Custom Cursor**: 
    - Create a `CustomCursor` component that follows the mouse with a slight lag (trailing effect).
    - Implement "hover states" where the cursor expands or changes color when over `PropertyCard` or `Button` elements.
- **Magnetic Buttons**: Apply a magnetic pull effect to the primary hero and header CTA buttons using `framer-motion`.

### 3. Visual Refinements & "Quiet Luxury" Details
- **Button "Inner Glow"**: Update the `gold` and `primary` button styles to include a 1px top border/glow for a physical, premium feel.
- **Animated Link Underlines**: Replace standard text deco with a custom-animated underline that "draws" in on hover for nav links.
- **Image Reveal Wash**: Add a `primary` color "swipe" reveal effect for images on initial load/scroll into view.

## Implementation Checklist

- [ ] **Core Fluidity & Motion**
    - [ ] Install and initialize Lenis smooth scrolling.
    - [ ] Implement `HeroParallax` component or logic in `Index.tsx`.
- [ ] **Interactive Elements**
    - [ ] Create and globally inject the `CustomCursor` component.
    - [ ] Implement `Magnetic` wrapper for high-value buttons.
    - [ ] Add "Inner Glow" styling to CSS variables/Tailwind button utilities.
- [ ] **Advanced Branding**
    - [ ] Implement custom-animated link underlines in `Header.tsx`.
    - [ ] Add "Swipe Reveal" animations to `PropertyCard` images.
- [ ] **Selling Tools (Initial UI)**
    - [ ] Create a visual `PriceSlider` mockup for the Sell page.

## Verification Plan

### Manual Verification
1. **Scrolling Feel**: Scroll slowly through the home page to ensure Lenis is smoothing the input without adding excessive lag.
2. **Cursor Reactivity**: Verify the custom cursor correctly morphs and reacts to interactive elements.
3. **Parallax Check**: Ensure the hero image moves at a slightly different speed than the text when scrolling.
4. **Detail Audit**: Inspect buttons closely to verify the 1px highlight (inner glow) is visible but subtle.

### Automated Tests
- Run `npm run lint` and `npm run build` to ensure no performance or syntax regressions from the new motion libraries.
