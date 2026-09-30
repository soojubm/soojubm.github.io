import '@/components/common'
import { html } from 'lit'

import { ICON_NAMES, STATUS_ICONS } from '@/components/common'
import '@/components/layouts/app-sidebar/sidebar-page-link'
import {
  code,
  codeList,
  rule,
  type ComponentReferenceItemData,
} from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

/**
 * 상태 토큰을 아래 목록과 같은 순서로 칠한 스와치. 스와치는 공통 박스를 쓰고,
 * 토큰마다 달라지는 선언만 얹는다. 색만 담은 토큰은 두께·스타일과 함께 조립한다.
 */
const interactionTokens = [
  'interaction-focus-outline',
  'interaction-hover-background-color',
  'interaction-hover-lift',
  'interaction-active-background-color',
  'interaction-active-shadow',
  'interaction-selected-background-color',
  'interaction-selected-foreground-color',
  'interaction-selected-border-color',
]

const interactionSwatches = [
  'outline: var(--interaction-focus-outline); outline-offset: -4px',
  'background: var(--interaction-hover-background-color)',
  'border: var(--border); transform: var(--interaction-hover-lift)',
  'background: var(--interaction-active-background-color)',
  'box-shadow: var(--interaction-active-shadow)',
  'background: var(--interaction-selected-background-color)',
  'background: var(--interaction-selected-foreground-color)',
  'border: var(--border-width) solid var(--interaction-selected-border-color)',
]

const interactionReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://m3.material.io/foundations/interaction/states/state-layers',
    label: 'MD3 - State Layers',
  },
  {
    href: 'https://spectrum.adobe.com/page/states/',
    label: 'Adobe Spectrum - States',
  },
]

const currentComponentRows = html`
  <tr>
    <th scope="row">${code('page')}</th>
    <td>페이지·라우트</td>
    <td>
      ${codeList([
        'mm-breadcrumb',
        'mm-pagination',
        'mm-page-button',
        'mm-bottom-bar',
        'mm-sidebar-page-link',
      ])}
    </td>
  </tr>
  <tr>
    <th scope="row">${code('step')}</th>
    <td>진행 단계</td>
    <td>${code('mm-step-item')}</td>
  </tr>
`
const selectionReferences: ComponentReferenceItemData[] = [
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
      heading="Interaction"
      description="어떤 요소가 상호작용할 수 있는지, 상호작용할 때 어떻게 반응하는지, 선택지를 어떻게 고르는지를 일관된 시각 언어로 정의합니다. 상태는 색상만으로 전달하지 않습니다."
    ></mm-page-header>

    <mm-content-section-list>
      <mm-tab-list value="state" variant="pill" search-param="tab">
        <mm-tab value="state">State</mm-tab>
        <mm-tab value="selection">Selection</mm-tab>
      </mm-tab-list>

      <mm-tab-panel value="state">
        <mm-content-section-list>
          <mm-content-section heading-level="3" heading="상호작용 기표">
            <mm-paragraph>
              클릭 가능성은 형태로 드러냅니다. 이 단서는 장식이나 일반 강조로 쓰지 않습니다.
            </mm-paragraph>
            <mm-grid columns="3">
              <mm-surface variant="elevated">
                <mm-paragraph>
                  떠 있는 표면은 그 자체가 클릭 대상이거나 안에 클릭할 요소를 담습니다. 표면 자체가
                  대상이면 hover에서 한 단계 더 떠올라 이를 확인시킵니다.
                </mm-paragraph>
              </mm-surface>
              <mm-surface variant="filled">
                <mm-paragraph>채워진 배경은 안에 실행 가능한 액션이 있음을 알립니다.</mm-paragraph>
              </mm-surface>
              <mm-surface variant="ghost">
                <mm-paragraph>
                  <mm-link href="#">브랜드 색 텍스트·아이콘</mm-link>
                  은 이동하거나 실행하는 링크입니다.
                </mm-paragraph>
              </mm-surface>
            </mm-grid>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="토큰">
            <mm-paragraph>상호작용 상태가 공유하는 토큰입니다.</mm-paragraph>
            <mm-token-stage>
              <mm-token-swatches .swatches=${interactionSwatches}></mm-token-swatches>
            </mm-token-stage>
            <mm-token-group aria-label="interaction tokens">
              ${interactionTokens.map(
                key => html`
                  <mm-token-item key=${key}></mm-token-item>
                `,
              )}
            </mm-token-group>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="조작 상태">
            <mm-paragraph>UI 요소의 상호작용 상태입니다.</mm-paragraph>
            <mm-list-item-group>
              <mm-list-item
                icon=${ICON_NAMES.CLICK}
                size="medium"
                label="Hover"
                description="포인터가 올라와 있다는 표시입니다."
              ></mm-list-item>
              <mm-list-item
                icon=${ICON_NAMES.CUBE_SCAN}
                size="medium"
                label="Focus"
                description="키보드가 지금 이 요소에 있다는 표시입니다."
              ></mm-list-item>
              <mm-list-item
                icon=${ICON_NAMES.MOUSE_BUTTON}
                size="medium"
                label="Active"
                description="지금 누르고 있다는 표시입니다."
              ></mm-list-item>
              <mm-list-item
                icon=${ICON_NAMES.LOCK}
                size="medium"
                label="Disabled"
                description="지금은 조작을 받지 않는다는 표시입니다."
              ></mm-list-item>
            </mm-list-item-group>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="결과 상태">
            <mm-paragraph>UI 요소의 상호작용 결과 상태입니다.</mm-paragraph>
            <mm-list-item-group>
              <mm-list-item
                icon=${ICON_NAMES.PRESSED}
                size="medium"
                label="Pressed"
                description="그룹 없이 스스로 눌린 상태를 유지한다는 표시입니다."
              ></mm-list-item>
              <mm-list-item
                icon=${ICON_NAMES.CHECK}
                size="medium"
                label="Checked"
                description="컨트롤의 on/off 값이 켜져 있다는 표시입니다."
              ></mm-list-item>
              <mm-list-item
                icon=${ICON_NAMES.SELECTED}
                size="medium"
                label="Selected"
                description="목록에서 고른 항목이라는 표시입니다."
              ></mm-list-item>
              <mm-list-item
                icon=${ICON_NAMES.CURRENT}
                size="medium"
                label="Current"
                description="내비게이션에서 지금 위치한 곳이라는 표시입니다."
              ></mm-list-item>
              <mm-list-item
                icon=${ICON_NAMES.WARNING}
                size="medium"
                label="Invalid"
                description="입력값이 유효하지 않다는 표시입니다."
              ></mm-list-item>
            </mm-list-item-group>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="Current">
            <mm-paragraph>
              ${code('aria-current')}가 필요한 엘리먼트에 ${code('mm-current-indicator')}를 씁니다.
            </mm-paragraph>
            <mm-surface variant="outlined" radius="large">
              <mm-flex gap="6" align-items="center">
                <mm-flex direction="column" gap="4" align-items="center">
                  <mm-flex gap="1">
                    <mm-page-button page="1"></mm-page-button>
                    <mm-page-button page="2" aria-current="page"></mm-page-button>
                    <mm-page-button page="3"></mm-page-button>
                  </mm-flex>
                  <mm-caption>가로 배치</mm-caption>
                </mm-flex>
                <mm-flex direction="column" gap="2" align-items="center">
                  <mm-sidebar-page-link
                    href="./interaction.html"
                    emoji="#"
                    label="Interaction"
                  ></mm-sidebar-page-link>
                  <mm-caption>세로 배치</mm-caption>
                </mm-flex>
              </mm-flex>
            </mm-surface>
            <mm-table
              .rows=${currentComponentRows}
              caption="aria-current 값과 가리키는 대상, 그것을 쓰는 컴포넌트"
              .columns=${[
                { label: '값', width: '160px' },
                { label: '가리키는 대상', width: '160px' },
                { label: '컴포넌트' },
              ]}
            ></mm-table>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="의미 상태">
            <mm-text-list
              variant="check"
              .texts=${[
                rule(
                  '사용자 행동으로 인한 오류와 시스템 오류를 구분한다',
                  '시스템 오류로 실패하면 단순 "오류" 대신 무엇이 잘못됐는지 명확히 설명하여 사용자가 다시 시도할 수 있게 안내한다',
                ),
              ]}
            ></mm-text-list>

            <mm-list-item-group>
              <mm-list-item
                icon=${STATUS_ICONS.success}
                size="medium"
                label="Success"
                description="작업이 성공적으로 완료되었음을 나타냅니다."
              ></mm-list-item>
              <mm-list-item
                icon=${STATUS_ICONS.info}
                size="medium"
                label="Info"
                description="사용자에게 참고 가능한 보조 정보를 제공합니다."
              ></mm-list-item>
              <mm-list-item
                icon=${STATUS_ICONS.warning}
                size="medium"
                label="Warning"
                description="진행 전에 사용자의 주의가 필요한 상태입니다."
              ></mm-list-item>
              <mm-list-item
                icon=${STATUS_ICONS.error}
                size="medium"
                label="Error"
                description="오류, 실패, 수정이 필요한 상태를 나타냅니다."
              ></mm-list-item>
              <mm-list-item
                icon=${STATUS_ICONS.done}
                size="medium"
                label="Done"
                description="작업이 끝나 더 이상 진행할 것이 없음을 나타냅니다."
              ></mm-list-item>
            </mm-list-item-group>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="데이터 상태">
            <mm-list-item-group>
              <mm-list-item
                icon=${ICON_NAMES.IDLE}
                size="medium"
                label="Idle"
                description="아직 아무 요청도 하지 않은 대기·초기 상태입니다."
              ></mm-list-item>
              <mm-list-item
                icon=${ICON_NAMES.REFRESH}
                size="medium"
                label="Pending / Fetching"
                description="데이터를 가져오는 중입니다. 스켈레톤이나 스피너를 노출합니다."
              ></mm-list-item>
              <mm-list-item
                icon=${ICON_NAMES.SUCCESS}
                size="medium"
                label="Resolved / Success"
                description="데이터를 성공적으로 가져와 정상 UI를 노출합니다."
              ></mm-list-item>
              <mm-list-item
                icon=${ICON_NAMES.FAILURE}
                size="medium"
                label="Rejected / Failed"
                description="데이터를 가져오는 데 실패해 에러 화면을 노출합니다."
              ></mm-list-item>
              <mm-list-item
                icon=${ICON_NAMES.EMPTY}
                size="medium"
                label="Empty"
                description="완료되었으나 데이터가 0건일 때 빈 화면을 노출합니다."
              ></mm-list-item>
            </mm-list-item-group>
          </mm-content-section>

          <mm-component-references .items=${interactionReferences}></mm-component-references>
        </mm-content-section-list>
      </mm-tab-panel>

      <mm-tab-panel value="selection">
        <mm-content-section-list>
          <mm-paragraph>
            선택지 가운데 값을 고르는 컴포넌트가 공유하는 계약입니다. 선택 개수와 선택지 수로
            컴포넌트를 고르고 선택 상태는 항목이 아닌 그룹이 소유하므로, 사용자는 어떤 선택
            컴포넌트에서도 같은 방식으로 값을 고르고 바꿀 수 있습니다.
          </mm-paragraph>
          <mm-notice>
            <mm-text size="14">
              ${code('mm-tab')}은 ${code('aria-selected')}를 쓰지만 값을 고르는 selection이 아니라
              보이는 콘텐츠를 바꾸는 content switching 맥락에 속합니다.
            </mm-text>
          </mm-notice>

          <mm-content-section heading-level="3" heading="Overview">
            <mm-grid columns="2" gap="4">
              <mm-surface>
                <mm-content-section heading-level="3" heading="단일 선택">
                  <mm-paragraph>
                    선택지가 5개 이하면 ${code('mm-radio-group')} ·
                    ${code('mm-toggle-button-group')}으로 펼쳐 보이고, 6개부터는
                    ${code('mm-select')}로 접습니다.
                  </mm-paragraph>
                </mm-content-section>
              </mm-surface>
              <mm-surface>
                <mm-content-section heading-level="3" heading="다중 선택">
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
              기본값은 기존 데이터가 그 값을 뒷받침할 때 미리 선택합니다. 미리 선택된 값은 응답을 그
              값 쪽으로 편향시키기 때문입니다.
            </mm-paragraph>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="상태 소유">
            <mm-paragraph>
              선택 상태는 항목이 아니라 그룹이 소유하며, ${code('SingleSelectionController')} ·
              ${code('MultipleSelectionController')} · ${code('SelectionGroupController')}가 이를
              맡습니다. 하나를 고르면 ${code('value')}, 여럿을 고르면 ${code('values')}에 두고,
              바뀌면 같은 이름으로 ${code('change')}에 담아 알립니다. 선택지 없이 값 하나를 켜고
              끄는 컴포넌트만 그룹 없이 자기 상태를 갖습니다.
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
              Checked·Selected와 같은 강조 토큰을 공유합니다. ${code('mm-toggle-button')}과 그
              시맨틱 컴포넌트(follow·bookmark·reveal), toggle·filter 버튼 그룹이 씁니다.
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
              컬렉션에서 고른 항목입니다. ${code('mm-select')}의 옵션이 ${code('aria-selected')}로
              고른 값을 나타내며, 강조 토큰은 Checked와 같습니다.
            </mm-paragraph>
            <mm-paragraph>
              체크 표시는 ${code('mm-selected-indicator')}가 ${code('selected')}를 받아 체크 노출로
              반영하는 표시만 맡고, 선택 상호작용과 ${code('aria-selected')}는 옵션이 소유합니다.
              고르지 않은 행에도 자리를 남겨 행마다 트레일링 폭이 같습니다.
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
                    ${code('mm-toggle-button-group')} · ${code('mm-filter-button-group')}이 이
                    방식을 따른다
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

          <mm-component-references .items=${selectionReferences}></mm-component-references>
        </mm-content-section-list>
      </mm-tab-panel>
    </mm-content-section-list>
  </mm-main>
`

renderPage(main)
