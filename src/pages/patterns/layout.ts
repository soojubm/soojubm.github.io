import { html } from 'lit'
import './layout.css'

import '@/components/domains/component/component-pager'
import '@/components/domains/component/copy-page-button'
import { renderPage } from '@/components/layouts/base-layouts'

const main = html`
  <mm-main>
    <mm-flex justify-content="between" align-items="start" gap="3">
      <mm-page-header
        heading="Layout"
        description="컨테이너 너비, 배경 대비, 표면 대비는 장식이 아니라 페이지의 성격과 작업 맥락을 담는 신호입니다. 사용자가 의식적으로 알아차리지는 못하지만, 일관되게 쓰면 맥락이 달라졌다는 미묘한 감각을 전달합니다."
      ></mm-page-header>
      <mm-copy-page-button></mm-copy-page-button>
    </mm-flex>

    <mm-content-section-list>
      <mm-content-section heading-level="3" heading="원칙">
        <mm-feature-group columns="3" column-max-width="400px">
          <mm-feature
            heading="너비로 읽기 밀도를 정한다"
            description="좁은 폭은 폼·인증처럼 한 가지 작업에 집중시키고, 넓은 폭은 목록·대시보드처럼 훑어보는 화면에 씁니다."
          ></mm-feature>
          <mm-feature
            heading="배경 대비로 맥락의 경계를 만든다"
            description="글쓰기·설정·소개처럼 이전 화면과 다른 정보 구조로 들어갈 때 페이지 배경을 한 단계 낮춰 다른 맥락으로 넘어왔다는 감각을 줍니다."
          ></mm-feature>
          <mm-feature
            heading="표면 대비로 작업 단위를 묶는다"
            description="폼·카드·편집 영역처럼 독립적으로 다루는 묶음은 표면으로 올려 주변 콘텐츠와 분리합니다. 명도 대비가 먼저 층위를 만들고, 그림자는 그 위에서 떠 있는 정도를 더합니다."
          ></mm-feature>
        </mm-feature-group>
        <mm-paragraph>
          이 문서는 페이지 바깥 골격을 정합니다. 그 안에서 자식을 배치하고 묶는 컨테이너의 단계와
          간격은
          <mm-link href="./container.html">Container</mm-link>
          가 다룹니다.
        </mm-paragraph>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="층위">
        <mm-paragraph>
          독립된 배경을 가진 표면만 떠오릅니다. 밝은 테마는 그림자로, 어두운 테마는 배경 대비로,
          반투명 테마는 blur로 같은 층위를 표현하므로, 표면은 그림자 값을 스스로 선언하지 않고 테마
          토큰을 참조합니다.
        </mm-paragraph>
        <mm-paragraph>
          화면에 고정된 내비게이션(chrome)이 콘텐츠(base)를 감싸고, 드롭다운·팝오버처럼 잠깐 뜨는
          표면(overlay)은 그 위로 겹칩니다. 전역 내비게이션은 페이지에 고정된 바보다 위에 남아야
          하므로 chrome-top을 씁니다. 같은 이름이 그림자 단계이자 겹침 순서이며, paint order 규칙은
          <mm-link href="./overlay.html">Overlay</mm-link>
          가 다룹니다.
        </mm-paragraph>
        <div class="app-shell">
          <mm-surface variant="outlined" density="compact" class="app-shell-topbar">
            <mm-caption>Top Bar · chrome</mm-caption>
          </mm-surface>
          <mm-surface variant="outlined" density="compact" class="app-shell-sidebar">
            <mm-caption>Sidebar · chrome-top</mm-caption>
          </mm-surface>
          <mm-surface variant="ghost" density="compact" class="app-shell-content">
            <mm-caption>Content · base</mm-caption>
            <mm-surface variant="elevated" density="compact" class="app-shell-overlay">
              <mm-caption>Overlay · toast</mm-caption>
            </mm-surface>
          </mm-surface>
          <mm-surface variant="outlined" density="compact" class="app-shell-bottombar">
            <mm-caption>Bottom Bar · chrome</mm-caption>
          </mm-surface>
        </div>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="컨테이너 너비">
        <mm-paragraph>
          너비는 콘텐츠 성격에 맞는 토큰으로 정하고, 본문 골격은
          <mm-code>mm-main</mm-code>
          의 width로, 떠오르는 표면은 각 컴포넌트의 width로 지정합니다.
        </mm-paragraph>
        <mm-flex direction="column" gap="2">
          <mm-surface variant="filled" style="max-width: var(--layout-width-narrow)">
            <mm-flex direction="column" gap="1">
              <mm-caption>집중형 · 폼, 인증</mm-caption>
              <mm-code>--layout-width-narrow · 400px</mm-code>
              <mm-link href="auth.html">Auth</mm-link>
            </mm-flex>
          </mm-surface>
          <mm-surface variant="filled" style="max-width: var(--layout-width-small)">
            <mm-flex direction="column" gap="1">
              <mm-caption>일반 문서 · 에디토리얼, 설정, 대화</mm-caption>
              <mm-code>--layout-width-small · 640px</mm-code>
              <mm-flex gap="3">
                <mm-link href="post.html">Post</mm-link>
                <mm-link href="setting.html">Setting</mm-link>
                <mm-link href="chat.html">Chat</mm-link>
              </mm-flex>
            </mm-flex>
          </mm-surface>
        </mm-flex>

        <mm-separator>떠오르는 표면</mm-separator>

        <mm-flex direction="column" gap="2">
          <mm-surface variant="filled" style="max-width: var(--layout-width-narrow)">
            <mm-flex direction="column" gap="1">
              <mm-caption>한 가지를 묻거나 알리는 표면 · dialog, tooltip</mm-caption>
              <mm-code>--layout-width-narrow · 400px</mm-code>
              <mm-flex gap="3">
                <mm-link href="dialog.html">Dialog</mm-link>
                <mm-link href="tooltip.html">Tooltip</mm-link>
              </mm-flex>
            </mm-flex>
          </mm-surface>
          <mm-surface variant="filled" style="max-width: var(--layout-width-small)">
            <mm-flex direction="column" gap="1">
              <mm-caption>시트 · placement와 무관하게 같은 폭, full-width가 제한을 푼다</mm-caption>
              <mm-code>--layout-width-small · 640px</mm-code>
              <mm-flex gap="3">
                <mm-link href="sheet.html">Sheet</mm-link>
                <mm-link href="profile.html">Profile</mm-link>
              </mm-flex>
            </mm-flex>
          </mm-surface>
        </mm-flex>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="주의">
        <mm-text-list
          .texts=${[
            '폭은 콘텐츠 성격으로 정하고 디바이스 크기로 고정하지 않습니다. 375px 같은 고정 폭이 아니라 최대 폭 토큰을 쓰고 나머지는 환경에 맡깁니다.',
            '한 화면에서 대비는 한 단계만 씁니다. 배경·표면·그림자를 동시에 여러 단계로 겹치면 위계가 무너집니다.',
            'hover에서 잠깐 떠오르는 --interaction-hover-lift는 상호작용 피드백이지 층위가 아닙니다. 정적인 층위와 섞어 쓰지 않습니다.',
            '레이블이 잘리면 말줄임표로 감추지 말고 문구를 다듬습니다. 엄격한 writing 가이드가 툴의 자동 축약보다 우선합니다.',
          ]}
        ></mm-text-list>
      </mm-content-section>
    </mm-content-section-list>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
