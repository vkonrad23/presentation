import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  ArrowRight, Check, CheckCheck, CheckCircle2, ChevronRight, Circle, Compass,
  Feather, HeartHandshake, Leaf, Lightbulb, LockKeyhole, Pause, Play,
  RotateCcw, ShieldCheck, Sparkles, Square, TrendingUp,
} from 'lucide-react';
import {
  buildJourney, categories, containsCrisisLanguage, crisisMessage, demoScenarios,
  getHeroRecommendation, nextStepFromFeedback, speakingJourney,
  type DemoScenarioKey, type FearCategory, type GeneratedJourney,
  type JourneyPace, type SessionCheckIn,
} from '../data/demoJourneys';
import { useContentTransition } from '../hooks/useMotion';

interface RangeFieldProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  low?: string;
  high?: string;
}

function RangeField({ id, label, value, onChange, low = 'Comfortable', high = 'Very difficult' }: RangeFieldProps) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-semibold text-[#10251F]">{label}</label>
        <output htmlFor={id} className="rounded-lg bg-[#EDF4EC] px-3 py-1 text-sm font-semibold text-[#063F32]">
          {value}<span className="font-normal text-[#52645D]"> / 10</span>
        </output>
      </div>
      <input
        id={id} type="range" min={0} max={10} value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="block min-h-11 w-full cursor-pointer accent-[#08754D]"
      />
      <div className="flex justify-between text-xs text-[#52645D]"><span>{low}</span><span>{high}</span></div>
    </div>
  );
}

export function ProductDemo() {
  const [scenario, setScenario] = useState<DemoScenarioKey>('speaking');
  const [anxiety, setAnxiety] = useState(4);
  const [applied, setApplied] = useState({ scenario: 'speaking' as DemoScenarioKey, anxiety: 4 });
  const [updated, setUpdated] = useState(false);
  const [paused, setPaused] = useState(false);
  const recommendation = getHeroRecommendation(applied.scenario, applied.anxiety);
  const changed = applied.anxiety !== anxiety;
  const recommendationRef = useRef<HTMLDivElement>(null);

  useContentTransition(recommendationRef, `${applied.scenario}:${applied.anxiety}:${paused}`, {
    duration: 360,
    distance: 8,
  });

  function adapt() {
    setApplied({ scenario, anxiety });
    setUpdated(true);
    setPaused(false);
  }

  function chooseScenario(value: DemoScenarioKey) {
    setScenario(value); setApplied({ scenario: value, anxiety }); setUpdated(false); setPaused(false);
  }

  return (
    <div className="relative w-full" data-testid="product-demo">
      <div className="relative rounded-[28px] border border-[#DCE5DB] bg-white p-5 text-[#10251F] shadow-[0_24px_70px_-34px_rgba(6,63,50,0.28)] sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EDF4EC] text-[#063F32]"><Leaf size={23} /></span>
            <div><p className="mb-1 text-xs text-[#52645D]">A small step, chosen by you</p><h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Today’s Fear Journey</h2></div>
          </div>
          <span className="rounded-full border border-[#E6D391] bg-[#FFF8E7] px-2.5 py-1.5 text-xs font-semibold text-[#6E5313]">Prototype</span>
        </div>

        <div className="mb-4">
          <label htmlFor="hero-scenario" className="mb-2 block text-xs font-semibold uppercase tracking-[.1em] text-[#52645D]">Explore a scenario</label>
          <select id="hero-scenario" className="field w-full bg-[#F7F8F2] text-sm" value={scenario} onChange={(event) => chooseScenario(event.target.value as DemoScenarioKey)}>
            {demoScenarios.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
        </div>

        <RangeField id="hero-anxiety" label="How does it feel right now?" value={anxiety} onChange={setAnxiety} />

        <div ref={recommendationRef} className="motion-state-panel mt-4 min-h-[224px] rounded-2xl border border-[#DCE5DB] bg-[#F7F8F2] p-4" data-testid="hero-recommendation">
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 text-xs font-semibold text-[#08754D]"><Compass size={16} /> Your suggested next step</span>
            <span className="text-xs text-[#52645D]">{paused ? 'Paused' : 'Private practice'}</span>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-[#063F32]">{paused ? 'Take the time you need.' : recommendation.title}</h3>
          <p className="min-h-[72px] text-base leading-relaxed text-[#10251F]">
            {paused ? 'The practice is paused. Nothing needs to be completed. Resume only if you choose.' : recommendation.activity}
          </p>
          <div className="mt-3 border-t border-[#DCE5DB] pt-3">
            <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-[#063F32]"><Lightbulb size={14} /> Why this suggestion?</p>
            <p className="text-xs leading-relaxed text-[#52645D]">{recommendation.reason}</p>
          </div>
        </div>

        <p role="status" className="min-h-12 py-2 text-xs leading-relaxed text-[#52645D]">
          {changed ? 'Your check-in changed. Adapt when you are ready.' : updated ? `Updated for ${applied.anxiety}/10 using predefined local rules. Your choice comes first.` : 'Predefined local rules demonstrate personalization. No live AI is running.'}
        </p>
        <div className="grid grid-cols-[1fr_auto] gap-2">
          <button className="button w-full justify-center" type="button" onClick={adapt}>Adapt next step <ArrowRight size={17} /></button>
          <button
            type="button" className="button button-secondary min-w-11 px-3"
            onClick={() => setPaused((value) => !value)} aria-pressed={paused}
            aria-label={paused ? 'Resume hero practice' : 'Pause hero practice'}
          >
            {paused ? <Play size={17} /> : <Pause size={17} />}
          </button>
        </div>
        <p className="mt-3 text-center text-xs leading-relaxed text-[#52645D]">Educational prototype. Not medical advice.<br />No diagnosis · no live AI · no information saved</p>
      </div>
    </div>
  );
}

type JourneyStage = 'empty' | 'ready' | 'practice' | 'reflection' | 'complete' | 'paused' | 'stopped';
type ActiveStage = 'ready' | 'practice' | 'reflection';

function SessionSummary({ records, disabled = false }: { records: SessionCheckIn[]; disabled?: boolean }) {
  const latest = records.at(-1);
  const first = records[0];
  const change = latest && first ? latest.after - first.before : 0;
  const summaryRef = useRef<HTMLDivElement>(null);

  useContentTransition(summaryRef, `${records.length}:${latest?.id ?? 0}`, {
    duration: 380,
    distance: 6,
    disabled,
  });

  return (
    <div ref={summaryRef} className="motion-state-panel rounded-2xl border border-[#DCE5DB] bg-white p-5" data-testid="session-summary">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 text-base font-semibold text-[#063F32]"><TrendingUp size={18} /> Your demo session</h3>
        <span className="text-xs text-[#52645D]">Memory only</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div><p className="text-2xl font-semibold text-[#063F32]">{records.length}</p><p className="mt-1 text-xs text-[#52645D]">Reflection{records.length === 1 ? '' : 's'} completed</p></div>
        <div><p className="text-2xl font-semibold text-[#063F32]">{latest ? `${latest.confidence}/10` : '—'}</p><p className="mt-1 text-xs text-[#52645D]">Latest demo confidence</p></div>
      </div>
      {records.length > 0 ? (
        <>
          <div className="mt-5 border-t border-[#DCE5DB] pt-4">
            <p className="mb-3 text-xs font-semibold text-[#52645D]">Difficulty check-ins · before → after</p>
            <ol className="max-h-40 space-y-2 overflow-y-auto pr-1" aria-label="Session difficulty trend">
              {records.map((record, index) => (
                <li key={record.id} className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-[#52645D]">Practice {index + 1}</span>
                  <span className="font-medium text-[#063F32]">{record.before} → {record.after} / 10</span>
                </li>
              ))}
            </ol>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-[#52645D]">{change === 0 ? 'No net change' : `${Math.abs(change)} point${Math.abs(change) === 1 ? '' : 's'} ${change > 0 ? 'higher' : 'lower'}`} from the first check-in. These are your demo inputs, not a clinical outcome or evidence of benefit.</p>
        </>
      ) : <p className="mt-4 text-xs leading-relaxed text-[#52645D]">Complete a reflection to see your inputs here. Nothing is prefilled, sent, or retained after a refresh.</p>}
    </div>
  );
}

export function JourneyDemo() {
  const [goal, setGoal] = useState('');
  const [category, setCategory] = useState<FearCategory>('speaking');
  const [difficulty, setDifficulty] = useState(5);
  const [pace, setPace] = useState<JourneyPace>('Gentle');
  const [scenario, setScenario] = useState<DemoScenarioKey | undefined>();
  const [result, setResult] = useState<GeneratedJourney | null>(null);
  const [stage, setStage] = useState<JourneyStage>('empty');
  const [pausedFrom, setPausedFrom] = useState<ActiveStage>('ready');
  const [error, setError] = useState('');
  const [crisis, setCrisis] = useState(false);
  const [loading, setLoading] = useState(false);
  const [practiceDifficulty, setPracticeDifficulty] = useState(5);
  const [suggestion, setSuggestion] = useState('');
  const [suggestionReason, setSuggestionReason] = useState('');
  const [after, setAfter] = useState(4);
  const [confidence, setConfidence] = useState(5);
  const [experience, setExperience] = useState<SessionCheckIn['experience']>('Manageable');
  const [reflection, setReflection] = useState('');
  const [records, setRecords] = useState<SessionCheckIn[]>([]);
  const [suggestionRevision, setSuggestionRevision] = useState(0);
  const timer = useRef<number | undefined>(undefined);
  const resultRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const suggestionRef = useRef<HTMLDivElement>(null);
  const latest = records.at(-1);
  const nextSuggestion = result && latest ? nextStepFromFeedback(result, latest) : null;
  const active = stage === 'ready' || stage === 'practice' || stage === 'reflection';

  useContentTransition(contentRef, `${stage}:${result?.goal ?? ''}`, {
    duration: 380,
    distance: 10,
    disabled: crisis || Boolean(error),
  });
  useContentTransition(suggestionRef, suggestionRevision, {
    duration: 320,
    distance: 6,
    disabled: crisis,
  });

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function clearPractice() {
    window.clearTimeout(timer.current);
    setResult(null); setStage('empty'); setError(''); setCrisis(false); setLoading(false);
    setRecords([]); setReflection(''); setAfter(4); setConfidence(5); setExperience('Manageable');
  }

  function reset() {
    clearPractice();
    setGoal(''); setCategory('speaking'); setDifficulty(5); setPace('Gentle'); setScenario(undefined);
  }

  function chooseScenario(value: DemoScenarioKey) {
    const selected = demoScenarios.find((item) => item.value === value);
    if (!selected) return;
    clearPractice(); setScenario(value); setGoal(selected.label); setCategory(selected.category);
  }

  function generate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.clearTimeout(timer.current);
    setError(''); setCrisis(false); setLoading(false);
    if (containsCrisisLanguage(goal)) {
      setCrisis(true); setStage('stopped'); setResult(null); setReflection(''); setRecords([]); return;
    }
    if (goal.trim().length < 6) {
      clearPractice();
      setError('Describe a goal in at least 6 characters, or choose an example above.'); return;
    }
    setLoading(true);
    timer.current = window.setTimeout(() => {
      const journey = buildJourney(goal, category, difficulty, pace, scenario);
      setResult(journey); setPracticeDifficulty(difficulty); setAfter(difficulty);
      setSuggestion(journey.steps[difficulty >= 5 ? 0 : 1]); setSuggestionReason(journey.guidance);
      setReflection(''); setRecords([]); setStage('ready'); setLoading(false);
      resultRef.current?.focus({ preventScroll: true });
    }, 250);
  }

  function adapt() {
    if (!result) return;
    const updated = buildJourney(result.goal, result.category.value, practiceDifficulty, result.pace, result.scenario);
    setResult(updated); setSuggestion(updated.steps[practiceDifficulty >= 5 ? 0 : 1]);
    setSuggestionReason(`Adapted for your difficulty of ${practiceDifficulty}/10. ${updated.guidance}`);
    setAfter(practiceDifficulty);
    setSuggestionRevision((revision) => revision + 1);
  }

  function pause() {
    if (stage === 'ready' || stage === 'practice' || stage === 'reflection') {
      setPausedFrom(stage); setStage('paused');
    }
  }

  function stop() {
    setStage('stopped'); setReflection(''); setError('');
  }

  function completeReflection(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (containsCrisisLanguage(reflection)) {
      setCrisis(true); setStage('stopped'); setReflection(''); setResult(null); setRecords([]); return;
    }
    const record: SessionCheckIn = { id: Date.now(), before: practiceDifficulty, after, confidence, experience };
    setRecords((items) => [...items, record]); setReflection(''); setStage('complete'); setError('');
  }

  function tryNextStep() {
    if (!nextSuggestion || !latest) return;
    setSuggestion(nextSuggestion.activity); setSuggestionReason(nextSuggestion.reason);
    setPracticeDifficulty(latest.after); setAfter(latest.after); setExperience('Manageable'); setStage('ready');
  }

  return (
    <section className="section scroll-mt-28 bg-[#EDF4EC]" id="journey" aria-labelledby="journey-title">
      <div className="container">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div><p className="eyebrow">The working prototype</p><h2 id="journey-title" className="section-heading">A small step.<br />A thoughtful feedback loop.</h2></div>
          <p className="max-w-xl text-base leading-relaxed text-[#52645D]">Choose a goal, explore a suggestion, and reflect. See how your feedback can shape a next step—using transparent local rules, at your pace.</p>
        </div>

        <div className="mb-7 rounded-2xl border border-[#D0DDCE] bg-white/70 p-4 sm:p-5">
          <p className="mb-3 text-sm font-semibold text-[#063F32]">Start with an example, or make your own</p>
          <div className="grid gap-2 md:grid-cols-3">
            {demoScenarios.map((item, index) => (
              <button
                key={item.value} type="button" onClick={() => chooseScenario(item.value)}
                aria-pressed={scenario === item.value}
                className={`flex min-h-14 items-center gap-3 rounded-xl border p-3 text-left text-sm font-medium transition-colors ${scenario === item.value ? 'border-[#063F32] bg-[#EDF4EC] text-[#063F32]' : 'border-[#DCE5DB] bg-white text-[#52645D] hover:border-[#9DB7A6]'}`}
              >
                <span className="text-xs text-[#52645D]">0{index + 1}</span><span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[.85fr_1.15fr]">
          <div className="space-y-6">
            <form onSubmit={generate} noValidate className="rounded-[24px] border border-[#DCE5DB] bg-white p-5 sm:p-7" aria-label="Fear journey builder">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EDF4EC] text-[#063F32]"><Compass size={23} /></span>
                <div><h3 className="text-xl font-semibold text-[#10251F]">Begin with what matters</h3><p className="mt-1 text-xs text-[#52645D]">Use a fictional goal to explore.</p></div>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="field-label" htmlFor="journey-goal">What would you like to feel more confident doing?</label>
                  <input
                    id="journey-goal" className="field mt-2" value={goal} maxLength={180} required
                    onChange={(event) => { setGoal(event.target.value); setScenario(undefined); setError(''); }}
                    placeholder="e.g. Share an idea in a team meeting"
                    aria-describedby="journey-goal-hint journey-feedback" aria-invalid={Boolean(error)}
                  />
                  <p id="journey-goal-hint" className="mt-2 text-xs leading-relaxed text-[#52645D]">Please leave out medical history and identifying details.</p>
                </div>
                <div>
                  <label className="field-label" htmlFor="journey-category">Fear category</label>
                  <select id="journey-category" className="field mt-2" value={category} onChange={(event) => { setCategory(event.target.value as FearCategory); setScenario(undefined); }}>
                    {categories.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                  </select>
                </div>
                <RangeField id="journey-difficulty" label="Current difficulty" value={difficulty} onChange={setDifficulty} />
                <fieldset>
                  <legend className="field-label mb-3">Your preferred pace</legend>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Gentle', 'Balanced', 'Challenging'] as JourneyPace[]).map((item) => (
                      <label key={item} className={`relative flex min-h-11 cursor-pointer items-center justify-center rounded-xl border px-1 py-3 text-xs font-semibold ${pace === item ? 'border-[#063F32] bg-[#EDF4EC] text-[#063F32]' : 'border-[#DCE5DB] text-[#52645D]'}`}>
                        <input className="peer sr-only" type="radio" name="journey-pace" value={item} checked={pace === item} onChange={() => setPace(item)} />
                        <span className="pointer-events-none absolute inset-0 rounded-xl peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#063F32]" />{item}
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>
              <div id="journey-feedback" className="mt-4 min-h-12" aria-live="polite">
                {error && <p role="alert" className="rounded-xl border border-[#E5BDB2] bg-[#FFF3EE] p-3 text-sm text-[#8A3223]">{error}</p>}
                {!error && !crisis && <p className="text-xs leading-relaxed text-[#52645D]">You stay in control. You can make a step smaller, pause, or stop.</p>}
              </div>
              <button type="submit" disabled={loading} className="button mt-3 w-full justify-center">
                {loading ? 'Preparing your sample…' : 'Generate journey'}
                {loading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white motion-reduce:animate-none" aria-hidden="true" /> : <ArrowRight size={17} />}
              </button>
              <button className="mt-2 flex min-h-11 w-full items-center justify-center gap-2 text-sm font-semibold text-[#52645D] hover:text-[#063F32]" type="button" onClick={reset}><RotateCcw size={15} /> Start again / clear session</button>
              <p className="mt-2 flex items-start gap-2 text-xs leading-relaxed text-[#52645D]"><LockKeyhole size={14} className="mt-0.5" />Inputs remain in this page’s memory. Refreshing clears them. Nothing is sent or stored in your browser.</p>
            </form>
            <SessionSummary records={records} disabled={crisis} />
          </div>

          <div
            ref={resultRef} tabIndex={-1} className="min-h-[780px] rounded-[24px] border border-[#DCE5DB] bg-[#F7F8F2] p-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#063F32] sm:p-7"
            data-testid="journey-result" aria-label="Your sample journey" aria-busy={loading}
          >
            <JourneyProgress stage={stage} />
            <div className="min-h-12 py-3" aria-live="polite">
              <p className="text-xs leading-relaxed text-[#52645D]">{loading ? 'Selecting from predefined sample activities…' : stage === 'complete' ? 'Reflection completed. Your demo session has been updated.' : stage === 'paused' ? 'Practice paused. Resume only when you choose.' : stage === 'stopped' ? 'Practice stopped. No further action is required.' : 'Educational prototype. Not a substitute for professional care.'}</p>
            </div>

            <div ref={contentRef} className="motion-state-panel">
            {crisis ? <SafetyBoundary /> : result ? (
              <>
                <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#08754D]"><Sparkles size={14} /> Local personalization demo</span>
                <h3 className="text-2xl font-semibold leading-tight tracking-tight text-[#063F32]">{result.goal}</h3>
                <p className="mt-2 text-xs text-[#52645D]">{result.category.label} · {result.pace} pace</p>

                {stage === 'paused' || stage === 'stopped' ? (
                  <div className="mt-6 min-h-[420px] rounded-2xl border border-[#DCE5DB] bg-white p-6">
                    <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#EDF4EC] text-[#063F32]">{stage === 'paused' ? <Pause size={22} /> : <Square size={20} />}</span>
                    <h4 className="text-xl font-semibold text-[#063F32]">{stage === 'paused' ? 'There is room to pause.' : 'Your practice has stopped.'}</h4>
                    <p className="mt-3 text-base leading-relaxed text-[#52645D]">{stage === 'paused' ? 'Your place is kept in this page. There is no timer, score, or expectation to continue.' : 'No more practice is suggested here. Previous demo check-ins remain visible until you clear the session or refresh.'}</p>
                    {stage === 'paused' && <div className="mt-6 flex flex-wrap gap-3"><button type="button" className="button" onClick={() => setStage(pausedFrom)}><Play size={16} /> Resume practice</button><button type="button" className="button button-secondary" onClick={stop}><Square size={15} /> Stop practice</button></div>}
                    {stage === 'stopped' && <button type="button" className="button button-secondary mt-6" onClick={reset}><RotateCcw size={16} /> Clear and start again</button>}
                    <p className="mt-5 text-sm leading-relaxed text-[#52645D]">If distress is substantial or this activity does not feel suitable, talk with a qualified professional.</p>
                  </div>
                ) : stage === 'complete' && nextSuggestion ? (
                  <div className="mt-6 min-h-[420px] rounded-2xl border border-[#DCE5DB] bg-white p-5 sm:p-6">
                    <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#EDF4EC] text-[#08754D]"><CheckCircle2 size={24} /></span>
                    <h4 className="text-xl font-semibold text-[#063F32]">A reflection, not a score.</h4>
                    <p className="mt-3 text-base leading-relaxed text-[#52645D]">You completed one demo feedback loop. Progress can include learning that a step needs to be smaller.</p>
                    <div className="mt-5 rounded-xl bg-[#EDF4EC] p-4" data-testid="feedback-next-step">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[.08em] text-[#08754D]">An optional next suggestion</p>
                      <p className="text-base leading-relaxed text-[#063F32]">{nextSuggestion.activity}</p>
                      <p className="mt-3 text-sm leading-relaxed text-[#52645D]">{nextSuggestion.reason}</p>
                    </div>
                    <button type="button" className="button mt-5 w-full justify-center" onClick={tryNextStep}>Explore next sample step <ArrowRight size={16} /></button>
                    <button type="button" className="mt-2 min-h-11 w-full text-sm font-semibold text-[#52645D]" onClick={stop}>Finish for now</button>
                  </div>
                ) : (
                  <>
                    {stage !== 'reflection' ? (
                      <div className="mt-6 rounded-2xl border border-[#DCE5DB] bg-white p-5">
                        <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.08em] text-[#08754D]"><Compass size={15} /> {stage === 'practice' ? 'Your voluntary practice' : 'Your proposed first step'}</p>
                        <div ref={suggestionRef} className="motion-state-panel">
                          <p className="min-h-[72px] text-lg font-medium leading-relaxed text-[#063F32]" data-testid="practice-suggestion">{suggestion}</p>
                          <p className="mt-4 border-t border-[#DCE5DB] pt-4 text-sm leading-relaxed text-[#52645D]"><strong className="text-[#063F32]">Why this step? </strong>{suggestionReason}</p>
                        </div>
                        {stage === 'ready' ? (
                          <div className="mt-5">
                            <RangeField id="practice-difficulty" label="Make it fit your comfort" value={practiceDifficulty} onChange={setPracticeDifficulty} />
                            <button type="button" className="button button-secondary mt-4 w-full justify-center" onClick={adapt}>Adapt the difficulty <Sparkles size={16} /></button>
                            <button type="button" className="button mt-3 w-full justify-center" onClick={() => setStage('practice')}>Choose this practice <ArrowRight size={16} /></button>
                          </div>
                        ) : (
                          <>
                            <p className="mt-5 rounded-xl bg-[#FFF8E7] p-4 text-sm leading-relaxed text-[#6E5313]">{result.category.preparation} You can rehearse the interaction or imagine a fictional example. No real-world action is required.</p>
                            <button type="button" className="button mt-5 w-full justify-center" onClick={() => setStage('reflection')}>Continue to reflection <ArrowRight size={16} /></button>
                          </>
                        )}
                      </div>
                    ) : (
                      <form className="mt-6 rounded-2xl border border-[#DCE5DB] bg-white p-5" onSubmit={completeReflection} aria-label="Practice reflection">
                        <h4 className="mb-2 text-xl font-semibold text-[#063F32]">What did you notice?</h4>
                        <p className="mb-5 text-sm leading-relaxed text-[#52645D]">You can use fictional feedback. These inputs show how a next suggestion might adapt.</p>
                        <div className="space-y-5">
                          <RangeField id="reflection-difficulty" label="Difficulty after the sample" value={after} onChange={setAfter} />
                          <RangeField id="reflection-confidence" label="Confidence for a similar step" value={confidence} onChange={setConfidence} low="Not confident" high="Very confident" />
                          <div><label className="field-label" htmlFor="reflection-experience">How did the step feel?</label><select id="reflection-experience" className="field" value={experience} onChange={(event) => setExperience(event.target.value as SessionCheckIn['experience'])}><option>Manageable</option><option>Mixed</option><option>Too much</option></select></div>
                          <div><label className="field-label" htmlFor="journey-reflection">One thing you learned <span className="font-normal">(optional)</span></label><textarea id="journey-reflection" className="field min-h-24 resize-y" rows={3} maxLength={240} value={reflection} onChange={(event) => setReflection(event.target.value)} placeholder="e.g. A shorter first step felt more manageable." aria-describedby="reflection-privacy" /><p id="reflection-privacy" className="mt-2 text-xs leading-relaxed text-[#52645D]">Leave out personal or medical details. This note is discarded when you complete the reflection.</p></div>
                        </div>
                        <button type="submit" className="button mt-5 w-full justify-center">Complete reflection <Check size={17} /></button>
                      </form>
                    )}
                    {active && <div className="mt-3 grid grid-cols-2 gap-2"><button type="button" className="button button-secondary w-full justify-center" onClick={pause}><Pause size={15} /> Pause</button><button type="button" className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#DCE5DB] bg-white px-3 py-3 text-sm font-semibold text-[#52645D]" onClick={stop}><Square size={14} /> Stop practice</button></div>}
                  </>
                )}
                <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-[#52645D]"><HeartHandshake size={16} className="mt-0.5 shrink-0 text-[#08754D]" />{result.category.limitation} This is not an assessment or treatment plan.</p>
              </>
            ) : <JourneyEmptyState />}
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#D0DDCE] bg-white/70 p-5">
          <ShieldCheck size={20} className="mt-0.5 text-[#063F32]" />
          <p className="text-sm leading-relaxed text-[#52645D]"><strong className="text-[#063F32]">Your care comes first. </strong>This educational prototype uses predefined templates and a limited keyword check. It cannot assess individual suitability or risk, diagnose, provide crisis counseling, or replace professional care. For immediate danger, contact local emergency services or an appropriate crisis service.</p>
        </div>
      </div>
    </section>
  );
}

function JourneyProgress({ stage }: { stage: JourneyStage }) {
  const current = stage === 'empty' ? 0 : stage === 'ready' ? 1 : stage === 'practice' ? 2 : stage === 'reflection' ? 3 : stage === 'complete' ? 4 : -1;
  return (
    <ol className="grid grid-cols-5 gap-1" aria-label="Demo journey progress">
      {['Goal', 'Step', 'Practice', 'Reflect', 'Learn'].map((label, index) => (
        <li key={label} className="text-center" aria-current={current === index ? 'step' : undefined}>
          <span className={`journey-step-marker mb-2 block h-1.5 rounded-full ${index <= current ? 'bg-[#08754D]' : 'bg-[#DCE5DB]'}`} />
          <span className={`text-xs ${index === current ? 'font-semibold text-[#063F32]' : 'text-[#52645D]'}`}>{label}</span>
        </li>
      ))}
    </ol>
  );
}

function JourneyEmptyState() {
  return (
    <div className="flex min-h-[650px] flex-col items-center justify-center text-center">
      <div className="mb-8 flex h-32 w-32 items-center justify-center rounded-full border border-[#DCE5DB]">
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-[#EDF4EC] text-[#063F32]"><Feather size={38} strokeWidth={1.2} /></span>
      </div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[.12em] text-[#08754D]">Room for a smaller beginning</p>
      <h3 className="max-w-sm text-3xl font-semibold leading-tight tracking-tight text-[#063F32]">Your pace.<br />Your next possible step.</h3>
      <p className="mt-5 max-w-sm text-base leading-relaxed text-[#52645D]">Choose an example or enter a fictional goal. Your suggestion, practice, and reflection will unfold here.</p>
      <span className="mt-7 inline-flex items-center gap-2 text-sm text-[#52645D]"><LockKeyhole size={15} /> No account. No live AI. No saved data.</span>
    </div>
  );
}

function SafetyBoundary() {
  return (
    <div className="mt-5 min-h-[600px] rounded-2xl border border-[#E5BDB2] bg-[#FFF3EE] p-5" role="alert">
      <ShieldCheck size={28} className="mb-5 text-[#8A3223]" />
      <h3 className="mb-4 text-2xl font-semibold text-[#8A3223]">This needs support beyond a demo.</h3>
      <p className="text-base leading-relaxed text-[#8A3223]">{crisisMessage}</p>
      <p className="mt-4 text-sm leading-relaxed text-[#80554B]">Practice has stopped. No journey or reflection is generated from this text. The prototype cannot assess risk or provide crisis counseling.</p>
    </div>
  );
}

export function SampleJourney() {
  const [active, setActive] = useState(1);
  const [completed, setCompleted] = useState<number[]>([0]);
  const current = speakingJourney[active];
  const complete = completed.includes(active);
  const panelRef = useRef<HTMLDivElement>(null);

  useContentTransition(panelRef, active, { duration: 360, distance: 8 });

  function toggleCompletion() {
    setCompleted((items) => items.includes(active) ? items.filter((item) => item !== active) : [...items, active]);
  }

  return (
    <section className="section scroll-mt-28 bg-white" id="sample-journey" aria-labelledby="sample-title">
      <div className="container">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div><p className="eyebrow">An illustrative pathway</p><h2 id="sample-title" className="section-heading">Confidence has<br />more than one step.</h2></div>
          <p className="max-w-xl text-base leading-relaxed text-[#52645D]">Explore a public-speaking example. The sequence and ratings are illustrative; individual suitability needs qualified review.</p>
        </div>
        <div className="grid overflow-hidden rounded-[26px] border border-[#DCE5DB] lg:grid-cols-[.85fr_1.15fr]">
          <div className="bg-[#EDF4EC] p-5 sm:p-7">
            <div className="mb-6 flex items-center justify-between gap-3"><h3 className="text-lg font-semibold text-[#063F32]">Finding your voice</h3><span className="text-xs text-[#52645D]">{completed.length} / 5 demo steps</span></div>
            <div role="tablist" aria-label="Illustrative public-speaking steps" aria-orientation="vertical" className="space-y-2">
              {speakingJourney.map((step, index) => (
                <button
                  key={step.title} id={`sample-step-${index}`} role="tab" type="button"
                  aria-selected={active === index} aria-controls="sample-step-panel" tabIndex={active === index ? 0 : -1}
                  onClick={() => setActive(index)}
                  onKeyDown={(event) => {
                    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
                    event.preventDefault();
                    const next = event.key === 'Home' ? 0 : event.key === 'End' ? 4 : (index + (event.key === 'ArrowDown' ? 1 : -1) + 5) % 5;
                    setActive(next); document.getElementById(`sample-step-${next}`)?.focus();
                  }}
                  className={`flex min-h-16 w-full items-center gap-3 rounded-xl border p-3.5 text-left ${active === index ? 'border-[#DCE5DB] bg-white shadow-sm' : 'border-transparent hover:bg-white/60'}`}
                >
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${completed.includes(index) ? 'bg-[#063F32] text-white' : active === index ? 'bg-[#E8B93F] text-[#063F32]' : 'border border-[#C5D5C2] text-[#52645D]'}`}>
                    {completed.includes(index) ? <Check size={16} /> : String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={`flex-1 text-base font-medium ${active === index ? 'text-[#063F32]' : 'text-[#52645D]'}`}>{step.title}</span>
                  {active === index && <ChevronRight size={17} className="text-[#08754D]" />}
                </button>
              ))}
            </div>
            <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-[#52645D]"><ShieldCheck size={16} className="mt-0.5" />Completion and confidence values here are illustrative. Clicks only change this example.</p>
          </div>
          <div ref={panelRef} id="sample-step-panel" role="tabpanel" aria-labelledby={`sample-step-${active}`} tabIndex={0} className="motion-state-panel min-h-[640px] bg-white p-5 sm:p-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-[.1em] text-[#08754D]">Step {active + 1} · Illustrative activity</span>
              <span className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${complete ? 'bg-[#EDF4EC] text-[#063F32]' : 'bg-[#F7F8F2] text-[#52645D]'}`}>
                {complete ? <CheckCircle2 size={14} /> : <Circle size={13} />}{complete ? 'Demo completed' : 'Ready to explore'}
              </span>
            </div>
            <h3 className="mb-6 text-2xl font-semibold tracking-tight text-[#063F32]">{current.title}</h3>
            <div className="min-h-[310px] space-y-5">
              {[{ label: 'Prepare', text: current.preparation, Icon: Leaf }, { label: 'Practice', text: current.activity, Icon: Compass }, { label: 'Reflect', text: current.reflection, Icon: Lightbulb }].map(({ label, text, Icon }) => (
                <div key={label} className="flex gap-3"><span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EDF4EC] text-[#08754D]"><Icon size={17} /></span><div><h4 className="mb-1 text-sm font-semibold text-[#10251F]">{label}</h4><p className="text-base leading-relaxed text-[#52645D]">{text}</p></div></div>
              ))}
            </div>
            <div className="mt-6 grid gap-4 border-t border-[#DCE5DB] pt-5 sm:grid-cols-2">
              {[{ label: 'Example difficulty', value: current.difficulty, color: '#A17B14' }, { label: 'Example confidence', value: current.confidence, color: '#08754D' }].map((metric) => (
                <div key={metric.label}><p className="mb-2 text-xs text-[#52645D]">{metric.label}</p><div className="flex items-center gap-2"><span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#EDF4EC]"><span className="motion-progress block h-full rounded-full" style={{ width: `${metric.value * 10}%`, backgroundColor: metric.color }} /></span><span className="text-sm font-semibold text-[#10251F]">{metric.value}/10</span></div></div>
              ))}
            </div>
            <button type="button" onClick={toggleCompletion} className="button button-secondary mt-6 w-full justify-center" aria-pressed={complete}>
              {complete ? <RotateCcw size={16} /> : <CheckCheck size={17} />}{complete ? 'Undo demo completion' : 'Mark demo step complete'}
            </button>
            <p className="mt-3 text-center text-xs text-[#52645D]">No real activity is recorded and no data leaves this page.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
