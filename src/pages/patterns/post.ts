import { html } from 'lit'

import { renderPage } from '@/components/layouts/base-layouts'
import { CATEGORIES, POSTS, TOPICS } from '@/pages/mocks'

import '@/components/domains/post'

const DETAIL_HREF = 'post-detail.html'

const postCategories = [...new Set(POSTS.map(post => post.category))]

const categoryFilterOptions = [
  { value: 'all', label: '전체' },
  ...postCategories.map(category => ({ value: category, label: CATEGORIES[category].label })),
]

const main = html`
  <mm-main>
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
              heading-level="2"
              title=${post.title}
              category=${CATEGORIES[post.category].label}
              date=${post.date}
            ></mm-post-item>
          `,
        )}
      </mm-post-list>

      <mm-show-more-button></mm-show-more-button>
    </mm-flex>

    <mm-separator variant="section"></mm-separator>
    <mm-content-section heading="인기 주제">
      <mm-button-group>
        ${TOPICS.map(
          topic => html`
            <mm-hashtag-link>${topic}</mm-hashtag-link>
          `,
        )}
      </mm-button-group>
    </mm-content-section>
  </mm-main>
`

renderPage(main, { closeSidebar: true })
