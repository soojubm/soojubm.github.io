import { html } from 'lit'
import './dashboard.css'

import { renderLayout } from '../../../layouts/base-layouts'

const main = html`
  <main class="page dashboard">
    <mm-flex
      class="dashboard-header"
      align-items="center"
      justify-content="space-between"
      wrap="wrap"
    >
      <mm-page-header heading="Dashboard" description="한국 증시"></mm-page-header>
    </mm-flex>

    <mm-flex direction="column" gap="3">
      <mm-tab-list value="daily" variant="pill">
        <mm-tab value="daily">일간</mm-tab>
        <mm-tab value="weekly">주간</mm-tab>
        <mm-tab value="monthly">월간</mm-tab>
      </mm-tab-list>
    </mm-flex>

    <mm-grid columns="3" gap="4">
      <mm-surface variant="outlined">
        <mm-avatar variant="secondary" icon="graph-down"></mm-avatar>
        <div style="height: var(--space-3)"></div>
        <mm-text size="12">코스피</mm-text>
        <mm-heading>2999.55p</mm-heading>
        <div style="margin-top: var(--space-1)"></div>
        <mm-tag variant="up" tone="blue">4.33% 하락</mm-tag>
        <div style="margin-top: var(--space-3)">
          <mm-text size="12" color="light">10분 지연. live</mm-text>
          <mm-text size="12" color="light">현지 시간 기준 10.27. 01:27</mm-text>
        </div>
      </mm-surface>
      <mm-surface variant="outlined">
        <mm-avatar variant="secondary" icon="graph-up"></mm-avatar>
        <div style="height: var(--space-3)"></div>
        <mm-text size="12">코스닥</mm-text>
        <mm-heading>2999.55p</mm-heading>
        <div style="margin-top: var(--space-1)"></div>
        <mm-tag variant="up" tone="red">4.33% 상승</mm-tag>
        <div style="margin-top: var(--space-3)">
          <mm-text size="12" color="light">10분 지연. live</mm-text>
          <mm-text size="12" color="light">현지 시간 기준 10.27. 01:27</mm-text>
        </div>
      </mm-surface>
      <mm-surface variant="outlined">
        <mm-avatar variant="secondary">
          <mm-icon name="graph-up"></mm-icon>
        </mm-avatar>
        <div style="height: var(--space-3)"></div>
        <mm-text size="12">상해종합주가지수</mm-text>
        <mm-heading>2999.55p</mm-heading>
        <div style="margin-top: var(--space-1)"></div>
        <mm-tag variant="up" tone="red">4.33% 상승</mm-tag>
        <div style="margin-top: var(--space-3)">
          <mm-text size="12" color="light">10분 지연. live</mm-text>
          <mm-text size="12" color="light">현지 시간 기준 10.27. 01:27</mm-text>
        </div>
      </mm-surface>
    </mm-grid>

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
  </main>
`

document.addEventListener('DOMContentLoaded', () => {
  renderLayout(main)
})
