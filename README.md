# LaptopIQ

An AI-style laptop recommendation demo for Indian students — quiz-based
scoring engine, ticket/admit-card-styled result cards, compare tray,
wishlist, and a rule-based assistant.

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Project structure

```
src/
  data/
    laptops.js        Sample catalog (demo data — see note below)
    quizConfig.js      Quiz questions, options, budget ranges
  lib/
    scoring.js         scoreLaptop() + matchLabel() compatibility engine
    format.js           inr(), ordinal() formatting helpers
    links.js            retailerLinks() + budgetTip() helpers
  hooks/
    useToast.js         Small toast notification hook
  components/
    Header.jsx           Sticky nav: search, compare, wishlist, theme toggle
    Home.jsx              Landing page: hero, feature strip, popular picks
    Quiz.jsx               10-step quiz with punch-hole progress
    ResultsView.jsx     Ranked/browsable laptop grid
    LaptopCard.jsx        Individual ticket-styled result card
    DetailModal.jsx      Full laptop detail view
    CompareView.jsx      Up-to-4 side-by-side comparison table
    Assistant.jsx          Floating rule-based AI assistant
    Stamp.jsx                Match-tier rubber-stamp badge
    ScoreDial.jsx           Circular compatibility score
    RadarMeter.jsx        Recharts radar chart for performance meters
  theme.css                 Design tokens (light/dark) + component classes
  index.css                  Tailwind directives
  App.jsx                     Top-level state + view routing
  main.jsx                    React entry point
```

## Notes on the data

- **`src/data/laptops.js` is demo data.** Prices, specs and photos are
  illustrative. A production build would populate this from the Amazon
  Product Advertising API / Flipkart Affiliate API (or a compliant data
  partner) on a schedule instead of a hardcoded array.
- **Buy buttons link to live retailer search results**, not a single hardcoded
  product page — see `retailerLinks()` in `src/lib/links.js`. This is
  intentional: a single SKU link goes stale the moment a listing sells out
  or is repriced, while a search link always resolves to current listings.
- **No product photos are embedded.** Retailer image CDNs generally block
  hotlinking from outside their own site, so cards use a simple laptop glyph
  instead of a photo that would likely fail to load. A production build
  would pull licensed image URLs from the same product APIs mentioned above.

## Extending it

- Swap `src/data/laptops.js` for a fetch to your own backend/API.
- `scoreLaptop()` in `src/lib/scoring.js` is the whole ranking algorithm —
  tune the weights there.
- `assistantReply()` in `src/components/Assistant.jsx` is currently
  keyword-matched; swap it for a real LLM call if you want open-ended Q&A.
