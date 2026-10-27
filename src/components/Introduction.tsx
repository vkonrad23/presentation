import { ArrowDown, ArrowRight, ArrowUpRight, BookOpen, ChartNoAxesCombined, Heart, Layers, Map, MoveUpRight, Repeat2, Route, ShieldCheck, SlidersHorizontal, Sparkles, Users, Waypoints } from 'lucide-react';
import { capabilities, problemCards, processSteps, trustPrinciples } from '../data/content';
import { ProductDemo } from './JourneyExperience';

const trustIcons = { book: BookOpen, heart: Heart, shield: ShieldCheck };
const problemIcons = { loop: Repeat2, distance: Waypoints, layers: Layers };
const capabilityIcons = { map: Map, route: Route, sliders: SlidersHorizontal, chart: ChartNoAxesCombined, people: Users };

export function Hero() {
  return <section className="hero" aria-labelledby="hero-title">
    <div className="container hero-grid">
      <div className="hero-copy">
        <div className="hero-badge"><span className="status-dot" /> A little courage. A clearer path.</div>
        <h1 id="hero-title">Face fear<br />one <span className="highlight-word">manageable<svg viewBox="0 0 400 18" preserveAspectRatio="none" aria-hidden="true"><path d="M3 12C95 1 217 1 396 8" stroke="#F7C948" strokeWidth="10" fill="none" strokeLinecap="round" /></svg></span><br />step at a time.</h1>
        <p className="hero-description">Big feelings don’t need bigger leaps. FearlessU turns fear-related goals into personalized, CBT-informed journeys — with small steps, thoughtful reflection, and room to move at your pace.</p>
        <div className="hero-actions"><a className="button" href="#journey">Explore the fear journey <ArrowUpRight size={18} aria-hidden="true" /></a><a className="hero-secondary" href="#accelerator">View accelerator case <ArrowRight size={16} aria-hidden="true" /></a></div>
        <p className="hero-prototype"><Sparkles size={13} aria-hidden="true" />Early-stage concept. Real care in how we build it.</p>
      </div>
      <div className="hero-product"><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><span className="hero-flower" aria-hidden="true">✳</span><ProductDemo /><div className="hero-handnote" aria-hidden="true">Small steps.<br /><span>New possibilities.</span><svg viewBox="0 0 78 30"><path d="M2 5c24 22 43 26 71 2m-2 0-14 1m14-1-2 14" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg></div></div>
    </div>
    <div className="container"><div className="trust-strip">{trustPrinciples.map(item => { const Icon = trustIcons[item.icon]; return <div className="trust-item" key={item.title}><span className="trust-icon"><Icon size={21} strokeWidth={1.5} aria-hidden="true" /></span><div><strong>{item.title}</strong><span>{item.detail}</span></div></div>; })}<a className="trust-link" href="#safety">Our responsibility <ArrowDown size={15} aria-hidden="true" /></a></div></div>
  </section>;
}

export function ProblemSection() {
  return <section id="problem" className="section bg-white" aria-labelledby="problem-title"><div className="container">
    <div className="section-intro"><div><p className="eyebrow">The space between knowing and doing</p><h2 className="section-heading" id="problem-title">When fear makes<br />your world feel smaller.</h2></div><p className="section-description">Recognizing a fear is one thing. Finding a manageable way forward is another. People need a structured bridge between the two.</p></div>
    <div className="problem-grid">{problemCards.map((item, index) => { const Icon = problemIcons[item.icon]; return <article className="problem-card" key={item.title}><div className="flex items-center justify-between"><span className="feature-icon"><Icon size={24} strokeWidth={1.5} aria-hidden="true" /></span><span className="card-index">0{index + 1}</span></div><h3>{item.title}</h3><p>{item.text}</p></article>; })}</div>
    <div className="cycle-panel"><div><p className="eyebrow">A pattern we can begin to understand</p><ol className="flow-list">{['Trigger', 'Fear response', 'Avoidance', 'Short-term relief', 'Stronger fear cycle'].map((step, i) => <li key={step}><span>{step}</span>{i < 4 && <ArrowRight size={14} aria-hidden="true" />}</li>)}</ol></div><div className="new-cycle"><div className="flex items-center gap-2"><Sparkles size={15} aria-hidden="true" /><p>A different path, by design</p></div><ol className="flow-list">{['Understand', 'Prepare', 'Practice gradually', 'Reflect', 'Adapt'].map((step, i) => <li key={step}><span>{step}</span>{i < 4 && <ArrowRight size={14} aria-hidden="true" />}</li>)}</ol></div></div>
  </div></section>;
}

export function SolutionSection() {
  return <section id="product" className="section" aria-labelledby="solution-title"><div className="container"><div className="mx-auto mb-12 max-w-2xl text-center"><p className="eyebrow">A thoughtful companion for the next step</p><h2 className="section-heading" id="solution-title">Personal to you.<br />Grounded in a framework.</h2><p className="mt-5 text-base leading-relaxed text-[#607067]">A proposed experience that connects self-understanding with gradual practice. The aim is to support everyday skills, alongside the people and care you need.</p></div><div className="capability-grid">{capabilities.map((item, i) => { const Icon = capabilityIcons[item.icon]; return <article key={item.title} className={`capability-card ${i === 0 ? 'capability-featured' : ''}`}><div className="flex items-center justify-between gap-3"><span className="feature-icon"><Icon size={23} strokeWidth={1.5} aria-hidden="true" /></span><span className="text-[10px] font-bold uppercase tracking-[.14em]">Designed capability</span></div><p className="capability-label">{item.label}</p><h3>{item.title}</h3><p className="capability-text">{item.text}</p><div className="capability-example"><span>In everyday life</span><p>{item.example}</p></div><p className="capability-limit"><ShieldCheck size={13} className="shrink-0" aria-hidden="true" />{item.limit}</p></article>; })}<a href="#journey" className="capability-invitation"><span className="invitation-icon"><MoveUpRight size={34} strokeWidth={1.2} aria-hidden="true" /></span><p>You don’t have to see<br />the whole staircase.</p><span>Try one small step <ArrowRight size={17} aria-hidden="true" /></span></a></div></div></section>;
}

export function HowItWorks() {
  return <section className="section bg-white" id="how-it-works" aria-labelledby="how-title"><div className="container"><div className="section-intro"><div><p className="eyebrow">A journey, at your pace</p><h2 className="section-heading" id="how-title">Five moments.<br />One manageable loop.</h2></div><p className="section-description">Each step helps you notice, prepare, and learn. Participation stays optional. You can pause, change your pace, or seek support at any point.</p></div><ol className="process-grid">{processSteps.map((step, i) => <li key={step.title}><span className="process-number">0{i + 1}</span><h3>{step.title}</h3><p>{step.detail}</p></li>)}</ol><p className="mt-8 text-xs text-[#607067]">Proposed product workflow. Activities are educational examples and require individual suitability checks.</p></div></section>;
}
