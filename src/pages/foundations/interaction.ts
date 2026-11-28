import '@/components/common'
import { html, nothing, type TemplateResult } from 'lit'

import { ICON_NAMES } from '@/components/common'
import '@/components/layouts/app-sidebar/sidebar-page-link'
import { code } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'
import './interaction.css'

const optionItemCode = `type OptionItem = {
  value: string // 옵션의 key로 사용한다
  label: string
  icon?: IconName
  disabled?: boolean
}

type FilterOption = OptionItem & {
  selectAll?: boolean
}`

type SelectionComponent = { name: string; options: 'options' | 'children' }

const singleSelectionComponents: SelectionComponent[] = [
  { name: 'fff-radio-group', options: 'options' },
  { name: 'fff-radio-card-group', options: 'children' },
  { name: 'fff-toggle-button-group', options: 'options' },
  { name: 'fff-select', options: 'options' },
  { name: 'fff-filter-button-group', options: 'options' },
  { name: 'fff-menu-item-radio-group', options: 'options' },
]

const multipleSelectionComponents: SelectionComponent[] = [
  { name: 'fff-filter-button-group', options: 'options' },
  { name: 'fff-checkbox-group', options: 'options' },
  { name: 'fff-menu-item-checkbox-group', options: 'options' },
]

/** 선택 컴포넌트 이름과 옵션 전달 방식을 색으로 구분된 코드 태그로 나열한다. */
const renderSelectionComponents = (components: SelectionComponent[]) => html`
  <fff-flex direction="column" gap="2">
    ${components.map(
      ({ name, options }) => html`
        <fff-tag-group>
          <fff-code-tag>${name}</fff-code-tag>
          <fff-code-tag tone=${options === 'children' ? 'pink' : 'purple'}>${options}</fff-code-tag>
        </fff-tag-group>
      `,
    )}
  </fff-flex>
`

type StateCard = {
  state: string
  selectors: string[]
  /** 같은 카드를 함께 쓰는 다른 상태 이름. 상태 태그와 같은 색으로 나란히 보인다. */
  aliases?: string[]
  description: string
  tokens: string[]
  note?: string
  /** 도형 대신 썸네일 안에 놓을 내용. */
  figure?: TemplateResult
  /** 이 상태를 화면에 드러내는 컴포넌트. */
  components?: string[]
}

/** 조작 상태마다 그 상태의 토큰을 입힌 도형과 이름·선택자·설명을 한 카드로 보여 준다. */
const operationStates: StateCard[] = [
  {
    state: 'hover',
    selectors: [':hover'],
    description: '포인터가 올라와 있다는 표시입니다.',
    tokens: ['interaction-hover-background-color', 'interaction-hover-lift'],
  },
  {
    state: 'focus',
    selectors: [':focus-visible'],
    tokens: ['interaction-focus-outline'],
    description:
      '키보드가 지금 이 요소에 있다는 표시입니다. 포인터로 누른 요소에는 링이 남지 않습니다.',
  },
  {
    state: 'active',
    selectors: [':active'],
    description: '지금 누르고 있다는 표시입니다.',
    tokens: ['interaction-active-background-color', 'interaction-active-shadow'],
  },
  {
    state: 'disabled',
    selectors: ['disabled'],
    description: '지금은 조작을 받지 않는다는 표시입니다.',
    tokens: ['interaction-disabled-opacity'],
  },
]

const checkedIndicator = html`
  <fff-selected-indicator selected></fff-selected-indicator>
`

const currentIndicator = html`
  <fff-current-indicator></fff-current-indicator>
`

const semanticStates: StateCard[] = [
  {
    state: 'warning',
    selectors: [],
    description: '진행 전에 사용자의 주의가 필요한 상태입니다.',
    tokens: ['foreground-warning-color'],
  },
  {
    state: 'error',
    selectors: ['aria-invalid'],
    description:
      '오류, 실패, 수정이 필요한 상태를 나타냅니다. 입력값이 유효하지 않으면 aria-invalid로 표시합니다.',
    tokens: ['foreground-danger-color'],
  },
  {
    state: 'success',
    selectors: [],
    aliases: ['info', 'done'],
    description: '사용처가 없어 정의하지 않았습니다.',
    note: '성공은 작업이 성공적으로 완료되었음을, 안내는 참고 가능한 보조 정보를, 완료는 더 이상 진행할 것이 없음을 나타냅니다.',
    tokens: [],
  },
]

const dataIcon = (name: string) => html`
  <fff-icon name=${name}></fff-icon>
`

const dataStates: StateCard[] = [
  {
    state: 'idle',
    selectors: [],
    description: '아직 아무 요청도 하지 않은 대기·초기 상태입니다.',
    figure: dataIcon(ICON_NAMES.IDLE),
    tokens: [],
  },
  {
    state: 'pending',
    selectors: [],
    description: '데이터를 가져오는 중입니다. 진행 중임을 보여 줍니다.',
    figure: dataIcon(ICON_NAMES.TIMER),
    components: ['fff-spinner'],
    tokens: [],
  },
  {
    state: 'resolved',
    selectors: [],
    description: '데이터를 성공적으로 가져와 정상 UI를 노출합니다.',
    figure: dataIcon(ICON_NAMES.SUCCESS),
    tokens: [],
  },
  {
    state: 'rejected',
    selectors: [],
    description: '데이터를 가져오지 못했습니다. 이유와 다시 시도를 제시합니다.',
    figure: dataIcon(ICON_NAMES.FAILURE),
    components: ['fff-result'],
    tokens: [],
  },
  {
    state: 'empty',
    selectors: [],
    description: '완료되었으나 데이터가 0건입니다. 빈 상태와 다음 행동을 제시합니다.',
    figure: dataIcon(ICON_NAMES.EMPTY),
    components: ['fff-result'],
    tokens: [],
  },
]

const selectedKeys = [
  'interaction-selected-background-color',
  'interaction-selected-foreground-color',
  'interaction-selected-border-color',
]

const resultStates: StateCard[] = [
  {
    state: 'pressed',
    selectors: ['aria-pressed'],
    description: '그룹 없이 스스로 눌린 상태를 유지한다는 표시입니다.',
    tokens: [],
  },
  {
    state: 'checked',
    selectors: ['aria-checked', 'checked'],
    description: '컨트롤의 on/off 값이 켜져 있다는 표시입니다.',
    figure: checkedIndicator,
    note: '눌러서 켜고 끄는 버튼은 Pressed, 값을 고르는 컨트롤은 Checked를 씁니다.',
    tokens: [],
  },
  {
    state: 'selected',
    selectors: ['aria-selected'],
    description: '목록에서 고른 항목이라는 표시입니다.',
    tokens: [],
  },
  {
    state: 'current',
    figure: currentIndicator,
    selectors: ['aria-current'],
    description: '내비게이션에서 지금 위치한 곳이라는 표시입니다.',
    note: 'Current는 논리상 지금 어느 페이지에 있는지를 알리는 위치 표시지만, UI 형태는 선택 상태와 같아 함께 둡니다.',
    tokens: [],
  },
]

const renderSelector = (selector: string) => html`
  <fff-code-tag>${selector}</fff-code-tag>
`

// 상태가 쓰는 토큰을 카드 안에 이름·값으로 보여 준다. 토큰이 없는 상태는 그리지 않는다.
const renderStateTokens = (state: string, tokens: string[]) => {
  if (!tokens.length) return nothing

  return html`
    <fff-token-group aria-label=${`${state} tokens`}>
      ${tokens.map(
        key => html`
          <fff-token-item key=${key}></fff-token-item>
        `,
      )}
    </fff-token-group>
  `
}

const renderStateCard = ({
  state,
  selectors,
  aliases = [],
  description,
  tokens,
  note,
  figure,
  components = [],
}: StateCard) => html`
  <fff-figure-card description=${description}>
    <span class="state-figure" slot="figure" data-state=${state}>${figure}</span>
    ${[state, ...aliases].map(
      name => html`
        <fff-code-tag slot="tags" tone="purple">${name}</fff-code-tag>
      `,
    )}
    ${selectors
      .filter(selector => selector !== state)
      .map(
        selector => html`
          <fff-code-tag slot="tags">${selector}</fff-code-tag>
        `,
      )}
    ${components.map(
      component => html`
        <fff-code-tag slot="tags" tone="green">${component}</fff-code-tag>
      `,
    )}
    ${note
      ? html`
          <fff-caption>${note}</fff-caption>
        `
      : nothing}
    ${renderStateTokens(state, tokens)}
  </fff-figure-card>
`

const main = html`
  <fff-main>
    <fff-page-header
      heading="Interaction"
      description="어떤 요소가 상호작용할 수 있는지, 상호작용할 때 어떻게 반응하는지, 선택 옵션을 어떻게 고르는지를 일관된 시각 언어로 정의합니다. 상태가 색상에만 기대지 않고 같은 방식으로 드러나므로, 사용자는 무엇을 누를 수 있고 지금 어떤 상태인지 바로 알아봅니다."
    ></fff-page-header>

    <fff-page-body>
      <fff-tab-list
        value="state"
        variant="text"
        search-param="tab"
        .tabs=${[
          { value: 'state', label: 'State' },
          { value: 'selection', label: 'Selection' },
        ]}
      ></fff-tab-list>

      <fff-tab-panel value="state">
        <fff-content-section-list>
          <fff-content-section
            heading-level="3"
            heading="상호작용 단서"
            description="클릭 가능성은 형태로 드러냅니다. 이 단서는 장식이나 일반 강조로 쓰지 않습니다."
          >
            <fff-grid columns="3">
              <fff-surface variant="elevated">
                <fff-paragraph>
                  떠 있는 표면은 그 자체가 클릭 대상이거나 안에 클릭할 요소를 넣습니다. 표면 자체가
                  대상이면 hover에서 한 단계 더 떠올라 이를 확인시킵니다.
                </fff-paragraph>
              </fff-surface>
              <fff-surface variant="filled">
                <fff-paragraph>
                  채워진 배경은 안에 실행 가능한 액션이 있음을 나타냅니다.
                </fff-paragraph>
              </fff-surface>
              <fff-surface variant="ghost">
                <fff-paragraph>
                  <fff-link href="#">브랜드 색 텍스트·아이콘</fff-link>
                  은 이동하거나 실행하는 링크입니다.
                </fff-paragraph>
              </fff-surface>
            </fff-grid>
          </fff-content-section>

          <fff-content-section
            heading-level="3"
            heading="조작 상태"
            description="UI 요소의 상호작용 상태입니다."
          >
            <fff-grid columns="4" gap="6">${operationStates.map(renderStateCard)}</fff-grid>
          </fff-content-section>

          <fff-content-section
            heading-level="3"
            heading="결과 상태 / 선택 상태"
            description="UI 요소의 상호작용 결과 상태입니다. pressed·checked·selected·current는 같은 토큰을 씁니다."
          >
            <fff-tag-group>${selectedKeys.map(renderSelector)}</fff-tag-group>
            <fff-grid columns="4" gap="6">${resultStates.map(renderStateCard)}</fff-grid>
          </fff-content-section>

          <fff-content-section
            heading-level="3"
            heading="의미 상태"
            description='사용자 행동으로 인한 오류와 시스템 오류를 구분합니다. 시스템 오류로 실패하면 단순히 "오류"라고 하지 않고 무엇이 잘못됐는지 설명해, 사용자가 다시 시도할 수 있게 안내합니다.'
          >
            <fff-grid columns="4" gap="6">${semanticStates.map(renderStateCard)}</fff-grid>
          </fff-content-section>

          <fff-content-section
            heading-level="3"
            heading="데이터 상태"
            description="데이터를 요청한 뒤 화면이 거치는 상태입니다."
          >
            <fff-grid columns="4" gap="6">${dataStates.map(renderStateCard)}</fff-grid>
          </fff-content-section>
        </fff-content-section-list>
      </fff-tab-panel>

      <fff-tab-panel value="selection">
        <fff-content-section-list>
          <fff-flex direction="column" gap="3">
            <fff-grid columns="2" gap="4">
              <fff-content-section
                heading-level="3"
                heading="단일 선택"
                description="선택 옵션 가운데 하나만 고르며, 다른 선택 옵션을 고르면 이전 선택이 해제됩니다."
              >
                <fff-code-tag tone="orange">value: string</fff-code-tag>
                ${renderSelectionComponents(singleSelectionComponents)}
              </fff-content-section>
              <fff-content-section
                heading-level="3"
                heading="다중 선택"
                description="선택 옵션마다 켜고 꺼서 원하는 만큼 고릅니다."
              >
                <fff-code-tag tone="orange">values: string[]</fff-code-tag>
                ${renderSelectionComponents(multipleSelectionComponents)}
              </fff-content-section>
            </fff-grid>
            <fff-notice>
              <fff-text size="14">
                ${code('fff-tab')}은 ${code('aria-selected')}를 쓰지만 값을 고르는 selection이
                아니라 보이는 콘텐츠를 바꾸는 content switching 맥락에 속합니다.
              </fff-text>
            </fff-notice>
          </fff-flex>

          <fff-text-block
            level="3"
            heading="기본값"
            description="선택되지 않은 상태로 제공합니다. 사용자가 의도하지 않은 선택값은 편향된 응답 결과를 가져오는 부작용이 있을 수 있습니다."
          ></fff-text-block>

          <fff-content-section
            heading-level="3"
            heading="상태 소유"
            description="선택 상태는 그룹 컴포넌트가 갖습니다. 단일 체크박스나 스위치, 설정 아이템처럼 켜고 끄는 맥락의 컴포넌트만 자기 상태를 갖습니다."
          ></fff-content-section>

          <fff-content-section heading-level="3" heading="옵션 타입">
            <fff-code-block language="typescript" .code=${optionItemCode}></fff-code-block>
          </fff-content-section>
        </fff-content-section-list>
      </fff-tab-panel>
    </fff-page-body>
  </fff-main>
`

renderPage(main)
