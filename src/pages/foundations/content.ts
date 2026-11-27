import { html, type TemplateResult } from 'lit'

import { ICON_CATALOG } from '@/components/common'
import { code } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'
import './content.css'

/** 한 카드로 묶어 보여 줄 짝. 뜻이 서로 맞서는 역할은 나란히 놓아야 대비가 읽힌다. */
const ROLE_PAIRS = [
  ['GRID_VIEW', 'LIST_VIEW'],
  ['HIDE', 'VIEW'],
  ['LIGHT_MODE', 'DARK_MODE'],
  ['COPY', 'COPY_SUCCESS'],
  ['BACK', 'FORWARD'],
  ['PREVIOUS', 'NEXT'],
  ['SCROLL_TOP', 'SCROLL_BOTTOM'],
  ['BOOKMARK', 'BOOKMARK_SELECTED'],
  ['FAVORITE', 'FAVORITE_SELECTED'],
  ['LIKE', 'LIKE_SELECTED'],
  ['TREND_UP', 'TREND_DOWN'],
]

/** 역할 하나 이상을 도형으로, 이름을 code-tag로 단다. */
const renderRoleCard = (roles: [string, string][]) => html`
  <mm-figure-card>
    <mm-flex slot="figure" align-items="center" gap="4">
      ${roles.map(
        ([, name]) =>
          html`
            <mm-icon name=${name}></mm-icon>
          `,
      )}
    </mm-flex>
    ${roles.map(
      ([key]) =>
        html`
          <mm-code-tag slot="tags">${key}</mm-code-tag>
        `,
    )}
  </mm-figure-card>
`

/** 카테고리의 역할을 카드 단위로 묶는다. 짝의 뒤쪽 역할은 앞쪽 카드에 합쳐진다. */
const groupRoles = (icons: Record<string, string>) => {
  const paired = new Set(ROLE_PAIRS.flat())

  return Object.entries(icons)
    .filter(([key]) => !paired.has(key) || ROLE_PAIRS.some(([first]) => first === key))
    .map(([key, name]): [string, string][] => {
      const pair = ROLE_PAIRS.find(([first]) => first === key)
      if (!pair) return [[key, name]]

      return pair.map((role): [string, string] => [role, icons[role]])
    })
}

const CODE_TAG_CATEGORIES = ['actions', 'navigations', 'status', 'selection', 'brand', 'setting']

const renderIconCatalog = () =>
  Object.entries(ICON_CATALOG)
    .filter(([, icons]) => Object.keys(icons).length > 0)
    .map(([category, icons]) => {
      const grid = html`
        <mm-grid columns="6" column-min-width="4rem" gap="6">
          ${groupRoles(icons).map(renderRoleCard)}
        </mm-grid>
      `
      if (!CODE_TAG_CATEGORIES.includes(category)) {
        return html`
          <mm-content-section heading-level="4" heading=${category}>${grid}</mm-content-section>
        `
      }

      return html`
        <mm-flex direction="column" gap="6">
          <mm-code-tag size="large">${category}</mm-code-tag>
          ${grid}
        </mm-flex>
      `
    })

/** 그 밖의 선택 그룹이 따르는 키. 키마다 다른 색 태그로 나타낸다. */
/** 이름이 어디서 어떻게 전해지는지를 보여 주는 카드. 도형은 실제 컴포넌트로 보인다. */
const nameCards: {
  figure: TemplateResult
  tags: { text: string; tone: 'blue' | 'yellow' }[]
  description: string
}[] = [
  {
    figure: html`
      <mm-icon-button icon="arrow-right" aria-label="다음"></mm-icon-button>
    `,
    tags: [{ text: 'aria-label', tone: 'blue' }],
    description:
      '화면에 글자가 없어도 버튼의 이름을 들을 수 있게 한다. 이름이 없으면 무엇을 하는 버튼인지 알 수 없다',
  },
  {
    figure: html`
      <mm-toggle-button-group
        aria-label="텍스트 정렬"
        value="center"
        .options=${[
          { value: 'left', label: '왼쪽' },
          { value: 'center', label: '가운데' },
          { value: 'right', label: '오른쪽' },
        ]}
      ></mm-toggle-button-group>
    `,
    tags: [{ text: 'aria-label', tone: 'blue' }],
    description:
      "묶음 전체에는 항상 이름을 준다. 이름이 없으면 '왼쪽·가운데·오른쪽'만 들려 무엇을 고르는지 알 수 없다",
  },
  {
    figure: html`
      <mm-toggle-button-group
        hidden-label
        value="grid"
        .options=${[
          { value: 'grid', icon: 'view-grid', label: 'Grid view' },
          { value: 'list', icon: 'table-rows', label: 'List view' },
        ]}
      ></mm-toggle-button-group>
    `,
    tags: [
      { text: 'hidden-label', tone: 'blue' },
      { text: 'aria-label', tone: 'blue' },
    ],
    description:
      '아이콘만 보여줄 때는 hidden-label을 켜면 label이 화면 텍스트 대신 aria-label로 옮겨진다',
  },
  {
    figure: html`
      <mm-toggle-button-group
        value="grid"
        .options=${[
          { value: 'grid', label: 'Grid' },
          { value: 'list', label: 'List' },
        ]}
      ></mm-toggle-button-group>
    `,
    tags: [
      { text: 'aria-pressed', tone: 'yellow' },
      { text: 'checked', tone: 'yellow' },
      { text: 'aria-selected', tone: 'yellow' },
    ],
    description: '레이블에는 선택지 이름만 쓴다. 선택 여부는 이 속성이 전달한다',
  },
]

const POPUP_TONES = {
  Modal: 'orange',
  'Non-modal': 'green',
} as const

/** 팝업 종류별로 포커스가 어떻게 움직이는지. */
const popupKinds: { kind: keyof typeof POPUP_TONES; description: TemplateResult }[] = [
  {
    kind: 'Modal',
    description: html`
      뒤 화면을 막고 사용자를 overlay 안에 둔다. 열 때 포커스를 overlay 안으로 옮기고, 닫을 때 열기
      직전 자리로 되돌린다. 포커스가 밖에 남으면 키보드·스크린리더 사용자는 overlay가 열린 줄 모르고
      뒤 화면을 헤매며, 되돌리지 않으면 닫힌 overlay에 포커스가 남아 사라진다
    `,
  },
  {
    kind: 'Non-modal',
    description: html`
      뒤 화면과 계속 상호작용할 수 있다. 열고 닫을 때의 포커스는 모달과 같게 옮기되, 바깥을 눌러
      닫을 때는 눌린 요소의 포커스를 유지한다. 눌린 요소가 이미 포커스를 받았는데 트리거로 되돌리면
      사용자가 방금 고른 곳에서 포커스를 빼앗는다
    `,
  },
]

const popupComponents: { name: string; kind: keyof typeof POPUP_TONES }[] = [
  { name: 'mm-dialog', kind: 'Modal' },
  { name: 'mm-sheet', kind: 'Modal' },
  { name: 'mm-popover', kind: 'Non-modal' },
]

const KEY_TONES = {
  'Tab Key': 'purple',
  'Enter·Space Key': 'pink',
  'Arrow Keys': 'cyan',
} as const

/** 각 키가 선택 그룹에서 하는 일. */
const keyLegend: { key: keyof typeof KEY_TONES; description: TemplateResult }[] = [
  {
    key: 'Tab Key',
    description: html`
      그룹에 한 번만 들어오고, 선택된 항목에 포커스가 놓인다. 항목 사이는 Arrow Keys로 옮기며
      ${code('RovingFocusController')}가 이 동작을 맡는다
    `,
  },
  {
    key: 'Arrow Keys',
    description: html`
      항목 사이로 포커스를 옮긴다. 끝 항목에서 더 눌러도 멈추지만 탭은 반대편 끝으로 이어진다.
      탭에서는 포커스를 옮기는 것이 곧 선택이다
    `,
  },
  {
    key: 'Enter·Space Key',
    description: html`
      포커스가 놓인 버튼을 눌러 선택을 확정한다. 포커스를 옮긴 뒤 버튼을 눌러 선택하는 탭만 쓴다
    `,
  },
]

const groupKeys: { name: string; keys: (keyof typeof KEY_TONES)[] }[] = [
  { name: 'mm-toggle-button-group', keys: ['Tab Key', 'Enter·Space Key'] },
  { name: 'mm-filter-button-group', keys: ['Tab Key', 'Enter·Space Key'] },
  { name: 'mm-menu-item-group', keys: ['Tab Key'] },
  { name: 'mm-select', keys: ['Tab Key'] },
]

const terms = [
  {
    term: 'Message',
    meaning: '사용자의 관점에서 다음에 할 일을 알려주는 문구',
    example: '"확인 후 진행해주세요"',
  },
  {
    term: 'Description',
    meaning: '시스템을 주어로 대상이 무엇을 하는지 서술하는 설명',
    example: '"이 컴포넌트는 ~를 수행합니다"',
  },
  {
    term: 'Label',
    meaning:
      '대상을 가리키는 이름. 화면에서의 위치가 아니라 대상이 이미 갖고 있는 이름을 그대로 쓰고, 추가 설명은 description으로 나눈다',
    example: '목록 행의 사람 이름, 설정 항목의 이름',
  },
  {
    term: 'Heading',
    meaning: '구획·표면·메시지의 제목. 아래에 오는 내용을 한 구로 가리킨다',
    example: '섹션 제목, 다이얼로그 제목',
  },
  {
    term: 'Placeholder',
    meaning: '값을 입력하기 전 필드 안에 보이는 안내',
    example: '"컴포넌트, 패턴을 검색하세요"',
  },
  {
    term: 'Validation text',
    meaning: '입력값이 규칙을 어긴 이유를 필드 아래에서 알리는 문구',
    example: '"이미 등록된 이메일입니다."',
  },
]

/** 용어의 뜻은 description으로, 예는 figure로, 용어 이름은 code-tag로 단다. */
const renderTermCard = ({ term, meaning, example }: (typeof terms)[number]) => html`
  <mm-figure-card description=${meaning}>
    <mm-paragraph slot="figure">${example}</mm-paragraph>
    <mm-code-tag slot="tags">${term}</mm-code-tag>
  </mm-figure-card>
`

/** 같은 규칙의 맞는 예와 틀린 예를 한 쌍의 카드로 보인다. */
const renderDoDontPair = (
  doCard: { description: string; figure: TemplateResult },
  dontCard: { description: string; figure: TemplateResult },
) => html`
  <mm-surface>
    <mm-flex justify-content="center" wrap="wrap" gap="6">
      <mm-figure-card class="do-dont-card" description=${doCard.description}>
        ${doCard.figure}
        <mm-code-tag slot="tags" tone="green">Do</mm-code-tag>
      </mm-figure-card>
      <mm-figure-card class="do-dont-card" description=${dontCard.description}>
        ${dontCard.figure}
        <mm-code-tag slot="tags" tone="red">Don't</mm-code-tag>
      </mm-figure-card>
    </mm-flex>
  </mm-surface>
`

const main = html`
  <mm-main>
    <mm-page-header
      heading="Content"
      description="텍스트의 이름과 어조, 아이콘의 뜻을 정합니다. 훑어 읽는 콘텐츠를 한 곳에서 정하므로, 사용자는 어디서든 같은 말과 기호를 같은 뜻으로 읽습니다."
    ></mm-page-header>

    <mm-page-body>
      <mm-tab-list value="writing" variant="text" search-param="tab">
        <mm-tab value="writing">Writing</mm-tab>
        <mm-tab value="iconography">Iconography</mm-tab>
        <mm-tab value="accessibility">Accessibility</mm-tab>
      </mm-tab-list>

      <mm-tab-panel value="writing">
        <mm-content-section-list>
          <mm-content-section heading-level="3" heading="콜 투 액션">
            <mm-example-stage>
              <mm-flex direction="column" gap="8">
                <mm-flex justify-content="center" wrap="wrap" gap="6">
                  <mm-figure-card
                    class="do-dont-card"
                    description="트리거 버튼 레이블은 다이얼로그 제목의 동사와 페어링합니다."
                  >
                    <mm-flex slot="figure" direction="column" align-items="center" gap="2">
                      <mm-heading level="5">저장하지 않고 나갈까요?</mm-heading>
                      <mm-button>나가기</mm-button>
                    </mm-flex>
                    <mm-code-tag slot="tags" tone="green">Do</mm-code-tag>
                  </mm-figure-card>

                  <mm-figure-card
                    class="do-dont-card"
                    description="버튼과 제목의 동사가 다르면 무엇이 열릴지 다시 해석해야 합니다."
                  >
                    <mm-flex slot="figure" direction="column" align-items="center" gap="2">
                      <mm-heading level="5">저장하지 않고 나갈까요?</mm-heading>
                      <mm-button>닫기</mm-button>
                    </mm-flex>
                    <mm-code-tag slot="tags" tone="red">Don't</mm-code-tag>
                  </mm-figure-card>
                </mm-flex>
                <mm-flex justify-content="center" wrap="wrap" gap="6">
                  <mm-figure-card
                    class="do-dont-card"
                    description="실행 결과를 예측할 수 있는 레이블을 씁니다."
                  >
                    <mm-flex slot="figure" align-items="center" gap="3">
                      <mm-button>장바구니에 담기</mm-button>
                    </mm-flex>
                    <mm-code-tag slot="tags" tone="green">Do</mm-code-tag>
                  </mm-figure-card>

                  <mm-figure-card
                    class="do-dont-card"
                    description="레이블만으로 결과가 전해지지 않으면 눌러 보기 전에는 알 수 없습니다."
                  >
                    <mm-flex slot="figure" align-items="center" gap="3">
                      <mm-button>확인</mm-button>
                    </mm-flex>
                    <mm-code-tag slot="tags" tone="red">Don't</mm-code-tag>
                  </mm-figure-card>
                </mm-flex>
                <mm-flex justify-content="center" wrap="wrap" gap="6">
                  <mm-figure-card
                    class="do-dont-card"
                    description="질문은 긍정문으로 묻고, 실행 레이블은 사용자 시점의 동사로 씁니다."
                  >
                    <mm-flex slot="figure" align-items="center" gap="3">
                      <mm-heading level="5">변경 사항을 저장할까요?</mm-heading>
                      <mm-button>저장</mm-button>
                      <mm-button>취소</mm-button>
                    </mm-flex>
                    <mm-code-tag slot="tags" tone="green">Do</mm-code-tag>
                  </mm-figure-card>

                  <mm-figure-card
                    class="do-dont-card"
                    description="부정어 질문에 예·아니오로 답하게 하면 어느 쪽이 실행인지 헷갈립니다."
                  >
                    <mm-flex slot="figure" align-items="center" gap="3">
                      <mm-heading level="5">저장하지 않고 나갈까요?</mm-heading>
                      <mm-button>예</mm-button>
                      <mm-button>아니오</mm-button>
                    </mm-flex>
                    <mm-code-tag slot="tags" tone="red">Don't</mm-code-tag>
                  </mm-figure-card>
                </mm-flex>
                <mm-flex justify-content="center" wrap="wrap" gap="6">
                  <mm-figure-card
                    class="do-dont-card"
                    description="사용자가 하는 일의 관점에서 받는 쪽으로 이름 짓습니다."
                  >
                    <mm-flex slot="figure" direction="column" align-items="center">
                      <mm-caption>쿠폰</mm-caption>
                      <mm-button>받기</mm-button>
                    </mm-flex>
                    <mm-code-tag slot="tags" tone="green">Do</mm-code-tag>
                  </mm-figure-card>

                  <mm-figure-card
                    class="do-dont-card"
                    description="시스템이 하는 일의 관점에서 보내는 쪽으로 이름 지으면 사용자가 하는 일이 가려집니다."
                  >
                    <mm-flex slot="figure" direction="column" align-items="center">
                      <mm-caption>쿠폰</mm-caption>
                      <mm-button>보내기</mm-button>
                    </mm-flex>
                    <mm-code-tag slot="tags" tone="red">Don't</mm-code-tag>
                  </mm-figure-card>
                </mm-flex>
              </mm-flex>
            </mm-example-stage>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="분류명">
            <mm-example-stage>
              <mm-flex direction="column" gap="8">
                <mm-flex justify-content="center" wrap="wrap" gap="6">
                  <mm-figure-card
                    class="do-dont-card"
                    description="나열되는 값은 tag로 끊어, 훑는 것만으로 구분됩니다."
                  >
                    <mm-keyword-tag-group
                      slot="figure"
                      .keywords=${['무선', '블루투스', '방수']}
                    ></mm-keyword-tag-group>
                    <mm-code-tag slot="tags" tone="green">Do</mm-code-tag>
                  </mm-figure-card>

                  <mm-figure-card
                    class="do-dont-card"
                    description="문장·쉼표·슬래시로 이으면 값의 경계가 흐려져 하나씩 읽어야 구분됩니다."
                  >
                    <mm-flex slot="figure" direction="column" align-items="center" gap="1">
                      <mm-paragraph>무선이고 블루투스를 지원하며 방수가 됩니다</mm-paragraph>
                      <mm-paragraph>무선, 블루투스, 방수</mm-paragraph>
                      <mm-paragraph>무선/블루투스/방수</mm-paragraph>
                    </mm-flex>
                    <mm-code-tag slot="tags" tone="red">Don't</mm-code-tag>
                  </mm-figure-card>
                </mm-flex>
                <mm-flex justify-content="center" wrap="wrap" gap="6">
                  <mm-figure-card
                    class="do-dont-card"
                    description="분류명은 제목 위 캡션으로 나눠, 제목만 훑어도 핵심이 보입니다."
                  >
                    <mm-flex slot="figure" direction="column" align-items="center">
                      <mm-caption>결제</mm-caption>
                      <mm-heading level="4">카드 간편결제</mm-heading>
                    </mm-flex>
                    <mm-code-tag slot="tags" tone="green">Do</mm-code-tag>
                  </mm-figure-card>

                  <mm-figure-card
                    class="do-dont-card"
                    description="대시나 괄호로 이으면 두 이름이 한 덩어리로 읽혀 핵심이 묻힙니다."
                  >
                    <mm-flex slot="figure" direction="column" align-items="center" gap="1">
                      <mm-heading level="4">결제 - 카드 간편결제</mm-heading>
                      <mm-heading level="4">카드 간편결제 (결제)</mm-heading>
                    </mm-flex>
                    <mm-code-tag slot="tags" tone="red">Don't</mm-code-tag>
                  </mm-figure-card>
                </mm-flex>
              </mm-flex>
            </mm-example-stage>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="제목">
            <mm-text-list
              variant="check"
              .texts=${[
                '텍스트는 짧게 유지하고 훑어볼 수 있는 덩어리로 나눈다. 간결한 문구는 사용자가 서비스를 이해하고 다룰 수 있다는 신뢰를 만든다',
                '태그라인의 행갈이는 작성 단계에서 정한다. 글자 또는 단어의 수를 제한하고 개행 조건을 정의해, 작은 화면에서도 인상을 남긴다',
              ]}
            ></mm-text-list>
            <mm-component-notice heading="잘린 제목의 전체를 보여주는 방법을 정한다">
              폴더블·워치처럼 화면이 점점 작아져 제목이 잘릴 수 있다. 자를지 여부를 정하는 시대는
              지났다. 잘렸을 때 사용자가 전체 제목을 확인하는 방법이 필요하다.
            </mm-component-notice>
          </mm-content-section>

          <mm-content-section
            heading-level="3"
            heading="용어"
            description="단어(word) → 구(phrase) → 문장(sentence) → 문단(paragraph)"
          >
            <mm-grid columns="3" column-min-width="16rem" gap="6">
              ${terms.map(renderTermCard)}
            </mm-grid>
          </mm-content-section>
        </mm-content-section-list>
      </mm-tab-panel>

      <mm-tab-panel value="iconography">
        <mm-content-section-list>
          <mm-content-section-list size="small">
            <mm-paragraph>
              아이콘은 장식으로 쓰지 않습니다. 좁은 공간에서 레이블을 대신하거나 인접한 시각 정보
              더미에서 상태와 행동 가능성을 분명히 할 때 사용합니다.
            </mm-paragraph>

            <mm-content-section
              heading-level="3"
              heading="하나의 아이콘, 하나의 의미"
              description="같은 아이콘을 맥락마다 다른 뜻으로 재사용하지 않습니다. 의미가 흔들리면 사용자가 매번 다시 해석해야 합니다."
            >
              ${renderDoDontPair(
                {
                  description: '뜻마다 아이콘을 하나씩 정해, 어디서나 같은 아이콘으로 나타냅니다.',
                  figure: html`
                    <mm-flex slot="figure" align-items="center" gap="4">
                      <mm-icon-button icon="heart" aria-label="좋아요"></mm-icon-button>
                      <mm-icon-button icon="bookmark" aria-label="보관"></mm-icon-button>
                      <mm-icon-button icon="star" aria-label="즐겨찾기"></mm-icon-button>
                    </mm-flex>
                  `,
                },
                {
                  description:
                    '같은 하트를 좋아요와 보관에 함께 쓰면 누를 때마다 뜻을 다시 해석해야 합니다.',
                  figure: html`
                    <mm-flex slot="figure" align-items="center" gap="4">
                      <mm-icon-button icon="heart" aria-label="좋아요"></mm-icon-button>
                      <mm-icon-button icon="heart" aria-label="보관"></mm-icon-button>
                    </mm-flex>
                  `,
                },
              )}
            </mm-content-section>

            <mm-content-section
              heading-level="3"
              heading="중복 표현하지 않기"
              description="보이는 레이블이 이미 가리키는 것을 아이콘으로 되풀이하지 않습니다. 남는 아이콘은 뜻을 지니면 대체 텍스트를 주고, 순수한 장식이면 접근성 트리에서 숨깁니다."
            >
              ${renderDoDontPair(
                {
                  description:
                    '레이블이 있으면 레이블만 두고, 아이콘만 남으면 대체 텍스트를 줍니다.',
                  figure: html`
                    <mm-flex slot="figure" align-items="center" gap="4">
                      <mm-button>삭제</mm-button>
                      <mm-icon-button icon="trash" aria-label="삭제"></mm-icon-button>
                    </mm-flex>
                  `,
                },
                {
                  description:
                    '레이블이 가리키는 것을 아이콘으로 되풀이하면 같은 뜻을 두 번 읽게 됩니다.',
                  figure: html`
                    <mm-flex slot="figure" align-items="center" gap="4">
                      <mm-button icon="trash">삭제</mm-button>
                    </mm-flex>
                  `,
                },
              )}
            </mm-content-section>

            <mm-content-section
              heading-level="3"
              heading="장식적인 용도로 쓰지 않기"
              description="형제 항목 목록에서 대비가 필요하거나 사용자의 실수를 막을 수 있을 때 아이콘을 사용합니다."
            >
              ${renderDoDontPair(
                {
                  description:
                    '반복되는 항목은 서로 다른 아이콘으로 구분하고, 파괴적 항목은 실수를 막도록 드러냅니다.',
                  figure: html`
                    <mm-menu-item-group slot="figure" aria-label="계정 메뉴">
                      <mm-menu-item-action icon="user" label="프로필"></mm-menu-item-action>
                      <mm-menu-item-action icon="settings" label="설정"></mm-menu-item-action>
                      <mm-menu-item-action
                        icon="trash"
                        label="계정 삭제"
                        destructive
                      ></mm-menu-item-action>
                    </mm-menu-item-group>
                  `,
                },
                {
                  description:
                    '항목마다 같은 아이콘을 달면 구분에 도움이 되지 않고 장식에 그칩니다.',
                  figure: html`
                    <mm-menu-item-group slot="figure" aria-label="계정 메뉴">
                      <mm-menu-item-action icon="box-iso" label="프로필"></mm-menu-item-action>
                      <mm-menu-item-action icon="box-iso" label="설정"></mm-menu-item-action>
                      <mm-menu-item-action
                        icon="box-iso"
                        label="계정 삭제"
                        destructive
                      ></mm-menu-item-action>
                    </mm-menu-item-group>
                  `,
                },
              )}
            </mm-content-section>

            <mm-content-section
              heading-level="3"
              heading="널리 통용되는 기호 쓰기"
              description="낯선 기호는 사용자가 뜻을 매번 다시 해석해야 합니다."
            >
              ${renderDoDontPair(
                {
                  description: '검색은 돋보기처럼 누구나 아는 기호로 나타냅니다.',
                  figure: html`
                    <mm-icon-button slot="figure" icon="search" aria-label="검색"></mm-icon-button>
                  `,
                },
                {
                  description: '낯선 기호는 뜻을 짐작할 수 없어 눌러 보기 전에는 알 수 없습니다.',
                  figure: html`
                    <mm-icon-button
                      slot="figure"
                      icon="cube-scan"
                      aria-label="검색"
                    ></mm-icon-button>
                  `,
                },
              )}
            </mm-content-section>
          </mm-content-section-list>

          <mm-content-section-list size="small">
            <mm-text-block
              level="3"
              heading="쓰이는 아이콘"
              description="역할은 icon-names.ts의 ICON_CATALOG 한 곳에서만 정의합니다. 아이콘이 필요한 곳은 이를 펼친 맵 ICON_NAMES에서 가져옵니다. 파일 이름은 ICON_NAMES를 거쳐 쓰고, 여러 역할이 같은 파일을 써도 역할마다 값을 따로 두며 역할이 갈라지면 그 역할의 값만 바꿉니다."
            ></mm-text-block>
            <mm-content-section-list>${renderIconCatalog()}</mm-content-section-list>
          </mm-content-section-list>
        </mm-content-section-list>
      </mm-tab-panel>

      <mm-tab-panel value="accessibility">
        <mm-content-section-list>
          <mm-content-section heading-level="3" heading="이름">
            <mm-grid columns="2" gap="6">
              ${nameCards.map(
                ({ figure, tags, description }) => html`
                  <mm-figure-card description=${description}>
                    <mm-flex slot="figure" align-items="center">${figure}</mm-flex>
                    ${tags.map(
                      ({ text, tone }) => html`
                        <mm-code-tag slot="tags" tone=${tone}>${text}</mm-code-tag>
                      `,
                    )}
                  </mm-figure-card>
                `,
              )}
            </mm-grid>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="팝업을 여는 트리거">
            <mm-content-section-list size="small">
              <mm-text-list
                variant="check"
                .texts=${[
                  html`
                    트리거는 어떤 패널이 열리는지 미리 알린다. 누르기 전에 스크린리더가 열릴 패널을
                    안내해야, 사용자가 열린 뒤의 조작을 예상할 수 있다.
                  `,
                ]}
              ></mm-text-list>
              <mm-grid columns="3" column-min-width="16rem" gap="6">
                <mm-figure-card description="메뉴를 여는 트리거는 menu로 둔다">
                  <mm-button slot="figure">더보기</mm-button>
                  <mm-code-tag slot="tags">aria-haspopup="menu"</mm-code-tag>
                </mm-figure-card>
                <mm-figure-card description="옵션 목록을 여는 트리거는 listbox로 둔다">
                  <mm-button slot="figure">정렬</mm-button>
                  <mm-code-tag slot="tags">aria-haspopup="listbox"</mm-code-tag>
                </mm-figure-card>
                <mm-figure-card
                  description="토글·슬라이더 같은 컨트롤을 넣은 패널은 menu·listbox 어느 쪽에도 맞지 않아, aria-haspopup을 빼고 열림 여부만 알린다"
                >
                  <mm-button slot="figure">설정</mm-button>
                  <mm-code-tag slot="tags">aria-expanded</mm-code-tag>
                </mm-figure-card>
              </mm-grid>
            </mm-content-section-list>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="팝업의 포커스">
            <mm-flex direction="column" gap="4">
              <mm-flex direction="column" gap="4">
                ${popupKinds.map(
                  ({ kind, description }) => html`
                    <mm-flex direction="column" align-items="flex-start" gap="1">
                      <mm-code-tag tone=${POPUP_TONES[kind]}>${kind}</mm-code-tag>
                      <mm-paragraph>${description}</mm-paragraph>
                    </mm-flex>
                  `,
                )}
              </mm-flex>
              <mm-flex direction="column" gap="2">
                ${popupComponents.map(
                  ({ name, kind }) => html`
                    <mm-tag-group>
                      <mm-code-tag>${name}</mm-code-tag>
                      <mm-code-tag tone=${POPUP_TONES[kind]}>${kind}</mm-code-tag>
                    </mm-tag-group>
                  `,
                )}
              </mm-flex>
            </mm-flex>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="선택 그룹의 키보드">
            <mm-flex direction="column" gap="4">
              <mm-flex direction="column" gap="4">
                ${keyLegend.map(
                  ({ key, description }) => html`
                    <mm-flex direction="column" align-items="flex-start" gap="1">
                      <mm-code-tag tone=${KEY_TONES[key]}>${key}</mm-code-tag>
                      <mm-paragraph>${description}</mm-paragraph>
                    </mm-flex>
                  `,
                )}
              </mm-flex>
              <mm-flex direction="column" gap="2">
                ${groupKeys.map(
                  ({ name, keys }) => html`
                    <mm-tag-group>
                      <mm-code-tag>${name}</mm-code-tag>
                      ${keys.map(
                        key => html`
                          <mm-code-tag tone=${KEY_TONES[key]}>${key}</mm-code-tag>
                        `,
                      )}
                    </mm-tag-group>
                  `,
                )}
                <mm-tag-group>
                  <mm-code-tag>mm-tab-list</mm-code-tag>
                  <mm-code-tag tone="cyan">Arrow Keys</mm-code-tag>
                </mm-tag-group>
                <mm-tag-group>
                  <mm-code-tag>mm-menu-item-radio-group</mm-code-tag>
                  <mm-code-tag>radio</mm-code-tag>
                  <mm-code-tag tone="cyan">Arrow Keys</mm-code-tag>
                </mm-tag-group>
              </mm-flex>
            </mm-flex>
          </mm-content-section>
        </mm-content-section-list>
      </mm-tab-panel>
    </mm-page-body>
  </mm-main>
`

renderPage(main)
