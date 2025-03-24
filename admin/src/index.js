const pluginId = 'ja-pack'

const translationBaseKey = "strapi-plugin-ja-pack"

export default {
  register(app) {
    const hasOriginKey = (app) => {
      const hasJaLocale = app.configurations.translations && app.configurations.translations.ja
      if (!hasJaLocale) {
        return false
      }
      const hasOriginKeys = app.configurations.translations.ja[translationBaseKey]
      if (!hasOriginKeys) {
        return false
      }
      return true
    }
    // 一覧画面
    app.registerHook('Admin/CM/pages/ListView/inject-column-in-table', (e) => {
      if (!hasOriginKey(app)) {
        return e
      }
      if (e.displayedHeaders && e.displayedHeaders.length > 0) {
        e.displayedHeaders = e.displayedHeaders.map(displayHeader => {
          const defaultLabel = displayHeader.label
          if (app.configurations.translations.ja[translationBaseKey][defaultLabel]) {
            displayHeader.label = app.configurations.translations.ja[translationBaseKey][defaultLabel]
          }
          return displayHeader;
        })
      }
      return e
    })

    // 編集画面
    app.registerHook('Admin/CM/pages/EditView/mutate-edit-view-layout', (e) => {
      const hasLayout = e.layout && e.layout.layout
      if (!hasLayout) {
        return e
      }
      if (!hasOriginKey(app)) {
        return e
      }
      const {layout} = e.layout
      const recursiveTranslate = (layout, app) => {
        if (Array.isArray(layout)) {
          for (let i = 0; i < layout.length; i++) {
            recursiveTranslate(layout[i], app)
          }
        } else {
          const defaultLabel = layout.label
          if (app.configurations.translations.ja[translationBaseKey][defaultLabel]) {
            layout.label = app.configurations.translations.ja[translationBaseKey][defaultLabel]
          }
        }
      }
      recursiveTranslate(layout, app)
      return e
    })

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
