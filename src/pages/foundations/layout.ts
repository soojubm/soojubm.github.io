import { html } from 'lit'

import type { TemplateResult } from 'lit'

import './layout.css'

import '@/components/domains/component/component-notice'
import { code, no, rule, yes } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

const classificationRows = html`
  <tr>
    <th scope="row"><mm-link href="./dialog.html">Dialog</mm-link></th>
    <td>${yes}</td>
    <td>Viewport</td>
    <td>alertdialog</td>
    <td>sheet</td>
    <td>${yes}</td>
  </tr>
  <tr>
    <th scope="row"><mm-link href="./sheet.html">Sheet</mm-link></th>
    <td>${yes}</td>
    <td>Viewport</td>
    <td>dialog</td>
    <td>sheet</td>
    <td>${yes}</td>
  </tr>
  <tr>
    <th scope="row">Backdrop</th>
    <td>${yes}</td>
    <td>Viewport</td>
    <td>없음</td>
    <td>backdrop</td>
    <td>없음</td>
  </tr>
  <tr>
    <th scope="row"><mm-link href="./popover.html">Popover</mm-link></th>
    <td>${no}</td>
    <td>Trigger</td>
    <td>없음</td>
    <td>popover</td>
    <td>${yes}</td>
  </tr>
  <tr>
    <th scope="row"><mm-link href="./select.html">Select</mm-link></th>
    <td>${no}</td>
    <td>Trigger</td>
    <td>listbox</td>
    <td>popover</td>
    <td>${yes}</td>
  </tr>
  <tr>
    <th scope="row"><mm-link href="./tooltip.html">Tooltip</mm-link></th>
    <td>${no}</td>
    <td>Trigger</td>
    <td>tooltip</td>
    <td>tooltip</td>
    <td>${no}</td>
  </tr>
  <tr>
    <th scope="row"><mm-link href="./toast.html">Toast</mm-link></th>
    <td>${no}</td>
    <td>Viewport</td>
    <td>status</td>
    <td>toast</td>
    <td>${no}</td>
  </tr>
`

const dismissRows = html`
  <tr>
    <th scope="row"><mm-link href="./sheet.html">Sheet</mm-link></th>
    <td>${yes}</td>
    <td>${yes}</td>
    <td>닫기 아이콘을 누를 때</td>
    <td>닫아도 잃는 것이 없는 내용(댓글, 검색 등)을 담으므로 가볍게 닫히게 한다</td>
  </tr>
  <tr>
    <th scope="row"><mm-link href="./dialog.html">Dialog</mm-link></th>
    <td>${no}</td>
    <td>${yes}</td>
    <td>내용이 ${code('close()')}를 호출할 때</td>
    <td>
      확인이 필요한 중요한 작업에 쓰므로 의도가 불분명한 배경 클릭으로 흐름이 끊기지 않게 한다.
      ESC는 키보드 사용자의 탈출 수단이라 남기되, 보조 액션이 파괴적일 수 있어 어느 액션도 실행하지
      않고 닫기만 한다
    </td>
  </tr>
  <tr>
    <th scope="row"><mm-link href="./toast.html">Toast</mm-link></th>
    <td>${no}</td>
    <td>${no}</td>
    <td>표시 시간이 지나면</td>
    <td>
      결과를 알리는 데 그치고 배경 조작을 막지 않으므로 따로 닫게 하지 않는다. 표시 시간(3초)이
      지나면 스스로 닫히되, 포인터나 포커스가 올라와 있는 동안은 시간이 멈추고 벗어나면 처음부터
      다시 흐른다. 열려 있을 때 다시 열어도 처음부터 다시 흐른다
    </td>
  </tr>
  <tr>
    <th scope="row"><mm-link href="./popover.html">Popover</mm-link></th>
    <td>${yes}</td>
    <td>${yes}</td>
    <td>Tab으로 표면을 벗어나거나 내용이 ${code('close()')}를 호출할 때</td>
    <td>
      트리거 곁에 잠깐 뜨는 보조 표면이라, 다른 곳을 누르면 곧바로 물러나게 한다. 표면이 문서 끝으로
      옮겨져 Tab으로 나가면 엉뚱한 곳에 닿으므로, 벗어나면 닫고 트리거로 돌려보낸다
    </td>
  </tr>
  <tr>
    <th scope="row"><mm-link href="./select.html">Select</mm-link></th>
    <td>${yes}</td>
    <td>${yes}</td>
    <td>옵션을 골랐을 때</td>
    <td>
      값을 고르면 할 일이 끝나므로 고르는 즉시 닫는다. 좁은 화면에서는 sheet로 열려 sheet의 닫기
      수단을 따른다
    </td>
  </tr>
  <tr>
    <th scope="row"><mm-link href="./tooltip.html">Tooltip</mm-link></th>
    <td>${no}</td>
    <td>${no}</td>
    <td>포인터나 포커스가 트리거를 벗어날 때</td>
    <td>트리거에 머무는 동안만 보이는 설명이라 열고 닫는 조작을 따로 두지 않는다</td>
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

const groupRows = html`
  <tr>
    <th scope="row">${code('mm-button-group')}</th>
    <td>없음</td>
    <td>없음</td>
    <td>${code('--space-2')}</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-tag-group')}</th>
    <td>없음</td>
    <td>없음</td>
    <td>${code('--space-1')}</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-keyword-tag-group')}</th>
    <td>없음</td>
    <td>없음</td>
    <td>${code('--space-1')}</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-avatar-group')}</th>
    <td>없음</td>
    <td>없음</td>
    <td>${code('--space-2')}</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-list-item-group')}</th>
    <td>없음</td>
    <td>list, 항목은 listitem</td>
    <td>${code('--space-3')}</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-menu-item-group')}</th>
    <td>없음</td>
    <td>menu</td>
    <td>0 · large는 ${code('--space-2')}</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-meta-item-group')}</th>
    <td>없음</td>
    <td>group</td>
    <td>기본 ${code('--space-4')}</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-paragraph-group')}</th>
    <td>없음</td>
    <td>없음</td>
    <td>${code('--space-4')}</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-feature-group')}</th>
    <td>없음</td>
    <td>group</td>
    <td>${code('--space-8')}</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-pricing-card-group')}</th>
    <td>없음</td>
    <td>list, 항목은 listitem</td>
    <td>${code('--space-8')}</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-search-suggestion-group')}</th>
    <td>없음</td>
    <td>group</td>
    <td>${code('--space-2')}</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-radio-group')}</th>
    <td>Single</td>
    <td>fieldset</td>
    <td>${code('--space-2')}</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-checkbox-group')}</th>
    <td>Multiple</td>
    <td>fieldset</td>
    <td>${code('--space-2')}</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-radio-card-group')}</th>
    <td>Single</td>
    <td>fieldset</td>
    <td>${code('--space-2')}</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-toggle-button-group')}</th>
    <td>Single</td>
    <td>group</td>
    <td>0</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-filter-button-group')}</th>
    <td>Single · Multiple</td>
    <td>group</td>
    <td>${code('--space-2')}</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-menu-item-radio-group')}</th>
    <td>Single</td>
    <td>radiogroup</td>
    <td>0 · large는 ${code('--space-2')}</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-menu-item-checkbox-group')}</th>
    <td>Multiple</td>
    <td>group</td>
    <td>0 · large는 ${code('--space-2')}</td>
  </tr>
`

/** 뷰포트 안에서 본문이 차지하는 너비를 보이는 브라우저 창 그래픽. */
const browserWindow = (content: TemplateResult) => html`
  <div class="browser-window">
    <div class="browser-window-header" aria-hidden="true">
      <div class="browser-window-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="browser-window-address">
        <mm-caption>localhost:3000</mm-caption>
      </div>
      <div class="browser-window-menu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="browser-window-body">${content}</div>
  </div>
`

const main = html`
  <mm-main>
    <mm-page-header
      heading="Layout"
      description="페이지 너비, 섹션의 배치, 화면 위로 뜨는 표면의 층위를 정합니다. 이 신호들은 장식이 아니라 페이지의 성격과 작업 맥락을 담으므로, 사용자는 의식하지 못해도 맥락이 달라졌다는 미묘한 감각을 얻습니다."
    ></mm-page-header>

    <mm-page-body>
      <mm-tab-list value="page" variant="text" search-param="tab">
        <mm-tab value="page">Page</mm-tab>
        <mm-tab value="section">Section</mm-tab>
        <mm-tab value="group">Group</mm-tab>
        <mm-tab value="overlay">Overlay</mm-tab>
      </mm-tab-list>

      <mm-tab-panel value="page">
        <mm-content-section-list>
          <mm-content-section heading-level="3" heading="페이지 너비">
            <mm-paragraph>
              너비로 읽기 밀도를 정합니다. 좁은 폭은 폼·인증처럼 한 가지 작업에 집중시키고, 넓은
              폭은 목록·대시보드처럼 훑어보는 화면에 씁니다. 너비는 콘텐츠 성격에 맞는 토큰으로
              정하며, 본문 골격은 ${code('mm-main')}의 width로, 떠오르는 표면은 각 컴포넌트의
              width로 지정합니다.
            </mm-paragraph>
            <mm-component-example full-width>
              <mm-flex direction="column" gap="4">
                ${browserWindow(html`
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
                `)}
                ${browserWindow(html`
                  <mm-surface variant="filled" style="max-width: var(--layout-width-small)">
                    <mm-flex direction="column" gap="1">
                      <mm-caption>일반 문서 · 에디토리얼, 설정, 대화, sheet</mm-caption>
                      ${code('--layout-width-small · 640px')}
                      <mm-flex gap="3">
                        <mm-link href="./post.html">Post</mm-link>
                        <mm-link href="./setting.html">Setting</mm-link>
                        <mm-link href="./chat.html">Chat</mm-link>
                        <mm-link href="./sheet.html">Sheet</mm-link>
                      </mm-flex>
                    </mm-flex>
                  </mm-surface>
                `)}
                ${browserWindow(html`
                  <mm-surface variant="filled">
                    <mm-flex direction="column" gap="1">
                      <mm-caption>확장형 · 목록, 대시보드, 상품, 프로필</mm-caption>
                      ${code('width 미지정 · 콘텐츠 영역 전체')}
                      <mm-flex gap="3">
                        <mm-link href="./dashboard.html">Dashboard</mm-link>
                        <mm-link href="./product.html">Product</mm-link>
                        <mm-link href="./profile.html">Profile</mm-link>
                      </mm-flex>
                    </mm-flex>
                  </mm-surface>
                `)}
              </mm-flex>
            </mm-component-example>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="배경 대비">
            <mm-paragraph-group>
              <mm-paragraph>
                글쓰기·설정·소개처럼 이전 화면과 다른 정보 구조로 들어갈 때 페이지 배경을 한 단계
                낮춰 다른 맥락으로 넘어왔다는 감각을 줍니다.
              </mm-paragraph>
              <mm-paragraph>
                ${code('mm-main')}의 ${code('background')}를 ${code('subtle')}로 지정합니다.
              </mm-paragraph>
            </mm-paragraph-group>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="층위">
            <mm-paragraph-group>
              <mm-paragraph>
                층위는 특정 콘텐츠를 주변보다 앞으로 올려, 사용자의 시선이 그곳에 먼저 머물게
                합니다. 폼·카드·편집 영역처럼 독립적으로 다루는 묶음은 표면으로 올려 주변 콘텐츠와
                분리합니다. 명도 대비가 먼저 층위를 만들고, 그림자는 그 위에서 떠 있는 정도를
                더합니다.
              </mm-paragraph>
              <mm-paragraph>
                드롭다운·팝오버처럼 잠깐 뜨는 표면(overlay)은 콘텐츠 위로 겹칩니다. 전역
                내비게이션은 페이지에 고정된 다른 바보다 항상 위에 보여야 해서 chrome-top 층을
                씁니다. 층 이름은 그림자의 높낮이와 겹치는 순서에 똑같이 쓰입니다. 표면별로 쓰는
                층은 Overlay 탭의 표에, 층 그룹 토큰은
                <mm-link href="./tokens.html">Tokens</mm-link>
                문서의 Z-index에 정리돼 있습니다.
              </mm-paragraph>
            </mm-paragraph-group>
            <mm-text-list
              variant="check"
              .texts=${[
                rule(
                  '대비는 강조할 콘텐츠 영역에 한 단계만 준다',
                  '배경·표면·그림자를 여러 영역에 여러 단계로 겹치면 어디가 중요한지 흐려져 강조가 사라진다',
                ),
                rule(
                  '정적인 층위와 hover 피드백을 구분한다',
                  html`
                    hover에서 잠깐 떠오르는 ${code('--interaction-hover-lift')}는 층위가 아니라
                    상호작용 피드백이며,
                    <mm-link href="./interaction.html">Interaction</mm-link>
                    문서의 조작 상태가 다룬다
                  `,
                ),
              ]}
            ></mm-text-list>
            <mm-component-example full-width>
              ${browserWindow(html`
                <div class="app-shell">
                  <mm-surface variant="outlined" class="app-shell-topbar">
                    <mm-caption>Top Bar · chrome</mm-caption>
                  </mm-surface>
                  <mm-surface variant="outlined" class="app-shell-sidebar">
                    <mm-caption>Sidebar · chrome-top</mm-caption>
                  </mm-surface>
                  <mm-surface variant="ghost" class="app-shell-content">
                    <mm-caption>Content · base</mm-caption>
                    <mm-surface variant="elevated" class="app-shell-overlay">
                      <mm-caption>Overlay · toast</mm-caption>
                    </mm-surface>
                  </mm-surface>
                  <mm-surface variant="outlined" class="app-shell-bottombar">
                    <mm-caption>Bottom Bar · chrome</mm-caption>
                  </mm-surface>
                </div>
              `)}
            </mm-component-example>
          </mm-content-section>
        </mm-content-section-list>
      </mm-tab-panel>

      <mm-tab-panel value="section">
        <mm-content-section-list>
          <mm-content-section heading="Utilities">
            <mm-paragraph>
              페이지·콘텐츠 조립의 배치와 구획은
              <mm-link href="./utilities.html">Utilities</mm-link>
              가 맡습니다. Flex·Grid는 배치를, Page Header·Content Section·Text Block·Form Field는
              제목과 구획을 정합니다.
            </mm-paragraph>
          </mm-content-section>
        </mm-content-section-list>
      </mm-tab-panel>

      <mm-tab-panel value="group">
        <mm-content-section-list>
          <mm-grid columns="4" gap="4">
            <mm-surface>
              <mm-content-section heading-level="3" heading="배치 그룹">
                <mm-paragraph>
                  정렬과 간격만 소유합니다. 항목은 자기 바깥 간격을 갖지 않고, 그룹의 간격을
                  따릅니다.
                </mm-paragraph>
              </mm-content-section>
            </mm-surface>
            <mm-surface>
              <mm-content-section heading-level="3" heading="선택 그룹">
                <mm-paragraph>정렬과 간격에 더해 선택 상태를 소유합니다.</mm-paragraph>
              </mm-content-section>
            </mm-surface>
          </mm-grid>

          <mm-text-list
            variant="check"
            .texts=${[
              rule(
                '그룹 간격은 묶는 항목의 레벨을 따른다',
                html`
                  Element 그룹은 ${code('--space-1')}~${code('--space-3')}, Article 그룹은
                  ${code('--space-8')}, Section 그룹은 ${code('--space-section')}을 쓴다. Article은
                  Element보다 덩어리가 커서 같은 간격으로 놓으면 경계가 흐려진다
                `,
              ),
              rule(
                '레벨에 맞는 수단으로 구획을 나눈다',
                'Element 그룹은 선이나 면 없이 간격만으로 한 덩어리로 읽히게 한다. Article 그룹은 이웃과 구분되어야 해서 선이나 면으로 경계를 긋고, 면이 덩어리를 이미 나누는 격자는 gap만 쓴다. Section 그룹은 선 없이 여백과 제목으로 나눈다',
              ),
              rule(
                html`
                  구획은 gap과
                  <mm-link href="./separator.html">separator</mm-link>
                  중 하나로만 나눈다
                `,
                'separator가 구획을 맡는 컨테이너는 gap을 두지 않고 separator의 자체 간격에 맡긴다. 둘을 겹치면 경계가 두 번 그어진다',
              ),
            ]}
          ></mm-text-list>

          <mm-link-prompt
            message="선택 기준과 상태 소유 방식이 궁금하신가요?"
            link-label="Selection"
            href="./interaction.html?tab=selection"
          ></mm-link-prompt>

          <!-- TODO 그룹을 여기 다 모아서 보여줄 필요가 없다. -->
          <!-- <mm-table
              .rows=${groupRows}
              caption="그룹의 선택 개수·role·항목 간격"
              .columns=${[
            { label: '컴포넌트', width: '260px' },
            { label: '선택', width: '140px' },
            { label: 'Role', width: '160px' },
            { label: '간격' },
          ]}
            ></mm-table> -->
        </mm-content-section-list>
      </mm-tab-panel>

      <mm-tab-panel value="overlay">
        <mm-content-section-list>
          <mm-flex direction="column" gap="4">
            <mm-grid columns="2" gap="4">
              <mm-surface>
                <mm-content-section heading-level="3" heading="Anchored overlay">
                  <mm-paragraph>
                    트리거를 기준으로 엽니다. 트리거 옆에 붙어 떠서, 어느 요소에서 열린 표면인지
                    위치만으로 이어집니다.
                  </mm-paragraph>
                </mm-content-section>
              </mm-surface>
              <mm-surface>
                <mm-content-section heading-level="3" heading="Viewport overlay">
                  <mm-paragraph>
                    viewport를 기준으로 화면 중앙이나 가장자리에 띄웁니다. 트리거 위치와 상관없이
                    같은 자리에 열려, 어디서 열었든 같은 표면이라는 인상을 줍니다.
                  </mm-paragraph>
                </mm-content-section>
              </mm-surface>
            </mm-grid>

            <mm-table
              .rows=${classificationRows}
              caption="화면 위로 뜨는 표면의 modal 여부·위치 기준·드러나는 role·레이어 비교"
              .columns=${[
                { label: 'UI', width: '140px' },
                { label: 'Modal', width: '100px' },
                { label: 'Anchor', width: '120px' },
                { label: 'Role', width: '140px' },
                { label: 'z-index', width: '120px' },
                { label: '열 때 포커스 이동' },
              ]}
            ></mm-table>
          </mm-flex>

          <mm-content-section heading-level="3" heading="Modal × Non-Modal">
            <mm-paragraph>
              모달은 열린 동안 뒤의 화면을 막는 표면입니다. 작업을 마치거나 취소해야 다음으로
              넘어가는 흐름에 쓰며, 삭제 확인·중요 정보 입력·결제가 여기에 해당합니다.
            </mm-paragraph>
            <mm-text-list
              variant="check"
              .texts=${[
                rule(
                  '모달은 배경을 덮고 포커스와 스크롤을 표면 안에 가둔다',
                  html`
                    backdrop으로 배경을 덮고 뒤 화면을 ${code('inert')}로 만들어 포커스를 표면 안에
                    가둡니다. 열려 있는 동안 뒤 화면 스크롤을 잠그고, 스크롤 위치를 기억했다가 닫을
                    때 그 자리로 되돌린다
                  `,
                ),
                rule(
                  '열 때 포커스를 표면 안으로 옮기고, 닫을 때 트리거로 되돌린다',
                  html`
                    열 때는 안의 ${code('autofocus')} 요소로, 없으면 표면 자체로 옮긴다. 닫을 때
                    모달은 열기 직전에 포커스가 있던 요소(주로 트리거)로 되돌린다. 비모달은 포커스가
                    표면 안에 있다가 닫힐 때만 트리거로 돌려, 이미 다른 곳으로 옮겨 간 포커스를
                    빼앗지 않으면서 숨겨진 요소에 포커스가 남지 않게 한다
                  `,
                ),
                rule(
                  '비모달 표면은 Tab으로 벗어나면 닫고 트리거로 돌려보낸다',
                  html`
                    비모달 표면은 ${code('#portal-root')}로 옮겨져 문서 끝에 놓이므로, Tab으로 밖에
                    나가면 트리거 다음 요소가 아니라 엉뚱한 곳에 닿는다. 포커스가 표면을 벗어나면
                    닫고 트리거로 되돌려, 다음 Tab이 트리거에서 이어지게 한다. 바깥을 눌러 닫을 때는
                    사용자가 고른 곳의 포커스를 빼앗지 않는다
                  `,
                ),
                rule('표면과 내용의 role은 각각 소유한다'),
                rule(
                  '모달을 2개 이상 쌓지 않는다.',
                  '열린 표면의 내부에서 내용을 바꾸거나 흐름을 설계한다',
                ),
              ]}
            ></mm-text-list>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="Placement">
            <mm-paragraph>표면이 기준점의 어느 쪽에 놓일지 정합니다.</mm-paragraph>
            <mm-code-block language="typescript" .code=${placementTypeCode}></mm-code-block>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="Dismiss">
            <mm-paragraph>표면을 열고 닫는 방법을 정합니다.</mm-paragraph>
            <mm-text-list
              variant="check"
              .texts=${[
                rule(
                  '바깥 클릭·ESC 같은 닫기는 표면이 스스로 처리한다',
                  html`
                    viewport 표면은 ${code('SheetController')}가, 열고 닫는 조작이 있는 anchored
                    표면은 ${code('mm-popover')}가 맡는다. 저장 완료·항목 선택처럼 작업 결과로
                    닫히는 경우에만 내용이 ${code('close()')}를 호출한다
                  `,
                ),
                rule('ESC는 가장 나중에 연 표면 하나만 닫는다'),
              ]}
            ></mm-text-list>
            <mm-table
              .rows=${dismissRows}
              caption="표면의 닫기 수단 비교"
              .columns=${[
                { label: 'UI', width: '100px' },
                { label: '바깥 클릭', width: '100px' },
                { label: 'ESC', width: '80px' },
                { label: '그 밖의 닫힘', width: '260px' },
                { label: '이유' },
              ]}
            ></mm-table>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="DisclosureController">
            <mm-paragraph>
              열고 닫는 모든 표면이 공통으로 쓰는 컨트롤러입니다. 트리거 클릭으로 열림을 토글하고
              ${code('aria-expanded')}를 맞추며, 열림이 바뀌면 ${code('toggle')} 이벤트로 알립니다.
              트리거는 ${code('aria-controls')}로 표면을 가리키기만 하고 여는 표면의 종류는
              ${code('aria-haspopup')}으로 직접 선언하므로, 쓰는 쪽은 클릭 핸들러를 따로 달지
              않습니다. 표면이 portal로 옮겨져도 옮기기 전 자리의 root에서 트리거를 찾으므로,
              트리거가 소비자의 shadow 안에 있어도 됩니다. 열림 상태는 호스트의 ${code('open')}이
              갖고 컨트롤러는 읽고 쓰기만 하며, 바깥 클릭·ESC로 닫는 동작은 표면이 각자 소유합니다.
            </mm-paragraph>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="SheetController">
            <mm-paragraph>
              viewport 기준 modal 표면(${code('mm-sheet')}·${code('mm-dialog')})이 공통으로 쓰는
              컨트롤러입니다. 트리거 연결, portal 이동, 스크롤 잠금, 배경 클릭·ESC로 닫기를 한곳에서
              맡으므로 표면은 닫는 조건만 ${code('dismissOn')}으로 밝힙니다. 열린 동안에는 portal
              컨테이너 바깥의 ${code('body')} 자식과 먼저 열려 있는 아래쪽 모달 표면을
              ${code('inert')}로 만들어 포커스를 표면 안에 가두고, 닫히면 풀어 연 요소로 되돌립니다.
              모달이 겹쳐 열려도 닫히는 순서와 무관하게 마지막 표면이 닫힐 때 풀립니다.
            </mm-paragraph>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="AdaptiveOverlayController">
            <mm-paragraph>
              넓은 화면의 popover와 좁은 화면의 sheet로 목록을 여는
              컴포넌트(${code('mm-select')}·${code('mm-more-menu')})의 열림 상태를 소유합니다. 두
              표면은 backdrop·스크롤 잠금·포커스 가두기를 처리하는 방식이 달라 표면 컴포넌트를 갈아
              끼우므로, 열림 상태는 표면이 나눠 갖지 않고 이 컨트롤러 하나가 갖습니다. 그래서
              트리거는 ${code('aria-controls')}로 표면을 가리키지 않고 호스트가 클릭을 직접
              배선합니다. 걸면 표면이 같은 클릭을 또 토글합니다. 호스트는
              ${code('open')}·${code('compact')}·${code('trigger')}를 읽어 두 표면과 트리거에 내려
              주며, 마지막으로 누른 트리거는 popover의 기준 요소가 됩니다.
            </mm-paragraph>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="PortalController">
            <mm-paragraph-group>
              <mm-paragraph>
                Portal은 표면을 선언한 자리에서 떼어 다른 곳에 렌더하는 방식입니다. 표면이 조상의
                transform·contain 안에 놓이면 위치와 층위가 그 조상에 갇히므로, 표면을 조상에서
                분리해 어느 자리에서 열려도 조상에 상관없이 같은 기준으로 놓이게 합니다.
              </mm-paragraph>
              <mm-paragraph>
                표면은 ${code('index.html')} 끝의 ${code('#portal-root')} 컨테이너로 옮겨
                렌더합니다. 이 컨테이너는 ${code('body')}의 마지막 자식이라 앱 셸의 어떤 조상에도
                속하지 않습니다.
              </mm-paragraph>
            </mm-paragraph-group>
            <mm-component-notice heading="tooltip 말풍선은 열 때 만든다">
              ${code('mm-tooltip-bubble')}은 트리거마다 미리 만들면 표가 큰 페이지에서 요소가 수백
              개가 되므로, 처음 열릴 때 만들어 바로 연다. 열림 전환은 만들어지는 순간의 시작
              스타일(${code('@starting-style')})이 재생한다
            </mm-component-notice>
          </mm-content-section>
        </mm-content-section-list>
      </mm-tab-panel>
    </mm-page-body>
  </mm-main>
`

renderPage(main)
