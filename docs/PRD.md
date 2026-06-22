# PRD.md

# Teens Helpline Product Requirements Document

Version: 1.0
Status: Frozen v1
Last Updated: June 2026

---

# 1. Executive Summary

Teens Helpline is an editorial-product hybrid web application designed to provide teenagers with a private, calm, and reflective digital space.

The platform combines:

* Emotional reflection
* Mood tracking
* Journaling
* Educational resources
* Ambient AI guidance through Nova

Unlike traditional mental health platforms, Teens Helpline does not attempt to diagnose, treat, evaluate, or optimize users.

The platform exists to help teenagers better understand themselves through writing, reflection, and self-awareness.

The experience is intentionally private, non-judgmental, and free from social pressure.

---

# 2. Problem Statement

Teenagers regularly face:

* Academic pressure
* Examination stress
* Family conflict
* Social isolation
* Relationship challenges
* Identity exploration

Many existing solutions fall into one of two categories:

## Clinical Platforms

Characteristics:

* Medical terminology
* Diagnostic framing
* Treatment-oriented experiences
* High psychological barrier to entry

Result:

Many teenagers avoid engagement because the experience feels formal, intimidating, or disconnected from daily life.

---

## Corporate AI Chatbots

Characteristics:

* Productivity-focused
* Generic responses
* Excessive gamification
* Engagement optimization loops

Result:

Users may interact briefly but rarely develop meaningful reflective habits.

---

## Opportunity

Teenagers need a private digital environment that:

* Feels safe
* Feels personal
* Encourages writing
* Encourages reflection
* Avoids judgment
* Avoids performance metrics

The gap is not another chatbot.

The gap is a thoughtful personal space.

---

# 3. Product Vision

Teens Helpline aims to become a grounding digital space for teenagers.

The platform prioritizes:

* Writing
* Emotional awareness
* Reflection
* Guided exploration
* Calm interaction

The platform should feel like:

> A private room for your thoughts.

The product should never feel like:

* Social media
* A productivity tool
* A therapy replacement
* A corporate AI assistant

Nova exists as an ambient companion that supports awareness rather than directing behavior.

---

# 4. Target Users

## Primary Audience

Age Range:

13–19

---

## User Profile A

### The Academic Overthinker

Characteristics:

* High examination pressure
* Fear of failure
* Academic burnout
* Difficulty processing stress

Needs:

* Reflection
* Emotional awareness
* Perspective building

---

## User Profile B

### The Quiet Isolator

Characteristics:

* Loneliness
* Social uncertainty
* Difficulty expressing emotions

Needs:

* Safe expression
* Journaling support
* Non-judgmental reflection

---

## User Profile C

### The Family Navigator

Characteristics:

* Family conflict
* Household stress
* Communication difficulties

Needs:

* Emotional processing
* Personal space
* Resource guidance

---

## User Profile D

### The Relationship Explorer

Characteristics:

* Friendship challenges
* Romantic uncertainty
* Social anxiety

Needs:

* Reflection
* Perspective
* Healthy coping resources

---

# 5. MVP Scope

## In Scope

### Public Website

* Home
* About
* Library
* Library Articles
* Nova Introduction
* Crisis Support

---

### Dashboard

* Dashboard Home
* Mood Tracking
* Journal
* Nova
* Analytics
* Library
* Space Settings

---

### Core Features

* Anonymous UUID Identity
* Mood Tracking
* Journal System
* Nova Companion
* MDX Resource Library
* Reflection Analytics
* Local Data Controls
* Complete Data Purging

---

## Out Of Scope

### Authentication

* Sign In
* Sign Up
* Password Login
* User Profiles

---

### Community

* Forums
* User Messaging
* Public Profiles
* Social Feed

---

### Professional Services

* Therapist Marketplace
* Counselor Matching
* Appointment Scheduling

---

### Volunteer Systems

* Volunteer Network
* Peer Mentoring
* Human Escalation Workflows

---

### Gamification

* Badges
* XP
* Leaderboards
* Wellness Scores
* Achievement Systems

---

### Education Systems

* School Portal
* Parent Portal
* Teacher Dashboard

---

# 6. Feature Specifications

---

# 6.1 Mood Tracking

## Purpose

Enable users to develop awareness of emotional patterns without judgment.

Mood tracking serves observation rather than evaluation.

---

## User Flow

```text
/dashboard
    ↓
Mood Widget
    ↓
/dashboard/mood
    ↓
Select Mood
    ↓
Optional Note
    ↓
Save Entry
    ↓
Timeline Updated
```

---

## Acceptance Criteria

* User can create one or more mood entries.
* Mood options must match DESIGN.md mood system.
* Mood entry can contain optional reflection note.
* Mood history must display chronologically.
* Empty state must display when no entries exist.
* Loading state must display during persistence.
* Data stored using anonymous UUID.
* Mood deletion must remove only selected record.
* User deletion must cascade delete all mood entries.

---

# 6.2 Journal Canvas

## Purpose

Provide a distraction-free writing environment.

The journal is the primary reflection tool.

---

## User Flow

```text
/dashboard/journal
    ↓
Create Entry
    ↓
Write Content
    ↓
Optional Mood Link
    ↓
Save
    ↓
Entry Appears In Timeline
```

---

## Acceptance Criteria

* User can create journal entries.
* User can edit entries.
* User can delete entries.
* Entries must support markdown rendering.
* Journal search must function across titles and content.
* Empty state required.
* Loading state required.
* Mood linkage is optional.
* Tags stored via JSONB.
* User deletion cascades all journal content.

---

# 6.3 Nova Companion

## Purpose

Support self-awareness through reflective dialogue.

Nova is not a therapist.

Nova is not a diagnostic system.

---

## User Flow

```text
/dashboard/nova
    ↓
Start Session
    ↓
User Message
    ↓
Gemini Response
    ↓
Reflection Continues
    ↓
Conversation Saved
```

---

## Acceptance Criteria

* Nova must maintain conversation history.
* Gemini API powers all responses.
* Session history accessible by user.
* Loading state required.
* Error state required.
* Empty conversation state required.
* Nova must never claim professional authority.
* Nova must never generate diagnoses.
* User deletion cascades all conversations and messages.

---

# 6.4 Analytics & Insights

## Purpose

Help users notice patterns.

Analytics should support awareness, not performance.

---

## User Flow

```text
/dashboard/analytics
    ↓
View Trends
    ↓
Review Patterns
    ↓
Return To Reflection
```

---

## Acceptance Criteria

* Mood trend visualization available.
* Mood distribution available.
* Journal frequency available.
* Weekly summary available.
* Monthly summary available.
* Empty state required.
* No wellness scores allowed.
* No ranking systems allowed.
* No competitive metrics allowed.

---

# 6.5 Library

## Purpose

Provide practical educational content.

---

## User Flow

```text
/library
    ↓
Open Article
    ↓
Read Content
    ↓
Save Article
    ↓
Article Appears In Dashboard Library
```

---

## Acceptance Criteria

* Content sourced from MDX files.
* Articles rendered statically.
* Search functionality available.
* Saved article support available.
* Related article suggestions available.
* Missing article route must return 404.

---

# 6.6 Space Settings

## Purpose

Allow users to manage their personal space.

---

## User Flow

```text
/dashboard/settings
    ↓
View Preferences
    ↓
Update Settings
    ↓
Export Data
    ↓
Delete Space
```

---

## Acceptance Criteria

* Theme preference configurable.
* Reduced motion configurable.
* Notification preference configurable.
* Data export functionality available.
* Delete Space action available.
* Delete Space must remove all user records.
* Purge operation relies on ON DELETE CASCADE.
* Confirmation step required before deletion.

---

# 7. Platform Initialization Requirements

## Landing Page Initialization

When a visitor enters the platform:

1. Check localStorage for space_id.
2. If found:

   * Load existing user space.
3. If missing:

   * Generate UUID.
   * Create users record.
   * Store UUID locally.

---

## Acceptance Criteria

* UUID generated only once.
* Duplicate users prevented.
* Existing users automatically restored.
* Initialization failure handled gracefully.

---

# 8. Success Metrics

This project is evaluated as an internship product.

Metrics focus on product engagement rather than revenue.

---

## Reflection Metrics

* Total Mood Entries Created
* Total Journal Entries Created
* Total Nova Sessions Started
* Total Articles Saved
* Total Articles Read

---

## Retention Metrics

* Weekly Active Spaces
* Returning Spaces
* Average Journal Frequency
* Average Mood Logging Frequency

---

## Product Metrics

* Dashboard Visits
* Nova Usage Rate
* Library Usage Rate
* Settings Usage Rate

---

# 9. Technical Constraints

## Frontend

Framework:

Next.js

Responsibilities:

* Routing
* UI Rendering
* MDX Rendering
* Client State

---

## Database

Platform:

Supabase PostgreSQL

Responsibilities:

* Data Persistence
* Analytics Queries
* User Data Storage

---

## Identity

Model:

Anonymous UUID

Characteristics:

* No Auth
* No Accounts
* No Passwords

---

## AI Engine

Provider:

Google Gemini

Source:

Google AI Studio

Responsibilities:

* Nova Conversations
* Reflection Support
* Resource Suggestions

---

## Hosting

Platform:

Vercel

Responsibilities:

* Deployment
* Hosting
* CDN Distribution

---

# 10. Future Scope

Reserved For Future Versions

---

## Version 2

* Recovery Keys
* Cross Device Sync
* Local Backups
* Advanced Reflection Insights

---

## Version 3

* End-to-End Data Encryption
* Optional Cloud Backups
* Enhanced Nova Memory
* Personalized Resource Recommendations

---

## Explicitly Excluded From Current Version

* Community Systems
* Volunteer Networks
* Therapist Marketplace
* School Portal
* Parent Portal
* Social Features
* Gamification Systems
* Traditional Authentication

---

# End of Document
