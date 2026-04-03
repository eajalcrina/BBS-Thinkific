import { useEffect } from 'react'
import SprintNav from '../components/sprint01/SprintNav.jsx'
import SprintHero from '../components/sprint01/SprintHero.jsx'
import SprintProblem from '../components/sprint01/SprintProblem.jsx'
import SprintCamino from '../components/sprint01/SprintCamino.jsx'
import SprintStarterKit from '../components/sprint01/SprintStarterKit.jsx'
import SprintModulos from '../components/sprint01/SprintModulos.jsx'
import SprintIncluye from '../components/sprint01/SprintIncluye.jsx'
import SprintParaQuien from '../components/sprint01/SprintParaQuien.jsx'
import SprintPricing from '../components/sprint01/SprintPricing.jsx'
import SprintCreadores from '../components/sprint01/SprintCreadores.jsx'
import SprintFAQ from '../components/sprint01/SprintFAQ.jsx'
import SprintCTAFinal from '../components/sprint01/SprintCTAFinal.jsx'
import Footer from '../components/Footer.jsx'

export default function Sprint01() {
  useEffect(() => {
    document.title = 'Biotech Sprint 01 — Del Problema a la Inversión | Bio Business School'
    window.scrollTo(0, 0)
    return () => { document.title = 'Bio Business School' }
  }, [])

  return (
    <>
      <SprintNav />
      <main>
        <SprintHero />
        <SprintProblem />
        <SprintCamino />
        <SprintStarterKit />
        <SprintModulos />
        <SprintIncluye />
        <SprintParaQuien />
        <SprintPricing />
        <SprintCreadores />
        <SprintFAQ />
        <SprintCTAFinal />
      </main>
      <Footer />
    </>
  )
}
