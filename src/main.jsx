import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const projectPlaceholderColors = ['#CFE5DF', '#A5B4C3', '#9096B5', '#D8C7CE', '#D9C8A8']
const projects = Array.from({ length: 5 }, (_, i) => ({
  number: String(i + 1).padStart(2, '0'), name: `Project ${String(i + 1).padStart(2, '0')}`,
  color: projectPlaceholderColors[i],
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

const aboutStories = [
  { topic: 'INTRODUCTION', left: 'PORTRAIT PLACEHOLDER', right: 'IMAGE PLACEHOLDER', color: '#CFE5DF' },
  { topic: 'CURIOSITY', left: 'PROCESS IMAGE PLACEHOLDER', right: 'IMAGE PLACEHOLDER', color: '#A5B4C3' },
  { topic: 'PSYCHOLOGY', left: 'IMAGE PLACEHOLDER', right: 'RESEARCH IMAGE PLACEHOLDER', color: '#D8C7CE' },
  { topic: 'DESIGN PRACTICE', left: 'IMAGE PLACEHOLDER', right: 'MAKING IMAGE PLACEHOLDER', color: '#D9C8A8' },
  { topic: 'WHAT I VALUE', left: 'IMAGE PLACEHOLDER', right: 'IMAGE PLACEHOLDER', color: '#CFE5DF' },
]
const aboutPageNotes = [
  'I look at the small details that shape how an experience feels, and bring them together into something clear and useful.',
  'I use observation, research, and thoughtful questions to understand people and the worlds they move through.',
  'My background in Psychology helps me consider the needs, motivations, and emotions behind each interaction.',
]
function AboutPreview() {
  const storyRef = useRef(null)
  const [activeStory, setActiveStory] = useState(0)
  useEffect(() => {
    const updateStory = () => {
      const section = storyRef.current
      if (!section) return
      const distance = Math.max(1, section.offsetHeight - window.innerHeight)
      const progress = Math.max(0, Math.min(1, -section.getBoundingClientRect().top / distance))
      setActiveStory(Math.min(aboutStories.length - 1, Math.floor(progress * aboutStories.length)))
    }
    updateStory()
    window.addEventListener('scroll', updateStory, { passive: true })
    window.addEventListener('resize', updateStory)
    return () => { window.removeEventListener('scroll', updateStory); window.removeEventListener('resize', updateStory) }
  }, [])
  const story = aboutStories[activeStory]
  return <section className="about about-home-scroll" id="about" aria-label="About Sonia, scroll to explore">
    <div className="about-scroll-sequence" ref={storyRef}>
      <div className="about-scroll-stage" style={{ '--story-accent': story.color }}>
        <p className="about-scroll-prompt">SCROLL GENTLY INTO<br />THAT GOOD FIELD</p>
        <div className="about-scroll-image about-scroll-image--left" key={`left-${activeStory}`} role="img" aria-label={story.left}><span>{story.left}</span></div>
        <article className="about-scroll-copy" aria-live="polite" aria-atomic="true">
          <p className="about-scroll-topic">{story.topic}</p>
          <h1>Story title placeholder</h1>
          <p className="about-scroll-body">[Add a short paragraph about {story.topic.toLowerCase()} here.]</p>
        </article>
        <div className="about-scroll-image about-scroll-image--right" key={`right-${activeStory}`} role="img" aria-label={story.right}><span>{story.right}</span></div>
        <div className="about-scroll-steps" aria-hidden="true">{aboutStories.map((item, index) => <span className={index === activeStory ? 'is-active' : ''} key={item.topic} />)}</div>
      </div>
    </div>
  </section>
}
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

function ProjectCard({ project, selected }) { return <article className={`project-card project-card--${project.number}${selected ? ' is-selected' : ''}`}>
  <div className="project-image" style={{ '--project-placeholder-color': project.color }} role="img" aria-label={project.imageAlt}>
    <span className="project-image-placeholder">PROJECT IMAGE {project.number}</span>
  </div>
</article> }

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
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [activeProject, setActiveProject] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const scrollProgressRef = useRef(0)
  useEffect(() => {
    const onWheel = (event) => {
      const section = sectionRef.current
      if (!section || event.ctrlKey) return
      const horizontalInput = event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)
      const delta = horizontalInput ? (event.shiftKey ? event.deltaY : event.deltaX) : event.deltaY
      const progress = scrollProgressRef.current
      if (!delta || (delta > 0 && progress >= 1) || (delta < 0 && progress <= 0)) return
      event.preventDefault()
      const next = Math.max(0, Math.min(1, progress + delta / 1100))
      scrollProgressRef.current = next
      setScrollProgress(next)
      setActiveProject(Math.min(projects.length - 1, Math.floor(next * projects.length)))
    }
    const section = sectionRef.current
    section?.addEventListener('wheel', onWheel, { passive: false })
    return () => section?.removeEventListener('wheel', onWheel)
  }, [])
  const moveToProject = (direction) => {
    const nextIndex = Math.max(0, Math.min(projects.length - 1, activeProject + direction))
    const next = nextIndex / (projects.length - 1)
    scrollProgressRef.current = next
    setScrollProgress(next)
    setActiveProject(nextIndex)
  }
  const project = projects[activeProject]
  return <section className="work project-scroll-section" id="work" aria-labelledby="work-title" ref={sectionRef}>
    <h2 id="work-title" className="sr-only">Selected Work</h2>
    <div className="project-carousel">
      <header className="project-stage-header">Selected projects</header>
      <div className="project-track" ref={trackRef} aria-label="Selected projects">
        <div className="project-gallery" style={{ '--gallery-shift': `${-scrollProgress * 80}%` }}>{projects.map((item, index) => <ProjectCard key={item.number} project={item} selected={index === activeProject} />)}</div>
      </div>
      <div className="project-selection-frame" aria-hidden="true" />
      <footer className="project-caption" aria-live="polite">
        <div className="project-caption-copy">
          <svg className="project-caption-outline" viewBox="0 0 260 46" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0 C1 8 10 16 18 25 C24 32 28 39 30 45 H228 C231 37 237 28 244 20 C251 12 259 6 260 0" /></svg>
          <a href={project.destination} className="project-caption-title">{project.name}</a><span className="project-caption-type">{project.category}</span>
        </div>
        <div className="project-carousel-controls">
          {activeProject > 0 && <button type="button" onClick={() => moveToProject(-1)} aria-label="Previous project">‹</button>}
          {activeProject < projects.length - 1 && <button type="button" onClick={() => moveToProject(1)} aria-label="Next project">›</button>}
        </div>
      </footer>
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
