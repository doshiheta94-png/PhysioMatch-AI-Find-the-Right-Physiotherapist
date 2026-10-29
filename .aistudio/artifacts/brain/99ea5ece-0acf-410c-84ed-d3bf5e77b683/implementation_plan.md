# PhysioMatch AI — Evidence-Informed Physiotherapist Matching Platform

PhysioMatch AI connects patients experiencing musculoskeletal, neurological, and post-surgical pain with physiotherapists whose specific clinical credentials, techniques, and verified experience directly align with their condition. Unlike generic directory listings, it combines an interactive anatomical body map with a transparent matching algorithm, side-by-side credential matrix, and automated pre-visit clinical intake note generation.

### User Review & Critical Decisions

> [!IMPORTANT]
> The following product specifications incorporate your confirmed choices:
> - **Condition Intake**: An interactive anatomical body map selector paired with a clinical symptom and acuity checklist (acute vs. chronic, radiating nerve pain, post-surgical, joint mobility limits).
> - **Comparison & Transparency**: A dedicated side-by-side comparison matrix comparing up to 3 physiotherapists across verified regulatory credentials, specialized certifications (e.g., McKenzie MDT, OMPT, Dry Needling, Vestibular), clinical modalities, recovery metrics, and pricing.
> - **Action Flow**: Direct consultation appointment booking accompanied by an AI-generated pre-visit clinical intake note that synthesizes patient symptoms into an evidence-based clinical briefing for the practitioner.

---

### 1. Overview & Core Concept

- **What It Does**: PhysioMatch AI replaces trial-and-error directory searches with a clinical matching workflow. Patients select their pain zones on an interactive anatomical body map, specify symptom traits, timeline, and location. The system calculates an evidence-informed match score based on clinical specialization, verified postgraduate credentials, and relevant modality outcomes, allowing users to compare practitioners side by side and generate a structured intake note before booking.
- **Target Audience & Personas**:
  - *Patients in Pain*: Individuals dealing with acute sports injuries, chronic spinal/joint conditions, post-operative rehabilitation, or pelvic/vestibular symptoms seeking vetted experts rather than generalists.
  - *Referral Seekers*: Users seeking clear evidence of practitioner credentials (e.g., Board Certified Orthopedic Specialist, PhD/DPT, Pelvic Health Certified).
- **Key Value Proposition**: Transparent, evidence-informed matching that demystifies physiotherapy qualifications and saves patients from ineffective treatment cycles.

---

### 2. User Experience & Visual Design

#### Key User Flows
1. **Interactive Anatomical Triage**:
   - Patient views a modern interactive human body map (anterior and posterior views).
   - Clicking an anatomical zone (e.g., Cervical Spine, Lumbar Spine, Shoulder/Rotator Cuff, Knee, Hip/Groin, Ankle/Foot, Thoracic/Ribs, Wrist/Hand) focuses the clinical symptom checklist.
   - User specifies pain intensity (1–10 scale), symptom nature (radiating, sharp, stiffness, numbness/tingling), duration (<2 weeks, 2–12 weeks, >3 months), and treatment goals.
2. **Transparent Match Results & Evidence Scoring**:
   - Matching engine filters and ranks verified physiotherapists in the selected area.
   - Each card displays a clear **Match Score** (e.g., `98% Clinical Fit`) with an unboxed evidence rationale (e.g., *"Specializes in Lumbar Radiculopathy · McKenzie Method Certified · 14 yrs experience"*).
   - Quick filters for Telehealth vs. In-Clinic, Distance radius, Direct Insurance Billing, and Immediate Availability.
3. **Side-by-Side Comparison Matrix**:
   - User adds 2 or 3 shortlisted therapists to a floating comparison tray.
   - Dedicated comparison modal/view contrasts them across: Primary Specialization, Verified Licenses & Board Certifications, Clinical Techniques (Maitland, Dry Needling, Neuro-Rehab, Vestibular, Graston), Average Session Duration, Initial Assessment Fee, Patient Recovery Milestones, and Clinic Facilities.
4. **Consultation Booking & AI Pre-Visit Intake Note**:
   - User selects an available consultation slot (date & time).
   - The platform prompts the patient to review or generate an AI Pre-Visit Clinical Briefing.
   - Using Gemini (`gemini-3.8-flash` via secure server-side proxy `/api/intake-summary`), the system drafts a SOAP-aligned intake summary (Chief Complaint, History of Present Condition, Aggravating/Relieving Factors, Functional Goals) that patients can export, copy, or submit directly with their booking confirmation.

#### Visual Identity & Theme
- **Aesthetic Direction**: Clinical clarity, calm trust, and editorial precision. Clean healthcare aesthetic without clinical coldness or artificial gradients.
- **Color Palette**:
  - *Dominant Canvas (60%)*: Crisp clinic white (`#FFFFFF`) with soft neutral slate surfaces (`#F8FAFC`).
  - *Structural Surfaces (30%)*: Crisp hairline borders (`#E2E8F0`), deep slate typography (`#0F172A`), and secondary slate (`#475569`).
  - *High-Intent Accent (10%)*: Medical teal / clinical emerald (`#0D9488` / `#0F766E`) for match badges and primary action triggers, paired with cobalt navy (`#1E293B`) for display structure.
- **Typography & Scale**:
  - *Display / Headings*: Plus Jakarta Sans (`font-semibold` / `font-bold`, tight tracking).
  - *Body Prose*: DM Sans (`leading-relaxed`, high legibility for clinical explanations).
  - *Clinical Metrics & Scores*: Tabular figures (`tabular-nums font-mono`) for match percentages, distances, and prices.
- **Zero-Pill Discipline**: All practitioner metadata (years in practice, distance, registration number, degrees) rendered as clean unboxed text separated by subtle typographical dividers (`·`). No pill badge clutter.

#### Interactive Feedback & Motion
- Smooth transition between anterior/posterior anatomical views.
- Instant reactive filtering when toggling pain zones or symptom tags.
- Floating comparison dock appearing smoothly when 2+ practitioners are selected.
- Clean progressive generation animation for the AI clinical intake briefing.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Interactive SVG Anatomical Body Map vs. Text-Only Dropdowns**
  - *Chosen Approach*: Custom interactive SVG anatomical figure with clickable localized muscle/joint zones and responsive front/back flip toggle.
  - *Why*: Patients often struggle with clinical terminology (e.g., "trochanteric bursitis" vs. "hip pain"); visual localized targeting makes triage intuitive and accurate.
  - *Alternatives Considered*: Standard search dropdowns (too abstract and prone to terminology mismatches).
- **Decision 2: Side-by-Side Comparison Modal with Sticky Headers**
  - *Chosen Approach*: Dedicated multi-column comparison table displaying verified clinical credentials, modalities, and equipment side-by-side.
  - *Why*: Directly answers the core user pain point: understanding the clinical difference between generalist physios and condition-specific specialists.
- **Decision 3: Server-Side Gemini Proxy for Pre-Visit Intake Summarizer**
  - *Chosen Approach*: Server route `/api/intake-summary` running `@google/genai` with `gemini-3.8-flash` to transform user symptom selections into a clean clinical brief.
  - *Why*: Complies with AI Studio security standards (no browser API keys) and provides immediate clinical value for both patient and practitioner.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                          PhysioMatch AI Client                         │
├────────────────────────────┬────────────────────────────┬──────────────┤
│  Anatomical Body Map &     │ Evidence Match Engine &    │  Comparison  │
│  Symptom Triage Selector   │ Practitioner Directory     │  Matrix Dock │
└─────────────┬──────────────┴─────────────┬──────────────┴──────┬───────┘
              │                            │                     │
              ▼                            ▼                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        Local Storage & App State                       │
│ - Active Triage Profile (painZone, severity, duration, symptoms)       │
│ - Comparison Tray (selected practitioner IDs: max 3)                   │
│ - Booking Appointments & Stored Intake Summaries                       │
└──────────────────────────────────────────┬─────────────────────────────┘
                                           │
                                           ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      Express Full-Stack Server                         │
│ - GET  /api/health                                                     │
│ - POST /api/intake-summary (Gemini 3.8 Flash SOAP-format intake brief) │
│ - Static Client Bundle Serving                                         │
└────────────────────────────────────────────────────────────────────────┘
```

#### Core Data Models
- **Physiotherapist**: ID, name, credentials (e.g., PT, DPT, OCS, FCAMPT), verified license number, avatar, clinic name, address, distance, rating, reviews count, years experience, primary conditions (e.g., sciatica, rotator cuff tears, vestibular dizziness, ACL rehab, pelvic floor), verified techniques (Dry Needling, McKenzie MDT, Manual Therapy, Shockwave), hourly rate, consultation types (In-Clinic, Telehealth), bio, and verified outcome highlights.
- **TriageProfile**: Selected anatomical zone, sub-region, pain level (1-10), onset timeframe, symptoms list, functional limitations, user location.
- **MatchResult**: Calculated clinical compatibility score (0–100%), evidence rationale points, matching specialization tags.
- **BookingRecord**: Practitioner ID, date, time slot, appointment type, patient name, contact, generated clinical intake briefing note.

#### Interactive Component & State Mapping
- `BodyMap`: Interactive SVG with anterior/posterior toggle and click handlers for 8 primary anatomical zones.
- `TriagePanel`: Pain scale slider, symptom tags, and timeline selector that automatically recalculates matches.
- `PractitionerList`: Filterable, sortable list of verified clinicians featuring match breakdown tooltips and "Add to Compare" toggles.
- `ComparisonMatrix`: Modal/drawer comparing selected clinicians side-by-side with highlight differences toggle.
- `BookingModal`: Calendar slot selector + "Generate Pre-Visit Intake Note" button invoking `/api/intake-summary`.
