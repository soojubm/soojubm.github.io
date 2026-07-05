// webpack.config.js가 ts-node로 직접 로드하므로 @/ alias 대신 상대경로를 유지한다.
import { ICON_NAMES, type IconName } from './components/icon-button/semantics/icon-names'

interface SitemapItem {
  id: string
  name: string
  badge?: string
  hidden?: boolean
}

interface SitemapStandaloneNode {
  type: 'standalone'
  id: string
  title: string
  icon: IconName
}

interface SitemapGroupNode {
  type: 'group'
  id: string
  title: string
  icon: IconName
  items: SitemapItem[]
}

type SitemapNode = SitemapStandaloneNode | SitemapGroupNode

export const SITEMAP: SitemapNode[] = [
  // 1. 상단 독립 메뉴 (Top-level Links)
  {
    type: 'standalone',
    id: 'index',
    title: '홈',
    icon: ICON_NAMES.HOME_PAGE,
  },
  {
    type: 'standalone',
    id: 'tokens',
    title: 'Tokens',
    icon: ICON_NAMES.PALETTE,
  },
  {
    type: 'standalone',
    id: 'signifier',
    title: 'Signifier',
    icon: ICON_NAMES.DESIGN,
  },

  // 2. 접고 펼치는 메뉴 그룹
  {
    type: 'group',
    id: 'visual-information',
    title: 'Visual Information',
    icon: ICON_NAMES.FLOWER,
    items: [
      { id: 'avatar', name: 'avatar' },
      { id: 'text', name: 'text' },
      { id: 'tag', name: 'tag' },
      { id: 'thumbnail', name: 'thumbnail' },
    ],
  },
  {
    type: 'group',
    id: 'structure',
    title: 'Structure',
    icon: ICON_NAMES.BOX,
    items: [
      { id: 'surface', name: 'surface' },
      { id: 'separator', name: 'separator' },
      { id: 'list-row', name: 'list row' },
      { id: 'sheet', name: 'sheet' },
      { id: 'popover', name: 'popover' },
      { id: 'table', name: 'table' },
    ],
  },
  {
    type: 'group',
    id: 'actions',
    title: 'Actions',
    icon: ICON_NAMES.MOUSE_BUTTON,
    items: [
      { id: 'button', name: 'button' },
      { id: 'icon-button', name: 'icon Button' },
      { id: 'toggle-button', name: 'toggle button' },
      { id: 'menuitem', name: 'menuItem' },
      { id: 'link', name: 'link' },
      { id: 'accordion', name: 'accordion' },
    ],
  },
  {
    type: 'group',
    id: 'navigations',
    title: 'Navigations',
    icon: 'compass' as any,
    items: [
      { id: 'tabs', name: 'tabs' },
      { id: 'top-bar', name: 'top bar' },
      { id: 'bottom-bar', name: 'bottom bar' },
      { id: 'breadcrumb', name: 'breadcrumb', badge: '' },
      { id: 'step', name: 'step', hidden: true },
    ],
  },
  {
    type: 'group',
    id: 'forms',
    title: 'Forms',
    icon: ICON_NAMES.FIELD,
    items: [
      { id: 'checkbox', name: 'checkbox' },
      { id: 'radio', name: 'radio' },
      { id: 'switch', name: 'switch' },
      { id: 'input', name: 'Input' },
      { id: 'textarea', name: 'Textarea' },
    ],
  },
  {
    type: 'group',
    id: 'feedbacks',
    title: 'Feedbacks',
    icon: ICON_NAMES.REPLY,
    items: [
      { id: 'tooltip', name: 'tooltip' },
      { id: 'dialog', name: 'dialog' },
      { id: 'notice', name: 'notice' },
      { id: 'loading', name: 'loading' },
      { id: 'result', name: 'result' },
    ],
  },
  {
    type: 'group',
    id: 'patterns',
    title: 'Patterns',
    icon: ICON_NAMES.PLACE,
    items: [
      { id: 'profile', name: 'user profile', badge: '🔥' },
      { id: 'setting', name: 'setting' },
      { id: 'class', name: 'Product 3 - class' },
      { id: 'cake', name: 'movie detail' },
      { id: 'chat', name: 'chat' },
      { id: 'dashboard', name: 'dashboard', hidden: true },

      // { id: 'layout', name: 'layout' },
      { id: 'product', name: 'Product' },
      // { id: 'auth', name: 'auth' },
      { id: 'post', name: 'post', hidden: true },
      // { id: 'checkout', name: 'Checkout' },
    ],
  },
]
