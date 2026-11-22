import { html } from 'lit'

import type { ComponentPropItemData } from '@/components/domains/component'

import '@/components/domains/component/component-notice'
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

const contentSectionCode = `<mm-content-section heading-level="3" heading="액션이 있는 섹션">
  <mm-link slot="action" href="./post.html">모두 보기</mm-link>
</mm-content-section>`

const formFieldCode = `<mm-form-field label="관심 주제" optional description="여러 개를 선택할 수 있습니다.">
  <mm-checkbox-group name="topics" .options=\${topicOptions}></mm-checkbox-group>
</mm-form-field>`

const pageHeaderCode = `<mm-flex justify-content="space-between" align-items="flex-start">
  <mm-page-header heading="설정" description="계정과 알림을 관리합니다."></mm-page-header>
  <mm-button-group>
    <mm-button variant="secondary">취소</mm-button>
    <mm-button>저장</mm-button>
  </mm-button-group>
</mm-flex>`

const textBlockCode = `<mm-text-block level="3" heading="제목" description="제목을 보충하는 설명"></mm-text-block>`

// 공유 스타일 파일에서 export 선언 하나를 원문 그대로 잘라 보여 준다. 여러 줄 선언은 0열에서 닫힌다.
const exportSourceOf = (source: string, name: string) => {
  const lines = source.split('\n')
  const start = lines.findIndex(line => new RegExp(`^export (const|type) ${name}\\b`).test(line))
  if (!/[`[{(]$/.test(lines[start])) return lines[start]
  const end = lines.findIndex((line, index) => index > start && /^\S/.test(line))
  return lines.slice(start, end + 1).join('\n')
}

const flexProps: ComponentPropItemData[] = [
  ...componentPropsOf('mm-flex'),
  { name: 'slot: default', type: 'HTMLElement', optional: true },
]

const gridProps: ComponentPropItemData[] = [
  ...componentPropsOf('mm-grid'),
  { name: 'slot: default', type: 'HTMLElement', optional: true },
]

const contentSectionProps: ComponentPropItemData[] = [
  ...componentPropsOf('mm-content-section'),
  { name: 'slot: default', type: 'HTMLElement', optional: true },
  { name: 'slot: action', type: 'HTMLElement', optional: true },
]

const pageHeaderProps: ComponentPropItemData[] = componentPropsOf('mm-page-header')

const textBlockProps: ComponentPropItemData[] = componentPropsOf('mm-text-block')

const formFieldProps: ComponentPropItemData[] = [
  ...componentPropsOf('mm-form-field'),
  { name: 'slot: default', type: 'HTMLElement', optional: true },
]

const main = html`
  <mm-main>
    <mm-page-header
      heading="Utilities"
      description="콘텐츠를 배치하고 구획하는 유틸리티입니다. 한 줄로 이어 놓으면 Flex, 열 단위로 늘어놓으면 Grid를 쓰고, 제목과 본문은 Content Section, 레이블이 붙는 컨트롤은 Form Field로 묶으므로 사용자는 어느 화면에서나 같은 간격 감각으로 정돈된 배치를 읽습니다."
    ></mm-page-header>

    <mm-page-body>
      <mm-tab-list value="styles" variant="text" search-param="tab">
        <mm-tab value="styles">Styles</mm-tab>
        <mm-tab value="components">Components</mm-tab>
      </mm-tab-list>

      <mm-tab-panel value="styles">
        <mm-content-section-list>
          <mm-content-section heading-level="3" heading="Button">
            <mm-content-section-list size="small">
              <mm-text-block
                level="4"
                heading="buttonBaseStyles"
                description="버튼 골격과 눌림 스킨(buttonSelectedStyles). icon-button 스타일이 이 위에 서서 아이콘 버튼 계열까지 퍼집니다. 모든 버튼형 컴포넌트가 공유하는 기반 스타일입니다. 구조(레이아웃·크기·간격·타이포)와 기본 스킨에 포커스·비활성(buttonInteractiveStyles)까지 함께 입힙니다."
              >
                <mm-code-block
                  language="typescript"
                  .code=${exportSourceOf(buttonStylesSource, 'buttonBaseStyles')}
                ></mm-code-block>
              </mm-text-block>

              <mm-text-block
                level="4"
                heading="buttonInteractiveStyles"
                description="눌리는 컨트롤의 포커스 링과 비활성 표시입니다. 선언만 담으므로 사용하는 컴포넌트가 자기 button·a 선택자 안에 펼칩니다. buttonBaseStyles·iconButtonStyles가 품고, color-chip이 직접 씁니다."
              >
                <mm-code-block
                  language="typescript"
                  .code=${exportSourceOf(buttonStylesSource, 'buttonInteractiveStyles')}
                ></mm-code-block>
              </mm-text-block>

              <mm-text-block
                level="4"
                heading="iconButtonStyles"
                description="icon-button 계열의 기반 스타일입니다. 자체 button을 쓰는 파생 컴포넌트가 hover·포커스·비활성을 빠뜨리지 않도록 buttonInteractiveStyles를 button 규칙 안에 함께 입힙니다."
              >
                <mm-code-block
                  language="typescript"
                  .code=${exportSourceOf(iconButtonStylesSource, 'iconButtonStyles')}
                ></mm-code-block>
              </mm-text-block>
            </mm-content-section-list>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="Input">
            <mm-content-section-list size="small">
              <mm-text-block
                level="4"
                heading="inputBaseStyles"
                description="입력 필드의 기반 스타일입니다. 높이·여백·배경·테두리와 hover·포커스·비활성·오류 상태를 포함하며, size로 small 단계를 고릅니다. textarea와 searchfield가 이 위에 섭니다."
              >
                <mm-code-block
                  language="typescript"
                  .code=${exportSourceOf(inputStylesSource, 'inputBaseStyles')}
                ></mm-code-block>
              </mm-text-block>

              <mm-text-block
                level="4"
                heading="textfieldStyles"
                description="label·description·validation을 함께 갖는 field 계열(textfield, textarea-field, numberfield, passwordfield)의 공유 규칙입니다."
              >
                <mm-code-block
                  language="typescript"
                  .code=${exportSourceOf(inputStylesSource, 'textfieldStyles')}
                ></mm-code-block>
              </mm-text-block>

              <mm-text-block
                level="4"
                heading="inputSelectionGroupStyles"
                description="선택 컨트롤을 fieldset으로 묶는 그룹입니다. 그룹 이름(legend)은 스크린리더에만 전달합니다. radio·checkbox 그룹이 씁니다."
              >
                <mm-code-block
                  language="typescript"
                  .code=${exportSourceOf(inputStylesSource, 'inputSelectionGroupStyles')}
                ></mm-code-block>
              </mm-text-block>

              <mm-text-block
                level="4"
                heading="inputVisuallyHiddenStyles"
                description="radio·checkbox가 네이티브 input을 숨기는 조각. 입력 필드 스타일은 input 계열 안에서만 쓴다"
              >
                <mm-code-block
                  language="typescript"
                  .code=${exportSourceOf(inputStylesSource, 'inputVisuallyHiddenStyles')}
                ></mm-code-block>
              </mm-text-block>
            </mm-content-section-list>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="Row">
            <mm-content-section-list size="small">
              <mm-text-block
                level="4"
                heading="listItemInteractiveStyles"
                description="눌리는 행의 hover·포커스·선택·비활성 스킨. menu-item 계열과 사이드바·검색 목록"
              >
                <mm-code-block
                  language="typescript"
                  .code=${exportSourceOf(listItemStylesSource, 'listItemInteractiveStyles')}
                ></mm-code-block>
              </mm-text-block>

              <mm-text-block
                level="4"
                heading="menuItemStyles"
                description="눌리는 명령 행의 스타일입니다. menu-item 계열과 select option이 씁니다."
              >
                <mm-code-block
                  language="typescript"
                  .code=${exportSourceOf(menuItemStylesSource, 'menuItemStyles')}
                ></mm-code-block>
              </mm-text-block>
            </mm-content-section-list>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="Surface">
            <mm-content-section-list size="small">
              <mm-text-block
                level="4"
                heading="surfaceBaseStyles"
                description="faq·banner·radio card·code-block·pager·token-item·color-token"
              >
                <mm-code-block
                  language="typescript"
                  .code=${exportSourceOf(surfaceStylesSource, 'surfaceBaseStyles')}
                ></mm-code-block>
              </mm-text-block>

              <mm-text-block
                level="4"
                heading="overlaySurfaceStyles"
                description="떠 있는 패널의 재질입니다. dialog·popover·sheet가 씁니다."
              >
                <mm-code-block
                  language="typescript"
                  .code=${exportSourceOf(overlayStylesSource, 'overlaySurfaceStyles')}
                ></mm-code-block>
              </mm-text-block>

              <mm-text-block
                level="4"
                heading="sheetPositionStyles"
                description="viewport 기준 modal 표면(sheet, dialog)의 위치입니다. placement별로 패널을 어느 변에 붙일지 정하고, placement가 없는 dialog는 화면 가운데에 앉습니다."
              >
                <mm-code-block
                  language="typescript"
                  .code=${exportSourceOf(overlayStylesSource, 'sheetPositionStyles')}
                ></mm-code-block>
              </mm-text-block>
            </mm-content-section-list>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="Tone">
            <mm-content-section-list size="small">
              <mm-text-block
                level="4"
                heading="dotStyles"
                description="점 모양과 크기·tone 단계. 조합 컴포넌트가 고르는 단계"
              >
                <mm-code-block
                  language="typescript"
                  .code=${exportSourceOf(dotStylesSource, 'dotStyles')}
                ></mm-code-block>
              </mm-text-block>

              <mm-text-block
                level="4"
                heading="TagTone"
                description="tone 이름과 색. dot·chart가 tag와 같은 색을 맞출 때 쓴다"
              >
                <mm-code-block
                  language="typescript"
                  .code=${`${exportSourceOf(tagStylesSource, 'tagToneStyles')}\n\n${exportSourceOf(
                    tagStylesSource,
                    'TagTone',
                  )}`}
                ></mm-code-block>
              </mm-text-block>
            </mm-content-section-list>
          </mm-content-section>
        </mm-content-section-list>
      </mm-tab-panel>

      <mm-tab-panel value="components">
        <mm-component-section heading="Flex" description="자식을 가로나 세로 한 줄로 배치합니다.">
          <mm-flex-preview></mm-flex-preview>
        </mm-component-section>
        <mm-component-props .props=${flexProps}></mm-component-props>

        <mm-component-section heading="Grid" description="반복되는 항목을 열 단위로 늘어놓습니다.">
          <mm-grid-preview></mm-grid-preview>
        </mm-component-section>
        <mm-component-props .props=${gridProps}></mm-component-props>

        <mm-component-section
          heading="Page Header"
          description="제목이 놓이는 자리가 쓸 컴포넌트를 정합니다. 페이지 최상단의 제목과 설명을 구성하고, 아래 구획과의 간격을 자기 아래 여백으로 소유합니다. centered로 가운데 정렬합니다."
          full-width
          .code=${pageHeaderCode}
        >
          <mm-flex direction="column" gap="3">
            <mm-flex justify-content="space-between" align-items="flex-start">
              <mm-page-header
                heading="설정"
                description="계정과 알림을 관리합니다."
              ></mm-page-header>
              <mm-button-group>
                <mm-button variant="secondary">취소</mm-button>
                <mm-button>저장</mm-button>
              </mm-button-group>
            </mm-flex>
          </mm-flex>
        </mm-component-section>
        <mm-component-props .props=${pageHeaderProps}></mm-component-props>

        <mm-component-section
          heading="Content Section"
          description="제목과 본문을 한 묶음으로 구성하고 그 사이 간격을 소유합니다. heading-level은 제목의 단계(h2–h5)와 크기를 정하며, 섹션이 문서 구조에서 놓인 자리에 맞춰 지정합니다."
          .code=${contentSectionCode}
        >
          <mm-component-notice slot="notice" heading="모두 보기 링크를 받는 섹션">
            ${code('view-all-href')}를 받으면 ${code('action')} 자리에 "모두 보기" 링크를 스스로
            채우는 파생 컴포넌트를 둔다. 받지 않으면 기본형과 같다. 이동이라 버튼이 아닌 링크로
            두고, 무엇을 모두 보는지 섹션 제목과 잇는다. 본문이 그리드든 좌우 스크롤이든 섹션은
            관여하지 않는다
          </mm-component-notice>
          <mm-flex direction="column" gap="3">
            <mm-content-section heading-level="4" heading="액션이 있는 섹션">
              <mm-link slot="action" href="./post.html">모두 보기</mm-link>
            </mm-content-section>
          </mm-flex>
        </mm-component-section>
        <mm-component-props .props=${contentSectionProps}></mm-component-props>

        <mm-component-section
          heading="Form Field"
          description="textfield 계열이 아닌 컨트롤에 레이블·설명·검증 텍스트를 같은 규칙으로 붙입니다. 컨트롤은 안에 넣어 받고 필드는 레이블이 붙은 role=group이 됩니다. 컨트롤별 조합은 Input 페이지가 전시합니다."
          .code=${formFieldCode}
        >
          <mm-flex direction="column" gap="3">
            <mm-form-field label="성별">
              <mm-gender-selector stretch></mm-gender-selector>
            </mm-form-field>
            <mm-form-field label="관심 주제" optional description="여러 개를 선택할 수 있습니다.">
              <mm-checkbox-group
                name="topics"
                .options=${[
                  { value: 'tech', label: '기술' },
                  { value: 'design', label: '디자인' },
                  { value: 'biz', label: '비즈니스' },
                ]}
              ></mm-checkbox-group>
            </mm-form-field>
            <mm-form-field label="국가" description="배송 가능한 국가만 표시됩니다.">
              <mm-select
                .options=${[
                  { value: 'kr', label: '대한민국' },
                  { value: 'jp', label: '일본' },
                  { value: 'us', label: '미국' },
                ]}
              ></mm-select>
            </mm-form-field>
          </mm-flex>
        </mm-component-section>
        <mm-component-props .props=${formFieldProps}></mm-component-props>

        <mm-component-section
          heading="Text Block"
          description="제목과 설명 한 쌍을 놓는 텍스트 유틸리티입니다. level로 문서 안의 깊이와 두 텍스트의 크기 단계를 함께 정합니다. 본문이 딸린 구획에는 mm-content-section을 씁니다."
          .code=${textBlockCode}
        >
          <mm-component-notice slot="notice" heading="mm-text-block을 유지할지 삭제할지">
            ${code('mm-page-header')}·${code('mm-feature')}·${code('mm-banner')}처럼 제목–설명 한
            쌍을 그리는 컴포넌트가 이 컴포넌트에 위임한다. 삭제하면 그 컴포넌트들이 제목–설명 간격을
            각자 소유하게 된다. 유지할지 삭제할지 정하지 않았다
          </mm-component-notice>
          <mm-flex direction="column" gap="3">
            <mm-text-block
              level="1"
              heading="Level 1 Title"
              description="제목과 설명 사이 간격은 level을 따라 함께 움직입니다."
            ></mm-text-block>
            <mm-separator></mm-separator>
            <mm-text-block
              level="3"
              heading="Level 3 Title"
              description="제목과 설명 사이 간격은 level을 따라 함께 움직입니다."
            ></mm-text-block>
            <mm-separator></mm-separator>
            <mm-text-block
              level="4"
              heading="Level 4 Title"
              description="제목과 설명 사이 간격은 level을 따라 함께 움직입니다."
            ></mm-text-block>
          </mm-flex>
        </mm-component-section>
        <mm-component-props .props=${textBlockProps}></mm-component-props>
      </mm-tab-panel>
    </mm-page-body>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
