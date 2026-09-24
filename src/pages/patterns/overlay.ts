import '@/components/common'
import { html } from 'lit'

import type { TemplateResult } from 'lit'

import '@/components/domains/comment/comment-item'
import '@/components/overlay/sheet'
import '@/components/domains/component/component-pager'
import { renderPage } from '@/components/layouts/base-layouts'

const yes = html`
  <span role="img" aria-label="예">✅</span>
`
const no = html`
  <span role="img" aria-label="아니오">❌</span>
`

// 앞뒤 공백이 문장 안 여백으로 렌더되지 않도록 한 줄로 둔다.
// prettier-ignore
const code = (name: string) => html`<mm-code>${name}</mm-code>`

// 목록 항목은 해야 할 일을 굵은 한 줄로 먼저 두고 설명을 잇는다.
const rule = (title: string | TemplateResult, description: string | TemplateResult) => html`
  <span>
    <mm-text weight="bold">${title}</mm-text>
    ${description}
  </span>
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
      heading="Overlay"
      description="화면 위로 뜨는 표면은 시각적 형태가 아니라 행동 계약으로 구분합니다. 행동(modality·dismiss·reference)은 컨트롤러가 소유하고, 외형(surface·width·placement)은 각 컴포넌트가 조합합니다."
    ></mm-page-header>

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
              <mm-code>mm-popover</mm-code>
              ·
              <mm-code>mm-select</mm-code>
              ·
              <mm-code>mm-tooltip</mm-code>
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
              <mm-code>mm-sheet</mm-code>
              ·
              <mm-code>mm-dialog</mm-code>
              ·
              <mm-code>mm-toast</mm-code>
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
                모달은 backdrop으로 배경을 덮고 포커스를 표면 안에 가두며, ${code('aria-modal')}을
                스스로 갖는다. 비모달은 배경 조작과 포커스 이동을 그대로 둔다
              `,
            ),
            rule(
              'Role',
              html`
                ${code('mm-sheet')}는 dialog, ${code('mm-dialog')}는 alertdialog role을 담은 내용과
                상관없이 표면이 갖고, 안의 목록은 자기 role을 함께 갖는다. ${code('mm-popover')}
                패널은 role 없이 두고 안의 목록이 role을 갖는다. 바로 실행되는 행동 목록은
                menu(${code('mm-menu-item-group')}), 고른 값을 유지하는 목록은
                listbox(${code('mm-select')}), 설명 문구는 tooltip(${code('mm-tooltip')})이다
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
                위치는 ${code('bottom-start')}처럼 방향과 정렬을 한 값에 담은 ${code('placement')}
                하나로 정한다. ${code('align')}은 정렬 의미에만 쓴다
              `,
            ),
            rule(
              'Alignment',
              html`
                ${code('start')}·${code('end')}로 쓰고, 생략하면 가운데에 맞춘다.
                ${code('bottom')}은 트리거 가운데 아래에 놓인다. ${code('left')}·${code('right')}
                대신 논리 방향을 써서 쓰기 방향이 바뀌어도 의미가 같다
              `,
            ),
            rule('Flip', '선호 방향에 자리가 없으면 반대 변으로 뒤집고 화면 안으로 밀어 넣는다'),
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
          <mm-code>DisclosureController</mm-code>
          ·
          <mm-code>SheetController</mm-code>
        </mm-paragraph>
        <mm-text-list
          variant="check"
          .texts=${[
            rule(
              '트리거',
              html`
                여는 버튼은 표면과 연결만 한다. 누르면 열고 닫는 동작과 ${code('aria-expanded')}
                값을 바꾸는 일은 표면이 트리거를 찾아 처리하므로, 사용하는 쪽이 버튼에 클릭 핸들러를
                따로 달지 않는다
              `,
            ),
            rule(
              '닫기',
              html`
                바깥 클릭·ESC 같은 닫기는 viewport 표면은 ${code('SheetController')}가, anchored
                표면은 ${code('DisclosureController')}가 처리한다. 저장 완료·항목 선택처럼 작업
                결과로 닫히는 경우는 내용이 ${code('close()')}를 호출한다. 댓글 시트는 바깥을 누르면
                스스로 닫히고, 시트 안에서 저장이 끝나면 폼 쪽이 ${code('sheet.close()')}를 호출한다
              `,
            ),
            rule(
              '열림 상태',
              html`
                열렸는지는 표면의 ${code('open')} 속성 하나로 나타낸다.
                ${code('<mm-sheet open>')}으로 열어 두거나 ${code('sheet.open = true')}로 바꿀 수
                있고, 컨트롤러는 이 값을 따로 갖지 않고 읽고 쓰고 알리기만 한다
              `,
            ),
          ]}
        ></mm-text-list>
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
          Portal은 표면을 선언한 자리에서 떼어 ${code('index.html')} 끝의 ${code('#portal-root')}
          컨테이너로 옮겨 렌더하는 방식입니다. 이 컨테이너는 ${code('body')}의 마지막 자식이라 앱
          셸의 어떤 조상에도 속하지 않습니다.
        </mm-paragraph>
        <mm-paragraph>
          portal로 옮긴 표면은 조상의 transform·contain에 갇히지 않아, 어느 자리에서 열려도 화면
          전체를 덮는 같은 층위에 뜹니다.
        </mm-paragraph>
        <mm-paragraph><mm-code>PortalController</mm-code></mm-paragraph>
        <mm-text-list
          variant="check"
          .texts=${[
            rule(
              '모이는 곳',
              html`
                viewport overlay는 모두 ${code('#portal-root')} 컨테이너로 옮겨, 셸이 렌더하는
                노드와 분리된 한곳에 모은다
              `,
            ),
            rule(
              '이동 시점',
              '표면이 문서에 연결될 때 한 번만 옮긴다. 열 때 옮기면 이동과 열림이 같은 프레임에 처리되어, 브라우저가 닫힌 상태를 한 번도 그리지 못한 채 열린 상태로 넘어가 열림 애니메이션이 재생되지 않는다. 표면은 미리 옮겨 둔 자리에서 open만 토글한다',
            ),
          ]}
        ></mm-text-list>
        <mm-notice
          heading="anchored overlay는 종국에는 portal로 전환합니다."
          description="지금은 portal 없이 트리거 옆에 띄워, 스크롤 컨테이너 안에서 잘리고 position·z-index를 가진 조상 밖으로 올라가지 못합니다. 전환 전까지 z-index는 실제로 겹치는 요소에만 주고, 전환할 때 React 구현도 함께 옮깁니다."
        ></mm-notice>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="주의">
        <mm-text-list
          .texts=${[
            rule(
              '스크롤 영역 안의 잘림',
              html`
                ${code('mm-sheet-body')}처럼 스크롤 영역 안에 놓인 popover는 화면에 자리가 남아
                있어도 아래쪽이 잘립니다. 아직 해결되지 않았습니다.
              `,
            ),
            rule(
              '메뉴 트리거 위치',
              '메뉴 트리거는 스크롤 영역 바깥에 둡니다. 스크롤 영역 안의 항목은 누르면 다음 화면으로 넘어가게 하고, overflow는 내용이 영역을 넘치는 곳에만 줍니다.',
            ),
            rule(
              '패널 높이',
              html`
                popover 패널은 400px와 화면 높이의 50% 중 작은 값까지 자라고, 넘치면 안에서
                스크롤됩니다. ${code('mm-select')} 목록은 옵션 5개까지 보입니다.
              `,
            ),
            rule(
              '패널 폭',
              'popover 패널은 240px보다 좁아지지 않습니다. 테이블 셀처럼 좁은 자리의 트리거에 붙이면 패널이 주변을 덮으니 그 범위를 함께 봅니다.',
            ),
          ]}
        ></mm-text-list>
      </mm-content-section>
    </mm-content-section-list>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
