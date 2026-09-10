// webpack.config.js가 ts-node로 직접 로드하므로 @/ alias 대신 상대경로를 유지한다.
import { ICON_NAMES, type IconName } from './components/common/icon/icon-names'

interface SitemapItem {
  id: string
  name: string
  badge?: string
  /** true면 페이지에서 navbar를 렌더하지 않는다 */
  hideNavbar?: boolean
}

interface SitemapStandaloneNode {
  type: 'standalone'
  id: string
  title: string
  icon: IconName
  badge?: string
  /** 사이드바에서 접었다 펴는 하위 페이지 */
  children?: SitemapItem[]
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
    id: 'foundations',
    title: 'Foundations',
    icon: ICON_NAMES.DESIGN,
    children: [
      { id: 'foundations', name: 'Overview' },
      { id: 'layout', name: 'Layout' },
      { id: 'interaction', name: 'Interaction' },
      { id: 'feedback', name: 'Feedback' },
      { id: 'overlay', name: 'Overlay' },
      { id: 'content', name: 'Content' },
    ],
  },
  {
    type: 'standalone',
    id: 'tokens',
    title: 'Tokens',
    icon: ICON_NAMES.PALETTE,
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
    id: 'structures',
    title: 'Structures',
    icon: ICON_NAMES.BOX,
    items: [
      { id: 'surface', name: 'Surface' },
      { id: 'separator', name: 'Separator' },
      { id: 'list-item', name: 'List Item' },
      { id: 'table', name: 'Table' },
    ],
  },
  {
    type: 'group',
    id: 'overlays',
    title: 'Overlays',
    icon: ICON_NAMES.MULTI_WINDOW,
    items: [
      { id: 'tooltip', name: 'Tooltip' },
      { id: 'popover', name: 'Popover', badge: 'pattern' },
      { id: 'sheet', name: 'Sheet', badge: 'pattern' },
      { id: 'dialog', name: 'Dialog' },
      { id: 'toast', name: 'Toast' },
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
      { id: 'menu-item', name: 'Menu Item' },
      { id: 'link', name: 'Link' },
      { id: 'accordion', name: 'Accordion', badge: 'pattern' },
    ],
  },
  {
    type: 'group',
    id: 'navigations',
    title: 'Navigations',
    icon: ICON_NAMES.COMPASS,
    items: [
      { id: 'tabs', name: 'Tabs' },
      { id: 'top-bar', name: 'Top Bar' },
      { id: 'bottom-bar', name: 'Bottom Bar' },
      { id: 'breadcrumb', name: 'Breadcrumb', badge: '' },
      { id: 'step', name: 'Step' },
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
      { id: 'file-uploader', name: 'File Uploader' },
    ],
  },
  {
    type: 'group',
    id: 'feedbacks',
    title: 'Feedbacks',
    icon: ICON_NAMES.REPLY,
    items: [
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
      { id: 'cake', name: 'Movie Detail' },
      { id: 'chat', name: 'Chat' },
      { id: 'dashboard', name: 'Dashboard' },
      { id: 'product', name: 'Product' },
      { id: 'auth', name: 'Auth' },
      { id: 'post', name: 'Post' },
      { id: 'post-detail', name: 'Post Detail' },
      { id: 'checkout', name: 'Checkout' },
      { id: 'faq', name: 'FAQ' },
      { id: 'contact', name: 'Contact' },
    ],
  },
]

export const findSitemapItem = (id: string): SitemapItem | undefined => {
  for (const node of SITEMAP) {
    const items = node.type === 'group' ? node.items : node.children ?? []
    const item = items.find(item => item.id === id)
    if (item) return item
  }
  return undefined
}
