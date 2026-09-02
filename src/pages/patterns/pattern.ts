import { html } from 'lit'

import { renderDocumentLayout } from '@/components/layouts/document-layout'

const main = html`
  <main class="page">
    <mm-page-header
      heading="Patterns"
      description="패턴은 여러 컴포넌트를 조합해 반복되는 사용자 문제를 해결하는 재사용 가능한 상호작용 단위입니다."
    ></mm-page-header>
  </main>
`

document.addEventListener('DOMContentLoaded', () => {
  renderDocumentLayout(main)
})
