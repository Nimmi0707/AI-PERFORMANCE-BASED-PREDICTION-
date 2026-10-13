import { Link, useRouterState } from '@tanstack/react-router';
import { Activity, ArrowUpRight, BrainCircuit, ChartNoAxesCombined, ChevronRight, CircleHelp, Cpu, FileStack, LayoutDashboard, Menu, Network, ShieldCheck, X } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';

export const navItems = [
  { to: '/', label: 'Platform Overview', icon: LayoutDashboard },
  { to: '/analytics', label: 'Executive Analytics', icon: ChartNoAxesCombined },
  { to: '/engine', label: 'Performance Engine', icon: Cpu },
  { to: '/insights', label: 'Algorithm Insights', icon: Network },
  { to: '/bulk', label: 'Bulk Processing', icon: FileStack },
] as const;

export function Platform({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: s => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [help, setHelp] = useState(false);
  const current = navItems.find(n => n.to === path);
  return <div className="platform-shell">
    {open && <div className="mobile-scrim" onClick={() => setOpen(false)} />}
    <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
      <Link to="/" className="brand" onClick={() => setOpen(false)}><span className="brand-symbol"><BrainCircuit size={25} /></span><span>AI-Employee<span className="brand-subtitle">PERFORMANCE ANALYTICS</span></span></Link>
      <div className="workspace-label">WORKSPACE <span>v2.4</span></div>
      <nav aria-label="Main navigation">{navItems.map(n => <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className={`nav-item ${path === n.to ? 'active' : ''}`}><n.icon size={19}/><span>{n.label}</span>{path === n.to && <ChevronRight size={14}/>}</Link>)}</nav>
      <div className="sidebar-model"><span className="mini-label">ACTIVE MODEL</span><div><span className="status-dot"/> Random Forest <span className="version">v2.4</span></div><p>Demonstration environment</p><div className="model-stat"><span>Illustrative accuracy</span><strong>94.8%</strong></div><div className="tiny-track"><span/></div></div>
      <div className="sidebar-bottom"><div className="secure-label"><ShieldCheck size={16}/> Privacy-first analytics</div><div className="profile"><span className="avatar">AD</span><div><strong>Admin Workspace</strong><span>Enterprise edition</span></div><span className="profile-dot"/></div></div>
    </aside>
    <div className="main-shell">
      <header className="topbar"><div className="breadcrumb"><Button variant="ghost" size="icon" className="mobile-menu" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</Button><span>Workspace</span><ChevronRight size={14}/><strong>{current?.label}</strong></div><div className="topbar-actions"><span className="environment"><span className="status-dot"/> System operational</span><span className="demo-badge">DEMO</span><Button variant="ghost" size="icon" aria-label="About this demonstration" title="About this demonstration" onClick={() => setHelp(!help)}><CircleHelp size={18}/></Button></div></header>
      {help && <div className="demo-notice" role="status"><ShieldCheck size={19}/><span>This research showcase uses synthetic data and deterministic mock inference. Scores are not validated predictions and must not be used for employment decisions.</span><Button variant="ghost" size="icon" aria-label="Close information" onClick={() => setHelp(false)}><X/></Button></div>}
      <main className="page-content">{children}</main>
      <footer className="app-footer"><span>© 2026 AI-Employee Performance Analytics</span><span><span className="status-dot"/> Research showcase <span className="footer-divider">/</span> Model v2.4.0</span></footer>
    </div>
  </div>;
}
export function PageHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) {
  return <div className="page-heading"><div><div className="eyebrow"><span/>{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>{action}</div>;
}
export function Metric({ label, value, change, icon, tone = 'cyan' }: { label: string; value: string; change: string; icon: ReactNode; tone?: string }) {
  return <div className={`glass-card metric-card tone-${tone}`}><div className="metric-top"><span>{label}</span><span className="metric-icon">{icon}</span></div><div className="metric-value">{value}<span className="sparkline"><i/><i/><i/><i/><i/><i/><i/><i/><i/></span></div><div className="metric-bottom"><span><ArrowUpRight size={13}/>{change}</span><span>vs. previous period</span></div></div>;
}
export function PanelTitle({ title, subtitle, children }: { title: string; subtitle?: string; children?: ReactNode }) { return <div className="panel-title"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{children}</div>; }
export function ResearchNote() { return <p className="research-note"><Activity size={14}/> Synthetic research data · Illustrative metrics · Human review required</p>; }
export function headMetadata(title: string, description: string) { return { meta: [{ title: `${title} | AI-Employee Performance Analytics` }, { name: 'description', content: description }, { property: 'og:title', content: `${title} | AI-Employee Performance Analytics` }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }; }