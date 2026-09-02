import { html } from 'lit'

import { renderDocumentLayout } from '@/components/layouts/document-layout'

const main = html`
  <main class="page">
    <mm-page-header
      heading="Layout"
      description="컨테이너 너비, 배경 대비, 표면 대비는 장식이 아니라 페이지의 성격과 작업 맥락을 담는 신호입니다. 사용자가 의식적으로 알아차리지는 못하지만, 일관되게 쓰면 맥락이 달라졌다는 미묘한 감각을 전달합니다."
    ></mm-page-header>

    <mm-content-section-list>
      <mm-content-section>
        <mm-feature-group columns="3" column-max-width="400px">
          <mm-feature
            heading="너비로 읽기 밀도를 정한다"
            description="좁은 폭은 폼·인증·설정처럼 한 가지 작업에 집중시키고, 넓은 폭은 목록·대시보드처럼 훑어보는 화면에 씁니다. 폭은 콘텐츠 성격으로 정하고 디바이스 크기로 고정하지 않습니다."
          ></mm-feature>
          <mm-feature
            heading="배경 대비로 맥락의 경계를 만든다"
            description="글쓰기·설정·소개처럼 이전 화면과 다른 정보 구조로 들어갈 때 페이지 배경을 한 단계 낮춰 다른 맥락으로 넘어왔다는 감각을 줍니다."
          ></mm-feature>
          <mm-feature
            heading="표면 대비로 작업 단위를 묶는다"
            description="폼·카드·편집 영역처럼 독립적으로 다루는 묶음은 표면으로 올려 주변 콘텐츠와 분리합니다."
          ></mm-feature>
        </mm-feature-group>
      </mm-content-section>

      <mm-content-section heading="컨테이너 너비">
        <mm-paragraph>
          너비는 토큰으로 정하고, 페이지 골격은 mm-page의 width로 지정합니다.
        </mm-paragraph>
        <mm-flex direction="column" gap="2">
          <mm-surface variant="filled" style="max-width: var(--layout-width-narrow)">
            <mm-caption>집중형 · 폼, 인증, 설정</mm-caption>
            <code>--layout-width-narrow · 400px</code>
          </mm-surface>
          <mm-surface variant="filled" style="max-width: var(--layout-width-small)">
            <mm-caption>일반 문서 · 에디토리얼</mm-caption>
            <code>--layout-width-small · 640px</code>
          </mm-surface>
          <mm-surface variant="filled" style="max-width: var(--layout-width-wide)">
            <mm-caption>탐색·관리형 · 목록, 대시보드</mm-caption>
            <code>--layout-width-wide · 1280px</code>
          </mm-surface>
        </mm-flex>
      </mm-content-section>

      <mm-content-section heading="주의">
        <mm-text-list
          texts='[
            "화면 크기를 고정하지 않습니다. 375px 같은 고정 폭이 아니라 콘텐츠 성격에 맞는 최대 폭 토큰을 쓰고 나머지는 환경에 맡깁니다.",
            "한 페이지에서 대비는 한 단계만 씁니다. 배경·표면·컨테이너를 동시에 여러 단계로 겹치면 위계가 무너집니다.",
            "레이블이 잘리면 말줄임표로 감추지 말고 문구를 다듬습니다. 엄격한 writing 가이드가 툴의 자동 축약보다 우선합니다."
          ]'
        ></mm-text-list>
      </mm-content-section>
    </mm-content-section-list>
  </main>
`

document.addEventListener('DOMContentLoaded', () => {
  renderDocumentLayout(main)
})
