# NAMEGRAB

## FE

- Remove backend dependencies (package.json)
- Purge css (tailwind.config.js)
- remove yarn 2 - not supported (.yarn/, .yarnrc.yml)
- Remove console statetements
- Change url for backend - https://namegrab.herokuapp.com/name
```js
module.exports = {
  purge: {
    enabled: true,
    content: [
      './src/**/*.vue',
      './src/main.js',
    ],
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}

```
```json
{
  "name": "namegrab",
  "version": "0.3.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "start": "node server/app.js"
  },
  "dependencies": {
    "core-js": "^3.6.5",
    "register-service-worker": "^1.7.1",
    "tailwindcss": "^1.5.1",
    "vue": "^2.6.11"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "~4.4.0",
    "@vue/cli-plugin-eslint": "~4.4.0",
    "@vue/cli-plugin-pwa": "~4.4.0",
    "@vue/cli-service": "~4.4.0",
    "babel-eslint": "^10.1.0",
    "eslint": "^6.7.2",
    "eslint-plugin-vue": "^6.2.2",
    "vue-template-compiler": "^2.6.11"
  },
  "_id": "namegrab@0.3.0",
  "readme": "ERROR: No README data found!"
}
```

## BE

_No need to redeploy the backend anymore_

- Remove frontend dependencies & Specify nodejs, yarn version (package.json)
- Change url for frontend - https://namegrab.netlify.app/name
- remove yarn 2 - not supported (.yarn/, .yarnrc.yml)
```json
{
  "name": "namegrab",
  "version": "0.3.0",
  "private": true,
  "engines": {
    "node": "12.x",
    "yarn": "1.x"
  },
  "scripts": {
    "start": "node server/app.js"
  },
  "dependencies": {
    "express": "^4.17.1",
    "node-fetch": "^2.6.0"
  },
  "_id": "namegrab@0.3.0",
  "readme": "ERROR: No README data found!"
}
```
