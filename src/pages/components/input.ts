import { html } from 'lit'

import type {
  ComponentChangelogItemData,
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentReferenceItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'

import { ICON_NAMES } from '@/components/common'
import { componentPropsOf } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'textarea.html', label: 'Textarea' },
  { href: 'select.html', label: 'Select' },
  { href: 'pattern.html?tab=search', label: 'Search' },
]

const componentChangelog: ComponentChangelogItemData[] = [
  {
    date: '2026-09-17',
    description:
      'field 계열 전체에서 helper를 description으로 변경하고(mm-textfield-helper → mm-textfield-description), 설명 텍스트를 입력 필드 아래로 옮겼습니다.',
  },
]

const componentReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://support.google.com/accounts/answer/32040?visit_id=637702064644854938-965259796&p=pw_dont_reuse&hl=ko&rd=1',
    label: 'Google - Password Tips',
  },
]

const componentProps: ComponentPropItemData[] = [
  ...componentPropsOf('mm-textfield'),
  { name: 'input', type: 'CustomEvent detail: value', kind: 'event' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Interactive - input',
    description:
      '제한된 선택지가 아니라 자유 형식 값을 받고, 입력값의 규칙 위반을 검증해 오류를 표시합니다. 오류 메시지는 영향을 받는 필드와 연결합니다. 사용자 여정에 허들이 될 수 있는 불필요한 정보 입력을 유도하지 마세요 — 모든 텍스트필드는 필수 입력이며, 명확한 이점이 있는 경우에만 "선택입력" 텍스트와 함께 선택 필드를 제안합니다.',
    rules: ['오류는 색과 함께 validation-text로 이유를 알립니다.'],
  },
]

const sizeCode = `<mm-textfield placeholder="Default"></mm-textfield>
<mm-textfield size="small" placeholder="Small"></mm-textfield>`

const labelCode = `<mm-textfield label="이메일" placeholder="name@example.com"></mm-textfield>
<mm-textfield
  label="이메일"
  description="가입 후에는 변경할 수 없어요."
  placeholder="name@example.com"
></mm-textfield>`

const iconCode = `<mm-textfield placeholder="name@example.com">
  <mm-icon slot="leading" name="mail"></mm-icon>
</mm-textfield>
<mm-textfield type="date" placeholder="YYYY. MM. DD.">
  <mm-icon slot="trailing" name="calendar"></mm-icon>
</mm-textfield>`

const optionalCode = `<mm-textfield label="받는 분" placeholder="이름"></mm-textfield>
<mm-textfield label="배송 메시지" placeholder="직접 입력" optional></mm-textfield>`

const stateCode = `<mm-textfield placeholder="Placeholder"></mm-textfield>
<mm-textfield placeholder="Disabled" disabled></mm-textfield>
<mm-textfield
  value="Invalid"
  placeholder="Placeholder..."
  aria-invalid="true"
  validation-text="이미 등록된 이메일입니다."
></mm-textfield>`

const main = html`
  <mm-main>
    <mm-page-header
      heading="Input"
      description="한 줄의 자유 형식 값을 받는 입력 필드입니다. 레이블과 도움말로 입력할 내용을 안내하고 규칙에 어긋나면 필드 곁에 오류를 표시하므로, 사용자는 무엇을 입력해야 하는지 알고 잘못된 부분을 그 자리에서 고칠 수 있습니다."
    ></mm-page-header>

    <mm-component-aka .items=${['TextInput', 'Input']}></mm-component-aka>

    <mm-flex direction="column" gap="4">
      <mm-tab-list value="size" variant="pill">
        <mm-tab value="size">Size</mm-tab>
        <mm-tab value="label">With Label</mm-tab>
        <mm-tab value="icon">With Icon</mm-tab>
        <mm-tab value="optional">Optional</mm-tab>
        <mm-tab value="state">State</mm-tab>
      </mm-tab-list>
      <mm-tab-panel value="size">
        <mm-component-example>
          <mm-flex direction="column" gap="6">
            <mm-flex direction="column" gap="3">
              <mm-textfield placeholder="Default"></mm-textfield>
              <mm-textfield size="small" placeholder="Small"></mm-textfield>
            </mm-flex>
            <mm-paragraph>
              small은 수량 입력처럼 다른 컨트롤 안에 들어가는 필드에 씁니다.
            </mm-paragraph>
          </mm-flex>
        </mm-component-example>
        <mm-component-code .code=${sizeCode}></mm-component-code>
      </mm-tab-panel>
      <mm-tab-panel value="label">
        <mm-component-example>
          <mm-flex direction="column" gap="6">
            <mm-flex direction="column" gap="3">
              <mm-textfield label="이메일" placeholder="name@example.com"></mm-textfield>
              <mm-textfield
                label="이메일"
                description="가입 후에는 변경할 수 없어요."
                placeholder="name@example.com"
              ></mm-textfield>
            </mm-flex>
            <mm-paragraph>label은 입력 항목의 이름이며, 화면에 보이게 둡니다.</mm-paragraph>
          </mm-flex>
        </mm-component-example>
        <mm-component-code .code=${labelCode}></mm-component-code>
      </mm-tab-panel>
      <mm-tab-panel value="icon">
        <mm-component-example>
          <mm-flex direction="column" gap="6">
            <mm-flex direction="column" gap="3">
              <mm-textfield placeholder="name@example.com">
                <mm-icon slot="leading" name=${ICON_NAMES.MAIL}></mm-icon>
              </mm-textfield>
              <mm-textfield type="date" placeholder="YYYY. MM. DD.">
                <mm-icon slot="trailing" name=${ICON_NAMES.DATE}></mm-icon>
              </mm-textfield>
            </mm-flex>
            <mm-paragraph>
              leading 슬롯에는 입력값의 종류를 알리는 아이콘을, trailing 슬롯에는 입력을 돕는
              아이콘이나 단위를 둡니다. leading 아이콘은 레이블 역할을 하므로 label과 함께 쓰지
              않습니다.
            </mm-paragraph>
          </mm-flex>
        </mm-component-example>
        <mm-component-code .code=${iconCode}></mm-component-code>
      </mm-tab-panel>
      <mm-tab-panel value="optional">
        <mm-component-example>
          <mm-flex direction="column" gap="6">
            <mm-flex direction="column" gap="3">
              <mm-textfield label="받는 분" placeholder="이름"></mm-textfield>
              <mm-textfield label="배송 메시지" placeholder="직접 입력" optional></mm-textfield>
            </mm-flex>
            <mm-paragraph>
              텍스트필드는 기본적으로 필수 입력입니다. 입력하면 명확한 이점이 있을 때만 optional로
              선택 입력을 표시합니다.
            </mm-paragraph>
          </mm-flex>
        </mm-component-example>
        <mm-component-code .code=${optionalCode}></mm-component-code>
      </mm-tab-panel>
      <mm-tab-panel value="state">
        <mm-component-example>
          <mm-flex direction="column" gap="6">
            <mm-flex direction="column" gap="3">
              <mm-textfield placeholder="Placeholder"></mm-textfield>
              <mm-textfield placeholder="Disabled" disabled></mm-textfield>
              <mm-textfield
                value="Invalid"
                placeholder="Placeholder..."
                aria-invalid="true"
                validation-text="이미 등록된 이메일입니다."
              ></mm-textfield>
            </mm-flex>
            <mm-paragraph>
              aria-invalid로 오류 상태를 표시하고, validation-text로 이유를 필드 아래에 알립니다.
            </mm-paragraph>
          </mm-flex>
        </mm-component-example>
        <mm-component-code .code=${stateCode}></mm-component-code>
      </mm-tab-panel>
    </mm-flex>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .elements=${['mm-textfield']}></mm-component-tokens>

    <mm-component-guide .features=${componentFeatures}></mm-component-guide>

    <mm-component-anatomy
      style="--component-anatomy-stage-width: var(--layout-width-narrow)"
      .parts=${[
        '레이블 — 입력 항목의 이름을 나타냅니다(label).',
        '입력 필드 — 값을 입력·표시하는 영역. placeholder로 입력 형식을 안내합니다.',
        '접두/접미 요소 — 아이콘·단위·버튼 등 보조 요소(slot: leading / trailing).',
        '설명 텍스트 — 입력 필드 아래에서 입력 형식이나 보조 정보를 안내합니다(description).',
        '검증 텍스트 — 입력 필드 아래에서 오류나 검증 결과를 전달합니다(validation-text).',
      ]}
      .markers=${[
        { placement: 'inline-start', offset: '0.75rem' },
        { placement: 'inline-start', offset: '2.5rem' },
        { placement: 'inline-start', offset: '2.5rem', inset: true },
        { placement: 'inline-start', offset: '4.75rem' },
        { placement: 'inline-start', offset: 'calc(100% - 0.75rem)' },
      ]}
    >
      <mm-textfield
        label="이메일"
        placeholder="name@example.com"
        description="가입 후에는 변경할 수 없어요."
        validation-text="올바른 이메일 형식으로 입력하세요."
        aria-invalid="true"
      >
        <mm-icon slot="leading" name="mail"></mm-icon>
      </mm-textfield>
    </mm-component-anatomy>

    <mm-component-section
      heading="DatePicker"
      description="type='date'는 네이티브 날짜 피커를 씁니다."
    >
      <mm-component-notice slot="notice" heading="달력 선택"></mm-component-notice>
      <mm-textfield type="date" name="date" label="날짜" placeholder="YYYY. MM. DD.">
        <mm-icon slot="trailing" name="calendar"></mm-icon>
      </mm-textfield>
      <mm-separator></mm-separator>
      <mm-textfield name="date-range" label="숙박 기간" placeholder="YYYY. MM. DD. – YYYY. MM. DD.">
        <mm-icon slot="trailing" name="calendar"></mm-icon>
      </mm-textfield>
    </mm-component-section>

    <mm-component-section
      heading="Validation Text"
      description="description은 입력을 돕는 설명을, validation-text는 오류의 이유를 입력 필드 아래에 전달합니다. 테두리 색만으로는 무엇을 고칠지 전달되지 않으므로, 검증 텍스트는 입력 요소의 aria-describedby에 스스로 연결되어 스크린리더가 필드와 함께 읽습니다. 다른 시스템에서는 각각 helper text, error message(MUI는 error prop과 helperText)로 부릅니다."
    >
      <mm-component-notice slot="notice" variant="todo" heading="필드가 검증을 소유하게 한다">
        지금은 쓰는 쪽이 값을 검사해 aria-invalid와 validation-text를 넘기고, 필드는 표시와 연결만
        맡습니다. 필드가 입력 규칙을 스스로 검사하는 범위와 검증 시점(입력 중·포커스를 벗어날
        때·제출할 때)은 정하지 않았습니다.
      </mm-component-notice>
      <mm-flex direction="column" gap="2">
        <mm-textfield-description>가입 후에는 변경할 수 없어요.</mm-textfield-description>
        <mm-textfield-validation>올바른 이메일 형식으로 입력하세요.</mm-textfield-validation>
      </mm-flex>
    </mm-component-section>

    <mm-component-section
      heading="NumberField"
      description="숫자 입력 필드. 수량, 가격, step/count 입력에 사용합니다."
    >
      <mm-flex direction="column" gap="3">
        <mm-numberfield
          label="수량"
          name="quantity"
          value="2"
          min="1"
          max="20"
          step="1"
          description="1개 이상 20개 이하로 입력하세요."
        ></mm-numberfield>

        <mm-numberfield
          label="가격"
          name="price"
          value="30000"
          min="0"
          step="1000"
        ></mm-numberfield>

        <mm-numberfield label="비활성" value="10" disabled></mm-numberfield>
      </mm-flex>
    </mm-component-section>

    <mm-component-section
      heading="PasswordField"
      description="textfield를 확장하여 trailing에 reveal-button을 배치합니다."
    >
      <mm-notice
        slot="notice"
        description="리빌 버튼은 비밀번호 확인 필드가 없는 폼에서만 씁니다. 확인 필드가 있으면 두 번 입력해 오입력을 걸러낼 수 있습니다."
      ></mm-notice>
      <mm-passwordfield
        label="비밀번호"
        placeholder="비밀번호를 입력하세요"
        description="8자 이상, 영문·숫자·특수문자를 포함하세요."
      ></mm-passwordfield>
    </mm-component-section>

    <mm-component-section
      heading="SearchField"
      description="textfield를 확장하며, leading에 검색 인디케이터, trailing에 clear 버튼을 제공합니다."
    >
      <mm-flex direction="column" gap="3">
        <mm-searchfield placeholder="궁금한 인물이나 이슈가 있나요?"></mm-searchfield>
        <mm-searchfield size="small" placeholder="작은 검색 필드"></mm-searchfield>
      </mm-flex>
    </mm-component-section>

    <mm-component-section heading="Newsletter">
      <form>
          <mm-textfield type="email" placeholder="Enter Your Email..">
            <mm-icon slot="leading" name="mail"></mm-icon>
            <mm-button slot="trailing" type="submit" variant="primary" size="medium">
              뉴스레터 구독
            </mm-button>
        </mm-flex>
      </form>
    </mm-component-section>

    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-references .items=${componentReferences}></mm-component-references>

    <mm-component-changelog .items=${componentChangelog}></mm-component-changelog>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
