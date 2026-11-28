import { html } from 'lit'

import { ICON_NAMES } from '@/components/common'
import { renderPage } from '@/components/layouts/base-layouts'

// 닫기·재전송 버튼은 이벤트를 구독해야 나타난다. 데모라 동작은 연결하지 않는다.
const handleFeedbackDismiss = () => {}
const handleRetry = () => {}

const main = html`
  <fff-main layout="chat" full-width>
    <fff-chat-room>
      <fff-chat-header>
        <fff-top-bar heading="채팅"></fff-top-bar>
      </fff-chat-header>

      <fff-chat-body>
        <fff-chat-feed>
          <fff-flex direction="column" gap="4">
            <fff-chat-date datetime="2022-05-17"></fff-chat-date>

            <fff-ai-chat-message datetime="2022-05-17T00:00">
              <fff-ai-chat-bubble>
                안녕하세요
                <span aria-hidden="true">👋</span>
                무엇을 도와드릴까요?
              </fff-ai-chat-bubble>
              <fff-ai-chat-bubble>
                오늘 작업하신 내용을 정리해 드릴게요. 필요한 부분이 있으면 말씀해 주세요.
              </fff-ai-chat-bubble>
              <fff-ai-chat-bubble
                .images=${[
                  { src: '/src/images/soojubm.png', alt: '웃고 있는 인물 사진' },
                  { src: '/src/images/prometheus.jpg', alt: '프로메테우스 조각상 사진' },
                ]}
              ></fff-ai-chat-bubble>
            </fff-ai-chat-message>

            <fff-ai-chat-message>
              <fff-ai-chat-bubble>
                <fff-flex direction="column" gap="2">
                  <fff-paragraph>
                    디자인 시스템 토큰은 세 계층으로 구성됩니다. 가장 아래의 글로벌 토큰은 색상
                    팔레트나 간격 단위처럼 값 그 자체를 이름 붙여 보관하고, 그 위의 앨리어스 토큰은
                    "기본 텍스트 색"처럼 쓰임새를 나타내는 의미 이름으로 글로벌 토큰을 가리킵니다.
                  </fff-paragraph>
                  <fff-paragraph>
                    가장 위의 컴포넌트 토큰은 버튼 배경이나 입력창 테두리처럼 특정 컴포넌트가
                    소비하는 값을 앨리어스에 연결합니다. 이렇게 나누면 테마를 바꿀 때 글로벌과
                    앨리어스만 손보면 되고, 컴포넌트는 그대로 유지됩니다. 아래 출처를 참고하세요.
                  </fff-paragraph>
                </fff-flex>
              </fff-ai-chat-bubble>
              <fff-button-group>
                <fff-chat-source
                  href="https://www.figma.com/blog/how-figmas-design-system-scales/"
                  heading="How Figma's Design System Scales"
                  description="Figma 팀이 토큰 구조를 어떻게 계층화했는지 설명하는 공식 블로그 포스트입니다."
                  icon=${ICON_NAMES.FIGMA}
                ></fff-chat-source>
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
            </fff-ai-chat-message>

            <fff-ai-chat-message>
              <fff-process-status-list>
                <fff-process-status variant="success" label="요청을 확인함"></fff-process-status>
                <fff-process-status
                  variant="success"
                  label="관련 자료를 탐색함"
                ></fff-process-status>
                <fff-process-status label="핵심 구조 정리 중"></fff-process-status>
                <fff-process-status variant="pending" label="답변 문장 다듬기"></fff-process-status>
              </fff-process-status-list>

              <fff-chat-confirmation
                message="example.txt 파일을 삭제하려고 합니다. 이 작업을 승인하시겠어요?"
              ></fff-chat-confirmation>

              <fff-chat-attachment label="design-tokens.md" description="정리 완료 · 12KB">
                <fff-button slot="trailing" variant="secondary">열기</fff-button>
              </fff-chat-attachment>
            </fff-ai-chat-message>

            <fff-my-chat-message @retry=${handleRetry}>
              <fff-my-chat-bubble status="failed">
                네트워크 오류로 전송에 실패한 메시지입니다.
              </fff-my-chat-bubble>
            </fff-my-chat-message>

            <fff-my-chat-message datetime="2022-05-17T00:01">
              <fff-my-chat-bubble status="sent">
                감사합니다! 정리된 내용 확인했어요.
              </fff-my-chat-bubble>
              <fff-my-chat-bubble
                .images=${[{ src: '/src/images/prometheus.jpg', alt: '프로메테우스 조각상 사진' }]}
              ></fff-my-chat-bubble>
            </fff-my-chat-message>
          </fff-flex>

          <fff-flex direction="column" gap="4">
            <fff-chat-date datetime="2022-05-18"></fff-chat-date>

            <fff-participant-chat-message
              name="지현"
              avatar-src="/src/images/soojubm.png"
              datetime="2022-05-18T00:03"
            >
              <fff-participant-chat-bubble>
                다중 채팅에서는 아바타와 이름이 말풍선이 아니라 메시지 묶음의 메타 정보가 되는 게
                자연스럽습니다.
              </fff-participant-chat-bubble>
              <fff-participant-chat-bubble>
                같은 사람이 연속으로 보낸 버블도 한 메시지 안에서 묶을 수 있어요.
              </fff-participant-chat-bubble>
              <fff-participant-chat-bubble>
                메시지는 누가 보냈는지를 맡고, 버블은 말풍선 하나를 맡습니다. 같은 사람이 연속으로
                보낸 글은 한 메시지 안에 버블을 여러 개 두면 됩니다.
              </fff-participant-chat-bubble>
              <fff-participant-chat-bubble>
                TODO: 새 메시지가 붙을 때 바닥에 있으면 따라 내려가는 자동 스크롤. 위로 올려 둔
                상태에서 새 메시지가 오면 알려주는 표시.
              </fff-participant-chat-bubble>
            </fff-participant-chat-message>

            <fff-my-chat-message>
              <fff-my-chat-bubble status="read">
                반갑습니다! 오늘도 좋은 하루 보내세요.
              </fff-my-chat-bubble>
            </fff-my-chat-message>

            <fff-participant-chat-message name="지현" avatar-src="/src/images/soojubm.png">
              <fff-participant-chat-bubble typing></fff-participant-chat-bubble>
            </fff-participant-chat-message>
          </fff-flex>
        </fff-chat-feed>
      </fff-chat-body>

      <fff-chat-footer>
        <fff-chat-feedback
          question="이번 대화는 어떤가요?"
          @dismiss=${handleFeedbackDismiss}
        ></fff-chat-feedback>
        <fff-chat-suggestions>
          <fff-chat-suggestion>
            네, 좋아요
            <span aria-hidden="true">👍</span>
          </fff-chat-suggestion>
          <fff-chat-suggestion>다시 설명해 주세요</fff-chat-suggestion>
          <fff-chat-suggestion icon=${ICON_NAMES.DATE}>일정 잡기</fff-chat-suggestion>
          <fff-chat-suggestion>나중에 할게요</fff-chat-suggestion>
        </fff-chat-suggestions>
        <fff-prompt-input
          placeholder="메시지를 입력하세요..."
          model="claude-sonnet"
        ></fff-prompt-input>
      </fff-chat-footer>
    </fff-chat-room>
  </fff-main>
`

renderPage(main, { closeSidebar: true })
