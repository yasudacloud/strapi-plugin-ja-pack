# Strapi Japanese Translation Plug-in

このプラグインはStrapiバージョン4および5の管理画面の単語・文章を日本語に翻訳することができます。

ただしStrapi本体で一部、翻訳キーが当たってないものがあるため英語表記で出るものもあります。また、EE版（Enterprise Edition）の機能に関する翻訳はサポートしていません。

## サポートバージョン
```text
Strapi v4: 1.*.*
Strapi v5: 2.*.*
```

## インストール
```shell
npm install strapi-plugin-ja-pack
または
yarn add strapi-plugin-ja-pack
```

Strapi v5サポート版ではContent Typeのコレクションタイプやシングルタイプのスキーマ名を別名に置き換えることができます。 詳細は一番下に記載しています。

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
左下のアバターっぽい画像をクリック→言語を日本語にして保存

# Content Typeのスキーマ名を日本語に置き換える
本プラグインを有効後、src/admin/app.tsxのconfig.translations.ja.strapi-plugin-ja-packに文言を設定できます。

例えば、コレクションタイプbookにtitleやdescription、createdAtといった項目を置き換える場合は下記のようにします。
```javascript
export default {
  config: {
    locales: [
      "ja"
    ],
    translations: {
      ja: {
        'strapi-plugin-ja-pack': {
          id: "ID",
          title: "タイトル",
          description: "説明",
          createdAt: "作成日時",
          content: "本文"
        }
      }
    },
  }
}
```
この時のbookの一覧と作成／編集画面はこのようになります。

<img src="https://github.com/yasudacloud/strapi-plugin-ja-pack/blob/main/docs/screen1.png?raw=true" width="180"/>
<img src="https://github.com/yasudacloud/strapi-plugin-ja-pack/blob/main/docs/screen2.png?raw=true" width="180"/>


不具合やおかしな日本語訳があればお気軽にPR/Issuesください。
