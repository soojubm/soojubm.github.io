import { html, nothing } from 'lit'

import type { PricingCard } from '@/components/domains/pricing/pricing-card'

import { renderPage } from '@/components/layouts/base-layouts'

type BillingCycle = 'monthly' | 'yearly'

interface PricingPlan {
  plan: string
  description: string
  prices: Record<BillingCycle, string>
  badge?: string
  free?: boolean
  features: string[]
  actionLabel: string
}

const defaultCycle: BillingCycle = 'monthly'

const billingPeriods: Record<BillingCycle, string> = {
  monthly: '매월 청구',
  yearly: '매년 청구',
}

const pricingPlans: PricingPlan[] = [
  {
    plan: 'Basic',
    description: '가볍게 시작하는 기본 기능',
    prices: { monthly: '₩ 0', yearly: '₩ 0' },
    free: true,
    features: ['스토리지 15GB', '기본 검색·정리 도구'],
    actionLabel: '무료로 시작',
  },
  {
    plan: 'Standard',
    description: '자주 쓰는 사용자를 위한 확장',
    prices: { monthly: '₩ 6,800', yearly: '₩ 68,000' },
    badge: 'Most Popular',
    features: ['스토리지 2TB', '전문가 상담', '회원 전용 추가 혜택'],
    actionLabel: '업그레이드',
  },
  {
    plan: 'Premium',
    description: '가족과 함께, 넉넉하게',
    prices: { monthly: '₩ 13,900', yearly: '₩ 139,000' },
    features: ['스토리지 5TB', '가족 최대 5명과 공유', '우선 고객 지원'],
    actionLabel: '업그레이드',
  },
]

// 무료 요금제는 청구하지 않으므로 결제 주기를 표시하지 않는다.
const getPeriod = ({ free }: PricingPlan, cycle: BillingCycle) =>
  free ? '' : billingPeriods[cycle]

const renderBadge = (badge?: string) => {
  if (!badge) return nothing

  return html`
    <fff-tag slot="badge">
      <span aria-hidden="true">🔥</span>
      ${badge}
    </fff-tag>
  `
}

const renderPricingCard = (pricingPlan: PricingPlan) => {
  const { plan, description, prices, badge, features, actionLabel } = pricingPlan

  return html`
    <fff-pricing-card
      plan=${plan}
      description=${description}
      price=${prices[defaultCycle]}
      period=${getPeriod(pricingPlan, defaultCycle)}
      .features=${features}
    >
      ${renderBadge(badge)}
      <fff-button slot="action" variant="primary" full-width aria-label="${plan} ${actionLabel}">
        ${actionLabel}
      </fff-button>
    </fff-pricing-card>
  `
}

const main = html`
  <fff-main width="large">
    <fff-flex direction="column" align-items="center" gap="8">
      <fff-page-header
        centered
        heading="요금제"
        description="필요한 만큼 고르고, 언제든 바꿀 수 있습니다."
      ></fff-page-header>

      <fff-toggle-button-group
        id="billing-cycle"
        aria-label="결제 주기"
        value=${defaultCycle}
        .options=${[
          { value: 'monthly', label: '월간' },
          { value: 'yearly', label: '연간 · 2개월 무료' },
        ]}
      ></fff-toggle-button-group>

      <fff-pricing-card-group>${pricingPlans.map(renderPricingCard)}</fff-pricing-card-group>

      <fff-banner heading="어떤 요금제가 맞는지 고민되나요?">
        <fff-button slot="action" variant="secondary">요금제 문의하기</fff-button>
      </fff-banner>
    </fff-flex>
  </fff-main>
`

renderPage(main, { closeSidebar: true, initialize: setupBillingCycle })

function setupBillingCycle() {
  const toggle = document.querySelector('#billing-cycle')
  const cards = document.querySelectorAll<PricingCard>('fff-pricing-card')

  toggle?.addEventListener('change', event => {
    const cycle = (event as CustomEvent<{ value: BillingCycle }>).detail.value

    cards.forEach(card => {
      const pricingPlan = pricingPlans.find(({ plan }) => plan === card.plan)
      if (!pricingPlan) return

      card.price = pricingPlan.prices[cycle]
      card.period = getPeriod(pricingPlan, cycle)
    })
  })
}
