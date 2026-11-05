import EnrolMeSolutioning from './EnrolMeSolutioning.jsx'
import EnrolMePrioritisation from './EnrolMePrioritisation.jsx'
import EnrolMeIdeaWall from './EnrolMeIdeaWall.jsx'
import EnrolMeAffinity from './EnrolMeAffinity.jsx'
import { Fragment, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import './projects.css'
import './about-content.css'
import aboutContent from './about-content.json'
import aboutNotes from './home-about-notes.json'
import saarthiSpectrum from './saarthi-spectrum.json'
import './saarthi-spectrum.css'
import saarthiAsIsJourney from './saarthi-as-is-revised.svg?url'
import journeyInteractions from './saarthi-journey-interactions.json'
import saarthiAffinity from './saarthi-affinity.json'
import saarthiInsights from './saarthi-insights.json'
import saarthiNarrative from './saarthi-narrative.json'
import saarthiTouchpoints from './saarthi-touchpoints.json'
import saarthiBlueprintBoxes from './saarthi-blueprint.json'
import saarthiBlueprintConnections from './saarthi-blueprint-connections.json'
import saarthiBrand from './saarthi-brand.json'
import './saarthi-brand.css'
import './enrolme-case.css'
import enrolmeResearch from './enrolme-research.json'
import enrolmeSynthesis from './enrolme-synthesis.json'
import EnrolMeInstituteJourney from './EnrolMeInstituteJourney'
import EnrolMeParentJourney from './EnrolMeParentJourney'
import EnrolMeInsightCards from './EnrolMeInsightCards'

const projectPlaceholderColors = ['#CFE5DF', '#A5B4C3', '#9096B5', '#D8C7CE', '#D9C8A8']
const projects = Array.from({ length: 5 }, (_, i) => ({
  number: String(i + 1).padStart(2, '0'), name: `Project ${String(i + 1).padStart(2, '0')}`,
  color: projectPlaceholderColors[i],
  category: 'Category placeholder', year: 'Year placeholder', description: 'Project description to be added.',
  imageAlt: `Project ${String(i + 1).padStart(2, '0')} image placeholder`, destination: `/project.html?project=${String(i + 1).padStart(2, '0')}`,
})).map((project, index) => index === 0 ? {
  ...project,
  name: 'Saarthi',
  category: 'Service Design | Empathy Design | Experience Design',
  image: '/assets/saarthi1.png',
  imageAlt: 'Saarthi, a guided temple experience for elderly devotees',
} : index === 1 ? {
  ...project,
  name: 'Margin',
  category: 'Ecosystem Design | Lifestyle Project | Experience Design',
  image: '/assets/margin1.png',
  imageAlt: 'Margin lifestyle ecosystem concept with a goal-planning app and landscape',
} : index === 2 ? {
  ...project,
  name: 'Enrol-Me',
  category: 'Business Design | Lifestyle Design | Industry Project',
  image: '/assets/enrolme-hero.png',
  imageAlt: 'Enrol-Me hero artwork with its pastel bubble character and wordmark',
} : index === 3 ? {
  ...project, name: 'Trail Tag', category: 'Tangible Interface Design', description: 'Tangible interface design project. Details coming soon.',
  image: '/assets/trail-tag-hero.png', imageAlt: 'Trail Tag screenless navigation wearable for trekkers, with pre-placed and portable beacons and a receiver band',
} : {
  ...project, name: 'Data Visualization', category: 'Data Visualization', description: 'Data visualization project. Details coming soon.',
  image: '/assets/data-visualization-hero-v2.png', imageAlt: 'Data Visualisation hero illustration with pie, bar and line charts',
})
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
  const [tabProgress, setTabProgress] = useState([0, 0, 0, 0, 0])
  const projectProgressRef = useRef(0)
  const onAboutPage = window.location.pathname.endsWith('/about.html')
  const onProjectsPage = window.location.pathname.endsWith('/projects.html')
  const onProjectPage = window.location.pathname.endsWith('/project.html')
  const showProgress = !onAboutPage && !onProjectsPage && !onProjectPage
  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 20)
      if (!showProgress) return
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const pageProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0
      setProgress(pageProgress)

      // On the home page each tab fills only while its matching section is in view.
      // In particular, Projects spans the entire pinned horizontal gallery.
      const sectionIds = ['top', 'about', 'work', 'explorations', 'contact']
      const sections = sectionIds.map((id) => document.getElementById(id))
      if (sections.every(Boolean)) {
        const starts = sections.map((section) => section.getBoundingClientRect().top + window.scrollY)
        const ends = [...starts.slice(1), maxScroll]
        const nextProgress = starts.map((start, index) => {
          const end = ends[index]
          if (end <= start) return window.scrollY >= start ? 1 : 0
          return Math.max(0, Math.min(1, (window.scrollY - start) / (end - start)))
        })
        const projectsBounds = sections[2].getBoundingClientRect()
        if (projectsBounds.top < window.innerHeight && projectsBounds.bottom > 0) {
          nextProgress[2] = projectProgressRef.current
        }
        setTabProgress(nextProgress)
      }
    }
    const updateProjectProgress = (event) => {
      if (!showProgress) return
      projectProgressRef.current = event.detail
      const projectSection = document.getElementById('work')
      if (!projectSection) return
      const bounds = projectSection.getBoundingClientRect()
      if (bounds.top < window.innerHeight && bounds.bottom > 0) {
        setTabProgress((current) => current.map((value, index) => index === 2 ? event.detail : value))
      }
    }
    update(); window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    window.addEventListener('project-gallery-progress', updateProjectProgress)
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); window.removeEventListener('project-gallery-progress', updateProjectProgress) }
  }, [showProgress])
  const links = [['About', onAboutPage ? '#about-page-top' : '/about.html'], ['Projects', '/projects.html'], ['Graphics', '/#explorations'], ['Contact', '/#contact']]
  const tabStyle = (index) => ({ '--tab-fill': `${tabProgress[index] * 100}%` })
  return <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}${onProjectPage ? ' nav--static' : ''}`} aria-label="Main navigation" style={!showProgress ? undefined : { '--scroll-progress': `${progress * 100}%` }}>
    <a className="brand" style={!showProgress ? undefined : tabStyle(0)} href={onAboutPage || onProjectsPage || onProjectPage ? '/' : '#top'}>SONIA WADHWANI</a>
    <button className="menu-toggle" aria-expanded={open} aria-controls="nav-links" onClick={() => setOpen(!open)}><span className="sr-only">Toggle navigation</span><i /><i /></button>
    <div id="nav-links" className={`nav-links ${open ? 'nav-links--open' : ''}`}>{links.map(([name, href], index) => <a style={!showProgress ? undefined : tabStyle(index + 1)} key={name} href={href} onClick={() => setOpen(false)}>{name}</a>)}</div>
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

const aboutPageNotes = [
  'I look at the small details that shape how an experience feels, and bring them together into something clear and useful.',
  'I use observation, research, and thoughtful questions to understand people and the worlds they move through.',
  'My background in Psychology helps me consider the needs, motivations, and emotions behind each interaction.',
]
function AboutPreview() {
  const closeButtonRef = useRef(null)
  const stickyWallRef = useRef(null)
  const dragRef = useRef(null)
  const suppressStickyClickRef = useRef(false)
  const [stickyPositions, setStickyPositions] = useState({})
  const [selectedNote, setSelectedNote] = useState(null)
  const startStickyDrag = (event, index) => {
    if (event.button !== 0) return
    const wall = stickyWallRef.current
    const noteElement = event.currentTarget
    if (!wall) return
    const wallRect = wall.getBoundingClientRect()
    const noteRect = noteElement.getBoundingClientRect()
    dragRef.current = {
      index,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      offsetX: event.clientX - noteRect.left,
      offsetY: event.clientY - noteRect.top,
      wallRect,
      noteWidth: noteRect.width,
      noteHeight: noteRect.height,
      moved: false,
    }
    noteElement.setPointerCapture(event.pointerId)
  }
  const moveSticky = (event) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    if (!drag.moved && Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) < 5) return
    drag.moved = true
    const maxLeft = Math.max(0, drag.wallRect.width - drag.noteWidth)
    const maxTop = Math.max(0, drag.wallRect.height - drag.noteHeight)
    const left = Math.max(0, Math.min(maxLeft, event.clientX - drag.wallRect.left - drag.offsetX))
    const top = Math.max(0, Math.min(maxTop, event.clientY - drag.wallRect.top - drag.offsetY))
    setStickyPositions((positions) => ({
      ...positions,
      [drag.index]: {
        left: `${(left / drag.wallRect.width) * 100}%`,
        top: `${(top / drag.wallRect.height) * 100}%`,
      },
    }))
  }
  const finishStickyDrag = (event) => {
    if (dragRef.current?.pointerId === event.pointerId) {
      suppressStickyClickRef.current = dragRef.current.moved
      dragRef.current = null
    }
  }
  const handleStickyClick = (event, note) => {
    if (suppressStickyClickRef.current) {
      event.preventDefault()
      suppressStickyClickRef.current = false
      return
    }
    setSelectedNote(note)
  }
  useEffect(() => {
    if (!selectedNote) return
    const previousOverflow = document.body.style.overflow
    const previouslyFocused = document.activeElement
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelectedNote(null)
      if (event.key === 'Tab') {
        const dialog = closeButtonRef.current?.closest('[role="dialog"]')
        const footer = dialog?.querySelector('.about-note-footer')
        if (event.shiftKey && document.activeElement === closeButtonRef.current) {
          event.preventDefault(); footer?.focus()
        } else if (!event.shiftKey && document.activeElement === footer) {
          event.preventDefault(); closeButtonRef.current?.focus()
        }
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', closeOnEscape); previouslyFocused?.focus?.() }
  }, [selectedNote])
  return <section className="about about-home-scroll" id="about" aria-labelledby="about-home-title">
    <div className="about-home-intro">
      <h2 id="about-home-title">Hi, I’m Sonia.</h2>
      <p className="about-home-meta">Experience Design · Psychology</p>
      <p className="about-home-description">I explore how people, technology, and everyday systems shape our experience.</p>
      <a className="about-home-more" href="/about.html">Explore my About Me page ↗</a>
    </div>
    <div className="about-sticky-wall" aria-label="Sonia’s ideas" ref={stickyWallRef}>
      {aboutNotes.map((note, index) => <button className={`about-sticky about-sticky--${index % 4 + 1} about-sticky-note--${index + 1}`} style={stickyPositions[index]} type="button" key={index} onPointerDown={(event) => startStickyDrag(event, index)} onPointerMove={moveSticky} onPointerUp={finishStickyDrag} onPointerCancel={finishStickyDrag} onClick={(event) => handleStickyClick(event, note)} aria-label={`${note.number ? `${note.number} ` : ''}${note.title}. Click for details or drag to move.`} aria-haspopup="dialog">
        <span className="about-sticky-copy">{note.number && <strong className="about-sticky-number">{note.number}</strong>}<span>{note.title}</span></span>
      </button>)}
    </div>
    {selectedNote && <div className="about-note-overlay" onClick={() => setSelectedNote(null)}>
      <article className={`about-note-expanded about-sticky--${(aboutNotes.indexOf(selectedNote) % 4) + 1}`} role="dialog" aria-modal="true" aria-labelledby="about-note-title" onClick={(event) => event.stopPropagation()}>
        <button ref={closeButtonRef} className="about-note-close" type="button" onClick={() => setSelectedNote(null)} aria-label="Close expanded note">×</button>
        <div className="about-note-body">
          <h3 id="about-note-title">{selectedNote.number && <span>{selectedNote.number} </span>}{selectedNote.title}</h3>
          <p>{selectedNote.description}</p>
          <ul>{selectedNote.details.map(detail => <li key={detail}>{detail}</li>)}</ul>
        </div>
        <a className="about-note-footer" href="/about.html">Explore my About Me page ↗</a>
      </article>
    </div>}
  </section>
}
const toolDomains = {
  Figma: 'figma.com', 'Adobe Illustrator': 'illustrator.adobe.com', 'Adobe Photoshop': 'photoshop.adobe.com', Blender: 'blender.org', Framer: 'framer.com',
  HTML: 'html.spec.whatwg.org', CSS: 'css3.com', JavaScript: 'javascript.com', 'p5.js': 'p5js.org', Python: 'python.org',
  ChatGPT: 'chatgpt.com', 'Google Gemini': 'gemini.google.com', Claude: 'claude.ai', Grok: 'grok.com', Midjourney: 'midjourney.com', Runway: 'runwayml.com', ElevenLabs: 'elevenlabs.io', 'GitHub Copilot': 'github.com', n8n: 'n8n.io',
}

const toolLogoPaths = {
  HTML: 'html5/html5-original.svg', CSS: 'css3/css3-original.svg', JavaScript: 'javascript/javascript-original.svg',
  'Adobe Illustrator': 'illustrator/illustrator-plain.svg', 'Adobe Photoshop': 'photoshop/photoshop-original.svg',
  'p5.js': 'p5js/p5js-original.svg',
}
function aboutToolLogo(tool) {
  return toolLogoPaths[tool]
    ? `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${toolLogoPaths[tool]}`
    : `https://www.google.com/s2/favicons?domain=${toolDomains[tool]}&sz=128`
}

function AboutToolkit() {
  return <div className="about-tool-marquee" aria-label="Design and development tools">
    <div className="about-tool-track">{[0, 1].map(copy => <ul className="about-tool-set" key={copy} aria-hidden={copy === 1 ? true : undefined}>
      {aboutContent.tools.map(tool => <li key={tool}><button type="button" className="about-tool-logo" aria-label={tool} tabIndex={copy === 1 ? -1 : 0}>
        <img src={aboutToolLogo(tool)} width="40" height="40" alt="" loading="lazy" />
        <span className="about-tool-tooltip">{tool}</span>
      </button></li>)}
    </ul>)}</div>
  </div>
}

function AboutContent() {
  return <div className="about-content">
    <section className="about-content-section" aria-labelledby="about-more-title">
      <p className="eyebrow about-content-kicker">01 — ABOUT ME</p>
      <div className="about-content-introduction">
        <h2 id="about-more-title">A little about me</h2>
        <div>{aboutContent.introduction.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
      </div>
      <div className="about-content-interests"><h3>Design interests</h3><ul className="about-content-tags">{aboutContent.interests.map(item => <li key={item}>{item}</li>)}</ul></div>
    </section>
    <section className="about-content-section" aria-labelledby="about-skills-title">
      <p className="eyebrow about-content-kicker">02 — HARD SKILLS</p>
      <h2 id="about-skills-title">What I can do</h2>
      <div className="about-skill-groups">{aboutContent.skills.map((group, index) => <details className="about-skill-group" key={group.name} open={index === 0}>
        <summary><span className="about-skill-number">0{index + 1}</span><h3>{group.name}</h3><span className="about-skill-toggle" aria-hidden="true" /></summary>
        <ul className="about-skill-cloud">{group.items.map(item => <li key={item}>{item}</li>)}</ul>
      </details>)}</div>
    </section>
    <section className="about-content-section" aria-labelledby="about-work-title">
      <p className="eyebrow about-content-kicker">03 — SOFT SKILLS</p>
      <h2 id="about-work-title">How I work</h2>
      <ul className="about-strengths">{aboutContent.softSkills.map(item => <li key={item}>{item}</li>)}</ul>
    </section>
    <section className="about-content-section" aria-labelledby="about-tools-title">
      <p className="eyebrow about-content-kicker">04 — TOOLS & SOFTWARE</p>
      <h2 id="about-tools-title">My toolkit</h2>
      <AboutToolkit />
    </section>
    <section className="about-content-section" aria-labelledby="about-experience-title">
      <p className="eyebrow about-content-kicker">05</p>
      <h2 id="about-experience-title">Industry experience</h2>
      <div className="about-internships">{aboutContent.experience.map(entry => <article className="about-internship" key={entry.title}>
        <span className="about-internship-year">{entry.year}</span>
        <div><h3>{entry.title}</h3><p>{entry.discipline}</p></div>
        <p className="about-internship-meta">{entry.type}<span>{entry.duration}</span></p>
      </article>)}</div>
    </section>
    <section className="about-content-section" aria-labelledby="about-learning-title">
      <p className="eyebrow about-content-kicker">06 — WORKSHOPS & EXPERIENTIAL LEARNING</p>
      <h2 id="about-learning-title">Learning by doing</h2>
      <div className="about-workshops">{aboutContent.workshops.map(entry => <article key={entry.title}>
        <h3>{entry.title}</h3><p>{entry.course}</p>
      </article>)}</div>
    </section>
  </div>
}

function AboutPage() {
  const exitScrollRef = useRef({ distance: 0, timer: null })
  useEffect(() => {
    const returnHomeAtEnd = (event) => {
      const state = exitScrollRef.current
      const atPageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4
      const delta = event.deltaMode === 1 ? event.deltaY * 16 : event.deltaMode === 2 ? event.deltaY * window.innerHeight : event.deltaY

      if (!atPageEnd || delta <= 0) {
        state.distance = 0
        window.clearTimeout(state.timer)
        state.timer = null
        return
      }

      state.distance += delta
      window.clearTimeout(state.timer)
      state.timer = window.setTimeout(() => {
        state.distance = 0
        state.timer = null
      }, 850)

      if (state.distance >= 900) window.location.assign('/')
    }
    window.addEventListener('wheel', returnHomeAtEnd, { passive: true })
    return () => {
      window.removeEventListener('wheel', returnHomeAtEnd)
      window.clearTimeout(exitScrollRef.current.timer)
    }
  }, [])
  return <main className="about-page" id="about-page-top">
    <Navigation />
    <section className="about-page-intro" aria-label="Introduction">
      <h1 className="sr-only">About Sonia Wadhwani</h1>
      <div className="about-collage" aria-label="Portrait placeholder composition">
        <div className="about-collage-photo"><img src="/assets/about-portrait.jpeg" alt="Sonia working at a table" /></div>
        <div className="about-collage-accent" aria-hidden="true"><img src="/assets/sonia-doodle.png" alt="" /></div>
      </div>
      <p className="about-intro-copy">Hi, I’m Sonia. A right-brain thinker driven by curiosity, I see design as a way to bridge emotion and function. I love creating experiences that tell stories, spark connection, and make everyday moments meaningful.</p>
    </section>
    <AboutContent />
    <ContactFooter />
  </main>
}

function ProjectCard({ project, selected }) { return <article className={`project-card project-card--${project.number}${selected ? ' is-selected' : ''}`}>
  <a className="project-image" href={project.destination} style={{ '--project-placeholder-color': project.color }} aria-label={`Open ${project.name}: ${project.category}`}>
    {project.image ? <img src={project.image} alt="" /> : <span className="project-image-placeholder">PROJECT IMAGE {project.number}</span>}
  </a>
</article> }

function SaarthiTouchpointIcon({ name }) {
  const line = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2.5 }
  const art = {
    app: <><rect x="19" y="7" width="26" height="50" rx="5" {...line} /><path d="M27 13h10M29 50h6" {...line} /><path d="M32 22l2.2 4.5 5 .7-3.6 3.5.8 5-4.4-2.4-4.4 2.4.8-5-3.6-3.5 5-.7z" fill="#d99f88" /></>,
    kit: <><path d="M12 24h40v31H12zM18 24v-8h28v8" {...line} /><path d="M32 31c-5 5-8 9-8 13a8 8 0 0016 0c0-4-3-8-8-13z" fill="#e7b9a7" stroke="currentColor" strokeWidth="2" /></>,
    token: <><circle cx="25" cy="34" r="15" {...line} /><circle cx="41" cy="29" r="14" {...line} /><path d="M25 25l2 5 5 .5-4 3 .9 5-3.9-2.5-4 2.5 1-5-4-3 5-.5z" fill="#d99f88" /></>,
    meal: <><path d="M12 34h40c-1 12-8 19-20 19s-19-7-20-19z" fill="#e7b9a7" stroke="currentColor" strokeWidth="2.5" /><path d="M16 28c5-5 9-5 14 0 5-5 10-5 17 0M20 20v-5m12 5v-7m12 7v-5" {...line} /></>,
    ambulance: <><path d="M8 23h31v23H8zM39 30h10l7 9v7H39z" fill="#f8e4dc" stroke="currentColor" strokeWidth="2.5" /><circle cx="19" cy="48" r="5" fill="#fff3ed" stroke="currentColor" strokeWidth="2.5" /><circle cx="47" cy="48" r="5" fill="#fff3ed" stroke="currentColor" strokeWidth="2.5" /><path d="M20 28v12m-6-6h12M44 34h6" {...line} /></>,
    volunteer: <><circle cx="32" cy="17" r="8" fill="#e7b9a7" stroke="currentColor" strokeWidth="2.5" /><path d="M17 54c1-14 6-22 15-22s14 8 15 22z" fill="#f0cfc2" stroke="currentColor" strokeWidth="2.5" /><path d="M27 36l5 6 5-6m-5 6v11" {...line} /></>,
    driver: <><path d="M11 38l5-13h31l6 13v11H11z" fill="#f0cfc2" stroke="currentColor" strokeWidth="2.5" /><path d="M19 26l4-9h18l4 9" {...line} /><circle cx="20" cy="48" r="4" fill="#fff3ed" stroke="currentColor" strokeWidth="2.5" /><circle cx="44" cy="48" r="4" fill="#fff3ed" stroke="currentColor" strokeWidth="2.5" /></>,
    temple: <><path d="M10 54h44M15 48h34M19 47V31m9 16V31m8 16V31m9 16V31M13 29h38L32 12z" fill="#e7b9a7" stroke="currentColor" strokeWidth="2.5" /><path d="M32 12V7m-4 8h8" {...line} /></>,
    sign: <><path d="M31 55V11m0 8h20l-5 7 5 7H31m0-8H13l5 7-5 7h18" {...line} /><path d="M26 55h12" {...line} /></>,
    rest: <><path d="M12 35h40v9H12zM16 44v11m32-11v11M16 26h32v9H16z" fill="#e7b9a7" stroke="currentColor" strokeWidth="2.5" /><path d="M20 26V17m24 9V17" {...line} /></>,
    cab: <><path d="M9 37l5-12h36l5 12v12H9z" fill="#f0cfc2" stroke="currentColor" strokeWidth="2.5" /><path d="M22 25l3-8h14l4 8m-10-8v-5h10v5" {...line} /><circle cx="19" cy="48" r="4" fill="#fff3ed" stroke="currentColor" strokeWidth="2.5" /><circle cx="45" cy="48" r="4" fill="#fff3ed" stroke="currentColor" strokeWidth="2.5" /></>,
    ride: <><path d="M8 39l5-12h38l5 12v10H8z" fill="#f0cfc2" stroke="currentColor" strokeWidth="2.5" /><path d="M18 27l4-9h19l5 9" {...line} /><circle cx="18" cy="48" r="4" fill="#fff3ed" stroke="currentColor" strokeWidth="2.5" /><circle cx="46" cy="48" r="4" fill="#fff3ed" stroke="currentColor" strokeWidth="2.5" /><circle cx="25" cy="22" r="4" fill="#d99f88" /><circle cx="36" cy="22" r="4" fill="#d99f88" /></>,
    message: <><path d="M10 13h44v31H31L19 54v-10h-9z" fill="#f0cfc2" stroke="currentColor" strokeWidth="2.5" /><path d="M21 28h22m-22 8h15" {...line} /></>,
    clock: <><circle cx="32" cy="33" r="22" fill="#f0cfc2" stroke="currentColor" strokeWidth="2.5" /><path d="M32 19v15l11 7" {...line} /></>,
    ticket: <><path d="M12 19h40v10a6 6 0 000 12v8H12v-8a6 6 0 000-12z" fill="#f0cfc2" stroke="currentColor" strokeWidth="2.5" /><path d="M32 21v4m0 5v4m0 5v4" {...line} /></>,
    id: <><rect x="9" y="15" width="46" height="34" rx="4" fill="#f0cfc2" stroke="currentColor" strokeWidth="2.5" /><circle cx="22" cy="29" r="6" fill="#d99f88" /><path d="M14 42c1-5 4-7 8-7s7 2 8 7m6-13h12m-12 8h12" {...line} /></>,
    audio: <><path d="M11 27h10l14-11v32L21 37H11z" fill="#f0cfc2" stroke="currentColor" strokeWidth="2.5" /><path d="M43 25c5 5 5 12 0 17m5-23c9 8 9 21 0 29" {...line} /></>,
  }
  return <svg className="saarthi-touchpoint-illustration" viewBox="0 0 64 64" aria-hidden="true">{art[name]}</svg>
}

function SaarthiArtifact({ src, alt, label }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) return <div className="saarthi-artifact-placeholder" role="img" aria-label={`${label} image placeholder`}><span>{label.toUpperCase()}<br />IMAGE PLACEHOLDER</span></div>
  return <figure className="saarthi-stage-artifact"><img src={src} alt={alt} onError={() => setFailed(true)} /><figcaption>{label}</figcaption></figure>
}

function SaarthiSpectrumCard({ theme }) {
  const [period, setPeriod] = useState('Past')
  const periods = ['Past', 'Present', 'Future']
  const id = `saarthi-spectrum-${theme.theme.toLowerCase()}`
  return <article className="saarthi-spectrum-card" aria-labelledby={`${id}-title`}>
    <h5 id={`${id}-title`}>{theme.theme}</h5>
    <div className="saarthi-spectrum-tabs" role="tablist" aria-label={`${theme.theme} time period`}>
      {periods.map((item, index) => <button key={item} type="button" role="tab" id={`${id}-${item}`} aria-controls={`${id}-panel`} aria-selected={period === item} tabIndex={period === item ? 0 : -1} onClick={() => setPeriod(item)} onKeyDown={event => {
        let next
        if (event.key === 'ArrowRight') next = (index + 1) % periods.length
        if (event.key === 'ArrowLeft') next = (index + periods.length - 1) % periods.length
        if (event.key === 'Home') next = 0
        if (event.key === 'End') next = periods.length - 1
        if (next !== undefined) {
          event.preventDefault()
          setPeriod(periods[next])
          event.currentTarget.parentElement.children[next].focus()
        }
      }}>{item}</button>)}
    </div>
    <div className="saarthi-spectrum-panel" id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-${period}`} tabIndex={0}>
      {theme.periods[period].map((note, index) => <p key={`${period}-${index}`}>{note.text}</p>)}
    </div>
  </article>
}

function SaarthiSpectrum() {
  return <details className="saarthi-spectrum-disclosure">
    <summary><span>Spectrum analysis</span><span className="saarthi-spectrum-disclosure-icon" aria-hidden="true" /></summary>
    <div className="saarthi-spectrum-cards">{saarthiSpectrum.map(theme => <SaarthiSpectrumCard key={theme.theme} theme={theme} />)}</div>
  </details>
}

function SaarthiStakeholderMap() {
  const groups = [
    { level: 'Primary', items: ['Tourists', 'Locals', 'Communities', 'Artisans', 'Heritage Site Managers', 'Local Business'] },
    { level: 'Secondary', items: ['Government', 'Tourism Companies', 'Educational Institutions', 'NGOs', 'Auto / cab drivers'] },
    { level: 'Tertiary', items: ['International Heritage Bodies', 'UNESCO'] },
  ]
  return <details className="saarthi-spectrum-disclosure">
    <summary><span>Stakeholders</span><span className="saarthi-spectrum-disclosure-icon" aria-hidden="true" /></summary>
    <div className="saarthi-stakeholders">
    {groups.map(group => <section className="saarthi-stakeholders-tier" key={group.level} aria-label={`${group.level} stakeholders`}>
      <h5>{group.level}</h5>
      <ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul>
    </section>)}
    </div>
  </details>
}

function SaarthiHypothesisStatement({ label, belief, reason, preferred }) {
  return <article className={`saarthi-hypothesis-statement${preferred ? ' is-preferred' : ''}`}>
    <h5>{label}</h5>
    <p className="saarthi-hypothesis-prompt">We feel that</p>
    <span className="saarthi-hypothesis-down" aria-hidden="true">↓</span>
    <div className="saarthi-hypothesis-belief">{belief}</div>
    <span className="saarthi-hypothesis-down" aria-hidden="true">↓</span>
    <p className="saarthi-hypothesis-because">because</p>
    <span className="saarthi-hypothesis-down" aria-hidden="true">↓</span>
    <div className="saarthi-hypothesis-reason">{reason}</div>
  </article>
}

function SaarthiHypothesis() {
  return <details className="saarthi-spectrum-disclosure">
    <summary><span>Hypothesis</span><span className="saarthi-spectrum-disclosure-icon" aria-hidden="true" /></summary>
    <div className="saarthi-hypothesis-fit" role="region" aria-label="Hypothesis development">
      <div className="saarthi-hypothesis-flow saarthi-hypothesis-replica">
        <svg className="saarthi-hypothesis-connections" viewBox="0 0 1200 760" preserveAspectRatio="none" aria-hidden="true">
          <defs><marker id="saarthi-hypothesis-arrowhead" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M1 1L9 5L1 9" fill="none" stroke="#999" strokeWidth="1" /></marker></defs>
          <g fill="none" stroke="#999" strokeWidth="1.2" markerEnd="url(#saarthi-hypothesis-arrowhead)">
            <path d="M110 173C110 210 150 200 150 310" />
            <path d="M210 112C220 30 270 34 285 100" />
            <path d="M298 315C345 315 330 35 550 35" />
            <path d="M650 35C880 35 1050 10 1050 310" />
            <path d="M600 285C600 296 600 296 600 310" />
            <path d="M740 300C800 300 755 111 805 111" />
            <path d="M875 136C875 153 925 153 925 170" />
            <path d="M1000 198C1045 198 990 210 1000 310" />
          </g>
        </svg>
        <div className="saarthi-hypothesis-common"><span>Common ground</span></div>
        <aside className="saarthi-hypothesis-context"><p>Many heritage sites are “museum-ified,” separated from communities → younger generations feel detached.</p></aside>
        <span className="saarthi-hypothesis-arrow" aria-hidden="true">→</span>
        <SaarthiHypothesisStatement label="Initial hypothesis" belief="making heritage spaces accessible will improve public engagement" reason="the younger generation is currently excluded from cultural participation." />
        <div className="saarthi-hypothesis-question">Accessible how??</div>
        <aside className="saarthi-hypothesis-context saarthi-hypothesis-context--long">
          <h5>Disconnect between communities and “museum-ified” heritage</h5>
          <p>The past showed that protection was organic because heritage was tied to daily life. This approach seeks to re-establish that direct connection by empowering locals as active participants and direct beneficiaries.</p>
          <p>We feel that many locals view heritage primarily through a business lens, seeing it as a source of income rather than a cultural obligation. This can lead to the exploitation of heritage for tourism, or its neglect if it doesn't provide a clear financial return. The disconnect isn't just a passive detachment, but an active choice to prioritize economic survival over traditional cultural preservation.</p>
        </aside>
        <span className="saarthi-hypothesis-arrow" aria-hidden="true">→</span>
        <SaarthiHypothesisStatement label="Community-led participation" preferred belief="integrating local communities as official storytellers or guides will foster a deeper sense of ownership and engagement" reason={'it creates a direct link between the people, the heritage, and its economic value, moving it beyond a passive “museum” experience.'} />
        <div className="saarthi-hypothesis-reframe">Reframe</div><div className="saarthi-hypothesis-local">Locals are more business focused instead of preserving the culture</div>
        <SaarthiHypothesisStatement label="Reframed hypothesis" preferred belief="empowering locals to lead cultural initiatives (e.g., festivals, community-led tours, and artisan markets) will foster a stronger sense of belonging," reason="it re-establishes heritage as a source of shared identity and a unique business differentiator that is worth protecting." />
      </div>
    </div>
  </details>
}

function SaarthiPersona() {
  const sections = [
    { title: 'Motivation & beliefs', items: [
      'Visits the temple out of deep devotion and routine — a way to stay emotionally connected to the goddess.',
      'Believes her visits bring peace, protection, and continuity of family traditions.',
      'Finds comfort and purpose in maintaining rituals despite age and physical strain.',
    ] },
    { title: 'Behaviours & rituals', items: [
      'Prefers morning visits (6–8 AM) for peaceful darshan before the crowd builds.',
      'Brings her own puja thali, flowers, and diya.',
      'Sometimes comes with grandchildren to teach them rituals.',
      'After darshan, likes to sit near the courtyard and chant softly.',
      'Occasionally offers help to temple volunteers during festivals.',
    ] },
    { title: 'Pain points', items: [
      'Struggles with physical access: stairs and uneven surfaces.',
      'Crowd mismanagement on weekends and festivals.',
      'Crowd pressure during festivals makes it difficult to stand for long.',
      'Uneven flooring and a lack of resting benches near the queue.',
      'Noise from speakers during peak hours disturbs the calm experience.',
    ] },
    { title: 'Opportunity areas', items: [
      'Provide resting benches and shade along queue areas.',
      'Introduce a priority darshan line for seniors.',
      'Add softer lighting and sound zones for peaceful rituals.',
      'Create community volunteer groups for elderly assistance.',
    ] },
  ]
  return <details className="saarthi-spectrum-disclosure">
    <summary><span>Persona</span><span className="saarthi-spectrum-disclosure-icon" aria-hidden="true" /></summary>
    <div className="saarthi-persona">
      <header className="saarthi-persona-profile">
        <div className="saarthi-persona-portrait"><img src="/assets/saarthi-dadiji-persona.png" alt="Dadi ji seated with her hands joined in prayer" loading="lazy" /></div>
        <div className="saarthi-persona-identity">
          <p className="saarthi-persona-kicker">MEET DADI JI</p>
          <h5>Savitri Deshmukh</h5>
          <p className="saarthi-persona-meta">68 years · Retired homemaker</p>
          <dl><div><dt>Lives</dt><dd>15–20 minutes from the temple; travels by rickshaw or with family.</dd></div><div><dt>Temple visits</dt><dd>3–4 times a week; daily during Navratri or special occasions.</dd></div></dl>
          <blockquote>“This place gives me strength every time I visit.”</blockquote>
        </div>
      </header>
      <section className="saarthi-persona-emotions" aria-label="Emotional experience">
        <h6>Emotional experience</h6>
        <div><blockquote>“But since the construction started, I have to be extra careful while climbing.”</blockquote><blockquote>“If only there was a place to sit and rest before darshan — it would help a lot.”</blockquote></div>
      </section>
      <div className="saarthi-persona-details">{sections.map(section => <section key={section.title} className="saarthi-persona-detail">
        <h6>{section.title}</h6><ul>{section.items.map(item => <li key={item}>{item}</li>)}</ul>
      </section>)}</div>
    </div>
  </details>
}

function SaarthiAsIsJourney() {
  const [expanded, setExpanded] = useState(null)
  const closeRef = useRef(null)
  useEffect(() => {
    if (!expanded) return
    const previousFocus = document.activeElement
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = event => {
      if (event.key === 'Escape') setExpanded(null)
      if (event.key === 'Tab') {
        const dialog = closeRef.current?.closest('[role="dialog"]')
        const controls = dialog?.querySelectorAll('button')
        if (!controls?.length) return
        const first = controls[0], last = controls[controls.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = overflow; window.removeEventListener('keydown', onKey); previousFocus?.focus() }
  }, [expanded])
  return <details className="saarthi-spectrum-disclosure">
    <summary><span>As-is journey map</span><span className="saarthi-spectrum-disclosure-icon" aria-hidden="true" /></summary>
    <p className="saarthi-journey-scroll-hint">Scroll to explore · Click any box or the feelings graph to expand</p>
    <div className="saarthi-original-journey-scroll" role="region" aria-label="Scrollable as-is journey map" tabIndex={0}>
      <div className="saarthi-journey-interactive-board">
        <object className="saarthi-original-journey" data={saarthiAsIsJourney} type="image/svg+xml" aria-label="As-is journey map in its original arrow-led layout" />
        {journeyInteractions.headings.map((heading,index) => <span key={heading.name} className="saarthi-journey-stage-label" style={{ left: `${heading.left}%`, top: '0.8%', width: `${index === 0 ? (journeyInteractions.headings[1].left - heading.left) * .94 : index === journeyInteractions.headings.length - 1 ? (heading.left - journeyInteractions.headings[index - 1].left) * .94 : Math.min(heading.left - journeyInteractions.headings[index - 1].left, journeyInteractions.headings[index + 1].left - heading.left) * .94}%`, background: ['#ffc2ec','#d9ccff','#bde3ff','#c7faf5','#ccf5d3','#ffedbd','#ffe0c2','#ffc7c2','#d9d9d9'][index] }}>{heading.name}</span>)}
        {journeyInteractions.cards.map((card,index) => <button type="button" className="saarthi-journey-hotspot" key={index} style={{ left: `${card.left}%`, top: `${card.top}%`, width: `${card.width}%`, height: `${card.height}%` }} aria-label={`Expand: ${card.text.replace(/\s+/g, ' ').slice(0,100)}`} onClick={() => setExpanded(card)} />)}
        <button type="button" className="saarthi-journey-graph-hotspot" aria-label="Expand the full feelings graph" onClick={() => setExpanded({ graph: true })} />
      </div>
    </div>
    {expanded && <div className="saarthi-journey-modal" onClick={() => setExpanded(null)}>
      <div className={`saarthi-journey-modal-content${expanded.graph ? ' is-graph' : ''}`} role="dialog" aria-modal="true" aria-label={expanded.graph ? 'Feelings throughout the journey' : 'Journey map detail'} style={expanded.graph ? undefined : { background: expanded.color }} onClick={event => event.stopPropagation()}>
        <button className="saarthi-journey-modal-close" ref={closeRef} type="button" onClick={() => setExpanded(null)} aria-label="Close expanded view">×</button>
        {expanded.graph ? <><h4>Feelings throughout the journey</h4><object className="saarthi-expanded-feelings" data={`${saarthiAsIsJourney}#svgView(viewBox(0,4500,18870.578125,2162))`} type="image/svg+xml" aria-label="Full emotional journey curve" /><div className="saarthi-feelings-stage-legend">{journeyInteractions.headings.map(heading => <span key={heading.name}>{heading.name}</span>)}</div></> : <p>{expanded.text.replace(/\s+/g, ' ').trim()}</p>}
      </div>
    </div>}
  </details>
}

function SaarthiAffinity() {
  const [expanded, setExpanded] = useState(null)
  const closeRef = useRef(null)
  useEffect(() => {
    if (!expanded) return
    const previousFocus = document.activeElement
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = event => {
      if (event.key === 'Escape') setExpanded(null)
      if (event.key === 'Tab') {
        const dialog = closeRef.current?.closest('[role="dialog"]')
        const controls = dialog?.querySelectorAll('button')
        if (!controls?.length) return
        const first = controls[0], last = controls[controls.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = overflow; window.removeEventListener('keydown', onKey); previousFocus?.focus() }
  }, [expanded])
  const scale = .2
  return <details className="saarthi-spectrum-disclosure">
    <summary><span>Affinity map</span><span className="saarthi-spectrum-disclosure-icon" aria-hidden="true" /></summary>
    <p className="saarthi-journey-scroll-hint">Select a cluster to explore its notes</p>
    <div className="saarthi-affinity-overview" aria-label="Affinity wall cluster overview">
      {saarthiAffinity.map(group => <button type="button" className="saarthi-affinity-cluster" key={group.title} onClick={() => setExpanded({ group })} aria-label={`Explore ${group.title}, ${group.notes.length} notes`}>
        <span className="saarthi-affinity-cluster-preview" aria-hidden="true">{group.notes.map((note,index) => <span key={index} style={{ background: note.color }} />)}</span>
        <span className="saarthi-affinity-cluster-title">{group.title}</span>
        <span className="saarthi-affinity-cluster-meta">{group.notes.length} notes <span aria-hidden="true">↗</span></span>
      </button>)}
    </div>
    {expanded && <div className="saarthi-journey-modal" onClick={() => setExpanded(null)}>
      <div className={`saarthi-journey-modal-content saarthi-affinity-expanded${expanded.group ? ' is-group' : ''}`} role="dialog" aria-modal="true" aria-label={expanded.group?.title || expanded.title} style={expanded.note ? { background: expanded.note.color } : undefined} onClick={event => event.stopPropagation()}>
        <button className="saarthi-journey-modal-close" ref={closeRef} type="button" onClick={() => setExpanded(null)} aria-label="Close expanded view">×</button>
        {expanded.parentGroup && <button type="button" className="saarthi-affinity-back" onClick={() => setExpanded({ group: expanded.parentGroup })}>← Back to cluster</button>}
        <h4>{expanded.group?.title || expanded.title}</h4>
        {expanded.group ? <div className="saarthi-affinity-expanded-notes">{expanded.group.notes.map((note,index) => <button type="button" key={index} style={{ background: note.color }} onClick={() => setExpanded({ note, title: expanded.group.title, group: undefined, parentGroup: expanded.group })}>{note.text}</button>)}</div> : <p>{expanded.note.text}</p>}
      </div>
    </div>}
  </details>
}

function SaarthiInsights() {
  const [selected, setSelected] = useState(null)
  const closeRef = useRef(null)
  useEffect(() => {
    if (!selected) return
    const previousFocus = document.activeElement
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = event => {
      if (event.key === 'Escape') setSelected(null)
      if (event.key === 'Tab') { event.preventDefault(); closeRef.current?.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = overflow; window.removeEventListener('keydown', onKey); previousFocus?.focus() }
  }, [selected])
  return <details className="saarthi-spectrum-disclosure">
    <summary><span>Insights</span><span className="saarthi-spectrum-disclosure-icon" aria-hidden="true" /></summary>
    <p className="saarthi-journey-scroll-hint">Six insights · Select one to explore its context and supporting notes</p>
    <div className="saarthi-insights-grid">{saarthiInsights.map((item,index) => <button className="saarthi-insight-card" type="button" key={item.insight} onClick={() => setSelected(item)}>
      <span className="saarthi-insight-index">INSIGHT {String(index+1).padStart(2,'0')}</span>
      <span className="saarthi-insight-title">{item.insight}</span>
      <span className="saarthi-insight-explore">Explore the evidence <span aria-hidden="true">↗</span></span>
    </button>)}</div>
    {selected && <div className="saarthi-journey-modal" onClick={() => setSelected(null)}>
      <div className="saarthi-journey-modal-content saarthi-insight-expanded" role="dialog" aria-modal="true" aria-labelledby="saarthi-insight-expanded-title" onClick={event => event.stopPropagation()}>
        <button ref={closeRef} className="saarthi-journey-modal-close" type="button" onClick={() => setSelected(null)} aria-label="Close insight">×</button>
        <p className="saarthi-insight-index">THE INSIGHT</p>
        <h4 id="saarthi-insight-expanded-title">{selected.insight}</h4>
        <section className="saarthi-insight-context"><h5>Context</h5>{selected.context.split('\n\n').map(text => <p key={text}>{text}</p>)}</section>
        <section className="saarthi-insight-evidence"><h5>From the affinity wall</h5><div>{selected.evidence.map((note,index) => <article key={note}><span>{index === 0 ? 'SYNTHESIS' : 'SUPPORTING VOICE'}</span><p>{note}</p></article>)}</div></section>
      </div>
    </div>}
  </details>
}

function SaarthiNarrative() {
  return <details className="saarthi-spectrum-disclosure" open>
    <summary><span>Narrative</span><span className="saarthi-spectrum-disclosure-icon" aria-hidden="true" /></summary>
    <section className="saarthi-narrative" aria-labelledby="saarthi-narrative-title">
    <p className="saarthi-overline">FINAL NARRATIVE</p>
    <h4 id="saarthi-narrative-title">{saarthiNarrative.title}</h4>
    <div className="saarthi-narrative-copy">{saarthiNarrative.paragraphs.map((paragraph,index) => <p key={index}>{paragraph}</p>)}</div>
  </section>
  </details>
}

function SaarthiStoryboard() {
  const [expanded, setExpanded] = useState(false)
  const closeRef = useRef(null)
  useEffect(() => {
    if (!expanded) return
    const previousFocus = document.activeElement
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = event => {
      if (event.key === 'Escape') setExpanded(false)
      if (event.key === 'Tab') { event.preventDefault(); closeRef.current?.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = overflow; window.removeEventListener('keydown', onKey); previousFocus?.focus() }
  }, [expanded])
  return <details className="saarthi-spectrum-disclosure" open>
    <summary><span>Storyboard</span><span className="saarthi-spectrum-disclosure-icon" aria-hidden="true" /></summary>
    <button className="saarthi-storyboard-preview" type="button" onClick={() => setExpanded(true)} aria-label="Expand Dadiji’s Saarthi storyboard">
      <img src="/assets/saarthi-storyboard.png" alt="Fifteen-panel storyboard following Dadiji from introduction to Saarthi and WhatsApp updates through transport, volunteer assistance, darshan, prasad and her return home" loading="lazy" />
      <span>View storyboard ↗</span>
    </button>
    {expanded && <div className="saarthi-journey-modal" onClick={() => setExpanded(false)}>
      <div className="saarthi-journey-modal-content saarthi-storyboard-expanded" role="dialog" aria-modal="true" aria-label="Dadiji’s first day with Saarthi storyboard" onClick={event => event.stopPropagation()}>
        <button ref={closeRef} className="saarthi-journey-modal-close" type="button" onClick={() => setExpanded(false)} aria-label="Close storyboard">×</button>
        <div className="saarthi-storyboard-scroll"><img src="/assets/saarthi-storyboard.png" alt="Complete Saarthi storyboard, in original panel order" /></div>
      </div>
    </div>}
  </details>
}

function SaarthiTouchpointArtwork({ item }) {
  const [x,y,width,height] = item.crop
  return <span className="saarthi-tp-art" style={{ aspectRatio: `${width}/${height}` }} aria-hidden="true"><img src="/assets/saarthi-touchpoints-sheet.png" alt="" loading="lazy" style={{ width: `${1792/width*100}%`, maxWidth: 'none', left: `${-x/width*100}%`, top: `${-y/height*100}%` }} /></span>
}

function SaarthiServiceTouchpoints() {
  const [selected, setSelected] = useState(null)
  const closeRef = useRef(null)
  useEffect(() => {
    if (!selected) return
    const previousFocus = document.activeElement
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = event => {
      if (event.key === 'Escape') setSelected(null)
      if (event.key === 'Tab') { event.preventDefault(); closeRef.current?.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = overflow; window.removeEventListener('keydown', onKey); previousFocus?.focus() }
  }, [selected])
  return <details className="saarthi-spectrum-disclosure">
    <summary><span>Service touchpoints</span><span className="saarthi-spectrum-disclosure-icon" aria-hidden="true" /></summary>
    <div className="saarthi-tp-groups">{saarthiTouchpoints.map(group => <section className={`saarthi-tp-group${group.name === 'People' ? ' is-people' : ''}`} key={group.name}>
      <h4>{group.name}</h4>
      <div className="saarthi-tp-items">{group.items.map(item => <button type="button" key={item.name} className="saarthi-tp-item" onClick={() => setSelected({ ...item, group: group.name })} aria-label={`Explore ${item.name}`}>
        <SaarthiTouchpointArtwork item={item} /><span>{item.name}</span>
      </button>)}</div>
    </section>)}</div>
    {selected && <div className="saarthi-journey-modal" onClick={() => setSelected(null)}>
      <div className="saarthi-journey-modal-content saarthi-tp-expanded" role="dialog" aria-modal="true" aria-labelledby="saarthi-tp-expanded-title" onClick={event => event.stopPropagation()}>
        <button ref={closeRef} className="saarthi-journey-modal-close" type="button" onClick={() => setSelected(null)} aria-label="Close touchpoint">×</button>
        <p className="saarthi-tp-category">{selected.group}</p>
        <SaarthiTouchpointArtwork item={selected} />
        <h4 id="saarthi-tp-expanded-title">{selected.name}</h4>
        <p>{selected.description}</p>
      </div>
    </div>}
  </details>
}

function SaarthiBlueprintArtwork() {
  return <div className="saarthi-blueprint-art saarthi-blueprint-native" aria-label="Service blueprint">
    <svg className="saarthi-blueprint-wires" viewBox="263 453 1510 650" preserveAspectRatio="none" aria-hidden="true">
      <defs><marker id="saarthi-bp-arrow" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L6 3L0 6Z" fill="#9c685a" /></marker></defs>
      <g fill="none" stroke="#cbb0a5" strokeWidth=".8" strokeDasharray="3 3"><path d="M263 566H1773M263 790H1773M263 964H1773M360 453V1103" /></g>
      <g fill="none" stroke="#9c685a" strokeWidth="1" markerEnd="url(#saarthi-bp-arrow)">{saarthiBlueprintConnections.map((path,index) => <path key={index} d={path} />)}</g>
    </svg>
    {saarthiBlueprintBoxes.map((box,index) => <div key={index} className={`saarthi-blueprint-node${box.x < 360 ? ' is-lane' : ''}${box.y === 580 ? ' is-stage' : ''}`} style={{ left: `${(box.x-263)/1510*100}%`, top: `${(box.y-453)/650*100}%`, width: `${box.w/1510*100}%`, height: `${box.h/650*100}%` }}>{box.text}</div>)}
  </div>
}

function SaarthiBlueprint() {
  const [expanded, setExpanded] = useState(null)
  const closeRef = useRef(null)
  useEffect(() => {
    if (!expanded) return
    const previousFocus = document.activeElement
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = event => {
      if (event.key === 'Escape') setExpanded(null)
      if (event.key === 'Tab') { event.preventDefault(); closeRef.current?.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = overflow; window.removeEventListener('keydown', onKey); previousFocus?.focus() }
  }, [expanded])
  return <details className="saarthi-spectrum-disclosure">
    <summary><span>Service blueprint</span><span className="saarthi-spectrum-disclosure-icon" aria-hidden="true" /></summary>
    <div className="saarthi-blueprint-toolbar"><p>Scroll horizontally · Select a box to read it</p><button type="button" onClick={() => setExpanded({ whole: true })}>View full blueprint ↗</button></div>
    <div className="saarthi-blueprint-scroll" role="region" aria-label="Scrollable service blueprint" tabIndex={0}>
      <div className="saarthi-blueprint-board" onClick={() => setExpanded({ whole: true })}>
        <SaarthiBlueprintArtwork />
        {saarthiBlueprintBoxes.map((box,index) => <button className="saarthi-blueprint-box" type="button" key={index} style={{ left: `${(box.x-263)/1510*100}%`, top: `${(box.y-453)/650*100}%`, width: `${box.w/1510*100}%`, height: `${box.h/650*100}%` }} aria-label={`Read: ${box.text}`} onClick={event => { event.stopPropagation(); setExpanded(box) }} />)}
      </div>
    </div>
    {expanded && <div className="saarthi-journey-modal" onClick={() => setExpanded(null)}>
      <div className={`saarthi-journey-modal-content saarthi-blueprint-expanded${expanded.whole ? ' is-whole' : ''}`} role="dialog" aria-modal="true" aria-label={expanded.whole ? 'Full service blueprint' : 'Service blueprint detail'} onClick={event => event.stopPropagation()}>
        <button className="saarthi-journey-modal-close" ref={closeRef} type="button" onClick={() => setExpanded(null)} aria-label="Close blueprint">×</button>
        {expanded.whole ? <SaarthiBlueprintArtwork /> : <p>{expanded.text}</p>}
      </div>
    </div>}
  </details>
}

function SaarthiBrandArchitecture() {
  const [active, setActive] = useState(0)
  const selected = saarthiBrand.interfaces[active]
  return <details className="saarthi-spectrum-disclosure">
    <summary><span>Brand architecture</span><span className="saarthi-spectrum-disclosure-icon" aria-hidden="true" /></summary>
    <div className="saarthi-brand">
      <header className="saarthi-brand-intro">
        <div className="saarthi-brand-logo"><img src="/assets/saarthi-brand-logo.png" alt="Saarthi — जो साथ निभाए" loading="lazy" /></div>
        <div><p className="saarthi-brand-kicker">THE BRAND PROMISE</p><h4>{saarthiBrand.promise}</h4><p>{saarthiBrand.positioning}</p></div>
      </header>
      <section className="saarthi-brand-section" aria-label="Brand foundations">
        <h4>Built around dignity.</h4>
        <div className="saarthi-brand-foundations">{saarthiBrand.foundations.map(item => <article key={item.title}><h5>{item.title}</h5><p>{item.text}</p></article>)}</div>
      </section>
      <section className="saarthi-brand-section" aria-label="Brand values">
        <p className="saarthi-brand-kicker">WHAT GUIDES EVERY TOUCHPOINT</p><h4>Six values. One caring companion.</h4>
        <div className="saarthi-brand-values">{saarthiBrand.values.map(value => <article key={value.name}><h5>{value.name}</h5><p>{value.text}</p></article>)}</div>
      </section>
      <section className="saarthi-brand-section" aria-label="Brand personality">
        <h4>How Saarthi feels.</h4>
        <div className="saarthi-brand-personality">{saarthiBrand.personality.map(item => <article key={item.name}><h5>{item.name}</h5><p>{item.text}</p></article>)}</div>
      </section>
      <section className="saarthi-brand-section" aria-labelledby="saarthi-brand-interfaces-title">
        <p className="saarthi-brand-kicker">ONE SERVICE, FOUR CONNECTED INTERFACES</p><h4 id="saarthi-brand-interfaces-title">Support shaped around each person.</h4>
        <div className="saarthi-brand-interfaces" role="tablist" aria-label="Saarthi interfaces">{saarthiBrand.interfaces.map((item,index) => <button type="button" role="tab" key={item.name} id={`saarthi-brand-tab-${index}`} aria-controls="saarthi-brand-panel" aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => {
          let next
          if (event.key === 'ArrowRight') next = (index + 1) % 4
          if (event.key === 'ArrowLeft') next = (index + 3) % 4
          if (event.key === 'Home') next = 0
          if (event.key === 'End') next = 3
          if (next !== undefined) { event.preventDefault(); setActive(next); event.currentTarget.parentElement.children[next].focus() }
        }}><span>{item.role}</span>{item.name}</button>)}</div>
        <div className="saarthi-brand-panel" role="tabpanel" id="saarthi-brand-panel" aria-labelledby={`saarthi-brand-tab-${active}`} tabIndex={0}>
          <div className="saarthi-brand-panel-intro"><h5>{selected.channel}</h5><p>{selected.intro}</p><blockquote>{selected.principle}</blockquote></div>
          <div className="saarthi-brand-features"><h6>Interface features</h6><ul>{selected.features.map(feature => <li key={feature}>{feature}</li>)}</ul></div>
          <div className="saarthi-brand-outcomes"><h6>{selected.benefit}</h6><ul>{selected.outcomes.map(outcome => <li key={outcome}>{outcome}</li>)}</ul></div>
        </div>
      </section>
      <section className="saarthi-brand-section" aria-label="Brand colour palette">
        <p className="saarthi-brand-kicker">VISUAL IDENTITY</p><h4>Care, devotion, and calm.</h4>
        <div className="saarthi-brand-colors">{saarthiBrand.colors.map(color => <article key={color.hex}>
          <div className="saarthi-brand-swatch" style={{ background: color.hex, color: color.hex === '#5f1a08' ? '#fff4f0' : '#5f1a08' }}><span>{color.name}</span><code>{color.hex}</code></div>
          <details><summary>Why this colour?</summary><p>{color.reason}</p><h6>Brand meaning</h6><p>{color.meaning}</p></details>
        </article>)}</div>
      </section>
      <section className="saarthi-brand-section" aria-label="Audience messaging">
        <h4>A familiar voice for every audience.</h4>
        <div className="saarthi-brand-taglines">{saarthiBrand.taglines.map(group => <article key={group.audience}><h5>{group.audience}</h5>{group.lines.map(line => <p lang="hi" key={line}>{line}</p>)}</article>)}</div>
      </section>
    </div>
  </details>
}

function SaarthiCaseStudy({ project }) {
  const filmAudioInitialized = useRef(false)
  const initializeFilmAudio = (event) => {
    if (filmAudioInitialized.current) return
    event.currentTarget.muted = false
    event.currentTarget.volume = 1
    filmAudioInitialized.current = true
  }
  const stages = [
    { id: 'research', phase: 'Research', title: 'Understanding the Experience', headline: 'A temple visit is more than just reaching the destination.', artifacts: ['Spectrum analysis', 'Stakeholders', 'Hypothesis'] },
    { id: 'synthesis', phase: 'Synthesis', title: 'Identifying the Gaps', artifacts: ['Affinity map', 'Insights', 'Persona', 'As-is journey map'] },
    { id: 'solutioning', phase: 'Solutioning', title: 'Shaping a Supported Journey', artifacts: ['Narrative', 'Storyboard', 'Service touch points', 'Service blueprint', 'Brand architecture'] },
  ]
  return <main className="saarthi-page saarthi-case-study" id="project-page-top">
    <Navigation />
    <header className="saarthi-hero case-wrap">
      <a className="saarthi-top-back" href="/projects.html">← Back</a>
      <p className="saarthi-overline">CASE STUDY · SERVICE DESIGN</p>
      <h1>{project.name}</h1>
      <p className="saarthi-description">A guided temple experience for elderly devotees.</p>
      <p className="saarthi-disciplines">Service Design <span>·</span> Experience Design</p>
      <figure className="saarthi-hero-image"><img src={project.image} alt={project.imageAlt} /></figure>
    </header>

    <section className="saarthi-overview case-wrap" aria-labelledby="saarthi-overview-title">
      <div className="saarthi-section-heading"><p className="saarthi-overline">OVERVIEW</p><h2 id="saarthi-overview-title">About Saarthi</h2></div>
      <div className="saarthi-overview-copy"><p>Saarthi is a service concept designed to make temple visits more accessible, comfortable, and convenient for elderly devotees. It brings together digital information, transportation, volunteer assistance, and on-ground facilities to create a more supported temple experience.</p><p>The goal is to make every stage of a temple visit easier, from planning the journey and reaching the temple to experiencing darshan and returning home.</p></div>
    </section>

    <section className="saarthi-journey case-wrap" aria-labelledby="saarthi-journey-title">
      <div className="saarthi-section-heading"><p className="saarthi-overline">THE JOURNEY OF MAKING SAARTHI</p><h2 id="saarthi-journey-title">From understanding the challenges of temple visits to designing a service that brings people, information, and infrastructure together.</h2></div>
      <div className="saarthi-stages">{stages.map(stage => <section className="saarthi-process-section" key={stage.id} aria-labelledby={`saarthi-${stage.id}-title`}>
        <header className="saarthi-process-heading">
          <p className="saarthi-overline">{stage.phase}</p>
          <h3 id={`saarthi-${stage.id}-title`}>{stage.title}</h3>
          {stage.headline && <h4>{stage.headline}</h4>}
        </header>

        <div className="saarthi-process-artifacts">{stage.artifacts.map(label => <div className="saarthi-process-artifact" key={label}>
          {!['Spectrum analysis', 'Stakeholders', 'Hypothesis', 'Persona', 'As-is journey map', 'Affinity map', 'Insights', 'Narrative', 'Storyboard', 'Service blueprint', 'Brand architecture', 'Service touch points'].includes(label) && <h4>{label}</h4>}
          {stage.id === 'research' && label === 'Spectrum analysis' ? <SaarthiSpectrum /> : stage.id === 'research' && label === 'Stakeholders' ? <SaarthiStakeholderMap /> : stage.id === 'research' && label === 'Hypothesis' ? <SaarthiHypothesis /> : label === 'Brand architecture' ? <SaarthiBrandArchitecture /> : label === 'Service blueprint' ? <SaarthiBlueprint /> : label === 'Storyboard' ? <SaarthiStoryboard /> : label === 'Narrative' ? <SaarthiNarrative /> : label === 'Insights' ? <SaarthiInsights /> : label === 'Affinity map' ? <SaarthiAffinity /> : label === 'Persona' ? <SaarthiPersona /> : label === 'As-is journey map' ? <SaarthiAsIsJourney /> : label === 'Service touch points' ? <SaarthiServiceTouchpoints /> : <SaarthiArtifact label={label} />}
        </div>)}</div>
      </section>)}</div>
    </section>

    <section className="saarthi-film case-wrap" aria-labelledby="saarthi-film-title">
      <div className="saarthi-section-heading"><p className="saarthi-overline">THE FINAL FILM</p><h2 id="saarthi-film-title">Experience Saarthi</h2><p>A guided temple experience, designed around care, comfort, and companionship.</p></div>
      <video className="saarthi-final-video" controls playsInline muted={false} onPlay={initializeFilmAudio} preload="metadata" poster={project.image} aria-label="Saarthi final video advertisement"><source src="/assets/saarthi-final-film-audio-fixed.mp4" type="video/mp4" />Your browser does not support the video element.</video>
    </section>

    <section className="saarthi-closing case-wrap" aria-label="Return to portfolio projects">
      <a className="saarthi-back-link" href="/#work">← Back to selected projects</a>
      <a className="saarthi-home-link" href="/">Home</a>
    </section>
  </main>
}

function MarginCaseStudy({ project }) {
  const stages = [
    { number: '01', title: 'Project context', headline: 'Understanding the opportunity.', text: 'Research, context, and project goals will be added here.', artifact: 'Context and research' },
    { number: '02', title: 'Ecosystem design', headline: 'Connecting the parts of the experience.', text: 'The ecosystem, its touchpoints, and how they relate will be added here.', artifact: 'Ecosystem map' },
    { number: '03', title: 'Experience design', headline: 'Bringing the experience to life.', text: 'The design process and final experience details will be added here.', artifact: 'Design process and outcomes' },
  ]
  return <main className="saarthi-page margin-case-study" id="project-page-top">
    <Navigation />
    <header className="saarthi-hero case-wrap">
      <p className="saarthi-overline">CASE STUDY · ECOSYSTEM DESIGN</p>
      <h1>{project.name}</h1>
      <p className="saarthi-description">A lifestyle ecosystem project.</p>
      <p className="saarthi-disciplines">Ecosystem Design <span>·</span> Lifestyle Project <span>·</span> Experience Design</p>
      <figure className="saarthi-hero-image"><img src={project.image} alt={project.imageAlt} /></figure>
    </header>

    <section className="saarthi-overview case-wrap" aria-labelledby="margin-overview-title">
      <div className="saarthi-section-heading"><p className="saarthi-overline">02 · OVERVIEW</p><h2 id="margin-overview-title">About Margin</h2></div>
      <div className="saarthi-overview-copy"><p>Margin is an ecosystem design project focused on a lifestyle experience. The project brings together ecosystem design and experience design.</p></div>
    </section>

    <section className="saarthi-journey case-wrap" aria-labelledby="margin-process-title">
      <div className="saarthi-section-heading"><p className="saarthi-overline">03 · THE DESIGN PROCESS</p><h2 id="margin-process-title">From the ecosystem to the experience.</h2></div>
      <div className="saarthi-stages">{stages.map((stage) => <article className="saarthi-stage" key={stage.number}><div className="saarthi-stage-copy"><p className="saarthi-overline">{stage.number}</p><h3>{stage.title}</h3><h4>{stage.headline}</h4><p>{stage.text}</p></div><SaarthiArtifact label={stage.artifact} /></article>)}</div>
    </section>

    <section className="saarthi-closing case-wrap" aria-label="Return to portfolio projects">
      <a className="saarthi-closing-image" href="/#work" aria-label="Return to selected projects on the homepage"><img src={project.image} alt="Margin project hero image; select to return to projects" /><span>BACK TO SELECTED PROJECTS ↗</span></a>
      <a className="saarthi-back-link" href="/#work">← Back to selected projects</a>
      <a className="saarthi-home-link" href="/">Home</a>
    </section>
  </main>
}

function ProjectDetailsPage() {
  const requestedProject = new URLSearchParams(window.location.search).get('project')
  const project = projects.find((item) => item.number === requestedProject) ?? projects[0]
  if (project.number === '01') return <SaarthiCaseStudy project={project} />
  if (project.number === '02') return <MarginCaseStudy project={project} />
  if (project.number === '03') return <EnrolMeCasePlaceholder project={project} />
  return <main className="project-details-page" id="project-page-top">
    <Navigation />
    <nav className="project-wireframe-nav" aria-label="Project page navigation">
      <a href="/" aria-label="Home" /><a href="/about.html" aria-label="About" /><a href="/#work" aria-label="Projects" /><a href="/#skills" aria-label="Skills" /><a href="/#explorations" aria-label="Graphics" /><a href="/#contact" aria-label="Contact" />
    </nav>
    <header className="project-page-intro">
      <h1>{project.name}</h1>
      <p className="project-page-type">{project.category}</p>
      <p className="project-page-summary">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam malesuada ligula lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam malesuada ligula lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </header>
    <div className="project-detail-content">
      <div className="project-detail-image project-detail-hero" role="img" aria-label={project.image ? project.imageAlt : 'Project hero image placeholder'}>{project.image ? <img src={project.image} alt="" /> : <span>PROJECT HERO IMAGE</span>}</div>
      <section className="project-research" aria-labelledby="research-title">
        <div><h2 id="research-title">Research synthesis</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam malesuada ligula lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam malesuada ligula lorem ipsum dolor sit amet.</p></div>
        <div className="project-detail-image project-research-image" role="img" aria-label="Research image placeholder"><span>RESEARCH IMAGE</span></div>
      </section>
      <div className="project-detail-image project-detail-image--wide" role="img" aria-label="Project image placeholder"><span>PROJECT IMAGE</span></div>
      <section className="project-approach" aria-label="Design approach">
        <div className="project-detail-image project-approach-image" role="img" aria-label="Design approach image placeholder"><span>PROCESS IMAGE</span></div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam malesuada ligula lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam malesuada ligula lorem ipsum dolor sit amet.</p>
      </section>
      <div className="project-detail-image project-detail-image--wide project-detail-image--second" role="img" aria-label="Project outcome image placeholder"><span>OUTCOME IMAGE</span></div>
      <div className="project-detail-image project-detail-image--inset" role="img" aria-label="Additional project image placeholder"><span>ADDITIONAL IMAGE</span></div>
      <p className="project-page-reflection">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam malesuada ligula lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam malesuada ligula lorem ipsum dolor sit amet.</p>
    </div>
    <div className="project-detail-footer" role="img" aria-label="Closing project image placeholder"><span>CLOSING IMAGE PLACEHOLDER</span></div>
  </main>
}

function EnrolMeScopeIllustration({ name }) {
  const art = {
    search: <><rect x="22" y="18" width="96" height="76" rx="8" /><path d="M22 37h96" /><circle cx="39" cy="28" r="2" /><path d="M50 28h37" /><rect x="33" y="48" width="28" height="31" rx="4" /><rect x="70" y="48" width="36" height="9" rx="3" /><path d="M72 65h29m-29 9h19" /><circle cx="108" cy="88" r="14" /><path d="m118 98 10 10" /></>,
    trust: <><rect x="27" y="20" width="86" height="73" rx="8" /><circle cx="46" cy="42" r="9" /><path d="M63 38h34M63 46h23M39 63h58M39 72h40" /><path d="m100 72 21 7v14c0 10-12 17-21 21-9-4-21-11-21-21V79z" /><path d="m90 92 7 7 13-16" /></>,
    flow: <><rect x="14" y="34" width="34" height="49" rx="5" /><path d="M22 47h18M22 55h14M22 64h16" /><rect x="72" y="25" width="45" height="66" rx="6" /><path d="M82 40h25M82 49h19M82 58h23" /><circle cx="113" cy="87" r="17" /><path d="m104 87 6 6 12-14" /></>,
    layers: <><path d="m23 40 47-24 47 24-47 25zM23 58l47 25 47-25M23 77l47 25 47-25" /><path d="m58 40 8 8 17-17" /></>,
    lock: <><rect x="29" y="31" width="82" height="68" rx="8" /><path d="M29 49h82M41 40h18M41 65h20M41 76h15" /><rect x="72" y="66" width="34" height="30" rx="5" /><path d="M80 66v-9a9 9 0 0 1 18 0v9M89 79v7" /></>,
    spark: <><rect x="24" y="34" width="70" height="55" rx="6" /><path d="M35 47h47M35 59h29M35 70h19" /><path d="m104 20 5 17 17 5-17 6-5 17-6-17-17-6 17-5zM98 79h25m-12-12v25" /><path d="m34 102 13-8 13 8 13-8" /></>,
  }
  return <svg className="enrolme-scope-illustration" viewBox="0 0 140 125" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><ellipse cx="70" cy="70" rx="57" ry="42" fill="currentColor" opacity=".06" stroke="none" />{art[name]}</svg>
}

function EnrolMeBusinessContext({ section }) {
  if (section === 'Tracksoft Solutions Pvt. Ltd.') return <div className="enrolme-context-content">
    <p className="enrolme-context-lead">The company behind Enrol-Me.</p>
    <p>Tracksoft Solutions Pvt. Ltd. is a Pune-based technology company building cloud-based software products and digital solutions for education and enterprise. Enrol-Me is its admissions and enrollment platform, designed to help institutions promote programs and manage applications, fees, and student administration.</p>
    <p>This industry project focuses on redesigning Enrol-Me’s business and product experience: connecting its operational capabilities with a clearer, more trustworthy journey for parents and institutes.</p>
    <a className="enrolme-context-source" href="https://enrol-me.com/tshome/index.html" target="_blank" rel="noreferrer">About Tracksoft Solutions ↗</a>
  </div>
  if (section === 'Platform background & evolution') return <div className="enrolme-context-content">
    <p className="enrolme-context-lead">From managing admissions to helping people choose.</p>
    <ol className="enrolme-evolution-diagram">
      {[['2016', 'Founded', 'Admissions & fee management'], ['2023', 'Recognition', 'Selected in Shark Tank India'], ['2025', 'Evolution', 'Rethinking the experience'], ['Next chapter', 'Transformation', 'Discovery → trust → enrollment']].map(([year,title,detail]) => <li key={year}><span className="enrolme-evolution-dot" aria-hidden="true" /><span className="enrolme-evolution-year">{year}</span><h5>{title}</h5><p>{detail}</p></li>)}
    </ol>
    <div className="enrolme-evolution-shift"><span>Operational efficiency</span><span className="enrolme-evolution-line" aria-hidden="true" /><span>Experience-driven adoption</span></div>
  </div>
  if (section === 'System components') return <div className="enrolme-context-content">
    <p className="enrolme-context-lead">Two experiences. One connected platform.</p>
    <div className="enrolme-system-diagram">
      <article><span className="enrolme-system-label">PARENT / STUDENT</span><h5>Find & enroll</h5><ul><li>Discover and compare classes</li><li>Apply and track progress</li><li>Pay fees and receive updates</li></ul></article>
      <div className="enrolme-system-core"><span>Enrol-Me</span><small>Listings · Applications<br />Payments · Notifications</small></div>
      <article><span className="enrolme-system-label">INSTITUTE / ORGANIZER</span><h5>Manage & grow</h5><ul><li>Publish programs and forms</li><li>Manage applicants and students</li><li>Track payments and reports</li></ul></article>
    </div>
    <div className="enrolme-system-model"><h5>Business model</h5><p><strong>Institutes</strong> Free listing & visibility</p><p><strong>Parents</strong> Enrollment & discovery services</p><p><strong>Platform</strong> Transaction & service fees</p></div>
  </div>
  if (section === 'Business challenge, goals & success metrics') {
    const metrics = [
      { name: 'Referral-based acquisition', baseline: [3,5], target: [15,20], before: '~3–5%', after: '15–20%', direction: 'Increase' },
      { name: 'Onboarding completion', baseline: [40,40], target: [75,75], before: '~40%', after: '75%', direction: 'Increase' },
      { name: 'Organic traffic share', baseline: [2,2], target: [50,50], before: '~2%', after: '50%', direction: 'Increase' },
      { name: 'Enrollment funnel drop-off', baseline: [60,70], target: [30,40], before: '~60–70%', after: '<30–40%', direction: 'Reduce' },
    ]
    return <div className="enrolme-context-content">
      <p className="enrolme-context-lead">The challenge: turn platform capability into adoption.</p>
      <div className="enrolme-challenge-signals">{['Low adoption', 'Weak user experience', 'Limited reach', 'Low brand recall'].map(item => <span key={item}>{item}</span>)}</div>
      <div className="enrolme-metric-legend"><span><i />Baseline</span><span><i />Target</span><small>All scales: 0–100%</small></div>
      <div className="enrolme-metric-grid">{metrics.map(metric => <article className="enrolme-metric-card" key={metric.name}>
        <header><h5>{metric.name}</h5><span>{metric.direction}</span></header>
        <div className="enrolme-metric-values"><span>{metric.before}<small>Baseline</small></span><span>{metric.after}<small>Target</small></span></div>
        <div className="enrolme-metric-chart" role="img" aria-label={`${metric.name}: baseline ${metric.before}, target ${metric.after}. Goal: ${metric.direction.toLowerCase()}.`}>
          {[['baseline',metric.baseline],['target',metric.target]].map(([type,range]) => <div className={`enrolme-metric-track is-${type}`} key={type}><span style={{ width: `${range[0]}%` }} />{range[0] !== range[1] && <i style={{ left: `${range[0]}%`, width: `${range[1]-range[0]}%` }} />}</div>)}
          <div className="enrolme-metric-axis"><span>0%</span><span>50%</span><span>100%</span></div>
        </div>
      </article>)}</div>
      <p className="enrolme-context-note">Project brief baselines and intended targets, not measured results. Faded bar ends indicate ranges; the drop-off target is below the displayed 30–40% band.</p>
    </div>
  }
  if (section === 'Scope & boundaries') return <div className="enrolme-context-content enrolme-scope-plain">
    <section><h5>Scope</h5><ul><li>Mobile-first discovery and enrollment redesign</li><li>Clear search, browsing, and optional filters</li><li>Reviews, social proof, and consistent branding</li><li>Simpler forms, application tracking, and updates</li></ul></section>
    <section><h5>Boundaries</h5><ul><li>Retain the existing platform, backend, and payments</li><li>Keep the current business model and revenue streams</li><li>No new integrations; advanced AI remains conceptual</li><li>Work within limited resources; stay scalable and digital</li></ul></section>
  </div>
  return null
}

function EnrolMeResearchJourney({ stages }) {
  const [active, setActive] = useState(0)
  const stage = stages[active]
  return <div className="enrolme-research-content">
    <div className="enrolme-research-journey-stages" aria-label="Journey stages">{stages.map((item,index) => <button type="button" key={item.name} aria-pressed={index === active} onClick={() => setActive(index)}><span>{String(index+1).padStart(2,'0')}</span>{item.name}</button>)}</div>
    <article className="enrolme-research-journey-panel"><h5>{stage.name}</h5><p className="enrolme-research-feelings">{stage.feelings}</p><div className="enrolme-research-journey-details">{[['Actions',stage.actions],['Touchpoints',stage.touchpoints],['Goals',stage.goals],['Pain points',stage.pain],['Opportunities',stage.opportunities]].map(([label,items]) => <section key={label}><h6>{label}</h6><ul>{items.map(item => <li key={item}>{item}</li>)}</ul></section>)}</div></article>
  </div>
}

function EnrolMeCompetitionChart() {
  const competitors = [
    { name: 'Google Search & Maps', domain: 'google.com', focus: 'discovery' },
    { name: 'Justdial', domain: 'justdial.com', focus: 'discovery' },
    { name: 'UrbanPro', domain: 'urbanpro.com', focus: 'discovery' },
    { name: 'WhatsApp / community', domain: 'whatsapp.com', focus: 'discovery' },
    { name: 'AcadWare', domain: 'acadware.com', focus: 'operations' },
    { name: 'Admin management systems', focus: 'operations' },
    { name: 'Odoo', domain: 'odoo.com', focus: 'operations' },
    { name: 'Jersey Watch', domain: 'jerseywatch.com', focus: 'operations' },
  ]
  return <section className="enrolme-competition-chart" aria-label="Competitor focus comparison from the project research">
    <h5>Competitive landscape</h5>
    <div className="enrolme-competition-chart-scroll">
      <div className="enrolme-competition-plot">
        <div className="enrolme-competition-axis"><span>Platforms</span><span>Discovery & visibility</span><span>Enrollment & operations</span></div>
        {competitors.map((competitor,index) => <div className={`enrolme-competition-row is-${competitor.focus}${index === 4 ? ' starts-group' : ''}`} key={competitor.name}>
          <div className="enrolme-competition-brand">{competitor.domain ? <img src={`https://www.google.com/s2/favicons?domain=${competitor.domain}&sz=128`} width="28" height="28" alt="" loading="lazy" /> : <svg viewBox="0 0 28 28" aria-hidden="true"><path d="M4 11 14 5l10 6M6 12v11h16V12M10 14v5m8-5v5M3 24h22" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>}<span>{competitor.name}</span></div>
          <div className="enrolme-competition-band"><span className="enrolme-competition-focus-bar">{competitor.focus === 'discovery' ? 'Discovery-focused' : 'Operations-focused'}</span></div>
        </div>)}
        <div className="enrolme-competition-row is-proposed"><div className="enrolme-competition-brand"><span className="enrolme-competition-monogram">E</span><span>Enrol-Me <small>Proposed direction</small></span></div><div className="enrolme-competition-band"><span className="enrolme-competition-focus-bar">Connected discovery-to-enrollment journey</span></div></div>
      </div>
    </div>
    <p className="enrolme-research-note">Qualitative focus areas from the project’s competitor grouping—not market share, performance scores, or a feature audit. Admin management systems is a category, rather than a single brand.</p>
  </section>
}

function EnrolMePersonaPortrait({ index }) {
  const woman = index !== 1
  const shirt = ['#a2b6c7', '#b09bbf', '#c1a7ad'][index]
  return <svg viewBox="0 0 180 200" className="enrolme-persona-portrait" aria-hidden="true">
    <ellipse cx="90" cy="104" rx="76" ry="83" fill={['#dde7ef','#e8def0','#f1e1e5'][index]} />
    {woman && <path d="M49 96C31 37 60 19 90 22c46-7 63 35 45 90l-18 26H62z" fill={index === 0 ? '#57453f' : '#3f3744'} />}
    <path d="M31 194c0-48 25-63 59-63s59 15 59 63" fill={shirt} />
    <path d="M77 117h27v27c-8 11-18 11-27 0z" fill="#bf8e74" />
    <ellipse cx="90" cy="83" rx="35" ry="45" fill={index === 1 ? '#cda086' : '#e0b296'} />
    <ellipse cx="55" cy="88" rx="5" ry="9" fill="#d2a084" /><ellipse cx="125" cy="88" rx="5" ry="9" fill="#d2a084" />
    {woman ? <path d="M53 74c-4-44 52-70 72-17l-1 27c-9-9-18-23-20-33-9 16-28 21-51 23z" fill={index === 0 ? '#57453f' : '#3f3744'} /> : <path d="M55 74c-9-36 8-52 33-52 31-2 49 19 36 54l-7-24c-14 4-28 1-39-5-5 14-13 20-23 27z" fill="#473a37" />}
    <path d="M69 81h11m20 0h11" stroke="#634e43" strokeWidth="2" strokeLinecap="round" />
    <circle cx="76" cy="89" r="2" fill="#453a36" /><circle cx="105" cy="89" r="2" fill="#453a36" />
    <path d="m91 91-3 12h5M79 112q12 9 23-1" fill="none" stroke="#9c6554" strokeWidth="2" strokeLinecap="round" />
    {index === 1 && <><path d="M76 109q14-10 28 0-13 3-28 0" fill="#55423a" /><path d="M62 85h23v15H62zM96 85h23v15H96zM85 90h11" fill="none" stroke="#695c66" strokeWidth="2" /></>}
    {index === 0 && <circle cx="90" cy="72" r="2.5" fill="#a46478" />}
    {index === 2 && <><path d="M61 85h24v15H61zM96 85h24v15H96zM85 90h11" fill="none" stroke="#79668d" strokeWidth="2" /><path d="m72 144 18 16 18-16M90 160v34" fill="none" stroke="#f1e9ef" strokeWidth="2" /><rect x="102" y="163" width="21" height="25" rx="3" fill="#eee9f1" /><circle cx="112" cy="172" r="4" fill="#b8a6c7" /></>}
    {index !== 2 && <path d="m73 143 17 16 18-16" fill="none" stroke="#e5e7ed" strokeWidth="3" />}
  </svg>
}

function EnrolMeResearch({ section }) {
  const list = items => <ul>{items.map(item => <li key={item}>{item}</li>)}</ul>
  if (section === 'Industry & competitive landscape') return <div className="enrolme-research-content">
    <div className="enrolme-research-market"><article><span>₹4–5 lakh crore</span><p>Market size cited in the project</p></article><article><span>12–16%</span><p>CAGR cited in the project</p></article><article><span>Fragmented</span><p>Largely unorganised, with low digital integration</p></article></div>
    <EnrolMeCompetitionChart />
  </div>
  if (section === 'SWOT analysis') return <div className="enrolme-research-content"><div className="enrolme-research-swot">{Object.entries(enrolmeResearch.swot).map(([title,items]) => <section key={title}><h5>{title}</h5>{list(items)}</section>)}</div><blockquote>Enrol-Me’s challenge is not capability, but adoption driven by trust and experience.</blockquote></div>
  if (section === 'Stakeholders & target users') return <div className="enrolme-research-content">
    <div className="enrolme-stakeholder-orbit-layout">
      <div className="enrolme-stakeholder-orbit" aria-label="Primary, secondary and tertiary stakeholder tiers">
        <div className="enrolme-stakeholder-ring is-tertiary" aria-hidden="true" /><div className="enrolme-stakeholder-ring is-secondary" aria-hidden="true" /><div className="enrolme-stakeholder-ring is-primary" aria-hidden="true" />
        <span className="enrolme-stakeholder-orbit-core">Enrol-Me</span>
        {['Tertiary','Secondary','Primary'].map(tier => <span className={`enrolme-stakeholder-ring-label is-${tier.toLowerCase()}`} key={tier}>{tier}</span>)}
      </div>
      <div className="enrolme-stakeholder-tier-list">{Object.entries(enrolmeResearch.stakeholders).map(([title,items]) => <section key={title} className={`is-${title.toLowerCase()}`}><h5><span aria-hidden="true" />{title}</h5>{list(items)}</section>)}</div>
    </div>
    <h5 className="enrolme-research-subheading">Who the experience serves</h5><div className="enrolme-research-users">{Object.entries(enrolmeResearch.users).map(([title,items]) => <section key={title}><h6>{title}</h6>{list(items)}</section>)}</div>
  </div>
  if (section === 'Primary research') return <div className="enrolme-research-content enrolme-primary-research">
    <div className="enrolme-research-methods">{[
      { method: 'Surveys', people: 'Parents', type: 'survey' },
      { method: 'Online interviews', people: 'Parents and teachers', type: 'interview' },
      { method: 'Field visit interviews', people: 'Teachers, coaches, and the Enrol-Me team', type: 'field' },
    ].map(item => <section className={`enrolme-method is-${item.type}`} key={item.method}>
      <svg className="enrolme-method-symbol" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {item.type === 'survey' ? <><rect x="11" y="8" width="27" height="34" rx="4" /><path d="M18 8V5h13v3M18 18h12M18 27h12M18 35h8" /><circle cx="15" cy="18" r=".5" /><circle cx="15" cy="27" r=".5" /></> : item.type === 'interview' ? <><path d="M6 9h29v21H20l-8 7v-7H6z" /><path d="M19 35h13l7 6v-6h4V18h-4M13 16h15M13 22h10" /></> : <><path d="M8 41V16h32v25M5 41h38M14 16V8h20v8M15 24h5M28 24h5M15 31h5M28 31h5M22 41v-6h5v6" /><path d="M19 8V5h10v3" /></>}
      </svg>
      <h5>{item.method}</h5><p>{item.people}</p>
    </section>)}</div>
    <h5 className="enrolme-research-subheading">What we heard in the field</h5>
    <ol className="enrolme-field-findings">{enrolmeResearch.insights.map((insight,index) => <li key={insight}><span>{String(index+1).padStart(2,'0')}</span><p>{insight}</p></li>)}</ol>
    <blockquote>“The system is not broken because of lack of options. It is broken because there is no structured, trusted journey.”</blockquote>
  </div>
  if (section === 'User personas') return <div className="enrolme-research-content enrolme-persona-cards">{enrolmeResearch.personas.map((persona,index) => <article className="enrolme-persona-card" key={persona.name}>
    <header className="enrolme-persona-landscape"><EnrolMePersonaPortrait index={index} /><div><span className="enrolme-persona-role">{['PARENT','INSTITUTE OWNER','ADMIN STAFF'][index]}</span><h5>{persona.name}</h5><p>{persona.meta}</p></div></header>
    <div className="enrolme-persona-details enrolme-persona-details--visible">{[['Goals',persona.goals],['Behaviours',persona.behaviours],['Pain points',persona.pain]].map(([label,items]) => <section key={label}><h6>{label}</h6>{list(items)}</section>)}</div>
  </article>)}</div>
  if (section === 'Parent / child as-is journey') return <EnrolMeParentJourney />
  if (section === 'Institute as-is journey') return <EnrolMeInstituteJourney />
  return null
}

function EnrolMeSynthesis({ section }) {
  if (section === 'Affinity map') return <EnrolMeAffinity />
  if (section === 'Key research insights') return <EnrolMeInsightCards />
  if (section === 'Key insight') return <div className="enrolme-synthesis-content"><blockquote className="enrolme-key-insight">“The system is not broken because of lack of options.<br />It is broken because there is no structured, trusted journey.”</blockquote></div>
  if (section === 'Ideation') return <div className="enrolme-synthesis-content">
    <p className="enrolme-synthesis-intro">Exploring ways to build trust, simplify decisions, and ease everyday administration.</p>
    <h5 className="enrolme-synthesis-subheading">Behaviours we want to change</h5>
    <div className="enrolme-ideation-behaviours">{['Spend less time on admin tasks', 'Shorten the decision-making process', 'Build trust in technology', 'Reduce unnecessary parent–teacher follow-ups'].map(text => <p key={text}>{text}</p>)}</div>
    <h5 className="enrolme-synthesis-subheading">The idea wall</h5>
    <EnrolMeIdeaWall />
  </div>
  return null
}

function EnrolMeConceptImpact() {
  const rows = [
    ['Discovery-first interface (browse classes without heavy login)', 'Easier exploration, less friction, more engagement', 'Higher user retention and session time'],
    ['Optional filters instead of forced form filling', 'Faster onboarding and reduced drop-offs', 'More completed searches and signups'],
    ['Auto-detect location + nearby classes', 'Hyper-relevant recommendations', 'Higher conversion rate'],
    ['Trusted reviews from synced contacts', 'Social proof and confidence', 'Increased enrollments'],
    ['Unified modern branding + smoother UX', 'Professional and premium perception', 'Stronger brand recall and trust'],
    ['Rich class pages with videos, testimonials, coach credibility', 'Better decision-making', 'Higher paid enrollments'],
    ['Organizer dashboard optimization', 'Easier lead management and operations', 'Better supply-side retention'],
    ['Analytics dashboard for organizers', 'Data-backed growth decisions', 'Upsell premium SaaS features'],
    ['Seamless mobile + web ecosystem', 'Omnichannel convenience', 'Larger reachable market'],
  ]
  return <div className="enrolme-concept-impact">
    <div className="enrolme-impact-table-scroll"><table><thead><tr><th>Concept feature</th><th>Value proposition to users</th><th>Business impact</th></tr></thead><tbody>{rows.map(([feature,value,impact]) => <tr key={feature}><th scope="row">{feature}</th><td>{value}</td><td>{impact}</td></tr>)}</tbody></table></div>
    <p>Proposed value and expected business impact from the project deck; these are intended outcomes rather than measured results.</p>
  </div>
}

function EnrolMeCasePlaceholder({ project }) {
  const phases = [
    { id: 'context', label: 'Business context', title: 'Understanding the platform and the challenge', sections: ['Tracksoft Solutions Pvt. Ltd.', 'Platform background & evolution', 'System components', 'Business challenge, goals & success metrics', 'Scope & boundaries'] },
    { id: 'research', label: 'Research', title: 'Understanding the learning ecosystem', sections: ['Industry & competitive landscape', 'SWOT analysis', 'Stakeholders & target users', 'Primary research', 'User personas', 'Parent / child as-is journey', 'Institute as-is journey'] },
    { id: 'synthesis', label: 'Synthesis', title: 'Connecting user needs with business opportunities', sections: ['Affinity map', 'Key research insights', 'Key insight', 'Ideation'] },
    { id: 'solutioning', label: 'Solutioning', title: 'Shaping the discovery-to-enrollment experience', sections: ['Idea refinement, prioritisation & implementation order', 'Concept evaluation', 'Information architecture', 'Parent user flow', 'Institute user flow', 'Low-fidelity wireframes', 'High-fidelity mockups', 'Service blueprint'] },
    { id: 'growth', label: 'Implementation & growth', title: 'Planning how the experience can grow', sections: ['Implementation roadmap', 'Marketing strategy', 'Branding strategy', 'Prototype & project links', 'Concept Features — Value Proposition — Business Impact'] },
  ]
  return <main className="saarthi-page enrolme-skeleton" id="project-page-top">
    <Navigation />
    <header className="saarthi-hero case-wrap">
      <a className="enrolme-skeleton-back" href="/projects.html">← Back</a>
      <p className="saarthi-overline">CASE STUDY · INDUSTRY PROJECT</p>
      <h1>{project.name}</h1>
      <p className="saarthi-description enrolme-skeleton-copy">Single-line project brief</p>
      <p className="saarthi-disciplines">Business Design <span>·</span> Product Redesign <span>·</span> UX/UI Design</p>
      <figure className="saarthi-hero-image"><img src={project.image} alt={project.imageAlt} /></figure>
    </header>
    <section className="saarthi-overview case-wrap" aria-labelledby="enrolme-overview-title">
      <div className="saarthi-section-heading"><p className="saarthi-overline">OVERVIEW</p><h2 id="enrolme-overview-title"><span>About</span><span>Enrol-Me</span></h2></div>
      <div className="enrolme-overview-copy">
        <p>Enrol-Me is a digital platform for discovering, enrolling in, and managing classes across schools, coaching centres, hobby classes, and sports classes. It brings class discovery, comparison, admissions, and fee collection into one place.</p>
        <p>Originally built around admissions management and operational efficiency, the platform faces low adoption, weak user experience, and limited brand recall. These challenges contribute to low engagement, low conversions, and slow growth.</p>
        <p>This business and product redesign explores how Enrol-Me can become a trusted, seamless, and user-friendly discovery and enrollment platform—helping parents confidently choose the right classes for their child while supporting institutes in managing enrollments.</p>
      </div>
    </section>
    <section className="saarthi-journey case-wrap" aria-labelledby="enrolme-journey-title">
      <div className="saarthi-section-heading"><p className="saarthi-overline">THE JOURNEY OF REDESIGNING ENROL-ME</p><h2 id="enrolme-journey-title" className="enrolme-skeleton-journey-title">From understanding the business and its users to shaping the platform’s next chapter.</h2></div>
      <nav className="enrolme-skeleton-phases" aria-label="Case study phases">{phases.map(phase => <a href={`#enrolme-${phase.id}`} key={phase.id}>{phase.label}</a>)}</nav>
      <div className="enrolme-skeleton-process">{phases.map(phase => <section className="enrolme-skeleton-phase" id={`enrolme-${phase.id}`} key={phase.id} aria-labelledby={`enrolme-${phase.id}-title`}>
        <header><p className="saarthi-overline">{phase.label}</p><h3 id={`enrolme-${phase.id}-title`}>{phase.title}</h3></header>
        <div className="enrolme-skeleton-sections">{phase.sections.map(title => <details className="enrolme-skeleton-disclosure" key={title}>
          <summary><span>{title}</span><span className="enrolme-skeleton-toggle" aria-hidden="true" /></summary>
          {phase.id === 'context' ? <EnrolMeBusinessContext section={title} /> : phase.id === 'research' ? <EnrolMeResearch section={title} /> : phase.id === 'synthesis' ? <EnrolMeSynthesis section={title} /> : title === 'Idea refinement, prioritisation & implementation order' ? <EnrolMePrioritisation /> : phase.id === 'solutioning' ? <EnrolMeSolutioning section={title} /> : title === 'Concept Features — Value Proposition — Business Impact' ? <EnrolMeConceptImpact /> : <div className="enrolme-skeleton-slot"><span>{title}</span><small>Content / visual placeholder</small></div>}
        </details>)}</div>
      </section>)}</div>
    </section>
    <div className="enrolme-case-end case-wrap"><a className="enrolme-skeleton-back" href="/projects.html">← Back to projects</a></div>
  </main>
}

function SelectedProjects() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [activeProject, setActiveProject] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const scrollProgressRef = useRef(0)
  const publishProgress = (next) => {
    scrollProgressRef.current = next
    setScrollProgress(next)
    window.dispatchEvent(new CustomEvent('project-gallery-progress', { detail: next }))
  }
  useEffect(() => {
    const onWheel = (event) => {
      const section = sectionRef.current
      if (!section || event.ctrlKey) return
      const bounds = section.getBoundingClientRect()
      const sectionIsInView = bounds.top < window.innerHeight && bounds.bottom > 0
      if (!sectionIsInView) return
      const horizontalInput = event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)
      const delta = horizontalInput ? (event.shiftKey ? event.deltaY : event.deltaX) : event.deltaY
      const progress = scrollProgressRef.current
      if (!delta || (delta > 0 && progress >= 1) || (delta < 0 && progress <= 0)) return
      event.preventDefault()
      // Snap the section into place as it enters view, then use wheel input
      // to move through the gallery without letting the page slip past it.
      if (bounds.top > 1) window.scrollTo(0, window.scrollY + bounds.top)
      const next = Math.max(0, Math.min(1, progress + delta / 1100))
      publishProgress(next)
      setActiveProject(Math.round(next * (projects.length - 1)))
    }
    const section = sectionRef.current
    section?.addEventListener('wheel', onWheel, { passive: false })
    return () => section?.removeEventListener('wheel', onWheel)
  }, [])
  const moveToProject = (direction) => {
    const nextIndex = Math.max(0, Math.min(projects.length - 1, activeProject + direction))
    const next = nextIndex / (projects.length - 1)
    publishProgress(next)
    setActiveProject(nextIndex)
  }
  const project = projects[activeProject]
  return <section className="work project-scroll-section" id="work" aria-labelledby="work-title" ref={sectionRef}>
    <h2 id="work-title" className="sr-only">Selected Work</h2>
    <div className="project-carousel">
      <header className="project-stage-header">Selected projects</header>
      <div className="project-track" ref={trackRef} aria-label="Selected projects">
        <div className="project-gallery" style={{ width: `${projects.length * 100}%`, '--project-slide-width': `${100 / projects.length}%`, '--gallery-shift': `${-scrollProgress * ((projects.length - 1) / projects.length) * 100}%` }}>{projects.map((item, index) => <ProjectCard key={item.number} project={item} selected={index === activeProject} />)}</div>
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

const graphicWorks = [
  ['graphic-01.png', 'Screaming face illustration'], ['graphic-02.png', 'Expressive face portrait'],
  ['graphic-03.png', 'Bombay Chaap Corner mural'], ['graphic-04.png', 'Pune character mural'],
  ['graphic-05.png', 'Patterned leaf illustration'], ['graphic-06.png', 'Surreal eyes and tongue drawing'],
  ['graphic-07.png', 'Mountain landscape illustration'], ['graphic-08.png', 'Playful character collage'],
  ['graphic-09.png', 'Character mural with colorful accents'], ['graphic-10.png', 'Yin-yang pattern illustration'],
  ['graphic-11.png', 'Mushroom and character illustration'], ['graphic-12.png', 'Heart and nature illustration'],
  ['graphic-13.png', 'Octopus pencil sketch'], ['graphic-14.png', 'Figure drawing'],
  ['graphic-15.png', 'Expressive face sketch'], ['graphic-16.png', 'Surreal face drawing'],
  ['graphic-17.png', 'Mushroom forest illustration'], ['graphic-18.png', 'Cat illustration'],
]
function CircularOrbit({ onSelect }) { return <div className="orbit" aria-label="Circular gallery of Sonia’s graphics"><div className="orbit-rotation">{graphicWorks.map(([src, alt], i) => <div className="orbit-item" key={src} style={{ '--i': i, '--orbit-angle': `${i * (360 / graphicWorks.length)}deg` }}><button className="orbit-image" type="button" onClick={() => onSelect({ src, alt })} aria-label={`Expand ${alt}`}><img src={`/assets/${src}`} alt={alt} loading="lazy" /></button></div>)}</div></div> }
function CreativeExplorations() {
  const trackRef = useRef(null)
  const lightboxCloseRef = useRef(null)
  const [selectedGraphic, setSelectedGraphic] = useState(null)
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
  useEffect(() => {
    if (!selectedGraphic) return
    const previousOverflow = document.body.style.overflow
    const previouslyFocused = document.activeElement
    document.body.style.overflow = 'hidden'
    lightboxCloseRef.current?.focus()
    const closeOnEscape = (event) => { if (event.key === 'Escape') setSelectedGraphic(null) }
    window.addEventListener('keydown', closeOnEscape)
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', closeOnEscape); previouslyFocused?.focus?.() }
  }, [selectedGraphic])
  return <section className="creative" id="explorations" aria-labelledby="graphics-title">
    <div className="graphics-track" ref={trackRef}><div className="graphics-stage">
      <p className="eyebrow section-index">03 — GRAPHICS</p>
      <div className="creative-heading"><p className="graphics-kicker">A FEW OF MY DOODLES</p><h2 id="graphics-title">Visual<br />explorations</h2></div>
      <CircularOrbit onSelect={setSelectedGraphic} />
    </div></div>
    <div className="graphics-more"><p className="eyebrow">MORE GRAPHICS · PLACEHOLDERS</p><div className="graphics-grid">{explorations.map((item, i) => <div className={`graphics-tile graphics-tile--${i + 1}`} role="img" aria-label={`Additional graphic placeholder ${String(i + 1).padStart(2, '0')}`} key={`more-${item}`}><span>GRAPHIC PLACEHOLDER {String(i + 1).padStart(2, '0')}</span></div>)}</div></div>
    {selectedGraphic && <div className="graphics-lightbox" onClick={() => setSelectedGraphic(null)}>
      <div className="graphics-lightbox-dialog" role="dialog" aria-modal="true" aria-label={selectedGraphic.alt} onClick={(event) => event.stopPropagation()}>
        <button ref={lightboxCloseRef} className="graphics-lightbox-close" type="button" onClick={() => setSelectedGraphic(null)} aria-label="Close expanded graphic">×</button>
        <img src={`/assets/${selectedGraphic.src}`} alt={selectedGraphic.alt} />
      </div>
    </div>}
  </section>
}

function ContactFooter() { return <footer className="contact footer-contact" id="contact">
  <p className="footer-kicker">LET’S CONNECT</p>
  <a className="footer-email-row" href={CONTACT_EMAIL ? `mailto:${CONTACT_EMAIL}` : '#contact'}><span>{CONTACT_EMAIL || 'Email address'}</span><span aria-hidden="true">→</span></a>
  <div className="footer-wordmark" role="img" aria-label="Sonia Wadhwani"><div className="footer-wordmark-track" aria-hidden="true"><span>SONIA WADHWANI</span><span>SONIA WADHWANI</span></div></div>
  <div className="footer-meta"><span>© 2026 SONIA WADHWANI</span><span>EXPERIENCE DESIGN · FLAME UNIVERSITY</span><a href="#top">BACK TO TOP ↑</a></div>
</footer> }

const projectCategories = [
  { name: 'Service Design', projects: ['01'] },
  { name: 'UI/UX', projects: ['03', '05'] },
  { name: 'Business Design', projects: ['03'] },
  { name: 'AI/ML', projects: ['01', '03', '05'] },
  { name: 'Product Design', projects: ['04'] },
  { name: 'Ecosystem Design', projects: ['02'] },
]

function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const resultsRef = useRef(null)
  const visibleProjects = selectedCategory ? projects.filter(project => selectedCategory.projects.includes(project.number)) : projects
  useEffect(() => {
    if (selectedCategory) resultsRef.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' })
  }, [selectedCategory])
  return <div className="projects-index" id="top">
    <Navigation />
    <main className="projects-index-content">
      <header className="projects-index-heading">
        <h1>Selected Projects</h1>
        <nav className="projects-category-links" aria-label="Project categories">
          <button type="button" aria-pressed={!selectedCategory} onClick={() => setSelectedCategory(null)}>All projects</button>
          {projectCategories.map(category => <button type="button" key={category.name} aria-pressed={selectedCategory === category} onClick={() => {
            setSelectedCategory(category)
            if (selectedCategory === category) resultsRef.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
          }}>{category.name}</button>)}
        </nav>
      </header>
      <div ref={resultsRef} className="projects-category-results" tabIndex={-1}>
      {selectedCategory && <div className="projects-category-summary"><p role="status">{selectedCategory.name} · {visibleProjects.length} {visibleProjects.length === 1 ? 'project' : 'projects'}</p><button type="button" onClick={() => setSelectedCategory(null)}>Show all projects</button></div>}
      <div className="projects-index-list">
        {visibleProjects.map((project) => <a className="projects-index-row" href={project.destination} key={project.number} aria-label={`View ${project.name} project`}>
          <div className="projects-index-image">{project.image || project.number === '04' || project.number === '05' ? <img src={project.number === '01' ? '/assets/saarthi-projects-preview.png' : project.number === '02' ? '/assets/margin-projects-preview.png' : project.number === '03' ? '/assets/enrolme-projects-preview.png' : project.number === '04' ? '/assets/trail-tag-projects-preview.png' : project.number === '05' ? '/assets/data-visualization-projects-preview.png' : project.image} alt={project.number === '04' ? 'Trail Tag tangible interface devices in a mountain landscape' : project.number === '05' ? 'Data visualization illustration with pie, bar and line charts' : project.imageAlt} loading="lazy" /> : <span className="projects-index-placeholder">{project.name} · Image coming soon</span>}</div>
          <div className="projects-index-copy">
            <p className="eyebrow">{project.category}</p>
            <h2>{project.name}</h2>
            <p>{[
              'A guided temple experience that supports elderly devotees through connected services and thoughtful touchpoints.',
              'A lifestyle ecosystem exploring the relationship between everyday routines, personal goals, and experience.',
              'An industry project exploring business and lifestyle design through the Enrol-Me concept.',
            ][Number(project.number) - 1] || project.description}</p>
            <span className="projects-index-cta">View project <Arrow /></span>
          </div>
        </a>)}
      </div>
      </div>
    </main>
    <ContactFooter />
  </div>
}

function App() {
  if (window.location.pathname.endsWith('/projects.html')) return <ProjectsPage />
  if (window.location.pathname.endsWith('/about.html')) return <AboutPage />
  if (window.location.pathname.endsWith('/project.html')) return <ProjectDetailsPage />
  return <main><Hero /><AboutPreview /><SelectedProjects /><CreativeExplorations /><ContactFooter /></main>
}

createRoot(document.getElementById('root')).render(<App />)
