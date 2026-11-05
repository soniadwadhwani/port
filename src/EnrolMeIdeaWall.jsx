import { useEffect, useRef, useState } from 'react'
import groups from './enrolme-ideation.json'

export default function EnrolMeIdeaWall() {
  const [selected, setSelected] = useState(null)
  const closeRef = useRef(null)
  useEffect(() => {
    if (!selected) return
    const previous = document.activeElement
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = event => {
      if (event.key === 'Escape') setSelected(null)
      if (event.key === 'Tab') { event.preventDefault(); closeRef.current?.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = overflow; window.removeEventListener('keydown', onKey); previous?.focus() }
  }, [selected])
  const notes = groups.flatMap(group => group.notes.map(text => ({ text, category: group.title, color: group.color })))
  return <div className="enrolme-idea-wall-section">
    <div className="enrolme-idea-legend" aria-label="Idea categories">{groups.map(group => <span key={group.title}><i style={{ background: group.color }} aria-hidden="true" />{group.title}</span>)}</div>
    <p className="enrolme-insight-hint">Click any sticky to read the full idea.</p>
    <div className="enrolme-idea-wall">{notes.map((note,index) => <button type="button" key={index} className="enrolme-idea-sticky" style={{ '--paper':note.color, '--tilt':`${(index * 7 % 9) - 4}deg`, '--shift':`${index * 11 % 17}px` }} aria-haspopup="dialog" aria-label={`Read idea: ${note.text.split('\n')[0]}`} onClick={() => setSelected(note)}><span>{note.text}</span></button>)}</div>
    {selected && <div className="enrolme-map-overlay" onClick={() => setSelected(null)}><div className="enrolme-map-dialog enrolme-idea-expanded" style={{ background:selected.color }} role="dialog" aria-modal="true" aria-labelledby="enrolme-expanded-idea" onClick={event => event.stopPropagation()}>
      <button ref={closeRef} className="enrolme-map-close" type="button" aria-label="Close idea" onClick={() => setSelected(null)}>×</button>
      <p className="enrolme-idea-category">{selected.category}</p>
      <p id="enrolme-expanded-idea" className="enrolme-idea-full-text">{selected.text}</p>
    </div></div>}
  </div>
}
