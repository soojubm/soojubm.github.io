import { html } from 'lit'

import { renderPage } from '@/components/layouts/base-layouts'
import { CATEGORIES } from '@/pages/mocks'

interface FaqItem {
  question: string
  answer: string
}

interface FaqCategory {
  heading: string
  items: FaqItem[]
}

const faqCategories: FaqCategory[] = [
  {
    heading: CATEGORIES[5],
    items: [
      {
        question: '이메일 주소를 변경하고 싶어요.',
        answer: '마이페이지 → 계정 설정 → 이메일 변경에서 인증 후 변경할 수 있습니다.',
      },
    ],
  },
  {
    heading: CATEGORIES[6],
    items: [
      {
        question: '주문을 취소하고 싶어요.',
        answer:
          '배송 준비 전까지는 마이페이지 → 주문 내역에서 직접 취소할 수 있습니다. 이후에는 고객센터로 문의해 주세요.',
      },
      {
        question: '결제 영수증은 어디서 확인하나요?',
        answer: '마이페이지 → 결제 내역에서 영수증을 확인하고 다운로드할 수 있습니다.',
      },
    ],
  },
  {
    heading: CATEGORIES[7],
    items: [
      {
        question: '배송은 얼마나 걸리나요?',
        answer:
          '결제 완료 후 평균 2~3일 이내에 배송됩니다. 도서산간 지역은 1~2일 추가될 수 있습니다.',
      },
      {
        question: '배송지를 변경할 수 있나요?',
        answer: '상품 준비 중 상태까지는 마이페이지에서 배송지를 변경할 수 있습니다.',
      },
    ],
  },
]

const renderFaqCategory = ({ heading, items }: FaqCategory) => html`
  <mm-content-section heading-level="3" heading=${heading}>
    <mm-faq-list>
      ${items.map(
        ({ question, answer }) => html`
          <mm-faq-item question=${question}>
            <mm-paragraph>${answer}</mm-paragraph>
          </mm-faq-item>
        `,
      )}
    </mm-faq-list>
  </mm-content-section>
`

const main = html`
  <mm-main width="small">
    <mm-flex direction="column" gap="8">
      <mm-page-header
        heading="자주 묻는 질문"
        description="원하는 답을 찾지 못했다면 고객센터로 문의해 주세요."
      ></mm-page-header>

      <mm-flex direction="column" gap="6">${faqCategories.map(renderFaqCategory)}</mm-flex>
    </mm-flex>
  </mm-main>
`

renderPage(main, { closeSidebar: true })
