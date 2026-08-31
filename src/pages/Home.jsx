import Nav from '../components/Nav.jsx'
import Hero from '../components/Hero.jsx'
import TresEjes from '../components/TresEjes.jsx'
import Programas from '../components/Programas.jsx'
import Footer from '../components/Footer.jsx'

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link" style={{ position:'absolute', left:-9999, top:0 }}>Ir al contenido</a>
      <Nav/>
      <main id="main">
        <Hero/>
        <TresEjes/>
        <Programas/>
      </main>
      <Footer/>
    </>
  )
}
