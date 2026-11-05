import { useEffect, useRef, useState } from 'react'
import insights from './enrolme-insights.json'

export default function EnrolMeInsightCards() {
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
  return <div className="enrolme-insight-section">
    <p className="enrolme-insight-hint">Select an insight to explore the research behind it.</p>
    <div className="enrolme-insight-cards">{insights.map((item,index) => <button type="button" key={item.insight} className="enrolme-insight-card" aria-haspopup="dialog" onClick={() => setSelected({ ...item, number: index+1 })}>
      <span className="enrolme-insight-number">INSIGHT {String(index+1).padStart(2,'0')}</span>
      <span className="enrolme-insight-statement">{item.insight}</span>
      <span className="enrolme-insight-link">Explore the research <span aria-hidden="true">↗</span></span>
    </button>)}</div>
    {selected && <div className="enrolme-map-overlay" onClick={() => setSelected(null)}>
      <div className="enrolme-map-dialog enrolme-insight-dialog" role="dialog" aria-modal="true" aria-labelledby="enrolme-insight-title" onClick={event => event.stopPropagation()}>
        <button ref={closeRef} className="enrolme-map-close" type="button" aria-label="Close insight" onClick={() => setSelected(null)}>×</button>
        <p className="enrolme-insight-number">INSIGHT {String(selected.number).padStart(2,'0')}</p>
        <h4 id="enrolme-insight-title">{selected.insight}</h4>
        <h5>What the research showed</h5>
        <div className="enrolme-insight-evidence">{selected.evidence.map((text,index) => <article key={text}><span>RESEARCH NOTE {String(index+1).padStart(2,'0')}</span><p>{text}</p></article>)}</div>
      </div>
    </div>}
  </div>
}
