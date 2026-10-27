export type DashboardRange = 7 | 30 | 90;

export interface DashboardPoint {
  label: string;
  confidence: number;
}

export interface DashboardPeriod {
  completion: number;
  completed: number;
  assigned: number;
  exerciseAdherence: number;
  confidence: string;
  difficulty: string;
  safetyEscalations: number;
  retention: number;
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
    exerciseAdherence: 64,
    confidence: '4.8 / 10',
    difficulty: '6 → 5',
    safetyEscalations: 2,
    retention: 58,
    reflections: 4,
    dropoff: 'Before first practice',
    dropoffNote: 'A prompt to make the first step smaller could be explored.',
    points: [
      { label: 'Day 1', confidence: 3 },
      { label: 'Day 2', confidence: 3.5 },
      { label: 'Day 3', confidence: 3.3 },
      { label: 'Day 4', confidence: 4.1 },
      { label: 'Day 5', confidence: 3.8 },
      { label: 'Day 6', confidence: 4.4 },
      { label: 'Day 7', confidence: 4.8 },
    ],
  },
  30: {
    completion: 70,
    completed: 14,
    assigned: 20,
    exerciseAdherence: 72,
    confidence: '6.2 / 10',
    difficulty: '6 → 4',
    safetyEscalations: 5,
    retention: 46,
    reflections: 18,
    dropoff: 'After a harder step',
    dropoffNote: 'A gentler pace and an optional pause could be explored.',
    points: [
      { label: 'Day 1', confidence: 3 },
      { label: 'Day 5', confidence: 3.8 },
      { label: 'Day 10', confidence: 4.5 },
      { label: 'Day 15', confidence: 4.1 },
      { label: 'Day 20', confidence: 5.2 },
      { label: 'Day 25', confidence: 5.8 },
      { label: 'Day 30', confidence: 6.2 },
    ],
  },
  90: {
    completion: 75,
    completed: 45,
    assigned: 60,
    exerciseAdherence: 76,
    confidence: '6.8 / 10',
    difficulty: '6 → 3',
    safetyEscalations: 11,
    retention: 35,
    reflections: 52,
    dropoff: 'Returning after a break',
    dropoffNote: 'A flexible restart pathway could be explored.',
    points: [
      { label: 'Day 1', confidence: 3 },
      { label: 'Day 15', confidence: 4.1 },
      { label: 'Day 30', confidence: 6.2 },
      { label: 'Day 45', confidence: 5.5 },
      { label: 'Day 60', confidence: 6.4 },
      { label: 'Day 75', confidence: 6.1 },
      { label: 'Day 90', confidence: 6.8 },
    ],
  },
};

export const pitchScript = 'FearlessU is an early-stage mental health AI startup exploring personalized support and responsible CBT intervention research. Our vision is to use generative AI to personalize evidence-informed exercises and propose original CBT-inspired activities, therapeutic strategies, and research hypotheses. New ideas would require expert review, safety evaluation, and appropriate clinical validation before therapeutic use. Founded by a Software Engineering student at American University Kyiv, an ASU partner institution, FearlessU also has a social-impact ambition for Ukraine: trauma-informed stabilization and PTSD support resources for military personnel and civilians affected by war. These are research goals; the current prototype uses local rules and provides no diagnosis or trauma treatment. We seek clinical and academic collaboration, including potential guidance from Mayo Clinic and ASU researchers, to evaluate candidates responsibly and prepare a credible evidence pathway. No institutional collaboration is claimed. FearlessU: one manageable step, with discovery guided by evidence.';
