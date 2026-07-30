import { html } from 'lit'
import './dashboard.css'

import { renderLayout } from '@/components/layouts/base-layouts'

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
      <mm-avatar variant="secondary" icon=${icon}></mm-avatar>
      <mm-flex direction="column" gap="1">
        <mm-flex direction="column" gap="0">
          <mm-text size="12">${label}</mm-text>
          <mm-heading>${value}</mm-heading>
        </mm-flex>
        <mm-tag variant="up" tone=${tone}>${change}</mm-tag>
      </mm-flex>
      <mm-flex direction="column" gap="0">
        <mm-text size="12" color="light">10분 지연. live</mm-text>
        <mm-text size="12" color="light">현지 시간 기준 10.27. 01:27</mm-text>
      </mm-flex>
    </mm-flex>
  </mm-surface>
`

const main = html`
  <main class="page dashboard">
    <mm-page-header heading="Dashboard" description="한국 증시"></mm-page-header>

    <mm-tab-list value="daily" variant="pill">
      <mm-tab value="daily">일간</mm-tab>
      <mm-tab value="weekly">주간</mm-tab>
      <mm-tab value="monthly">월간</mm-tab>
    </mm-tab-list>

    <mm-grid columns="3" gap="4">${indexCards.map(renderIndexCard)}</mm-grid>

    <br />
    <mm-flex direction="column" align-items="center" gap="3">
      <mm-text centered>
        1월 26일
        <b>컴퓨터통신 분야</b>
        에서는
        <br />
        <b>7백명의 지식iN</b>
        들이 답변하셨습니다.
      </mm-text>
      <mm-flex direction="row" gap="2" justify-content="center">
        <div class="graph-item">
          <span class="graph-item-value">40%</span>
          <div class="graph-item-bar"></div>
          <span class="graph-item-label">10대</span>
        </div>
        <div class="graph-item">
          <span class="graph-item-value">30%</span>
          <div class="graph-item-bar"></div>
          <span class="graph-item-label">20대</span>
        </div>
        <div class="graph-item">
          <span class="graph-item-value">20%</span>
          <div class="graph-item-bar"></div>
          <span class="graph-item-label">30대</span>
        </div>
        <div class="graph-item">
          <span class="graph-item-value">10%</span>
          <div class="graph-item-bar"></div>
          <span class="graph-item-label">40대</span>
        </div>
      </mm-flex>
    </mm-flex>

    <br />
    <mm-grid column="2">
      <mm-surface variant="outlined" radius="large">
        <mm-flex direction="column" gap="2">
          <mm-tag tone="red">3건</mm-tag>
          <mm-text-block
            level="3"
            heading="오늘 할 일"
            description="마감이 가까운 업무부터 확인하세요."
          ></mm-text-block>
          <mm-menu-item-group>
            <mm-menu-item-action
              size="small"
              emoji="📦"
              trailing-icon="arrow-right"
              label="출고 지연 주문 확인"
              description="오늘 오전 11:00까지"
            ></mm-menu-item-action>
            <mm-menu-item-action
              size="small"
              emoji="💬"
              trailing-icon="arrow-right"
              label="고객 문의 답변"
              description="미응답 문의 17건"
            ></mm-menu-item-action>
            <mm-menu-item-action
              size="small"
              emoji="📊"
              trailing-icon="arrow-right"
              label="주간 성과 보고서 공유"
              description="오늘 오후 4:00까지"
            ></mm-menu-item-action>
          </mm-menu-item-group>
        </mm-flex>
      </mm-surface>
      <mm-surface radius="large" tone="green"></mm-surface>
    </mm-grid>
  </main>
`

document.addEventListener('DOMContentLoaded', () => {
  renderLayout(main)
})
