const React = require('react')

const pluginId = require("./pluginId");

export default {
  register(app) {
  },
  bootstrap() {
  },
  async registerTrads({locales}) {
    if (!locales.some(locale => locale === 'ja')) {
      return []
    }

    const translations = await import(`./translations/ja.json`);
    const jaMessages = translations.default;
    jaMessages[`${pluginId}.plugin.name`] = 'Strapi 日本語プラグイン';
    return Promise.resolve([{
      data: jaMessages,
      locale: 'ja'
    }]);
  },
};
