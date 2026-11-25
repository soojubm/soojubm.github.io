import '@/components/common'
import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentReferenceItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'

import { ICON_NAMES } from '@/components/common'
import { componentPropsOf, subComponentPropsOf } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'icon-button.html', label: 'Icon Button' },
  { href: 'toggle-button.html', label: 'Toggle Button' },
  { href: 'link.html', label: 'Link' },
]

const componentReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://developer.android.com/reference/android/widget/HorizontalScrollView',
    label: 'Android - HorizontalScrollView',
  },
  {
    href: 'https://developer.android.com/reference/com/google/android/material/chip/ChipGroup',
    label: 'Android - ChipGroup',
  },
  {
    href: 'https://m3.material.io/components/segmented-buttons/overview',
    label: 'MD3 - Segmented Buttons',
  },
  {
    href: 'https://developer.apple.com/design/human-interface-guidelines/segmented-controls',
    label: 'Apple HIG - Segmented Controls',
  },
  {
    href: 'https://www.w3.org/WAI/ARIA/apg/patterns/listbox/',
    label: 'WAI-ARIA APG - Listbox Pattern',
  },
]

const componentProps: ComponentPropItemData[] = [
  ...componentPropsOf('mm-button'),
  { name: 'click', type: '(e: MouseEvent) => void', kind: 'event' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Interactive - action',
    description:
      '버튼은 페이지 내에서 여러 번 반복될 수 없는 최종적인 인터렉션입니다. 단, 전송이 실패하는 경우 여러 번 반복해서 실행할 수 있습니다.',
  },
  {
    heading: 'Feedback',
    description:
      'TODO 물리적인 인터페이스의 출현만이 수행 결과의 피드백이 아닙니다. 예측할 수 있는 페이지 이동이나 페이지 새로고침, 정보 구조의 변화도 피드백으로 취급될 수 있습니다. (ex bad case: 인스타그램 앱에서 로그인되었다는 toast. 홈으로 이동과 피드 노출만으로 로그인 상태를 인지할수 있다.)',
  },
]

const chipNamingRows = html`
  <tr>
    <th scope="row">Assist chip</th>
    <td colspan="2">Action chip</td>
    <td>M2의 Action chip은 toggle이 아님.</td>
  </tr>
  <tr>
    <th scope="row" rowspan="2">Filter chip</th>
    <td colspan="2">Choice chip</td>
    <td>M3에서도 Flutter는 single-select filter chip을 ChoiceChip으로 구현한다.</td>
  </tr>
  <tr>
    <td colspan="2">Filter chip</td>
    <td>M2에서는 checkbox 대안, M3/Flutter에서는 다중 선택 filter chip에 대응한다.</td>
  </tr>
  <tr>
    <th scope="row">Input chip</th>
    <td colspan="2">Input chip</td>
    <td>삭제 가능. TODO 필요하면 선택 또는 press 동작도 가질 수 있다.</td>
  </tr>
  <tr>
    <th scope="row">Suggestion chip</th>
    <td>Action chip에 가까움</td>
    <td>Action chip</td>
    <td>Flutter M3에서 ActionChip은 Assist/Suggestion chip으로 사용.</td>
  </tr>
  <tr>
    <th scope="row">-</th>
    <td>Chip</td>
    <td>Chip / RawChip</td>
    <td>RawChip은 Flutter의 위젯.</td>
  </tr>
`

const variantCode = `<mm-button-group>
  <mm-button variant="primary">primary</mm-button>
  <mm-button variant="secondary">secondary</mm-button>
  <mm-button variant="tertiary">tertiary</mm-button>
</mm-button-group>
<mm-separator></mm-separator>
<mm-button variant="primary" destructive>destructive</mm-button>`

const sizeCode = `<mm-button-group>
  <mm-button variant="primary" size="large">large</mm-button>
  <mm-button variant="primary">medium</mm-button>
</mm-button-group>`

const iconCode = `<mm-button-group>
  <mm-button variant="secondary" icon="arrow-left">이전</mm-button>
  <mm-button variant="secondary" icon="arrow-right" icon-position="trailing">
    다음
  </mm-button>
</mm-button-group>`

const stateCode = `<mm-button-group>
  <mm-button variant="secondary">hovered</mm-button>
  <mm-button variant="secondary">focused</mm-button>
  <mm-button variant="secondary" disabled>disabled</mm-button>
</mm-button-group>`

const main = html`
  <mm-main>
    <mm-page-header
      heading="Button"
      description="양식 제출이나 저장처럼 사용자 여정의 핵심 과업을 실행하는 컨트롤입니다. 레이블로 수행할 행동을 드러내고 누르는 즉시 작업을 실행하므로, 사용자는 지금 무엇을 할 수 있는지 알고 망설임 없이 다음 단계로 나아갈 수 있습니다."
    ></mm-page-header>

    <mm-flex direction="column" gap="4">
      <mm-tab-list value="variant" variant="pill">
        <mm-tab value="variant">Variant</mm-tab>
        <mm-tab value="size">Size</mm-tab>
        <mm-tab value="icon">Icon</mm-tab>
        <mm-tab value="state">State</mm-tab>
      </mm-tab-list>
      <mm-tab-panel value="variant">
        <mm-component-example full-width>
          <mm-button-group>
            <mm-button variant="primary">primary</mm-button>
            <mm-button variant="secondary">secondary</mm-button>
            <mm-button variant="tertiary">tertiary</mm-button>
          </mm-button-group>
          <mm-separator></mm-separator>
          <mm-button variant="primary" destructive>destructive</mm-button>
        </mm-component-example>
        <mm-component-code .code=${variantCode}></mm-component-code>
      </mm-tab-panel>
      <mm-tab-panel value="size">
        <mm-component-example>
          <mm-button-group>
            <mm-button variant="primary" size="large">large</mm-button>
            <mm-button variant="primary">medium</mm-button>
          </mm-button-group>
        </mm-component-example>
        <mm-component-code .code=${sizeCode}></mm-component-code>
      </mm-tab-panel>
      <mm-tab-panel value="icon">
        <mm-component-example>
          <mm-button-group>
            <mm-button variant="secondary" icon=${ICON_NAMES.PREVIOUS}>이전</mm-button>
            <mm-button variant="secondary" icon=${ICON_NAMES.NEXT} icon-position="trailing">
              다음
            </mm-button>
          </mm-button-group>
        </mm-component-example>
        <mm-component-code .code=${iconCode}></mm-component-code>
      </mm-tab-panel>
      <mm-tab-panel value="state">
        <mm-component-example>
          <mm-button-group>
            <mm-button variant="secondary">hovered</mm-button>
            <mm-button variant="secondary">focused</mm-button>
            <mm-button variant="secondary" disabled>disabled</mm-button>
          </mm-button-group>
        </mm-component-example>
        <mm-component-code .code=${stateCode}></mm-component-code>
      </mm-tab-panel>
    </mm-flex>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .elements=${['mm-button']}></mm-component-tokens>

    <mm-component-guide .features=${componentFeatures}>
      <mm-paragraph-group>
        <mm-component-aka
          .items=${['Tag', 'Pill', 'Badge', 'Token', 'Label', 'Pick Button']}
        ></mm-component-aka>
        <mm-text-list
          .texts=${[
            'disabled 버튼은 피한다. 불완전한 폼도 제출하게 두고 오류 메시지로 무엇이 잘못됐는지 알린다.',
          ]}
        ></mm-text-list>
      </mm-paragraph-group>
    </mm-component-guide>

    <mm-component-anatomy
      .parts=${[
        '컨테이너 — variant·size로 형태와 위계를 정의하고 클릭 영역을 만듭니다.',
        '아이콘 — 레이블을 보조하는 선택적 메타포(icon).',
        '레이블 — 실행 결과를 예측할 수 있는 동사형 텍스트.',
      ]}
      .markers=${[
        { placement: 'inline-start' },
        { placement: 'block-end', offset: '1.75rem' },
        { placement: 'block-end', offset: 'calc(100% - 1.5rem)' },
      ]}
    >
      <mm-button variant="primary" icon=${ICON_NAMES.SUBMIT}>보내기</mm-button>
    </mm-component-anatomy>

    <mm-component-section
      heading="Button Group"
      .checks=${[
        '항상 primary action에 먼저 포커스되어야 합니다.',
        '포커스 순서는 tabindex 대신 마크업 순서로 맞추고, 화면에 보이는 배치는 정렬 스타일링으로 따로 잡습니다.',
      ]}
      description="버튼 그룹은 관련된 액션을 묶어 사용자가 선택할 수 있도록 합니다. TODO Reject-Approve Pattern, Confirmation Pattern"
    >
      <mm-button-group aria-label="상품 정보 묶음">
        <mm-button variant="secondary">취소</mm-button>
        <mm-button variant="primary">저장</mm-button>
      </mm-button-group>
      <mm-separator></mm-separator>
      <mm-button-group>
        <mm-button variant="tertiary">건너뛰기</mm-button>
        <mm-button variant="secondary">이전</mm-button>
        <mm-button variant="primary">다음</mm-button>
      </mm-button-group>
      <mm-separator></mm-separator>
      <mm-button-group>
        <mm-button variant="primary" href="#">지금 가입하기</mm-button>
        <mm-button variant="tertiary">더 알아보기</mm-button>
      </mm-button-group>
    </mm-component-section>

    <mm-component-section
      heading="ShowMoreButton"
      full-width
      description=""
      .checks=${['콘텐츠 목록의 너비와 대비되도록 강조하기 위해 full-width로 사용하지 마세요.']}
    >
      <mm-grid columns="3">
        <mm-ui-placeholder></mm-ui-placeholder>
        <mm-ui-placeholder></mm-ui-placeholder>
        <mm-ui-placeholder></mm-ui-placeholder>
      </mm-grid>
      <div style="padding: 1.5rem 0 0">
        <mm-show-more-button></mm-show-more-button>
      </div>
    </mm-component-section>

    <mm-component-section heading="AddButton" description="새 항목을 추가합니다.">
      <mm-add-button label="항목 추가"></mm-add-button>
    </mm-component-section>

    <mm-component-section
      heading="SocialAuthButton"
      description="외부 계정으로 로그인·가입을 시작합니다."
    >
      <mm-flex direction="column" gap="2">
        <mm-social-auth-button provider="facebook"></mm-social-auth-button>
        <mm-social-auth-button provider="google"></mm-social-auth-button>
        <mm-social-auth-button provider="apple"></mm-social-auth-button>
      </mm-flex>
    </mm-component-section>

    <mm-table
      .rows=${chipNamingRows}
      style="margin-top: var(--space-section)"
      caption="Material 3, Material 2, Flutter의 Chip 명칭 비교"
      .columns=${[
        { label: 'Material 3' },
        { label: 'Material 2' },
        { label: 'Flutter' },
        { label: '정리' },
      ]}
    ></mm-table>

    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-references .items=${componentReferences}></mm-component-references>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
