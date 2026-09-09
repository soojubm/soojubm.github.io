import { html } from 'lit'

import { renderPage } from '@/components/layouts/base-layouts'
import './checkout.css'

// 주문상품 줄은 주문/결제와 주문완료 화면이 같은 형태로 쓴다.
const orderedProduct = html`
  <mm-order-product-item
    image-src="/src/images/cake_gosum.jpg"
    name="뉴닉이 풀어 쓴 경제상식사전"
    option="평생 소장"
    price="₩ 11,900"
  ></mm-order-product-item>
`

const main = html`
  <mm-page>
    <mm-flex class="checkout" direction="column" gap="section">
      <!-- 장바구니 -->
      <mm-flex as="section" direction="column" gap="6">
        <mm-top-bar heading="장바구니"></mm-top-bar>

        <mm-flex direction="column">
          <mm-flex direction="column" gap="3">
            <mm-order-product-item
              image-src="/src/images/newneek-book.png"
              name="폰타나 베네치아 로스티드 쉬림프 크림"
              option="Brown, 3개"
              price="₩ 22,500"
            ></mm-order-product-item>
            <mm-button>수량/옵션 변경</mm-button>
          </mm-flex>

          <mm-separator></mm-separator>

          <mm-list-item
            label="AppleCare+ for Macbook/MacBook Air"
            description="Automatically registered with your Apple hardware."
          >
            <mm-text slot="trailing">₩ 20,000</mm-text>
          </mm-list-item>

          <mm-separator></mm-separator>

          <mm-flex as="footer" direction="column" gap="4">
            <mm-meta-item-group direction="column" gap="2">
              <mm-meta-item label="총 상품금액" value="₩ 30,000"></mm-meta-item>
              <mm-meta-item label="배송료" value="₩ 3,000"></mm-meta-item>
              <mm-meta-item label="할인" value="₩ 2,000"></mm-meta-item>
              <mm-meta-item
                label="최종 결제 금액"
                value="₩ 37,000"
                value-size="large"
              ></mm-meta-item>
            </mm-meta-item-group>
            <mm-button variant="primary" size="large" full-width>결제</mm-button>
          </mm-flex>
        </mm-flex>
      </mm-flex>

      <!-- 배송지 등록 -->
      <mm-flex as="section" direction="column" gap="6">
        <mm-top-bar heading="배송지 등록"></mm-top-bar>

        <mm-flex direction="column" gap="3">
          <mm-textfield
            label="받는 사람"
            type="text"
            name="recipient"
            id="checkout-recipient"
            placeholder="수줍이"
          ></mm-textfield>
          <mm-textfield
            label="연락처"
            type="text"
            name="phone"
            id="checkout-phone"
            placeholder="01012345678"
          ></mm-textfield>
          <mm-textfield
            label="주소"
            type="text"
            name="address"
            id="checkout-address"
            placeholder="클릭하여 우편번호 찾기"
          ></mm-textfield>
          <mm-textfield
            label="상세주소"
            type="text"
            name="address-detail"
            id="checkout-address-detail"
            placeholder="동 호수"
            optional
          ></mm-textfield>
          <mm-textfield
            label="배송 메시지"
            type="text"
            name="message"
            id="checkout-message"
            placeholder="직접 입력"
            optional
          ></mm-textfield>
        </mm-flex>

        <mm-flex as="footer" direction="column" gap="3">
          <mm-checkbox size="large">개인정보 수집 및 이용 동의</mm-checkbox>
          <mm-button variant="primary" size="large" full-width>배송지 등록</mm-button>
        </mm-flex>
      </mm-flex>

      <!-- 주문/결제 -->
      <mm-flex as="section" direction="column" gap="6">
        <mm-top-bar heading="주문/결제"></mm-top-bar>

        <mm-content-section-list>
          <mm-content-section heading="배송지" heading-level="3">
            <mm-surface>
              <mm-menu-item-radio-group name="shipping" value="default" aria-label="배송지 선택">
                <mm-menu-item-radio value="default">
                  <mm-flex direction="column" gap="1">
                    <mm-flex gap="1">
                      <mm-paragraph>수줍이 집</mm-paragraph>
                      <mm-tag>기본배송지</mm-tag>
                    </mm-flex>
                    <mm-paragraph>[07655] 서울특별시 강서구 까치산로 182 1202호</mm-paragraph>
                    <mm-paragraph color="light">010-3121-7045</mm-paragraph>
                  </mm-flex>
                </mm-menu-item-radio>
                <mm-menu-item-radio value="office">
                  <mm-flex direction="column" gap="1">
                    <mm-paragraph>회사</mm-paragraph>
                    <mm-paragraph>[03925] 서울특별시 마포구 월드컵북로 400 상암동</mm-paragraph>
                    <mm-paragraph color="light">010-9876-5432</mm-paragraph>
                  </mm-flex>
                </mm-menu-item-radio>
              </mm-menu-item-radio-group>
            </mm-surface>
            <mm-add-button>배송지 변경/추가</mm-add-button>
          </mm-content-section>

          <mm-content-section heading="주문상품" heading-level="3">
            ${orderedProduct}
          </mm-content-section>

          <mm-content-section heading="쿠폰 마일리지 할인" heading-level="3">
            <mm-textfield
              label="보너스 쿠폰"
              placeholder="사용 가능한 쿠폰이 없습니다."
              disabled
            ></mm-textfield>
            <mm-textfield label="사용 마일리지" placeholder="0 마일리지"></mm-textfield>
            <mm-button>보유 마일리지 1,186p 모두사용</mm-button>
          </mm-content-section>

          <mm-content-section heading="결제수단" heading-level="3">
            <mm-surface>
              <mm-menu-item-radio-group name="payment" value="card" aria-label="결제수단 선택">
                <mm-menu-item-radio
                  value="card"
                  label="신용카드/체크카드"
                  description="개인/법인/카드사선택"
                ></mm-menu-item-radio>
                <mm-menu-item-radio value="cash" label="현금"></mm-menu-item-radio>
                <mm-menu-item-radio value="bank" label="무통장입금" disabled></mm-menu-item-radio>
              </mm-menu-item-radio-group>
            </mm-surface>

            <!-- TODO 카드 정보(소유자·번호·유효기간·CVV·청구지)는 별도 화면에서 관리한다. -->
            <mm-list-item
              size="48"
              icon="credit-card"
              label="VISA 1988 XXXX 1111"
              description="Expires on 10/23"
            >
              <mm-link slot="trailing" href="#">수정</mm-link>
            </mm-list-item>
            <mm-add-button>결제수단 추가</mm-add-button>

            <mm-notice
              heading="결제 안내"
              description="신용카드 결제만 가능하며, 해외에서 발행된 카드는 이용할 수 없습니다."
            ></mm-notice>
            <mm-notice heading="주문취소 및 환불 안내">
              <mm-paragraph>
                주문취소 또는 환불은
                <mm-link href="#">고객센터</mm-link>
                로 문의해 주세요.
              </mm-paragraph>
            </mm-notice>
          </mm-content-section>

          <mm-content-section heading="결제상세" heading-level="3">
            <mm-meta-item-group direction="column" gap="2">
              <mm-meta-item label="마일리지 사용" value="980원"></mm-meta-item>
              <mm-meta-item label="카드 결제" value="12,980원"></mm-meta-item>
              <mm-meta-item label="합계" value="13,980원" value-size="large"></mm-meta-item>
            </mm-meta-item-group>

            <mm-surface>
              <mm-flex direction="column" gap="4">
                <mm-meta-item-group direction="column" gap="2">
                  <mm-meta-item label="상품 금액" value="₩ 160,000"></mm-meta-item>
                  <mm-meta-item label="서비스 수수료" value="₩ 3,000"></mm-meta-item>
                  <mm-meta-item
                    label="총 합계 (KRW)"
                    value="₩ 163,000"
                    value-size="large"
                  ></mm-meta-item>
                </mm-meta-item-group>
                <mm-button variant="primary" size="large" full-width>구매 확정</mm-button>
              </mm-flex>
            </mm-surface>
          </mm-content-section>
        </mm-content-section-list>
      </mm-flex>

      <!-- 주문완료 -->
      <mm-flex as="section" direction="column" gap="6">
        <mm-text-block
          centered
          level="2"
          heading="주문완료 되었습니다."
          description="2024.08.19 23:55"
        ></mm-text-block>

        <mm-surface>
          <mm-flex direction="column">
            <mm-flex as="header" align-items="center" justify-content="between" gap="2">
              <mm-paragraph color="light">주문번호</mm-paragraph>
              <mm-link href="#">2024040436292081</mm-link>
            </mm-flex>

            <mm-separator></mm-separator>

            <mm-text-block
              level="4"
              heading="수줍이"
              description="서울특별시 중구 퇴계로27길 49 (저동2가, 센트럴에쓰) 2층 (04555), 010-3121-7045"
            ></mm-text-block>

            <mm-separator></mm-separator>

            <mm-flex direction="column" gap="2">
              <mm-text-block
                level="4"
                heading="주문상품 1건"
                description="13:00 까지 결제 시 오늘 발송"
              ></mm-text-block>
              ${orderedProduct}
            </mm-flex>

            <mm-separator></mm-separator>

            <mm-flex as="footer" direction="column">
              <mm-meta-item-group direction="column" gap="2">
                <mm-meta-item label="상품금액" value="30,000원"></mm-meta-item>
                <mm-meta-item label="배송료" value="3,000원"></mm-meta-item>
                <mm-meta-item label="할인" value="2,000원"></mm-meta-item>
                <mm-meta-item label="주문금액" value="13,980원" value-size="large"></mm-meta-item>
              </mm-meta-item-group>

              <mm-separator></mm-separator>

              <mm-flex direction="column" gap="4">
                <mm-meta-item label="결제상세" value="카드 간편결제"></mm-meta-item>
                <mm-button variant="secondary" size="large" full-width>주문 상세 보기</mm-button>
              </mm-flex>
            </mm-flex>
          </mm-flex>
        </mm-surface>

        <mm-surface>
          <mm-meta-item label="포인트 혜택" value="최대 1,147원" value-size="large"></mm-meta-item>
        </mm-surface>
      </mm-flex>
    </mm-flex>
  </mm-page>
`

renderPage(main, { closeSidebar: true })
