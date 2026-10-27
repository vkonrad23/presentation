export type DashboardRange = 7 | 30 | 90;

export interface DashboardPoint {
  label: string;
  confidence: number;
  consistency: number;
}

export interface DashboardPeriod {
  completion: number;
  completed: number;
  assigned: number;
  weeklyPractice: string;
  confidence: string;
  reflections: number;
  dropoff: string;
  dropoffNote: string;
  points: DashboardPoint[];
}

// Fictional examples for the interface, never measurements from actual users.
export const dashboardPeriods: Record<DashboardRange, DashboardPeriod> = {
  7: {
    completion: 60,
    completed: 3,
    assigned: 5,
    weeklyPractice: '3 of 7 days',
    confidence: '4.8 / 10',
    reflections: 4,
    dropoff: 'Before first practice',
    dropoffNote: 'A prompt to make the first step smaller could be explored.',
    points: [
      { label: 'Day 1', confidence: 3, consistency: 1 },
      { label: 'Day 2', confidence: 3.5, consistency: 2 },
      { label: 'Day 3', confidence: 3.3, consistency: 1 },
      { label: 'Day 4', confidence: 4.1, consistency: 3 },
      { label: 'Day 5', confidence: 3.8, consistency: 2 },
      { label: 'Day 6', confidence: 4.4, consistency: 4 },
      { label: 'Day 7', confidence: 4.8, consistency: 3 },
    ],
  },
  30: {
    completion: 70,
    completed: 14,
    assigned: 20,
    weeklyPractice: '4 of 7 days',
    confidence: '6.2 / 10',
    reflections: 18,
    dropoff: 'After a harder step',
    dropoffNote: 'A gentler pace and an optional pause could be explored.',
    points: [
      { label: 'Day 1', confidence: 3, consistency: 2 },
      { label: 'Day 5', confidence: 3.8, consistency: 3 },
      { label: 'Day 10', confidence: 4.5, consistency: 4 },
      { label: 'Day 15', confidence: 4.1, consistency: 3 },
      { label: 'Day 20', confidence: 5.2, consistency: 4 },
      { label: 'Day 25', confidence: 5.8, consistency: 5 },
      { label: 'Day 30', confidence: 6.2, consistency: 4 },
    ],
  },
  90: {
    completion: 75,
    completed: 45,
    assigned: 60,
    weeklyPractice: '5 of 7 days',
    confidence: '6.8 / 10',
    reflections: 52,
    dropoff: 'Returning after a break',
    dropoffNote: 'A flexible restart pathway could be explored.',
    points: [
      { label: 'Day 1', confidence: 3, consistency: 2 },
      { label: 'Day 15', confidence: 4.1, consistency: 3 },
      { label: 'Day 30', confidence: 6.2, consistency: 4 },
      { label: 'Day 45', confidence: 5.5, consistency: 3 },
      { label: 'Day 60', confidence: 6.4, consistency: 5 },
      { label: 'Day 75', confidence: 6.1, consistency: 4 },
      { label: 'Day 90', confidence: 6.8, consistency: 5 },
    ],
  },
};

export const pitchScript = 'Fear often grows through avoidance. People know what they want to do, but the next step can feel too large, too unclear, or too difficult to attempt alone. FearlessU is an AI-assisted platform that turns fear-related goals into structured, manageable journeys. Using evidence-informed CBT principles, it helps users understand patterns, prepare for gradual challenges, reflect on progress, and adapt future steps. FearlessU is not intended to replace clinicians or emergency support. Our goal is to work with clinical, research, and commercialization experts to build a safe, measurable, and scalable product. Through the accelerator, we want to strengthen our clinical framework, design our validation pathway, and prepare responsible institutional pilots. FearlessU exists to help people move from avoidance toward action, one manageable step at a time.';
