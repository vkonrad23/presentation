# FearlessU accelerator presentation

A responsive, interactive presentation for **FearlessU**, an early-stage mental health AI startup exploring personalized CBT-informed support and responsible research into new intervention ideas. Built with React, TypeScript, Vite, Tailwind CSS, and Lucide React icons. The editorial layout uses forest green, warm ivory, sage, and restrained gold, with system fonts and original SVG assets. This is an accelerator application prototype, with deterministic demonstrations and clearly labeled illustrative data.

The React project at the repository root is the current deliverable. `FearlessU_Presentation_Website/` preserves the original standalone HTML website and its earlier, narrower positioning for reference. Use the root React project for the current research vision.

## Run locally

Install **Node.js 22.12 or newer** and npm. Development was tested with Node.js 24.

Extract `fearlessu-accelerator-website.zip`, open a terminal in the extracted project directory containing `package.json`, and run:

```sh
npm install
npm run dev
```

Use the address printed by Vite. Stop the development server with `Ctrl+C`.

Create and inspect the production build:

```sh
npm run build
npm run preview
```

`npm run build` checks TypeScript and generates `dist/`. The preview command serves that build locally. Deploy the contents of `dist/` to a static website host; no application server is required for this demo. Opening the source `index.html` directly does not run the React project.

In a managed cloud environment with an unwritable home npm cache, use:

```sh
npm install --cache /tmp/fearlessu-npm-cache
```

For repeatable dependency installation from the included lockfile, use `npm ci` (with the same cache option if needed).

## Project structure

```text
src/
  components/          Page sections and interactive product demonstrations
  data/                Editable presentation content and demo templates
  hooks/               Shared reveal, content, and section-navigation behavior
  styles/              Motion, hero entrance, navigation, and presentation styles
  App.tsx              Page composition
  main.tsx             React entry point
  index.css            Visual system, responsive styles, and print styles
public/                Static assets
index.html             Page title, description, and social metadata
vite.config.ts         React and Tailwind build configuration
dist/                  Generated production website
FearlessU_Presentation_Website/
                       Preserved original static website
```

Edit shared copy and illustrative datasets in `src/data/`, and section-specific presentation or behavior in `src/components/`. The single-page presentation uses section anchors rather than a routing service. Update the root `index.html` metadata before public deployment, including a real deployment URL for social preview metadata when available.

## Interactive features

- Sticky navigation, active section feedback, a mobile menu, visible keyboard focus, and reduced-motion support.
- An optional **Present** control opens a chapter guide for the accelerator walkthrough. Previous/Next and a chapter selector move through the existing page, including dedicated research and responsible-design stops. Exit returns focus to the header; ordinary scrolling and the interactive prototype remain available.
- Three example scenarios: speaking in a small group, entering an unfamiliar social environment, and preparing for a difficult conversation. The hero uses a native scenario selector, an anxiety slider, explainable local recommendations, and pause/resume controls.
- A complete local journey loop: choose an example or fictional goal, set difficulty and pace, generate a sample, adapt its difficulty, choose a voluntary practice, and complete a reflection.
- Reflection sliders and an experience selector shape an optional next suggestion. A temporary session summary shows the visitor's numeric demo check-ins; the optional written note is discarded on completion. Pause preserves the current stage, stop ends the practice, and clear resets the session.
- A limited phrase-based crisis guard checks submitted goals and reflection notes, stops the sample when a recognized phrase appears, and shows urgent-support guidance. It does not assess risk or provide crisis counseling.
- Keyboard-accessible public-speaking sample tabs with preparation, activity, reflection, illustrative ratings, and reversible demo completion.
- An impact dashboard with local 7-, 30-, and 90-day filters. Its illustrative metrics are separate from the visitor's temporary session check-ins and are not clinical evidence or actual traction.
- A 60-second pitch timer with pause, reset, and teleprompter controls.
- A downloadable one-page summary and print styling for saving a copy as PDF through the browser.
- FAQ accordions, draft privacy and prototype-terms dialogs, and a contact form with local validation, clear controls, and demo-only feedback. The form does not contact the founder.

No backend, live AI model, API key, database, authentication service, or persistent application storage is required. Form and journey entries remain temporary local draft state; they are not submitted to a server or saved in `localStorage`. Reloading the page resets this state. Use invented examples only and do not enter sensitive mental-health or identifying information. A locally generated download is a file the user chooses to retain.

## Replace and verify before submission

The supplied founder name is **Vladyslav Konrad**, with the role **Founder and Product Lead**. The founder also supplied that he is a Software Engineering student at American University Kyiv, an ASU partner institution. These are founder-provided details, not independently verified credentials. AUK’s academic relationship with ASU does not establish a FearlessU partnership, endorsement, or ASU enrollment.

Before submitting or publishing:

- Expand the founder biography with accurate experience and achievements; replace headquarters, company, contact, website, LinkedIn, and video placeholders with verified information and working destinations.
- Replace funding, revenue, financial, customer, and application placeholders with verifiable facts. Proposed business models, pricing, milestones, and collaborator roles remain plans.
- Confirm the accelerator's official name, 2027 availability, eligibility, participation requirements, fees, dates, and submission deadline directly with the program. The presentation does not establish eligibility or acceptance.
- Review every claim and exported summary, and replace illustrative information only when supporting evidence exists.

The website does not establish a Mayo Clinic or ASU partnership, endorsement, or acceptance. It does not claim clinical validation, regulatory clearance, patents, paying customers, investment, or security certification. Simulated metrics and charts are demonstration data and **are not clinical evidence**.

## Personalization, original research, and Ukraine

FearlessU’s long-term vision includes both personalizing established, evidence-informed CBT exercises and generating original CBT-inspired candidate exercises, proposing novel therapeutic strategies, and formulating hypotheses for psychological interventions. Individual needs, emotional responses, and real-world circumstances would inform research questions. These are proposed capabilities; no generative AI or candidate-generation system is connected to this demo.

Novel candidates would remain research ideas until expert review, safety evaluation, appropriate clinical validation, and any necessary approvals support therapeutic use. Proposed interests include anxiety, depression, complex fears, and phobias; target populations and intended use require qualified guidance. No effectiveness or clinical validation is claimed.

The proposed Ukraine-focused social-impact direction is trauma-informed psychological stabilization and PTSD support resources for military personnel and civilians affected by war and humanitarian crises. This is a research ambition, not an available treatment or support service. It requires trauma-qualified expertise, appropriate ethics and suitability review, and independent oversight. The educational demo remains outside trauma and PTSD intervention use.

Mayo Clinic and ASU researchers are possible future collaborators the founder hopes to engage. No collaboration, institutional endorsement, or accelerator acceptance is established.

## Medical, safety, and privacy limits

FearlessU is an early-stage wellness technology concept. It is not a medical device, diagnostic tool, healthcare provider, emergency service, or substitute for care from a qualified professional. The demonstrations do not diagnose, treat, cure, or guarantee outcomes. Illustrative gradual-practice steps require individual suitability checks and professional guidance where appropriate.

The basic phrase-based crisis guard is incomplete and can miss or misinterpret language. It is not a clinical screening, monitoring, or emergency-response system. The website cannot assess a person's safety or provide crisis counseling. If someone may be in immediate danger or at risk of harming themselves or another person, they should contact local emergency services or an appropriate crisis service immediately.

The responsibility section distinguishes **Implemented prototype** (limited local controls), **In development** (educational interface refinement), and **Planned validation** (proposed production controls and research). Clinical content review, age and suitability screening, continuous risk evaluation, staffed escalation workflows, auditability, production encryption, role-based access, consent management, data retention, export/deletion, and security review are **planned production requirements**, not implemented or validated protections. No HIPAA compliance or other certification is claimed. The privacy and terms dialogs are draft principles, not final production legal policies.

The three proposed evidence phases cover usability and safety review, feasibility and protocol design, and controlled evaluation. Research, subgroup and bias analysis, health-economic assessment, and publication are plans rather than completed findings.

## Connect a future backend or AI service

1. Define the intended use, supported population, consent process, data minimization, retention/deletion rules, and clinical safety boundaries before collecting information.
2. Add a separately secured server/API with appropriate authentication, authorization, access controls, encrypted transport and storage, rate limits, and privacy-conscious audit logging. Define a real contact submission workflow and its error states before enabling collection.
3. Keep provider credentials on that server. **Never place secrets in frontend code or `VITE_` variables**: Vite exposes those variables in the browser bundle. A frontend environment variable may hold a public API base URL, never a secret key.
4. Replace local recommendation rules only through a reviewed, curated content framework with server-side validation, suitability checks, tested escalation boundaries, and qualified human oversight. Keep novel candidate generation in a separately governed research workflow. Candidates must pass expert review, safety evaluation, and appropriate clinical validation before entering any therapeutic recommendation path; do not expose an unrestricted treatment-generation endpoint.
5. Validate risk handling, model behavior, accessibility, security, privacy, and adverse-event processes with qualified advisors before a real-user pilot. Determine the applicable regulatory and clinical pathway rather than assuming this prototype establishes one.

## Distribution

The deliverable is `fearlessu-accelerator-website.zip`, containing project source, configuration, the dependency lockfile, and the generated `dist/` website. `node_modules/` is excluded; install dependencies after extraction. Development tooling and locally running processes are not bundled.

The packaged ZIP also includes `preview.html`, a self-contained snapshot with the production JavaScript and CSS embedded. Open that downloaded file in a regular browser for a quick interactive preview without installing anything. Edit the React source and rebuild to develop the application; the preview is a generated copy.

Rebuild and regenerate the packaged snapshots after source changes so the ZIP, embedded preview, and `dist/` represent the same version. Generated archives, build output, and `node_modules/` are intentionally excluded from Git.

## Validate changes

Run `npm run build` for strict TypeScript and production-bundle checks, then use `npm run preview` for browser review. The project currently provides development, build, and preview scripts; it does not configure a separate test or lint command.

Review the following after changing a component or design token:

- Layouts at **320, 375, 768, 1024, 1440, and 1920 px**, including horizontal overflow, readable body text, wrapping controls, consistent spacing, and approximately 44 px touch targets.
- All three scenarios, empty/invalid goals, local difficulty adaptation, the practice/reflection loop, feedback rationale, pause/resume, stop, and clear. Submit a recognized crisis phrase in both the goal and the optional reflection to verify that the sample stops.
- Keyboard navigation, visible focus, sample-tab Arrow/Home/End keys, native scenario selection, accordions, privacy/terms dialog close and Escape behavior, and reduced-motion preferences.
- All dashboard ranges, timer start/pause/resume/reset and completion, teleprompter controls, contact validation/success/clear, summary download, and Print / Save as PDF.
- Browser console errors, unintended network submissions, and unexpected local/session storage. Application inputs should remain in page memory only; ordinary development asset and hot-reload requests are separate from form submission.

Interface checks do not establish clinical suitability, safety, effectiveness, or full accessibility conformance. Any reported validation results should state which commands, interactions, and viewport widths were actually checked for that version.

## Redesign validation

The production build passed TypeScript checking. Chromium checks passed for the three scenarios, all seven category templates, difficulty adaptation, two practice/reflection loops, memory-only history, pause/stop/reset, recognized goal and reflection risk language, keyboard journey tabs, all dashboard date filters, contact validation, legal dialogs, local downloads/printing, and pitch countdown/teleprompter controls. Layout checks at 320, 375, 768, 1024, 1440, and 1920 px found no page overflow or visible text below 12 px; visible controls met the 44 px target check. Automated WCAG A/AA checks at mobile and desktop reported no violations. This is prototype interface validation, not a clinical or complete manual accessibility evaluation.

## Motion and transitions

The motion layer uses native CSS and the Web Animations API; no animation dependency is required. Shared timing and interaction styles live in `src/styles/motion.css` and `src/styles/navigation-motion.css`. `src/hooks/useMotion.ts` provides one-time, staggered page reveals, cancellable native disclosure transitions, and discrete content transitions that preserve controls and draft state. Navigation has a measured sliding indicator and an accessible animated mobile menu; dashboard charts interpolate their geometry; demo and pitch state feedback remains restrained.

The opening headline and decorative path have a one-time entrance sequence in `src/styles/hero-motion.css`. `src/hooks/useSectionNavigation.ts` coordinates section links: nearby destinations use a bounded eased scroll, while distant destinations use a short fade over the live page. The fixed header and presentation controls stay available. Wheel, touch, pointer, and navigation-key input interrupt a transition; a newer navigation takes precedence. Page content and demo state are never copied or remounted for the effect.

For a live review, select **Present** in the header, then use the chapter selector or Previous/Next. The guide covers the overview, problem, product approach, live prototype, research vision, responsible design, evidence roadmap, business model, accelerator goals, and founder pitch. It does not advance automatically or require fullscreen. Use the **Exit guided presentation** control to close the guide.

System reduced-motion preferences apply on load and when changed while the site is open. Keyboard focus and deep links expose content immediately; critical validation and crisis messages remain immediate. Unsupported animation APIs fall back to usable native content. Print preparation clears transient motion styles so unrevealed sections are included.
