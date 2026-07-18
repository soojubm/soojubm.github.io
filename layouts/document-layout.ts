import '../src/components/navbar/navbar'
import '../src/components/footer/footer'
import './fixed-bottom'

import '../src/stylesheets/shared.css'

export const renderDocumentLayout = (content: string, options: { footer?: boolean } = {}) => {
  return `
    <mm-navbar></mm-navbar>
    ${content}
    ${options.footer ? '<mm-footer></mm-footer>' : ''}
  `
}
