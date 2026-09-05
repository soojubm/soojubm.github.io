import '@/components/common/table'
import '@/components/common/link/link'
import { html } from 'lit'

import { renderDocumentLayout } from '@/components/layouts/document-layout'

const main = html`
  <main class="page">
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
          id="overlay-classification-table"
          caption="화면 위로 뜨는 표면의 modal 여부·위치 기준·노출 role·레이어 비교"
          columns='[
            {"label": "UI"},
            {"label": "Modal"},
            {"label": "Anchor"},
            {"label": "Role"},
            {"label": "z-index"}
          ]'
        ></mm-table>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Anchored overlay">
        <mm-text-list
          variant="check"
          texts='[
            "트리거에 앵커되어 뜨는 비모달 패널",
            "패널은 위치·크기·닫힘만 책임지고, role은 담는 내용에 따라 정해진다",
            "바깥 클릭과 ESC로 닫히며 포커스는 가두지 않는다"
          ]'
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
          keywords='["Dropdown", "Tooltip", "사이드 패널", "Select"]'
        ></mm-keyword-tag-group>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Viewport overlay">
        <mm-text-list
          variant="check"
          texts='[
            "viewport를 기준으로 화면 중앙·가장자리에 뜨며 배경 상호작용을 차단한다",
            "표면이 dialog role과 aria-modal을 스스로 갖고, Backdrop이 뒤를 덮으며 포커스는 내부에 갇힌다",
            "닫기는 명시 버튼을 우선하고, 배경 클릭·ESC는 중요도가 낮은 작업에서만 허용한다"
          ]'
        ></mm-text-list>
        <mm-paragraph>구현: mm-sheet, mm-dialog.</mm-paragraph>
        <mm-keyword-tag-group
          heading="용례"
          keywords='["삭제 확인", "중요 정보 입력", "결제 흐름"]'
        ></mm-keyword-tag-group>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Stacking">
        <mm-paragraph>
          겹침 순서는 숫자가 아니라 그룹 토큰으로 정하고, 같은 그룹 안에서만 비교합니다.
        </mm-paragraph>
        <mm-flex direction="column" gap="3">
          <mm-list-item
            size="small"
            label="base · raised"
            description="문서·리스트·카드처럼 본문 안에서 쌓이는 요소."
          ></mm-list-item>
          <mm-list-item
            size="small"
            label="overlay · modal · chrome · toast"
            description="드롭다운, 시트, 고정 내비게이션, 알림처럼 화면 위로 뜨는 요소."
          ></mm-list-item>
        </mm-flex>
        <mm-paragraph>
          여기서 정하는 건 paint order뿐입니다. 표면이 떠 보이게 하는 그림자·대비는
          <mm-link href="./elevation.html">Elevation</mm-link>
          이, chrome 레이어를 쓰는 고정 내비게이션은
          <mm-link href="./layout.html">Layout</mm-link>
          이 다룹니다.
        </mm-paragraph>
      </mm-content-section>
    </mm-content-section-list>
  </main>
`

document.addEventListener('DOMContentLoaded', () => {
  renderDocumentLayout(main)
  setupClassificationTable()
})

function setupClassificationTable() {
  const table = document.querySelector<HTMLElementTagNameMap['mm-table']>(
    'mm-table#overlay-classification-table',
  )
  if (!table) return

  const yes = html`
    <span role="img" aria-label="예">✅</span>
  `
  const no = html`
    <span role="img" aria-label="아니오">❌</span>
  `

  table.rows = html`
    <tr>
      <th scope="row"><mm-link href="./dialog.html">Dialog</mm-link></th>
      <td>${yes}</td>
      <td>Viewport</td>
      <td>dialog</td>
      <td>modal</td>
    </tr>
    <tr>
      <th scope="row"><mm-link href="./sheet.html">Bottom Sheet</mm-link></th>
      <td>${yes}</td>
      <td>Viewport</td>
      <td>dialog</td>
      <td>modal</td>
    </tr>
    <tr>
      <th scope="row">Backdrop</th>
      <td>${yes}</td>
      <td>Viewport</td>
      <td>없음</td>
      <td>modal</td>
    </tr>
    <tr>
      <th scope="row"><mm-link href="./popover.html">Popover</mm-link></th>
      <td>${no}</td>
      <td>Trigger</td>
      <td>없음</td>
      <td>overlay</td>
    </tr>
    <tr>
      <th scope="row">Select</th>
      <td>${no}</td>
      <td>Trigger</td>
      <td>listbox</td>
      <td>overlay</td>
    </tr>
    <tr>
      <th scope="row"><mm-link href="./tooltip.html">Tooltip</mm-link></th>
      <td>${no}</td>
      <td>Trigger</td>
      <td>tooltip</td>
      <td>overlay</td>
    </tr>
    <tr>
      <th scope="row">Toast</th>
      <td>${no}</td>
      <td>Viewport</td>
      <td>status</td>
      <td>toast</td>
    </tr>
  `
}
