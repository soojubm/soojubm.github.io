import { html } from 'lit'

import { renderDocumentLayout } from '@/components/layouts/document-layout'

const main = html`
  <main class="page">
    <mm-page-header
      heading="Motion"
      description="전환의 지속 시간과 이징을 토큰으로 통일해 화면 전체의 움직임이 같은 리듬을 갖게 합니다."
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
