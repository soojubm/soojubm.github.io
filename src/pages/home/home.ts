import { html, nothing } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import { ICON_NAMES, type IconName, type ToggleButtonGroup } from '@/components/common'

import { type ComponentFeatureItem } from '@/components/domains/component'
import '@/components/domains/component/reference-cell'
import { renderPage } from '@/components/layouts/base-layouts'
import referencesData from './references.json'
import { SITEMAP } from '@/sitemap'
import './home.css'

type ReferenceCategory = 'os' | 'general' | 'company'

interface Reference {
  category: ReferenceCategory
  brand: string
  page: string
  href: string
}

// 레퍼런스는 references.json에서 읽고, 분류 순서 → 브랜드 → 페이지 순으로 정렬한다.
const REFERENCE_CATEGORY_ORDER: ReferenceCategory[] = ['os', 'general', 'company']

const sortedReferences = [...(referencesData as Reference[])].sort(
  (a, b) =>
    REFERENCE_CATEGORY_ORDER.indexOf(a.category) - REFERENCE_CATEGORY_ORDER.indexOf(b.category) ||
    a.brand.localeCompare(b.brand) ||
    a.page.localeCompare(b.page),
)

type ComponentFeature = {
  tone: 'blue' | 'purple'
  name: string
}

// Interaction은 blue, Presentation은 purple 톤으로 묶음을 구분한다.
const componentFeatures: ComponentFeature[] = [
  { tone: 'blue', name: 'Interactive - action' },
  { tone: 'blue', name: 'Interactive - selection' },
  { tone: 'blue', name: 'Interactive - input' },
  { tone: 'blue', name: 'Feedback' },
  { tone: 'purple', name: 'Glanceable' },
  { tone: 'purple', name: 'Representative' },
  { tone: 'purple', name: 'Stateful' },
  { tone: 'purple', name: 'Structural' },
  { tone: 'purple', name: 'Contextual' },
]

const renderFeatureTag = ({ tone, name }: ComponentFeature) => html`
  <mm-code-tag tone=${tone} size="large">${name}</mm-code-tag>
`

// 제목을 한 칼럼에 세 줄로 되풀이하는 테두리 상자. 읽는 제목은 한 번만 두고, 반복한 글자는 보조 기술이 읽지 않게 숨긴다.
const renderRepeatTitle = (title: string) => html`
  <h2 class="repeat-title">
    <span class="visually-hidden">${title}</span>
    <span aria-hidden="true">
      ${[1, 2, 3].map(
        () => html`
          <span class="repeat-title-row">${title}</span>
        `,
      )}
    </span>
  </h2>
`

// 원칙마다 핵심 하나를 선으로만 그린다. 설명은 글이 맡으므로 그림은 보조 기술이 읽지 않게 숨긴다.
// constraint: 많은 선택지를 틀이 좁혀 몇 개만 남긴다.
// lean: 처음엔 하나만 만들어 내보내고, 필요한 칸만 나중에 채운다.
// rule: 이미 적힌 규칙은 그대로 있고, 새 규칙 하나가 그 아래에 한 줄씩 적힌다(명문화).
const renderThoughtFigure = (figure: ThoughtFigure) => {
  if (figure === 'constraint') {
    return html`
      <div class="figure figure-constraint" aria-hidden="true">
        ${Array.from(
          { length: 12 },
          (_, index) =>
            html`
              <span data-picked=${index === 5 || index === 6}></span>
            `,
        )}
        <i></i>
      </div>
    `
  }

  if (figure === 'lean') {
    return html`
      <div class="figure figure-lean" aria-hidden="true">
        <span data-state="shipped"></span>
        <span></span>
        <span data-state="improved"></span>
        <span></span>
      </div>
    `
  }

  return html`
    <div class="figure figure-rule" aria-hidden="true">
      <div class="rule-page">
        <div class="rule-item">
          <i></i>
          <i></i>
          <i></i>
        </div>
        <div class="rule-item">
          <i></i>
          <i></i>
        </div>
        <div class="rule-item" data-new>
          <i></i>
          <i></i>
          <i></i>
        </div>
      </div>
    </div>
  `
}

const renderThoughtPoint = (point: ThoughtPoint) => {
  const { text, tags } = typeof point === 'string' ? { text: point, tags: [] } : point

  return html`
    <mm-flex direction="column" gap="2" align-items="flex-start">
      ${tags.length
        ? html`
            <mm-tag-group>
              ${tags.map(
                tag =>
                  html`
                    <mm-code-tag>${tag}</mm-code-tag>
                  `,
              )}
            </mm-tag-group>
          `
        : nothing}
      <mm-paragraph size="large">${text}</mm-paragraph>
    </mm-flex>
  `
}

// 브랜드 페이지라 디자인 시스템 컴포넌트를 바꾸지 않고, 기존 아이콘 역할과 색 토큰을 그대로 가져다 쓴다.
const FOUNDATION_ICONS: Record<string, IconName> = {
  layout: ICON_NAMES.GRID_VIEW,
  interaction: ICON_NAMES.MOUSE_BUTTON,
  pattern: ICON_NAMES.CUBE_SCAN,
  content: ICON_NAMES.DOCUMENT,
}

// 각 페이지의 mm-tab-list 순서와 맞춘다. search-param="tab"으로 해당 탭을 바로 연다.
const FOUNDATION_TABS: Record<string, string[]> = {
  layout: ['Page', 'Division', 'Overlay', 'Elevations'],
  interaction: ['State', 'Selection'],
  pattern: ['Disclosure', 'Search', 'Collection'],
  content: ['Writing', 'Iconography', 'Accessibility'],
}

// 사이드바와 같은 목록에서 만들어, 축을 추가하거나 옮겨도 줄이 빠지지 않는다.
const foundationsNode = SITEMAP.find(node => node.id === 'foundations')
const foundationItems = foundationsNode?.type === 'standalone' ? foundationsNode.children ?? [] : []

// 안쪽부터 바깥으로 겹쳐 쌓이는 고리의 순번.
const featureRings = [1, 2, 3, 4, 5, 6, 7, 8]

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

// 항목은 글만 쓰거나, 위에 코드 태그를 달아 무엇에 대한 항목인지 먼저 보인다.
type ThoughtPoint = string | { text: string; tags: string[] }

type ThoughtFigure = 'constraint' | 'lean' | 'rule'

interface Thought {
  figure: ThoughtFigure
  label: string
  heading: string
  body: string
  points: ThoughtPoint[]
}

const designSystemThoughts: Thought[] = [
  {
    figure: 'constraint',
    label: 'Principle',
    heading: 'Constraint-driven design',
    body: '디자인의 문제는 선택지가 부족한 것이 아니라 너무 많은 것이다. 제약은 그택지를 줄여 주는 설계의 출발점이다.',
    points: [
      {
        text: '검증된 웹 표준과 기존 인터페이스 관습을 우선하고, 사용자에게 새로운 학습을 요구하는 패턴을 징ㅑㅇ한다. ',
        tags: ['Web Standards', 'Accessibility'],
      },
      {
        text: '작은 화면을 기준으로 한다. 어디서나 동작하게 만들면 선택지가 줄고, 해결책은 모든 환경에 그대로 통한다. 새로운 디바이스가 새로운 레이아웃으로 출시되어도 지장이 없도록 만든다.',
        tags: ['Responsive'],
      },
    ],
  },
  {
    figure: 'lean',
    label: 'Implementation 1',
    heading: 'Lean design',
    body: '제품은 린하게 만들면서 디자인 시스템은 왜 완결된 체계를 추구하는가. 디자인 시스템의 목적은 체계를 구축하는 것이 아니라 제품 개발을 더 효율적으로 만드는 것이다.',
    points: [
      {
        text: '있음직한 것을 미리 설계하지 않는다. 필요한 변경을 적은 비용으로 반영할 수 있는 구조를 먼저 갖춘다.',
        tags: ['YAGNI'],
      },
      {
        text: '출시를 먼저 한다. 실제 제품을 만드는 과정에서 드러나는 문제와 동료나 사용자의 피드백을 검증한 뒤, 필요한 부분부터 개선한다.',
        tags: ['Ship First'],
      },
    ],
  },
  {
    figure: 'rule',
    label: 'Implementation 2',
    heading: 'Rule-based design',
    body: '우리가 해결하려는 문제는 인터페이스 자체가 아니라, 제품을 만드는 과정에서 반복되는 불필요한 의사결정이다.',
    points: [
      {
        text: '규칙을 지키는 과정에서 반복되는 문제는 명문화한다.',
        tags: ['Convention'],
      },
      {
        text: '규칙은 목적이 아니라 수단이다. 출시를 앞당기거나 제품 성과를 측정할 수 있다면 예외를 허용한다. 규칙을 변경하려면 기존 규칙의 문제와 변경에 따른 기대 효과를 설명해야 한다. ',
        tags: ['Exception'],
      },
    ],
  },
]

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
  <mm-main class="home">
    <section style="margin-bottom:1rem;">
      <div style="border-top:var(--home-border);padding:1rem 0;">
        <mm-tagline>
          <span data-reveal style=${styleMap({
            '--tagline-chars': String('Fewer decisions'.length),
          })}>
            Fewer decisions
          </span>
        </mm-tagline>
      </div>
      <div
        style="border-top:var(--home-border);border-bottom:var(--home-border);text-align:right;padding:1rem 0;"
      >
        <mm-tagline>
          <span data-reveal style=${styleMap({
            '--tagline-chars': String('Faster releases'.length),
            '--tagline-delay': '1.9s',
          })}>
            Faster releases
          </span>
          <br />
          <span data-reveal style=${styleMap({
            '--tagline-chars': String('Faster learning'.length),
            '--tagline-delay': '3.5s',
          })}>
            Faster learning
          </span>
        </mm-tagline>
      </div>
    </section>
    <!-- <mm-flex direction="column" gap="section">
      <mm-flex direction="column" gap="8" align-items="center">
        <mm-tagline centered multiline>${heroHeading}</mm-tagline>
        <mm-flex direction="column" gap="3" align-items="center">
          <mm-tag-group>
            <mm-tag>목표</mm-tag>
            <mm-code-tag>Release</mm-code-tag>
            <mm-code-tag>Experiment</mm-code-tag>
          </mm-tag-group>
          <mm-text-block
            centered
            level="3"
            heading="Fast release / Fast experiment"
            description="제품을 완성하고 사용자에게 전달하는 시간, 가설을 검증하고 제품을 개선하는 주기 단축"
          ></mm-text-block>
        </mm-flex>
      </mm-flex> -->

      <mm-flex direction="column" gap="6" class="foundations">
        ${renderRepeatTitle('Foundations')}
      <ul class="foundation-list">
        ${foundationItems.map(
          ({ id, name }) => html`
            <li class="foundation-row">
              <div class="foundation-name">
                <span class="foundation-badge" data-axis=${id}>
                  <mm-icon name=${FOUNDATION_ICONS[id]} aria-hidden="true"></mm-icon>
                </span>
                <mm-heading level="3">${name}</mm-heading>
              </div>
              <nav class="foundation-tabs" aria-label=${`${name} 탭`}>
                ${FOUNDATION_TABS[id].map(
                  label => html`
                    <mm-link href=${`./${id}.html?tab=${label.toLowerCase()}`}>
                      ${label}
                      <mm-icon name=${ICON_NAMES.FORWARD} aria-hidden="true"></mm-icon>
                    </mm-link>
                  `,
                )}
              </nav>
            </li>
          `,
        )}
      </ul>
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

      <mm-flex direction="column" gap="4" align-items="center" class="pattern-first">
        <mm-code-tag size="large">Approach</mm-code-tag>
        <div class="cycle">
          <div class="cycle-track">
            <div class="cycle-title">
              <mm-tagline centered>Pattern-first</mm-tagline>
            </div>
            <div class="cycle-lane" data-lane="top" aria-hidden="true">
              <span class="cycle-arrow" data-direction="forward"></span>
              <span class="cycle-step">
                <b>Pattern</b>
                <i>제품에 필요한 패턴</i>
              </span>
              <span class="cycle-arrow" data-direction="forward"></span>
              <span class="cycle-step">
                <b>Extract</b>
                <i>반복되는 구조와 동작</i>
              </span>
            </div>
            <div class="cycle-lane" data-lane="bottom" aria-hidden="true">
              <span class="cycle-step">
                <b>Define</b>
                <i>컴포넌트 · 토큰 · 레이아웃</i>
              </span>
              <span class="cycle-arrow" data-direction="back"></span>
            </div>
          </div>
        </div>
        <mm-paragraph size="large" centered class="approach-description">
          제품에서 반복되는 구조와 동작을 추출한 뒤, 그것을 컴포넌트 · 토큰 · 레이아웃으로
          정의한다.
        </mm-paragraph>
        <!-- 운영체제 수준의 디자인 시스템을 기준으로 토큰과 컴포넌트를 먼저 정의하지 않는다.  -->
      </mm-flex>

      <div class="principle-list">
        ${designSystemThoughts.map(
          ({ figure, label, heading, body, points }) => html`
            <section class="principle-row">
              <mm-code-tag size="large" class="principle-label">${label}</mm-code-tag>
              ${renderThoughtFigure(figure)}
              <mm-flex direction="column" gap="3">
                <mm-heading level="2" class="design-title">${heading}</mm-heading>
                <mm-paragraph size="large">${body}</mm-paragraph>
              </mm-flex>
              <mm-paragraph-group class="principle-points">
                ${points.map(renderThoughtPoint)}
              </mm-paragraph-group>
            </section>
          `,
        )}
      </div>

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

      <div class="feature-stage">
        <div class="feature-rings" aria-hidden="true">
          ${featureRings.map(
            ring => html`
              <span style=${styleMap({ '--ring': String(ring) })}></span>
            `,
          )}
        </div>
        <mm-flex
          gap="2"
          wrap="wrap"
          justify-content="center"
          role="group"
          aria-label="Component Feature"
          class="feature-tags"
        >
          ${componentFeatures.map(renderFeatureTag)}
        </mm-flex>
      </div>

      <mm-flex direction="column" gap="6">
        ${renderRepeatTitle('References')}
        <div class="reference-grid">
          ${sortedReferences.map(
            ({ href, brand, page }) => html`
              <mm-reference-cell href=${href} brand=${brand} page=${page}></mm-reference-cell>
            `,
          )}
        </div>
      </mm-flex>
    </mm-flex>
  </mm-main>
`

renderPage(main, {
  footer: true,
  closeSidebar: true,
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
