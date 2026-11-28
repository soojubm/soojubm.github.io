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

    <fff-component-guide>
      <fff-content-section
        heading-level="3"
        heading="레이블은 어디에 두나요?"
        description="레이블은 스위치 오른쪽에 둡니다. 왼쪽에 두면 사용자가 스위치를 먼저 조작한 뒤에야 무엇을 바꾸는지 알게 됩니다."
      >
        <fff-grid columns="2" gap="6">
          <fff-figure-card description="스위치 오른쪽의 레이블이 바로 무엇을 켜고 끄는지 알려 준다">
            <fff-switch slot="figure" name="label-right">뉴스레터 받아보기</fff-switch>
            <fff-code-tag slot="tags" tone="green">Do</fff-code-tag>
          </fff-figure-card>
          <fff-figure-card
            description="레이블이 왼쪽에 있으면 스위치가 무엇을 바꾸는지 늦게 읽힌다"
          >
            <fff-flex slot="figure" align-items="center" gap="3">
              <fff-text>뉴스레터 받아보기</fff-text>
              <fff-switch name="label-left" aria-label="뉴스레터 받아보기"></fff-switch>
            </fff-flex>
            <fff-code-tag slot="tags" tone="red">Don't</fff-code-tag>
          </fff-figure-card>
        </fff-grid>
      </fff-content-section>
    </fff-component-guide>

    <fff-component-related .items=${relatedComponents}></fff-component-related>

    <fff-component-pager></fff-component-pager>
  </fff-main>
`

renderPage(main)
