import { useEffect, useRef } from 'react'

/* ══ PALETAS por sección ══════════════════════════════════════════
   Núcleos suavizados: opacidad máx .28
   Orgánulos: opacidad máx .11
   ════════════════════════════════════════════════════════════════ */
const PALETTES = {
  lime: {
    bg:'#C1F400',
    mf:(a)=>`rgba(14,14,14,${a.toFixed(3)})`,
    nc:['rgba(14,14,14,.18)','rgba(14,14,14,.22)','rgba(14,14,14,.26)'],
    ob:(l)=>`rgba(14,14,14,${[.06,.08,.10][l]})`,
  },
  dark: {
    bg:'#0E0E0E',
    mf:(a)=>`rgba(193,244,0,${a.toFixed(3)})`,
    nc:['rgba(193,244,0,.18)','rgba(193,244,0,.22)','rgba(193,244,0,.26)'],
    ob:(l)=>`rgba(193,244,0,${[.06,.08,.10][l]})`,
  },
  cream: {
    bg:'#F8F6F0',
    mf:(a)=>`rgba(14,14,14,${a.toFixed(3)})`,
    nc:['rgba(243,39,105,.16)','rgba(243,39,105,.20)','rgba(243,39,105,.24)'],
    ob:(l)=>`rgba(243,39,105,${[.05,.07,.09][l]})`,
  },
  rose: {
    bg:'#F32769',
    mf:(a)=>`rgba(255,255,255,${a.toFixed(3)})`,
    nc:['rgba(255,255,255,.16)','rgba(193,244,0,.20)','rgba(255,255,255,.24)'],
    ob:(l)=>`rgba(255,255,255,${[.05,.07,.09][l]})`,
  },
  white: {
    bg:'#FFFFFF',
    mf:(a)=>`rgba(193,244,0,${a.toFixed(3)})`,
    nc:['rgba(243,39,105,.16)','rgba(243,39,105,.20)','rgba(243,39,105,.24)'],
    ob:(l)=>`rgba(243,39,105,${[.05,.07,.09][l]})`,
  },
}

/* ══ CAPAS DESKTOP ════════════════════════════════════════════════
   zone 'free'    → toda la sección (capa fondo)
   zone 'right'   → 48–100% ancho + bordes top/bottom
   zone 'corners' → esquinas + borde derecho
   ════════════════════════════════════════════════════════════════ */
const LAYERS_D = [
  { z:0, sMin:150, sMax:215, opB:.08, opM:.05, spM:.15, cnt:8,  zone:'free'    },
  { z:1, sMin:80,  sMax:130, opB:.18, opM:.07, spM:.26, cnt:10, zone:'right'   },
  { z:2, sMin:32,  sMax:70,  opB:.28, opM:.09, spM:.40, cnt:10, zone:'corners' },
]
const LAYERS_M = [
  { z:0, sMin:100, sMax:150, opB:.08, opM:.04, spM:.12, cnt:1, zone:'free'    },
  { z:1, sMin:55,  sMax:90,  opB:.16, opM:.06, spM:.20, cnt:2, zone:'right'   },
  { z:2, sMin:28,  sMax:50,  opB:.24, opM:.07, spM:.32, cnt:2, zone:'corners' },
]

/* ══ PERLIN NOISE 1D ═════════════════════════════════════════════ */
function buildPermutation(){
  const p=[]; for(let i=0;i<256;i++) p[i]=i
  for(let i=255;i>0;i--){ const j=Math.floor(Math.random()*(i+1));[p[i],p[j]]=[p[j],p[i]] }
  return [...p,...p]
}
function fade(t){ return t*t*t*(t*(t*6-15)+10) }
function grad(h,x){ return (h&1)?-x:x }
function perlin1(P,x){
  const X=Math.floor(x)&255, xf=x-Math.floor(x), u=fade(xf)
  return (grad(P[X],xf)*(1-u)+grad(P[X+1],xf-1)*u)*0.5+0.5
}

/* ══ POSICIÓN INICIAL POR ZONA ═══════════════════════════════════ */
function initPos(zone, W, H, r, mobile){
  const TX1=W*0.52
  let x, y
  for(let tries=0; tries<50; tries++){
    if(mobile){
      x = Math.random()<0.5 ? Math.random()*W*0.26 : W*0.74+Math.random()*W*0.26
      y = Math.random()*H
    } else if(zone==='free'){
      x = Math.random()*W; y = Math.random()*H
    } else if(zone==='right'){
      if(Math.random()<0.75){
        x = W*0.48+Math.random()*W*0.52; y = Math.random()*H
      } else {
        x = Math.random()*W
        y = Math.random()<0.5 ? Math.random()*H*0.20 : H*0.80+Math.random()*H*0.20
      }
    } else {
      const r2=Math.random()
      if(r2<0.55)     { x=W*0.50+Math.random()*W*0.50; y=Math.random()*H }
      else if(r2<0.75){ x=Math.random()*W*0.20; y=Math.random()*H*0.25 }
      else if(r2<0.88){ x=Math.random()*W*0.20; y=H*0.75+Math.random()*H*0.25 }
      else            { x=Math.random()*W; y=Math.random()<0.5?Math.random()*H*0.15:H*0.85+Math.random()*H*0.15 }
    }
    if(!mobile && zone!=='free' && x>-r && x<TX1+r && y>H*0.06-r && y<H*0.90+r && tries<40) continue
    break
  }
  return { x, y }
}

/* ══ CLASE CÉLULA ════════════════════════════════════════════════ */
class Cell {
  constructor(li, cfg, W, H, mobile, P){
    this.W=W; this.H=H; this.li=li; this.mobile=mobile
    this.zone=cfg.zone; this.P=P
    this.r    = cfg.sMin + Math.random()*(cfg.sMax-cfg.sMin)
    this.op   = cfg.opB  + Math.random()*cfg.opM
    this.sp   = cfg.spM  * (0.7+Math.random()*0.6)
    this.angle= Math.random()*Math.PI*2
    this.spin = (0.0003+Math.random()*0.0004)*(Math.random()>0.5?1:-1)
    this.nOff = Math.random()*1000
    this.nOff2= Math.random()*1000
    this.nucOff={ x:(Math.random()-0.5)*0.28, y:(Math.random()-0.5)*0.28 }
    this.orbA = [0,1.57,3.14,4.71].map(a=>a+Math.random()*0.5)
    this.nucR = this.r*(0.13+Math.random()*0.05)
    this.orbR = this.nucR*(0.28+Math.random()*0.12)
    this.dash = [4+li*2, 5+li*3]
    const pos = initPos(cfg.zone, W, H, this.r, mobile)
    this.x=pos.x; this.y=pos.y
  }
  update(t){
    const nx = perlin1(this.P, t*0.00035+this.nOff)*2-1
    const ny = perlin1(this.P, t*0.00035+this.nOff2+500)*2-1
    this.x += nx*this.sp
    this.y += ny*this.sp
    this.angle += this.spin*16
    const pad=this.r
    if(this.x<-pad)       this.x=this.W+pad
    if(this.x>this.W+pad) this.x=-pad
    if(this.y<-pad)       this.y=this.H+pad
    if(this.y>this.H+pad) this.y=-pad
  }
  draw(ctx, pal){
    const nc=pal.nc[this.li], ob=pal.ob(this.li), mf=pal.mf(this.op)
    ctx.save()
    ctx.translate(this.x, this.y)
    /* membrana: fill muy sutil + borde punteado */
    ctx.save()
    ctx.rotate(this.angle)
    ctx.beginPath(); ctx.arc(0,0,this.r,0,Math.PI*2)
    ctx.fillStyle=pal.mf(this.op*0.22); ctx.fill()
    ctx.setLineDash(this.dash)
    ctx.strokeStyle=mf; ctx.lineWidth=1.5; ctx.stroke()
    ctx.setLineDash([])
    ctx.restore()
    /* núcleo sutil */
    const nx=this.nucOff.x*this.r, ny=this.nucOff.y*this.r
    ctx.beginPath(); ctx.arc(nx,ny,this.nucR,0,Math.PI*2)
    ctx.fillStyle=nc; ctx.fill()
    /* orgánulos muy sutiles */
    this.orbA.forEach(a=>{
      const ox=nx+Math.cos(a+this.angle*0.25)*this.nucR*0.62
      const oy=ny+Math.sin(a+this.angle*0.25)*this.nucR*0.62
      ctx.beginPath(); ctx.arc(ox,oy,this.orbR,0,Math.PI*2)
      ctx.fillStyle=ob; ctx.fill()
    })
    ctx.restore()
  }
}

/* ══ COMPONENTE REACT ════════════════════════════════════════════ */
export default function CellCanvas({ palette='lime', style={} }){
  const canvasRef = useRef(null)
  const stateRef  = useRef({})

  useEffect(()=>{
    const canvas = canvasRef.current
    if(!canvas) return
    const ctx = canvas.getContext('2d')
    const pal = PALETTES[palette] || PALETTES.lime
    const P   = buildPermutation()
    let cells=[], W=0, H=0, aid=null, mobile=false

    function build(){
      mobile = W < 768
      const layers = mobile ? LAYERS_M : LAYERS_D
      cells = []
      layers.forEach((cfg,li)=>{
        for(let i=0;i<cfg.cnt;i++) cells.push(new Cell(li,cfg,W,H,mobile,P))
      })
    }

    function resize(){
      const parent = canvas.parentElement
      if(!parent) return
      const rect = parent.getBoundingClientRect()
      W = rect.width  || parent.offsetWidth  || 600
      H = rect.height || parent.offsetHeight || 400
      const dpr = window.devicePixelRatio||1
      canvas.width  = W*dpr
      canvas.height = H*dpr
      canvas.style.width  = W+'px'
      canvas.style.height = H+'px'
      ctx.setTransform(dpr,0,0,dpr,0,0)
      build()
    }

    function loop(t){
      aid = requestAnimationFrame(loop)
      ctx.clearRect(0,0,W,H)
      cells.forEach(c=>{ c.update(t); c.draw(ctx,pal) })
    }

    resize()
    aid = requestAnimationFrame(loop)

    const ro = new ResizeObserver(()=>{ cancelAnimationFrame(aid); resize(); aid=requestAnimationFrame(loop) })
    ro.observe(canvas.parentElement)
    stateRef.current = { aid, ro }

    return ()=>{
      cancelAnimationFrame(aid)
      ro.disconnect()
    }
  }, [palette])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:'absolute', top:0, left:0,
        width:'100%', height:'100%',
        pointerEvents:'none', zIndex:0,
        ...style
      }}
    />
  )
}
