import {
  ArrowRight, ArrowUpRight, Check, ChevronDown, CircleHelp,
  FlaskConical, Handshake, Lightbulb, ShieldCheck, UsersRound,
} from 'lucide-react';
import {
  acceleratorGoals, applicationSnapshot, businessThesis, buyerHypotheses,
  collaborationAreas, comparisonCategories, comparisonDimensions,
  developmentMilestones, founder, goToMarketSteps, revenueHypotheses, teamPriorities,
} from '../data/businessContent';

function SectionIntro({ eyebrow, title, description }: {
  eyebrow: string; title: string; description?: string;
}) {
  return (
    <div className="section-heading max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p className="mt-5 max-w-[68ch] text-base leading-relaxed text-[#52645D]">{description}</p>}
    </div>
  );
}

export function BusinessOverview() {
  return (
    <section id="business" className="section bg-[#F7F8F2]">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <SectionIntro eyebrow="06 / BUSINESS & MARKET" title={businessThesis.title} description={businessThesis.description} />
          <div className="border-l-2 border-[#E8B93F] pl-6 lg:self-end">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[.12em] text-[#08754D]">The market thesis · to validate</p>
            <p className="max-w-[62ch] text-base leading-relaxed text-[#52645D]">{businessThesis.market}</p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <div>
            <h3 className="mb-5 text-xl font-semibold text-[#10251F]">Five possible customer pathways</h3>
            <div className="border-t border-[#DCE5DB]">
              {buyerHypotheses.map((buyer, index) => (
                <details key={buyer.name} className="group border-b border-[#DCE5DB]">
                  <summary className="flex min-h-16 cursor-pointer list-none items-center gap-4 py-4 text-base font-semibold text-[#10251F] [&::-webkit-details-marker]:hidden">
                    <span className="w-6 shrink-0 text-xs font-medium text-[#08754D]">0{index + 1}</span>
                    <span className="min-w-0 flex-1">{buyer.name}</span>
                    <ChevronDown size={18} className="shrink-0 text-[#52645D] transition-transform group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
                  </summary>
                  <div className="space-y-4 pb-6 pl-10 text-base leading-relaxed text-[#52645D]">
                    <p>{buyer.audience}</p>
                    <p><span className="font-semibold text-[#10251F]">Possible model: </span>{buyer.model}</p>
                    <p className="flex items-start gap-2"><CircleHelp size={18} className="mt-1 shrink-0 text-[#08754D]" aria-hidden="true" /><span>{buyer.question}</span></p>
                  </div>
                </details>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-[#52645D]">Buyer hypotheses, not existing customers or partnerships. Final populations require research and clinical guidance.</p>
          </div>

          <div className="self-start rounded-3xl border border-[#DCE5DB] bg-[#EDF4EC] p-6 sm:p-8">
            <p className="eyebrow">POSSIBLE MONETIZATION</p>
            <h3 className="mb-6 text-2xl font-semibold tracking-tight text-[#063F32]">Access that can grow with evidence.</h3>
            <dl className="divide-y divide-[#D1DFD1]">
              {revenueHypotheses.map((model) => (
                <div key={model.name} className="py-4 first:pt-0">
                  <dt className="flex items-start gap-2 text-base font-semibold text-[#10251F]"><ArrowUpRight size={18} className="mt-1 shrink-0 text-[#08754D]" aria-hidden="true" />{model.name}</dt>
                  <dd className="mt-1 pl-6 text-base leading-relaxed text-[#52645D]">{model.detail}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 border-t border-[#D1DFD1] pt-4 text-xs leading-relaxed text-[#52645D]">Pricing, reimbursement relevance, and purchasing pathways are unvalidated. No revenue or market-size estimate is asserted.</p>
          </div>
        </div>

        <details className="group mt-8 rounded-2xl border border-[#DCE5DB] bg-white px-5 sm:px-7">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-semibold text-[#063F32] [&::-webkit-details-marker]:hidden">
            Our proposed route to market
            <ChevronDown size={18} className="shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
          </summary>
          <ol className="grid gap-6 border-t border-[#DCE5DB] py-6 md:grid-cols-3">
            {goToMarketSteps.map((step, index) => <li key={step.title}><p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#08754D]">Stage 0{index + 1}</p><h4 className="mb-2 text-base font-semibold">{step.title}</h4><p className="text-base leading-relaxed text-[#52645D]">{step.description}</p></li>)}
          </ol>
        </details>
      </div>
    </section>
  );
}

export function CompetitiveLandscape() {
  return (
    <section id="landscape" className="section bg-white">
      <div className="container">
        <div className="grid gap-6 lg:grid-cols-[1fr_.7fr] lg:items-end lg:gap-16">
          <SectionIntro eyebrow="POSITIONING / A RESEARCH FRAMEWORK" title="A specific focus. A clear boundary." />
          <p className="max-w-[62ch] text-base leading-relaxed text-[#52645D]">FearlessU is designed around a structured practice loop. This category view identifies questions for research; it does not rank products or establish superiority.</p>
        </div>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-[#DCE5DB]" role="region" aria-label="Product category comparison; scroll horizontally on small screens" tabIndex={0}>
          <table className="w-full min-w-[900px] border-collapse text-left text-base">
            <caption className="sr-only">Conceptual category comparison. Other categories have not been assessed. FearlessU describes a local prototype and planned capabilities, not clinical performance.</caption>
            <thead>
              <tr className="border-b border-[#DCE5DB] bg-[#F7F8F2]">
                <th scope="col" className="w-[23%] p-4 text-base font-semibold">Design dimension</th>
                {comparisonCategories.map((category) => <th scope="col" key={category} className="p-4 text-xs font-semibold leading-relaxed text-[#52645D]">{category}</th>)}
                <th scope="col" className="w-[20%] bg-[#063F32] p-4 text-base font-semibold text-white">FearlessU<span className="mt-1 block text-xs font-normal text-[#DAE8DE]">Concept / local prototype</span></th>
              </tr>
            </thead>
            <tbody>
              {comparisonDimensions.map((dimension) => (
                <tr key={dimension.name} className="border-b border-[#DCE5DB] last:border-b-0">
                  <th scope="row" className="p-4 text-base font-medium text-[#10251F]">{dimension.name}</th>
                  {comparisonCategories.map((category) => <td key={category} className="p-4 text-xs text-[#52645D]">Not assessed</td>)}
                  <td className="bg-[#EDF4EC] p-4 text-xs font-semibold leading-relaxed text-[#063F32]">{dimension.fearless}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-[#52645D]"><CircleHelp size={16} className="mt-0.5 shrink-0" aria-hidden="true" /><span>Capabilities vary by product. No competitor audit has been completed. Local demonstrations do not establish clinical efficacy or a production-ready safety system.</span></p>
      </div>
    </section>
  );
}

export function AcceleratorFit() {
  return (
    <section id="accelerator" className="section bg-[#063F32] text-white">
      <div className="container">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
          <div><p className="mb-5 text-xs font-semibold uppercase tracking-[.14em] text-[#E8B93F]">07 / INSTITUTIONAL COLLABORATION</p><h2 className="max-w-2xl text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.1] tracking-tight text-white">Why this collaboration matters</h2></div>
          <p className="max-w-[58ch] text-base leading-relaxed text-[#DAE8DE] lg:self-end">FearlessU aspires to long-term collaboration with Mayo Clinic and Arizona State University to evaluate personalized support and a separately governed original-research program.</p>
        </div>

        <ol className="mt-10 divide-y divide-white/20 border-y border-white/20">
          {acceleratorGoals.map((goal, index) => (
            <li key={goal.title} className="grid gap-4 py-7 sm:grid-cols-[3rem_1fr] lg:grid-cols-[3rem_1fr_.9fr] lg:gap-8">
              <span className="text-xs font-semibold tracking-wider text-[#E8B93F]">0{index + 1}</span>
              <div><h3 className="max-w-xl text-xl font-semibold leading-snug">{goal.title}</h3><p className="mt-3 text-xs font-medium text-[#E8B93F]">{goal.outcome}</p></div>
              <p className="max-w-[60ch] text-base leading-relaxed text-[#DAE8DE] sm:col-start-2 lg:col-start-auto">{goal.description}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8 grid gap-6 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <h3 className="text-xl font-semibold">Where institutional expertise could help</h3>
          <ul className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {collaborationAreas.map((area) => <li key={area} className="flex items-start gap-3 text-base leading-relaxed text-[#DAE8DE]"><ArrowUpRight size={18} className="mt-1 shrink-0 text-[#E8B93F]" aria-hidden="true" />{area}</li>)}
          </ul>
        </div>
        <p className="mt-8 border-t border-white/20 pt-5 text-xs leading-relaxed text-[#DAE8DE]">Long-term aspiration only. No FearlessU partnership, acceptance, or endorsement by Mayo Clinic or ASU is confirmed. The founder’s university affiliation is a separate academic relationship; collaborators, eligibility, and participation terms require confirmation.</p>
      </div>
    </section>
  );
}

export function DevelopmentRoadmap() {
  return (
    <section id="milestones" className="section bg-[#F7F8F2]">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionIntro eyebrow="08 / DEVELOPMENT ROADMAP" title="The next 12–18 months." description="Move from prototype refinement to a reviewable pilot, then let evidence determine the next decision." />
          <span className="badge">Current stage: early concept / interactive prototype</span>
        </div>
        <ol className="relative mt-10 grid gap-8 md:grid-cols-4 md:gap-6">
          {developmentMilestones.map((milestone, index) => (
            <li key={milestone.period} className="relative border-l border-[#B9CEBF] pb-2 pl-6 md:border-l-0 md:border-t md:pl-0 md:pt-7">
              <span className="absolute -left-[5px] top-1 h-[9px] w-[9px] rounded-full border-2 border-[#F7F8F2] bg-[#08754D] md:-top-[5px] md:left-0" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-wider text-[#08754D]">Proposed · {milestone.period}</p>
              <h3 className="mb-4 mt-3 text-xl font-semibold text-[#10251F]"><span className="sr-only">Stage {index + 1}: </span>{milestone.title}</h3>
              <ul className="space-y-3">{milestone.items.map((item) => <li key={item} className="text-base leading-relaxed text-[#52645D]">{item}</li>)}</ul>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-xs leading-relaxed text-[#52645D]">Planning horizons are relative to resourcing, expert input, and required approvals. No clinical study, institutional pilot, or commercial launch is presented as completed.</p>
      </div>
    </section>
  );
}

export function TeamSection() {
  const icons = [Handshake, Lightbulb, FlaskConical, ShieldCheck];
  return (
    <section id="team" className="section bg-white">
      <div className="container">
        <SectionIntro eyebrow="09 / PEOPLE & PRIORITIES" title="Build the right expertise around the idea." description="Founder-led today. Clinical, technical, research, and privacy expertise are priorities for the next stage." />
        <div className="mt-9 grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
          <article className="self-start rounded-3xl border border-[#DCE5DB] bg-[#EDF4EC] p-6 sm:p-8">
            <div className="mb-7 flex items-center gap-5"><span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#063F32] text-xl font-semibold text-[#E8B93F]" aria-label="Founder initials">VK</span><div><h3 className="text-xl font-semibold text-[#10251F]">{founder.name}</h3><p className="mt-1 text-base text-[#52645D]">{founder.role}</p></div></div>
            <p className="text-base leading-relaxed text-[#52645D]">{founder.bio}</p>
            <p className="mt-4 text-xs leading-relaxed text-[#52645D]">{founder.institutionalContext}</p>
            <details className="group mt-6 border-t border-[#CFDDCF]">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 py-3 text-base font-semibold text-[#063F32] [&::-webkit-details-marker]:hidden">Education & founding motivation<ChevronDown size={18} className="shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" /></summary>
              <dl className="space-y-5 pb-2 text-base leading-relaxed"><div><dt className="font-semibold text-[#10251F]">Educational background</dt><dd className="mt-1 text-[#52645D]">{founder.expertise}</dd></div><div><dt className="font-semibold text-[#10251F]">Founder motivation</dt><dd className="mt-1 text-[#52645D]">{founder.motivation}</dd></div></dl>
            </details>
          </article>
          <div>
            <div className="mb-5 flex items-center gap-3"><UsersRound size={20} className="text-[#08754D]" aria-hidden="true" /><h3 className="text-xl font-semibold">Open expertise priorities</h3></div>
            <div className="grid gap-x-7 gap-y-6 sm:grid-cols-2">
              {teamPriorities.map((priority, index) => { const Icon = icons[index]; return <article key={priority.name} className="border-t border-[#DCE5DB] pt-5"><Icon size={22} className="mb-4 text-[#08754D]" aria-hidden="true" /><h4 className="text-base font-semibold text-[#10251F]">{priority.name}</h4><p className="mt-2 text-base leading-relaxed text-[#52645D]">{priority.detail}</p><p className="mt-4 text-xs font-medium text-[#08754D]">{priority.role} · recruitment planned</p></article>; })}
            </div>
            <p className="mt-6 text-xs leading-relaxed text-[#52645D]">No advisors, clinical qualifications, or appointments are represented as confirmed.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ApplicationSnapshot() {
  return (
    <section id="application" className="section !py-10 bg-[#EDF4EC]">
      <div className="container">
        <details className="group rounded-3xl border border-[#DCE5DB] bg-white px-6 sm:px-8">
          <summary className="flex min-h-24 cursor-pointer list-none items-center justify-between gap-5 py-6 [&::-webkit-details-marker]:hidden">
            <div><p className="mb-2 text-xs font-semibold uppercase tracking-[.12em] text-[#08754D]">FOUNDER WORKING NOTES</p><h2 className="!text-[clamp(1.35rem,2.4vw,1.85rem)] !leading-snug">Open the accelerator brief</h2></div>
            <ChevronDown size={22} className="shrink-0 text-[#063F32] transition-transform group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
          </summary>
          <div className="border-t border-[#DCE5DB] py-7">
            <p className="mb-7 max-w-[72ch] text-base leading-relaxed text-[#52645D]">Draft presentation notes, not an application form. Replace placeholders with accurate company information and confirm every stage or customer statement before submission.</p>
            <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
              {applicationSnapshot.map((item) => item.placeholder ? (
                <label key={item.title} className="block"><span className="mb-2 block text-base font-semibold text-[#10251F]">{item.title} <span className="text-xs font-normal text-[#52645D]">· founder input required</span></span><textarea name={`brief-${item.title.toLowerCase().replaceAll(' ', '-')}`} defaultValue={item.content} rows={3} maxLength={1000} className="min-h-28 w-full resize-y rounded-xl border border-[#CCD8CC] bg-[#F7F8F2] px-4 py-3 text-base leading-relaxed text-[#10251F]" /></label>
              ) : (
                <div key={item.title}><h3 className="mb-2 text-base font-semibold text-[#10251F]">{item.title}</h3><p className="max-w-[64ch] text-base leading-relaxed text-[#52645D]">{item.content}</p></div>
              ))}
            </div>
            <p className="mt-7 flex items-start gap-2 rounded-xl bg-[#FFF8E7] p-4 text-xs leading-relaxed text-[#674F16]"><Check size={16} className="mt-0.5 shrink-0" aria-hidden="true" /><span>Edits remain only in this page’s memory. Nothing is submitted or stored. Additional founder achievements, customers, evidence, finances, and any future institutional relationships require accurate supporting information.</span></p>
            <a href="#contact" className="mt-6 inline-flex min-h-11 items-center gap-2 text-base font-semibold text-[#08754D]">Discuss the concept<ArrowRight size={18} aria-hidden="true" /></a>
          </div>
        </details>
      </div>
    </section>
  );
}
