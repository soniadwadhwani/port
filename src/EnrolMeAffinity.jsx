import { useEffect, useRef, useState } from 'react'
import affinityGroups from './enrolme-affinity.json'

export default function EnrolMeAffinity({ groups = affinityGroups, hint = "Select a cluster to explore its research notes." }) {
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
      if (event.key === 'Tab') {
        const controls = closeRef.current?.closest('[role="dialog"]')?.querySelectorAll('button')
        if (!controls?.length) return
        const first = controls[0], last = controls[controls.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = overflow; window.removeEventListener('keydown', onKey); previous?.focus() }
  }, [selected])
  return <div className="enrolme-affinity">
    <p className="enrolme-insight-hint">{hint}</p>
    <div className="enrolme-affinity-wall">{groups.map(group => <button type="button" className="enrolme-affinity-cluster" key={group.title} aria-haspopup="dialog" onClick={() => setSelected({ group })}>
      <span className="enrolme-affinity-miniatures" aria-hidden="true">{group.notes.map((note,index) => <span key={index} style={{ background: group.color }} />)}</span>
      <strong>{group.title}</strong><small>{group.notes.length} notes ↗</small>
    </button>)}</div>
    {selected && <div className="enrolme-map-overlay" onClick={() => setSelected(null)}><div className="enrolme-map-dialog enrolme-affinity-dialog" role="dialog" aria-modal="true" aria-labelledby="enrolme-affinity-title" onClick={event => event.stopPropagation()}>
      <button type="button" ref={closeRef} className="enrolme-map-close" aria-label="Close affinity view" onClick={() => setSelected(null)}>×</button>
      {selected.note && <button type="button" className="enrolme-affinity-back" onClick={() => setSelected({ group: selected.group })}>← Back to cluster</button>}
      <h4 id="enrolme-affinity-title">{selected.group.title}</h4>
      {selected.note ? <p className="enrolme-affinity-note" style={{ background: selected.group.color }}>{selected.note}</p> : <div className="enrolme-affinity-notes">{selected.group.notes.map((note,index) => <button type="button" key={index} style={{ background: selected.group.color }} onClick={() => setSelected({ group: selected.group, note })}>{note}</button>)}</div>}
    </div></div>}
  </div>
}
