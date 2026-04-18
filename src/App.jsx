import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Home from './pages/Home.jsx'

const Sprint01 = lazy(() => import('./pages/Sprint01.jsx'))
const Privacy  = lazy(() => import('./pages/Privacy.jsx'))

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ minHeight:'100vh' }}/>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sprint01" element={<Sprint01 />} />
          <Route path="/privacidad" element={<Privacy />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
