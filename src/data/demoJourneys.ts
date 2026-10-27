export type FearCategory = 'social' | 'speaking' | 'travel' | 'animals' | 'medical' | 'work' | 'avoidance';
export type JourneyPace = 'Gentle' | 'Balanced' | 'Challenging';
export type DemoScenarioKey = 'speaking' | 'social' | 'conversation';

export interface DemoScenario {
  value: DemoScenarioKey;
  label: string;
  category: FearCategory;
  preparation: string;
  activities: [string, string, string];
  limitation: string;
}

export const demoScenarios: DemoScenario[] = [
  {
    value: 'speaking',
    label: 'Speaking confidently in a small group',
    category: 'speaking',
    preparation: 'Choose a familiar topic and a comfortable place to rehearse privately.',
    activities: [
      'Write one sentence you might like to share with a small group.',
      'Rehearse your sentence privately, with no audience and no need to record.',
      'If suitable, ask one trusted person to listen to your sentence. Sharing is optional.',
    ],
    limitation: 'An illustrative communication exercise, not an individualized exposure treatment.',
  },
  {
    value: 'social',
    label: 'Entering an unfamiliar social environment',
    category: 'social',
    preparation: 'Think of a low-stakes, voluntary setting. You do not need to visit it for this sample.',
    activities: [
      'Write one question you could ask about a new social setting.',
      'Practice a brief introduction privately or imagine arriving with a trusted person.',
      'If appropriate, plan a short visit with support and an easy option to leave.',
    ],
    limitation: 'Choose only safe settings. You decide whether to attend, pause, or leave.',
  },
  {
    value: 'conversation',
    label: 'Preparing for a difficult conversation',
    category: 'work',
    preparation: 'Choose a routine, low-stakes topic. This sample is not for unsafe relationships or confrontation.',
    activities: [
      'Privately write the one point you want to communicate, without sending it.',
      'Rehearse a calm opening sentence privately and note one boundary that matters to you.',
      'If useful, rehearse with a trusted person before deciding whether a conversation is appropriate.',
    ],
    limitation: 'Do not use this sample to approach an unsafe person. Seek appropriate professional support for safety concerns.',
  },
];

export interface JourneyStep {
  title: string;
  preparation: string;
  activity: string;
  reflection: string;
  difficulty: number;
  confidence: number;
}

export interface CategoryTemplate {
  value: FearCategory;
  label: string;
  preparation: string;
  activities: [string, string, string];
  limitation: string;
}

export const categories: CategoryTemplate[] = [
  {
    value: 'social', label: 'Social situations',
    preparation: 'Choose a familiar setting and someone you feel comfortable around.',
    activities: ['Write one friendly opening sentence.', 'Practice the sentence privately or with someone you trust.', 'If it feels suitable, try a brief hello in a familiar setting.'],
    limitation: 'You decide whether, when, and with whom to practice. There is no requirement to continue.',
  },
  {
    value: 'speaking', label: 'Public speaking',
    preparation: 'Pick a short, familiar topic. A private practice is a complete first step.',
    activities: ['Write a two-sentence introduction.', 'Record a private 30-second introduction, without sharing it.', 'If you choose, share it with one trusted person.'],
    limitation: 'These are illustrative communication activities, not an individualized exposure treatment.',
  },
  {
    value: 'travel', label: 'Travel',
    preparation: 'Choose a familiar, accessible place and consider practical support or travel needs.',
    activities: ['Write down the part of a trip that feels uncertain.', 'Review a route to a familiar nearby place from home.', 'If appropriate, plan a brief visit with someone you trust.'],
    limitation: 'Do not practice while driving or in unsafe environments. Seek qualified guidance for substantial distress.',
  },
  {
    value: 'animals', label: 'Animals',
    preparation: 'Stay in a comfortable setting, away from live animals. Consider professional support first.',
    activities: ['Describe the concern and what feeling safer would mean.', 'Choose whether to look at a simple drawing of an animal.', 'Reflect on that choice and discuss a suitable next step with a qualified professional.'],
    limitation: 'This prototype never recommends approaching or handling a live animal.',
  },
  {
    value: 'medical', label: 'Medical environments',
    preparation: 'Make space to note questions for a licensed healthcare professional.',
    activities: ['List one concern and one question about a future appointment.', 'Read practical appointment information from your care provider.', 'Ask the care team about support, accommodations, and preparation options.'],
    limitation: 'Do not delay, alter, or stop medical care. Medical preparation belongs with your care team.',
  },
  {
    value: 'work', label: 'School or work situations',
    preparation: 'Choose a low-stakes task and a setting where participation is voluntary and safe.',
    activities: ['Write one idea you might like to contribute.', 'Rehearse the idea privately in one or two sentences.', 'If appropriate, share the idea with one supportive colleague or classmate.'],
    limitation: 'Consider your circumstances and available support. This is not advice about workplace or school safety.',
  },
  {
    value: 'avoidance', label: 'General avoidance patterns',
    preparation: 'Choose an everyday, low-stakes activity that is safe and matters to you.',
    activities: ['Name the activity, the predicted difficulty, and why it matters.', 'Break the activity into a first action that takes under two minutes.', 'Choose whether to try that action, then note what you learned.'],
    limitation: 'Do not use this demo for trauma, dangerous situations, or activities that need clinical supervision.',
  },
];

export const crisisMessage = 'This prototype is not designed for emergencies. If you may be in immediate danger or at risk of harming yourself or someone else, contact local emergency services or an appropriate crisis service now.';

export function containsCrisisLanguage(text: string): boolean {
  return /\b(suicid\w*|kill\s+(myself|yourself|someone|somebody|him|her|them)|harm\s+(myself|someone|others)|hurt\s+(myself|someone|others)|self[ -]?harm|end\s+my\s+life|want\s+to\s+die|don['’]?t\s+want\s+to\s+live|immediate\s+danger|overdos\w*)\b/i.test(text);
}

export interface GeneratedJourney {
  goal: string;
  category: CategoryTemplate;
  difficulty: number;
  pace: JourneyPace;
  steps: string[];
  guidance: string;
  scenario?: DemoScenarioKey;
}

export function buildJourney(goal: string, category: FearCategory, difficulty: number, pace: JourneyPace, scenario?: DemoScenarioKey): GeneratedJourney {
  const baseTemplate = categories.find((item) => item.value === category) ?? categories[0];
  const selectedScenario = demoScenarios.find((item) => item.value === scenario);
  const template = selectedScenario
    ? { ...baseTemplate, preparation: selectedScenario.preparation, activities: selectedScenario.activities, limitation: selectedScenario.limitation }
    : baseTemplate;
  const extraPreparation = difficulty >= 8;
  const gentle = pace === 'Gentle' || extraPreparation;
  return {
    goal: goal.trim(), category: template, difficulty, pace, scenario,
    steps: gentle
      ? [template.activities[0], 'Pause and notice what feels manageable. Choose a time and support that work for you.', template.activities[1]]
      : [...template.activities],
    guidance: extraPreparation
      ? 'You reported a high difficulty level. This sample stays with preparation. Consider talking with a qualified professional before attempting a challenge.'
      : gentle
        ? 'A slower starting point: begin privately, allow pauses, and repeat only if you choose.'
        : pace === 'Challenging'
          ? 'Challenging means more structure, not more risk. The same voluntary, low-stakes limits apply, and you can step back at any time.'
          : 'A balanced starting point: prepare, practice privately, then consider a small voluntary action.',
  };
}

export function getHeroRecommendation(scenario: DemoScenarioKey, difficulty: number) {
  const selected = demoScenarios.find((item) => item.value === scenario) ?? demoScenarios[0];
  if (difficulty >= 8) {
    return {
      title: 'Preparation is progress, too.',
      activity: selected.activities[0],
      reason: 'At 8–10, this prototype stays with private preparation. Consider qualified support before a challenge.',
      preparation: 'Pause first. Notice your surroundings at a pace that feels comfortable.',
    };
  }
  if (difficulty >= 5) {
    return {
      title: 'Make the next step smaller.',
      activity: selected.activities[0],
      reason: 'At 5–7, a short private draft keeps this sample low-pressure and easy to pause.',
      preparation: 'Take a moment to settle. You can stop or choose another goal at any time.',
    };
  }
  return {
    title: 'A little room to begin.',
    activity: selected.activities[1],
    reason: 'At 0–4, this sample offers a private rehearsal. A lower rating does not establish suitability.',
    preparation: 'Choose a comfortable, familiar space. There is no requirement to share anything.',
  };
}

export interface SessionCheckIn {
  id: number;
  before: number;
  after: number;
  confidence: number;
  experience: 'Manageable' | 'Mixed' | 'Too much';
}

export function nextStepFromFeedback(journey: GeneratedJourney, checkIn: SessionCheckIn) {
  if (checkIn.after >= 8 || checkIn.experience === 'Too much') {
    return {
      activity: 'Pause the challenge. Keep any next step to private reflection, and consider qualified professional support.',
      reason: 'Your feedback suggests more support or a smaller starting point may be appropriate. This demo cannot assess individual risk.',
    };
  }
  if (checkIn.after > checkIn.before || checkIn.confidence <= 3 || checkIn.experience === 'Mixed') {
    return {
      activity: journey.steps[0],
      reason: 'Based on your feedback, the sample returns to preparation. Repeating, pausing, or stopping are all valid choices.',
    };
  }
  return {
    activity: journey.steps[Math.min(1, journey.steps.length - 1)],
    reason: 'You marked this step as manageable. You can repeat it or consider this optional preparation step; progression is always your choice.',
  };
}

export const speakingJourney: JourneyStep[] = [
  {
    title: 'Name the feared outcome',
    preparation: 'Find a quiet moment. You can keep every note private.',
    activity: 'Write one sentence about what you predict might happen when you speak. Add a second sentence about what matters to you.',
    reflection: 'What is a prediction, and what do I already know? What would a manageable first step look like?',
    difficulty: 2, confidence: 3,
  },
  {
    title: 'Record a private introduction',
    preparation: 'Choose a familiar topic and a place where you feel comfortable. Nothing needs to be shared.',
    activity: 'If suitable, record a private 30-second introduction. You can stop, delete it, or simply rehearse without recording.',
    reflection: 'What did I notice before and after? Was anything different from my prediction?',
    difficulty: 4, confidence: 4,
  },
  {
    title: 'Share with one trusted person',
    preparation: 'Ask a supportive person whether they have a minute. Decide together what kind of feedback would help.',
    activity: 'If you choose, share your short introduction. A written version is also an option.',
    reflection: 'What happened? What helped me feel supported? What would I like to repeat or adjust?',
    difficulty: 5, confidence: 5,
  },
  {
    title: 'Ask a question in a small group',
    preparation: 'Choose a familiar, low-stakes group and prepare one genuine question. Participation is optional.',
    activity: 'If appropriate for you, ask the question when there is a comfortable opportunity.',
    reflection: 'What did I learn from taking part? What support or preparation would help next time?',
    difficulty: 6, confidence: 6,
  },
  {
    title: 'Give a short presentation',
    preparation: 'Agree on a brief, familiar topic and a supportive audience. Consider whether professional guidance would help.',
    activity: 'When suitable, share a short presentation at a pace you choose. Pausing or returning to an earlier step is always an option.',
    reflection: 'Which part felt manageable? What did I learn, and what would I choose as my next step?',
    difficulty: 7, confidence: 7,
  },
];
