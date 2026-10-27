import { useState } from 'react';
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  CalendarCheck2,
  CircleCheck,
  MessageSquareText,
  Route,
  ShieldAlert,
  Users,
} from 'lucide-react';
import {
  dashboardPeriods,
  type DashboardPoint,
  type DashboardRange,
} from '../data/dashboardContent';

const metricLabel = 'Illustrative prototype metric';

function ConfidenceChart({
  points,
  range,
}: {
  points: DashboardPoint[];
  range: DashboardRange;
}) {
  const width = 600;
  const height = 200;
  const padding = 8;
  const plotBottom = height - padding;
  const coordinates = points.map((point, index) => ({
    ...point,
    x: padding + (index / (points.length - 1)) * (width - padding * 2),
    y: plotBottom - (point.confidence / 10) * (height - padding * 2),
  }));
  const line = coordinates.map((point) => point.x + ',' + point.y).join(' ');
  const area = padding + ',' + plotBottom + ' ' + line + ' ' + (width - padding) + ',' + plotBottom;

  return (
    <figure className="min-w-0" aria-labelledby="impact-chart-title">
      <figcaption id="impact-chart-title" className="text-lg font-semibold text-[#10251F]">
        Illustrative user journey visualization
      </figcaption>
      <p className="mt-2 text-xs leading-relaxed text-[#52645D]">
        {metricLabel} · Simulated confidence on a 0–10 scale.
      </p>
      <div className="mt-7 flex gap-3" aria-hidden="true">
        <div className="flex w-5 shrink-0 flex-col justify-between text-right text-xs text-[#52645D]">
          <span>10</span><span>5</span><span>0</span>
        </div>
        <svg
          viewBox={'0 0 ' + width + ' ' + height}
          preserveAspectRatio="none"
          className="block h-44 min-w-0 flex-1 sm:h-52"
        >
          {[0, 5, 10].map((value) => {
            const y = plotBottom - (value / 10) * (height - padding * 2);
            return (
              <line
                key={value}
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="#DCE5DB"
                strokeDasharray="4 6"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
          <polygon points={area} fill="#EDF4EC" />
          <polyline
            points={line}
            fill="none"
            stroke="#08754D"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          {coordinates.map((point) => (
            <circle
              key={point.label}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#08754D"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
      </div>
      <div className="mt-3 ml-8 flex justify-between gap-2 text-xs text-[#52645D]" aria-hidden="true">
        <span>{points[0].label}</span>
        <span>{points[3].label}</span>
        <span>{points[points.length - 1].label}</span>
      </div>
      <p className="sr-only">
        {metricLabel}. Simulated confidence over {range} days, beginning at{' '}
        {points[0].confidence} and ending at {points[points.length - 1].confidence}{' '}
        out of ten. This is fictional data, not an expected outcome.
      </p>
      <details className="mt-4 border-t border-[#DCE5DB] pt-2">
        <summary className="flex min-h-11 w-fit cursor-pointer items-center rounded-lg text-sm font-semibold text-[#063F32]">
          View simulated chart values
        </summary>
        <ul className="mt-3 grid gap-3 text-sm text-[#52645D] sm:grid-cols-2">
          {points.map((point) => (
            <li key={point.label} className="rounded-xl bg-[#EDF4EC] p-3">
              <span className="block text-xs">{metricLabel}</span>
              <span className="mt-1 block font-medium text-[#10251F]">
                {point.label}: {point.confidence} / 10
              </span>
            </li>
          ))}
        </ul>
      </details>
    </figure>
  );
}

export function ImpactDashboard() {
  const [range, setRange] = useState<DashboardRange>(30);
  const period = dashboardPeriods[range];
  const metrics = [
    {
      label: 'Journey completion',
      value: period.completion + '%',
      note: period.completed + ' of ' + period.assigned + ' example activities completed',
      Icon: CircleCheck,
    },
    {
      label: 'Exercise adherence',
      value: period.exerciseAdherence + '%',
      note: 'Example scheduled practices completed',
      Icon: CalendarCheck2,
    },
    {
      label: 'Self-reported confidence',
      value: period.confidence,
      note: 'Fictional end-of-period score',
      Icon: Activity,
    },
    {
      label: 'Difficulty progression',
      value: period.difficulty,
      note: 'Example perceived difficulty, on a ten-point scale',
      Icon: ArrowDownRight,
    },
    {
      label: 'Safety escalations',
      value: String(period.safetyEscalations),
      note: 'Fictional support prompts; no actual risk detection',
      Icon: ShieldAlert,
    },
    {
      label: 'Retention',
      value: period.retention + '%',
      note: 'Example accounts returning at the end of the period',
      Icon: Users,
    },
  ];

  return (
    <section id="impact" className="section bg-[#063F32] text-white" aria-labelledby="impact-title">
      <div className="container">
        <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow !text-[#E8B93F]">Progress, made understandable</p>
            <h2 id="impact-title" className="mt-3 text-[clamp(2rem,3.7vw,3.25rem)] leading-[1.12] font-semibold tracking-[-0.045em]">
              Small steps.<br />A clearer perspective.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#D6E5DC]">
              An interface concept for reflecting on habits, adjusting the next step,
              and preparing a conversation with a professional.
            </p>
          </div>
          <div
            className="flex w-fit shrink-0 rounded-full border border-white/25 bg-white/5 p-1"
            role="group"
            aria-label="Dashboard date range"
          >
            {([7, 30, 90] as const).map((days) => (
              <button
                key={days}
                type="button"
                onClick={() => setRange(days)}
                aria-pressed={range === days}
                className={[
                  'min-h-11 rounded-full px-4 text-sm font-semibold focus-visible:!outline-[#E8B93F]',
                  range === days
                    ? 'bg-[#E8B93F] text-[#10251F]'
                    : 'text-white hover:bg-white/10',
                ].join(' ')}
              >
                {days} days
              </button>
            ))}
          </div>
        </div>

        <div className="mt-7 flex items-start gap-3 rounded-xl border border-[#E8B93F]/40 bg-[#E8B93F]/10 px-4 py-3 text-sm leading-relaxed text-[#FFF1C6]">
          <Activity size={19} className="mt-0.5 shrink-0" aria-hidden="true" />
          <p>
            <strong className="font-semibold">Simulated prototype data. Not clinical evidence.</strong>{' '}
            Every value below is fictional and demonstrates the interface only.
          </p>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map(({ label, value, note, Icon }) => (
            <article key={label} className="min-w-0 rounded-2xl border border-white/20 bg-white/[0.045] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <Icon size={21} className="text-[#ADE1C5]" aria-hidden="true" />
                <span className="text-xs font-medium text-[#C0D7C9]">{range}-day example</span>
              </div>
              <h3 className="mt-5 text-base font-medium text-[#E2EDE6]">{label}</h3>
              <p
                className="mt-2 text-[clamp(1.8rem,2.5vw,2.5rem)] leading-tight font-semibold tracking-tight tabular-nums"
                data-metric={label}
              >
                {value}
              </p>
              <p className="mt-2 text-xs font-medium text-[#E9CF82]">{metricLabel}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#C0D7C9]">{note}</p>
            </article>
          ))}
        </div>
        <p className="sr-only" role="status">Showing simulated prototype metrics for {range} days.</p>

        <div className="mt-5 grid items-start gap-5 lg:grid-cols-[1.6fr_1fr]">
          <div className="min-w-0 rounded-2xl bg-[#F7F8F2] p-5 sm:p-7">
            <ConfidenceChart points={period.points} range={range} />
          </div>
          <article className="rounded-2xl border border-white/20 bg-white/[0.045] p-6 sm:p-7">
            <div className="flex items-center gap-3 text-[#E8B93F]">
              <Route size={23} aria-hidden="true" />
              <span className="text-xs font-semibold tracking-wide uppercase">An example to reflect on</span>
            </div>
            <h3 className="mt-5 text-base text-[#D6E5DC]">Most common drop-off point</h3>
            <p className="mt-2 min-h-16 text-2xl leading-snug font-semibold" data-testid="dropoff-point">
              {period.dropoff}
            </p>
            <p className="mt-3 min-h-16 text-base leading-relaxed text-[#C0D7C9]">{period.dropoffNote}</p>
            <div className="mt-5 flex items-start gap-3 border-t border-white/20 pt-5">
              <MessageSquareText size={20} className="mt-1 shrink-0 text-[#ADE1C5]" aria-hidden="true" />
              <div>
                <p className="text-base text-[#E2EDE6]">{period.reflections} reflection check-ins</p>
                <p className="mt-1 text-xs text-[#E9CF82]">{metricLabel}</p>
              </div>
            </div>
            <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-[#C0D7C9]">
              <ArrowUpRight size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
              Production analytics and professional sharing would require validation,
              appropriate safeguards, and user consent.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
