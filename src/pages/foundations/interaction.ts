import '@/components/common'
import { html } from 'lit'

import { ICON_NAMES } from '@/components/common'
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
    external: true,
  },
  {
    href: 'https://spectrum.adobe.com/page/states/',
    label: 'Adobe Spectrum - States',
    external: true,
  },
  {
    href: 'https://carbondesignsystem.com/patterns/read-only-states-pattern/',
    label: 'Carbon - Read-only States',
    external: true,
  },
]

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
const currentComponentRows = html`
  <tr>
    <th scope="row">${code('page')}</th>
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
    <td>${code('mm-step-item')}</td>
  </tr>
`
const expandedComponentRows = html`
  <tr>
    <th scope="row">${code('mm-read-more-button')}</th>
    <td>잘린 텍스트</td>
    <td>미사용</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-hamburger-button')}</th>
    <td>내비게이션 메뉴</td>
    <td>미사용</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-more-button')}</th>
    <td>오버플로 메뉴</td>
    <td>미사용</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-sidebar-section')}</th>
    <td>하위 페이지 링크</td>
    <td>사용</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-select')}</th>
    <td>옵션 목록</td>
    <td>사용</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-navbar-search')}</th>
    <td>검색 패널</td>
    <td>미사용</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-chat-source')}</th>
    <td>출처 상세</td>
    <td>미사용</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-popover')}</th>
    <td>앵커된 패널</td>
    <td>미사용</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-faq-item')}</th>
    <td>패널 본문</td>
    <td>사용</td>
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
        <mm-paragraph>
          상호작용 상태가 공유하는 토큰입니다. 상태 selector에서 속성을 다시 선언하지 않고 이 토큰을
          재할당합니다.
        </mm-paragraph>
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

      <mm-content-section heading-level="3" heading="States">
        <mm-paragraph>
          상태 표현은 각 컴포넌트가 소유하며, Interaction tokens를 상태별로 재할당해 나타냅니다.
        </mm-paragraph>
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
            icon=${ICON_NAMES.EXPAND}
            size="medium"
            label="Expanded"
            description="토글 대상이 펼쳐져 있다는 표시입니다."
          ></mm-list-item>
          <mm-list-item
            icon=${ICON_NAMES.WARNING}
            size="medium"
            label="Invalid"
            description="입력값이 유효하지 않다는 표시입니다."
          ></mm-list-item>
          <mm-list-item
            icon=${ICON_NAMES.LOCK}
            size="medium"
            label="Disabled"
            description="지금은 조작을 받지 않는다는 표시입니다."
          ></mm-list-item>
          <mm-list-item
            icon=${ICON_NAMES.READ_ONLY}
            size="medium"
            label="Read-only"
            description="disabled와 달리 이동·낭독은 되고 수정만 막힌다는 표시입니다."
          ></mm-list-item>
          <mm-list-item
            icon=${ICON_NAMES.REFRESH}
            size="medium"
            label="Busy"
            description="결과가 올 때까지 다시 실행할 수 없다는 표시입니다."
          ></mm-list-item>
        </mm-list-item-group>
        <mm-component-notice heading="Read-only 표현을 정한다">
          읽기 전용을 갖는 컴포넌트가 아직 없어, 어떤 컴포넌트가 이 상태를 가질지와 어떻게 표시할지
          정하지 않았다
        </mm-component-notice>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Hover">
        <mm-paragraph>
          상태 selector에서 속성을 다시 선언하지 않고, 평소 값을 담고 있는 컴포넌트 토큰에 아래 값을
          재할당합니다.
        </mm-paragraph>
        <mm-grid columns="2" gap="4">
          <mm-surface variant="outlined" radius="large">
            <mm-menu-item-action
              icon=${ICON_NAMES.DOCUMENT}
              label="배경 채움"
            ></mm-menu-item-action>
          </mm-surface>
          <mm-text-list
            variant="check"
            .texts=${[
              rule(
                '기본 hover는 배경을 채운다',
                html`
                  ${code('--interaction-hover-background-color')} 값을 컴포넌트 토큰에 재할당한다
                `,
              ),
            ]}
          ></mm-text-list>

          <mm-surface variant="outlined" radius="large">
            <mm-button variant="tertiary">테두리 드러내기</mm-button>
          </mm-surface>
          <mm-text-list
            variant="check"
            .texts=${[
              rule(
                '배경색을 가진 컨트롤은 테두리를 드러낸다',
                html`
                  ${code('--border')} 값을 재할당한다. 배경 채움으로는 hover가 드러나지 않기
                  때문이다
                `,
              ),
            ]}
          ></mm-text-list>

          <mm-surface variant="outlined" radius="large">
            <mm-foundation-item href="#" heading="떠오름"></mm-foundation-item>
          </mm-surface>
          <mm-text-list
            variant="check"
            .texts=${[
              rule(
                '채울 배경이 없는 떠 있는 표면은 떠오른다',
                html`
                  ${code('--interaction-hover-lift')} 값을 컴포넌트 토큰에 재할당한다
                `,
              ),
            ]}
          ></mm-text-list>
        </mm-grid>
        <mm-notice>
          <mm-text size="14">
            ${code('mm-marquee')}의 ${code('pause-on-hover')}와 커스텀 스크롤바 thumb는 상태 표현이
            아니라 포인터가 있는 동안만 동작이 달라지는 기능입니다.
          </mm-text>
        </mm-notice>
      </mm-content-section>
      <mm-content-section heading-level="3" heading="Pressed">
        <mm-paragraph>
          스스로 눌림 상태를 유지하는 컨트롤은 ${code('aria-pressed')}로 표현하고, 선택 상태와 같은
          강조 토큰을 공유합니다. ${code('mm-toggle-button')}과 그 시맨틱
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
            rule(
              '그룹의 선택은 Selection 문서를 따른다',
              '상태 소유·옵션 모양·키보드 이동을 Selection 문서가 정한다',
            ),
            rule(
              '스킨은 상태 attribute selector를 기준으로 둔다',
              html`
                강조에는 ${code('--interaction-selected-*')} 토큰을 함께 쓴다
              `,
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
          값을 나타냅니다. 그룹 소유와 키보드 이동은
          <mm-link href="./selection.html">Selection</mm-link>
          문서를 따르고, 강조 토큰은 Checked와 같습니다.
        </mm-paragraph>
        <mm-paragraph>
          ${code('mm-tab')}도 ${code('aria-selected')}로 활성 탭을 나타내지만, 폼 값이 아니라 지금
          보이는 패널을 가리킵니다.
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

      <mm-content-section heading-level="3" heading="Current">
        <mm-paragraph>
          지금 위치한 곳을 ${code('aria-current')}로 표시합니다. 페이지·라우트를 가리키면
          ${code('page')}를 씁니다.
        </mm-paragraph>
        <mm-paragraph>
          점 표시는 ${code('mm-current-indicator')}가 맡습니다. 현재라는 뜻은 항목의
          ${code('aria-current')}가 전하므로 점은 현재 항목에만 놓이고 보조 기술에 드러나지
          않습니다. 가로로 늘어선 항목은 아래 가운데에, 세로 목록은 행 끝에 둡니다.
        </mm-paragraph>
        <mm-surface variant="outlined" radius="large">
          <mm-flex gap="6" align-items="center">
            <mm-flex direction="column" gap="4" align-items="center">
              <mm-flex gap="1">
                <mm-page-button page="1"></mm-page-button>
                <mm-page-button page="2" aria-current="page"></mm-page-button>
                <mm-page-button page="3"></mm-page-button>
              </mm-flex>
              <mm-caption>가로 항목</mm-caption>
            </mm-flex>
            <mm-flex direction="column" gap="2" align-items="center">
              <mm-sidebar-page-link
                href="./interaction.html"
                emoji="#"
                label="Interaction"
              ></mm-sidebar-page-link>
              <mm-caption>세로 목록</mm-caption>
            </mm-flex>
          </mm-flex>
        </mm-surface>
        <mm-table
          .rows=${currentComponentRows}
          caption="aria-current 값과 그것을 쓰는 컴포넌트"
          .columns=${[{ label: '값', width: '160px' }, { label: '컴포넌트' }]}
        ></mm-table>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Expanded">
        <mm-paragraph>
          펼침·접힘 여부는 ${code('aria-expanded')}로 표시합니다. 방향 표시는
          ${code('mm-expand-indicator')}가 ${code('expanded')}를 받아 아이콘 회전으로 반영하는
          표시만 맡고, 여닫는 상호작용은 펼치는 컴포넌트가 소유합니다.
        </mm-paragraph>
        <mm-surface variant="outlined" radius="large">
          <mm-flex gap="6">
            <mm-flex direction="column" gap="2" align-items="center">
              <mm-expand-indicator></mm-expand-indicator>
              <mm-caption>접힘</mm-caption>
            </mm-flex>
            <mm-flex direction="column" gap="2" align-items="center">
              <mm-expand-indicator expanded></mm-expand-indicator>
              <mm-caption>펼침</mm-caption>
            </mm-flex>
          </mm-flex>
        </mm-surface>
        <mm-table
          .rows=${expandedComponentRows}
          caption="Expanded 컴포넌트와 펼치는 대상"
          .columns=${[
            { label: '컴포넌트', width: '220px' },
            { label: '펼치는 대상' },
            { label: 'mm-expand-indicator', width: '160px' },
          ]}
        ></mm-table>
      </mm-content-section>
      <mm-component-references .items=${componentReferences}></mm-component-references>
    </mm-content-section-list>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
