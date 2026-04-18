/**
 * UTM builder — convención oficial Bio Business School.
 *
 * source  = 'bbs'             (siempre, el site es el source)
 * medium  = 'web'             (siempre, canal propio)
 * campaign = identificador del producto/campaña
 * content  = ubicación exacta en la página (dónde se hizo click)
 */

/**
 * Devuelve `url` con los parámetros UTM añadidos.
 * Preserva query strings existentes.
 */
export function withUtm(url, { campaign, content }) {
  try {
    const u = new URL(url)
    u.searchParams.set('utm_source', 'bbs')
    u.searchParams.set('utm_medium', 'web')
    if (campaign) u.searchParams.set('utm_campaign', campaign)
    if (content)  u.searchParams.set('utm_content', content)
    return u.toString()
  } catch {
    // URL inválida — devolver sin modificar
    return url
  }
}

// Campañas definidas
export const CAMPAIGNS = {
  PLAYBOOK_DIGITAL: 'playbook_digital',
  PLAYBOOK_IMPRESO: 'playbook_impreso',
  SPRINT_01:        'sprint01',
  COMMUNITY:        'community_whatsapp',
}
