import { html } from 'lit'

import type { ComponentReferenceItemData } from '@/components/domains/component'
import type { TemplateResult } from 'lit'

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

// 앞뒤 공백이 문장 안 여백으로 렌더되지 않도록 한 줄로 둔다.
// prettier-ignore
const code = (name: string) => html`<mm-code>${name}</mm-code>`

// 목록 항목은 해야 할 일을 굵은 한 줄로 먼저 두고 설명을 잇는다.
const rule = (title: string | TemplateResult, description: string | TemplateResult) => html`
  <span>
    <mm-text weight="bold">${title}</mm-text>
    ${description}
  </span>
`

const optionItemCode = `type OptionItem = {
  value: string
  label: string
  icon?: IconName
  disabled?: boolean
}

type FilterOption = OptionItem & {
  selectAll?: boolean
}`

const selectionRows = html`
  <tr>
    <th scope="row"><mm-code>mm-radio-group</mm-code></th>
    <td>Single</td>
    <td>배열</td>
    <td>폼에서 5개 이하 선택지 중 하나를 고를 때.</td>
  </tr>
  <tr>
    <th scope="row"><mm-code>mm-radio-card-group</mm-code></th>
    <td>Single</td>
    <td>자식 요소</td>
    <td>레이블만으로 부족해 선택지마다 상세한 정보를 제공해야 할 때.</td>
  </tr>
  <tr>
    <th scope="row"><mm-code>mm-toggle-button-group</mm-code></th>
    <td>Single</td>
    <td>배열</td>
    <td>보기 방식처럼 화면 표시를 바로 바꾸는 5개 이하 선택지 중 하나를 고를 때.</td>
  </tr>
  <tr>
    <th scope="row"><mm-code>mm-select</mm-code></th>
    <td>Single</td>
    <td>배열</td>
    <td>6개 이상 선택지 중 하나를 고를 때.</td>
  </tr>
  <tr>
    <th scope="row">
      <mm-code>mm-filter-button-group</mm-code>
      <mm-code>mode="single"</mm-code>
    </th>
    <td>Single</td>
    <td>배열</td>
    <td>목록·콘텐츠를 걸러 볼 조건 하나를 고를 때.</td>
  </tr>
  <tr>
    <th scope="row"><mm-code>mm-menu-item-radio-group</mm-code></th>
    <td>Single</td>
    <td>자식 요소</td>
    <td>팝오버·시트·설정 화면의 행 목록에서 하나를 고를 때.</td>
  </tr>
  <tr>
    <th scope="row"><mm-code>mm-checkbox-group</mm-code></th>
    <td>Multiple</td>
    <td>배열</td>
    <td>폼에서 5개 이하 선택지 중 여럿을 고를 때.</td>
  </tr>
  <tr>
    <th scope="row">
      <mm-code>mm-filter-button-group</mm-code>
      <mm-code>mode="multiple"</mm-code>
    </th>
    <td>Multiple</td>
    <td>배열</td>
    <td>목록·콘텐츠를 걸러 볼 조건 여럿을 고를 때.</td>
  </tr>
  <tr>
    <th scope="row"><mm-code>mm-menu-item-checkbox-group</mm-code></th>
    <td>Multiple</td>
    <td>자식 요소</td>
    <td>팝오버·시트·설정 화면의 행 목록에서 여럿을 고를 때.</td>
  </tr>
`

const selectionTableColumns = [
  { label: '컴포넌트', width: '240px' },
  { label: '선택', width: '100px' },
  { label: '옵션 전달', width: '100px' },
  { label: '언제' },
]

const main = html`
  <mm-main>
    <mm-flex justify-content="between" align-items="start" gap="3">
      <mm-page-header
        heading="Selection"
        description="선택지 가운데 값을 고르는 컴포넌트가 공유하는 계약입니다."
      ></mm-page-header>
      <mm-copy-page-button></mm-copy-page-button>
    </mm-flex>

    <mm-content-section-list>
      <mm-content-section heading-level="3" heading="Overview">
        <mm-table
          .rows=${selectionRows}
          caption="값을 고르는 컴포넌트의 선택 개수·옵션 전달 방식·사용 시점 비교"
          .columns=${selectionTableColumns}
        ></mm-table>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Single selection">
        <mm-paragraph>
          선택지가 5개 이하면 ${code('mm-radio-group')} · ${code('mm-toggle-button-group')}으로 펼쳐
          보이고, 6개부터는 ${code('mm-select')}로 접습니다.
        </mm-paragraph>
        <mm-notice>
          <mm-text size="14">
            ${code('mm-tab')}은 값을 고르는 selection이 아니라 보이는 콘텐츠를 바꾸는 content
            switching 맥락에 속합니다.
          </mm-text>
        </mm-notice>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Multiple selection">
        <mm-paragraph>
          선택지가 5개 이하면 ${code('mm-checkbox-group')}으로 펼쳐 보이고, 6개부터는
          ${code('mm-filter-button-group')}이나 ${code('mm-sheet')} 안의
          ${code('mm-menu-item-checkbox-group')}으로 옮깁니다.
        </mm-paragraph>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Default values">
        <mm-text-list
          variant="check"
          .texts=${[
            rule(
              '기본값은 기존 데이터가 그 값을 뒷받침할 때 미리 선택한다',
              '미리 선택된 값은 응답을 그 값 쪽으로 편향시킨다',
            ),
          ]}
        ></mm-text-list>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="상태 소유">
        <mm-paragraph>
          ${code('SingleSelectionController')} · ${code('MultipleSelectionController')} ·
          ${code('SelectionGroupController')}
        </mm-paragraph>
        <mm-text-list
          variant="check"
          .texts=${[
            rule(
              '선택 상태는 항목이 아니라 그룹이 소유한다',
              html`
                하나를 고르면 ${code('value')}, 여럿을 고르면 ${code('values')}에 두고, 바뀌면 같은
                이름으로 ${code('change')}에 담아 알린다
              `,
            ),
            rule(
              '배열로 받은 옵션의 선택 여부는 그룹이 렌더할 때 정한다',
              html`
                항목이 자기 상태를 갖지 않으므로, 그룹이 소유한 값과 옵션의 ${code('value')}를 맞춰
                ${code('checked')}를 내려준다
              `,
            ),
            rule(
              '자식 요소로 받은 항목의 선택도 그룹이 내려보낸다',
              html`
                ${code('SelectionGroupController')}가 마크업의 초기 선택을 흡수하고, 그룹 상태를
                항목의 ${code('checked')}에 반영하고, 항목의 변경을 그룹의 ${code('change')}로
                올린다
              `,
            ),
            rule(
              '선택지 없이 값 하나를 켜고 끄는 컴포넌트는 자기 상태를 갖는다',
              html`
                ${code('mm-switch')} · ${code('mm-toggle-button')}은 그룹 없이 자기
                ${code('checked')} · ${code('pressed')}를 갖는다
              `,
            ),
          ]}
        ></mm-text-list>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Option 타입">
        <mm-paragraph>
          옵션을 배열로 받는 그룹은 ${code('@/types')}의 ${code('OptionItem')} 모양을 공유하고,
          컴포넌트 고유 필드는 이를 확장해 더합니다.
        </mm-paragraph>
        <mm-code-block language="typescript" .code=${optionItemCode}></mm-code-block>
        <mm-text-list
          variant="check"
          .texts=${[
            rule(
              html`
                ${code('value')}는 옵션마다 고유하게 둔다
              `,
              '선택 상태와 목록 렌더의 키로 함께 쓰인다',
            ),
            rule(
              html`
                고유 필드는 ${code('OptionItem')}에 교차 타입으로 더한다
              `,
              html`
                ${code('OptionItem')}을 다시 선언하지 않아야 그룹끼리 옵션 모양이 같게 유지된다
              `,
            ),
            rule(
              html`
                옵션 배열은 ${code('.options')} property binding으로 넘긴다
              `,
              '배열을 attribute 문자열로 바꾸는 단계 없이 그대로 전달된다',
            ),
            rule(
              html`
                ${code('OptionItem')}에 담기지 않는 콘텐츠를 가진 선택지는 자식 요소로 받는다
              `,
              html`
                선택지마다 상세한 정보를 제공해야 하면 ${code('mm-radio-card-group')}처럼 자식
                요소를 받는 그룹을 쓴다
              `,
            ),
          ]}
        ></mm-text-list>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="접근성">
        <mm-text-list
          variant="check"
          .texts=${[
            rule(
              html`
                ${code('mm-radio-group')}은 네이티브 radio를 직접 렌더한다
              `,
              '같은 name의 radio가 한 shadow root에 모여야 브라우저가 화살표 이동과 단일 선택을 처리한다',
            ),
            rule(
              '화살표 키는 포커스를 옮기고, Space·Enter가 선택을 확정한다',
              html`
                ${code('mm-toggle-button-group')} · ${code('mm-filter-button-group')}이 이 방식을
                따른다
              `,
            ),
            rule(
              html`
                아이콘만 보여줄 때는 그룹에 ${code('hidden-label')}을 켠다
              `,
              html`
                ${code('label')}이 화면 텍스트 대신 ${code('aria-label')}로 옮겨진다
              `,
            ),
            rule(
              '레이블에는 선택지 이름만 쓴다',
              html`
                선택 여부는 ${code('aria-pressed')} · ${code('checked')} ·
                ${code('aria-selected')}가 전달한다
              `,
            ),
          ]}
        ></mm-text-list>
      </mm-content-section>

      <mm-component-references .items=${componentReferences}></mm-component-references>
    </mm-content-section-list>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
