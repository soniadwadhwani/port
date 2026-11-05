const nodes = [
  ['landing','landing page\n(parents)',0,319,112,122,'ellipse','entry'],
  ['location','location',275,87,125,49,'round','action'],
  ['city','select city',494,90,80,43,'rect','screen'],
  ['profile','profile',275,235,125,49,'round','action'],
  ['profile-details','can view all the\nprofile details',494,167,98,42,'rect','screen'],
  ['edit','add/edit\nprofile details',674,158,111,60,'parallel','input'],
  ['dashboard','my dashboard',494,235,80,48,'rect','screen'],
  ['logout','logout',494,294,80,42,'rect','screen'],
  ['login','log in /\nregister',494,363,124,99,'diamond','decision'],
  ['otp','enter deets and\nverify otp',674,342,138,58,'parallel','input'],
  ['org-login','organisational\nlogin/signup',674,424,138,57,'parallel','input'],
  ['program-search','search programs',275,345,125,69,'round','action'],
  ['filter','filter by category/area',275,460,125,75,'round','action'],
  ['ads','automated  (institutes)\nad carousel',275,601,125,76,'round','action'],
  ['ad-click','user clicks on a\nspecific institute ad',471,606,96,66,'rect','screen'],
  ['org-page','opens that\ninstitute’s org\npage',629,606,80,66,'rect','screen'],
  ['apply','has an option to\napply now',758,606,80,66,'rect','screen'],
  ['search','search',934,34,108,49,'round','action'],
  ['applications','my applications',934,156,108,48,'round','action'],
  ['application-list','list of\napplications',1097,159,80,42,'rect','list'],
  ['select-application','user selects an\napplication',1249,127,130,105,'diamond','decision'],
  ['application-detail','opens application\ndetails page',1436,158,104,44,'rect','list'],
  ['programs','my programs',934,275,108,48,'round','action'],
  ['program-list','list of programs\n(enrolled)',1097,278,95,43,'rect','list'],
  ['select-program','user selects a\nprogram',1249,251,130,97,'diamond','decision'],
  ['program-detail','opens program\ndetails page',1433,278,95,43,'rect','list'],
  ['fees','pay fees',934,402,108,48,'round','action'],
  ['pending','pending institutes to\npay fees',1097,404,104,44,'rect','screen'],
  ['select-payment','user selects\npay now for an\ninstitute',1249,374,130,104,'diamond','decision'],
  ['confirm','confirm payment page',1445,404,104,44,'rect','confirm'],
  ['payments','my payments',934,521,108,49,'round','action'],
  ['payments-list','Payments List\nPage opens',1097,524,83,43,'rect','list'],
  ['select-institute','user selects an\ninstitute',1249,497,130,97,'diamond','decision'],
  ['notifications','notifications',934,604,108,48,'round','action'],
  ['notifications-page','opens notifications page',1097,612,147,32,'rect','screen']
]
const paths = [
  ['loop','M 987 29 Q 987 10 964 10 H 80 Q 55 10 55 35 V 311'],
  ['action','M 116 380 H 160 Q 193 380 193 346 V 145 Q 193 111 225 111 H 268'],
  ['action','M 116 380 H 160 Q 193 380 193 346 V 291 Q 193 259 225 259 H 268'],
  ['action','M 116 380 H 268'],
  ['action','M 116 380 H 160 Q 193 380 193 414 V 466 Q 193 497 225 497 H 268'],
  ['action','M 116 380 H 160 Q 193 380 193 414 V 607 Q 193 639 225 639 H 268'],
  ['loop','M 404 111 H 487'],
  ['loop','M 404 259 H 415 Q 446 259 446 228 V 220 Q 446 188 476 188 H 487'],
  ['screen','M 596 188 H 667'],
  ['loop','M 404 259 H 487'],
  ['loop','M 404 259 H 415 Q 446 259 446 287 Q 446 315 475 315 H 487'],
  ['loop','M 404 259 H 415 Q 446 259 446 290 V 382 Q 446 412 476 412 H 487'],
  ['decision','M 622 412 Q 646 412 646 392 Q 646 371 670 371 H 677'],
  ['decision','M 622 412 Q 646 412 646 432 Q 646 453 670 453 H 677'],
  ['loop','M 338 419 V 453'],
  ['loop','M 404 639 H 464'],
  ['screen','M 571 639 H 622'],
  ['screen','M 713 639 H 751'],
  ['screen','M 578 259 H 829 Q 858 259 858 230 V 87 Q 858 58 887 58 H 927'],
  ['screen','M 578 259 H 829 Q 858 259 858 230 V 209 Q 858 180 887 180 H 927'],
  ['screen','M 578 259 H 829 Q 858 259 858 279 Q 858 300 887 300 H 927'],
  ['screen','M 578 259 H 829 Q 858 259 858 288 V 396 Q 858 426 887 426 H 927'],
  ['screen','M 578 259 H 829 Q 858 259 858 288 V 516 Q 858 545 887 545 H 927'],
  ['screen','M 578 259 H 829 Q 858 259 858 288 V 598 Q 858 628 887 628 H 927'],
  ['loop','M 1046 180 H 1090'],['list','M 1182 180 H 1242'],['decision','M 1383 180 H 1429'],
  ['loop','M 1046 300 H 1090'],['list','M 1197 300 H 1242'],['decision','M 1383 300 H 1426'],
  ['loop','M 1046 426 H 1090'],['screen','M 1205 426 H 1242'],['decision','M 1383 426 H 1438'],
  ['loop','M 1046 545 H 1090'],['list','M 1184 545 H 1242'],
  ['loop','M 1046 628 H 1090']
]
const colors = { entry:['#dcebdc','#91ae93'], action:['#dcebe4','#91ad9f'], screen:['#e0e8ef','#95acbd'], input:['#e6e0ed','#a79bb8'], decision:['#efdfeb','#b89aaf'], list:['#e9e5ed','#aaa1b4'], confirm:['#dcece8','#91b4aa'] }
const strokes = { action:'#83a18d',loop:'#98ada8',screen:'#91aaba',decision:'#b394a7',list:'#ada5b5' }
export default function EnrolMeParentFlow({ onRead }) {
  return <div className="em-parent-flow"><p className="enrolme-insight-hint">Scroll across to follow the flow. Select any shape to read its content.</p><div className="em-parent-flow-scroll" role="region" aria-label="Parent user flow, horizontally scrollable" tabIndex="0"><svg className="em-parent-flow-svg" viewBox="-8 0 1570 690" aria-label="Parent user flow with original screens, decisions, inputs and connections">
    <defs>{Object.entries(strokes).map(([key,color])=><marker id={`em-pf-${key}`} key={key} viewBox="0 0 10 12" refX="8" refY="6" markerWidth="8" markerHeight="10" orient="auto"><path d="M 2 1 L 7 6 L 2 11" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></marker>)}</defs>
    <g fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">{paths.map(([type,d],i)=><path key={i} d={d} stroke={strokes[type]} markerEnd={`url(#em-pf-${type})`}/>)}</g>
    {nodes.map(([id,text,x,y,w,h,shape,type])=>{
      const props={fill:colors[type][0],stroke:colors[type][1],strokeWidth:1}
      return <g key={id} role="button" tabIndex="0" className="em-parent-flow-node" aria-label={text.replaceAll('\n',' ')} onClick={()=>onRead({title:'Parent user flow',text})} onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();onRead({title:'Parent user flow',text})}}}>
        {shape==='ellipse'?<ellipse cx={x+w/2} cy={y+h/2} rx={w/2} ry={h/2} {...props}/>:shape==='diamond'?<polygon points={`${x+w/2},${y} ${x+w},${y+h/2} ${x+w/2},${y+h} ${x},${y+h/2}`} {...props}/>:shape==='parallel'?<path d={`M ${x+23} ${y} H ${x+w-6} Q ${x+w+2} ${y} ${x+w-2} ${y+8} L ${x+w-24} ${y+h-5} Q ${x+w-27} ${y+h} ${x+w-32} ${y+h} H ${x+6} Q ${x-2} ${y+h} ${x+2} ${y+h-8} L ${x+20} ${y+5} Q ${x+22} ${y} ${x+23} ${y} Z`} {...props}/>:<rect x={x} y={y} width={w} height={h} rx={shape==='round'?23:2} {...props}/>}
        <text x={x+w/2} y={y+h/2} textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#41384c">{text.split('\n').map((line,i,lines)=><tspan key={i} x={x+w/2} dy={i===0?-(lines.length-1)*6:12}>{line}</tspan>)}</text>
      </g>
    })}
  </svg></div></div>
}
