import { html } from 'lit'

import type {
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

const componentReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://support.google.com/accounts/answer/32040?visit_id=637702064644854938-965259796&p=pw_dont_reuse&hl=ko&rd=1',
    label: 'Google - Password Tips',
  },
]

const componentProps: ComponentPropItemData[] = [
  ...componentPropsOf('fff-textfield'),
  { name: 'input', type: 'CustomEvent detail: value', kind: 'event' },
  { name: 'validation-change', type: 'CustomEvent detail: valid', kind: 'event' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Interactive - input',
    description:
      '제한된 선택지가 아니라 자유 형식 값을 받고, 입력값의 규칙 위반을 검증해 오류를 표시합니다. 오류 메시지는 영향을 받는 필드와 연결합니다. 사용자 여정에 허들이 될 수 있는 불필요한 정보 입력을 유도하지 마세요 — 모든 텍스트필드는 필수 입력이며, 명확한 이점이 있는 경우에만 "선택입력" 텍스트와 함께 선택 필드를 제안합니다.',
  },
]

const sizeCode = `<fff-textfield placeholder="Default"></fff-textfield>
<fff-textfield size="small" placeholder="Small"></fff-textfield>`

const labelCode = `<fff-textfield label="이메일" placeholder="name@example.com"></fff-textfield>
<fff-textfield label="이메일" description="가입 후에는 변경할 수 없어요." placeholder="name@example.com"></fff-textfield>`

const iconCode = `<fff-textfield placeholder="name@example.com">
  <fff-icon slot="leading" name="mail"></fff-icon>
</fff-textfield>
<fff-textfield type="date" placeholder="YYYY. MM. DD.">
  <fff-icon slot="trailing" name="calendar"></fff-icon>
</fff-textfield>`

const optionalCode = `<fff-textfield label="받는 분" placeholder="이름"></fff-textfield>
<fff-textfield label="배송 메시지" placeholder="직접 입력" optional></fff-textfield>`

const stateCode = `<fff-textfield placeholder="Placeholder"></fff-textfield>
<fff-textfield placeholder="Disabled" disabled></fff-textfield>
<fff-textfield value="Invalid" placeholder="Placeholder..." aria-invalid="true" validation-text="이미 등록된 이메일입니다."></fff-textfield>`

const main = html`
  <fff-main>
    <fff-page-header
      heading="Input"
      description="한 줄의 자유 형식 값을 받는 입력 필드입니다. 레이블과 도움말로 입력할 내용을 안내하고 규칙에 어긋나면 필드 곁에 오류를 표시하므로, 사용자는 무엇을 입력해야 하는지 알고 잘못된 부분을 그 자리에서 고칠 수 있습니다."
    ></fff-page-header>

    <fff-component-aka .items=${['TextInput', 'Input']}></fff-component-aka>

    <fff-flex direction="column" gap="4">
      <fff-tab-list
        value="size"
        variant="pill"
        .tabs=${[
          { value: 'size', label: 'Size' },
          { value: 'label', label: 'With Label' },
          { value: 'icon', label: 'With Icon' },
          { value: 'optional', label: 'Optional' },
          { value: 'state', label: 'State' },
        ]}
      ></fff-tab-list>
      <fff-tab-panel value="size">
        <fff-component-example>
          <fff-flex direction="column" gap="3">
            <fff-textfield placeholder="Default"></fff-textfield>
            <fff-textfield size="small" placeholder="Small"></fff-textfield>
          </fff-flex>
        </fff-component-example>
        <fff-component-code .code=${sizeCode}></fff-component-code>
      </fff-tab-panel>
      <fff-tab-panel value="label">
        <fff-component-example>
          <fff-flex direction="column" gap="3">
            <fff-textfield label="이메일" placeholder="name@example.com"></fff-textfield>
            <fff-textfield
              label="이메일"
              description="가입 후에는 변경할 수 없어요."
              placeholder="name@example.com"
            ></fff-textfield>
          </fff-flex>
        </fff-component-example>
        <fff-component-code .code=${labelCode}></fff-component-code>
      </fff-tab-panel>
      <fff-tab-panel value="icon">
        <fff-component-example>
          <fff-flex direction="column" gap="6">
            <fff-flex direction="column" gap="3">
              <fff-textfield placeholder="name@example.com">
                <fff-icon slot="leading" name=${ICON_NAMES.MAIL}></fff-icon>
              </fff-textfield>
              <fff-textfield type="date" placeholder="YYYY. MM. DD.">
                <fff-icon slot="trailing" name=${ICON_NAMES.DATE}></fff-icon>
              </fff-textfield>
            </fff-flex>
            <fff-paragraph>
              입력값의 종류를 알리는 아이콘은 앞쪽에, 입력을 돕는 아이콘이나 단위는 뒤쪽에 둡니다.
              앞쪽 아이콘이 레이블 역할을 하면 label은 함께 쓰지 않습니다.
            </fff-paragraph>
          </fff-flex>
        </fff-component-example>
        <fff-component-code .code=${iconCode}></fff-component-code>
      </fff-tab-panel>
      <fff-tab-panel value="optional">
        <fff-component-example>
          <fff-flex direction="column" gap="6">
            <fff-flex direction="column" gap="3">
              <fff-textfield label="받는 분" placeholder="이름"></fff-textfield>
              <fff-textfield label="배송 메시지" placeholder="직접 입력" optional></fff-textfield>
            </fff-flex>
            <fff-paragraph>텍스트필드는 기본적으로 필수 입력입니다.</fff-paragraph>
          </fff-flex>
        </fff-component-example>
        <fff-component-code .code=${optionalCode}></fff-component-code>
      </fff-tab-panel>
      <fff-tab-panel value="state">
        <fff-component-example>
          <fff-flex direction="column" gap="3">
            <fff-textfield placeholder="Placeholder"></fff-textfield>
            <fff-textfield placeholder="Disabled" disabled></fff-textfield>
            <fff-textfield
              value="Invalid"
              placeholder="Placeholder..."
              aria-invalid="true"
              validation-text="이미 등록된 이메일입니다."
            ></fff-textfield>
          </fff-flex>
        </fff-component-example>
        <fff-component-code .code=${stateCode}></fff-component-code>
      </fff-tab-panel>
    </fff-flex>

    <fff-component-props .props=${componentProps}></fff-component-props>

    <fff-component-tokens .elements=${['fff-textfield']}></fff-component-tokens>

    <fff-component-feature-list .features=${componentFeatures}></fff-component-feature-list>

    <fff-component-section heading="DatePicker">
      <fff-textfield type="date" name="date" label="날짜" placeholder="YYYY. MM. DD.">
        <fff-icon slot="trailing" name="calendar"></fff-icon>
      </fff-textfield>
    </fff-component-section>

    <fff-component-section
      heading="Validation Text"
      description="입력을 돕는 설명과 오류의 이유를 입력 필드 아래에 전달합니다. 테두리 색만으로는 무엇을 고칠지 알 수 없으므로, 검증 텍스트는 스크린리더도 필드와 함께 읽습니다. 다른 시스템에서는 각각 helper text, error message(MUI는 error prop과 helperText)로 부릅니다."
    >
      <fff-textfield
        label="닉네임"
        required
        minlength="2"
        description="2자 이상 입력하세요."
      ></fff-textfield>
      <fff-flex direction="column" gap="2">
        <fff-textfield-validation>올바른 이메일 형식으로 입력하세요.</fff-textfield-validation>
      </fff-flex>
    </fff-component-section>

    <fff-component-section
      heading="QuantityField"
      description="수량 입력 필드. step/count 입력에 사용합니다."
    >
      <fff-flex direction="column" gap="3">
        <fff-quantity-field
          label="수량"
          name="quantity"
          value="2"
          min="1"
          max="20"
          step="1"
          description="1개 이상 20개 이하로 입력하세요."
        ></fff-quantity-field>

        <fff-quantity-field label="비활성" value="10" disabled></fff-quantity-field>
      </fff-flex>
    </fff-component-section>

    <fff-component-section
      heading="PasswordField"
      description="비밀번호 입력 필드"
      .checks=${[
        '확인 필드가 있으면 두 번 입력해 오입력을 걸러낼 수 있습습니다. 리빌 버튼은 비밀번호 확인 필드가 없는 폼에서만 씁니다.',
      ]}
    >
      <fff-passwordfield
        label="비밀번호"
        placeholder="비밀번호를 입력하세요"
        description="8자 이상, 영문·숫자·특수문자를 포함하세요."
      ></fff-passwordfield>
    </fff-component-section>

    <fff-component-section heading="SearchField">
      <fff-flex direction="column" gap="3">
        <fff-searchfield placeholder="궁금한 인물이나 이슈가 있나요?"></fff-searchfield>
        <fff-searchfield size="small" placeholder="작은 검색 필드"></fff-searchfield>
      </fff-flex>
    </fff-component-section>

    <fff-component-section heading="NewsletterField">
      <form>
        <fff-textfield type="email" placeholder="Enter Your Email..">
          <fff-icon slot="leading" name="mail"></fff-icon>
          <fff-button slot="trailing" type="submit" variant="primary" size="medium">
            뉴스레터 구독
          </fff-button>
        </fff-textfield>
      </form>
    </fff-component-section>

    <fff-component-related .items=${relatedComponents}></fff-component-related>

    <fff-component-references .items=${componentReferences}></fff-component-references>

    <fff-component-pager></fff-component-pager>
  </fff-main>
`

renderPage(main)
