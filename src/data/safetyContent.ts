export const aiSystemStages = [
  { title: 'Goals & check-ins', detail: 'A goal, context, and a self-reported check-in.', icon: 'goal' },
  { title: 'Safety & suitability', detail: 'Planned boundaries, exclusions, and support routes.', icon: 'shield' },
  { title: 'Curated library', detail: 'Structured content requiring qualified expert review.', icon: 'library' },
  { title: 'Personalization', detail: 'Adapt wording and pace within reviewed boundaries.', icon: 'adjust' },
  { title: 'Suggested activity', detail: 'One understandable, optional next step.', icon: 'activity' },
  { title: 'User feedback', detail: 'Reflect on difficulty, learning, and comfort.', icon: 'feedback' },
  { title: 'Adaptation', detail: 'Adjust a future suggestion, with a clear reason.', icon: 'adapt' },
] as const;

export const aiResponsibilities = [
  { title: 'Grounded content', text: 'Proposed production suggestions would stay within a curated, versioned content library reviewed by qualified experts.', icon: 'library' },
  { title: 'Explainable recommendations', text: 'Explain how a check-in and the chosen pace influence a suggestion, so the user can make an informed choice.', icon: 'explain' },
  { title: 'Human escalation', text: 'Plan clear routes to qualified professional help when a need goes beyond the intended wellness scope.', icon: 'human' },
  { title: 'Continuous monitoring', text: 'Evaluate unsafe outputs, confusing suggestions, and subgroup performance before expanding access.', icon: 'monitor' },
] as const;

export const aiCapabilities = [
  'Personalizes wording and pacing.',
  'Suggests structured exercises from an approved library.',
  'Helps users reflect on patterns.',
  'Adapts future suggestions to feedback.',
];

export const aiBoundaries = [
  'Diagnose mental health conditions.',
  'Replace a qualified clinician.',
  'Guarantee a result or clinical outcome.',
  'Handle an emergency or provide crisis counseling.',
  'Make unsupported medical claims.',
];

export const safetyRequirements = [
  { title: 'Initial suitability screening', detail: 'Define intended users, exclusions, and appropriate activities with clinical guidance.' },
  { title: 'Continuous risk-language monitoring', detail: 'Evaluate a production monitoring approach and its limitations with qualified experts.' },
  { title: 'Exercise intensity limits', detail: 'Set reviewed limits; never assume a challenge is suitable because it was generated.' },
  { title: 'Pause and stop controls', detail: 'Keep participation optional and provide clear ways to pause a journey or end an activity.' },
  { title: 'Escalation pathways', detail: 'Make appropriate emergency and professional-support routes visible and region-aware.' },
  { title: 'Professional-support recommendations', detail: 'Encourage qualified care when distress or needs exceed the intended wellness scope.' },
  { title: 'Auditable suggestions', detail: 'Record content versions and recommendation rationale with suitable privacy protections.' },
];

export const privacyRequirements = [
  'Data minimization and clearly explained purposes.',
  'Clear, informed user consent.',
  'Encryption in transit and at rest.',
  'Role-based access and least privilege.',
  'User data export and deletion.',
  'Separation of identity and sensitive activity data.',
  'A policy against selling sensitive personal information.',
  'Defined retention and deletion policies.',
  'Independent security review before production deployment.',
];

export const evidencePhases = [
  {
    number: '01',
    title: 'Discovery & protocol design',
    focus: 'Ask the right questions.',
    description: 'Define who the product could serve, what it should do, and where its boundaries belong.',
    activities: ['Interview users and clinicians.', 'Define intended use and target population.', 'Complete risk analysis.', 'Review proposed intervention content.'],
    output: 'Intended-use statement and reviewed research plan',
  },
  {
    number: '02',
    title: 'Prototype & usability',
    focus: 'Make the experience understandable.',
    description: 'Evaluate whether people understand the experience, its limits, and how to use it.',
    activities: ['Test comprehension and navigation.', 'Measure engagement and activity completion.', 'Identify unsafe or confusing suggestions.', 'Improve accessibility and inclusive design.'],
    output: 'Usability findings and revised safety requirements',
  },
  {
    number: '03',
    title: 'Feasibility study',
    focus: 'Learn carefully, with oversight.',
    description: 'Prepare a small, appropriately supervised study before making claims about outcomes.',
    activities: ['Define inclusion and exclusion criteria.', 'Pre-register outcomes where appropriate.', 'Assess retention, acceptability, and preliminary signals.', 'Include qualified clinical oversight.'],
    output: 'Feasibility findings and a monitored study protocol',
  },
  {
    number: '04',
    title: 'Controlled validation',
    focus: 'Let evidence guide the next step.',
    description: 'Choose an appropriate study design and report both benefits and limitations transparently.',
    activities: ['Compare relevant outcomes appropriately.', 'Evaluate safety and subgroup performance.', 'Determine the clinical and regulatory pathway.', 'Publish or transparently report findings.'],
    output: 'Evidence to inform claims, suitability, and further development',
  },
] as const;

export const proposedMeasures = [
  'Activity completion',
  'User-reported confidence',
  'Avoidance behavior',
  'Retention',
  'Adverse-event monitoring',
  'Validated questionnaires selected with clinical advisors',
];
