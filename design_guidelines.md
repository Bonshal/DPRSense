# Design Guidelines: Intelligent Project Appraisal Platform

## Design Approach

**Selected Approach:** Design System - Carbon Design System + Government Dashboard Patterns

**Justification:** This is a data-intensive, enterprise-grade government application requiring clarity, authority, and efficiency. The user explicitly requested "minimalistic, professional, and authoritative" aesthetics. Carbon Design System (IBM) is purpose-built for complex data applications and enterprise tools, providing the structured approach needed for multi-view dashboards with heavy data visualization.

**Key Design Principles:**
- Authority through restraint: Clean layouts with purposeful whitespace
- Hierarchy through typography: Clear information architecture using type scale
- Trust through transparency: Every data point traceable to its source
- Efficiency through consistency: Predictable patterns across all views

---

## Core Design Elements

### A. Color Palette

**Primary Colors (Dark Mode - Default):**
- Background Base: 220 15% 8%
- Surface: 220 12% 12%
- Surface Elevated: 220 10% 16%
- Border Subtle: 220 8% 24%

**Accent & Status Colors:**
- Primary Action: 210 100% 56% (Authoritative Blue)
- Success/Found: 142 76% 36%
- Warning/Medium Risk: 38 92% 50%
- Error/High Risk: 0 84% 60%
- Info/Low Risk: 199 89% 48%

**Text Colors (Dark Mode):**
- Primary Text: 0 0% 95%
- Secondary Text: 0 0% 70%
- Tertiary/Muted: 0 0% 50%

**Light Mode Variants:**
- Background: 0 0% 98%
- Surface: 0 0% 100%
- Primary Text: 220 15% 15%
- Borders: 220 10% 85%

### B. Typography

**Font Families:**
- Primary: 'Inter' (Google Fonts) - Clean, highly legible for data
- Monospace: 'JetBrains Mono' - For numerical data, code, coordinates

**Type Scale:**
- Display (Dashboard Titles): 2.25rem / 700 / -0.02em
- Heading 1 (View Titles): 1.875rem / 600 / -0.01em
- Heading 2 (Section Headers): 1.5rem / 600 / normal
- Heading 3 (Card Titles): 1.125rem / 600 / normal
- Body Large (Key Metrics): 1rem / 500 / normal
- Body (Default): 0.875rem / 400 / normal
- Caption (Labels, Meta): 0.75rem / 400 / 0.01em
- Mono (Data Values): 0.875rem / 500 / normal

### C. Layout System

**Spacing Primitives:** Tailwind units of 1, 2, 3, 4, 6, 8, 12, 16, 24
- Component padding: p-4, p-6, p-8
- Section spacing: space-y-6, space-y-8
- Grid gaps: gap-4, gap-6
- Margins: m-2, m-4, m-8

**Grid System:**
- Left Sidebar Navigation: w-64 (fixed)
- Main Content Area: flex-1 with max-w-7xl container
- Card Grids: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Data Tables: Full-width with horizontal scroll on mobile

**Viewport Strategy:**
- Dashboard: Natural height, scrollable content
- Modals/Overlays: Centered, max-h-[90vh] with internal scroll
- Navigation: Fixed sidebar, sticky top bar on mobile

### D. Component Library

**Navigation:**
- Left Sidebar: Fixed, dark background (220 12% 10%), w-64
- Logo area: h-16 with subtle border-b
- Nav items: px-4 py-3, hover state with bg-surface-elevated, active with left border accent
- User profile section at bottom with logout option

**Dashboard Cards:**
- White/Surface background with subtle border
- Rounded corners: rounded-lg (8px)
- Shadow: Minimal - shadow-sm on hover
- Padding: p-6
- Header with icon + title, body with metrics/charts

**Data Tables:**
- Zebra striping for rows (alternating bg)
- Header: Sticky, bold, bg-surface-elevated
- Cell padding: px-4 py-3
- Hover state: bg-surface with smooth transition
- Sortable columns with arrow indicators

**Forms & Inputs:**
- Input fields: Dark bg-surface, border-subtle, focus:border-primary
- Height: h-11 for consistency
- Labels: text-sm font-medium mb-2
- File upload: Dashed border dropzone, hover state

**Buttons:**
- Primary: bg-primary, text-white, px-6 py-2.5, rounded-md
- Secondary: bg-surface-elevated, border-subtle
- Danger: bg-error for destructive actions
- Icon buttons: p-2, rounded-full for circular buttons

**Status Indicators:**
- Risk Gauges: Semi-circular SVG gauges with gradient fills
- Progress Bars: h-2, rounded-full, animated fill
- Badges: Rounded-full, px-3 py-1, colored by status
- Checkmarks/Icons: Heroicons, size-5 or size-6

**Modals & Overlays:**
- Backdrop: bg-black/60 backdrop-blur-sm
- Content: bg-surface, max-w-4xl, rounded-lg, p-8
- PDF Viewer Modal: max-w-6xl with image + highlight overlay
- Close button: top-right, size-6 icon

**Charts & Visualizations:**
- Use Chart.js or Recharts for consistency
- Bar charts for benchmark comparisons
- Line charts for trends
- Color coding matches status colors
- Tooltips on hover with detailed info

**Maps (Geospatial):**
- Leaflet or Mapbox GL JS
- Dark theme map tiles for consistency
- Custom pin markers in primary color
- Popup cards matching dashboard card styling

### E. Animations

**Use Sparingly:**
- Page transitions: 200ms fade
- Hover states: 150ms ease-in-out
- Loading spinner: Smooth rotation
- Progress bar: Animated width transition
- Avoid scroll animations or parallax effects

---

## View-Specific Guidelines

**Login View:**
- Centered card on gradient background (220 15% 8% to 220 15% 12%)
- Logo at top, clean input fields, prominent login button
- Max width: max-w-md

**Upload View:**
- Centered layout with large dropzone
- Visual feedback on file select
- Analyze button disabled until file selected

**Analyzing View:**
- Centered spinner with status messages
- Progress percentage display
- Smooth status text transitions

**Dashboard Overview:**
- 3-column grid for key metric cards (Health Score, Cost, Duration)
- Benchmark comparison charts below in 2-column layout
- Geospatial map section: Full-width card with h-96 map

**Compliance View:**
- Single-column checklist with clear Found/Not Found indicators
- Green checkmarks and red X icons
- Expandable sections for details

**Financial Analysis:**
- Table with stated vs calculated columns
- Color-coded match/mismatch status
- Summary cards above table

**Risk Assessment:**
- Large gauge visualizations for Cost/Schedule risks
- AI Explainability section below with ranked list
- Color-coded risk levels

**Data Explorer:**
- Comprehensive table with View Source buttons
- Expandable rows for long values
- Search/filter functionality

**Action Panel:**
- Fixed bottom bar or right sidebar
- Three action buttons in a row
- Comment textarea below
- Audit trail as expandable section

---

## Images

**No hero images required** - This is a dashboard application, not a marketing site. All views are functional/data-focused.

**Icons:** Heroicons (outline style) via CDN for all UI icons
**Charts:** Chart.js or Recharts for data visualizations
**Map:** Mapbox or Leaflet with custom markers