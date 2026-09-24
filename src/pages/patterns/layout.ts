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

    <mm-notice>
      <mm-text size="14">
        이 문서는 페이지 바깥 골격과 텍스트 줄 위에 놓이는 inline 요소의 정렬을 정합니다. 그 안에서
        자식을 배치하고 묶는 컨테이너의 단계와 간격은
        <mm-link href="./container.html">Container</mm-link>
        가 다룹니다.
      </mm-text>
    </mm-notice>

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

      <mm-content-section heading-level="3" heading="줄 안 정렬">
        <mm-paragraph>
          일반 블록이나 본문 안의 inline 요소는 텍스트 줄의 baseline에 맞춰 놓이고, inline-flex
          요소의 baseline은 첫 자식에서 정해집니다. 첫 자식이 글자 없는 아이콘이면 baseline이 박스
          바닥으로 내려가, 같은 높이의 요소라도 줄 안에서 떠오르고 줄 높이가 늘어납니다.
        </mm-paragraph>
        <mm-text-list
          variant="check"
          .texts=${[
            rule(
              html`
                배경·테두리로 박스를 이루는 inline 컴포넌트는 ${code('vertical-align: middle')}을
                둔다
              `,
              '태그·아바타처럼 본문 줄에 들어갈 수 있는 박스는 내부 구성과 무관하게 자기 중앙으로 줄에 놓인다',
            ),
            rule(
              '본문 글자처럼 읽히는 inline 요소는 baseline을 유지한다',
              '링크처럼 주변 글자와 같은 선에 서야 하는 요소는 아이콘 크기를 1em에 맞추는 식으로 아이콘 쪽에서 맞춘다',
            ),
            rule(
              html`
                flex·grid 항목의 정렬은 부모의 ${code('align-items')}가 맡는다
              `,
              html`
                ${code('vertical-align')}은 inline 요소에만 적용되고 ${code('align-items')}는 자식만
                정렬한다. 높이가 고정된 컨테이너는 부모를 flex로 두고 가운데 정렬하며, 컴포넌트는
                부모 레이아웃을 바꿀 수 없으므로 자기 위치는 ${code('vertical-align')}으로 정한다
              `,
            ),
          ]}
        ></mm-text-list>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="주의">
        <mm-text-list
          variant="check"
          .texts=${[
            rule(
              '폭은 콘텐츠 성격에 맞는 최대 폭 토큰으로 정한다',
              '375px처럼 디바이스 크기로 고정하지 않고, 최대 폭 안의 나머지는 환경에 맡긴다',
            ),
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
            rule(
              '레이블이 잘리면 문구를 다듬는다',
              '말줄임표로 감추는 툴의 자동 축약보다 엄격한 writing 가이드가 우선한다',
            ),
          ]}
        ></mm-text-list>
      </mm-content-section>
    </mm-content-section-list>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
