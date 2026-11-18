import { html } from 'lit'

import type { ComponentPropItemData } from '@/components/domains/component'

import '@/components/domains/component/component-notice'
import { code, componentPropsOf } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

const contentSectionCode = `<mm-content-section-list>
  <mm-content-section heading-level="3" heading="액션이 없는 섹션"></mm-content-section>
  <mm-content-section heading-level="3" heading="액션이 있는 섹션">
    <mm-link slot="action" href="./post.html">모두 보기</mm-link>
  </mm-content-section>
</mm-content-section-list>`

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

    <mm-content-section-list>
      <mm-content-section heading="buttonBaseStyles">
        <mm-paragraph>
          버튼 골격과 눌림 스킨(${code('buttonSelectedStyles')}). icon-button 스타일이 이 위에 서서
          아이콘 버튼 계열까지 퍼집니다.
        </mm-paragraph>
        <mm-paragraph>
          모든 버튼형 컴포넌트가 공유하는 기반 스타일입니다. 구조(레이아웃·크기·간격·타이포)와 기본
          스킨, 상호작용 상태(focus·active·disabled)를 포함합니다.
        </mm-paragraph>
      </mm-content-section>

      <mm-content-section heading="interactiveRowStyles">
        <mm-paragraph>
          눌리는 행의 hover·포커스·선택·비활성 스킨. menu-item 계열과 사이드바·검색 목록
        </mm-paragraph>
      </mm-content-section>

      <mm-content-section heading="dotStyles">
        <mm-paragraph>점 모양과 크기·tone 단계. 조합 컴포넌트가 고르는 단계</mm-paragraph>
      </mm-content-section>

      <mm-content-section heading="surfaceBaseStyles">
        <mm-paragraph>faq·banner·radio card·code-block·pager·token-item·color-token</mm-paragraph>
      </mm-content-section>

      <mm-content-section heading="visuallyHiddenInputStyles">
        <mm-paragraph>
          radio·checkbox가 네이티브 input을 숨기는 조각. 입력 필드 스타일은 input 계열 안에서만 쓴다
        </mm-paragraph>
      </mm-content-section>

      <mm-content-section heading="TagTone">
        <mm-paragraph>tone 이름과 색. dot·chart가 tag와 같은 색을 맞출 때 쓴다</mm-paragraph>
      </mm-content-section>

      <mm-content-section heading="Flex">
        <mm-paragraph>자식을 가로나 세로 한 줄로 배치합니다.</mm-paragraph>
        <mm-component-example>
          <mm-flex-preview></mm-flex-preview>
        </mm-component-example>
        <mm-component-props .props=${flexProps}></mm-component-props>
      </mm-content-section>

      <mm-content-section heading="Grid">
        <mm-paragraph>반복되는 항목을 열 단위로 늘어놓습니다.</mm-paragraph>
        <mm-component-example>
          <mm-grid-preview></mm-grid-preview>
        </mm-component-example>
        <mm-component-props .props=${gridProps}></mm-component-props>
      </mm-content-section>

      <mm-content-section heading="Page Header">
        <mm-paragraph>제목이 놓이는 자리가 쓸 컴포넌트를 정합니다.</mm-paragraph>
        <mm-paragraph>
          페이지 최상단의 제목과 설명을 구성하고, 아래 구획과의 간격을 자기 아래 여백으로
          소유합니다. ${code('centered')}로 가운데 정렬합니다.
        </mm-paragraph>
        <mm-component-example full-width>
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
            <mm-code-block .code=${pageHeaderCode}></mm-code-block>
          </mm-flex>
        </mm-component-example>
        <mm-component-props .props=${pageHeaderProps}></mm-component-props>
      </mm-content-section>

      <mm-content-section heading="Content Section">
        <mm-paragraph>
          제목과 본문을 한 묶음으로 구성하고 그 사이 간격을 소유합니다. ${code('heading-level')}은
          제목의 단계(h2–h5)와 크기를 정하며, 섹션이 문서 구조에서 놓인 자리에 맞춰 지정합니다.
        </mm-paragraph>
        <mm-component-example>
          <mm-flex direction="column" gap="3">
            <mm-content-section-list>
              <mm-content-section heading-level="4" heading="액션이 없는 섹션"></mm-content-section>
              <mm-content-section heading-level="4" heading="액션이 있는 섹션">
                <mm-link slot="action" href="./post.html">모두 보기</mm-link>
              </mm-content-section>
            </mm-content-section-list>
            <mm-code-block .code=${contentSectionCode}></mm-code-block>
          </mm-flex>
        </mm-component-example>
        <mm-component-props .props=${contentSectionProps}></mm-component-props>
        <mm-component-notice heading="모두 보기 링크를 받는 섹션">
          ${code('view-all-href')}를 받으면 ${code('action')} 슬롯에 "모두 보기" 링크를 스스로
          채우는 파생 컴포넌트를 둔다. 받지 않으면 기본형과 같다. 이동이라 버튼이 아닌 링크로
          렌더하고, 무엇을 모두 보는지 섹션 제목과 잇는다. 본문이 그리드든 좌우 스크롤이든 섹션은
          관여하지 않는다
        </mm-component-notice>
      </mm-content-section>

      <mm-content-section heading="Form Field">
        <mm-paragraph>
          textfield 계열이 아닌 컨트롤에 레이블·설명·검증 텍스트를 같은 규칙으로 붙입니다. 컨트롤은
          슬롯으로 받고 필드는 레이블이 붙은 ${code('role="group"')}이 됩니다. 컨트롤별 조합은
          <mm-link href="./input.html">Input</mm-link>
          이 전시합니다.
        </mm-paragraph>
        <mm-component-example>
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
            <mm-code-block .code=${formFieldCode}></mm-code-block>
          </mm-flex>
        </mm-component-example>
        <mm-component-props .props=${formFieldProps}></mm-component-props>
      </mm-content-section>

      <mm-content-section heading="Text Block">
        <mm-paragraph>
          제목과 설명 한 쌍을 놓는 텍스트 유틸리티입니다. ${code('level')}로 문서 안의 깊이와 두
          텍스트의 크기 단계를 함께 정합니다. 본문이 딸린 구획에는 ${code('mm-content-section')}을
          씁니다.
        </mm-paragraph>
        <mm-component-example>
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
              level="5"
              heading="Level 5 Title"
              description="제목과 설명 사이 간격은 level을 따라 함께 움직입니다."
            ></mm-text-block>
            <mm-code-block .code=${textBlockCode}></mm-code-block>
          </mm-flex>
        </mm-component-example>
        <mm-component-props .props=${textBlockProps}></mm-component-props>
        <mm-component-notice heading="mm-text-block을 유지할지 삭제할지">
          ${code('mm-page-header')}·${code('mm-feature')}·${code('mm-banner')}처럼 제목–설명 한 쌍을
          그리는 컴포넌트가 이 컴포넌트에 위임한다. 삭제하면 그 컴포넌트들이 제목–설명 간격을 각자
          소유하게 된다. 유지할지 삭제할지 정하지 않았다
        </mm-component-notice>
      </mm-content-section>
    </mm-content-section-list>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
