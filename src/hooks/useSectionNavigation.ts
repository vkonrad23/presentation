import { useLayoutEffect, type RefObject } from 'react';

interface NavigationOptions {
  focus?: boolean;
}

type Navigate = (id: string, options?: NavigationOptions) => void;
let navigate: Navigate | undefined;

/** Shared by ordinary anchors and the optional presentation controls. */
export function navigateToSection(id: string, options?: NavigationOptions) {
  if (navigate) navigate(id, options);
  else window.location.hash = encodeURIComponent(id);
}

/** Keep short trips spatial; cut long trips with a quiet fade instead of racing past the page. */
export function useSectionNavigation<T extends HTMLElement>(ref: RefObject<T | null>) {
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let cancelCurrent: ((settle?: boolean) => void) | undefined;

    const go: Navigate = (id, { focus = true } = {}) => {
      const target = document.getElementById(id);
      if (!target || !root.contains(target)) return;
      cancelCurrent?.();

      // Settle any animated disclosure before measuring a deep-link destination.
      root.dispatchEvent(new CustomEvent('fearlessu:section-navigation', { detail: { target } }));
      for (let parent = target.parentElement; parent; parent = parent.parentElement) {
        if (parent instanceof HTMLDetailsElement) parent.open = true;
        if (parent === root) break;
      }

      const hash = `#${encodeURIComponent(id)}`;
      if (window.location.hash !== hash) window.history.pushState(window.history.state, '', hash);

      const destination = () => {
        const margin = Number.parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0;
        const top = target.getBoundingClientRect().top + window.scrollY - margin;
        return Math.max(0, Math.min(top, document.documentElement.scrollHeight - window.innerHeight));
      };
      const jump = () => window.scrollTo({ top: destination(), behavior: 'instant' });
      let focusTransferred = false;
      const focusDestination = () => {
        if (!focus || focusTransferred) return;
        focusTransferred = true;
        const heading = target.matches('main, h1, h2, h3, [tabindex]')
          ? target
          : target.querySelector<HTMLElement>('h1, h2, h3') ?? target;
        const hadTabIndex = heading.hasAttribute('tabindex');
        if (!hadTabIndex) {
          heading.setAttribute('tabindex', '-1');
          heading.addEventListener('blur', () => heading.removeAttribute('tabindex'), { once: true });
        }
        heading.focus({ preventScroll: true });
      };

      const distance = Math.abs(destination() - window.scrollY);
      if (preference.matches || distance < 2) {
        jump();
        focusDestination();
        return;
      }

      let frame = 0;
      let animation: Animation | undefined;
      let disposed = false;
      const interrupt = () => stop();
      const interruptKey = (event: KeyboardEvent) => {
        if (['Tab', 'Escape', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) stop();
      };
      const stop = (settle = false) => {
        if (disposed) return;
        disposed = true;
        window.cancelAnimationFrame(frame);
        animation?.cancel();
        window.removeEventListener('wheel', interrupt);
        window.removeEventListener('touchstart', interrupt);
        window.removeEventListener('pointerdown', interrupt);
        window.removeEventListener('keydown', interruptKey);
        if (cancelCurrent === stop) cancelCurrent = undefined;
        if (settle) {
          jump();
          focusDestination();
        }
      };
      const finish = () => {
        if (disposed) return;
        stop(true);
      };
      cancelCurrent = stop;
      window.addEventListener('wheel', interrupt, { passive: true });
      window.addEventListener('touchstart', interrupt, { passive: true });
      window.addEventListener('pointerdown', interrupt, { passive: true });
      window.addEventListener('keydown', interruptKey);

      const main = root.querySelector('main');
      if (distance > window.innerHeight * 2.5 && main && typeof main.animate === 'function') {
        animation = main.animate([{ opacity: 1 }, { opacity: 0.16 }], { duration: 100, easing: 'ease-out', fill: 'forwards' });
        animation.finished.then(() => {
          if (disposed) return;
          jump();
          focusDestination();
          animation?.cancel();
          animation = main.animate(
            [{ opacity: 0.16, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }],
            { duration: 360, easing: 'cubic-bezier(.22, 1, .36, 1)' },
          );
          animation.finished.then(finish).catch(() => {});
        }).catch(() => {});
      } else {
        const start = window.scrollY;
        const duration = Math.min(820, 420 + distance * 0.12);
        const started = performance.now();
        const tick = (now: number) => {
          if (disposed) return;
          const progress = Math.min(1, (now - started) / duration);
          const eased = progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
          window.scrollTo({ top: start + (destination() - start) * eased, behavior: 'instant' });
          if (progress < 1) frame = window.requestAnimationFrame(tick);
          else finish();
        };
        frame = window.requestAnimationFrame(tick);
      }
    };

    const clickAnchor = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!(anchor instanceof HTMLAnchorElement) || anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self')) return;
      const url = new URL(anchor.href, window.location.href);
      if (!url.hash || url.origin !== window.location.origin || url.pathname !== window.location.pathname || url.search !== window.location.search) return;
      let id: string;
      try { id = decodeURIComponent(url.hash.slice(1)); } catch { return; }
      if (!document.getElementById(id)) return;
      event.preventDefault();
      go(id, { focus: !anchor.hasAttribute('data-preserve-navigation-focus') });
    };
    const settle = () => cancelCurrent?.(true);
    const preferenceChanged = () => { if (preference.matches) settle(); };
    const visibilityChanged = () => { if (document.hidden) settle(); };
    navigate = go;
    root.addEventListener('click', clickAnchor);
    preference.addEventListener('change', preferenceChanged);
    window.addEventListener('resize', settle);
    window.addEventListener('beforeprint', settle);
    window.addEventListener('popstate', interruptNavigation);
    document.addEventListener('visibilitychange', visibilityChanged);
    function interruptNavigation() { cancelCurrent?.(); }

    return () => {
      cancelCurrent?.();
      if (navigate === go) navigate = undefined;
      root.removeEventListener('click', clickAnchor);
      preference.removeEventListener('change', preferenceChanged);
      window.removeEventListener('resize', settle);
      window.removeEventListener('beforeprint', settle);
      window.removeEventListener('popstate', interruptNavigation);
      document.removeEventListener('visibilitychange', visibilityChanged);
    };
  }, [ref]);
}
