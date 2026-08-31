import FadeIn from './FadeIn.jsx'

const PARTNERS = [
  'MIT Professional Education',
  'Universidad de Chicago',
  'CATIE',
  'INCAE',
]

export default function Endorsements() {
  return (
    <section id="respaldan" style={{ background:'var(--fro-bg)', paddingBottom:'6rem' }}>
      <FadeIn>
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
