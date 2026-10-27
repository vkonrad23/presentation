import { useEffect, useRef, useState } from 'react';
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
  const headerRef = useRef<HTMLElement>(null);

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
    const closeOnWideScreen = () => { if (window.innerWidth >= 1280) setMenuOpen(false); };
    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOutside);
    window.addEventListener('resize', closeOnWideScreen);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeOutside);
      window.removeEventListener('resize', closeOnWideScreen);
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
          <nav id="primary-navigation" className={`primary-navigation ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
            {navigation.map(item => (
              <a key={item.id} href={`#${item.id}`} className={active === item.id ? 'is-active' : ''}
                aria-current={active === item.id ? 'location' : undefined}
                onClick={() => { setActive(item.id); setMenuOpen(false); }}>
                {item.label}
              </a>
            ))}
            <a className="mobile-contact" href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          </nav>
          <div className="header-actions">
            <a className="header-contact" href="#contact">Contact</a>
            <a href="#journey" className="button header-cta" onClick={() => setMenuOpen(false)}>View demo <ArrowUpRight size={17} aria-hidden="true" /></a>
            <button id="menu-toggle" type="button" className="menu-toggle" aria-expanded={menuOpen}
              aria-controls="primary-navigation" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
