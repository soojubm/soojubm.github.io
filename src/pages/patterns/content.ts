import { html, nothing } from 'lit'

import { ICON_CATALOG } from '@/components/common'
import { FEATURE_ICONS } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

/** 브랜드 표기처럼 대소문자가 고정된 이름만 예외로 둔다. */
const ICON_LABELS: Record<string, string> = {
  GITHUB: 'GitHub',
}

const toIconLabel = (key: string) =>
  ICON_LABELS[key] ?? key.charAt(0) + key.slice(1).toLowerCase().replace(/_/g, ' ')

const renderIconGrid = (entries: [string, string][]) => html`
  <mm-grid columns="4" column-min-width="120px">
    ${entries.map(
      ([label, name]) => html`
        <mm-flex direction="column" align-items="center" gap="2">
          <mm-icon name=${name} size="large" aria-hidden="true"></mm-icon>
          <mm-text size="12">${label}</mm-text>
        </mm-flex>
      `,
    )}
  </mm-grid>
`

/** 같은 파일(xmark)을 쓰더라도 역할마다 남겨 두는 항목의 설명과 쓰는 곳. */
const ACTION_ROLE_DETAIL: Record<string, { description: string; usage: string[] }> = {
  DISMISS: {
    description: '사용자가 띄운 비필수 표면을 걷어냅니다.',
    usage: ['배너', '알림', '토스트'],
  },
  CLOSE: {
    description: '열려 있던 대화형 표면을 닫습니다.',
    usage: ['모달', '패널', '시트'],
  },
  CLEAR: {
    description: '입력한 값을 지워 빈 상태로 되돌립니다.',
    usage: ['search input'],
  },
}

const renderUsage = (usage: string[]) => {
  if (usage.length === 1) {
    return html`
      <mm-keyword-tag slot="trailing">${usage[0]}</mm-keyword-tag>
    `
  }

  return html`
    <mm-keyword-tag-group slot="trailing" .keywords=${usage}></mm-keyword-tag-group>
  `
}

const renderRoleItem = ([key, name]: [string, string]) => {
  const detail = ACTION_ROLE_DETAIL[key]

  return html`
    <mm-list-item
      icon=${name}
      size="small"
      label=${key.toLowerCase().replace(/_/g, ' ')}
      description=${detail?.description ?? ''}
    >
      ${detail ? renderUsage(detail.usage) : nothing}
    </mm-list-item>
  `
}

const renderRoleList = (icons: Record<string, string>) => html`
  <mm-flex direction="column" gap="3">${Object.entries(icons).map(renderRoleItem)}</mm-flex>
`

/** 역할을 목록으로 전시하는 그룹. 나머지는 아이콘 그리드로 둔다. */
const ROLE_LIST_CATEGORIES = ['actions', 'navigations', 'status']

const renderIconCatalog = () => [
  html`
    <mm-surface>
      <mm-content-section heading-level="5" heading="Component features">
        ${renderIconGrid(Object.entries(FEATURE_ICONS))}
      </mm-content-section>
    </mm-surface>
  `,
  ...Object.entries(ICON_CATALOG)
    .filter(([, icons]) => Object.keys(icons).length > 0)
    .map(
      ([category, icons]) => html`
        <mm-surface>
          <mm-content-section heading-level="5" heading=${category}>
            ${ROLE_LIST_CATEGORIES.includes(category)
              ? renderRoleList(icons)
              : renderIconGrid(
                  Object.entries(icons).map(([key, name]) => [toIconLabel(key), name]),
                )}
          </mm-content-section>
        </mm-surface>
      `,
    ),
]

const main = html`
  <mm-main>
    <mm-page-header
      heading="Content"
      description="텍스트 슬롯은 관점에 따라 이름과 어조를 나누고, 아이콘은 뜻을 지닐 때만 씁니다. 사용자가 빠르게 스캔할 수 있게 합니다."
    ></mm-page-header>

    <mm-content-section-list>
      <mm-content-section heading-level="3" heading="원칙">
        <mm-content-section heading-level="4" heading="Easy scanning">
          <mm-paragraph>
            사용자는 설명을 정독하지 않습니다. 텍스트를 짧게 유지하고 스캔 가능한 덩어리로 나눕니다.
            간결한 문구는 사용자가 서비스를 이해하고 다룰 수 있다는 신뢰를 만듭니다.
          </mm-paragraph>
          <mm-paragraph>
            분류·속성·키워드처럼 나열되는 값은 문장으로 풀지 않고 tag로 끊어 보여, 훑는 것만으로
            구분되게 합니다.
          </mm-paragraph>
        </mm-content-section>

        <mm-content-section heading-level="4" heading="관점에 맞는 이름">
          <mm-paragraph>
            슬롯의 화자가 사용자인지 시스템인지에 따라 이름과 어조를 맞춥니다. 실행 레이블은 사용자
            시점의 동사로 쓰고 줄여 표시하지 않습니다.
          </mm-paragraph>
        </mm-content-section>

        <mm-content-section heading-level="4" heading="주목이 필요한 콘텐츠">
          <mm-paragraph>
            상태 변화, 결과, 맥락 전환을 전달할 때는 콘텐츠 모듈을 가운데 정렬해 사용자의 주의를
            환기합니다.
          </mm-paragraph>
          <mm-keyword-tag-group
            .keywords=${['Result component', 'Empty state', 'Success message']}
          ></mm-keyword-tag-group>
        </mm-content-section>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="용어">
        <mm-content-section heading-level="4" heading="Message">
          <mm-paragraph>
            사용자의 관점에서 다음에 할 일을 알려주는 문구입니다. 예: "확인 후 진행해주세요".
          </mm-paragraph>
        </mm-content-section>

        <mm-content-section heading-level="4" heading="Description">
          <mm-paragraph>
            시스템을 주어로 대상이 무엇을 하는지 서술하는 설명입니다. 예: "이 컴포넌트는 ~를
            수행합니다".
          </mm-paragraph>
        </mm-content-section>

        <mm-content-section heading-level="4" heading="Interaction Label">
          <mm-paragraph>동작을 가리키는 짧은 한글 레이블입니다. 예: 보내기 → 받기.</mm-paragraph>
        </mm-content-section>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Iconography">
        <mm-paragraph>
          아이콘도 텍스트와 함께 뜻을 전달하는 콘텐츠입니다. 장식으로 쓰지 않고 레이블을 보완하거나,
          좁은 공간에서 레이블을 대신하거나, 상태와 행동 가능성을 분명히 할 때 사용합니다. 널리
          통용되는 기호만 쓰고 새 의미를 임의로 붙이지 않습니다.
        </mm-paragraph>

        <mm-content-section heading-level="4" heading="하나의 아이콘, 하나의 의미">
          <mm-paragraph>
            같은 아이콘을 맥락마다 다른 뜻으로 재사용하지 않습니다. 의미가 흔들리면 사용자가 매번
            다시 해석해야 합니다. 뜻은 컴포넌트가 아니라 제품 전체에서 일관합니다.
          </mm-paragraph>
        </mm-content-section>

        <mm-content-section heading-level="4" heading="중복 표현하지 않기">
          <mm-paragraph>
            보이는 레이블이 이미 온전히 가리키는 것을 아이콘으로 되풀이하지 않습니다. 레이블이 붙은
            텍스트필드에는 뜻이 겹치는 장식 아이콘을 더하지 않습니다. 아이콘이 여는 방식을 암시하는
            자리도, 값의 형식을 글로 보이면(날짜 필드의 YYYY. MM. DD.) 그 글이 더 명료해 아이콘은
            다시 중복이 됩니다. 남는 아이콘은 뜻을 지니면 대체 텍스트를 주고, 순수한 장식이면 접근성
            트리에서 숨깁니다.
          </mm-paragraph>
        </mm-content-section>

        <mm-content-section heading-level="4" heading="쓰이는 아이콘">
          <mm-paragraph>
            아이콘 이름 맵의 키가 역할이고, 값이 그 역할이 지금 참조하는 라이브러리 파일입니다.
            역할은 이 맵 한 곳에서만 정의하고, 아이콘이 필요한 곳은 모두 이 맵을 거칩니다. 파일
            이름을 코드에 직접 적거나 역할 목록을 따로 두지 않습니다. 여러 역할이 우연히 같은 파일을
            써도 정리 대상이 아니며, 역할이 갈라지면 그 역할의 값만 바꿉니다. 역할이 없는 이모지나
            문자 기호는 이 맵에 넣지 않고, 콘텐츠로서 icon 대신 emoji로 넘깁니다.
          </mm-paragraph>
          ${renderIconCatalog()}
        </mm-content-section>
      </mm-content-section>
    </mm-content-section-list>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
