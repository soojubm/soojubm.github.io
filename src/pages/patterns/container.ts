import { html } from 'lit'

import '@/components/domains/component/component-pager'
import '@/components/domains/component/copy-page-button'
import { renderPage } from '@/components/layouts/base-layouts'

const contentSectionCode = `<mm-content-section-list>
  <mm-content-section heading-level="3" heading="첫 번째 섹션">
    <mm-paragraph>제목과 본문 사이 간격은 섹션이 소유합니다.</mm-paragraph>
  </mm-content-section>
  <mm-content-section heading-level="3" heading="두 번째 섹션">
    <mm-paragraph>섹션 사이 간격은 섹션 목록이 소유합니다.</mm-paragraph>
  </mm-content-section>
</mm-content-section-list>`

const formFieldCode = `<mm-form-field label="관심 주제" optional description="여러 개를 선택할 수 있습니다.">
  <mm-checkbox-group name="topics" .options=\${topicOptions}></mm-checkbox-group>
</mm-form-field>`

const main = html`
  <mm-main>
    <mm-flex justify-content="between" align-items="start" gap="3">
      <mm-page-header
        heading="Container"
        description="자식을 어떤 방향과 간격으로 놓을지 정하는 컴포넌트입니다."
      ></mm-page-header>
      <mm-copy-page-button></mm-copy-page-button>
    </mm-flex>

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
        <mm-content-section heading-level="3" heading="Flex">
          <mm-paragraph>
            수평·수직 배치는
            <mm-code>mm-flex</mm-code>
            로 하고, gap은 소비처가 정합니다. 컴포넌트 shadow DOM 안에서는 중첩하지 않고 host를 직접
            flex 컨테이너로 만들어 shadow 깊이를 줄입니다.
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
            .texts=${[
              html`
                <mm-code>columns</mm-code>
                는 최대 열 수로 정합니다. 한 열이
                <mm-code>column-min-width</mm-code>
                아래로 좁아지면 열 수가 컨테이너 너비를 따라 줄어들므로, 좁은 화면을 위한 열 수를
                따로 지정하지 않습니다.
              `,
            ]}
          ></mm-text-list>
          <mm-grid-preview></mm-grid-preview>
        </mm-content-section>

        <mm-content-section heading-level="3" heading="Content Section">
          <mm-paragraph>
            <mm-code>mm-content-section</mm-code>
            은 제목과 본문을 한 묶음으로 세우고 그 사이 간격을 소유합니다. 제목이 그 묶음을
            대표하므로 heading은 필수이고, heading-level로 문서 안의 깊이를 정합니다. 섹션끼리의
            바깥 간격은
            <mm-code>mm-content-section-list</mm-code>
            가 정하므로, 페이지는 섹션 사이에 여백을 따로 주지 않습니다.
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
            .texts=${[
              html`
                구획은 gap과
                <mm-link href="./separator.html">separator</mm-link>
                중 하나로만 나눕니다. separator가 구획을 맡는 컨테이너는 gap을 두지 않고 separator의
                자체 간격에 맡깁니다.
              `,
              html`
                컨테이너의 시각 규칙은 소비처에서 토큰이나 CSS 변수로 재정의하지 않고 컴포넌트 기본
                규칙을 따릅니다.
              `,
              html`
                <mm-code>display: contents</mm-code>
                는 쓰지 않고 호스트에 역할에 맞는 박스를 명시합니다. 박스가 사라지면 gap과 접근성
                역할이 함께 사라집니다.
              `,
            ]}
          ></mm-text-list>
        </mm-content-section>
      </mm-content-section-list>
    </mm-flex>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
