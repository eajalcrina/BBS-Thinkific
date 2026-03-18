import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Mission from './components/Mission.jsx'
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
      <Nav/>
      <main>
        <Hero/>
        <Mission/>
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
