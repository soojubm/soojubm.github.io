import '../src/components/navbar/navbar'
import '../src/components/footer/footer'

import '../src/stylesheets/shared.css'

const layoutStyles = `
  <style>
    .document-layout {
      display: flex;
      align-items: flex-start;
    }
    .document-layout > main {
      flex: 1;
      min-width: 0;
    }
    mm-toc {
    }
      /*
    @media (min-width: 1280px) {
      mm-toc {
        display: block;
      }
    }
      */
  </style>
`

export const renderDocumentLayout = (content: string, options: { footer?: boolean } = {}) => {
  return `
    <mm-navbar></mm-navbar>
    ${layoutStyles}
    <div class="document-layout">
      ${content}
      <mm-toc></mm-toc>
    </div>
    <aside id="modal"></aside>
    ${options.footer ? '<mm-footer></mm-footer>' : ''}
  `
}
