# DESIGN.md

# Teens Helpline Design System

Version: 1.0
Status: Frozen v1
Last Updated: June 2026

---

# 1. Design Vision

Teens Helpline is not a mental health application.

It is a private digital space where teenagers can reflect, track emotions, write freely, discover helpful resources, and have supportive conversations with Nova.

The platform should feel like a trusted personal space rather than a product trying to optimize or fix the user.

The goal is to create a calm environment that supports self-awareness, emotional reflection, and personal growth.

---

# 2. Design Goals

The platform must feel:

* Grounded
* Calm
* Warm
* Honest
* Personal
* Intelligent
* Safe
* Modern

The platform must never feel:

* Clinical
* Corporate
* Childish
* Overly cheerful
* Productivity obsessed
* Generic AI SaaS
* Social media inspired

---

# 3. Core Design Principle

The user's thoughts are the product.

Everything in the interface exists to support:

* Reflection
* Journaling
* Mood awareness
* Personal growth
* Resource discovery

The UI should never compete with the user's content.

Content comes first.

Interface comes second.

---

# 4. Design Approach

Teens Helpline follows a Hybrid Design Model.

## Public Website

Design Style:
Editorial

Purpose:
Create trust, explain the platform, and encourage exploration.

References:

* Bear
* Are.na
* Independent online magazines

Characteristics:

* Large typography
* Generous whitespace
* Storytelling layouts
* Minimal visual noise
* Emotionally driven content

---

## Dashboard

Design Style:
Product

Purpose:
Support daily use and personal reflection.

References:

* Apple Health
* Daylio
* Selected 21st.dev dashboard patterns

Characteristics:

* Structured navigation
* Clear hierarchy
* Calm analytics
* Journal-first experience
* Utility over decoration

---

# 5. Brand Personality

Primary Traits:

* Grounded
* Thoughtful
* Warm
* Honest
* Quietly Confident

---

# 6. Voice & Tone

Avoid:

"You can achieve anything."

"Become your best self."

"Improve your wellness score."

"Unlock your potential."

Use:

"Let's figure this out together."

"Here's how things have felt recently."

"Take a moment to reflect."

"You're not alone."

The platform should sound like a trusted mentor rather than a motivational speaker.

---

# 7. Color System

## Foundation

Background:
#F8F5F0

Surface:
#FFFFFF

---

## Primary

Deep Teal:
#1F5F5F

Usage:

* Primary CTA
* Navigation
* Active states
* Nova base color

---

## Secondary

Sage:
#7DAE8F

Usage:

* Positive indicators
* Mood states
* Supporting accents

---

## Accent

Warm Sand:
#C4956A

Usage:

* Highlights
* Subtle emphasis
* Interactive states

---

## Text

Primary:
#2C2C2C

Heading:
#1A1A1A

Muted:
#6A6A6A

---

# 8. Restricted Colors

The following colors are banned from defining the visual identity:

* Purple
* Violet
* Pink
* Neon gradients
* Bright saturated red

Reason:

Avoid generic AI startup aesthetics.

---

# 9. Mood System

Mood tracking is a reflection tool, not a diagnostic tool.

## Mood Color Mapping

| Mood        | Color   |
| ----------- | ------- |
| Calm        | #7DAE8F |
| Happy       | #C4956A |
| Neutral     | #B8B8B8 |
| Anxious     | #D9B44A |
| Sad         | #6B8CA3 |
| Overwhelmed | #8A7A9F |

## Rules

* Mood colors indicate emotional states only
* Never indicate severity
* No traffic-light systems
* No warning colors
* No alarming visual language

Visualizations should feel observational, not judgmental.

---

# 10. Typography

## Primary Pairing

Display / Headings:

Fraunces

Body / UI:

DM Sans

---

## Typography Philosophy

Typography is a major visual element.

Large headings should establish emotional tone.

Body text should maximize readability.

Hierarchy should be clear at every screen size.

---

# 11. Layout System

## Widths

Max Content Width:
1280px

Reading Width:
720px

---

## Grid

Desktop:
12 Columns

Mobile:
4 Columns

---

## Spacing

Desktop:
96px section spacing

Tablet:
64px section spacing

Mobile:
48px section spacing

Whitespace should be treated as a design element.

Do not fill space unnecessarily.

---

# 12. Component Design Rules

## Cards

* 20px border radius
* Minimal shadows
* Soft elevation
* Surface-first appearance

Avoid:

* Heavy borders
* Glassmorphism
* Neon effects

---

## Buttons

Primary:

* Deep Teal
* High contrast
* Strong clarity

Secondary:

* Surface based
* Minimal decoration

---

## Forms

* Single column preferred
* Large touch targets
* Clear labels
* Low cognitive load

---

## Charts

* Calm color palette
* No neon gradients
* Minimal animation
* Reflection-focused

Data should support understanding, not performance.

---

# 13. Motion System

Motion must communicate state.

Motion should never exist purely for decoration.

Approved:

* Page transitions
* Hover interactions
* Save confirmations
* Mood selection feedback
* Nova state changes

Avoid:

* Excessive parallax
* Infinite decorative loops
* Distracting animations

Must support:

prefers-reduced-motion

---

# 14. Dashboard Philosophy

The dashboard is not a productivity tracker.

The dashboard is a reflection space.

Prioritize:

1. Daily Check-In
2. Journal
3. Nova
4. Insights
5. Library

Avoid:

* Achievement systems
* Competitive metrics
* Productivity pressure
* Wellness scores everywhere

Users should feel supported, not evaluated.

---

# 15. Dashboard Structure

Primary Navigation:

* Home
* Journal
* Nova
* Analytics
* Library
* Profile

---

## Dashboard Home

Focus Areas:

* Daily Mood Check-In
* Recent Journal Activity
* Nova Reflection
* Resource Recommendations
* Weekly Insights

---

# 16. Library

The Library replaces the traditional blog.

Purpose:

Provide practical guidance and educational content.

Categories:

* Anxiety
* Exam Stress
* Loneliness
* Relationships
* Family Issues
* Self Confidence

Writing Style:

* Human
* Practical
* Actionable
* Non-clinical
* Concise

The Library should feel like advice from a trusted mentor.

---

# 17. Nova

Nova is the platform's digital companion.

Nova is not a chatbot mascot.

Nova is not a therapist.

Nova is an ambient presence.

---

## Visual Direction

Nova should appear as:

* Abstract light
* Fluid motion
* Soft glow
* Ambient energy

Nova should not have:

* Eyes
* Mouth
* Human face
* Cartoon appearance

---

## States

Idle

Listening

Thinking

Reflecting

Responding

Each state should have subtle visual differences.

---

# 18. Nova Interaction Principles

Nova Should:

* Ask reflective questions
* Encourage journaling
* Recommend resources
* Surface emotional patterns
* Support self-awareness

Nova Must Never:

* Diagnose conditions
* Give medical advice
* Claim professional authority
* Replace human support
* Encourage dependency

Role:

Companion, not counselor.

---

# 19. Accessibility

Minimum Standard:

WCAG AA

Requirements:

* Semantic HTML
* Proper heading hierarchy
* Keyboard navigation
* Visible focus states
* Accessible contrast ratios
* Reduced motion support

Accessibility is a product requirement.

Not a feature.

---

# 20. Design References

Homepage:

* Bear
* Are.na

Dashboard:

* Apple Health
* Daylio
* 21st.dev dashboard patterns

Typography:

* Fraunces
* DM Sans

Nova:

* Ambient light systems
* Organic motion
* Abstract visual forms

---

# 21. Frozen Design Decisions

Approved:

* Hybrid Design Model
* Editorial Homepage
* Product Dashboard
* Nova Companion
* Mood Tracking
* Journal First UX
* Calm Analytics
* Library System
* Anonymous User Model

Rejected:

* Purple-first branding
* Pink gradients
* Generic AI SaaS layouts
* Cartoon mascots
* Productivity-first UX
* Community features
* Volunteer networks
* Social feeds
* Heavy gamification

---

# End of Document
