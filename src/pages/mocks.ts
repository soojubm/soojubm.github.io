import type { CategoryTone } from '@/components/common/tag/tag.styles'

export type CategoryKey = 'product' | 'design' | 'engineering' | 'guide'

/** 예제 페이지가 공유하는 카테고리. 키 하나로 라벨과 톤을 함께 찾는다. */
export const CATEGORIES: Record<CategoryKey, { label: string; tone: CategoryTone }> = {
  product: { label: '제품', tone: 'pink' },
  design: { label: '디자인', tone: 'orange' },
  engineering: { label: '엔지니어링', tone: 'cyan' },
  guide: { label: '가이드', tone: 'purple' },
}

export const TOPICS = [
  'HTML5',
  'VanillaJS',
  'ReactJS',
  'WebComponents',
  'Typescript',
  'GoogleAnalytics',
  'Figma',
]

export interface PostSummary {
  title: string
  category: CategoryKey
  date: string
}

export const POSTS: PostSummary[] = [
  {
    title: '새 레이아웃 엔진으로 더 빠르게 화면 조립하기',
    category: 'product',
    date: '2024년 3월 18일',
  },
  {
    title: '디자인 토큰을 테마마다 일관되게 관리하는 방법',
    category: 'design',
    date: '2024년 2월 27일',
  },
  {
    title: 'Custom color palettes from a single brand color',
    category: 'engineering',
    date: '2024년 2월 9일',
  },
  {
    title: '제로 설정 셋업으로 첫 페이지를 배포하기까지',
    category: 'guide',
    date: '2024년 1월 22일',
  },
]
