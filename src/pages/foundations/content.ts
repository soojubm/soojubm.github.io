import { html } from 'lit'

import '@/components/domains/component/component-pager'
import { code } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

const main = html`
  <mm-main>
    <mm-page-header
      heading="Content"
      description="텍스트 슬롯은 관점에 따라 이름과 어조를 나눕니다. 문구를 짧게 끊어 쓰므로 사용자는 설명을 정독하지 않고도 빠르게 훑어 뜻을 파악할 수 있습니다."
    ></mm-page-header>

    <mm-content-section-list>
      <mm-notice>
        <mm-text size="14">
          텍스트와 함께 뜻을 전달하는 아이콘은
          <mm-link href="./iconography.html">Iconography</mm-link>
          문서가 다룹니다.
        </mm-text>
      </mm-notice>

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
          <mm-paragraph>
            레이블이 잘리면 말줄임표로 감추지 않고 문구를 다듬습니다. 툴의 자동 축약보다 writing
            가이드가 우선합니다.
          </mm-paragraph>
        </mm-content-section>

        <mm-content-section heading-level="4" heading="작은 화면의 행갈이">
          <mm-paragraph>
            태그라인은 작은 화면에서도 임팩트를 줄 수 있도록 작성 단계에서 행갈이를 고려하세요. 글자
            또는 단어의 수를 제한하고 개행 조건을 정의하세요.
          </mm-paragraph>
          <mm-component-notice heading="제목 자르기를 허용할지 정한다">
            레이블은 줄여 표시하지 않는 원칙이지만, 폴더블·워치처럼 화면이 점점 작아질 때 제목만은
            잘라도 되는지 정하지 않았다
          </mm-component-notice>
        </mm-content-section>

        <mm-content-section heading-level="4" heading="주목이 필요한 콘텐츠">
          <mm-paragraph>
            상태 변화, 결과, 맥락 전환을 전달할 때는 콘텐츠 모듈을 가운데 정렬해 사용자의 주의를
            환기합니다.
          </mm-paragraph>
          <mm-keyword-tag-group
            .keywords=${['Result component', 'Empty state', 'Success message']}
          ></mm-keyword-tag-group>
        </mm-content-section>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="용어">
        <mm-content-section heading-level="4" heading="텍스트 단위">
          <mm-paragraph>단어(word) → 구(phrase) → 문장(sentence) → 문단(paragraph)</mm-paragraph>
        </mm-content-section>

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

        <mm-content-section heading-level="4" heading="Label">
          <mm-paragraph>
            대상을 가리키는 이름입니다. 대상이 이미 갖고 있는 이름을 그대로 쓰고, 부연은
            description으로 나눕니다. 화면에서 몇 번째 줄인지가 아니라 무엇을 가리키는지로 이름
            짓습니다. 예: 목록 행의 사람 이름, 설정 항목의 이름.
          </mm-paragraph>
          <mm-paragraph>
            단락을 여는 제목은 heading, 글이나 작품이 스스로 갖는 제목은 title로 구분합니다.
          </mm-paragraph>
          <mm-paragraph>
            같은 낱말을 form과 ARIA도 씁니다. form의 ${code('label')}은 입력 컨트롤과 연결되어, 값이
            비어 있을 때도 무엇을 넣는 자리인지 말하고 누르면 컨트롤로 포커스를 넘깁니다. 보이는
            이름이 없는 컨트롤에만 ${code('aria-label')}을 주며, 보이는 이름이 있는 자리에 함께 두면
            보조기술과 음성 제어가 읽는 이름이 화면에 보이는 글자와 달라집니다.
          </mm-paragraph>
        </mm-content-section>

        <mm-content-section heading-level="4" heading="Interaction Label">
          <mm-paragraph>동작을 가리키는 짧은 한글 레이블입니다. 예: 보내기 → 받기.</mm-paragraph>
        </mm-content-section>
      </mm-content-section>
    </mm-content-section-list>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
