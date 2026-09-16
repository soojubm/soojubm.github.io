import { html } from 'lit'

import type { ComponentReferenceItemData } from '@/components/domains/component'

import { renderPage } from '@/components/layouts/base-layouts'

const componentReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://m3.material.io/foundations/interaction/selection',
    label: 'MD3 - Selection',
    external: true,
  },
  {
    href: 'https://designsystem.maersk.com/guidelines/selection-components/',
    label: 'Maersk - Selection components',
    external: true,
  },
  {
    href: 'https://design.basis.com/patterns/selection-ui',
    label: 'Basis - Selection UI',
    external: true,
  },
]

const optionItemCode = `type OptionItem = {
  value: string
  label: string
  icon?: IconName
  disabled?: boolean
}

type FilterOption = OptionItem & {
  selectAll?: boolean
}`

const singleSelectionRows = html`
  <tr>
    <th scope="row"><mm-code>mm-radio-group</mm-code></th>
    <td>배열</td>
    <td>폼에서 5개 이하 선택지 중 하나를 고를 때.</td>
  </tr>
  <tr>
    <th scope="row"><mm-code>mm-radio-card-group</mm-code></th>
    <td>자식 요소</td>
    <td>레이블만으로 부족해 가격·설명을 함께 비교해야 할 때.</td>
  </tr>
  <tr>
    <th scope="row"><mm-code>mm-toggle-button-group</mm-code></th>
    <td>배열</td>
    <td>보기 방식처럼 화면 표시를 바로 바꾸는 5개 이하 선택지 중 하나를 고를 때.</td>
  </tr>
  <tr>
    <th scope="row"><mm-code>mm-select</mm-code></th>
    <td>배열</td>
    <td>6개 이상 선택지 중 하나를 고를 때.</td>
  </tr>
  <tr>
    <th scope="row">
      <mm-code>mm-filter-button-group</mm-code>
      <mm-code>mode="single"</mm-code>
    </th>
    <td>배열</td>
    <td>목록·콘텐츠를 걸러 볼 조건 하나를 고를 때.</td>
  </tr>
  <tr>
    <th scope="row"><mm-code>mm-menu-item-radio-group</mm-code></th>
    <td>자식 요소</td>
    <td>메뉴·시트 안에서 하나를 고를 때.</td>
  </tr>
`

const multipleSelectionRows = html`
  <tr>
    <th scope="row"><mm-code>mm-checkbox-group</mm-code></th>
    <td>배열</td>
    <td>폼에서 5개 이하 선택지 중 여럿을 고를 때.</td>
  </tr>
  <tr>
    <th scope="row">
      <mm-code>mm-filter-button-group</mm-code>
      <mm-code>mode="multiple"</mm-code>
    </th>
    <td>배열</td>
    <td>목록·콘텐츠를 걸러 볼 조건 여럿을 고를 때.</td>
  </tr>
  <tr>
    <th scope="row"><mm-code>mm-menu-item-checkbox-group</mm-code></th>
    <td>자식 요소</td>
    <td>메뉴·시트 안에서 여럿을 고를 때.</td>
  </tr>
`

const selectionTableColumns = [
  { label: '컴포넌트', width: '240px' },
  { label: '옵션 전달', width: '120px' },
  { label: '언제' },
]

const main = html`
  <mm-page>
    <mm-page-header
      heading="Selection"
      description="선택지 가운데 값을 고르는 컴포넌트가 공유하는 계약입니다."
    ></mm-page-header>

    <mm-content-section-list>
      <mm-content-section heading-level="3" heading="Single selection">
        <mm-paragraph>
          선택지가 5개 이하면
          <mm-code>mm-radio-group</mm-code>
          ·
          <mm-code>mm-toggle-button-group</mm-code>
          으로 펼쳐 보이고, 6개부터는
          <mm-code>mm-select</mm-code>
          로 접습니다.
        </mm-paragraph>
        <mm-notice>
          <mm-text size="14">
            <mm-code>mm-tab</mm-code>
            은 값을 고르는 것이 아니라 지금 보이는 패널을 바꾸므로 선택 컴포넌트로 쓰지 않습니다.
          </mm-text>
        </mm-notice>
        <mm-table
          .rows=${singleSelectionRows}
          caption="하나를 고르는 컴포넌트"
          .columns=${selectionTableColumns}
        ></mm-table>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Multiple selection">
        <mm-paragraph>
          선택지가 5개 이하면
          <mm-code>mm-checkbox-group</mm-code>
          으로 펼쳐 보이고, 6개부터는
          <mm-code>mm-filter-button-group</mm-code>
          이나
          <mm-code>mm-sheet</mm-code>
          안의
          <mm-code>mm-menu-item-checkbox-group</mm-code>
          으로 옮깁니다.
        </mm-paragraph>
        <mm-table
          .rows=${multipleSelectionRows}
          caption="여럿을 고르는 컴포넌트"
          .columns=${selectionTableColumns}
        ></mm-table>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Default values">
        <mm-paragraph>
          미리 선택된 기본값은 응답을 편향시키므로, 기존 데이터가 그 값을 뒷받침할 때만 둡니다.
        </mm-paragraph>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="상태 소유">
        <mm-paragraph>
          선택 상태는 항목이 아니라 그룹이 소유합니다. 하나를 고르면
          <mm-code>value</mm-code>
          , 여럿을 고르면
          <mm-code>values</mm-code>
          에 두고, 바뀌면 같은 이름으로
          <mm-code>change</mm-code>
          에 담아 알립니다. 선택지 없이 값 하나를 켜고 끄는
          <mm-code>mm-switch</mm-code>
          ·
          <mm-code>mm-toggle-button</mm-code>
          만 그룹 없이 자기
          <mm-code>checked</mm-code>
          ·
          <mm-code>pressed</mm-code>
          를 가집니다.
        </mm-paragraph>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Option 타입">
        <mm-paragraph>
          옵션을 배열로 받는 그룹은
          <mm-code>@/types</mm-code>
          의
          <mm-code>OptionItem</mm-code>
          모양을 공유하고, 컴포넌트 고유 필드는 이를 확장해 더합니다.
        </mm-paragraph>
        <mm-code-block language="typescript" .code=${optionItemCode}></mm-code-block>
        <mm-text-list
          .texts=${[
            html`
              <mm-code>value</mm-code>
              는 선택 상태와 목록 렌더의 키이므로 옵션끼리 겹치지 않게 둔다.
            `,
            html`
              고유 필드가 필요하면
              <mm-code>OptionItem</mm-code>
              을 다시 선언하지 않고 교차 타입으로 더한다.
            `,
            html`
              옵션 배열은 attribute가 아니라
              <mm-code>.options</mm-code>
              property binding으로 넘긴다.
            `,
            html`
              가격·설명·아바타처럼
              <mm-code>OptionItem</mm-code>
              에 담기지 않는 콘텐츠를 가진 선택지는
              <mm-code>mm-radio-card-group</mm-code>
              처럼 자식 요소로 받는 그룹을 쓴다.
            `,
          ]}
        ></mm-text-list>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="접근성">
        <mm-text-list
          .texts=${[
            html`
              네이티브 radio는 같은 name끼리 한 shadow root에 모여야 브라우저가 화살표 이동과 단일
              선택을 처리하므로,
              <mm-code>mm-radio-group</mm-code>
              이 input을 직접 렌더한다.
            `,
            html`
              <mm-code>mm-toggle-button-group</mm-code>
              ·
              <mm-code>mm-filter-button-group</mm-code>
              은 화살표 키로 포커스만 옮기고, 선택은 Space·Enter로 확정한다.
            `,
            html`
              아이콘만 보여줄 때는 그룹에
              <mm-code>hidden-label</mm-code>
              을 켜서
              <mm-code>label</mm-code>
              을 화면 텍스트 대신
              <mm-code>aria-label</mm-code>
              로 옮긴다.
            `,
            html`
              선택 여부는
              <mm-code>aria-pressed</mm-code>
              ·
              <mm-code>checked</mm-code>
              ·
              <mm-code>aria-selected</mm-code>
              가 전달하므로 레이블에 상태를 넣지 않는다.
            `,
          ]}
        ></mm-text-list>
      </mm-content-section>
    </mm-content-section-list>

    <mm-component-references .items=${componentReferences}></mm-component-references>
  </mm-page>
`

renderPage(main)
