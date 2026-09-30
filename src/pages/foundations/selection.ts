import { html } from 'lit'

import {
  code,
  codeList,
  rule,
  type ComponentReferenceItemData,
} from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

const componentReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://m3.material.io/foundations/interaction/selection',
    label: 'MD3 - Selection',
  },
  {
    href: 'https://designsystem.maersk.com/guidelines/selection-components/',
    label: 'Maersk - Selection components',
  },
  {
    href: 'https://design.basis.com/patterns/selection-ui',
    label: 'Basis - Selection UI',
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
}

html\`
  <mm-radio-group
    .options=\${[
      { value: 'email', label: '이메일' },
      { value: 'sms', label: '문자', disabled: true },
    ]}
  ></mm-radio-group>
\``

const checkedComponentRows = html`
  <tr>
    <th scope="row">${code('checked')}</th>
    <td>${codeList(['mm-checkbox-group', 'mm-radio-group'])}</td>
  </tr>
  <tr>
    <th scope="row">${code('aria-checked')}</th>
    <td>${codeList(['mm-switch', 'mm-menu-item-radio', 'mm-menu-item-checkbox'])}</td>
  </tr>
`

const selectionRows = html`
  <tr>
    <th scope="row">${code('mm-radio-group')}</th>
    <td>Single</td>
    <td>배열</td>
    <td>폼에서 5개 이하 선택지 중 하나를 고를 때.</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-radio-card-group')}</th>
    <td>Single</td>
    <td>자식 요소</td>
    <td>레이블만으로 부족해 선택지마다 상세한 정보를 제공해야 할 때.</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-toggle-button-group')}</th>
    <td>Single</td>
    <td>배열</td>
    <td>보기 방식처럼 화면 표시를 바로 바꾸는 5개 이하 선택지 중 하나를 고를 때.</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-select')}</th>
    <td>Single</td>
    <td>배열</td>
    <td>6개 이상 선택지 중 하나를 고를 때.</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-filter-button-group')}</th>
    <td>Single · Multiple</td>
    <td>배열</td>
    <td>목록·콘텐츠를 걸러 볼 조건 하나 또는 여럿을 고를 때.</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-menu-item-radio-group')}</th>
    <td>Single</td>
    <td>자식 요소</td>
    <td>팝오버·시트·설정 화면의 행 목록에서 하나를 고를 때.</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-checkbox-group')}</th>
    <td>Multiple</td>
    <td>배열</td>
    <td>폼에서 5개 이하 선택지 중 여럿을 고를 때.</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-menu-item-checkbox-group')}</th>
    <td>Multiple</td>
    <td>자식 요소</td>
    <td>팝오버·시트·설정 화면의 행 목록에서 여럿을 고를 때.</td>
  </tr>
`

const selectionTableColumns = [
  { label: '컴포넌트', width: '240px' },
  { label: '선택', width: '140px' },
  { label: '옵션 전달', width: '100px' },
  { label: '언제' },
]

const main = html`
  <mm-main>
    <mm-page-header
      heading="Selection"
      description="선택지 가운데 값을 고르는 컴포넌트가 공유하는 계약입니다. 선택 개수와 선택지 수로 컴포넌트를 고르고 선택 상태는 항목이 아닌 그룹이 소유하므로, 사용자는 어떤 선택 컴포넌트에서도 같은 방식으로 값을 고르고 바꿀 수 있습니다."
    ></mm-page-header>

    <mm-content-section-list>
      <mm-notice>
        <mm-text size="14">
          ${code('mm-tab')}은 ${code('aria-selected')}를 쓰지만 값을 고르는 selection이 아니라
          보이는 콘텐츠를 바꾸는 content switching 맥락에 속합니다.
        </mm-text>
      </mm-notice>

      <mm-content-section heading-level="3" heading="Overview">
        <mm-grid columns="2" gap="4">
          <mm-surface>
            <mm-content-section heading-level="3" heading="Single selection">
              <mm-paragraph>
                선택지가 5개 이하면 ${code('mm-radio-group')} ·
                ${code('mm-toggle-button-group')}으로 펼쳐 보이고, 6개부터는 ${code('mm-select')}로
                접습니다.
              </mm-paragraph>
            </mm-content-section>
          </mm-surface>
          <mm-surface>
            <mm-content-section heading-level="3" heading="Multiple selection">
              <mm-paragraph>
                선택지가 5개 이하면 ${code('mm-checkbox-group')}으로 펼쳐 보이고, 6개부터는
                ${code('mm-filter-button-group')}이나 ${code('mm-sheet')} 안의
                ${code('mm-menu-item-checkbox-group')}으로 옮깁니다.
              </mm-paragraph>
            </mm-content-section>
          </mm-surface>
        </mm-grid>

        <mm-table
          .rows=${selectionRows}
          caption="값을 고르는 컴포넌트의 선택 개수·옵션 전달 방식·사용 시점 비교"
          .columns=${selectionTableColumns}
        ></mm-table>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="기본값">
        <mm-paragraph>
          기본값은 기존 데이터가 그 값을 뒷받침할 때 미리 선택합니다. 미리 선택된 값은 응답을 그 값
          쪽으로 편향시키기 때문입니다.
        </mm-paragraph>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="상태 소유">
        <mm-paragraph>
          선택 상태는 항목이 아니라 그룹이 소유하며, ${code('SingleSelectionController')} ·
          ${code('MultipleSelectionController')} · ${code('SelectionGroupController')}가 이를
          맡습니다. 하나를 고르면 ${code('value')}, 여럿을 고르면 ${code('values')}에 두고, 바뀌면
          같은 이름으로 ${code('change')}에 담아 알립니다. 선택지 없이 값 하나를 켜고 끄는
          컴포넌트만 그룹 없이 자기 상태를 갖습니다.
        </mm-paragraph>
        <mm-text-list
          variant="check"
          .texts=${[
            html`
              ${code('mm-switch')}는 자기 ${code('checked')}를 갖는다
            `,
            html`
              ${code('mm-toggle-button')}은 자기 ${code('pressed')}를 갖는다
            `,
          ]}
        ></mm-text-list>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Pressed">
        <mm-paragraph>
          스스로 눌림 상태를 유지하는 컨트롤은 ${code('aria-pressed')}로 표현하고,
          Checked·Selected와 같은 강조 토큰을 공유합니다. ${code('mm-toggle-button')}과 그 시맨틱
          컴포넌트(follow·bookmark·reveal), toggle·filter 버튼 그룹이 씁니다.
        </mm-paragraph>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Checked">
        <mm-paragraph>
          컨트롤 자체의 on/off 값입니다. 네이티브 ${code('checked')}가 있으면 그것을, 없으면
          ${code('aria-checked')}를 씁니다.
        </mm-paragraph>
        <mm-text-list
          variant="check"
          .texts=${[
            rule(
              '값은 on/off를 유지하는 컨트롤만 갖는다',
              '눌러 실행되는 항목이나 화면을 바꾸는 탭은 결과가 화면 변화로 드러나므로 값을 남기지 않는다',
            ),
          ]}
        ></mm-text-list>
        <mm-table
          .rows=${checkedComponentRows}
          caption="Checked 상태 attribute와 그것을 쓰는 컴포넌트"
          .columns=${[{ label: '상태', width: '160px' }, { label: '컴포넌트' }]}
        ></mm-table>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Selected">
        <mm-paragraph>
          컬렉션에서 고른 항목입니다. ${code('mm-select')}의 옵션이 ${code('aria-selected')}로 고른
          값을 나타내며, 강조 토큰은 Checked와 같습니다.
        </mm-paragraph>
        <mm-paragraph>
          체크 표시는 ${code('mm-selected-indicator')}가 ${code('selected')}를 받아 체크 노출로
          반영하는 표시만 맡고, 선택 상호작용과 ${code('aria-selected')}는 옵션이 소유합니다. 고르지
          않은 행에도 자리를 남겨 행마다 트레일링 폭이 같습니다.
        </mm-paragraph>
        <mm-surface variant="outlined" radius="large">
          <mm-flex gap="6">
            <mm-flex direction="column" gap="2" align-items="center">
              <mm-selected-indicator></mm-selected-indicator>
              <mm-caption>선택 안 됨</mm-caption>
            </mm-flex>
            <mm-flex direction="column" gap="2" align-items="center">
              <mm-selected-indicator selected></mm-selected-indicator>
              <mm-caption>선택됨</mm-caption>
            </mm-flex>
          </mm-flex>
        </mm-surface>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="옵션 타입">
        <mm-code-block language="typescript" .code=${optionItemCode}></mm-code-block>
        <mm-text-list
          variant="check"
          .texts=${[
            rule(
              html`
                ${code('value')}를 옵션의 key로 사용한다
              `,
              '선택 상태와 목록 렌더가 같은 값을 기준으로 삼는다',
            ),
            html`
              고유 필드는 ${code('OptionItem')}에 교차 타입으로 더한다
            `,
          ]}
        ></mm-text-list>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="접근성">
        <mm-text-list
          variant="check"
          .texts=${[
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
