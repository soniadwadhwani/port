import { useEffect, useRef, useState } from 'react'
import priorities from './enrolme-prioritisation.json'

export default function EnrolMePrioritisation() {
  const [audience, setAudience] = useState('Institutes')
  const [selected, setSelected] = useState(null)
  const closeRef = useRef(null)
  useEffect(() => {
    if (!selected) return
    const previous = document.activeElement, overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = event => {
      if (event.key === 'Escape') setSelected(null)
      if (event.key === 'Tab') { event.preventDefault(); closeRef.current?.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = overflow; window.removeEventListener('keydown', onKey); previous?.focus() }
  }, [selected])
  const colors = ['#dcece5','#e5ddf3','#f2dfd6']
  return <div className="enrolme-prioritisation">
    <p className="enrolme-synthesis-intro">Refining the ideas into an implementation order for both sides of the platform.</p>
    <div className="enrolme-priority-audiences" role="group" aria-label="View implementation priorities for">{Object.keys(priorities).map(name => <button type="button" key={name} aria-pressed={audience === name} onClick={() => setAudience(name)}>{name === 'Institutes' ? 'Institute side' : 'Parent side'}</button>)}</div>
    <p className="enrolme-insight-hint">Select any idea to read the full note.</p>
    <div className="enrolme-priority-lanes">{Object.entries(priorities[audience]).map(([stage,notes],index) => <section className="enrolme-priority-lane" key={stage} style={{ '--lane-color': colors[index] }}>
      <header><span>0{index + 1}</span><h5>{stage}</h5><small>{notes.length} ideas</small></header>
      <div className="enrolme-priority-notes">{notes.map((text,i) => <button type="button" key={i} aria-haspopup="dialog" onClick={() => setSelected({ text, stage, color: colors[index] })}><span>{text.split('\n').slice(0,2).join(' ')}</span><span aria-hidden="true">↗</span></button>)}</div>
    </section>)}</div>
    {selected && <div className="enrolme-map-overlay" onClick={() => setSelected(null)}><div className="enrolme-map-dialog enrolme-idea-expanded" style={{ background: selected.color }} role="dialog" aria-modal="true" aria-labelledby="enrolme-priority-detail" onClick={event => event.stopPropagation()}>
      <button ref={closeRef} type="button" className="enrolme-map-close" aria-label="Close idea" onClick={() => setSelected(null)}>×</button>
      <p className="enrolme-idea-category">{audience} · {selected.stage}</p><p id="enrolme-priority-detail" className="enrolme-idea-full-text">{selected.text}</p>
    </div></div>}
  </div>
}
