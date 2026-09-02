import { useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import ProgramaHero from '../components/programa/ProgramaHero.jsx'
import FichaTecnica from '../components/programa/FichaTecnica.jsx'
import BonusExclusivo from '../components/programa/BonusExclusivo.jsx'
import RizomaBlock from '../components/programa/RizomaBlock.jsx'
import PrecioRepetido from '../components/programa/PrecioRepetido.jsx'
import NoEsParaTi from '../components/programa/NoEsParaTi.jsx'
import NotaPertenencia from '../components/programa/NotaPertenencia.jsx'
import FloatingCtaBar from '../components/programa/FloatingCtaBar.jsx'
import { PROGRAMAS } from '../data/programas.js'

export default function ProgramaPage() {
  const { slug } = useParams()
  const programa = PROGRAMAS.find(p => p.slug === slug)

  useEffect(() => {
    if (!programa) return

    document.title = `${programa.titulo} | Bio Business School`

    const metaDesc = document.querySelector('meta[name="description"]')
    const prevDesc = metaDesc ? metaDesc.getAttribute('content') : null
    if (metaDesc) metaDesc.setAttribute('content', programa.notaCorta)

    const canonicalLink = document.querySelector('link[rel="canonical"]')
    const prevCanonical = canonicalLink ? canonicalLink.getAttribute('href') : null
    const pageUrl = `https://biobusinessschool.org/programas/${programa.slug}`
    if (canonicalLink) canonicalLink.setAttribute('href', pageUrl)

    const ogUrl = document.querySelector('meta[property="og:url"]')
    const prevOgUrl = ogUrl ? ogUrl.getAttribute('content') : null
    if (ogUrl) ogUrl.setAttribute('content', pageUrl)

    const ogTitle = document.querySelector('meta[property="og:title"]')
    const prevOgTitle = ogTitle ? ogTitle.getAttribute('content') : null
    if (ogTitle) ogTitle.setAttribute('content', `${programa.titulo} | Bio Business School`)

    const ogDesc = document.querySelector('meta[property="og:description"]')
    const prevOgDesc = ogDesc ? ogDesc.getAttribute('content') : null
    if (ogDesc) ogDesc.setAttribute('content', programa.notaCorta)

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: programa.titulo,
      description: programa.notaCorta,
      provider: { '@type': 'EducationalOrganization', name: 'Bio Business School' },
      offers: {
        '@type': 'Offer',
        price: programa.status === 'live' ? programa.precioRegular : programa.precioDescuento,
        priceCurrency: 'PEN',
        availability: programa.status === 'live' ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
      },
    })
    document.head.appendChild(script)

    window.scrollTo(0, 0)

    return () => {
      document.title = 'Bio Business School'
      if (metaDesc && prevDesc) metaDesc.setAttribute('content', prevDesc)
      if (canonicalLink && prevCanonical) canonicalLink.setAttribute('href', prevCanonical)
      if (ogUrl && prevOgUrl) ogUrl.setAttribute('content', prevOgUrl)
      if (ogTitle && prevOgTitle) ogTitle.setAttribute('content', prevOgTitle)
      if (ogDesc && prevOgDesc) ogDesc.setAttribute('content', prevOgDesc)
      document.head.removeChild(script)
    }
  }, [programa])

  if (!programa) return <Navigate to="/#programas" replace />

  return (
    <>
      <a href="#main" className="skip-link" style={{ position: 'absolute', left: -9999, top: 0 }}>Ir al contenido</a>
      <Nav/>
      <main id="main">
        <ProgramaHero programa={programa}/>
        <FichaTecnica programa={programa}/>
        <BonusExclusivo programa={programa}/>
        <PrecioRepetido programa={programa}/>
        <RizomaBlock rizoma={programa.rizoma}/>
        <NoEsParaTi items={programa.noEsParaTi}/>
        <NotaPertenencia/>
      </main>
      <Footer/>
      <FloatingCtaBar programa={programa}/>
    </>
  )
}
