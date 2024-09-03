CURRENT = ../admin/src/translations/ja.json
DIFF = dst/diff.json
ML_TRANSLATED = src/translated.json
MERGED = dst/merged.json

clone:;      git clone --branch main https://github.com/strapi/strapi.git src/strapi
compare:;    node --experimental-json-modules compare.js > ${DIFF}
merge:;      node --experimental-json-modules merge.js ${CURRENT} ${ML_TRANSLATED} > ${MERGED}
