# Template skill-slice gap map (TAT + WP)

Internal checklist from the Skill Slice Templates plan. Structure only — no competitor copy.

## TAT → TG homepage

| TAT section | TG decision |
|---|---|
| Hero | Keep TG brand-first hero; full-bleed primary |
| Trust bar (counters) | **Skip counters** (fact-gate). Use TrustPrinciples instead |
| About | AboutTeaser → `/about` |
| Product categories | CategoryShowcase (oils + rice) |
| Why choose us | Folded into TrustPrinciples |
| Quality assurance | QualityProcess (generic steps, no cert logos) |
| Packaging & logistics | PackagingTeaser (catalogue-aligned formats only) |
| Export markets | MarketsTeaser → `/export-markets` (Incoterms, no country list) |
| Testimonials | **Skip** (no verified quotes) |
| CTA | CtaBand → `/request-quote` |
| Quote modal | **Keep page route**; add StickyQuoteCTA on catalogue |

## WP slices applied

| Slice | Application |
|---|---|
| Design extraction | Keep `--tg-*` + Source Serif / Manrope; no TAT palette/fonts |
| `components/sections/` | New section primitives for home (and reuse later) |
| SEO | One H1; H2 per section; homepage metadata via `pageMetadata` |
| Perf | `next/image`; hero priority only; CSS scroll reveal (no Framer dep) |

## Quote prefill

Product hubs/details already link `?product=…`. Wire `QuoteForm` to read that query param.
