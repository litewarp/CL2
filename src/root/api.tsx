import camelcaseKeys from 'camelcase-keys'

const endpoints = {
  abaRatings: 'https://www.courtlistener.com/api/rest/v3/aba-ratings',
  attorneys: 'https://www.courtlistener.com/api/rest/v3/attorneys',
  audio: 'https://www.courtlistener.com/api/rest/v3/audio',
  clusters: 'https://www.courtlistener.com/api/rest/v3/clusters',
  courts: 'https://www.courtlistener.com/api/rest/v3/courts',
  docketEntries: 'https://www.courtlistener.com/api/rest/v3/docket-entries',
  dockets: 'https://www.courtlistener.com/api/rest/v3/dockets',
  educations: 'https://www.courtlistener.com/api/rest/v3/educations',
  fjcIntegratedDatabase: 'https://www.courtlistener.com/api/rest/v3/fjc-integrated-database',
  opinions: 'https://www.courtlistener.com/api/rest/v3/opinions',
  opinionsCited: 'https://www.courtlistener.com/api/rest/v3/opinions-cited',
  originatingCourtInformation: 'https://www.courtlistener.com/api/rest/v3/originating-court-information',
  parties: 'https://www.courtlistener.com/api/rest/v3/parties',
  people: 'https://www.courtlistener.com/api/rest/v3/people',
  politicalAffiliations: 'https://www.courtlistener.com/api/rest/v3/political-affiliations',
  positions: 'https://www.courtlistener.com/api/rest/v3/positions',
  recap: 'https://www.courtlistener.com/api/rest/v3/recap',
  recapDocuments: 'https://www.courtlistener.com/api/rest/v3/recap-documents',
  recapFetch: 'https://www.courtlistener.com/api/rest/v3/recap-fetch',
  recapQuery: 'https://www.courtlistener.com/api/rest/v3/recap-query',
  retentionEvents: 'https://www.courtlistener.com/api/rest/v3/retention-events',
  schools: 'https://www.courtlistener.com/api/rest/v3/schools',
  search: 'https://www.courtlistener.com/api/rest/v3/search',
  sources: 'https://www.courtlistener.com/api/rest/v3/sources',
  tag: 'https://www.courtlistener.com/api/rest/v3/tag',
}

const AUTH_TOKEN = 'dc182e614a6f23fe91b4a9923b4c6f5b0d645160'

const tokenHeader = { Authorization: `Token ${AUTH_TOKEN}` }
const contentHeader = { Accept: 'application/json' }
const apiHeader = { ...tokenHeader, ...contentHeader }

export const apiFetch = (...args) => {
  console.log('FETCH_ARGS', ...args)
  return fetch(...args, {
    headers: new Headers(apiHeader),
    method: 'GET'
  })
  .then((res) => res.json())
  .then((res) => camelcaseKeys(res, { deep: true }))
}
export const fetchLatestAudio = () => apiFetch(`${endpoints.audio}/?order_by=date`)
export const fetchLatestOpinion = () => apiFetch(`${endpoints.clusters}/?order_by=date`)
export const fetchCourts = () => apiFetch(`${endpoints.courts}`)
