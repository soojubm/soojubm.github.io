import { html } from 'lit'

import { renderDocumentLayout } from '@/components/layouts/document-layout'

const main = html`
  <main class="page">
    <mm-page-header
      heading="Motion"
      description="전환의 지속 시간과 이징을 토큰으로 통일해 화면 전체의 움직임이 같은 리듬을 갖게 합니다."
    ></mm-page-header>
  </main>
`

document.addEventListener('DOMContentLoaded', () => {
  renderDocumentLayout(main)
})
