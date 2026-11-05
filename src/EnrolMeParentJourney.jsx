import { useEffect, useRef, useState } from 'react'
import mapUrl from './enrolme-parent-as-is.svg?url'
import boxes from './enrolme-parent-hotspots.json'

export default function EnrolMeParentJourney() {
  const [selected, setSelected] = useState(null)
  const closeRef = useRef(null)
  useEffect(() => {
    if (!selected) return
    const focus = document.activeElement
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const handleKey = event => {
      if (event.key === 'Escape') setSelected(null)
      if (event.key === 'Tab') { event.preventDefault(); closeRef.current?.focus() }
    }
    window.addEventListener('keydown', handleKey)
    return () => { document.body.style.overflow = overflow; window.removeEventListener('keydown', handleKey); focus?.focus() }
  }, [selected])
  return <div className="enrolme-parent-map">
    <p className="enrolme-map-hint">Scroll horizontally · Select a box or the feelings graph to expand</p>
    <div className="enrolme-map-scroll" role="region" aria-label="Parent and child as-is journey map" tabIndex={0}>
      <div className="enrolme-parent-map-board">
        <object data={mapUrl} type="image/svg+xml" aria-label="Parent as-is journey with original stage order, notes, and feelings curve" />
        {boxes.map((box,index) => <button type="button" key={index} className="enrolme-map-hotspot" style={{ left: `${box.x}%`, top: `${box.y}%`, width: `${box.w}%`, height: `${box.h}%` }} aria-label={`Read: ${box.text.replace(/\s+/g,' ').slice(0,100)}`} onClick={() => setSelected(box)} />)}
        <button type="button" className="enrolme-parent-graph-hotspot" aria-label="Expand parent journey feelings graph" onClick={() => setSelected({ graph: true })} />
      </div>
    </div>
    {selected && <div className="enrolme-map-overlay" onClick={() => setSelected(null)}>
      <div className={`enrolme-map-dialog${selected.graph ? ' is-graph' : ''}`} role="dialog" aria-modal="true" aria-label={selected.graph ? 'Parent journey feelings' : 'Parent journey detail'} style={selected.graph ? undefined : { background: selected.color }} onClick={event => event.stopPropagation()}>
        <button ref={closeRef} type="button" className="enrolme-map-close" onClick={() => setSelected(null)} aria-label="Close expanded view">×</button>
        {selected.graph ? <><h5>Feelings throughout the parent journey</h5><object className="enrolme-parent-feelings" data={`${mapUrl}#svgView(viewBox(0,3000,12275,1195.8418))`} type="image/svg+xml" aria-label="Complete parent journey emotional curve" /></> : <p className="enrolme-parent-expanded-text">{selected.text.replace(/\s+/g,' ').trim()}</p>}
      </div>
    </div>}
  </div>
}
