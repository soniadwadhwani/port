const palette = {
  root: ['#ded4ee','#9782b0'], neutral: ['#eae6ed','#afa2b9'],
  parent: ['#dcebe0','#83a58f'], institute: ['#efddd6','#bd9486'],
  shared: ['#dee7f1','#8ba3bd'], future: ['#eee2d3','#baa17f']
}
export default function EnrolMeArchitecture({ onRead }) {
  const nodes = [], edges = []
  function box(id,text,x,y,w=160,h=54,type='neutral',small=false) {
    const node={id,text,x,y,w,h,type,small};nodes.push(node);return node
  }
  function connect(a,b,mid,type=a.type) {
    const x=a.x+a.w/2, y=a.y+a.h, tx=b.x+b.w/2, ty=b.y
    const c=palette[type][1]
    if(x===tx) edges.push({d:`M ${x} ${y} V ${ty-3}`,c,type})
    else {
      const m=mid ?? (y+ty)/2, sign=tx>x?1:-1, r=Math.min(8,Math.abs(tx-x)/2,(ty-y)/3)
      edges.push({d:`M ${x} ${y} V ${m-r} Q ${x} ${m} ${x+sign*r} ${m} H ${tx-sign*r} Q ${tx} ${m} ${tx} ${m+r} V ${ty-3}`,c,type})
    }
  }
  const root=box('root','Enrol-me',518,0,160,54,'root')
  const onboarding=box('onboarding','onboarding',518,86)
  connect(root,onboarding)
  const login=box('login','log in / sign up',345,182), user=box('user','user type',518,182), location=box('location','locations setup',690,182)
  ;[login,user,location].forEach(n=>connect(onboarding,n,160,'neutral'))
  const parent=box('parent','parent/user side',345,309,160,54,'parent'), institute=box('institute','institute/organisation side',690,309,160,54,'institute')
  ;[parent,institute].forEach(n=>connect(user,n,272,'neutral'))
  const parentGroups=[
    ['discovery','search and browse',0,[['nearby feed',0],['filters',86]]],
    ['enrollment','apply and track',173,[['Inquiry',173],['Docs upload',259]]],
    ['myprofile','child and prefs',345,[['payment',345],['child profile',432]]]
  ]
  const instituteGroups=[
    ['listing','profile and classes',690,[['class cards',690],['media and videos\n/ reels type',777]]],
    ['dashboard','leads and analytics',906,[['lead CRM',863],['analytics',949],['applicants',1035]]],
    ['operations','fees and batches',1122,[['fee tracker',1122],['batch mgmt',1208]]]
  ]
  const leafNodes=[]
  ;[[parent,parentGroups,'parent'],[institute,instituteGroups,'institute']].forEach(([side,groups,type])=>groups.forEach(([title,subtitle,x,leaves])=>{
    const heading=box(title,title,x,405,160,54,type)
    connect(side,heading,383,type)
    const sub=box(title+'-sub',subtitle,x,472,160,20,type,true)
    leaves.forEach(([text,lx])=>{
      const leaf=box(title+'-'+lx,text,lx,534,72,40,type,true)
      connect(sub,leaf,513,type);leafNodes.push(leaf)
    })
  }))
  const shared=box('shared','Shared features',518,688,160,54,'shared')
  leafNodes.forEach(n=>{
    const x=n.x+n.w/2, y=n.y+n.h, right=n.type==='parent',tx=right?518:678,sign=right?1:-1
    edges.push({d:`M ${x} ${y} V 706 Q ${x} 714 ${x+sign*8} 714 H ${tx-sign*3}`,c:palette[n.type][1],type:n.type})
  })
  const sharedFeatures=[['notifications','Reminders & alerts',173],['messaging','Unified chat',345],['payments','Gateway + receipts',518],['search','Name, category, GPS',690],['settings','Profile, support',863]]
  sharedFeatures.forEach(([title,subtitle,x])=>{
    const n=box(title,title,x,831,160,54,'shared');connect(shared,n,786,'shared')
    box(title+'-description',subtitle,x,898,160,25,'shared',true)
  })
  const future=box('future','AI & Future Layer',518,965,160,54,'future')
  connect({x:518,y:898,w:160,h:25,type:'shared'},future)
  ;[['Interest Profiling','guided discovery',345],['Lead Heatmap','hot lead scoring',518],['Drop-off engine','funnel analysis',690]].forEach(([title,subtitle,x])=>{
    const n=box(title,title,x,1061,160,54,'future');connect(future,n,1040,'future')
    box(title+'-description',subtitle,x,1128,160,25,'future',true)
  })
  return <div className="em-ia-diagram"><p className="enrolme-insight-hint">Select a box to read it. On smaller screens, scroll across to follow the connections.</p><div className="em-ia-scroll" role="region" aria-label="Enrol-Me information architecture" tabIndex="0"><svg viewBox="-8 -8 1296 1170" className="em-ia-svg" aria-label="Information architecture from onboarding through parent and institute features, shared features, and the AI and future layer">
    <defs>{Object.entries(palette).map(([type,[,stroke]])=><marker key={type} id={`em-ia-arrow-${type}`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M 1 1 L 6 4 L 1 7" fill="none" stroke={stroke} strokeWidth="1.2"/></marker>)}</defs>
    <g fill="none" strokeWidth="1.5">{edges.map((edge,index)=><path key={index} d={edge.d} stroke={edge.c} markerEnd={`url(#em-ia-arrow-${edge.type})`}/>)}</g>
    {nodes.map(n=><g key={n.id} role="button" tabIndex="0" className="em-ia-node" aria-label={n.text.replace('\n',' ')} onClick={()=>onRead({title:'Information architecture',text:n.text})} onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();onRead({title:'Information architecture',text:n.text})}}}>
      <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="1.5" fill={palette[n.type][0]} stroke={palette[n.type][1]} strokeWidth="1.2"/>
      <text x={n.x+n.w/2} y={n.y+n.h/2} textAnchor="middle" dominantBaseline="middle" fontSize={n.small?(n.w<100?9:10):12} fill="#42374f">{n.text.split('\n').map((line,i,lines)=><tspan key={i} x={n.x+n.w/2} dy={i===0?(lines.length>1?-5:0):12}>{line}</tspan>)}</text>
    </g>)}
  </svg></div></div>
}
