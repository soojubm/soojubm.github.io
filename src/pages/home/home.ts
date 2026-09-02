import { html, render } from 'lit'

import type { ComponentReferenceItemData } from '@/components/domains/component/component-references'

import { ICON_NAMES } from '@/components/common/icon-button/semantics/icon-names'
import { renderLayout } from '@/components/layouts/base-layouts'
import { ScrollSpyController } from '@/controllers/scroll-spy-controller'

const componentReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://m3.material.io/foundations/layout/breakpoints/overview',
    label: 'MD3 breakpoints (aka responsive layout)',
  },
  {
    href: 'https://react.dev/learn/preserving-and-resetting-state',
    label: 'preserving-and-resstting-state',
  },
  {
    href: 'https://developer.apple.com/documentation/technologies',
    label: 'Apple technologies',
    external: true,
  },
  {
    href: 'https://developer.android.com/reference',
    label: 'Android API reference',
    external: true,
  },
  { href: 'https://www.digitala11y.com/', label: 'Digital A11Y', external: true },
  {
    href: 'https://www.w3.org/WAI/ARIA/apg/',
    label: 'ARIA Authoring Practices Guide',
    external: true,
  },
  {
    href: 'https://en.wikipedia.org/wiki/Universal_design',
    label: 'Universal design',
    external: true,
  },
  { href: 'https://html.spec.whatwg.org/', label: 'HTME spec', external: true },
  {
    href: 'https://www.sitemaps.org/protocol.html',
    label: 'sitemaps.org/protocol',
    external: true,
  },
  {
    href: 'https://w3c.github.io/wcag/understanding/target-size-minimum.html ',
    label: 'w3c - target-size-minimum (desktop 24px 이상)',
    external: true,
  },
  {
    href: 'https://developer.apple.com/design/human-interface-guidelines/components/layout-and-organization/disclosure-controls',
    label: 'disclosure-controls',
    external: true,
  },
  {
    href: 'https://developer.apple.com/kr/design/tips/',
    label: 'UI 디자인 기본 원칙',
    external: true,
  },
  {
    href: 'https://m3.material.io/foundations/interaction-states',
    label: 'MD interaction-states',
    external: true,
  },
  {
    href: 'https://simplicable.com/new/visual-information',
    label: 'Visual Information',
    external: true,
  },
  {
    href: 'https://m3.material.io/blog/building-with-m3-expressive',
    label: 'Building with M3 Expressive',
    external: true,
  },
  {
    href: 'https://codelabs.developers.google.com/codelabs/the-lit-path?hl=ko#0',
    label: 'Codelabs - The Lit Path',
    external: true,
  },
  {
    href: 'https://developer.mozilla.org/ko/docs/Web/Accessibility/Guides/Understanding_WCAG',
    label: 'Understanding WCAG',
    external: true,
  },
]

const main = html`
  <main class="page" style="display: flex; flex-direction: column; gap: var(--space-section)">
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

    <mm-content-section heading="Status States">
      <mm-paragraph>
        사용자의 행동이나 시스템 상태에 대한 결과를 전달합니다. 사용자가 문제의 원인과 영향을 받는
        대상을 명확히 이해할 수 있도록 제공해야 합니다. 색상만으로 에러 상태를 전달하지 말고, 에러
        톤, 명시적인 메시지, 영향을 받는 필드 또는 영역, 그리고 접근 가능한 관계를 함께 제공해야
        합니다.
      </mm-paragraph>

      <mm-flex direction="column" gap="3">
        <mm-list-item
          icon="check-circle"
          size="small"
          label="Success"
          description="작업이 성공적으로 완료되었음을 나타냅니다."
        ></mm-list-item>
        <mm-list-item
          icon="info-circle"
          size="small"
          label="Info"
          description="사용자에게 참고 가능한 보조 정보를 제공합니다."
        ></mm-list-item>
        <mm-list-item
          icon="warning-triangle"
          size="small"
          label="Warning"
          description="진행 전에 사용자의 주의가 필요한 상태입니다."
        ></mm-list-item>

        <mm-list-item
          icon="xmark-circle"
          size="small"
          label="Error"
          description="오류, 실패, 수정이 필요한 상태를 나타냅니다."
        ></mm-list-item>
      </mm-flex>
    </mm-content-section>

    <mm-content-section heading="Data/Async States">
      <mm-paragraph>
        비동기 데이터 흐름의 상태. Status Error와 부분하기 위해 실패는 Error를 Rejected/Failed로
        부른다.
      </mm-paragraph>

      <mm-flex direction="column" gap="3">
        <mm-list-item
          icon="circle"
          size="small"
          label="Idle"
          description="아직 아무 요청도 하지 않은 대기·초기 상태입니다."
        ></mm-list-item>
        <mm-list-item
          icon="refresh"
          size="small"
          label="Pending / Fetching"
          description="데이터를 가져오는 중입니다. 스켈레톤이나 스피너를 노출합니다."
        ></mm-list-item>
        <mm-list-item
          icon="check-circle"
          size="small"
          label="Resolved / Success"
          description="데이터를 성공적으로 가져와 정상 UI를 노출합니다."
        ></mm-list-item>
        <mm-list-item
          icon="xmark-circle"
          size="small"
          label="Rejected / Failed"
          description="데이터를 가져오는 데 실패해 에러 화면을 노출합니다."
        ></mm-list-item>
        <mm-list-item
          icon="glass-empty"
          size="small"
          label="Empty"
          description="완료되었으나 데이터가 0건일 때 빈 화면을 노출합니다."
        ></mm-list-item>
      </mm-flex>
    </mm-content-section>

    <!-- <mm-content-section heading="Icons" class="js-icon-gallery"></mm-content-section> -->

    <mm-component-references .items=${componentReferences}></mm-component-references>
  </main>
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
