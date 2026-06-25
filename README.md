# nixbyteflowcore.com — Website

A complete, production-ready, Tesla-inspired marketing website for nixbyteflowcore, a UK-based iOS engineering team specialising in privacy-first, local-first, minimalist mobile applications.

## Project Structure

```
nixbyteflowcore.com/
├── index.html              # Homepage (hero, philosophy, app family, process, CTA)
├── services.html           # Business services (6 practice areas + ad formats + engagement models)
├── advantages.html         # Team advantages (10 commitments, comparison table)
├── news.html               # News / field notes / blog
├── contact.html            # Contact form, channels, location map, FAQ
├── privacy.html            # Full 2026 global Privacy Policy
├── terms.html              # Full 2026 global Service Agreement
├── compliance.html         # Full 2026 Technical Compliance Guide
├── app-ads.txt             # Authorised ad sellers declaration (IAB standard)
├── robots.txt              # Crawler directives + AI training opt-out
├── sitemap.xml             # XML sitemap for search engines
│
├── css/
│   ├── main.css            # Design system, layout, header, hero, footer, components
│   ├── animations.css      # 30+ keyframes, reveals, marquees, glow effects
│   ├── components.css      # Page-specific components (stats, values, process, CTA, etc.)
│   └── responsive.css      # Mobile & tablet media queries
│
├── js/
│   ├── main.js             # Core: header, mobile menu, smooth scroll, forms, particles
│   └── animations.js       # Scroll reveals, counters, parallax, tilt, mouse effects
│
└── images/                 # (Reserved for PNG/JPG media files)
```

## Tech Stack

- **HTML5** — semantic markup, ARIA labels, structured data (JSON-LD)
- **CSS3** — design tokens, grid, flexbox, custom properties, backdrop-filter
- **Vanilla JavaScript (ES6+)** — no framework dependencies, IIFE pattern
- **SVG** — all icons, logos, and decorative graphics (no third-party icon libraries)
- **No external runtime dependencies** — works fully offline once loaded

## Design System

- **Visual style:** Tesla-inspired, minimalist, dark-first
- **Primary colour:** #00d4ff (cyan accent)
- **Background:** Pure black (#000) with subtle gradients
- **Typography:** System font stack (San Francisco / Segoe UI / Helvetica Neue)
- **Spacing:** 4 px base unit, fluid clamp() values for hero sizes
- **Animations:** GPU-accelerated transform / opacity, IntersectionObserver for reveals

## Pages

### Main Pages (5)
1. **Homepage** (`index.html`) — hero, philosophy grid, app family, 4-step process, CTA
2. **Services** (`services.html`) — 6 service areas, 4 ad formats, 3 engagement models
3. **Advantages** (`advantages.html`) — 3 core values, 10 commitments, comparison table, testimonial
4. **News** (`news.html`) — featured post + 9 article grid + newsletter signup
5. **Contact** (`contact.html`) — 4 contact channels, full form, animated UK map, 6-item FAQ

### Legal Pages (3, all 2026 global full-compliance)
6. **Privacy Policy** (`privacy.html`) — GDPR/UK-GDPR, CCPA/CPRA, VCDPA, LGPD, PIPL, DPDP, NDPA, DSA, COPPA/AADC. 12 sections covering all ad networks (AdMob, AppLovin MAX, Unity LevelPlay, Meta, Pangle, ironSource, Mintegral, Liftoff, Chartboost, InMobi, Tapjoy, AppsFlyer, Adjust, Singular).
7. **Service Agreement** (`terms.html`) — account ownership, IAA reward rules, IAP payment/refund, anti-fraud, anti-cheat, DSA content moderation, SLA, dispute resolution, age restrictions.
8. **Technical Compliance Guide** (`compliance.html`) — App Store / Google Play 2026 requirements, ATT framework, Privacy Sandbox, Android 15 / iOS 18 platform requirements, data residency, interaction design UX compliance.

## Footer Cross-Links

Every page footer contains entries for:
- **Explore:** Home, Services, Advantages, News, Contact
- **Contact:** support@nixbyteflowcore.com, contact@nixbyteflowcore.com, Contact Form
- **Legal:** Privacy Policy, Service Agreement, Technical Compliance, app-ads.txt

## Ad Network Coverage

The site (and Apps) reference the following ad networks — all covered in the Privacy Policy:

| Mediation / Network | Role |
|---|---|
| Google AdMob | Mediation + direct |
| AppLovin MAX | Primary mediation layer |
| Unity LevelPlay | Secondary mediation layer |
| Meta Audience Network | Rewarded video, native |
| Pangle (ByteDance) | Rewarded video |
| ironSource (now Unity) | Rewarded video, interstitials |
| Mintegral | Rewarded video |
| Liftoff / Vungle | Rewarded video, interstitials |
| Chartboost | Interstitials, rewarded video |
| InMobi | Native, interstitials |
| Tapjoy | Offerwall, rewarded video |
| AppsFlyer | Attribution (MMP) |
| Adjust | Attribution (MMP) |
| Singular | Attribution (MMP) |
| Apple StoreKit 2 | IAP & subscriptions |
| Google Play Billing | IAP & subscriptions |

## Ad Format Coverage

- ✅ Banner ads (standard + adaptive + collapsible)
- ✅ Interstitials (with frequency capping)
- ✅ Rewarded video (with skip-after-5s controls)
- ✅ Native ads (custom-rendered)
- ✅ App open ads
- ✅ Offerwalls (where appropriate)

## Browser Support

- Chrome / Edge 90+
- Firefox 88+
- Safari 14+ (including iOS Safari)
- Mobile browsers (iOS Safari 14+, Android Chrome 90+)

## Performance

- Zero external HTTP requests at runtime (all CSS/JS/SVG inline or local)
- Lazy-loading via `IntersectionObserver`
- Throttled scroll handlers (50–150 ms)
- Reduced-motion media query respected
- Mobile-tuned particle count (15 vs 40 desktop)

## SEO

- Full JSON-LD structured data (Organization, WebSite, Articles)
- OpenGraph + Twitter Card meta on every page
- Canonical URLs + hreflang annotations
- robots.txt with explicit AI-training opt-out
- XML sitemap with priority and changefreq hints
- Semantic HTML5 (header, nav, main, article, aside, footer)
- Descriptive alt text and ARIA labels

## Deployment

The site is fully static. To deploy:

1. Upload all files to any static host (Netlify, Vercel, Cloudflare Pages, AWS S3, GitHub Pages, or a traditional Apache/Nginx server)
2. Point the domain `nixbyteflowcore.com` to the host
3. Ensure HTTPS is enabled
4. Submit `sitemap.xml` to Google Search Console and Bing Webmaster Tools

## Version

**Website version:** 6.2 (18 June 2026)
**Compliance edition:** 2026 Global Full-Compliance

## Contact

- **Support:** support@nixbyteflowcore.com
- **Business enquiries:** contact@nixbyteflowcore.com
- **Privacy / DPO:** privacy@nixbyteflowcore.com
- **EU Representative:** euro-rep@nixbyteflowcore.com
- **UK Representative:** uk-rep@nixbyteflowcore.com

## Studio

nixbyteflowcore
Warwick Software Industry Park
United Kingdom
