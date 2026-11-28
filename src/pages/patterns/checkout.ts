import { html } from 'lit'

import type { Sheet } from '@/components/overlay/sheet/sheet'
import type { MenuOptionItem } from '@/types'

import { ICON_NAMES } from '@/components/common'
import { renderPage } from '@/components/layouts/base-layouts'
import { findSitemapItem } from '@/sitemap'

import './checkout.css'

// 주문상품 줄은 주문/결제와 주문완료 화면이 같은 형태로 쓴다.
const orderedProduct = html`
  <fff-order-product-item
    image-src="/src/images/cake_gosum.jpg"
    name="뉴닉이 풀어 쓴 경제상식사전"
    option="평생 소장"
    price="₩ 11,900"
  ></fff-order-product-item>
`

// 결제 화면과 주문완료 화면이 같은 금액 요약을 쓴다.
const priceSummary = html`
  <fff-order-price-summary
    subtotal="₩ 31,900"
    shipping="₩ 3,000"
    discount="-₩ 2,000"
    total="₩ 32,900"
  ></fff-order-price-summary>
`

const paymentOptions: MenuOptionItem[] = [
  { value: 'card', label: '신용카드/체크카드', description: '개인/법인/카드사선택' },
  { value: 'cash', label: '현금' },
  { value: 'bank', label: '무통장입금', disabled: true },
]

const closeShippingSheet = () => {
  document.querySelector<Sheet>('#shipping-sheet')?.close()
}

const main = html`
  <fff-fixed-top class="checkout-header">
    <fff-top-bar id="checkout-top-bar" heading="주문/결제"></fff-top-bar>
  </fff-fixed-top>
  <fff-main width="small">
    <fff-flex direction="column" gap="section">
      <!-- 주문/결제 -->
      <fff-checkout-screen aria-label="주문/결제">
        <fff-flex direction="column" gap="section">
          <fff-checkout-section heading="주문상품">
            <fff-flex direction="column" gap="3">
              ${orderedProduct}
              <fff-list-item
                size="medium"
                label="AppleCare+ for Macbook/MacBook Air"
                description="Automatically registered with your Apple hardware."
              >
                <fff-text slot="trailing">₩ 20,000</fff-text>
              </fff-list-item>
              <fff-button>수량/옵션 변경</fff-button>
            </fff-flex>
          </fff-checkout-section>

          <fff-checkout-section heading="배송지">
            <fff-flex direction="column" gap="3">
              <fff-radio-card-group name="shipping" value="default" legend="배송지 선택">
                <fff-radio-card value="default">
                  <fff-flex gap="1">
                    <fff-paragraph>수줍이 집</fff-paragraph>
                    <fff-tag>기본배송지</fff-tag>
                  </fff-flex>
                  <fff-paragraph>[07655] 서울특별시 강서구 까치산로 182 1202호</fff-paragraph>
                  <fff-paragraph color="light">010-3121-7045</fff-paragraph>
                </fff-radio-card>
                <fff-radio-card value="office">
                  <fff-paragraph>회사</fff-paragraph>
                  <fff-paragraph>[03925] 서울특별시 마포구 월드컵북로 400 상암동</fff-paragraph>
                  <fff-paragraph color="light">010-9876-5432</fff-paragraph>
                </fff-radio-card>
              </fff-radio-card-group>
              <fff-add-button
                label="배송지 변경/추가"
                aria-controls="shipping-sheet"
                aria-haspopup="dialog"
              ></fff-add-button>
            </fff-flex>
          </fff-checkout-section>

          <fff-checkout-section heading="결제수단">
            <fff-flex direction="column" gap="3">
              <fff-list-item size="medium" label="보너스 쿠폰">
                <fff-select
                  slot="trailing"
                  variant="tertiary"
                  aria-label="보너스 쿠폰"
                  value="welcome"
                  .options=${[
                    { value: 'welcome', label: '신규 가입 쿠폰 (-₩ 2,000)' },
                    { value: 'birthday', label: '생일 쿠폰 (-₩ 3,000)', disabled: true },
                    { value: 'none', label: '쿠폰 적용 안 함' },
                  ]}
                ></fff-select>
              </fff-list-item>
              <fff-textfield
                label="사용 마일리지"
                placeholder="0 마일리지"
                value="980"
              ></fff-textfield>
              <fff-button>보유 마일리지 1,186p 모두사용</fff-button>
            </fff-flex>

            <fff-flex direction="column" gap="3">
              <fff-surface>
                <fff-menu-item-radio-group
                  name="payment"
                  value="card"
                  aria-label="결제수단 선택"
                  .options=${paymentOptions}
                ></fff-menu-item-radio-group>
              </fff-surface>

              <fff-list-item
                size="medium"
                icon=${ICON_NAMES.CREDIT_CARD}
                label="VISA 1988 XXXX 1111"
                description="Expires on 10/23"
              >
                <fff-link slot="trailing" href="#">수정</fff-link>
              </fff-list-item>
              <fff-add-button label="결제수단 추가"></fff-add-button>
            </fff-flex>

            <fff-notice
              description="신용카드 결제만 가능하며, 해외에서 발행된 카드는 이용할 수 없습니다."
            >
              <fff-paragraph>
                주문취소 또는 환불은
                <fff-link href="#">고객센터</fff-link>
                로 문의해 주세요.
              </fff-paragraph>
            </fff-notice>
          </fff-checkout-section>

          <fff-checkout-section heading="결제상세">
            <fff-surface>
              <fff-flex direction="column" gap="4">
                ${priceSummary}
                <fff-meta-item-group
                  direction="column"
                  .items=${[
                    { label: '마일리지 사용', value: '₩ 980' },
                    { label: '카드 결제', value: '₩ 31,920' },
                    { label: '적립 예정 포인트', value: '최대 1,147원' },
                  ]}
                ></fff-meta-item-group>
                <fff-button variant="primary" size="large" full-width>결제</fff-button>
              </fff-flex>
            </fff-surface>
          </fff-checkout-section>
        </fff-flex>
      </fff-checkout-screen>

      <!-- 주문완료 -->
      <fff-checkout-screen aria-label="주문완료">
        <fff-text-block
          centered
          level="2"
          heading="주문완료 되었습니다."
          description="2024.08.19 23:55"
        ></fff-text-block>

        <fff-surface>
          <fff-flex direction="column">
            <fff-flex as="header" align-items="center" justify-content="space-between" gap="2">
              <fff-paragraph color="light">주문번호</fff-paragraph>
              <fff-link href="#">2024040436292081</fff-link>
            </fff-flex>

            <fff-separator></fff-separator>

            <fff-text-block
              level="4"
              heading="수줍이"
              description="서울특별시 중구 퇴계로27길 49 (저동2가, 센트럴에쓰) 2층 (04555), 010-3121-7045"
            ></fff-text-block>

            <fff-separator></fff-separator>

            <fff-flex direction="column" gap="2">
              <fff-text-block
                level="4"
                heading="주문상품 1건"
                description="13:00 까지 결제 시 오늘 발송"
              ></fff-text-block>
              ${orderedProduct}
            </fff-flex>

            <fff-separator></fff-separator>

            <fff-flex as="footer" direction="column">
              ${priceSummary}

              <fff-separator></fff-separator>

              <fff-flex direction="column" gap="4">
                <fff-meta-item-group
                  direction="column"
                  .items=${[
                    { label: '결제상세', value: '카드 간편결제 + 마일리지' },
                    { label: '포인트 혜택', value: '최대 1,147원' },
                  ]}
                ></fff-meta-item-group>
                <fff-button variant="secondary" size="large" full-width>주문 상세 보기</fff-button>
              </fff-flex>
            </fff-flex>
          </fff-flex>
        </fff-surface>
      </fff-checkout-screen>
    </fff-flex>
  </fff-main>

  <fff-sheet id="shipping-sheet" placement="bottom">
    <fff-sheet-header heading="배송지 등록"></fff-sheet-header>
    <fff-sheet-body>
      <fff-flex direction="column" gap="6">
        <fff-flex direction="column" gap="3">
          <fff-textfield
            label="받는 사람"
            type="text"
            name="recipient"
            placeholder="수줍이"
          ></fff-textfield>
          <fff-textfield
            label="연락처"
            type="text"
            name="phone"
            placeholder="01012345678"
          ></fff-textfield>
          <fff-textfield
            label="주소"
            type="text"
            name="address"
            placeholder="클릭하여 우편번호 찾기"
          ></fff-textfield>
          <fff-textfield
            label="상세주소"
            type="text"
            name="address-detail"
            placeholder="동 호수"
            optional
          ></fff-textfield>
          <fff-textfield
            label="배송 메시지"
            type="text"
            name="message"
            placeholder="직접 입력"
            optional
          ></fff-textfield>
        </fff-flex>
        <fff-checkbox size="large">개인정보 수집 및 이용 동의</fff-checkbox>
      </fff-flex>
    </fff-sheet-body>
    <fff-sheet-footer
      .primaryAction=${{ label: '배송지 등록', onClick: closeShippingSheet }}
    ></fff-sheet-footer>
  </fff-sheet>
`

const checkoutPage = findSitemapItem('checkout')

renderPage(main, {
  closeSidebar: true,
  navbar: !checkoutPage?.hideNavbar,
  initialize: () => {
    document.getElementById('checkout-top-bar')?.addEventListener('nav-click', () => {
      history.back()
    })
  },
})
