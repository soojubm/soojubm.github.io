import '@/components/common'
import { html, nothing, type TemplateResult } from 'lit'

import { ICON_NAMES, STATUS_ICONS } from '@/components/common'
import '@/components/layouts/app-sidebar/sidebar-page-link'
import { code, codeList, rule } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'
import './interaction.css'

/**
 * 상태 토큰을 목록과 같은 순서로 칠한 스와치. 스와치는 공통 박스를 쓰고,
 * 토큰마다 달라지는 선언만 얹는다. 색만 담은 토큰은 두께·스타일과 함께 조립한다.
 * 섹션마다 그 섹션 상태들의 토큰을 스와치와 목록 한 벌로 전시한다.
 */
const operationTokens = [
  'interaction-focus-outline',
  'interaction-hover-background-color',
  'interaction-hover-lift',
  'interaction-active-background-color',
  'interaction-active-shadow',
]

const operationSwatches = [
  'outline: var(--interaction-focus-outline); outline-offset: -4px',
  'background: var(--interaction-hover-background-color)',
  'border: var(--border); transform: var(--interaction-hover-lift)',
  'background: var(--interaction-active-background-color)',
  'box-shadow: var(--interaction-active-shadow)',
]

const selectedTokens = [
  'interaction-selected-background-color',
  'interaction-selected-foreground-color',
  'interaction-selected-border-color',
]

const selectedSwatches = [
  'background: var(--interaction-selected-background-color)',
  'background: var(--interaction-selected-foreground-color)',
  'border: var(--border-selected)',
]

const semanticTokens = ['foreground-warning-color', 'foreground-danger-color']

const semanticSwatches = [
  'background: var(--foreground-warning-color)',
  'background: var(--foreground-danger-color)',
]

// 섹션 제목 아래에서 상태들이 공유하는 토큰을 스와치와 목록 한 벌로 보여 준다.
const renderTokenSet = (label: string, tokens: string[], swatches: string[]) => html`
  <mm-component-example full-width>
    <mm-flex direction="column" gap="4">
      <mm-token-stage>
        <mm-token-swatches .swatches=${swatches}></mm-token-swatches>
      </mm-token-stage>
      <mm-token-group aria-label=${`${label} tokens`}>
        ${tokens.map(
          key => html`
            <mm-token-item key=${key}></mm-token-item>
          `,
        )}
      </mm-token-group>
    </mm-flex>
  </mm-component-example>
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

type ComponentUsage = { label: TemplateResult | string; components: string[] }

const pressedUsages: ComponentUsage[] = [
  {
    label: '단독 버튼',
    components: ['mm-toggle-button', 'mm-follow-button', 'mm-bookmark-button', 'mm-reveal-button'],
  },
  { label: '그룹의 항목', components: ['mm-toggle-button-group', 'mm-filter-button-group'] },
]

const checkedUsages: ComponentUsage[] = [
  {
    label: code('checked'),
    components: ['mm-checkbox', 'mm-radio', 'mm-switch', 'mm-checkbox-group', 'mm-radio-group'],
  },
  {
    label: code('aria-checked'),
    components: ['mm-menu-item-radio', 'mm-menu-item-checkbox', 'mm-menu-item-switch'],
  },
]

const selectedUsages: ComponentUsage[] = [
  { label: '목록의 옵션', components: ['mm-select-option'] },
  { label: '탭', components: ['mm-tab'] },
]

const renderUsages = (usages: ComponentUsage[]) => html`
  <mm-surface>
    <mm-text-list
      .texts=${usages.map(
        ({ label, components }) => html`
          ${label}: ${codeList(components)}
        `,
      )}
    ></mm-text-list>
  </mm-surface>
`

type ComponentBlock = { label: string; description?: string; components: string[] }

const selectionOwnerBlocks: ComponentBlock[] = [
  {
    label: 'SingleSelection',
    description: 'value: string',
    components: [
      'mm-radio-group',
      'mm-radio-card-group',
      'mm-toggle-button-group',
      'mm-filter-button-group',
      'mm-menu-item-radio-group',
    ],
  },
  {
    label: 'MultipleSelection',
    description: 'values: string[]',
    components: ['mm-checkbox-group', 'mm-filter-button-group', 'mm-menu-item-checkbox-group'],
  },
]

/** list-item 하나를 제목으로 두고, 아래 surface에 쓰는 컴포넌트를 나열한다. */
const renderComponentBlocks = (blocks: ComponentBlock[]) => html`
  <mm-flex direction="column" gap="6">
    ${blocks.map(
      ({ label, description, components }) => html`
        <mm-flex direction="column" gap="2">
          <mm-list-item
            size="medium"
            label=${label}
            description=${description ?? ''}
          ></mm-list-item>
          <mm-surface>
            <mm-paragraph>${codeList(components)}</mm-paragraph>
          </mm-surface>
        </mm-flex>
      `,
    )}
  </mm-flex>
`

const selectionRows = html`
  <tr>
    <th scope="row">${code('mm-radio-group')}</th>
    <td>Single</td>
    <td>배열</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-radio-card-group')}</th>
    <td>Single</td>
    <td>자식 요소</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-toggle-button-group')}</th>
    <td>Single</td>
    <td>배열</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-select')}</th>
    <td>Single</td>
    <td>배열</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-filter-button-group')}</th>
    <td>Single · Multiple</td>
    <td>배열</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-menu-item-radio-group')}</th>
    <td>Single</td>
    <td>배열</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-checkbox-group')}</th>
    <td>Multiple</td>
    <td>배열</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-menu-item-checkbox-group')}</th>
    <td>Multiple</td>
    <td>배열</td>
  </tr>
`

const selectionTableColumns = [
  { label: '컴포넌트', width: '240px' },
  { label: '선택', width: '140px' },
  { label: '옵션 전달' },
]

/** 조작 상태마다 그 상태의 토큰을 입힌 도형과 이름·선택자·설명을 한 카드로 보여 준다. */
const operationStates = [
  { state: 'hover', selector: ':hover', description: '포인터가 올라와 있다는 표시입니다.' },
  {
    state: 'focus',
    selector: ':focus-visible',
    description:
      '키보드가 지금 이 요소에 있다는 표시입니다. 포인터로 누른 요소에는 링이 남지 않습니다.',
  },
  { state: 'active', selector: ':active', description: '지금 누르고 있다는 표시입니다.' },
  {
    state: 'disabled',
    selector: 'disabled',
    description: '지금은 조작을 받지 않는다는 표시입니다.',
  },
]

// 선택자가 상태 이름과 같으면(disabled) 같은 태그를 두 번 보이지 않는다.
const renderSelector = (state: string, selector: string) => {
  if (selector === state) return nothing

  return html`
    <mm-code-tag>${selector}</mm-code-tag>
  `
}

const renderOperationState = ({
  state,
  selector,
  description,
}: (typeof operationStates)[number]) => html`
  <mm-flex direction="column" gap="3">
    <span class="state-figure" data-state=${state} aria-hidden="true"></span>
    <mm-flex direction="column" align-items="flex-start" gap="1">
      <mm-tag-group>
        <mm-code-tag tone="purple">${state}</mm-code-tag>
        ${renderSelector(state, selector)}
      </mm-tag-group>
      <mm-caption>${description}</mm-caption>
    </mm-flex>
  </mm-flex>
`

const main = html`
  <mm-main>
    <mm-page-header
      heading="Interaction"
      description="어떤 요소가 상호작용할 수 있는지, 상호작용할 때 어떻게 반응하는지, 선택지를 어떻게 고르는지를 일관된 시각 언어로 정의합니다. 상태가 색상에만 기대지 않고 같은 방식으로 드러나므로, 사용자는 무엇을 누를 수 있고 지금 어떤 상태인지 바로 알아봅니다."
    ></mm-page-header>

    <mm-page-body>
      <mm-tab-list value="state" variant="text" search-param="tab">
        <mm-tab value="state">State</mm-tab>
        <mm-tab value="selection">Selection</mm-tab>
      </mm-tab-list>

      <mm-tab-panel value="state">
        <mm-content-section-list>
          <mm-content-section heading-level="3" heading="상호작용 단서">
            <mm-paragraph>
              클릭 가능성은 형태로 드러냅니다. 이 단서는 장식이나 일반 강조로 쓰지 않습니다.
            </mm-paragraph>
            <mm-grid columns="3">
              <mm-surface variant="elevated">
                <mm-paragraph>
                  떠 있는 표면은 그 자체가 클릭 대상이거나 안에 클릭할 요소를 넣습니다. 표면 자체가
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

          <mm-content-section heading-level="3" heading="조작 상태">
            <mm-paragraph>UI 요소의 상호작용 상태입니다.</mm-paragraph>
            ${renderTokenSet('조작 상태', operationTokens, operationSwatches)}
            <mm-grid columns="4" gap="6">${operationStates.map(renderOperationState)}</mm-grid>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="결과 상태">
            <mm-paragraph>UI 요소의 상호작용 결과 상태입니다.</mm-paragraph>
            ${renderTokenSet('결과 상태', selectedTokens, selectedSwatches)}
            <mm-flex direction="column" gap="6">
              <mm-flex direction="column" gap="2">
                <mm-list-item
                  icon=${ICON_NAMES.PRESSED}
                  size="medium"
                  label="Pressed"
                  description="그룹 없이 스스로 눌린 상태를 유지한다는 표시입니다."
                >
                  <mm-code slot="trailing">aria-pressed</mm-code>
                </mm-list-item>
                ${renderUsages(pressedUsages)}
              </mm-flex>
              <mm-flex direction="column" gap="2">
                <mm-list-item
                  icon=${ICON_NAMES.CHECK}
                  size="medium"
                  label="Checked"
                  description="컨트롤의 on/off 값이 켜져 있다는 표시입니다."
                >
                  <mm-code slot="trailing">aria-checked/checked</mm-code>
                </mm-list-item>
                ${renderUsages(checkedUsages)}
                <mm-caption>
                  눌러서 켜고 끄는 버튼은 Pressed, 값을 고르는 컨트롤은 Checked를 씁니다.
                </mm-caption>
              </mm-flex>
              <mm-flex direction="column" gap="2">
                <mm-list-item
                  icon=${ICON_NAMES.SELECTED}
                  size="medium"
                  label="Selected"
                  description="목록에서 고른 항목이라는 표시입니다."
                >
                  <mm-code slot="trailing">aria-selected</mm-code>
                </mm-list-item>
                ${renderUsages(selectedUsages)}
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
              </mm-flex>
              <mm-flex direction="column" gap="2">
                <mm-list-item
                  icon=${ICON_NAMES.CURRENT}
                  size="medium"
                  label="Current"
                  description="내비게이션에서 지금 위치한 곳이라는 표시입니다."
                >
                  <mm-code slot="trailing">aria-current</mm-code>
                </mm-list-item>
                <mm-caption>
                  Current는 논리상 지금 어느 페이지에 있는지를 알리는 위치 표시지만, UI 형태는 선택
                  상태와 같아 함께 둡니다.
                </mm-caption>
              </mm-flex>
              <mm-separator></mm-separator>
              <mm-list-item
                icon=${STATUS_ICONS.error}
                size="medium"
                label="Invalid"
                description="입력값이 유효하지 않아 수정이 필요하다는 표시입니다."
              >
                <mm-code slot="trailing">aria-invalid</mm-code>
              </mm-list-item>
            </mm-flex>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="의미 상태">
            <mm-paragraph>
              사용자 행동으로 인한 오류와 시스템 오류를 구분합니다. 시스템 오류로 실패하면 단순히
              "오류"라고 하지 않고 무엇이 잘못됐는지 설명해, 사용자가 다시 시도할 수 있게
              안내합니다.
            </mm-paragraph>
            ${renderTokenSet('의미 상태', semanticTokens, semanticSwatches)}

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
            <mm-paragraph>데이터를 요청한 뒤 화면이 거치는 상태입니다.</mm-paragraph>
            <mm-list-item-group>
              <mm-list-item
                icon=${ICON_NAMES.IDLE}
                size="medium"
                label="Idle"
                description="아직 아무 요청도 하지 않은 대기·초기 상태입니다."
              ></mm-list-item>
              <mm-list-item
                icon=${ICON_NAMES.TIMER}
                size="medium"
                label="Pending"
                description="데이터를 가져오는 중입니다. mm-spinner로 진행 중임을 알립니다."
              ></mm-list-item>
              <mm-list-item
                icon=${ICON_NAMES.SUCCESS}
                size="medium"
                label="Resolved"
                description="데이터를 성공적으로 가져와 정상 UI를 노출합니다."
              ></mm-list-item>
              <mm-list-item
                icon=${ICON_NAMES.FAILURE}
                size="medium"
                label="Rejected"
                description="데이터를 가져오지 못했습니다. mm-result로 이유와 다시 시도를 제시합니다."
              ></mm-list-item>
              <mm-list-item
                icon=${ICON_NAMES.EMPTY}
                size="medium"
                label="Empty"
                description="완료되었으나 데이터가 0건입니다. mm-result로 빈 상태와 다음 행동을 제시합니다."
              ></mm-list-item>
            </mm-list-item-group>
          </mm-content-section>
        </mm-content-section-list>
      </mm-tab-panel>

      <mm-tab-panel value="selection">
        <mm-content-section-list>
          <mm-flex direction="column" gap="3">
            <mm-grid columns="2" gap="4">
              <mm-surface>
                <mm-content-section heading-level="3" heading="단일 선택">
                  <mm-paragraph>
                    선택지 가운데 하나만 고르며, 다른 선택지를 고르면 이전 선택이 해제됩니다.
                  </mm-paragraph>
                </mm-content-section>
              </mm-surface>
              <mm-surface>
                <mm-content-section heading-level="3" heading="다중 선택">
                  <mm-paragraph>선택지마다 켜고 꺼서 원하는 만큼 고릅니다.</mm-paragraph>
                </mm-content-section>
              </mm-surface>
            </mm-grid>
            <mm-table
              .rows=${selectionRows}
              caption="값을 고르는 컴포넌트의 선택 개수·옵션 전달 방식 비교"
              .columns=${selectionTableColumns}
            ></mm-table>
            <mm-notice>
              <mm-text size="14">
                ${code('mm-tab')}은 ${code('aria-selected')}를 쓰지만 값을 고르는 selection이 아니라
                보이는 콘텐츠를 바꾸는 content switching 맥락에 속합니다.
              </mm-text>
            </mm-notice>
          </mm-flex>

          <mm-content-section heading-level="3" heading="기본값">
            <mm-text-list
              variant="check"
              .texts=${[
                rule(
                  '기본값을 설정하지 않는다',
                  '미리 선택된 값은 응답을 그 값 쪽으로 편향시킨다. 사용자가 직접 고르게 해야 선택이 사용자의 의도를 반영한다',
                ),
              ]}
            ></mm-text-list>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="상태 소유">
            <mm-paragraph>
              선택 상태는 항목이 아니라 그룹이 소유하고, 바뀌면 ${code('change')}로 알립니다. 값은
              단일 선택이면 ${code('detail.value')}, 다중 선택이면 ${code('detail.values')}로
              전달합니다. 선택지 없이 값 하나를 켜고 끄는 컴포넌트만 그룹 없이 자기 상태를 갖습니다.
            </mm-paragraph>
            ${renderComponentBlocks(selectionOwnerBlocks)}
            <mm-paragraph>
              ${code('mm-radio-card-group')}만 옵션 배열 대신 카드를 자식으로 받습니다. 카드는
              가격·배지· 설명처럼 배열로 표현할 수 없는 콘텐츠를 담기 때문입니다. 값은 그룹이
              소유하고, 카드가 바뀌면 그룹이 자기 ${code('change')}로 다시 알립니다.
            </mm-paragraph>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="옵션 타입">
            <mm-text-list
              .texts=${[
                html`
                  선택지를 옵션 배열로 받는 컴포넌트는 ${code('OptionItem')}을 쓴다
                `,
                html`
                  ${code('value')}를 옵션의 key로 사용한다
                `,
                html`
                  고유 필드는 ${code('OptionItem')}에 교차 타입으로 더한다.
                  ${code('FilterOption')}의 ${code('selectAll')}처럼 한 컴포넌트만 쓰는 필드는 공통
                  타입에 섞지 않는다
                `,
              ]}
            ></mm-text-list>
            <mm-code-block language="typescript" .code=${optionItemCode}></mm-code-block>
          </mm-content-section>
        </mm-content-section-list>
      </mm-tab-panel>
    </mm-page-body>
  </mm-main>
`

renderPage(main)
