import { useCallback, useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { navigateToSection } from '../hooks/useSectionNavigation';

const chapters = [
  { id: 'top', title: 'Overview' },
  { id: 'problem', title: 'The problem' },
  { id: 'product', title: 'The approach' },
  { id: 'journey', title: 'Live prototype' },
  { id: 'research', title: 'Research vision' },
  { id: 'safety', title: 'Responsible design' },
  { id: 'evidence', title: 'Evidence roadmap' },
  { id: 'business', title: 'Business model' },
  { id: 'accelerator', title: 'Accelerator goals' },
  { id: 'pitch', title: 'Founder pitch' },
];

function currentChapter() {
  const boundary = (document.querySelector('header')?.getBoundingClientRect().bottom ?? 88) + 80;
  let index = 0;
  chapters.forEach((chapter, position) => {
    const target = document.getElementById(chapter.id);
    if (target && target.getBoundingClientRect().top <= boundary) index = position;
  });
  return index;
}

export function PresentationControls({ active, onExit }: { active: boolean; onExit: () => void }) {
  const [index, setIndex] = useState(0);
  const [obscured, setObscured] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const controlsRef = useRef<HTMLElement>(null);
  const selectedRef = useRef(0);
  const pendingRef = useRef<{ index: number; until: number } | null>(null);
  const timerRef = useRef(0);
  const scheduleRef = useRef<() => void>(() => {});

  const request = useCallback((next: number) => {
    selectedRef.current = next;
    pendingRef.current = { index: next, until: performance.now() + 1100 };
    setIndex(next);
    setAnnouncement(`Chapter ${next + 1} of ${chapters.length}: ${chapters[next].title}`);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => { pendingRef.current = null; scheduleRef.current(); }, 1100);
  }, []);

  const exit = useCallback(() => {
    onExit();
    window.requestAnimationFrame(() => {
      const trigger = document.getElementById('present-toggle');
      // The trigger lives in the footer; return to a visible keyboard context on exit.
      trigger?.scrollIntoView({ behavior: 'instant', block: 'center' });
      trigger?.focus({ preventScroll: true });
    });
  }, [onExit]);

  useLayoutEffect(() => {
    if (!active) return;
    const initial = currentChapter();
    selectedRef.current = initial;
    setIndex(initial);
    const element = document.documentElement;
    const previous = element.getAttribute('data-presentation-active');
    element.setAttribute('data-presentation-active', 'true');
    const focusFrame = window.requestAnimationFrame(() => {
      const target = document.getElementById('presentation-chapter');
      target?.focus({ preventScroll: true });
    });
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.clearTimeout(timerRef.current);
      pendingRef.current = null;
      if (previous === null) element.removeAttribute('data-presentation-active'); else element.setAttribute('data-presentation-active', previous);
    };
  }, [active]);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const actual = currentChapter();
      const pending = pendingRef.current;
      if (pending && actual !== pending.index && performance.now() < pending.until) return;
      pendingRef.current = null;
      selectedRef.current = actual;
      setIndex(actual);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    scheduleRef.current = schedule;
    const releasePending = () => { pendingRef.current = null; schedule(); };
    const requested = (event: Event) => {
      const target = (event as CustomEvent<{ target: HTMLElement }>).detail?.target;
      const next = chapters.findIndex(chapter => chapter.id === target?.id);
      if (next >= 0) request(next);
    };
    const root = document.getElementById('top');
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    root?.addEventListener('fearlessu:section-navigation', requested);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('hashchange', releasePending);
    window.addEventListener('wheel', releasePending, { passive: true });
    window.addEventListener('popstate', releasePending);
    return () => {
      observer.disconnect();
      root?.removeEventListener('fearlessu:section-navigation', requested);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('hashchange', releasePending);
      window.removeEventListener('wheel', releasePending);
      window.removeEventListener('popstate', releasePending);
      window.cancelAnimationFrame(frame);
      scheduleRef.current = () => {};
    };
  }, [active, request]);

  useEffect(() => {
    if (!active) return;
    const update = () => {
      const focused = document.activeElement;
      const editing = focused instanceof HTMLElement && (focused.matches('textarea, input:not([type="range"]):not([type="radio"]):not([type="checkbox"]):not([type="button"]):not([type="submit"])') || focused.isContentEditable);
      const mobileEditing = window.innerWidth < 768 && editing;
      setObscured(Boolean(document.querySelector('dialog[open], #menu-toggle[aria-expanded="true"], #about-toggle[aria-expanded="true"]')) || mobileEditing);
    };
    const observer = new MutationObserver(update);
    observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['open', 'aria-expanded'] });
    document.addEventListener('focusin', update);
    document.addEventListener('focusout', update);
    window.addEventListener('resize', update);
    update();
    return () => {
      observer.disconnect();
      document.removeEventListener('focusin', update);
      document.removeEventListener('focusout', update);
      window.removeEventListener('resize', update);
    };
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const keydown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.isComposing || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (document.querySelector('dialog[open], #menu-toggle[aria-expanded="true"], #about-toggle[aria-expanded="true"]')) return;
      if (event.key === 'Escape') { event.preventDefault(); exit(); return; }
      const target = event.target;
      if (!(target instanceof HTMLElement) || !controlsRef.current?.contains(target)) return;
      if (target.closest('input, textarea, select, [role="slider"], [role="tab"], [role="tablist"]') || target.isContentEditable) return;
      const direction = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
      if (!direction) return;
      const next = selectedRef.current + direction;
      if (next < 0 || next >= chapters.length) return;
      event.preventDefault();
      request(next);
      navigateToSection(chapters[next].id, { focus: false });
    };
    // Read modal/menu state before their Escape handlers close them in this event.
    window.addEventListener('keydown', keydown, true);
    return () => window.removeEventListener('keydown', keydown, true);
  }, [active, exit, request]);

  const followChapter = (event: MouseEvent<HTMLAnchorElement>, direction: number) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const destination = selectedRef.current + direction;
    if (destination < 0 || destination >= chapters.length) return;
    request(destination);
    navigateToSection(chapters[destination].id, { focus: false });
  };

  if (!active) return null;
  const previous = index > 0 ? index - 1 : null;
  const next = index < chapters.length - 1 ? index + 1 : null;
  return (
    <aside ref={controlsRef} className={`presentation-controls no-print ${obscured ? 'is-obscured' : ''}`} aria-label="Guided presentation controls" aria-hidden={obscured || undefined} inert={obscured} data-chapter={chapters[index].id}>
      <div className="presentation-controls__row">
        <a id="presentation-previous" href={previous === null ? undefined : `#${chapters[previous].id}`} data-preserve-navigation-focus aria-disabled={previous === null} tabIndex={previous === null ? -1 : 0} className="presentation-controls__arrow" aria-label="Previous chapter" onClickCapture={event => followChapter(event, -1)}><ArrowLeft size={20} aria-hidden="true" /></a>
        <div className="presentation-controls__chapter">
          <label htmlFor="presentation-chapter"><span>Guided presentation</span><span>{String(index + 1).padStart(2, '0')} / {String(chapters.length).padStart(2, '0')}</span></label>
          <select id="presentation-chapter" aria-label="Presentation chapter" value={chapters[index].id} onChange={event => { const position = chapters.findIndex(chapter => chapter.id === event.target.value); if (position >= 0) { request(position); navigateToSection(chapters[position].id, { focus: false }); } }}>
            {chapters.map((chapter, position) => <option key={chapter.id} value={chapter.id}>{String(position + 1).padStart(2, '0')} · {chapter.title}</option>)}
          </select>
        </div>
        <a id="presentation-next" href={next === null ? undefined : `#${chapters[next].id}`} data-preserve-navigation-focus aria-disabled={next === null} tabIndex={next === null ? -1 : 0} className="presentation-controls__arrow" aria-label="Next chapter" onClickCapture={event => followChapter(event, 1)}><ArrowRight size={20} aria-hidden="true" /></a>
        <button type="button" className="presentation-controls__exit" onClick={exit} aria-label="Exit guided presentation"><X size={19} aria-hidden="true" /></button>
      </div>
      <div className="presentation-controls__progress" aria-hidden="true"><span style={{ width: `${(index + 1) / chapters.length * 100}%` }} /></div>
      <p role="status" aria-live="polite" className="sr-only">{announcement}</p>
    </aside>
  );
}
