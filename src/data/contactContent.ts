export const faqs = [
  {
    question: 'Is FearlessU a replacement for therapy?',
    answer:
      'No. FearlessU is a wellness concept for structured skills practice. It does not replace a qualified mental health professional, who can assess individual needs and whether an activity is suitable.',
  },
  {
    question: 'Does the platform diagnose mental health conditions?',
    answer:
      'No. This educational prototype does not diagnose, prescribe, or provide treatment. Its examples cannot establish the presence or severity of a condition.',
  },
  {
    question: 'How does the AI personalize activities?',
    answer:
      'The proposed platform would use generative AI to personalize wording, pacing, and exercise candidates within an expert-reviewed framework. A research track would investigate original strategies as hypotheses, with safety review and appropriate validation before therapeutic use. The current demo uses local rules; no live AI is connected.',
  },
  {
    question: 'Could FearlessU develop original exercises or strategies?',
    answer:
      'That is a proposed research ambition. Generative AI could suggest candidate exercises, novel strategies, and intervention hypotheses for qualified experts to examine. Originality is not evidence of safety or effectiveness. Candidates would need expert safety review, suitable research oversight, and validation before therapeutic use.',
  },
  {
    question: 'Does the demo provide trauma or PTSD support in Ukraine?',
    answer:
      'No. Trauma stabilization and PTSD support for military personnel and civilians in Ukraine are planned research directions, not available therapy. They would require trauma-qualified clinical partners, safety protocols, and appropriate validation. This demo excludes trauma processing and provides no PTSD treatment, crisis counseling, or emergency care.',
  },
  {
    question: 'What happens if someone needs urgent support?',
    answer:
      'FearlessU is not an emergency service. If someone may be in immediate danger, contact local emergency services or an appropriate crisis resource. The demo’s keyword notice is not a clinical risk assessment and can miss concerning language.',
  },
  {
    question: 'How will FearlessU evaluate safety?',
    answer:
      'Planned work includes expert content review, suitability criteria, risk analysis, usability testing, and appropriately supervised studies. Production safeguards and clinical evaluation have not yet been established.',
  },
  {
    question: 'Is user information sold?',
    answer:
      'This demo sends no form or journey inputs to a server and saves none in browser storage. A future product is proposed to prohibit the sale of sensitive personal information; privacy commitments and security controls need review before launch.',
  },
  {
    question: 'Has FearlessU been clinically validated?',
    answer:
      'No clinical validation or outcome evidence has been provided. FearlessU is an early concept and interactive prototype. Dashboard figures are illustrative, and future clinical claims would require appropriate evidence and regulatory review.',
  },
  {
    question: 'Is FearlessU already working with Mayo Clinic or ASU?',
    answer:
      'No FearlessU collaboration, acceptance, or endorsement is claimed. Founder Vladyslav Konrad studies Software Engineering at American University Kyiv, an ASU partner institution. That is educational context, not a FearlessU partnership or an ASU credential claim. Desired research collaboration would require separate agreement.',
  },
] as const;

export const contactCopy = {
  headline: 'Build the next step. Responsibly.',
  description:
    'We’re seeking clinical and research collaboration for proposed generative AI personalization and original intervention research. New exercise candidates would need expert safety review and appropriate validation before therapeutic use.',
  success:
    'Demo form completed. Connect a secure backend before collecting real user information.',
  formNote:
    'Use fictional details only. Nothing is sent or saved, and this demo is not a way to contact the founder.',
  placeholders: [
    ['Email placeholder', 'founder@fearlessu.example'],
    ['Location placeholder', 'Headquarters to be confirmed'],
  ],
} as const;

export const footerDescription =
  'A proposed generative AI platform for personalized fear journeys and intervention research. Original exercise candidates require expert review and validation; this prototype uses local rules.';

export const footerDisclaimer =
  'FearlessU is an early-stage wellness technology concept, not a diagnostic tool or substitute for care from a qualified professional.';

export const emergencyNotice =
  'FearlessU is not an emergency service. If someone may be in immediate danger, contact local emergency services or an appropriate crisis resource.';

export const privacyPrinciples = [
  [
    'What this demo does',
    'Journey and contact inputs stay in the current page’s memory. No backend, account, analytics service, AI API, or browser storage is connected. Reloading clears those inputs. Do not enter real personal or health information.',
  ],
  [
    'Planned: consent and data controls',
    'A production product would need a clear purpose for each data item, informed consent, minimal collection, defined retention, and understandable export and deletion controls.',
  ],
  [
    'Planned: security architecture',
    'Encryption, role-based access, separation of identity and activity data, audit trails, and independent security review are production requirements. They are not established by this prototype.',
  ],
  [
    'Planned: privacy governance',
    'No sale of sensitive personal information is a proposed product principle. Applicable laws and vendor arrangements need review before launch. No HIPAA compliance or security certification is claimed.',
  ],
] as const;

export const termsPrinciples = [
  [
    'Educational prototype',
    'This interactive demonstration presents an early product concept. Recommendations use local rules and examples, not a live clinical service. You can pause, stop, or leave any demonstration at any time.',
  ],
  [
    'Care and suitability',
    'Activities are illustrative and may not be suitable for an individual. They do not diagnose, treat, or replace professional care. This website is not designed to provide crisis counseling or emergency support.',
  ],
  [
    'Research boundaries',
    'Original exercises and novel strategies are research candidates, not validated therapeutic methods. Trauma stabilization and PTSD support for military personnel and civilians in Ukraine are planned research directions and are outside this demo’s scope.',
  ],
  [
    'Demo inputs',
    'Use fictional information. Form submissions are validated on this page only; they are not delivered to the founder. Journey and form inputs are not sent to a server or saved in browser storage.',
  ],
  [
    'Proposals and placeholders',
    'Product plans, business assumptions, and milestones may change. Illustrative metrics are not clinical evidence or real traction. No institutional partnership, endorsement, or accelerator acceptance is claimed.',
  ],
  [
    'Before a public launch',
    'A complete legal review must establish the operator’s identity, applicable jurisdiction, user eligibility, consent, service terms, and privacy obligations. These draft principles are not a final legal policy or legal advice.',
  ],
] as const;

export const footerGroups = [
  {
    title: 'Product',
    links: [
      { label: 'Product overview', href: '#product' },
      { label: 'Development roadmap', href: '#milestones' },
    ],
  },
  {
    title: 'Evidence',
    links: [
      { label: 'Validation plan', href: '#evidence' },
      { label: 'Illustrative impact', href: '#impact' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Founder & advisors', href: '#team' },
      { label: 'Contact', href: '#contact' },
    ],
  },
] as const;

export const onePageSummary = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>FearlessU — One-page concept summary</title>
  <style>
    body { font: 16px/1.5 system-ui,sans-serif; color:#10251F; max-width:780px; margin:40px auto; padding:0 24px; }
    h1 { font-size:36px; color:#063F32; letter-spacing:-1.4px; margin-bottom:2px; }
    h2 { font-size:18px; color:#063F32; margin-bottom:4px; }
    p { margin-top:5px; }
    .badge { display:inline-block; padding:6px 12px; background:#FFF8E7; color:#063F32; border-radius:20px; font-size:12px; }
    .grid { display:grid; grid-template-columns:1fr 1fr; gap:0 28px; }
    .notice { border-top:1px solid #DCE5DB; padding-top:14px; font-size:12px; }
    button { min-height:44px; border:0; background:#063F32; color:white; border-radius:8px; padding:12px 16px; cursor:pointer; }
    button:focus-visible { outline:3px solid #08754D; outline-offset:4px; }
    @media print { body { font-size:10pt; line-height:1.3; margin:0; max-width:none; padding:0; } h1 { font-size:27pt; line-height:1.1; margin-top:8px; } h2 { font-size:11pt; margin-top:12px; } p { margin-top:4px; margin-bottom:8px; } .badge { font-size:9pt; padding:4px 8px; } .notice { font-size:9pt; line-height:1.3; padding-top:10px; } button { display:none; } @page { margin:16mm; } }
    @media(max-width:520px) { .grid { grid-template-columns:1fr; } }
  </style>
</head>
<body>
  <span class="badge">Early concept / interactive prototype · Application preview</span>
  <h1>FearlessU</h1>
  <p><strong>Face fear, one manageable step at a time.</strong></p>
  <p>A proposed generative AI platform for personalized, evidence-informed fear journeys and original intervention research. The current educational prototype uses local rules, not live AI.</p>
  <div class="grid">
    <section><h2>The problem</h2><p>Avoidance can reinforce fear. People may need a structured bridge between recognizing a challenge and taking a manageable next step.</p></section>
    <section><h2>Personalization & originality</h2><p>Generative AI would personalize journeys and propose candidate exercises, novel strategies, and intervention hypotheses. Expert review, safety evaluation, and appropriate clinical validation must precede therapeutic use. Originality is not clinical evidence.</p></section>
    <section><h2>Working prototype</h2><p>Local template-based journeys, deterministic recommendations, reflection controls, illustrative dashboard filters, and pitch rehearsal tools. No live AI or backend is connected.</p></section>
    <section><h2>Planned Ukraine research</h2><p>Explore trauma-informed stabilization and PTSD resources for military personnel and civilians affected by war and humanitarian crises, particularly in Ukraine. Qualified clinical collaboration is planned. The demo provides no trauma treatment or emergency support.</p></section>
    <section><h2>Business hypotheses</h2><p>Individual subscriptions, organizational licensing, and optional professional tools. Pricing, buyer demand, pilot populations, and purchasing pathways require validation.</p></section>
    <section><h2>Validation & collaboration</h2><p>Seek expert safety review, develop a responsible study protocol, and evaluate candidates before therapeutic use. Mayo Clinic and ASU collaboration is desired; no FearlessU partnership, acceptance, or endorsement is claimed.</p></section>
  </div>
  <h2>Founder and editable company information</h2>
  <p>Vladyslav Konrad · Founder and Product Lead. Software Engineering student at American University Kyiv, an ASU partner institution. This is educational context, not a FearlessU partnership or ASU credential claim.<br>Company/legal details, headquarters, and verified LinkedIn: <strong>to be added</strong>.<br>Email placeholder: founder@fearlessu.example · Website placeholder: fearlessu.example.<br>Funding and fiscal-year revenue: <strong>not provided — replace with accurate information</strong>.</p>
  <p class="notice">${footerDisclaimer} No clinical validation or outcome evidence is claimed. Metrics are illustrative. Production privacy and safety controls require implementation and review.<br>${emergencyNotice}<br><strong>Replace every placeholder with accurate, verifiable information before submission.</strong></p>
  <button type="button" onclick="window.print()">Print / Save as PDF</button>
</body>
</html>`;
