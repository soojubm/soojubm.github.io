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
    MORE_ACTIONS: 'more-vert',
    SHOW_MORE: 'more-horiz',
    RETRY: 'refresh-double',
    SUBMIT: 'arrow-up',
    STOP: 'square',
    SHARE: 'share-android',
    CAMERA: 'camera',
    HIDE: 'eye-closed',
    VIEW: 'eye',
    GRID_VIEW: 'view-grid',
    LIST_VIEW: 'table-rows',
  },

  navigations: {
    BACK: 'arrow-left',
    EXPAND: 'nav-arrow-down',
    FORWARD: 'arrow-right',
    HOME_PAGE: 'home-simple-door',
    MENU: 'menu-scale',
    PREVIOUS: 'arrow-left',
    NEXT: 'arrow-right',
    SCROLL_TOP: 'arrow-up',
    SCROLL_BOTTOM: 'arrow-down',
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
    FAVORITE: 'star',
    FAVORITE_SELECTED: 'star-solid',
    LIKE: 'heart',
    LIKE_SELECTED: 'heart-solid',
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

  setting: {
    SETTINGS: 'settings',
    LOG_OUT: 'log-out',
    LOCK: 'lock',
    USER: 'user',
    PROFILE: 'profile-circle',
    NOTIFICATION: 'bell',
  },

  theme: {
    BRUTAL_MODE: 'square',
    DARK_MODE: 'half-moon',
    GLASS_MODE: 'droplet',
    LIGHT_MODE: 'sun-light',
    PALETTE: 'palette',
    TEXT_SIZE: 'text-size',
  },

  // 컴포넌트 문서의 특성(Feature) 카드 아이콘. 키는 특성 이름이고, 같은 파일을 쓰는 다른 역할과 합치지 않는다.
  feature: {
    INTERACTIVE_ACTION: 'cursor-pointer',
    INTERACTIVE_SELECTION: 'check',
    INTERACTIVE_INPUT: 'edit-pencil',
    FEEDBACK: 'bell',
    GLANCEABLE: 'eye',
    STRUCTURAL: 'view-grid',
    CONTEXTUAL: 'map-pin',
    REPRESENTATIVE: 'profile-circle',
    MODALITY: 'app-window',
    TRANSIENT: 'timer',
    STATEFUL: 'toggle-on',
    DISCLOSURE: 'nav-arrow-down',
  },

  etc: {
    AWARD: 'trophy',
    BOOK: 'book',
    CODE: 'code',
    DOCUMENT: 'page',
    DOCUMENT_CHECK: 'clipboard-check',
    FLOWER: 'flower',
    TREND_UP: 'graph-up',
    TREND_DOWN: 'graph-down',
    EXTERNAL_LINK: 'arrow-up-right',
    VIDEO: 'media-video',
    BOX: 'box-iso',
    CREDIT_CARD: 'credit-card',
    CUBE_SCAN: 'cube-scan',
    DELIVERY: 'delivery-truck',
    GROUP: 'group',
    MOUSE_BUTTON: 'mouse-button-left',
    SPARKS: 'sparks',
    WIFI: 'wifi',
    EMPTY: 'glass-empty',
    COMMENT: 'message',
    MAIL: 'mail',
    SORT: 'arrow-separate-vertical',
    DATE: 'calendar',
    SEARCH: 'search',
    SUBTRACT: 'minus',
    TIMER: 'timer',
    WINDOW: 'app-window',
  },
} as const

export const ICON_NAMES = {
  ...ICON_CATALOG.actions,
  ...ICON_CATALOG.navigations,
  ...ICON_CATALOG.status,
  ...ICON_CATALOG.selection,
  ...ICON_CATALOG.brand,
  ...ICON_CATALOG.setting,
  ...ICON_CATALOG.theme,
  ...ICON_CATALOG.feature,
  ...ICON_CATALOG.etc,
} as const

export type IconName = (typeof ICON_NAMES)[keyof typeof ICON_NAMES]

/** 상태 톤마다 쓰는 아이콘. 톤을 가진 컴포넌트와 Feedback 문서가 함께 참조한다. */
export const STATUS_ICONS = {
  success: ICON_NAMES.SUCCESS,
  info: ICON_NAMES.INFO,
  warning: ICON_NAMES.WARNING,
  error: ICON_NAMES.ERROR,
  done: ICON_NAMES.DONE,
} as const

export type StatusTone = keyof typeof STATUS_ICONS
