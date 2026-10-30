import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

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
} : project)
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
  const onAboutPage = window.location.pathname.endsWith('/about.html')
  const onProjectPage = window.location.pathname.endsWith('/project.html')
  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 20)
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const pageProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0
      setProgress(pageProgress)

      // On the home page each tab fills only while its matching section is in view.
      // In particular, Projects spans the entire pinned horizontal gallery.
      const sectionIds = ['top', 'about', 'work', 'explorations', 'contact']
      const sections = sectionIds.map((id) => document.getElementById(id))
      if (!onAboutPage && !onProjectPage && sections.every(Boolean)) {
        const starts = sections.map((section) => section.getBoundingClientRect().top + window.scrollY)
        const ends = [...starts.slice(1), maxScroll]
        setTabProgress(starts.map((start, index) => {
          const end = ends[index]
          if (end <= start) return window.scrollY >= start ? 1 : 0
          return Math.max(0, Math.min(1, (window.scrollY - start) / (end - start)))
        }))
      } else {
        // Retain the existing full-page progression on the standalone About page.
        setTabProgress(Array.from({ length: 5 }, (_, index) => Math.max(0, Math.min(1, pageProgress * 5 - index))))
      }
    }
    update(); window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [onAboutPage, onProjectPage])
  const links = [['About', onAboutPage ? '#about-page-top' : '/about.html'], ['Projects', '/#work'], ['Graphics', '/#explorations'], ['Contact', '/#contact']]
  const tabStyle = (index) => ({ '--tab-fill': `${tabProgress[index] * 100}%` })
  return <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}${onProjectPage ? ' nav--static' : ''}`} aria-label="Main navigation" style={onProjectPage ? undefined : { '--scroll-progress': `${progress * 100}%` }}>
    <a className="brand" style={onProjectPage ? undefined : tabStyle(0)} href={onAboutPage ? '/' : onProjectPage ? '/' : '#top'}>SONIA WADHWANI</a>
    <button className="menu-toggle" aria-expanded={open} aria-controls="nav-links" onClick={() => setOpen(!open)}><span className="sr-only">Toggle navigation</span><i /><i /></button>
    <div id="nav-links" className={`nav-links ${open ? 'nav-links--open' : ''}`}>{links.map(([name, href], index) => <a style={onProjectPage ? undefined : tabStyle(index + 1)} key={name} href={href} onClick={() => setOpen(false)}>{name}</a>)}</div>
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

const aboutNotes = Array.from({ length: 18 }, (_, index) => ({
  preview: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
}))
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
    const closeOnEscape = (event) => { if (event.key === 'Escape') setSelectedNote(null) }
    window.addEventListener('keydown', closeOnEscape)
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', closeOnEscape); previouslyFocused?.focus?.() }
  }, [selectedNote])
  return <section className="about about-home-scroll" id="about" aria-labelledby="about-home-title">
    <div className="about-home-intro">
      <h2 id="about-home-title">Hi, I’m Sonia.</h2>
      <p className="about-home-meta">Experience Design · Psychology</p>
      <p className="about-home-description">I explore how people, technology, and everyday systems shape our experience.</p>
    </div>
    <div className="about-sticky-wall" aria-label="Sonia’s ideas" ref={stickyWallRef}>
      {aboutNotes.map((note, index) => <button className={`about-sticky about-sticky--${index % 4 + 1} about-sticky-note--${index + 1}`} style={stickyPositions[index]} type="button" key={index} onPointerDown={(event) => startStickyDrag(event, index)} onPointerMove={moveSticky} onPointerUp={finishStickyDrag} onPointerCancel={finishStickyDrag} onClick={(event) => handleStickyClick(event, note)} aria-label="Drag to move or click to expand sticky note">
        <span>{note.preview}</span>
      </button>)}
    </div>
    {selectedNote && <div className="about-note-overlay" onClick={() => setSelectedNote(null)}>
      <article className={`about-note-expanded about-sticky--${(aboutNotes.indexOf(selectedNote) % 4) + 1}`} role="dialog" aria-modal="true" aria-label="Expanded sticky note" onClick={(event) => event.stopPropagation()}>
        <button ref={closeButtonRef} className="about-note-close" type="button" onClick={() => setSelectedNote(null)} aria-label="Close expanded note">×</button>
        <p>{selectedNote.content}</p>
      </article>
    </div>}
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
      <p className="about-intro-copy">Hi, I’m Sonia. A right-brain thinker driven by curiosity, I see design as a way to bridge emotion and function. I love creating experiences that tell stories, spark connection, and make everyday moments meaningful.</p>
    </section>
    <section className="about-page-story" aria-label="About Sonia">
      <div className="about-wide-image" role="img" aria-label="Wide image placeholder"><span>WIDE IMAGE PLACEHOLDER</span></div>
      <div className="about-note-grid">{aboutPageNotes.map((note, index) => <p key={note}><span>0{index + 1}</span>{note}</p>)}</div>
    </section>
    <div className="about-closing-image" role="img" aria-label="Closing image placeholder"><span>IMAGE PLACEHOLDER</span></div>
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

function SaarthiCaseStudy({ project }) {
  useEffect(() => {
    const returnToProjectsAtEnd = (event) => {
      const atPageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
      if (event.deltaY > 0 && atPageEnd) window.location.assign('/#work')
    }
    window.addEventListener('wheel', returnToProjectsAtEnd, { passive: true })
    return () => window.removeEventListener('wheel', returnToProjectsAtEnd)
  }, [])
  const stages = [
    { number: '01', title: 'Understanding the Experience', headline: 'A temple visit is more than just reaching the destination.', text: 'For elderly devotees, visiting a temple involves navigating multiple stages of an experience, from planning the journey and arranging transportation to navigating crowds, accessing facilities, and completing the visit comfortably. The challenge was to look beyond the temple itself and understand the experience surrounding the visit.', image: '/assets/saarthi-affinity-map.png', artifact: 'Affinity map', alt: 'Saarthi research affinity map' },
    { number: '02', title: 'Identifying the Gaps', headline: 'The experience extends beyond the temple gates.', text: 'Looking at the experience as a whole meant considering not just what happens inside the temple, but also the support devotees need before, during, and after their visit. Transportation, waiting times, navigation, access to assistance, and opportunities to rest all form part of the broader experience. This shifted the focus towards understanding how the different parts of a temple visit could work together to make the journey more manageable.', image: '/assets/saarthi-journey-map.png', artifact: 'Journey map', alt: 'Saarthi desired journey map' },
    { number: '03', title: 'Rethinking the Solution', headline: 'What if the entire visit could be supported by one connected service?', text: 'Rather than approaching the problem as a single digital product, Saarthi was developed as a service concept that connects digital tools with human assistance and physical infrastructure. The opportunity was to create a more coordinated experience in which information, transportation, volunteers, and on-ground facilities complement one another.', image: '/assets/saarthi-ideation.png', artifact: 'Ideation', alt: 'Saarthi ideation explorations' },
    { number: '04', title: 'Designing the Service Ecosystem', headline: 'Connecting the pieces into one experience.', text: 'Saarthi brings together multiple touchpoints that support elderly devotees throughout their temple visit. The proposed ecosystem includes a mobile application for information and coordination, volunteers for personal assistance, transportation services, crowd and waiting time updates, and physical spaces for rest and support. Each touchpoint plays a role in the wider experience. The challenge was to consider how these elements could connect rather than function as isolated solutions.', image: '/assets/saarthi-service-blueprint.png', artifact: 'Service blueprint', alt: 'Saarthi service blueprint' },
    { number: '05', title: 'Bringing Saarthi to Life', headline: 'Turning the service concept into tangible experiences.', text: 'With the broader service defined, the next step was to explore how its individual touchpoints would look and function. The Saarthi application provides a digital interface for accessing information and coordinating aspects of the visit. Alongside it, physical and human touchpoints help translate the service into the real world. From volunteer identification and transportation to rest stations and prasadam arrangements, each element contributes to the overall service experience.', image: '/assets/saarthi-storyboard.png', artifact: 'Service storyboard', alt: 'Saarthi service storyboard' },
    { number: '06', title: 'The Complete Experience', headline: 'More than an app. A service designed around the journey.', text: 'Saarthi brings the different elements together into one proposed service experience, supporting elderly devotees across the journey rather than addressing a single isolated problem. The final concept combines digital access, human assistance, transportation, and on-ground facilities to envision a temple visit that feels more coordinated, comfortable, and supported.', image: '', artifact: 'Final concept', alt: '' },
  ]
  const touchpoints = [
    { title: 'PRODUCT', color: '#b96f50', points: [['app','Saarthi app'], ['kit','Prasadam kits'], ['token','Offering tokens'], ['meal','Pre-booked meals'], ['ambulance','Saarthi ambulance']] },
    { title: 'PEOPLE', color: '#c78774', points: [['volunteer','Saarthi volunteers'], ['driver','Dedicated drivers']] },
    { title: 'PLACE & INFRASTRUCTURE', color: '#9d5a43', points: [['temple','Temple facilities'], ['sign','Checkpoints'], ['rest','Rest stations'], ['cab','Cabs'], ['ride','Shared rides']] },
    { title: 'INFORMATION', color: '#d39c87', points: [['message','WhatsApp updates'], ['clock','Crowd and wait times'], ['ticket','Ride bookings'], ['id','Volunteer details'], ['audio','Audio stories']] },
  ]
  return <main className="saarthi-page" id="project-page-top">
    <Navigation />
    <header className="saarthi-hero case-wrap">
      <p className="saarthi-overline">CASE STUDY · SERVICE DESIGN</p>
      <h1>{project.name}</h1>
      <p className="saarthi-description">A guided temple experience for elderly devotees.</p>
      <p className="saarthi-disciplines">Service Design <span>·</span> Experience Design</p>
      <figure className="saarthi-hero-image"><img src={project.image} alt={project.imageAlt} /></figure>
    </header>

    <section className="saarthi-overview case-wrap" aria-labelledby="saarthi-overview-title">
      <div className="saarthi-section-heading"><p className="saarthi-overline">02 · OVERVIEW</p><h2 id="saarthi-overview-title">About Saarthi</h2></div>
      <div className="saarthi-overview-copy"><p>Saarthi is a service concept designed to make temple visits more accessible, comfortable, and convenient for elderly devotees. It brings together digital information, transportation, volunteer assistance, and on-ground facilities to create a more supported temple experience.</p><p>The goal is to make every stage of a temple visit easier, from planning the journey and reaching the temple to experiencing darshan and returning home.</p></div>
    </section>

    <section className="saarthi-ecosystem case-wrap" aria-labelledby="saarthi-ecosystem-title">
      <div className="saarthi-section-heading"><p className="saarthi-overline">THE SERVICE ECOSYSTEM</p><h2 id="saarthi-ecosystem-title">A connected experience</h2><p>Saarthi connects people, products, information, and physical infrastructure around the temple visit.</p></div>
      <div className="saarthi-touchpoints" aria-label="Saarthi service touchpoints">
        {touchpoints.map((group, groupIndex) => <article className={`saarthi-venn-lobe saarthi-venn-lobe--${groupIndex + 1}`} key={group.title} style={{ '--ring-color': group.color }}>
          <h3>{group.title}</h3>
          <div className="saarthi-venn-points">{group.points.map(([icon, label]) => <div className="saarthi-venn-point" key={label}><SaarthiTouchpointIcon name={icon} /><small>{label}</small></div>)}</div>
        </article>)}
        <div className="saarthi-touchpoints-core"><span>SAARTHI</span><strong>A supported<br />temple visit</strong></div>
      </div>
    </section>

    <section className="saarthi-journey case-wrap" aria-labelledby="saarthi-journey-title">
      <div className="saarthi-section-heading"><p className="saarthi-overline">03 · THE JOURNEY OF MAKING SAARTHI</p><h2 id="saarthi-journey-title">From understanding the challenges of temple visits to designing a service that brings people, information, and infrastructure together.</h2></div>
      <div className="saarthi-stages">{stages.map((stage) => <article className="saarthi-stage" key={stage.number}><div className="saarthi-stage-copy"><p className="saarthi-overline">{stage.number}</p><h3>{stage.title}</h3><h4>{stage.headline}</h4><p>{stage.text}</p></div><SaarthiArtifact src={stage.image} alt={stage.alt} label={stage.artifact} /></article>)}</div>
    </section>

    <section className="saarthi-film case-wrap" aria-labelledby="saarthi-film-title">
      <div className="saarthi-section-heading"><p className="saarthi-overline">04 · THE FINAL FILM</p><h2 id="saarthi-film-title">Experience Saarthi</h2><p>A guided temple experience, designed around care, comfort, and companionship.</p></div>
      <video className="saarthi-final-video" controls playsInline preload="metadata" poster={project.image} aria-label="Saarthi final video advertisement"><source src="/assets/saarthi-final-film.mp4" type="video/mp4" />Your browser does not support the video element.</video>
    </section>

    <section className="saarthi-closing case-wrap" aria-label="Return to portfolio projects">
      <a className="saarthi-closing-image" href="/#work" aria-label="Return to selected projects on the homepage"><img src={project.image} alt="Saarthi case study closing image; select to return to projects" /><span>BACK TO SELECTED PROJECTS ↗</span></a>
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

function EnrolMeCasePlaceholder({ project }) {
  return <main className="project-details-page enrolme-case" id="project-page-top">
    <Navigation />
    <header className="enrolme-intro">
      <p className="eyebrow">INDUSTRY PROJECT · BUSINESS DESIGN</p>
      <h1>{project.name}</h1>
      <p className="project-page-type">Business Design <span>·</span> Lifestyle Design</p>
      <p className="enrolme-intro-note">Project details and process documentation will be added here.</p>
    </header>
    <figure className="enrolme-hero-art"><img src={project.image} alt={project.imageAlt} /></figure>
    <section className="enrolme-placeholder-grid" aria-label="Project content placeholders">
      <article><p className="eyebrow">OVERVIEW</p><h2>Project story coming soon.</h2><p>Overview and project context placeholder.</p></article>
      <div className="enrolme-artifact-placeholder">PROCESS IMAGE PLACEHOLDER</div>
      <div className="enrolme-artifact-placeholder enrolme-artifact-placeholder--wide">PROJECT ARTIFACT PLACEHOLDER</div>
    </section>
    <a className="enrolme-back-link" href="/#work">← Back to selected projects</a>
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
      scrollProgressRef.current = next
      setScrollProgress(next)
      setActiveProject(Math.round(next * (projects.length - 1)))
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
        <div className="project-gallery" style={{ '--gallery-shift': `${-scrollProgress * ((projects.length - 1) / projects.length) * 100}%` }}>{projects.map((item, index) => <ProjectCard key={item.number} project={item} selected={index === activeProject} />)}</div>
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

function App() {
  if (window.location.pathname.endsWith('/about.html')) return <AboutPage />
  if (window.location.pathname.endsWith('/project.html')) return <ProjectDetailsPage />
  return <main><Hero /><AboutPreview /><SelectedProjects /><CreativeExplorations /><ContactFooter /></main>
}

createRoot(document.getElementById('root')).render(<App />)
