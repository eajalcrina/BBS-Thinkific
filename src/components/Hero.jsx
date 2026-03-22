import { motion } from 'framer-motion'
import { Halo, Cell, Membrane, Dot, ORBS_DARK, ORBS_ROSE } from './CellSystem.jsx'

const st = { hidden:{}, show:{ transition:{ staggerChildren:0.08, delayChildren:0.15 } } }
const it = { hidden:{ opacity:0, y:36 }, show:{ opacity:1, y:0, transition:{ duration:0.7, ease:[0.22,1,0.36,1] } } }

export default function Hero() {
  return (
    <section style={{ background:'var(--lime)', position:'relative', overflow:'hidden', minHeight:'92vh', display:'flex', alignItems:'center' }}>

      {/* ── Halos de fondo ── */}
      <Halo top="-38%" right="-14%" size={340} fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.14)" delay={0}/>
      <Halo bottom="-30%" left="-8%" size={210} fill="rgba(255,255,255,.04)" stroke="rgba(14,14,14,.08)" delay={3} ccw/>

      {/* ── Células nucleadas ── */}
      <Cell top="6%"  right="3%"  size={195} mb="rgba(255,255,255,.09)" mf="rgba(255,255,255,.48)" spd="spin-cw 24s"   nb={42} nf="rgba(14,14,14,.44)"    orbs={ORBS_DARK()} delay={0}/>
      <Cell bottom="18%" right="25%" size={108} mb="rgba(255,255,255,.07)" mf="rgba(255,255,255,.30)" spd="spin-ccw 34s"  nb={26} nf="rgba(243,39,105,.55)" orbs={ORBS_ROSE()} delay={1.5}/>
      <Cell bottom="12%" left="3%"  size={72}  mb="rgba(255,255,255,.05)" mf="rgba(255,255,255,.22)" spd="spin-cw 42s"   nb={17} nf="rgba(14,14,14,.36)"   orbs={ORBS_DARK()} delay={2.5}/>
      <Cell top="42%" right="8%"  size={50}  mb="rgba(255,255,255,.04)" mf="rgba(255,255,255,.20)" spd="spin-ccw 50s"  nb={12} nf="rgba(243,39,105,.42)" orbs={ORBS_ROSE()} delay={4}/>

      {/* ── Membranas sin núcleo ── */}
      <Membrane top="22%" left="36%" size={36} mb="rgba(255,255,255,.03)" mf="rgba(255,255,255,.18)" spd="spin-slow 55s" delay={1}/>
      <Membrane top="55%" right="40%" size={24} mb="rgba(255,255,255,.03)" mf="rgba(255,255,255,.14)" spd="spin-cw 48s"   delay={3}/>

      {/* ── Puntos flotantes ── */}
      <Dot bottom="30%" left="14%"  size={11} fill="#F32769"              anim="float-x" delay={0}/>
      <Dot top="48%"   left="48%"  size={8}  fill="rgba(14,14,14,.22)"   anim="float-y" delay={1.5}/>
      <Dot top="28%"   right="36%" size={7}  fill="rgba(14,14,14,.18)"   anim="float-d" delay={2.5}/>

      {/* Dot grid */}
      <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(rgba(14,14,14,0.12) 1px, transparent 1px)', backgroundSize:'28px 28px', pointerEvents:'none', maskImage:'linear-gradient(to right, transparent, rgba(0,0,0,0.35) 30%, rgba(0,0,0,0.35) 70%, transparent)' }}/>

      <div className="wrap" style={{ width:'100%', position:'relative', zIndex:2, paddingTop:'3rem', paddingBottom:'7rem' }}>
        <motion.div variants={st} initial="hidden" animate="show" style={{ maxWidth:780 }}>
          <motion.div variants={it} style={{ marginBottom:'2rem' }}>
            <span className="badge badge-dark">
              <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--lime)', display:'inline-block', animation:'blink 2s infinite' }}/>
              Lanzamiento 2026 · Lima, Perú
            </span>
          </motion.div>
          <motion.h1 variants={it} className="t-out t-xl" style={{ marginBottom:'1.8rem', color:'var(--dark)' }}>
            Bionegocios<br/>
            <span style={{ color:'var(--rose)', fontWeight:700 }}>rentables</span><br/>
            para América Latina
          </motion.h1>
          <motion.div variants={it}>
            <div style={{ width:80, height:4, background:'var(--dark)', borderRadius:2, marginBottom:'2rem' }}/>
          </motion.div>
          <motion.p variants={it} className="lead on-lime" style={{ maxWidth:560, marginBottom:'2.5rem', fontFamily:'var(--fout)' }}>
            No somos una escuela de negocios. Somos la plataforma de inteligencia estratégica que convierte la biodiversidad de América Latina en activos económicos de impacto global.
          </motion.p>
          <motion.div variants={it} style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
            <a href="#curso" className="btn btn-rose btn-lg">Ver Biotech Sprint 01 →</a>
            <a href="#libro" className="btn btn-outline btn-lg">Descubre el Bio Business Playbook vol. 1</a>
          </motion.div>
        </motion.div>
      </div>

      <div style={{ position:'absolute', bottom:-1, left:0, right:0, zIndex:5 }}>
        <svg viewBox="0 0 1440 110" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width:'100%', height:110, display:'block' }}>
          <path d="M0,82 C180,30 420,100 720,40 C1020,8 1260,85 1440,58 L1440,110 L0,110 Z" fill="rgba(14,14,14,0.28)"/>
          <path d="M0,92 C220,48 460,108 740,58 C1020,22 1260,95 1440,68 L1440,110 L0,110 Z" fill="var(--dark)"/>
        </svg>
      </div>
    </section>
  )
}
