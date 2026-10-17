import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const projects = Array.from({ length: 5 }, (_, i) => ({
  number: String(i + 1).padStart(2, '0'), name: `Project ${String(i + 1).padStart(2, '0')}`,
  category: 'Category placeholder', year: 'Year placeholder', description: 'Project description to be added.',
  imageAlt: `Project ${String(i + 1).padStart(2, '0')} image placeholder`, destination: '#contact',
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
  const links = [['About', '#about'], ['Projects', '#work'], ['Graphics', '#explorations'], ['Contact', '#contact']]
  const tabStyle = (index) => ({ '--tab-fill': `${Math.max(0, Math.min(1, progress * 5 - index)) * 100}%` })
  return <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`} aria-label="Main navigation" style={{ '--scroll-progress': `${progress * 100}%` }}>
    <a className="brand" style={tabStyle(0)} href="#top">SONIA WADHWANI</a>
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
  <a className="button about-cta" href="#about">Get to Know Me <Arrow /></a><p className="temporary about-temporary">Temporary destination: this homepage introduction until an About page is available.</p>
</section> }

function ProjectCard({ project, active }) { return <article className={`project-card ${active ? 'is-active' : ''}`} aria-hidden={!active}>
  <a href={project.destination} tabIndex={active ? 0 : -1} aria-label={`${project.name}: case study placeholder`} className="project-link">
    <div className="project-image" role="img" aria-label={project.imageAlt}><span>{project.imageAlt}</span></div>
    <div className="project-details"><div><p className="eyebrow">{project.number} / {project.category}</p><h3>{project.name}</h3><p>{project.description}</p></div><div className="project-end"><span>{project.year}</span><span aria-hidden="true">↗</span></div></div>
  </a></article> }

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

function CircularOrbit() { return <div className="orbit" aria-label="Orbit of creative exploration image placeholders">{explorations.map((item, i) => <div className="orbit-item" key={item} style={{ '--i': i }}><div className="orbit-image" role="img" aria-label={item}><span>{item}</span></div></div>)}<div className="orbit-centre">PROCESS<br />& PLAY</div></div> }
function CreativeExplorations() { return <section className="creative section-grid" id="explorations"><p className="eyebrow section-index">03 — CREATIVE EXPLORATIONS</p><div className="creative-heading"><h2>Curiosity<br />in orbit.</h2><p className="placeholder">Sketches, experiments, and process work will live here.</p></div><CircularOrbit /></section> }

function ContactFooter() { return <footer className="contact section-grid" id="contact"><p className="eyebrow section-index">04 — CONTACT</p><div className="contact-photo" role="img" aria-label="Contact photograph placeholder"><span>CONTACT PHOTOGRAPH PLACEHOLDER</span></div><div className="contact-copy"><h2>Have a thought?<br /><a href={CONTACT_EMAIL ? `mailto:${CONTACT_EMAIL}` : '#contact'}>Let’s talk <Arrow /></a></h2><p>Get in touch to start a conversation.</p>{CONTACT_EMAIL ? <a className="contact-email" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> : <p className="contact-email">[Email address to be supplied]</p>}{LINKEDIN_URL ? <a className="contact-social" href={LINKEDIN_URL}>LinkedIn</a> : <p className="contact-social">[LinkedIn link to be supplied]</p>}</div><div className="footer-meta"><span>SONIA WADHWANI</span><span>EXPERIENCE DESIGN · FLAME UNIVERSITY</span><a href="#top">BACK TO TOP ↑</a></div></footer> }

function App() { return <main><Hero /><AboutPreview /><SelectedProjects /><CreativeExplorations /><ContactFooter /></main> }

createRoot(document.getElementById('root')).render(<App />)
