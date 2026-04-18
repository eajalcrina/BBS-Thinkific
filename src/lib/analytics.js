/**
 * Analytics helper — GA4 event tracking with graceful fallback.
 *
 * - El script gtag.js se carga desde index.html; aquí solo exponemos
 *   `track()` que llama a `window.gtag(...)` si está disponible.
 * - En dev (import.meta.env.DEV), no disparamos eventos pero sí logueamos en consola.
 * - El ID debe mantenerse sincronizado con index.html.
 */

export const GA_MEASUREMENT_ID = 'G-TXYZ6HK54H'

const isDev = typeof import.meta !== 'undefined' && import.meta.env?.DEV

/**
 * Dispara un evento de GA4.
 * @param {string} name  — nombre del evento (snake_case, ej. 'cta_click')
 * @param {Record<string, string|number|boolean>} [params] — parámetros adicionales
 */
export function track(name, params = {}) {
  if (isDev) {
    // eslint-disable-next-line no-console
    console.debug('[track]', name, params)
    return
  }
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params)
  }
}

/**
 * Helper específico para clicks en CTA.
 * @param {string} ctaId     — identificador legible (ej. 'hero_sprint_01')
 * @param {string} [location] — dónde está el CTA (ej. 'home_hero')
 * @param {string} [destination] — URL o anchor destino
 */
export function trackCta(ctaId, location, destination) {
  track('cta_click', {
    cta_id: ctaId,
    cta_location: location,
    cta_destination: destination,
  })
}

/**
 * Helper para clicks en links externos.
 * @param {string} url
 * @param {string} [label]
 */
export function trackOutbound(url, label) {
  track('outbound_click', {
    outbound_url: url,
    outbound_label: label,
  })
}

/**
 * Helper para tracking de formularios.
 * @param {string} formId
 * @param {'submit' | 'success' | 'error'} action
 */
export function trackForm(formId, action) {
  track('form_' + action, { form_id: formId })
}
