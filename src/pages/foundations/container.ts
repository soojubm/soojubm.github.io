import { html } from 'lit'

import '@/components/domains/component/component-pager'
import { ICON_NAMES } from '@/components/common'
import {
  code,
  codeList,
  rule,
  type ComponentReferenceItemData,
} from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

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

const overviewRows = html`
  <tr>
    <th scope="row">${code('mm-flex')}</th>
    <td>가로·세로 한 줄</td>
    <td>소비처가 gap으로 정한다</td>
    <td>페이지·콘텐츠 조립</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-grid')}</th>
    <td>행·열</td>
    <td>소비처가 gap으로 정한다</td>
    <td>반복되는 항목</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-content-section')}</th>
    <td>세로</td>
    <td>제목–본문</td>
    <td>제목이 있는 문서 구획</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-content-section-list')}</th>
    <td>세로</td>
    <td>섹션–섹션</td>
    <td>페이지 구획을 쌓는 자리</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-text-block')}</th>
    <td>세로</td>
    <td>제목–설명</td>
    <td>제목과 설명 한 쌍</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-form-field')}</th>
    <td>세로</td>
    <td>레이블–컨트롤–설명</td>
    <td>textfield가 아닌 컨트롤</td>
  </tr>
`

const contentSectionCode = `<mm-content-section-list>
  <mm-content-section heading-level="3" heading="액션이 없는 섹션">
    <mm-paragraph>제목과 본문 사이 간격은 섹션이, 섹션 사이 간격은 섹션 목록이 소유합니다.</mm-paragraph>
  </mm-content-section>
  <mm-content-section heading-level="3" heading="액션이 있는 섹션">
    <mm-link slot="action" href="./post.html">모두 보기</mm-link>
    <mm-paragraph>제목 줄 오른쪽에 섹션 전체에 걸리는 동작을 둡니다.</mm-paragraph>
  </mm-content-section>
</mm-content-section-list>`

const textBlockCode = `<mm-text-block level="3" heading="제목" description="제목을 보충하는 설명"></mm-text-block>`

const formFieldCode = `<mm-form-field label="관심 주제" optional description="여러 개를 선택할 수 있습니다.">
  <mm-checkbox-group name="topics" .options=\${topicOptions}></mm-checkbox-group>
</mm-form-field>`

const componentReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://ix.siemens.io/docs/components/card-list/guide',
    label: 'Siemens iX - Card list',
    external: true,
  },
]

const main = html`
  <mm-main>
    <mm-page-header
      heading="Container"
      description="자식을 어떤 방향과 간격으로 놓을지 정하는 컴포넌트입니다. 컨테이너는 배치에 대한 책임만 갖고 내용과 상태는 슬롯으로 받은 자식이 들며, 간격은 형제마다 주지 않고 부모의 gap 한 곳에서 정합니다. 피그마의 auto layout·grid와 같은 어휘를 써서 시안과 구현이 같은 배치 규칙으로 읽힙니다."
    ></mm-page-header>

    <mm-content-section-list>
      <mm-notice>
        <mm-text size="14">
          페이지 폭과 배경·표면 대비, 층위는
          <mm-link href="./layout.html">Layout</mm-link>
          이 정합니다. 이 문서는 그 안에서 자식을 묶는 컨테이너를 다룹니다.
        </mm-text>
      </mm-notice>

      <mm-content-section heading-level="3" heading="Overview">
        <mm-table
          .rows=${overviewRows}
          caption="컨테이너별 배치 방향·소유하는 간격·쓰는 자리 비교"
          .columns=${[
            { label: 'UI' },
            { label: '배치' },
            { label: '간격' },
            { label: '쓰는 자리' },
          ]}
        ></mm-table>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="간격 단계">
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
          ${code('mm-text-block')}은 이 계층이 아니라 상위 컴포넌트의 내부 부품이며, 문서 섹션으로
          세울 때는 ${code('mm-content-section')}을 씁니다.
        </mm-paragraph>

        <mm-paragraph>
          ${code('mm-flex')}·${code('mm-grid')} 같은 조립 레이아웃은 element·group·section 계층
          밖에서 배치만 돕는 유틸리티입니다.
        </mm-paragraph>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Flex">
        <mm-paragraph>
          수평·수직 배치는 ${code('mm-flex')}로 하고, gap은 소비처가 정합니다.
        </mm-paragraph>
        <mm-flex-preview></mm-flex-preview>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Grid">
        <mm-paragraph>반복되는 항목은 ${code('mm-grid')}로 늘어놓습니다.</mm-paragraph>
        <mm-text-list
          variant="check"
          .texts=${[
            rule(
              html`
                ${code('columns')}는 최대 열 수로 정한다
              `,
              html`
                한 열이 ${code('column-min-width')}(기본 12rem) 아래로 좁아지면 열 수가 줄어든다.
                기준은 뷰포트가 아니라 그리드가 놓인 컨테이너의 너비라서, 사이드바 옆이나 카드
                안처럼 좁은 자리에서도 같은 규칙으로 줄어든다. 좁은 화면을 위한 열 수는 따로
                지정하지 않는다
              `,
            ),
          ]}
        ></mm-text-list>
        <mm-grid-preview></mm-grid-preview>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Content Section">
        <mm-paragraph>
          ${code('mm-content-section')}은 제목과 본문을 한 묶음으로 세우고 그 사이 간격을
          소유합니다. ${code('heading-level')}은 제목의 단계(h2–h5)와 크기를 정하며, 섹션이 문서
          구조에서 놓인 자리에 맞춰 지정합니다. 섹션끼리의 바깥 간격은
          ${code('mm-content-section-list')}가 정하므로, 페이지는 섹션 사이에 간격을 따로 주지
          않습니다. "모두 보기" 링크처럼 섹션 전체에 걸리는 동작은 ${code('action')} 슬롯으로 받아
          제목 줄 오른쪽에 둡니다.
        </mm-paragraph>
        <mm-surface variant="filled">
          <mm-content-section-list>
            <mm-content-section heading-level="4" heading="액션이 없는 섹션">
              <mm-paragraph>
                제목과 본문 사이 간격은 섹션이, 섹션 사이 간격은 섹션 목록이 소유합니다.
              </mm-paragraph>
            </mm-content-section>
            <mm-content-section heading-level="4" heading="액션이 있는 섹션">
              <mm-link slot="action" href="./post.html">모두 보기</mm-link>
              <mm-paragraph>제목 줄 오른쪽에 섹션 전체에 걸리는 동작을 둡니다.</mm-paragraph>
            </mm-content-section>
          </mm-content-section-list>
        </mm-surface>
        <mm-code-block .code=${contentSectionCode}></mm-code-block>
        <mm-component-notice heading="모두 보기 링크를 받는 섹션">
          ${code('view-all-href')}를 받으면 ${code('action')} 슬롯에 "모두 보기" 링크를 스스로
          채우는 파생 컴포넌트를 둔다. 받지 않으면 기본형과 같다. 이동이라 버튼이 아닌 링크로
          렌더하고, 무엇을 모두 보는지 섹션 제목과 잇는다. 본문이 그리드든 좌우 스크롤이든 섹션은
          관여하지 않는다
        </mm-component-notice>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Text Block">
        <mm-paragraph>
          ${code('mm-text-block')}은 제목과 설명 한 쌍을 세우고 그 사이 간격을 소유합니다. level로
          문서 안의 깊이와 두 텍스트의 크기 단계를 함께 정합니다. 본문을 슬롯으로 받아 구획을 이루는
          자리에는 ${code('mm-content-section')}을 씁니다.
        </mm-paragraph>
        <mm-surface variant="filled">
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
        </mm-surface>
        <mm-code-block .code=${textBlockCode}></mm-code-block>
        <mm-component-notice heading="mm-text-block을 유지할지 삭제할지">
          ${code('mm-page-header')}·${code('mm-feature')}·${code('mm-banner')}처럼 제목–설명 한 쌍을
          그리는 컴포넌트가 이 컴포넌트에 위임한다. 삭제하면 그 컴포넌트들이 제목–설명 간격을 각자
          소유하게 된다. 유지할지 삭제할지 정하지 않았다
        </mm-component-notice>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Form Field">
        <mm-paragraph>
          ${code('mm-form-field')}는 textfield 계열이 아닌 컨트롤에 레이블·설명·검증 텍스트를 같은
          규칙으로 붙입니다. 컨트롤은 슬롯으로 받고 필드는 레이블이 붙은 ${code('role="group"')}이
          됩니다. 컨트롤별 조합은
          <mm-link href="./input.html">Input</mm-link>
          이 전시합니다.
        </mm-paragraph>
        <mm-form-field label="관심 주제" optional description="여러 개를 선택할 수 있습니다.">
          <mm-checkbox-group
            name="container-topics"
            .options=${[
              { value: 'tech', label: '기술' },
              { value: 'design', label: '디자인' },
              { value: 'biz', label: '비즈니스' },
            ]}
          ></mm-checkbox-group>
        </mm-form-field>
        <mm-code-block .code=${formFieldCode}></mm-code-block>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="주의">
        <mm-text-list
          variant="check"
          .texts=${[
            rule(
              html`
                구획은 gap과
                <mm-link href="./separator.html">separator</mm-link>
                중 하나로만 나눈다
              `,
              'separator가 구획을 맡는 컨테이너는 gap을 두지 않고 separator의 자체 간격에 맡긴다. 둘을 겹치면 경계가 두 번 그어진다',
            ),
            rule(
              '컨테이너의 시각 규칙은 컴포넌트 기본 규칙을 따른다',
              '소비처에서 토큰이나 CSS 변수로 재정의하면 같은 컨테이너가 페이지마다 달라진다',
            ),
          ]}
        ></mm-text-list>
      </mm-content-section>

      <mm-component-references .items=${componentReferences}></mm-component-references>
    </mm-content-section-list>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
