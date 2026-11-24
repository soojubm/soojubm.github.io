import { html } from 'lit'

import type { ToggleButtonGroup } from '@/components/common'

import {
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
  caption: string
  heading: string
  body: string
  points: string[]
}

const designSystemThoughts: Thought[] = [
  {
    caption: '실현 방식 1',
    heading: 'Lean',
    body: '제품은 린하게 만들면서 디자인 시스템은 왜 완결된 체계를 추구하는가. 디자인 시스템의 목적은 체계를 구축하는 것이 아니라 제품 개발을 더 효율적으로 만드는 것이다.',
    points: [
      '필요한 만큼만 추상화한다. 중복을 없애려고 불필요한 추상화를 만들지 않는다.',
      '모든 플랫폼에 일관되게 적용한다는 큰 목표보다, 필요한 변경을 적은 비용으로 반영할 수 있는 구조를 먼저 갖춘다.',
      '실제 제품을 만드는 과정에서 드러나는 문제와 동료의 피드백을 모아 필요한 부분부터 개선한다.',
    ],
  },
  {
    caption: '실현 방식 2',
    heading: 'Rule',
    body: '우리가 해결하려는 문제는 인터페이스 자체가 아니라, 제품을 만드는 과정에서 반복되는 불필요한 의사결정이다.',
    points: [
      '세부사항에 대한 논의를 줄이려면 규칙을 명확히 정하고 기본값으로 따라야 한다.',
      '규칙은 목적이 아니라 수단이다. 출시를 앞당기거나 제품 성과를 개선할 수 있다면 예외를 허용한다.',
      '규칙을 변경하려면 기존 규칙의 문제와 변경에 따른 기대 효과를 설명해야 한다. 프로덕트 디자이너는 규칙의 필요성을 제안하고, 그 효과를 검증할 책임이 있다.',
    ],
  },
]

// 핵심 이름은 제목으로, 분류명은 그 위의 캡션으로 둔다. 괄호·대시로 잇지 않는다.
const renderCardHeading = (caption: string, heading: string) => html`
  <mm-flex direction="column" gap="1">
    <mm-caption>${caption}</mm-caption>
    <mm-heading level="3">${heading}</mm-heading>
  </mm-flex>
`

// 임시 전시: MoreMenu·CommentItem 패턴을 React 컴포넌트로 옮긴 모습
const reactMoreMenuCode = `const MENU_ACTIONS: MoreMenuAction[] = [
  { value: 'edit', label: '수정' },
  { value: 'delete', label: '삭제', destructive: true },
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

// 쉼표 뒤에서 행갈이한다. 제목의 \n은 text-block이 줄바꿈으로 그린다.
const heroHeading = 'Fewer decisions,\nfaster releases.'

const main = html`
  <mm-main>
    <mm-flex direction="column" gap="section">
      <mm-hero-section heading=${heroHeading}>
        <mm-text-list
          .texts=${[
            'Web Component - Lit',
            'TypeScript',
            'Webpack',
            'ESLint · Stylelint · Prettier',
            'Pagefind',
            'Github Actions',
          ]}
        ></mm-text-list>
      </mm-hero-section>

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

      <mm-flex direction="column" gap="4">
        <mm-grid columns="2" gap="4">
          <mm-surface variant="outlined" radius="large">
            <mm-flex direction="column" gap="2">
              <mm-caption>목표</mm-caption>
              <mm-flex direction="column" gap="4">
                <mm-text-block
                  level="3"
                  heading="Fast release"
                  description="제품을 완성하고 사용자에게 전달하는 시간 단축"
                ></mm-text-block>
                <mm-text-block
                  level="3"
                  heading="Fast experiment"
                  description="가설을 검증하고 제품을 개선하는 주기 단축"
                ></mm-text-block>
              </mm-flex>
            </mm-flex>
          </mm-surface>
          <mm-surface variant="filled" radius="large">
            <mm-flex direction="column" gap="2">
              ${renderCardHeading('접근 방식', 'Pattern-first')}
              <mm-paragraph>
                제품에서 필요한 패턴 → 반복되는 구조와 동작 추출 → 컴포넌트 · 토큰 · 레이아웃 정의
              </mm-paragraph>
            </mm-flex>
          </mm-surface>
        </mm-grid>

        <mm-surface variant="outlined" radius="large">
          <mm-flex direction="column" gap="2">
            ${renderCardHeading('설계 원칙', 'Constraint-driven design')}
            <mm-paragraph>제약을 설계의 출발점으로 삼는다.</mm-paragraph>
            <mm-text-list
              .texts=${[
                '표준과 관습을 활용한다. 검증된 웹 표준과 기존 인터페이스 관습을 우선하고, 사용자에게 새로운 학습을 요구하는 패턴을 최소화한다.',
                '기술적 제약을 받아들인다. 모든 환경에서 이상적인 구조를 추구하기보다 주어진 기술 환경에서 효율적인 해결책을 찾는다.',
                '필요한 만큼 설계한다. 완결된 체계를 먼저 만드는 대신 실제 제품에 필요한 구조와 기능부터 정의한다.',
              ]}
            ></mm-text-list>
          </mm-flex>
        </mm-surface>

        <mm-grid columns="2" gap="4">
          ${designSystemThoughts.map(
            ({ caption, heading, body, points }) => html`
              <mm-surface variant="outlined" radius="large">
                <mm-flex direction="column" gap="2">
                  ${renderCardHeading(caption, heading)}
                  <mm-paragraph>${body}</mm-paragraph>
                  <mm-text-list .texts=${points}></mm-text-list>
                </mm-flex>
              </mm-surface>
            `,
          )}
        </mm-grid>
      </mm-flex>

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
        '받는 쪽에서 e.target === e.currentTarget로 거르는 건 보조책이다. 사용하는 쪽이 모두 챙겨야 하고, shadow DOM 경계를 넘으면 target이 컴포넌트로 바뀌어(retarget) 걸러지지 않는 경우가 있다. 전파 범위는 이벤트를 내는 컴포넌트가 정한다.',
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

// TODO: menu-item-radio·checkbox·switch가 입력을 가진 mm-radio·mm-checkbox·mm-switch를 inert로 중첩해
// 모양만 쓴다. 입력 없이 시각 부분만 담은 공유 스타일 조각을 radio·checkbox·switch의 *.styles.ts에 두고
// 행이 <span>에 입히도록 바꿔, inert·aria-hidden 중첩을 없앤다.
