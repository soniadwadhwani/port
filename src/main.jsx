import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

function Arrow() {
  return <span aria-hidden="true" className="arrow">↗</span>
}

function HeroWord({ children, className, registerLetter }) {
  return <span className={className}>{[...children].map((letter, index) => (
    <span className="hero-letter" ref={(node) => registerLetter(node)} key={`${letter}-${index}`}>{letter}</span>
  ))}</span>
}

const workProjects = [
  { number: '01', initial: 'S', rest: 'WYM', discipline: 'TUI / Tangible User Interface', year: '2026', className: 'swym' },
  { number: '02', initial: 'E', rest: 'NROL-ME', discipline: 'Business Design', year: '2026', className: 'enrol' },
  { number: '03', initial: 'S', rest: 'AARTHI', discipline: 'Service Design', year: '2026', className: 'saarthi' },
  { number: '04', initial: 'T', rest: 'RAILTAG', discipline: 'TUI / Tangible Interaction', year: '2026', className: 'trailtag' },
  { number: '05', initial: 'M', rest: 'ARGIN', discipline: 'Ecosystem Design', year: '2026', className: 'margin' },
  { number: '06', initial: 'D', rest: 'ATA VIZ', discipline: 'Information Design / Data Visualization', year: '2026', className: 'data-viz' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const heroRef = useRef(null)
  const letterRefs = useRef([])
  const shapeRefs = useRef([])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const hero = heroRef.current
    const bodies = new Map()
    const addBody = (node) => {
      if (node && !bodies.has(node)) bodies.set(node, { x: 0, y: 0, r: 0, vx: 0, vy: 0, vr: 0, tx: 0, ty: 0, tr: 0 })
    }
    letterRefs.current.forEach(addBody)
    shapeRefs.current.forEach(addBody)

    const nudge = (event) => {
      bodies.forEach((body, node) => {
        const rect = node.getBoundingClientRect()
        const dx = rect.left + rect.width / 2 - event.clientX
        const dy = rect.top + rect.height / 2 - event.clientY
        const distance = Math.hypot(dx, dy)
        const isShape = node.dataset.shape === 'true'
        const range = isShape ? Number(node.dataset.range) : 230
        const influence = Math.max(0, 1 - distance / range)
        const max = isShape ? Number(node.dataset.reaction) : 24
        const safeDistance = distance || 1
        const direction = node.dataset.motion === 'attract' ? -1 : 1
        body.tx = (dx / safeDistance) * max * influence * influence * direction
        body.ty = (dy / safeDistance) * max * influence * influence * direction
        body.tr = (dx / safeDistance) * (isShape ? Number(node.dataset.tilt) : 3.6) * influence * (node.dataset.motion === 'tilt' ? -1 : 1)
      })
    }
    const reset = () => bodies.forEach((body) => { body.tx = 0; body.ty = 0; body.tr = 0 })
    let frame
    const animate = (time) => {
      bodies.forEach((body, node) => {
        const isShape = node.dataset.shape === 'true'
        const phase = Number(node.dataset.phase || 0)
        const idle = isShape ? {
          x: Math.sin(time / Number(node.dataset.xspeed) + phase) * Number(node.dataset.xfloat),
          y: Math.cos(time / Number(node.dataset.yspeed) + phase * 1.4) * Number(node.dataset.yfloat),
          r: Math.sin(time / Number(node.dataset.rspeed) + phase) * Number(node.dataset.rfloat),
        } : { x: 0, y: 0, r: 0 }
        const spring = isShape ? Number(node.dataset.spring) : 0.095
        const damping = isShape ? Number(node.dataset.damping) : 0.76
        ;[['x', 'vx', 'tx'], ['y', 'vy', 'ty'], ['r', 'vr', 'tr']].forEach(([value, velocity, target]) => {
          const idleValue = value === 'x' ? idle.x : value === 'y' ? idle.y : idle.r
          body[velocity] = (body[velocity] + (body[target] + idleValue - body[value]) * spring) * damping
          body[value] += body[velocity]
        })
        node.style.transform = `translate3d(${body.x.toFixed(2)}px, ${body.y.toFixed(2)}px, 0) rotate(${body.r.toFixed(2)}deg)`
      })
      frame = requestAnimationFrame(animate)
    }
    hero.addEventListener('pointermove', nudge)
    hero.addEventListener('pointerleave', reset)
    frame = requestAnimationFrame(animate)
    return () => { hero.removeEventListener('pointermove', nudge); hero.removeEventListener('pointerleave', reset); cancelAnimationFrame(frame) }
  }, [])

  return (
    <main>
      <nav className={`floating-nav ${scrolled ? 'floating-nav--scrolled' : ''}`} aria-label="Primary navigation">
        <a className="brand" href="#top">SONIA WADHWANI</a>
        <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="nav-links" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="sr-only">Toggle menu</span><i></i><i></i>
        </button>
        <div className={`nav-links ${menuOpen ? 'nav-links--open' : ''}`} id="nav-links">
          <a className="active" href="#top" onClick={() => setMenuOpen(false)}>HOME</a>
          <a href="#work" onClick={() => setMenuOpen(false)}>WORK</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>ABOUT</a>
          <a href="#skills" onClick={() => setMenuOpen(false)}>SKILLS</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>CONTACT</a>
          <a className="nav-cta" href="#contact">LET'S TALK <Arrow /></a>
        </div>
      </nav>

      <section className="hero" id="top" aria-labelledby="hero-title" ref={heroRef}>
        <div className="hero-grid grid">
          <p className="eyebrow hero-index">01 — PORTFOLIO</p>
          <div className="hero-type" id="hero-title">
            <HeroWord className="hero-name hero-name--first" registerLetter={(node) => { if (node) letterRefs.current.push(node) }}>SONIA</HeroWord>
            <HeroWord className="hero-name hero-name--last" registerLetter={(node) => { if (node) letterRefs.current.push(node) }}>WADHWANI</HeroWord>
          </div>
          <div className="hero-constellation" aria-hidden="true">
            <span className="hero-shape shape-star" data-shape="true" data-motion="repel" data-phase="0" data-xfloat="8" data-yfloat="14" data-rfloat="5" data-xspeed="1300" data-yspeed="1800" data-rspeed="1550" data-range="210" data-reaction="13" data-tilt="7" data-spring=".11" data-damping=".74" ref={(node) => { if (node) shapeRefs.current.push(node) }}>✳</span>
            <span className="hero-shape shape-ring" data-shape="true" data-motion="repel" data-phase="1.1" data-xfloat="15" data-yfloat="9" data-rfloat="2" data-xspeed="2500" data-yspeed="2050" data-rspeed="2800" data-range="190" data-reaction="8" data-tilt="3" data-spring=".065" data-damping=".82" ref={(node) => { if (node) shapeRefs.current.push(node) }}></span>
            <span className="hero-shape shape-diamond" data-shape="true" data-motion="tilt" data-phase="2.3" data-xfloat="6" data-yfloat="8" data-rfloat="7" data-xspeed="1150" data-yspeed="1450" data-rspeed="1000" data-range="165" data-reaction="10" data-tilt="9" data-spring=".14" data-damping=".7" ref={(node) => { if (node) shapeRefs.current.push(node) }}></span>
            <span className="hero-shape shape-pill" data-shape="true" data-motion="repel" data-phase="3.7" data-xfloat="12" data-yfloat="6" data-rfloat="3" data-xspeed="2900" data-yspeed="2400" data-rspeed="3100" data-range="180" data-reaction="7" data-tilt="4" data-spring=".052" data-damping=".84" ref={(node) => { if (node) shapeRefs.current.push(node) }}></span>
            <span className="hero-shape shape-dot" data-shape="true" data-motion="attract" data-phase="4.6" data-xfloat="5" data-yfloat="7" data-rfloat="0" data-xspeed="900" data-yspeed="1100" data-rspeed="1200" data-range="150" data-reaction="8" data-tilt="2" data-spring=".16" data-damping=".68" ref={(node) => { if (node) shapeRefs.current.push(node) }}></span>
            <span className="hero-shape shape-arc" data-shape="true" data-motion="tilt" data-phase="5.4" data-xfloat="10" data-yfloat="16" data-rfloat="4" data-xspeed="2200" data-yspeed="2700" data-rspeed="1900" data-range="185" data-reaction="8" data-tilt="6" data-spring=".075" data-damping=".79" ref={(node) => { if (node) shapeRefs.current.push(node) }}></span>
          </div>
          <div className="hero-details">
            <p>EXPERIENCE<br />DESIGNER</p>
            <p>MAJOR IN EXPERIENCE DESIGN<br />MINOR IN PSYCHOLOGY</p>
          </div>
          <a className="scroll-prompt" href="#work">SCROLL TO EXPLORE <span>↓</span></a>
        </div>
      </section>

      <section className="intro" id="about" aria-labelledby="intro-title">
        <div className="grid">
          <p className="eyebrow section-label">02 — A POINT OF VIEW</p>
          <h1 id="intro-title">I DESIGN EXPERIENCES THAT START WITH PEOPLE.</h1>
          <div className="intro-note"><span className="note-dot"></span><p>Meaningful digital experiences are built with curiosity, care, and an attention to what people actually feel.</p></div>
        </div>
      </section>

      <section className="work" id="work" aria-labelledby="work-title">
        <div className="grid work-heading">
          <p className="eyebrow">03 — SELECTED WORK</p>
          <h2 id="work-title">SELECTED<br /><em>WORK</em></h2>
          <p className="work-copy">A typographic gallery of experience design work.</p>
        </div>
        <div className="projects">
          {workProjects.map((project) => (
            <article className={`project-letter-project project-letter-project--${project.className}`} key={project.number}>
              <a href="#contact" className="letter-project-link" aria-label={`${project.initial}${project.rest}: project details to be added`}>
                <div className="letter-project-composition">
                  <span className="project-initial" aria-hidden="true">{project.initial}</span>
                  <h3 className="project-rest">{project.rest}</h3>
                  <div className="letter-project-meta">
                    <span>{project.number} / {project.discipline}</span>
                    <span>{project.year}</span>
                    <b>VIEW PROJECT <Arrow /></b>
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="skills" id="skills" aria-labelledby="skills-title">
        <div className="grid">
          <p className="eyebrow section-label">04 — PRACTICE</p>
          <h2 id="skills-title">DESIGNING<br />WITH <span>INTENTION.</span></h2>
          <div className="skill-list" role="list">
            {['EXPERIENCE DESIGN', 'RESEARCH', 'INTERACTION DESIGN', 'PSYCHOLOGY'].map((skill, index) => <div role="listitem" key={skill}><span>0{index + 1}</span>{skill}<b>+</b></div>)}
          </div>
        </div>
      </section>

      <section className="contact" id="contact" aria-labelledby="contact-title">
        <div className="grid">
          <p className="eyebrow section-label">05 — LET'S CONNECT</p>
          <h2 id="contact-title">HAVE A THOUGHT?<br /><span>LET'S TALK <Arrow /></span></h2>
          <p className="contact-note">Contact details to be added.</p>
          <footer><span>SONIA WADHWANI</span><span>DESIGNED WITH INTENTION</span></footer>
        </div>
      </section>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
