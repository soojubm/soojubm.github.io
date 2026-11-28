import { html } from 'lit'

import { renderPage } from '@/components/layouts/base-layouts'

const main = html`
  <fff-main full-width>
    <fff-grid columns="2" gap="0">
      <fff-image src=""></fff-image>

      <fff-flex direction="column" gap="section" style="padding: var(--space-8)">
        <fff-text size="32">
          Contact To buy our products or to learn more about Sandy Shore, don’t hesitate to reach
          out. We’ll be happy to respond.
        </fff-text>
        <fff-meta-item-group
          layout="stacked"
          .items=${[
            { label: 'Phone', value: '519-875-3382' },
            {
              label: 'Address',
              value: '731 Lakeshore Road,Norfolk, ON, N0J 1T0',
            },
          ]}
        ></fff-meta-item-group>
      </fff-flex>
    </fff-grid>
  </fff-main>
`

renderPage(main, { closeSidebar: true })
