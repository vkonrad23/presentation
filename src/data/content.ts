export const navigation = [
  { label: 'Product', id: 'product' },
  { label: 'How it works', id: 'how-it-works' },
  { label: 'AI & safety', id: 'ai-safety' },
  { label: 'Evidence', id: 'evidence' },
  { label: 'Business', id: 'business' },
  { label: 'Accelerator case', id: 'accelerator' },
] as const;

export const trustPrinciples = [
  { title: 'Evidence-informed structure', detail: 'Expert review and validation planned', icon: 'book' },
  { title: 'Human-centered AI', detail: 'Choice, explanation, and a pace you control', icon: 'heart' },
  { title: 'Care boundaries', detail: 'Professional and crisis support signposted', icon: 'shield' },
  { title: 'Privacy-conscious design', detail: 'Demo inputs are never sent or stored', icon: 'lock' },
] as const;

export const problemCards = [
  { title: 'Avoidance can become a pattern.', text: 'Putting a difficult moment off can bring short-term relief, while making the next attempt feel harder.' },
  { title: 'General advice can miss the moment.', text: 'A page of self-help content may not fit the situation, the person’s goal, or how manageable a step feels today.' },
  { title: 'A step can be too large to start.', text: 'People may leave a program when the gap between a recommendation and a possible action feels too wide.' },
  { title: 'Between-session support has limits.', text: 'Professionals cannot continuously adapt every everyday exercise. Carefully bounded tools could support that space.' },
] as const;

export const capabilities = [
  { icon: 'map', title: 'Map the goal.', label: 'Context before content', text: 'Organize a concern, trigger, everyday situation, and perceived difficulty into a clearer starting point.', example: '“I want to share an idea in our weekly meeting.”', limit: 'A structured check-in, not a diagnosis.' },
  { icon: 'route', title: 'Find a possible step.', label: 'A structured journey', text: 'Break a broad goal into smaller, optional activities, with clear preparation and room to adjust.', example: 'Start with a private introduction before sharing with a group.', limit: 'Individual suitability requires qualified review.' },
  { icon: 'sliders', title: 'Adapt with a reason.', label: 'Constrained personalization', text: 'Use a check-in and feedback to adjust wording, pacing, and step size within a defined framework.', example: 'A higher difficulty check-in suggests preparation instead of a challenge.', limit: 'This prototype runs local rules, not a live AI model.' },
  { icon: 'chart', title: 'Reflect, then learn.', label: 'A visible feedback loop', text: 'Record a practice reflection and see an in-session summary of the choices and feedback you entered.', example: 'Compare what you expected with what you noticed.', limit: 'Session entries are temporary; impact dashboard metrics are illustrative.' },
  { icon: 'people', title: 'Keep care connected.', label: 'Professional collaboration', text: 'A planned progress summary could help a user discuss everyday practice with a qualified professional.', example: 'Bring a reviewed activity summary to an appointment.', limit: 'Clinical integration and personal activity export remain planned.' },
  { icon: 'research', title: 'Explore original ideas.', label: 'A long-term research direction', text: 'Investigate original CBT-inspired exercises, novel therapeutic strategies, and testable hypotheses informed by individual needs, emotional responses, and real-world context.', example: 'Document a candidate exercise and research question for qualified expert evaluation.', limit: 'Research vision only. Expert review, safety evaluation, and appropriate clinical validation must precede therapeutic recommendations.' },
] as const;

export const processSteps = [
  { title: 'Understand the goal', input: 'An everyday goal and difficulty check-in.', function: 'Organize context into a structured starting point.', safety: 'No diagnosis or clinical suitability decision.', output: 'A goal you can review and change.' },
  { title: 'Build a manageable step', input: 'A category, preferred pace, and comfort level.', function: 'Select a bounded activity and explain its size.', safety: 'Preparation takes priority when difficulty is high.', output: 'One optional step, with a clear reason.' },
  { title: 'Learn from the response', input: 'A reflection and a new difficulty rating.', function: 'Summarize feedback without inferring a condition.', safety: 'You can pause or stop; recognized risk terms show support guidance.', output: 'A private, temporary practice summary.' },
  { title: 'Adapt the next step', input: 'Your feedback and decision to continue.', function: 'Suggest repeating, preparing, or adjusting the pace.', safety: 'No pressure to progress or promise of an outcome.', output: 'A next choice that remains yours.' },
] as const;
