import { html } from 'lit'

import { code, rule } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

const main = html`
  <mm-main>
    <mm-page-header
      heading="Conventions"
      description="코드와 문서를 쓰는 방식을 정합니다. 작업 규칙을 한 곳에서 정하므로, 누가 만들어도 같은 구조와 이름으로 읽힙니다."
    ></mm-page-header>

    <mm-page-body>
      <mm-tab-list value="code" variant="text" search-param="tab">
        <mm-tab value="code">Code</mm-tab>
        <mm-tab value="documentation">Documentation</mm-tab>
      </mm-tab-list>

      <mm-tab-panel value="code">
        <mm-content-section-list>
          <mm-content-section heading-level="3" heading="공통 코딩 스타일">
            <mm-paragraph>
              들여쓰기·세미콜론처럼 ESLint와 Prettier가 처리하는 규칙은 도구에 맡깁니다.
            </mm-paragraph>
            <mm-text-list
              variant="check"
              .texts=${[
                rule(
                  html`
                    이벤트 핸들러 함수는 ${code('handle')} 접두사를 쓴다
                  `,
                  html`
                    ${code('handleClick')}, ${code('handleSubmit')}
                  `,
                ),
                rule(
                  html`
                    컴포넌트의 이벤트 콜백 props는 ${code('on')} 접두사를 쓴다
                  `,
                  html`
                    ${code('onClick')}, ${code('onSubmit')}
                  `,
                ),
              ]}
            ></mm-text-list>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="Lit 코딩 스타일">
            <mm-text-list
              variant="check"
              .texts=${[
                rule(
                  html`
                    host의 role이 고정값이면 ${code('connectedCallback')}에서 지정한다
                  `,
                  html`
                    ${code("setAttribute('role', ...)")}로 지정하고, 외부에서 바꿀 수 있어야 할 때만
                    ${code('role')} prop으로 공개한다
                  `,
                ),
                rule(
                  html`
                    복잡해진 조건부 DOM은 ${code('render*()')} 메서드로 분리한다
                  `,
                  html`
                    ${code('render()')}에서는 해당 메서드를 직접 호출해 전체 구조를 드러내고, 메서드
                    이름은 UI 조각의 의미를 드러낸다. 예: ${code('renderContent()')} 대신
                    ${code('renderImage()')}
                  `,
                ),
              ]}
            ></mm-text-list>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="공통 동작의 분리">
            <mm-text-list
              variant="check"
              .texts=${[
                rule(
                  '같은 동작 로직을 두 곳 이상에서 쓰면 훅이나 컨트롤러로 분리한다',
                  '시각적 표현은 분리하지 않고 아래 방식으로 재사용하므로, 컴포넌트별 표현은 유지하면서 공통 동작을 일관되게 쓸 수 있다',
                ),
              ]}
            ></mm-text-list>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="컴포넌트 조합/합성">
            <mm-paragraph>
              다른 컴포넌트를 재사용해 만들 때는 재사용할 컴포넌트의 역할에 따라 방식을 고릅니다.
              단순한 시각 요소는 그 컴포넌트를 직접 렌더링하고, 상호작용이나 접근성 의미가 있으면
              컴포넌트를 중첩하지 않고 공유 스타일과 템플릿만 재사용합니다.
            </mm-paragraph>
            <mm-text-list
              variant="check"
              .texts=${[
                html`
                  ${code('mm-current-indicator')}는 ${code('mm-dot')}을 렌더링한다.
                `,
                html`
                  ${code('mm-dismiss-button')}은 ${code('iconButtonStyles')}와
                  ${code('renderIconButton')}을 조합한다.
                `,
              ]}
            ></mm-text-list>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="Prop 이름">
            <mm-paragraph>
              한 prop이 종류가 다른 값을 받으면 값을 더할 때마다 어느 쪽인지 다시 따져야 하고, 같은
              이름이 컴포넌트마다 다르게 동작합니다. 축마다 이름을 따로 두면 조합이 곱으로 늘지
              않습니다.
            </mm-paragraph>
            <mm-text-list
              variant="check"
              .texts=${[
                html`
                  ${code('variant')}는 강조 단계(primary·secondary·tertiary)만 뜻한다.
                `,
                html`
                  ${code('tone')}은 색 팔레트(pink·cyan 등)만 뜻한다.
                `,
                rule(
                  html`
                    파괴적 의도는 ${code('destructive')} boolean으로 분리한다
                  `,
                  '값이 하나뿐인 의도라서, 강조 단계는 그대로 두고 의도만 얹을 수 있다',
                ),
              ]}
            ></mm-text-list>
          </mm-content-section>
        </mm-content-section-list>
      </mm-tab-panel>

      <mm-tab-panel value="documentation">
        <mm-content-section-list>
          <mm-content-section heading-level="3" heading="문서화 기준">
            <mm-paragraph>모든 것을 문서화하지 않습니다.</mm-paragraph>
            <mm-text-list
              variant="check"
              .texts=${[
                '문서화할 가치가 있다고 판단하려면 특정 횟수(예: 3회)만큼 발생해야 합니까?',
                '자주(예: 월 1회 이상) 프로세스를 수행해야 합니까?',
              ]}
            ></mm-text-list>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="컴포넌트 페이지의 헤더 디스크립션">
            <mm-text-list
              variant="check"
              .texts=${[
                '컴포넌트 페이지 설명은 무엇인지, 어떻게 동작하는지, 사용자에게 어떤 이득인지 순서로 쓴다.',
              ]}
            ></mm-text-list>
          </mm-content-section>
          <!-- <mm-content-section heading-level="3" heading="Prop 표">
            <mm-text-list
              variant="check"
              .texts=${[
            '컴포넌트 페이지의 prop 표는 손으로 적지 않는다. 스크립트가 컴포넌트 코드의 @property 선언을 읽어 표를 만든다(npm run manifest). 이름·타입·기본값이 코드 한 곳에서 나오므로 문서가 구현과 어긋나지 않는다.',
            '이벤트·slot·메서드는 선언에서 읽을 수 없어 페이지에 손으로 덧붙인다.',
            '부모가 대신 채우는 prop은 선언에 @internal을 달아 표에서 뺀다. 예: mm-step이 번호를 매기는 mm-step-item의 value',
            '만든 결과(src/generated)는 커밋하지 않는다. 설치·개발 서버·빌드 때마다 새로 만든다.',
          ]}
            ></mm-text-list>
          </mm-content-section> -->
        </mm-content-section-list>
      </mm-tab-panel>
    </mm-page-body>
  </mm-main>
`

renderPage(main)
