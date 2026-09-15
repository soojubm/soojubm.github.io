import '@/components/common'
import { html } from 'lit'

import { renderPage } from '@/components/layouts/base-layouts'

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
    <td>dialog</td>
    <td>sheet</td>
  </tr>
  <tr>
    <th scope="row"><mm-link href="./sheet.html">Bottom Sheet</mm-link></th>
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
    <td>sheet</td>
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

const main = html`
  <mm-page>
    <mm-page-header
      heading="Overlay"
      description="화면 위로 뜨는 표면은 시각적 형태가 아니라 행동 계약으로 구분합니다. 행동(modality·dismiss·reference)은 컨트롤러가 소유하고, 외형(surface·width·placement)은 각 컴포넌트가 조합합니다."
    ></mm-page-header>

    <mm-content-section-list>
      <mm-content-section heading-level="3" heading="Modal × Anchor">
        <mm-paragraph>
          배경 차단 여부(modal)와 위치 기준(anchor)이 표면의 종류를 가르고, 노출하는 role은 표면이
          감싸는 내용에서 나옵니다.
        </mm-paragraph>
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

      <mm-content-section heading-level="3" heading="Anchored overlay">
        <mm-text-list
          variant="check"
          .texts=${[
            '트리거에 앵커되어 뜨는 비모달 패널',
            '패널은 위치·크기·닫힘만 책임지고, role은 담는 내용에 따라 정해진다',
            '바깥 클릭과 ESC로 닫히며 포커스는 가두지 않는다',
            '트리거를 가리키는 화살표는 두지 않는다. 사용자가 포인터나 손가락으로 직접 연 표면이라 어디에서 나왔는지 이미 분명하며, 화살표는 로딩 시점에 스스로 떠서 대상을 지목하는 안내가 쓴다',
          ]}
        ></mm-text-list>
        <mm-flex direction="column" gap="3">
          <mm-list-item
            size="small"
            label="Menu"
            description="누르면 즉시 실행되거나 닫히는 행동 목록입니다."
          ></mm-list-item>
          <mm-list-item
            size="small"
            label="ListBox"
            description="고른 값을 유지하는 선택 목록입니다. 지금 무엇이 선택되어 있는지가 핵심입니다."
          ></mm-list-item>
        </mm-flex>
        <mm-keyword-tag-group
          heading="용례"
          .keywords=${['Dropdown', 'Tooltip', '사이드 패널', 'Select']}
        ></mm-keyword-tag-group>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Viewport overlay">
        <mm-text-list
          variant="check"
          .texts=${[
            'viewport를 기준으로 화면 중앙·가장자리에 뜨며 배경 상호작용을 차단한다',
            '표면이 dialog role과 aria-modal을 스스로 갖고, Backdrop이 뒤를 덮으며 포커스는 내부에 갇힌다',
            '닫기는 명시 버튼을 우선하고, 배경 클릭·ESC는 중요도가 낮은 작업에서만 허용한다',
          ]}
        ></mm-text-list>
        <mm-paragraph>
          <code>mm-sheet</code>
          ·
          <code>mm-dialog</code>
        </mm-paragraph>
        <mm-paragraph size="small">
          모달 표면은 얕게 유지합니다. 이미 떠 있는 모달 위에 또 모달을 여는 흐름은 피하고, 다음
          단계는 같은 표면을 교체하거나 흐름을 나눕니다.
        </mm-paragraph>
        <mm-keyword-tag-group
          heading="용례"
          .keywords=${['삭제 확인', '중요 정보 입력', '결제 흐름']}
        ></mm-keyword-tag-group>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Stacking">
        <mm-paragraph>
          겹침 순서는 숫자가 아니라 그룹 토큰으로 정하고, 같은 그룹 안에서만 비교합니다.
        </mm-paragraph>
        <mm-flex direction="column" gap="3">
          <mm-list-item
            size="small"
            label="base · elevated"
            description="문서·리스트·카드처럼 본문 안에서 쌓이는 요소."
          ></mm-list-item>
          <mm-list-item
            size="small"
            label="popover · sheet · chrome · toast"
            description="드롭다운, 시트, 고정 내비게이션, 알림처럼 화면 위로 뜨는 요소."
          ></mm-list-item>
        </mm-flex>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Portal">
        <mm-paragraph>
          z-index는 같은 쌓임 맥락 안에서만 비교되므로, 표면을 어디에 렌더하느냐가 숫자보다 먼저
          겹침을 결정합니다.
        </mm-paragraph>
        <mm-text-list
          variant="check"
          .texts=${[
            'Viewport overlay는 body로 옮겨 조상의 transform·contain·쌓임 맥락에 갇히지 않게 한다',
            '이동은 열림 상태가 아니라 연결 시점에 묶는다. 열리는 순간 이동이 겹치면 전환 시작 스타일이 커밋되지 않아 애니메이션이 재생되지 않는다',
            'Anchored overlay는 portal 없이 트리거 옆에 뜬다. 좌표 계산 없이 트리거를 따라가고, 포커스 순서와 조상의 테마 맥락도 그대로 이어진다',
            '쌓임 맥락은 그 안의 anchored overlay를 가두므로, 본문 요소는 필요 없는 z-index로 쌓임 맥락을 만들지 않는다',
          ]}
        ></mm-text-list>
        <mm-paragraph><code>PortalController</code></mm-paragraph>
        <mm-paragraph size="small">
          React로 옮길 때도 같은 기준을 따릅니다. React에서 popover portal은 흔하지만 주로 overflow
          잘림을 풀기 위한 선택이고, 대신 좌표 계산·포커스 관리·조상 맥락 단절을 떠안습니다. 구현에
          따라 같은 컴포넌트의 잘림 동작이 달라지지 않도록 anchored overlay는 portal 없이 두고,
          잘림이 실제 문제가 되면 두 구현을 함께 옮깁니다.
        </mm-paragraph>
      </mm-content-section>
    </mm-content-section-list>
  </mm-page>
`

renderPage(main)
