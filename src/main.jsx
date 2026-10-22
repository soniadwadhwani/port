import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const projects = Array.from({ length: 5 }, (_, i) => ({
  number: String(i + 1).padStart(2, '0'), name: `Project ${String(i + 1).padStart(2, '0')}`,
  category: 'Category placeholder', year: 'Year placeholder', description: 'Project description to be added.',
  imageAlt: `Project ${String(i + 1).padStart(2, '0')} image placeholder`, destination: `/project.html?project=${String(i + 1).padStart(2, '0')}`,
}))
const explorations = ['Sketch placeholder', 'Concept placeholder', 'Process placeholder', 'Experiment placeholder', 'Study placeholder', 'Idea placeholder']
const aboutDetails = [
  { label: 'INTRODUCTION', text: '[Personal introduction to be supplied.]', image: 'About image placeholder 01' },
  { label: 'HARD SKILLS', text: '[Skills to be supplied.]', image: 'About image placeholder 02' },
  { label: 'SOFT SKILLS', text: '[Skills to be supplied.]', image: 'About image placeholder 03' },
  { label: 'PROJECTS & EXPERIENCE', text: '[Projects completed and professional experience to be supplied.]', image: 'About image placeholder 04' },
]
const CONTACT_EMAIL = ''
const LINKEDIN_URL = ''

function Arrow() { return <span aria-hidden="true">↗</span> }

function Navigation() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 20)
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setProgress(maxScroll > 0 ? window.scrollY / maxScroll : 0)
    }
    update(); window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [])
  const onAboutPage = window.location.pathname.endsWith('/about.html')
  const onProjectPage = window.location.pathname.endsWith('/project.html')
  const links = [['About', onAboutPage ? '#about-page-top' : '/about.html'], ['Projects', '/#work'], ['Graphics', '/#explorations'], ['Contact', '/#contact']]
  const tabStyle = (index) => ({ '--tab-fill': `${Math.max(0, Math.min(1, progress * 5 - index)) * 100}%` })
  return <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`} aria-label="Main navigation" style={{ '--scroll-progress': `${progress * 100}%` }}>
    <a className="brand" style={tabStyle(0)} href={onAboutPage ? '/' : onProjectPage ? '/' : '#top'}>SONIA WADHWANI</a>
    <button className="menu-toggle" aria-expanded={open} aria-controls="nav-links" onClick={() => setOpen(!open)}><span className="sr-only">Toggle navigation</span><i /><i /></button>
    <div id="nav-links" className={`nav-links ${open ? 'nav-links--open' : ''}`}>{links.map(([name, href], index) => <a style={tabStyle(index + 1)} key={name} href={href} onClick={() => setOpen(false)}>{name}</a>)}</div>
  </nav>
}

function Hero() {
  const videoRef = useRef(null)
  const [intro, setIntro] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const video = videoRef.current
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncPlayback = () => {
      if (motionPreference.matches) { video.pause(); setIntro(false) }
      else video.play().catch(() => {})
    }
    syncPlayback()
    motionPreference.addEventListener('change', syncPlayback)
    const introTimer = motionPreference.matches ? null : window.setTimeout(() => setIntro(false), 2000)
    return () => { motionPreference.removeEventListener('change', syncPlayback); if (introTimer) window.clearTimeout(introTimer) }
  }, [])
  return <section className={`hero ${intro ? 'hero--intro' : ''}`} id="top"><Navigation /><div className="hero-content">
  <video ref={videoRef} className="hero-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true"><source src="/assets/hero-film.mp4" type="video/mp4" /></video><div className="hero-shade" aria-hidden="true" />
  <img className="hero-doodle" src="/assets/sonia-doodle.png" alt="Sonia doodle logo" />
  <a className="scroll-cue" href="#about">SCROLL TO EXPLORE <span>↓</span></a>
</div></section>
}

function AboutPreview() { return <section className="about section-grid" id="about">
  <p className="eyebrow section-index">01 — ABOUT ME IN A GIST</p><h2 className="about-title">A little about Sonia.</h2>
  <div className="about-layout" id="skills">{aboutDetails.map((item, i) => <article className={`about-item about-item--${i + 1}`} key={item.label}><div className="about-image" role="img" aria-label={item.image}><span>{item.image}</span></div><div className="about-text"><span>{item.label}</span><p>{item.text}</p></div></article>)}</div>
  <a className="button about-cta" href="/about.html">Get to Know Me <Arrow /></a>
</section> }

const aboutPageNotes = [
  'I look at the small details that shape how an experience feels, and bring them together into something clear and useful.',
  'I use observation, research, and thoughtful questions to understand people and the worlds they move through.',
  'My background in Psychology helps me consider the needs, motivations, and emotions behind each interaction.',
]
function AboutPage() {
  return <main className="about-page" id="about-page-top">
    <Navigation />
    <section className="about-page-intro" aria-label="Introduction">
      <h1 className="sr-only">About Sonia Wadhwani</h1>
      <div className="about-collage" aria-label="Portrait placeholder composition">
        <div className="about-collage-photo" role="img" aria-label="Portrait image placeholder"><span>PORTRAIT PLACEHOLDER</span></div>
        <div className="about-collage-accent" aria-hidden="true" />
      </div>
      <p className="about-intro-copy">I’m Sonia Wadhwani, an experience designer with a minor in Psychology. I’m curious about how people think, feel, and move through the world—and I use that curiosity to shape thoughtful experiences.</p>
    </section>
    <section className="about-page-story" aria-label="About Sonia">
      <div className="about-wide-image" role="img" aria-label="Wide image placeholder"><span>WIDE IMAGE PLACEHOLDER</span></div>
      <div className="about-note-grid">{aboutPageNotes.map((note, index) => <p key={note}><span>0{index + 1}</span>{note}</p>)}</div>
    </section>
    <div className="about-closing-image" role="img" aria-label="Closing image placeholder"><span>IMAGE PLACEHOLDER</span></div>
  </main>
}

function ProjectCard({ project, active }) { return <article className={`project-card ${active ? 'is-active' : ''}`} aria-hidden={!active}>
  <a href={project.destination} tabIndex={active ? 0 : -1} aria-label={`${project.name}: case study placeholder`} className="project-link">
    <div className="project-image" role="img" aria-label={project.imageAlt}><span>{project.imageAlt}</span></div>
    <div className="project-details"><div><p className="eyebrow">{project.number} / {project.category}</p><h3>{project.name}</h3><p>{project.description}</p></div><div className="project-end"><span>{project.year}</span><span aria-hidden="true">↗</span></div></div>
  </a></article> }

function ProjectDetailsPage() {
  const requestedProject = new URLSearchParams(window.location.search).get('project')
  const project = projects.find((item) => item.number === requestedProject) ?? projects[0]
  return <main className="project-details-page" id="project-page-top">
    <Navigation />
    <header className="project-page-intro">
      <h1>Name</h1>
      <p className="project-page-type">Type</p>
      <p className="project-page-summary">A short introduction to the project, the people it serves, and the challenge it set out to solve.</p>
    </header>
    <div className="project-detail-content">
      <div className="project-detail-image project-detail-hero" role="img" aria-label="Project hero image placeholder"><span>PROJECT HERO IMAGE</span></div>
      <section className="project-research" aria-labelledby="research-title">
        <div><h2 id="research-title">Research synthesis</h2><p>Summarize the research, key observations, and the opportunity they revealed.</p></div>
        <div className="project-detail-image project-research-image" role="img" aria-label="Research image placeholder"><span>RESEARCH IMAGE</span></div>
      </section>
      <div className="project-detail-image project-detail-image--wide" role="img" aria-label="Project image placeholder"><span>PROJECT IMAGE</span></div>
      <section className="project-approach" aria-label="Design approach">
        <div className="project-detail-image project-approach-image" role="img" aria-label="Design approach image placeholder"><span>PROCESS IMAGE</span></div>
        <p>Describe the design approach, the decisions made along the way, and what changed through iteration.</p>
      </section>
      <div className="project-detail-image project-detail-image--wide project-detail-image--second" role="img" aria-label="Project outcome image placeholder"><span>OUTCOME IMAGE</span></div>
      <div className="project-detail-image project-detail-image--inset" role="img" aria-label="Additional project image placeholder"><span>ADDITIONAL IMAGE</span></div>
      <p className="project-page-reflection">Add a concise reflection on the outcome, what was learned, and what could come next.</p>
      <a className="project-back-link" href="/#work">← Back to projects</a>
    </div>
    <div className="project-detail-footer" role="img" aria-label="Closing project image placeholder"><span>CLOSING IMAGE PLACEHOLDER</span></div>
  </main>
}

function SelectedProjects() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const track = document.querySelector('.project-track')
    if (!track) return
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (window.matchMedia('(max-width: 700px)').matches) return
        const rect = track.getBoundingClientRect()
        const distance = Math.max(1, track.offsetHeight - window.innerHeight)
        const progress = Math.max(0, Math.min(1, -rect.top / distance))
        setActive(Math.min(projects.length - 1, Math.floor(progress * projects.length)))
      })
    }
    update(); window.addEventListener('scroll', update, { passive: true }); window.addEventListener('resize', update)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [])
  return <section className="work" id="work" aria-labelledby="work-title"><header className="section-grid work-heading"><p className="eyebrow section-index">02 — SELECTED PROJECTS</p><h2 id="work-title">Selected<br /><em>projects.</em></h2><p className="work-intro">Five projects. Case study content and imagery to be supplied.</p></header>
    <div className="project-track"><div className="project-stage" aria-live="polite">{projects.map((project, i) => <ProjectCard key={project.number} project={project} active={i === active} />)}<p className="project-progress" aria-label={`Project ${active + 1} of ${projects.length}`}>{String(active + 1).padStart(2, '0')} <span>/</span> {String(projects.length).padStart(2, '0')}</p></div>
      <div className="mobile-projects">{projects.map((project) => <ProjectCard key={project.number} project={project} active />)}</div>
    </div>
  </section>
}

const orbitPlaceholders = Array.from({ length: 16 }, (_, i) => `Graphic placeholder ${String(i + 1).padStart(2, '0')}`)
function CircularOrbit() { return <div className="orbit" aria-label="Circular arrangement of graphic placeholders"><div className="orbit-rotation">{orbitPlaceholders.map((item, i) => <div className="orbit-item" key={item} style={{ '--i': i }}><div className="orbit-image" role="img" aria-label={item}><span>{String(i + 1).padStart(2, '0')}</span></div></div>)}</div></div> }
function CreativeExplorations() {
  const trackRef = useRef(null)
  useEffect(() => {
    const track = trackRef.current
    const stage = track?.querySelector('.graphics-stage')
    if (!track || !stage || window.matchMedia('(max-width: 700px)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = track.getBoundingClientRect()
        const distance = Math.max(1, track.offsetHeight - window.innerHeight)
        const progress = Math.max(0, Math.min(1, -rect.top / distance))
        stage.style.setProperty('--graphics-progress', progress.toFixed(3))
        stage.style.setProperty('--orbit-scale', (0.72 + progress * 0.9).toFixed(3))
        stage.style.setProperty('--center-opacity', Math.max(0, 1 - progress * 1.8).toFixed(3))
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [])
  return <section className="creative" id="explorations" aria-labelledby="graphics-title">
    <div className="graphics-track" ref={trackRef}><div className="graphics-stage">
      <p className="eyebrow section-index">03 — GRAPHICS</p>
      <div className="creative-heading"><p className="graphics-kicker">START A FIRE</p><h2 id="graphics-title">We’ll see<br />the smoke</h2><a className="graphics-cta" href="#contact">SEND SMOKE</a></div>
      <CircularOrbit />
    </div></div>
    <div className="graphics-more"><p className="eyebrow">MORE GRAPHICS · PLACEHOLDERS</p><div className="graphics-grid">{explorations.map((item, i) => <div className={`graphics-tile graphics-tile--${i + 1}`} role="img" aria-label={`Additional graphic placeholder ${String(i + 1).padStart(2, '0')}`} key={`more-${item}`}><span>GRAPHIC PLACEHOLDER {String(i + 1).padStart(2, '0')}</span></div>)}</div></div>
  </section>
}

function ContactFooter() { return <footer className="contact section-grid" id="contact"><p className="eyebrow section-index">04 — CONTACT</p><div className="contact-photo" role="img" aria-label="Contact photograph placeholder"><span>CONTACT PHOTOGRAPH PLACEHOLDER</span></div><div className="contact-copy"><h2>Have a thought?<br /><a href={CONTACT_EMAIL ? `mailto:${CONTACT_EMAIL}` : '#contact'}>Let’s talk <Arrow /></a></h2><p>Get in touch to start a conversation.</p>{CONTACT_EMAIL ? <a className="contact-email" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> : <p className="contact-email">[Email address to be supplied]</p>}{LINKEDIN_URL ? <a className="contact-social" href={LINKEDIN_URL}>LinkedIn</a> : <p className="contact-social">[LinkedIn link to be supplied]</p>}</div><div className="footer-meta"><span>SONIA WADHWANI</span><span>EXPERIENCE DESIGN · FLAME UNIVERSITY</span><a href="#top">BACK TO TOP ↑</a></div></footer> }

function App() {
  if (window.location.pathname.endsWith('/about.html')) return <AboutPage />
  if (window.location.pathname.endsWith('/project.html')) return <ProjectDetailsPage />
  return <main><Hero /><AboutPreview /><SelectedProjects /><CreativeExplorations /><ContactFooter /></main>
}

createRoot(document.getElementById('root')).render(<App />)
