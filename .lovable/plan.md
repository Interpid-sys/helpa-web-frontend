## Helpa waitlist landing — UI only

Direction: **Editorial high-trust** (warm cream `#FDFCFB`, ink `#1C1917`, accent `#854D0E`, Instrument Serif + Inter).

### 1. Design tokens
Update `src/styles.css`:
- Replace `:root` color tokens with warm editorial palette in oklch (background cream, ink foreground, muted stone, accent burnt-umber, soft border)
- Add `--font-serif: "Instrument Serif", serif` and `--font-sans: "Inter", sans-serif` under `@theme inline`
- Keep dark-mode block intact but unused

Load fonts via `<link>` in `src/routes/__root.tsx` head (preconnect + Instrument Serif + Inter).

### 2. Page implementation
Replace placeholder in `src/routes/index.tsx` with the full landing page, composition matched to the chosen prototype exactly:
1. Nav — Helpa wordmark, anchor links (The Gap / The Signal / Ecosystem), "Join waitlist" pill
2. Hero — centered serif headline, subtext, primary CTA + trust note, signal-network visual block below
3. Problem — 2-col layout with two accent-bordered notes (Isolation, Visibility)
4. How Helpa works — 4 numbered steps (SOS / Trust Loop / Density Power / Resolution)
5. Why joining matters — short editorial section (waitlist demand → launch priority, responder outreach, density)
6. Support ecosystem (dark band) — 7 audience items as bordered list: Residents, Families, Responders, Estates, Campuses, Operators, Institutions
7. Waitlist form — Name (required), Email, Phone, Role select, Location select, submit button. Pure UI: on submit, prevent default and show a sonner success toast; reset form. No persistence.
8. FAQ — 5 plain expand rows (launch timing, why early, privacy, reliability, coverage)
9. Footer

Add subtle CSS-only motion: SOS ripple node in the hero visual.

Update route `head()` with proper Helpa title/description/og tags.

### 3. Hero visual
Generate one warm minimalist signal-map image with `imagegen` (fast tier, ~1600×800) saved to `src/assets/`, layered with the animated SOS ripple node on top.

### 4. Toast wiring
Mount `<Toaster />` from `src/components/ui/sonner.tsx` once inside `RootComponent` so the form submit toast renders.

### 5. Verification
Screenshot the preview, confirm hero/dark ecosystem band/form/FAQ render with correct fonts, colors, and ripple animation. Submit form, confirm toast appears.

### Out of scope
Backend persistence, email, analytics, admin — to be added later per user.