import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'

import { code, componentPropsOf } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'list-item.html', label: 'List Item' },
  { href: 'surface.html', label: 'Surface' },
]

const componentProps: ComponentPropItemData[] = [
  ...componentPropsOf('fff-separator'),
  { name: 'slot: default', type: 'HTMLElement', optional: true },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Structural',
    description:
      '정보와 정보 사이의 시각적 경계를 명확히 하여, 복잡한 화면의 레이아웃을 논리적인 단위로 분리하고 구조화합니다.',
  },
]

const exampleCode = `<fff-separator></fff-separator>
<fff-separator>또는</fff-separator>`

const main = html`
  <fff-main>
    <fff-page-header
      heading="Separator"
      description="서로 다른 맥락 사이에 긋는 경계선입니다. 요소 사이에는 좁은 간격으로, 섹션 사이에는 넓은 간격으로 선을 두어 내용을 나누므로, 사용자는 화면이 의미 단위로 정돈되어 있다는 인상 속에서 흐름을 따라 읽을 수 있습니다."
    ></fff-page-header>

    <fff-component-example>
      <fff-grid columns="2">
        <div>
          <fff-ui-placeholder></fff-ui-placeholder>
          <fff-separator></fff-separator>
          <fff-ui-placeholder></fff-ui-placeholder>
        </div>

        <div>
          <fff-ui-placeholder></fff-ui-placeholder>
          <fff-separator>또는</fff-separator>
          <fff-ui-placeholder></fff-ui-placeholder>
        </div>
      </fff-grid>
    </fff-component-example>
    <fff-component-code .code=${exampleCode}></fff-component-code>

    <fff-component-props .props=${componentProps}></fff-component-props>

    <fff-component-tokens .elements=${['fff-separator']}></fff-component-tokens>

    <fff-component-guide .features=${componentFeatures}>
      <fff-text-list
        .texts=${[
          html`
            주제가 바뀌는 지점을 보조기술에도 알린다. 내부에서 ${code('<hr>')}를 렌더하므로 화면
            낭독기가 그 위치에서 "구분선"이라고 읽는다.
          `,
          html`
            Article 그룹의 구획에 사용합니다. Element와 Section 그룹은 쓰지 않으며, 레벨별 구획
            규칙은
            <fff-link href="./layout.html?tab=division">Layout</fff-link>
            문서가 정합니다.
          `,
        ]}
      ></fff-text-list>
    </fff-component-guide>

    <fff-component-section
      heading="Bullet"
      description="단어 사이의 구분선입니다. 콤마·콜론·슬래시·따옴표·괄호처럼 항목을 나열하는 맥락에 쓰며, 텍스트를 드래그해 복사할 때 선택되지 않습니다."
    >
      <fff-flex gap="2">
        <fff-text>업로드 중</fff-text>
        <fff-bullet></fff-bullet>
        <fff-text>3/12개</fff-text>
        <fff-bullet></fff-bullet>
        <fff-text>1m 04s</fff-text>
      </fff-flex>
    </fff-component-section>

    <fff-component-related .items=${relatedComponents}></fff-component-related>

    <fff-component-pager></fff-component-pager>
  </fff-main>
`

renderPage(main)
