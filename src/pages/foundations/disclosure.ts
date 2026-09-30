import '@/components/common'
import { html } from 'lit'

import { ICON_NAMES } from '@/components/common/icon/icon-names'
import '@/components/common/text/semantics/read-more-paragraph'
import '@/components/domains/faq'
import '@/components/layouts/app-sidebar/sidebar-page-link'
import '@/components/layouts/app-sidebar/sidebar-section'
import '@/components/domains/component/component-pager'
import '@/components/domains/component/component-notice'
import { code, rule, type ComponentReferenceItemData } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

const componentReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://www.w3.org/WAI/ARIA/apg/patterns/accordion/',
    label: 'WAI-ARIA APG - Accordion Pattern',
  },
  {
    href: 'https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/',
    label: 'WAI-ARIA APG - Disclosure Pattern',
  },
  {
    href: 'https://nuli.navercorp.com/community/article/1132889',
    label: 'NULI - Web Accessibility',
  },
]

const expandedComponentRows = html`
  <tr>
    <th scope="row">${code('mm-read-more-button')}</th>
    <td>잘린 텍스트</td>
    <td>미사용</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-hamburger-button')}</th>
    <td>내비게이션 메뉴</td>
    <td>미사용</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-more-button')}</th>
    <td>오버플로 메뉴</td>
    <td>미사용</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-sidebar-section')}</th>
    <td>하위 페이지 링크</td>
    <td>사용</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-select')}</th>
    <td>옵션 목록</td>
    <td>사용</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-navbar-search')}</th>
    <td>검색 패널</td>
    <td>미사용</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-chat-source')}</th>
    <td>출처 상세</td>
    <td>미사용</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-popover')}</th>
    <td>앵커된 패널</td>
    <td>미사용</td>
  </tr>
  <tr>
    <th scope="row">${code('mm-faq-item')}</th>
    <td>패널 본문</td>
    <td>사용</td>
  </tr>
`

const main = html`
  <mm-main>
    <mm-page-header
      heading="Disclosure"
      description="부차적인 정보를 접어 두었다가 트리거를 눌렀을 때만 펼칩니다. 첫 화면이 제목만으로 짧게 유지되므로, 사용자는 긴 정보 더미를 훑고 관심 있는 것만 골라 읽습니다."
    ></mm-page-header>

    <mm-content-section-list>
      <mm-paragraph>
        트리거 바로 아래에서 펼쳐지며 뒤의 콘텐츠를 밀어냅니다. 같은 흐름 안의 부가 공개라 트리거와
        내용이 세로로 이어지고, 레이어로 전환하지 않아 사용자는 읽던 자리를 그대로 유지합니다.
        트리거 옆이나 화면 위로 떠서 덮는 표면은
        <mm-link href="./layout.html">Layout</mm-link>
        문서의 Overlay 탭이 다룹니다.
      </mm-paragraph>

      <mm-content-section heading-level="3" heading="언제 접나요">
        <mm-text-list
          variant="check"
          .texts=${[
            rule(
              '훑어서 고르는 목록을 접는다',
              '자주 묻는 질문, 커리큘럼, 필터처럼 항목이 많고 사용자가 그중 일부만 읽는 콘텐츠가 여기에 해당한다',
            ),
            rule(
              '반드시 읽어야 하는 정보는 disclosure를 쓰지 않는다',
              '약관·경고·오류처럼 읽지 않으면 사용자가 손해를 보는 정보가 여기에 해당한다',
            ),
            rule(
              '모든 항목을 읽어야 하면 접지 않는다',
              '접는 만큼 사용자가 여는 횟수가 늘어난다. 접는 것 자체가 목적이 되지 않게 한다',
            ),
          ]}
        ></mm-text-list>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="펼침 기표">
        <mm-text-list
          variant="check"
          .texts=${[
            rule(
              html`
                펼침 방향은 ${code('mm-expand-indicator')}가 표시한다
              `,
              html`
                컴포넌트마다 다른 아이콘을 직접 그리지 않는다. ${code('expanded')}를 받아 아이콘
                회전으로 반영하는 표시만 맡고, 여닫는 상호작용은 펼치는 컴포넌트가 소유한다
              `,
            ),
          ]}
        ></mm-text-list>
        <mm-surface variant="outlined" radius="large">
          <mm-flex gap="6">
            <mm-flex direction="column" gap="2" align-items="center">
              <mm-expand-indicator></mm-expand-indicator>
              <mm-caption>접힘</mm-caption>
            </mm-flex>
            <mm-flex direction="column" gap="2" align-items="center">
              <mm-expand-indicator expanded></mm-expand-indicator>
              <mm-caption>펼침</mm-caption>
            </mm-flex>
          </mm-flex>
        </mm-surface>
        <mm-table
          .rows=${expandedComponentRows}
          caption="Expanded 컴포넌트와 펼치는 대상"
          .columns=${[
            { label: '컴포넌트', width: '220px' },
            { label: '펼치는 대상' },
            { label: 'mm-expand-indicator', width: '160px' },
          ]}
        ></mm-table>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="DisclosureController">
        <mm-paragraph>
          ${code('DisclosureController')}는 열고 닫는 상태를 소유하고, 트리거 클릭에 따른 토글과
          ${code('aria-expanded')} 동기화를 맡습니다.
        </mm-paragraph>
        <mm-component-notice
          variant="exception"
          heading="DisclosureController를 사용하지 않는 예외 케이스"
        >
          ${code('mm-component-props')}는 한 번 펼치면 다시 접지 않아 토글이 필요 없으므로
          컨트롤러를 쓰지 않는다
        </mm-component-notice>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="접근성">
        <mm-text-list
          variant="check"
          .texts=${[
            rule(
              '훑어서 고르는 목록의 트리거는 heading으로 감싼다',
              '스크린리더가 제목 단위로 질문을 건너뛸 수 있다. heading은 문서 구조만 맡고 트리거의 타이포그래피는 그대로 두며, 레벨은 그 목록이 놓이는 자리에 맞춘다',
            ),
            rule(
              '접힌 내용은 포커스되지 않도록 한다',
              html`
                시각적으로만 숨기면 화면에 없는 내용이 탭 순서에 남는다. ${code('inert')}로 포커스와
                접근성 트리에서 함께 뺀다
              `,
            ),
          ]}
        ></mm-text-list>
      </mm-content-section>

      <mm-component-section heading="컴포넌트 예시">
        <mm-flex direction="column" gap="6">
          <mm-faq-list>
            <mm-faq-item question="서비스를 탈퇴하고 싶어요." open>
              <mm-paragraph>
                마이페이지 → 계정 설정 → 회원 탈퇴 순서로 진행하시면 됩니다. 탈퇴 후 30일간 데이터가
                보관되며 이후 완전히 삭제됩니다.
              </mm-paragraph>
            </mm-faq-item>
            <mm-faq-item question="결제 영수증은 어디서 확인하나요?">
              <mm-paragraph>
                마이페이지 → 결제 내역에서 영수증을 확인하고 다운로드할 수 있습니다.
              </mm-paragraph>
            </mm-faq-item>
          </mm-faq-list>
          <mm-read-more-paragraph
            max-length="80"
            content="접힌 자리에 앞부분이 남아 있어, 사용자는 이 문단을 계속 읽을지 여기서 멈출지 본문을 보고 정합니다. 훑어 고르는 목록과 달리 문장이 이어지므로 트리거는 문단 끝에 이어 붙습니다."
          ></mm-read-more-paragraph>
          <div role="list">
            <mm-sidebar-section icon=${ICON_NAMES.PALETTE} label="Foundations" open>
              <mm-sidebar-page-link emoji="#" label="Interaction"></mm-sidebar-page-link>
              <mm-sidebar-page-link emoji="#" label="Disclosure"></mm-sidebar-page-link>
            </mm-sidebar-section>
          </div>
        </mm-flex>
      </mm-component-section>

      <mm-component-references .items=${componentReferences}></mm-component-references>
    </mm-content-section-list>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
