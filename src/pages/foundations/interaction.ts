import '@/components/common'
import { html } from 'lit'

import { ICON_NAMES, STATUS_ICONS } from '@/components/common'
import '@/components/layouts/app-sidebar/sidebar-page-link'
import { code, codeList, rule } from '@/components/domains/component'
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

const feedbackRows = html`
  <tr>
    <th scope="row">${code('mm-toast')}</th>
    <td>화면 하단 중앙</td>
    <td>표시 시간이 지나면 스스로 닫힌다</td>
    <td>저장·복사처럼 확인만 하면 끝나는 행동의 결과를 알릴 때</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-notice')}</th>
    <td>관련 콘텐츠 곁</td>
    <td>화면에 남는다</td>
    <td>흐름 안에서 주의할 상태를 알리고 다음 행동을 곁에 둘 때</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-result')}</th>
    <td>섹션·페이지 전체</td>
    <td>화면에 남는다</td>
    <td>작업이 끝난 뒤 완료·오류·빈 상태와 다음 행동을 제시할 때</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-dialog')}</th>
    <td>화면 위, 배경을 막는다</td>
    <td>사용자가 액션을 고를 때까지</td>
    <td>되돌리기 어려운 작업을 실행하기 전에 확인을 받을 때</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-spinner')}</th>
    <td>요소 안·영역 안</td>
    <td>작업이 끝날 때까지</td>
    <td>결과를 기다리는 동안 시스템이 응답하고 있음을 알릴 때</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-task-status')}</th>
    <td>흐름 안의 한 줄</td>
    <td>작업이 끝날 때까지</td>
    <td>진행률을 알 수 없는 작업의 시도 횟수·경과 시간을 알릴 때</td>
  </tr>
`

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
    <td>
      ${codeList(['mm-checkbox', 'mm-radio', 'mm-switch', 'mm-checkbox-group', 'mm-radio-group'])}
    </td>
  </tr>
  <tr>
    <th scope="row">${code('aria-checked')}</th>
    <td>${codeList(['mm-menu-item-radio', 'mm-menu-item-checkbox', 'mm-menu-item-switch'])}</td>
  </tr>
`

const pressedComponentRows = html`
  <tr>
    <th scope="row">단독 버튼</th>
    <td>
      ${codeList([
        'mm-toggle-button',
        'mm-follow-button',
        'mm-bookmark-button',
        'mm-reveal-button',
      ])}
    </td>
  </tr>
  <tr>
    <th scope="row">그룹의 항목</th>
    <td>${codeList(['mm-toggle-button-group', 'mm-filter-button-group'])}</td>
  </tr>
`

const selectedComponentRows = html`
  <tr>
    <th scope="row">목록의 옵션</th>
    <td>${codeList(['mm-select-option'])}</td>
  </tr>
  <tr>
    <th scope="row">탭</th>
    <td>${codeList(['mm-tab'])}</td>
  </tr>
`

const selectionOwnerRows = html`
  <tr>
    <th scope="row">${code('SingleSelectionController')}</th>
    <td>${code('value: string')}</td>
    <td>
      ${codeList([
        'mm-radio-group',
        'mm-radio-card-group',
        'mm-toggle-button-group',
        'mm-filter-button-group',
        'mm-menu-item-radio-group',
      ])}
    </td>
  </tr>
  <tr>
    <th scope="row">${code('MultipleSelectionController')}</th>
    <td>${code('values: string[]')}</td>
    <td>
      ${codeList(['mm-checkbox-group', 'mm-filter-button-group', 'mm-menu-item-checkbox-group'])}
    </td>
  </tr>
`

const slottedSelectionRows = html`
  <tr>
    <th scope="row">카드를 자식으로 받는 그룹</th>
    <td>${codeList(['mm-radio-card-group'])}</td>
  </tr>
  <tr>
    <th scope="row">메뉴 행을 자식으로 받는 그룹</th>
    <td>${codeList(['mm-menu-item-radio-group', 'mm-menu-item-checkbox-group'])}</td>
  </tr>
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
    <td>자식 요소</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-checkbox-group')}</th>
    <td>Multiple</td>
    <td>배열</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-menu-item-checkbox-group')}</th>
    <td>Multiple</td>
    <td>자식 요소</td>
  </tr>
`

const selectionTableColumns = [
  { label: '컴포넌트', width: '240px' },
  { label: '선택', width: '140px' },
  { label: '옵션 전달' },
]

const main = html`
  <mm-main>
    <mm-page-header
      heading="Interaction"
      description="어떤 요소가 상호작용할 수 있는지, 상호작용할 때 어떻게 반응하는지, 선택지를 어떻게 고르는지를 일관된 시각 언어로 정의합니다. 상태는 색상만으로 전달하지 않습니다."
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
              >
                <mm-code slot="trailing">:hover</mm-code>
              </mm-list-item>
              <mm-list-item
                icon=${ICON_NAMES.CUBE_SCAN}
                size="medium"
                label="Focus"
                description="키보드가 지금 이 요소에 있다는 표시입니다."
              >
                <mm-code slot="trailing">:focus-visible</mm-code>
              </mm-list-item>
              <mm-list-item
                icon=${ICON_NAMES.MOUSE_BUTTON}
                size="medium"
                label="Active"
                description="지금 누르고 있다는 표시입니다."
              >
                <mm-code slot="trailing">:active</mm-code>
              </mm-list-item>
              <mm-list-item
                icon=${ICON_NAMES.LOCK}
                size="medium"
                label="Disabled"
                description="지금은 조작을 받지 않는다는 표시입니다."
              >
                <mm-code slot="trailing">disabled</mm-code>
              </mm-list-item>
            </mm-list-item-group>
            <mm-text-list
              variant="check"
              .texts=${[
                rule(
                  '포커스 링은 키보드로 옮겨 왔을 때 그린다',
                  html`
                    ${code(':focus-visible')}에 ${code('--interaction-focus-outline')}을 요소에서
                    2px 띄워 그린다. 포인터로 누른 요소에는 링이 남지 않는다
                  `,
                ),
                rule(
                  '비활성 요소는 흐리게 표시하고 상태를 attribute로 알린다',
                  html`
                    불투명도를 절반으로 낮추고 커서를 not-allowed로 바꾼다. 네이티브 컨트롤은
                    ${code('disabled')}, 그 밖의 역할은 ${code('aria-disabled')}로 알린다
                  `,
                ),
              ]}
            ></mm-text-list>
            <mm-component-notice heading="Hover 처리 규칙을 정한다">
              hover 값은 ${code('--interaction-hover-background-color')}·
              ${code('--interaction-hover-lift')} 토큰으로만 남아 있다. 어느 요소가 어느 처리를
              쓰는지, 포인터가 없는 터치 화면에서 클릭 가능성을 무엇으로 알릴지 정하지 않았다
            </mm-component-notice>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="결과 상태">
            <mm-paragraph>UI 요소의 상호작용 결과 상태입니다.</mm-paragraph>
            <mm-list-item-group>
              <mm-list-item
                icon=${ICON_NAMES.PRESSED}
                size="medium"
                label="Pressed"
                description="그룹 없이 스스로 눌린 상태를 유지한다는 표시입니다."
              >
                <mm-code slot="trailing">aria-pressed</mm-code>
              </mm-list-item>
              <mm-list-item
                icon=${ICON_NAMES.CHECK}
                size="medium"
                label="Checked"
                description="컨트롤의 on/off 값이 켜져 있다는 표시입니다."
              >
                <mm-code slot="trailing">checked</mm-code>
              </mm-list-item>
              <mm-list-item
                icon=${ICON_NAMES.SELECTED}
                size="medium"
                label="Selected"
                description="목록에서 고른 항목이라는 표시입니다."
              >
                <mm-code slot="trailing">aria-selected</mm-code>
              </mm-list-item>
              <mm-list-item
                icon=${ICON_NAMES.CURRENT}
                size="medium"
                label="Current"
                description="내비게이션에서 지금 위치한 곳이라는 표시입니다."
              >
                <mm-code slot="trailing">aria-current</mm-code>
              </mm-list-item>
              <mm-list-item
                icon=${ICON_NAMES.WARNING}
                size="medium"
                label="Invalid"
                description="입력값이 유효하지 않다는 표시입니다."
              >
                <mm-code slot="trailing">aria-invalid</mm-code>
              </mm-list-item>
            </mm-list-item-group>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="Current">
            <mm-paragraph>
              같은 집합 안에서 지금 위치한 항목이라는 표시입니다. 사용자가 이동하는 동안에도 어디에
              있는지 다른 항목과 구분해 보여 주므로 위치를 잃지 않습니다.
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
            <mm-paragraph>
              사용자 행동으로 인한 오류와 시스템 오류를 구분합니다. 시스템 오류로 실패하면 단순히
              "오류"라고 하지 않고 무엇이 잘못됐는지 설명해, 사용자가 다시 시도할 수 있게
              안내합니다.
            </mm-paragraph>

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
            <mm-text-list
              variant="check"
              .texts=${[
                rule(
                  '의미 상태는 톤과 함께 아이콘·텍스트로 알린다',
                  html`
                    색만으로는 상태가 전달되지 않는다. ${code('mm-notice')}·
                    ${code('mm-task-status')}·${code('mm-tag')}가 같은 톤 이름을 쓰고, 아이콘은
                    ${code('STATUS_ICONS')} 한 곳에서 가져온다
                  `,
                ),
              ]}
            ></mm-text-list>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="데이터 상태">
            <mm-paragraph>
              데이터를 요청한 뒤 화면이 거치는 상태입니다. 상태마다 알리는 컴포넌트의 자리와 머무는
              시간은 Feedback이 정합니다.
            </mm-paragraph>
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

          <mm-content-section heading-level="3" heading="Feedback">
            <mm-paragraph>
              사용자 행동이나 시스템 상태의 결과를 알립니다. 알릴 내용은 의미 상태와 데이터 상태가
              정하고, 알리는 자리와 머무는 시간은 결과 뒤에 다음 행동이 따르는지로 정합니다.
            </mm-paragraph>
            <mm-table
              .rows=${feedbackRows}
              caption="결과를 알리는 컴포넌트의 자리·머무는 시간·사용 시점 비교"
              .columns=${[
                { label: '컴포넌트', width: '180px' },
                { label: '자리', width: '180px' },
                { label: '머무는 시간', width: '220px' },
                { label: '언제' },
              ]}
            ></mm-table>
            <mm-text-list
              variant="check"
              .texts=${[
                rule(
                  '결과는 그 행동이 일어난 범위에서 알린다',
                  html`
                    요소 안의 진행은 그 요소 안의 ${code('mm-spinner')}로, 한 구획의 상태는 그 구획
                    곁의 ${code('mm-notice')}로, 화면 전체의 결과는 ${code('mm-result')}로 알린다
                  `,
                ),
                rule(
                  '페이지 이동이나 UI 변화도 피드백으로 쓴다',
                  '결과가 화면 변화로 드러나면 그 변화가 곧 피드백이므로, 같은 결과를 알림으로 한 번 더 알리지 않는다',
                ),
              ]}
            ></mm-text-list>
            <mm-link-prompt
              message="표시 시간과 표면별 닫기 수단이 궁금하신가요?"
              link-label="Dismiss"
              href="./layout.html?tab=overlay"
            ></mm-link-prompt>
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
                  '기존 데이터가 뒷받침하는 값만 미리 선택한다',
                  '미리 선택된 값은 응답을 그 값 쪽으로 편향시킨다',
                ),
              ]}
            ></mm-text-list>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="상태 소유">
            <mm-paragraph>
              선택 상태는 항목이 아니라 그룹이 소유하고, 바뀌면 값과 같은 이름으로
              ${code('change')}에 담아 알립니다. 선택지 없이 값 하나를 켜고 끄는 컴포넌트만 그룹
              없이 자기 상태를 갖습니다.
            </mm-paragraph>
            <mm-table
              .rows=${selectionOwnerRows}
              caption="선택 상태를 소유하는 컨트롤러와 그것을 쓰는 그룹"
              .columns=${[
                { label: '컨트롤러', width: '280px' },
                { label: '값', width: '340px' },
                { label: '컴포넌트' },
              ]}
            ></mm-table>
            <mm-paragraph>
              ${code('SlottedSelectionController')}는 slot으로 받은 항목을 위 컨트롤러에 잇습니다.
              값은 소유하지 않고, 그룹의 값을 항목의 ${code('checked')}에 반영하며 항목의
              ${code('change')}를 그룹의 ${code('change')}로 올립니다.
            </mm-paragraph>
            <mm-table
              .rows=${slottedSelectionRows}
              caption="SlottedSelectionController를 쓰는 자리와 그룹"
              .columns=${[{ label: '쓰는 자리', width: '240px' }, { label: '컴포넌트' }]}
            ></mm-table>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="Pressed">
            <mm-paragraph>
              한 번 누르면 눌린 채 유지되고 다시 누르면 풀리는 버튼의 상태입니다.
            </mm-paragraph>
            <mm-table
              .rows=${pressedComponentRows}
              caption="aria-pressed를 쓰는 자리와 컴포넌트"
              .columns=${[{ label: '쓰는 자리', width: '160px' }, { label: '컴포넌트' }]}
            ></mm-table>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="Checked">
            <mm-paragraph>컨트롤이 켜져 있는지 꺼져 있는지를 나타내는 값입니다.</mm-paragraph>
            <mm-table
              .rows=${checkedComponentRows}
              caption="Checked 상태 attribute와 그것을 쓰는 컴포넌트"
              .columns=${[{ label: '상태', width: '160px' }, { label: '컴포넌트' }]}
            ></mm-table>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="Selected">
            <mm-paragraph>컬렉션에서 고른 항목입니다.</mm-paragraph>
            <mm-table
              .rows=${selectedComponentRows}
              caption="aria-selected를 쓰는 자리와 컴포넌트"
              .columns=${[{ label: '쓰는 자리', width: '160px' }, { label: '컴포넌트' }]}
            ></mm-table>
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
                  '선택 상태와 목록 표시가 같은 값을 기준으로 삼는다',
                ),
                rule(
                  html`
                    고유 필드는 ${code('OptionItem')}에 교차 타입으로 더한다
                  `,
                  html`
                    ${code('FilterOption')}의 ${code('selectAll')}처럼 한 컴포넌트만 쓰는 필드는
                    공통 타입에 섞지 않는다
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
                  '그룹은 Tab 한 번으로 들어가고 화살표 키로 항목 사이를 옮긴다',
                  html`
                    Tab으로 들어오면 선택된 항목에 포커스가 놓이고, 끝 항목에서는 멈춘다.
                    ${code('mm-toggle-button-group')} · ${code('mm-filter-button-group')} ·
                    ${code('mm-menu-item-group')} · ${code('mm-select')}의 옵션 목록이
                    ${code('RovingFocusController')}로 같은 방식을 쓴다. ${code('mm-tab-list')}도 이
                    컨트롤러를 쓰지만 끝에서 반대편 끝으로 이어진다
                  `,
                ),
                rule(
                  '버튼 그룹은 Space·Enter가 선택을 확정한다',
                  html`
                    화살표 키는 포커스만 옮긴다. ${code('mm-toggle-button-group')} ·
                    ${code('mm-filter-button-group')}이 이 방식을 따른다
                  `,
                ),
                rule(
                  'radio 목록은 포커스를 옮기면 곧 선택된다',
                  html`
                    ${code('mm-menu-item-radio-group')}과 네이티브 radio는 이동이 선택이다.
                    ${code('mm-tab-list')}도 이동이 선택이라 Enter·Space 없이 방향키만으로 탭이
                    바뀐다
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
        </mm-content-section-list>
      </mm-tab-panel>
    </mm-page-body>
  </mm-main>
`

renderPage(main)
