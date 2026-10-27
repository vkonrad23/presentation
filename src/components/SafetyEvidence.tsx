import {
  ArrowRight, BookOpen, Check, ClipboardList, FlaskConical, Info,
  MessageCircle, MousePointer2, ShieldCheck, SlidersHorizontal, Target,
} from 'lucide-react';
import {
  aiSystemStages, evidencePhases, proposedMeasures, researchGateStages,
  safetyControls, safetyStatusLegend, traumaResearchBoundary,
} from '../data/safetyContent';

const stageIcons = {
  goal: Target,
  checkin: ClipboardList,
  adjust: SlidersHorizontal,
  shield: ShieldCheck,
  library: BookOpen,
  choice: MousePointer2,
  feedback: MessageCircle,
};

const statusStyles = {
  implemented: 'border-[#B7D9C5] bg-[#EDF4EC] text-[#063F32]',
  development: 'border-[#DCE5DB] bg-white text-[#52645D]',
  planned: 'border-[#E6D59D] bg-[#FFF8E7] text-[#68521C]',
};

export function AISystem() {
  return (
    <section id="ai-safety" className="section bg-[#EDF4EC]" aria-labelledby="ai-system-title">
      <div className="container">
        <div className="mb-9 grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow">The intelligence behind a smaller step</p>
            <h2 id="ai-system-title" className="section-heading">Adaptive by design.<br />Constrained by responsibility.</h2>
          </div>
          <p className="max-w-[62ch] text-base leading-7 text-[#52645D]">The proposed AI would personalize within an evidence-informed framework. This educational prototype demonstrates the interaction with local rules, without a live model or clinical assessment.</p>
        </div>

        <div className="rounded-2xl border border-[#DCE5DB] bg-white p-5 shadow-[0_12px_32px_-24px_rgba(6,63,50,.2)] sm:p-8">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-3 border-b border-[#DCE5DB] pb-5">
            <h3 className="flex items-center gap-2 text-base font-semibold text-[#063F32]"><SlidersHorizontal size={19} aria-hidden="true" /> The proposed personalization loop</h3>
            <span className="rounded-full bg-[#FFF8E7] px-3 py-1.5 text-xs font-medium text-[#68521C]">Architecture concept · Local demonstration</span>
          </div>

          <ol className="relative space-y-5 before:absolute before:bottom-8 before:left-[19px] before:top-5 before:w-px before:bg-[#DCE5DB] xl:grid xl:grid-cols-7 xl:gap-5 xl:space-y-0 xl:before:bottom-auto xl:before:left-5 xl:before:right-5 xl:before:top-5 xl:before:h-px xl:before:w-auto">
            {aiSystemStages.map((stage, index) => {
              const Icon = stageIcons[stage.icon];
              return (
                <li key={stage.title} className="relative grid min-w-0 grid-cols-[40px_1fr] gap-x-4 xl:block">
                  <span className="relative z-[1] flex h-10 w-10 items-center justify-center rounded-full border border-[#B7D9C5] bg-[#F7F8F2] text-[#063F32]" aria-hidden="true"><Icon size={18} /></span>
                  <div className="grid gap-x-6 sm:grid-cols-[180px_1fr] xl:mt-5 xl:block">
                    <div>
                      <p className="mb-1 text-xs font-medium text-[#52645D]">0{index + 1}</p>
                      <h4 className="text-base font-semibold leading-6 text-[#10251F]">{stage.title}</h4>
                    </div>
                    <div className="mt-2 sm:mt-0 xl:mt-3">
                      <p className="text-base leading-6 text-[#52645D]">{stage.detail}</p>
                      <span className="mt-3 inline-block text-xs font-medium text-[#08754D]">{stage.scope}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="mt-7 flex items-start gap-3 border-t border-[#DCE5DB] pt-5 text-base leading-7 text-[#52645D]">
            <Info size={18} className="mt-1 shrink-0 text-[#063F32]" aria-hidden="true" />
            <p>The phrase check is incomplete and can miss risk. Future clinical screening, expert-reviewed content selection, model evaluation, and production safeguards require implementation and validation.</p>
          </div>
        </div>
        <aside id="research" tabIndex={-1} className="mt-6 scroll-mt-28 rounded-2xl border border-[#DCE5DB] bg-[#F7F8F2] p-5 sm:p-7" aria-labelledby="candidate-research-title">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.1em] text-[#68521C]"><FlaskConical size={16} aria-hidden="true" />Long-term research vision · Not implemented</p>
          <h3 id="candidate-research-title" className="text-xl font-semibold leading-7 text-[#063F32]">Personalization, innovation, and CBT research.</h3>
          <p className="mt-3 max-w-[100ch] text-base leading-7 text-[#52645D]">The research vision goes beyond adapting existing techniques: generate original CBT-inspired candidate exercises, propose novel therapeutic strategies, and formulate new psychological intervention hypotheses informed by individual needs, emotional responses, and context.</p>
          <p className="mt-3 max-w-[100ch] text-base leading-7 text-[#52645D]">Long-term research interests include anxiety, depression, complex fears, phobias, and other psychological challenges. Qualified clinical collaboration would define intended use, suitable populations, and the evidence needed for any claims.</p>
          <p className="mt-3 max-w-[100ch] text-base leading-7 text-[#52645D]"><strong className="font-semibold text-[#10251F]">Before any therapeutic recommendation:</strong> expert review, safety evaluation, and appropriate clinical validation would be required. A novel proposal is not automatically approved, validated, or added to a curated library. No live AI or candidate-generation system is connected here.</p>
          <ol className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {researchGateStages.map((stage, index) => <li key={stage.title} className="border-l-2 border-[#E8B93F] pl-4"><p className="mb-2 text-xs font-semibold text-[#68521C]">Research gate 0{index + 1}</p><h4 className="text-base font-semibold text-[#10251F]">{stage.title}</h4><p className="mt-2 text-base leading-7 text-[#52645D]">{stage.detail}</p></li>)}
          </ol>
          <div className="mt-6 border-t border-[#DCE5DB] pt-5">
            <h4 className="text-base font-semibold text-[#063F32]">Social impact, with Ukraine in focus.</h4>
            <p className="mt-3 max-w-[100ch] text-base leading-7 text-[#52645D]">{traumaResearchBoundary}</p>
          </div>
        </aside>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[70ch] text-base leading-7 text-[#52645D]">No autonomous diagnosis. No replacement for professional care. No promise of a clinical outcome.</p>
          <a href="#journey" className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg px-1 text-base font-semibold text-[#063F32]">Explore the local demo <ArrowRight size={17} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}

export function SafetySection() {
  return (
    <section id="safety" className="section bg-white" aria-labelledby="safety-title">
      <div className="container">
        <div className="mb-8 grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow">Responsible AI & data practices</p>
            <h2 id="safety-title" className="section-heading">Clear boundaries.<br />Visible accountability.</h2>
          </div>
          <p className="max-w-[62ch] text-base leading-7 text-[#52645D]">What a visitor can use today is distinct from what a production product would need. No completed clinical validation or production safety system is implied.</p>
        </div>

        <div className="mb-8 flex flex-wrap gap-x-8 gap-y-5 rounded-xl border border-[#DCE5DB] bg-[#F7F8F2] p-5" aria-label="Feature status legend">
          {safetyStatusLegend.map((item) => <div key={item.kind} className="max-w-xs"><span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${statusStyles[item.kind]}`}><span className={`h-1.5 w-1.5 rounded-full ${item.kind === 'implemented' ? 'bg-[#08754D]' : item.kind === 'development' ? 'bg-[#52645D]' : 'bg-[#82651F]'}`} aria-hidden="true" />{item.status}</span><p className="mt-2 text-xs leading-5 text-[#52645D]">{item.description}</p></div>)}
        </div>

        <div className="border-y border-[#DCE5DB]">
          <div className="hidden grid-cols-[.8fr_1.2fr_1.2fr] gap-8 border-b border-[#DCE5DB] bg-[#EDF4EC] px-5 py-4 text-xs font-semibold uppercase tracking-[.1em] text-[#063F32] md:grid">
            <span>Responsibility</span><span>Implemented prototype · Actual scope</span><span>Planned validation · Before production</span>
          </div>
          <dl className="divide-y divide-[#DCE5DB]">
            {safetyControls.map((control) => <div key={control.title} className="grid gap-4 px-0 py-6 md:grid-cols-[.8fr_1.2fr_1.2fr] md:gap-8 md:px-5"><dt className="text-base font-semibold leading-7 text-[#10251F]">{control.title}</dt><dd><span className="mb-2 block text-xs font-semibold text-[#08754D] md:hidden">Implemented prototype · Actual scope</span><p className="text-base leading-7 text-[#52645D]">{control.prototype}</p></dd><dd><span className="mb-2 block text-xs font-semibold text-[#68521C] md:hidden">Planned validation · Before production</span><p className="text-base leading-7 text-[#52645D]">{control.planned}</p></dd></div>)}
          </dl>
        </div>

        <div className="mt-6 flex flex-col gap-5 rounded-xl bg-[#F7F8F2] p-5 sm:flex-row sm:items-start">
          <span className="inline-flex shrink-0 rounded-full border border-[#DCE5DB] bg-white px-3 py-1.5 text-xs font-semibold text-[#52645D]">In development</span>
          <p className="text-base leading-7 text-[#52645D]"><strong className="font-semibold text-[#10251F]">Prototype refinement.</strong> The educational interface and scenarios remain open to iteration. This status does not mean a clinical AI system, staffed service, or production safeguard is being delivered.</p>
        </div>
        <p className="mt-5 max-w-[95ch] text-base leading-7 text-[#52645D]">Use fictional examples; do not enter personal health information. No HIPAA compliance, security certification, or regulatory clearance is claimed. A future policy against selling sensitive information, legal review, and independently reviewed security remain production requirements.</p>
      </div>
    </section>
  );
}

export function EvidenceRoadmap() {
  return (
    <section id="evidence" className="section bg-[#F7F8F2]" aria-labelledby="evidence-title">
      <div className="container">
        <div className="mb-9 grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div><p className="eyebrow">Evidence before claims</p><h2 id="evidence-title" className="section-heading">A research plan.<br />Not a results page.</h2></div>
          <div><p className="max-w-[62ch] text-base leading-7 text-[#52645D]">No completed study, clinical effectiveness, or validated outcome is claimed. The following phases are proposed and depend on qualified oversight, appropriate review, resources, and collaborators.</p><p className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#68521C]"><FlaskConical size={16} aria-hidden="true" />All phases · Planned validation</p></div>
        </div>

        <ol className="relative border-y border-[#DCE5DB] before:absolute before:bottom-8 before:left-5 before:top-8 before:w-px before:bg-[#DCE5DB]">
          {evidencePhases.map((phase) => <li key={phase.number} className="relative grid grid-cols-[40px_1fr] gap-x-4 border-b border-[#DCE5DB] py-7 last:border-b-0 sm:gap-x-7"><span className="relative z-[1] flex h-10 w-10 items-center justify-center rounded-full border border-[#B8CDBE] bg-[#F7F8F2] text-xs font-semibold text-[#063F32]">{phase.number}</span><div className="grid gap-5 lg:grid-cols-[.9fr_1.2fr_1fr] lg:gap-8"><div><h3 className="text-xl font-semibold leading-7 tracking-[-.02em] text-[#10251F]">{phase.title}</h3><p className="mt-2 text-base leading-7 text-[#52645D]">{phase.question}</p></div><ul className="space-y-2">{phase.activities.map((activity) => <li key={activity} className="flex items-start gap-2.5 text-base leading-7 text-[#52645D]"><Check size={16} className="mt-1.5 shrink-0 text-[#08754D]" aria-hidden="true" />{activity}</li>)}</ul><div className="border-l-2 border-[#E8B93F] pl-5"><p className="text-xs font-semibold uppercase tracking-[.1em] text-[#52645D]">Proposed decision point</p><p className="mt-3 text-base leading-7 text-[#063F32]">{phase.output}</p></div></div></li>)}
        </ol>


        <div className="mt-7 grid gap-4 sm:grid-cols-[210px_1fr]">
          <h3 className="text-base font-semibold leading-7 text-[#10251F]">Possible measures<br /><span className="text-xs font-normal text-[#52645D]">To be selected with clinical advisors</span></h3>
          <div><ul className="flex flex-wrap gap-x-5 gap-y-2">{proposedMeasures.map((measure) => <li key={measure} className="flex items-start gap-2 text-base leading-7 text-[#52645D]"><span className="mt-3 h-1 w-1 shrink-0 rounded-full bg-[#08754D]" aria-hidden="true" />{measure}</li>)}</ul><p className="mt-3 text-xs leading-5 text-[#52645D]">Simulated dashboard values illustrate an interface only. They are not participants, traction, predicted improvement, or clinical evidence.</p></div>
        </div>
      </div>
    </section>
  );
}
