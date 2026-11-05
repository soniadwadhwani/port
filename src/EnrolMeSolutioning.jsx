import EnrolMeInstituteFlow from './EnrolMeInstituteFlow.jsx'
import EnrolMeParentFlow from './EnrolMeParentFlow.jsx'
import EnrolMeArchitecture from './EnrolMeArchitecture.jsx'
import { useEffect, useRef, useState } from 'react'
import data from './enrolme-solutioning.json'

const concepts = [
  ['Smart discovery', 'Visual, Zomato-style browsing with nearby classes and optional filters.', 'Make exploration easier before asking users to commit.'],
  ['Social trust layer', '“Parents like you enrolled here”, contact-based validation, and video testimonials.', 'Help parents decide through familiar, credible social proof.'],
  ['Seamless enrollment', 'Inquiry → Documents → Payment → Confirmed, in one connected flow.', 'Reduce uncertainty and make progress visible.']
]
const review = [
  ['UI & navigation','Primary buttons validated; Nearby appreciated; main categories visible on home.'],
  ['Platform consistency','App and website UI should match, with efficient parallel development.'],
  ['Features','Sync Contacts valued because it aligns with word-of-mouth behaviour.'],
  ['System states','Show fees pending, overdue and paid; multiple classes per day; multiple children.'],
  ['Onboarding','Proposed flow rejected: user sign-up must happen early. Lead generation remains a priority.'],
  ['Integration','Existing Euro Nations partnership: integrate rather than expand.'],
  ['Information architecture','Category reduction acknowledged; core sections visible; card-based navigation validated.'],
  ['Product strategy','Refine existing features, avoid backend complexity, and keep a modular ecosystem with separate products / brands.']
]
function FlowDiagram({ flows, onRead }) {
  return <div className="em-flow-diagrams">{flows.map(flow => <section className="em-flow-route" key={flow.title}><h5>{flow.title}</h5><ol className="em-flow-steps">{flow.steps.map((step,index) => <li key={index}><button type="button" onClick={() => onRead({title:flow.title,text:step})}>{step}</button></li>)}</ol>{flow.branches && <div className="em-flow-branches">{flow.branches.map(([label,...steps]) => <div key={label}><strong>{label}</strong><ol className="em-flow-steps">{steps.map((step,index) => <li key={index}><button type="button" onClick={() => onRead({title:flow.title+' · '+label,text:step})}>{step}</button></li>)}</ol></div>)}</div>}</section>)}</div>
}
function Blueprint({ onRead }) {
  const rows=[['Physical evidence','evidence'],['Customer actions',null],['Onstage actions','onstage'],['Backstage actions','backstage'],['Support process','support']]
  return <div className="em-blueprint"><p className="enrolme-insight-hint">Scroll horizontally to follow the service. Select a box to read it.</p><div className="em-blueprint-scroll" tabIndex="0" role="region" aria-label="Service blueprint, horizontally scrollable"><div className="em-blueprint-grid"><div className="em-blueprint-corner">Service layers</div>{data.blueprint.map(stage => <h5 key={stage.stage}>{stage.stage}</h5>)}{rows.map(([label,key],index) => <div className={`em-blueprint-row em-blueprint-row-${index}`} key={label}><strong className="em-blueprint-label">{label}{index===1 && <small>Line of interaction ↓</small>}{index===2 && <small>Line of visibility ↓</small>}</strong>{data.blueprint.map(stage => <div className="em-blueprint-cell" key={stage.stage}>{key ? stage[key].map(text => <button type="button" key={text} onClick={() => onRead({title:stage.stage+' · '+label,text})}>{text}</button>) : <b>{stage.stage}</b>}</div>)}</div>)}</div></div><p className="em-source-note">The deck’s blueprint covers Awareness, Discovery and Evaluation. Contact integration and the AI recommendation layer are proposed capabilities, subject to the project’s integration constraints.</p></div>
}
export default function EnrolMeSolutioning({ section }) {
  const [selected,setSelected]=useState(null)
  const closeRef=useRef(null)
  useEffect(() => {
    if (!selected) return
    const previous=document.activeElement, overflow=document.body.style.overflow
    document.body.style.overflow='hidden';closeRef.current?.focus()
    const onKey=event => { if(event.key==='Escape')setSelected(null);if(event.key==='Tab'){event.preventDefault();closeRef.current?.focus()} }
    window.addEventListener('keydown',onKey)
    return () => {document.body.style.overflow=overflow;window.removeEventListener('keydown',onKey);previous?.focus()}
  },[selected])
  let content
  if(section==='Concept evaluation') content=<div className="em-concept"><p className="em-concept-statement">Transform Enrol-Me into a seamless, trust-driven discovery and enrollment ecosystem that simplifies decision-making and improves conversion.</p><div className="em-concept-pillars">{concepts.map(([title,text,value],index) => <article key={title}><span>0{index+1}</span><h5>{title}</h5><p>{text}</p><small>{value}</small></article>)}</div><h5 className="enrolme-synthesis-subheading">Stakeholder feedback · Design review</h5><div className="em-review-grid">{review.map(([title,text]) => <article key={title}><h6>{title}</h6><p>{text}</p></article>)}</div></div>
  else if(section==='Information architecture') content=<EnrolMeArchitecture onRead={setSelected}/>
  else if(section==='Parent user flow') content=<EnrolMeParentFlow onRead={setSelected}/>
  else if(section==='Institute user flow') content=<EnrolMeInstituteFlow onRead={setSelected}/>
  else if(section==='Service blueprint') content=<Blueprint onRead={setSelected}/>
  else {
    const low=section==='Low-fidelity wireframes'
    const screens=low ? [['wire-profile','Profile & account'],['wire-chat','Chat & communication'],['wire-fees','Fees & payments'],['wire-schedule','Weekly schedule']] : [['mock-welcome','Welcome'],['mock-role','Choose a user role'],['mock-home','Home & discovery'],['mock-schedule','Schedule & calendar']]
    content=<div>{low && <div className="em-design-constraints"><h5>Designing within the existing platform</h5><p>Keep the core architecture and payment infrastructure. Work within limited backend changes and development bandwidth. Third-party integrations are outside scope; advanced AI remains conceptual.</p></div>}<div className="em-screen-gallery">{screens.map(([file,title]) => <button type="button" key={file} onClick={() => setSelected({title,image:`/assets/enrolme-solutioning/${file}.jpeg`})}><img src={`/assets/enrolme-solutioning/${file}.jpeg`} alt={`${title} — ${low?'hand-drawn wireframe':'Enrol-Me interface design'}`} loading="lazy"/><span>{title} ↗</span></button>)}</div><p className="enrolme-insight-hint">Select a screen to view it larger.</p></div>
  }
  return <div className="em-solution-content">{content}{selected && <div className="enrolme-map-overlay" onClick={() => setSelected(null)}><div className={`enrolme-map-dialog em-solution-dialog${selected.image?' is-screen':''}`} role="dialog" aria-modal="true" aria-labelledby="em-solution-dialog-title" onClick={event => event.stopPropagation()}><button ref={closeRef} type="button" className="enrolme-map-close" onClick={() => setSelected(null)} aria-label="Close expanded view">×</button><h4 id="em-solution-dialog-title">{selected.title}</h4>{selected.image ? <img src={selected.image} alt={selected.title}/> : <p>{selected.text}</p>}</div></div>}</div>
}
