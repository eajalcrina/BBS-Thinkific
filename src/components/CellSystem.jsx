import { motion } from 'framer-motion'

/* ── Orgánulos por paleta ─────────────────────────────────────── */
export const ORBS_DARK  = (a=.40) => [{x:8, y:8, r:3,  f:`rgba(14,14,14,${a})`    },{x:22,y:7, r:2.2,f:`rgba(14,14,14,${(a*.8).toFixed(2)})`  },{x:26,y:20,r:3.5,f:`rgba(14,14,14,${(a*.7).toFixed(2)})`  },{x:9, y:22,r:2.5,f:`rgba(14,14,14,${(a*.9).toFixed(2)})`  }]
export const ORBS_LIME  = (a=.38) => [{x:7, y:7, r:2.5,f:`rgba(193,244,0,${a})`   },{x:18,y:6, r:1.8,f:`rgba(193,244,0,${(a*.8).toFixed(2)})`  },{x:20,y:16,r:2.8,f:`rgba(193,244,0,${(a*.7).toFixed(2)})`  },{x:7, y:18,r:2,  f:`rgba(193,244,0,${(a*.9).toFixed(2)})`  }]
export const ORBS_ROSE  = (a=.36) => [{x:6, y:6, r:2.2,f:`rgba(243,39,105,${a})`  },{x:17,y:5, r:1.6,f:`rgba(243,39,105,${(a*.8).toFixed(2)})` },{x:19,y:15,r:2.5,f:`rgba(243,39,105,${(a*.7).toFixed(2)})` },{x:6, y:16,r:1.8,f:`rgba(243,39,105,${(a*.9).toFixed(2)})` }]
export const ORBS_WHITE = (a=.55) => [{x:7, y:7, r:2.2,f:`rgba(255,255,255,${a})` },{x:18,y:6, r:1.6,f:`rgba(255,255,255,${(a*.8).toFixed(2)})`},{x:20,y:16,r:2.8,f:`rgba(255,255,255,${(a*.7).toFixed(2)})`},{x:7, y:17,r:1.8,f:`rgba(255,255,255,${(a*.9).toFixed(2)})`}]

/* ── Halo gigante de fondo ────────────────────────────────────── */
export function Halo({ top, left, right, bottom, size, fill, stroke, delay=0, ccw=false }){
  const pos = {}
  if(top    !== undefined) pos.top    = top
  if(left   !== undefined) pos.left   = left
  if(right  !== undefined) pos.right  = right
  if(bottom !== undefined) pos.bottom = bottom
  const dur = 60 + Math.abs(delay) * 4
  return (
    <div style={{ position:'absolute', ...pos, width:size, height:size, borderRadius:'50%',
      background:fill, border:`2px dashed ${stroke}`,
      animation:`${ccw?'spin-ccw':'spin-slow'} ${dur}s linear infinite`,
      animationDelay:`${delay}s`, transformOrigin:'center', pointerEvents:'none', zIndex:0 }}/>
  )
}

/* ── Célula nucleada ──────────────────────────────────────────── */
export function Cell({ top, left, right, bottom, size, mb, mf, spd, nb, nf, orbs, off=false, delay=0 }){
  const pos = {}
  if(top    !== undefined) pos.top    = top
  if(left   !== undefined) pos.left   = left
  if(right  !== undefined) pos.right  = right
  if(bottom !== undefined) pos.bottom = bottom
  const nucPos = off
    ? { top:'34%', left:'36%', transform:'translate(-50%,-50%)' }
    : { top:'50%', left:'50%', transform:'translate(-50%,-50%)' }
  const floatDur = 4.5 + delay * 0.4
  return (
    <div style={{ position:'absolute', ...pos, width:size, height:size, borderRadius:'50%',
      background:mb, border:`2px dashed ${mf}`,
      animation:`${spd} linear infinite`, animationDelay:`${delay}s`,
      transformOrigin:'center', pointerEvents:'none' }}>
      <motion.div
        animate={{ y:[0,-9,0] }}
        transition={{ duration:floatDur, repeat:Infinity, ease:'easeInOut', delay:delay*0.7 }}
        style={{ position:'absolute', ...nucPos, width:nb, height:nb, borderRadius:'50%', overflow:'hidden' }}>
        <svg width={nb} height={nb} viewBox={`0 0 ${nb} ${nb}`} style={{ display:'block' }}>
          <circle cx={nb/2} cy={nb/2} r={nb/2-1} fill={nf}/>
          {orbs.map((o,i)=><circle key={i} cx={o.x} cy={o.y} r={o.r} fill={o.f}/>)}
        </svg>
      </motion.div>
    </div>
  )
}

/* ── Membrana sin núcleo ──────────────────────────────────────── */
export function Membrane({ top, left, right, bottom, size, mb, mf, spd, delay=0 }){
  const pos = {}
  if(top    !== undefined) pos.top    = top
  if(left   !== undefined) pos.left   = left
  if(right  !== undefined) pos.right  = right
  if(bottom !== undefined) pos.bottom = bottom
  return (
    <div style={{ position:'absolute', ...pos, width:size, height:size, borderRadius:'50%',
      background:mb, border:`2px dashed ${mf}`,
      animation:`${spd} linear infinite`, animationDelay:`${delay}s`,
      transformOrigin:'center', pointerEvents:'none' }}/>
  )
}

/* ── Punto flotante ───────────────────────────────────────────── */
export function Dot({ top, left, right, bottom, size, fill, anim='float-y', delay=0 }){
  const pos = {}
  if(top    !== undefined) pos.top    = top
  if(left   !== undefined) pos.left   = left
  if(right  !== undefined) pos.right  = right
  if(bottom !== undefined) pos.bottom = bottom
  const dur = 5 + delay * 0.6
  return (
    <div style={{ position:'absolute', ...pos, width:size, height:size, borderRadius:'50%',
      background:fill, animation:`${anim} ${dur}s ease-in-out infinite`,
      animationDelay:`${delay}s`, pointerEvents:'none' }}/>
  )
}
