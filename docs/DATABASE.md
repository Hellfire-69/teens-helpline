# DATABASE.md

# Teens Helpline Database Architecture

Version: 1.0
Status: Frozen v1
Last Updated: June 2026

---

# 1. Overview

## Database Engine

PostgreSQL (Supabase)

---

## Identity Model

Teens Helpline uses an Anonymous UUID model.

No authentication layer exists.

No email accounts exist.

No passwords exist.

No usernames exist.

On first visit:

1. Client generates a UUID.
2. UUID becomes the user's permanent `space_id`.
3. UUID is stored in localStorage.
4. UUID is inserted into the `users` table.
5. All subsequent data is associated with that UUID.

Example:

```txt
space_id:
550e8400-e29b-41d4-a716-446655440000
```

---

## Data Ownership

Every piece of user-generated data belongs to a single anonymous space.

All user relationships originate from:

```sql
users.id
```

All foreign keys referencing `users.id` MUST use:

```sql
ON DELETE CASCADE
```

This supports the Space Settings "Delete Everything" operation.

---

# 2. Content Architecture

## Library Content

Library content is NOT stored in PostgreSQL.

Library content is stored as MDX files inside the repository.

Example:

```txt
/content/library

anxiety.mdx
exam-stress.mdx
loneliness.mdx
relationships.mdx
family-issues.mdx
self-confidence.mdx
```

---

## Database Responsibility

The database only stores:

* User data
* Mood data
* Journal data
* Nova data
* Saved article references
* User settings

The database never stores article bodies.

---

# 3. Entity Relationship Overview

```txt
users
│
├── mood_entries
│
├── journal_entries
│
├── nova_conversations
│     └── nova_messages
│
├── saved_articles
│
└── user_settings
```

---

# 4. Users Table

## Purpose

Represents an anonymous personal space.

Each row corresponds to one generated UUID.

---

## Schema

| Column      | Type        | Notes                   |
| ----------- | ----------- | ----------------------- |
| id          | UUID        | Primary Key             |
| created_at  | TIMESTAMPTZ | Creation Timestamp      |
| last_active | TIMESTAMPTZ | Last Activity Timestamp |

---

## DDL

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_active TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

# 5. Mood Entries Table

## Purpose

Stores daily mood check-ins.

---

## Relationships

```txt
users (1)
│
└── mood_entries (many)
```

---

## Schema

| Column     | Type        | Notes               |
| ---------- | ----------- | ------------------- |
| id         | UUID        | Primary Key         |
| space_id   | UUID        | FK → users.id       |
| date       | DATE        | Mood Date           |
| mood       | TEXT        | Mood Token          |
| note       | TEXT        | Optional Reflection |
| created_at | TIMESTAMPTZ | Creation Timestamp  |

---

## Allowed Mood Values

```txt
calm
happy
neutral
anxious
sad
overwhelmed
```

---

## DDL

```sql
CREATE TABLE mood_entries (
    id UUID PRIMARY KEY,
    space_id UUID NOT NULL,
    date DATE NOT NULL,
    mood TEXT NOT NULL CHECK (
        mood IN (
            'calm',
            'happy',
            'neutral',
            'anxious',
            'sad',
            'overwhelmed'
        )
    ),
    note TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_mood_user
        FOREIGN KEY (space_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);
```

---

# 6. Journal Entries Table

## Purpose

Stores personal journal entries.

---

## Relationships

```txt
users (1)
│
└── journal_entries (many)

mood_entries (1)
│
└── journal_entries (many)
```

---

## Schema

| Column     | Type        | Notes              |
| ---------- | ----------- | ------------------ |
| id         | UUID        | Primary Key        |
| space_id   | UUID        | FK → users.id      |
| title      | TEXT        | Entry Title        |
| content    | TEXT        | Journal Content    |
| mood_id    | UUID        | Nullable FK        |
| tags       | JSONB       | Tags Array         |
| created_at | TIMESTAMPTZ | Creation Timestamp |

---

## DDL

```sql
CREATE TABLE journal_entries (
    id UUID PRIMARY KEY,
    space_id UUID NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    mood_id UUID,
    tags JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_journal_user
        FOREIGN KEY (space_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_journal_mood
        FOREIGN KEY (mood_id)
        REFERENCES mood_entries(id)
        ON DELETE SET NULL
);
```

---

# 7. Nova Conversations Table

## Purpose

Stores conversation sessions with Nova.

---

## Relationships

```txt
users (1)
│
└── nova_conversations (many)
```

---

## Schema

| Column     | Type        | Notes                 |
| ---------- | ----------- | --------------------- |
| id         | UUID        | Primary Key           |
| space_id   | UUID        | FK → users.id         |
| title      | TEXT        | Conversation Title    |
| created_at | TIMESTAMPTZ | Creation Timestamp    |
| updated_at | TIMESTAMPTZ | Last Update Timestamp |

---

## DDL

```sql
CREATE TABLE nova_conversations (
    id UUID PRIMARY KEY,
    space_id UUID NOT NULL,
    title TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_conversation_user
        FOREIGN KEY (space_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);
```

---

# 8. Nova Messages Table

## Purpose

Stores messages inside a Nova conversation.

---

## Relationships

```txt
nova_conversations (1)
│
└── nova_messages (many)
```

---

## Schema

| Column          | Type        | Notes        |
| --------------- | ----------- | ------------ |
| id              | UUID        | Primary Key  |
| conversation_id | UUID        | FK           |
| role            | TEXT        | user/model   |
| content         | TEXT        | Message Body |
| created_at      | TIMESTAMPTZ | Timestamp    |

---

## DDL

```sql
CREATE TABLE nova_messages (
    id UUID PRIMARY KEY,
    conversation_id UUID NOT NULL,
    role TEXT NOT NULL CHECK (
        role IN ('user', 'model')
    ),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_message_conversation
        FOREIGN KEY (conversation_id)
        REFERENCES nova_conversations(id)
        ON DELETE CASCADE
);
```

---

# 9. Saved Articles Table

## Purpose

Stores user bookmarks for MDX articles.

---

## Relationships

```txt
users (1)
│
└── saved_articles (many)
```

---

## Schema

| Column       | Type        | Notes          |
| ------------ | ----------- | -------------- |
| id           | UUID        | Primary Key    |
| space_id     | UUID        | FK → users.id  |
| article_slug | TEXT        | MDX Filename   |
| saved_at     | TIMESTAMPTZ | Save Timestamp |

---

## DDL

```sql
CREATE TABLE saved_articles (
    id UUID PRIMARY KEY,
    space_id UUID NOT NULL,
    article_slug TEXT NOT NULL,
    saved_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_saved_article_user
        FOREIGN KEY (space_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);
```

---

# 10. User Settings Table

## Purpose

Stores local space preferences.

One row per user.

---

## Relationships

```txt
users (1)
│
└── user_settings (1)
```

---

## Schema

| Column                | Type    | Notes                   |
| --------------------- | ------- | ----------------------- |
| space_id              | UUID    | PK + FK                 |
| theme                 | TEXT    | Theme Preference        |
| reduced_motion        | BOOLEAN | Accessibility           |
| notifications_enabled | BOOLEAN | Notification Preference |

---

## DDL

```sql
CREATE TABLE user_settings (
    space_id UUID PRIMARY KEY,

    theme TEXT NOT NULL DEFAULT 'system',

    reduced_motion BOOLEAN NOT NULL DEFAULT FALSE,

    notifications_enabled BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT fk_settings_user
        FOREIGN KEY (space_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);
```

---

# 11. Data Purging Policy

Space Settings includes a complete data deletion action.

Deleting a user row:

```sql
DELETE FROM users
WHERE id = :space_id;
```

Automatically removes:

* Mood Entries
* Journal Entries
* Nova Conversations
* Nova Messages
* Saved Articles
* User Settings

Through cascading foreign key relationships.

No orphaned records may remain.

---

# 12. Future Expansion (Out Of Scope)

Reserved For Future Versions

* Recovery Keys
* Cross Device Sync
* Cloud Backups
* Analytics Snapshots
* Optional Authentication
* Multi Device Sessions

These tables are intentionally excluded from Version 1.

---

# End of Document
