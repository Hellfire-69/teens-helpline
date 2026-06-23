# Teens Helpline — Complete Design Prompt
### For use with Cursor / Windsurf / Claude Code / any AI-assisted implementation

---

## ⚠️ READ THIS FIRST — What You're Building and Why It Looks Different

This is not a generic AI SaaS product. It is a mental wellness platform for teenagers.
The design must work for a 15-year-old who is anxious at 11pm and doesn't want to feel
like they're opening a productivity app or a startup landing page.

**The current v3 design is a dark-mode card layout that looks like a note-taking app.**
It has good bones — the section structure is right, the hierarchy works —
but it could be Notion, it could be a journaling app, it could be a therapy startup.
It has no identity. That's what this rebuild fixes.

**The new design should feel like:** A thoughtful person's apartment at dusk.
Warm light. Real materials. Nothing performative. Comfortable immediately.

**The three things a reviewer should say when they see this:**
1. "This doesn't look like other wellness apps."
2. "This looks like it was made by someone who actually thought about it."
3. "I feel comfortable here."

---

## Project Stack

```
Framework:     Next.js 14 (App Router)
Language:      TypeScript
Styling:       Tailwind CSS v3
Components:    shadcn/ui (base), 21st.dev (enhancements)
Animation:     Framer Motion
AI:            Gemini API (existing integration, keep)
Database:      Supabase (free tier)
Deployment:    Vercel
Fonts:         Google Fonts (Fraunces + Plus Jakarta Sans)
Icons:         Lucide React
Images:        Unsplash (real photography, not illustrations)
Illustrations: Storyset (for empty states and onboarding only)
```

---

## Design System — The Source of Truth

### Color Tokens

All colors are CSS custom properties. Define in `globals.css` and map to Tailwind theme.
Every color decision in the codebase must trace back to one of these tokens.

```css
:root {
  /* Foundation — the page itself */
  --bg-base:        #F5F2EE;   /* Warm ivory. Not white, not cream. */
  --bg-surface:     #FFFFFF;   /* Card surfaces, inputs, panels */
  --bg-elevated:    #EDE9E3;   /* Hover states, subtle dividers */
  --bg-inverse:     #1C2B2B;   /* Dark sections (footer, hero alt) */

  /* Primary — Deep Teal. The brand. */
  --teal-900:       #0D2626;
  --teal-700:       #1A4040;
  --teal-500:       #2D6A6A;   /* Primary buttons, active states, links */
  --teal-300:       #5B9E9E;   /* Hover state of primary */
  --teal-100:       #C8E0E0;   /* Teal tints, tag backgrounds */
  --teal-50:        #EBF4F4;   /* Very light teal fills */

  /* Secondary — Sage Green. Success, calm, positive mood */
  --sage-500:       #6B9E7A;
  --sage-300:       #9EC4A8;
  --sage-100:       #D4EBD9;
  --sage-50:        #EEF7F0;

  /* Warm Sand — Emotional warmth, highlights, Nova character */
  --sand-500:       #C4956A;
  --sand-300:       #D9B898;
  --sand-100:       #F0E0CE;
  --sand-50:        #FAF3EC;

  /* Text */
  --text-primary:   #1A1A1A;   /* Headings */
  --text-body:      #2C2C2C;   /* Body copy */
  --text-muted:     #6B7280;   /* Captions, labels, secondary info */
  --text-placeholder: #9CA3AF;
  --text-inverse:   #F5F2EE;   /* Text on dark backgrounds */

  /* Signal — Reserved ONLY for functional states */
  --signal-crisis:  #C0392B;   /* Emergency / crisis only. Never decorative. */
  --signal-warning: #D97706;   /* Warnings */
  --signal-success: var(--sage-500);

  /* Radius */
  --radius-sm:   6px;
  --radius-md:   12px;
  --radius-lg:   16px;
  --radius-xl:   24px;
  --radius-2xl:  32px;
  --radius-full: 9999px;

  /* Shadows — warm-tinted, never gray */
  --shadow-sm:  0 1px 3px 0 rgba(45, 106, 106, 0.08);
  --shadow-md:  0 4px 16px 0 rgba(45, 106, 106, 0.10);
  --shadow-lg:  0 8px 32px 0 rgba(45, 106, 106, 0.12);
  --shadow-card: 0 2px 12px 0 rgba(28, 43, 43, 0.08);
}
```

**What's removed vs the current palette:**
- ❌ Plum/purple — reads as generic wellness app
- ❌ Coral — was being used for everything; now only for legacy CTA (phase out)
- ❌ Sunshine yellow — too cheerful for a grounded emotional product
- ❌ Fredoka One — childish, conflicts with grounded direction
- ✅ Warm ivory foundation instead of white or dark gray
- ✅ Deep teal as the primary brand color

---

### Typography Tokens

```css
:root {
  /* Display — Fraunces (Google Fonts, variable font) */
  /* Used for: Hero headlines, dashboard section titles, Nova's speech */
  --font-display: 'Fraunces', Georgia, serif;

  /* UI — Plus Jakarta Sans (Google Fonts) */
  /* Used for: All interface text, labels, buttons, body copy */
  --font-ui: 'Plus Jakarta Sans', system-ui, sans-serif;

  /* Mono — for timestamps, data, entry IDs */
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

**Font loading in layout.tsx:**
```typescript
import { Fraunces, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  axes: ['opsz', 'SOFT', 'WONK'], // Variable font axes
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-ui',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});
```

**Why Fraunces over Fredoka One:**
Fredoka is playful and rounded — fine for the current aesthetic, wrong for the redesign.
Fraunces is a variable serif with genuine editorial warmth. It looks like it was chosen,
not defaulted to. It signals: "this product respects your intelligence." The serif heading
paired with a clean sans UI font is a pairing no other mental health app uses right now.

**Type Scale:**

| Name | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| Display | 56–72px | 300–400 (light) | 1.05 | Hero headline only |
| H1 | 40px | 400 | 1.15 | Page titles |
| H2 | 28px | 400 | 1.2 | Section headers |
| H3 | 20px | 600 (Jakarta) | 1.3 | Card titles, subsections |
| Body Large | 18px | 400 | 1.7 | Intro paragraphs |
| Body | 16px | 400 | 1.65 | Standard body copy |
| Body Small | 14px | 400 | 1.6 | Secondary content |
| Caption | 12px | 500 | 1.5 | Labels, timestamps, metadata |
| Overline | 11px | 600 | 1.4 | UPPERCASE tracking-widest labels |

**Critical rules:**
- Display and H1–H2 use `--font-display` (Fraunces)
- Everything else uses `--font-ui` (Plus Jakarta Sans)
- Never use font-weight 700+ on Fraunces — the light/regular weights are the character
- Never use Fraunces at small sizes (below 18px) — it loses its quality

---

### Spacing System

Base unit: 4px. All spacing in multiples of 4.

```
4px   — xs  (tight elements, icon padding)
8px   — sm  (between related items)
12px  — md  (internal card padding, form gaps)
16px  — lg  (standard gap)
24px  — xl  (section sub-elements)
32px  — 2xl (card padding)
48px  — 3xl (section internal padding)
64px  — 4xl (section vertical padding mobile)
96px  — 5xl (section vertical padding desktop)
128px — 6xl (large section separators)
```

---

### Motion System

**Principle: Earn every animation. When in doubt, remove it.**

```typescript
// Standard easing — use for most transitions
export const ease = [0.22, 1, 0.36, 1]; // Custom spring-like ease

// Duration tokens
export const duration = {
  instant:  0.1,   // Micro-interactions (checkbox, toggle)
  fast:     0.2,   // Hover states, button presses
  standard: 0.35,  // Page transitions, modal open/close
  slow:     0.55,  // Scroll-triggered reveals, hero entrance
  ambient:  null,  // Looping animations — use sparingly
};

// Standard fade-up (used for scroll reveals)
export const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};
```

**Reduced motion — MANDATORY on every animated component:**
```typescript
// In every component with animation:
const prefersReducedMotion = 
  typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

// Or use the hook:
import { useReducedMotion } from 'framer-motion';
const shouldReduceMotion = useReducedMotion();
```

**What should NOT be animated:**
- Background blob animations on every section (current design does this — remove)
- Continuous looping animations on content that users read
- Page-load animations that delay content visibility beyond 300ms
- Anything that moves while the user is trying to interact with it

---

## Page-by-Page Implementation Brief

---

### 1. Landing Page (`/`)

**Goal:** Convert a first-time visitor in under 10 seconds. Give a returning visitor a clear path to their dashboard.

---

#### Navbar

```
Layout: Sticky, transparent → solid on scroll
Height: 64px
Max-width: 1200px centered

Left:   Logo mark (Nova glyph, small) + "Teens Helpline" in Plus Jakarta Sans Medium
Center: Nav links (desktop only) — Home, How it works, Real Help
Right:  "Open my space" button (teal, pill shape) → /dashboard

Mobile: Hamburger → full-screen overlay menu

Crisis strip ABOVE navbar:
  Background: --signal-crisis (red)
  Text: "Need help now? iCall: 9152987821" — always visible, never hidden
  Height: 36px
  This strip does NOT disappear on scroll.
```

**shadcn/ui components:** `NavigationMenu`, `Button`, `Sheet` (mobile menu)

---

#### Hero Section

**Concept:** The hero is a statement, not a sales pitch.

```
Background: --bg-base (warm ivory)
Layout: Two-column on desktop, stacked on mobile

Left column:
  Overline label: "A private space for you"  (--teal-500, uppercase, 11px, tracked)
  Display headline: "The thoughts you       (Fraunces, 64px, weight 300)
   don't know what
   to do with."
  Body: One sentence, plain. (16px, --text-muted, max 380px wide)
        "No sign-up. No data. Just a place to untangle your mind."
  CTA row:
    Primary: "Start checking in" → /dashboard  (--teal-500 fill, pill)
    Secondary: "See how it works"  (text link, --teal-500, underline on hover)
  Trust row: Three micro-badges inline
    👻 No account needed
    🔒 Stays on your device
    ✦ Private, always

Right column:
  A real, tasteful Unsplash photograph.
  Subject: A teenager at a window, looking out, golden hour light.
  NOT: A phone mockup. NOT: A cartoon. NOT: A stock-photo smile.
  Search Unsplash: "teenager window light contemplative"
  Image shape: Rounded rectangle (--radius-2xl), slight warm shadow
  Subtle teal gradient overlay at bottom edge (10% opacity)
```

**Unsplash query:** `https://unsplash.com/s/photos/teenager-window-contemplative`

**Why this image choice:** The product is about emotional honesty. A real human moment
(a teenager looking out a window) is more emotionally resonant than any mockup or
illustration. It signals: "we take your experience seriously."

**shadcn/ui components:** `Button`, `Badge` (for trust micro-badges)
**21st.dev inspiration:** Search "hero split layout" — use the two-column pattern

---

#### Section 2 — "A quiet ritual"

**Concept:** Show the mood check-in as a human moment, not a product feature.

```
Background: --bg-surface (white)
Padding: 96px vertical

Layout: Centered, max-width 640px

Eyebrow: "Check in" (overline style)
Headline: "A quiet ritual to        (Fraunces, H1 size)
           untangle your mind."
Body: Two sentences max.
      "Takes three seconds. You don't have to explain it or try to fix anything.
       Just notice what's there."

Below the text:
  Floating card mockup of the mood check-in UI
  Card: white, --shadow-lg, --radius-xl
  Inside: The 6 mood options in a 3x2 grid
          Each mood: emoji + label, --bg-elevated background, --radius-md
          One mood shown as "selected" (teal border, --teal-50 background)
  Below moods: A text input field showing placeholder "What's going on? (optional)"
  CTA inside card: "Save today's mood" button (--teal-500)

The card has a subtle drop shadow and sits slightly rotated (-1deg) on desktop.
This slight rotation is the signature design detail of this section.
```

**Image/illustration:** None in this section. The UI mockup IS the visual.

---

#### Section 3 — "Get it out of your head"

**Concept:** Introduce the journal as a writing surface, not a feature list.

```
Background: --bg-elevated (warm light gray)
Layout: Two-column, image left / text right (reversed from hero)

Left: Storyset illustration of a person writing in a journal
      Style: "Amico" or "Bro" style from Storyset (warm, not cartoonish)
      Storyset query: https://storyset.com/search#q=journal&style=amico
      Illustration should use --teal-500 as primary color in Storyset color editor

Right:
  Overline: "Journal"
  Headline: "Get it out of your head." (Fraunces H1)
  Body: "Write it down — privately. Nothing leaves your device.
         It saves automatically. No one can read it. Ever."
  Feature list (3 items, no bullet points, spaced lines):
    ✦ Private Journal entries
    ✦ Daily writing prompts
    ✦ Stays on your device

  CTA: "Try a prompt" → /dashboard/journal  (text link style)
```

---

#### Section 4 — "Meet Nova"

**Concept:** Nova is introduced as a presence, not a chatbot feature.

```
Background: --bg-inverse (dark teal: --teal-900)
Text color: --text-inverse
Layout: Centered, max-width 720px

Overline: "AI Companion" (--teal-300, uppercase)
Headline: "Meet Nova. A sounding      (Fraunces, white, large)
           board for the tough days."
Body: "Sometimes you just need to talk through a problem.
       Not a therapist trying to diagnose you. Not a doctor trying to prescribe anything.
       Just a calm, private space to think out loud."

Nova visual:
  The abstract luminous orb (see Nova Visual Spec below)
  Centered above the headline
  Diameter: 120px in this context
  Glowing teal, gently pulsing (2s loop, reduced-motion: static)

Disclaimer (important):
  Small text below: "Nova is not a therapist and cannot replace professional help."
  Style: 12px, --text-inverse at 50% opacity
  This disclaimer is always visible when Nova is mentioned.

Chat preview:
  A static mockup of 2 chat bubbles
  User: "I've been feeling really off lately and I can't explain why."
  Nova: "That feeling of something being off but not knowing what — that's real.
         You don't have to name it to talk about it. What's been different?"
  
  Bubble styles:
    User: --teal-700 background, white text, right-aligned
    Nova: white background, --text-body, left-aligned, --shadow-sm

CTA: "Talk to Nova" → /talk-to-nova  (--teal-300 border, white text, ghost button)
```

---

#### Section 5 — "Everything stays in one place"

**Concept:** Show the dashboard as a personal space, not a data product.

```
Background: --bg-base
Layout: Centered text above, full-width dashboard screenshot below

Headline: "Everything stays in one place." (Fraunces H2, centered)
Body: "Your entries, your check-ins, your conversations with Nova.
       Organized automatically into a private space that only exists for you."

Dashboard preview:
  A screenshot or live-rendered preview of the actual dashboard
  Framed in a browser chrome mockup (subtle, minimal)
  Shown at 80% scale, centered, with --shadow-lg
  
  The dashboard should show:
    - A mood calendar with some days filled in (real data look)
    - 2-3 journal entry previews
    - A Nova chat preview
  
  Overlay a subtle vignette on the bottom of the preview image
  (so it "fades into" the section background — suggests there's more)
```

---

#### Section 6 — Trust / Privacy

**Concept:** Earn trust by being specific, not by using trust-badge marketing.

```
Background: --bg-surface
Layout: 3-column on desktop, stacked on mobile

NO generic icons. Use a single Unsplash photo per column as a subtle background,
or use a simple typographic treatment instead.

Column 1:
  Overline: "Privacy"
  Headline: "Total Anonymity"  (Fraunces H3)
  Body: "No name. No email. No account. Your data never touches a server
         unless you explicitly choose to save it."
  Technical note: "Stored on your device using a private ID."

Column 2:
  Overline: "Safety"
  Headline: "Feeling completely overwhelmed?"
  Body: "Nova is trained to recognize when things get serious.
         We always keep real help one tap away."
  Link: "See crisis resources →" → /real-help

Column 3:
  Overline: "Yours"
  Headline: "Sleep and Stress Cycles"
  Body: "Your mood history, your patterns, your insights.
         Export or delete everything, anytime."
  Link: "Privacy policy →" → /privacy
```

---

#### Section 7 — Final CTA

**Concept:** Quiet invitation, not high-pressure conversion.

```
Background: --teal-900 (deep dark teal)
Layout: Centered

Headline: "Ready to take a breath?" (Fraunces, white, large)
Subtext: "Nova starts where you are." (--text-inverse at 70% opacity)
CTA: "Open my space" (--teal-300 background, --teal-900 text, pill, large)

Real help link below button:
  "Need real human help right now? → Real Crisis Support"
  --text-inverse at 50% opacity, underline on hover
```

---

#### Footer

```
Background: --teal-900
Layout: Two rows

Row 1 — Crisis numbers (prominent):
  "Need to talk to someone real?"
  iCall: 9152987821 (Mon-Sat, 8am-10pm)
  Vandrevala: 1860-2662-345 (24/7)
  Emergency: 112
  Each number: large, tappable, --teal-300 color

Row 2 — Standard footer:
  Left: Logo + tagline "A private space for teens."
  Center: Nav links
  Right: "Made for real teens." small attribution
```

---

### 2. Dashboard (`/dashboard`)

**This is the centrepiece of the portfolio. It must look like a real product.**

```
Layout: Two-column on desktop (sidebar + main), full-width on mobile
Background: --bg-base
```

#### Sidebar

```
Width: 240px (collapsible on mobile)
Background: --bg-surface
Border-right: 1px solid --bg-elevated

Top: Logo + "My Space" label

Navigation items (with Lucide icons):
  🏠 Dashboard          → /dashboard
  😌 Mood Log           → /dashboard/mood
  📓 Journal            → /dashboard/journal
  🌿 Nova               → /dashboard/nova  (chat)
  💡 Help Yourself      → /help-yourself
  📞 Real Help          → /real-help (always visible)

Bottom:
  Settings icon
  "Delete all my data" — small text, --text-muted
  Privacy policy link
```

**shadcn/ui components:** `Sidebar` (from shadcn/ui sidebar primitive)

---

#### Main Dashboard Content

```
Greeting header:
  "Good evening."  (Fraunces H1, --text-primary)
  Date below: "Tuesday, 22 June"  (Plus Jakarta Sans, --text-muted, 14px)

Today's check-in module (if not done today):
  Card: white, --shadow-card, --radius-xl
  "How are you feeling today?"
  Mood grid (6 options, same as landing page mockup but interactive)
  Optional note input
  "Save" button

If already checked in:
  "You checked in today — [mood emoji] [mood label]"
  Subtle teal left border on the card
  "Add a note?" link below

Mood calendar (last 30 days):
  Calendar grid, one square per day
  Colors map to mood:
    High/positive → --sage-300
    Neutral       → --teal-100
    Low/negative  → --sand-300
    Not logged    → --bg-elevated (empty)
  Squares: 32x32px, --radius-sm, slight gap
  Legend below the calendar (small, --text-muted)
  Month label above: "June 2025"

Recent journal entries (last 3):
  Section header: "Recent entries" + "View all →" link right-aligned
  Each entry card:
    Date (overline style)
    First 80 characters of entry text (truncated)
    Mood indicator dot (colored, matches mood that day)
    "Continue reading →" on hover
    Card: --bg-surface, --shadow-sm, --radius-lg, border on hover

Nova recent conversation (last session):
  Section header: "Your last conversation with Nova"
  Shows last 2 messages from most recent chat
  "Continue" button → /dashboard/nova
```

**shadcn/ui components:** `Card`, `Calendar` (adapt for mood), `ScrollArea`

---

### 3. Nova Chat (`/dashboard/nova`)

```
Layout: Full-height chat interface, no sidebar on mobile

Header:
  Nova glyph (small, 36px) + "Nova" in Fraunces
  Subtitle: "A private space to think out loud"
  Right: "Real help" link (--signal-crisis color, Phone icon)
  Bottom border + crisis strip: "This conversation is private. Nothing is saved beyond this session."

Chat area:
  Background: --bg-base
  Messages centered, max-width 680px
  
  Nova messages:
    Background: --bg-surface
    Border: 1px solid --bg-elevated
    --radius-xl, --radius-bl-sm (tail effect)
    Text: --text-body, 16px, 1.65 line-height
    Nova glyph (24px) to the left of first message in a group
  
  User messages:
    Background: --teal-500
    Color: white
    --radius-xl, --radius-br-sm (tail effect)
    Right-aligned
  
  Typing indicator:
    Three dots, --teal-300 color, animated (bounce, 0.6s stagger)
    Reduced-motion: static dots

Input area:
  Background: --bg-surface
  Border-top: 1px solid --bg-elevated
  Textarea: auto-expand, max 120px height
  Send button: --teal-500, circle, Lucide Send icon
  Disclaimer: "Nova is not a therapist." — 11px, --text-muted, centered

Safeguarding — CRITICAL:
  If user input matches crisis keywords (see keyword list in crisis protocol):
    DO NOT send to Gemini API
    Instead show a special Nova response:
      "I hear you. What you're describing sounds really serious.
       I'm not the right support for this — a real person is.
       Please reach out to iCall right now: 9152987821 (Mon-Sat 8am-10pm)
       or Vandrevala: 1860-2662-345 (available 24/7)."
    Show large, tappable phone buttons for both numbers
    This response cannot be dismissed or hidden
```

---

### 4. Journal (`/dashboard/journal`)

```
Layout: Two-panel on desktop (entry list left, editor right)
        Full-screen editor on mobile

Left panel — Entry list:
  Search input at top
  Each entry:
    Date (Fraunces, readable)
    First line preview (truncated)
    Mood dot indicator
    Selected state: --teal-50 background, --teal-500 left border
  "New entry" button at top-right (--teal-500, + icon)

Right panel — Editor:
  Clean writing surface
  Background: --bg-surface, no border, no shadow
  Font: Plus Jakarta Sans, 18px, 1.75 line-height (for comfortable reading)
  Placeholder: "What's on your mind today? Start anywhere."
  No toolbar (keep it distraction-free)
  Autosave indicator: small, --text-muted, bottom-right
    "Saved just now" (with Lucide Check icon)
  
  Today's prompt (collapsible):
    Small teal chip at top: "✦ Today's prompt"
    Click to expand → shows one writing prompt
    X to dismiss

  Mood for this entry:
    Small selector below the editor
    "How are you feeling while writing this?"
    6 emoji options, compact

Character/word count: bottom-right, --text-muted, 12px
```

---

### 5. Real Help (`/real-help`)

**This page is designed for acute distress. Every decision must serve a user who is struggling.**

```
NO animation on this page (or minimal only).
NO decorative elements.
HIGH contrast text.
IMMEDIATE access to phone numbers.

Hero:
  Background: --teal-900
  Large headline: "Real help is here." (Fraunces, white)
  Body: "If something feels too big to handle alone, reaching out to a real person
         is the bravest thing you can do."
  
  Immediately below: Two large phone cards
    iCall card:
      Large number: 9152987821  (Fraunces, 32px, white)
      Hours: Mon-Sat, 8am-10pm
      "Tap to call" button (--sage-500, large, full-width on mobile)
    
    Vandrevala card:
      Large number: 1860-2662-345
      Hours: 24/7 — Available right now
      "Tap to call" button
    
    Emergency card:
      "In immediate danger?"
      "Call 112" (--signal-crisis, very large)

  Design note: These cards must be tappable on mobile with large touch targets (min 56px height).
               There is no hover state required — just a clear active/press state.
```

---

## Nova — Visual Identity Specification

**Nova is not a ghost. Nova is not a chatbot avatar. Nova is a presence.**

### What Nova Is

Nova is an abstract luminous form — a softly glowing orb that suggests warmth and
attentiveness without representing a face, a person, or an animal.

The deliberate choice to avoid a face is a product decision, not an aesthetic one:
faces create emotional expectations. A smiling face on a serious disclosure is a
design failure. Nova can radiate states without expressing them.

### SVG Structure

```
Base form:    A circle, diameter variable (see usage sizes below)
Fill:         Radial gradient, center --teal-300 → edge --teal-700
Outer glow:   A slightly larger circle, --teal-500 at 15% opacity, blur 20px
Inner light:  A small ellipse, white at 25% opacity, offset top-left (suggests light source)

States:
  Resting:    Gentle pulse animation (scale 1 → 1.05 → 1, 3s loop)
  Listening:  Slightly larger, glow increases (--teal-300 at 25% opacity)
  Responding: Brief ripple outward from center (scale 1 → 1.3, opacity 1 → 0, 0.5s)
  Heavy:      Shifts toward warm sand (--sand-300 tint added to gradient)
  Crisis:     Warm amber glow (--sand-500), slightly larger — communicates seriousness
              DO NOT use red/crisis colors for Nova's visual state.
              Nova should feel calm even when the content is not.

Reduced-motion: All state changes become instant (no pulse, no ripple, no transitions)
```

### Usage Sizes

```
Favicon / tiny:   16px  — simple circle only, no glow
Nav / micro:      24px  — circle + subtle gradient
Chat header:      36px  — full form, gentle pulse
Dashboard card:   48px  — full form, listening state
Landing section: 120px  — full form, ambient glow, slow pulse
Hero/large:      180px  — full form, all effects
```

### Nova's Color in Context

```
On light backgrounds (--bg-base):   Standard teal gradient
On dark backgrounds (--bg-inverse): Add white inner glow at 30% opacity
In crisis context:                  Warm amber state (never red, never panicked)
```

---

## Storyset Illustration Usage

Storyset illustrations are used in EXACTLY TWO places:
1. The journal section on the landing page (person writing)
2. Empty states (first-time dashboard, no journal entries yet)

**Configuration for Storyset:**
- Style: "Amico" (warm, slightly abstract, not cartoony)
- Primary color: Set to --teal-500 in the Storyset color editor before downloading
- Secondary color: Set to --sand-300
- Background: Transparent
- Format: SVG (for scalability)
- Size: Download at 800px, embed at 400-600px

**Storyset queries:**
- Journal/writing: https://storyset.com/search#q=writing+journal&style=amico
- Empty state (no entries): https://storyset.com/search#q=blank+page&style=amico
- First visit welcome: https://storyset.com/search#q=welcome&style=amico

**Do NOT use Storyset for:**
- Hero sections (use real photography from Unsplash)
- Nova character (use the custom SVG spec above)
- Decorative backgrounds

---

## Unsplash Photography Guidelines

**Usage:** Landing page hero, section backgrounds (rare), Real Help page (optional)

**Search queries and usage:**
```
Hero section:
  Query: "teenager contemplative window golden hour"
  URL: https://unsplash.com/s/photos/teenager-window-contemplative
  Filter: Portrait orientation, warm tones, avoid faces if possible (or show from behind)

Journal section:
  Do NOT use photography here — use Storyset illustration

"Real Help" page (optional):
  Query: "phone light hope"
  Mood: Warm, hopeful, not clinical

General rules:
  ✅ Real lighting (golden hour, diffused natural light)
  ✅ Genuine moments (not posed stock)
  ✅ Warm color temperatures
  ✅ Single subject or empty spaces
  ❌ No stock-photo smiles
  ❌ No clinical settings (no white coats, no offices)
  ❌ No group shots (this product is about private individual experience)
  ❌ No generic "happy teen" imagery
```

---

## shadcn/ui Component Map

Install and configure shadcn/ui before building. These components are used as the base
layer — all visual customization is done through CSS variables, not by modifying shadcn internals.

```bash
npx shadcn@latest init
# Choose: TypeScript, Tailwind CSS, App Router, neutral base color

npx shadcn@latest add button card input textarea badge separator 
npx shadcn@latest add navigation-menu sheet scroll-area tooltip
npx shadcn@latest add dialog alert-dialog
```

**Component → Usage mapping:**

| shadcn Component | Used For |
|---|---|
| `Button` | All CTAs. Override background with --teal-500 via CSS var |
| `Card` | Dashboard modules, journal entries, mood display |
| `Input` | Text inputs throughout |
| `Textarea` | Journal editor, Nova chat input |
| `Badge` | Mood labels, trust badges on landing page |
| `Separator` | Section dividers |
| `NavigationMenu` | Desktop navigation |
| `Sheet` | Mobile navigation drawer |
| `ScrollArea` | Chat message list, journal entry list |
| `Tooltip` | Mood calendar day hover (shows date + mood) |
| `Dialog` | Privacy info modal, keyboard shortcuts |
| `AlertDialog` | "Delete all data" confirmation |

**CSS variable override in globals.css:**
```css
/* Override shadcn's default --primary to use our teal */
:root {
  --primary: 45 106 106;         /* --teal-500 in HSL */
  --primary-foreground: 245 242 238;  /* --bg-base */
  --background: 245 242 238;    /* --bg-base */
  --foreground: 26 26 26;       /* --text-primary */
  --card: 255 255 255;          /* --bg-surface */
  --border: 237 233 227;        /* --bg-elevated */
  --radius: 0.75rem;            /* --radius-md */
}
```

---

## 21st.dev Component Suggestions

These are enhancement components from 21st.dev to install on top of shadcn/ui.
Search 21st.dev for these patterns and adapt to the design system:

**Search terms on 21st.dev:**
- "text reveal animation" — for hero headline entrance
- "card hover" — for journal entry cards
- "progress ring" — for streak/progress display on dashboard
- "typewriter" — for Nova's response animation (use sparingly)
- "ambient background" — for the Nova section on landing page (subtle, not excessive)
- "stat card" — for mood calendar summary statistics
- "sidebar" — for dashboard navigation

**Important:** Adapt every 21st.dev component to use the design system tokens above.
Do not carry over their default colors. The palette consistency is what makes this
look like a real product, not a collection of borrowed components.

---

## Accessibility Requirements (Non-Negotiable)

These are minimum requirements, not aspirational goals.

```
Color contrast:
  Body text on --bg-base: minimum 7:1 ratio (AAA)
  UI text on --bg-surface: minimum 4.5:1 ratio (AA)
  Crisis numbers: minimum 7:1 (AAA) — these must always be maximally legible

Focus states:
  All interactive elements: 2px solid --teal-500 outline, 2px offset
  Never remove focus outlines — use :focus-visible to hide from mouse only
  Focus must be clearly visible on both light and dark backgrounds

Touch targets:
  Minimum 44x44px for all interactive elements
  Crisis phone number buttons: minimum 56px height on mobile

Motion:
  Every animation must check prefers-reduced-motion
  Respect it unconditionally — no exceptions for "minor" animations

Screen readers:
  All images: descriptive alt text
  Mood emojis: aria-label with mood name and description
  Nova glyph: aria-label="Nova, your AI companion"
  Crisis section: role="region" aria-label="Crisis support resources"

Keyboard navigation:
  Full keyboard access to all features
  Tab order must be logical
  Modal dialogs must trap focus
  Escape key closes all overlays
```

---

## File Structure

```
app/
├── globals.css              ← All CSS variables, design tokens, base styles
├── layout.tsx               ← Font loading, providers
├── page.tsx                 ← Landing page
├── dashboard/
│   ├── page.tsx             ← Dashboard home
│   ├── mood/page.tsx        ← Mood log + history
│   ├── journal/page.tsx     ← Journal with editor
│   └── nova/page.tsx        ← Nova chat interface
├── talk-to-nova/page.tsx    ← Public (non-dashboard) Nova chat
├── real-help/page.tsx       ← Crisis resources
├── help-yourself/page.tsx   ← Coping toolkit
└── privacy/page.tsx         ← Privacy policy

components/
├── ui/                      ← shadcn/ui generated components (do not edit)
├── nova/
│   ├── NovaGlyph.tsx        ← The SVG luminous orb, all sizes
│   ├── NovaChatInterface.tsx
│   └── NovaMessage.tsx
├── mood/
│   ├── MoodSelector.tsx
│   ├── MoodCalendar.tsx
│   └── MoodCard.tsx
├── journal/
│   ├── JournalEditor.tsx
│   ├── JournalEntryList.tsx
│   └── JournalPrompt.tsx
├── dashboard/
│   ├── DashboardSidebar.tsx
│   ├── CheckInModule.tsx
│   └── RecentEntries.tsx
├── layout/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── CrisisStrip.tsx      ← Always-visible crisis bar (top of page)
└── landing/
    ├── HeroSection.tsx
    ├── MoodPreviewSection.tsx
    ├── JournalSection.tsx
    ├── NovaSection.tsx
    ├── DashboardPreviewSection.tsx
    ├── TrustSection.tsx
    └── FinalCTASection.tsx

lib/
├── gemini.ts                ← Gemini API client + Nova system prompt
├── safeguarding.ts          ← Crisis keyword detection (runs BEFORE Gemini)
├── identity.ts              ← Anonymous UUID management
├── storage.ts               ← Supabase client + data helpers
└── analytics.ts             ← Privacy-safe event logging

types/
├── mood.ts
├── journal.ts
└── nova.ts
```

---

## Critical Implementation Notes

**1. The design system is the source of truth.**
Every color, spacing, and typography decision must trace back to a CSS variable.
No hardcoded hex values anywhere in component files.

**2. Safeguarding runs before every Gemini call.**
The `lib/safeguarding.ts` module must be called before any user message reaches the API.
If it returns true (crisis detected), skip the API call entirely and return the crisis response.
This is not optional and not a Phase 2 item.

**3. The crisis strip is always visible.**
`<CrisisStrip />` renders above the navbar on every page.
It has a z-index higher than everything else.
It never disappears on scroll.
It never gets hidden on mobile.

**4. Anonymous identity is privacy-first.**
UUID is generated client-side, stored in localStorage.
It is never sent to any analytics service.
It is only used as a Supabase row key.
There is a "Delete all my data" option in dashboard settings that deletes the Supabase rows
and clears localStorage.

**5. The dashboard must have real data to look impressive.**
Seed 30 days of fake mood entries and 3 fake journal entries that appear on first visit
(marked as examples, deletable). This is the difference between a demo that impresses
and one that shows an empty shell. After the user has 7 real days of data, remove the
seeded entries automatically.

**6. Nova's name and visual appear consistently.**
The ghost character (Boo) is fully retired. Search and replace all instances.
Nova is always referred to as "Nova" — never "the AI," never "the chatbot."
Nova's disclaimer ("not a therapist") appears every time Nova is introduced.

---

## The One Thing That Makes This Different

Every design decision in this document has a reason.
When a reviewer or interviewer asks "why did you do X," there is an answer.

- Why Fraunces? Because no other mental health app uses it, and it signals editorial
  warmth without being precious or clinical.
- Why no face on Nova? Because a smiling face on a serious disclosure is a design failure.
- Why a mood calendar instead of a line graph? Because a calendar looks like a diary,
  not a metric. It's a record, not an evaluation.
- Why the crisis strip never hides? Because a user in acute distress cannot be expected
  to find a buried link.
- Why real photography instead of illustrations in the hero? Because a real human moment
  is more emotionally honest than any illustration.

This is a portfolio project that demonstrates product thinking, not just implementation.
Every diff in the git history should be explainable in one sentence.
```
