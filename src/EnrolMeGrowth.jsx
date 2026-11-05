import { useState } from 'react'
import data from './enrolme-growth.json'
const List = ({items}) => <ul>{items.map(item=><li key={item}>{item}</li>)}</ul>
export default function EnrolMeGrowth({section}) {
 const [phase,setPhase]=useState(0)
 if(section==='Implementation roadmap') return <div className="em-growth-content">
  <p className="em-growth-strategy">Core Strategy: First 3 months = Fix acquisition + trust + usability, 6–12 months = Monetize + grow partnerships, 1–2 years = Monetize + scale + intelligent ecosystem</p>
  <div className="em-roadmap-timeline" role="group" aria-label="Implementation phases">{data.roadmap.map((item,index)=><button type="button" key={item.phase} aria-pressed={phase===index} onClick={()=>setPhase(index)}><span>{item.time}</span><strong>{item.phase}</strong></button>)}</div>
  <section className={`em-roadmap-phase em-roadmap-phase-${phase}`} aria-live="polite"><header><span>{data.roadmap[phase].time}</span><h5>{data.roadmap[phase].phase}</h5><p>Goal: {data.roadmap[phase].goal}</p></header><div className="em-roadmap-workstreams">{data.roadmap[phase].groups.map(group=><article key={group.title}><h6>{group.title}</h6><List items={group.items}/></article>)}</div></section>
 </div>
 if(section==='Marketing strategy') return <div className="em-growth-content">
  <p className="em-marketing-position"><span>POSITIONING</span>A trusted discovery and enrollment platform that simplifies learning decisions.</p>
  <section className="em-marketing-brand"><h5>A. Brand Strategy</h5><dl><div><dt>Personality</dt><dd>Warm, trustworthy, modern</dd></div><div><dt>Emotion</dt><dd>Confidence + clarity</dd></div><div><dt>Promise</dt><dd>“Right choice made easy”</dd></div></dl></section>
  <section className="em-marketing-funnel"><h5>B. Content Strategy</h5><div>{data.funnel.map(([title,...items])=><article key={title}><h6>{title}</h6><List items={items}/></article>)}</div></section>
  <section className="em-marketing-channels"><h5>C. Growth Channels</h5><div><article><h6>Digital</h6><List items={['Instagram (primary)','Google Search','WhatsApp']}/></article><article><h6>Offline</h6><List items={['Societies','Schools','Local events']}/></article></div></section>
  <div className="em-peso-strategy">{data.marketing.map(row=><section className={`em-peso-row em-peso-${row.letter}`} key={row.letter}><header><span>{row.letter}</span><small>{row.name}</small></header><div>{row.cards.map(([title,text])=><article key={title}><h6>{title}</h6><p>{text}</p></article>)}</div></section>)}</div>
 </div>
 if(section==='Branding strategy') return <div className="em-growth-content"><div className="em-brand-pillars">{data.branding.map(([title,text],index)=><article key={title}><span aria-hidden="true">{['Aa','“ ”','✓'][index]}</span><h5>{title}</h5><p>{text}</p></article>)}</div></div>
 if(section==='Prototype & project links') return <div className="em-growth-content"><img className="em-prototype-montage" src="/assets/enrolme-solutioning/prototype-devices.png" alt="Enrol-Me mobile app and desktop prototypes" loading="lazy"/><div className="em-prototype-links"><a href="https://enrol-me.vercel.app/app" target="_blank" rel="noopener noreferrer"><span>Mobile app</span><strong>Explore the app prototype ↗</strong><small>enrol-me.vercel.app/app</small></a><a href="https://enrol-me.vercel.app/desktop" target="_blank" rel="noopener noreferrer"><span>Desktop</span><strong>Explore the desktop prototype ↗</strong><small>enrol-me.vercel.app/desktop</small></a></div></div>
 return null
}
