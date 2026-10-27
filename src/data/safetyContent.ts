export const aiSystemStages = [
  { title: 'User input', detail: 'A goal, a context, and a preferred pace.', icon: 'goal', scope: 'Local demo' },
  { title: 'Structured check-in', detail: 'Self-reported difficulty. No clinical assessment.', icon: 'checkin', scope: 'Local demo' },
  { title: 'Constrained personalization', detail: 'Predefined rules adjust the size of a step.', icon: 'adjust', scope: 'Local demo' },
  { title: 'Safety screening', detail: 'A limited phrase check; clinical screening is planned.', icon: 'shield', scope: 'Limited demo' },
  { title: 'Exercise selection', detail: 'Educational templates; expert content review is planned.', icon: 'library', scope: 'Local demo' },
  { title: 'User choice', detail: 'Review the suggestion. Adapt, pause, or decline.', icon: 'choice', scope: 'Local demo' },
  { title: 'Reflect & update', detail: 'Explore a reflection and a temporary progress summary.', icon: 'feedback', scope: 'Local demo' },
] as const;

export const safetyStatusLegend = [
  { status: 'Implemented prototype', description: 'Visible local controls, with limited scope.', kind: 'implemented' },
  { status: 'In development', description: 'Educational interface refinement only.', kind: 'development' },
  { status: 'Planned validation', description: 'Production controls and research remain proposed.', kind: 'planned' },
] as const;

export const safetyControls = [
  {
    title: 'Explainable, user-controlled steps',
    prototype: 'Local templates adapt to selected difficulty and pace. Suggestions are optional, with their basis explained.',
    planned: 'Evaluate recommendation comprehension, activity intensity limits, and clear pause and stop controls.',
  },
  {
    title: 'Age, risk & suitability',
    prototype: 'A basic phrase check can show urgent-support guidance. No age verification, clinical screening, or reliable risk assessment.',
    planned: 'Define age limits, suitability criteria, exclusions, and a tested risk-handling process with qualified experts.',
  },
  {
    title: 'Professional support routes',
    prototype: 'Visible care boundaries and emergency guidance. No clinician, crisis service, or monitoring team is connected.',
    planned: 'Design region-appropriate escalation and professional-support routes before real-world use.',
  },
  {
    title: 'Clinical review & bias testing',
    prototype: 'No clinical evaluation, validated content library, or subgroup performance evidence is claimed.',
    planned: 'Arrange ongoing qualified content review; test unsafe suggestions, accessibility, and subgroup and bias risks.',
  },
  {
    title: 'Auditability & accountability',
    prototype: 'Deterministic rules are inspectable in the source. No production monitoring or clinical audit trail exists.',
    planned: 'Version content and rules, explain recommendation decisions, and define privacy-conscious audit and incident review.',
  },
  {
    title: 'Sensitive data minimization',
    prototype: 'Entries stay in page memory. No form submission, health-data storage, live AI API, or analytics is connected.',
    planned: 'Implement consent, encryption, role-based access, identity separation, retention, export and deletion, and security review.',
  },
] as const;

export const evidencePhases = [
  {
    number: '01',
    title: 'Usability & safety review',
    question: 'Is the experience understandable and appropriate?',
    activities: ['Usability and accessibility testing', 'Engagement and completion measurement', 'Safety review and risk analysis', 'Qualified expert and user feedback'],
    output: 'A refined intended use, prototype, and safety requirements.',
  },
  {
    number: '02',
    title: 'Feasibility & protocol',
    question: 'Can a carefully defined pilot be run responsibly?',
    activities: ['Feasibility study design', 'Outcome measure selection', 'Protocol and participant criteria', 'Institutional collaboration and oversight'],
    output: 'A feasible protocol and proposed institutional pilot, subject to review.',
  },
  {
    number: '03',
    title: 'Controlled evaluation',
    question: 'What can the evidence support, and for whom?',
    activities: ['Appropriate controlled evaluation', 'Subgroup and bias analysis', 'Health-economic assessment', 'Transparent reporting and publication strategy'],
    output: 'Evidence to guide claims, suitability, and the clinical or regulatory pathway.',
  },
] as const;

export const proposedMeasures = [
  'Activity completion',
  'Self-reported confidence',
  'Avoidance behavior',
  'Retention',
  'Adverse-event monitoring',
  'Validated questionnaires selected with clinical advisors',
];
