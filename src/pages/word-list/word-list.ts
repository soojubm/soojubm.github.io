import { html, type TemplateResult } from 'lit'

import { rule } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

interface Word {
  term: string
  definition: string
}

const words: Word[] = [
  {
    term: 'Anchored',
    definition:
      '트리거에 붙어 있는 상태입니다. 트리거 옆에 붙어 열리는 overlay는 사용자가 어디서 열렸는지 바로 압니다.',
  },
  {
    term: 'Backdrop',
    definition:
      'modal 뒤의 화면을 흐리게 덮는 막입니다. 뒤 화면을 조작할 수 없다는 것을 보여 줍니다.',
  },
  {
    term: 'Modal',
    definition:
      '열린 동안 뒤의 화면을 조작할 수 없게 막는 overlay입니다. 작업을 마치거나 취소해야 다음으로 넘어가는 흐름에 씁니다.',
  },
  {
    term: 'Non-modal',
    definition: '뒤의 화면을 막지 않는 overlay입니다. 바깥을 누르거나 Tab으로 벗어나면 닫힙니다.',
  },
  {
    term: 'Overlay',
    definition: '다른 내용 위로 떠서 화면의 일부를 가리는 표면입니다.',
  },
  {
    term: 'Trigger',
    definition:
      '누르면 다른 요소를 열거나 전환하는 요소입니다. overlay를 여는 버튼, 탭을 바꾸는 탭 버튼, 항목을 펼치는 헤더가 해당합니다.',
  },
  {
    term: 'Viewport',
    definition:
      '사용자가 지금 보고 있는 화면 영역입니다. 트리거와 상관없이 이 영역 전체를 기준으로 열리는 overlay는 화면을 덮어 사용자가 한 가지에 집중하게 합니다.',
  },
]

const criteria = [
  rule(
    '디자이너와 개발자가 다르게 부르거나 다르게 이해하는 말을 올린다',
    '같은 대상을 서로 다른 이름으로 부르면 요청과 구현이 어긋나, 확인하고 고치는 왕복이 늘어난다',
  ),
  rule(
    '둘 이상의 페이지에서 쓰는 말을 올린다',
    '한 페이지에서만 쓰는 말은 그 페이지에서 설명한다. 여러 곳에 흩어진 설명이 서로 달라지는 것을 막는다',
  ),
  rule(
    '용어마다 뜻과 표기를 하나로 정한다',
    '표기가 둘이면 같은 말인지 다른 말인지 알 수 없어 서로 다른 대상으로 오해한다. 정한 표기만 문서와 코드에서 함께 쓴다',
  ),
]

const renderWord = ({ term, definition }: Word): TemplateResult => html`
  <mm-flex direction="column" align-items="flex-start" gap="2">
    <mm-code-tag size="large">${term}</mm-code-tag>
    <mm-text size="14">${definition}</mm-text>
  </mm-flex>
`

// 임시: 홈에서 빼낸 Component Feature 태그를 자리를 정할 때까지 이 페이지 하단에 둔다.
// Interaction은 blue, Presentation은 purple 톤으로 묶음을 구분한다.
const componentFeatures: { tone: 'blue' | 'purple'; name: string }[] = [
  { tone: 'blue', name: 'Interactive - action' },
  { tone: 'blue', name: 'Interactive - selection' },
  { tone: 'blue', name: 'Interactive - input' },
  { tone: 'blue', name: 'Feedback' },
  { tone: 'purple', name: 'Glanceable' },
  { tone: 'purple', name: 'Representative' },
  { tone: 'purple', name: 'Stateful' },
  { tone: 'purple', name: 'Structural' },
  { tone: 'purple', name: 'Contextual' },
]

const main = html`
  <mm-main>
    <mm-page-header
      heading="Word list"
      description="문서 전반에서 쓰는 용어의 뜻을 한곳에 모읍니다. 같은 용어를 같은 뜻과 표기로 쓰므로, 읽는 사람이 페이지마다 설명을 맞춰 볼 필요 없이 바로 이해합니다."
    ></mm-page-header>

    <mm-page-body>
      <mm-content-section heading-level="3" heading="등재 기준">
        <mm-text-list variant="check" .texts=${criteria}></mm-text-list>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="용어">
        <mm-flex direction="column" gap="6">${words.map(renderWord)}</mm-flex>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Component Feature">
        <mm-tag-group>
          ${componentFeatures.map(
            ({ tone, name }) => html`
              <mm-code-tag tone=${tone} size="large">${name}</mm-code-tag>
            `,
          )}
        </mm-tag-group>
      </mm-content-section>
    </mm-page-body>
  </mm-main>
`

renderPage(main)
