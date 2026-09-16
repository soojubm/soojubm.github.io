import { html } from 'lit'

import { ICON_NAMES } from '@/components/common'
import { renderPage } from '@/components/layouts/base-layouts'
import './product.css'

const main = html`
  <mm-main class="product">
    <mm-flex direction="column" gap="section">
      <mm-flex direction="column" gap="4">
        <mm-button>Back to Home</mm-button>

        <mm-grid columns="2" gap="8" class="product-head">
          <section class="product-image" role="img" aria-labelledby="제품 이미지">
            <mm-thumbnail
              src="/src/images/AlbumArt_{B5020207-474E-4720-B8A7-C6073790C400}_Large.jpg"
              alt="제품 이미지"
              ratio="1:1"
            ></mm-thumbnail>
          </section>

          <mm-flex direction="column" gap="section">
            <mm-flex direction="column" gap="3">
              <mm-paragraph
                style="
            display: inline-flex;
            width: fit-content;
            background: var(--background-subtle-color);
            padding: var(--space-1) var(--space-4);
            border-radius: 50px;
            font-weight: var(--font-weight-bold);
          "
              >
                <a href="#">Hachimitsupai</a>
              </mm-paragraph>
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
              <mm-review-summary rating="4.8" review-count="116"></mm-review-summary>
            </mm-flex>

            <form>
              <mm-flex direction="column" gap="2">
                <mm-number-input value="1" min="1" max="99" label="수량"></mm-number-input>

                <mm-button-group>
                  <mm-button
                    aria-controls="cart-sheet"
                    aria-haspopup="dialog"
                    variant="primary"
                    size="large"
                    full-width
                  >
                    장바구니 추가
                  </mm-button>
                  <mm-icon-button
                    variant="ghost"
                    icon=${ICON_NAMES.FAVORITE}
                    aria-label="찜하기"
                  ></mm-icon-button>
                </mm-button-group>

                <!-- TODO text-list -->
                <div>
                  <mm-flex align-items="center" gap="1">
                    <mm-icon name=${ICON_NAMES.DELIVERY}></mm-icon>
                    <mm-paragraph>Free shipping on all U.S. orders of $40+</mm-paragraph>
                  </mm-flex>
                  <mm-flex align-items="center" gap="1">
                    <mm-icon name=${ICON_NAMES.BOX}></mm-icon>
                    <mm-paragraph>Free returns and exchanges</mm-paragraph>
                  </mm-flex>
                </div>
              </mm-flex>
            </form>
          </mm-flex>
        </mm-grid>
      </mm-flex>

      <!-- 마케팅 스토리: 중앙 정렬 + 특징 -->
      <mm-grid columns="1" gap="4">
        <mm-text-block
          centered
          level="1"
          eyebrow="Why prebiotics?"
          heading="Prebiotics are fibers that feed good bacteria"
          description="And good bacteria creates a healthy oral environment. In addition to positively impacting the things you can taste and feel, like fresher breath and less sensitive teeth, a balanced oral environment is directly linked to cardiovascular, respiratory, and immune health."
        ></mm-text-block>
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
        <mm-text-block
          level="1"
          eyebrow="Why prebiotics?"
          heading="Prebiotics are fibers that feed good bacteria"
          description="And good bacteria creates a healthy oral environment. In addition to positively impacting the things you can taste and feel, like fresher breath and less sensitive teeth, a balanced oral environment is directly linked to cardiovascular, respiratory, and immune health."
        ></mm-text-block>
        <mm-thumbnail ratio="1:1"></mm-thumbnail>
      </mm-grid>

      <!-- 마케팅 스토리: bleed 배경 + 특징 -->
      <section class="product-story-bleed">
        <mm-grid columns="1" gap="4">
          <mm-text-block
            centered
            level="1"
            eyebrow="Why prebiotics?"
            heading="Prebiotics are fibers that feed good bacteria"
            description="And good bacteria creates a healthy oral environment. In addition to positively impacting the things you can taste and feel, like fresher breath and less sensitive teeth, a balanced oral environment is directly linked to cardiovascular, respiratory, and immune health."
          ></mm-text-block>
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
      </section>

      <!-- 마케팅 스토리: 이미지 + 텍스트 -->
      <mm-grid columns="2" gap="8">
        <mm-thumbnail ratio="1:1"></mm-thumbnail>
        <mm-text-block
          level="1"
          eyebrow="Why prebiotics?"
          heading="Prebiotics are fibers that feed good bacteria"
          description="And good bacteria creates a healthy oral environment. In addition to positively impacting the things you can taste and feel, like fresher breath and less sensitive teeth, a balanced oral environment is directly linked to cardiovascular, respiratory, and immune health."
        ></mm-text-block>
      </mm-grid>

      <!-- 리뷰 -->
      <mm-flex as="section" direction="column" gap="8">
        <mm-text-block
          centered
          level="1"
          heading="Loved By Over +70,000 Smiles!"
          description="Toothpaste so good, you’ll actually look forward to brushing —just ask our customers."
        ></mm-text-block>
        <mm-grid columns="2" gap="4">
          <mm-review-item
            rating="5"
            content="I have 2 kids so sleep is hard to come by, these have helped me to wake up feeling more refreshed and ready to start the day"
            author="Fleet Foxes"
            datetime="2020년 12월 1일"
          ></mm-review-item>
          <mm-review-item
            rating="5"
            content="I have 2 kids so sleep is hard to come by, these have helped me to wake up feeling more refreshed and ready to start the day"
            author="Fleet Foxes"
            datetime="2020년 12월 1일"
          ></mm-review-item>
        </mm-grid>
      </mm-flex>

      <!-- 상품 상세정보 고지 -->
      <section class="product-detail-summary">
        <mm-heading level="2">상품상세정보 고지</mm-heading>
        <mm-meta-item-group style="margin: var(--space-3) 0">
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
      </section>
    </mm-flex>

    <mm-fixed-bottom>
      <mm-flex>
        <mm-flex>
          <mm-order-product-item
            image-src="/src/images/cake_gosum.jpg"
            name="뉴닉이 풀어 쓴 경제상식사전"
            option="평생 소장"
          ></mm-order-product-item>
          <mm-product-price
            size="large"
            original-price="₩ 25,000"
            price="₩ 16,000"
            discount="36% 할인"
          ></mm-product-price>
        </mm-flex>
        <mm-button aria-controls="cart-sheet" aria-haspopup="dialog" variant="primary" size="large">
          장바구니 추가
        </mm-button>
      </mm-flex>
    </mm-fixed-bottom>
  </mm-main>

  <mm-sheet
    id="cart-sheet"
    placement="right"
    width="medium"
    style="--overlay-panel-backdrop-blur: 2px"
  >
    <mm-sheet-header heading="장바구니"></mm-sheet-header>
    <mm-sheet-body>
      <mm-flex direction="column" gap="4">
        <mm-list-item
          size="80"
          avatar-src="/src/images/AlbumArt_{B5020207-474E-4720-B8A7-C6073790C400}_Large.jpg"
          label="センチメンタル通り"
          description="Hachimitsupai"
        ></mm-list-item>

        <mm-number-input
          id="cart-quantity"
          value="1"
          min="1"
          max="99"
          label="수량"
        ></mm-number-input>

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

// 여는 동작은 aria-controls를 통해 mm-sheet가 소유한다. 여기서는 담을 수량만 시트로 옮긴다.
function setupCartSheet() {
  const triggers = document.querySelectorAll<HTMLElement>('[aria-controls="cart-sheet"]')
  const productQuantity = document.querySelector<ValueElement>('.product-info mm-number-input')
  const cartQuantity = document.querySelector<ValueElement>('#cart-quantity')
  const cartTotal = document.querySelector<ValueElement>('#cart-total')

  if (!triggers.length || !cartQuantity || !cartTotal) return

  const updateTotal = () => {
    const quantity = Math.max(1, Number(cartQuantity.value) || 1)
    cartTotal.value = `₩ ${(quantity * 16000).toLocaleString('ko-KR')}`
  }

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      cartQuantity.value = productQuantity?.value || '1'
      updateTotal()
    })
  })

  cartQuantity.addEventListener('input', updateTotal)
}
