import '@/components/common'
import { html } from 'lit'

import { code } from '@/components/domains/component'
import '@/components/domains/component/component-notice'

const commerceSizes = ['S', 'M', 'L', 'XL']

const commerceColors = [
  { value: 'black', label: '블랙', color: 'var(--gray800)' },
  { value: 'gray', label: '그레이', color: 'var(--gray400)' },
  { value: 'white', label: '화이트', color: 'var(--gray0)' },
  { value: 'green', label: '그린', color: 'var(--green800)' },
]

const commerceRatingShares = [
  { label: '5점', share: 50, value: '50%' },
  { label: '4점', share: 17, value: '17%' },
  { label: '3점', share: 17, value: '17%' },
  { label: '2점', share: 17, value: '17%' },
  { label: '1점', share: 0, value: '0%' },
]

const handleOptionChange = (event: Event) => {
  const group = event.currentTarget as HTMLElement
  const selected = event.target as PressedItem
  const valueText = group.parentElement?.querySelector('[data-option-value]')
  if (!valueText) return

  Array.from(group.children).forEach(item => {
    ;(item as PressedItem).pressed = item === selected
  })
  valueText.textContent = selected.getAttribute('aria-label') ?? selected.textContent?.trim() ?? ''
}

type PressedItem = HTMLElement & { pressed: boolean; value: string }

// 칩은 각자 토글이지만 옵션은 하나만 고르므로, 눌린 칩 하나만 남기고 선택값을 라벨 옆에 보인다.

export const commercePanel = html`
  <fff-tab-panel value="commerce">
    <fff-content-section-list>
      <fff-paragraph>
        상품을 살펴보고, 옵션을 고르고, 장바구니에 담아 결제하기까지의 흐름입니다. 구매의 단계마다
        사용자가 판단할 정보를 정해진 자리에 놓으므로, 사용자는 어느 상품에서든 같은 순서로 확인하고
        고를 수 있습니다.
      </fff-paragraph>

      <fff-text-block
        level="3"
        heading="구매의 단계"
        description="구매는 탐색, 선택, 담기, 결제 순서로 진행하며 단계마다 쓰이는 컴포넌트가 달라집니다."
      >
        <fff-flex direction="column" gap="2">
          <fff-tag-group>
            <fff-code-tag tone="gold">탐색</fff-code-tag>
            <fff-code-tag>fff-product-image</fff-code-tag>
            <fff-code-tag>fff-product-price</fff-code-tag>
            <fff-code-tag>fff-review-summary</fff-code-tag>
            <fff-code-tag>fff-review-item</fff-code-tag>
          </fff-tag-group>
          <fff-tag-group>
            <fff-code-tag tone="cyan">선택</fff-code-tag>
            <fff-code-tag>fff-toggle-button</fff-code-tag>
            <fff-code-tag>fff-color-chip</fff-code-tag>
            <fff-code-tag>fff-quantity-field</fff-code-tag>
          </fff-tag-group>
          <fff-tag-group>
            <fff-code-tag tone="blue">담기</fff-code-tag>
            <fff-code-tag>fff-product-purchase-bar</fff-code-tag>
            <fff-code-tag>fff-sheet</fff-code-tag>
          </fff-tag-group>
          <fff-tag-group>
            <fff-code-tag tone="orange">결제</fff-code-tag>
            <fff-code-tag>fff-order-price-summary</fff-code-tag>
          </fff-tag-group>
        </fff-flex>
      </fff-text-block>

      <fff-content-section
        heading-level="3"
        heading="가격"
        description="상품 이름 바로 아래에서 사용자가 가장 먼저 비교하는 정보입니다."
        .texts=${[
          '정가, 할인가, 할인율을 함께 보여준다. 할인가만 있으면 사용자는 얼마나 싸졌는지 알 수 없다. 정가는 취소선으로 물러나게 하고 할인가를 굵게 두어, 지금 내는 금액이 먼저 읽힌다',
        ]}
      >
        <fff-component-example width="narrow">
          <fff-product-price
            size="large"
            original-price="₩ 25,000"
            discount="36% 할인"
            price="₩ 16,000"
          ></fff-product-price>
        </fff-component-example>
      </fff-content-section>

      <fff-content-section
        heading-level="3"
        heading="옵션 선택"
        description="사이즈와 색상처럼 주문에 반영되는 값을 고르는 단계입니다."
        .texts=${[
          '고른 옵션의 이름을 레이블 옆에 보여준다. 색상 칩은 색만 보여서, 눌러도 어떤 옵션을 골랐는지 확신하기 어렵다',
          '사이즈·색상은 하나만 고르게 한다. 칩 하나하나는 토글이지만 옵션은 하나만 고르는 값이다. 눌린 칩이 둘이면 어느 쪽이 주문되는지 알 수 없으므로 눌린 칩 하나만 남긴다',
        ]}
      >
        <fff-component-example width="narrow">
          <fff-flex direction="column" gap="4">
            <fff-flex direction="column" gap="2">
              <fff-flex gap="2">
                <fff-text>사이즈</fff-text>
                <fff-text data-option-value>M</fff-text>
              </fff-flex>
              <fff-scroll gap="2" hide-scrollbar @change=${handleOptionChange}>
                ${commerceSizes.map(
                  size => html`
                    <fff-toggle-button value=${size} .pressed=${size === 'M'}>
                      ${size}
                    </fff-toggle-button>
                  `,
                )}
              </fff-scroll>
            </fff-flex>
            <fff-flex direction="column" gap="2">
              <fff-flex gap="2">
                <fff-text>색상</fff-text>
                <fff-text data-option-value>블랙</fff-text>
              </fff-flex>
              <fff-scroll gap="2" hide-scrollbar @change=${handleOptionChange}>
                ${commerceColors.map(
                  option => html`
                    <fff-color-chip
                      value=${option.value}
                      color=${option.color}
                      aria-label=${option.label}
                      .pressed=${option.value === 'black'}
                    ></fff-color-chip>
                  `,
                )}
              </fff-scroll>
            </fff-flex>
            <fff-quantity-field value="1" min="1" max="99" label="수량"></fff-quantity-field>
          </fff-flex>
        </fff-component-example>
      </fff-content-section>

      <fff-content-section
        heading-level="3"
        heading="구매 바"
        description="긴 상품 페이지를 읽는 동안에도 구매 버튼이 손 닿는 곳에 있게 하는 고정 영역입니다."
        .texts=${[
          '본문의 구매 버튼이 보이는 동안에는 구매 바를 숨긴다. 같은 동작이 한 화면에 둘이면 어느 쪽을 눌러야 할지 헷갈리고, 화면 아래 공간만 줄어든다',
          '구매 버튼이 시야를 벗어나면 구매 바로 이어 준다. 긴 상세 설명을 읽다가 구매하려고 맨 위까지 되돌아 올라가지 않아도 된다',
        ]}
      >
        <fff-component-example width="narrow">
          <fff-product-purchase-bar
            image-src="/src/images/cake_gosum.jpg"
            name="뉴닉이 풀어 쓴 경제상식사전"
            price="₩ 16,000"
            original-price="₩ 25,000"
            discount="36% 할인"
          >
            <fff-button slot="action" variant="primary" size="large">장바구니 추가</fff-button>
          </fff-product-purchase-bar>
        </fff-component-example>
        <fff-component-notice heading="장바구니에 담는 방식을 정한다">
          시트에서 옵션과 수량을 정한 뒤 결제로 이어지는 흐름의 규칙은 아직 정하지 않았다
        </fff-component-notice>
      </fff-content-section>

      <fff-content-section
        heading-level="3"
        heading="구간 이동"
        description="상세, 리뷰, 상품정보처럼 길게 이어지는 구간으로 바로 가는 버튼입니다."
        .texts=${[
          '스크롤 위치에 따라 현재 구간의 버튼을 눌린 상태로 둔다. 구간이 길면 사용자는 지금 어디를 읽는지 잃는다. 버튼이 현재 위치를 알려 주고, 누르면 그 구간으로 이동한다',
        ]}
      >
        <fff-component-example width="narrow">
          <fff-toggle-button-group
            value="detail"
            .options=${[
              { value: 'detail', label: '상세' },
              { value: 'review', label: '리뷰' },
              { value: 'info', label: '상품정보' },
            ]}
          ></fff-toggle-button-group>
        </fff-component-example>
      </fff-content-section>

      <fff-content-section
        heading-level="3"
        heading="리뷰"
        description="구매한 사람들의 평가로 상품을 판단하게 하는 구획입니다."
        .texts=${[
          '요약과 목록은 같은 데이터에서 계산한다. 평균 별점·개수가 아래 목록과 맞지 않으면 사용자는 리뷰 전체를 믿지 못한다',
          '별점 분포의 점수를 눌러 그 점수의 리뷰만 걸러 본다. 낮은 점수부터 확인하려는 사용자가 목록 전체를 넘겨 보지 않아도 된다. 걸러진 결과는 "3점 리뷰 1개"처럼 개수와 범위를 함께 적고, 해당하는 리뷰가 없으면 없다고 알린다',
        ]}
      >
        <fff-component-example width="narrow">
          <fff-flex direction="column" gap="4">
            <fff-review-summary rating="4" review-count="6"></fff-review-summary>
            <fff-chart-column
              selectable
              style="--chart-column-width: var(--size-32)"
              .items=${commerceRatingShares}
            ></fff-chart-column>
            <fff-review-item
              rating="5"
              content="포장이 꼼꼼하고 배송도 빨랐어요. 음질이 기대 이상입니다."
              author="Beach House"
              datetime="2021년 2월 14일"
            ></fff-review-item>
          </fff-flex>
        </fff-component-example>
      </fff-content-section>

      <fff-content-section
        heading-level="3"
        heading="Summary"
        description="결제 금액이 어떻게 만들어졌는지 항목별로 보여주는 요약입니다."
        .texts=${[
          '합계에 이르는 항목을 하나씩 풀어 적는다. 상품금액에 배송료와 할인이 더해진 합계만 보이면 사용자는 왜 그 금액인지 확인할 수 없다',
          '최종 결제 금액을 가장 크게 둔다. 항목이 여러 줄이면 마지막에 내는 돈을 놓치기 쉬우므로 합계의 값만 크기로 구별한다',
        ]}
      >
        <fff-component-example width="narrow">
          <fff-order-price-summary
            subtotal="₩ 31,900"
            shipping="₩ 3,000"
            discount="-₩ 2,000"
            total="₩ 32,900"
          ></fff-order-price-summary>
        </fff-component-example>
      </fff-content-section>

      <fff-content-section
        heading-level="3"
        heading="접근성"
        .texts=${[
          html`
            정가와 할인가는 ${code('del')}·${code('ins')}로 구분한다. 스크린리더가 어느 금액이
            정가이고 어느 금액이 실제 가격인지 구별해 읽는다. 취소선만으로는 소리로 전달되지 않는다
          `,
          html`
            별점은 숫자로 읽히게 한다. 별 아이콘은 읽히지 않으므로 ${code('fff-review-summary')}는
            "5점 만점에 4점"을, ${code('fff-review-item')}은 "5점"을 ${code('role="img"')}의
            이름으로 준다
          `,
          html`
            색상 칩에는 색의 이름을 준다. 색만 보이는 칩은 소리로 구별할 수 없으므로
            ${code('aria-label')}로 "블랙"처럼 이름을 붙인다
          `,
          html`
            시트를 여는 버튼은 시트를 가리키고 팝업임을 알린다. ${code('aria-controls')}로 시트를
            가리키고 ${code('aria-haspopup="dialog"')}로 누르면 대화상자가 열린다고 알린다
          `,
        ]}
      ></fff-content-section>
    </fff-content-section-list>
  </fff-tab-panel>
`
