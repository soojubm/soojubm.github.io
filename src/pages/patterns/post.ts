import { html } from 'lit'

import { renderPage } from '@/components/layouts/base-layouts'

import '@/components/domains/post'

const DETAIL_HREF = 'post-detail.html'

interface PostSummary {
  title: string
  category: string
  date: string
}

const featured = {
  title: 'Runway enables next-generation content creation with AI and Vercel',
  date: '2024년 3월 23일',
  description:
    '새 레이아웃 엔진, 새 컴포넌트, 커스텀 컬러 팔레트 생성기, 그리고 제로 설정 셋업까지 한 번에.',
}

const posts: PostSummary[] = [
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
  <mm-main>
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

      <mm-post-list>
        ${posts.map(
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
    </mm-flex>
  </mm-main>
`

renderPage(main, { closeSidebar: true })
