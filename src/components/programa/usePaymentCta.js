import { useState } from 'react'
import { trackCta } from '../../lib/analytics.js'

export function usePaymentCta(programa) {
  const [status, setStatus] = useState('idle') // idle | loading | sent | error

  const label = programa.status === 'live'
    ? `Pagar ahora — S/ ${programa.precioRegular} (~USD ${programa.precioRegularUsd})`
    : `Reserva tu cupo con 30% off — S/ ${programa.precioDescuento} (~USD ${programa.precioDescuentoUsd})`

  async function handleClick() {
    trackCta(`programa_${programa.slug}_pagar`, 'programa_cta', programa.mercadopagoUrl || 'pending')

    if (programa.mercadopagoUrl) {
      window.location.href = programa.mercadopagoUrl
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: 'bbs-enroll',
          programa: programa.slug,
          intento_pago: true,
          pagina_origen: window.location.pathname,
        }),
      })
      if (!res.ok) throw new Error('request_failed')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return { label, status, handleClick }
}
