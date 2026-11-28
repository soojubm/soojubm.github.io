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
    label: 'Material Design 3 - Segmented Buttons',
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
  ...componentPropsOf('fff-button'),
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

const variantCode = `<fff-button-group>
  <fff-button variant="primary">primary</fff-button>
  <fff-button variant="secondary">secondary</fff-button>
  <fff-button variant="tertiary">tertiary</fff-button>
</fff-button-group>
<fff-separator></fff-separator>
<fff-button variant="primary" destructive>destructive</fff-button>`

const sizeCode = `<fff-button-group>
  <fff-button variant="primary" size="large">large</fff-button>
  <fff-button variant="primary">medium</fff-button>
</fff-button-group>`

const iconCode = `<fff-button-group>
  <fff-button variant="secondary" icon="arrow-left">이전</fff-button>
  <fff-button variant="secondary" icon="arrow-right" icon-position="trailing">
    다음
  </fff-button>
</fff-button-group>`

const stateCode = `<fff-button-group>
  <fff-button variant="secondary">hovered</fff-button>
  <fff-button variant="secondary">focused</fff-button>
  <fff-button variant="secondary" disabled>disabled</fff-button>
</fff-button-group>`

const main = html`
  <fff-main>
    <fff-page-header
      heading="Button"
      description="양식 제출이나 저장처럼 사용자 여정의 핵심 과업을 실행하는 컨트롤입니다. 레이블로 수행할 행동을 드러내고 누르는 즉시 작업을 실행하므로, 사용자는 지금 무엇을 할 수 있는지 알고 망설임 없이 다음 단계로 나아갈 수 있습니다."
    ></fff-page-header>

    <fff-flex direction="column" gap="4">
      <fff-tab-list
        value="variant"
        variant="pill"
        .tabs=${[
          { value: 'variant', label: 'Variant' },
          { value: 'size', label: 'Size' },
          { value: 'icon', label: 'Icon' },
          { value: 'state', label: 'State' },
        ]}
      ></fff-tab-list>
      <fff-tab-panel value="variant">
        <fff-component-example full-width>
          <fff-button-group>
            <fff-button variant="primary">primary</fff-button>
            <fff-button variant="secondary">secondary</fff-button>
            <fff-button variant="tertiary">tertiary</fff-button>
          </fff-button-group>
          <fff-separator></fff-separator>
          <fff-button variant="primary" destructive>destructive</fff-button>
        </fff-component-example>
        <fff-component-code .code=${variantCode}></fff-component-code>
      </fff-tab-panel>
      <fff-tab-panel value="size">
        <fff-component-example>
          <fff-button-group>
            <fff-button variant="primary" size="large">large</fff-button>
            <fff-button variant="primary">medium</fff-button>
          </fff-button-group>
        </fff-component-example>
        <fff-component-code .code=${sizeCode}></fff-component-code>
      </fff-tab-panel>
      <fff-tab-panel value="icon">
        <fff-component-example>
          <fff-button-group>
            <fff-button variant="secondary" icon=${ICON_NAMES.PREVIOUS}>이전</fff-button>
            <fff-button variant="secondary" icon=${ICON_NAMES.NEXT} icon-position="trailing">
              다음
            </fff-button>
          </fff-button-group>
        </fff-component-example>
        <fff-component-code .code=${iconCode}></fff-component-code>
      </fff-tab-panel>
      <fff-tab-panel value="state">
        <fff-component-example>
          <fff-button-group>
            <fff-button variant="secondary">hovered</fff-button>
            <fff-button variant="secondary">focused</fff-button>
            <fff-button variant="secondary" disabled>disabled</fff-button>
          </fff-button-group>
        </fff-component-example>
        <fff-component-code .code=${stateCode}></fff-component-code>
      </fff-tab-panel>
    </fff-flex>

    <fff-component-props .props=${componentProps}></fff-component-props>

    <fff-component-tokens .elements=${['fff-button']}></fff-component-tokens>

    <fff-component-feature-list .features=${componentFeatures}></fff-component-feature-list>

    <fff-component-guide>
      <fff-paragraph-group>
        <fff-component-aka
          .items=${['Tag', 'Pill', 'Badge', 'Token', 'Label', 'Pick Button']}
        ></fff-component-aka>
        <fff-text-list
          .texts=${[
            'disabled 버튼은 피한다. 불완전한 폼도 제출하게 두고 오류 메시지로 무엇이 잘못됐는지 알린다.',
          ]}
        ></fff-text-list>
      </fff-paragraph-group>
    </fff-component-guide>

    <fff-component-section
      heading="Button Group"
      .checks=${[
        '항상 primary action에 먼저 포커스되어야 합니다.',
        '포커스 순서는 tabindex 대신 마크업 순서로 맞추고, 화면에 보이는 배치는 정렬 스타일링으로 따로 잡습니다.',
      ]}
      description="버튼 그룹은 관련된 액션을 묶어 사용자가 선택할 수 있도록 합니다. TODO Reject-Approve Pattern, Confirmation Pattern"
    >
      <fff-button-group aria-label="상품 정보 묶음">
        <fff-button variant="secondary">취소</fff-button>
        <fff-button variant="primary">저장</fff-button>
      </fff-button-group>
      <fff-separator></fff-separator>
      <fff-button-group>
        <fff-button variant="tertiary">건너뛰기</fff-button>
        <fff-button variant="secondary">이전</fff-button>
        <fff-button variant="primary">다음</fff-button>
      </fff-button-group>
      <fff-separator></fff-separator>
      <fff-button-group>
        <fff-button variant="primary" href="#">지금 가입하기</fff-button>
        <fff-button variant="tertiary">더 알아보기</fff-button>
      </fff-button-group>
    </fff-component-section>

    <fff-component-section
      heading="ShowMoreButton"
      full-width
      description=""
      .checks=${['콘텐츠 목록의 너비와 대비되도록 강조하기 위해 full-width로 사용하지 마세요.']}
    >
      <fff-grid columns="3">
        <fff-ui-placeholder></fff-ui-placeholder>
        <fff-ui-placeholder></fff-ui-placeholder>
        <fff-ui-placeholder></fff-ui-placeholder>
      </fff-grid>
      <div style="padding: 1.5rem 0 0">
        <fff-show-more-button></fff-show-more-button>
      </div>
    </fff-component-section>

    <fff-component-section heading="AddButton" description="새 항목을 추가합니다.">
      <fff-add-button label="항목 추가"></fff-add-button>
    </fff-component-section>

    <fff-component-section
      heading="SocialAuthButton"
      description="외부 계정으로 로그인·가입을 시작합니다."
    >
      <fff-flex direction="column" gap="2">
        <fff-social-auth-button provider="facebook"></fff-social-auth-button>
        <fff-social-auth-button provider="google"></fff-social-auth-button>
        <fff-social-auth-button provider="apple"></fff-social-auth-button>
      </fff-flex>
    </fff-component-section>

    <fff-table
      .rows=${chipNamingRows}
      style="margin-top: var(--space-section)"
      caption="Material 3, Material 2, Flutter의 Chip 명칭 비교"
      .columns=${[
        { label: 'Material 3' },
        { label: 'Material 2' },
        { label: 'Flutter' },
        { label: '정리' },
      ]}
    ></fff-table>

    <fff-component-related .items=${relatedComponents}></fff-component-related>

    <fff-component-references .items=${componentReferences}></fff-component-references>

    <fff-component-pager></fff-component-pager>
  </fff-main>
`

renderPage(main)
