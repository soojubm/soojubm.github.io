import { html, render } from 'lit'

import type { ComponentReferenceItemData } from '@/components/domains/component/component-references'

import { ICON_NAMES } from '@/components/common/icon-button/semantics/icon-names'
import { renderLayout } from '@/components/layouts/base-layouts'
import { ScrollSpyController } from '@/controllers/scroll-spy-controller'

const componentReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://m3.material.io/foundations/layout/breakpoints/overview',
    label: 'MD3 - Layout Breakpoints',
    external: true,
  },
  {
    href: 'https://react.dev/learn/preserving-and-resetting-state',
    label: 'React - Preserving and Resetting State',
    external: true,
  },
  {
    href: 'https://developer.apple.com/documentation/technologies',
    label: 'Apple Developer - Technologies',
    external: true,
  },
  {
    href: 'https://developer.android.com/reference',
    label: 'Android - API Reference',
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
    href: 'https://developer.apple.com/design/human-interface-guidelines/components/layout-and-organization/disclosure-controls',
    label: 'Apple HIG - Disclosure Controls',
    external: true,
  },
  {
    href: 'https://developer.apple.com/kr/design/tips/',
    label: 'Apple - Design Tips',
    external: true,
  },
  {
    href: 'https://m3.material.io/foundations/interaction-states',
    label: 'MD3 - Interaction States',
    external: true,
  },
  {
    href: 'https://simplicable.com/new/visual-information',
    label: 'Simplicable - Visual Information',
    external: true,
  },
  {
    href: 'https://m3.material.io/blog/building-with-m3-expressive',
    label: 'MD3 - Building with M3 Expressive',
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

const supplementaryReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://www.uber.com/us/en/blog/design-system-at-scale/',
    label: 'Uber - Design System at Scale',
    external: true,
  },
]

const main = html`
  <mm-page style="display: flex; flex-direction: column; gap: var(--space-section)">
    <mm-flex gap="8" direction="column">
      <mm-heading level="1" weight="bold" as="h1">
        디자인 시스템
        <br />
        사이드 프로젝트
      </mm-heading>
      <mm-text-list
        texts='["Web Component - Lit", "Github Actions", "Constraint-driven design"]'
      ></mm-text-list>
    </mm-flex>

    <div hidden>
      <style>
        .scroll-spy-sampler-nav {
          display: flex;
        }

        .scroll-spy-sampler-tab {
          width: 100%;
          padding: var(--space-2) var(--space-3);
          border: 0;
          border-radius: var(--radius);
          background: transparent;
          font: inherit;
          color: var(--foreground-subtle-color);
          text-align: left;
          cursor: pointer;
        }

        .scroll-spy-sampler-tab.is-active {
          background: var(--interaction-selected-background-color);
          color: var(--interaction-selected-foreground-color);
        }

        .scroll-spy-sampler-body {
          flex: 1 1 18rem;
          min-width: 0;
          max-height: 24rem;
          scroll-padding-top: var(--space-4);
        }

        .scroll-spy-sampler-section {
          justify-content: center;
          min-height: 18rem;
        }

        @media (max-width: 720px) {
          .scroll-spy-sampler-nav {
            flex-basis: 100%;
            position: static;
          }
        }
      </style>
      <mm-surface>
        <mm-text size="24" weight="bold" as="h2">Scroll Spy Controller Sampler</mm-text>
        <div class="scroll-spy-sampler js-scroll-spy-sampler">
          <nav class="scroll-spy-sampler-nav" aria-label="Scroll spy sampler">
            <button
              class="scroll-spy-sampler-tab is-active"
              type="button"
              aria-current="true"
              data-scroll-spy-target="sampler-intent"
            >
              Intent
            </button>
            <button
              class="scroll-spy-sampler-tab"
              type="button"
              aria-current="false"
              data-scroll-spy-target="sampler-root"
            >
              Root
            </button>
            <button
              class="scroll-spy-sampler-tab"
              type="button"
              aria-current="false"
              data-scroll-spy-target="sampler-update"
            >
              Update
            </button>
            <button
              class="scroll-spy-sampler-tab"
              type="button"
              aria-current="false"
              data-scroll-spy-target="sampler-cleanup"
            >
              Cleanup
            </button>
          </nav>
          <mm-scroll
            direction="column"
            gap="3"
            class="scroll-spy-sampler-body js-scroll-spy-body"
            tabindex="0"
          >
            <mm-surface
              id="sampler-intent"
              class="scroll-spy-sampler-section"
              data-scroll-spy-section
            >
              <mm-text-block
                level="3"
                heading="Observe visible sections"
                description="The controller owns IntersectionObserver setup and updates the active section as the panel scrolls."
              ></mm-text-block>
            </mm-surface>
            <mm-surface
              id="sampler-root"
              class="scroll-spy-sampler-section"
              data-scroll-spy-section
            >
              <mm-text-block
                level="3"
                heading="Use a local scroll root"
                description="This sampler passes its inner scroll area as the observer root, so the behavior stays contained in the page sample."
              ></mm-text-block>
            </mm-surface>
            <mm-surface
              id="sampler-update"
              class="scroll-spy-sampler-section"
              data-scroll-spy-section
            >
              <mm-text-block
                level="3"
                heading="Refresh targets after render"
                description="The page setup reads target elements after the HTML is rendered and lets the controller observe those sections."
              ></mm-text-block>
            </mm-surface>
            <mm-surface
              id="sampler-cleanup"
              class="scroll-spy-sampler-section"
              data-scroll-spy-section
            >
              <mm-text-block
                level="3"
                heading="Keep document scroll stable"
                description="Trigger buttons scroll only this inner panel, so clicking Intent, Root, Update, or Cleanup does not move the document."
              ></mm-text-block>
            </mm-surface>
          </mm-scroll>
        </div>
      </mm-surface>
      <mm-surface>
        <mm-flex direction="column" gap="3">
          <mm-text size="24" weight="bold" as="h2">TODO</mm-text>
          <mm-text-list
            texts='[
            "ElementInternals 검토: host 기본 role과 ARIA를 DOM attribute/public prop 없이 접근성 트리에 제공할 수 있는지 확인한다.",
            "ElementInternals 적용 후보: mm-tab, mm-tab-panel, mm-search-suggestions처럼 host 자체가 접근성 관계 대상인 컴포넌트부터 검토한다.",
            "ElementInternals 도입 전제: 브라우저 지원, 디버깅 방식, React 마이그레이션 시 표현 방식을 함께 결정한다.",
            "change 이벤트 2차 점검: 그룹/합성 컴포넌트가 자식 change를 번역할 때 stopPropagation 기준을 문서화한다.",
            "ARIA 상태 소유자 2차 점검: host와 내부 native control 중 실제 접근성 의미를 갖는 요소에 상태를 모은다.",
            "role override 정책 정리: role을 공개 API로 둘 때 허용 범위와 문서화 기준을 정한다."
          ]'
          ></mm-text-list>
        </mm-flex>
      </mm-surface>
    </div>

    <!-- <mm-content-section heading="Icons" class="js-icon-gallery"></mm-content-section> -->

    <mm-content-section heading="가이드를 위한 가이드">
      <mm-paragraph>
        모든 것을 문서화하지 않는다. 반복해서 참조되고 자주 수행하는 것만 문서로 남긴다.
      </mm-paragraph>

      <mm-text-list
        variant="check"
        texts='[
          "문서화할 가치가 있다고 판단하려면 특정 횟수(예: 3회)만큼 발생해야 합니까?",
          "자주(예: 월 1회 이상) 프로세스를 수행해야 합니까?"
        ]'
      ></mm-text-list>
    </mm-content-section>

    <mm-component-references .items=${componentReferences}></mm-component-references>
    <mm-component-references
      heading="보완 영역"
      .items=${supplementaryReferences}
    ></mm-component-references>
  </mm-page>
`

document.addEventListener('DOMContentLoaded', () => {
  renderLayout(main, { footer: true })

  setupScrollSpySampler()
  setupIconGallery()
})

// ICON_NAMES를 실제 값으로 렌더해, 시맨틱 이름 추가 시 가이드가 코드와 함께 최신 상태를 유지하게 한다.
function setupIconGallery() {
  const gallery = document.querySelector<HTMLElement>('.js-icon-gallery')
  if (!gallery) return

  render(
    html`
      <mm-grid columns="4">
        ${Object.entries(ICON_NAMES).map(
          ([name, icon]) => html`
            <mm-list-item icon=${icon} label=${name} description=${icon}></mm-list-item>
          `,
        )}
      </mm-grid>
    `,
    gallery,
  )
}

function setupScrollSpySampler() {
  const sampler = document.querySelector<HTMLElement>('.js-scroll-spy-sampler')
  if (!sampler) return

  const scrollRoot = sampler.querySelector<HTMLElement>('.js-scroll-spy-body')
  const triggers = Array.from(
    sampler.querySelectorAll<HTMLButtonElement>('[data-scroll-spy-target]'),
  )
  const targets = Array.from(sampler.querySelectorAll<HTMLElement>('[data-scroll-spy-section]'))

  if (!scrollRoot || !triggers.length || !targets.length) return

  const setActive = (id: string) => {
    triggers.forEach(trigger => {
      const isActive = trigger.dataset.scrollSpyTarget === id
      trigger.classList.toggle('is-active', isActive)
      trigger.setAttribute('aria-current', String(isActive))
    })
  }

  const host = {
    addController: () => {},
    removeController: () => {},
    requestUpdate: () => {},
    updateComplete: Promise.resolve(true),
  }

  const scrollSpy = new ScrollSpyController(host, {
    root: scrollRoot,
    rootMargin: '0px 0px -55% 0px',
    onActiveChange: setActive,
  })

  scrollSpy.observe(targets)
  setActive(targets[0].id)

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const id = trigger.dataset.scrollSpyTarget
      const target = id ? document.getElementById(id) : null
      if (!id || !target) return

      setActive(id)

      const rootRect = scrollRoot.getBoundingClientRect()
      const targetRect = target.getBoundingClientRect()
      const top = targetRect.top - rootRect.top + scrollRoot.scrollTop
      scrollRoot.scrollTo({ top, behavior: 'smooth' })
    })
  })
}
