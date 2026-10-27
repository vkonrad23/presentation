export type FearCategory = 'social' | 'speaking' | 'travel' | 'animals' | 'medical' | 'work' | 'avoidance';
export type JourneyPace = 'Gentle' | 'Balanced' | 'Challenging';

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
}

export function buildJourney(goal: string, category: FearCategory, difficulty: number, pace: JourneyPace): GeneratedJourney {
  const template = categories.find((item) => item.value === category) ?? categories[0];
  const extraPreparation = difficulty >= 8;
  const gentle = pace === 'Gentle' || extraPreparation;
  return {
    goal: goal.trim(), category: template, difficulty, pace,
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
