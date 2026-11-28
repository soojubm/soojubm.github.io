import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'

import { componentPropsOf } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'checkbox.html', label: 'Checkbox' },
  { href: 'toggle-button.html', label: 'Toggle Button' },
]

const componentProps: ComponentPropItemData[] = [
  ...componentPropsOf('fff-switch'),
  { name: 'change', type: 'CustomEvent detail: checked', kind: 'event' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Interactive - selection',
    description:
      '켜짐과 꺼짐 두 상태를 오가는 상호작용 컨트롤입니다. 조작 즉시 실행되므로 저장 버튼과 함께 제공하지 않고, 콘텐츠 전환·필터 맥락에 쓰지 않습니다.',
  },
]

const exampleCode = `<fff-switch name="newsletter">뉴스레터 받아보기</fff-switch>
<fff-switch name="newsletter" checked disabled>Receive weekly newsletter</fff-switch>`

const main = html`
  <fff-main>
    <fff-page-header
      heading="Switch"
      description="설정을 켜고 끄는 즉시 반영형 컨트롤입니다. 누르는 순간 상태가 바뀌고 별도의 저장 없이 곧바로 적용되므로, 사용자는 실행한 설정의 결과를 즉시 확인할 수 있습니다."
    ></fff-page-header>

    <fff-component-aka .items=${['Toggle']}></fff-component-aka>

    <fff-component-example>
      <fff-flex direction="column" gap="3">
        <fff-switch name="newsletter">뉴스레터 받아보기</fff-switch>
        <fff-switch name="newsletter" checked disabled>Receive weekly newsletter</fff-switch>
      </fff-flex>
    </fff-component-example>
    <fff-component-code .code=${exampleCode}></fff-component-code>

    <fff-component-props .props=${componentProps}></fff-component-props>

    <fff-component-tokens .elements=${['fff-switch']}></fff-component-tokens>

    <fff-component-feature-list .features=${componentFeatures}></fff-component-feature-list>

    <fff-component-anatomy
      .parts=${[
        '트랙 — on/off 상태를 배경색으로 나타내는 가로 막대입니다.',
        '썸(Thumb) — 트랙 위를 좌우로 이동하며 상태를 나타내는 손잡이.',
        '레이블 — 설정 항목을 설명하는 텍스트.',
      ]}
      .markers=${[
        { placement: 'block-start', offset: '0.75rem' },
        { placement: 'block-end', offset: '1.25rem' },
        { placement: 'inline-end' },
      ]}
    >
      <fff-switch checked>뉴스레터 받아보기</fff-switch>
    </fff-component-anatomy>
    <fff-component-related .items=${relatedComponents}></fff-component-related>

    <fff-component-pager></fff-component-pager>
  </fff-main>
`

renderPage(main)
