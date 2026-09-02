import { html } from 'lit'

import { renderDocumentLayout } from '@/components/layouts/document-layout'

const main = html`
  <main class="page">
    <mm-page-header
      heading="Content"
      description="같은 텍스트 슬롯이라도 관점에 따라 이름과 어조를 구분하고, 사용자가 빠르게 스캔할 수 있도록 씁니다."
    ></mm-page-header>

    <mm-content-section-list>
      <mm-content-section heading="Easy scanning">
        <mm-paragraph>
          사용자는 설명을 정독하지 않습니다. 텍스트를 짧게 유지하고 스캔 가능한 덩어리로 나눕니다.
          간결한 문구는 사용자가 서비스를 이해하고 다룰 수 있다는 신뢰를 만듭니다.
        </mm-paragraph>
      </mm-content-section>

      <mm-content-section heading="Message / Description">
        <mm-paragraph>
          message는 사용자의 관점에서, description은 시스템을 주어로 서술합니다. 다이얼로그의 상태
          메시지는 message("확인 후 진행해주세요"), 컴포넌트 문서의 설명은 description("이
          컴포넌트는 ~를 수행합니다")으로 씁니다.
        </mm-paragraph>
      </mm-content-section>

      <mm-content-section heading="Interaction Label">
        <mm-paragraph>
          동사가 포함된 짧은 한글 레이블을 사용자 시점으로 씁니다(예: 보내기 → 받기). 레이블은 줄여
          표시하지 않습니다.
        </mm-paragraph>
      </mm-content-section>

      <mm-content-section heading="주목이 필요한 콘텐츠">
        <mm-paragraph>
          상태 변화, 결과, 맥락 전환을 전달할 때는 콘텐츠 모듈을 가운데 정렬해 사용자의 주의를
          환기합니다.
        </mm-paragraph>
        <mm-keyword-tag-group
          keywords='["Result component", "Empty state", "Success message"]'
        ></mm-keyword-tag-group>
      </mm-content-section>
    </mm-content-section-list>
  </main>
`

document.addEventListener('DOMContentLoaded', () => {
  renderDocumentLayout(main)
})
