# soojubm.github.io

## 커밋 메시지

- 설정 : 패키지의 변화가 있을 때 사용한다.

## 웹팩 가이드

- HtmlWebpackPlugin: 번들링된 js 파일을 html에 임포트한다.

- CompressionPlugin: gzip

- OptimizeCssAssetsPlugin: css 파일을 압축한다 with cssnano. mini-css-extract-plugin로 css 파일을 분리해야 사용할 수 있다.
- css-minimizer-webpack-plugin: above webpack 5

TerserPlugin > uglifyjs-webpack-plugin: 번들링 속도가 빠르다. 유지보수 중단. mode값을 production
=> terserplugin + UglifyJs
-> 안 돼서 obfuscator

- MiniCssExtractPlugin: style-loader(head에 style태그 삽입) 대체. css 파일로 만들어줌.

* CopyPlugin: 정적 파일을 가져온다.
* styleLoader, cssLoader: 서버사이드랜더링 지원 하지 않는다, 임포느한 스타일 파일을 style 태그로 변환한다.
  - postcss-loader is used standalone (without css-loader), style!css

- webpack-jarvis 업데이트가 안 되고 있고 사용량도 webpackBundleAnalyzer보다 적다.

- inline-source-map

## 디펜던시

- @babel/polyfill은 소스코드가 실행되기 전에 동작해야 하기때문에 --save로 패키지에 추가.

## extensions

- ('./myFile')
- '[hash].[ext]' ext: 현재 확장자 그대로 사용

## ?

- TODO 웹팩으로 코드 스플리팅 하기
- 캐쉬 갱신

## eslint

tslint duplicated

## stylelint

npm run dev

eslint-config-prettier
eslint-config-prettier is a config that disables rules that conflict with Prettier

"editor.formatOnSave": true,

### 22-11

- friendly-errors-webpack-plugin@1.7.0 제거
- file-loader 제거 https://webpack.js.org/guides/asset-modules/

https://velog.io/@nemo/webpack-setting
