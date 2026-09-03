import { html } from 'lit'

import type { ComponentFeatureItem } from '@/components/domains/component/component-feature-list'
import type { ComponentPropItemData } from '@/components/domains/component/component-props'
import type { ComponentRelatedItemData } from '@/components/domains/component/component-related'
import type { ComponentTokenItemData } from '@/components/domains/component/component-tokens'

import { renderDocumentLayout } from '@/components/layouts/document-layout'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'checkbox.html', label: 'Checkbox' },
  { href: 'toggle-button.html', label: 'Toggle Button' },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'name', type: 'string', optional: true },
  { name: 'checked', type: 'boolean', optional: true },
  { name: 'disabled', type: 'boolean', optional: true },
  { name: 'change', type: 'CustomEvent detail: checked, value', kind: 'event' },
]

const componentTokens: ComponentTokenItemData[] = [
  { name: 'switch-width', default: 'var(--size-32)' },
  { name: 'switch-height', default: 'var(--size-16)' },
  { name: 'switch-border-radius', default: 'var(--radius)' },
  { name: 'switch-background-color', default: 'var(--border-color)' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Interactive - selection',
    description:
      '켜짐과 꺼짐 두 상태를 오가는 상호작용 컨트롤입니다. 조작 즉시 실행되므로 저장 버튼과 함께 제공하지 않고, 콘텐츠 전환·필터 맥락에 쓰지 않습니다.',
  },
  { heading: 'TODO', description: 'TODO' },
]

const main = html`
  <main class="page">
    <mm-page-header
      heading="Switch"
      description="켜고 끄는 옵션입니다. 사용자는 실행한 옵션의 결과를 즉시 확인할 수 있습니다."
    ></mm-page-header>

    <mm-component-aka items='["Toggle"]'></mm-component-aka>

    <mm-component-example>
      <mm-flex direction="column" gap="3">
        <mm-switch name="newsletter">뉴스레터 받아보기</mm-switch>
        <mm-switch name="newsletter" checked disabled>Receive weekly newsletter</mm-switch>
      </mm-flex>
    </mm-component-example>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .tokens=${componentTokens}></mm-component-tokens>

    <mm-component-guide>
      <mm-component-feature-list .features=${componentFeatures}></mm-component-feature-list>
    </mm-component-guide>

    <mm-component-anatomy
      parts='[
      "트랙 — on/off 상태를 배경색으로 나타내는 가로 막대입니다.",
      "썸(Thumb) — 트랙 위를 좌우로 이동하며 상태를 나타내는 손잡이.",
      "레이블 — 설정 항목을 설명하는 텍스트."
    ]'
    >
      <mm-switch checked>뉴스레터 받아보기</mm-switch>

      <!-- 번호 마커 -->
      <mm-list-marker
        variant="number"
        value="1"
        style="position: absolute; left: 0.25rem; top: -1.75rem"
      ></mm-list-marker>
      <mm-list-marker
        variant="number"
        value="2"
        style="position: absolute; left: 1.25rem; bottom: -1.75rem; transform: translateX(-50%)"
      ></mm-list-marker>
      <mm-list-marker
        variant="number"
        value="3"
        style="position: absolute; right: -1.75rem; top: 50%; transform: translateY(-50%)"
      ></mm-list-marker>
    </mm-component-anatomy>
    <mm-component-related .items=${relatedComponents}></mm-component-related>
  </main>
`

document.addEventListener('DOMContentLoaded', () => {
  renderDocumentLayout(main)
})
