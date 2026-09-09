import { html } from 'lit'

import { ICON_CATALOG } from '@/components/common/icon/icon-names'
import { renderPage } from '@/components/layouts/base-layouts'

/** 브랜드 표기처럼 대소문자가 고정된 이름만 예외로 둔다. */
const ICON_LABELS: Record<string, string> = {
  GITHUB: 'GitHub',
}

const toIconLabel = (key: string) =>
  ICON_LABELS[key] ?? key.charAt(0) + key.slice(1).toLowerCase().replace(/_/g, ' ')

const renderIconCatalog = () =>
  Object.entries(ICON_CATALOG).map(
    ([category, icons]) => html`
      <mm-content-section heading-level="5" heading=${category}>
        <mm-grid columns="4" column-min-width="120px">
          ${Object.entries(icons).map(
            ([key, name]) => html`
              <mm-flex direction="column" align-items="center" gap="2">
                <mm-icon name=${name} size="large" aria-hidden="true"></mm-icon>
                <mm-text size="12">${toIconLabel(key)}</mm-text>
              </mm-flex>
            `,
          )}
        </mm-grid>
      </mm-content-section>
    `,
  )

const main = html`
  <mm-page>
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

        <mm-content-section heading-level="4" heading="의미와 장식의 구분">
          <mm-paragraph>
            뜻을 지닌 아이콘은 대체 텍스트를 함께 제공하고, 레이블 옆에서 같은 뜻을 되풀이하기만
            하는 아이콘은 접근성 트리에서 숨깁니다.
          </mm-paragraph>
        </mm-content-section>

        <mm-content-section heading-level="4" heading="쓰이는 아이콘">
          <mm-paragraph>
            제품에서 뜻이 고정된 아이콘입니다. 화면에서는 iconoir 이름을 그대로 씁니다.
          </mm-paragraph>
          ${renderIconCatalog()}
        </mm-content-section>
      </mm-content-section>
    </mm-content-section-list>
  </mm-page>
`

renderPage(main)
