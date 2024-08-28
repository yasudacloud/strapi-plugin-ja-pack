## Translation files

admin/src/translations/ja.json

## How to Work Efficiently

### 1. ロケールファイルの差分を抽出

`develop`フォルダで以下のコマンドを実行します(`make`コマンドが必要です)。  
日本語の翻訳が無いプロパティを`develop/dst/diff.json`として出力します

```bash
make clone
make compare
```

### 2. 日本語に翻訳

翻訳作業はお好みの方法で行って下さい。

### 3. 翻訳結果の確認

翻訳結果が反映されていることを確認するには、あなたのstrapiプロジェクトに翻訳後のファイルを反映してください。

1. 翻訳後のファイルを、strapiプロジェクトの`src/admin/extensions/translations/ja.json`として配置
2. `src/admin/app.js`で、プロパティ`config.translations.ja`に指定

```js
import ja from "./extensions/translations/ja.json";

const config = {
  translations: {
    ja: ja,
  },
  locales: [
    'ja',
  ],
};

const bootstrap = (app) => {
  console.log(app);
};

export default {
  config,
  bootstrap,
};
```

Admin Panelの表示に反映するにはリビルドが必要です。

```
npm run build
npm run develop
```

### 4. 過去のロケールファイルと結合

過去の翻訳実績(`admin/src/translations/ja.json`)を優先して残しておきたい場合は、プロパティ名をキーとしてマージすることが可能です。  
過去の翻訳実績を残しておく必要がない場合は、この手順はスキップして構いません。

1. 上記「2. 日本語に翻訳」の結果を`develop/src/translated.json`として保存
2. 過去の翻訳実績が既定のパス(`admin/src/translations/ja.json`)に存在することを確認
3. 以下のコマンドを実行すると、結合されたファイルが`develop/dst/merged.json`に保存されます。

```bash
make merge
```

## メンテナンス

Strapiの変更に追随するため、定期的に`compare.js`のメンテナンスが必要です。

12行目`target`で指定している、モジュールのパス指定(`source:`)を最新のstrapiソースコードに適応させてください。

```js
const target = [
  {
    source: 'core/admin',
    prefix: ''
  },
  //...
]
```

**TODO: メンテナンスフリーとするため、`packages/**/admin/src/translations`をみてtargetを自動でセットできるとよい**


## プロジェクトへの貢献

翻訳結果をプロジェクトにフィードバックいただける場合は、以下の手順でお願いいたします。

1. [プロジェクトのリポジトリ](https://github.com/yasudacloud/strapi-plugin-ja-pack)をフォーク
2. `merged.json`を既定のパス(`admin/src/translations/ja.json`)に配置してコミット
3. GitHubでプルリクエストをお願いします。
 
## 片付け

すべての作業が完了したら、`develop/src`および`develop/dst`フォルダの中身は、削除して構いません(`.gitkeep`は残しておきます)。  
