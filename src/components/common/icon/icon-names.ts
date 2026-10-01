/**
 * 제품에서 뜻이 고정된 아이콘의 의미 이름과 iconoir 이름의 대응표.
 * 카테고리 묶음이 원본이고 ICON_NAMES는 이를 펼친 조회용 맵이므로,
 * 새 아이콘을 맞는 카테고리에 넣으면 문서 페이지의 목록에도 함께 나온다.
 */
export const ICON_CATALOG = {
  actions: {
    ADD: 'plus',
    ADD_CIRCLE: 'plus-circle-solid',
    DISMISS: 'xmark',
    CLOSE: 'xmark',
    COPY: 'copy',
    COPY_SUCCESS: 'check',
    DELETE: 'trash',
    FILTER: 'filter',
    IMPORT: 'import',
    LOG_OUT: 'log-out',
    MORE_ACTIONS: 'more-vert',
    SHOW_MORE: 'more-horiz',
    REFRESH: 'refresh',
    RETRY: 'refresh-double',
    SETTINGS: 'settings',
    SUBMIT: 'arrow-up',
    SHARE: 'arrow-up-right',
    CAMERA: 'camera',
    HIDE: 'eye-closed',
    VIEW: 'eye',
    THUMBS_UP: 'thumbs-up',
    DISLIKE: 'thumbs-down',
    GRID_VIEW: 'view-grid',
    LIST_VIEW: 'table-rows',
  },

  navigations: {
    BACK: 'arrow-left',
    COLLAPSE: 'nav-arrow-up',
    EXPAND: 'nav-arrow-down',
    FORWARD: 'arrow-right',
    HOME_PAGE: 'home-simple-door',
    MENU: 'menu-scale',
    PREVIOUS: 'arrow-left',
    NEXT: 'arrow-right',
    SCROLL_TOP: 'arrow-up',
  },

  status: {
    ERROR: 'xmark-circle',
    DONE: 'check-circle',
    INFO: 'info-circle',
    SUCCESS: 'check-circle',
    WARNING: 'warning-triangle',
    FAILURE: 'xmark-circle',
    IDLE: 'circle',
  },

  selection: {
    BOOKMARK: 'bookmark',
    BOOKMARK_SELECTED: 'bookmark-solid',
    CHECK: 'check',
    CURRENT: 'map-pin',
    FAVORITE: 'star',
    FAVORITE_SELECTED: 'star-solid',
    LIKE: 'heart',
    LIKE_SELECTED: 'heart-solid',
    PRESSED: 'check-square',
    SELECTED: 'check-circle',
  },

  brand: {
    APPLE: 'apple',
    FACEBOOK: 'facebook',
    FIGMA: 'figma',
    GITHUB: 'github',
    GOOGLE: 'google',
    // Iconoir에는 Notion 마크가 없어 Notion의 단위인 페이지 아이콘으로 대신한다.
    NOTION: 'page',
    PINTEREST: 'pinterest',
  },

  theme: {
    BRUTAL_MODE: 'square',
    DARK_MODE: 'half-moon',
    GLASS_MODE: 'droplet',
    LIGHT_MODE: 'sun-light',
    PALETTE: 'palette',
  },

  etc: {
    BOOK: 'book',
    CODE: 'code',
    DOCUMENT: 'page',
    DOCUMENT_CHECK: 'clipboard-check',
    FLOWER: 'flower',
    TREND_UP: 'graph-up',
    TREND_DOWN: 'graph-down',
    LINK: 'link',
    VIDEO: 'media-video',
    BOX: 'box-iso',
    CREDIT_CARD: 'credit-card',
    CUBE_SCAN: 'cube-scan',
    DELIVERY: 'delivery-truck',
    GROUP: 'group',
    PROFILE: 'profile-circle',
    USER: 'user',
    CLICK: 'cursor-pointer',
    MOUSE_BUTTON: 'mouse-button-left',
    SPARKS: 'sparks',
    WIFI: 'wifi',
    EMPTY: 'glass-empty',
    COMMENT: 'message',
    MAIL: 'mail',
    NOTIFICATION: 'bell',
    HOME: 'air-conditioner',
    SORT: 'arrow-separate-vertical',
    DATE: 'calendar',
    LOCK: 'lock',
    SEARCH: 'search',
    SUBTRACT: 'minus',
  },
} as const

export const ICON_NAMES = {
  ...ICON_CATALOG.actions,
  ...ICON_CATALOG.navigations,
  ...ICON_CATALOG.status,
  ...ICON_CATALOG.selection,
  ...ICON_CATALOG.brand,
  ...ICON_CATALOG.theme,
  ...ICON_CATALOG.etc,
} as const

export type IconName = typeof ICON_NAMES[keyof typeof ICON_NAMES]

/** 상태 톤마다 쓰는 아이콘. 톤을 가진 컴포넌트와 Feedback 문서가 함께 참조한다. */
export const STATUS_ICONS = {
  success: ICON_NAMES.SUCCESS,
  info: ICON_NAMES.INFO,
  warning: ICON_NAMES.WARNING,
  error: ICON_NAMES.ERROR,
  done: ICON_NAMES.DONE,
} as const

export type StatusTone = keyof typeof STATUS_ICONS
