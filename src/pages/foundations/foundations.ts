import { html } from 'lit'

import '@/components/domains/component/component-pager'
import { rule } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'
import { SITEMAP } from '@/sitemap'

const FOUNDATION_DESCRIPTIONS: Record<string, string> = {
  layout: '페이지 너비와 배경·표면 대비로 페이지의 성격과 작업 맥락을 담습니다.',
  interaction: '상호작용할 수 있는 요소와 그 반응 상태를 정의합니다.',
  disclosure: '접어 둔 부차 정보를 트리거로 펼치는 형태, 상태 소유, 접근성을 정의합니다.',
  selection: '선택지를 고르는 컴포넌트의 선택 기준, 상태 소유, 옵션 모양을 정의합니다.',
  search: '키워드로 콘텐츠를 찾는 흐름의 단계별 제안과 결과 처리 방식을 정의합니다.',
  collection: '사용자가 만든 묶음에 항목을 담고 묶음을 만들고 관리하는 흐름을 정의합니다.',
  content: '텍스트 슬롯의 이름과 어조, 스캔 가능한 문구 원칙입니다.',
  iconography: '아이콘은 뜻을 지닐 때만 쓰고, 쓰이는 역할과 아이콘 목록을 한 곳에서 정합니다.',
}

// 사이드바와 같은 목록에서 만들어, 축을 추가하거나 옮겨도 카드가 빠지지 않는다.
const foundationsNode = SITEMAP.find(node => node.id === 'foundations')
const foundationItems = (
  foundationsNode?.type === 'standalone' ? foundationsNode.children ?? [] : []
).filter(item => item.id !== 'foundations')

const main = html`
  <mm-main>
    <mm-page-header
      heading="Foundations"
      description="제품 전체가 공유하는 시각 언어의 기본 축입니다. 각 문서가 하나의 축을 정의합니다."
    ></mm-page-header>

    <mm-flex direction="column" gap="16">
      <mm-grid columns="3" gap="4">
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

      <mm-content-section-list>
        <mm-content-section heading-level="3" heading="공통 원칙">
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
                  닫힘 처리도 컴포넌트가 맡고, 트리거는 표준 attribute로 대상을 가리키기만 한다. —
                  <mm-link href="./interaction.html">Interaction</mm-link>
                `,
              ),
              rule(
                '동종 항목은 계열 그룹 컴포넌트로 묶는다',
                html`
                  역할·간격·정렬은 그룹이 소유한다. —
                  <mm-link href="./layout.html">Layout</mm-link>
                `,
              ),
              rule(
                '화면 위로 뜨는 표면은 동작과 표현을 분리한다',
                html`
                  modality·dismiss·reference 같은 동작은 컨트롤러가 소유하고,
                  surface·width·placement 같은 표현은 각 컴포넌트가 조합한다. —
                  <mm-link href="./layout.html">Layout</mm-link>
                `,
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
                    html`
                      선택 여부를 상태로 유지한다. 기준은
                      <mm-link href="./selection.html">Selection</mm-link>
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
                      <mm-link href="./disclosure.html">Disclosure</mm-link>
                      문서가 정한다.
                    `,
                  ),
                  rule('Modality', '배경 상호작용 차단 여부로 레이어를 규정한다.'),
                ]}
              ></mm-text-list>
            </mm-content-section>
          </mm-content-section-list>
        </mm-content-section>
      </mm-content-section-list>
    </mm-flex>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
