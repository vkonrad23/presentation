import { useLayoutEffect, useRef, useSyncExternalStore } from 'react';
import type { RefObject } from 'react';

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
const EASE_OUT = 'cubic-bezier(.22, 1, .36, 1)';

function subscribeToMotion(callback: () => void) {
  const preference = window.matchMedia(REDUCED_MOTION);
  preference.addEventListener('change', callback);
  return () => preference.removeEventListener('change', callback);
}

export function useReducedMotion() {
  return useSyncExternalStore(
    subscribeToMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => true,
  );
}

interface ContentTransitionOptions {
  duration?: number;
  distance?: number;
  delay?: number;
  disabled?: boolean;
}

/** Animate a discrete update without remounting its controls or losing draft state. */
export function useContentTransition<T extends HTMLElement>(
  ref: RefObject<T | null>,
  key: string | number,
  { duration = 340, distance = 10, delay = 0, disabled = false }: ContentTransitionOptions = {},
) {
  const reduced = useReducedMotion();
  const previousKey = useRef(key);

  useLayoutEffect(() => {
    if (previousKey.current === key) return;
    previousKey.current = key;
    const element = ref.current;
    if (reduced || disabled || !element || typeof element.animate !== 'function') return;
    const focused = document.activeElement;
    if (focused && element.contains(focused) && focused.matches('input, textarea, select, [contenteditable]')) return;

    const animation = element.animate(
      [
        { opacity: 0.35, transform: `translateY(${distance}px)` },
        { opacity: 1, transform: 'translateY(0)' },
      ],
      { duration, delay, easing: EASE_OUT, fill: 'backwards' },
    );
    return () => animation.cancel();
  }, [ref, key, reduced, disabled, duration, distance, delay]);
}

interface DisclosureAnimation {
  animation: Animation;
  opening: boolean;
  height: string;
  overflow: string;
  inertChildren: Array<{ element: HTMLElement; inert: boolean }>;
}

const REVEAL_GROUPS = [
  'main > .section > .container > *',
  'main > .sample-brief-wrap .sample-brief',
  'footer > .container > *',
].join(',');

function getHashTarget(root: HTMLElement) {
  if (!window.location.hash) return null;
  let id: string;
  try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return null; }
  const target = document.getElementById(id);
  return target && root.contains(target) ? target : null;
}

/** Progressive page motion: content remains native and usable without the enhancement. */
export function usePageMotion<T extends HTMLElement>(ref: RefObject<T | null>) {
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const exposeHashTarget = () => {
      const target = getHashTarget(root);
      if (!target) return;
      let opened = false;
      for (let parent = target.parentElement; parent; parent = parent.parentElement) {
        if (parent instanceof HTMLDetailsElement && !parent.open) {
          parent.open = true;
          opened = true;
        }
        if (parent === root) break;
      }
      if (opened) target.scrollIntoView({ block: 'start', behavior: 'instant' });
    };
    window.addEventListener('hashchange', exposeHashTarget);
    exposeHashTarget();
    return () => window.removeEventListener('hashchange', exposeHashTarget);
  }, [ref]);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || reduced || typeof Element.prototype.animate !== 'function') return;

    const registered = new Set<HTMLElement>();
    const pending = new Set<HTMLElement>();
    const running = new Map<HTMLElement, Animation>();
    const disclosures = new Map<HTMLDetailsElement, DisclosureAnimation>();
    let scanFrame = 0;

    const reveal = (element: HTMLElement, immediate = false) => {
      if (!pending.delete(element)) return;
      observer?.unobserve(element);
      element.dataset.motionState = 'visible';
      if (immediate) return;
      const delay = Number(element.dataset.motionDelay ?? 0);
      const animation = element.animate(
        [{ opacity: 0, transform: 'translateY(20px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 680, delay, easing: EASE_OUT, fill: 'backwards' },
      );
      running.set(element, animation);
      animation.finished.then(() => {
        if (running.get(element) === animation) running.delete(element);
      }).catch(() => {});
    };

    const observer = typeof IntersectionObserver === 'function'
      ? new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) reveal(entry.target as HTMLElement); });
      }, { threshold: 0.01, rootMargin: '0px 0px -5% 0px' })
      : null;

    const register = (element: HTMLElement, delay = 0) => {
      if (registered.has(element) || element.closest('details:not([open])')) return;
      if (element.matches('[role="alert"], [aria-live], .pitch-placeholder')) return;
      const box = element.getBoundingClientRect();
      if (box.height === 0) return;
      registered.add(element);
      if (!observer || box.bottom <= 0 || element.contains(document.activeElement)) return;
      element.dataset.motionState = 'pending';
      element.dataset.motionDelay = String(Math.min(delay, 210));
      pending.add(element);
      observer.observe(element);
    };

    const scan = () => {
      if (scanFrame) window.cancelAnimationFrame(scanFrame);
      scanFrame = 0;
      const hero = root.querySelector('.hero-copy');
      hero?.querySelectorAll<HTMLElement>(':scope > *').forEach((element, index) => register(element, index * 55));
      root.querySelectorAll<HTMLElement>('.hero-product, .trust-item').forEach((element, index) => register(element, 110 + index * 35));
      root.querySelectorAll<HTMLElement>(REVEAL_GROUPS).forEach(element => {
        if (element.matches('.problem-layout')) {
          element.querySelectorAll<HTMLElement>(':scope > .problem-intro, :scope > .problem-list > li').forEach((child, index) => register(child, index * 50));
          return;
        }
        const children = Array.from(element.children);
        if (element.matches('.capability-list, .process-grid') || (element.matches('.grid, ol') && children.length > 1 && children.every(child => child.matches('article, li')))) {
          children.forEach((child, index) => { if (child instanceof HTMLElement) register(child, index * 55); });
          return;
        }
        register(element);
      });
    };

    const scheduleScan = () => { if (!scanFrame) scanFrame = window.requestAnimationFrame(scan); };
    const mutations = new MutationObserver(scheduleScan);
    mutations.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ['open'] });
    scan();

    const revealContaining = (target: Element) => {
      pending.forEach(element => {
        if (element === target || element.contains(target) || target.contains(element)) reveal(element, true);
      });
      running.forEach((animation, element) => {
        if (element === target || element.contains(target) || target.contains(element)) {
          animation.cancel();
          running.delete(element);
        }
      });
    };
    const focusVisibleContent = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      for (let details = event.target.closest('details'); details; details = details.parentElement?.closest('details') ?? null) {
        const job = disclosures.get(details);
        if (job?.opening) finishDisclosure(details, job);
      }
      revealContaining(event.target);
    };
    const revealHashTarget = () => {
      const target = getHashTarget(root);
      if (!target) return;
      for (let parent = target.parentElement; parent; parent = parent.parentElement) {
        if (parent instanceof HTMLDetailsElement) {
          const job = disclosures.get(parent);
          if (job) {
            job.opening = true;
            finishDisclosure(parent, job);
          }
          parent.open = true;
        }
        if (parent === root) break;
      }
      scan();
      revealContaining(target);
    };

    function finishDisclosure(details: HTMLDetailsElement, job: DisclosureAnimation) {
      if (disclosures.get(details) !== job) return;
      disclosures.delete(details);
      job.animation.cancel();
      if (!job.opening && details.contains(document.activeElement)) {
        details.querySelector<HTMLElement>(':scope > summary')?.focus({ preventScroll: true });
      }
      details.open = job.opening;
      details.style.height = job.height;
      details.style.overflow = job.overflow;
      job.inertChildren.forEach(child => { child.element.inert = child.inert; });
      delete details.dataset.motionDisclosure;
      scheduleScan();
    }

    const animateDisclosure = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const summary = target.closest('summary');
      const details = summary?.parentElement;
      if (!(summary instanceof HTMLElement) || !(details instanceof HTMLDetailsElement) || summary !== details.querySelector(':scope > summary')) return;
      if (target.closest('a, button, input, select, textarea')) return;
      event.preventDefault();
      revealContaining(details);

      const previous = disclosures.get(details);
      const opening = previous ? !previous.opening : !details.open;
      const start = details.getBoundingClientRect().height;
      const height = previous?.height ?? details.style.height;
      const overflow = previous?.overflow ?? details.style.overflow;
      previous?.animation.cancel();
      disclosures.delete(details);
      previous?.inertChildren.forEach(child => { child.element.inert = child.inert; });

      if (!opening && details.contains(document.activeElement)) summary.focus({ preventScroll: true });
      const inertChildren = Array.from(details.children).filter((child): child is HTMLElement => child instanceof HTMLElement && child !== summary).map(element => ({ element, inert: element.inert }));
      if (!opening) inertChildren.forEach(child => { child.element.inert = true; });

      // Measure both native boxes so padding, borders, and wrapped summaries are included.
      details.style.height = height;
      details.style.overflow = overflow;
      details.open = opening;
      const end = details.getBoundingClientRect().height;
      details.open = true;
      details.style.height = `${start}px`;
      details.style.overflow = 'hidden';
      details.dataset.motionDisclosure = opening ? 'opening' : 'closing';
      const animation = details.animate([{ height: `${start}px` }, { height: `${end}px` }], { duration: 320, easing: EASE_OUT });
      const job: DisclosureAnimation = { animation, opening, height, overflow, inertChildren };
      disclosures.set(details, job);
      animation.finished.then(() => finishDisclosure(details, job)).catch(() => {});
    };

    const settle = () => {
      pending.forEach(element => reveal(element, true));
      running.forEach(animation => animation.cancel());
      running.clear();
      disclosures.forEach((job, details) => finishDisclosure(details, job));
    };
    const settleResizedDisclosures = () => {
      disclosures.forEach((job, details) => finishDisclosure(details, job));
      scheduleScan();
    };
    root.addEventListener('click', animateDisclosure);
    root.addEventListener('focusin', focusVisibleContent);
    window.addEventListener('hashchange', revealHashTarget);
    window.addEventListener('beforeprint', settle);
    window.addEventListener('resize', settleResizedDisclosures);
    revealHashTarget();

    return () => {
      observer?.disconnect();
      mutations.disconnect();
      root.removeEventListener('click', animateDisclosure);
      root.removeEventListener('focusin', focusVisibleContent);
      window.removeEventListener('hashchange', revealHashTarget);
      window.removeEventListener('beforeprint', settle);
      window.removeEventListener('resize', settleResizedDisclosures);
      settle();
      window.cancelAnimationFrame(scanFrame);
      registered.forEach(element => {
        delete element.dataset.motionState;
        delete element.dataset.motionDelay;
      });
    };
  }, [ref, reduced]);
}
