export const faqs = [
  {
    question: 'Is FearlessU a replacement for therapy?',
    answer: 'No. FearlessU is an early-stage wellness concept intended to support skills practice, not replace a licensed mental health professional. A qualified professional can assess individual needs and determine whether any activity is suitable.',
  },
  {
    question: 'Does the platform diagnose mental health conditions?',
    answer: 'No. This prototype does not diagnose, prescribe, or provide treatment. Its examples are educational and do not establish the presence or severity of a mental health condition.',
  },
  {
    question: 'How does the AI personalize activities?',
    answer: 'The proposed product would adapt wording, pacing, and structured activities within an expert-reviewed content framework. This interactive prototype uses predefined templates and deterministic local rules. No live AI model or external API is connected.',
  },
  {
    question: 'What happens if a user needs urgent support?',
    answer: 'FearlessU is not an emergency or crisis service. If you are in immediate danger or may harm yourself or another person, contact local emergency services immediately. A basic keyword notice in this demo is not a reliable risk assessment and may miss concerning language.',
  },
  {
    question: 'How will FearlessU evaluate safety?',
    answer: 'Planned work includes expert content review, intended-use and suitability criteria, risk analysis, usability testing, adverse-event monitoring, and appropriately supervised studies. These production safeguards and clinical evaluations have not yet been established.',
  },
  {
    question: 'Is user information sold?',
    answer: 'This demo does not send form or journey inputs to a server, save them in browser storage, or sell information. A future product is proposed to prohibit the sale of sensitive personal information and would require a reviewed privacy policy, explicit consent, and verified security controls before collecting real data.',
  },
  {
    question: 'Has FearlessU been clinically validated?',
    answer: 'No clinical validation or outcome evidence has been provided. FearlessU is an early concept and interactive prototype. All dashboard data is simulated, and any future medical claims would require appropriate evidence and regulatory review.',
  },
  {
    question: 'Is FearlessU already working with Mayo Clinic or ASU?',
    answer: 'No collaboration, acceptance, endorsement, or partnership is claimed. This website is an application preview for a proposed accelerator opportunity. Any future collaboration would depend on program guidance, project fit, and availability.',
  },
] as const;

export const contactCopy = {
  headline: 'Help turn a promising concept into a responsibly validated product.',
  description: 'FearlessU is seeking clinical, research, design, safety, and commercialization guidance to develop an accessible platform without compromising scientific responsibility.',
  success: 'Demo form completed. Connect a secure backend before collecting real user information.',
  placeholders: [
    ['Email', 'founder@fearlessu.example'],
    ['LinkedIn', 'Add founder LinkedIn'],
    ['Location', 'Add headquarters location'],
    ['Website', 'fearlessu.example'],
  ],
} as const;

export const footerDisclaimer = 'FearlessU is an early-stage wellness technology concept and is not a medical device, healthcare provider, diagnostic service, emergency service, or replacement for professional care.';
export const emergencyNotice = 'If you are in immediate danger or may harm yourself or another person, contact local emergency services immediately.';

export const privacyPrinciples = [
  ['This prototype', 'Journey and contact inputs stay in the current page’s memory. No backend, account, analytics service, AI API, or browser storage is connected. Reloading clears those inputs. Use fictional examples and do not enter personal health information.'],
  ['Planned: consent and minimization', 'A production product would need a clear purpose for each data item, informed consent, limited collection, defined retention, and understandable export and deletion controls.'],
  ['Planned: security architecture', 'Encryption in transit and at rest, role-based access, separation of identity and activity data, audit trails, and independent security review are production requirements. They have not been established by this prototype.'],
  ['Planned: privacy governance', 'No sale of sensitive personal information is a proposed product principle. Applicable privacy laws, vendor arrangements, geographic requirements, and clinical obligations must be reviewed before launch. No HIPAA compliance or security certification is claimed.'],
] as const;

export const onePageSummary = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>FearlessU — One-page concept summary</title>
<style>body{font:15px/1.5 system-ui,sans-serif;color:#14241D;max-width:780px;margin:40px auto;padding:0 24px}h1{font-size:36px;color:#0B3D2E;letter-spacing:-1.4px;margin-bottom:2px}h2{font-size:17px;color:#0B3D2E;margin-bottom:4px}p,ul{margin-top:5px}small{color:#607067}.badge{display:inline-block;padding:5px 10px;background:#FFF4C7;color:#0B3D2E;border-radius:20px;font-size:12px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:0 28px}.notice{border-top:1px solid #DDE9E1;padding-top:14px;font-size:12px}button{border:0;background:#0B3D2E;color:white;border-radius:8px;padding:12px 16px;cursor:pointer}@media print{body{font-size:10.5pt;margin:0;max-width:none;padding:0}h1{font-size:27pt}h2{font-size:12pt}button{display:none}@page{margin:16mm}}@media(max-width:520px){.grid{grid-template-columns:1fr}}</style></head>
<body><span class="badge">Early concept / interactive prototype · Application preview</span><h1>FearlessU</h1><p><strong>Face fear one manageable step at a time.</strong></p>
<p>An AI-assisted wellness concept that organizes fear-related goals into structured, personalized, CBT-informed journeys with gradual practice, reflection, progress tracking, and safety boundaries.</p>
<div class="grid"><section><h2>The problem</h2><p>People may recognize avoidance yet lack an accessible, structured way to take a manageable next step. Initial users and institutional buyers still need validation.</p></section>
<section><h2>Proposed approach</h2><p>Understand → Plan → Prepare → Practice → Reflect and adapt. A future curated content framework would support appropriate personalization and professional collaboration.</p></section>
<section><h2>What works in this prototype</h2><p>Local template-based journeys, a deterministic check-in recommendation, sample journey steps, simulated dashboard filters, and pitch rehearsal tools. No live AI or backend is connected.</p></section>
<section><h2>Validation priorities</h2><p>User and clinician discovery; expert content and safety review; usability testing; a clinically supervised feasibility protocol; and appropriate controlled validation before outcome claims.</p></section>
<section><h2>Proposed business model</h2><p>Consumer freemium subscription, organizational licensing, and optional professional tools. Pricing, purchasing pathways, and pilot populations remain hypotheses.</p></section>
<section><h2>Accelerator objectives</h2><p>Refine a responsible product framework, prepare a feasible validation study, and explore institutional commercialization. No Mayo Clinic or ASU acceptance, collaboration, or endorsement is claimed.</p></section></div>
<h2>Founder and editable company information</h2><p>Vladyslav Konrad · Founder and Product Lead.<br>Biography, headquarters, company/legal details, and verified LinkedIn: <strong>to be added</strong>.<br>Email placeholder: founder@fearlessu.example · Website placeholder: fearlessu.example.<br>Funding and fiscal-year revenue: <strong>not provided — replace with accurate information</strong>.</p>
<p class="notice">${footerDisclaimer} No clinical validation, regulatory clearance, established security certification, or outcome evidence is claimed. Any charts use simulated demo data. Production privacy and safety controls require implementation and review.<br>${emergencyNotice}<br><strong>Replace all placeholders with accurate, verifiable information before submission.</strong></p>
<button type="button" onclick="window.print()">Print / Save as PDF</button></body></html>`;
