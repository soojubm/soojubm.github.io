import { html } from 'lit'

import type { ComponentFeatureItem } from '@/components/domains/component/component-feature-list'
import type { ComponentPropItemData } from '@/components/domains/component/component-props'
import type { ComponentRelatedItemData } from '@/components/domains/component/component-related'
import type { ComponentTokenItemData } from '@/components/domains/component/component-tokens'

import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'list-item.html', label: 'List Item' },
  { href: 'surface.html', label: 'Surface' },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'variant', type: "'element' | 'section' = 'element'" },
  { name: 'slot: default', type: 'HTMLElement', optional: true },
]

const componentTokens: ComponentTokenItemData[] = [
  { name: 'separator-spacing' },
  { name: 'separator-border' },
  { name: 'separator-text-background-color' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Structural',
    description:
      '정보와 정보 사이의 시각적 경계를 명확히 하여, 복잡한 화면의 레이아웃을 논리적인 단위로 분리하고 구조화합니다.',
  },
]

const main = html`
  <mm-page>
    <mm-page-header
      heading="Seperator"
      description="선으로 콘텐츠를 구획합니다. 반복과 대비가 구획되었다는 인상을 주기 때문에 남용하지 않습니다."
    ></mm-page-header>

    <mm-component-example>
      <mm-grid columns="2">
        <div>
          <mm-ui-placeholder></mm-ui-placeholder>
          <mm-separator></mm-separator>
          <mm-ui-placeholder></mm-ui-placeholder>
        </div>

        <div>
          <mm-ui-placeholder></mm-ui-placeholder>
          <mm-separator>또는</mm-separator>
          <mm-ui-placeholder></mm-ui-placeholder>
        </div>
      </mm-grid>
    </mm-component-example>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .tokens=${componentTokens}></mm-component-tokens>

    <mm-component-guide>
      <mm-component-feature-list .features=${componentFeatures}></mm-component-feature-list>
      <mm-text-list
        .texts=${[
          'hr 태그를 사용하면 의미론적으로 주제를 분리할 수 있고 컴포넌트의 고유성을 유지할 수 있습니다.',
          '물리적 픽셀 단위(retina), 논리적 픽셀 단위(1px)',
          '아티클 레벨에서 사용합니다. 섹션 레벨과 페이지 레벨에서는 충분한 여백으로 콘텐츠를 구획합니다. 콘텐츠 레벨에 대한 foundations의 문서화 필요.',
          '불릿 컴포넌트의 정의. 불릿, 콤마, 콜론, 슬래시, 따옴표, 괄호 등으로 나열하는 맥락에 불릿 컴포넌트를 사용한다. 클립보드 복사를 위해 텍스트 더미를 드래그앤드롭으로 선택할 때에 불릿은 선택되지 않아야 한다.',
        ]}
      ></mm-text-list>
    </mm-component-guide>

    <mm-component-anatomy .code=${'<mm-separator>또는</mm-separator>'}></mm-component-anatomy>
    <mm-component-related .items=${relatedComponents}></mm-component-related>
  </mm-page>
`

renderPage(main)
