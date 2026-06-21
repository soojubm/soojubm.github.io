export const ICON_NAMES = {
  // Action
  ADD: 'plus',
  CLOSE: 'xmark',
  COPY: 'copy',
  COPY_SUCCESS: 'check',
  DELETE: 'trash',
  DISMISS: 'xmark',
  FILTER: 'filter',
  INCREASE: 'plus',
  IMPORT: 'import',
  LOG_OUT: 'log-out',
  MORE_ACTIONS: 'more-vert',
  DECREASE: 'minus',
  REFRESH: 'refresh',
  RETRY: 'refresh-double',
  SEND: 'send-diagonal',
  SETTINGS: 'settings',
  SHARE: 'arrow-up-right',
  CAMERA: 'camera',

  // Navigation
  BACK: 'arrow-left',
  COLLAPSE: 'nav-arrow-up',
  EXPAND: 'nav-arrow-down',
  FORWARD: 'arrow-right',
  MENU: 'menu-scale',
  MENU_SIMPLE: 'menu',
  NAVIGATE_DOWN: 'arrow-down',
  OPEN_EXTERNAL: 'open-in-browser',
  PREVIOUS: 'arrow-left',
  NEXT: 'arrow-right',
  SCROLL_TOP: 'arrow-up',
  SITEMAP: 'nav-arrow-right',

  // Status
  DANGER: 'warning-circle',
  DONE: 'check-circle-solid',
  ERROR: 'alert-circle',
  INFO: 'info-circle',
  SUCCESS: 'check-circle',
  WARNING: 'warning-triangle',
  FAILURE: 'xmark-circle',

  // Selection
  BOOKMARK: 'bookmark',
  BOOKMARK_SELECTED: 'bookmark-solid',
  CHECK: 'check',
  FAVORITE: 'star',
  FAVORITE_SELECTED: 'star-solid',
  LIKE: 'heart',
  LIKE_SELECTED: 'heart-solid',
  SELECTED: 'check-circle',

  // Visibility
  HIDE: 'eye-closed',
  REVEAL: 'eye-solid',
  VIEW: 'eye-circle',
  XRAY: 'xray-view',

  // Communication
  ANNOUNCEMENT: 'megaphone',
  COMMENT: 'message',
  DISLIKE: 'thumbs-down',
  MAIL: 'mail',
  MAIL_IN: 'mail-in',
  NOTIFICATION: 'bell',
  REPLY: 'reply-to-message',
  THUMBS_UP: 'thumbs-up',

  // Form
  DATE: 'calendar',
  FIELD: 'input-field',
  LOCK: 'lock',
  SEARCH: 'search',
  SUBTRACT: 'minus',

  // Layout
  GRID_VIEW: 'view-grid',
  HOME: 'air-conditioner',
  HOME_PAGE: 'home-simple-door',
  LIST_VIEW: 'table-rows',
  SORT: 'arrow-separate-vertical',

  // Content
  ARTICLE: 'book',
  BOLD: 'bold',
  BOOK: 'book',
  CODE: 'code',
  DESIGN: 'design-pencil',
  DOCUMENT_CHECK: 'clipboard-check',
  FLOWER: 'flower',
  GRAPH: 'graph-up',
  ITALIC: 'italic',
  LINK: 'link',
  MULTI_WINDOW: 'multi-window',
  TASK_LIST: 'task-list',
  UNDERLINE: 'underline',

  // Product
  APP_WINDOW: 'app-window',
  BOX: 'box-iso',
  CREDIT_CARD: 'credit-card',
  CUBE_SCAN: 'cube-scan',
  DELIVERY: 'delivery-truck',
  DATABASE_CREATE: 'database-script-plus',
  PIPE: 'pipe-3d',

  // People
  ACCESSIBILITY: 'accessibility',
  GROUP: 'group',
  PEOPLE_TAG: 'people-tag',
  PROFILE: 'profile-circle',
  USER: 'user',
  USER_BADGE_CHECK: 'user-badge-check',
  USER_CIRCLE: 'user-circle',

  // Brand
  APPLE: 'apple',
  FACEBOOK: 'facebook',
  GITHUB: 'github',
  GOOGLE: 'google',
  INSTAGRAM: 'instagram',
  NOTION: 'notion',
  PINTEREST: 'pinterest',
  TWITTER: 'twitter',

  // Theme
  DARK_MODE: 'half-moon',
  LIGHT_MODE: 'sun-light',
  PALETTE: 'palette',
  THEME: 'color-filter',

  // Affordance
  CLICK: 'cursor-pointer',
  CURSOR: 'cursor',
  HELP: 'information-circle',
  HELP_CIRCLE: 'help-circle',
  INFO_EMPTY: 'info-empty',
  INTERACTIVE: 'interactive',
  MOUSE_BUTTON: 'mouse-button-left',
  ON_TAG: 'on-tag',
  PLACE: 'city',
  SPARKS: 'sparks',
  WIFI: 'wifi',

  // Project-specific
  CONSTRAINED_SURFACE: 'constrained-surface',
  EMPTY: 'glass-empty',
  FIGMA: 'figma',
  LULLABY: 'lullaby',
  MUSIC_DOUBLE_NOTE: 'music-double-note',
  MUSIC_DOUBLE_NOTE_PLUS: 'music-double-note-plus',
  MUSIC_NOTE: 'music-note',
  MUSIC_NOTE_SOLID: 'music-note-solid',
  ARCHERY: 'archery',
  COMPRESS: 'compress',
  STATS_REPORT: 'stats-report',
  RULER_COMBINE: 'ruler-combine',
  COINS_SWAP: 'coins-swap',
} as const

export type IconName = typeof ICON_NAMES[keyof typeof ICON_NAMES]
