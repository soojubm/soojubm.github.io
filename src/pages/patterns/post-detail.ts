import { html } from 'lit'

import type { ActionConfig } from '@/types'

import { ICON_NAMES } from '@/components/common'
import './post-detail.css'
import { renderPage } from '@/components/layouts/base-layouts'

import '@/components/domains/post'

const membershipAction: ActionConfig = { label: '멤버십 가입하기' }

const morePosts = [
  {
    title: '새 레이아웃 엔진으로 더 빠르게 화면 조립하기',
    category: '제품',
    date: '2024년 3월 18일',
  },
  {
    title: '디자인 토큰을 테마마다 일관되게 관리하는 방법',
    category: '디자인',
    date: '2024년 2월 27일',
  },
  {
    title: 'Custom color palettes from a single brand color',
    category: '엔지니어링',
    date: '2024년 2월 9일',
  },
  {
    title: '제로 설정 셋업으로 첫 페이지를 배포하기까지',
    category: '가이드',
    date: '2024년 1월 22일',
  },
]

const main = html`
  <mm-main width="small">
    <mm-flex direction="column" gap="8">
      <header class="post-head">
        <mm-flex direction="column" gap="3">
          <mm-link href="post.html">제품</mm-link>
          <mm-heading level="1">
            Runway enables next-generation content creation with AI and Vercel
          </mm-heading>
          <mm-text as="time" color="light">2024년 3월 23일</mm-text>
        </mm-flex>
      </header>

      <mm-thumbnail src="/src/images/soojubm.png" ratio="16:9"></mm-thumbnail>

      <section class="post-body">
        <mm-paragraph-group>
          <mm-text-list
            .texts=${[
              'title',
              'kicker',
              'published date',
              'thumbnail',
              'images',
              'subhead - paragraph / text list / byline / share actions / comment',
            ]}
          ></mm-text-list>
          <mm-paragraph size="large">
            An ecosystem of content that celebrates inclusion and diversity
          </mm-paragraph>
          <mm-paragraph size="large">
            콘텐츠가 다른 플랫폼에 공유되는 횟수가 많다면 페이지의 상단에 byline을 보여주는 것이
            좋다. byline은 상단 고정되지 않기 때문에 byline에 작성 시간과 리딩 시간 등을 포함하는
            것이 좋다.
          </mm-paragraph>
          <mm-paragraph size="large">
            무제한(스트리밍) / 1개 무제한(미디엄) / 여러 개 중 1개 (총 1 페이스북) / 여러 개 중 여러
            개에 각 1번 (깃허브)
          </mm-paragraph>
          <mm-paragraph size="large">
            Vertical scroll progressbar 유행 지난 듯. 전체 윈도우 영영 혹은 본문 영역track, media,
            supporting text(supporter), elevated (hover), 도어메트 네비게이션, 유틸리티
            링크(네비게이션)
          </mm-paragraph>

          <q
            style="display: flex; flex-direction: column; gap: var(--space-4); margin: var(--space-section) 0"
          >
            <mm-paragraph size="large">
              Luxury brands around the world have been connecting with their ideal audience on
              Pinterest: one that is coming to the platform with intent, looking for inspiration to
              curate ideas and refine their taste for which luxury brands to invest in. With 3 in 5
              luxury shoppers saying they use Pinterest to research luxury brands and products,
              these brands have the opportunity to reach this highly engaged audience the moment
              they form an opinion and make a purchase decision.
            </mm-paragraph>
            <address>
              <mm-paragraph size="large">Kelly Emanuelli, Head of Luxury at Pinterest</mm-paragraph>
            </address>
          </q>

          <mm-text size="18" weight="bold" as="span">
            포스트를 수정하고 삭제하기 위한 버튼이 필요하다.
          </mm-text>
          <mm-paragraph size="large">
            신고를 위한 버튼은 처음부터 필요한 기능은 아니기 때문에 뺀다. 작성자에게만 필요한 버튼은
            콘텐츠 내부가 아닌 브라우저의 구석에 눈에 띄게 배치한다. Input zooming on iOS devices ::
            iOS devices will slightly zoom into the input when the font size is less than 16px.
          </mm-paragraph>
          <mm-paragraph size="large">
            leading, name, trailing는 언더스코어(_)로 구분합니다. direction / shape / status / color
            / size trailing에서는 direction, shape, status, color, size 등의 요소를 정의합니다. 2개
            이상의 trailing가 사용되는 경우 direction, shape, status, color, size의 순서로
            작성합니다. trailing에서는 단어를 축약하지 않습니다. status는 에셋의 동작에 따른 상태를
            정의합니다. size는 셋의 크기를 숫자와 단위를 조합하여 작성합니다. 단위는 플랫폼에 맞춰서
            작성합니다. 예시) android → dp, iOS → px, web → px size는 가로를 기준으로 작성하고
            세로는 표기하지 않습니다. 해상도별로 구분해야 하는 경우 1x, 2x를 사용합니다. 제플린과
            같이 프로그램에 의해 자동으로 trailing가 붙는 경우는 1x, 2x 가이드를 따르지 않아도
            됩니다. 이미 배포되어 적용된 에셋에서 trailing가 추가되는 경우, 기존 에셋을 변형하지
            않고 구별자를 추가합니다.
          </mm-paragraph>
        </mm-paragraph-group>
      </section>

      <aside class="post-attract">
        <mm-result
          heading="다음 내용이 궁금하신가요?"
          description="한 달 동안 무료로 모든 콘텐츠를 체험해보세요. 언제든 해지하실 수 있어요."
          .primaryAction=${membershipAction}
        >
          <mm-text-list
            .texts=${[
              'Medium의 모든 회원 전용 스토리에 액세스하세요.',
              '자신에게 중요한 주제에 대해 더 자세히 알아보세요.',
              '수천 가지 질문에 답하는 심층 기사를 받아보세요.',
              '개인적, 직업적 목표를 달성하세요',
            ]}
          ></mm-text-list>
        </mm-result>
        <div class="post-attract-blur"></div>
      </aside>

      <mm-surface variant="elevated" radius="large">
        <mm-flex direction="column" gap="8">
          <mm-button-group>
            <mm-hashtag-link>Webpack</mm-hashtag-link>
            <mm-hashtag-link>HTML5</mm-hashtag-link>
            <mm-hashtag-link>accessibility</mm-hashtag-link>
            <mm-hashtag-link>typography</mm-hashtag-link>
          </mm-button-group>
          <mm-user-item
            size="medium"
            label="수줍이"
            description="Youtube Subscriber"
            avatar-variant="secondary"
            avatar-src="/src/images/soojubm.png"
          ></mm-user-item>
        </mm-flex>
      </mm-surface>
    </mm-flex>
    <mm-separator variant="section"></mm-separator>
    <mm-content-section heading="댓글 192" heading-level="3">
      <mm-flex direction="column" gap="8">
        <mm-comment-input
          placeholder="댓글을 입력해 주세요."
          submit-label="댓글 게시"
        ></mm-comment-input>

        <mm-comment-list>
          <mm-comment-item
            author="수줍이"
            datetime="1 day ago"
            avatar-src="/src/images/soojubm.png"
            reply-label="답글 10개"
            editable
          >
            우와 처음으로 댓글 남겨요! 댓글이 길어지면 어떻게 보일까요? 두 줄로 세 줄로 안녕하세요.
            우와 처음으로 댓글 남겨요! 댓글이 길어지면 어떻게 보일까요? 두 줄로 세 줄로 안녕하세요.
          </mm-comment-item>
          <mm-comment-item
            author="수줍이"
            datetime="1 day ago"
            avatar-src="/src/images/soojubm.png"
            reply-label="답글"
          >
            우와 처음으로 댓글 남겨요! 댓글이 길어지면 어떻게 보일까요? 두 줄로 세 줄로 안녕하세요.
            우와 처음으로 댓글 남겨요! 댓글이 길어지면 어떻게 보일까요? 두 줄로 세 줄로 안녕하세요.
          </mm-comment-item>
        </mm-comment-list>
      </mm-flex>
    </mm-content-section>
  </mm-main>

  <mm-flex as="section" class="post-more" direction="column" gap="4">
    <mm-flex justify-content="between" align-items="center" gap="3">
      <mm-heading level="3">더 읽어보기</mm-heading>
      <mm-link href="post.html">모두 보기</mm-link>
    </mm-flex>
    <mm-post-list>
      ${morePosts.map(
        post => html`
          <mm-post-item
            href="post-detail.html"
            thumbnail="/src/images/soojubm.png"
            title=${post.title}
            category=${post.category}
            date=${post.date}
          ></mm-post-item>
        `,
      )}
    </mm-post-list>
  </mm-flex>

  <nav class="post-pagination" style="margin-block: var(--space-8)">
    <a class="post-pagination-previous" href="post.html">
      <mm-icon name=${ICON_NAMES.BACK} aria-hidden="true"></mm-icon>
      <mm-text-block
        level="3"
        heading="Return to all articles"
        description="목록으로"
      ></mm-text-block>
    </a>
    <a class="post-pagination-next" href="#">
      <mm-icon name=${ICON_NAMES.FORWARD} aria-hidden="true"></mm-icon>
      <mm-text-block
        level="3"
        heading="Avoid invisible text during font loading"
        description="다음 콘텐츠"
      ></mm-text-block>
    </a>
  </nav>
`

renderPage(main, { closeSidebar: true })
