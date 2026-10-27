import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Clock3, Expand, Pause, Play, RotateCcw, Video, X } from 'lucide-react';
import { pitchScript } from '../data/dashboardContent';
import { useContentTransition, useReducedMotion } from '../hooks/useMotion';

function formatTime(seconds: number) {
  return Math.floor(seconds / 60) + ':' + String(seconds % 60).padStart(2, '0');
}

export function PitchTimer() {
  const [remaining, setRemaining] = useState(60);
  const [running, setRunning] = useState(false);
  const [teleprompter, setTeleprompter] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const scriptRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const remainingRef = useRef(remaining);
  const reducedMotion = useReducedMotion();
  const timerState = remaining === 0 ? 'finished' : running ? 'running' : remaining < 60 ? 'paused' : 'ready';
  useContentTransition(statusRef, timerState, { duration: 220, distance: 3 });

  useEffect(() => {
    remainingRef.current = remaining;
  }, [remaining]);

  useEffect(() => {
    if (!running) return;

    const deadline = Date.now() + remainingRef.current * 1000;
    const timer = window.setInterval(() => {
      const next = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setRemaining(next);
      if (next === 0) setRunning(false);
    }, 150);

    return () => window.clearInterval(timer);
  }, [running]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (teleprompter && !dialog.open) dialog.showModal();
    if (!teleprompter && dialog.open) dialog.close();
  }, [teleprompter]);

  useEffect(() => {
    const element = scriptRef.current;
    if (!teleprompter || !element) return;
    if (reducedMotion) return;

    const scrollableHeight = element.scrollHeight - element.clientHeight;
    element.scrollTo({
      top: (1 - remaining / 60) * scrollableHeight,
      behavior: running ? 'smooth' : 'auto',
    });
  }, [remaining, running, teleprompter, reducedMotion]);

  function resetTimer() {
    setRunning(false);
    setRemaining(60);
    if (scriptRef.current) scriptRef.current.scrollTop = 0;
  }

  const controls = (inDialog = false) => (
    <div className="flex flex-wrap items-center gap-2.5">
      <button
        type="button"
        className={[
          'pitch-control button min-w-[208px]',
          inDialog ? '!border-[#E8B93F] !bg-[#E8B93F] !text-[#10251F]' : '',
        ].join(' ')}
        onClick={() => setRunning(true)}
        disabled={running || remaining === 0}
      >
        <Play size={16} fill="currentColor" aria-hidden="true" />
        {remaining === 60 ? 'Start 60-second timer' : 'Resume timer'}
      </button>
      <button
        type="button"
        className={[
          'pitch-control button button-secondary',
          inDialog ? '!border-white/30 !bg-transparent !text-white' : '',
        ].join(' ')}
        onClick={() => setRunning(false)}
        disabled={!running}
      >
        <Pause size={16} aria-hidden="true" />Pause
      </button>
      <button
        type="button"
        className={[
          'pitch-control button button-secondary',
          inDialog ? '!border-white/30 !bg-transparent !text-white' : '',
        ].join(' ')}
        onClick={resetTimer}
      >
        <RotateCcw size={16} aria-hidden="true" />Reset
      </button>
    </div>
  );

  const status = remaining === 0
    ? 'Rehearsal complete. Reset when you’re ready.'
    : running
      ? 'Rehearsal in progress'
      : remaining < 60
        ? 'Timer paused'
        : 'Ready when you are';

  return (
    <section id="pitch" className="section bg-[#EDF4EC]" aria-labelledby="pitch-title" data-timer-state={timerState}>
      <div className="container">
        <div className="grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div>
            <p className="eyebrow">The one-minute story</p>
            <h2 id="pitch-title" className="section-heading mt-3">
              From avoidance<br />toward possibility.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-[#52645D]">
              A working rehearsal space for a clear, responsible founder story.
              Practice the pace, then make room for the questions that matter.
            </p>
            <div className="mt-7 flex items-start gap-4 rounded-2xl border border-[#DCE5DB] bg-[#F7F8F2] p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#063F32] text-[#E8B93F]">
                <Video size={21} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-base font-semibold text-[#10251F]">Founder video · to be recorded</h3>
                <p className="mt-1 text-sm leading-relaxed text-[#52645D]">
                  Video placeholder. Add the final founder recording before submission.
                </p>
              </div>
            </div>
          </div>

          <div className="min-w-0 rounded-3xl border border-[#DCE5DB] bg-white p-5 shadow-[0_12px_40px_rgba(6,63,50,0.035)] sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE5DB] pb-5">
              <div>
                <p className="text-xs font-semibold tracking-[0.12em] text-[#52645D] uppercase">Pitch rehearsal</p>
                <h3 className="mt-2 text-lg font-semibold text-[#10251F]">One fear. One manageable step.</h3>
              </div>
              <span className="pitch-timer-display inline-flex min-w-[100px] items-center justify-center gap-2 rounded-full bg-[#FFF8E7] px-4 py-3 text-xl font-semibold tabular-nums text-[#063F32]" data-state={timerState}>
                <Clock3 size={18} aria-hidden="true" />
                <output aria-label="Pitch time remaining" data-testid="pitch-time">{formatTime(remaining)}</output>
              </span>
            </div>

            <p className="mt-5 border-l-2 border-[#E8B93F] pl-4 text-base leading-relaxed text-[#52645D]">
              Personalized mental health support and new intervention ideas need a responsible
              path from hypothesis to evidence. FearlessU is exploring both.
            </p>
            <details className="group mt-3">
              <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-lg text-sm font-semibold text-[#063F32]">
                Read the full draft script
                <ChevronDown size={18} className="transition-transform group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
              </summary>
              <blockquote className="mt-3 max-h-80 overflow-y-auto rounded-xl bg-[#F7F8F2] p-5 text-base leading-[1.8] text-[#52645D]" tabIndex={0}>
                {pitchScript}
              </blockquote>
            </details>

            <div className="mt-5 border-t border-[#DCE5DB] pt-5">{controls()}</div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <button
                type="button"
                onClick={() => setTeleprompter(true)}
                className="pitch-control inline-flex min-h-11 items-center gap-2 rounded-lg px-1 text-sm font-semibold text-[#063F32] hover:text-[#08754D]"
              >
                <Expand size={17} aria-hidden="true" />Teleprompter mode
              </button>
              <p ref={statusRef} className="pitch-status inline-flex min-h-5 items-center gap-2 text-xs leading-relaxed text-[#52645D]" data-state={timerState} role="status">
                <span className="pitch-status-dot" aria-hidden="true" />
                {status}
              </p>
            </div>
          </div>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setTeleprompter(false)}
        onCancel={() => setTeleprompter(false)}
        aria-labelledby="teleprompter-title"
        className="m-auto max-h-[94dvh] w-[calc(100%_-_24px)] max-w-4xl overflow-y-auto rounded-3xl border border-white/20 bg-[#063F32] p-0 text-white shadow-2xl backdrop:bg-[#10251F]/80"
      >
        <div className="flex items-center justify-between gap-3 border-b border-white/20 p-5 sm:px-8">
          <div>
            <p className="text-xs font-medium tracking-widest text-[#E8B93F] uppercase">FearlessU pitch</p>
            <h3 id="teleprompter-title" className="mt-1 text-base font-semibold">Teleprompter mode</h3>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <span className="pitch-timer-display min-w-[60px] text-right text-2xl font-semibold tabular-nums" data-state={timerState} aria-label={'Time remaining: ' + formatTime(remaining)}>
              {formatTime(remaining)}
            </span>
            <button
              type="button"
              onClick={() => setTeleprompter(false)}
              aria-label="Close teleprompter"
              className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10 focus-visible:!outline-[#E8B93F]"
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>
        </div>
        <div
          ref={scriptRef}
          tabIndex={0}
          aria-label="Pitch script, scroll to read"
          className="max-h-[45dvh] overflow-y-auto px-6 py-8 sm:px-12"
        >
          <p className="text-xl leading-[1.9] font-medium sm:text-3xl sm:leading-[1.8]">{pitchScript}</p>
        </div>
        <div className="border-t border-white/20 p-5 sm:px-8">
          {controls(true)}
          <p className="mt-3 text-xs leading-relaxed text-[#C0D7C9]">
            The script scrolls with the timer. Scroll manually at any time.
            Automatic movement respects reduced-motion preferences.
          </p>
        </div>
      </dialog>
    </section>
  );
}
