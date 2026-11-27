import { html, render } from 'lit'

import { ICON_NAMES } from '@/components/common'
import { renderPage } from '@/components/layouts/base-layouts'

const sectionNavOptions = [
  { value: 'detail', label: '상세' },
  { value: 'review', label: '리뷰' },
  { value: 'info', label: '상품정보' },
]

type Review = {
  rating: number
  content: string
  author: string
  datetime: string
  timestamp: number
}

const reviewSortOptions = [
  { value: 'latest', label: '최신순' },
  { value: 'rating-high', label: '별점 높은순' },
  { value: 'rating-low', label: '별점 낮은순' },
]

const reviews: Review[] = [
  {
    rating: 5,
    content:
      'I have 2 kids so sleep is hard to come by, these have helped me to wake up feeling more refreshed and ready to start the day',
    author: 'Fleet Foxes',
    datetime: '2020년 12월 1일',
    timestamp: Date.parse('2020-12-01'),
  },
  {
    rating: 5,
    content: '포장이 꼼꼼하고 배송도 빨랐어요. 음질이 기대 이상입니다.',
    author: 'Beach House',
    datetime: '2021년 2월 14일',
    timestamp: Date.parse('2021-02-14'),
  },
  {
    rating: 4,
    content: '구성은 만족스럽지만 케이스 모서리가 살짝 눌려서 도착했습니다.',
    author: 'Mitski',
    datetime: '2021년 3월 3일',
    timestamp: Date.parse('2021-03-03'),
  },
  {
    rating: 5,
    content: '오래 기다렸던 앨범이라 더 반갑네요. 선물용으로 한 장 더 샀습니다.',
    author: 'Cigarettes After Sex',
    datetime: '2021년 5월 20일',
    timestamp: Date.parse('2021-05-20'),
  },
  {
    rating: 3,
    content: '기대했던 것보다는 평범했어요. 가격을 생각하면 아쉽습니다.',
    author: 'Slowdive',
    datetime: '2021년 7월 8일',
    timestamp: Date.parse('2021-07-08'),
  },
  {
    rating: 2,
    content: '트랙 하나에서 잡음이 들려요. 교환 문의를 남겼습니다.',
    author: 'Wilco',
    datetime: '2021년 9월 30일',
    timestamp: Date.parse('2021-09-30'),
  },
]

// 요약은 아래 목록과 같은 데이터에서 계산한다. 평점 분포의 label은 열의 선택값이자 필터 키다.
const reviewCount = reviews.length
const averageRating =
  Math.round((reviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount) * 10) / 10
const ratingShares = [5, 4, 3, 2, 1].map(rating => {
  const share = Math.round(
    (reviews.filter(review => review.rating === rating).length / reviewCount) * 100,
  )

  return { label: `${rating}점`, share, value: `${share}%` }
})

const cartOptions = [
  { value: 'lifetime', label: '평생 소장' },
  { value: 'rental', label: '1년 대여' },
]

const main = html`
  <mm-main width="large">
    <mm-content-section-list>
      <mm-grid columns="2" gap="8">
        <mm-product-image
          src="/src/images/AlbumArt_{B5020207-474E-4720-B8A7-C6073790C400}_Large.jpg"
          alt="제품 이미지"
        ></mm-product-image>

        <mm-flex direction="column" justify-content="space-between" gap="6">
          <mm-flex direction="column" gap="6">
            <mm-flex direction="column" gap="3">
              <mm-flex align-items="center" justify-content="space-between" gap="2">
                <mm-link href="#">Hachimitsupai</mm-link>
                <mm-flex align-items="center" gap="1">
                  <mm-bookmark-button shape="heart"></mm-bookmark-button>
                  <mm-share-button></mm-share-button>
                </mm-flex>
              </mm-flex>
              <mm-heading level="1">センチメンタル通り</mm-heading>
              <mm-product-price
                size="large"
                original-price="₩ 25,000"
                discount="36% 할인"
                price="₩ 16,000"
              ></mm-product-price>
              <mm-paragraph>
                I have 2 kids so sleep is hard to come by, these have helped me to wake up feeling
                more refreshed and ready to start the day
              </mm-paragraph>
              <mm-review-summary
                rating=${averageRating}
                review-count=${reviewCount}
              ></mm-review-summary>
            </mm-flex>

            <mm-button
              id="product-cta"
              aria-controls="cart-sheet"
              aria-haspopup="dialog"
              variant="primary"
              size="large"
              full-width
            >
              장바구니 추가
            </mm-button>
          </mm-flex>

          <mm-list-item-group gap="0">
            <mm-list-item
              avatar-variant="tertiary"
              icon=${ICON_NAMES.DELIVERY}
              label="Free shipping on all U.S. orders of $40+"
            ></mm-list-item>
            <mm-list-item
              avatar-variant="tertiary"
              icon=${ICON_NAMES.BOX}
              label="Free returns and exchanges"
            ></mm-list-item>
          </mm-list-item-group>
        </mm-flex>
      </mm-grid>

      <mm-fixed-top style="top: var(--navbar-height); background: var(--background-color)">
        <mm-toggle-button-group
          id="section-nav"
          value="detail"
          .options=${sectionNavOptions}
        ></mm-toggle-button-group>
      </mm-fixed-top>

      <!-- 마케팅 스토리: 중앙 정렬 + 특징 -->
      <mm-grid id="detail" columns="1" gap="4">
        <mm-flex direction="column" align-items="center" gap="3">
          <mm-tag tone="purple">Why prebiotics?</mm-tag>
          <mm-text-block
            centered
            level="1"
            heading="Prebiotics are fibers that feed good bacteria"
            description="And good bacteria creates a healthy oral environment. In addition to positively impacting the things you can taste and feel, like fresher breath and less sensitive teeth, a balanced oral environment is directly linked to cardiovascular, respiratory, and immune health."
          ></mm-text-block>
        </mm-flex>
        <mm-feature-group columns="4">
          <mm-feature
            centered
            icon=${ICON_NAMES.FLOWER}
            heading="Tangerine Oil"
            description="A microbial substrate that has a positive impact on the oral environment"
          ></mm-feature>
          <mm-feature
            centered
            icon=${ICON_NAMES.SPARKS}
            heading="Tangerine Oil"
            description="A microbial substrate that has a positive impact on the oral environment"
          ></mm-feature>
          <mm-feature
            centered
            icon=${ICON_NAMES.FAVORITE}
            heading="Tangerine Oil"
            description="A microbial substrate that has a positive impact on the oral environment"
          ></mm-feature>
          <mm-feature
            centered
            icon=${ICON_NAMES.LIKE}
            heading="Tangerine Oil"
            description="A microbial substrate that has a positive impact on the oral environment"
          ></mm-feature>
        </mm-feature-group>
      </mm-grid>

      <!-- 마케팅 스토리: 이미지 + 텍스트 -->
      <mm-grid columns="2" gap="8">
        <mm-flex direction="column" gap="3">
          <mm-tag tone="purple">Why prebiotics?</mm-tag>
          <mm-text-block
            level="1"
            heading="Prebiotics are fibers that feed good bacteria"
            description="And good bacteria creates a healthy oral environment. In addition to positively impacting the things you can taste and feel, like fresher breath and less sensitive teeth, a balanced oral environment is directly linked to cardiovascular, respiratory, and immune health."
          ></mm-text-block>
        </mm-flex>
        <mm-thumbnail ratio="1:1"></mm-thumbnail>
      </mm-grid>

      <!-- 마케팅 스토리: bleed 배경 + 특징 -->
      <mm-surface variant="filled" band>
        <mm-grid columns="1" gap="4">
          <mm-flex direction="column" align-items="center" gap="3">
            <mm-tag tone="purple">Why prebiotics?</mm-tag>
            <mm-text-block
              centered
              level="1"
              heading="Prebiotics are fibers that feed good bacteria"
              description="And good bacteria creates a healthy oral environment. In addition to positively impacting the things you can taste and feel, like fresher breath and less sensitive teeth, a balanced oral environment is directly linked to cardiovascular, respiratory, and immune health."
            ></mm-text-block>
          </mm-flex>
          <mm-feature-group columns="4">
            <mm-feature
              centered
              icon=${ICON_NAMES.LIKE}
              heading="Tangerine Oil"
              description="A microbial substrate that has a positive impact on the oral environment"
            ></mm-feature>
            <mm-feature
              centered
              icon=${ICON_NAMES.FAVORITE}
              heading="Tangerine Oil"
              description="A microbial substrate that has a positive impact on the oral environment"
            ></mm-feature>
            <mm-feature
              centered
              icon=${ICON_NAMES.FLOWER}
              heading="Tangerine Oil"
              description="A microbial substrate that has a positive impact on the oral environment"
            ></mm-feature>
            <mm-feature
              centered
              icon=${ICON_NAMES.SPARKS}
              heading="Tangerine Oil"
              description="A microbial substrate that has a positive impact on the oral environment"
            ></mm-feature>
          </mm-feature-group>
        </mm-grid>
      </mm-surface>

      <!-- 마케팅 스토리: 이미지 + 텍스트 -->
      <mm-grid columns="2" gap="8">
        <mm-thumbnail ratio="1:1"></mm-thumbnail>
        <mm-flex direction="column" gap="3">
          <mm-tag tone="purple">Why prebiotics?</mm-tag>
          <mm-text-block
            level="1"
            heading="Prebiotics are fibers that feed good bacteria"
            description="And good bacteria creates a healthy oral environment. In addition to positively impacting the things you can taste and feel, like fresher breath and less sensitive teeth, a balanced oral environment is directly linked to cardiovascular, respiratory, and immune health."
          ></mm-text-block>
        </mm-flex>
      </mm-grid>

      <mm-flex as="section" id="review" direction="column" gap="8">
        <mm-text-block
          centered
          level="1"
          heading="Loved By Over +70,000 Smiles!"
          description="Toothpaste so good, you’ll actually look forward to brushing —just ask our customers."
        ></mm-text-block>
        <mm-surface variant="outlined" radius="large">
          <mm-flex direction="column" gap="4">
            <mm-review-summary
              rating=${averageRating}
              review-count=${reviewCount}
            ></mm-review-summary>
            <mm-paragraph centered>
              구매하신 분들이 남긴 별점입니다. 점수를 누르면 해당 리뷰만 볼 수 있어요.
            </mm-paragraph>
            <mm-chart-column
              id="review-rating"
              selectable
              style="--chart-column-width: var(--size-32)"
              .items=${ratingShares}
            ></mm-chart-column>
          </mm-flex>
        </mm-surface>
        <mm-flex direction="column" gap="4">
          <mm-flex justify-content="space-between" align-items="center" gap="2">
            <mm-text id="review-result"></mm-text>
            <mm-select
              id="review-sort"
              aria-label="정렬"
              value="latest"
              .options=${reviewSortOptions}
            ></mm-select>
          </mm-flex>
          <mm-grid id="review-list" columns="2" gap="4"></mm-grid>
        </mm-flex>
      </mm-flex>

      <mm-flex as="section" id="info" direction="column" gap="3">
        <mm-heading level="2">상품상세정보 고지</mm-heading>
        <mm-meta-item-group direction="column">
          <mm-meta-item layout="inline" label="제품명" value="노멀 헤어퍼퓸"></mm-meta-item>
          <mm-meta-item layout="inline" label="소재" value="금속"></mm-meta-item>
          <mm-meta-item layout="inline" label="치수" value="20mm * 40mm"></mm-meta-item>
          <mm-meta-item
            layout="inline"
            label="전성분"
            value="정제수, 아리수, 활명수"
          ></mm-meta-item>
          <mm-meta-item layout="inline" label="제조일자" value="2019. 11. 08."></mm-meta-item>
          <mm-meta-item layout="inline" label="제조업자" value="별도표기"></mm-meta-item>
          <mm-meta-item layout="inline" label="제조국" value="대한민국"></mm-meta-item>
          <mm-meta-item layout="inline" label="문의전화" value="02-000-2000"></mm-meta-item>
        </mm-meta-item-group>
      </mm-flex>
    </mm-content-section-list>

    <mm-fixed-bottom id="purchase-bar">
      <mm-product-purchase-bar
        image-src="/src/images/cake_gosum.jpg"
        name="뉴닉이 풀어 쓴 경제상식사전"
        price="₩ 16,000"
        original-price="₩ 25,000"
        discount="36% 할인"
      >
        <mm-button
          slot="action"
          aria-controls="cart-sheet"
          aria-haspopup="dialog"
          variant="primary"
          size="large"
        >
          장바구니 추가
        </mm-button>
      </mm-product-purchase-bar>
    </mm-fixed-bottom>
  </mm-main>

  <mm-sheet id="cart-sheet" placement="right">
    <mm-sheet-header heading="장바구니"></mm-sheet-header>
    <mm-sheet-body>
      <mm-flex direction="column" gap="4">
        <mm-list-item
          size="large"
          avatar-src="/src/images/AlbumArt_{B5020207-474E-4720-B8A7-C6073790C400}_Large.jpg"
          label="センチメンタル通り"
          description="Hachimitsupai"
        ></mm-list-item>

        <mm-radio-group
          legend="옵션"
          name="cart-option"
          value="lifetime"
          .options=${cartOptions}
        ></mm-radio-group>

        <mm-quantity-field
          id="cart-quantity"
          value="1"
          min="1"
          max="99"
          label="수량"
        ></mm-quantity-field>

        <mm-separator></mm-separator>

        <mm-heading level="2">결제 금액</mm-heading>
        <mm-meta-item-group direction="column">
          <mm-meta-item label="상품 금액" value="₩ 16,000"></mm-meta-item>
          <mm-meta-item label="배송비" value="무료"></mm-meta-item>
          <mm-meta-item
            id="cart-total"
            label="총 결제 금액"
            value="₩ 16,000"
            value-size="large"
          ></mm-meta-item>
        </mm-meta-item-group>

        <mm-paragraph>미국 내 $40 이상 주문은 무료로 배송됩니다.</mm-paragraph>
        <mm-button variant="primary" size="large" full-width>결제하기</mm-button>
      </mm-flex>
    </mm-sheet-body>
  </mm-sheet>
`

renderPage(main, { closeSidebar: true, initialize: setupCartSheet })

type ValueElement = HTMLElement & {
  value: string
}

// 여는 동작은 aria-controls를 통해 mm-sheet가 소유한다. 여기서는 시트의 수량에 맞춰 총액만 갱신한다.
function setupCartSheet() {
  setupSectionNav()
  setupPurchaseBar()
  setupReviews()

  const cartQuantity = document.querySelector<ValueElement>('#cart-quantity')
  const cartTotal = document.querySelector<ValueElement>('#cart-total')

  if (!cartQuantity || !cartTotal) return

  cartQuantity.addEventListener('input', () => {
    const quantity = Math.max(1, Number(cartQuantity.value) || 1)
    cartTotal.value = `₩ ${(quantity * 16000).toLocaleString('ko-KR')}`
  })
}

// 구간 이동 버튼 묶음: 누르면 해당 섹션으로 스크롤하고, 스크롤하면 현재 섹션의 버튼이 눌린 상태가 된다.
function setupSectionNav() {
  const nav = document.querySelector<ValueElement>('#section-nav')
  const sections = sectionNavOptions
    .map(option => document.getElementById(option.value))
    .filter((section): section is HTMLElement => section !== null)

  if (!nav || sections.length === 0) return

  // 스크롤 위치가 이 선보다 위로 올라온 마지막 섹션이 현재 섹션이다. 고정된 내비 바로 아래를 기준으로 삼는다.
  const getOffset = () => nav.getBoundingClientRect().bottom
  let isScrolling = false
  let scrollTimer = 0

  const syncCurrentSection = () => {
    if (isScrolling) return

    // 마지막 섹션은 내비 아래까지 올라오지 못하고 페이지 끝에 닿을 수 있어, 바닥에 닿으면 마지막 섹션으로 본다.
    const isAtBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
    if (isAtBottom) {
      nav.value = sections[sections.length - 1].id
      return
    }

    const offset = getOffset() + 1
    const current = sections.filter(section => section.getBoundingClientRect().top <= offset).pop()
    nav.value = current?.id ?? sections[0].id
  }

  nav.addEventListener('change', () => {
    const target = document.getElementById(nav.value)
    if (!target) return

    isScrolling = true
    window.clearTimeout(scrollTimer)
    scrollTimer = window.setTimeout(() => {
      isScrolling = false
    }, 800)

    const top = target.getBoundingClientRect().top + window.scrollY - getOffset()
    window.scrollTo({ top, behavior: 'smooth' })
  })

  window.addEventListener('scroll', syncCurrentSection, { passive: true })
}

// 구매 바는 본문의 구매 버튼이 화면에 보이는 동안 숨기고, 버튼이 시야를 벗어나면 보여 같은 동작이 두 번 겹치지 않게 한다.
function setupPurchaseBar() {
  const cta = document.getElementById('product-cta')
  const purchaseBar = document.getElementById('purchase-bar')

  if (!cta || !purchaseBar) return

  const observer = new IntersectionObserver(([entry]) => {
    purchaseBar.hidden = entry.isIntersecting
  })
  observer.observe(cta)
}

// 평점 열을 누르면 그 점수의 리뷰만, 정렬을 바꾸면 순서만 바뀐다. 두 값은 목록 하나를 함께 정해 한곳에서 다시 그린다.
function setupReviews() {
  const ratingChart = document.querySelector<HTMLElement & { selected: string }>('#review-rating')
  const sortSelect = document.querySelector<ValueElement>('#review-sort')
  const result = document.querySelector<HTMLElement>('#review-result')
  const list = document.querySelector<HTMLElement>('#review-list')

  if (!ratingChart || !sortSelect || !result || !list) return

  const sorters: Record<string, (a: Review, b: Review) => number> = {
    latest: (a, b) => b.timestamp - a.timestamp,
    'rating-high': (a, b) => b.rating - a.rating || b.timestamp - a.timestamp,
    'rating-low': (a, b) => a.rating - b.rating || b.timestamp - a.timestamp,
  }

  const renderReviews = () => {
    const rating = Number.parseInt(ratingChart.selected, 10) || 0
    const filtered = rating ? reviews.filter(review => review.rating === rating) : reviews
    const sorted = [...filtered].sort(sorters[sortSelect.value] ?? sorters.latest)

    result.textContent = rating ? `${rating}점 리뷰 ${sorted.length}개` : `리뷰 ${sorted.length}개`

    if (sorted.length === 0) {
      render(
        html`
          <mm-paragraph>해당 별점의 리뷰가 없습니다.</mm-paragraph>
        `,
        list,
      )
      return
    }

    render(
      html`
        ${sorted.map(
          review => html`
            <mm-review-item
              rating=${review.rating}
              content=${review.content}
              author=${review.author}
              datetime=${review.datetime}
            ></mm-review-item>
          `,
        )}
      `,
      list,
    )
  }

  ratingChart.addEventListener('change', renderReviews)
  sortSelect.addEventListener('change', renderReviews)
  renderReviews()
}
