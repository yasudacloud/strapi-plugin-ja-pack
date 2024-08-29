'use strict';

const inputOptions = {
  remoteRepo: false // If true, retrieve files from GitHub over HTTP (takes more time than local repository).
}
const outOptions = {
  withValue: true, // Output JSON with English value instead of an empty string.
  indent: 2
}

/**
 * Get JSON file from local path
 * @param path
 * @returns {Promise<*>}
 */
async function fetchLocalJson(path) {
  return (await import(`${__dirname}/src/strapi/${path}`, {with: {type: "json"}})).default
}

/**
 * Get the hash of the latest commit at the main branch
 * ex. curl -s -H "Accept: application/vnd.github.v3+json" \
 *    'https://api.github.com/repos/strapi/strapi/commits?sha=main&per_page=1' \
 *    |jq -r '.[0].sha'
 * @param branch
 * @returns {Promise<*>}
 */
async function fetchHash(branch) {
  const throwError = e => { throw new Error(e) }
  const endpoint = `https://api.github.com/repos/strapi/strapi/commits?sha=${branch}&per_page=1`
  const headers= { 'Accept': 'application/vnd.github.v3+json' }
  const isValid = (json) => json && Array.isArray(json) && json.length > 0 && json[0].hasOwnProperty('sha')

  try {
    const res = await fetch(endpoint, { headers: headers })
    if (! res.ok) throwError(`Network response was not ok. status: ${res.status}`)

    const json = await res.json()
    return isValid(json) ? json[0]['sha'] : throwError(`Invalid JSON format: ${json}`)
  } catch(e) {
    throwError(e)
  }
}

/**
 * Get the path of en.json in the projects folder
 * ex. curl -H 'Accept: application/json' \
 *     "https://github.com/strapi/strapi/tree-list/$sha" \
 *     |jq '.paths[]|select(contains("en.json"))'
 * @param hash
 * @returns {Promise<string[{source: string, prefix: string}]>}
 */
async function fetchPackages(hash) {
  const throwError = e => { throw new Error(e) }
  const endpoint = `https://github.com/strapi/strapi/tree-list/${hash}`
  const headers= { 'Accept': 'application/json' }
  const isValid = json => json && json.hasOwnProperty('paths') && Array.isArray(json.paths) && json.paths.length > 0

  try {
    const res = await fetch(endpoint, { headers: headers })
    if (! res.ok) throwError(`Network response was not ok. status: ${res.status}`)

    const json = await res.json()
    if (! isValid(json))  throwError(`Invalid JSON format: ${json}`)

    return json.paths
      .filter(path => {
        return path.includes('packages')
          && !path.includes('packages/generators')
          && /admin\/src\/translations\/en\.json/.test(path)
      })
      .map(path => {
        const match = path.match(/^(.+)\/(.+)\/(admin\/src\/translations)\/en\.json$/)
        if (! match) throwError("No matching string found.")

        const source = `${match[1]}/${match[2]}/${match[3]}`
        const prefix = match[2] === 'admin' ? '' : match[2]
        return {
          source: source,
          prefix: prefix
        }
      })
  } catch(e) {
    throwError(e)
  }
}

/**
 * Get the file at the specified path from the corresponding branch
 * @param branch
 * @param path
 * @returns {Promise<any>}
 */
async function fetchRaw(branch, path) {
  if (! inputOptions.remoteRepo) {
    return fetchLocalJson(path)
  }

  const throwError = e => { throw new Error(e) }
  const endpoint = `https://raw.githubusercontent.com/strapi/strapi/${branch}/${path}`
  const headers = {}
  const isValid = json => true

  try {
    const res = await fetch(endpoint, { headers: headers })
    if (! res.ok) throwError(`Network response was not ok. status: ${res.status}`)

    const json = await res.json()
    return isValid(json) ? json : throwError(`Invalid JSON format: ${json}`)
  } catch(e) {
    throwError(e)
  }
}

/**
 * Extract translations with missing Japanese
 * @return {Promise<void>}
 */
async function main() {
  const branch = 'main'
  const hash = await fetchHash(branch)

  let out = {};
  for (const pkg of await fetchPackages(hash)) {
    // console.log(`branch: ${branch} | hash: ${hash} | path: ${pkg.source} } prefix: ${pkg.prefix}`)
    const en = await fetchRaw(branch, `${pkg.source}/en.json`)
    // console.log(`en: ${en}`)

    let diffKeys
    try {
      const ja = await fetchRaw(branch, `${pkg.source}/ja.json`)
      // console.log(`ja: ${js}`)
      const enKeys = Object.keys(en)
      const jaKeys = Object.keys(ja)
      diffKeys = enKeys.filter(e => !jaKeys.some(j => e === j))
    } catch (error) {
      // Add all of them since they are only in English
      diffKeys = Object.keys(en);
    }

    for (const diffKey of diffKeys) {
      const key = pkg.prefix ? `${pkg.prefix}.${diffKey}` : diffKey
      if (out[key]) {
        // The key already exists.
        console.warn(`Multiple translation keys found: ${key}`)
      }
      out[key] = outOptions.withValue ? en[diffKey] : ''
    }
  }
  console.log(JSON.stringify(out, null, outOptions.indent));
}

(() => main())()
