import { html } from 'lit'

import { renderPage } from '@/components/layouts/base-layouts'

const main = html`
  <mm-main full-width>
    <mm-grid columns="2" gap="0">
      <mm-thumbnail src=""></mm-thumbnail>

      <mm-content-section-list style="padding: var(--space-8)">
        <mm-text size="32">
          Contact To buy our products or to learn more about Sandy Shore, don’t hesitate to reach
          out. We’ll be happy to respond.
        </mm-text>
        <mm-meta-item-group>
          <mm-meta-item layout="stacked" label="Phone" value="519-875-3382"></mm-meta-item>
          <mm-meta-item
            layout="stacked"
            label="Address"
            value="731 Lakeshore Road,Norfolk, ON, N0J 1T0"
          ></mm-meta-item>
        </mm-meta-item-group>
      </mm-content-section-list>
    </mm-grid>
  </mm-main>
`

renderPage(main, { closeSidebar: true })
