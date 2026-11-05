import { useEffect, useRef, useState } from 'react'
import hotspots from './enrolme-institute-hotspots.json'

const image = '/assets/enrolme-institute-as-is.png'
const stages = ['Realising the Need', 'Lead Generation', 'First Interaction / Initial Response', 'Understanding the Lead', 'Follow-Up', 'Lead Tracking / Management', 'Decision / Conversion', 'Enrollment / Onboarding', 'Continuing or Changing']

function Crop({ box }) {
  return <div className="enrolme-map-crop" style={{ aspectRatio: `${box.w * 19713} / ${box.h * 7197}` }}><img src={image} alt={box.graph ? 'Complete institute journey feelings curve' : 'Expanded original journey map box'} style={{ width: `${10000 / box.w}%`, left: `${-box.x / box.w * 100}%`, top: `${-box.y / box.h * 100}%` }} /></div>
}

export default function EnrolMeInstituteJourney() {
  const [selected, setSelected] = useState(null)
  const closeRef = useRef(null)
  useEffect(() => {
    if (!selected) return
    const focused = document.activeElement
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const handleKey = event => {
      if (event.key === 'Escape') setSelected(null)
      if (event.key === 'Tab') { event.preventDefault(); closeRef.current?.focus() }
    }
    window.addEventListener('keydown', handleKey)
    return () => { document.body.style.overflow = overflow; window.removeEventListener('keydown', handleKey); focused?.focus() }
  }, [selected])
  return <div className="enrolme-institute-map">
    <p className="enrolme-map-hint">Scroll horizontally · Select a box or the feelings graph to expand</p>
    <div className="enrolme-map-scroll" role="region" aria-label="Institute as-is journey map" tabIndex={0}>
      <div className="enrolme-map-board">
        <img className="enrolme-map-image" src={image} alt="Institute as-is journey across nine stages, with original actions, touchpoints, feelings, goals, pain points, opportunities and emotion curve" loading="lazy" />
        {hotspots.map((box,index) => <button type="button" className="enrolme-map-hotspot" key={index} style={{ left: `${box.x}%`, top: `${box.y}%`, width: `${box.w}%`, height: `${box.h}%` }} aria-label={`Expand institute journey box ${index+1}`} onClick={() => setSelected(box)} />)}
        <button type="button" className="enrolme-map-graph-hotspot" aria-label="Expand the full feelings graph" onClick={() => setSelected({ graph: true, x: 0, y: 64, w: 100, h: 36 })} />
      </div>
    </div>
    {selected && <div className="enrolme-map-overlay" onClick={() => setSelected(null)}>
      <div className={`enrolme-map-dialog${selected.graph ? ' is-graph' : ''}`} role="dialog" aria-modal="true" aria-label={selected.graph ? 'Institute journey feelings' : 'Institute journey detail'} onClick={event => event.stopPropagation()}>
        <button ref={closeRef} className="enrolme-map-close" type="button" onClick={() => setSelected(null)} aria-label="Close expanded view">×</button>
        <Crop box={selected} />
        {selected.graph && <div className="enrolme-map-legend">{stages.map(stage => <span key={stage}>{stage}</span>)}</div>}
      </div>
    </div>}
  </div>
}
