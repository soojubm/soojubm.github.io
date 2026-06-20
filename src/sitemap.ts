import { ICON_NAMES } from './components/icon-button/semantics/icon-names'

// badge

export const SITEMAP = [
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

  // 2. 카테고리 그룹 메뉴 (Dropdown Categories)
  {
    type: 'category',
    id: 'visual-information',
    title: 'Visual Information',
    icon: ICON_NAMES.FLOWER,
    items: [
      { id: 'avatar', name: 'avatar' },
      { id: 'list-row', name: 'list row' },
      { id: 'text', name: 'text' },
      { id: 'tag', name: 'tag' },
      { id: 'surface', name: 'surface' },
      { id: 'thumbnail', name: 'thumbnail' },
      { id: 'separator', name: 'separator' },
      { id: 'table', name: 'table' },
    ],
  },
  {
    type: 'category',
    id: 'actions',
    title: 'Actions',
    icon: ICON_NAMES.MOUSE_BUTTON,
    items: [
      { id: 'button', name: 'button' },
      { id: 'icon-button', name: 'icon Button' },
      { id: 'toggle-button', name: 'toggle button' },
      { id: 'menuitem', name: 'menuItem' },
      { id: 'link', name: 'link' },
    ],
  },
  {
    type: 'category',
    id: 'navigations',
    title: 'Navigations',
    icon: ICON_NAMES.SITEMAP,
    items: [
      { id: 'tabs', name: 'tabs' },
      { id: 'top-bar', name: 'top bar' },
      { id: 'bottom-bar', name: 'bottom bar' },
      { id: 'breadcrumb', name: 'breadcrumb', badge: '' },
    ],
  },
  {
    type: 'category',
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
    type: 'category',
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
    type: 'category',
    id: 'patterns',
    title: 'Patterns',
    icon: ICON_NAMES.PLACE,
    items: [
      { id: 'profile', name: 'user profile', badge: '🔥' },
      { id: 'setting', name: 'setting' },
      { id: 'class', name: 'Product 3 - class' },
      { id: 'chat', name: 'chat' },
      { id: 'dashboard', name: 'dashboard', hidden: true },

      // { id: 'layout', name: 'layout' },
      { id: 'accordion', name: 'accordion' },
      { id: 'sheet', name: 'sheet' },
      // { id: 'auth', name: 'auth' },
      // { id: 'post', name: 'post' },
      // { id: 'product', name: 'Product' },
      // { id: 'checkout', name: 'Checkout' },
    ],
  },
]
