import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { navigation } from '../data/content';

export function Logo() {
  return (
    <span className="brand">
      <svg width="42" height="44" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M12 38V28C12 15 21 8 36 8c-1 14-8 22-20 22" stroke="currentColor" strokeWidth="3.3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m13 36 17-19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="36" cy="36" r="4.5" fill="#E8B93F" />
      </svg>
      <span>Fearless<span className="brand-u">U</span></span>
    </span>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('product');
  const [scrolled, setScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 1280px)').matches);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });
  const headerRef = useRef<HTMLElement>(null);
  const navigationRef = useRef<HTMLElement>(null);
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>());

  useEffect(() => {
    const viewport = window.matchMedia('(min-width: 1280px)');
    const updateViewport = () => {
      setIsDesktop(viewport.matches);
      if (viewport.matches) setMenuOpen(false);
    };
    updateViewport();
    viewport.addEventListener('change', updateViewport);
    return () => viewport.removeEventListener('change', updateViewport);
  }, []);

  useLayoutEffect(() => {
    if (!isDesktop) {
      setIndicator(previous => previous.ready ? { ...previous, ready: false } : previous);
      return;
    }
    const nav = navigationRef.current;
    const link = linkRefs.current.get(active);
    if (!nav || !link) return;
    let frame = 0;
    let disposed = false;
    const measure = () => {
      frame = 0;
      const navBounds = nav.getBoundingClientRect();
      const linkBounds = link.getBoundingClientRect();
      const next = { left: linkBounds.left - navBounds.left + nav.scrollLeft, width: linkBounds.width, ready: true };
      setIndicator(previous => previous.left === next.left && previous.width === next.width && previous.ready ? previous : next);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(measure); };
    const observer = new ResizeObserver(schedule);
    observer.observe(nav);
    linkRefs.current.forEach(element => observer.observe(element));
    window.addEventListener('resize', schedule);
    document.fonts.ready.then(() => { if (!disposed) schedule(); });
    measure();
    return () => {
      disposed = true;
      observer.disconnect();
      window.removeEventListener('resize', schedule);
      window.cancelAnimationFrame(frame);
    };
  }, [active, isDesktop]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const boundary = (headerRef.current?.getBoundingClientRect().bottom ?? 88) + 80;
      const sections = navigation.map(item => ({ id: item.id, element: document.getElementById(item.id) }));
      const current = sections.filter(item => item.element && item.element.getBoundingClientRect().top <= boundary).at(-1);
      setActive(current?.id ?? 'product');
      setScrolled(window.scrollY > 12);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    update();
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        document.getElementById('menu-toggle')?.focus();
      }
    };
    const closeOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOutside);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeOutside);
    };
  }, [menuOpen]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="announcement no-print">
        <div className="container announcement-inner">
          <span><i aria-hidden="true" /> An early-stage concept. A responsible path forward.</span>
          <a href="#application">2027 accelerator application preview <ArrowUpRight size={14} aria-hidden="true" /></a>
        </div>
      </div>
      <header ref={headerRef} className={`site-header no-print ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container header-inner">
          <a href="#top" className="brand-link" aria-label="FearlessU home" onClick={() => setMenuOpen(false)}><Logo /></a>
          <nav ref={navigationRef} id="primary-navigation" className={`primary-navigation ${menuOpen ? 'is-open' : ''}`}
            aria-label="Primary navigation" aria-hidden={isDesktop ? undefined : !menuOpen} inert={!isDesktop && !menuOpen}
            style={{ '--active-nav-left': `${indicator.left}px`, '--active-nav-width': `${indicator.width}px` } as CSSProperties}>
            <span className={`active-navigation-indicator ${indicator.ready ? 'is-measured' : ''}`} aria-hidden="true" />
            {navigation.map((item, index) => (
              <a key={item.id} ref={element => { if (element) linkRefs.current.set(item.id, element); else linkRefs.current.delete(item.id); }}
                href={`#${item.id}`} className={active === item.id ? 'is-active' : ''}
                style={{ '--navigation-order': index } as CSSProperties}
                aria-current={active === item.id ? 'location' : undefined}
                onClick={() => { setActive(item.id); setMenuOpen(false); }}>
                {item.label}
              </a>
            ))}
            <a className="mobile-contact" href="#contact" style={{ '--navigation-order': navigation.length } as CSSProperties}
              onClick={() => setMenuOpen(false)}>Contact</a>
          </nav>
          <div className="header-actions">
            <a className="header-contact" href="#contact">Contact</a>
            <a href="#journey" className="button header-cta" onClick={() => setMenuOpen(false)}>View demo <ArrowUpRight size={17} aria-hidden="true" /></a>
            <button id="menu-toggle" type="button" className={`menu-toggle ${menuOpen ? 'is-open' : ''}`} aria-expanded={menuOpen}
              aria-controls="primary-navigation" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setMenuOpen(open => !open)}>
              <span className="menu-icon-stack" aria-hidden="true"><Menu size={23} className="menu-icon-bars" /><X size={23} className="menu-icon-close" /></span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
