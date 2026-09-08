import { html } from 'lit'

import { renderLayout } from '@/components/layouts/base-layouts'

const main = html`
  <mm-page>
    <mm-page-header
      heading="Feedback"
      description="사용자 행동이나 시스템 상태의 결과를 알립니다. 사용자 귀책이 아닌 실패는 책임 소재를 문구에 드러냅니다."
    ></mm-page-header>

    <mm-content-section-list>
      <mm-content-section heading-level="3" heading="Status states">
        <mm-paragraph>
          결과의 의미를 톤으로 구분합니다. 색상만으로 전달하지 않고 톤, 명시적인 메시지, 영향을 받는
          필드나 영역, 그리고 접근 가능한 관계를 함께 제공해 사용자가 원인과 대상을 이해하게 합니다.
        </mm-paragraph>

        <mm-flex direction="column" gap="3">
          <mm-list-item
            icon="check-circle"
            size="small"
            label="Success"
            description="작업이 성공적으로 완료되었음을 나타냅니다."
          ></mm-list-item>
          <mm-list-item
            icon="info-circle"
            size="small"
            label="Info"
            description="사용자에게 참고 가능한 보조 정보를 제공합니다."
          ></mm-list-item>
          <mm-list-item
            icon="warning-triangle"
            size="small"
            label="Warning"
            description="진행 전에 사용자의 주의가 필요한 상태입니다."
          ></mm-list-item>
          <mm-list-item
            icon="xmark-circle"
            size="small"
            label="Error"
            description="오류, 실패, 수정이 필요한 상태를 나타냅니다."
          ></mm-list-item>
        </mm-flex>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Data/async states">
        <mm-paragraph>
          비동기 데이터 흐름이 지나는 단계입니다. 각 단계가 스켈레톤·스피너·에러 화면·빈 화면 중
          무엇을 노출할지 정합니다. 흐름의 실패는 알림 톤인 Status의 Error와 구분해 Rejected로
          부릅니다.
        </mm-paragraph>

        <mm-flex direction="column" gap="3">
          <mm-list-item
            icon="circle"
            size="small"
            label="Idle"
            description="아직 아무 요청도 하지 않은 대기·초기 상태입니다."
          ></mm-list-item>
          <mm-list-item
            icon="refresh"
            size="small"
            label="Pending / Fetching"
            description="데이터를 가져오는 중입니다. 스켈레톤이나 스피너를 노출합니다."
          ></mm-list-item>
          <mm-list-item
            icon="check-circle"
            size="small"
            label="Resolved / Success"
            description="데이터를 성공적으로 가져와 정상 UI를 노출합니다."
          ></mm-list-item>
          <mm-list-item
            icon="xmark-circle"
            size="small"
            label="Rejected / Failed"
            description="데이터를 가져오는 데 실패해 에러 화면을 노출합니다."
          ></mm-list-item>
          <mm-list-item
            icon="glass-empty"
            size="small"
            label="Empty"
            description="완료되었으나 데이터가 0건일 때 빈 화면을 노출합니다."
          ></mm-list-item>
        </mm-flex>
      </mm-content-section>
    </mm-content-section-list>
  </mm-page>
`

document.addEventListener('DOMContentLoaded', () => {
  renderLayout(main)
})
