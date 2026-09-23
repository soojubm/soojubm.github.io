import { html } from 'lit'

import type { TemplateResult } from 'lit'

import { ICON_NAMES } from '@/components/common'
import '@/components/domains/component/component-pager'
import '@/components/domains/component/copy-page-button'
import { renderPage } from '@/components/layouts/base-layouts'

// 앞뒤 공백이 문장 안 여백으로 렌더되지 않도록 한 줄로 둔다.
// prettier-ignore
const code = (name: string) => html`<mm-code>${name}</mm-code>`

// prettier-ignore
const codeList = (names: string[]) => names.map((name, index) => html`${index ? ', ' : ''}${code(name)}`)

const GROUP_COMPONENTS = [
  'mm-button-group',
  'mm-filter-button-group',
  'mm-toggle-button-group',
  'mm-radio-group',
  'mm-checkbox-group',
  'mm-radio-card-group',
  'mm-avatar-group',
  'mm-tag-group',
  'mm-keyword-tag-group',
  'mm-list-item-group',
  'mm-menu-item-group',
  'mm-menu-item-radio-group',
  'mm-menu-item-checkbox-group',
  'mm-meta-item-group',
  'mm-feature-group',
  'mm-paragraph-group',
]
const SECTION_COMPONENTS = ['mm-content-section', 'mm-page-header']

// 목록 항목은 핵심을 굵은 한 줄로 먼저 두고 설명을 잇는다.
const rule = (title: string | TemplateResult, description: string | TemplateResult) => html`
  <span>
    <mm-text weight="bold">${title}</mm-text>
    ${description}
  </span>
`

const main = html`
  <mm-main>
    <mm-flex justify-content="between" align-items="start" gap="3">
      <mm-page-header
        heading="Foundations"
        description="제품 전체가 공유하는 시각 언어의 기본 축입니다. 각 문서가 하나의 축을 정의합니다."
      ></mm-page-header>
      <mm-copy-page-button></mm-copy-page-button>
    </mm-flex>

    <mm-flex direction="column" gap="16">
      <mm-grid columns="3" gap="4">
        <mm-foundation-item
          href="./layout.html"
          heading="Layout"
          description="컨테이너 너비와 배경·표면 대비로 페이지의 성격과 작업 맥락을 담습니다."
        ></mm-foundation-item>
        <mm-foundation-item
          href="./container.html"
          heading="Container"
          description="자식을 배치하고 묶는 컨테이너 컴포넌트를 모아 봅니다."
        ></mm-foundation-item>
        <mm-foundation-item
          href="./interaction.html"
          heading="Interaction"
          description="상호작용할 수 있는 요소와 그 반응 상태를 정의합니다."
        ></mm-foundation-item>
        <mm-foundation-item
          href="./selection.html"
          heading="Selection"
          description="선택지를 고르는 컴포넌트의 선택 기준, 상태 소유, 옵션 모양을 정의합니다."
        ></mm-foundation-item>
        <mm-foundation-item
          href="./search.html"
          heading="Search"
          description="키워드로 콘텐츠를 찾는 흐름의 단계별 제안과 결과 처리 방식을 정의합니다."
        ></mm-foundation-item>
        <mm-foundation-item
          href="./feedback.html"
          heading="Feedback"
          description="행동·시스템 결과를 알리는 상태와 비동기 데이터 흐름을 정의합니다."
        ></mm-foundation-item>
        <mm-foundation-item
          href="./overlay.html"
          heading="Overlay"
          description="화면 위로 뜨는 표면의 행동 계약과 겹침 순서를 정의합니다."
        ></mm-foundation-item>
        <mm-foundation-item
          href="./collection.html"
          heading="Collection"
          description="사용자가 만든 묶음에 항목을 담고 묶음을 만들고 관리하는 흐름을 정의합니다."
        ></mm-foundation-item>
        <mm-foundation-item
          href="./content.html"
          heading="Content"
          description="텍스트 슬롯의 이름과 어조, 아이콘의 의미, 스캔 가능한 문구 원칙입니다."
        ></mm-foundation-item>
      </mm-grid>

      <mm-content-section-list>
        <mm-content-section heading-level="3" heading="공통 원칙">
          <mm-text-list
            variant="check"
            .texts=${[
              rule(
                '상호작용 가능성은 형태로 드러낸다',
                '색·밑줄·표면 같은 기표는 장식이나 일반 강조로 쓰지 않는다. — Interaction',
              ),
              rule(
                '선택·피드백·오류 상태는 색상과 함께 아이콘·텍스트·형태·ARIA로 전달한다',
                '색만으로는 색각 이상이나 스크린리더 사용자에게 상태가 전달되지 않는다. — Interaction',
              ),
              rule(
                '열기·선택·검증 같은 상호작용 상태는 컴포넌트가 소유한다',
                '닫힘 처리도 컴포넌트가 맡고, 트리거는 표준 attribute로 대상을 가리키기만 한다. — Interaction',
              ),
              rule(
                '선택 상태는 그룹이 소유한다',
                html`
                  항목이 아니라 그룹이 ${code('value')}·${code('values')}로 상태를 갖고, 옵션 배열은
                  공용 ${code('OptionItem')} 모양을 따른다. — Selection
                `,
              ),
              rule(
                '동종 항목은 계열 그룹 컴포넌트로 묶는다',
                '역할·간격·정렬은 그룹이 소유한다. — Component Level',
              ),
              rule(
                '화면 위로 뜨는 표면은 행동 계약으로 구분한다',
                'modality·dismiss·reference는 컨트롤러가 소유하고, surface·width·placement 같은 외형은 각 컴포넌트가 조합한다. — Overlay',
              ),
            ]}
          ></mm-text-list>
        </mm-content-section>

        <mm-content-section heading-level="3" heading="Component Feature">
          <mm-content-section-list>
            <mm-content-section heading-level="4" heading="Interaction">
              <mm-paragraph>조작을 받아 상태나 화면을 바꿉니다.</mm-paragraph>
              <mm-text-list
                .texts=${[
                  rule(
                    'Interactive - action',
                    '누르면 이동하거나 실행되는 최종 상호작용. 결과는 페이지 이동·정보 구조 변화로도 드러나므로 중복해서 알리지 않는다.',
                  ),
                  rule(
                    'Interactive - selection',
                    '선택 여부를 상태로 유지한다. 미리 선택된 기본값은 편향된 응답을 부를 수 있어 피한다.',
                  ),
                  rule(
                    'Interactive - input',
                    '제한된 선택지가 아니라 자유 형식 값을 받고, 입력 규칙 검증과 오류 표시를 소유한다. 오류는 해당 필드와 연결한다.',
                  ),
                  rule(
                    'Feedback',
                    '사용자 행동이나 시스템 상태의 결과를 알린다. 시스템 오류로 실패하면 무엇이 잘못됐는지 문구로 명확히 설명한다.',
                  ),
                ]}
              ></mm-text-list>
            </mm-content-section>

            <mm-content-section heading-level="4" heading="Presentation">
              <mm-paragraph>
                조작이 주 목적이 아니라, 대상·상태·구조를 보여주거나 화면에 자리 잡고 물러나는
                규칙을 가집니다. 훑는 것만으로 뜻이 파악되게 하고, 레이블은 짧게 쓰되 줄여 표시하지
                않습니다.
              </mm-paragraph>
              <mm-text-list
                .texts=${[
                  rule(
                    'Representative',
                    '사용자·브랜드·객체를 대표하는 시각 정보. 원본이 없거나 실패해도 대체 표현과 대체 텍스트로 형태와 정체성을 유지한다.',
                  ),
                  rule('Statusful', '의미 상태를 톤으로 구분하고 아이콘·텍스트를 함께 준다.'),
                  rule('Structural', '상호작용 없이 반복되는 구조와 경계를 잡는다.'),
                  rule(
                    'Disclosure',
                    '부차적인 정보를 접어 두고 필요할 때만 펼친다. 약관·경고처럼 반드시 읽어야 하는 정보는 펼친 채로 둔다.',
                  ),
                  rule('Modality', '배경 상호작용 차단 여부로 레이어를 규정한다.'),
                ]}
              ></mm-text-list>
            </mm-content-section>
          </mm-content-section-list>
        </mm-content-section>

        <mm-content-section heading-level="3" heading="Component Level">
          <mm-paragraph>
            간격을 비롯한 값은 요소가 속한 구조적 단계에 따라 다른 기준을 갖습니다. 컴포넌트마다
            간격을 따로 판단하지 않고, 소속된 단계에 맞는 토큰만 참조합니다.
          </mm-paragraph>

          <mm-list-item-group>
            <mm-list-item
              icon=${ICON_NAMES.IDLE}
              size="medium"
              label="Element"
              description="단일 UI 유닛 안의 간격. --space-1 ~ --space-2."
            ></mm-list-item>
            <mm-list-item
              icon=${ICON_NAMES.GROUP}
              size="medium"
              label="Group"
              description="같은 컴포넌트를 나열한 리스트. 항목 사이 간격은 기본 --space-2, 조밀한 태그는 --space-1, 이어지는 묶음은 0."
            ></mm-list-item>
            <mm-list-item
              icon=${ICON_NAMES.LIST_VIEW}
              size="medium"
              label="Section"
              description="제목과 본문 사이 --space-3. 섹션끼리의 바깥 간격은 페이지가 --space-section으로 정한다."
            ></mm-list-item>
          </mm-list-item-group>

          <mm-paragraph>Group 컴포넌트: ${codeList(GROUP_COMPONENTS)}</mm-paragraph>
          <mm-paragraph>Section 컴포넌트: ${codeList(SECTION_COMPONENTS)}</mm-paragraph>

          <mm-paragraph>
            Section 컴포넌트는 정해진 조립을 이름으로 감싼 시멘틱 표면으로, 제목 heading 요소와 본문
            슬롯을 묶습니다. 같은 제목·설명 묶음이라도 본문 슬롯 없이 텍스트 한 쌍의 간격만 소유하는
            <mm-code>mm-text-block</mm-code>
            은 이 계층이 아니라 상위 컴포넌트의 내부 부품이며, 문서 섹션으로 세울 때는
            <mm-code>mm-content-section</mm-code>
            을 씁니다.
          </mm-paragraph>

          <mm-paragraph>
            ${code('mm-flex')}·${code('mm-grid')} 같은 조립 레이아웃은 element·group·section 계층
            밖에서 배치만 돕는 유틸리티입니다.
          </mm-paragraph>
        </mm-content-section>
      </mm-content-section-list>
    </mm-flex>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
