import { html, nothing } from 'lit'

import type { PricingCard } from '@/components/domains/pricing/pricing-card'

import { renderPage } from '@/components/layouts/base-layouts'

type BillingCycle = 'monthly' | 'yearly'

interface PricingPlan {
  plan: string
  description: string
  prices: Record<BillingCycle, string>
  badge?: string
  features: string[]
  actionLabel: string
}

const billingPeriods: Record<BillingCycle, string> = {
  monthly: '매월 청구',
  yearly: '매년 청구',
}

const pricingPlans: PricingPlan[] = [
  {
    plan: 'Basic',
    description: '검색과 기본 정리',
    prices: { monthly: '₩ 0', yearly: '₩ 0' },
    features: ['스토리지 15GB', '기본 리서치 도구'],
    actionLabel: '무료로 시작',
  },
  {
    plan: 'Standard',
    description: '리서치, 정리, 낮은 한도',
    prices: { monthly: '₩ 6,800', yearly: '₩ 68,000' },
    badge: 'Most Popular',
    features: ['스토리지 2TB', 'Google 전문가와의 상담', '회원을 위한 추가 혜택'],
    actionLabel: '업그레이드',
  },
  {
    plan: 'Premium',
    description: '가족 공유, 높은 한도',
    prices: { monthly: '₩ 13,900', yearly: '₩ 139,000' },
    features: ['스토리지 5TB', '가족 최대 5명과 공유', '우선 고객 지원'],
    actionLabel: '업그레이드',
  },
]

const renderBadge = (badge?: string) => {
  if (!badge) return nothing

  return html`
    <mm-tag slot="badge">
      <span aria-hidden="true">🔥</span>
      ${badge}
    </mm-tag>
  `
}

const renderPricingCard = ({
  plan,
  description,
  prices,
  badge,
  features,
  actionLabel,
}: PricingPlan) => html`
  <mm-pricing-card
    plan=${plan}
    description=${description}
    price=${prices.monthly}
    period=${billingPeriods.monthly}
    .features=${features}
  >
    ${renderBadge(badge)}
    <mm-button slot="action" variant=${badge ? 'primary' : 'secondary'} size="large" full-width>
      ${actionLabel}
    </mm-button>
  </mm-pricing-card>
`

const main = html`
  <mm-main width="small">
    <mm-flex direction="column" align-items="center" gap="8">
      <mm-page-header
        centered
        heading="요금제"
        description="필요한 만큼 고르고, 언제든 바꿀 수 있습니다."
      ></mm-page-header>

      <mm-toggle-button-group
        id="billing-cycle"
        aria-label="결제 주기"
        value="monthly"
        .options=${[
          { value: 'monthly', label: '월간' },
          { value: 'yearly', label: '연간' },
        ]}
      ></mm-toggle-button-group>

      <mm-pricing-card-group>${pricingPlans.map(renderPricingCard)}</mm-pricing-card-group>

      <mm-banner heading="모든 리서치 탐색하기">
        <mm-button slot="action" variant="secondary">리서치 색인 보기</mm-button>
      </mm-banner>
    </mm-flex>
  </mm-main>
`

renderPage(main, { closeSidebar: true, initialize: setupBillingCycle })

function setupBillingCycle() {
  const toggle = document.querySelector('#billing-cycle')
  const cards = document.querySelectorAll<PricingCard>('mm-pricing-card')

  toggle?.addEventListener('change', event => {
    const cycle = (event as CustomEvent<{ value: BillingCycle }>).detail.value

    cards.forEach((card, index) => {
      card.price = pricingPlans[index].prices[cycle]
      card.period = billingPeriods[cycle]
    })
  })
}
