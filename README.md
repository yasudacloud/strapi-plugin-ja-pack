# Strapi Japanese Translation Plug-in

このプラグインはStrapiバージョン4の管理画面の単語・文章を日本語に翻訳することができます。

ただしStrapi本体で一部、翻訳キーが当たってないものがあるため英語表記で出るものもあります。

## インストール
```shell
npm install strapi-plugin-ja-pack
または
yarn add strapi-plugin-ja-pack
```

## セットアップ
### Step1
i18nとstrapi-plugin-ja-packを有効にします。

```
// プロジェクトルート/config/plugins.js
module.exports = ({env}) => ({
  i18n: true,
  'strapi-plugin-ja-pack': {
    enabled: true,
  }
});
```

### Step2
ja(日本語)を有効にします

```
// src/admin/app.js
export default {
  config: {
    locales: [
      'ja',
    ],
  },
  bootstrap(app) {
  },
};
```
### Step3
管理画面にログインして日本語を追加します。

Settings > Internationalization > "+ Add new locale" > add ja & default

### Step4
ログインユーザーのデフォルト言語を日本語にします。
左下のアバターっぽい画像をクリック→ Profile → Experience の言語を日本語にして保存


不具合やおかしな日本語訳があればお気軽にPR/Issuesください。
