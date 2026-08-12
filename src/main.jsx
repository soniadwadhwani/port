import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const Arrow = () => <span className="arrow" aria-hidden="true">↗</span>;

function Nav() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  useEffect(() => { const f = () => setCompact(window.scrollY > 40); f(); window.addEventListener('scroll', f, {passive:true}); return () => window.removeEventListener('scroll', f); }, []);
  return <nav className={`nav ${compact ? 'is-compact' : ''} ${open ? 'is-open' : ''}`} aria-label="Primary navigation">
    <a className="brand" href="#home">SONIA WADHWANI<span>✳</span></a>
    <button className="menu" aria-expanded={open} aria-label="Toggle navigation" onClick={() => setOpen(!open)}><i></i><i></i></button>
    <div className="navlinks"><a className="active" href="#home">HOME</a><a href="#work">WORK</a><a href="#about">ABOUT</a><a href="#skills">SKILLS</a><a href="#contact">CONTACT</a><a className="nav-cta" href="#contact">LET'S TALK <Arrow /></a></div>
  </nav>
}

function PlaceholderVisual({ variant }) {
  return <div className={`placeholder-visual ${variant}`} aria-label="Project image placeholder — replace with Sonia's project imagery" role="img">
    <span className="placeholder-label">PROJECT VISUAL<br/>TO BE ADDED</span><span className="placeholder-mark">✳</span><div className="placeholder-line one"></div><div className="placeholder-line two"></div><div className="placeholder-line three"></div>
  </div>
}

function ProjectPlaceholder({ index, variant }) {
  return <article className={`project project-${variant}`}>
    <a href="#contact" className="project-link" aria-label={`Open project ${index} placeholder`}>
      <PlaceholderVisual variant={variant} />
      <div className="project-meta"><span>PROJECT 0{index}</span><span>CASE STUDY IN DEVELOPMENT</span></div>
      <div className="project-copy"><p className="project-index">SELECTED WORK / 0{index}</p><h2>PROJECT<br/>TITLE <em>PENDING</em></h2><p>Add the final project title, discipline, outcome and visual documentation here.</p></div>
      <div className="project-open"><span>VIEW WHEN READY</span><Arrow /></div>
    </a>
  </article>
}

function App() { return <>
  <Nav />
  <main>
    <section className="hero" id="home">
      <div className="hero-grid"></div><div className="hero-shape shape-a"></div><div className="hero-shape shape-b"></div>
      <p className="eyebrow hero-note">MAJOR IN EXPERIENCE DESIGN<br/>MINOR IN PSYCHOLOGY</p>
      <h1><span>SONIA</span><span>WADHWANI</span><span className="hero-role">EXPERIENCE<br/><em>DESIGNER</em></span></h1>
      <p className="hero-bio">Creating thoughtful experiences where research, behaviour and visual expression meet.</p>
      <div className="hero-scroll"><span>SCROLL TO EXPLORE</span><i></i></div><div className="hero-stamp">✳<br/><small>DESIGN /<br/>PSYCHOLOGY</small></div>
    </section>
    <section className="intro" id="about"><p className="eyebrow">01 / ABOUT</p><div className="intro-main"><h2>Designing with<br/><em>intention,</em><br/>always.</h2><div><p>I’m Sonia Wadhwani, an experience designer with a major in Experience Design and a minor in Psychology.</p><a className="text-link" href="#contact">START A CONVERSATION <Arrow /></a></div></div><div className="ribbon"><span>EXPERIENCE DESIGN</span><b>✳</b><span>PSYCHOLOGY</span><b>✳</b><span>HUMAN-CENTRED</span><b>✳</b><span>EXPERIENCE DESIGN</span></div></section>
    <section className="work" id="work"><div className="section-head"><p className="eyebrow">02 / SELECTED WORK</p><p>Project stories will live here,<br/>in their own visual language.</p></div><ProjectPlaceholder index="1" variant="trail"/><ProjectPlaceholder index="2" variant="enrol"/></section>
    <section className="practice" id="skills"><p className="eyebrow">03 / PRACTICE</p><div className="practice-title"><h2>Listening closely.<br/><em>Making</em> meaning.</h2><p>Capabilities and project details<br/>can be expanded here.</p></div><div className="skills"><span>EXPERIENCE DESIGN</span><span>USER RESEARCH</span><span>INTERACTION DESIGN</span><span>DESIGN SYSTEMS</span><span>PROTOTYPING</span><span>PSYCHOLOGY</span></div></section>
    <section className="contact" id="contact"><p className="eyebrow">04 / CONTACT</p><h2>Have a project<br/>in <em>mind?</em></h2><a href="mailto:hello@soniawadhwani.com">LET'S TALK <Arrow /></a><p className="contact-side">EMAIL ADDRESS TO BE CONFIRMED<br/>WITH SONIA</p></section>
  </main><footer><span>© 2025 SONIA WADHWANI</span><span>DESIGNED WITH INTENTION ✳</span><a href="#home">BACK TO TOP ↑</a></footer>
</>}
createRoot(document.getElementById('root')).render(<App />);
