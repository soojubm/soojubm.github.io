import { html } from 'lit'

import { renderLayout } from '@/components/layouts/base-layouts'

const main = html`
  <mm-page>
    <mm-page-header
      heading="Content"
      description="같은 텍스트 슬롯이라도 관점에 따라 이름과 어조를 구분하고, 사용자가 빠르게 스캔할 수 있도록 씁니다."
    ></mm-page-header>

    <mm-content-section-list>
      <mm-content-section heading-level="3" heading="원칙">
        <mm-content-section heading-level="4" heading="Easy scanning">
          <mm-paragraph>
            사용자는 설명을 정독하지 않습니다. 텍스트를 짧게 유지하고 스캔 가능한 덩어리로 나눕니다.
            간결한 문구는 사용자가 서비스를 이해하고 다룰 수 있다는 신뢰를 만듭니다.
          </mm-paragraph>
          <mm-paragraph>
            분류·속성·키워드처럼 나열되는 값은 문장으로 풀지 않고 tag로 끊어 보여, 훑는 것만으로
            구분되게 합니다.
          </mm-paragraph>
        </mm-content-section>

        <mm-content-section heading-level="4" heading="관점에 맞는 이름">
          <mm-paragraph>
            슬롯의 화자가 사용자인지 시스템인지에 따라 이름과 어조를 맞춥니다. 실행 레이블은 사용자
            시점의 동사로 쓰고 줄여 표시하지 않습니다.
          </mm-paragraph>
        </mm-content-section>

        <mm-content-section heading-level="4" heading="주목이 필요한 콘텐츠">
          <mm-paragraph>
            상태 변화, 결과, 맥락 전환을 전달할 때는 콘텐츠 모듈을 가운데 정렬해 사용자의 주의를
            환기합니다.
          </mm-paragraph>
          <mm-keyword-tag-group
            keywords='["Result component", "Empty state", "Success message"]'
          ></mm-keyword-tag-group>
        </mm-content-section>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="용어">
        <mm-content-section heading-level="4" heading="Message">
          <mm-paragraph>
            사용자의 관점에서 다음에 할 일을 알려주는 문구입니다. 예: "확인 후 진행해주세요".
          </mm-paragraph>
        </mm-content-section>

        <mm-content-section heading-level="4" heading="Description">
          <mm-paragraph>
            시스템을 주어로 대상이 무엇을 하는지 서술하는 설명입니다. 예: "이 컴포넌트는 ~를
            수행합니다".
          </mm-paragraph>
        </mm-content-section>

        <mm-content-section heading-level="4" heading="Interaction Label">
          <mm-paragraph>동작을 가리키는 짧은 한글 레이블입니다. 예: 보내기 → 받기.</mm-paragraph>
        </mm-content-section>
      </mm-content-section>
    </mm-content-section-list>
  </mm-page>
`

document.addEventListener('DOMContentLoaded', () => {
  renderLayout(main)
})
