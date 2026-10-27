import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Clock3, Expand, Pause, Play, RotateCcw, Video, X } from 'lucide-react';
import { pitchScript } from '../data/dashboardContent';

function formatTime(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}

export function PitchTimer() {
  const [remaining, setRemaining] = useState(60);
  const [running, setRunning] = useState(false);
  const [teleprompter, setTeleprompter] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const scriptRef = useRef<HTMLDivElement>(null);
  const remainingRef = useRef(remaining);
  remainingRef.current = remaining;

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
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;
    const available = element.scrollHeight - element.clientHeight;
    element.scrollTo({ top: (1 - remaining / 60) * available, behavior: running ? 'smooth' : 'auto' });
  }, [remaining, running, teleprompter]);

  function resetTimer() {
    setRunning(false);
    setRemaining(60);
    if (scriptRef.current) scriptRef.current.scrollTop = 0;
  }

  const controls = (inDialog = false) => <div className="flex flex-wrap items-center gap-2.5">
    <button type="button" className={`button ${inDialog ? '!border-[#F7C948] !bg-[#F7C948] !text-[#14241D]' : ''}`} onClick={() => setRunning(true)} disabled={running || remaining === 0}>
      <Play size={16} fill="currentColor" aria-hidden="true" />{remaining === 60 ? 'Start 60-second timer' : 'Resume timer'}
    </button>
    <button type="button" className={`button button-secondary ${inDialog ? '!border-white/30 !bg-transparent !text-white' : ''}`} onClick={() => setRunning(false)} disabled={!running}><Pause size={16} aria-hidden="true" />Pause</button>
    <button type="button" className={`button button-secondary ${inDialog ? '!border-white/30 !bg-transparent !text-white' : ''}`} onClick={resetTimer}><RotateCcw size={16} aria-hidden="true" />Reset</button>
  </div>;

  return <section id="pitch" className="section bg-[#F1F6EF]" aria-labelledby="pitch-title">
    <div className="container">
      <div className="grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div>
          <p className="eyebrow">The one-minute story</p>
          <h2 id="pitch-title" className="mt-4 text-3xl leading-tight font-semibold tracking-tight text-[#0B3D2E] sm:text-4xl lg:text-5xl">One fear.<br />One step.<br /><span className="text-[#08764E]">More possibility.</span></h2>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-[#607067]">A working pitch rehearsal space. Find the story, practice the pace, and make room for the questions that matter.</p>
          <div className="relative mt-8 flex min-h-48 flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#DDE9E1] bg-[#0B3D2E] p-7 text-center text-white">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full border border-white/10" aria-hidden="true" />
            <div className="absolute -bottom-14 -left-12 h-44 w-44 rounded-full border border-white/10" aria-hidden="true" />
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-[#F7C948]"><Video size={22} aria-hidden="true" /></span>
            <strong className="mt-4 text-base font-semibold">Founder video, coming next</strong>
            <p className="mt-2 max-w-xs text-xs leading-relaxed text-[#C1D7C9]">Video placeholder. Record and add the founder’s final 60-second pitch before submission.</p>
          </div>
        </div>
        <div className="min-w-0 rounded-3xl border border-[#DDE9E1] bg-white p-5 shadow-[0_16px_48px_rgba(11,61,46,0.04)] sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DDE9E1] pb-5">
            <div><p className="text-[10px] font-bold tracking-[0.18em] text-[#607067] uppercase">Draft pitch script</p><h3 className="mt-2 text-lg font-semibold text-[#14241D]">From avoidance toward action.</h3></div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#FFF4C7] px-3 py-2 text-sm font-semibold tabular-nums text-[#0B3D2E]"><Clock3 size={16} aria-hidden="true" /><output aria-label="Pitch time remaining" data-testid="pitch-time">{formatTime(remaining)}</output></span>
          </div>
          <blockquote className="mt-6 border-l-2 border-[#F7C948] pl-5 text-[15px] leading-[1.9] text-[#45594D]">{pitchScript}</blockquote>
          <div className="mt-7 border-t border-[#DDE9E1] pt-6">{controls()}</div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <button type="button" onClick={() => setTeleprompter(true)} className="inline-flex items-center gap-2 rounded-lg py-2 text-sm font-semibold text-[#0B3D2E] hover:text-[#08764E]"><Expand size={16} aria-hidden="true" />Teleprompter mode<ArrowUpRight size={14} aria-hidden="true" /></button>
            <p className="text-xs text-[#607067]" role="status">{remaining === 0 ? 'Time is up. Reset to rehearse again.' : running ? 'Rehearsal in progress' : remaining < 60 ? 'Timer paused' : 'Ready when you are'}</p>
          </div>
        </div>
      </div>
    </div>
    <dialog ref={dialogRef} onClose={() => setTeleprompter(false)} onCancel={() => setTeleprompter(false)} aria-labelledby="teleprompter-title" className="m-auto max-h-[92dvh] w-[calc(100%_-_24px)] max-w-4xl overflow-hidden rounded-3xl border border-white/20 bg-[#0B3D2E] p-0 text-white shadow-2xl backdrop:bg-[#071F17]/80">
      <div className="flex items-center justify-between gap-4 border-b border-white/15 p-5 sm:px-8">
        <div><p className="text-xs font-medium tracking-widest text-[#F7C948] uppercase">FearlessU pitch</p><h3 id="teleprompter-title" className="mt-1 font-semibold">Teleprompter mode</h3></div>
        <div className="flex items-center gap-4"><span className="text-2xl font-semibold tabular-nums" aria-label={`Time remaining: ${formatTime(remaining)}`}>{formatTime(remaining)}</span><button type="button" onClick={() => setTeleprompter(false)} aria-label="Close teleprompter" className="rounded-full p-2 hover:bg-white/10"><X size={22} aria-hidden="true" /></button></div>
      </div>
      <div ref={scriptRef} tabIndex={0} aria-label="Pitch script, scroll to read" className="max-h-[48dvh] overflow-y-auto px-6 py-9 sm:px-12"><p className="text-xl leading-[1.9] font-medium sm:text-3xl sm:leading-[1.8]">{pitchScript}</p></div>
      <div className="border-t border-white/15 p-5 sm:px-8">{controls(true)}<p className="mt-3 text-xs leading-relaxed text-[#C1D7C9]">The script scrolls with the timer. Scroll manually at any time. Automatic movement respects reduced-motion preferences.</p></div>
    </dialog>
  </section>;
}
