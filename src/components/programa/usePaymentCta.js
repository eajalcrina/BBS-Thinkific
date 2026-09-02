import { useState } from 'react'
import { trackCta } from '../../lib/analytics.js'

export function usePaymentCta(programa) {
  const [status, setStatus] = useState('idle') // idle | loading | sent | error

  const label = !programa.precioDescuento
    ? `Pagar ahora — S/ ${programa.precioRegular} (~USD ${programa.precioRegularUsd})`
    : programa.status === 'live'
      ? `Pagar ahora con ${programa.descuentoPct}% off — S/ ${programa.precioDescuento} (~USD ${programa.precioDescuentoUsd})`
      : `Reserva tu cupo con ${programa.descuentoPct}% off — S/ ${programa.precioDescuento} (~USD ${programa.precioDescuentoUsd})`

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
          form: 'bbs-payment',
          data: {
            programa: programa.slug,
            status: 'pending_checkout',
            pagina_origen: window.location.pathname,
          },
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
