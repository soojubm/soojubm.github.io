import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentReferenceItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'

import { componentPropsOf } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'avatar.html', label: 'Avatar' },
  { href: 'surface.html', label: 'Surface' },
]

const componentReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://nextjs.org/docs/app/api-reference/components/image',
    label: 'Next.js - Image',
  },
  {
    href: 'https://atlassian.design/components/image/examples',
    label: 'Atlassian Design - Image',
  },
  {
    href: 'https://mantine.dev/core/image/',
    label: 'Mantine - Image',
  },
  {
    href: 'https://mui.com/material-ui/react-image-list/',
    label: 'MUI - Image List',
  },
]

const componentProps: ComponentPropItemData[] = [...componentPropsOf('fff-image')]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Representative',
    description:
      '콘텐츠 본문 대신 그 성격을 대표하는 미리보기 이미지를 보여줍니다. 무엇에 대한 콘텐츠인지 한눈에 알아볼 수 있어야 합니다. 이미지를 불러오지 못하거나 비어 있어도 빈 상태 배경(image-empty-background-color)으로 비율과 형태를 유지하고, alt 텍스트를 반드시 제공합니다.',
  },
]

const exampleCode = `<fff-image src="..." alt="..." ratio="1:1"></fff-image>
<fff-image src="..." alt="..." ratio="4:3" href="/video/1025"></fff-image>
<fff-image src="..." alt="..." ratio="16:9"></fff-image>
<fff-image src="..." alt="..." ratio="full"></fff-image>`

const main = html`
  <fff-main>
    <fff-page-header
      heading="Image"
      description="이미지나 미디어를 정해진 비율 안에서 미리 보여줍니다. 콘텐츠의 성격을 빠르게 알아볼 수 있어야 하며, 장식 목적의 반복 사용은 피합니다."
    ></fff-page-header>

    <fff-component-example full-width contained>
      <fff-grid columns="4" column-min-width="160px" gap="4">
        <fff-flex direction="column" gap="2">
          <fff-paragraph>1:1</fff-paragraph>
          <fff-image src="/src/images/temp.png" alt="멋진 풍경" ratio="1:1"></fff-image>
        </fff-flex>
        <fff-flex direction="column" gap="2">
          <fff-paragraph>4:3</fff-paragraph>
          <fff-image
            src="/src/images/temp.png"
            alt="멋진 풍경"
            ratio="4:3"
            href="/video/1025"
          ></fff-image>
        </fff-flex>
        <fff-flex direction="column" gap="2">
          <fff-paragraph>16:9</fff-paragraph>
          <fff-image src="/src/images/temp.png" alt="멋진 풍경" ratio="16:9"></fff-image>
        </fff-flex>
        <fff-flex direction="column" gap="2">
          <fff-paragraph>full</fff-paragraph>
          <fff-image src="/src/images/temp.png" alt="멋진 풍경" ratio="full"></fff-image>
        </fff-flex>
      </fff-grid>
    </fff-component-example>
    <fff-component-code .code=${exampleCode}></fff-component-code>

    <fff-component-props .props=${componentProps}></fff-component-props>

    <fff-component-tokens .elements=${['fff-image']}></fff-component-tokens>

    <fff-component-feature-list .features=${componentFeatures}></fff-component-feature-list>

    <fff-component-section
      heading="Caption"
      description="이미지 아래에 짧은 설명을 덧붙입니다. 출처나 촬영 정보처럼 이미지를 보조하는 내용만 넣고, 본문으로 읽을 텍스트는 넣지 않습니다."
    >
      <fff-image
        src="/src/images/temp.png"
        alt="노을 지는 협재 해변"
        ratio="16:9"
        caption="제주 협재 해변, 2024년 봄"
      ></fff-image>
    </fff-component-section>

    <fff-component-related .items=${relatedComponents}></fff-component-related>

    <fff-component-references .items=${componentReferences}></fff-component-references>

    <fff-component-pager></fff-component-pager>
  </fff-main>
`

renderPage(main)
