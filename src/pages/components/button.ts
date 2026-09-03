import '@/components/common/table'
import { html } from 'lit'

import type { ComponentFeatureItem } from '@/components/domains/component/component-feature-list'
import type { ComponentPropItemData } from '@/components/domains/component/component-props'
import type { ComponentReferenceItemData } from '@/components/domains/component/component-references'
import type { ComponentRelatedItemData } from '@/components/domains/component/component-related'
import type { ComponentTokenItemData } from '@/components/domains/component/component-tokens'

import { renderDocumentLayout } from '@/components/layouts/document-layout'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'icon-button.html', label: 'Icon Button' },
  { href: 'toggle-button.html', label: 'Toggle Button' },
  { href: 'link.html', label: 'Link' },
]

const componentReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://developer.android.com/reference/android/widget/HorizontalScrollView',
    label: 'Android - HorizontalScrollView',
    external: true,
  },
  {
    href: 'https://developer.android.com/reference/com/google/android/material/chip/ChipGroup',
    label: 'Android - ChipGroup',
    external: true,
  },
  {
    href: 'https://m3.material.io/components/segmented-buttons/overview',
    label: 'MD3 - Segmented Buttons',
    external: true,
  },
  {
    href: 'https://developer.apple.com/design/human-interface-guidelines/segmented-controls',
    label: 'Apple HIG - Segmented Controls',
    external: true,
  },
  {
    href: 'https://www.w3.org/WAI/ARIA/apg/patterns/listbox/',
    label: 'WAI-ARIA APG - Listbox Pattern',
    external: true,
  },
  {
    href: 'https://elements.ai-sdk.dev/components/attachments',
    label: 'AI SDK Elements - Attachments',
    external: true,
  },
  {
    href: 'https://seed-design.io/react/components/attachment-display-field',
    label: 'Seed Design - Attachment Display Field',
    external: true,
  },
]

const componentProps: ComponentPropItemData[] = [
  {
    name: 'variant',
    type: "'primary' | 'secondary' | 'tertiary' | 'ghost' | 'destructive' = 'tertiary'",
  },
  { name: 'size', type: "'medium' | 'large' = 'medium'" },
  { name: 'full-width', type: 'boolean', optional: true },
  { name: 'disabled', type: 'boolean', optional: true },
  { name: 'icon', type: 'IconName', optional: true },
  { name: 'icon-position', type: "'leading' | 'trailing' = 'leading'", optional: true },
  { name: 'aria-label', type: 'string', optional: true },
  { name: 'role', type: 'button | tab', optional: true },
  { name: 'aria-expanded', type: "'true' | 'false'", optional: true },
  { name: 'aria-haspopup', type: 'string', optional: true },
  { name: 'aria-current', type: "'true' | 'page' | 'step' | 'location'", optional: true },
  { name: '@click', type: '(e: MouseEvent) => void', kind: 'event' },
]

const componentTokens: ComponentTokenItemData[] = [
  { name: 'button-height', default: 'var(--size-32)' },
  { name: 'button-min-width', default: '5rem' },
  { name: 'button-padding-inline', default: 'var(--space-3)' },
  { name: 'button-text-color', default: 'var(--foreground-color)' },
  { name: 'button-text-size', default: 'inherit' },
  { name: 'button-text-weight', default: 'var(--font-weight-bold)' },
  { name: 'button-background-color', default: 'var(--background-subtle-color)' },
  { name: 'button-border', default: '1px solid var(--button-background-color)' },
  { name: 'button-border-radius', default: 'var(--radius)' },
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
      '물리적인 인터페이스의 출현만이 수행 결과의 피드백이 아닙니다. 예측할 수 있는 페이지 이동이나 페이지 새로고침, 정보 구조의 변화도 피드백으로 취급될 수 있습니다. (ex bad case: 인스타그램 앱에서 로그인되었다는 toast. 홈으로 이동과 피드 노출만으로 로그인 상태를 인지할수 있다.)',
  },
]

const main = html`
  <main class="page js-tab">
    <mm-page-header
      heading="Button"
      description="페이지 이동이나 양식 제출 등 사용자 여정의 핵심 과업입니다. (이 디스크립션은 칩이 있었을 때 유효)"
    ></mm-page-header>

    <mm-component-example>
      <mm-button-group>
        <mm-button variant="primary" size="large">primary</mm-button>
        <mm-button variant="secondary" size="large">secondary</mm-button>
        <mm-button variant="tertiary" size="large">tertiary</mm-button>
        <mm-button variant="destructive" size="large" aria-label="danger">destructive</mm-button>
        <mm-button variant="ghost" size="large">ghost</mm-button>
      </mm-button-group>
      <mm-separator></mm-separator>
      <mm-button-group>
        <mm-button variant="primary" size="large">large</mm-button>
        <mm-button variant="primary">small</mm-button>
      </mm-button-group>
      <mm-separator></mm-separator>
      <mm-button-group>
        <mm-button variant="tertiary">hovered</mm-button>
        <mm-button variant="tertiary">focused</mm-button>
        <mm-button variant="tertiary" disabled>disabled</mm-button>
      </mm-button-group>
    </mm-component-example>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .tokens=${componentTokens}></mm-component-tokens>

    <mm-component-guide>
      <mm-component-feature-list .features=${componentFeatures}></mm-component-feature-list>

      <mm-paragraph-group>
        <mm-paragraph size="large">
          chip/button small - 사용자 여정을 보조하는 액션입니다. 사용자는 페이지 내에서 즉각적인
          결과를 기대할 수 있습니다.
        </mm-paragraph>

        <mm-component-aka
          items='["Tag", "Pill", "Badge", "Token", "Label", "Pick Button"]'
        ></mm-component-aka>

        <mm-text-list
          texts='[
          "Avoid disabled buttons. Let the user send incomplete form and use error messages to explain what is wrong.",
          "실행 결과를 에측할 수 있는 레이블을 작성하세요. 툴팁으로 부연하거나, 실행을 유도하는 보조 텍스트 또는 실행 결과를 보충하는 보조 텍스트로 버튼 이외의 가이드가 필요하지 않습니다.",
          "맥락이 다른 액션을 그룹으로 제공할 수 있습니다. 이 때 단일선택, 다중선택, 삭제여부, 펼침메뉴 등의 기표를 충분히 제공하세요. ariaHaspopup/ariaSelected",
          "Split button이란? 사용자에게 더 많은 작업을 표시하는 경우 작업을 선택하여 트리거할 수 있도록 선택 + 버튼 조합을 사용. 것이 좋습니다.",
          "빈 버튼이 필요한가? 리액트에서 포커싱이 가능한 전체 영역의 버튼. 도는 버튼 내부에서포지셔닝되는 버튼. 시각적으로는 버튼 내부의 버튼이지만 구조적으로 대안이 되는 형태의 버튼"
        ]'
        ></mm-text-list>
      </mm-paragraph-group>
    </mm-component-guide>

    <mm-component-anatomy
      parts='[
      "컨테이너 — variant·size로 형태와 위계를 정의하고 클릭 영역을 만듭니다.",
      "아이콘 — 레이블을 보조하는 선택적 메타포(icon).",
      "레이블 — 실행 결과를 예측할 수 있는 동사형 텍스트."
    ]'
    >
      <mm-button variant="primary" size="large" icon="send-diagonal">보내기</mm-button>
      <mm-list-marker
        variant="number"
        value="1"
        style="position: absolute; left: -1.75rem; top: 50%; transform: translateY(-50%)"
      ></mm-list-marker>
      <mm-list-marker
        variant="number"
        value="2"
        style="position: absolute; left: 1.75rem; bottom: -1.75rem; transform: translateX(-50%)"
      ></mm-list-marker>
      <mm-list-marker
        variant="number"
        value="3"
        style="position: absolute; right: 1.5rem; bottom: -1.75rem; transform: translateX(50%)"
      ></mm-list-marker>
    </mm-component-anatomy>

    <mm-component-section
      heading="Button Group"
      description="버튼 그룹은 관련된 액션을 묶어 사용자가 선택할 수 있도록 합니다. 항상primary action에 먼저 포커스되어야 합니다. tabindex는 불필요. 마크업 순서와 정렬 스타일링으로 해결. Reject-Approve Pattern, Confirmation Pattern"
    >
      <mm-flex direction="column" gap="2">
        <mm-button-group aria-label="상품 정보 묶음">
          <mm-button variant="tertiary" size="large">취소</mm-button>
          <mm-button variant="primary" size="large">저장</mm-button>
        </mm-button-group>
        <mm-separator scope="element"></mm-separator>
        <mm-button-group>
          <mm-button variant="ghost" size="large">건너뛰기</mm-button>
          <mm-button variant="secondary" size="large">다음</mm-button>
        </mm-button-group>
        <mm-separator scope="element"></mm-separator>
        <mm-button-group>
          <mm-button variant="tertiary" size="large">이전</mm-button>
          <mm-button variant="secondary" size="large">다음</mm-button>
        </mm-button-group>
        <mm-separator scope="element"></mm-separator>
        <mm-button-group>
          <mm-button variant="primary" size="large" href="#components">지금 가입하기</mm-button>
          <mm-button variant="ghost" size="large">더 알아보기</mm-button>
        </mm-button-group>
      </mm-flex>
    </mm-component-section>

    <mm-component-section
      heading="ShowMoreButton"
      description="Image Button, CheckoutButton. full-width로 사용하지 마세요. 콘텐츠 목록의 너비와의 대비를 통한 강조."
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

    <mm-component-section heading="ViewMoreButton" description="TODO define expandable indicator">
      <mm-button-group>
        <mm-button variant="ghost" icon="nav-arrow-down" icon-position="trailing">
          View More
        </mm-button>
        <mm-button variant="ghost" icon="nav-arrow-up" icon-position="trailing">
          View Less
        </mm-button>
      </mm-button-group>
    </mm-component-section>

    <mm-component-section heading="AddButton" description="새 항목을 추가합니다.">
      <mm-add-button>항목 추가</mm-add-button>
    </mm-component-section>

    <mm-component-section heading="FileUploader" description="이미지 업로드와 파일 업로드 구분">
      <mm-file-uploader
        label="사진 업로드. 여기로 드래그 하셔도 되어요."
        helper="Only .jpg and .png files. 500kb max file size."
        accept=".jpg,.png"
        capture
        multiple
      ></mm-file-uploader>
    </mm-component-section>

    <mm-component-section heading="ToTopButton" description="페이지 최상단으로 스크롤합니다.">
      <mm-to-top-button></mm-to-top-button>
    </mm-component-section>

    <mm-table
      id="chip-naming-table"
      style="margin-top: var(--space-section)"
      caption="Material 3, Material 2, Flutter의 Chip 명칭 비교"
      columns='[
      {"label": "Material 3"},
      {"label": "Material 2"},
      {"label": "Flutter"},
      {"label": "정리"}
    ]'
    ></mm-table>

    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-references .items=${componentReferences}></mm-component-references>
  </main>
`

document.addEventListener('DOMContentLoaded', () => {
  renderDocumentLayout(main)

  const table = document.querySelector<HTMLElementTagNameMap['mm-table']>(
    'mm-table#chip-naming-table',
  )
  if (!table) return

  table.rows = html`
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
})
