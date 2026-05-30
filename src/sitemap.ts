export const SITEMAP = [
  // 1. 상단 독립 메뉴 (Top-level Links)
  {
    type: 'standalone',
    id: 'index',
    title: '홈',
    icon: 'home-simple-door',
  },
  {
    type: 'standalone',
    id: 'tokens',
    title: 'Tokens',
    icon: 'palette',
  },
  {
    type: 'standalone',
    id: 'signifier',
    title: 'Signifier',
    icon: 'design-pencil',
  },

  // 2. 카테고리 그룹 메뉴 (Dropdown Categories)
  {
    type: 'category',
    id: 'visual-information',
    title: 'Visual Information',
    icon: 'flower',
    items: [
      { id: 'avatar', name: 'avatar' },
      { id: 'text', name: 'text' },
      { id: 'tag', name: 'tag' },
      { id: 'surface', name: 'surface' },
      { id: 'thumbnail', name: 'thumbnail' },
      { id: 'separator', name: 'separator' },
    ],
  },
  {
    type: 'category',
    id: 'actions',
    title: 'Actions',
    icon: 'mouse-button-left',
    items: [
      { id: 'button', name: 'button' },
      { id: 'icon-button', name: 'icon Button' },
      { id: 'toggle-button-group', name: 'toggle button group' },
      { id: 'menuitem', name: 'menuItem' },
      { id: 'link', name: 'link' },
      { id: 'breadcrumb', name: 'breadcrumb', badge: '⚠️' },
    ],
  },
  {
    type: 'category',
    id: 'forms',
    title: 'Forms',
    icon: 'input-field',
    items: [
      { id: 'checkbox', name: 'checkbox' },
      { id: 'radio', name: 'radio' },
      { id: 'switch', name: 'switch' },
      { id: 'textfield', name: 'Text Field' },
      { id: 'searchfield', name: 'Search Field' },
      { id: 'textarea', name: 'Textarea' },
    ],
  },
  {
    type: 'category',
    id: 'feedbacks',
    title: 'Feedbacks',
    icon: 'reply-to-message',
    items: [
      { id: 'tooltip', name: 'tooltip' },
      { id: 'dialog', name: 'dialog' },
      { id: 'callout', name: 'banner' }, // href와 이름이 매칭되지 않는 부분 처리
      { id: 'spinner', name: 'spinner' },
    ],
  },
  {
    type: 'category',
    id: 'patterns',
    title: 'Patterns',
    icon: 'city',
    items: [
      // { id: 'layout', name: 'layout' },
      { id: 'result', name: 'result' },
      { id: 'tabs', name: 'tabs' },
      { id: 'table', name: 'table', badge: '🚧' },
      { id: 'accordion', name: 'accordion' },
      { id: 'presentation', name: 'presentation' },
      { id: 'auth', name: 'auth' },
      { id: 'profile', name: 'user profile', badge: '🔥' },
      { id: 'setting', name: 'setting' },
      { id: 'post', name: 'post' },
      { id: 'product', name: 'Product' },
      { id: 'checkout', name: 'Checkout' },
      { id: 'class', name: 'Product 3 - class' },
    ],
  },
]
