export const navigation = [
  { label: 'Product', id: 'product' },
  { label: 'How it works', id: 'how-it-works' },
  { label: 'AI & safety', id: 'ai-safety' },
  { label: 'Evidence', id: 'evidence' },
  { label: 'Impact', id: 'impact' },
  { label: 'Business', id: 'business' },
  { label: 'Team', id: 'team' },
  { label: 'Accelerator fit', id: 'accelerator' },
  { label: 'Contact', id: 'contact' },
] as const;

export const trustPrinciples = [
  { title: 'Evidence-informed', detail: 'Grounded in CBT principles', icon: 'book' },
  { title: 'Human at heart', detail: 'Professional support matters', icon: 'heart' },
  { title: 'Safety by design', detail: 'Clear boundaries, from day one', icon: 'shield' },
] as const;

export const problemCards = [
  { icon: 'loop', title: 'Fear becomes avoidance.', text: 'A difficult moment can become something we put off. The short-term relief may make the next attempt feel even harder.' },
  { icon: 'distance', title: 'The next step feels far away.', text: 'Help can feel hard to access or difficult to personalize. Knowing what you want to change does not always show you where to begin.' },
  { icon: 'layers', title: 'Life changes. Content should adapt.', text: 'A static collection of wellness tips may not respond to your context, comfort level, or what you learned from your last attempt.' },
] as const;

export const capabilities = [
  { icon: 'map', title: 'Start with your story.', label: 'AI-assisted fear mapping', text: 'Organize a concern, trigger, goal, situation, and perceived difficulty into a clearer starting point.', example: '“I want to share an idea in our weekly meeting.”', limit: 'A structured check-in, not a diagnosis.' },
  { icon: 'route', title: 'Make the next step smaller.', label: 'Personalized journey builder', text: 'Turn a broad goal into a sequence of manageable, optional steps that you can review and adjust.', example: 'Start with a private introduction before a group.', limit: 'Individual suitability must be checked.' },
  { icon: 'sliders', title: 'Find a pace that fits.', label: 'CBT-informed adaptation', text: 'Adapt exercise wording, reflection prompts, and pacing using feedback within a structured framework.', example: 'Choose a gentler activity after a difficult day.', limit: 'Local templates in this prototype; no live AI.' },
  { icon: 'chart', title: 'Notice your own patterns.', label: 'Progress & reflection', text: 'Keep a view of completed activities, self-reported difficulty, confidence, and recurring situations.', example: 'Reflect on what happened versus what you predicted.', limit: 'Dashboard data here is simulated.' },
  { icon: 'people', title: 'Keep people in the picture.', label: 'Professional support pathway', text: 'A proposed activity-summary export could help users discuss their experience with a qualified professional.', example: 'Bring a reflection summary to an appointment.', limit: 'Personal activity export and care integration are planned.' },
] as const;

export const processSteps = [
  { title: 'Understand', detail: 'Name the fear, its context, and what matters to you.' },
  { title: 'Plan', detail: 'Break the goal into manageable, optional steps.' },
  { title: 'Prepare', detail: 'Review the activity and a simple coping tool.' },
  { title: 'Practice', detail: 'Try a gradual real-world or reflective activity.' },
  { title: 'Reflect & adapt', detail: 'Notice what you learned and choose what comes next.' },
] as const;
