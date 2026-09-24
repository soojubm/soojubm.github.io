/** 예제 페이지가 공유하는 카테고리 목록. n번째 항목이 mm-category-tag의 category n과 짝을 이룬다. */
export const CATEGORIES = [
  '제품',
  '디자인',
  '엔지니어링',
  '가이드',
  '리서치',
  '계정',
  '주문 / 결제',
  '배송',
]

export const POSTS = [
  {
    title: '새 레이아웃 엔진으로 더 빠르게 화면 조립하기',
    category: CATEGORIES[0],
    date: '2024년 3월 18일',
  },
  {
    title: '디자인 토큰을 테마마다 일관되게 관리하는 방법',
    category: CATEGORIES[1],
    date: '2024년 2월 27일',
  },
  {
    title: 'Custom color palettes from a single brand color',
    category: CATEGORIES[2],
    date: '2024년 2월 9일',
  },
  {
    title: '제로 설정 셋업으로 첫 페이지를 배포하기까지',
    category: CATEGORIES[3],
    date: '2024년 1월 22일',
  },
]
