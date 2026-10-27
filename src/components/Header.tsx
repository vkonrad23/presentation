import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { aboutNavigation, navigation } from '../data/content';

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
  const [aboutOpen, setAboutOpen] = useState(false);
  const [active, setActive] = useState('product');
  const [scrolled, setScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 1280px)').matches);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });
  const headerRef = useRef<HTMLElement>(null);
  const navigationRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>());
  // About links to the team; its adjacent disclosure groups the supporting sections.
  const activePrimary = active === 'team' || aboutNavigation.some(item => item.id === active) ? 'team' : active;
  const closeMenus = () => { setMenuOpen(false); setAboutOpen(false); };

  useEffect(() => {
    const viewport = window.matchMedia('(min-width: 1280px)');
    const updateViewport = () => {
      setIsDesktop(viewport.matches);
      setAboutOpen(false);
      if (viewport.matches) setMenuOpen(false);
    };
    viewport.addEventListener('change', updateViewport);
    return () => viewport.removeEventListener('change', updateViewport);
  }, []);

  useLayoutEffect(() => {
    if (!isDesktop) {
      setIndicator(previous => previous.ready ? { ...previous, ready: false } : previous);
      return;
    }
    const nav = navigationRef.current;
    const link = linkRefs.current.get(activePrimary);
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
  }, [activePrimary, isDesktop]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const boundary = (headerRef.current?.getBoundingClientRect().bottom ?? 88) + 80;
      const current = [...navigation, ...aboutNavigation]
        .map(item => ({ id: item.id, top: document.getElementById(item.id)?.getBoundingClientRect().top }))
        .filter((item): item is { id: typeof item.id; top: number } => item.top !== undefined && item.top <= boundary)
        .sort((a, b) => a.top - b.top).at(-1);
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
    if (!menuOpen && !aboutOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || document.querySelector('dialog[open]')) return;
      event.preventDefault();
      if (aboutOpen) {
        setAboutOpen(false);
        document.getElementById('about-toggle')?.focus({ preventScroll: true });
      } else {
        setMenuOpen(false);
        document.getElementById('menu-toggle')?.focus({ preventScroll: true });
      }
    };
    const closeOutside = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!aboutRef.current?.contains(target)) setAboutOpen(false);
      if (!headerRef.current?.contains(target)) setMenuOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOutside);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeOutside);
    };
  }, [menuOpen, aboutOpen]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="announcement no-print"><div className="container announcement-inner"><span>Early-stage concept. Educational prototype, not medical advice</span></div></div>
      <header ref={headerRef} className={`site-header no-print ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container header-inner">
          <a href="#top" className="brand-link" aria-label="FearlessU home" onClick={closeMenus}><Logo /></a>
          <nav ref={navigationRef} id="primary-navigation" className={`primary-navigation ${menuOpen ? 'is-open' : ''}`}
            aria-label="Primary navigation" aria-hidden={isDesktop ? undefined : !menuOpen} inert={!isDesktop && !menuOpen}
            style={{ '--active-nav-left': `${indicator.left}px`, '--active-nav-width': `${indicator.width}px` } as CSSProperties}>
            <span className={`active-navigation-indicator ${indicator.ready ? 'is-measured' : ''}`} aria-hidden="true" />
            {navigation.map((item, index) => item.id === 'team' ? (
              <div ref={aboutRef} key={item.id} onBlur={event => { if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) setAboutOpen(false); }} className={`navigation-about ${aboutOpen ? 'is-open' : ''}`} style={{ '--navigation-order': index } as CSSProperties}>
                <a ref={element => { if (element) linkRefs.current.set(item.id, element); else linkRefs.current.delete(item.id); }} href="#team" className={`navigation-about__link ${activePrimary === 'team' ? 'is-active' : ''}`} aria-current={activePrimary === 'team' ? 'location' : undefined} onClick={() => { setActive('team'); closeMenus(); }}>About</a>
                <button id="about-toggle" type="button" className="navigation-about__toggle" aria-label="About links" aria-expanded={aboutOpen} aria-controls="about-links" onClick={() => setAboutOpen(open => !open)}><ChevronDown size={16} aria-hidden="true" /></button>
                <div id="about-links" className="navigation-about__links" aria-hidden={!aboutOpen} inert={!aboutOpen}>
                  {aboutNavigation.map(link => <a key={link.id} href={`#${link.id}`} className={active === link.id ? 'is-active' : ''} aria-current={active === link.id ? 'location' : undefined} onClick={() => { setActive(link.id); closeMenus(); }}>{link.label}</a>)}
                </div>
              </div>
            ) : (
              <a key={item.id} ref={element => { if (element) linkRefs.current.set(item.id, element); else linkRefs.current.delete(item.id); }} href={`#${item.id}`} className={activePrimary === item.id ? 'is-active' : ''} style={{ '--navigation-order': index } as CSSProperties} aria-current={activePrimary === item.id ? 'location' : undefined} onClick={() => { setActive(item.id); closeMenus(); }}>{item.label}</a>
            ))}
          </nav>
          <div className="header-actions"><button id="menu-toggle" type="button" className={`menu-toggle ${menuOpen ? 'is-open' : ''}`} aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => { setMenuOpen(open => !open); setAboutOpen(false); }}><span className="menu-icon-stack" aria-hidden="true"><Menu size={23} className="menu-icon-bars" /><X size={23} className="menu-icon-close" /></span></button></div>
        </div>
      </header>
    </>
  );
}
