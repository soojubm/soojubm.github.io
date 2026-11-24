import { html } from 'lit'

import type { AvatarItem } from '@/components/common'
import type { Grid, GridColumns } from '@/components/common/grid/grid'
import type { PortfolioItem } from '@/components/domains/portfolio-item'

import { renderPage } from '@/components/layouts/base-layouts'
import { TOPICS } from '@/pages/mocks'

import './profile.css'
import { newneekSheet } from './newneek-sheet'
import { flatSitemapSheet, letteringSheet, worksSheet } from './portfolio-sheets'

// 그리드 보기의 칼럼 수. 목록 보기에서 돌아올 때도 이 값으로 되돌린다.
const portfolioGridColumns: GridColumns = 4

const followerAvatars: AvatarItem[] = [
  { name: '수줍이', src: '/src/images/soojubm.png' },
  { name: 'Min Ji' },
  { name: '김하늘' },
  {},
]

const main = html`
  <mm-main class="profile" full-width>
    <section class="profile-user">
      <mm-flex direction="column" gap="4">
        <mm-user-snippet
          name="수줍이"
          email="soojubm@gmail.com"
          phone="010 3121 7045"
          description="UI Designer"
          avatar-src="/src/images/soojubm.png"
          tag-label="접속 중"
        ></mm-user-snippet>
  
        <mm-button-group>
          <mm-follow-button></mm-follow-button>
          <mm-button variant="secondary">메시지</mm-button>
        </mm-button-group>
        <mm-read-more-paragraph
          max-length="100"
          content="Sometimes at night, I find myself behind the computer. When I finally blink, a mess of code is drawing random structures on the screen. I spend the rest of the night staring."
        ></mm-read-more-paragraph>
        <mm-keyword-tag-group .keywords=${TOPICS}></mm-keyword-tag-group>
        <mm-flex direction="column" gap="1">
          <mm-meta-item-group gap="2">
            <mm-meta-item layout="inline" label="팔로워" value="621.1K"></mm-meta-item>
            <mm-meta-item layout="inline" label="팔로우 중" value="1,284"></mm-meta-item>
          </mm-meta-item-group>
          <mm-avatar-group
            .avatars=${followerAvatars}
            label="Followed by 수줍이 외 3명"
          ></mm-avatar-group>
        </mm-flex>
      </mm-flex direction="column" gap="2">
      <mm-separator variant="element"></mm-separator>
      <mm-social-links
        compact
        github="https://github.com/soojubm"
        pinterest="https://www.pinterest.co.kr/soojubm/"
        facebook="https://www.facebook.com/soojubm/"
      ></mm-social-links>
    </section>

    <section class="profile-body">
      <mm-flex direction="column" gap="3">
        <mm-tab-list value="projects" variant="pill" search-param="tab">
          <mm-tab value="projects">프로젝트</mm-tab>
          <mm-tab value="second">아티클</mm-tab>
        </mm-tab-list>

        <mm-flex justify-content="space-between" gap="2">
          <mm-view-mode-switcher></mm-view-mode-switcher>
          <mm-sort-selector></mm-sort-selector>
        </mm-flex>

        <mm-tab-panel value="projects">
          <mm-grid columns=${portfolioGridColumns}>
            <mm-portfolio-item
              aria-controls="sheet-newneek"
              aria-haspopup="dialog"
              label="뉴닉"
              description="일정 및 우선순위 수립, 프로덕트 디자인 및 프론트엔드 개발"
              src="/src/images/newneek/gosum-spinner.png"
              badge="최신"
              datetime="2024-06-20"
              .keywords=${['프로젝트관리', '디자인', '프론트엔드개발']}
            ></mm-portfolio-item>

            <mm-portfolio-item
              aria-controls="sheet-etc-works"
              aria-haspopup="dialog"
              label="프리랜서"
              description="웹사이트·프로덕트 디자인 작업"
              src="/src/images/work-studium.jpg"
              datetime="2022-09-12"
              .keywords=${['프리랜서', '디자인', '워드프레스']}
            ></mm-portfolio-item>

            <mm-portfolio-item
              aria-controls="sheet-lettering"
              aria-haspopup="dialog"
              label="레터링"
              description="레터링 작업물"
              src="/src/images/budha.png"
              datetime="2021-02-22"
              .keywords=${['취미생활', '레터링']}
            ></mm-portfolio-item>
          </mm-grid>
        </mm-tab-panel>

        <mm-tab-panel value="second">
          <mm-grid columns=${portfolioGridColumns}>
            <mm-portfolio-item
              aria-controls="sheet-flat_sitemap"
              aria-haspopup="dialog"
              label="Flat sitemap"
              datetime="2023-04-01"
            ></mm-portfolio-item>
          </mm-grid>
        </mm-tab-panel>
      </mm-flex>
    </section>
  </mm-main>

  ${newneekSheet} ${worksSheet} ${letteringSheet} ${flatSitemapSheet}
`

type ViewModeEvent = CustomEvent<{ value: 'grid' | 'list' }>
type SortEvent = CustomEvent<{ value: 'latest' | 'oldest' }>

renderPage(main, {
  closeSidebar: true,
  initialize: () => {
    document
      .querySelector('mm-view-mode-switcher')
      ?.addEventListener('change', handleViewModeSwitcherChange)
    document.querySelector('mm-sort-selector')?.addEventListener('change', handleSortSelectorChange)
  },
})

function handleViewModeSwitcherChange(event: Event) {
  const target = event.target as HTMLElement
  const viewModeEvent = event as ViewModeEvent
  const containerElement = target.closest<HTMLElement>('.profile-body')
  const layout = viewModeEvent.detail.value

  containerElement?.querySelectorAll<PortfolioItem>('mm-portfolio-item').forEach(item => {
    item.layout = layout
  })
  containerElement?.querySelectorAll<Grid>('mm-grid').forEach(gridElement => {
    gridElement.columns = layout === 'list' ? 1 : portfolioGridColumns
  })
}

function handleSortSelectorChange(event: Event) {
  const target = event.target as HTMLElement
  const sortEvent = event as SortEvent
  const containerElement = target.closest<HTMLElement>('.profile-body')

  containerElement?.querySelectorAll<HTMLElement>('mm-grid').forEach(gridElement => {
    const items = Array.from(gridElement.querySelectorAll<HTMLElement>('mm-portfolio-item'))
    items
      .sort((a, b) => {
        const aDate = Date.parse(a.getAttribute('datetime') ?? '')
        const bDate = Date.parse(b.getAttribute('datetime') ?? '')
        return sortEvent.detail.value === 'latest' ? bDate - aDate : aDate - bDate
      })
      .forEach(item => gridElement.append(item))
  })
}
