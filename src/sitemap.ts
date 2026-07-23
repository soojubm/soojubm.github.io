// webpack.config.js가 ts-node로 직접 로드하므로 @/ alias 대신 상대경로를 유지한다.
import { ICON_NAMES, type IconName } from './components/icon-button/semantics/icon-names'

interface SitemapItem {
  id: string
  name: string
  badge?: string
  hidden?: boolean
  /** true면 페이지에서 navbar를 렌더하지 않는다 */
  hideNavbar?: boolean
}

interface SitemapStandaloneNode {
  type: 'standalone'
  id: string
  title: string
  icon: IconName
  badge?: string
  /** 사이드바 메뉴에서 숨긴다. 페이지는 그대로 빌드된다 */
  hidden?: boolean
}

interface SitemapGroupNode {
  type: 'group'
  id: string
  title: string
  icon: IconName
  items: SitemapItem[]
}

export type SitemapNode = SitemapStandaloneNode | SitemapGroupNode

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
    id: 'all-menu',
    title: '전체메뉴',
    icon: ICON_NAMES.MENU,
    hidden: true,
  },

  // 2. 접고 펼치는 메뉴 그룹
  {
    type: 'group',
    id: 'visual-information',
    title: 'Visual Information',
    icon: ICON_NAMES.FLOWER,
    items: [
      { id: 'avatar', name: 'Avatar' },
      { id: 'text', name: 'Text' },
      { id: 'tag', name: 'Tag' },
      { id: 'thumbnail', name: 'Thumbnail' },
    ],
  },
  {
    type: 'group',
    id: 'structure',
    title: 'Structure',
    icon: ICON_NAMES.BOX,
    items: [
      { id: 'surface', name: 'Surface' },
      { id: 'separator', name: 'Separator' },
      { id: 'list-item', name: 'List Item' },
      { id: 'sheet', name: 'Sheet', badge: 'pattern' },
      { id: 'popover', name: 'Popover', badge: 'pattern' },
      { id: 'table', name: 'Table' },
    ],
  },
  {
    type: 'group',
    id: 'actions',
    title: 'Actions',
    icon: ICON_NAMES.MOUSE_BUTTON,
    items: [
      { id: 'button', name: 'Button' },
      { id: 'icon-button', name: 'Icon Button' },
      { id: 'toggle-button', name: 'Toggle Button' },
      { id: 'menuitem', name: 'Menu Item' },
      { id: 'link', name: 'Link' },
      { id: 'accordion', name: 'Accordion', badge: 'pattern' },
    ],
  },
  {
    type: 'group',
    id: 'navigations',
    title: 'Navigations',
    icon: 'compass' as any,
    items: [
      { id: 'tabs', name: 'Tabs' },
      { id: 'top-bar', name: 'Top Bar' },
      { id: 'bottom-bar', name: 'Bottom Bar' },
      { id: 'breadcrumb', name: 'Breadcrumb', badge: '' },
      { id: 'step', name: 'Step', hidden: true },
    ],
  },
  {
    type: 'group',
    id: 'forms',
    title: 'Forms',
    icon: ICON_NAMES.FIELD,
    items: [
      { id: 'checkbox', name: 'Checkbox' },
      { id: 'radio', name: 'Radio' },
      { id: 'switch', name: 'Switch' },
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
      { id: 'tooltip', name: 'Tooltip' },
      { id: 'dialog', name: 'Dialog' },
      { id: 'notice', name: 'Notice' },
      { id: 'loading', name: 'Loading' },
      { id: 'result', name: 'Result' },
    ],
  },
  {
    type: 'group',
    id: 'patterns',
    title: 'Pages',
    icon: ICON_NAMES.PLACE,
    items: [
      { id: 'profile', name: 'User Profile', badge: '🔥' },
      { id: 'setting', name: 'Setting', hideNavbar: true },
      { id: 'class', name: 'Product 3 - Class' },
      { id: 'cake', name: 'Movie Detail', hidden: true },
      { id: 'chat', name: 'Chat' },
      { id: 'dashboard', name: 'Dashboard', hidden: true },
      { id: 'product', name: 'Product' },
      { id: 'auth', name: 'Auth', hidden: true },
      { id: 'post', name: 'Post', hidden: true },
      { id: 'checkout', name: 'Checkout', hidden: true },
    ],
  },

  // 3. 하단 독립 메뉴 (작성 중)
  {
    type: 'standalone',
    id: 'signifier',
    title: 'Foundations',
    icon: ICON_NAMES.DESIGN,
    badge: 'draft',
  },
  {
    type: 'standalone',
    id: 'pattern',
    title: 'Patterns',
    icon: ICON_NAMES.GRID_VIEW,
    badge: 'draft',
  },
]

export const findSitemapItem = (id: string): SitemapItem | undefined => {
  for (const node of SITEMAP) {
    if (node.type !== 'group') continue
    const item = node.items.find(item => item.id === id)
    if (item) return item
  }
  return undefined
}
