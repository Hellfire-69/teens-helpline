# TRD.md

# Teens Helpline Technical Requirements Document

Version: 1.0
Status: Frozen v1
Last Updated: June 2026

---

# 1. System Architecture

## Overview

Teens Helpline follows a modern JAMStack-inspired architecture built around:

* Next.js App Router
* Supabase PostgreSQL
* Gemini API
* MDX Content System
* Vercel Deployment

Architecture:

```txt
Browser
│
├── Next.js Frontend
│
├── Zustand State Layer
│
├── Supabase Client
│     ├── users
│     ├── mood_entries
│     ├── journal_entries
│     ├── nova_conversations
│     ├── nova_messages
│     ├── saved_articles
│     └── user_settings
│
├── MDX Content Layer
│
└── Nova API Route
      │
      └── Gemini API
```

---

# 2. Application Architecture

Application Type:

Hybrid Editorial + Product Experience

Layers:

```txt
Presentation Layer
│
├── Marketing Pages
├── Dashboard Pages
└── Shared Components

Business Logic Layer
│
├── Mood Services
├── Journal Services
├── Analytics Services
├── Nova Services
└── Settings Services

Data Layer
│
├── Supabase
└── MDX Content

External Services
│
└── Gemini API
```

---

# 3. Folder Structure

```txt
teens-helpline/

app/
├── (marketing)/
│   ├── page.tsx
│   ├── about/
│   ├── library/
│   ├── crisis-support/
│   └── nova/
│
├── dashboard/
│   ├── page.tsx
│   ├── mood/
│   ├── journal/
│   ├── analytics/
│   ├── nova/
│   ├── library/
│   └── settings/
│
├── api/
│   └── nova/
│
└── layout.tsx

components/
├── ui/
├── layout/
├── mood/
├── journal/
├── nova/
├── analytics/
└── library/

content/
└── library/

hooks/

lib/
├── supabase/
├── gemini/
├── analytics/
├── mdx/
└── utils/

stores/
├── mood-store.ts
├── journal-store.ts
├── nova-store.ts
└── settings-store.ts

types/

public/

docs/
```

---

# 4. Route Architecture

## Public Routes

```txt
/
/about
/library
/library/[slug]
/nova
/crisis-support
```

## Dashboard Routes

```txt
/dashboard
/dashboard/mood
/dashboard/journal
/dashboard/journal/[entry-id]
/dashboard/nova
/dashboard/analytics
/dashboard/library
/dashboard/settings
```

---

# 5. Component Architecture

## Shared Components

```txt
Navbar
Footer
PageContainer
SectionHeader
EmptyState
LoadingState
ErrorState
```

## Mood Components

```txt
MoodPicker
MoodCard
MoodCalendar
MoodTimeline
MoodChart
```

## Journal Components

```txt
JournalEditor
JournalCard
JournalSearch
JournalFilters
JournalTimeline
```

## Nova Components

```txt
NovaChat
NovaMessage
NovaInput
NovaStateIndicator
ConversationHistory
```

## Analytics Components

```txt
MoodTrendChart
MoodDistributionChart
JournalFrequencyChart
InsightCard
```

---

# 6. State Management Strategy

Library:

```txt
Zustand
```

Stores:

```txt
mood-store
journal-store
nova-store
settings-store
```

Responsibilities:

* UI state
* Cached user data
* Dashboard state
* Local synchronization

Server data remains in Supabase.

---

# 7. Database Integration Layer

Provider:

```txt
Supabase PostgreSQL
```

Tables:

```txt
users
mood_entries
journal_entries
nova_conversations
nova_messages
saved_articles
user_settings
```

Connection:

```txt
Browser
↓
Supabase Client SDK
↓
PostgreSQL
```

No custom backend required.

---

# 8. Identity System

Identity Model:

```txt
Anonymous UUID
```

Process:

1. Check localStorage.
2. If UUID exists:

   * Load user space.
3. If UUID missing:

   * Generate UUID.
   * Create users record.
   * Persist locally.

No authentication.

No passwords.

No email accounts.

---

# 9. Gemini Integration Layer

Purpose:

Power Nova.

Architecture:

```txt
User
↓
Nova UI
↓
/api/nova
↓
Gemini API
↓
Response Stream
```

Requirements:

* API key remains server-side.
* Streaming responses enabled.
* Conversation history persisted.
* Rate limiting implemented.

Fallback:

```txt
Nova is having trouble structuring this thought.
Let's explore it another way.
```

---

# 10. MDX Content Architecture

Location:

```txt
/content/library
```

Example:

```txt
anxiety.mdx
exam-stress.mdx
loneliness.mdx
relationships.mdx
```

Responsibilities:

* SEO
* Resource content
* Static generation

Database stores only:

```txt
saved_articles.article_slug
```

---

# 11. Analytics Engine Design

Analytics Source:

```txt
mood_entries
journal_entries
```

Metrics:

* Mood Trends
* Mood Distribution
* Journal Frequency
* Weekly Summary
* Monthly Summary

Rules:

* No wellness scores
* No rankings
* No comparisons
* No gamification

---

# 12. Error Handling Strategy

Every feature must implement:

```txt
Loading
Success
Empty
Error
```

Examples:

Mood Save Failure:

```txt
Unable to save mood entry.
Please try again.
```

Journal Failure:

```txt
Unable to save journal entry.
```

Nova Failure:

```txt
Nova is temporarily unavailable.
```

---

# 13. Security Architecture

Model:

```txt
Anonymous UUID
```

MVP Security:

* UUID ownership
* HTTPS only
* Environment variable protection
* Input validation
* Output sanitization

RLS:

```txt
Not Implemented In MVP
```

Reason:

Reduced complexity for internship scope.

---

# 14. Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_ANON_KEY=

GEMINI_API_KEY=
```

Never expose:

```txt
GEMINI_API_KEY
```

to the client.

---

# 15. API Specifications

## POST /api/nova

Purpose:

Send message to Gemini.

Request:

```json
{
  "conversationId": "uuid",
  "message": "user input"
}
```

Response:

```json
{
  "response": "nova reply"
}
```

---

# 16. Performance Requirements

Homepage:

```txt
< 2s
```

Dashboard:

```txt
< 3s
```

Analytics:

```txt
< 1s
```

Search:

```txt
< 300ms
```

Targets measured on standard broadband.

---

# 17. Deployment Architecture

Platform:

```txt
Vercel
```

Pipeline:

```txt
GitHub
↓
Vercel Build
↓
Production
```

Environment Variables:

Managed through Vercel.

---

# 18. Monitoring & Logging

Logging Requirements:

* Nova API failures
* Database errors
* Build failures
* Runtime exceptions

Tools:

```txt
Vercel Logs
Browser Console
Supabase Dashboard
```

Optional Future:

```txt
Sentry
```

---

# 19. Testing Strategy

## Manual Testing

Required:

* Mood flows
* Journal flows
* Nova flows
* Analytics
* Settings

## Automated Testing

Framework:

```txt
Playwright
```

Coverage:

* Routing
* Mood submission
* Journal creation
* Nova messaging

---

# 20. Coding Standards

Language:

```txt
TypeScript Strict Mode
```

Requirements:

* Reusable components
* No duplicated logic
* Feature-based organization
* Proper typing
* ESLint compliance

Naming:

```txt
PascalCase → Components
camelCase → Variables
kebab-case → Routes
```

---

# 21. Implementation Phases

## Phase 1

Project Cleanup

* Remove legacy landing page code
* Create new architecture

## Phase 2

Foundation

* Install dependencies
* Configure Supabase
* Configure MDX

## Phase 3

Dashboard Shell

* Navigation
* Layout
* Settings

## Phase 4

Mood System

* CRUD
* Charts
* Timeline

## Phase 5

Journal System

* Editor
* Search
* Filtering

## Phase 6

Nova

* Gemini integration
* Conversation history

## Phase 7

Analytics

* Trends
* Summaries

## Phase 8

Library

* MDX rendering
* Saved articles

## Phase 9

Testing

* QA
* Bug fixing
* Performance optimization

## Phase 10

Production Deployment

* Final review
* Vercel deployment
* Documentation update

---

# End of Document
