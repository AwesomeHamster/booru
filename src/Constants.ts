/**
 * @packageDocumentation
 * @module Constants
 */

import { RequestInit } from 'node-fetch'
import siteJson from './sites.json'
import Site from './structures/Site'
import SiteInfo from './structures/SiteInfo'

type GelTags = {
  [key: string]: string
  'rating:e': 'rating:explicit'
  'rating:q': 'rating:questionable'
  'rating:s': 'rating:safe'
}

const expandedTags: GelTags = {
  'rating:e': 'rating:explicit',
  'rating:q': 'rating:questionable',
  'rating:s': 'rating:safe',
}

/**
 * A map of site url/{@link SiteInfo}
 */
export const sites: Record<string, SiteInfo> = siteJson

/**
 * Custom error type for when the boorus error or for user-side error, not my code (probably)
 *
 * The name of the error is `BooruError`
 *
 * @type {Error}
 */
export class BooruError extends Error {
  constructor(message: Error | string | undefined) {
    super(message instanceof Error ? message.message : message)

    if (message instanceof Error) {
      this.stack = message.stack
    } else {
      Error.captureStackTrace(this, BooruError)
    }

    this.name = 'BooruError'
  }
}

export const VERSION: string = '2.4.1'

/**
 * The user-agent to use for searches
 *
 * @private
 */
export const userAgent: string = `booru v${VERSION} (https://github.com/AtlasTheBot/booru)`

/**
 * Expands tags based on a simple map, used for gelbooru/safebooru/etc compat :(
 *
 * @private
 * @param {String[]} tags The tags to expand
 */
function expandTags(tags: string[]): string[] {
  return tags.map((v) => {
    const ex = expandedTags[v.toLowerCase()]
    return encodeURI(ex ? ex : v)
  })
}

/**
 * Create a full uri to search with
 *
 * @private
 * @param {string} domain The domain to search
 * @param {Site} site The site to search
 * @param {string[]} [tags=[]] The tags to search for
 * @param {number} [limit=100] The limit for images to return
 * @param {number} [page=0] The page to get
 */
export function searchURI(
  site: Site,
  tags: string[] = [],
  limit: number = 100,
  page: number,
): string {
  // eslint-disable-next-line prefer-template
  return (
    `http${site.insecure ? '' : 's'}://${site.domain}${site.api.search}` +
    `${site.tagQuery}=${expandTags(tags).join('+')}&limit=${limit}&${
      site.paginate
    }=${page}`
  )
}

/**
 * The default options to use for requests
 * <p>I could document this better but meh
 *
 * @private
 */
export const defaultOptions: RequestInit = {
  // Disable conventions because we're dealing with http headers
  headers: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Accept: 'application/json, application/xml;q=0.9, */*;q=0.8',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'User-Agent': userAgent,
  },
}
