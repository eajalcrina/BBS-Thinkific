import Nav from '../components/Nav.jsx'
import Hero from '../components/Hero.jsx'
import Manifiesto from '../components/Manifiesto.jsx'
import TresEjes from '../components/TresEjes.jsx'
import Endorsements from '../components/Endorsements.jsx'
import TransformamosProfesionales from '../components/TransformamosProfesionales.jsx'
import TransformamosEmpresas from '../components/TransformamosEmpresas.jsx'
import ComunidadBiobuilders from '../components/ComunidadBiobuilders.jsx'
import RespaldoInstitucional from '../components/RespaldoInstitucional.jsx'
import Footer from '../components/Footer.jsx'

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link" style={{ position:'absolute', left:-9999, top:0 }}>Ir al contenido</a>
      <Nav/>
      <main id="main">
        <Hero/>
        <Endorsements/>
        <Manifiesto/>
        <TransformamosProfesionales/>
        <TransformamosEmpresas/>
        <TresEjes/>
        <ComunidadBiobuilders/>
        <RespaldoInstitucional/>
      </main>
      <Footer/>
    </>
  )
}
