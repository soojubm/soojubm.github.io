import { html } from 'lit'

import type { ComponentUsageItem } from '@/components/domains/component/component-usage'

import { ICON_NAMES } from '@/components/common'
import '@/components/domains/component/component-usage'
import { renderPage } from '@/components/layouts/base-layouts'
import { CATEGORIES, type CategoryKey } from '@/pages/mocks'

type StatCard = {
  icon: string
  trendIcon: string
  label: string
  value: string
  tone: string
  change: string
  notes: readonly string[]
}

const renderStatCard = ({ icon, trendIcon, label, value, tone, change, notes }: StatCard) => html`
  <fff-surface variant="outlined" radius="large">
    <fff-flex direction="column" gap="3">
      <fff-avatar variant="secondary" size="40" icon=${icon}></fff-avatar>
      <fff-flex direction="column" gap="1">
        <fff-flex direction="column" gap="0">
          <fff-text size="12">${label}</fff-text>
          <fff-heading>${value}</fff-heading>
        </fff-flex>
        <fff-tag icon=${trendIcon} tone=${tone}>${change}</fff-tag>
      </fff-flex>
      <fff-flex direction="column" gap="0">
        ${notes.map(
          note =>
            html`
              <fff-text size="12" color="light">${note}</fff-text>
            `,
        )}
      </fff-flex>
    </fff-flex>
  </fff-surface>
`

/** 변화율은 지난 분기 대비. */
const systemStats = [
  {
    icon: ICON_NAMES.CUBE_SCAN,
    label: '컴포넌트',
    value: '212',
    change: '+6.0%',
    trend: 'up',
    summary: '이번 분기 12개 추가',
    caption: '커스텀 엘리먼트 기준',
  },
  {
    icon: ICON_NAMES.DOCUMENT,
    label: '문서 페이지',
    value: '34',
    change: '+9.7%',
    trend: 'up',
    summary: 'Foundations 축 문서 확장',
    caption: '패턴 25개 별도',
  },
  {
    icon: ICON_NAMES.PALETTE,
    label: '디자인 토큰',
    value: '148',
    change: '-5.1%',
    trend: 'down',
    summary: '중복 토큰 8개 정리',
    caption: '테마 3벌에 공통 적용',
  },
  {
    icon: ICON_NAMES.WARNING,
    label: '접근성 경고',
    value: '7',
    change: '-30%',
    trend: 'down',
    summary: '지난 분기보다 3건 감소',
    caption: '자동 검사 기준',
  },
] as const

const trendIcons = {
  up: ICON_NAMES.TREND_UP,
  down: ICON_NAMES.TREND_DOWN,
} as const

const trendTones = {
  up: 'red',
  down: 'blue',
} as const

/** 파생이 많은 상위 계열. 전체 17개 계열 중 여덟을 추린다. */
const semanticsCounts = [
  { label: 'icon-button', count: 13 },
  { label: 'input', count: 10 },
  { label: 'text', count: 8 },
  { label: 'menu-item', count: 7 },
  { label: 'button', count: 6 },
  { label: 'tag', count: 5 },
  { label: 'toggle-button', count: 3 },
  { label: 'spinner', count: 3 },
]

const toShares = (counts: { label: string; count: number }[]) => {
  const max = Math.max(...counts.map(({ count }) => count))

  return counts.map(({ label, count }) => ({
    label,
    share: Math.round((count / max) * 100),
    value: String(count),
  }))
}

const semanticsShares = toShares(semanticsCounts)

const systemStatCards: StatCard[] = systemStats.map(
  ({ icon, label, value, change, trend, summary, caption }) => ({
    icon,
    trendIcon: trendIcons[trend],
    tone: trendTones[trend],
    label,
    value,
    change,
    notes: [summary, caption],
  }),
)

const goalTarget = 420000000
const goalSaved = 273000000
const goalShare = Math.round((goalSaved / goalTarget) * 100)

const categoryAdSpends: { category: CategoryKey; share: number; value: string }[] = [
  { category: 'product', share: 45, value: '900,000원' },
  { category: 'design', share: 30, value: '600,000원' },
  { category: 'engineering', share: 15, value: '300,000원' },
  { category: 'guide', share: 10, value: '200,000원' },
]

const adSpendItems = categoryAdSpends.map(({ category, share, value }) => ({
  label: CATEGORIES[category].label,
  tone: CATEGORIES[category].tone,
  share,
  value,
}))

const toPages = (ids: string[]) => ids.map(id => ({ href: `./${id}.html`, label: id }))

const main = html`
  <fff-main>
    <fff-flex direction="column" gap="section">
      <fff-flex direction="column" gap="4">
        <fff-flex justify-content="space-between" align-items="center" gap="4">
          <fff-heading level="2">
            <span aria-hidden="true">🌙</span>
            Tender is the night.
          </fff-heading>
          <fff-button-group>
            <fff-button icon=${ICON_NAMES.IMPORT}>가져오기</fff-button>
            <fff-button variant="primary">추가하기</fff-button>
          </fff-button-group>
        </fff-flex>

        <fff-tab-list
          value="daily"
          variant="pill"
          search-param="period"
          .tabs=${[
            { value: 'daily', label: '일간' },
            { value: 'weekly', label: '주간' },
            { value: 'monthly', label: '월간' },
          ]}
        ></fff-tab-list>

        <fff-grid columns="4" gap="4">${systemStatCards.map(renderStatCard)}</fff-grid>

        <fff-grid columns="2" gap="4">
          <fff-banner
            variant="primary"
            heading="새 계열을 제안해 주세요"
            description="기존 기반으로 다루지 못하는 패턴을 발견했다면 알려 주세요."
          >
            <fff-button slot="action" variant="primary">제안하기</fff-button>
          </fff-banner>
          <fff-surface variant="outlined" radius="large">
            <fff-flex direction="column" gap="4">
              <fff-text-block
                level="3"
                heading="카테고리별 광고비"
                description="이번 달 집행액 2,000,000원"
              ></fff-text-block>
              <fff-chart-stacked-bar .items=${adSpendItems}></fff-chart-stacked-bar>
              <fff-chart-legend .items=${adSpendItems}></fff-chart-legend>
            </fff-flex>
          </fff-surface>
        </fff-grid>

        <fff-grid columns="2" gap="4">
          <fff-surface variant="outlined" radius="large">
            <fff-flex direction="column" gap="2">
              <fff-tag tone="red">3건</fff-tag>
              <fff-text-block
                level="3"
                heading="오늘 할 일"
                description="마감이 가까운 업무부터 확인하세요."
              ></fff-text-block>
              <fff-menu-item-group size="large">
                <fff-menu-item-action
                  size="medium"
                  emoji="📦"
                  trailing-icon=${ICON_NAMES.FORWARD}
                  label="출고 지연 주문 확인"
                  description="오늘 오전 11:00까지"
                ></fff-menu-item-action>
                <fff-menu-item-action
                  size="medium"
                  emoji="💬"
                  trailing-icon=${ICON_NAMES.FORWARD}
                  label="고객 문의 답변"
                  description="미응답 문의 17건"
                ></fff-menu-item-action>
                <fff-menu-item-action
                  size="medium"
                  emoji="📊"
                  trailing-icon=${ICON_NAMES.FORWARD}
                  label="주간 성과 보고서 공유"
                  description="오늘 오후 4:00까지"
                ></fff-menu-item-action>
              </fff-menu-item-group>
            </fff-flex>
          </fff-surface>
          <fff-surface radius="large">
            <fff-flex direction="column" gap="4">
              <fff-flex direction="column" gap="1">
                <fff-text size="12" color="light">노후 자금</fff-text>
                <fff-heading level="1">${`${goalTarget.toLocaleString()}원`}</fff-heading>
              </fff-flex>
              <progress
                value=${goalSaved}
                max=${goalTarget}
                aria-label="노후 자금 목표 달성률"
              ></progress>
              <fff-flex justify-content="space-between" align-items="center" gap="4">
                <fff-text color="light">${`${goalShare}% 달성`}</fff-text>
                <fff-text>${`${goalSaved.toLocaleString()}원`}</fff-text>
              </fff-flex>
              <fff-notice
                description="진행률을 알면 progress, 모르면 스피너입니다. 둘은 같은 뜻의 다른 그림입니다. 스피너는 얼마나 남았는지 모른다는 정보를 전하기 때문에, 알면서 쓰면 사용자가 기다릴지 판단할 근거를 잃습니다."
              ></fff-notice>
            </fff-flex>
          </fff-surface>
        </fff-grid>

        <fff-grid columns="2" gap="4">
          <fff-surface variant="outlined" radius="large">
            <fff-flex direction="column" gap="4">
              <fff-text-block
                level="3"
                heading="저장 공간"
                description="200 GB 중 187.23 GB 사용됨"
              ></fff-text-block>
              <meter
                value="187.23"
                min="0"
                max="200"
                low="100"
                high="180"
                optimum="0"
                aria-label="저장 공간 사용량"
              ></meter>
              <fff-notice
                description="meter는 작업이 아니라 상태입니다. 완료를 향해 가지 않고 오르내립니다. low·high·optimum으로 좋은 구간을 정하면 브라우저가 색을 바꿉니다. 프로필 완성도처럼 퍼센트로 보여도, 기다리는 일이 아니면 meter입니다."
              ></fff-notice>
            </fff-flex>
          </fff-surface>
        </fff-grid>
      </fff-flex>
    </fff-flex>
  </fff-main>
`

renderPage(main)
