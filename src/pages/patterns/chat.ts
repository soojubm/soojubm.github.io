import { html } from 'lit'

import { ICON_NAMES } from '@/components/common'
import { renderPage } from '@/components/layouts/base-layouts'

// 반응·재전송·중단 버튼은 이벤트를 구독해야 나타난다. 데모라 동작은 연결하지 않는다.
const handleChatReaction = () => {}
const handleRetry = () => {}
const handleStop = () => {}

const main = html`
  <mm-main layout="chat" full-width>
    <mm-chat-room>
      <mm-chat-header>
        <mm-top-bar heading="채팅"></mm-top-bar>
      </mm-chat-header>

      <mm-chat-body>
        <mm-chat-feed>
          <mm-flex direction="column" gap="4">
            <mm-chat-date datetime="2022-05-17"></mm-chat-date>

            <mm-ai-chat-message datetime="2022-05-17T00:00" @chat-reaction=${handleChatReaction}>
              <mm-ai-chat-bubble>
                안녕하세요
                <mm-text aria-hidden="true">👋</mm-text>
                무엇을 도와드릴까요?
              </mm-ai-chat-bubble>
              <mm-ai-chat-bubble>
                오늘 작업하신 내용을 정리해 드릴게요. 필요한 부분이 있으면 말씀해 주세요.
              </mm-ai-chat-bubble>
              <mm-ai-chat-bubble
                .images=${[
                  { src: '/src/images/soojubm.png', alt: '웃고 있는 인물 사진' },
                  { src: '/src/images/prometheus.jpg', alt: '프로메테우스 조각상 사진' },
                ]}
              ></mm-ai-chat-bubble>
            </mm-ai-chat-message>

            <mm-ai-chat-message @chat-reaction=${handleChatReaction}>
              <mm-ai-chat-bubble>
                <mm-flex direction="column" gap="2">
                  <mm-paragraph>
                    디자인 시스템 토큰은 세 계층으로 구성됩니다. 가장 아래의 글로벌 토큰은 색상
                    팔레트나 간격 단위처럼 값 그 자체를 이름 붙여 보관하고, 그 위의 앨리어스 토큰은
                    "기본 텍스트 색"처럼 쓰임새를 나타내는 의미 이름으로 글로벌 토큰을 가리킵니다.
                  </mm-paragraph>
                  <mm-paragraph>
                    가장 위의 컴포넌트 토큰은 버튼 배경이나 입력창 테두리처럼 특정 컴포넌트가
                    소비하는 값을 앨리어스에 연결합니다. 이렇게 나누면 테마를 바꿀 때 글로벌과
                    앨리어스만 손보면 되고, 컴포넌트는 그대로 유지됩니다. 아래 출처를 참고하세요.
                  </mm-paragraph>
                </mm-flex>
              </mm-ai-chat-bubble>
              <mm-button-group>
                <mm-chat-source
                  href="https://www.figma.com/blog/how-figmas-design-system-scales/"
                  heading="How Figma's Design System Scales"
                  description="Figma 팀이 토큰 구조를 어떻게 계층화했는지 설명하는 공식 블로그 포스트입니다."
                  icon=${ICON_NAMES.FIGMA}
                ></mm-chat-source>
                <mm-chat-source
                  href="https://atlassian.design/foundations/design-tokens"
                  heading="Design Tokens – Atlassian Design System"
                  description="Atlassian이 글로벌·앨리어스·컴포넌트 토큰을 어떻게 분리했는지 다룹니다."
                  icon=${ICON_NAMES.BOOK}
                ></mm-chat-source>
                <mm-chat-source
                  href="https://github.com/amzn/style-dictionary"
                  heading="Style Dictionary – Amazon"
                  description="토큰을 플랫폼별 변수로 변환하는 오픈소스 빌드 시스템입니다."
                  label="GitHub"
                  icon=${ICON_NAMES.GITHUB}
                ></mm-chat-source>
              </mm-button-group>
            </mm-ai-chat-message>

            <mm-ai-chat-message>
              <mm-process-status-list>
                <mm-process-status variant="success" label="요청을 확인함"></mm-process-status>
                <mm-process-status variant="success" label="관련 자료를 탐색함"></mm-process-status>
                <mm-process-status label="핵심 구조 정리 중"></mm-process-status>
                <mm-process-status variant="pending" label="답변 문장 다듬기"></mm-process-status>
              </mm-process-status-list>

              <mm-chat-confirmation
                message="example.txt 파일을 삭제하려고 합니다. 이 작업을 승인하시겠어요?"
              ></mm-chat-confirmation>

              <mm-chat-attachment label="design-tokens.md" description="정리 완료 · 12KB">
                <mm-button slot="trailing" variant="secondary">열기</mm-button>
              </mm-chat-attachment>
            </mm-ai-chat-message>

            <mm-my-chat-message failed @retry=${handleRetry}>
              <mm-my-chat-bubble>네트워크 오류로 전송에 실패한 메시지입니다.</mm-my-chat-bubble>
            </mm-my-chat-message>

            <mm-my-chat-message datetime="2022-05-17T00:01">
              <mm-my-chat-bubble status="전송됨">
                감사합니다! 정리된 내용 확인했어요.
              </mm-my-chat-bubble>
              <mm-my-chat-bubble
                .images=${[{ src: '/src/images/prometheus.jpg', alt: '프로메테우스 조각상 사진' }]}
              ></mm-my-chat-bubble>
            </mm-my-chat-message>
          </mm-flex>

          <mm-flex direction="column" gap="4">
            <mm-chat-date datetime="2022-05-18"></mm-chat-date>

            <mm-participant-chat-message
              name="지현"
              avatar-src="/src/images/soojubm.png"
              datetime="2022-05-18T00:03"
            >
              <mm-participant-chat-bubble>
                다중 채팅에서는 아바타와 이름이 말풍선이 아니라 메시지 묶음의 메타 정보가 되는 게
                자연스럽습니다.
              </mm-participant-chat-bubble>
              <mm-participant-chat-bubble>
                같은 사람이 연속으로 보낸 버블도 한 메시지 안에서 묶을 수 있어요.
              </mm-participant-chat-bubble>
            </mm-participant-chat-message>

            <mm-my-chat-message>
              <mm-my-chat-bubble status="읽음">
                반갑습니다! 오늘도 좋은 하루 보내세요.
              </mm-my-chat-bubble>
            </mm-my-chat-message>

            <mm-participant-chat-message name="지현" avatar-src="/src/images/soojubm.png">
              <mm-participant-chat-bubble typing></mm-participant-chat-bubble>
            </mm-participant-chat-message>
          </mm-flex>
        </mm-chat-feed>
      </mm-chat-body>

      <mm-chat-footer>
        <mm-chat-suggestions>
          <mm-chat-suggestion>
            네, 좋아요
            <mm-text aria-hidden="true">👍</mm-text>
          </mm-chat-suggestion>
          <mm-chat-suggestion>다시 설명해 주세요</mm-chat-suggestion>
          <mm-chat-suggestion icon=${ICON_NAMES.DATE}>일정 잡기</mm-chat-suggestion>
          <mm-chat-suggestion>나중에 할게요</mm-chat-suggestion>
        </mm-chat-suggestions>
        <mm-prompt-input
          placeholder="메시지를 입력하세요..."
          model="claude-sonnet"
          loading
          @stop=${handleStop}
        ></mm-prompt-input>
      </mm-chat-footer>
    </mm-chat-room>
  </mm-main>
`

renderPage(main, { closeSidebar: true })
