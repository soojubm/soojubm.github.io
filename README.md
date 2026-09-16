# soojubm.github.io

## 커밋 메시지

- 설정 : 패키지의 변화가 있을 때 사용한다.

## 패키지 관리

- `package.json`은 허용 범위를 적고 `package-lock.json`은 실제 설치본을 적는다. 직접 의존성보다 전이 의존성이 훨씬 많고, 그 버전이 기록되는 곳은 lock 파일뿐이다.
- lock 파일은 최초 설치 시점의 해석 결과이며 이후 추가한 패키지만 덧붙는다. 범위 안에 새 버전이 나와도 스스로 갱신되지 않고 낡은 쪽으로 굳으므로, `npm audit fix`나 `npm update`로 범위를 다시 해석한다.
- lock 파일은 커밋하고 손으로 편집하지 않는다. CI는 `npm install` 대신 `npm ci`를 써서 lock과 `package.json`이 어긋나면 실패하게 한다.
- 버전에서 `^`를 빼지 않는다. 고정해도 직접 의존성만 묶이고 전이 의존성은 lock이 이미 책임지는 반면, 중복 설치가 생기고 범위 안에서 해결되는 보안 패치를 손으로 옮겨야 한다.
- lock 파일이 커밋돼 있으면 `^`가 있어도 `npm install`은 버전을 올리지 않는다. 버전은 `npm update`나 `npm install <pkg>@latest`로만 움직인다.
- 특정 전이 의존성의 버전을 강제해야 하면 `overrides`를 쓴다.
- 타입 패키지(`@types/*`)는 컴파일 타임에만 쓰이므로 `devDependencies`에 둔다.

## 페이지 렌더링 구조

- MPA 구조다. `src/sitemap.ts`의 `SITEMAP`을 기준으로 `webpack.config.js`가 페이지마다 별도 entry(`pages/{subDir}/{id}/{id}.ts`)와 `HtmlWebpackPlugin`을 등록해, 빌드 시 페이지 수만큼 독립된 정적 html(`{id}.html`)을 만든다.
- 페이지 이동은 클라이언트 라우터가 아니라 일반 `<a href>`에 의한 전체 페이지 리로드다. history API나 가상 라우팅은 쓰지 않는다.
- 각 `{id}.ts`는 `DOMContentLoaded` 시점에 `layouts/base-layouts.ts`의 `renderLayout(content, options)`를 호출해 navbar/footer를 포함한 레이아웃을 `document.body`에 마운트한다. `content`는 문자열(기존 `index.html` fragment를 `unsafeHTML`로 삽입)과 lit `TemplateResult`(prop을 실제 값으로 바인딩하는 신규 페이지) 둘 다 받는다.

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

## extensions

- ('./myFile')
- '[hash].[ext]' ext: 현재 확장자 그대로 사용

## eslint

tslint duplicated

## stylelint

eslint-config-prettier
eslint-config-prettier is a config that disables rules that conflict with Prettier

"editor.formatOnSave": true,

### 22-11

- friendly-errors-webpack-plugin@1.7.0 제거
- file-loader 제거 https://webpack.js.org/guides/asset-modules/

https://velog.io/@nemo/webpack-setting
