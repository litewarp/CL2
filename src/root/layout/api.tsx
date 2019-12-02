import camelcaseKeys from 'camelcase-keys'
const AUTH_TOKEN = 'dc182e614a6f23fe91b4a9923b4c6f5b0d645160'

const endpoints = {
  ['aba-ratings']: 'https://www.courtlistener.com/api/rest/v3/aba-ratings',
  attorneys: 'https://www.courtlistener.com/api/rest/v3/attorneys',
  audio: 'https://www.courtlistener.com/api/rest/v3/audio',
  clusters: 'https://www.courtlistener.com/api/rest/v3/clusters',
  courts: 'https://www.courtlistener.com/api/rest/v3/courts',
  ['docket-entries']: 'https://www.courtlistener.com/api/rest/v3/docket-entries',
  dockets: 'https://www.courtlistener.com/api/rest/v3/dockets',
  educations: 'https://www.courtlistener.com/api/rest/v3/educations',
  ['fjc-integrated-database']: 'https://www.courtlistener.com/api/rest/v3/fjc-integrated-database',
  opinions: 'https://www.courtlistener.com/api/rest/v3/opinions',
  ['opinions-cited']: 'https://www.courtlistener.com/api/rest/v3/opinions-cited',
  ['originating-court-information']: 'https://www.courtlistener.com/api/rest/v3/originating-court-information',
  parties: 'https://www.courtlistener.com/api/rest/v3/parties',
  people: 'https://www.courtlistener.com/api/rest/v3/people',
  ['political-affiliations']: 'https://www.courtlistener.com/api/rest/v3/political-affiliations',
  positions: 'https://www.courtlistener.com/api/rest/v3/positions',
  recap: 'https://www.courtlistener.com/api/rest/v3/recap',
  ['recap-documents']: 'https://www.courtlistener.com/api/rest/v3/recap-documents',
  ['recap-fetch']: 'https://www.courtlistener.com/api/rest/v3/recap-fetch',
  ['recap-query']: 'https://www.courtlistener.com/api/rest/v3/recap-query',
  ['retention-events']: 'https://www.courtlistener.com/api/rest/v3/retention-events',
  schools: 'https://www.courtlistener.com/api/rest/v3/schools',
  search: 'https://www.courtlistener.com/api/rest/v3/search',
  sources: 'https://www.courtlistener.com/api/rest/v3/sources',
  tag: 'https://www.courtlistener.com/api/rest/v3/tag',
}
const tokenHeader = { Authorization: `Token ${AUTH_TOKEN}` }
const contentHeader = { Accept: 'application/json' }

const apiHeader = { ...tokenHeader, ...contentHeader }

const searchQuery = (query: {}, url: string) => fetch(`${url}/?q=${query}`, {
  headers: new Headers(apiHeader),
  method: 'GET'
})

export const fetchLatestAudio = () =>
  fetch(`${endpoints.audio}/?order_by=date`, {
    headers: new Headers(apiHeader),
    method: 'GET',
  })
  .then((res) => (res.json()))
  .then((res) => (camelcaseKeys(res, { deep: true })))

export const fetchLatestOpinion = () =>
  fetch(`${endpoints.opinions}/?order_by=data`, {
    headers: new Headers(apiHeader),
    method: 'GET',
  })
  .then((res) => (res.json()))
  .then((res) => (camelcaseKeys(res, { deep: true })))
