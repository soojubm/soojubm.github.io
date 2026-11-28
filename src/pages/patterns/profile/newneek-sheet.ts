import { html } from 'lit'

import '../cta-arrow.css'
import './newneek-sheet.css'

export const newneekSheet = html`
  <fff-sheet id="sheet-newneek" placement="bottom" width="large" height="90vh">
    <fff-sheet-header heading="뉴닉"></fff-sheet-header>
    <fff-sheet-body>
      <fff-flex direction="column" gap="section">
        <div class="home-mangrove">
          <div>
            <img class="mangrove1" src="/src/images/newneek/home-mangrove1.png" alt="" />
            <img class="mangrove2" src="/src/images/newneek/home-mangrove2.png" alt="" />
          </div>
          <div class="mangrove-foot">
            <fff-text weight="bold">고슴이는 집을 찾을 수 있을까요?</fff-text>
            <div class="cta-arrow">
              <div class="line"></div>
            </div>
          </div>
        </div>

        <section class="today-poll">
          <div>
            <fff-text size="24" weight="bold" centered>오늘 기분 어때요?</fff-text>
            <fff-text centered>
              <span aria-hidden="true">🦔</span>
              고슴이: 고슴이는...!
            </fff-text>
          </div>
          <fff-flex justify-content="center" align-items="center" gap="2">
            <div>
              <figure><span aria-hidden="true">🧒</span></figure>
              <fff-text class="label" size="18" weight="bold">좋아</fff-text>
            </div>
            <div>
              <figure><span aria-hidden="true">👧</span></figure>
              <fff-text class="label" size="18" weight="bold">나쁘지 않아</fff-text>
            </div>
            <div>
              <figure><span aria-hidden="true">👦</span></figure>
              <fff-text class="label" size="18" weight="bold">안 좋아</fff-text>
            </div>
            <div>
              <figure><span aria-hidden="true">👦</span></figure>
              <fff-text class="label" size="18" weight="bold">잘 모르겠어</fff-text>
            </div>
          </fff-flex>
        </section>

        <fff-chat-feed>
          <fff-flex direction="column" gap="4">
            <fff-participant-chat-message name="신규방문자">
              <fff-participant-chat-bubble>
                OOO이 이슈인데 신문은 어렵고 재미없어.
              </fff-participant-chat-bubble>
              <fff-participant-chat-bubble>
                뭐야 이렇게 쉬운 이슈였어? 뉴닉?
              </fff-participant-chat-bubble>
              <fff-participant-chat-bubble>이메일로 구독해보자!</fff-participant-chat-bubble>
            </fff-participant-chat-message>
            <fff-participant-chat-message name="뉴스레터 구독자">
              <fff-participant-chat-bubble>
                예전에 비슷한 이슈가 있었던 것 같은데...
              </fff-participant-chat-bubble>
              <fff-participant-chat-bubble>
                뉴닉이 어떻게 쉽고 재미있게 풀어줬더라?
              </fff-participant-chat-bubble>
              <fff-button-group>
                <fff-button>최신 콘텐츠 탐색</fff-button>
                <fff-button>관심 분야로 탐색</fff-button>
                <fff-button>큐레이션 콘텐츠 탐색</fff-button>
                <fff-button>이슈나 인물로 검색</fff-button>
                <fff-button>관심 콘텐츠 저장</fff-button>
              </fff-button-group>
            </fff-participant-chat-message>
          </fff-flex>
        </fff-chat-feed>

        <div class="zigzag-border" aria-hidden="true"></div>

        <fff-chat-feed>
          <fff-flex direction="column" gap="4">
            <fff-my-chat-message>
              <fff-my-chat-bubble>뉴닉하면 어떤 색이 떠올라요?</fff-my-chat-bubble>
            </fff-my-chat-message>
            <fff-participant-chat-message name="찐뉴니커">
              <fff-participant-chat-bubble>
                후후.. 역시 뉴닉은 회색이죠! 네? 주황색은 본 적이 없는데...
              </fff-participant-chat-bubble>
            </fff-participant-chat-message>
            <fff-my-chat-message>
              <fff-my-chat-bubble>As-is 주황을 버튼에만 사용</fff-my-chat-bubble>
              <fff-my-chat-bubble>
                To-be 주황을 배경색으로 넓게 사용하여 브랜드 아이덴티티를 강화하고 주황색 배경에
                검정색 버튼의 고대비로 주목도를 높이자.
              </fff-my-chat-bubble>
            </fff-my-chat-message>
          </fff-flex>
        </fff-chat-feed>

        <img src="/src/images/newneek-book.png" alt="뉴닉 책 표지" />
      </fff-flex>
    </fff-sheet-body>
  </fff-sheet>
`
