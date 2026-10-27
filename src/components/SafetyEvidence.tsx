import {
  Activity, ArrowRight, ArrowUpRight, BookOpen, Check, CheckCircle2,
  ClipboardCheck, FileCheck2, Fingerprint, GitBranch, HeartHandshake,
  Info, LockKeyhole, MessageCircle, ScanLine, ShieldCheck, SlidersHorizontal,
  Sparkles, Target, X,
} from 'lucide-react';
import {
  aiBoundaries, aiCapabilities, aiResponsibilities, aiSystemStages,
  evidencePhases, privacyRequirements, proposedMeasures, safetyRequirements,
} from '../data/safetyContent';

const stageIcons = {
  goal: Target,
  shield: ShieldCheck,
  library: BookOpen,
  adjust: SlidersHorizontal,
  activity: Activity,
  feedback: MessageCircle,
  adapt: GitBranch,
  explain: Info,
  human: HeartHandshake,
  monitor: ScanLine,
};

export function AISystem() {
  return (
    <section className="section bg-[#F1F6F0]" id="ai-safety" aria-labelledby="ai-system-title">
      <div className="container">
        <div className="mb-12 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow">AI, with a clear framework</p>
            <h2 id="ai-system-title" className="section-heading">Personalization needs<br className="hidden sm:block" /> a thoughtful foundation.</h2>
          </div>
          <div className="max-w-lg">
            <p className="text-base leading-relaxed text-[#607067]">The proposed system would adapt a structured experience within reviewed boundaries. A curated framework and human judgment remain essential.</p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#DDE9E1] bg-white px-3 py-2 text-xs font-semibold text-[#0B3D2E]">
              <Sparkles aria-hidden="true" size={14} /> Proposed architecture · No live AI in this demo
            </p>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-[#DDE9E1] bg-white p-5 shadow-[0_12px_40px_rgba(11,61,46,0.03)] sm:p-7">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[#E8EEE7] pb-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-[#0B3D2E]"><GitBranch size={17} aria-hidden="true" /> A guided feedback loop</p>
            <span className="text-xs text-[#607067]">Production design · Planned</span>
          </div>
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {aiSystemStages.map((stage, index) => {
              const Icon = stageIcons[stage.icon];
              return (
                <li key={stage.title} className={`relative min-w-0 rounded-2xl p-5 ${index === 6 ? 'bg-[#FFF4C7] sm:col-span-2 lg:col-span-2' : 'bg-[#F8FBF7]'}`}>
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#0B3D2E]"><Icon size={20} aria-hidden="true" /></span>
                    <span className="font-mono text-xs text-[#607067]">0{index + 1}</span>
                  </div>
                  <h3 className="pr-4 text-sm font-semibold text-[#14241D]">{stage.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-[#607067]">{stage.detail}</p>
                  {index < aiSystemStages.length - 1 ? <ArrowRight className="absolute right-4 top-[4.8rem] text-[#13A36D]" size={15} aria-hidden="true" /> : <ArrowUpRight className="absolute right-5 top-5 text-[#0B3D2E]" size={20} aria-hidden="true" />}
                </li>
              );
            })}
          </ol>
          <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-[#607067]"><Info className="mt-0.5 shrink-0" size={14} aria-hidden="true" />This prototype uses predefined, deterministic templates. The production content library, clinical review, screening, monitoring, and AI engine are planned and have not been validated.</p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {aiResponsibilities.map((item) => {
            const Icon = stageIcons[item.icon];
            return <article key={item.title} className="min-w-0 rounded-2xl border border-[#DDE9E1] bg-white/70 p-6"><Icon size={22} className="mb-5 text-[#0B3D2E]" aria-hidden="true" /><h3 className="text-base font-semibold text-[#14241D]">{item.title}</h3><p className="mt-3 text-sm leading-relaxed text-[#607067]">{item.text}</p><p className="mt-4 text-[10px] font-bold uppercase tracking-[0.15em] text-[#607067]">Planned production requirement</p></article>;
          })}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl bg-[#0B3D2E] p-6 text-white sm:p-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#BDE8CF]">Intended capabilities</p>
            <h3 className="mb-5 text-xl font-semibold">What the AI would do</h3>
            <ul className="space-y-4">{aiCapabilities.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-[#E3F1E7]"><Check className="mt-0.5 shrink-0 text-[#F7C948]" size={16} aria-hidden="true" />{item}</li>)}</ul>
          </div>
          <div className="rounded-2xl border border-[#DDE9E1] bg-white p-6 sm:p-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#607067]">Boundaries</p>
            <h3 className="mb-5 text-xl font-semibold text-[#14241D]">What the AI does not do</h3>
            <ul className="space-y-4">{aiBoundaries.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-[#607067]"><X className="mt-0.5 shrink-0 text-[#607067]" size={16} aria-hidden="true" />{item}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SafetySection() {
  return (
    <section id="safety" className="section bg-white" aria-labelledby="safety-title">
      <div className="container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="eyebrow">Safety, privacy & clinical responsibility</p>
          <h2 id="safety-title" className="section-heading">Trust is something<br className="hidden sm:block" /> we plan to earn.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#607067]">Responsible development means making the scope clear today and specifying the safeguards that must be built, reviewed, and tested before production.</p>
        </div>

        <div className="mb-7 flex flex-col gap-4 rounded-2xl border border-[#DDE9E1] bg-[#F8FBF7] p-5 sm:flex-row sm:items-start sm:p-6">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E4EFE5] text-[#0B3D2E]"><Fingerprint size={22} aria-hidden="true" /></span>
          <div>
            <h3 className="text-sm font-semibold text-[#14241D]">This prototype today</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#607067]">Inputs stay in memory in your browser. No form data is sent to a server, no sensitive entries are saved to local storage, and no live AI or clinical assessment runs. A basic local risk-language check can miss risk and is not validated suitability screening. Avoid entering personal or sensitive information.</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <article className="min-w-0 overflow-hidden rounded-[1.75rem] bg-[#0B3D2E] text-white">
            <div className="border-b border-white/15 p-6 sm:p-8">
              <div className="mb-6 flex items-center justify-between gap-4"><ShieldCheck size={30} className="text-[#F7C948]" aria-hidden="true" /><span className="rounded-full border border-[#94BBA3] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#E4F2E8]">Planned</span></div>
              <h3 className="text-2xl font-semibold tracking-[-0.03em]">Safety architecture</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#CEE2D5]">Requirements for a future production product. These safeguards are not established by this demo.</p>
            </div>
            <ul className="divide-y divide-white/10 px-6 sm:px-8">
              {safetyRequirements.map((item) => <li key={item.title} className="flex items-start gap-3 py-5"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#F7C948]"><ShieldCheck size={13} aria-hidden="true" /></span><div className="min-w-0"><h4 className="text-sm font-semibold">{item.title}</h4><p className="mt-1.5 text-xs leading-relaxed text-[#CEE2D5]">{item.detail}</p></div></li>)}
            </ul>
          </article>

          <article className="min-w-0 rounded-[1.75rem] border border-[#DDE9E1] bg-[#F8FBF7] p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-4"><LockKeyhole size={30} className="text-[#0B3D2E]" aria-hidden="true" /><span className="rounded-full border border-[#CAD9CA] bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0B3D2E]">Planned</span></div>
            <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#14241D]">Privacy by design</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#607067]">A proposed privacy roadmap, with production implementation and review still ahead.</p>
            <ul className="mt-7 space-y-5">{privacyRequirements.map((item) => <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-[#40554A]"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#13A36D]" />{item}</li>)}</ul>
            <div className="mt-8 rounded-2xl border border-[#E8DFB3] bg-[#FFF4C7] p-4"><p className="flex items-start gap-2 text-xs leading-relaxed text-[#5B542F]"><Info size={15} className="mt-0.5 shrink-0" aria-hidden="true" />No HIPAA compliance, security certification, regulatory clearance, or clinical validation has been established. Requirements depend on the final use, data, and markets.</p></div>
          </article>
        </div>

        <div className="mt-7 rounded-2xl border border-[#DDE9E1] p-5 sm:p-6"><p className="flex items-start gap-3 text-sm leading-relaxed text-[#607067]"><HeartHandshake size={21} className="mt-0.5 shrink-0 text-[#0B3D2E]" aria-hidden="true" /><span>FearlessU is an early-stage wellness technology concept. It is not a medical device, diagnostic tool, emergency service, or substitute for care from a qualified professional.</span></p></div>
      </div>
    </section>
  );
}

export function EvidenceRoadmap() {
  return (
    <section id="evidence" className="section bg-[#F8FBF7]" aria-labelledby="evidence-title">
      <div className="container">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl"><p className="eyebrow">Evidence & validation roadmap</p><h2 id="evidence-title" className="section-heading">A promising idea.<br />A deliberate path to evidence.</h2></div>
          <p className="max-w-sm text-sm leading-relaxed text-[#607067]">The interactive prototype demonstrates an experience. It does not establish safety or effectiveness. Every research phase below is planned.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {evidencePhases.map((phase) => <article key={phase.number} className="flex min-w-0 flex-col rounded-2xl border border-[#DDE9E1] bg-white p-6"><div className="mb-7 flex items-center justify-between gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EEF5EC] text-sm font-semibold text-[#0B3D2E]">{phase.number}</span><span className="rounded-full bg-[#FFF4C7] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#66551E]">Planned</span></div><p className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#607067]">{phase.focus}</p><h3 className="text-xl font-semibold leading-snug tracking-[-0.02em] text-[#14241D]">{phase.title}</h3><p className="mt-3 text-sm leading-relaxed text-[#607067]">{phase.description}</p><ul className="mb-7 mt-6 space-y-3">{phase.activities.map((activity) => <li key={activity} className="flex items-start gap-2 text-xs leading-relaxed text-[#40554A]"><CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[#13A36D]" aria-hidden="true" />{activity}</li>)}</ul><div className="mt-auto border-t border-[#E8EEE7] pt-5"><p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#607067]"><FileCheck2 size={13} aria-hidden="true" /> Proposed output</p><p className="mt-2 text-xs font-medium leading-relaxed text-[#0B3D2E]">{phase.output}</p></div></article>)}
        </div>
        <div className="mt-7 rounded-2xl border border-[#DDE9E1] bg-[#EEF4EA] p-6 sm:p-8"><div className="mb-5 flex flex-wrap items-center gap-3"><ClipboardCheck size={22} className="text-[#0B3D2E]" aria-hidden="true" /><h3 className="text-base font-semibold text-[#14241D]">What we could measure</h3><span className="text-xs text-[#607067]">Proposed examples · To be selected with clinical advisors</span></div><ul className="flex flex-wrap gap-2">{proposedMeasures.map((measure) => <li key={measure} className="max-w-full rounded-full border border-[#D6E1D2] bg-white px-4 py-2 text-xs leading-relaxed text-[#40554A]">{measure}</li>)}</ul><p className="mt-5 text-xs leading-relaxed text-[#607067]">No participant study, validated clinical outcome, or quantified benefit is being claimed. Simulated charts elsewhere on this page illustrate a possible interface only.</p></div>
      </div>
    </section>
  );
}
