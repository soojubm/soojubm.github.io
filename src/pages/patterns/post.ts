import { html } from 'lit'

import { renderPage } from '@/components/layouts/base-layouts'

import '@/components/domains/post'

const DETAIL_HREF = 'post-detail.html'

interface PostSummary {
  title: string
  date: string
  description: string
}

const posts: PostSummary[] = Array.from({ length: 5 }, () => ({
  title: 'Runway enables next-generation content creation with AI and Vercel',
  date: '2024년 3월 23일',
  description:
    '새 레이아웃 엔진, 새 컴포넌트, 커스텀 컬러 팔레트 생성기, 그리고 제로 설정 셋업까지 한 번에.',
}))

const [featured, ...rest] = posts

const main = html`
  <mm-page width="small">
    <mm-flex direction="column" gap="12">
      <mm-page-header
        heading="Latest updates"
        description="팀이 직접 전하는 최신 소식을 확인하세요."
      ></mm-page-header>

      <mm-post-feature
        href=${DETAIL_HREF}
        thumbnail="/src/images/soojubm.png"
        title=${featured.title}
        description=${featured.description}
        date=${featured.date}
      ></mm-post-feature>

      <mm-flex direction="column" gap="2">
        ${rest.map(
          post => html`
            <mm-post-item
              href=${DETAIL_HREF}
              thumbnail="/src/images/soojubm.png"
              title=${post.title}
              description=${post.description}
              date=${post.date}
            ></mm-post-item>
          `,
        )}
      </mm-flex>
    </mm-flex>
  </mm-page>
`

renderPage(main, { closeSidebar: true })
