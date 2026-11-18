import { html, type TemplateResult } from 'lit'

import type { ToggleButtonGroup } from '@/components/common'

import {
  code,
  ComponentFeatureItem,
  type ComponentReferenceItemData,
} from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'
import './home.css'

const platformReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://developer.apple.com/design/human-interface-guidelines/components/layout-and-organization/disclosure-controls',
    label: 'Apple HIG - Disclosure Controls',
  },
  {
    href: 'https://developer.apple.com/documentation/technologies',
    label: 'Apple Developer - Technologies',
  },
  {
    href: 'https://developer.apple.com/kr/design/tips/',
    label: 'Apple - Design Tips',
  },
  {
    href: 'https://developer.android.com/reference',
    label: 'Android - API Reference',
  },
  {
    href: 'https://m3.material.io/foundations/layout/breakpoints/overview',
    label: 'MD3 - Layout Breakpoints',
  },
  {
    href: 'https://m3.material.io/foundations/interaction-states',
    label: 'MD3 - Interaction States',
  },
  {
    href: 'https://m3.material.io/blog/building-with-m3-expressive',
    label: 'MD3 - Building with M3 Expressive',
  },
]

const generalReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://react.dev/learn/preserving-and-resetting-state',
    label: 'React - Preserving and Resetting State',
  },
  { href: 'https://www.digitala11y.com/', label: 'Digital A11Y' },
  {
    href: 'https://www.w3.org/WAI/ARIA/apg/',
    label: 'WAI-ARIA APG',
  },
  {
    href: 'https://en.wikipedia.org/wiki/Universal_design',
    label: 'Wikipedia - Universal Design',
  },
  { href: 'https://html.spec.whatwg.org/', label: 'WHATWG - HTML Spec' },
  {
    href: 'https://www.sitemaps.org/protocol.html',
    label: 'Sitemaps.org - Protocol',
  },
  {
    href: 'https://w3c.github.io/wcag/understanding/target-size-minimum.html',
    label: 'W3C - Target Size Minimum',
  },
  {
    href: 'https://simplicable.com/new/visual-information',
    label: 'Simplicable - Visual Information',
  },
  {
    href: 'https://codelabs.developers.google.com/codelabs/the-lit-path?hl=ko#0',
    label: 'Google Codelabs - The Lit Path',
  },
  {
    href: 'https://developer.mozilla.org/ko/docs/Web/Accessibility/Guides/Understanding_WCAG',
    label: 'MDN - Understanding WCAG',
  },
  {
    href: 'https://www.atlassian.com/ko/work-management/knowledge-sharing/documentation',
    label: 'Atlassian - Documentation',
  },
  {
    href: 'https://getdesign.md/',
    label: 'Get Design MD',
  },
]

const supplementaryReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://www.uber.com/us/en/blog/design-system-at-scale/',
    label: 'Uber - Design System at Scale',
  },
]

const componentReferences: ComponentReferenceItemData[][] = [
  platformReferences,
  generalReferences,
  supplementaryReferences,
]

interface SamplerSection {
  id: string
  label: string
  heading: string
  description: string
}

const samplerSections: SamplerSection[] = [
  {
    id: 'sampler-intent',
    label: 'Intent',
    heading: 'Observe visible sections',
    description:
      'The controller owns IntersectionObserver setup and updates the active section as the panel scrolls.',
  },
  {
    id: 'sampler-root',
    label: 'Root',
    heading: 'Use a local scroll root',
    description:
      'This sampler passes its inner scroll area as the observer root, so the behavior stays contained in the page sample.',
  },
  {
    id: 'sampler-update',
    label: 'Update',
    heading: 'Refresh targets after render',
    description:
      'The page setup reads target elements after the HTML is rendered and lets the controller observe those sections.',
  },
  {
    id: 'sampler-cleanup',
    label: 'Cleanup',
    heading: 'Keep document scroll stable',
    description:
      'Trigger buttons scroll only this inner panel, so clicking Intent, Root, Update, or Cleanup does not move the document.',
  },
]

const samplerOptions = samplerSections.map(({ id, label }) => ({ value: id, label }))

interface Thought {
  heading: string
  body: string
}

const designSystemThoughts: Thought[] = [
  {
    heading: '디자인 시스템도 린하게',
    body: '제품은 린하게 만들면서 디자인 시스템은 왜 그렇지 않은가. 디자인 시스템의 규모보다 중요한 것은 제품의 의사결정을 얼마나 줄여 주는가다. 토큰을 통해 결정의 기준을 한곳에 모으고, 변경하기 쉽게 추상화하자. 모든 플랫폼에 토큰을 일관되게 적용한다는 거대한 목표보다, 필요한 변경을 적은 비용으로 반영할 수 있는 구조가 먼저다. 제품에 필요한 최소한의 기능과 최대한의 효율은 컴포넌트의 수가 아니라, 적절한 추상화에서 나온다.',
  },
  {
    heading: '규칙은 기본값이다',
    body: '우리가 해결하려는 문제는 인터페이스 자체가 아니라, 제품을 만드는 과정에서 반복되는 불필요한 의사결정이다. 세부사항에 대한 논의를 줄이려면 규칙을 명확히 정하고 기본값으로 따라야 한다. 다만 규칙은 목적이 아니라 수단이다. 출시를 앞당기거나 성과를 개선할 수 있다면 예외를 허용하고, 새로운 규칙은 언제든 실험할 수 있다. 기존의 규칙을 바꾸고 싶다면 그 이유와 기대 효과를 설득하는 것이 프로덕트 디자이너의 역할이다.',
  },
  {
    heading: 'Constraint-driven design',
    body: '기술적 제약을 받아들이고, 사용자에게 새로운 학습을 요구하는 인터페이스를 최소화한다. 구조는 변경하기 쉽도록 설계하되, 중복을 없애기 위해 불필요한 추상화를 만들지 않는다. 모든 내용을 문서화하거나 처음부터 완결된 체계를 갖추려 하지 않는다. 대신 실제 제품을 만드는 과정에서 드러나는 문제와 동료의 피드백을 모아 필요한 부분부터 개선한다.',
  },
]

interface SharedStyleModule {
  module: string
  usageCount: number
  description: TemplateResult
}

const sharedStyleModules: SharedStyleModule[] = [
  {
    module: 'list-item.styles',
    usageCount: 8,
    description: html`
      ${code('interactiveRowStyles')}: 눌리는 행의 hover·포커스·선택·비활성 스킨. menu-item 계열과
      사이드바·검색 목록
    `,
  },
  {
    module: 'dot.styles',
    usageCount: 6,
    description: html`
      ${code('dotStyles')}와 크기·tone 단계: 점 모양과 조합 컴포넌트가 고르는 단계
    `,
  },
  {
    module: 'surface.styles',
    usageCount: 7,
    description: html`
      ${code('surfaceBaseStyles')}: faq·banner·radio card·code-block·pager·token-item·color-token
    `,
  },
  {
    module: 'input.styles',
    usageCount: 5,
    description: html`
      ${code('visuallyHiddenInputStyles')}: radio·checkbox가 네이티브 input을 숨기는 조각. 입력 필드
      스타일은 input 계열 안에서만 쓴다
    `,
  },
  {
    module: 'tag.styles',
    usageCount: 5,
    description: html`
      ${code('TagTone')}: tone 이름과 색. dot·chart가 tag와 같은 색을 맞출 때 쓴다
    `,
  },
  {
    module: 'button.styles',
    usageCount: 4,
    description: html`
      ${code('buttonBaseStyles')} · ${code('buttonSelectedStyles')}: 버튼 골격과 눌림 스킨.
      icon-button 스타일이 이 위에 서서 아이콘 버튼 계열까지 퍼진다
    `,
  },
]

const renderSharedStyleCard = ({ module, usageCount, description }: SharedStyleModule) => html`
  <mm-surface>
    <mm-flex direction="column" gap="2" align-items="flex-start">
      <mm-tag>${usageCount}곳에서 사용</mm-tag>
      <mm-text-block level="4" heading=${module}>
        <mm-text size="14">${description}</mm-text>
      </mm-text-block>
    </mm-flex>
  </mm-surface>
`

// 임시 전시: MoreMenu·CommentItem 패턴을 React 컴포넌트로 옮긴 모습
const reactMoreMenuCode = `const MENU_ACTIONS: MoreMenuAction[] = [
  { value: 'edit', label: '수정' },
  { value: 'delete', label: '삭제', tone: 'danger' },
]

function CommentItem({ onEdit, onDelete, ...props }: CommentItemProps) {
  const handleMenuAction = (value: string) => {
    if (value === 'edit') onEdit?.()
    if (value === 'delete') onDelete?.()
  }

  return <MoreMenu aria-label="댓글 메뉴" actions={MENU_ACTIONS} onAction={handleMenuAction} />
}

// 페이지
<CommentItem onEdit={() => alert('수정 clicked')} onDelete={() => alert('삭제 clicked')} />`

const features: ComponentFeatureItem[] = [
  {
    heading: '패턴에서 출발한다',
    description:
      '제품에 필요한 인터페이스 패턴을 먼저 정의한다. 추상적인 기반을 미리 구축하지 않는다.',
  },
  {
    heading: '반복되는 부분을 추출한다',
    description:
      '여러 패턴에서 반복되는 구조와 동작을 재사용 가능한 컴포넌트와 공통 규약으로 만든다.',
  },
  {
    heading: '필요에 따라 확장한다',
    description: '실제 요구가 생기면 토큰, 컴포넌트, 레이아웃을 추가하거나 조정한다.',
  },
]

const main = html`
  <mm-main>
    <!-- TODO hero section -->
    <mm-flex direction="column" gap="section">
      <mm-flex
        gap="8"
        direction="column"
        style="margin: -2rem calc(var(--layout-padding-inline) * -1); padding: 4rem var(--layout-padding-inline); background:var(--background-subtle-color);"
      >
        <mm-heading level="1">
          Our research teams study the inner workings of AI models, stress-test their limits, and
          track their effects in the real world.
        </mm-heading>
        <mm-text-list
          .texts=${['Web Component - Lit', 'Github Actions', 'Pattern-first design']}
        ></mm-text-list>
      </mm-flex>

      <div hidden>
        <mm-surface>
          <mm-text size="24" weight="bold" as="h2">Scroll Spy Sampler</mm-text>
          <div class="scroll-spy-sampler js-scroll-spy-sampler">
            <mm-toggle-button-group
              class="js-scroll-spy-nav"
              aria-label="Scroll spy sampler"
              orientation="vertical"
              stretch
              .options=${samplerOptions}
              value=${samplerOptions[0].value}
            ></mm-toggle-button-group>
            <mm-scroll
              direction="column"
              gap="3"
              class="scroll-spy-sampler-body js-scroll-spy-body"
              tabindex="0"
            >
              ${samplerSections.map(
                section => html`
                  <mm-surface
                    id=${section.id}
                    class="scroll-spy-sampler-section"
                    data-scroll-spy-section
                  >
                    <mm-text-block
                      level="3"
                      heading=${section.heading}
                      description=${section.description}
                    ></mm-text-block>
                  </mm-surface>
                `,
              )}
            </mm-scroll>
          </div>
        </mm-surface>
      </div>

      <div>
        <p>패턴 우선 (Pattern-first)</p>
        <p>제품에서 필요한 패턴 - 반복되는 구조와 동작 추출 - 컴포넌트 · 토큰 · 레이아웃 정의</p>

        <p>목표: 명확한 인터페이스 · 빠른 출시</p>

        <p>설계 원칙: - 표준과 관습을 준수한다. - 제품 전반의 일관성을 유지한다.</p>

        <p>실현 방식</p>
        <mm-text-list
          .texts=${[
            '패턴에서 출발해 필요한 기반을 정의한다. 제품에 필요한 인터페이스 패턴을 먼저 정의한다. 추상적인 기반을 미리 구축하지 않는다.',
            '적게 디자인하고 불필요한 선택지를 만들지 않는다.',
            '익숙한 인터페이스와 웹 표준을 활용한다.',
            '디자인 규약을 엄격하게 적용한다.',
          ]}
        ></mm-text-list>
      </div>

      <!-- <mm-component-feature-list .features=${features}></mm-component-feature-list> -->

      <mm-paragraph-group>
        ${designSystemThoughts.map(
          ({ heading, body }) => html`
                <mm-text-block level="3" heading=${heading} description=${body}></mm-text-block>
                </mm-text-block>
              `,
        )}
      </mm-paragraph-group>

      <mm-content-section-list>
        <mm-content-section heading="Meta Guidelines">
          <mm-paragraph>모든 것을 문서화하지 않는다.</mm-paragraph>
          <mm-text-list
            variant="check"
            .texts=${[
              '문서화할 가치가 있다고 판단하려면 특정 횟수(예: 3회)만큼 발생해야 합니까?',
              '자주(예: 월 1회 이상) 프로세스를 수행해야 합니까?',
            ]}
          ></mm-text-list>
          <mm-content-section heading-level="4" heading="컴포넌트 페이지의 헤더 디스크립션">
            <mm-text-list
              variant="check"
              .texts=${[
                '컴포넌트 페이지 설명은 무엇인지, 어떻게 동작하는지, 사용자에게 어떤 이득인지 순서로 쓴다.',
              ]}
            ></mm-text-list>
          </mm-content-section>
          <!-- <mm-content-section heading-level="4" heading="Prop 표">
            <mm-text-list
              variant="check"
              .texts=${[
            '컴포넌트 페이지의 prop 표는 손으로 적지 않는다. 스크립트가 컴포넌트 코드의 @property 선언을 읽어 표를 만든다(npm run manifest). 이름·타입·기본값이 코드 한 곳에서 나오므로 문서가 구현과 어긋나지 않는다.',
            '이벤트·slot·메서드는 선언에서 읽을 수 없어 페이지에 손으로 덧붙인다.',
            '부모가 대신 채우는 prop은 선언에 @internal을 달아 표에서 뺀다. 예: mm-step이 번호를 매기는 mm-step-item의 value',
            '만든 결과(src/generated)는 커밋하지 않는다. 설치·개발 서버·빌드 때마다 새로 만든다.',
          ]}
            ></mm-text-list>
          </mm-content-section> -->
        </mm-content-section>

        <mm-content-section heading="Code Conventions">
          <mm-paragraph>
            ESLint나 Prettier가 처리하는 들여쓰기, 세미콜론 같은 규칙은 도구에 맡기고,
          </mm-paragraph>

          <mm-heading level="4">공통 코딩 스타일</mm-heading>
          <mm-text-list
            .texts=${[
              '이벤트 핸들러 함수는 `handle` 접두사를 사용한다. (예: `handleClick`, `handleSubmit`)',
              '컴포넌트의 이벤트 콜백 props는 `on` 접두사를 사용한다. (예: `onClick`, `onSubmit`)',
            ]}
          ></mm-text-list>

          <mm-heading level="4">Lit 코딩 스타일</mm-heading>
          <mm-text-list
            .texts=${[
              "host의 role이 고정값이면 connectedCallback에서 setAttribute('role', ...)로 지정하고, 외부에서 변경할 수 있어야 할 때만 role prop으로 공개한다.",
              '조건부 DOM 조각의 렌더링 로직이 복잡해지면 render*() 메서드로 분리하고, render()에서는 해당 메서드를 직접 호출해 전체 구조를 드러낸다.',
              'render() 내부의 렌더링 조건이 복잡해지면 render*() 메서드로 분리하고, 메서드 이름은 UI 조각의 의미를 드러낸다. 예: renderContent() 대신 renderImage()',
            ]}
          ></mm-text-list>
          <mm-separator></mm-separator>
          <mm-text-list
            .texts=${[
              '여러 컴포넌트에서 공유하는 동작 로직은 훅이나 컨트롤러로 분리하고, 시각적 표현은 공유 스타일과 템플릿을 조합해 구성한다. 이를 통해 컴포넌트별 표현은 유지하면서 공통 동작을 일관되게 재사용한다.',
            ]}
          ></mm-text-list>

          <mm-text weight="bold">언제 분리할까요?</mm-text>
          <mm-paragraph>
            동일한 동작 로직이 두 곳 이상에서 사용될 때 훅이나 컨트롤러로 분리한다. 시각적 표현은
            공유 스타일과 템플릿으로 재사용하고, 각 컴포넌트는 고유한 표현을 유지한다.
          </mm-paragraph>

          <mm-separator></mm-separator>
          <!-- 파생 컴포넌트, 조합/합성 -->
          <mm-paragraph>
            파생 컴포넌트는 기반 컴포넌트의 역할에 따라 재사용 방식을 선택한다. 단순한 시각 요소는
            기반 컴포넌트를 직접 렌더링하고, 상호작용이나 접근성 의미가 있는 컴포넌트는 공유
            스타일과 템플릿만 재사용한다.
          </mm-paragraph>
          <mm-text-list
            .texts=${[
              'mm-current-indicator는 mm-dot을 렌더링한다.',
              'mm-dismiss-button은 iconButtonStyles와 renderIconButton을 조합한다.',
            ]}
          ></mm-text-list>
          <mm-content-section heading-level="2" heading="Shared Style Modules">
            <mm-grid columns="3" gap="4">${sharedStyleModules.map(renderSharedStyleCard)}</mm-grid>
          </mm-content-section>
        </mm-content-section>
      </mm-content-section-list>

      <!-- <mm-content-section heading="React로 옮긴 MoreMenu 패턴">
        <mm-code-block language="typescript" .code=${reactMoreMenuCode}></mm-code-block>
      </mm-content-section>

      <mm-content-section heading="Event Notes">
        <mm-text-list
          .texts=${[
        '버블링은 이벤트가 낸 요소에서 끝나지 않고 부모, 그 부모, document까지 차례로 올라가는 것이다. 그래서 조상 어디에 리스너를 달아도 받을 수 있다.',
        'toggle은 "이 요소가 열렸다/닫혔다"는 자기 상태 알림이라 버블링하지 않는다. 네이티브 details·popover의 toggle도 버블링하지 않는다.',
        '같은 이름의 이벤트가 버블링하면 섞인다. 시트 안에 select를 두고 시트에 toggle 리스너를 달면, select 목록이 닫힐 때의 toggle이 시트까지 올라와 시트가 닫힌 것처럼 처리된다.',
        'change·input은 네이티브처럼 버블링한다. 폼이나 그룹이 자식의 값 변경을 위에서 받아야 하기 때문이다. 기준은 같은 이름의 네이티브 이벤트와 같은 전파 방식이다.',
        '받는 쪽에서 e.target === e.currentTarget로 거르는 건 보조책이다. 모든 소비처가 챙겨야 하고, shadow DOM 경계를 넘으면 target이 호스트로 바뀌어(retarget) 걸러지지 않는 경우가 있다. 전파 범위는 이벤트를 내는 컴포넌트가 정한다.',
        '"닫아 달라"는 요청과 "닫혔다"는 알림을 이벤트 하나로 겸하지 않는다. 시트 헤더의 닫기 버튼은 시트의 close()를 직접 부르고, 시트는 닫힌 뒤 toggle로 알린다.',
      ]}
        ></mm-text-list>
      </mm-content-section> -->

      <!-- <mm-content-section heading="Accessibility Notes">
        <mm-text-list
          .texts=${[
        'role="menu" 안에는 menuitem, menuitemcheckbox, menuitemradio와 이를 묶는 group, separator만 둘 수 있다.',
        'menuitemradio는 menu·menubar(또는 그 안의 group) 안에서만 유효하다. menu가 아닌 곳(disclosure 패널 등)의 선택지는 radiogroup > radio로 둔다.',
        '항목의 role은 겉모습이 아니라 놓인 부모로 정한다. 같은 모양의 행도 menu 안이면 menuitemradio, 밖이면 radio다.',
        'menu는 선택 즉시 닫혀야 하는 개념이 아니다. APG 기준 Enter는 실행 후 닫고, Space는 menuitemcheckbox·menuitemradio의 상태만 바꾸고 연 채로 둔다.',
        'disclosure는 aria-expanded로 영역을 여닫는 패턴일 뿐 위치를 정하지 않는다. 트리거에 앵커되어 뜨면 popover, 화면을 덮으면 sheet로 표면을 따로 고른다.',
        'role="list" 안에는 listitem만 둘 수 있다. 그래서 목록 그룹 안에 제목을 넣으면 제목 요소로 읽히게 둘 수 없고, 화면에만 그린 뒤 같은 문구를 aria-label로 옮겨야 한다.',
        '제목 달린 목록은 목록 그룹(mm-list-item-group)이 제목을 받지 않고, 쓰는 쪽이 mm-heading에 id를 주고 그룹에 aria-labelledby로 연결한다. 그룹이 제목을 받아 aria-label로 옮기면 그룹이 목록의 접근성 이름까지 정하게 되어 책임이 커지고, 쓰는 쪽이 준 aria-label과 충돌하며, heading prop이 aria-label의 별칭이 된다. 제목도 heading 요소가 아니게 되어 제목 단위로 건너뛰는 탐색을 잃는다.',
      ]}
        ></mm-text-list>
      </mm-content-section> -->

      <mm-component-references .items=${componentReferences}></mm-component-references>
    </mm-flex>
  </mm-main>
`

renderPage(main, {
  footer: true,
  initialize: () => {
    setupScrollSpySampler()
  },
})

function setupScrollSpySampler() {
  const sampler = document.querySelector<HTMLElement>('.js-scroll-spy-sampler')
  if (!sampler) return

  const scrollRoot = sampler.querySelector<HTMLElement>('.js-scroll-spy-body')
  const nav = sampler.querySelector<ToggleButtonGroup>('.js-scroll-spy-nav')
  const targets = Array.from(sampler.querySelectorAll<HTMLElement>('[data-scroll-spy-section]'))

  if (!scrollRoot || !nav || !targets.length) return

  const observer = new IntersectionObserver(
    entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visible.length) nav.value = visible[0].target.id
    },
    { root: scrollRoot, rootMargin: '0px 0px -55% 0px' },
  )
  targets.forEach(target => observer.observe(target))

  nav.addEventListener('change', event => {
    const target = document.getElementById((event as CustomEvent<{ value: string }>).detail.value)
    if (!target) return

    const top =
      target.getBoundingClientRect().top -
      scrollRoot.getBoundingClientRect().top +
      scrollRoot.scrollTop
    scrollRoot.scrollTo({ top, behavior: 'smooth' })
  })
}
