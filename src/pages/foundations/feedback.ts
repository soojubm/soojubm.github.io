import { html } from 'lit'

import { ICON_NAMES, STATUS_ICONS } from '@/components/common'
import '@/components/domains/component/component-pager'
import { rule } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

const componentRows = html`
  <tr>
    <th scope="row"><mm-link href="./notice.html">Notice</mm-link></th>
    <td>Status 톤 (Info·Success·Warning·Error)</td>
    <td>화면에 남아 안내하는 자리</td>
  </tr>
  <tr>
    <th scope="row"><mm-link href="./toast.html">Toast</mm-link></th>
    <td>행동의 결과</td>
    <td>놓쳐도 되는 결과를 잠깐 알리는 자리</td>
  </tr>
  <tr>
    <th scope="row"><mm-link href="./result.html">Result</mm-link></th>
    <td>완료·오류·빈 상태</td>
    <td>섹션·페이지 단위의 결과 화면</td>
  </tr>
  <tr>
    <th scope="row"><mm-link href="./loading.html">Loading</mm-link></th>
    <td>Pending / Fetching</td>
    <td>요소 안에서는 아이콘 크기로, 영역 안에서는 레이블과 함께</td>
  </tr>
`

const main = html`
  <mm-main>
    <mm-page-header
      heading="Feedback"
      description="사용자 행동이나 시스템 상태의 결과를 알립니다. 결과의 의미는 톤으로, 비동기 데이터의 진행은 단계로 나누어 정하므로, 사용자는 지금 무슨 일이 일어났고 다음에 무엇을 하면 되는지 알 수 있습니다."
    ></mm-page-header>

    <mm-content-section-list>
      <mm-notice>
        <mm-text size="14">
          입력값이 유효하지 않거나 요청이 진행 중인 상태처럼 요소 하나의 상태 표시는
          <mm-link href="./interaction.html">Interaction</mm-link>
          문서가 다룹니다.
        </mm-text>
      </mm-notice>

      <mm-content-section heading-level="3" heading="Overview">
        <mm-table
          .rows=${componentRows}
          caption="결과를 알리는 컴포넌트별 알리는 것과 쓰는 자리 비교"
          .columns=${[
            { label: '컴포넌트', width: '140px' },
            { label: '알리는 것' },
            { label: '쓰는 자리' },
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
    </mm-content-section-list>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
