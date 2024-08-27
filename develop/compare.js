'use strict';

// Output JSON with English value instead of an empty string.
const withValue= false

// Set path to packages. ref. https://github.com/strapi/strapi/tree/develop/packages/
const basePath = `${__dirname}/../../strapi/packages`
const target = [
  {
    source: 'core/admin/admin/src/translations/en.json',
    dest: 'core/admin/admin/src/translations/ja.json',
    prefix: ''
  },
  {
    source: 'core/content-releases/admin/src/translations/en.json',
    dest: 'core/content-releases/admin/src/translations/ja.json',
    prefix: 'content-releases'
  },
  {
    source: 'core/content-type-builder/admin/src/translations/en.json',
    dest: 'core/content-type-builder/admin/src/translations/ja.json',
    prefix: 'content-type-builder'
  },
  {
    source: 'core/email/admin/src/translations/en.json',
    dest: 'core/email/admin/src/translations/ja.json',
    prefix: 'email'
  },
  {
    source: 'core/upload/admin/src/translations/en.json',
    dest: 'core/upload/admin/src/translations/ja.json',
    prefix: 'upload'
  },
  {
    source: 'plugins/cloud/admin/src/translations/en.json',
    dest: 'plugins/cloud/admin/src/translations/ja.json',
    prefix: 'cloud'
  },
  {
    source: 'plugins/color-picker/admin/src/translations/en.json',
    dest: 'plugins/color-picker/admin/src/translations/ja.json',
    prefix: 'color-picker'
  },
  {
    source: 'plugins/documentation/admin/src/translations/en.json',
    dest: 'plugins/documentation/admin/src/translations/ja.json',
    prefix: 'documentation'
  },
  {
    source: 'plugins/graphql/admin/src/translations/en.json',
    dest: 'plugins/graphql/admin/src/translations/ja.json',
    prefix: 'graphql'
  },
  {
    source: 'plugins/i18n/admin/src/translations/en.json',
    dest: 'plugins/i18n/admin/src/translations/ja.json',
    prefix: 'i18n'
  },
  {
    source: 'plugins/sentry/admin/src/translations/en.json',
    dest: 'plugins/sentry/admin/src/translations/ja.json',
    prefix: 'sentry'
  },
  {
    source: 'plugins/users-permissions/admin/src/translations/en.json',
    dest: 'plugins/users-permissions/admin/src/translations/ja.json',
    prefix: 'users-permissions'
  },
]

/**
 * Extract translations with missing Japanese
 * @return {Promise<void>}
 */
async function main() {
  let translations = {};
  for (const lang of target) {
    const source = (await import(`${basePath}/${lang.source}`, {with: {type: "json"}})).default
    let dest, pluginTranslation
    try {
      dest = (await import(`${basePath}/${lang.dest}`, {with: {type: "json"}})).default
      const sourceKeys = Object.keys(source)
      const destKeys = Object.keys(dest)
      const targetKeys = sourceKeys.filter(sourceKey => !destKeys.some(destKey => sourceKey === destKey))
      pluginTranslation = targetKeys;
    } catch (error) {
      // Add all of them since they are only in English
      pluginTranslation = Object.keys(source);
    }

    for (const targetKey of pluginTranslation) {
      const key = lang.prefix ? `${lang.prefix}.${targetKey}` : targetKey
      if (translations[key]) {
        // The key already exists.
        console.warn(`Multiple translation keys found: ${key}`)
      }
      translations[key] = withValue ? source[targetKey] : ''
    }
  }
  console.log("\n\n");
  console.log(JSON.stringify(translations));
}

(() => {
  main()
})()
