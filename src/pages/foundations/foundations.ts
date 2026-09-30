import { html } from 'lit'

import { rule } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'
import { SITEMAP } from '@/sitemap'

const FOUNDATION_DESCRIPTIONS: Record<string, string> = {
  layout: '페이지·섹션·오버레이가 놓이는 골격과 층위를 정합니다.',
  interaction: '요소가 반응하는 상태와 선택지를 고르는 방식을 정합니다.',
  pattern: '여러 컴포넌트가 이어지는 펼침·검색·모음 흐름을 정합니다.',
  content: '텍스트의 이름과 어조, 아이콘의 뜻을 정합니다.',
}

// 사이드바와 같은 목록에서 만들어, 축을 추가하거나 옮겨도 카드가 빠지지 않는다.
const foundationsNode = SITEMAP.find(node => node.id === 'foundations')
const foundationItems = (
  foundationsNode?.type === 'standalone' ? foundationsNode.children ?? [] : []
).filter(item => item.id !== 'foundations')

const main = html`
  <mm-main>
    <div style="height: var(--size-80)"></div>
    <mm-page-header
      centered
      heading="Foundations"
      description="제품 전체가 공유하는 시각 언어의 기반입니다."
    ></mm-page-header>

    <mm-flex direction="column" gap="16">
      <mm-flex justify-content="center">
        <mm-grid columns="2" gap="4" style="width: 100%; max-width: var(--layout-width-small)">
          ${foundationItems.map(
            ({ id, name }) => html`
              <mm-foundation-item
                href="./${id}.html"
                heading=${name}
                description=${FOUNDATION_DESCRIPTIONS[id]}
              ></mm-foundation-item>
            `,
          )}
        </mm-grid>
      </mm-flex>

      <mm-content-section-list>
        <mm-surface
          variant="filled"
          style="--surface-border-radius: 0; --surface-padding: var(--space-8) 0; --surface-shadow: 0 0 0 100vmax var(--background-subtle-color); clip-path: inset(0 -100vmax)"
        >
          <mm-flex justify-content="center">
            <mm-content-section
              heading-level="3"
              heading="공통 원칙"
              style="width: 100%; max-width: var(--layout-width-small)"
            >
              <mm-text-list
                variant="check"
                .texts=${[
                  rule(
                    '상호작용 가능성은 형태로 드러낸다',
                    html`
                      색·밑줄·표면 같은 기표는 장식이나 일반 강조로 쓰지 않는다. —
                      <mm-link href="./interaction.html">Interaction</mm-link>
                    `,
                  ),
                  rule(
                    '상태는 색상만으로 표현하지 않는다',
                    html`
                      선택·피드백·오류 상태는 아이콘·텍스트·형태·ARIA를 함께 써서 색각 이상이나
                      스크린리더 사용자에게도 전달한다. —
                      <mm-link href="./interaction.html">Interaction</mm-link>
                    `,
                  ),
                  rule(
                    '열기·선택·검증 같은 상호작용 상태는 컴포넌트가 소유한다',
                    html`
                      닫힘 처리도 컴포넌트가 맡고, 트리거는 표준 attribute로 대상을 가리키기만 한다.
                      —
                      <mm-link href="./interaction.html">Interaction</mm-link>
                    `,
                  ),
                  rule(
                    '동종 항목은 계열 그룹 컴포넌트로 묶는다',
                    html`
                      역할·간격·정렬은 그룹이 소유한다. —
                      <mm-link href="./layout.html?tab=group">Layout</mm-link>
                    `,
                  ),
                  rule(
                    '화면 위로 뜨는 표면은 동작과 표현을 분리한다',
                    html`
                      modality·dismiss·reference 같은 동작은 컨트롤러가 소유하고,
                      surface·width·placement 같은 표현은 각 컴포넌트가 조합한다. —
                      <mm-link href="./layout.html?tab=overlay">Layout</mm-link>
                    `,
                  ),
                ]}
              ></mm-text-list>
            </mm-content-section>
          </mm-flex>
        </mm-surface>

        <mm-content-section heading-level="3" heading="Component Feature">
          <mm-grid columns="2" gap="8">
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
                    html`
                      선택 여부를 상태로 유지한다. 기준은
                      <mm-link href="./interaction.html?tab=selection">Selection</mm-link>
                      문서가 정한다.
                    `,
                  ),
                  rule(
                    'Interactive - input',
                    '제한된 선택지가 아니라 자유 형식 값을 받고, 입력 규칙 검증과 오류 표시를 소유한다. 오류는 해당 필드와 연결한다.',
                  ),
                  rule(
                    'Feedback',
                    html`
                      사용자 행동이나 시스템 상태의 결과를 알린다. 기준은
                      <mm-link href="./interaction.html">Interaction</mm-link>
                      문서가 정한다.
                    `,
                  ),
                ]}
              ></mm-text-list>
            </mm-content-section>

            <mm-content-section heading-level="4" heading="Presentation">
              <mm-paragraph>
                대상·상태·구조를 보여주거나 화면에 자리 잡고 물러나는 규칙을 가집니다. 훑는 것만으로
                뜻이 파악되게 하고, 레이블은 짧게 쓰되 줄여 표시하지 않습니다.
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
                    html`
                      부차적인 정보를 접어 두고 필요할 때만 펼친다. 기준은
                      <mm-link href="./pattern.html">Pattern</mm-link>
                      문서가 정한다.
                    `,
                  ),
                  rule('Modality', '배경 상호작용 차단 여부로 레이어를 규정한다.'),
                ]}
              ></mm-text-list>
            </mm-content-section>
          </mm-grid>
        </mm-content-section>
      </mm-content-section-list>
    </mm-flex>
  </mm-main>
`

renderPage(main)
