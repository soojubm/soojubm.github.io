import { html } from 'lit'

import { renderDocumentLayout } from '@/components/layouts/document-layout'

const main = html`
  <main class="page">
    <mm-page-header
      heading="Elevation"
      description="표면이 배경에서 얼마나 떠 있는지를 그림자 단계로 나타냅니다. 카드·팝오버·툴팁 같은 표면에만 사용하고 일반 컨트롤에는 주지 않습니다."
    ></mm-page-header>

    <mm-result
      avatar-icon="design-pencil"
      heading="준비 중입니다"
      description="이 문서는 아직 작성 중이에요. 곧 내용을 채울게요."
    ></mm-result>
  </main>
`

document.addEventListener('DOMContentLoaded', () => {
  renderDocumentLayout(main)
})
