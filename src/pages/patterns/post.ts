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
  <fff-main width="large">
    <fff-page-header
      heading="Latest updates"
      description="팀이 직접 전하는 최신 소식을 확인하세요."
    ></fff-page-header>

    <fff-content-section-list>
      <fff-flex direction="column" gap="4">
        <fff-filter-button-group
          aria-label="카테고리"
          .options=${categoryFilterOptions}
          .values=${['all']}
        ></fff-filter-button-group>
        <fff-post-list>
          ${POSTS.map(
            post => html`
              <fff-post-item
                href=${DETAIL_HREF}
                thumbnail="/src/images/soojubm.png"
                heading-level="3"
                title=${post.title}
                category=${CATEGORIES[post.category].label}
                date=${post.date}
              ></fff-post-item>
            `,
          )}
        </fff-post-list>
        <div style="height:.5rem"></div>
        <fff-show-more-button></fff-show-more-button>
      </fff-flex>
      <fff-content-section heading-level="3" heading="인기 주제">
        <fff-button-group>
          ${TOPICS.map(
            topic => html`
              <fff-hashtag-link>${topic}</fff-hashtag-link>
            `,
          )}
        </fff-button-group>
      </fff-content-section>
    </fff-content-section-list>
  </fff-main>
`

renderPage(main, { closeSidebar: true })
