import { html } from 'lit'
import { renderDocumentLayout } from '../../../layouts/document-layout'

const main = html`
  <main class="page">
    <mm-page-header
      heading="Top Bar"
      description="화면 상단에서 현재 위치와 주요 내비게이션 액션을 제공합니다."
    ></mm-page-header>

    <mm-component-example>
      <mm-top-bar nav="close" heading="상세 정보"></mm-top-bar>
      <mm-text>기본 뒤로가기 내비게이션을 포함한 상단 바입니다.</mm-text>
      <mm-separator></mm-separator>
      <mm-top-bar heading="컬렉션에 추가">
        <mm-button slot="action" variant="ghost">완료</mm-button>
      </mm-top-bar>
      <mm-text>
        닫기 액션과 보조 액션을 함께 배치할 수 있습니다. 액션 갯수 제한. md에서 최대 3개. hamberger
        case.
      </mm-text>
      <mm-separator></mm-separator>
      <mm-top-bar heading="수줍이님">
        <mm-button-group slot="action">
          <mm-button>저장</mm-button>
          <mm-more-button></mm-more-button>
        </mm-button-group>
      </mm-top-bar>
      <mm-text>닫기 액션과 보조 액션을 함께 배치할 수 있습니다.</mm-text>
    </mm-component-example>

    <mm-component-props>
      <mm-prop name="heading" type="string"></mm-prop>
      <mm-prop name="nav" type="'back' | 'close' | '' = 'back'" optional></mm-prop>
      <mm-prop name="slot='action'" type="HTMLElement" optional></mm-prop>
    </mm-component-props>

    <mm-component-tokens>
      <mm-token name="top-bar-height" default="3.5rem"></mm-token>
    </mm-component-tokens>

    <mm-component-guide>
      <mm-component-feature-list>
        <mm-feature
          heading="Persistent"
          description="스크롤과 화면 이동에도 상단에 자리를 지켜 제목과 내비게이션에 항상 접근할 수 있습니다."
        ></mm-feature>
      </mm-component-feature-list>
    </mm-component-guide>
    <mm-component-related>
      <mm-button-group>
        <mm-hashtag-link href="bottom-bar.html">Bottom Bar</mm-hashtag-link>
        <mm-hashtag-link href="tabs.html">Tabs</mm-hashtag-link>
      </mm-button-group>
    </mm-component-related>
  </main>
`

document.addEventListener('DOMContentLoaded', () => {
  renderDocumentLayout(main)
})
