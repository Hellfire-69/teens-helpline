# PRD-ADDENDUM.md

# Teens Helpline Product Requirements Addendum

Version: 1.0
Status: Frozen v1
Depends On:

* DESIGN.md
* SITEMAP.md
* DATABASE.md
* PRD.md

Purpose:

This document extends the Product Requirements Document with implementation-level requirements, behavioral specifications, user stories, validation rules, edge cases, non-functional requirements, and engineering constraints.

All decisions in PRD.md remain authoritative.

---

# 11. Functional Requirements

---

# 11.1 Mood Tracking

Route:

```txt
/dashboard/mood
```

## Create

The system MUST allow a user to create a mood entry.

Required:

* mood
* date

Optional:

* note

The system MUST support:

```txt
calm
happy
neutral
anxious
sad
overwhelmed
```

The system MUST reject unsupported mood values.

---

## Read

The system MUST display:

* Today's mood
* Historical moods
* Mood calendar
* Mood timeline

Entries MUST be ordered newest first.

---

## Update

Users MUST be able to modify:

* mood
* note

The original created_at value MUST remain unchanged.

---

## Delete

Users MUST be able to delete individual mood entries.

Deletion MUST NOT affect journal entries linked through mood_id.

Journal references MUST become nullable.

---

## Filtering

Users SHOULD be able to filter by:

* Date range
* Mood type

---

## Empty State

Display:

```txt
No mood entries yet.

Start by checking in today.
```

---

## Loading State

Display skeleton UI while data loads.

---

## Error State

Display:

```txt
Unable to save mood entry.

Please try again.
```

---

## Validation Rules

Mood:

* Required

Note:

* Optional
* Maximum 1000 characters

Date:

* Cannot be null

---

## Edge Cases

* Duplicate entries same day
* Missing UUID
* Deleted mood linked to journal
* Offline save failure

---

# 11.2 Journal Canvas

Route:

```txt
/dashboard/journal
```

## Create

Users MUST be able to create journal entries.

Required:

* title
* content

Optional:

* mood link
* tags

---

## Read

Users MUST be able to:

* Open entry
* View timeline
* Search entries

---

## Update

Users MUST be able to edit:

* title
* content
* mood
* tags

---

## Delete

Users MUST be able to delete entries.

Deletion MUST be permanent.

---

## Search

Search MUST support:

* Title
* Content

Search SHOULD be case-insensitive.

---

## Filtering

Filter by:

* Mood
* Date

---

## Empty State

```txt
No journal entries yet.

Start writing your first reflection.
```

---

## Loading State

Skeleton editor UI.

---

## Error State

```txt
Unable to save entry.

Your content remains locally available.
```

---

## Validation Rules

Title:

* Required
* Maximum 120 characters

Content:

* Required

Tags:

* Optional

---

## Edge Cases

* Empty content submission
* Network interruption
* Autosave conflict
* Corrupted markdown

---

# 11.3 Nova Companion

Route:

```txt
/dashboard/nova
```

## Create

Users MUST be able to start a conversation.

---

## Read

Users MUST be able to:

* View current session
* View historical sessions

---

## Update

Conversation history MUST update after every message.

---

## Delete

Users MAY delete entire conversations.

Messages MUST cascade delete.

---

## Search

Not required in MVP.

---

## Empty State

```txt
What's on your mind today?
```

---

## Loading State

Nova MUST visibly enter a thinking state.

---

## Error State

```txt
Nova is temporarily unavailable.

Please try again in a moment.
```

---

## Validation Rules

Message:

* Required
* Maximum 4000 characters

---

## Edge Cases

* Gemini timeout
* Empty response
* Rate limit exceeded
* Network interruption
* Malformed response

Nova MUST never:

* Diagnose
* Prescribe treatment
* Claim professional authority

---

# 12. Detailed User Stories

---

## First-Time Visitor

As a first-time visitor

I want to enter the platform immediately

So that I can start reflecting without creating an account.

### Acceptance Criteria

* UUID generated automatically
* User redirected to dashboard
* No registration screens displayed

---

## Returning User

As a returning user

I want my space restored automatically

So that I can continue where I left off.

### Acceptance Criteria

* Existing UUID detected
* Existing data loaded
* No onboarding shown

---

## Mood Tracking

As a user

I want to log how I feel

So that I can notice emotional patterns over time.

### Acceptance Criteria

* Mood saved successfully
* Timeline updates
* Analytics reflects entry

---

## Journaling

As a user

I want to write private reflections

So that I can process my thoughts.

### Acceptance Criteria

* Entry saved
* Entry editable
* Entry searchable

---

## Nova

As a user

I want to talk with Nova

So that I can explore my thoughts through reflection.

### Acceptance Criteria

* Conversation stored
* History accessible
* Nova remains non-diagnostic

---

# 13. Non-Functional Requirements

## Performance

Homepage:

* SHOULD load within 2 seconds on broadband

Dashboard:

* SHOULD load within 3 seconds

Search:

* SHOULD return results within 300ms

Analytics:

* SHOULD render within 1 second

---

## Accessibility

The platform MUST meet WCAG AA.

Requirements:

* Keyboard navigation
* Visible focus states
* Semantic headings
* Screen reader support
* Reduced motion support

---

## Reliability

Journal:

* SHOULD autosave every 30 seconds

Mood Entries:

* MUST retry failed saves

Nova:

* SHOULD gracefully recover from API failures

---

## Security

The system MUST use UUID ownership.

The system MUST NOT expose user data across UUID boundaries.

Supabase RLS policies MUST restrict access to the matching space_id only.

All user data MUST be removable through a single purge operation.
