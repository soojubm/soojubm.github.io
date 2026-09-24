import { html } from 'lit'

import { renderPage } from '@/components/layouts/base-layouts'
import { POSTS } from '@/pages/mocks'

import '@/components/domains/post'

const DETAIL_HREF = 'post-detail.html'

/* featured는 필터 도입 동안 잠시 뺀다. 되살릴 때 아래 마크업을 page-header 다음에 둔다.
const featured = {
  title: 'Runway enables next-generation content creation with AI and Vercel',
  date: '2024년 3월 23일',
  description:
    '새 레이아웃 엔진, 새 컴포넌트, 커스텀 컬러 팔레트 생성기, 그리고 제로 설정 셋업까지 한 번에.',
}

<mm-post-feature
  href=${DETAIL_HREF}
  thumbnail="/src/images/soojubm.png"
  title=${featured.title}
  description=${featured.description}
  date=${featured.date}
></mm-post-feature>
*/

const postCategories = [...new Set(POSTS.map(post => post.category))]

const categoryFilterOptions = [
  { value: 'all', label: '전체' },
  ...postCategories.map(category => ({ value: category, label: category })),
]

const popularTopics = ['디자인 시스템', '접근성', '웹 컴포넌트', '타이포그래피', '성능', 'AI']

const main = html`
  <mm-main>
    <mm-flex direction="column" gap="12">
      <mm-page-header
        heading="Latest updates"
        description="팀이 직접 전하는 최신 소식을 확인하세요."
      ></mm-page-header>

      <mm-flex direction="column" gap="6">
        <mm-filter-button-group
          aria-label="카테고리"
          .options=${categoryFilterOptions}
          .values=${['all']}
        ></mm-filter-button-group>

        <mm-post-list>
          ${POSTS.map(
            post => html`
              <mm-post-item
                href=${DETAIL_HREF}
                thumbnail="/src/images/soojubm.png"
                title=${post.title}
                category=${post.category}
                date=${post.date}
              ></mm-post-item>
            `,
          )}
        </mm-post-list>

        <mm-show-more-button></mm-show-more-button>
      </mm-flex>

      <mm-content-section heading="인기 주제" heading-level="3">
        <mm-button-group>
          ${popularTopics.map(
            topic => html`
              <mm-hashtag-link>${topic}</mm-hashtag-link>
            `,
          )}
        </mm-button-group>
      </mm-content-section>
    </mm-flex>
  </mm-main>
`

renderPage(main, { closeSidebar: true })
