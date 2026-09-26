const readPublicUrl = (key) => {
  const value = import.meta.env[key]
  if (!value) return ''
  try {
    return new URL(value).toString().replace(/\/$/, '')
  } catch {
    if (import.meta.env.DEV) console.warn(`[Axiom] Ignoring invalid URL in ${key}.`)
    return ''
  }
}

export const env = Object.freeze({
  apiBaseUrl: readPublicUrl('VITE_API_BASE_URL'),
  releasesUrl: readPublicUrl('VITE_RELEASES_URL'),
  statusUrl: readPublicUrl('VITE_STATUS_URL'),
})
