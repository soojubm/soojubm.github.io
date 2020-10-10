# soojubm.github.io

## 커밋 메세지

- 설정 : 패키지의 변화가 있을 때 사용한다.

## 웹팩 가이드

- HtmlWebpackPlugin: 번들링된 js 파일을 html에 임포트한다.
- CompressionPlugin: 번들파일을 content-encoding으로 압축한다.
- OptimizeCssAssetsPlugin: css 파일을 압축한다. mini-css-extract-plugin로 css 파일을 분리해야 사용할 수 있다.
- mini-css-extract-plugin: 모듈과 플러그인 양 쪽에서 설정 해주어야 한다. 스타일로더를 대체할 수 있다.
- TerserPlugin: js파일을 압축한다.
- CopyPlugin: 정적 파일을 가져온다.
- styleLoader, cssLoader: 서버사이드랜더링 지원 하지 않는다, 임포느한 스타일 파일을 style 태그로 변환한다.
  - postcss-loader is used standalone (without css-loader), style!css
- TerserPlugin > UglifyJsPlugin: 일단 번들링 속도가 빠른 듯?
- MiniCssExtractPlugin > MiniCssExtractPlugin
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

## stylelint

stylelint
stylelint-webpack-plugin 웹팩 빌드 시 린트 오류를 리스트업 해준다.
eslint-config-prettier
eslint-config-prettier is a config that disables rules that conflict with Prettier

"editor.formatOnSave": true,
"prettier.disableLanguages": ["scss"]
