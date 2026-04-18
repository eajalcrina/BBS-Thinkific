import Nav from '../components/Nav.jsx'
import HeroFroohm from '../components/HeroFroohm.jsx'
import Problem from '../components/Problem.jsx'
import BioBuilder from '../components/BioBuilder.jsx'
import Course from '../components/Course.jsx'
import Book from '../components/Book.jsx'
import Community from '../components/Community.jsx'
import Team from '../components/Team.jsx'
import Footer from '../components/Footer.jsx'

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link" style={{ position:'absolute', left:-9999, top:0 }}>Ir al contenido</a>
      <Nav/>
      <main id="main">
        <HeroFroohm/>
        <Problem/>
        <BioBuilder/>
        <Course/>
        <Book/>
        <Community/>
        <Team/>
      </main>
      <Footer/>
    </>
  )
}
