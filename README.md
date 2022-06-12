# 🐍 snakeRN 🎮

[react-native-pixi](https://github.com/flyskywhy/react-native-pixi) Snake game made in React Native with `@flyskywhy/react-native-gcanvas` instead of `expo-gl` 👾 The goal of this project is to create a simple Snake clone that could be used in any WebGL context. The primary target being native iPhone and Android apps.

<img src="https://raw.githubusercontent.com/flyskywhy/snakeRN/master/assets/snakeRN.gif" width="480">

## [Live Web demo](https://flyskywhy.github.io/snakeRN/)

```
npm install --legacy-peer-deps
```

`npm run rn` to start react-native packager for development.

`npm run rn-fresh` to reset-cache before start react-native packager for development.

## Android
`npm run android` to generate `android/app/build/outputs/apk/debug/app-debug.apk` for development.

`npm run build-android` to generate `android/app/build/outputs/apk/release/app-release.apk` for production.

`npm run bundle-android` to `android/app/build/outputs/bundle/release/app-release.aab` for production.

## iOS
use Xcode.

## Web
`npm run web` for development, then view it at [http://localhost:3000](http://localhost:3000) in web browser.

`npm run web-fresh` to delete node_modules/.cache/* before `npm run web` , it's useful if there is running strange bug unknow.

`npm run build-web` to generate files in `build/` for production to deploy to `https://foo.bar.com/` , and can use `npx http-server@13.0.2 build` to simply test it at [http://127.0.0.1:8080](http://127.0.0.1:8080) in web browser.

`npm run build-web-snakeRN` to generate files in `build/` for production to deploy to `https://foo.bar.com/snakeRN/`, e.g. [https://flyskywhy.github.io/snakeRN/](https://flyskywhy.github.io/snakeRN/) .

## Check out the (expo/expo-pixi) video tutorial!

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/iV2hCV2f1po/0.jpg)](https://www.youtube.com/watch?v=iV2hCV2f1po)

Give it a 👍 if you found it helpful 😁💙
