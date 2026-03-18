import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Problem from './components/Problem.jsx'
import BioBuilder from './components/BioBuilder.jsx'
import Course from './components/Course.jsx'
import Book from './components/Book.jsx'
import Community from './components/Community.jsx'
import Team from './components/Team.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      {/* Noise grain overlay */}
      <div className="noise" aria-hidden="true"/>
      <Nav/>
      <main>
        <Hero/>
        <hr className="divider"/>
        <Problem/>
        <hr className="divider"/>
        <BioBuilder/>
        <hr className="divider"/>
        <Course/>
        <hr className="divider"/>
        <Book/>
        <hr className="divider"/>
        <Community/>
        <Team/>
      </main>
      <Footer/>
    </>
  )
}
