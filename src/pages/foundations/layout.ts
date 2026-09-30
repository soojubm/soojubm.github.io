import { html } from 'lit'

import './layout.css'

import '@/components/domains/comment/comment-item'
import '@/components/overlay/sheet'
import '@/components/domains/component/component-notice'
import '@/components/domains/component/component-pager'
import { ICON_NAMES } from '@/components/common'
import {
  code,
  codeList,
  rule,
  type ComponentReferenceItemData,
} from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

const GROUP_COMPONENTS = [
  'mm-button-group',
  'mm-filter-button-group',
  'mm-toggle-button-group',
  'mm-radio-group',
  'mm-checkbox-group',
  'mm-radio-card-group',
  'mm-avatar-group',
  'mm-tag-group',
  'mm-keyword-tag-group',
  'mm-list-item-group',
  'mm-menu-item-group',
  'mm-menu-item-radio-group',
  'mm-menu-item-checkbox-group',
  'mm-meta-item-group',
  'mm-feature-group',
  'mm-paragraph-group',
]
const SECTION_COMPONENTS = ['mm-content-section', 'mm-page-header']

const overviewRows = html`
  <tr>
    <th scope="row">${code('mm-flex')}</th>
    <td>가로·세로 한 줄</td>
    <td>소비처가 gap으로 정한다</td>
    <td>페이지·콘텐츠 조립</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-grid')}</th>
    <td>행·열</td>
    <td>소비처가 gap으로 정한다</td>
    <td>반복되는 항목</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-content-section')}</th>
    <td>세로</td>
    <td>제목–본문</td>
    <td>제목이 있는 문서 구획</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-content-section-list')}</th>
    <td>세로</td>
    <td>섹션–섹션</td>
    <td>페이지 구획을 쌓는 자리</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-text-block')}</th>
    <td>세로</td>
    <td>제목–설명</td>
    <td>제목과 설명 한 쌍</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-form-field')}</th>
    <td>세로</td>
    <td>레이블–컨트롤–설명</td>
    <td>textfield가 아닌 컨트롤</td>
  </tr>
`

const contentSectionCode = `<mm-content-section-list>
  <mm-content-section heading-level="3" heading="액션이 없는 섹션">
    <mm-paragraph>제목과 본문 사이 간격은 섹션이, 섹션 사이 간격은 섹션 목록이 소유합니다.</mm-paragraph>
  </mm-content-section>
  <mm-content-section heading-level="3" heading="액션이 있는 섹션">
    <mm-link slot="action" href="./post.html">모두 보기</mm-link>
    <mm-paragraph>제목 줄 오른쪽에 섹션 전체에 걸리는 동작을 둡니다.</mm-paragraph>
  </mm-content-section>
</mm-content-section-list>`

const textBlockCode = `<mm-text-block level="3" heading="제목" description="제목을 보충하는 설명"></mm-text-block>`

const formFieldCode = `<mm-form-field label="관심 주제" optional description="여러 개를 선택할 수 있습니다.">
  <mm-checkbox-group name="topics" .options=\${topicOptions}></mm-checkbox-group>
</mm-form-field>`

const componentReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://ix.siemens.io/docs/components/card-list/guide',
    label: 'Siemens iX - Card list',
  },
]

const yes = html`
  <span role="img" aria-label="예">✅</span>
`
const no = html`
  <span role="img" aria-label="아니오">❌</span>
`

const classificationRows = html`
  <tr>
    <th scope="row"><mm-link href="./dialog.html">Dialog</mm-link></th>
    <td>${yes}</td>
    <td>Viewport</td>
    <td>alertdialog</td>
    <td>sheet</td>
  </tr>
  <tr>
    <th scope="row"><mm-link href="./sheet.html">Sheet</mm-link></th>
    <td>${yes}</td>
    <td>Viewport</td>
    <td>dialog</td>
    <td>sheet</td>
  </tr>
  <tr>
    <th scope="row">Backdrop</th>
    <td>${yes}</td>
    <td>Viewport</td>
    <td>없음</td>
    <td>backdrop</td>
  </tr>
  <tr>
    <th scope="row"><mm-link href="./popover.html">Popover</mm-link></th>
    <td>${no}</td>
    <td>Trigger</td>
    <td>없음</td>
    <td>popover</td>
  </tr>
  <tr>
    <th scope="row"><mm-link href="./select.html">Select</mm-link></th>
    <td>${no}</td>
    <td>Trigger</td>
    <td>listbox</td>
    <td>popover</td>
  </tr>
  <tr>
    <th scope="row"><mm-link href="./tooltip.html">Tooltip</mm-link></th>
    <td>${no}</td>
    <td>Trigger</td>
    <td>tooltip</td>
    <td>popover</td>
  </tr>
  <tr>
    <th scope="row"><mm-link href="./toast.html">Toast</mm-link></th>
    <td>${no}</td>
    <td>Viewport</td>
    <td>status</td>
    <td>toast</td>
  </tr>
`

const dismissRows = html`
  <tr>
    <th scope="row"><mm-link href="./sheet.html">Sheet</mm-link></th>
    <td>${yes}</td>
    <td>${yes}</td>
    <td>${yes}</td>
    <td>닫아도 잃는 것이 없는 내용(댓글, 검색 등)을 담으므로 가볍게 닫히게 한다</td>
  </tr>
  <tr>
    <th scope="row"><mm-link href="./dialog.html">Dialog</mm-link></th>
    <td>${no}</td>
    <td>${yes}</td>
    <td>${no}</td>
    <td>
      확인이 필요한 중요한 작업에 쓰므로 의도가 불분명한 배경 클릭으로 흐름이 끊기지 않게 한다.
      ESC는 키보드 사용자의 탈출 수단이라 남기되, 보조 액션이 파괴적일 수 있어 어느 액션도 실행하지
      않고 닫기만 한다
    </td>
  </tr>
`

const placementTypeCode = `type Side = 'top' | 'right' | 'bottom' | 'left'
type Alignment = 'start' | 'end'

// anchored overlay (popover · select · tooltip): \`\${Side}\` | \`\${Side}-\${Alignment}\`
type PlacementType =
  | 'top' | 'top-start' | 'top-end'
  | 'right' | 'right-start' | 'right-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'

// viewport overlay (sheet · dialog)
type ViewportPlacementType = 'center' | Side`

const main = html`
  <mm-main>
    <mm-page-header
      heading="Layout"
      description="페이지 너비, 배경 대비, 표면 대비는 장식이 아니라 페이지의 성격과 작업 맥락을 담는 신호입니다. 사용자가 의식적으로 알아차리지는 못하지만, 일관되게 쓰면 맥락이 달라졌다는 미묘한 감각을 전달합니다."
    ></mm-page-header>

    <mm-content-section-list>
      <mm-tab-list value="page" variant="pill">
        <mm-tab value="page">Page</mm-tab>
        <mm-tab value="section">Section</mm-tab>
        <mm-tab value="group">Group</mm-tab>
        <mm-tab value="overlay">Overlay</mm-tab>
      </mm-tab-list>

      <mm-tab-panel value="page">
        <mm-content-section-list>
          <mm-feature-group columns="2">
            <mm-feature
              heading="너비로 읽기 밀도를 정한다"
              description="좁은 폭은 폼·인증처럼 한 가지 작업에 집중시키고, 넓은 폭은 목록·대시보드처럼 훑어보는 화면에 씁니다."
            ></mm-feature>
            <mm-feature
              heading="배경 대비로 맥락의 경계를 만든다"
              description="글쓰기·설정·소개처럼 이전 화면과 다른 정보 구조로 들어갈 때 페이지 배경을 한 단계 낮춰 다른 맥락으로 넘어왔다는 감각을 줍니다."
            ></mm-feature>
          </mm-feature-group>

          <mm-content-section heading-level="3" heading="페이지 너비">
            <mm-paragraph>
              너비는 콘텐츠 성격에 맞는 토큰으로 정하고, 본문 골격은 ${code('mm-main')}의 width로,
              떠오르는 표면은 각 컴포넌트의 width로 지정합니다.
            </mm-paragraph>
            <mm-flex direction="column" gap="2">
              <mm-surface variant="filled" style="max-width: var(--layout-width-narrow)">
                <mm-flex direction="column" gap="1">
                  <mm-caption>집중형 · 폼, 인증, dialog, tooltip</mm-caption>
                  ${code('--layout-width-narrow · 400px')}
                  <mm-flex gap="3">
                    <mm-link href="./auth.html">Auth</mm-link>
                    <mm-link href="./dialog.html">Dialog</mm-link>
                    <mm-link href="./tooltip.html">Tooltip</mm-link>
                  </mm-flex>
                </mm-flex>
              </mm-surface>
              <mm-surface variant="filled" style="max-width: var(--layout-width-small)">
                <mm-flex direction="column" gap="1">
                  <mm-caption>일반 문서 · 에디토리얼, 설정, 대화, sheet</mm-caption>
                  ${code('--layout-width-small · 640px')}
                  <mm-flex gap="3">
                    <mm-link href="./post.html">Post</mm-link>
                    <mm-link href="./setting.html">Setting</mm-link>
                    <mm-link href="./chat.html">Chat</mm-link>
                    <mm-link href="./sheet.html">Sheet</mm-link>
                    <mm-link href="./profile.html">Profile</mm-link>
                  </mm-flex>
                </mm-flex>
              </mm-surface>
            </mm-flex>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="층위">
            <mm-paragraph>
              층위는 특정 콘텐츠를 주변보다 앞으로 올려, 사용자의 시선이 그곳에 먼저 머물게 합니다.
              폼·카드·편집 영역처럼 독립적으로 다루는 묶음은 표면으로 올려 주변 콘텐츠와 분리합니다.
              명도 대비가 먼저 층위를 만들고, 그림자는 그 위에서 떠 있는 정도를 더합니다.
            </mm-paragraph>
            <mm-paragraph>
              화면에 고정된 내비게이션(chrome)이 콘텐츠(base)를 감싸고, 드롭다운·팝오버처럼 잠깐
              뜨는 표면(overlay)은 그 위로 겹칩니다. 전역 내비게이션은 페이지에 고정된 바보다 위에
              남아야 하므로 chrome-top을 씁니다. 같은 이름이 그림자 단계이자 겹침 순서입니다.
              표면마다 쓰는 그룹은 Overlay 탭의 표에, 그룹 토큰은
              <mm-link href="./tokens.html">Tokens</mm-link>
              문서의 Z-index에 있습니다.
            </mm-paragraph>
            <mm-text-list
              variant="check"
              .texts=${[
                rule(
                  '한 화면에서 대비는 한 단계만 쓴다',
                  '배경·표면·그림자를 동시에 여러 단계로 겹치면 위계가 무너진다',
                ),
                rule(
                  '정적인 층위와 hover 피드백을 구분한다',
                  html`
                    hover에서 잠깐 떠오르는 ${code('--interaction-hover-lift')}는 층위가 아니라
                    상호작용 피드백이며,
                    <mm-link href="./interaction.html">Interaction</mm-link>
                    문서의 Hover가 다룬다
                  `,
                ),
              ]}
            ></mm-text-list>
            <div class="app-shell">
              <mm-surface variant="outlined" density="compact" class="app-shell-topbar">
                <mm-caption>Top Bar · chrome</mm-caption>
              </mm-surface>
              <mm-surface variant="outlined" density="compact" class="app-shell-sidebar">
                <mm-caption>Sidebar · chrome-top</mm-caption>
              </mm-surface>
              <mm-surface variant="ghost" density="compact" class="app-shell-content">
                <mm-caption>Content · base</mm-caption>
                <mm-surface variant="elevated" density="compact" class="app-shell-overlay">
                  <mm-caption>Overlay · toast</mm-caption>
                </mm-surface>
              </mm-surface>
              <mm-surface variant="outlined" density="compact" class="app-shell-bottombar">
                <mm-caption>Bottom Bar · chrome</mm-caption>
              </mm-surface>
            </div>
          </mm-content-section>
        </mm-content-section-list>
      </mm-tab-panel>

      <mm-tab-panel value="section">
        <mm-content-section-list>
          <mm-content-section heading-level="3" heading="Overview">
            <mm-table
              .rows=${overviewRows}
              caption="컨테이너별 배치 방향·소유하는 간격·쓰는 자리 비교"
              .columns=${[
                { label: 'UI' },
                { label: '배치' },
                { label: '간격' },
                { label: '쓰는 자리' },
              ]}
            ></mm-table>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="간격 단계">
            <mm-paragraph>
              간격을 비롯한 값은 요소가 속한 구조적 단계에 따라 다른 기준을 갖습니다. 컴포넌트마다
              간격을 따로 판단하지 않고, 소속된 단계에 맞는 토큰만 참조합니다.
            </mm-paragraph>

            <mm-list-item-group>
              <mm-list-item
                icon=${ICON_NAMES.IDLE}
                size="medium"
                label="Element"
                description="단일 UI 유닛 안의 간격. --space-1 ~ --space-2."
              ></mm-list-item>
              <mm-list-item
                icon=${ICON_NAMES.GROUP}
                size="medium"
                label="Group"
                description="같은 컴포넌트를 나열한 리스트. 항목 사이 간격은 기본 --space-2, 조밀한 태그는 --space-1, 이어지는 묶음은 0."
              ></mm-list-item>
              <mm-list-item
                icon=${ICON_NAMES.LIST_VIEW}
                size="medium"
                label="Section"
                description="제목과 본문 사이 --space-3. 섹션끼리의 바깥 간격은 페이지가 --space-section으로 정한다."
              ></mm-list-item>
            </mm-list-item-group>

            <mm-paragraph>Group 컴포넌트: ${codeList(GROUP_COMPONENTS)}</mm-paragraph>
            <mm-paragraph>Section 컴포넌트: ${codeList(SECTION_COMPONENTS)}</mm-paragraph>

            <mm-paragraph>
              Section 컴포넌트는 정해진 조립을 이름으로 감싼 시멘틱 표면으로, 제목 heading 요소와
              본문 슬롯을 묶습니다. 같은 제목·설명 묶음이라도 본문 슬롯 없이 텍스트 한 쌍의 간격만
              소유하는 ${code('mm-text-block')}은 이 계층이 아니라 상위 컴포넌트의 내부 부품이며,
              문서 섹션으로 세울 때는 ${code('mm-content-section')}을 씁니다.
            </mm-paragraph>

            <mm-paragraph>
              ${code('mm-flex')}·${code('mm-grid')} 같은 조립 레이아웃은 element·group·section 계층
              밖에서 배치만 돕는 유틸리티입니다.
            </mm-paragraph>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="Flex">
            <mm-paragraph>
              수평·수직 배치는 ${code('mm-flex')}로 하고, gap은 소비처가 정합니다.
            </mm-paragraph>
            <mm-flex-preview></mm-flex-preview>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="Grid">
            <mm-paragraph>반복되는 항목은 ${code('mm-grid')}로 늘어놓습니다.</mm-paragraph>
            <mm-text-list
              variant="check"
              .texts=${[
                rule(
                  html`
                    ${code('columns')}는 최대 열 수로 정한다
                  `,
                  html`
                    한 열이 ${code('column-min-width')}(기본 12rem) 아래로 좁아지면 열 수가
                    줄어든다. 기준은 뷰포트가 아니라 그리드가 놓인 컨테이너의 너비라서, 사이드바
                    옆이나 카드 안처럼 좁은 자리에서도 같은 규칙으로 줄어든다. 좁은 화면을 위한 열
                    수는 따로 지정하지 않는다
                  `,
                ),
              ]}
            ></mm-text-list>
            <mm-grid-preview></mm-grid-preview>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="Content Section">
            <mm-paragraph>
              ${code('mm-content-section')}은 제목과 본문을 한 묶음으로 세우고 그 사이 간격을
              소유합니다. ${code('heading-level')}은 제목의 단계(h2–h5)와 크기를 정하며, 섹션이 문서
              구조에서 놓인 자리에 맞춰 지정합니다. 섹션끼리의 바깥 간격은
              ${code('mm-content-section-list')}가 정하므로, 페이지는 섹션 사이에 간격을 따로 주지
              않습니다. "모두 보기" 링크처럼 섹션 전체에 걸리는 동작은 ${code('action')} 슬롯으로
              받아 제목 줄 오른쪽에 둡니다.
            </mm-paragraph>
            <mm-surface variant="filled">
              <mm-content-section-list>
                <mm-content-section heading-level="4" heading="액션이 없는 섹션">
                  <mm-paragraph>
                    제목과 본문 사이 간격은 섹션이, 섹션 사이 간격은 섹션 목록이 소유합니다.
                  </mm-paragraph>
                </mm-content-section>
                <mm-content-section heading-level="4" heading="액션이 있는 섹션">
                  <mm-link slot="action" href="./post.html">모두 보기</mm-link>
                  <mm-paragraph>제목 줄 오른쪽에 섹션 전체에 걸리는 동작을 둡니다.</mm-paragraph>
                </mm-content-section>
              </mm-content-section-list>
            </mm-surface>
            <mm-code-block .code=${contentSectionCode}></mm-code-block>
            <mm-component-notice heading="모두 보기 링크를 받는 섹션">
              ${code('view-all-href')}를 받으면 ${code('action')} 슬롯에 "모두 보기" 링크를 스스로
              채우는 파생 컴포넌트를 둔다. 받지 않으면 기본형과 같다. 이동이라 버튼이 아닌 링크로
              렌더하고, 무엇을 모두 보는지 섹션 제목과 잇는다. 본문이 그리드든 좌우 스크롤이든
              섹션은 관여하지 않는다
            </mm-component-notice>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="Text Block">
            <mm-paragraph>
              ${code('mm-text-block')}은 제목과 설명 한 쌍을 세우고 그 사이 간격을 소유합니다.
              level로 문서 안의 깊이와 두 텍스트의 크기 단계를 함께 정합니다. 본문을 슬롯으로 받아
              구획을 이루는 자리에는 ${code('mm-content-section')}을 씁니다.
            </mm-paragraph>
            <mm-surface variant="filled">
              <mm-text-block
                level="1"
                heading="Level 1 Title"
                description="제목과 설명 사이 간격은 level을 따라 함께 움직입니다."
              ></mm-text-block>
              <mm-separator></mm-separator>
              <mm-text-block
                level="3"
                heading="Level 3 Title"
                description="제목과 설명 사이 간격은 level을 따라 함께 움직입니다."
              ></mm-text-block>
              <mm-separator></mm-separator>
              <mm-text-block
                level="5"
                heading="Level 5 Title"
                description="제목과 설명 사이 간격은 level을 따라 함께 움직입니다."
              ></mm-text-block>
            </mm-surface>
            <mm-code-block .code=${textBlockCode}></mm-code-block>
            <mm-component-notice heading="mm-text-block을 유지할지 삭제할지">
              ${code('mm-page-header')}·${code('mm-feature')}·${code('mm-banner')}처럼 제목–설명 한
              쌍을 그리는 컴포넌트가 이 컴포넌트에 위임한다. 삭제하면 그 컴포넌트들이 제목–설명
              간격을 각자 소유하게 된다. 유지할지 삭제할지 정하지 않았다
            </mm-component-notice>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="Form Field">
            <mm-paragraph>
              ${code('mm-form-field')}는 textfield 계열이 아닌 컨트롤에 레이블·설명·검증 텍스트를
              같은 규칙으로 붙입니다. 컨트롤은 슬롯으로 받고 필드는 레이블이 붙은
              ${code('role="group"')}이 됩니다. 컨트롤별 조합은
              <mm-link href="./input.html">Input</mm-link>
              이 전시합니다.
            </mm-paragraph>
            <mm-form-field label="관심 주제" optional description="여러 개를 선택할 수 있습니다.">
              <mm-checkbox-group
                name="container-topics"
                .options=${[
                  { value: 'tech', label: '기술' },
                  { value: 'design', label: '디자인' },
                  { value: 'biz', label: '비즈니스' },
                ]}
              ></mm-checkbox-group>
            </mm-form-field>
            <mm-code-block .code=${formFieldCode}></mm-code-block>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="주의">
            <mm-text-list
              variant="check"
              .texts=${[
                rule(
                  html`
                    구획은 gap과
                    <mm-link href="./separator.html">separator</mm-link>
                    중 하나로만 나눈다
                  `,
                  'separator가 구획을 맡는 컨테이너는 gap을 두지 않고 separator의 자체 간격에 맡긴다. 둘을 겹치면 경계가 두 번 그어진다',
                ),
                rule(
                  '컨테이너의 시각 규칙은 컴포넌트 기본 규칙을 따른다',
                  '소비처에서 토큰이나 CSS 변수로 재정의하면 같은 컨테이너가 페이지마다 달라진다',
                ),
              ]}
            ></mm-text-list>
          </mm-content-section>

          <mm-component-references .items=${componentReferences}></mm-component-references>
        </mm-content-section-list>
      </mm-tab-panel>

      <mm-tab-panel value="overlay">
        <mm-content-section-list>
          <mm-content-section heading-level="3" heading="Overview">
            <mm-table
              .rows=${classificationRows}
              caption="화면 위로 뜨는 표면의 modal 여부·위치 기준·노출 role·레이어 비교"
              .columns=${[
                { label: 'UI' },
                { label: 'Modal' },
                { label: 'Anchor' },
                { label: 'Role' },
                { label: 'z-index' },
              ]}
            ></mm-table>
          </mm-content-section>

          <mm-grid columns="2" gap="4">
            <mm-surface>
              <mm-content-section heading-level="3" heading="Anchored overlay">
                <mm-paragraph>
                  트리거를 기준으로 엽니다. 트리거 옆에 붙어 떠서, 어느 요소에서 열린 표면인지
                  위치만으로 이어집니다.
                </mm-paragraph>
                <mm-paragraph>
                  ${code('mm-popover')} · ${code('mm-select')} · ${code('mm-tooltip')}
                </mm-paragraph>
              </mm-content-section>
            </mm-surface>
            <mm-surface>
              <mm-content-section heading-level="3" heading="Viewport overlay">
                <mm-paragraph>
                  viewport를 기준으로 화면 중앙이나 가장자리에 띄웁니다. 트리거 위치와 상관없이 같은
                  자리에 열려, 어디서 열었든 같은 표면이라는 인상을 줍니다.
                </mm-paragraph>
                <mm-paragraph>
                  ${code('mm-sheet')} · ${code('mm-dialog')} · ${code('mm-toast')}
                </mm-paragraph>
                <mm-button aria-controls="comment-sheet" aria-haspopup="dialog">
                  댓글 시트 열기
                </mm-button>
                <mm-sheet id="comment-sheet" placement="bottom">
                  <mm-sheet-header heading="댓글"></mm-sheet-header>
                  <mm-sheet-body>
                    <mm-comment-item
                      author="수줍이"
                      datetime="1 day ago"
                      avatar-src="/src/images/soojubm.png"
                      editable
                      @edit=${() => alert('수정 clicked')}
                      @delete=${() => alert('삭제 clicked')}
                    >
                      시트 안에서 연 popover가 시트 패널과 backdrop 위로 뜨는지 확인합니다.
                    </mm-comment-item>
                  </mm-sheet-body>
                </mm-sheet>
              </mm-content-section>
            </mm-surface>
          </mm-grid>

          <mm-notice
            heading="화살표는 페이지를 열 때 자동으로 뜨는 표면에만 둡니다."
            description="사용자가 직접 연 표면은 위치만으로 어디서 나왔는지 알 수 있습니다."
          ></mm-notice>

          <mm-content-section heading-level="3" heading="Modal × Non-Modal">
            <mm-paragraph>모달은 열린 동안 뒤의 화면을 막는 표면입니다.</mm-paragraph>
            <mm-text-list
              .texts=${[
                html`
                  모달: ${code('mm-sheet')} · ${code('mm-dialog')}
                `,
                html`
                  비모달: ${code('mm-popover')} · ${code('mm-select')} · ${code('mm-tooltip')} ·
                  ${code('mm-toast')}
                `,
              ]}
            ></mm-text-list>
            <mm-text-list
              variant="check"
              .texts=${[
                rule(
                  '모달 사용 시점',
                  '작업을 마치거나 취소해야 다음으로 넘어가는 흐름에 모달을 쓴다. 삭제 확인, 중요 정보 입력, 결제가 여기에 해당한다',
                ),
                rule(
                  '배경과 포커스',
                  html`
                    모달은 backdrop으로 배경을 덮고 포커스를 표면 안에 가두며,
                    ${code('aria-modal')}을 스스로 갖는다. 비모달은 배경 조작과 포커스 이동을 그대로
                    둔다
                  `,
                ),
                rule(
                  'Role',
                  html`
                    ${code('mm-sheet')}는 dialog, ${code('mm-dialog')}는 alertdialog role을 담은
                    내용과 상관없이 표면이 갖고, 안의 목록은 자기 role을 함께 갖는다.
                    ${code('mm-popover')} 패널은 role 없이 두고 안의 목록이 role을 갖는다. 바로
                    실행되는 행동 목록은 menu(${code('mm-menu-item-group')}), 고른 값을 유지하는
                    목록은 listbox(${code('mm-select')}), 설명 문구는
                    tooltip(${code('mm-tooltip')})이다
                  `,
                ),
                rule(
                  '모달 개수',
                  '화면에 열린 모달은 항상 하나만 둔다. 다음 단계가 필요하면 모달을 겹쳐 열지 않고 열린 표면의 내용을 바꾸거나 흐름을 나눈다',
                ),
              ]}
            ></mm-text-list>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="Placement">
            <mm-paragraph>표면이 기준점의 어느 쪽에 놓일지 정합니다.</mm-paragraph>
            <mm-code-block language="typescript" .code=${placementTypeCode}></mm-code-block>
            <mm-text-list
              variant="check"
              .texts=${[
                rule(
                  'Placement',
                  html`
                    위치는 ${code('bottom-start')}처럼 방향과 정렬을 한 값에 담은
                    ${code('placement')} 하나로 정한다. ${code('align')}은 정렬 의미에만 쓴다
                  `,
                ),
                rule(
                  'Alignment',
                  html`
                    ${code('start')}·${code('end')}로 쓰고, 생략하면 가운데에 맞춘다.
                    ${code('bottom')}은 트리거 가운데 아래에 놓인다.
                    ${code('left')}·${code('right')} 대신 논리 방향을 써서 쓰기 방향이 바뀌어도
                    의미가 같다
                  `,
                ),
                rule(
                  'Flip',
                  '선호 방향에 자리가 없으면 반대 변으로 뒤집고 화면 안으로 밀어 넣는다',
                ),
                rule(
                  'Motion',
                  'anchored overlay는 트리거에 붙은 쪽에서 자라나고, viewport overlay는 붙은 변에서 밀려 들어온다',
                ),
              ]}
            ></mm-text-list>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="Dismiss">
            <mm-paragraph>표면을 열고 닫는 방법을 정합니다.</mm-paragraph>
            <mm-paragraph>
              ${code('DisclosureController')} · ${code('SheetController')} ·
              ${code('AdaptiveOverlayController')}
            </mm-paragraph>
            <mm-text-list
              variant="check"
              .texts=${[
                rule(
                  '트리거',
                  html`
                    여는 버튼은 표면과 연결만 한다. 열고 닫기와 ${code('aria-expanded')} 갱신은
                    표면이 처리하므로 버튼에 클릭 핸들러를 따로 달지 않는다
                  `,
                ),
                rule(
                  '닫기',
                  html`
                    바깥 클릭·ESC 같은 닫기는 표면이 스스로 처리한다. viewport 표면은
                    ${code('SheetController')}가, anchored 표면은 ${code('mm-popover')}가 맡는다.
                    저장 완료·항목 선택처럼 작업 결과로 닫히는 경우에만 내용이 ${code('close()')}를
                    호출한다
                  `,
                ),
                rule(
                  html`
                    열림이 바뀌면 ${code('toggle')} 이벤트로 알린다
                  `,
                  html`
                    바깥 클릭·ESC로 표면이 스스로 닫혀도 ${code('detail.open')}에 열림 여부가 담겨
                    나가므로, 쓰는 쪽은 이 값으로 트리거의 ${code('aria-expanded')} 같은 자기 상태를
                    맞춘다. 이벤트는 버블링하지 않아 안에 둔 다른 표면의 ${code('toggle')}과 섞이지
                    않는다
                  `,
                ),
              ]}
            ></mm-text-list>
            <mm-paragraph>
              ${code('AdaptiveOverlayController')}는 넓은 화면의 popover와 좁은 화면의 sheet로
              목록을 여는 컴포넌트(${code('mm-select')}·${code('mm-more-menu')})의 열림 상태를
              소유합니다. 두 표면은 backdrop·portal·스크롤 잠금을 쥐는 방식이 달라 표면 컴포넌트를
              갈아 끼우므로, 열림 상태는 표면이 나눠 갖지 않고 이 컨트롤러 하나가 갖습니다.
            </mm-paragraph>
            <mm-table
              .rows=${dismissRows}
              caption="viewport 표면의 닫기 수단 비교"
              .columns=${[
                { label: 'UI' },
                { label: '배경 클릭' },
                { label: 'ESC' },
                { label: '닫기 아이콘' },
                { label: '이유' },
              ]}
            ></mm-table>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="Portal">
            <mm-paragraph>
              Portal은 표면을 선언한 자리에서 떼어 ${code('index.html')} 끝의
              ${code('#portal-root')} 컨테이너로 옮겨 렌더하는 방식입니다. 이 컨테이너는
              ${code('body')}의 마지막 자식이라 앱 셸의 어떤 조상에도 속하지 않습니다.
            </mm-paragraph>
            <mm-paragraph>
              portal로 옮긴 표면은 조상의 transform·contain에 갇히지 않아, 어느 자리에서 열려도 화면
              전체를 덮는 같은 층위에 뜹니다.
            </mm-paragraph>
            <mm-paragraph>${code('PortalController')}</mm-paragraph>
            <mm-text-list
              variant="check"
              .texts=${[
                rule(
                  html`
                    ${code('#portal-root')}
                  `,
                  html`
                    viewport overlay는 모두 ${code('#portal-root')} 컨테이너로 옮겨, 셸이 렌더하는
                    노드와 분리된 한곳에 모은다
                  `,
                ),
                rule(
                  '이동 시점',
                  '표면이 문서에 연결될 때 한 번만 옮기고, 열 때는 open만 토글한다. 열 때 옮기면 닫힌 상태가 한 번도 그려지지 않아 열림 애니메이션이 재생되지 않는다',
                ),
              ]}
            ></mm-text-list>
            <mm-component-notice heading="anchored overlay를 portal로 전환한다">
              지금은 portal 없이 트리거 옆에 띄워, ${code('mm-sheet-body')}처럼 스크롤 영역 안에
              놓인 popover는 화면에 자리가 남아 있어도 아래쪽이 잘리고 position·z-index를 가진 조상
              밖으로 올라가지 못한다. 전환 전까지 z-index는 실제로 겹치는 요소에만 주고, 전환할 때
              React 구현도 함께 옮긴다
            </mm-component-notice>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="주의">
            <mm-text-list
              .texts=${[
                rule(
                  '메뉴 트리거 위치',
                  '메뉴 트리거는 스크롤 영역 바깥에 둡니다. 스크롤 영역 안의 항목은 누르면 다음 화면으로 넘어가게 하고, overflow는 내용이 영역을 넘치는 곳에만 줍니다.',
                ),
              ]}
            ></mm-text-list>
          </mm-content-section>
        </mm-content-section-list>
      </mm-tab-panel>
    </mm-content-section-list>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
