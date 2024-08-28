'use strict';
const process = require("node:process");

const outOptions = {
  withValue: true, // Output JSON with English value instead of an empty string.
  indent: 2
}
const lang = {
  translated: process.argv[3],
  current: process.argv[2],
};


/**
 * Overwrite machine translations with previous natural translations
 * @return {Promise<void>}
 */
async function main() {

  // Import json
  const translated = (await import(`${__dirname}/${lang.translated}`, { with: {type: "json"} })).default
  const current = (await import(`${__dirname}/${lang.current}`, { with: {type: "json"} })).default

  let output = {};
  for (const key of Object.keys(translated)) {
    if (output.hasOwnProperty(key)) console.warn(`WARN: Conflict Key: ${key}`)
    output[key] = (current.hasOwnProperty(key) && current[key]) ? current[key] : translated[key]
  }

  console.log(JSON.stringify(output, null, outOptions.indent));
}

(() => {
  main()
})()
