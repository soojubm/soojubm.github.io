import '@/components/common'
import { html } from 'lit'

import { renderPage } from '@/components/layouts/base-layouts'

import { collectionPanel } from './pattern/collection'
import { commercePanel } from './pattern/commerce'
import { conversationPanel } from './pattern/conversation'
import { disclosurePanel } from './pattern/disclosure'
import { searchPanel } from './pattern/search'

import './pattern.css'

const main = html`
  <fff-main>
    <fff-page-header
      heading="Pattern"
      description="여러 컴포넌트가 이어져 하나의 흐름을 이루는 방식을 정합니다. 같은 흐름은 같은 규칙으로 조립하므로, 사용자는 어느 화면에서든 같은 흐름을 경험합니다."
    ></fff-page-header>

    <fff-page-body>
      <fff-tab-list
        value="disclosure"
        variant="text"
        search-param="tab"
        .tabs=${[
          { value: 'disclosure', label: 'Disclosure' },
          { value: 'search', label: 'Search' },
          { value: 'collection', label: 'Collection' },
          { value: 'conversation', label: 'Conversation' },
          { value: 'commerce', label: 'Commerce' },
        ]}
      ></fff-tab-list>

      ${disclosurePanel} ${searchPanel} ${collectionPanel} ${conversationPanel} ${commercePanel}
    </fff-page-body>
  </fff-main>
`

renderPage(main)
