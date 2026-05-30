import navbar from '/src/components/navbar/navbar.html'
import footer from '/src/components/footer/footer.html'

import '/src/stylesheets/shared.css'

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
      display: none;
    }
    @media (min-width: 1280px) {
      mm-toc {
        display: block;
      }
    }
  </style>
`

export const renderDocumentLayout = (content: string, options: { footer?: boolean } = {}) => {
  return `
    ${navbar}
    ${layoutStyles}
    <div class="document-layout">
      ${content}
      <mm-toc></mm-toc>
    </div>
    <aside id="modal"></aside>
    ${options.footer ? footer : ''}
  `
}
