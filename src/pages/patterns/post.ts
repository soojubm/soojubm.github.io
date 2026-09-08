import { html } from 'lit'

import { renderLayout } from '@/components/layouts/base-layouts'

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
    <style>
      .post-feature {
        display: block;
        color: inherit;
      }
    </style>

    <mm-flex direction="column" gap="10">
      <mm-page-header
        heading="Latest updates"
        description="팀이 직접 전하는 최신 소식을 확인하세요."
      ></mm-page-header>

      <a class="post-feature" href=${DETAIL_HREF}>
        <mm-flex direction="column" gap="3">
          <mm-thumbnail src="/src/images/soojubm.png" ratio="16:9"></mm-thumbnail>
          <mm-text as="time" size="12" color="light">${featured.date}</mm-text>
          <mm-text size="24" weight="bold">${featured.title}</mm-text>
          <mm-paragraph color="light">${featured.description}</mm-paragraph>
        </mm-flex>
      </a>

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

document.addEventListener('DOMContentLoaded', () => {
  renderLayout(main, { closeSidebar: true })
})
