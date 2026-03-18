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
    <div className="grain">
      <Nav />
      <Hero />
      <hr className="rule" />
      <Problem />
      <hr className="rule" />
      <BioBuilder />
      <hr className="rule" />
      <Course />
      <hr className="rule" />
      <Book />
      <hr className="rule" />
      <Community />
      <Team />
      <Footer />
    </div>
  )
}
