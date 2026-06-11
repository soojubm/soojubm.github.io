# Project Guidelines

## 컴포넌트 구조

- 새 컴포넌트를 만들기 전에 기존 컴포넌트를 먼저 확인하고, 기존 구조와 네이밍을 따른다.
- 새 컴포넌트를 만들 때는 상속보다 조합/합성을 우선한다.
- 새 패턴은 꼭 필요할 때만 추가한다.

## 디자인 토큰

- 색상, 간격, radius는 항상 CSS 토큰(`--color-*`, `--space-*`, `--radius-*`)을 사용한다.
- 하드코딩 값(`#fff`, `12px`, `4px`) 대신 가장 가까운 토큰을 찾아 쓴다.

## 레이아웃

- 수평·수직 배치는 `mm-flex`를 사용한다. (`mm-group`은 제거됨)
- 버튼 그룹은 `mm-button-group`을 사용한다.

## 타이포그래피

- 텍스트는 `mm-text`, 단락은 `mm-paragraph`, 목록은 `mm-text-list`를 사용한다.
- `p`, `h1`–`h6` 등 raw 태그로 새 콘텐츠를 작성하지 않는다.
- 텍스트 위계는 `size`만으로 표현한다. `color` prop은 거의 쓰지 않는다.

## 버튼

- 버튼은 항상 `mm-button`을 사용한다.
- pill 형태가 필요하면 `--button-radius: 999px` CSS 변수로 override하지 않고 `mm-button`의 기본 radius를 그대로 쓴다.

## 스타일시트

- 순서 flex, width, height, space, border, background, position

## 코드 정리

- 작업 후 Prettier를 실행한다.

## 컴포넌트 페이지 구조

- 컴포넌트 페이지의 섹션 순서: `mm-component-example` → `mm-component-anatomy` → `mm-component-guide` → `mm-component-section` (anatomy 나열)
- `mm-component-anatomy`와 guide 내부 시각적 anatomy를 중복해서 쓰지 않는다. `mm-component-anatomy`로 통일한다.
- sub-component를 전시할 때는 열기 버튼 없이 `mm-component-section` 안에 컴포넌트를 직접 렌더링한다.

## mm-sheet

- 스크롤 영역 정의를 위한 height는 `mm-sheet-body`가 아닌 `mm-sheet`에 준다.
- `mm-sheet`가 `height` prop을 받으면 시트 전체 높이를 고정하고, `mm-sheet-body`는 `flex: 1 1 auto + overflow-y: auto`로 나머지를 채운다.
- 패턴 페이지는 `pages/patterns/sheet/`이며 sitemap의 `patterns` 카테고리에 속한다.
