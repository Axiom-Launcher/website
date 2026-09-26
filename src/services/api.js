import { env } from '../config/env.js'

export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function apiRequest(path, options = {}) {
  if (!env.apiBaseUrl) throw new ApiError('The Axiom API is not configured.', 503)

  const response = await fetch(`${env.apiBaseUrl}${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) throw new ApiError('The request could not be completed.', response.status)
  if (response.status === 204) return null
  return response.json()
}
