# Teens Helpline – Project Handoff

This document provides a comprehensive technical overview of the Teens Helpline application architecture, current state, and immediate next steps. It is intended to seamlessly transfer context into a fresh development environment.

## 1. Project Vision
A private, anonymous digital space designed to help teenagers reflect, build self-awareness, and process their emotions. The interface rejects typical "SaaS dashboard" and gamified app patterns. Instead, it prioritizes a **calm, editorial, and non-judgmental aesthetic** focused on white space, soft typography, and a "reflection-first" user experience.

## 2. Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (Strict mode enabled)
- **Styling:** Tailwind CSS (Custom semantic tokens), `clsx`, `tailwind-merge`
- **Database / Backend:** Supabase (`@supabase/supabase-js`)
- **State Management:** Zustand
- **AI Integration:** Google Gemini API (via `@google/genai` or standard SDK)
- **Content:** MDX (`@next/mdx`) for the editorial Library
- **Icons:** `lucide-react`
- **Animations:** Framer Motion (for specific page transitions and Nova interactions)

## 3. Folder Structure
```text
teens-helpline/
├── app/
│   ├── (marketing)/       # Public routes (Landing, About, Crisis)
│   ├── api/               # Server routes (Nova, Chat)
│   ├── dashboard/         # Private application shell
│   ├── fonts/             # Local fonts (Geist, etc.)
│   ├── globals.css        # Tailwind & CSS Variables
│   └── layout.tsx         # Root layout & Providers
├── components/
│   ├── layout/            # Shell structure (Sidebar, MobileNav, PageContainer)
│   ├── providers/         # Global context (IdentityProvider)
│   └── ui/                # Base primitives (Card, Input, Button, Typography)
├── content/               # MDX content files
├── docs/                  # Architecture & Requirements specifications
├── lib/                   # Utility layers
│   ├── gemini/            # AI Prompts & SDK mapping
│   ├── identity/          # UUID generation & localStorage management
│   └── supabase/          # Supabase client instantiation
├── services/              # API interaction layers (No React/Hooks here)
├── stores/                # Zustand global state (Calls services)
└── types/                 # Global TypeScript definitions (database.types.ts)
```

## 4. Completed Phases
- **Phase 1: Foundation Setup:** Repository cleanup, strict routing architecture (marketing vs. dashboard separation), identity generation logic, and dependency installation.
- **Phase 2: Design System:** Implemented custom color variables (e.g., `--background`, `--primary`, `--mood-*`), typography hierarchies (`H1`-`H3`, `P`), and core structural UI primitives.
- **Phase 3: Dashboard Shell:** Completed the responsive layout system. Built the `DashboardHome` (reflection-first, unboxed UX), Desktop Sidebar, Mobile Bottom Dock, and the `Settings` page. Strict separation of layout and feature logic maintained.

## 5. Database Schema
Defined strictly in `types/database.types.ts`:
- `users`: `{ id, created_at, last_active }`
- `mood_entries`: `{ id, space_id, date, mood, note, created_at }`
- `journal_entries`: `{ id, space_id, title, content, created_at, updated_at }`
- `nova_conversations`: `{ id, space_id, created_at, updated_at }`
- `nova_messages`: `{ id, conversation_id, role, content, created_at }`
- `saved_articles`: `{ id, space_id, slug, saved_at }`
- `user_settings`: `{ space_id, theme, reduced_motion, notifications_enabled, updated_at }`

## 6. Current Routes
**Marketing Group (`/(marketing)`)**
- `/` - Landing Page placeholder
- `/about`, `/crisis-support`, `/nova` - Marketing stubs
- `/library`, `/library/[slug]` - MDX Editorial

**Dashboard Group (`/dashboard`)**
- `/dashboard` - Home Check-in (Reflection UI, Recent Journals, Nova prompt)
- `/dashboard/mood` - Mood Tracking (Pending)
- `/dashboard/journal`, `/dashboard/journal/[entry-id]` - Journaling (Pending)
- `/dashboard/nova` - AI Companion (Pending)
- `/dashboard/analytics` - Insights (Pending)
- `/dashboard/library` - Dashboard Library view
- `/dashboard/settings` - Space Preferences, Danger Zone

**API Routes**
- `/api/nova` - Gemini backend stub
- `/api/chat` - Chat handler stub

## 7. Design System
- **Typography:** Primary headers utilize a serif feel (`Fraunces` or custom heading font), body utilizes a clean sans-serif (`DM Sans`).
- **Colors:**
  - `Background`: `#F8F5F0` (Warm Sand)
  - `Surface`: `#FFFFFF`
  - `Primary`: `#1F5F5F` (Deep Teal)
  - `Mood Tokens`: Specific muted colors mapped to emotions (Calm, Happy, Neutral, Anxious, Sad, Overwhelmed).
- **Styling Rule:** Banned heavy shadows, harsh borders, and traditional SaaS card grids in favor of ambient white space and soft typography.

## 8. UUID Identity Architecture
**Anonymous Privacy Model:**
1. User lands on the app. `IdentityProvider` checks `localStorage` for `TEENS_HELPLINE_SPACE_ID`.
2. If none exists, `uuid-manager.ts` generates a V4 UUID.
3. `identity-service.ts` registers this UUID as the `id` in the Supabase `users` table.
4. All subsequent data entries (mood, journal, settings) use this UUID as `space_id` for row-level mapping.
*Result: Zero email/password authentication required.*

## 9. Service Architecture
**Strict 3-Tier Separation:**
1. **UI Components (`app/`, `components/`)**: Consume data and trigger actions solely via Zustand stores. No direct Supabase calls allowed in UI.
2. **Stores (`stores/`)**: Zustand manages localized caching, loading states, and error handling. Dispatches requests to Services.
3. **Services (`services/`)**: Pure async TypeScript classes/objects that execute standard Supabase RPCs, Inserts, and Selects.

## 10. Current Technical Debt
**Zero Technical Debt.**
- `database.types.ts` has been fully validated and successfully maps to Supabase `createClient`.
- Zero instances of `as any` or `@ts-ignore` in the Supabase service layer.
- Build pre-rendering passes `17/17` routes successfully.
- Linting passes with 0 warnings.
*(Note: Export, Import, and Recovery Keys are intentionally built as disabled `[Coming Soon]` placeholders as they fall outside the MVP scope).*

## 11. Remaining Phases
- **Phase 4: Mood Module** (Logging, Taxonomy, History)
- **Phase 5: Journal Module** (Rich writing experience, autosave)
- **Phase 6: Nova MVP** (Gemini-powered ambient chat)
- **Phase 7: Analytics & Library Content**
- **Phase 8: Vercel Deployment & Polish**

## 12. Immediate Next Task
**Mood Tracking Design & Data Specification.**
Before writing code for Phase 4, generate a detailed Mood Tracking implementation plan defining the mood taxonomy, schema validation, entry UX, history views, and analytics compatibility. Wait for approval on the specification before implementing the `mood-service` and `app/dashboard/mood` UI.
