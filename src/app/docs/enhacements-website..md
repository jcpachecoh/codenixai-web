# Vibe Coding Prompt — Update Navigation, Services Pages, Fonts (Roboto), and Hero (EN/ES)

## Objective
Implement a **Services** menu with 7 service pages (EN/ES translations), set **Roboto** as the global font, slightly increase base font size, and enhance the home **Hero** with strong CTAs and a modern background. Keep accessibility and performance (Lighthouse/LCP) in mind.

## Tech Assumptions
- Next.js (App Router), TypeScript, Tailwind CSS
- i18n via `next-intl` (or equivalent)
- Fonts via `next/font/google`

---

## Tasks

## 1) Improve landing page
- Improve landing page be more engagement and hero specific strong CTAs and a modern background
- Improve SEO right - left strategy with nextjs features
- Update landing page to add a carorousel with startup developmnet add inmuebli.io and emprendyup as main core put cool images


### 1) Navigation — Add “Services” + Dropdown
- Update header nav (e.g., `app/(site)/_components/MainNav.tsx`) to include **Services** with a dropdown that maps i18n keys.
- Routes (create pages listed in Task 2):
  - `/services/ai-automation`
  - `/services/custom-software`
  - `/services/ecommerce-marketplaces`
  - `/services/cloud-devops`
  - `/services/data-analytics`
  - `/services/ui-ux-branding`
  - `/services/training-workshops`

### 2) Create Pages — One per Service
Create `app/services/<slug>/page.tsx` with:
- Metadata (from i18n)
- Hero (title, subtitle, primary/secondary CTA)
- Features grid (3–6 items)
- Outcomes list (3–6 items)
- Process timeline (4 steps)
- Secondary CTA block
- Optional: JSON-LD `<script type="application/ld+json">` (see below)

**Slugs → i18n namespace**
- ai-automation → `services.aiAutomation.*`
- custom-software → `services.customSoftware.*`
- ecommerce-marketplaces → `services.ecommerceMarketplaces.*`
- cloud-devops → `services.cloudDevops.*`
- data-analytics → `services.dataAnalytics.*`
- ui-ux-branding → `services.uiUxBranding.*`
- training-workshops → `services.trainingWorkshops.*`

### 3) Internationalization — `messages/en.json` & `messages/es.json`
Create/merge the following keys (keep structure). Use exact keys to avoid missing translations.

**`messages/en.json`**
```json
{
  "nav": {
    "services": "Services",
    "contact": "Contact",
    "about": "About"
  },
  "hero": {
    "title": "Build faster with AI-powered software",
    "subtitle": "From MVPs to scalable platforms — we design, build, and automate your product to grow.",
    "ctaPrimary": "Book a call",
    "ctaSecondary": "See our work"
  },
  "services": {
    "common": {
      "ctaPrimary": "Book a call",
      "ctaSecondary": "Get a proposal"
    },
    "aiAutomation": {
      "title": "AI & Automation",
      "subtitle": "Agents, workflows, and integrations that eliminate manual work.",
      "features": [
        "AI chatbots & copilots (web/WhatsApp)",
        "Process automation & RPA",
        "Knowledge bases & retrieval",
        "Model integration (OpenAI, Gemini, etc.)"
      ],
      "outcomes": [
        "Reduced operational costs",
        "Faster customer support",
        "Consistent lead qualification",
        "Measurable automation ROI"
      ],
      "process": ["Discovery", "Solution design", "Build & integrate", "Measure & optimize"]
    },
    "customSoftware": {
      "title": "Custom Software Development",
      "subtitle": "Web, APIs, and platforms tailored to your business.",
      "features": [
        "Next.js, Node.js, NestJS",
        "Secure APIs & microservices",
        "Scalable architectures",
        "QA, CI/CD & observability"
      ],
      "outcomes": [
        "Faster time to market",
        "Maintainable codebase",
        "Cloud-ready deployments",
        "Lower total cost of ownership"
      ],
      "process": ["Product scoping", "Architecture", "Implementation", "Launch"]
    },
    "ecommerceMarketplaces": {
      "title": "E-commerce & Marketplaces",
      "subtitle": "Stores, multi-tenant marketplaces, and payment integrations.",
      "features": [
        "Storefronts & headless commerce",
        "Shopify/Tiendanube integrations",
        "Payments (Wompi, MercadoPago)",
        "Catalog, cart & orders"
      ],
      "outcomes": [
        "Higher conversion rates",
        "Unified catalog & inventory",
        "Reliable payments",
        "Analytics for growth"
      ],
      "process": ["Audit", "Build", "Integrate", "Optimize"]
    },
    "cloudDevops": {
      "title": "Cloud & DevOps",
      "subtitle": "AWS/GCP/Azure architectures with robust CI/CD and security.",
      "features": [
        "IaC & pipelines",
        "Scalability & reliability",
        "Monitoring & alerts",
        "Cost optimization"
      ],
      "outcomes": [
        "Resilient infrastructure",
        "Fewer incidents",
        "Predictable releases",
        "Lower cloud spend"
      ],
      "process": ["Assess", "Design", "Implement", "Operate"]
    },
    "dataAnalytics": {
      "title": "Data & Analytics",
      "subtitle": "From data pipelines to dashboards and ML-ready datasets.",
      "features": [
        "ETL/ELT pipelines",
        "Data warehousing",
        "BI dashboards",
        "ML feature stores"
      ],
      "outcomes": [
        "Single source of truth",
        "Actionable insights",
        "Faster decisions",
        "ML-ready data"
      ],
      "process": ["Map sources", "Ingest & model", "Visualize", "Iterate"]
    },
    "uiUxBranding": {
      "title": "UI/UX & Branding",
      "subtitle": "Delightful interfaces and brand systems that convert.",
      "features": [
        "Design systems & tokens",
        "UX research & wireframes",
        "High-fidelity UI",
        "Branding & assets"
      ],
      "outcomes": [
        "Consistent design",
        "Better usability",
        "Stronger brand recall",
        "Higher engagement"
      ],
      "process": ["Discover", "Design", "Validate", "Hand-off"]
    },
    "trainingWorkshops": {
      "title": "Training & Workshops",
      "subtitle": "Hands-on sessions on AI, cloud, and modern web stacks.",
      "features": [
        "Custom curricula",
        "Team enablement",
        "Live coding labs",
        "Playbooks & templates"
      ],
      "outcomes": [
        "Upskilled teams",
        "Shared best practices",
        "Faster onboarding",
        "Sustainable velocity"
      ],
      "process": ["Assess needs", "Design program", "Deliver", "Follow-up"]
    }
  }
}