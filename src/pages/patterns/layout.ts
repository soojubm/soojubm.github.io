import { html } from 'lit'

import type { TemplateResult } from 'lit'
import './layout.css'

import '@/components/domains/component/component-pager'
import { renderPage } from '@/components/layouts/base-layouts'

// 앞뒤 공백이 문장 안 여백으로 렌더되지 않도록 한 줄로 둔다.
// prettier-ignore
const code = (name: string) => html`<mm-code>${name}</mm-code>`

// 목록 항목은 해야 할 일을 굵은 한 줄로 먼저 두고 설명을 잇는다.
const rule = (title: string | TemplateResult, description: string | TemplateResult) => html`
  <span>
    <mm-text weight="bold">${title}</mm-text>
    ${description}
  </span>
`

const main = html`
  <mm-main>
    <mm-page-header
      heading="Layout"
      description="컨테이너 너비, 배경 대비, 표면 대비는 장식이 아니라 페이지의 성격과 작업 맥락을 담는 신호입니다. 사용자가 의식적으로 알아차리지는 못하지만, 일관되게 쓰면 맥락이 달라졌다는 미묘한 감각을 전달합니다."
    ></mm-page-header>

    <mm-content-section-list>
      <mm-content-section heading-level="3" heading="Overview">
        <mm-feature-group columns="2" column-max-width="400px">
          <mm-feature
            heading="너비로 읽기 밀도를 정한다"
            description="좁은 폭은 폼·인증처럼 한 가지 작업에 집중시키고, 넓은 폭은 목록·대시보드처럼 훑어보는 화면에 씁니다."
          ></mm-feature>
          <mm-feature
            heading="배경 대비로 맥락의 경계를 만든다"
            description="글쓰기·설정·소개처럼 이전 화면과 다른 정보 구조로 들어갈 때 페이지 배경을 한 단계 낮춰 다른 맥락으로 넘어왔다는 감각을 줍니다."
          ></mm-feature>
        </mm-feature-group>
        <mm-notice>
          <mm-text size="14">
            이 문서는 페이지 바깥 골격을 정합니다. 그 안에서 자식을 배치하고 묶는 컨테이너의 단계와
            간격은
            <mm-link href="./container.html">Container</mm-link>
            가 다룹니다.
          </mm-text>
        </mm-notice>
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
              <mm-caption>집중형 · 폼, 인증, dialog, tooltip</mm-caption>
              <mm-code>--layout-width-narrow · 400px</mm-code>
              <mm-flex gap="3">
                <mm-link href="auth.html">Auth</mm-link>
                <mm-link href="dialog.html">Dialog</mm-link>
                <mm-link href="tooltip.html">Tooltip</mm-link>
              </mm-flex>
            </mm-flex>
          </mm-surface>
          <mm-surface variant="filled" style="max-width: var(--layout-width-small)">
            <mm-flex direction="column" gap="1">
              <mm-caption>일반 문서 · 에디토리얼, 설정, 대화, sheet</mm-caption>
              <mm-code>--layout-width-small · 640px</mm-code>
              <mm-flex gap="3">
                <mm-link href="post.html">Post</mm-link>
                <mm-link href="setting.html">Setting</mm-link>
                <mm-link href="chat.html">Chat</mm-link>
                <mm-link href="sheet.html">Sheet</mm-link>
                <mm-link href="profile.html">Profile</mm-link>
              </mm-flex>
            </mm-flex>
          </mm-surface>
        </mm-flex>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="층위">
        <mm-paragraph>
          층위는 특정 콘텐츠를 주변보다 앞으로 올려, 사용자의 시선이 그곳에 먼저 머물게 합니다.
          폼·카드·편집 영역처럼 독립적으로 다루는 묶음은 표면으로 올려 주변 콘텐츠와 분리합니다.
          명도 대비가 먼저 층위를 만들고, 그림자는 그 위에서 떠 있는 정도를 더합니다.
        </mm-paragraph>
        <mm-paragraph>
          화면에 고정된 내비게이션(chrome)이 콘텐츠(base)를 감싸고, 드롭다운·팝오버처럼 잠깐 뜨는
          표면(overlay)은 그 위로 겹칩니다. 전역 내비게이션은 페이지에 고정된 바보다 위에 남아야
          하므로 chrome-top을 씁니다. 같은 이름이 그림자 단계이자 겹침 순서이며, paint order 규칙은
          <mm-link href="./overlay.html">Overlay</mm-link>
          가 다룹니다.
        </mm-paragraph>
        <mm-text-list
          variant="check"
          .texts=${[
            rule(
              '한 화면에서 대비는 한 단계만 쓴다',
              '배경·표면·그림자를 동시에 여러 단계로 겹치면 위계가 무너진다',
            ),
            rule(
              '정적인 층위와 hover 피드백을 구분한다',
              html`
                hover에서 잠깐 떠오르는 ${code('--interaction-hover-lift')}는 상호작용 피드백이며
                층위가 아니다
              `,
            ),
          ]}
        ></mm-text-list>
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
    </mm-content-section-list>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
