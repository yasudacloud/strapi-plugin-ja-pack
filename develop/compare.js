'use strict';

const target = [
  {
    source: './node_modules/@strapi/admin/admin/src/translations/en.json',
    dest: './node_modules/@strapi/admin/admin/src/translations/ja.json',
    prefix: ''
  },
  {
    source: './node_modules/@strapi/plugin-content-type-builder/admin/src/translations/en.json',
    dest: './node_modules/@strapi/plugin-content-type-builder/admin/src/translations/ja.json',
    prefix: 'content-type-builder'
  },
  {
    source: './node_modules/@strapi/plugin-email/admin/src/translations/en.json',
    dest: './node_modules/@strapi/plugin-email/admin/src/translations/ja.json',
    prefix: 'email'
  },
  {
    source: './node_modules/@strapi/plugin-i18n/admin/src/translations/en.json',
    prefix: 'i18n'
  },
  {
    source: './node_modules/@strapi/plugin-upload/admin/src/translations/en.json',
    dest: './node_modules/@strapi/plugin-upload/admin/src/translations/ja.json',
    prefix: 'upload'
  },
  {
    source: './node_modules/@strapi/plugin-users-permissions/admin/src/translations/en.json',
    dest: './node_modules/@strapi/plugin-users-permissions/admin/src/translations/ja.json',
    prefix: 'users-permissions'
  }
]

/**
 * Extract translations with missing Japanese
 * @return {Promise<void>}
 */
async function main() {
  let translations = {};
  for (const lang of target) {
    const source = (await import(`${__dirname}/../../../../${lang.source}`, {with: {type: "json"}})).default
    let pluginTranslation;
    if (!lang.dest) {
      // Add all of them since they are only in English
      pluginTranslation = Object.keys(source);
    } else {
      // What is in English but not in Japanese
      const dest = (await import(`${__dirname}/../../../../${lang.dest}`, {with: {type: "json"}})).default
      const sourceKeys = Object.keys(source)
      const destKeys = Object.keys(dest)
      const targetKeys = sourceKeys.filter(sourceKey => !destKeys.some(destKey => sourceKey === destKey))
      pluginTranslation = targetKeys;
    }
    for (const targetKey of pluginTranslation) {
      const key = lang.prefix ? `${lang.prefix}.${targetKey}` : targetKey
      if (translations[key]) {
        // The key already exists.
        console.warn(`Multiple translation keys found: ${key}`)
      }
      translations[key] = ''
    }
  }
  console.log("\n\n");
  console.log(JSON.stringify(translations));
}

(() => {
  main()
})()
