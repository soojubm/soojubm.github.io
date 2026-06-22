# Project Guidelines

## 컴포넌트 구조

- 새 컴포넌트를 만들기 전에 기존 컴포넌트를 먼저 확인하고, 기존 구조와 네이밍을 따른다.
- 새 컴포넌트를 만들 때는 상속보다 조합/합성을 우선한다.
- 새 패턴은 꼭 필요할 때만 추가한다.
- 컴포넌트 API를 변경할 때는 구현, 전체 사용처, 예제 페이지, `mm-prop` 문서를 함께 수정한다.
- 같은 기반 요소와 컨트롤 스타일을 사용하는 합성 컴포넌트는 size별 높이·패딩 등 공통 상태 스타일도 기반 스타일 전체에서 함께 참조한다. 같은 규칙을 컴포넌트마다 중복하거나 별도의 작은 스타일 조각으로 분리하지 않는다. (`mm-textfield`, `mm-searchfield`는 `inputStyles`의 `.textfield-control`과 small 상태를 함께 사용)

## Prop 네이밍

- popover·툴팁·드롭다운 등 **위치를 지정하는 prop 이름으로 `align`을 쓰지 않고 `placement`를 쓴다.** `align`은 레거시 HTML presentational 속성이라 `align="right"`가 자동으로 `text-align`으로 매핑되고, 이 값이 shadow DOM 경계를 넘어 내부 콘텐츠 텍스트 정렬까지 오염시킨다. (`mm-dropdown`, `mm-tooltip`은 `placement` 사용)
- 예외: `mm-flex`·`mm-button-group`의 `align`은 flexbox 교차축 정렬(`align-items`)을 뜻하므로 그대로 둔다.

## 디자인 토큰

- 색상, 간격, radius는 항상 CSS 토큰(`--color-*`, `--space-*`, `--radius-*`)을 사용한다.
- 하드코딩 값(`#fff`, `12px`, `4px`) 대신 가장 가까운 토큰을 찾아 쓴다.
- `calc()`로 토큰을 곱하거나 더해 존재하지 않는 값을 만들어 쓰지 않는다. (`calc(var(--border-width) * 2)`처럼 토큰에 없는 2px를 만들어내는 것 금지) 필요한 값은 기존 토큰을 그대로 쓴다.

## 레이아웃

- 수평·수직 배치는 `mm-flex`를 사용한다. (`mm-group`은 제거됨)
- 버튼 그룹은 `mm-button-group`을 사용한다.
- 반복되는 카드나 타일을 열 단위로 배치할 때는 직접 CSS Grid를 작성하기보다 `mm-grid`를 우선 사용한다. `columns`와 `gap`으로 구조를 표현하고, 컴포넌트가 제공하는 반응형 동작을 따른다.
- 형제 영역 사이의 레이아웃 간격은 개별 요소의 `margin`이나 `padding`보다 부모 레이아웃의 `gap`으로 처리한다.
- 섹션 사이의 간격은 `var(--space-section)`을 사용한다. `mm-flex`에서는 같은 값을 가진 숫자 토큰으로 대신하지 않고 의미 별칭인 `gap="section"`을 사용한다.

## 페이지 헤더

- 페이지 최상단의 제목과 설명은 `mm-text-block`을 직접 조합하지 않고 `mm-page-header`를 사용한다.
- 페이지 헤더에 액션이 함께 있으면 `mm-page-header`와 `mm-button-group`을 부모 `mm-flex` 안에 형제로 배치한다.

## 타이포그래피

- 텍스트가 2개 이상일 떄는 mm-paragraph-group으로 감싼다.
- 긴 본문을 접고 펼치는 더 보기 텍스트는 `mm-read-more-paragraph`를 사용한다.
- 페이지·섹션·소제목 등 제목 맥락에는 `mm-text`가 아닌 `mm-heading`을 사용하고, 의미 위계에 맞는 `level`을 지정한다.
- 제목과 설명 텍스트가 함께 나오는 맥락에는 `mm-heading`과 `mm-text`를 따로 조합하지 않고 `mm-text-block`을 사용한다.
- 텍스트는 `mm-text`, 단락은 `mm-paragraph`, 목록은 `mm-text-list`를 사용한다.
- 연관된 `mm-meta-item`이 2개 이상이면 `mm-meta-item-group`으로 묶는다. `mm-meta-item-group`은 Flex와 기본 `gap="4"`를 엄격하게 사용하며 Grid나 `columns`로 변형하지 않는다.
- `p`, `h1`–`h6` 등 raw 태그로 새 콘텐츠를 작성하지 않는다.
- 정보 위계는 제목, 기본 본문, 핵심 수치처럼 꼭 필요한 최소 단계로 단순하게 구성한다.
- `mm-text size="12"`는 사용하지 않는다. 보조 정보도 기본 텍스트 크기를 우선하고, 더 작은 크기를 추가해 위계를 세분화하지 않는다.
- 텍스트 크기 단계가 필요할 때는 `size`로 표현하며, `color` prop은 거의 쓰지 않는다.

## 태그

- `mm-tag`가 2개 이상 함께 쓰이면 개별 태그를 직접 나열하지 않고 `mm-keyword-tag-group`을 사용한다.

## 버튼

- 버튼은 항상 `mm-button`을 사용한다.
- pill 형태가 필요하면 `--button-radius: 999px` CSS 변수로 override하지 않고 `mm-button`의 기본 radius를 그대로 쓴다.

## 스타일시트

- 순서 flex, width, height, space, border, background, position
- 같은 맥락의 항목을 묶은 `mm-menu-item-group` 내부에는 `mm-separator`를 사용하지 않는다. 서로 다른 두 `mm-menu-item-group`을 구분해야 할 때 그룹 사이에 `mm-separator`를 사용한다.
- 콘텐츠나 레이아웃을 구획하기 위한 CSS `border`는 원칙적으로 사용하지 않는다.
- 서로 다른 맥락 사이에 구분선이 꼭 필요할 때 CSS `border`나 인접 형제 선택자로 직접 만들지 않고 `mm-separator`를 사용한다.
- Lit 컴포넌트의 host 상태 선택자는 `:host` 내부에 중첩하지 않고 최상위 `:host([attr])`, `:host(:state)` 형태로 작성한다.
- `display: contents`는 사용하지 않는다. Lit 컴포넌트 호스트에는 역할에 맞는 `block`, `inline-flex`, `grid` 등의 박스를 명시하고, 자식을 부모 레이아웃의 직접 항목처럼 배치해야 할 때는 마크업 구조를 조정하거나 `subgrid`를 사용한다.
- `createRenderRoot() { return this }`로 Light DOM을 사용하는 것은 외부 스타일 참여나 전역 문서 상태 선택자가 반드시 필요한 컴포넌트로 제한한다. 예외를 추가할 때는 Shadow DOM을 사용할 수 없는 이유를 코드 주석으로 남긴다.

## 코드 정리

- CustomEvent 이름은 `kebab-case`로 작성하며, 같은 의미의 camelCase 호환 이벤트를 중복 발행하지 않는다.
- Lit의 `render()`는 입력 상태를 템플릿으로 변환하는 순수한 과정으로 유지한다. DOM 조회·변경, 이벤트 발행, 상태 변경은 명명된 handler나 lifecycle에서 처리한다.
- 작업 후 Prettier를 실행한다.

## 컴포넌트 페이지 구조

- 컴포넌트 페이지의 섹션 순서: `mm-component-example` → `mm-component-anatomy` → `mm-component-guide` → `mm-component-section` (anatomy 나열)
- `mm-component-anatomy`와 guide 내부 시각적 anatomy를 중복해서 쓰지 않는다. `mm-component-anatomy`로 통일한다.
- sub-component를 전시할 때는 열기 버튼 없이 `mm-component-section` 안에 컴포넌트를 직접 렌더링한다.

## mm-sheet

- 스크롤 영역 정의를 위한 height는 `mm-sheet-body`가 아닌 `mm-sheet`에 준다.
- `mm-sheet`가 `height` prop을 받으면 시트 전체 높이를 고정하고, `mm-sheet-body`는 `flex: 1 1 auto + overflow-y: auto`로 나머지를 채운다.
- 패턴 페이지는 `pages/patterns/sheet/`이며 sitemap의 `patterns` 카테고리에 속한다.

## mm-surface

- `variant="subtle"`은 `mm-surface` 내부에 버튼, 링크 등 클릭 가능한 액션이 존재할 때만 사용한다.
