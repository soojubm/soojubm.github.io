import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import { ICON_NAMES } from '@/components/common'
import './dashboard.css'
import { renderPage } from '@/components/layouts/base-layouts'

const indexCards = [
  { icon: 'graph-down', label: '코스피', value: '2999.55p', tone: 'blue', change: '4.33% 하락' },
  { icon: 'graph-up', label: '코스닥', value: '2999.55p', tone: 'red', change: '4.33% 상승' },
  {
    icon: 'graph-up',
    label: '상해종합주가지수',
    value: '2999.55p',
    tone: 'red',
    change: '4.33% 상승',
  },
]

const renderIndexCard = ({ icon, label, value, tone, change }: typeof indexCards[number]) => html`
  <mm-surface variant="outlined" radius="large">
    <mm-flex direction="column" gap="3">
      <mm-avatar variant="secondary" size="40" icon=${icon}></mm-avatar>
      <mm-flex direction="column" gap="1">
        <mm-flex direction="column" gap="0">
          <mm-text size="12">${label}</mm-text>
          <mm-heading>${value}</mm-heading>
        </mm-flex>
        <mm-tag icon=${icon} tone=${tone}>${change}</mm-tag>
      </mm-flex>
      <mm-flex direction="column" gap="0">
        <mm-text size="12" color="light">10분 지연. live</mm-text>
        <mm-text size="12" color="light">현지 시간 기준 10.27. 01:27</mm-text>
      </mm-flex>
    </mm-flex>
  </mm-surface>
`

const systemStats = [
  { label: '컴포넌트', value: '212', caption: '커스텀 엘리먼트' },
  { label: '문서 페이지', value: '34', caption: '패턴 25개 별도' },
  { label: '디자인 토큰', value: '148', caption: '테마 3벌' },
]

const componentGroups = [
  { label: 'common', color: 'var(--category-1-text-color)', share: 54, value: '115개' },
  { label: 'domains', color: 'var(--category-5-text-color)', share: 34, value: '71개' },
  { label: 'overlay', color: 'var(--category-7-text-color)', share: 6, value: '13개' },
  { label: 'layouts', color: 'var(--category-3-text-color)', share: 4, value: '9개' },
  { label: 'indicators', color: 'var(--category-8-text-color)', share: 2, value: '4개' },
]

/** 막대 높이는 가장 큰 값을 100으로 잡아 트랙을 채운다. */
const pageCounts = [
  { label: '컴포넌트', count: 34 },
  { label: '패턴', count: 25 },
  { label: '마이', count: 3 },
  { label: '홈', count: 1 },
]

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

const pageShares = toShares(pageCounts)
const semanticsShares = toShares(semanticsCounts)

const renderSystemStat = ({ label, value, caption }: typeof systemStats[number]) => html`
  <mm-surface variant="outlined" radius="large">
    <mm-flex direction="column" gap="1">
      <mm-text size="12" color="light">${label}</mm-text>
      <mm-heading>${value}</mm-heading>
      <mm-text size="12" color="light">${caption}</mm-text>
    </mm-flex>
  </mm-surface>
`

const syncTotal = 12480
const syncDone = 8486
const syncShare = Math.round((syncDone / syncTotal) * 100)

const answerShares = [
  { label: '10대', share: 40, value: '40%' },
  { label: '20대', share: 30, value: '30%' },
  { label: '30대', share: 20, value: '20%' },
  { label: '40대', share: 10, value: '10%' },
]

const channels = [
  { label: '검색 광고', color: 'var(--category-1-text-color)', share: 45, value: '900,000원' },
  { label: '디스플레이', color: 'var(--category-5-text-color)', share: 30, value: '600,000원' },
  { label: '동영상', color: 'var(--category-7-text-color)', share: 15, value: '300,000원' },
  { label: '제휴', color: 'var(--category-3-text-color)', share: 10, value: '200,000원' },
]

const main = html`
  <mm-main class="dashboard">
    <mm-flex direction="column" gap="section">
      <mm-flex direction="column" gap="4">
        <mm-page-header
          heading="Dashboard"
          description="디자인 시스템 현황과 지표를 한 화면에서 훑습니다."
        ></mm-page-header>

        <mm-grid columns="3" gap="4">${systemStats.map(renderSystemStat)}</mm-grid>

        <mm-grid columns="2" gap="4">
          <mm-surface variant="outlined" radius="large">
            <mm-flex direction="column" gap="4">
              <mm-text-block
                level="3"
                heading="폴더별 컴포넌트"
                description="common이 절반을 넘고, domains가 도메인 어휘를 맡습니다."
              ></mm-text-block>
              <mm-chart-stacked-bar .items=${componentGroups}></mm-chart-stacked-bar>
              <mm-chart-legend .items=${componentGroups}></mm-chart-legend>
            </mm-flex>
          </mm-surface>

          <mm-surface variant="outlined" radius="large">
            <mm-flex direction="column" gap="4">
              <mm-text-block
                level="3"
                heading="문서 페이지"
                description="컴포넌트 문서가 패턴보다 많습니다. 전체 63쪽."
              ></mm-text-block>
              <mm-chart-column .items=${pageShares}></mm-chart-column>
            </mm-flex>
          </mm-surface>
        </mm-grid>

        <mm-surface variant="outlined" radius="large">
          <mm-flex direction="column" gap="4">
            <mm-text-block
              level="3"
              heading="계열별 파생 컴포넌트"
              description="기반 하나가 시멘틱으로 몇 갈래 분화했는지 봅니다. 전체 17개 계열 중 상위 여덟."
            ></mm-text-block>
            <mm-chart-column .items=${semanticsShares}></mm-chart-column>
          </mm-flex>
        </mm-surface>

        <mm-separator variant="section"></mm-separator>

        <mm-tab-list value="daily" variant="pill">
          <mm-tab value="daily">일간</mm-tab>
          <mm-tab value="weekly">주간</mm-tab>
          <mm-tab value="monthly">월간</mm-tab>
        </mm-tab-list>

        <mm-grid columns="3" gap="4">${indexCards.map(renderIndexCard)}</mm-grid>
      </mm-flex>

      <mm-flex direction="column" align-items="center" gap="3">
        <mm-text centered>
          1월 26일 컴퓨터통신 분야에서는
          <br />
          7백명의 지식iN들이 답변하셨습니다.
        </mm-text>
        <mm-chart-column .items=${answerShares}></mm-chart-column>
      </mm-flex>

      <mm-grid columns="2">
        <mm-surface variant="outlined" radius="large">
          <mm-flex direction="column" gap="2">
            <mm-tag tone="red">3건</mm-tag>
            <mm-text-block
              level="3"
              heading="오늘 할 일"
              description="마감이 가까운 업무부터 확인하세요."
            ></mm-text-block>
            <mm-menu-item-group size="large">
              <mm-menu-item-action
                size="medium"
                emoji="📦"
                trailing-icon=${ICON_NAMES.FORWARD}
                label="출고 지연 주문 확인"
                description="오늘 오전 11:00까지"
              ></mm-menu-item-action>
              <mm-menu-item-action
                size="medium"
                emoji="💬"
                trailing-icon=${ICON_NAMES.FORWARD}
                label="고객 문의 답변"
                description="미응답 문의 17건"
              ></mm-menu-item-action>
              <mm-menu-item-action
                size="medium"
                emoji="📊"
                trailing-icon=${ICON_NAMES.FORWARD}
                label="주간 성과 보고서 공유"
                description="오늘 오후 4:00까지"
              ></mm-menu-item-action>
            </mm-menu-item-group>
          </mm-flex>
        </mm-surface>
        <mm-surface radius="large"></mm-surface>
      </mm-grid>
      <mm-grid columns="2" gap="4">
        <mm-surface variant="outlined" radius="large">
          <mm-flex direction="column" gap="4">
            <mm-text-block
              level="3"
              heading="저장 공간"
              description="200 GB 중 187.23 GB 사용됨"
            ></mm-text-block>
            <meter
              value="187.23"
              min="0"
              max="200"
              low="100"
              high="180"
              optimum="0"
              aria-label="저장 공간 사용량"
            ></meter>
            <mm-notice
              heading="meter는 작업이 아니라 상태입니다"
              description="완료를 향해 가지 않고 오르내립니다. low·high·optimum으로 좋은 구간을 정하면 브라우저가 색을 바꿉니다. 프로필 완성도처럼 퍼센트로 보여도, 기다리는 일이 아니면 meter입니다."
            ></mm-notice>
          </mm-flex>
        </mm-surface>

        <mm-surface variant="outlined" radius="large">
          <mm-flex direction="column" gap="4">
            <mm-text-block
              level="3"
              heading="데이터 동기화"
              description=${`${syncTotal.toLocaleString()}건 중 ${syncDone.toLocaleString()}건 처리됨`}
            ></mm-text-block>
            <mm-flex align-items="center" gap="4">
              <div
                class="progress-ring"
                aria-hidden="true"
                style=${styleMap({ '--progress': syncShare })}
              >
                <svg viewBox="0 0 36 36">
                  <circle class="progress-ring-track" cx="18" cy="18" r="15.9155"></circle>
                  <circle class="progress-ring-value" cx="18" cy="18" r="15.9155"></circle>
                </svg>
                <mm-text>${syncShare}%</mm-text>
              </div>
              <progress
                value=${syncDone}
                max=${syncTotal}
                aria-label="데이터 동기화 진행률"
              ></progress>
            </mm-flex>
            <mm-notice
              heading="진행률을 알면 progress, 모르면 스피너입니다"
              description="둘은 같은 뜻의 다른 그림입니다. 스피너는 얼마나 남았는지 모른다는 정보를 담고 있어서, 알면서 쓰면 사용자가 기다릴지 판단할 근거를 잃습니다."
            ></mm-notice>
          </mm-flex>
        </mm-surface>
      </mm-grid>

      <mm-surface variant="outlined" radius="large">
        <mm-flex direction="column" gap="4">
          <mm-text-block
            level="3"
            heading="채널별 광고비"
            description="이번 달 집행액 2,000,000원"
          ></mm-text-block>
          <mm-chart-stacked-bar .items=${channels}></mm-chart-stacked-bar>
          <mm-chart-legend .items=${channels}></mm-chart-legend>
        </mm-flex>
      </mm-surface>
    </mm-flex>
  </mm-main>
`

renderPage(main)
