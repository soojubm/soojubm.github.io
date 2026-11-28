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
  <fff-main class="profile" full-width>
    <section class="profile-user">
      <fff-flex direction="column" gap="4">
        <fff-user-snippet
          name="수줍이"
          email="soojubm@gmail.com"
          phone="010 3121 7045"
          description="UI Designer"
          avatar-src="/src/images/soojubm.png"
          tag-label="접속 중"
        ></fff-user-snippet>
  
        <fff-button-group>
          <fff-follow-button></fff-follow-button>
          <fff-button variant="secondary">메시지</fff-button>
        </fff-button-group>
        <fff-read-more-paragraph
          max-length="100"
          content="Sometimes at night, I find myself behind the computer. When I finally blink, a mess of code is drawing random structures on the screen. I spend the rest of the night staring."
        ></fff-read-more-paragraph>
        <fff-keyword-tag-group .keywords=${TOPICS}></fff-keyword-tag-group>
        <fff-flex direction="column" gap="1">
          <fff-meta-item-group gap="2">
            <fff-meta-item layout="inline" label="팔로워" value="621.1K"></fff-meta-item>
            <fff-meta-item layout="inline" label="팔로우 중" value="1,284"></fff-meta-item>
          </fff-meta-item-group>
          <fff-avatar-group
            .avatars=${followerAvatars}
            label="Followed by 수줍이 외 3명"
          ></fff-avatar-group>
        </fff-flex>
      </fff-flex direction="column" gap="2">
      <fff-separator variant="element"></fff-separator>
      <fff-social-links
        compact
        github="https://github.com/soojubm"
        pinterest="https://www.pinterest.co.kr/soojubm/"
        facebook="https://www.facebook.com/soojubm/"
      ></fff-social-links>
    </section>

    <section class="profile-body">
      <fff-flex direction="column" gap="3">
        <fff-tab-list value="projects" variant="pill" search-param="tab">
          <fff-tab value="projects">프로젝트</fff-tab>
          <fff-tab value="second">아티클</fff-tab>
        </fff-tab-list>

        <fff-flex justify-content="space-between" gap="2">
          <fff-view-mode-switcher></fff-view-mode-switcher>
          <fff-sort-selector></fff-sort-selector>
        </fff-flex>

        <fff-tab-panel value="projects">
          <fff-grid columns=${portfolioGridColumns}>
            <fff-portfolio-item
              aria-controls="sheet-newneek"
              aria-haspopup="dialog"
              label="뉴닉"
              description="일정 및 우선순위 수립, 프로덕트 디자인 및 프론트엔드 개발"
              src="/src/images/newneek/gosum-spinner.png"
              badge="최신"
              datetime="2024-06-20"
              .keywords=${['프로젝트관리', '디자인', '프론트엔드개발']}
            ></fff-portfolio-item>

            <fff-portfolio-item
              aria-controls="sheet-etc-works"
              aria-haspopup="dialog"
              label="프리랜서"
              description="웹사이트·프로덕트 디자인 작업"
              src="/src/images/work-studium.jpg"
              datetime="2022-09-12"
              .keywords=${['프리랜서', '디자인', '워드프레스']}
            ></fff-portfolio-item>

            <fff-portfolio-item
              aria-controls="sheet-lettering"
              aria-haspopup="dialog"
              label="레터링"
              description="레터링 작업물"
              src="/src/images/budha.png"
              datetime="2021-02-22"
              .keywords=${['취미생활', '레터링']}
            ></fff-portfolio-item>
          </fff-grid>
        </fff-tab-panel>

        <fff-tab-panel value="second">
          <fff-grid columns=${portfolioGridColumns}>
            <fff-portfolio-item
              aria-controls="sheet-flat_sitemap"
              aria-haspopup="dialog"
              label="Flat sitemap"
              datetime="2023-04-01"
            ></fff-portfolio-item>
          </fff-grid>
        </fff-tab-panel>
      </fff-flex>
    </section>
  </fff-main>

  ${newneekSheet} ${worksSheet} ${letteringSheet} ${flatSitemapSheet}
`

type ViewModeEvent = CustomEvent<{ value: 'grid' | 'list' }>
type SortEvent = CustomEvent<{ value: 'latest' | 'oldest' }>

renderPage(main, {
  closeSidebar: true,
  initialize: () => {
    document
      .querySelector('fff-view-mode-switcher')
      ?.addEventListener('change', handleViewModeSwitcherChange)
    document
      .querySelector('fff-sort-selector')
      ?.addEventListener('change', handleSortSelectorChange)
  },
})

function handleViewModeSwitcherChange(event: Event) {
  const target = event.target as HTMLElement
  const viewModeEvent = event as ViewModeEvent
  const containerElement = target.closest<HTMLElement>('.profile-body')
  const layout = viewModeEvent.detail.value

  containerElement?.querySelectorAll<PortfolioItem>('fff-portfolio-item').forEach(item => {
    item.layout = layout
  })
  containerElement?.querySelectorAll<Grid>('fff-grid').forEach(gridElement => {
    gridElement.columns = layout === 'list' ? 1 : portfolioGridColumns
  })
}

function handleSortSelectorChange(event: Event) {
  const target = event.target as HTMLElement
  const sortEvent = event as SortEvent
  const containerElement = target.closest<HTMLElement>('.profile-body')

  containerElement?.querySelectorAll<HTMLElement>('fff-grid').forEach(gridElement => {
    const items = Array.from(gridElement.querySelectorAll<HTMLElement>('fff-portfolio-item'))
    items
      .sort((a, b) => {
        const aDate = Date.parse(a.getAttribute('datetime') ?? '')
        const bDate = Date.parse(b.getAttribute('datetime') ?? '')
        return sortEvent.detail.value === 'latest' ? bDate - aDate : aDate - bDate
      })
      .forEach(item => gridElement.append(item))
  })
}
