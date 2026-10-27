import { useState } from 'react';
import { Activity, ArrowUpRight, CalendarDays, CircleCheck, MessageSquareText, Route } from 'lucide-react';
import { dashboardPeriods, type DashboardPoint, type DashboardRange } from '../data/dashboardContent';

function ConfidenceChart({ points, range }: { points: DashboardPoint[]; range: DashboardRange }) {
  const width = 640;
  const height = 228;
  const left = 36;
  const right = width - 18;
  const top = 15;
  const bottom = height - 32;
  const coordinates = points.map((point, index) => ({
    ...point,
    x: left + (index / (points.length - 1)) * (right - left),
    y: bottom - (point.confidence / 10) * (bottom - top),
  }));
  const line = coordinates.map((point) => `${point.x},${point.y}`).join(' ');
  const area = `${left},${bottom} ${line} ${right},${bottom}`;

  return (
    <figure className="min-w-0" aria-labelledby="impact-chart-title">
      <figcaption id="impact-chart-title" className="text-base font-semibold text-[#14241D] sm:text-lg">
        Illustrative user journey visualization
      </figcaption>
      <p className="mt-1 text-xs leading-relaxed text-[#607067]">Simulated self-reported confidence, on a 0–10 scale. Changes are fictional and are not expected outcomes.</p>
      <svg viewBox={`0 0 ${width} ${height}`} className="mt-5 block h-auto w-full" role="img" aria-label={`Simulated confidence over ${range} days. Starts at ${points[0].confidence} and ends at ${points[points.length - 1].confidence} out of ten.`}>
        <defs>
          <linearGradient id="confidence-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#38C98B" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#38C98B" stopOpacity="0.01" />
          </linearGradient>
        </defs>
        {[0, 5, 10].map((value) => {
          const y = bottom - (value / 10) * (bottom - top);
          return <g key={value}><line x1={left} y1={y} x2={right} y2={y} stroke="#DDE9E1" strokeDasharray="4 5" /><text x="16" y={y + 4} textAnchor="middle" fill="#607067" fontSize="11">{value}</text></g>;
        })}
        <polygon points={area} fill="url(#confidence-fill)" />
        <polyline points={line} fill="none" stroke="#13A36D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {coordinates.map((point, index) => <g key={point.label}>
          <circle cx={point.x} cy={point.y} r="4.5" fill="#fff" stroke="#13A36D" strokeWidth="2" />
          <title>{`${point.label}: ${point.confidence} out of 10, simulated`}</title>
          {(index === 0 || index === 3 || index === coordinates.length - 1) && <text x={point.x} y={height - 5} textAnchor={index === 0 ? 'start' : index === coordinates.length - 1 ? 'end' : 'middle'} fill="#607067" fontSize="11">{point.label}</text>}
        </g>)}
      </svg>
      <details className="mt-2 text-xs text-[#607067]">
        <summary className="w-fit cursor-pointer rounded py-2 font-medium text-[#0B3D2E]">View simulated chart values</summary>
        <ul className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">{points.map((point) => <li key={point.label}>{point.label}: {point.confidence} / 10</li>)}</ul>
      </details>
    </figure>
  );
}

export function ImpactDashboard() {
  const [range, setRange] = useState<DashboardRange>(30);
  const period = dashboardPeriods[range];
  const metrics = [
    { label: 'Journey completion', value: `${period.completion}%`, note: `${period.completed} of ${period.assigned} example activities`, Icon: CircleCheck },
    { label: 'Weekly practice consistency', value: period.weeklyPractice, note: 'Example activity days in a week', Icon: CalendarDays },
    { label: 'Self-reported confidence', value: period.confidence, note: 'Fictional end-of-period score', Icon: Activity },
    { label: 'Reflection check-ins', value: String(period.reflections), note: 'Example completed reflections', Icon: MessageSquareText },
  ];

  return <section id="impact" className="section bg-[#0B3D2E] text-white" aria-labelledby="impact-title">
    <div className="container">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div className="max-w-2xl">
          <p className="eyebrow !text-[#F7C948]">A clearer picture of practice</p>
          <h2 id="impact-title" className="mt-4 text-3xl leading-tight font-semibold tracking-tight sm:text-4xl lg:text-5xl">Small actions.<br />A story you can reflect on.</h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#DDE9E1]">A proposed dashboard for noticing practice patterns and preparing a conversation with a professional. These numbers only demonstrate how the interface works.</p>
        </div>
        <div className="flex w-fit rounded-full border border-white/20 p-1" role="group" aria-label="Dashboard date range">
          {([7, 30, 90] as const).map((days) => <button key={days} type="button" onClick={() => setRange(days)} aria-pressed={range === days} className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${range === days ? 'bg-[#F7C948] text-[#14241D]' : 'text-white hover:bg-white/10'}`}>{days} days</button>)}
        </div>
      </div>
      <div className="mt-7 inline-flex items-start gap-2 rounded-xl border border-[#F7C948]/35 bg-[#F7C948]/10 px-4 py-3 text-sm text-[#FFF4C7]">
        <Activity size={17} className="mt-0.5 shrink-0" aria-hidden="true" /><strong className="font-medium">Simulated prototype data. Not clinical evidence.</strong>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-live="polite" aria-atomic="true">
        {metrics.map(({ label, value, note, Icon }) => <article key={label} className="min-w-0 rounded-2xl border border-white/15 bg-white/[0.06] p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3"><Icon size={20} className="text-[#75DEAC]" aria-hidden="true" /><span className="text-[10px] font-semibold tracking-widest text-[#B6D6C5] uppercase">Demo · {range}d</span></div>
          <p className="mt-5 text-3xl font-semibold tracking-tight" data-metric={label}>{value}</p>
          <h3 className="mt-2 text-sm font-medium text-[#E6F0E9]">{label}</h3>
          <p className="mt-2 text-xs leading-relaxed text-[#B6D6C5]">{note}</p>
        </article>)}
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.8fr_1fr]">
        <div className="min-w-0 rounded-2xl bg-[#F8FBF7] p-5 sm:p-7"><ConfidenceChart points={period.points} range={range} /></div>
        <article className="flex flex-col rounded-2xl border border-white/15 bg-white/[0.06] p-6 sm:p-7">
          <div className="flex items-center justify-between"><Route size={24} className="text-[#F7C948]" aria-hidden="true" /><span className="text-[10px] font-semibold tracking-widest text-[#B6D6C5] uppercase">Simulated insight</span></div>
          <h3 className="mt-6 text-sm text-[#DDE9E1]">Most common drop-off point</h3>
          <p className="mt-3 text-2xl leading-snug font-semibold" data-testid="dropoff-point">{period.dropoff}</p>
          <p className="mt-4 text-sm leading-relaxed text-[#B6D6C5]">{period.dropoffNote}</p>
          <p className="mt-7 flex items-start gap-2 border-t border-white/15 pt-5 text-xs leading-relaxed text-[#DDE9E1]"><ArrowUpRight size={17} className="shrink-0 text-[#F7C948]" aria-hidden="true" />Real-world interpretation, analytics, and any professional sharing would require validation and consent.</p>
        </article>
      </div>
    </div>
  </section>;
}
