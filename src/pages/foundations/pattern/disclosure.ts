import '@/components/common'
import { html } from 'lit'

import type { ComponentReferenceItemData } from '@/components/domains/component'

import { ICON_NAMES } from '@/components/common'
import { code } from '@/components/domains/component'
import '@/components/domains/faq'
import '@/components/layouts/app-sidebar/sidebar-page-link'
import '@/components/layouts/app-sidebar/sidebar-section'
import '@/components/common/text/semantics/read-more-paragraph'

const disclosureReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/',
    label: 'WAI-ARIA APG - Disclosure Pattern',
    external: true,
  },
  {
    href: 'https://developer.apple.com/design/human-interface-guidelines/components/layout-and-organization/disclosure-controls',
    label: 'Apple HIG - Disclosure Controls',
    external: true,
  },
]

export const disclosurePanel = html`
  <fff-tab-panel value="disclosure">
    <fff-content-section-list>
      <fff-paragraph-group>
        <fff-paragraph>
          부차적인 정보를 접어 두었다가 트리거를 눌렀을 때만 펼칩니다. 첫 화면이 제목만으로 짧게
          유지되므로, 사용자는 긴 정보 더미를 훑고 관심 있는 것만 골라 읽습니다.
        </fff-paragraph>
        <fff-paragraph>
          트리거 바로 아래에서 펼쳐지며 뒤의 콘텐츠를 밀어냅니다. 같은 흐름 안의 부가 공개라
          트리거와 내용이 세로로 이어지고, 레이어로 전환하지 않아 사용자는 읽던 자리를 그대로
          유지합니다.
        </fff-paragraph>
        <fff-text-list
          variant="check"
          .texts=${[
            '훑어서 고르는 목록을 접는다. 자주 묻는 질문, 커리큘럼, 필터처럼 항목이 많고 사용자가 그중 일부만 읽는 콘텐츠가 여기에 해당한다',
            '반드시 읽어야 하는 정보는 접은 상태로 제공하지 않는다. 약관·경고·오류처럼 읽지 않으면 사용자가 손해를 보는 정보가 여기에 해당한다. 접는 것 자체가 목적이 되지 않게 한다',
          ]}
        ></fff-text-list>
      </fff-paragraph-group>

      <fff-content-section heading-level="3" heading="펼침 단서">
        <fff-grid columns="3" gap="6">
          <fff-figure-card
            description="질문·섹션 이름·고른 값처럼 레이블이 내용을 가리키는 트리거 옆에 붙어, 패널 본문·하위 페이지 링크·옵션 목록이 펼쳐진다고 알립니다."
          >
            <fff-flex slot="figure" align-items="center" gap="6">
              <fff-flex direction="column" gap="2" align-items="center">
                <fff-expand-indicator></fff-expand-indicator>
                <fff-caption>접힘</fff-caption>
              </fff-flex>
              <fff-flex direction="column" gap="2" align-items="center">
                <fff-expand-indicator expanded></fff-expand-indicator>
                <fff-caption>펼침</fff-caption>
              </fff-flex>
            </fff-flex>
            <fff-code-tag slot="tags" tone="blue">fff-expand-indicator</fff-code-tag>
            <fff-code-tag slot="tags">fff-faq-item</fff-code-tag>
            <fff-code-tag slot="tags">fff-sidebar-section</fff-code-tag>
            <fff-code-tag slot="tags">fff-select</fff-code-tag>
            <fff-code-tag slot="tags">fff-chat-source</fff-code-tag>
          </fff-figure-card>
          <fff-figure-card
            description="잘린 텍스트를 펼치는 트리거는 레이블이 상태에 따라 바뀌어 펼침을 알립니다. 문단과 함께 있을 때 사용하며, 문단과 구별하려고 볼드체를 쓰되 행동을 유발하는 버튼처럼 보이게 하지 않습니다."
          >
            <fff-flex slot="figure" align-items="center" gap="6">
              <fff-text weight="bold">더 보기</fff-text>
              <fff-text weight="bold">접기</fff-text>
            </fff-flex>
            <fff-code-tag slot="tags" tone="blue">레이블</fff-code-tag>
            <fff-code-tag slot="tags">fff-read-more-button</fff-code-tag>
          </fff-figure-card>
          <fff-figure-card
            description="아이콘만 있는 트리거는 그 아이콘이 내비게이션 메뉴·오버플로 메뉴·검색 패널이 펼쳐진다고 알립니다."
          >
            <fff-flex slot="figure" align-items="center" gap="6">
              <fff-hamburger-button></fff-hamburger-button>
              <fff-more-button></fff-more-button>
            </fff-flex>
            <fff-code-tag slot="tags" tone="blue">아이콘</fff-code-tag>
            <fff-code-tag slot="tags">fff-hamburger-button</fff-code-tag>
            <fff-code-tag slot="tags">fff-more-button</fff-code-tag>
          </fff-figure-card>
        </fff-grid>
      </fff-content-section>

      <fff-content-section
        heading-level="3"
        heading="접근성"
        .texts=${[
          '훑어서 고르는 목록의 트리거는 heading으로 감싼다. 스크린리더가 제목 단위로 질문을 건너뛸 수 있다. heading은 문서 구조만 맡고 트리거의 타이포그래피는 그대로 두며, 레벨은 그 목록이 놓이는 자리에 맞춘다',
          html`
            접힌 내용은 포커스되지 않도록 한다. 시각적으로만 숨기면 화면에 없는 내용이 탭 순서에
            남는다. ${code('inert')}로 포커스와 접근성 트리에서 함께 뺀다
          `,
        ]}
      ></fff-content-section>

      <fff-content-section heading-level="3" heading="컴포넌트 예시">
        <fff-flex direction="column" gap="6">
          <fff-faq-list>
            <fff-faq-item question="서비스를 탈퇴하고 싶어요." open>
              <fff-paragraph>
                마이페이지 → 계정 설정 → 회원 탈퇴 순서로 진행하시면 됩니다. 탈퇴 후 30일간 데이터가
                보관되며 이후 완전히 삭제됩니다.
              </fff-paragraph>
            </fff-faq-item>
            <fff-faq-item question="결제 영수증은 어디서 확인하나요?">
              <fff-paragraph>
                마이페이지 → 결제 내역에서 영수증을 확인하고 다운로드할 수 있습니다.
              </fff-paragraph>
            </fff-faq-item>
          </fff-faq-list>
          <fff-read-more-paragraph
            max-length="80"
            content="접힌 자리에 앞부분이 남아 있어, 사용자는 이 문단을 계속 읽을지 여기서 멈출지 본문을 보고 정합니다. 훑어 고르는 목록과 달리 문장이 이어지므로 트리거는 문단 끝에 이어 붙습니다."
          ></fff-read-more-paragraph>
          <div role="list">
            <fff-sidebar-section icon=${ICON_NAMES.PALETTE} label="Foundations" open>
              <fff-sidebar-page-link emoji="#" label="Interaction"></fff-sidebar-page-link>
              <fff-sidebar-page-link emoji="#" label="Disclosure"></fff-sidebar-page-link>
            </fff-sidebar-section>
          </div>
        </fff-flex>
      </fff-content-section>

      <fff-component-references .items=${disclosureReferences}></fff-component-references>
    </fff-content-section-list>
  </fff-tab-panel>
`
