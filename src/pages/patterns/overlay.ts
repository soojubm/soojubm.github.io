import '@/components/common'
import { html } from 'lit'

import type { TemplateResult } from 'lit'

import '@/components/domains/comment-item'
import '@/components/overlay/sheet'
import '@/components/domains/component/component-pager'
import '@/components/domains/component/copy-page-button'
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
    <mm-flex justify-content="between" align-items="start" gap="3">
      <mm-page-header
        heading="Overlay"
        description="화면 위로 뜨는 표면은 시각적 형태가 아니라 행동 계약으로 구분합니다. 행동(modality·dismiss·reference)은 컨트롤러가 소유하고, 외형(surface·width·placement)은 각 컴포넌트가 조합합니다."
      ></mm-page-header>
      <mm-copy-page-button></mm-copy-page-button>
    </mm-flex>

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

      <mm-content-section heading-level="3" heading="Modal × Non-Modal">
        <mm-paragraph>
          모달은 열린 동안 뒤의 화면을 막는 표면으로 ${code('mm-sheet')} · ${code('mm-dialog')}가
          해당합니다. 비모달은 뒤의 화면을 그대로 두는 표면으로 ${code('mm-popover')} ·
          ${code('mm-select')} · ${code('mm-tooltip')} · ${code('mm-toast')}가 해당합니다.
        </mm-paragraph>
        <mm-text-list
          variant="check"
          .texts=${[
            rule(
              '작업을 마치거나 취소해야 다음으로 넘어가는, 사용자 경험에 필수적인 흐름에 모달을 쓴다',
              '삭제 확인, 중요 정보 입력, 결제 흐름이 여기에 해당한다',
            ),
            rule(
              '배경 상호작용과 포커스의 범위는 모달 여부가 정한다',
              '모달은 dialog·alertdialog role과 aria-modal을 스스로 갖고, Backdrop으로 배경을 덮어 포커스를 표면 안에 가둔다. 비모달은 배경 상호작용과 포커스 이동을 그대로 둔다',
            ),
            rule(
              '표면이 사용자가 들어가는 창이면 표면이, 조작 대상이 목록이면 그 목록이 role을 갖는다',
              html`
                ${code('mm-sheet')}·${code('mm-dialog')}는 담은 내용과 상관없이 표면이 dialog role을
                갖고, 안의 목록은 자기 role을 함께 갖는다. bottom 시트에 선택 목록을 담아도 시트는
                dialog, 목록은 listbox다. ${code('mm-popover')} 패널은 menu와 menuitem 사이에 층이
                끼지 않도록 role 없이 두고, 트리거가 가리키는 목록이 role을 갖는다. 누르면 바로
                실행되는 행동 목록은 menu(${code('mm-menu-item-group')}), 고른 값을 유지하는 선택
                목록은 listbox(${code('mm-select')}), 설명 문구는 tooltip(${code('mm-tooltip')})이다
              `,
            ),
            rule(
              html`
                ${code('mm-sheet')}는 배경 클릭과 ESC로도 닫는다
              `,
              html`
                닫아도 잃는 것이 없는 내용(댓글, 검색 등)을 담으므로 가볍게 닫히게 한다. 명시적인
                닫기는 ${code('mm-sheet-header')}의 닫기 버튼이 맡는다
              `,
            ),
            rule(
              html`
                ${code('mm-dialog')}는 액션 버튼과 ESC로만 닫는다
              `,
              '사용자의 확인이 필요한 치명적이거나 중요한 작업에 쓰므로, 의도가 불분명한 배경 클릭으로 확인 흐름이 끊기면 안 된다. ESC는 키보드 사용자의 탈출 수단이라 남기되, 보조 액션이 파괴적인 쪽(나가기 등)일 수 있어 어느 액션도 실행하지 않고 닫기만 한다',
            ),
            rule(
              '화면에 열린 모달은 항상 하나만 둔다',
              '다음 단계가 필요하면 모달 위에 모달을 중첩하는 대신 열린 표면의 내용을 교체하거나 흐름을 나눈다',
            ),
          ]}
        ></mm-text-list>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Anchored overlay">
        <mm-paragraph>
          트리거를 기준으로 엽니다. 트리거 옆에 붙어 떠서, 어느 요소에서 열린 표면인지 위치만으로
          이어집니다.
        </mm-paragraph>
        <mm-paragraph>
          <mm-code>mm-popover</mm-code>
          ·
          <mm-code>mm-select</mm-code>
          ·
          <mm-code>mm-tooltip</mm-code>
        </mm-paragraph>
        <mm-text-list
          variant="check"
          .texts=${[
            rule(
              '화살표는 페이지 로딩 시점에 자동으로 뜨는 표면에만 둔다',
              '사용자가 직접 연 표면이 아니므로 화살표로 어느 요소를 가리키는지 알린다. 사용자가 포인터나 손가락으로 직접 연 표면은 위치만으로 어디에서 나왔는지 드러난다',
            ),
          ]}
        ></mm-text-list>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Viewport overlay">
        <mm-paragraph>
          viewport를 기준으로 화면 중앙이나 가장자리에 띄웁니다. 트리거 위치와 상관없이 같은 자리에
          열려, 어디서 열었든 같은 표면이라는 인상을 줍니다.
        </mm-paragraph>
        <mm-paragraph>
          <mm-code>mm-sheet</mm-code>
          ·
          <mm-code>mm-dialog</mm-code>
          ·
          <mm-code>mm-toast</mm-code>
        </mm-paragraph>
        <mm-button aria-controls="comment-sheet" aria-haspopup="dialog">댓글 시트 열기</mm-button>
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

      <mm-content-section heading-level="3" heading="Placement">
        <mm-paragraph>
          기준점의 어느 변에 붙을지(${code('bottom')})와 그 변의 어느 끝에
          맞출지(${code('start')})를 ${code('bottom-start')}처럼 한 값으로 정합니다.
        </mm-paragraph>
        <mm-code-block language="typescript" .code=${placementTypeCode}></mm-code-block>
        <mm-text-list
          variant="check"
          .texts=${[
            rule(
              html`
                위치는 ${code('placement')} 하나로 표현한다
              `,
              html`
                side와 alignment를 별도 prop으로 나누지 않고 ${code('bottom-start')}처럼 한 값에
                담는다. ${code('align')}은 정렬 의미에만 쓴다
              `,
            ),
            rule(
              html`
                alignment는 ${code('start')}·${code('end')}로 쓰고, 생략하면 가운데에 맞춘다
              `,
              html`
                ${code('left')}·${code('right')} 대신 논리 방향을 써서 쓰기 방향이 바뀌어도 같은
                값이 같은 의미를 갖는다. ${code('bottom')}은 트리거 가운데 아래에 놓인다
              `,
            ),
            rule(
              'placement는 선호 방향으로 두고, 자리가 없으면 반대 변으로 뒤집은 뒤 화면 안으로 밀어 넣는다',
              '트리거가 화면 가장자리에 있어도 표면이 화면 밖으로 나가지 않는다',
            ),
            rule(
              'anchored overlay는 트리거에 붙은 쪽에서 자라나고, viewport overlay는 붙은 변에서 밀려 들어온다',
              '열리는 움직임만으로 표면이 어디에서 왔는지 이어진다',
            ),
          ]}
        ></mm-text-list>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Dismiss">
        <mm-paragraph>
          닫기는 소비자가 아니라 표면이 소유합니다. 소비자마다 바깥 클릭과 ESC를 다시 구현하면 같은
          표면이 놓인 자리마다 다르게 닫힙니다.
        </mm-paragraph>
        <mm-paragraph>
          <mm-code>DisclosureController</mm-code>
          ·
          <mm-code>SheetController</mm-code>
        </mm-paragraph>
        <mm-text-list
          variant="check"
          .texts=${[
            rule(
              '트리거는 aria-controls로 표면을 가리키기만 한다',
              '트리거는 여는 표면의 종류만 선언하고, 클릭 토글과 aria-expanded 반영은 표면이 가져간다',
            ),
            rule(
              '닫기 조건은 그 조건을 아는 쪽이 소유한다',
              '표면이 스스로 알 수 있는 조건이면 표면이 쥐고, 작업이 끝났는지처럼 표면 밖에서만 아는 조건이면 내용이 close()를 부른다',
            ),
            rule(
              html`
                viewport 표면의 닫기 배선은 ${code('SheetController')} 하나가 맡는다
              `,
              html`
                backdrop 클릭과 ESC 처리를 ${code('SheetController')}가 소유하므로,
                ${code('DisclosureController')}에는 anchored 표면용 ${code('dismissOn')}을 넘기지
                않는다
              `,
            ),
            rule(
              '열림 상태는 표면의 reflected property로 둔다',
              '열림 상태는 공개 API이므로, 컨트롤러는 읽기·쓰기·알림만 위임받는다',
            ),
          ]}
        ></mm-text-list>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Portal">
        <mm-paragraph>
          z-index는 같은 쌓임 맥락 안에서만 비교되므로, 표면을 어디에 렌더하느냐가 숫자보다 먼저
          겹침을 결정합니다.
        </mm-paragraph>
        <mm-paragraph><mm-code>PortalController</mm-code></mm-paragraph>
        <mm-text-list
          variant="check"
          .texts=${[
            rule(
              'Viewport overlay는 index.html의 portal-root 컨테이너로 옮긴다',
              '조상의 transform·contain·쌓임 맥락에서 벗어나고, 셸이 렌더하는 노드와 분리된 한 컨테이너에 모인다',
            ),
            rule(
              '이동은 열림 상태가 아니라 연결 시점에 묶는다',
              '열리는 순간 이동이 겹치면 전환 시작 스타일이 커밋되지 않아 애니메이션이 재생되지 않는다',
            ),
            rule(
              'Anchored overlay는 portal 없이 트리거 옆에 띄운다',
              '좌표 계산 없이 트리거를 따라가고, 포커스 순서와 조상의 테마 맥락도 그대로 이어진다',
            ),
            rule(
              'z-index는 형제 요소와 실제로 겹치는 요소에만 준다',
              'position과 함께 준 z-index는 쌓임 맥락을 만들고, 그 안에서 열린 anchored overlay는 맥락 밖의 요소보다 위로 올라가지 못한다. 겹침이 없는 요소의 z-index는 이 제약만 남긴다',
            ),
          ]}
        ></mm-text-list>
        <mm-paragraph size="small">
          React로 옮길 때도 같은 기준을 따릅니다. React에서 popover portal은 흔하지만 주로 overflow
          잘림을 풀기 위한 선택이고, 대신 좌표 계산·포커스 관리·조상 맥락 단절을 떠안습니다. 구현에
          따라 같은 컴포넌트의 잘림 동작이 달라지지 않도록 anchored overlay는 portal 없이 두고,
          잘림이 실제 문제가 되면 두 구현을 함께 옮깁니다.
        </mm-paragraph>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="주의">
        <mm-text-list
          .texts=${[
            rule(
              '스크롤 컨테이너 안의 anchored overlay는 잘립니다',
              html`
                ${code('mm-sheet-body')}가 스크롤 영역을 만들기 때문에, 시트 안에 놓인 popover는
                화면에 자리가 남아 있어도 아래쪽이 잘려 닿지 않습니다. 아직 해결되지 않았습니다.
              `,
            ),
            rule(
              '메뉴 트리거는 스크롤 영역 바깥에 둡니다',
              '스크롤 영역 안의 항목은 누르면 다음 화면으로 넘어가게 합니다. 같은 이유로 overflow는 내용이 영역을 넘치는 곳에만 줍니다.',
            ),
            rule(
              'popover 항목 수는 화면에 담기는 선에서 정합니다',
              'popover 패널은 최대 높이가 없어 목록이 길어지는 만큼 계속 자라고, 그래서 안의 스크롤 영역도 작동하지 않습니다.',
            ),
            rule(
              '트리거 위치에 맞춰 popover를 여는 방향을 미리 정합니다',
              'popover는 방향을 스스로 뒤집지 않아, 트리거가 화면 가장자리에 가까우면 패널이 그대로 밖으로 나갑니다.',
            ),
            rule(
              '좁은 자리의 트리거는 패널이 덮을 범위를 함께 봅니다',
              'popover 패널은 240px보다 좁아지지 않아, 테이블 셀처럼 좁은 자리의 트리거에 붙이면 패널이 주변을 덮습니다.',
            ),
          ]}
        ></mm-text-list>
      </mm-content-section>
    </mm-content-section-list>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
