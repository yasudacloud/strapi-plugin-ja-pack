'use strict';

const basePath = `${__dirname}/../admin/src/translations`
const lang = { base: 'translated.json', keep: 'ja.json' };


/**
 * Overwrite machine translations with previous natural translations
 * @return {Promise<void>}
 */
async function main() {

  // Import json
  const base = (await import(`${basePath}/${lang.base}`, { with: {type: "json"} })).default
  const keep = (await import(`${basePath}/${lang.keep}`, { with: {type: "json"} })).default

  let output = {};
  for (const key of Object.keys(base)) {
    if (output.hasOwnProperty(key)) console.warn(`WARN: Conflict Key: ${key}`)
    output[key] = (keep.hasOwnProperty(key) && keep[key]) ? keep[key] : base[key]
  }

  console.log("\n\n");
  console.log(JSON.stringify(output));
}

(() => {
  main()
})()
