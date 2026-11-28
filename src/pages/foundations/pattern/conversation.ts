import '@/components/common'
import { html } from 'lit'

import type { ComponentReferenceItemData } from '@/components/domains/component'

import { ICON_NAMES } from '@/components/common'
import { code } from '@/components/domains/component'
import '@/components/domains/component/component-notice'

const conversationReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://pair.withgoogle.com/guidebook/',
    label: 'Google PAIR - People + AI Guidebook',
    external: true,
  },
  {
    href: 'https://www.microsoft.com/en-us/haxtoolkit/',
    label: 'Microsoft - HAX Toolkit',
    external: true,
  },
  {
    href: 'https://www.w3.org/TR/wai-aria-1.2/#log',
    label: 'WAI-ARIA 1.2 - log role',
    external: true,
  },
]

// 데모라 동작은 연결하지 않는다. 이벤트를 구독해야 중단·재전송·닫기 버튼이 나타난다.

const handleGenerationStop = () => {}

const handleMessageRetry = () => {}

const handleFeedbackDismiss = () => {}

export const conversationPanel = html`
  <fff-tab-panel value="conversation">
    <fff-content-section-list>
      <fff-paragraph>
        AI와 질문과 답을 주고받는 흐름입니다. 답을 만드는 동안의 진행, 근거, 승인, 평가, 제안을
        정해진 자리에 놓으므로, 사용자는 답을 기다리는 동안에도 지금 무슨 일이 일어나는지 알 수
        있습니다.
      </fff-paragraph>

      <fff-text-block
        level="3"
        heading="응답의 단계"
        description="한 번의 응답은 생성 중, 응답 완료, 다음 입력 순서로 진행하며 단계마다 보이는 요소가 바뀝니다."
      >
        <fff-flex direction="column" gap="2">
          <fff-tag-group>
            <fff-code-tag tone="gold">생성 중</fff-code-tag>
            <fff-code-tag>fff-process-status-list</fff-code-tag>
            <fff-code-tag>fff-prompt-input</fff-code-tag>
          </fff-tag-group>
          <fff-tag-group>
            <fff-code-tag tone="cyan">응답 완료</fff-code-tag>
            <fff-code-tag>fff-ai-chat-bubble</fff-code-tag>
            <fff-code-tag>fff-chat-source</fff-code-tag>
            <fff-code-tag>fff-chat-attachment</fff-code-tag>
            <fff-code-tag>fff-chat-confirmation</fff-code-tag>
          </fff-tag-group>
          <fff-tag-group>
            <fff-code-tag tone="blue">다음 입력</fff-code-tag>
            <fff-code-tag>fff-chat-feedback</fff-code-tag>
            <fff-code-tag>fff-chat-suggestions</fff-code-tag>
            <fff-code-tag>fff-prompt-input</fff-code-tag>
          </fff-tag-group>
        </fff-flex>
      </fff-text-block>

      <fff-content-section
        heading-level="3"
        heading="생성 중"
        description="답이 나오기 전의 기다림을 채우는 단계입니다."
        .texts=${[
          '진행 단계를 목록으로 보여준다. 아무 변화가 없으면 사용자는 멈춘 것인지 기다려야 하는 것인지 알 수 없다. 끝낸 단계, 진행 중인 단계, 남은 단계를 한 목록에 두어 지금 위치를 알린다',
          html`
            생성을 중단할 수 있게 한다. 잘못 보낸 질문이나 긴 답을 끝까지 기다리게 하면 사용자는
            아무것도 할 수 없다. ${code('fff-prompt-input')}은 ${code('loading')} 동안 전송을 막고,
            ${code('stop')} 이벤트를 구독하면 중단 버튼을 보여준다
          `,
        ]}
      >
        <fff-component-example width="narrow">
          <fff-flex direction="column" gap="4">
            <fff-process-status-list>
              <fff-process-status variant="success" label="요청을 확인함"></fff-process-status>
              <fff-process-status label="관련 자료를 탐색함"></fff-process-status>
              <fff-process-status variant="pending" label="답변 문장 다듬기"></fff-process-status>
            </fff-process-status-list>
            <fff-prompt-input
              loading
              placeholder="메시지를 입력하세요..."
              @stop=${handleGenerationStop}
            ></fff-prompt-input>
          </fff-flex>
        </fff-component-example>
      </fff-content-section>

      <fff-content-section
        heading-level="3"
        heading="출처"
        description="답변이 어디에 근거하는지 밝히는 자료입니다."
        .texts=${[
          '근거 자료는 답변 아래에 출처로 붙인다. 답변만 있으면 사용자는 그 내용을 믿어도 되는지 판단할 수 없다. 출처 이름과 설명이 있어야 자료를 열기 전에 어떤 자료인지 알 수 있다',
        ]}
      >
        <fff-component-example width="narrow">
          <fff-button-group>
            <fff-chat-source
              href="https://atlassian.design/foundations/design-tokens"
              heading="Design Tokens – Atlassian Design System"
              description="Atlassian이 글로벌·앨리어스·컴포넌트 토큰을 어떻게 분리했는지 다룹니다."
              icon=${ICON_NAMES.BOOK}
            ></fff-chat-source>
            <fff-chat-source
              href="https://github.com/amzn/style-dictionary"
              heading="Style Dictionary – Amazon"
              description="토큰을 플랫폼별 변수로 변환하는 오픈소스 빌드 시스템입니다."
              label="GitHub"
              icon=${ICON_NAMES.GITHUB}
            ></fff-chat-source>
          </fff-button-group>
        </fff-component-example>
      </fff-content-section>

      <fff-content-section
        heading-level="3"
        heading="승인 요청"
        description="AI가 사용자의 데이터를 바꾸는 일을 하기 전에 허락을 구하는 단계입니다."
        .texts=${[
          '되돌릴 수 없는 작업은 실행하기 전에 승인을 받는다. 삭제처럼 결과를 돌릴 수 없는 일을 사용자 모르게 실행하면 피해를 복구할 수 없다. 승인과 거부를 한 쌍으로 두어 어느 쪽이든 고를 수 있게 한다',
          '요청 문장에 작업의 대상을 구체적으로 적는다. "이 작업" 같은 말로 쓰면 사용자는 무엇을 승인하는지 모른 채 누르게 된다',
        ]}
      >
        <fff-component-example width="narrow">
          <fff-chat-confirmation
            message="example.txt 파일을 삭제하려고 합니다. 이 작업을 승인하시겠어요?"
          ></fff-chat-confirmation>
        </fff-component-example>
      </fff-content-section>

      <fff-content-section
        heading-level="3"
        heading="전송 실패"
        description="사용자의 메시지가 전달되지 못했을 때의 단계입니다."
        .texts=${[
          html`
            실패한 메시지는 그 자리에서 다시 보낸다. 긴 질문을 처음부터 다시 쓰게 하면 사용자는
            보내기를 포기한다. ${code('fff-my-chat-message')}는 ${code('retry')} 이벤트를 구독하면
            실패한 말풍선 곁에 재전송 버튼을 보여준다
          `,
        ]}
      >
        <fff-component-example width="narrow">
          <fff-my-chat-message @retry=${handleMessageRetry}>
            <fff-my-chat-bubble status="failed">
              네트워크 오류로 전송에 실패한 메시지입니다.
            </fff-my-chat-bubble>
          </fff-my-chat-message>
        </fff-component-example>
      </fff-content-section>

      <fff-content-section
        heading-level="3"
        heading="평가"
        description="답이 도움이 되었는지 사용자에게 묻는 단계입니다."
        .texts=${[
          html`
            평가는 닫을 수 있게 한다. 평가 요청이 남아 있으면 사용자가 답을 읽는 자리를 계속
            차지한다. ${code('dismiss')} 이벤트를 구독하면 닫기 버튼을 보여준다
          `,
        ]}
      >
        <fff-component-example width="narrow">
          <fff-chat-feedback
            question="이번 대화는 어떤가요?"
            @dismiss=${handleFeedbackDismiss}
          ></fff-chat-feedback>
        </fff-component-example>
      </fff-content-section>

      <fff-content-section
        heading-level="3"
        heading="제안"
        description="답에 이어서 사용자가 물을 만한 말을 미리 내놓는 단계입니다."
        .texts=${[
          '제안은 버튼으로 내놓는다. 빈 입력창 앞에서는 무엇을 물어야 할지 막힌다. 답에 이어질 말을 버튼으로 두면 한 번 눌러 대화를 이어 간다',
        ]}
      >
        <fff-component-example width="narrow">
          <fff-chat-suggestions>
            <fff-chat-suggestion>다시 설명해 주세요</fff-chat-suggestion>
            <fff-chat-suggestion icon=${ICON_NAMES.DATE}>일정 잡기</fff-chat-suggestion>
            <fff-chat-suggestion>나중에 할게요</fff-chat-suggestion>
          </fff-chat-suggestions>
        </fff-component-example>
      </fff-content-section>

      <fff-component-notice heading="새 메시지의 자동 스크롤 규칙을 정한다">
        바닥에 있으면 따라 내려가고, 위로 올려 둔 상태에서는 새 메시지를 알리는 방식은 아직 정하지
        않았다
      </fff-component-notice>

      <fff-content-section
        heading-level="3"
        heading="접근성"
        .texts=${[
          html`
            대화 영역은 ${code('role="log"')}로 알린다. 스크린리더가 새 메시지를 따로 찾지 않고도
            읽어 준다. ${code('fff-chat-feed')}가 ${code('role="log"')}와 ${code('aria-label')}을
            직접 갖는다
          `,
          html`
            전송 실패는 ${code('role="alert"')}로 즉시 알린다. 화면을 보지 못하는 사용자도 메시지가
            전달되지 않았다는 사실을 바로 알아야 다시 보낼 수 있다
          `,
          html`
            장식 이모지는 ${code('aria-hidden')}으로 가린다. 스크린리더가 이모지 이름을 읽으면
            문장이 끊겨 들린다
          `,
        ]}
      ></fff-content-section>

      <fff-component-references .items=${conversationReferences}></fff-component-references>
    </fff-content-section-list>
  </fff-tab-panel>
`
