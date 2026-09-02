import FadeIn from './FadeIn.jsx'

const PARTNERS = [
  'MIT Professional Education',
  'Universidad de Chicago',
  'CATIE',
  'INCAE',
  'University of the Arts London',
  'FIT — Fashion Institute of Technology (Nueva York)',
  'Parsons School of Design (Nueva York)',
]

export default function Endorsements() {
  return (
    <section id="respaldan" className="fro-sec" style={{ background:'var(--fro-bg)', paddingBottom:'3rem' }}>
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow" style={{ marginBottom:'1.4rem' }}>Docentes y speakers en</div></FadeIn>
      </div>
      <FadeIn delay={0.06}>
        <div className="fro-marquee" aria-hidden>
          <div className="fro-marquee-track">
            <span>{PARTNERS.map(p => <span key={p}>{p}</span>)}</span>
            <span>{PARTNERS.map(p => <span key={p+'_b'}>{p}</span>)}</span>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
