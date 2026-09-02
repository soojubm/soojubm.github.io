import { html } from 'lit'

import { renderDocumentLayout } from '@/components/layouts/document-layout'

const main = html`
  <main class="page">
    <mm-page-header
      heading="Elevation"
      description="표면이 배경에서 얼마나 떠 있는지를 그림자 단계로 나타냅니다. 카드·팝오버·툴팁 같은 표면에만 사용하고 일반 컨트롤에는 주지 않습니다."
    ></mm-page-header>
  </main>
`

document.addEventListener('DOMContentLoaded', () => {
  renderDocumentLayout(main)
})
