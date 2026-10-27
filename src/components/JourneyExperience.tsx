import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowDown, ArrowRight, Check, CheckCheck, CheckCircle2, ChevronRight, Circle, Compass, Feather, HeartHandshake, Leaf, Lightbulb, LockKeyhole, RotateCcw, ShieldCheck, Sparkles, Wind } from 'lucide-react';
import { buildJourney, categories, containsCrisisLanguage, crisisMessage, speakingJourney, type FearCategory, type GeneratedJourney, type JourneyPace } from '../data/demoJourneys';

const heroRecommendations = [
  { title: 'A little room to begin.', practice: 'Take five quiet minutes to notice your breathing and the room around you, if comfortable.', challenge: 'Prepare one sentence you might share with a small group. Trying it is optional.', reflection: 'What might help me feel supported as I begin?' },
  { title: 'Make the next step smaller.', practice: 'Try a gentle five-minute grounding pause: notice your feet on the floor and a few things you can see.', challenge: 'Rehearse a short introduction privately. No sharing is needed today.', reflection: 'What feels manageable, and what support would help?' },
  { title: 'Preparation is progress, too.', practice: 'Pause the challenge. If it feels helpful, orient to your surroundings at your own pace.', challenge: 'Keep this step as reflection only. Consider discussing this goal with a qualified professional.', reflection: 'Who could I reach out to for support?' },
];

export function ProductDemo() {
  const [anxiety, setAnxiety] = useState(4);
  const [adaptedAnxiety, setAdaptedAnxiety] = useState(4);
  const [adaptations, setAdaptations] = useState(0);
  const recommendation = heroRecommendations[adaptedAnxiety >= 8 ? 2 : adaptedAnxiety >= 5 ? 1 : 0];

  return <div className="relative mx-auto w-full max-w-[470px]" data-testid="product-demo">
    <div className="pointer-events-none absolute -right-6 -top-8 h-36 w-36 rounded-full bg-[#F7C948]/25 blur-2xl" />
    <div className="relative rounded-[28px] border border-[#DDE9E1] bg-white p-5 shadow-[0_28px_75px_-34px_rgba(11,61,46,0.35)] sm:p-7">
      <div className="mb-6 flex items-center justify-between gap-3 border-b border-[#EAF0E9] pb-5">
        <div className="flex items-center gap-2.5"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8F5ED] text-[#0B3D2E]"><Leaf size={20} /></span><span className="font-semibold text-[#0B3D2E]">Your daily space</span></div>
        <span className="rounded-full bg-[#FFF4C7] px-3 py-1 text-[10px] font-bold uppercase tracking-[.13em] text-[#685116]">Prototype</span>
      </div>
      <div className="mb-5 flex items-center justify-between gap-3"><div><p className="mb-1 text-xs text-[#607067]">A small step, chosen by you</p><h2 className="text-xl font-semibold tracking-tight text-[#14241D]">Today’s Fear Journey</h2></div><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F4F8F2] text-[#08764E]"><Sparkles size={18} /></div></div>
      <div className="mb-5 rounded-2xl bg-[#F6F9F3] p-4"><p className="mb-1 text-[10px] font-bold uppercase tracking-[.15em] text-[#607067]">Your current goal</p><p className="text-sm font-semibold text-[#0B3D2E]">Speak confidently in a small group</p><div className="mt-4 flex items-center gap-2"><span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#DDE9E1]"><span className="block h-full w-2/5 rounded-full bg-[#13A36D]" /></span><span className="text-[10px] text-[#607067]">Step 2 of 5 · illustrative</span></div></div>
      <div className="mb-5"><div className="mb-3 flex items-center justify-between"><label htmlFor="hero-anxiety" className="text-xs font-semibold text-[#14241D]">How does it feel right now?</label><output htmlFor="hero-anxiety" className="rounded-lg bg-[#E8F5ED] px-2 py-1 text-xs font-bold text-[#0B3D2E]">{anxiety}<span className="font-normal text-[#607067]"> / 10</span></output></div><input id="hero-anxiety" data-testid="hero-anxiety" className="w-full accent-[#13A36D]" type="range" min={0} max={10} value={anxiety} onChange={(event) => setAnxiety(Number(event.target.value))} /><div className="mt-1 flex justify-between text-[10px] text-[#607067]"><span>Comfortable</span><span>Very difficult</span></div></div>
      <div aria-live="polite" aria-atomic="true" className="space-y-3" data-testid="hero-recommendation">
        <div className="flex gap-3 rounded-2xl border border-[#DDE9E1] p-3.5"><Wind className="mt-0.5 shrink-0 text-[#08764E]" size={18} /><div><p className="mb-1 text-xs font-semibold">{adaptedAnxiety >= 8 ? 'Pause & orient' : '5-minute preparation'}</p><p className="text-xs leading-relaxed text-[#607067]">{recommendation.practice}</p></div></div>
        <div className="flex gap-3 rounded-2xl border border-[#E9DFC0] bg-[#FFFCF0] p-3.5"><Compass className="mt-0.5 shrink-0 text-[#806218]" size={18} /><div><p className="mb-1 text-xs font-semibold">{recommendation.title}</p><p className="text-xs leading-relaxed text-[#607067]">{recommendation.challenge}</p></div></div>
        <p className="flex gap-2 px-1 text-xs leading-relaxed text-[#607067]"><Lightbulb size={15} className="mt-0.5 shrink-0 text-[#94721B]" />{recommendation.reflection}</p>
        {adaptations > 0 && <p className="text-xs text-[#0B3D2E]" role="status">Updated for your check-in of {adaptedAnxiety}/10 using local rules.</p>}
      </div>
      <button className="button mt-5 w-full justify-center" type="button" onClick={() => { setAdaptedAnxiety(anxiety); setAdaptations((count) => count + 1); }}>Adapt next step <ArrowRight size={16} /></button>
      <p className="mt-3 text-center text-[10px] leading-relaxed text-[#607067]">Interactive prototype. Not medical advice.<br />Local demonstration · no live AI · nothing is saved</p>
    </div>
    <div className="absolute -bottom-5 -left-4 hidden items-center gap-2.5 rounded-2xl border border-[#E6ECDC] bg-white px-4 py-3 shadow-lg sm:flex"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFF4C7] text-[#0B3D2E]"><Check size={17} /></span><div><p className="text-[10px] text-[#607067]">Your pace. Your choice.</p><p className="text-xs font-semibold text-[#0B3D2E]">Small steps count.</p></div></div>
  </div>;
}

export function JourneyDemo() {
  const [goal, setGoal] = useState('');
  const [category, setCategory] = useState<FearCategory>('speaking');
  const [difficulty, setDifficulty] = useState(5);
  const [pace, setPace] = useState<JourneyPace>('Gentle');
  const [result, setResult] = useState<GeneratedJourney | null>(null);
  const [error, setError] = useState('');
  const [crisis, setCrisis] = useState(false);
  const [loading, setLoading] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const resultRef = useRef<HTMLDivElement>(null);
  useEffect(() => () => { window.clearTimeout(timer.current); }, []);

  function reset() {
    window.clearTimeout(timer.current);
    setLoading(false); setResult(null); setError(''); setCrisis(false);
    setGoal(''); setCategory('speaking'); setDifficulty(5); setPace('Gentle');
  }

  function generate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.clearTimeout(timer.current);
    setResult(null); setError(''); setCrisis(false); setLoading(false);
    if (containsCrisisLanguage(goal)) { setCrisis(true); return; }
    if (goal.trim().length < 6) { setError('Describe a goal in at least 6 characters so the sample has a clear focus.'); return; }
    setLoading(true);
    timer.current = window.setTimeout(() => {
      setResult(buildJourney(goal, category, difficulty, pace));
      setLoading(false);
      window.setTimeout(() => resultRef.current?.focus(), 0);
    }, 350);
  }

  return <section className="section scroll-mt-28 bg-[#EFF5EB]" id="journey" aria-labelledby="journey-title">
    <div className="container">
      <div className="mx-auto mb-10 max-w-2xl text-center"><p className="eyebrow justify-center"><Sparkles size={14} /> Try a small beginning</p><h2 id="journey-title" className="section-heading">A goal that matters.<br /><span className="text-[#08764E]">A next step that fits.</span></h2><p className="muted mt-4">Explore a sample journey shaped around your preferences. No account, no live AI, and no personal information needed.</p></div>
      <div className="grid gap-6 lg:grid-cols-[1fr_1.03fr]">
        <form onSubmit={generate} noValidate className="rounded-[24px] border border-[#DDE9E1] bg-white p-6 sm:p-8" aria-label="Fear journey builder">
          <div className="mb-7 flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5ED] text-[#0B3D2E]"><Compass size={20} /></span><div><h3 className="text-lg font-semibold">Make it your journey</h3><p className="text-xs text-[#607067]">Use a fictional goal to explore the prototype.</p></div></div>
          <div className="space-y-6">
            <div><label className="field-label" htmlFor="journey-goal">What would you like to feel more confident doing?</label><input id="journey-goal" className="field mt-2 w-full" value={goal} maxLength={180} onChange={(event) => { setGoal(event.target.value); setError(''); }} placeholder="e.g. Share an idea in a team meeting" aria-describedby="journey-goal-hint journey-feedback" aria-invalid={Boolean(error)} required /><p id="journey-goal-hint" className="mt-2 text-xs leading-relaxed text-[#607067]">Please do not enter medical history or identifying details.</p></div>
            <div><label className="field-label" htmlFor="journey-category">Fear category</label><select id="journey-category" className="field mt-2 w-full" value={category} onChange={(event) => setCategory(event.target.value as FearCategory)}>{categories.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></div>
            <div><div className="mb-3 flex items-center justify-between"><label className="field-label" htmlFor="journey-difficulty">Current difficulty</label><output htmlFor="journey-difficulty" className="rounded-full bg-[#E8F5ED] px-3 py-1 text-xs font-semibold text-[#0B3D2E]">{difficulty} / 10</output></div><input id="journey-difficulty" className="w-full accent-[#13A36D]" type="range" min={0} max={10} value={difficulty} onChange={(event) => setDifficulty(Number(event.target.value))} /><div className="mt-1 flex justify-between text-xs text-[#607067]"><span>Comfortable</span><span>Very difficult</span></div></div>
            <fieldset><legend className="field-label mb-3">Your preferred pace</legend><div className="grid grid-cols-3 gap-2">{(['Gentle', 'Balanced', 'Challenging'] as JourneyPace[]).map((item) => <label key={item} className={`relative cursor-pointer rounded-xl border px-1 py-3 text-center text-xs font-semibold transition-colors ${pace === item ? 'border-[#0B3D2E] bg-[#E8F5ED] text-[#0B3D2E]' : 'border-[#DDE9E1] bg-white text-[#607067]'}`}><input className="peer sr-only" type="radio" name="journey-pace" value={item} checked={pace === item} onChange={() => setPace(item)} /><span className="pointer-events-none absolute inset-0 rounded-xl peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#0B3D2E]" />{item}</label>)}</div></fieldset>
          </div>
          <div id="journey-feedback" className="mt-5" aria-live="polite">{error && <p role="alert" className="rounded-xl border border-[#E8BDB4] bg-[#FFF3EE] p-3 text-sm text-[#8C3325]">{error}</p>}{crisis && <div role="alert" className="rounded-xl border border-[#E8BDB4] bg-[#FFF3EE] p-4"><p className="text-sm font-semibold leading-relaxed text-[#8C3325]">{crisisMessage}</p><p className="mt-2 text-xs leading-relaxed text-[#80554B]">No journey has been generated. This demo cannot assess risk or provide crisis counseling.</p></div>}</div>
          <button type="submit" disabled={loading} className="button mt-5 w-full justify-center disabled:cursor-wait disabled:opacity-70">{loading ? 'Preparing your sample…' : 'Generate journey'}{loading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white motion-reduce:animate-none" aria-hidden="true" /> : <ArrowRight size={17} />}</button>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-[#607067]"><LockKeyhole size={11} /> Your inputs stay in this page and disappear when refreshed.</p>
        </form>
        <div ref={resultRef} tabIndex={-1} className="rounded-[24px] border border-[#DDE9E1] bg-[#FAFCF8] p-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B3D2E] sm:p-8" data-testid="journey-result" aria-label="Your sample journey" aria-busy={loading}>
          {result ? <>
            <div className="mb-5 flex items-start justify-between gap-3"><div><span className="badge mb-3 inline-flex items-center gap-1.5"><CheckCircle2 size={12} /> Illustrative journey</span><h3 className="text-2xl font-semibold leading-tight tracking-tight text-[#0B3D2E]">{result.goal}</h3><p className="mt-2 text-xs text-[#607067]">{result.category.label} · {result.pace} pace · Difficulty {result.difficulty}/10</p></div><span className="rounded-full bg-[#FFF4C7] p-2.5 text-[#0B3D2E]"><Feather size={20} /></span></div>
            <p className="mb-5 rounded-xl bg-[#EAF2E5] p-3 text-xs leading-relaxed text-[#36543B]">{result.guidance}</p>
            <p className="mb-4 text-xs leading-relaxed text-[#607067]"><strong className="text-[#14241D]">Before you begin:</strong> {result.category.preparation}</p>
            <ol className="space-y-3">{result.steps.map((step, index) => <li key={step} className="flex gap-3 rounded-xl border border-[#E3EBDD] bg-white p-4"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8F5ED] text-xs font-semibold text-[#0B3D2E]">{index + 1}</span><p className="pt-1 text-sm leading-relaxed text-[#32483B]">{step}</p></li>)}</ol>
            <div className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-[#607067]"><HeartHandshake className="mt-0.5 shrink-0 text-[#08764E]" size={17} /><p>{result.category.limitation} You can pause or stop at any time. This is a template, not an assessment or treatment plan.</p></div>
            <button className="button button-secondary mt-5 w-full justify-center" type="button" onClick={reset}><RotateCcw size={15} /> Start again</button>
          </> : <div className="flex h-full min-h-[450px] flex-col items-center justify-center text-center">
            <div className="relative mb-8 flex h-32 w-32 items-center justify-center rounded-full border border-[#DBE7D4]"><span className="absolute inset-3 rounded-full border border-[#E0EBD9]" /><span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF4C7] text-[#0B3D2E]"><Feather size={32} strokeWidth={1.3} /></span><span className="absolute -right-1 top-5 rounded-full bg-white p-2 shadow-sm"><Leaf size={15} className="text-[#08764E]" /></span></div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#08764E]">There is no perfect first step</p><h3 className="max-w-xs text-3xl font-semibold leading-tight tracking-tight text-[#0B3D2E]">Just one that feels<br />possible today.</h3><p className="mt-4 max-w-xs text-sm leading-relaxed text-[#607067]">Your sample will appear here. Start with a goal, choose a pace, and explore a gentler way forward.</p><span className="mt-8 flex items-center gap-2 text-xs text-[#607067]"><ArrowDown size={14} className="lg:-rotate-90" /> Begin with the form</span>
          </div>}
        </div>
      </div>
      <p className="mx-auto mt-5 max-w-3xl text-center text-xs leading-relaxed text-[#607067]">Educational prototype with predefined local templates and a limited keyword safety check. It cannot determine individual suitability, assess risk, or replace professional guidance.</p>
    </div>
  </section>;
}

export function SampleJourney() {
  const [active, setActive] = useState(1);
  const [completed, setCompleted] = useState<number[]>([0]);
  const current = speakingJourney[active];
  const complete = completed.includes(active);
  function select(index: number) { setActive(index); }
  function toggle() { setCompleted((items) => items.includes(active) ? items.filter((item) => item !== active) : [...items, active]); }

  return <section className="section scroll-mt-28 bg-white" id="sample-journey" aria-labelledby="sample-title">
    <div className="container">
      <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div className="max-w-xl"><p className="eyebrow"><Compass size={14} /> The journey, made tangible</p><h2 id="sample-title" className="section-heading">Confidence has<br />more than one step.</h2></div><p className="max-w-sm text-sm leading-relaxed text-[#607067]">Explore an illustrative public-speaking journey. The order and activities are examples; individual suitability needs qualified review.</p></div>
      <div className="grid overflow-hidden rounded-[26px] border border-[#DDE9E1] lg:grid-cols-[.85fr_1.15fr]">
        <div className="bg-[#F4F8F0] p-5 sm:p-7"><div className="mb-6 flex items-center justify-between"><h3 className="text-sm font-semibold text-[#0B3D2E]">Finding your voice</h3><span className="text-xs text-[#607067]">{completed.length} / 5 demo steps</span></div><div role="tablist" aria-label="Illustrative public-speaking steps" aria-orientation="vertical" className="space-y-2">{speakingJourney.map((step, index) => <button key={step.title} id={`sample-step-${index}`} role="tab" type="button" aria-selected={active === index} aria-controls="sample-step-panel" tabIndex={active === index ? 0 : -1} onClick={() => select(index)} onKeyDown={(event) => { if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Home' || event.key === 'End') { event.preventDefault(); const next = event.key === 'Home' ? 0 : event.key === 'End' ? 4 : (index + (event.key === 'ArrowDown' ? 1 : -1) + 5) % 5; select(next); document.getElementById(`sample-step-${next}`)?.focus(); } }} className={`flex w-full items-center gap-3 rounded-xl border p-3.5 text-left transition-colors ${active === index ? 'border-[#DDE9E1] bg-white shadow-sm' : 'border-transparent hover:bg-white/60'}`}><span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${completed.includes(index) ? 'bg-[#0B3D2E] text-white' : active === index ? 'bg-[#FFF4C7] text-[#0B3D2E]' : 'border border-[#D4E0CD] text-[#607067]'}`}>{completed.includes(index) ? <Check size={15} /> : String(index + 1).padStart(2, '0')}</span><span className={`flex-1 text-sm font-medium ${active === index ? 'text-[#0B3D2E]' : 'text-[#607067]'}`}>{step.title}</span>{active === index && <ChevronRight size={16} className="shrink-0 text-[#08764E]" />}</button>)}</div><p className="mt-6 flex items-start gap-2 text-[11px] leading-relaxed text-[#607067]"><ShieldCheck size={15} className="mt-0.5 shrink-0" />All completion and confidence values are illustrative. Your clicks change this demo only.</p></div>
        <div id="sample-step-panel" role="tabpanel" aria-labelledby={`sample-step-${active}`} tabIndex={0} className="bg-white p-6 sm:p-9">
          <div className="mb-5 flex items-center justify-between gap-2"><span className="text-[10px] font-bold uppercase tracking-[.18em] text-[#08764E]">Step {active + 1} · Illustrative activity</span><span className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${complete ? 'bg-[#E8F5ED] text-[#0B3D2E]' : 'bg-[#F4F7F1] text-[#607067]'}`}>{complete ? <CheckCircle2 size={12} /> : <Circle size={11} />}{complete ? 'Demo completed' : 'Ready to explore'}</span></div>
          <h3 className="mb-6 text-2xl font-semibold tracking-tight text-[#0B3D2E]">{current.title}</h3>
          <div className="space-y-5">{[{ label: 'Prepare', text: current.preparation, Icon: Leaf }, { label: 'Practice', text: current.activity, Icon: Compass }, { label: 'Reflect', text: current.reflection, Icon: Lightbulb }].map(({ label, text, Icon }) => <div key={label} className="flex gap-3"><span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#F2F7EE] text-[#08764E]"><Icon size={15} /></span><div><h4 className="mb-1 text-xs font-semibold text-[#14241D]">{label}</h4><p className="text-sm leading-relaxed text-[#607067]">{text}</p></div></div>)}</div>
          <div className="mt-7 grid grid-cols-2 gap-4 border-t border-[#E9EFE5] pt-5"><div><p className="mb-2 text-[10px] text-[#607067]">Example self-reported difficulty</p><div className="flex items-center gap-2"><span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#EEF2E9]"><span className="block h-full rounded-full bg-[#D9B74D]" style={{ width: `${current.difficulty * 10}%` }} /></span><span className="text-xs font-semibold text-[#14241D]">{current.difficulty}/10</span></div></div><div><p className="mb-2 text-[10px] text-[#607067]">Example confidence</p><div className="flex items-center gap-2"><span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#EEF2E9]"><span className="block h-full rounded-full bg-[#13A36D]" style={{ width: `${current.confidence * 10}%` }} /></span><span className="text-xs font-semibold text-[#14241D]">{current.confidence}/10</span></div></div></div>
          <button type="button" onClick={toggle} className="button button-secondary mt-6 w-full justify-center" aria-pressed={complete}>{complete ? <RotateCcw size={15} /> : <CheckCheck size={16} />}{complete ? 'Undo demo completion' : 'Mark demo step complete'}</button>
          <p className="mt-3 text-center text-[10px] text-[#607067]">Clicking records no real activity and sends no data.</p>
        </div>
      </div>
    </div>
  </section>;
}
