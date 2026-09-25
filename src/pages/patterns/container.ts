import { html } from 'lit'

import type { ComponentReferenceItemData } from '@/components/domains/component'
import type { TemplateResult } from 'lit'

import '@/components/domains/component/component-pager'
import { renderPage } from '@/components/layouts/base-layouts'

// 앞뒤 공백이 문장 안 여백으로 렌더되지 않도록 한 줄로 둔다.
// prettier-ignore
const code = (name: string) => html`<mm-code>${name}</mm-code>`

// 목록 항목은 해야 할 일을 굵은 한 줄로 먼저 두고 설명을 잇는다.
const rule = (title: string | TemplateResult, description: string | TemplateResult) => html`
  <span>
    <mm-text weight="bold">${title}</mm-text>
    ${description}
  </span>
`

const overviewRows = html`
  <tr>
    <th scope="row">${code('mm-flex')}</th>
    <td>가로·세로 한 줄</td>
    <td>소비처가 gap으로 정한다</td>
    <td>페이지·콘텐츠 조립</td>
    <td>302회 · 62쪽</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-grid')}</th>
    <td>행·열</td>
    <td>소비처가 gap으로 정한다</td>
    <td>반복되는 항목</td>
    <td>34회 · 14쪽</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-content-section')}</th>
    <td>세로</td>
    <td>제목–본문</td>
    <td>제목이 있는 문서 구획</td>
    <td>95회 · 19쪽</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-content-section-list')}</th>
    <td>세로</td>
    <td>섹션–섹션</td>
    <td>섹션 여러 개를 쌓는 자리</td>
    <td>21회 · 16쪽</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-text-block')}</th>
    <td>세로</td>
    <td>제목–설명</td>
    <td>제목과 설명 한 쌍</td>
    <td>6회 · 2쪽</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-form-field')}</th>
    <td>세로</td>
    <td>레이블–컨트롤–설명</td>
    <td>textfield가 아닌 컨트롤</td>
    <td>16회 · 6쪽</td>
  </tr>
`

const contentSectionCode = `<mm-content-section-list>
  <mm-content-section heading-level="3" heading="첫 번째 섹션">
    <mm-paragraph>제목과 본문 사이 간격은 섹션이 소유합니다.</mm-paragraph>
  </mm-content-section>
  <mm-content-section heading-level="3" heading="두 번째 섹션">
    <mm-paragraph>섹션 사이 간격은 섹션 목록이 소유합니다.</mm-paragraph>
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
      description="자식을 어떤 방향과 간격으로 놓을지 정하는 컴포넌트입니다."
    ></mm-page-header>

    <mm-flex direction="column" gap="8">
      <mm-paragraph-group>
        <mm-paragraph>
          컨테이너는 레이아웃에 대한 책임만 갖습니다. 내용과 상태는 슬롯으로 받은 자식이 들고 있고,
          간격도 형제마다 주지 않고 부모의 gap 한 곳에서 정합니다.
        </mm-paragraph>
        <mm-paragraph>
          피그마도 요소를 절대 좌표에 놓던 방식에서 auto layout으로, 다시 grid로 옮겨오며
          방향·간격·패딩을 부모 프레임이 소유하게 했습니다. 시안과 구현이 같은 어휘를 씁니다.
        </mm-paragraph>
      </mm-paragraph-group>

      <mm-notice>
        <mm-text size="14">
          페이지 폭과 배경·표면 대비, 층위는
          <mm-link href="./layout.html">Layout</mm-link>
          이 정합니다. 이 문서는 그 안에서 자식을 묶는 컨테이너를 다룹니다.
        </mm-text>
      </mm-notice>

      <mm-content-section-list>
        <mm-content-section heading-level="3" heading="Overview">
          <mm-table
            .rows=${overviewRows}
            caption="컨테이너별 배치 방향·소유하는 간격·쓰는 자리·사용 횟수 비교"
            .columns=${[
              { label: 'UI' },
              { label: '배치' },
              { label: '간격' },
              { label: '쓰는 자리' },
              { label: '사용' },
            ]}
          ></mm-table>
        </mm-content-section>

        <mm-content-section heading-level="3" heading="Flex">
          <mm-paragraph>
            수평·수직 배치는
            <mm-code>mm-flex</mm-code>
            로 하고, gap은 소비처가 정합니다.
          </mm-paragraph>
          <mm-flex-preview></mm-flex-preview>
        </mm-content-section>

        <mm-content-section heading-level="3" heading="Grid">
          <mm-paragraph>
            반복되는 항목은
            <mm-code>mm-grid</mm-code>
            로 늘어놓습니다.
          </mm-paragraph>
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
              rule(
                html`
                  열 너비에 상한이 필요하면 ${code('column-max-width')}를 준다
                `,
                html`
                  열 수를 ${code('columns')}로 고정하고 뷰포트 너비에 따라 단계적으로 줄인다. 1560px
                  이하에서 6열은 4열로, 800px 이하에서 3열 이상은 2열로, 480px 이하에서는 모두 1열이
                  된다
                `,
              ),
            ]}
          ></mm-text-list>
          <mm-grid-preview></mm-grid-preview>
        </mm-content-section>

        <mm-content-section heading-level="3" heading="Content Section">
          <mm-paragraph>
            <mm-code>mm-content-section</mm-code>
            은 제목과 본문을 한 묶음으로 세우고 그 사이 간격을 소유합니다.
            <mm-code>heading-level</mm-code>
            은 제목의 단계(h2–h5)와 크기를 정하며, 섹션이 문서 구조에서 놓인 자리에 맞춰 지정합니다.
            섹션끼리의 바깥 간격은
            <mm-code>mm-content-section-list</mm-code>
            가 정하므로, 페이지는 섹션 사이에 간격을 따로 주지 않습니다.
          </mm-paragraph>
          <mm-surface variant="filled">
            <mm-content-section-list>
              <mm-content-section heading-level="4" heading="첫 번째 섹션">
                <mm-paragraph>제목과 본문 사이 간격은 섹션이 소유합니다.</mm-paragraph>
              </mm-content-section>
              <mm-content-section heading-level="4" heading="두 번째 섹션">
                <mm-paragraph>섹션 사이 간격은 섹션 목록이 소유합니다.</mm-paragraph>
              </mm-content-section>
            </mm-content-section-list>
          </mm-surface>
          <mm-code-block .code=${contentSectionCode}></mm-code-block>
        </mm-content-section>

        <mm-content-section heading-level="3" heading="Text Block">
          <mm-paragraph>
            <mm-code>mm-text-block</mm-code>
            은 제목과 설명 한 쌍을 세우고 그 사이 간격을 소유합니다. level로 문서 안의 깊이와 두
            텍스트의 크기 단계를 함께 정합니다. 본문을 슬롯으로 받아 구획을 이루는 자리에는
            <mm-code>mm-content-section</mm-code>
            을 씁니다.
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
        </mm-content-section>

        <mm-content-section heading-level="3" heading="Form Field">
          <mm-paragraph>
            <mm-code>mm-form-field</mm-code>
            는 textfield 계열이 아닌 컨트롤에 레이블·설명·검증 텍스트를 같은 규칙으로 붙입니다.
            컨트롤은 슬롯으로 받고 필드는 레이블이 붙은
            <mm-code>role="group"</mm-code>
            이 됩니다. 컨트롤별 조합은
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
    </mm-flex>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
