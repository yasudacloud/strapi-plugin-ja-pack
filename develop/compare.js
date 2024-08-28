'use strict';

const outOptions = {
  withValue: true, // Output JSON with English value instead of an empty string.
  indent: 2
}

// Set path to packages. ref. https://github.com/strapi/strapi/tree/develop/packages/
const basePath = `${__dirname}/../../strapi/packages`
const suffixEn = 'admin/src/translations/en.json'
const suffixJa = 'admin/src/translations/ja.json'
const target = [
  {
    source: 'core/admin',
    prefix: ''
  },
  {
    source: 'core/content-releases',
    prefix: 'content-releases'
  },
  {
    source: 'core/content-type-builder',
    prefix: 'content-type-builder'
  },
  {
    source: 'core/email',
    prefix: 'email'
  },
  {
    source: 'core/upload',
    prefix: 'upload'
  },
  {
    source: 'plugins/cloud',
    prefix: 'cloud'
  },
  {
    source: 'plugins/color-picker',
    prefix: 'color-picker'
  },
  {
    source: 'plugins/documentation',
    prefix: 'documentation'
  },
  {
    source: 'plugins/graphql',
    prefix: 'graphql'
  },
  {
    source: 'plugins/i18n',
    prefix: 'i18n'
  },
  {
    source: 'plugins/sentry',
    prefix: 'sentry'
  },
  {
    source: 'plugins/users-permissions',
    prefix: 'users-permissions'
  },
]

/**
 * Extract translations with missing Japanese
 * @return {Promise<void>}
 */
async function main() {
  let out = {};
  for (const lang of target) {
    const pathEn = `${basePath}/${lang.source}/${suffixEn}`
    const en = (await import(pathEn, {with: {type: "json"}})).default

    let diffKeys
    try {
      const pathJa = `${basePath}/${lang.source}/${suffixJa}`
      const ja = (await import(pathJa, {with: {type: "json"}})).default
      const enKeys = Object.keys(en)
      const jaKeys = Object.keys(ja)
      diffKeys = enKeys.filter(e => !jaKeys.some(j => e === j))
    } catch (error) {
      // Add all of them since they are only in English
      diffKeys = Object.keys(en);
    }

    for (const diffKey of diffKeys) {
      const key = lang.prefix ? `${lang.prefix}.${diffKey}` : diffKey
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
