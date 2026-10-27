import { ArrowRight, ArrowUpRight, Building2, Check, Compass, GraduationCap, HeartHandshake, Lightbulb, ShieldCheck, Sparkles, Sprout, UserRound, UsersRound } from 'lucide-react';
import {
  acquisitionFunnel, acceleratorGoals, acceleratorSupport, advisorRoles, applicationSnapshot,
  audiences, businessModels, collaborationAreas, comparisonCategories, comparisonDimensions,
  developmentMilestones, fearlessCapabilities, founder, marketPhases, whyNowPoints,
} from '../data/businessContent';

function SectionIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <div className="section-heading max-w-3xl"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{description && <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#607067]">{description}</p>}</div>;
}

export function WhyNow() {
  const icons = [Sparkles, ShieldCheck, HeartHandshake, Sprout];
  return <section id="why-now" className="section bg-[#FFF4C7]/50"><div className="container">
    <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
      <SectionIntro eyebrow="THE MOMENT" title="More personal. More considered." description="Adaptive technology creates an opportunity. Responsible design determines how we use it." />
      <div className="grid gap-7 sm:grid-cols-2">{whyNowPoints.map((point, index) => { const Icon = icons[index]; return <article key={point.title}><Icon className="mb-4 text-[#0B3D2E]" size={24} aria-hidden="true" /><h3 className="mb-2 text-lg font-semibold text-[#14241D]">{point.title}</h3><p className="text-sm leading-relaxed text-[#607067]">{point.description}</p></article>; })}</div>
    </div>
  </div></section>;
}

export function UserSegments() {
  const icons = [UserRound, GraduationCap, Building2, HeartHandshake];
  return <section id="users" className="section"><div className="container">
    <SectionIntro eyebrow="PEOPLE & POSSIBILITIES" title="Different lives. A manageable next step." description="Potential audiences to explore through research. Final target populations and suitability criteria require clinical guidance." />
    <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{audiences.map((audience, index) => { const Icon = icons[index]; return <article className="card flex flex-col p-6" key={audience.title}><div className="mb-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EDF6EE] text-[#0B3D2E]"><Icon size={22} aria-hidden="true" /></div><p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#607067]">{audience.audience}</p><h3 className="text-xl font-semibold">{audience.title}</h3><p className="mb-6 mt-3 text-sm leading-relaxed text-[#607067]">{audience.description}</p><p className="mt-auto border-t border-[#DDE9E1] pt-4 text-sm leading-relaxed text-[#0B3D2E]"><span className="font-semibold">For example: </span>{audience.example}</p></article>; })}</div>
    <p className="mt-6 flex items-start gap-2 text-sm text-[#607067]"><Compass size={17} className="mt-0.5 shrink-0" aria-hidden="true" />Other illustrative uses include returning gradually to avoided environments and tracking confidence-building activities. Individual suitability always comes first.</p>
  </div></section>;
}

export function BusinessModel() {
  return <section id="business" className="section bg-white"><div className="container">
    <div className="flex flex-wrap items-end justify-between gap-5"><SectionIntro eyebrow="BUSINESS MODEL · PROPOSED" title="A focused beginning. Room to grow." description="Three potential routes to sustainable access. Each is a hypothesis to test with people and buyers." /><span className="badge">Pricing not yet validated</span></div>
    <div className="mt-10 grid gap-5 lg:grid-cols-3">{businessModels.map((model) => <article key={model.name} className={`relative flex flex-col rounded-[1.75rem] border p-7 sm:p-8 ${model.emphasis ? 'border-[#0B3D2E] bg-[#0B3D2E] text-white' : 'border-[#DDE9E1] bg-[#F8FBF7]'}`}><p className={`text-xs font-semibold uppercase tracking-[.13em] ${model.emphasis ? 'text-[#F7C948]' : 'text-[#607067]'}`}>{model.eyebrow}</p><h3 className="mt-5 text-3xl font-semibold">{model.name}</h3><p className={`mb-8 mt-3 text-sm leading-relaxed ${model.emphasis ? 'text-white/80' : 'text-[#607067]'}`}>{model.description}</p><ul className="mt-auto space-y-4">{model.features.map(feature => <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed"><Check className={`mt-0.5 shrink-0 ${model.emphasis ? 'text-[#F7C948]' : 'text-[#13734F]'}`} size={17} aria-hidden="true" />{feature}</li>)}</ul><p className={`mt-8 border-t pt-5 text-xs font-medium ${model.emphasis ? 'border-white/20 text-white/75' : 'border-[#DDE9E1] text-[#607067]'}`}>Proposed model · No current pricing or revenue claim</p></article>)}</div>
    <p className="mt-7 text-sm leading-relaxed text-[#607067]">Pricing, reimbursement relevance, and purchasing pathways require customer discovery and validation.</p>
  </div></section>;
}

export function GoToMarket() {
  return <section id="go-to-market" className="section"><div className="container">
    <SectionIntro eyebrow="GO-TO-MARKET · PROPOSED" title="Earn the next stage." description="Start by understanding one population. Grow when usability, evidence, and safety justify the next step." />
    <div className="mt-10 grid gap-7 sm:grid-cols-2 xl:grid-cols-4">{marketPhases.map((phase, index) => <article key={phase.title} className="border-t border-[#B9D4C2] pt-5"><p className="mb-5 text-sm font-semibold tracking-widest text-[#13734F]">PHASE 0{index + 1}</p><h3 className="text-lg font-semibold">{phase.title}</h3><p className="mt-3 text-sm leading-relaxed text-[#607067]">{phase.description}</p></article>)}</div>
    <div className="mt-10 rounded-3xl border border-[#DDE9E1] bg-white p-6"><p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#607067]">Proposed acquisition journey</p><ol className="flex flex-wrap items-center gap-x-3 gap-y-4">{acquisitionFunnel.map((step, index) => <li key={step} className="flex items-center gap-3 text-sm font-medium text-[#0B3D2E]"><span>{step}</span>{index < acquisitionFunnel.length - 1 && <ArrowRight size={16} className="text-[#607067]" aria-hidden="true" />}</li>)}</ol><p className="mt-4 text-xs leading-relaxed text-[#607067]">Self-assessment is a proposed wellness onboarding step, not a diagnostic assessment. No waitlist or acquisition service is connected to this prototype.</p></div>
  </div></section>;
}

export function CompetitiveLandscape() {
  return <section id="landscape" className="section bg-white"><div className="container">
    <SectionIntro eyebrow="PROPOSED DIFFERENTIATION" title="A considered place in the landscape." description="A framework for future research, rather than a claim of superiority. Capabilities vary within every category and require a verified product-by-product review." />
    <div className="mt-9 overflow-x-auto rounded-3xl border border-[#DDE9E1]" role="region" aria-label="Comparison of potential product categories, scroll horizontally on small screens" tabIndex={0}>
      <table className="w-full min-w-[1040px] border-collapse text-left text-sm"><caption className="sr-only">Illustrative category landscape. Other categories require research; all FearlessU capabilities are designed or planned.</caption><thead><tr className="bg-[#F3F7F1]"><th scope="col" className="w-48 p-5 font-semibold">Product category</th>{comparisonDimensions.map(dimension => <th scope="col" className="p-5 text-xs font-semibold leading-relaxed" key={dimension}>{dimension}</th>)}</tr></thead><tbody>{comparisonCategories.map(category => <tr key={category} className="border-t border-[#DDE9E1]"><th scope="row" className="p-5 font-medium text-[#14241D]">{category}</th>{comparisonDimensions.map(dimension => <td key={dimension} className="p-5 text-xs leading-relaxed text-[#607067]">Varies by product;<br />research required</td>)}</tr>)}<tr className="border-t border-[#DDE9E1] bg-[#ECF6EE]"><th scope="row" className="p-5 text-lg font-semibold text-[#0B3D2E]">FearlessU<span className="mt-1 block text-xs font-normal">Early-stage prototype</span></th>{fearlessCapabilities.map((capability, index) => <td key={comparisonDimensions[index]} className="p-5 text-xs font-semibold leading-relaxed text-[#0B3D2E]">{capability}</td>)}</tr></tbody></table>
    </div><p className="mt-4 text-xs leading-relaxed text-[#607067]">Illustrative categories only. No competitors were audited and no comparative performance, efficacy, or superiority is established.</p>
  </div></section>;
}

export function AcceleratorFit() {
  return <section id="accelerator" className="section overflow-hidden bg-[#0B3D2E] text-white"><div className="container">
    <p className="mb-6 text-xs font-semibold uppercase tracking-[.18em] text-[#F7C948]">2027 ACCELERATOR APPLICATION INTENT</p><div className="grid gap-7 lg:grid-cols-[1.2fr_.8fr] lg:gap-16"><h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">Why Mayo Clinic + ASU collaboration could be transformational</h2><div className="self-end"><p className="text-base leading-relaxed text-white/80">A proposal to bring the right questions to clinical, research, and commercialization experts.</p><p className="mt-4 text-xs leading-relaxed text-white/75">Application preview only. No acceptance, existing collaboration, or endorsement is claimed. Program eligibility, dates, and terms must be confirmed directly.</p></div></div>
    <div className="mt-12 grid gap-5 lg:grid-cols-3">{acceleratorGoals.map((goal, index) => <article key={goal.title} className="flex flex-col rounded-3xl border border-white/20 bg-white/[.04] p-7"><span className="mb-7 text-sm font-semibold text-[#F7C948]">0{index + 1} / THE GOAL</span><h3 className="text-xl font-semibold leading-snug">{goal.title}</h3><p className="mb-7 mt-4 text-sm leading-relaxed text-white/80">{goal.description}</p><p className="mt-auto border-t border-white/20 pt-5 text-xs font-medium text-[#F7C948]">{goal.outcome}</p></article>)}</div>
    <div className="mt-9 rounded-3xl bg-[#F7C948] p-6 text-[#0B3D2E] sm:p-8"><p className="text-xl font-semibold leading-relaxed sm:text-2xl">“FearlessU is seeking rigorous collaboration, not borrowed credibility.”</p></div>
    <div className="mt-12 grid gap-9 lg:grid-cols-2 lg:gap-16"><div><h3 className="mb-5 text-lg font-semibold">How the accelerator could help</h3><ul className="grid gap-3 sm:grid-cols-2">{acceleratorSupport.map(area => <li key={area} className="flex items-start gap-2 text-sm leading-relaxed text-white/80"><ArrowUpRight size={16} className="mt-0.5 shrink-0 text-[#F7C948]" aria-hidden="true" />{area}</li>)}</ul></div><div><h3 className="mb-5 text-lg font-semibold">Requested collaboration areas</h3><div className="flex flex-wrap gap-2">{collaborationAreas.map(area => <span key={area} className="rounded-full border border-white/25 px-3 py-2 text-xs text-white/85">{area}</span>)}</div><p className="mt-5 text-xs leading-relaxed text-white/75">Specific collaborators would be identified with program guidance based on project fit and availability.</p></div></div>
  </div></section>;
}

export function DevelopmentRoadmap() {
  return <section id="milestones" className="section"><div className="container">
    <SectionIntro eyebrow="THE PATH AHEAD" title="Early concept / interactive prototype" description="A proposed development sequence, subject to resources, expert guidance, approvals, and what we learn. Dates indicate planning horizons rather than completed work." />
    <div className="mb-10 mt-7 flex flex-wrap gap-2">{['Concept defined', 'Prototype in progress', 'Validation planned', 'Clinical claims not established'].map((status, index) => <span key={status} className={`rounded-full border px-3 py-2 text-xs font-medium ${index < 2 ? 'border-[#B9D4C2] bg-[#ECF6EE] text-[#0B3D2E]' : 'border-[#E8D58D] bg-[#FFF4C7] text-[#624B12]'}`}>{status}</span>)}</div>
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{developmentMilestones.map((milestone, index) => <article key={milestone.period} className="card p-6"><div className="mb-6 flex items-center justify-between gap-3"><span className="text-sm font-semibold text-[#13734F]">{milestone.period}</span><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EDF6EE] text-xs font-semibold text-[#0B3D2E]">{index + 1}</span></div><h3 className="mb-5 text-lg font-semibold leading-snug">{milestone.title}</h3><ul className="space-y-3">{milestone.items.map(item => <li key={item} className="flex gap-2 text-sm leading-relaxed text-[#607067]"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#13734F]" />{item}</li>)}</ul></article>)}</div>
  </div></section>;
}

export function TeamSection() {
  const icons = [HeartHandshake, Sparkles, Lightbulb, UsersRound];
  return <section id="team" className="section bg-white"><div className="container">
    <SectionIntro eyebrow="THE PEOPLE TO BUILD IT" title="Founder-led. Expertise welcomed." description="An early-stage initiative with advisor recruitment planned. No clinical appointments or advisory credentials are implied." />
    <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.25fr]"><article className="rounded-3xl border border-[#DDE9E1] bg-[#F3F7F1] p-7 sm:p-9"><div className="mb-7 flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-[#0B3D2E] text-2xl font-semibold text-[#F7C948]" aria-label="Founder initials">VK</div><h3 className="text-2xl font-semibold">{founder.name}</h3><p className="mt-2 text-sm font-medium text-[#13734F]">{founder.role}</p><div className="mt-7 rounded-2xl border border-dashed border-[#AFC9B8] bg-white/70 p-5"><p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#607067]">Biography placeholder · edit before submission</p><p className="text-sm leading-relaxed text-[#607067]">{founder.bio}</p></div></article><div className="grid gap-4 sm:grid-cols-2">{advisorRoles.map((role, index) => { const Icon = icons[index]; return <article className="flex flex-col rounded-3xl border border-dashed border-[#C5D8CB] p-6" key={role}><Icon size={24} className="mb-7 text-[#13734F]" aria-hidden="true" /><h3 className="text-lg font-semibold">{role}</h3><p className="mt-3 text-sm leading-relaxed text-[#607067]">Advisor recruitment planned</p><p className="mt-auto pt-7 text-xs text-[#607067]">No advisor appointed in this presentation</p></article>; })}</div></div>
  </div></section>;
}

export function ApplicationSnapshot() {
  return <section id="application" className="section"><div className="container">
    <SectionIntro eyebrow="APPLICATION SNAPSHOT" title="The concept, at a glance." description="Draft talking points for a founder presentation. This is a working overview, not the accelerator’s application form." />
    <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{applicationSnapshot.map((item, index) => <article key={item.title} className={`card p-6 ${index === 0 ? 'sm:col-span-2' : ''}`}><p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#13734F]">{item.title}</p><p className="text-sm leading-relaxed text-[#607067]">{item.content}</p>{item.placeholder && <span className="mt-4 inline-flex rounded-full bg-[#FFF4C7] px-3 py-1 text-[11px] font-semibold text-[#624B12]">Information required</span>}</article>)}</div>
    <div className="notice mt-6 flex items-start gap-3"><Lightbulb size={20} className="mt-0.5 shrink-0" aria-hidden="true" /><p className="text-sm leading-relaxed">Replace every placeholder with accurate, verifiable information before submission. Confirm the current-customer and development-stage statements against actual company records.</p></div>
  </div></section>;
}
