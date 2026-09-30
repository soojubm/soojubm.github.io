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

const componentReferences: ComponentReferenceItemData[] = [
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
const main = html`
  <mm-main>
    <mm-page-header
      heading="Interaction"
      description="어떤 요소가 상호작용할 수 있는지, 그리고 상호작용할 때 어떻게 반응하는지를 일관된 시각 언어로 정의합니다. 상태는 색상만으로 전달하지 않습니다."
    ></mm-page-header>

    <mm-content-section-list>
      <mm-content-section heading-level="3" heading="Interactive signifiers">
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

      <mm-content-section heading-level="3" heading="Interaction tokens">
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

      <mm-content-section heading-level="3" heading="Interaction States">
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

      <mm-content-section heading-level="3" heading="Interaction Reactions">
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

      <mm-content-section heading-level="3" heading="Status states">
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

      <mm-content-section heading-level="3" heading="Data/async states">
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

      <mm-component-references .items=${componentReferences}></mm-component-references>
    </mm-content-section-list>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
