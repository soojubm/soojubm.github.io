import { html } from 'lit'

import '../cta-arrow.css'
import './newneek-sheet.css'

export const newneekSheet = html`
  <mm-sheet id="sheet-newneek" placement="bottom" width="large" height="90vh">
    <mm-sheet-header heading="뉴닉"></mm-sheet-header>
    <mm-sheet-body>
      <mm-content-section-list>
        <div class="home-mangrove">
          <div>
            <img class="mangrove1" src="/src/images/newneek/home-mangrove1.png" alt="" />
            <img class="mangrove2" src="/src/images/newneek/home-mangrove2.png" alt="" />
          </div>
          <div class="mangrove-foot">
            <mm-text weight="bold">고슴이는 집을 찾을 수 있을까요?</mm-text>
            <div class="cta-arrow">
              <div class="line"></div>
            </div>
          </div>
        </div>

        <section class="today-poll">
          <div>
            <mm-text size="24" weight="bold" centered>오늘 기분 어때요?</mm-text>
            <mm-text centered>
              <span aria-hidden="true">🦔</span>
              고슴이: 고슴이는...!
            </mm-text>
          </div>
          <mm-flex justify-content="center" align-items="center" gap="2">
            <div>
              <figure><span aria-hidden="true">🧒</span></figure>
              <mm-text class="label" size="18" weight="bold">좋아</mm-text>
            </div>
            <div>
              <figure><span aria-hidden="true">👧</span></figure>
              <mm-text class="label" size="18" weight="bold">나쁘지 않아</mm-text>
            </div>
            <div>
              <figure><span aria-hidden="true">👦</span></figure>
              <mm-text class="label" size="18" weight="bold">안 좋아</mm-text>
            </div>
            <div>
              <figure><span aria-hidden="true">👦</span></figure>
              <mm-text class="label" size="18" weight="bold">잘 모르겠어</mm-text>
            </div>
          </mm-flex>
        </section>

        <mm-chat-feed>
          <mm-flex direction="column" gap="4">
            <mm-participant-chat-message name="신규방문자">
              <mm-participant-chat-bubble>
                OOO이 이슈인데 신문은 어렵고 재미없어.
              </mm-participant-chat-bubble>
              <mm-participant-chat-bubble>
                뭐야 이렇게 쉬운 이슈였어? 뉴닉?
              </mm-participant-chat-bubble>
              <mm-participant-chat-bubble>이메일로 구독해보자!</mm-participant-chat-bubble>
            </mm-participant-chat-message>
            <mm-participant-chat-message name="뉴스레터 구독자">
              <mm-participant-chat-bubble>
                예전에 비슷한 이슈가 있었던 것 같은데...
              </mm-participant-chat-bubble>
              <mm-participant-chat-bubble>
                뉴닉이 어떻게 쉽고 재미있게 풀어줬더라?
              </mm-participant-chat-bubble>
              <mm-button-group>
                <mm-button>최신 콘텐츠 탐색</mm-button>
                <mm-button>관심 분야로 탐색</mm-button>
                <mm-button>큐레이션 콘텐츠 탐색</mm-button>
                <mm-button>이슈나 인물로 검색</mm-button>
                <mm-button>관심 콘텐츠 저장</mm-button>
              </mm-button-group>
            </mm-participant-chat-message>
          </mm-flex>
        </mm-chat-feed>

        <div class="zigzag-border" aria-hidden="true"></div>

        <mm-chat-feed>
          <mm-flex direction="column" gap="4">
            <mm-my-chat-message>
              <mm-my-chat-bubble>뉴닉하면 어떤 색이 떠올라요?</mm-my-chat-bubble>
            </mm-my-chat-message>
            <mm-participant-chat-message name="찐뉴니커">
              <mm-participant-chat-bubble>
                후후.. 역시 뉴닉은 회색이죠! 네? 주황색은 본 적이 없는데...
              </mm-participant-chat-bubble>
            </mm-participant-chat-message>
            <mm-my-chat-message>
              <mm-my-chat-bubble>As-is 주황을 버튼에만 사용</mm-my-chat-bubble>
              <mm-my-chat-bubble>
                To-be 주황을 배경색으로 넓게 사용하여 브랜드 아이덴티티를 강화하고 주황색 배경에
                검정색 버튼의 고대비로 주목도를 높이자.
              </mm-my-chat-bubble>
            </mm-my-chat-message>
          </mm-flex>
        </mm-chat-feed>

        <img src="/src/images/newneek-book.png" alt="뉴닉 책 표지" />
      </mm-content-section-list>
    </mm-sheet-body>
  </mm-sheet>
`
