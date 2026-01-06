Below is a **complete, ready-to-drop `/docs` folder** for **Hours**, written **specifically for Cursor / AI-first development**.
You can paste these files directly into your repo.

I have optimized them for:

* Maximum context
* Minimal ambiguity
* Strong constraints (so Cursor doesn’t hallucinate features)
* Long-term maintainability

---

# `/docs/product-philosophy.md`

## Product Philosophy & Non-Negotiables

### Core Belief

> People don’t need more motivation.
> They need **clarity about their time**.

Hours exists to **reveal reality**, not to push productivity.

---

### Non-Negotiables

* Truth > motivation
* Privacy > analytics
* Reflection > pressure
* Accuracy > inflated metrics
* Calm UX > gamification

---

### What Hours Must NEVER Do

* Compare users with other users
* Rank people
* Shame users for low productivity
* Track background data without consent
* Inflate hours (no duplicated time)

---

### UX Tone

* Calm
* Neutral
* Honest
* Non-judgmental
* Slightly introspective

---

### Design Bias

* Fewer numbers, more meaning
* Large whitespace
* Slow, reflective interactions
* No urgency language

---

# `/docs/prd.md`

(Use the PRD you already created earlier — this doc assumes it exists and acts as the **what**.)

---

# `/docs/user-stories.md`

## User Mental Models & Stories

### Core Mental Model

> “I don’t know where my time goes, but I feel busy.”

---

### Primary User Stories

* As a user, I want to set **intentions**, not promises.
* As a user, I want interruptions to be tracked, not ignored.
* As a user, I want idle time to be visible.
* As a user, I want to reflect without guilt.
* As a user, I want analytics I can trust.
* As a user, I want to optionally share my progress.

---

### Edge Case Stories

* I forget to start a timer.
* I pause work and don’t resume.
* I do two things at once.
* I rename tasks inconsistently.
* I stop caring for a few days.

Hours must still work.

---

# `/docs/information-architecture.md`

## App Structure

### Top-Level Sections

1. Today
2. Tasks
3. Analytics
4. Reflection
5. Recap
6. Settings

---

### Navigation Rules

* Today is default
* Analytics are read-only
* Reflection is time-based, not navigational
* Recap is seasonal, not constant

---

### What Goes Where

* Timers → Today
* Intent → Tasks
* Numbers → Analytics
* Thoughts → Reflection

Never mix them.

---

# `/docs/screens.md`

## Screen-by-Screen UX Spec

### 1. Onboarding

* Explain philosophy
* Set first task
* Set first intent
* No sign-up required

---

### 2. Today Screen

* Active timer (if any)
* Quick task switch
* Pause button
* Unclassified time indicator

---

### 3. Task Screen

* Task list
* Intent settings
* Pomodoro toggle
* Deduplication suggestions

---

### 4. Analytics Screen

* Daily / Weekly / Monthly tabs
* Intent vs Actual
* Focus patterns
* Share button (optional)

---

### 5. Reflection Screen

* Timeline of day
* Unclassified blocks
* Reflection note input
* Skip allowed

---

### 6. Recap Screen

* Yearly story cards
* Share / Save / Private toggle

---

# `/docs/user-flows.md`

## Core Flows

### Daily Flow

Start day → Start task → Interrupt → Switch/Pause → Idle → Reflect

---

### Timer Flow

Start → Pause → Resume → Stop → Log

---

### Reflection Flow

End of day → Review → Classify → Note → Close

---

### Recap Flow

Year end → Generate → View → Share or Save

---

# `/docs/data-model.md`

## Core Entities

### Task

* id
* name
* intent_hours
* schedule
* pomodoro_settings
* merged_from[]

---

### TimeLog

* id
* task_id (nullable)
* start_time
* end_time
* is_parallel
* accuracy_weight

---

### Reflection

* date
* note
* linked_tasks[]

---

### Recap

* year
* aggregates
* highlights

---

### Rules

* Time cannot be duplicated
* Parallel time is split
* Unclassified time exists by default

---

# `/docs/analytics-spec.md`

## Analytics Definitions

### Intent Accuracy

```
(actual_hours / intent_hours) * 100
```

---

### Focus Score

* Long uninterrupted sessions
* Penalized by frequent switches

---

### Unclassified Ratio

```
unclassified_time / total_time
```

---

### Parallel Work Penalty

* Accuracy reduced
* Shown explicitly

---

# `/docs/privacy-contract.md`

## Privacy & Trust Contract

### Default

* No background tracking
* No app usage tracking
* No battery data
* No location data

---

### Optional (Explicit Opt-In)

* App usage correlation
* Enhanced focus analytics

---

### Guarantees

* Data export anytime
* Analytics explain data usage
* Opt-out resets enhanced analytics

---

# `/docs/copy-guide.md`

## Language Rules

### Allowed

* “You spent”
* “You planned”
* “You chose”

---

### Avoid

* “You failed”
* “You wasted”
* “You should”

---

### Reflection Prompts

* “What worked today?”
* “What distracted you?”
* “What would you change?”

---

# `/docs/non-goals.md`

## Anti-Features

* No leaderboards
* No streak pressure
* No social comparison
* No aggressive notifications
* No AI motivation quotes

---

# `/docs/tech-constraints.md`

## Technical Constraints

* Offline-first
* Battery efficient
* Local database (SQLite)
* One active foreground process
* Predictable background jobs only

---

# `/docs/build-plan.md`

## Phases

### Phase 1 (MVP)

* Single timer
* Unclassified time
* Reflection
* Basic analytics

---

### Phase 2

* Pomodoro
* Shareable analytics
* Deduplication

---

### Phase 3

* Yearly recap
* Enhanced analytics (opt-in)

---

# `/docs/definition-of-done.md`

## Feature Completion Checklist

A feature is done when:

* All edge cases handled
* Data is never lost
* Copy matches tone guide
* Privacy rules respected
* Analytics are explainable

---

## FINAL IMPORTANT NOTE (For Cursor)

Use this sentence in Cursor:

> “Treat all documents in `/docs` as **hard constraints**.
> Do not add features, tracking, or UX patterns that violate them.”

---

If you want next:

* **Master Cursor Prompt**
* **Exact database schema**
* **UI wireframes**
* **Landing page copy**
* **Monetization design (ethical)**

Say the next step.
