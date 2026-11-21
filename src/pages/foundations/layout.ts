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
    <td><mm-keyword-tag-group .keywords=${['ESC', 'close() 호출']}></mm-keyword-tag-group></td>
  </tr>
  <tr>
    <th scope="row"><mm-link href="./sheet.html">Sheet</mm-link></th>
    <td>${yes}</td>
    <td>Viewport</td>
    <td>dialog</td>
    <td>sheet</td>
    <td>${yes}</td>
    <td>
      <mm-keyword-tag-group .keywords=${['바깥 클릭', 'ESC', '닫기 버튼']}></mm-keyword-tag-group>
    </td>
  </tr>
  <tr>
    <th scope="row">Backdrop</th>
    <td>${yes}</td>
    <td>Viewport</td>
    <td>없음</td>
    <td>backdrop</td>
    <td>없음</td>
    <td>없음</td>
  </tr>
  <tr>
    <th scope="row"><mm-link href="./popover.html">Popover</mm-link></th>
    <td>${no}</td>
    <td>Trigger</td>
    <td>없음</td>
    <td>popover</td>
    <td>${yes}</td>
    <td>
      <mm-keyword-tag-group
        .keywords=${['바깥 클릭', 'ESC', '포커스 아웃', 'close() 호출']}
      ></mm-keyword-tag-group>
    </td>
  </tr>
  <tr>
    <th scope="row"><mm-link href="./select.html">Select</mm-link></th>
    <td>${no}</td>
    <td>Trigger</td>
    <td>listbox</td>
    <td>popover</td>
    <td>${yes}</td>
    <td>
      <mm-keyword-tag-group .keywords=${['바깥 클릭', 'ESC', '옵션 선택']}></mm-keyword-tag-group>
    </td>
  </tr>
  <tr>
    <th scope="row"><mm-link href="./tooltip.html">Tooltip</mm-link></th>
    <td>${no}</td>
    <td>Trigger</td>
    <td>tooltip</td>
    <td>tooltip</td>
    <td>${no}</td>
    <td>
      <mm-keyword-tag-group .keywords=${['포인터 이탈', '포커스 아웃']}></mm-keyword-tag-group>
    </td>
  </tr>
  <tr>
    <th scope="row"><mm-link href="./toast.html">Toast</mm-link></th>
    <td>${no}</td>
    <td>Viewport</td>
    <td>status</td>
    <td>toast</td>
    <td>${no}</td>
    <td><mm-keyword-tag-group .keywords=${['시간 경과']}></mm-keyword-tag-group></td>
  </tr>
`

const groupGapRows = html`
  <tr>
    <th scope="row">${code('mm-tag-group')}</th>
    <td>${code('--space-1')}</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-menu-item-group')}</th>
    <td>${code('--space-1')}·${code('--space-2')}</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-button-group')}</th>
    <td>${code('--space-2')}</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-filter-button-group')}</th>
    <td>${code('--space-2')}</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-avatar-group')}</th>
    <td>${code('--space-2')}</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-list-item-group')}</th>
    <td>${code('--space-3')} (기본)</td>
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

/** 설명을 브라우저 그래픽 위에 두고, 창 안에는 본문이 차지하는 너비만 보인다. */
const widthExample = (options: {
  caption: string
  token: string
  maxWidth?: string
  links: [href: string, label: string][]
}) => html`
  <mm-flex direction="column" gap="2">
    <mm-flex direction="column" gap="1">
      <mm-caption>${options.caption}</mm-caption>
      ${code(options.token)}
      <mm-flex gap="3">
        ${options.links.map(
          ([href, label]) =>
            html`
              <mm-link href=${href}>${label}</mm-link>
            `,
        )}
      </mm-flex>
    </mm-flex>
    ${browserWindow(html`
      <mm-surface
        variant="filled"
        style=${options.maxWidth ? `max-width: ${options.maxWidth}` : ''}
      ></mm-surface>
    `)}
  </mm-flex>
`

const main = html`
  <mm-main>
    <mm-page-header
      heading="Layout"
      description="페이지 너비, 섹션의 배치, 화면 위로 뜨는 overlay의 층위를 정합니다. 이 신호들은 장식이 아니라 페이지의 성격과 작업 맥락을 드러내므로, 사용자는 의식하지 못해도 맥락이 달라졌다는 미묘한 감각을 얻습니다."
    ></mm-page-header>

    <mm-page-body>
      <mm-tab-list value="page" variant="text" search-param="tab">
        <mm-tab value="page">Page</mm-tab>
        <mm-tab value="section">Section</mm-tab>
        <mm-tab value="element">Element</mm-tab>
        <mm-tab value="overlay">Overlay</mm-tab>
      </mm-tab-list>

      <mm-tab-panel value="page">
        <mm-content-section-list>
          <mm-content-section heading-level="3" heading="페이지 너비">
            <mm-paragraph>너비로 읽기 밀도를 정합니다.</mm-paragraph>
            <mm-text-list
              .texts=${[
                '좁은 폭은 폼·인증처럼 한 가지 작업에 집중시킨다',
                '넓은 폭은 목록·대시보드처럼 훑어보는 화면에 쓴다',
                html`
                  본문 골격은 ${code('mm-main')}의 width로, 떠오르는 overlay는 각 컴포넌트의 width로
                  지정한다
                `,
              ]}
            ></mm-text-list>
            <mm-component-example full-width>
              <mm-flex direction="column" gap="6">
                ${widthExample({
                  caption: '집중형 · 폼, 인증, dialog, tooltip',
                  token: '--layout-width-narrow · 400px',
                  maxWidth: 'var(--layout-width-narrow)',
                  links: [
                    ['./auth.html', 'Auth'],
                    ['./dialog.html', 'Dialog'],
                    ['./tooltip.html', 'Tooltip'],
                  ],
                })}
                ${widthExample({
                  caption: '일반 문서 · 에디토리얼, 설정, 대화, sheet',
                  token: '--layout-width-small · 640px',
                  maxWidth: 'var(--layout-width-small)',
                  links: [
                    ['./post.html', 'Post'],
                    ['./setting.html', 'Setting'],
                    ['./chat.html', 'Chat'],
                    ['./sheet.html', 'Sheet'],
                  ],
                })}
                ${widthExample({
                  caption: '확장형 · 목록, 대시보드, 상품, 프로필',
                  token: 'width 미지정 · 콘텐츠 영역 전체',
                  links: [
                    ['./dashboard.html', 'Dashboard'],
                    ['./product.html', 'Product'],
                    ['./profile.html', 'Profile'],
                  ],
                })}
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
            <mm-paragraph>
              층위는 특정 콘텐츠를 주변보다 앞으로 올려, 사용자의 시선이 그곳에 먼저 머물게 합니다.
            </mm-paragraph>
            <mm-text-list
              variant="check"
              .texts=${[
                rule(
                  '배경과 표면의 명도 차이로 앞뒤를 먼저 구분하고, 그림자는 강조되는 영역에도 쓴다',
                ),
                rule(
                  html`
                    폼·카드·편집 영역처럼 독립적으로 다루는 섹션만 ${code('mm-surface')}로 감싸
                    분리한다
                  `,
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
          <mm-flex direction="column" gap="4">
            <mm-paragraph>
              섹션은 제목을 가진 가장 큰 콘텐츠 덩어리입니다. 섹션 사이는 요소나 묶음 사이보다 크게
              벌려, 사용자가 주제가 바뀌었다는 것을 간격만으로 알아차리게 합니다.
            </mm-paragraph>
            <mm-grid columns="2" gap="4">
              <mm-surface>
                <mm-content-section heading-level="3" heading="heading">
                  <mm-paragraph>
                    섹션이 무엇을 다루는지 대표하는 제목입니다. 위계는 ${code('heading-level')}로
                    정합니다.
                  </mm-paragraph>
                  <mm-keyword-tag-group
                    heading="heading-level"
                    .keywords=${['2', '3', '4']}
                  ></mm-keyword-tag-group>
                </mm-content-section>
              </mm-surface>
              <mm-surface>
                <mm-content-section heading-level="3" heading="action">
                  <mm-paragraph>
                    제목 줄 오른쪽에 놓이는 슬롯입니다. “모두 보기”처럼 섹션 전체에 걸리는 동작만
                    받습니다.
                  </mm-paragraph>
                </mm-content-section>
              </mm-surface>
              <mm-surface>
                <mm-content-section heading-level="3" heading="description">
                  <mm-paragraph>
                    본문의 첫 단락입니다. 내용을 읽기 전에 섹션이 다루는 범위를 먼저 알립니다.
                  </mm-paragraph>
                </mm-content-section>
              </mm-surface>
              <mm-surface>
                <mm-content-section heading-level="3" heading="content">
                  <mm-paragraph>
                    설명 다음에 이어지는 기본 슬롯입니다. 섹션의 본문이 놓입니다.
                  </mm-paragraph>
                </mm-content-section>
              </mm-surface>
            </mm-grid>
          </mm-flex>
          <mm-text-block
            level="3"
            heading="섹션 사이는 어떻게 구분하나요"
            description="섹션은 선 없이 여백과 제목으로 나눕니다. 섹션마다 선을 그으면 페이지가 칸막이로 쪼개져 보이고, 제목과 여백이 만드는 흐름이 끊깁니다. 같은 모양의 제목과 여백이 반복되는 콘텐츠의 흐름이 섹션이 바뀌었다는 인상을 줍니다."
          >
            <mm-content-section-list size="small">
              <mm-text-block
                level="4"
                heading="간격"
                description="간격은 숫자를 직접 쓰지 않고 토큰으로 정합니다. 단계가 정해져 있어야 화면마다 같은 위계에 같은 간격이 쓰이고, 값이 바뀌어도 한 곳에서 고칩니다."
              >
                <mm-text-list
                  variant="check"
                  .texts=${[
                    rule(
                      html`
                        섹션 사이 간격은 부모 요소의 ${code('gap')}으로 둔다
                      `,
                      html`
                        섹션의 ${code('margin')}·${code('padding')}으로 두지 않는다.
                        <mm-link href="https://help.figma.com/hc/en-us/articles/360040451373">
                          Figma 오토 레이아웃
                        </mm-link>
                        도 항목 사이 간격을 항목이 아니라 부모 프레임의 간격(Spacing between
                        items)으로 정하며, 섹션이 빠지거나 순서가 바뀌어도 간격이 겹치거나 사라지지
                        않는다
                      `,
                    ),
                    html`
                      ${code('mm-content-section-list')}가 섹션 사이의 ${code('gap')}을 맡는다
                    `,
                    html`
                      ${code('mm-flex')}가 그 밖의 묶음 사이의 ${code('gap')}을 맡는다
                    `,
                  ]}
                ></mm-text-list>
                <mm-flex direction="column" gap="2">
                  <mm-surface>
                    <mm-text size="14">
                      ${code('--space-subsection')} · 32px · 섹션 안의 하위 섹션 사이. 값은
                      ${code('--space-8')}을 참조한다
                    </mm-text>
                  </mm-surface>
                  <mm-surface>
                    <mm-text size="14">
                      ${code('--space-section')} · 64px · 섹션 사이. 값은 ${code('--space-16')}을
                      참조한다
                    </mm-text>
                  </mm-surface>
                </mm-flex>
              </mm-text-block>

              <mm-text-block
                level="4"
                heading="구분선"
                description="구분선은 간격만으로 부족할 때 더하는 경계선입니다."
              >
                <mm-text-list
                  variant="check"
                  .texts=${[
                    rule('separator는 서로 다른 맥락 사이에만 둔다'),
                    rule(
                      'separator가 구획을 맡으면 컨테이너에 gap을 두지 않는다',
                      '선 위아래에 separator의 간격이 이미 있어서, gap이 더해지면 이 경계만 다른 곳보다 넓게 벌어진다',
                    ),
                  ]}
                ></mm-text-list>
              </mm-text-block>
            </mm-content-section-list>
          </mm-text-block>

          <mm-notice>
            <mm-text size="14">
              페이지·콘텐츠 조립의 배치와 구획은
              <mm-link href="./utilities.html">Utilities</mm-link>
              가 맡습니다. Flex·Grid는 배치를, Page Header·Content Section·Text Block·Form Field는
              제목과 구획을 정합니다.
            </mm-text>
          </mm-notice>
        </mm-content-section-list>
      </mm-tab-panel>

      <mm-tab-panel value="element">
        <mm-content-section-list>
          <mm-paragraph>
            엘리먼트는 섹션 안에서 라벨·값·아이콘처럼 더 쪼갤 수 없는 가장 작은 콘텐츠 단위입니다.
            사용자는 엘리먼트를 하나씩 읽기보다, 가까이 놓인 것끼리 한 의미 단위로 묶어 읽습니다.
          </mm-paragraph>
          <mm-text-block
            level="3"
            heading="엘리먼트 사이의 간격"
            description="엘리먼트 사이의 간격이 어떤 것이 한 의미 단위인지 알려 줍니다."
          >
            <mm-text-block
              level="4"
              heading="Group"
              description="함께 읽어야 뜻이 완성되는 엘리먼트의 묶음입니다. 선이나 면 없이 간격만으로 한 덩어리로 읽히게 하며, 작은 항목마다 경계를 그으면 덩어리가 잘게 쪼개져 시선이 머물 곳이 흐려집니다."
            >
              <mm-text-list
                variant="check"
                .texts=${[
                  rule(
                    '간격 단계는 한 그룹 안에서 한 가지만 쓴다',
                    '간격이 섞이면 더 벌어진 자리에서 그룹이 끊긴 것처럼 보여, 같은 그룹의 항목이 서로 다른 그룹으로 읽힌다',
                  ),
                ]}
              ></mm-text-list>
              <mm-table
                .rows=${groupGapRows}
                caption="그룹 컴포넌트가 쓰는 간격"
                .columns=${[{ label: '그룹', width: '260px' }, { label: '간격' }]}
              ></mm-table>
            </mm-text-block>
          </mm-text-block>
        </mm-content-section-list>
      </mm-tab-panel>

      <mm-tab-panel value="overlay">
        <mm-content-section-list>
          <mm-flex direction="column" gap="4">
            <mm-grid columns="2" gap="4">
              <mm-surface>
                <mm-content-section heading-level="3" heading="Anchored overlay">
                  <mm-paragraph>
                    트리거를 기준으로 엽니다. 트리거 옆에 붙어 떠서, 어느 요소에서 열린 overlay인지
                    위치만으로 이어집니다.
                  </mm-paragraph>
                </mm-content-section>
              </mm-surface>
              <mm-surface>
                <mm-content-section heading-level="3" heading="Viewport overlay">
                  <mm-paragraph>
                    viewport를 기준으로 화면 중앙이나 가장자리에 띄웁니다. 트리거 위치와 상관없이
                    같은 자리에 열려, 어디서 열었든 같은 overlay라는 인상을 줍니다.
                  </mm-paragraph>
                </mm-content-section>
              </mm-surface>
            </mm-grid>

            <mm-table
              .rows=${classificationRows}
              caption="화면 위로 뜨는 overlay의 modal 여부·위치 기준·드러나는 role·레이어·열 때 포커스 이동·닫는 방법 비교"
              .columns=${[
                { label: 'UI', width: '140px' },
                { label: 'Modal', width: '100px' },
                { label: 'Anchor', width: '120px' },
                { label: 'Role', width: '140px' },
                { label: 'Layer', width: '120px' },
                { label: '열 때 포커스 이동', width: '140px' },
                { label: '닫는 방법' },
              ]}
            ></mm-table>
          </mm-flex>

          <mm-content-section heading-level="3" heading="Modal × Non-Modal">
            <mm-paragraph>
              모달은 열린 동안 뒤의 화면을 막는 overlay입니다. 작업을 마치거나 취소해야 다음으로
              넘어가는 흐름에 쓰며, 삭제 확인·중요 정보 입력·결제가 여기에 해당합니다.
            </mm-paragraph>
            <mm-text-list
              variant="check"
              .texts=${[
                rule(
                  '모달이 열려 있는 동안 뒤 화면은 조작할 수 없게 한다',
                  html`
                    뒤 화면에서 포커스가 움직이거나 스크롤되면 사용자가 모달을 벗어났다고 착각하거나
                    하던 작업의 위치를 잃는다. 뒤 화면은 backdrop으로 흐려 보이게 하고,
                    ${code('inert')}로 포커스를 받지 못하게 하며, 스크롤을 멈춘다. 스크롤 위치는
                    기억했다가 닫을 때 그 자리로 되돌린다
                  `,
                ),
                rule(
                  '비모달 overlay에서 Tab으로 나가면 닫고, 포커스를 트리거로 되돌린다',
                  html`
                    Tab으로 나갔을 때 포커스가 트리거 다음 요소가 아니라 엉뚱한 곳으로 가면 사용자가
                    위치를 잃는다. overlay를 벗어나면 닫고 포커스를 트리거로 되돌려, 다음 Tab이
                    트리거에서 이어지게 한다. 바깥을 눌러 닫을 때는 사용자가 누른 곳의 포커스를
                    빼앗지 않는다
                  `,
                ),
                rule(
                  '겹쳐 열린 overlay는 가장 나중에 연 것부터 한 겹씩 닫는다',
                  'ESC도 맨 위 하나만 닫아 한 겹씩 돌아온다. 아래 모달은 위 모달이 열린 동안 포커스를 받지 못하고, 위 모달이 닫히면 그 모달을 열었던 자리로 포커스가 돌아와 하던 곳에서 이어 갈 수 있다',
                ),
              ]}
            ></mm-text-list>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="Placement">
            <mm-paragraph>overlay가 기준점의 어느 쪽에 놓일지 정합니다.</mm-paragraph>
            <mm-code-block language="typescript" .code=${placementTypeCode}></mm-code-block>
          </mm-content-section>

          <mm-text-block
            level="3"
            heading="컨트롤러"
            description="열림 상태, 스크롤 잠금, portal 이동처럼 overlay가 공통으로 하는 동작은 컨트롤러가 맡고, overlay 컴포넌트는 이를 가져다 씁니다."
          >
            <mm-content-section-list size="small">
              <mm-text-block
                level="4"
                heading="DisclosureController"
                description="트리거를 누르면 컴포넌트를 열고 닫는 컨트롤러입니다. overlay뿐 아니라 FAQ·사이드바 섹션처럼 제자리에서 펼치는 컴포넌트에도 씁니다."
              >
                <mm-text-list
                  .texts=${[
                    html`
                      ${code('toggle()')}을 제공: 열림 상태 ${code('open')}을 토글합니다. 컨트롤러는
                      따로 저장하지 않고 ${code('show()')}·${code('close()')}로 바꿉니다. 열림
                      상태가 바뀔 때마다 ${code('toggle')} 이벤트를 발행하며, ESC나 바깥 클릭으로
                      컴포넌트가 스스로 닫혀도 발행하므로 사용하는 쪽이 자기 상태를 맞출 수
                      있습니다.
                    `,
                    html`
                      ${code('trigger')}를 제공: 이 컴포넌트를 열고 닫는 버튼 요소를 리턴합니다.
                      트리거의 ${code('aria-controls')}가 컴포넌트 ${code('id')}를 가리키면 클릭 시
                      ${code('toggle()')}이 불립니다. ${code('aria-haspopup')}이 여는 종류를
                      선언합니다. ${code('aria-expanded')}로 열린 상태를 스크린리더에 알립니다.
                    `,
                  ]}
                ></mm-text-list>
                <mm-keyword-tag-group
                  heading="사용처"
                  .keywords=${[
                    'mm-popover',
                    'mm-sheet',
                    'mm-dialog',
                    'mm-faq-item',
                    'mm-read-more-paragraph',
                    'mm-sidebar',
                    'mm-sidebar-section',
                    'mm-select',
                    'mm-more-menu',
                  ]}
                ></mm-keyword-tag-group>
              </mm-text-block>

              <mm-text-block
                level="4"
                heading="SheetController"
                description="viewport 기준 modal overlay가 열린 동안 뒤 화면을 막고, 닫는 방법을 처리하는 컨트롤러입니다."
              >
                <mm-text-list
                  .texts=${[
                    html`
                      ESC로 항상 닫고, ${code('closeOnBackdrop')}을 켜면 배경 클릭으로도 닫습니다.
                    `,
                    html`
                      열릴 때 뒤 화면과 아래쪽 모달을 ${code('inert')}로 만들어 포커스를
                      ${code('autofocus')} 요소나 컴포넌트 안으로 옮기고, 닫힐 때 풀어 포커스를 연
                      요소로 돌립니다. 배경(backdrop)은 마우스 클릭만 막으므로, 막지 않으면 키보드
                      Tab이나 스크린리더가 뒤 화면으로 빠져나갑니다. 모달이 겹쳤을 때는 막은 횟수를
                      세어, 위 모달이 닫혀도 아래 모달이 열려 있는 동안은 뒤 화면을 풀지 않습니다.
                      닫히는 순서가 달라도 마지막 모달이 닫힐 때만 풀립니다.
                    `,
                    html`
                      ${code('PortalController')}(이동), ${code('DisclosureController')}(트리거),
                      ${code('EscapeKeyController')}(ESC), ${code('ScrollLockController')}(스크롤
                      잠금)가 함께 연결됩니다.
                    `,
                  ]}
                ></mm-text-list>
                <mm-keyword-tag-group
                  heading="사용처"
                  .keywords=${['mm-sheet', 'mm-dialog']}
                ></mm-keyword-tag-group>
              </mm-text-block>

              <mm-text-block
                level="4"
                heading="AdaptiveOverlayController"
                description="넓은 화면에서 popover로 열리는 overlay를 좁은 화면에서 bottom sheet로 전환하는 컨트롤러입니다."
              >
                <mm-text-list
                  .texts=${[
                    html`
                      ${code('isViewportCompact')}를 제공: 좁은 화면인지 알려 줍니다. true이면
                      sheet가, false이면 popover가 맡습니다.
                    `,
                    html`
                      ${code('popoverOpen')}·${code('sheetOpen')}을 제공: 컴포넌트의
                      ${code('open')}과 화면 폭을 합쳐, 화면 폭에 맞는 표면에만 열림을 내려 줍니다.
                      열림 상태는 컴포넌트가 ${code('open')}으로 소유하고, 이 컨트롤러는 읽기만
                      합니다.
                    `,
                    html`
                      ${code('handlePopoverToggle')}·${code('handleSheetToggle')}을 제공: ESC 등으로
                      popover·sheet가 스스로 닫혀도 열림 상태를 맞춥니다. 각 표면의
                      ${code('toggle')} 이벤트에 연결하면, 이벤트가 알리는 ${code('open')} 값으로
                      컴포넌트를 열거나 닫습니다. 화면 폭이 바뀌어 표면이 갈릴 때 물러나는 표면이
                      닫히며 보내는 이벤트는 무시해, 열림이 유지됩니다.
                    `,
                  ]}
                ></mm-text-list>
                <mm-keyword-tag-group
                  heading="사용처"
                  .keywords=${['mm-select', 'mm-more-menu']}
                ></mm-keyword-tag-group>
              </mm-text-block>

              <mm-text-block
                level="4"
                heading="EscapeKeyController"
                description="ESC를 누르면 열려 있는 overlay를 닫는 컨트롤러입니다."
              >
                <mm-keyword-tag-group
                  heading="사용처"
                  .keywords=${['mm-popover', 'mm-sheet', 'mm-dialog', 'mm-sidebar']}
                ></mm-keyword-tag-group>
              </mm-text-block>

              <mm-text-block
                level="4"
                heading="OutsideClickController"
                description="overlay 바깥을 누르면 콜백을 호출해 닫게 하는 컨트롤러입니다."
              >
                <mm-text-list
                  .texts=${[
                    html`
                      ${code('onOutsideClick')} 콜백: 컴포넌트 바깥을 누르면 부릅니다. 누른 곳이
                      안인지는 ${code('composedPath()')}로 판단합니다.
                    `,
                    html`
                      ${code('open')} 옵션: 열려 있는 동안에만 화면 전체에서 누르는
                      동작(${code('pointerdown')})을 감지하고, 닫히면 멈춥니다.
                    `,
                    html`
                      ${code('getTrigger')} 옵션: 넘긴 트리거(열림을 토글하는 요소)를 누르면 바깥을
                      누른 것으로 보지 않습니다.
                    `,
                    html`
                      sheet처럼 ${code('closeOnBackdrop')}을 켠 표면의 배경 클릭은
                      ${code('SheetController')}가 처리합니다. 이 컨트롤러는 ${code('document')}에서
                      누름을 받아, 모달이 겹쳐 있으면 위 모달 패널을 눌러도 아래 모달이 함께 닫히기
                      때문입니다.
                    `,
                  ]}
                ></mm-text-list>
                <mm-keyword-tag-group
                  heading="사용처"
                  .keywords=${[
                    'mm-popover',
                    'mm-select',
                    'mm-more-menu',
                    'mm-theme-selector',
                    'mm-sidebar-user-menu',
                    'mm-chat-source',
                    'mm-prompt-input',
                  ]}
                ></mm-keyword-tag-group>
              </mm-text-block>

              <mm-text-block
                level="4"
                heading="PortalController"
                description="overlay를 쓰는 자리에서 꺼내 페이지 맨 끝으로 옮겨 띄우는 컨트롤러입니다."
              >
                <mm-text-list
                  .texts=${[
                    html`
                      ${code('hostConnected()')}: 컴포넌트가 연결되면 ${code('index.html')} 끝의
                      ${code('#portal-root')}로 옮기고 원래 자리에 주석 자리표를 남깁니다. 이
                      컨테이너는 ${code('body')}의 마지막 자식이라 앱 셸의 어떤 요소 안에도 속하지
                      않습니다.
                    `,
                    html`
                      ${code('originRoot')}를 제공: 옮기기 전 자리의 root를 리턴합니다. 트리거가
                      다른 컴포넌트의 shadow DOM 안에 있으면 옮겨진 뒤의 document에서는 찾을 수
                      없어, ${code('DisclosureController')}가 트리거를 찾을 때 씁니다.
                    `,
                    html`
                      ${code('removeIfOrphaned()')}를 제공: 원래 자리의 컴포넌트가 DOM에서 빠져
                      자리표가 문서에서 떨어졌으면, 옮겨 둔 컴포넌트도 걷어냅니다.
                    `,
                  ]}
                ></mm-text-list>
                <mm-keyword-tag-group
                  heading="사용처"
                  .keywords=${[
                    'mm-popover',
                    'mm-sheet',
                    'mm-dialog',
                    'mm-tooltip-bubble',
                    'mm-toast',
                  ]}
                ></mm-keyword-tag-group>
                <mm-component-notice heading="tooltip은 한 번 만든 말풍선을 다시 그리지 않는다">
                  표처럼 트리거가 수백 개인 페이지에서 말풍선을 미리 다 만들어 두면, 화면에 보이지도
                  않는 요소가 그만큼 늘어 페이지가 느려집니다. 그래서 사용자가 처음 hover하거나
                  포커스할 때 그 트리거의 말풍선만 한 번 만들고, 이후에는 다시 그리지 않고 열림
                  상태만 바꿔 같은 말풍선을 씁니다. 처음 열 때도 두 번째부터와 같은 나타나는
                  애니메이션이 재생됩니다.
                </mm-component-notice>
              </mm-text-block>
            </mm-content-section-list>
          </mm-text-block>
        </mm-content-section-list>
      </mm-tab-panel>
    </mm-page-body>
  </mm-main>
`

renderPage(main)
