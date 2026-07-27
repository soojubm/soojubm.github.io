import { html } from 'lit'

import { renderLayout } from '../../layouts/base-layouts'

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
    heading: '계정',
    items: [
      {
        question: '비밀번호를 잊어버렸어요.',
        answer:
          '로그인 화면의 "비밀번호 찾기"를 통해 가입 이메일로 재설정 링크를 받을 수 있습니다.',
      },
      {
        question: '이메일 주소를 변경하고 싶어요.',
        answer: '마이페이지 → 계정 설정 → 이메일 변경에서 인증 후 변경할 수 있습니다.',
      },
    ],
  },
  {
    heading: '주문 / 결제',
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
    heading: '배송',
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
  <mm-flex direction="column" gap="3">
    <mm-paragraph size="large">${heading}</mm-paragraph>
    <mm-accordion exclusive>
      ${items.map(
        ({ question, answer }) => html`
          <mm-accordion-item summary=${question}>
            <mm-paragraph>${answer}</mm-paragraph>
          </mm-accordion-item>
        `,
      )}
    </mm-accordion>
  </mm-flex>
`

const main = html`
  <mm-page width="small">
    <mm-flex direction="column" gap="8">
      <mm-page-header
        heading="자주 묻는 질문"
        description="자주 묻는 질문을 모았습니다. 원하는 답을 찾지 못했다면 고객센터로 문의해 주세요."
      ></mm-page-header>

      <mm-flex direction="column" gap="6">${faqCategories.map(renderFaqCategory)}</mm-flex>
    </mm-flex>
  </mm-page>
`

document.addEventListener('DOMContentLoaded', () => {
  renderLayout(main, { closeSidebar: true })
})
