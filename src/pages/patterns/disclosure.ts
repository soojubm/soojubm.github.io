import '@/components/common'
import { html } from 'lit'

import type { ComponentReferenceItemData } from '@/components/domains/component'
import type { TemplateResult } from 'lit'

import { ICON_NAMES } from '@/components/common/icon/icon-names'
import '@/components/common/text/semantics/read-more-paragraph'
import '@/components/domains/faq'
import '@/components/layouts/app-sidebar/sidebar-page-link'
import '@/components/layouts/app-sidebar/sidebar-section'
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

// 규칙에서 벗어나는 사례는 규칙 목록과 섞지 않고 warning notice로 따로 둔다.
const exception = (heading: string, description: string | TemplateResult) => html`
  <mm-notice variant="warning" heading=${heading}>
    <mm-text size="14">${description}</mm-text>
  </mm-notice>
`

const componentReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://www.w3.org/WAI/ARIA/apg/patterns/accordion/',
    label: 'WAI-ARIA APG - Accordion Pattern',
    external: true,
  },
  {
    href: 'https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/',
    label: 'WAI-ARIA APG - Disclosure Pattern',
    external: true,
  },
  {
    href: 'https://nuli.navercorp.com/community/article/1132889',
    label: 'NULI - Web Accessibility',
    external: true,
  },
]

const main = html`
  <mm-main>
    <mm-page-header
      heading="Disclosure"
      description="부차적인 정보를 접어 두었다가 트리거를 눌렀을 때만 펼칩니다. 첫 화면이 제목만으로 짧게 유지되므로, 사용자는 긴 정보 더미를 훑고 관심 있는 것만 골라 읽습니다."
    ></mm-page-header>

    <mm-content-section-list>
      <mm-content-section heading-level="3" heading="Overview">
        <mm-paragraph>
          트리거 바로 아래에서 펼쳐지며 뒤의 콘텐츠를 밀어냅니다. 같은 흐름 안의 부가 공개라
          트리거와 내용이 세로로 이어지고, 레이어로 전환하지 않아 사용자는 읽던 자리를 그대로
          유지합니다. 트리거 옆이나 화면 위로 떠서 덮는 표면은
          <mm-link href="./overlay.html">Overlay</mm-link>
          문서가 다룹니다.
        </mm-paragraph>
      </mm-content-section>

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

      <mm-content-section heading-level="3" heading="형태">
        <mm-paragraph>
          접힌 자리에 무엇을 남기는지로 형태를 고릅니다. 항목을 통째로 접으면 제목만 남아 훑어 고를
          수 있고(${code('mm-faq-item')}), 이어지는 본문을 접으면 앞부분이 남아 읽던 문장을
          이어가며(${code('mm-read-more-paragraph')}), 하위 목록을 접으면 부모 항목만 남아 목록의
          깊이가 한 단계로 줄어듭니다(${code('mm-sidebar-section')}).
        </mm-paragraph>
        <mm-component-example>
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
        </mm-component-example>
        <mm-component-example>
          <mm-read-more-paragraph
            max-length="80"
            content="접힌 자리에 앞부분이 남아 있어, 사용자는 이 문단을 계속 읽을지 여기서 멈출지 본문을 보고 정합니다. 훑어 고르는 목록과 달리 문장이 이어지므로 트리거는 문단 끝에 이어 붙습니다."
          ></mm-read-more-paragraph>
        </mm-component-example>
        <mm-component-example>
          <div role="list">
            <mm-sidebar-section icon=${ICON_NAMES.PALETTE} label="Foundations" open>
              <mm-sidebar-page-link emoji="#" label="Interaction"></mm-sidebar-page-link>
              <mm-sidebar-page-link emoji="#" label="Disclosure"></mm-sidebar-page-link>
            </mm-sidebar-section>
          </div>
        </mm-component-example>
        <mm-text-list
          variant="check"
          .texts=${[
            rule(
              '트리거 텍스트는 펼칠 내용을 한 문장으로 말한다',
              '"더 보기"처럼 무엇이 열리는지 알 수 없는 문구는 쓰지 않는다',
            ),
            rule(
              '펼친 내용 안의 링크·버튼은 그대로 둔다',
              '내용을 눌러 다시 접히게 하면 그 안의 인터랙션을 쓸 수 없다. 접는 조작은 트리거만 갖는다',
            ),
          ]}
        ></mm-text-list>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="상태">
        <mm-text-list
          variant="check"
          .texts=${[
            rule(
              html`
                열고 닫는 상태는 ${code('DisclosureController')}가 소유한다
              `,
              html`
                트리거 클릭 토글과 ${code('aria-expanded')} 동기화를 컨트롤러가 맡고, 소비자는
                트리거를 표준 attribute로 대상에 연결하기만 한다
              `,
            ),
            rule(
              html`
                펼침 방향은 ${code('mm-expand-indicator')}가 표시한다
              `,
              html`
                ${code('expanded')}를 받아 아이콘 회전으로 반영한다. 컴포넌트마다 다른 아이콘을 직접
                그리지 않는다
              `,
            ),
          ]}
        ></mm-text-list>
        ${exception(
          '다시 접지 않는 펼침은 호스트가 직접 연다',
          html`
            ${code('mm-component-props')}처럼 한 번 펼치면 끝나는 목록은 토글이 없으므로 컨트롤러
            없이 호스트가 ${code('open')}만 켜고, 트리거에 ${code('aria-expanded')}를 반영한 뒤
            트리거를 감춘다
          `,
        )}
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
              html`
                접힌 내용은 ${code('inert')}로 포커스에서 뺀다
              `,
              html`
                높이만 0으로 줄이면 내용이 화면에 없는데도 탭 순서에 남는다.
                ${code('aria-hidden')}은 포커스를 막지 않으므로 ${code('inert')}를 쓴다
              `,
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
