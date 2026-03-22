import FadeIn from './FadeIn.jsx'
import CellCanvas from './CellCanvas.jsx'

export default function BioBuilder() {
  return (
    <section id="biobuilder" className="sec" style={{ background:'var(--cream)', position:'relative', overflow:'hidden' }}>

      <CellCanvas palette="cream"/>

      {/* Animaciones CSS para el diagrama SVG */}
      <style>{`
        @keyframes bb-fn0{0%,100%{transform:translate(0,0)}50%{transform:translate(2px,-4px)}}
        @keyframes bb-fn1{0%,100%{transform:translate(0,0)}50%{transform:translate(4px,-2px)}}
        @keyframes bb-fn2{0%,100%{transform:translate(0,0)}50%{transform:translate(3px,3px)}}
        @keyframes bb-fn3{0%,100%{transform:translate(0,0)}50%{transform:translate(-3px,4px)}}
        @keyframes bb-fn4{0%,100%{transform:translate(0,0)}50%{transform:translate(-4px,2px)}}
        @keyframes bb-fn5{0%,100%{transform:translate(0,0)}50%{transform:translate(-2px,-3px)}}
        @keyframes bb-fn6{0%,100%{transform:translate(0,0)}50%{transform:translate(3px,-3px)}}
        @keyframes bb-scw {from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes bb-sccw{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
        @keyframes bb-pulse{0%,100%{opacity:.88}50%{opacity:1}}
        @keyframes bb-rr1{0%{r:28;opacity:.50}100%{r:52;opacity:0}}
        @keyframes bb-rr2{0%{r:28;opacity:.35}100%{r:62;opacity:0}}
        @keyframes bb-rr3{0%{r:28;opacity:.20}100%{r:74;opacity:0}}
        .bb-ng{transform-box:fill-box;transform-origin:center;}
        .bb-n0{animation:bb-fn0 6.0s ease-in-out infinite;}
        .bb-n1{animation:bb-fn1 5.5s ease-in-out infinite;animation-delay:-.8s;}
        .bb-n2{animation:bb-fn2 6.8s ease-in-out infinite;animation-delay:-.4s;}
        .bb-n3{animation:bb-fn3 5.8s ease-in-out infinite;animation-delay:-1.2s;}
        .bb-n4{animation:bb-fn4 6.4s ease-in-out infinite;animation-delay:-.6s;}
        .bb-n5{animation:bb-fn5 5.2s ease-in-out infinite;animation-delay:-1.0s;}
        .bb-n6{animation:bb-fn6 7.0s ease-in-out infinite;animation-delay:-.2s;}
        .bb-rr{fill:none;stroke:rgba(14,14,14,.18);stroke-width:1;stroke-dasharray:3 5;}
        .bb-r1{animation:bb-rr1 3s ease-out infinite;}
        .bb-r2{animation:bb-rr2 3s ease-out infinite;animation-delay:.9s;}
        .bb-r3{animation:bb-rr3 3s ease-out infinite;animation-delay:1.8s;}
        .bb-rcw {animation:bb-scw  28s linear infinite;transform-box:fill-box;transform-origin:center;}
        .bb-rccw{animation:bb-sccw 42s linear infinite;transform-box:fill-box;transform-origin:center;}
        .bb-cp  {animation:bb-pulse 4s ease-in-out infinite;}
        .bb-hdr {animation:bb-scw  18s linear infinite;}
        .bb-row-mba{padding:9px 14px;border-bottom:1px dashed rgba(14,14,14,.06);font-size:0.82rem;color:rgba(14,14,14,.42);line-height:1.5;}
        .bb-row-mba:last-child{border-bottom:none;}
        .bb-row-bbs{padding:9px 14px;border-bottom:1px dashed rgba(14,14,14,.08);font-size:0.82rem;color:#0E0E0E;font-weight:500;line-height:1.5;display:flex;align-items:flex-start;gap:8px;}
        .bb-row-bbs:last-child{border-bottom:none;}
        .bb-bullet{position:relative;width:13px;height:13px;flex-shrink:0;margin-top:3px;}
        .bb-bullet-ring{position:absolute;inset:-3px;border-radius:50%;border:1px dashed rgba(14,14,14,.16);}
        .bb-bullet-inner{width:100%;height:100%;border-radius:50%;background:#C1F400;border:1px solid rgba(14,14,14,.22);display:flex;align-items:center;justify-content:center;}
        .bb-bullet-nuc{width:4px;height:4px;border-radius:50%;background:rgba(14,14,14,.30);}
        @media(max-width:860px){.bb-grid{grid-template-columns:1fr!important}}
        @media(max-width:860px){.bb-table-grid{grid-template-columns:1fr!important}}
      `}</style>

      <div className="wrap" style={{ position:'relative', zIndex:2 }}>
        <FadeIn>
          <div className="label" style={{ marginBottom:'1rem' }}>La solución</div>
        </FadeIn>
        <FadeIn delay={0.08}>
          <h2 className="t-out t-lg" style={{ marginBottom:'0.9rem', color:'var(--dark)' }}>
            Formamos <em style={{ fontStyle:'normal', color:'var(--rose)', fontWeight:700 }}>BioBuilders</em>, no MBAs
          </h2>
        </FadeIn>
        <FadeIn delay={0.14}>
          <p className="lead" style={{ color:'var(--t-dark2)', maxWidth:580, marginBottom:'3rem' }}>
            El BioBuilder es un líder híbrido: domina la ciencia, la tecnología y las finanzas de impacto. El perfil que América Latina necesita para transformar su abundancia biológica en economía real.
          </p>
        </FadeIn>

        <div style={{ display:'grid', gridTemplateColumns:'420px 1fr', gap:'3rem', alignItems:'start' }} className="bb-grid">

          {/* ── DIAGRAMA SVG ── */}
          <FadeIn delay={0.1}>
            <svg viewBox="0 0 560 500" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', display:'block', overflow:'visible' }}>
              <defs>
                <marker id="bb-arr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                  <path d="M0,0 L7,3.5 L0,7 Z" fill="rgba(14,14,14,.38)"/>
                </marker>
              </defs>

              {/* Anillos de órbita */}
              <circle cx="280" cy="245" r="230" fill="none" stroke="rgba(14,14,14,.04)" strokeWidth="1" strokeDasharray="2 8"/>
              <circle cx="280" cy="245" r="190" fill="none" stroke="rgba(14,14,14,.05)" strokeWidth="1" strokeDasharray="2 6"/>

              {/* Nodo 0 — Bio Estrategia */}
              <g className="bb-ng bb-n0">
                <circle cx="280" cy="55" className="bb-rr bb-r1"/>
                <circle cx="280" cy="55" className="bb-rr bb-r2"/>
                <circle cx="280" cy="55" className="bb-rr bb-r3"/>
                <line x1="280" y1="83" x2="280" y2="182" stroke="rgba(14,14,14,.20)" strokeWidth="1.2" strokeDasharray="4 5" markerEnd="url(#bb-arr)"/>
                <circle cx="280" cy="55" r="36" fill="rgba(193,244,0,.10)" stroke="rgba(14,14,14,.14)" strokeWidth="1" strokeDasharray="3 5"/>
                <circle cx="280" cy="55" r="26" fill="#C1F400" stroke="rgba(14,14,14,.28)" strokeWidth="1.5"/>
                <circle cx="286" cy="48" r="4.5" fill="rgba(14,14,14,.22)"/>
                <circle cx="273" cy="52" r="3"   fill="rgba(14,14,14,.16)"/>
                <text x="280" y="14" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="500" fontSize="14" fill="#0E0E0E" letterSpacing=".2">Bio Estrategia</text>
              </g>

              {/* Nodo 1 — Deep Tech */}
              <g className="bb-ng bb-n1">
                <circle cx="428" cy="123" className="bb-rr bb-r1" style={{ animationDelay:'-.4s' }}/>
                <circle cx="428" cy="123" className="bb-rr bb-r2" style={{ animationDelay:'.5s' }}/>
                <circle cx="428" cy="123" className="bb-rr bb-r3" style={{ animationDelay:'1.4s' }}/>
                <line x1="403" y1="140" x2="328" y2="200" stroke="rgba(14,14,14,.20)" strokeWidth="1.2" strokeDasharray="4 5" markerEnd="url(#bb-arr)"/>
                <circle cx="428" cy="123" r="36" fill="rgba(193,244,0,.10)" stroke="rgba(14,14,14,.14)" strokeWidth="1" strokeDasharray="3 5"/>
                <circle cx="428" cy="123" r="26" fill="#C1F400" stroke="rgba(14,14,14,.28)" strokeWidth="1.5"/>
                <circle cx="435" cy="115" r="4.5" fill="rgba(14,14,14,.22)"/>
                <circle cx="420" cy="118" r="3"   fill="rgba(14,14,14,.16)"/>
                <text x="476" y="118" textAnchor="start" fontFamily="Barlow Condensed,sans-serif" fontWeight="500" fontSize="14" fill="#0E0E0E" letterSpacing=".2">Deep Tech</text>
              </g>

              {/* Nodo 2 — Finanzas Regenerativas */}
              <g className="bb-ng bb-n2">
                <circle cx="465" cy="287" className="bb-rr bb-r1" style={{ animationDelay:'-.8s' }}/>
                <circle cx="465" cy="287" className="bb-rr bb-r2" style={{ animationDelay:'.1s' }}/>
                <circle cx="465" cy="287" className="bb-rr bb-r3" style={{ animationDelay:'1.0s' }}/>
                <line x1="437" y1="280" x2="347" y2="257" stroke="rgba(14,14,14,.20)" strokeWidth="1.2" strokeDasharray="4 5" markerEnd="url(#bb-arr)"/>
                <circle cx="465" cy="287" r="36" fill="rgba(193,244,0,.10)" stroke="rgba(14,14,14,.14)" strokeWidth="1" strokeDasharray="3 5"/>
                <circle cx="465" cy="287" r="26" fill="#C1F400" stroke="rgba(14,14,14,.28)" strokeWidth="1.5"/>
                <circle cx="472" cy="279" r="4.5" fill="rgba(14,14,14,.22)"/>
                <circle cx="457" cy="282" r="3"   fill="rgba(14,14,14,.16)"/>
                <text x="509" y="283" textAnchor="start" fontFamily="Barlow Condensed,sans-serif" fontWeight="500" fontSize="14" fill="#0E0E0E" letterSpacing=".2">Finanzas</text>
                <text x="509" y="297" textAnchor="start" fontFamily="Barlow Condensed,sans-serif" fontWeight="500" fontSize="14" fill="#0E0E0E" letterSpacing=".2">Regenerativas</text>
              </g>

              {/* Nodo 3 — Gobernanza */}
              <g className="bb-ng bb-n3">
                <circle cx="371" cy="417" className="bb-rr bb-r1" style={{ animationDelay:'-1.2s' }}/>
                <circle cx="371" cy="417" className="bb-rr bb-r2" style={{ animationDelay:'-.3s' }}/>
                <circle cx="371" cy="417" className="bb-rr bb-r3" style={{ animationDelay:'.6s' }}/>
                <line x1="356" y1="391" x2="306" y2="310" stroke="rgba(14,14,14,.20)" strokeWidth="1.2" strokeDasharray="4 5" markerEnd="url(#bb-arr)"/>
                <circle cx="371" cy="417" r="36" fill="rgba(193,244,0,.10)" stroke="rgba(14,14,14,.14)" strokeWidth="1" strokeDasharray="3 5"/>
                <circle cx="371" cy="417" r="26" fill="#C1F400" stroke="rgba(14,14,14,.28)" strokeWidth="1.5"/>
                <circle cx="378" cy="409" r="4.5" fill="rgba(14,14,14,.22)"/>
                <circle cx="363" cy="412" r="3"   fill="rgba(14,14,14,.16)"/>
                <text x="371" y="462" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="500" fontSize="14" fill="#0E0E0E" letterSpacing=".2">Gobernanza</text>
              </g>

              {/* Nodo 4 — Branding Regenerativo */}
              <g className="bb-ng bb-n4">
                <circle cx="189" cy="417" className="bb-rr bb-r1" style={{ animationDelay:'-.6s' }}/>
                <circle cx="189" cy="417" className="bb-rr bb-r2" style={{ animationDelay:'.3s' }}/>
                <circle cx="189" cy="417" className="bb-rr bb-r3" style={{ animationDelay:'1.2s' }}/>
                <line x1="204" y1="391" x2="256" y2="310" stroke="rgba(14,14,14,.20)" strokeWidth="1.2" strokeDasharray="4 5" markerEnd="url(#bb-arr)"/>
                <circle cx="189" cy="417" r="36" fill="rgba(193,244,0,.10)" stroke="rgba(14,14,14,.14)" strokeWidth="1" strokeDasharray="3 5"/>
                <circle cx="189" cy="417" r="26" fill="#C1F400" stroke="rgba(14,14,14,.28)" strokeWidth="1.5"/>
                <circle cx="196" cy="409" r="4.5" fill="rgba(14,14,14,.22)"/>
                <circle cx="181" cy="412" r="3"   fill="rgba(14,14,14,.16)"/>
                <text x="189" y="462" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="500" fontSize="14" fill="#0E0E0E" letterSpacing=".2">Branding</text>
                <text x="189" y="476" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="500" fontSize="14" fill="#0E0E0E" letterSpacing=".2">Regenerativo</text>
              </g>

              {/* Nodo 5 — Biodiversidad */}
              <g className="bb-ng bb-n5">
                <circle cx="95" cy="287" className="bb-rr bb-r1" style={{ animationDelay:'-1.0s' }}/>
                <circle cx="95" cy="287" className="bb-rr bb-r2" style={{ animationDelay:'-.1s' }}/>
                <circle cx="95" cy="287" className="bb-rr bb-r3" style={{ animationDelay:'.8s' }}/>
                <line x1="123" y1="280" x2="213" y2="257" stroke="rgba(14,14,14,.20)" strokeWidth="1.2" strokeDasharray="4 5" markerEnd="url(#bb-arr)"/>
                <circle cx="95" cy="287" r="36" fill="rgba(193,244,0,.10)" stroke="rgba(14,14,14,.14)" strokeWidth="1" strokeDasharray="3 5"/>
                <circle cx="95" cy="287" r="26" fill="#C1F400" stroke="rgba(14,14,14,.28)" strokeWidth="1.5"/>
                <circle cx="102" cy="279" r="4.5" fill="rgba(14,14,14,.22)"/>
                <circle cx="87"  cy="282" r="3"   fill="rgba(14,14,14,.16)"/>
                <text x="46" y="283" textAnchor="end" fontFamily="Barlow Condensed,sans-serif" fontWeight="500" fontSize="14" fill="#0E0E0E" letterSpacing=".2">Biodiversidad</text>
              </g>

              {/* Nodo 6 — Conocimiento Territorial */}
              <g className="bb-ng bb-n6">
                <circle cx="132" cy="123" className="bb-rr bb-r1" style={{ animationDelay:'-.2s' }}/>
                <circle cx="132" cy="123" className="bb-rr bb-r2" style={{ animationDelay:'.7s' }}/>
                <circle cx="132" cy="123" className="bb-rr bb-r3" style={{ animationDelay:'1.6s' }}/>
                <line x1="157" y1="140" x2="232" y2="200" stroke="rgba(14,14,14,.20)" strokeWidth="1.2" strokeDasharray="4 5" markerEnd="url(#bb-arr)"/>
                <circle cx="132" cy="123" r="36" fill="rgba(193,244,0,.10)" stroke="rgba(14,14,14,.14)" strokeWidth="1" strokeDasharray="3 5"/>
                <circle cx="132" cy="123" r="26" fill="#C1F400" stroke="rgba(14,14,14,.28)" strokeWidth="1.5"/>
                <circle cx="139" cy="115" r="4.5" fill="rgba(14,14,14,.22)"/>
                <circle cx="124" cy="118" r="3"   fill="rgba(14,14,14,.16)"/>
                <text x="84" y="118" textAnchor="end" fontFamily="Barlow Condensed,sans-serif" fontWeight="500" fontSize="14" fill="#0E0E0E" letterSpacing=".2">Conocimiento</text>
                <text x="84" y="132" textAnchor="end" fontFamily="Barlow Condensed,sans-serif" fontWeight="500" fontSize="14" fill="#0E0E0E" letterSpacing=".2">Territorial</text>
              </g>

              {/* Nodo central BioBuilder */}
              <circle cx="280" cy="245" r="90" fill="rgba(193,244,0,.07)" stroke="rgba(14,14,14,.06)" strokeWidth="1" strokeDasharray="2 7" className="bb-rccw"/>
              <circle cx="280" cy="245" r="77" fill="none" stroke="rgba(14,14,14,.18)" strokeWidth="1.5" strokeDasharray="4 6" className="bb-rcw"/>
              <circle cx="280" cy="245" r="65" fill="#C1F400" stroke="none" className="bb-cp"/>
              <circle cx="262" cy="228" r="8"   fill="rgba(14,14,14,.07)"/>
              <circle cx="296" cy="222" r="5.5" fill="rgba(14,14,14,.05)"/>
              <circle cx="302" cy="252" r="7"   fill="rgba(14,14,14,.06)"/>
              <circle cx="268" cy="265" r="5"   fill="rgba(14,14,14,.05)"/>
              <text x="280" y="238" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="17" fill="#0E0E0E" letterSpacing="1">BIO BUILDER</text>
              <text x="280" y="257" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="600" fontSize="10.5" fill="rgba(14,14,14,.72)" letterSpacing="2.5">LÍDER HÍBRIDO</text>
            </svg>
          </FadeIn>

          {/* ── TABLA PROPUESTA B ── */}
          <FadeIn delay={0.18}>
            <div style={{ position:'relative' }}>
              {/* halos de fondo */}
              <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:280, height:280, borderRadius:'50%', border:'1px dashed rgba(14,14,14,.05)', pointerEvents:'none' }}/>
              <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:150, height:150, borderRadius:'50%', border:'1px dashed rgba(14,14,14,.04)', pointerEvents:'none' }}/>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, position:'relative' }} className="bb-table-grid">

                {/* Columna MBA */}
                <div style={{ background:'rgba(14,14,14,.03)', borderRadius:14, overflow:'hidden', border:'1px dashed rgba(14,14,14,.10)' }}>
                  <div style={{ padding:'12px 14px 10px', borderBottom:'1px dashed rgba(14,14,14,.08)', display:'flex', alignItems:'center', gap:9 }}>
                    <div style={{ width:24, height:24, borderRadius:'50%', flexShrink:0, background:'rgba(14,14,14,.06)', border:'1.5px dashed rgba(14,14,14,.18)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <div style={{ width:8, height:8, borderRadius:'50%', background:'rgba(14,14,14,.20)' }}/>
                    </div>
                    <span style={{ fontFamily:'var(--fbc)', fontSize:'0.65rem', fontWeight:600, letterSpacing:'0.14em', textTransform:'uppercase', color:'rgba(14,14,14,.38)' }}>MBA Tradicional</span>
                  </div>
                  {['Maximiza retorno financiero a corto plazo','Extrae valor de los ecosistemas','Desconoce la biología molecular y el territorio','Capital que huye de la región','Perfil genérico, reemplazable','Modelos que deterioran la región'].map((t,i,a)=>(
                    <div key={i} className="bb-row-mba" style={i===a.length-1?{borderBottom:'none'}:{}}>{t}</div>
                  ))}
                </div>

                {/* Columna BBS */}
                <div style={{ background:'rgba(193,244,0,.06)', borderRadius:14, overflow:'hidden', border:'1.5px dashed rgba(14,14,14,.14)' }}>
                  <div style={{ padding:'12px 14px 10px', borderBottom:'1px dashed rgba(14,14,14,.10)', background:'rgba(193,244,0,.14)', display:'flex', alignItems:'center', gap:9 }}>
                    <div style={{ position:'relative', width:24, height:24, flexShrink:0 }}>
                      <div className="bb-hdr" style={{ position:'absolute', inset:-5, borderRadius:'50%', border:'1.5px dashed rgba(14,14,14,.22)' }}/>
                      <div style={{ width:'100%', height:'100%', borderRadius:'50%', background:'#C1F400', border:'1.5px solid rgba(14,14,14,.28)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <div style={{ width:8, height:8, borderRadius:'50%', background:'rgba(14,14,14,.28)' }}/>
                      </div>
                    </div>
                    <span style={{ fontFamily:'var(--fbc)', fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:'#0E0E0E' }}>BioBuilder BBS</span>
                  </div>
                  {['Diseña rentabilidad que regenera territorio','Construye valor desde la biodiversidad','Integra ciencia de frontera con visión financiera','Capital que construye soberanía biotecnológica','Perfil híbrido único en América Latina','Bionegocios que auto-financian la regeneración'].map((t,i,a)=>(
                    <div key={i} className="bb-row-bbs" style={i===a.length-1?{borderBottom:'none'}:{}}>
                      <div className="bb-bullet">
                        <div className="bb-bullet-ring"/>
                        <div className="bb-bullet-inner"><div className="bb-bullet-nuc"/></div>
                      </div>
                      {t}
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </FadeIn>

        </div>
      </div>

      {/* TRANSICIÓN FUSIONADA: cream → rose */}
      <div style={{ position:'absolute', bottom:-1, left:0, right:0, zIndex:1 }}>
        <svg viewBox="0 0 1440 110" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width:'100%', height:110, display:'block' }}>
          <path d="M0,82 C180,30 420,100 720,40 C1020,8 1260,85 1440,58 L1440,110 L0,110 Z" fill="rgba(243,39,105,0.22)"/>
          <path d="M0,92 C220,48 460,108 740,58 C1020,22 1260,95 1440,68 L1440,110 L0,110 Z" fill="var(--rose)"/>
        </svg>
      </div>
    </section>
  )
}
