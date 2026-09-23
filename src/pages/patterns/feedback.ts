import { html } from 'lit'

import { ICON_NAMES } from '@/components/common'
import '@/components/domains/component/component-pager'
import '@/components/domains/component/copy-page-button'
import { renderPage } from '@/components/layouts/base-layouts'

const main = html`
  <mm-main>
    <mm-flex justify-content="between" align-items="start" gap="3">
      <mm-page-header
        heading="Feedback"
        description="사용자 행동이나 시스템 상태의 결과를 알립니다."
      ></mm-page-header>
      <mm-copy-page-button></mm-copy-page-button>
    </mm-flex>

    <mm-notice>
      <mm-text size="14">
        시스템 오류로 실패했다면 무엇이 잘못됐는지 문구로 명확히 설명합니다. 사용자는 입력을 고칠지,
        다시 시도하거나 기다리면 되는지 알 수 있습니다.
      </mm-text>
    </mm-notice>

    <mm-content-section-list>
      <mm-content-section heading-level="3" heading="Status states">
        <mm-paragraph>
          결과의 의미를 톤으로 구분합니다. 색상만으로 전달하지 않고 톤, 명시적인 메시지, 영향을 받는
          필드나 영역, 그리고 접근 가능한 관계를 함께 제공해 사용자가 원인과 대상을 이해하게 합니다.
        </mm-paragraph>

        <mm-list-item-group>
          <mm-list-item
            icon=${ICON_NAMES.SUCCESS}
            size="medium"
            label="Success"
            description="작업이 성공적으로 완료되었음을 나타냅니다."
          ></mm-list-item>
          <mm-list-item
            icon=${ICON_NAMES.INFO}
            size="medium"
            label="Info"
            description="사용자에게 참고 가능한 보조 정보를 제공합니다."
          ></mm-list-item>
          <mm-list-item
            icon=${ICON_NAMES.WARNING}
            size="medium"
            label="Warning"
            description="진행 전에 사용자의 주의가 필요한 상태입니다."
          ></mm-list-item>
          <mm-list-item
            icon=${ICON_NAMES.FAILURE}
            size="medium"
            label="Error"
            description="오류, 실패, 수정이 필요한 상태를 나타냅니다."
          ></mm-list-item>
        </mm-list-item-group>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Data/async states">
        <mm-paragraph>
          비동기 데이터 흐름이 지나는 단계입니다. 각 단계가 스켈레톤·스피너·에러 화면·빈 화면 중
          무엇을 노출할지 정합니다. 흐름의 실패는 알림 톤인 Status의 Error와 구분해 Rejected로
          부릅니다.
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
