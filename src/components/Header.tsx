import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { navigation } from '../data/content';

export function Logo() {
  return <span className="brand"><svg width="36" height="39" viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M12 38V28C12 15 21 8 36 8c-1 14-8 22-20 22" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/><path d="m13 36 17-19" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/><circle cx="36" cy="36" r="5" fill="#F7C948"/></svg><span>Fearless<span className="brand-u">U</span></span></span>;
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('product');
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: '-15% 0px -55% 0px', threshold: [0, 0.1, 0.3] });
    navigation.forEach(item => { const element = document.getElementById(item.id); if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); document.getElementById('menu-toggle')?.focus(); }
    };
    if (menuOpen) document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="announcement no-print"><div className="container announcement-inner"><span><i aria-hidden="true" />Preparing FearlessU for the 2027 Health Care Accelerator</span><span className="announcement-badge">Application Preview <ArrowUpRight size={12} aria-hidden="true" /></span></div></div>
    <header className="site-header no-print">
      <div className="container header-inner">
        <a href="#top" className="brand-link" aria-label="FearlessU home" onClick={() => setMenuOpen(false)}><Logo /></a>
        <nav id="primary-navigation" className={`primary-navigation ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
          {navigation.map(item => <a key={item.id} href={`#${item.id}`} className={active === item.id ? 'is-active' : ''} aria-current={active === item.id ? 'location' : undefined} onClick={() => { setActive(item.id); setMenuOpen(false); }}>{item.label}</a>)}
        </nav>
        <a href="#journey" className="button header-cta" onClick={() => setMenuOpen(false)}>View demo <ArrowUpRight size={15} aria-hidden="true" /></a>
        <button id="menu-toggle" type="button" className="menu-toggle" aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
    </header>
  </>;
}
