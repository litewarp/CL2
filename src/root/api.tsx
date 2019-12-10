/** @format */

import camelcaseKeys from 'camelcase-keys'
import { Response } from 'express'

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
  originatingCourtInformation:
    'https://www.courtlistener.com/api/rest/v3/originating-court-information',
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

export const apiFetch = async (args: any): Promise<any> => {
  // build url from params
  const url = new URL(args.url)
  if (Object.entries(args.params).length !== 0) {
    Object.keys(args.params).forEach(key => url.searchParams.append(key, args.params[key]))
  }
  // need to type url as any because fetch expects string
  return fetch(url.toString(), {
    headers: new Headers(apiHeader),
    ...args,
  })
    .then(res => res.json() as Promise<any>)
    .then(res => camelcaseKeys(res, { deep: true }))
}
export const fetchLatestAudio = () =>
  apiFetch({
    url: endpoints.audio,
    params: { order_by: 'date' },
  })

export const fetchLatestOpinion = () =>
  apiFetch({
    url: endpoints.clusters,
    params: { order_by: 'date' },
  })
