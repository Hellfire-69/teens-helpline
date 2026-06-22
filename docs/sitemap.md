# SITEMAP.md

# Teens Helpline Information Architecture

Version: 1.0
Status: Frozen v1
Last Updated: June 2026

---

# Architectural Principles

## Anonymous User Model

Teens Helpline operates without mandatory account creation.

Users may immediately access the platform through a local session.

No email registration, passwords, usernames, or traditional onboarding flows are required.

User data is stored locally first and may later be synchronized through optional recovery/export mechanisms defined in future documentation.

---

## Local-First Philosophy

The platform prioritizes:

- Privacy
- Simplicity
- Low friction
- Immediate access

Users should be able to begin using the platform within seconds.

---

# Public Website (Editorial Layer)

Purpose:

- Build trust
- Explain the platform
- Introduce Nova
- Surface resources
- Provide crisis information
- Guide users into the dashboard

---

## /

### Home

Primary CTA:

```txt
Enter Your Space
```

Features:

- Editorial Hero Section
- Nova Introduction
- Mood Reflection Introduction
- Product Philosophy
- Featured Library Articles
- Dashboard Preview
- Crisis Support Access
- Footer

---

## /about

### About Teens Helpline

Features:

- Mission
- Design Philosophy
- Privacy Principles
- What Teens Helpline Is
- What Teens Helpline Is Not
- Nova Overview

---

## /library

### Library Index

Features:

- Category Navigation
- Featured Articles
- Search
- Recommended Reading

Categories:

- Anxiety
- Exam Stress
- Loneliness
- Relationships
- Family Issues
- Self Confidence

---

## /library/[slug]

### Individual Article Page

Features:

- Article Content
- Related Articles
- Suggested Reflection Prompt
- Suggested Journal Entry
- Suggested Nova Conversation

---

## /crisis-support

### Crisis Support

Features:

- Emergency Resources
- Crisis Contacts
- Immediate Action Guidance
- Safety Information

Purpose:

Provide clear pathways to real-world support.

---

## /nova

### Nova Introduction

Features:

- What Nova Is
- How Nova Works
- Reflection Philosophy
- Privacy Information
- Enter Dashboard CTA

---

# Product Dashboard (Reflection Layer)

Purpose:

Support daily use, emotional reflection, journaling, and personal insight.

Route Prefix:

```txt
/dashboard
```

---

## /dashboard

### Dashboard Home

Features:

- Daily Check-In
- Mood Reflection Prompt
- Nova Insight
- Recent Journal Entries
- Weekly Reflection Summary
- Recommended Library Content
- Continue Writing CTA

Components:

- Mood Widget
- Nova Widget
- Journal Snapshot
- Insight Cards

---

## /dashboard/mood

### Mood Tracker

Features:

- Daily Mood Selection
- Mood Calendar
- Mood History
- Mood Timeline
- Mood Trends

Components:

- Mood Picker
- Calendar View
- Trend Visualization
- Reflection Notes

---

## /dashboard/journal

### Journal Workspace

Features:

- Create Entry
- Edit Entry
- Delete Entry
- Search Entries
- Filter By Mood
- Reflection Prompts

Components:

- Rich Text Editor
- Mood Attachment
- Entry Timeline
- Search Interface

---

## /dashboard/journal/[entry-id]

### Individual Journal Entry

Features:

- Full Entry View
- Edit Entry
- Delete Entry
- Related Mood Context
- Related Nova Reflection

---

## /dashboard/nova

### Nova Workspace

Features:

- Conversation Interface
- Reflection Sessions
- Guided Check-Ins
- Resource Recommendations
- Emotional Pattern Summaries

Components:

- Conversation Panel
- Reflection Cards
- Resource Suggestions
- Session History

---

## /dashboard/analytics

### Insights & Reflection Analytics

Purpose:

Support awareness, not performance.

Features:

- Mood Trends
- Mood Distribution
- Journal Frequency
- Weekly Reflection
- Monthly Reflection
- Emotional Pattern Discovery

Components:

- Trend Charts
- Reflection Summaries
- Pattern Cards
- Timeline Visualizations

Explicitly Excluded:

- Wellness Scores
- Rankings
- Competitive Metrics
- Productivity Tracking

---

## /dashboard/library

### Personalized Library

Features:

- Full Library Access
- Recommended Articles
- Saved Articles
- Continue Reading
- Topic Discovery

Components:

- Category Navigation
- Recommendation Cards
- Reading History

---

## /dashboard/settings

### Space Settings

Purpose:

Manage the user's local space.

Features:

- Theme Preferences
- Local Data Overview
- Data Export
- Recovery Keys
- Data Import
- Local Storage Controls
- Delete All Data
- Privacy Information

Components:

- Preferences Panel
- Export Tools
- Recovery Management
- Data Purge Controls

This route replaces all traditional profile/account functionality.

No separate Profile route exists.

---

# Global Components

Accessible Throughout The Platform

---

## Nova Quick Access

Available On:

- Dashboard Home
- Journal
- Mood Tracker
- Analytics
- Library

Purpose:

Provide immediate reflective support.

---

## Crisis Support Access

Available Globally

Features:

- Persistent Crisis Support Entry Point
- Immediate Help Resources

Must remain visible throughout the experience.

---

## Search

Available In:

- Library
- Dashboard Library
- Journal

---

# Navigation Structure

## Public Navigation

```txt
Home
Library
Nova
About
Crisis Support
Enter Your Space
```

---

## Dashboard Navigation

```txt
Home
Mood
Journal
Nova
Analytics
Library
Settings
```

---

# Future Expansion (Not Included In MVP)

Reserved For Future Versions

- Optional Cloud Sync
- Cross Device Sync
- Optional Account Recovery
- Advanced Analytics
- Enhanced Nova Memory
- Mobile Applications

These features are not part of Version 1.

---

# What We Are NOT Building

The following features are explicitly out of scope.

## Authentication

- Sign In
- Sign Up
- Password Login
- Traditional Accounts
- User Profiles

---

## Social Features

- Community Forums
- Social Feeds
- User Following
- User Messaging
- Public Profiles

---

## Volunteer Systems

- Volunteer Matching
- Peer Support Networks
- Mentor Programs

---

## Professional Services

- Therapist Marketplace
- Counselor Booking
- Appointment Scheduling

---

## Education Systems

- School Portal
- Parent Portal
- Teacher Dashboard

---

## Gamification

- Achievement Badges
- Experience Points
- Leaderboards
- Productivity Scores
- Streak Pressure Systems

---

## AI Features We Reject

- Mental Health Diagnosis
- Medical Recommendations
- Therapy Simulation
- Human Replacement Claims

Nova remains a reflective companion only.

---

# End of Document
