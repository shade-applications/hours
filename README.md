# Hours
**Truth before motivation. Trust before data.**

> "You don't need more discipline. You need to see where your time actually goes."

## Overview
**Hours** is a personal time intelligence system designed to reveal reality rather than push artificial productivity. It is an analytics-first, privacy-focused application that helps users track their time with honesty and reflection.

## Product Philosophy
*   **Truth > Motivation**: We show the user their actual habits, not an idealized version.
*   **Privacy > Analytics**: Data stays on the device. No background spying.
*   **Reflection > Pressure**: End-of-day reflections are more important than streaks.

## Core Features
- **Privacy-First**: All analytics are private by default.
- **Unclassified Time**: Time not tracked is logged as "Unclassified", encouraging ownership of gaps.
- **Reality-Based Tracking**: Supports parallel tasks (with accuracy adjustments) because life is messy.
- **Yearly Recap**: A "Spotify Wrapped" for your life and effort.

## Development Phases

### Phase 1: MVP (The Foundation)
**Goal**: A functional tool that tracks time, handles unclassified gaps, and allows for daily reflection.
-   **Today Screen**: Active timer, task switching, interrupt handling.
-   **Task Management**: Intent setting ("I plan to spend 2h"), manual timer.
-   **Unclassified Time Logic**: Automatic logging of time between tasks.
-   **Reflection**: End-of-day prompts ("What went well?", "What distracted you?").
-   **Basic Analytics**: Daily view and Intent vs. Actual comparison.

### Phase 2: Enhancement (Flow & Polish)
**Goal**: Add structure and features that refine the tracking experience without adding pressure.
-   **Pomodoro Layer**: Optional interval timers integrated into tasks.
-   **Shareable Analytics**: Generate privacy-safe, vanity-free stats cards.
-   **Task Deduplication**: Smart suggestions to merge "DSA" and "dsa practice".
-   **Parallel Timers**: Handling multi-tasking with explicit accuracy caveats.

### Phase 3: Insight (The Long View)
**Goal**: Turn data into memory and deep understanding.
-   **Yearly Recap**: Story-based visualization of the user's year.
-   **Enhanced Analytics**: Focus scores, distraction patterns (Opt-in).
-   **Data Export**: Full control over user data.

## Tech Stack Constraints
-   **Offline-First**: Must work without internet.
-   **Local Database**: SQLite or robust local storage (IndexedDB).
-   **Performance**: Battery efficient, minimal background processing.

## Documentation
-   [Product Requirement Doc](prd.md)
-   [Full Documentation Bundle](all-docs.md)
