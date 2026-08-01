import { html } from 'lit'

import { renderLayout } from '@/components/layouts/base-layouts'

interface FaqItem {
  question: string
  answer: string
}

const main = html`
  <mm-page full-width>
    <mm-flex wrap="wrap" gap="0">
      <div style="width:50%">
        <mm-thumbnail src=""></mm-thumbnail>
      </div>

      <div style="width:50%;padding:2rem;box-sizing:border-box;">
        <mm-text size="32">
          Contact To buy our products or to learn more about Sandy Shore, don’t hesitate to reach
          out. We’ll be happy to respond.
        </mm-text>
        <mm-flex gap="6" style="margin-top:4rem;">
          <mm-meta-item layout="stacked" label="Phone" value="519-875-3382"></mm-meta-item>
          <mm-meta-item
            layout="stacked"
            label="Address"
            value="731 Lakeshore Road,Norfolk, ON, N0J 1T0"
          ></mm-meta-item>
        </mm-flex>
      </div>
    </mm-flex>
  </mm-page>
`

document.addEventListener('DOMContentLoaded', () => {
  renderLayout(main, { closeSidebar: true })
})
