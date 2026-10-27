# FearlessU accelerator presentation

A responsive, interactive presentation for **FearlessU**, an early-stage wellness technology concept exploring AI-assisted, CBT-informed fear journeys. Built with React, TypeScript, Vite, Tailwind CSS, and Lucide React icons. This is an accelerator application prototype, with deterministic demonstrations and illustrative product data.

The React project at the repository root is the current deliverable. `FearlessU_Presentation_Website/` preserves the original standalone HTML website for reference.

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

Edit shared copy and illustrative datasets in `src/data/`, and section-specific presentation or behavior in `src/components/`. Update the root `index.html` metadata before public deployment.

## Interactive features

- Responsive navigation, section links, active navigation feedback, accessible controls, and reduced-motion styling.
- An anxiety slider and an adaptive hero recommendation generated with local rules.
- A fear-journey builder using predefined category templates, difficulty, and pacing choices.
- A basic crisis-language guard that shows urgent-support guidance instead of generating a journey when a recognized risk phrase is entered.
- Selectable sample-journey steps with preparation, activity, and reflection details.
- An impact dashboard with local 7-, 30-, and 90-day filters and clearly labeled simulated data.
- A 60-second pitch timer with pause, reset, and teleprompter controls.
- A downloadable one-page summary and print styling for saving a copy as PDF through the browser.
- FAQ controls, a privacy explanation, and a contact form with local validation and demo-only feedback.

No backend, live AI model, API key, database, authentication service, or persistent application storage is required. Form and journey entries remain temporary local draft state; they are not submitted to a server or saved in `localStorage`. Reloading the page resets this state. Use invented examples only and do not enter sensitive mental-health or identifying information. A locally generated download is a file the user chooses to retain.

## Replace and verify before submission

The supplied founder name is **Vladyslav Konrad**, with the role **Founder and Product Lead**. These are user-provided presentation details; no additional biography, qualifications, employment history, or credentials have been verified.

Before submitting or publishing:

- Replace the founder biography, headquarters location, company details, contact email, website, LinkedIn information, and video placeholder with accurate information and working destinations.
- Replace funding, revenue, financial, customer, and application placeholders with verifiable facts. Proposed business models, pricing, milestones, and collaborator roles remain plans.
- Confirm the accelerator's official name, 2027 availability, eligibility, participation requirements, fees, dates, and submission deadline directly with the program. The presentation does not establish eligibility or acceptance.
- Review every claim and exported summary, and replace illustrative information only when supporting evidence exists.

The website does not establish a Mayo Clinic or ASU partnership, endorsement, or acceptance. It does not claim clinical validation, regulatory clearance, patents, paying customers, investment, or security certification. Simulated metrics and charts are demonstration data and **are not clinical evidence**.

## Medical, safety, and privacy limits

FearlessU is an early-stage wellness technology concept. It is not a medical device, diagnostic tool, healthcare provider, emergency service, or substitute for care from a qualified professional. The demonstrations do not diagnose, treat, cure, or guarantee outcomes. Illustrative gradual-practice steps require individual suitability checks and professional guidance where appropriate.

The basic phrase-based crisis guard is incomplete and can miss or misinterpret language. It is not a clinical screening, monitoring, or emergency-response system. The website cannot assess a person's safety or provide crisis counseling. If someone may be in immediate danger or at risk of harming themselves or another person, they should contact local emergency services or an appropriate crisis service immediately.

Clinical content review, suitability screening, continuous risk evaluation, escalation workflows, auditability, production encryption, role-based access, consent management, data retention, export/deletion, and security review are **planned production requirements**, not implemented or validated protections. No HIPAA compliance or other certification is claimed. The privacy section describes the prototype's behavior and proposed principles; it is not a final production privacy policy.

## Connect a future backend or AI service

1. Define the intended use, supported population, consent process, data minimization, retention/deletion rules, and clinical safety boundaries before collecting information.
2. Add a separately secured server/API with appropriate authentication, authorization, access controls, encrypted transport and storage, rate limits, and privacy-conscious audit logging. Define a real contact submission workflow and its error states before enabling collection.
3. Keep provider credentials on that server. **Never place secrets in frontend code or `VITE_` variables**: Vite exposes those variables in the browser bundle. A frontend environment variable may hold a public API base URL, never a secret key.
4. Replace local recommendation rules only through a reviewed, curated content framework with server-side validation, suitability checks, tested escalation boundaries, and qualified human oversight. Do not expose an unrestricted treatment-generation endpoint.
5. Validate risk handling, model behavior, accessibility, security, privacy, and adverse-event processes with qualified advisors before a real-user pilot. Determine the applicable regulatory and clinical pathway rather than assuming this prototype establishes one.

## Distribution

The deliverable is `fearlessu-accelerator-website.zip`, containing project source, configuration, the dependency lockfile, and the generated `dist/` website. `node_modules/` is excluded; install dependencies after extraction. Development tooling and locally running processes are not bundled.

The packaged ZIP also includes `preview.html`, a self-contained snapshot with the production JavaScript and CSS embedded. Open that downloaded file in a regular browser for a quick interactive preview without installing anything. Edit the React source and rebuild to develop the application; the preview is a generated copy.

The production build passed strict TypeScript checks and browser checks covering the journey templates, local adaptation, recognized crisis-language handling, sample tabs, dashboard filters, full timer countdown, teleprompter, contact validation, privacy dialog, summary download, and print action. Responsive layouts were checked at 320, 375, 768, 1024, and 1440 px without page overflow. These checks validate the demonstration, not clinical suitability or effectiveness.
