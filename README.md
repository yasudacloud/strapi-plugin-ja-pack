# This is a product that is still under development



## Developer SetUp

### 1. Install Strapi V4
https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/installation/cli.html#creating-a-strapi-project

### 2. Install Plugin
mkdir {project root}/src/plugins

cd {project root}/src/plugins

git clone https://github.com/yasudacloud/strapi-plugin-ja-pack.git


### 3. Enable i18n & ja-pack Plugin
config/plugins.js

```
module.exports = ({env}) => ({
  i18n: true,
  'strapi-plugin-ja-pack': {
    enabled: true,
    resolve: './src/plugins/strapi-plugin-ja-pack',
  },
});
```

### 4. Enable Japanese Locale
src/admin/app.js
```
export default {
  config: {
    locales: [
      'ja',
    ],
  },
  bootstrap(app) {
    console.log(app);
  },
};
```

### 5. Add Japanese Locale
Settings > Internationalization > "+ Add new locale" > add ja & default


### 6. Setting Login User Locale
Select your profile from the avatar in the lower left corner of the screen.

(管理画面左下のアバターを選択し、プロフィールをクリックします)

Change the language of "Experience" to Japanese.

("Experience"の言語を日本語にします)


More details about the development can be found here

[link](https://github.com/yasudacloud/strapi-plugin-ja-pack/blob/main/develop/README.md)
