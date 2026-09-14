import { html } from 'lit'

import type { ToggleButtonGroup } from '@/components/common'
import type { ComponentReferenceItemData } from '@/components/domains/component'

import { renderPage } from '@/components/layouts/base-layouts'
import { ScrollSpyController } from '@/controllers/scroll-spy-controller'
import './home.css'

const platformReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://developer.apple.com/design/human-interface-guidelines/components/layout-and-organization/disclosure-controls',
    label: 'Apple HIG - Disclosure Controls',
    external: true,
  },
  {
    href: 'https://developer.apple.com/documentation/technologies',
    label: 'Apple Developer - Technologies',
    external: true,
  },
  {
    href: 'https://developer.apple.com/kr/design/tips/',
    label: 'Apple - Design Tips',
    external: true,
  },
  {
    href: 'https://developer.android.com/reference',
    label: 'Android - API Reference',
    external: true,
  },
  {
    href: 'https://m3.material.io/foundations/layout/breakpoints/overview',
    label: 'MD3 - Layout Breakpoints',
    external: true,
  },
  {
    href: 'https://m3.material.io/foundations/interaction-states',
    label: 'MD3 - Interaction States',
    external: true,
  },
  {
    href: 'https://m3.material.io/blog/building-with-m3-expressive',
    label: 'MD3 - Building with M3 Expressive',
    external: true,
  },
]

const generalReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://react.dev/learn/preserving-and-resetting-state',
    label: 'React - Preserving and Resetting State',
    external: true,
  },
  { href: 'https://www.digitala11y.com/', label: 'Digital A11Y', external: true },
  {
    href: 'https://www.w3.org/WAI/ARIA/apg/',
    label: 'WAI-ARIA APG',
    external: true,
  },
  {
    href: 'https://en.wikipedia.org/wiki/Universal_design',
    label: 'Wikipedia - Universal Design',
    external: true,
  },
  { href: 'https://html.spec.whatwg.org/', label: 'WHATWG - HTML Spec', external: true },
  {
    href: 'https://www.sitemaps.org/protocol.html',
    label: 'Sitemaps.org - Protocol',
    external: true,
  },
  {
    href: 'https://w3c.github.io/wcag/understanding/target-size-minimum.html',
    label: 'W3C - Target Size Minimum',
    external: true,
  },
  {
    href: 'https://simplicable.com/new/visual-information',
    label: 'Simplicable - Visual Information',
    external: true,
  },
  {
    href: 'https://codelabs.developers.google.com/codelabs/the-lit-path?hl=ko#0',
    label: 'Google Codelabs - The Lit Path',
    external: true,
  },
  {
    href: 'https://developer.mozilla.org/ko/docs/Web/Accessibility/Guides/Understanding_WCAG',
    label: 'MDN - Understanding WCAG',
    external: true,
  },
  {
    href: 'https://www.atlassian.com/ko/work-management/knowledge-sharing/documentation',
    label: 'Atlassian - Documentation',
    external: true,
  },
  {
    href: 'https://getdesign.md/',
    label: 'Get Design MD',
    external: true,
  },
]

const componentReferences: ComponentReferenceItemData[][] = [platformReferences, generalReferences]

const supplementaryReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://www.uber.com/us/en/blog/design-system-at-scale/',
    label: 'Uber - Design System at Scale',
    external: true,
  },
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
    body: '제품은 린하게 만들면서 디자인 시스템은 왜 린하지 않은가. 디자인 시스템에 대해 더 적게 이야기하고, 디자인 토큰에 대해 더 많이 이야기하자. 디자인 시스템에 대한 이야기는 갖춰야 할 것의 목록으로 불어나지만, 토큰에 대한 이야기는 무엇을 한 곳에서 결정하고 바꿀지로 좁혀진다. 결정이 한 곳에 모이면 일관성은 저절로 따라온다.',
  },
  {
    heading: '결정은 토큰에',
    body: '디자인 토큰을 모든 플랫폼에 일관되게 적용한다는 것은 거대담론이다. 먼저 할 일은 변경하기 쉽게 정의하고 추상화하는 것이다. 제품이 린하게 동작할 수 있는 최소 기능과 최대 효율은 컴포넌트가 아니라 어쩌면 토큰에서 나온다.',
  },
  {
    heading: '안정된 구조, 두렵지 않은 중복',
    body: '변경이 쉽도록 구조는 안정되게 두고, 중복을 두려워하지 않는다.',
  },
  {
    heading: '규칙은 기본값이다',
    body: '우리가 해결하려는 궁극적인 문제는 유저 인터페이스가 아니다. 세부사항에 대한 논의를 줄이자면서 규칙을 깰 이유는 없다. 출시를 앞당기거나 성과를 측정할 수 있다면 깰 수 있고, 새로운 규칙은 언제든 실험할 수 있다. 판을 뒤흔들고 싶다면 설득은 프로덕트 디자이너의 몫이다.',
  },
  {
    heading: '적게 디자인하기',
    body: '기술의 한계를 받아들이고, 새로운 학습이 필요한 인터페이스를 최소화한다.',
  },
  {
    heading: '문서보다 피드백',
    body: '문서의 완결성에 집착하지 않는다. 대신 동료의 피드백을 잘 모은다.',
  },
]

const main = html`
  <mm-page style="display: flex; flex-direction: column; gap: var(--space-section)">
    <mm-flex gap="8" direction="column">
      <mm-heading level="1">
        Design System
        <br />
        Side Project
      </mm-heading>
      <mm-text-list
        .texts=${['Web Component - Lit', 'Github Actions', 'Constraint-driven design']}
      ></mm-text-list>
    </mm-flex>

    <div hidden>
      <mm-surface>
        <mm-text size="24" weight="bold" as="h2">Scroll Spy Controller Sampler</mm-text>
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
      <mm-surface>
        <mm-flex direction="column" gap="3">
          <mm-text size="24" weight="bold" as="h2">TODO</mm-text>
          <mm-text-list
            .texts=${[
              'ElementInternals 검토: host 기본 role과 ARIA를 DOM attribute/public prop 없이 접근성 트리에 제공할 수 있는지 확인한다.',
              'ElementInternals 적용 후보: mm-tab, mm-tab-panel, mm-search-suggestions처럼 host 자체가 접근성 관계 대상인 컴포넌트부터 검토한다.',
              'ElementInternals 도입 전제: 브라우저 지원, 디버깅 방식, React 마이그레이션 시 표현 방식을 함께 결정한다.',
              'change 이벤트 2차 점검: 그룹/합성 컴포넌트가 자식 change를 번역할 때 stopPropagation 기준을 문서화한다.',
              'ARIA 상태 소유자 2차 점검: host와 내부 native control 중 실제 접근성 의미를 갖는 요소에 상태를 모은다.',
              'role override 정책 정리: role을 공개 API로 둘 때 허용 범위와 문서화 기준을 정한다.',
            ]}
          ></mm-text-list>
        </mm-flex>
      </mm-surface>
    </div>

    <mm-content-section heading="디자인 시스템에 대한 생각">
      <mm-paragraph>틀릴 수도 있지만 오랫동안 고민한 것들.</mm-paragraph>

      ${designSystemThoughts.map(
        ({ heading, body }) => html`
          <mm-content-section heading-level="3" heading=${heading}>
            <mm-paragraph>${body}</mm-paragraph>
          </mm-content-section>
        `,
      )}
    </mm-content-section>

    <mm-content-section heading="Meta Guidelines">
      <mm-paragraph>
        모든 것을 문서화하지 않는다. 반복해서 참조되고 자주 수행하는 것만 문서로 남긴다.
      </mm-paragraph>

      <mm-text-list
        variant="check"
        .texts=${[
          '문서화할 가치가 있다고 판단하려면 특정 횟수(예: 3회)만큼 발생해야 합니까?',
          '자주(예: 월 1회 이상) 프로세스를 수행해야 합니까?',
        ]}
      ></mm-text-list>
    </mm-content-section>

    <mm-component-references .items=${componentReferences}></mm-component-references>
    <mm-component-references
      heading="보완 영역"
      .items=${supplementaryReferences}
    ></mm-component-references>
  </mm-page>
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

  const host = {
    addController: () => {},
    removeController: () => {},
    requestUpdate: () => {},
    updateComplete: Promise.resolve(true),
  }

  const scrollSpy = new ScrollSpyController(host, {
    root: scrollRoot,
    rootMargin: '0px 0px -55% 0px',
    onActiveChange: id => {
      nav.value = id
    },
  })

  scrollSpy.observe(targets)

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
