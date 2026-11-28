import { html } from 'lit'

import type { ComponentPropItemData } from '@/components/domains/component'

import '@/components/domains/component/component-notice'
import '@/components/domains/faq'
import { code, componentPropsOf } from '@/components/domains/component'
import buttonStylesSource from '@/components/common/button/button.styles.ts?raw'
import dotStylesSource from '@/components/common/dot/dot.styles.ts?raw'
import iconButtonStylesSource from '@/components/common/icon-button/icon-button.styles.ts?raw'
import inputStylesSource from '@/components/common/input/input.styles.ts?raw'
import listItemStylesSource from '@/components/common/list-item/list-item.styles.ts?raw'
import menuItemStylesSource from '@/components/common/menu-item/menu-item.styles.ts?raw'
import surfaceStylesSource from '@/components/common/surface/surface.styles.ts?raw'
import tagStylesSource from '@/components/common/tag/tag.styles.ts?raw'
import { renderPage } from '@/components/layouts/base-layouts'
import overlayStylesSource from '@/components/overlay/overlay.styles.ts?raw'

const contentSectionCode = `<fff-content-section heading-level="3" heading="액션이 있는 섹션">
  <fff-link slot="action" href="./post.html">모두 보기</fff-link>
</fff-content-section>`

const formFieldCode = `<fff-form-field label="관심 주제" optional description="...">
  <fff-checkbox-group name="topics" .options=\${topicOptions}></fff-checkbox-group>
</fff-form-field>`

const pageHeaderCode = `<fff-page-header heading="설정" description="...">
  <fff-button-group slot="action">
    <fff-button variant="secondary">취소</fff-button>
    <fff-button variant="primary">저장</fff-button>
  </fff-button-group>
</fff-page-header>`

const textBlockCode = `<fff-text-block level="3" heading="제목" description="..."></fff-text-block>`

// 공유 스타일 파일에서 export 선언 하나를 원문 그대로 잘라 보여 준다. 여러 줄 선언은 0열에서 닫힌다.
const exportSourceOf = (source: string, name: string) => {
  const lines = source.split('\n')
  const start = lines.findIndex(line => new RegExp(`^export (const|type) ${name}\\b`).test(line))
  if (!/[`[{(]$/.test(lines[start])) return lines[start]
  const end = lines.findIndex((line, index) => index > start && /^\S/.test(line))
  return lines.slice(start, end + 1).join('\n')
}

interface StyleExport {
  name: string
  code: string
}

interface StyleGroup {
  heading: string
  exports: StyleExport[]
}

const styleGroups: StyleGroup[] = [
  {
    heading: 'Button',
    exports: [
      { name: 'buttonBaseStyles', code: exportSourceOf(buttonStylesSource, 'buttonBaseStyles') },
      {
        name: 'buttonInteractiveStyles',
        code: exportSourceOf(buttonStylesSource, 'buttonInteractiveStyles'),
      },
      {
        name: 'iconButtonStyles',
        code: exportSourceOf(iconButtonStylesSource, 'iconButtonStyles'),
      },
    ],
  },
  {
    heading: 'Input',
    exports: [
      { name: 'inputBaseStyles', code: exportSourceOf(inputStylesSource, 'inputBaseStyles') },
      { name: 'textfieldStyles', code: exportSourceOf(inputStylesSource, 'textfieldStyles') },
      {
        name: 'inputSelectionGroupStyles',
        code: exportSourceOf(inputStylesSource, 'inputSelectionGroupStyles'),
      },
      {
        name: 'inputVisuallyHiddenStyles',
        code: exportSourceOf(inputStylesSource, 'inputVisuallyHiddenStyles'),
      },
    ],
  },
  {
    heading: 'Row',
    exports: [
      {
        name: 'listItemInteractiveStyles',
        code: exportSourceOf(listItemStylesSource, 'listItemInteractiveStyles'),
      },
      { name: 'menuItemStyles', code: exportSourceOf(menuItemStylesSource, 'menuItemStyles') },
    ],
  },
  {
    heading: 'Surface',
    exports: [
      { name: 'surfaceBaseStyles', code: exportSourceOf(surfaceStylesSource, 'surfaceBaseStyles') },
      {
        name: 'overlaySurfaceStyles',
        code: exportSourceOf(overlayStylesSource, 'overlaySurfaceStyles'),
      },
      {
        name: 'sheetPositionStyles',
        code: exportSourceOf(overlayStylesSource, 'sheetPositionStyles'),
      },
    ],
  },
  {
    heading: 'Tone',
    exports: [
      { name: 'dotStyles', code: exportSourceOf(dotStylesSource, 'dotStyles') },
      {
        name: 'TagTone',
        code: `${exportSourceOf(tagStylesSource, 'tagToneStyles')}\n\n${exportSourceOf(
          tagStylesSource,
          'TagTone',
        )}`,
      },
    ],
  },
]

const renderStyleGroup = ({ heading, exports }: StyleGroup) => html`
  <fff-content-section heading-level="3" heading=${heading}>
    <fff-faq-list>
      ${exports.map(
        ({ name, code }) => html`
          <fff-faq-item>
            <fff-code-tag slot="question">${name}</fff-code-tag>
            <fff-code-block language="typescript" .code=${code}></fff-code-block>
          </fff-faq-item>
        `,
      )}
    </fff-faq-list>
  </fff-content-section>
`

const flexProps: ComponentPropItemData[] = [
  ...componentPropsOf('fff-flex'),
  { name: 'slot: default', type: 'HTMLElement', optional: true },
]

const gridProps: ComponentPropItemData[] = [
  ...componentPropsOf('fff-grid'),
  { name: 'slot: default', type: 'HTMLElement', optional: true },
]

const contentSectionProps: ComponentPropItemData[] = [
  ...componentPropsOf('fff-content-section'),
  { name: 'slot: default', type: 'HTMLElement', optional: true },
  { name: 'slot: action', type: 'HTMLElement', optional: true },
]

const pageHeaderProps: ComponentPropItemData[] = [
  ...componentPropsOf('fff-page-header'),
  { name: 'slot: action', type: 'HTMLElement', optional: true },
]

const textBlockProps: ComponentPropItemData[] = componentPropsOf('fff-text-block')

const formFieldProps: ComponentPropItemData[] = [
  ...componentPropsOf('fff-form-field'),
  { name: 'slot: default', type: 'HTMLElement', optional: true },
]

const main = html`
  <fff-main>
    <fff-page-header
      heading="Utilities"
      description="콘텐츠를 배치하고 구획하는 유틸리티입니다. 한 줄로 이어 놓으면 Flex, 열 단위로 늘어놓으면 Grid를 쓰고, 제목과 본문은 Content Section, 레이블이 붙는 컨트롤은 Form Field로 묶으므로 사용자는 어느 화면에서나 같은 간격 감각으로 정돈된 배치를 읽습니다."
    ></fff-page-header>

    <fff-page-body>
      <fff-tab-list
        value="styles"
        variant="text"
        search-param="tab"
        .tabs=${[
          { value: 'styles', label: 'Styles' },
          { value: 'components', label: 'Components' },
        ]}
      ></fff-tab-list>

      <fff-tab-panel value="styles">
        <fff-content-section-list>${styleGroups.map(renderStyleGroup)}</fff-content-section-list>
      </fff-tab-panel>

      <fff-tab-panel value="components">
        <fff-component-section heading="Flex" description="자식을 가로나 세로 한 줄로 배치합니다.">
          <fff-flex-preview></fff-flex-preview>
        </fff-component-section>
        <fff-component-props .props=${flexProps}></fff-component-props>

        <fff-component-section heading="Grid" description="반복되는 항목을 열 단위로 늘어놓습니다.">
          <fff-grid-preview></fff-grid-preview>
        </fff-component-section>
        <fff-component-props .props=${gridProps}></fff-component-props>

        <fff-component-section
          heading="Page Header"
          description="제목이 놓이는 자리가 쓸 컴포넌트를 정합니다. 페이지 최상단의 제목과 설명을 구성하고, 아래 구획과의 간격을 자기 아래 여백으로 소유합니다. centered로 가운데 정렬합니다."
          full-width
          .code=${pageHeaderCode}
        >
          <fff-flex direction="column" gap="3">
            <fff-page-header heading="설정" description="계정과 알림을 관리합니다.">
              <fff-button-group slot="action">
                <fff-button variant="secondary">취소</fff-button>
                <fff-button variant="primary">저장</fff-button>
              </fff-button-group>
            </fff-page-header>
          </fff-flex>
        </fff-component-section>
        <fff-component-props .props=${pageHeaderProps}></fff-component-props>

        <fff-component-section
          heading="Content Section"
          description="제목과 본문을 한 묶음으로 구성하고 그 사이 간격을 소유합니다. heading-level은 제목의 단계(h2–h5)와 크기를 정하며, 섹션이 문서 구조에서 놓인 자리에 맞춰 지정합니다."
          .code=${contentSectionCode}
        >
          <fff-flex direction="column" gap="3">
            <fff-content-section heading-level="4" heading="액션이 있는 섹션">
              <fff-link slot="action" href="./post.html">모두 보기</fff-link>
            </fff-content-section>
          </fff-flex>
        </fff-component-section>
        <fff-component-props .props=${contentSectionProps}></fff-component-props>

        <fff-component-section
          heading="Form Field"
          description="컨트롤에 레이블·설명·검증 텍스트를 한 묶음으로 붙이는 필드입니다. 어떤 컨트롤이든 같은 규칙으로 붙으므로, 사용자는 무엇을 입력하는지와 어디가 잘못됐는지를 같은 자리에서 확인할 수 있습니다."
          .code=${formFieldCode}
        >
          <fff-form-fieldset aria-label="프로필" gap="6">
            <fff-form-field label="성별">
              <fff-gender-selector stretch></fff-gender-selector>
            </fff-form-field>
            <fff-form-field label="관심 주제" optional description="여러 개를 선택할 수 있습니다.">
              <fff-checkbox-group
                name="topics"
                .options=${[
                  { value: 'tech', label: '기술' },
                  { value: 'design', label: '디자인' },
                  { value: 'biz', label: '비즈니스' },
                ]}
              ></fff-checkbox-group>
            </fff-form-field>
            <fff-form-field label="국가" description="배송 가능한 국가만 표시됩니다.">
              <fff-select
                .options=${[
                  { value: 'kr', label: '대한민국' },
                  { value: 'jp', label: '일본' },
                  { value: 'us', label: '미국' },
                ]}
              ></fff-select>
            </fff-form-field>
          </fff-form-fieldset>
        </fff-component-section>
        <fff-component-props .props=${formFieldProps}></fff-component-props>

        <fff-component-section
          heading="Text Block"
          description="제목과 설명 한 쌍을 놓는 텍스트 유틸리티입니다. level로 문서 안의 깊이와 두 텍스트의 크기 단계를 함께 정합니다."
          .code=${textBlockCode}
        >
          <fff-flex direction="column" gap="3">
            <fff-text-block
              level="1"
              heading="Level 1 Title"
              description="제목과 설명 사이 간격은 level을 따라 함께 움직입니다."
            ></fff-text-block>
            <fff-text-block
              level="3"
              heading="Level 3 Title"
              description="제목과 설명 사이 간격은 level을 따라 함께 움직입니다."
            ></fff-text-block>
            <fff-text-block
              level="4"
              heading="Level 4 Title"
              description="제목과 설명 사이 간격은 level을 따라 함께 움직입니다."
            ></fff-text-block>
          </fff-flex>
        </fff-component-section>
        <fff-component-props .props=${textBlockProps}></fff-component-props>
      </fff-tab-panel>
    </fff-page-body>

    <fff-component-pager></fff-component-pager>
  </fff-main>
`

renderPage(main)
