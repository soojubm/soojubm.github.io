import { html } from 'lit'

import type {
  ComponentChangelogItemData,
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentReferenceItemData,
  ComponentRelatedItemData,
  ComponentTokenItemData,
} from '@/components/domains/component'

import { ICON_NAMES, INPUT_TYPE_UNION } from '@/components/common'
import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'textarea.html', label: 'Textarea' },
  { href: 'select.html', label: 'Select' },
  { href: 'search.html', label: 'Search' },
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
    external: true,
  },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'type', type: `${INPUT_TYPE_UNION} = 'text'` },
  { name: 'value', type: 'string', optional: true },
  { name: 'name', type: 'string', optional: true },
  { name: 'placeholder', type: 'string', optional: true },
  { name: 'label', type: 'string', optional: true },
  { name: 'description', type: 'string', optional: true },
  { name: 'validation-text', type: 'string', optional: true },
  { name: 'size', type: "'small'", optional: true },
  { name: 'optional', type: 'boolean', optional: true },
  { name: 'hidden-label', type: 'boolean', optional: true },
  { name: 'disabled', type: 'boolean', optional: true },
  { name: 'aria-invalid', type: "'true' | 'false'", optional: true },
  { name: 'input', type: 'CustomEvent detail: value', kind: 'event' },
]

const componentTokens: ComponentTokenItemData[] = [
  { name: 'input-height' },
  { name: 'input-padding-block' },
  { name: 'input-padding-inline' },
  { name: 'input-background-color' },
  { name: 'input-border' },
  { name: 'input-border-radius' },
  { name: 'input-focus-outline' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Interactive - input',
    description:
      '제한된 선택지가 아니라 자유 형식 값을 받고, 입력값의 규칙 위반을 검증해 오류를 표시합니다. 오류 메시지는 영향을 받는 필드와 연결합니다. 사용자 여정에 허들이 될 수 있는 불필요한 정보 입력을 유도하지 마세요 — 모든 텍스트필드는 필수 입력이며, 명확한 이점이 있는 경우에만 "선택입력" 텍스트와 함께 선택 필드를 제안합니다.',
  },
]

const main = html`
  <mm-main>
    <mm-flex justify-content="between" align-items="start" gap="3">
      <mm-page-header
        heading="Input"
        description="한 줄의 자유 형식 값을 받는 입력 필드입니다. 레이블과 도움말로 입력할 내용을 안내하고 규칙에 어긋나면 필드 곁에 오류를 표시하므로, 사용자는 무엇을 입력해야 하는지 알고 잘못된 부분을 그 자리에서 고칠 수 있습니다."
      ></mm-page-header>
      <mm-copy-page-button></mm-copy-page-button>
    </mm-flex>

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
      </mm-tab-panel>
    </mm-flex>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .tokens=${componentTokens}></mm-component-tokens>

    <mm-component-guide .features=${componentFeatures}></mm-component-guide>

    <mm-component-anatomy
      .parts=${[
        '레이블 — 입력 항목의 이름을 나타냅니다(label).',
        '입력 필드 — 값을 입력·표시하는 영역. placeholder로 입력 형식을 안내합니다.',
        '접두/접미 요소 — 아이콘·단위·버튼 등 보조 요소(slot: leading / trailing).',
        '설명 텍스트 — 입력 필드 아래에서 입력 형식이나 보조 정보를 안내합니다(description).',
        '검증 텍스트 — 입력 필드 아래에서 오류나 검증 결과를 전달합니다(validation-text).',
      ]}
      .code=${`<mm-textfield
    label="이메일"
    placeholder="name@example.com"
    description="가입 후에는 변경할 수 없어요."
    validation-text="올바른 이메일 형식으로 입력하세요."
>
    <mm-icon slot="leading" name="mail"></mm-icon>
</mm-textfield>`}
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
        style="width: 280px"
      >
        <mm-icon slot="leading" name="mail"></mm-icon>
      </mm-textfield>
    </mm-component-anatomy>

    <mm-component-section
      heading="Date"
      description="type='date'는 네이티브 날짜 피커를 씁니다. 기간처럼 짝을 이루는 필드는 나란히 두고 각각 레이블을 답니다."
    >
      <mm-flex>
        <mm-textfield type="date" name="date-start" label="체크인" placeholder="YYYY. MM. DD.">
          <mm-icon slot="trailing" name="calendar"></mm-icon>
        </mm-textfield>
        <mm-textfield type="date" name="date-end" label="체크아웃" placeholder="YYYY. MM. DD.">
          <mm-icon slot="trailing" name="calendar"></mm-icon>
        </mm-textfield>
      </mm-flex>
    </mm-component-section>

    <mm-component-section
      heading="단위가 이어지는 필드"
      description="치수처럼 한 값을 여러 필드로 나눠 받을 때는 필드 사이에 연산 기호를 두어 관계를 드러냅니다."
    >
      <mm-flex align-items="flex-end">
        <mm-textfield label="Length" placeholder="cm unit"></mm-textfield>
        <mm-icon name=${ICON_NAMES.CLOSE}></mm-icon>
        <mm-textfield label="Width" placeholder="x means"></mm-textfield>
        <mm-icon name=${ICON_NAMES.CLOSE}></mm-icon>
        <mm-textfield label="Height" placeholder="cm"></mm-textfield>
      </mm-flex>
    </mm-component-section>

    <mm-component-section
      heading="Description & Validation Text"
      description="description은 입력을 돕는 설명을, validation-text는 오류의 이유를 입력 필드 아래에 전달합니다. 다른 시스템에서는 각각 helper text, error message(MUI는 error prop과 helperText)로 부릅니다."
    >
      <mm-flex direction="column" gap="2">
        <mm-textfield-description>가입 후에는 변경할 수 없어요.</mm-textfield-description>
        <mm-textfield-validation>올바른 이메일 형식으로 입력하세요.</mm-textfield-validation>
      </mm-flex>
    </mm-component-section>

    <mm-component-section
      heading="NumberInput"
      description="숫자 입력 필드. 수량, 가격, step/count 입력에 사용합니다."
    >
      <mm-flex direction="column" gap="3">
        <mm-number-input
          label="수량"
          name="quantity"
          value="2"
          min="1"
          max="20"
          step="1"
          description="1개 이상 20개 이하로 입력하세요."
        ></mm-number-input>

        <mm-number-input
          label="가격"
          name="price"
          value="30000"
          min="0"
          step="1000"
        ></mm-number-input>

        <mm-number-input label="비활성" value="10" disabled></mm-number-input>
      </mm-flex>
    </mm-component-section>

    <mm-component-section
      heading="PasswordField"
      description="searchfield처럼 textfield를 확장하며, trailing에 reveal-button을 두어 입력값 노출을 토글합니다. 회원가입 프로세스에서 비밀번호 확인 필드가 존재하는 경우에는
          제공할 필요가 없다. 비밀번호 확인 필드를 제공하지 않는 것은 국내 서비스에는 익숙하지 않은
          경험. 비밀번호 입력 필드가 1개만 존재하는 경우 리빌 버튼을 제공할 수 있다"
    >
      <mm-flex direction="column" gap="3">
        <mm-passwordfield
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          description="8자 이상, 영문·숫자·특수문자를 포함하세요."
        ></mm-passwordfield>
        <mm-passwordfield label="비밀번호 확인" placeholder="6자리 이상"></mm-passwordfield>
      </mm-flex>
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

    <mm-component-section
      heading="FormField"
      description="textfield가 아닌 컨트롤에 레이블·헬퍼·검증 텍스트를 같은 규칙으로 붙이는 래퍼입니다. 컨트롤은 slot으로 받고, 필드는 레이블이 붙은 role=group이 됩니다."
    >
      <mm-flex direction="column" gap="3">
        <mm-form-field label="성별">
          <mm-gender-selector stretch></mm-gender-selector>
        </mm-form-field>
        <mm-form-field label="관심 주제" optional description="여러 개를 선택할 수 있습니다.">
          <mm-checkbox-group
            name="topics"
            .options=${[
              { value: 'tech', label: '기술' },
              { value: 'design', label: '디자인' },
              { value: 'biz', label: '비즈니스' },
            ]}
          ></mm-checkbox-group>
        </mm-form-field>
        <mm-form-field label="국가" description="배송 가능한 국가만 표시됩니다.">
          <mm-select
            .options=${[
              { value: 'kr', label: '대한민국' },
              { value: 'jp', label: '일본' },
              { value: 'us', label: '미국' },
            ]}
          ></mm-select>
        </mm-form-field>
      </mm-flex>
    </mm-component-section>

    <mm-component-section heading="Newsletter">
      <form>
        <mm-flex direction="column" gap="4">
          <mm-text-block
            level="3"
            heading="Newsletter subscribe"
            description="섭스크라이브 유아이 콤포넌트 입니다. 두 줄 단락을 위해 쓰고 있습니다."
          ></mm-text-block>
          <mm-textfield type="email" placeholder="Enter Your Email..">
            <mm-icon slot="leading" name="mail"></mm-icon>
            <mm-button slot="trailing" type="submit" variant="primary" size="medium">
              뉴스레터 구독
            </mm-button>
          </mm-textfield>
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
