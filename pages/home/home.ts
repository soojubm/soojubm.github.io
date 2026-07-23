import { html, render } from 'lit'

import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import { renderLayout } from '../../layouts/base-layouts'
import { ScrollSpyController } from '../../src/controllers/scroll-spy-controller'
import './home.css'

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

    <mm-flex direction="column" gap="4">
      <mm-text size="24" weight="bold">Layout Modules</mm-text>
      <mm-paragraph>
        레이아웃 모듈로 컨테이너 너비, 표면 처리, 배경 대비는 페이지가 집중형, 에디토리얼형, 관리형,
        탐색형 등 성격을 나타내는 단서로 사용합니다.
      </mm-paragraph>

      <mm-grid columns="4">
        <mm-text-block
          level="3"
          heading="Narrow container"
          description="로제한된 폭으로 콘텐츠를 배치해 사용자의 집중을 유도합니다."
        ></mm-text-block>
        <mm-text-block
          level="3"
          heading="Medium container"
          description="비밀번호 찾기, 설정 등 콘텐츠 양이 적은 페이지에..."
        ></mm-text-block>
        <mm-text-block
          level="3"
          heading="Background contrast"
          description="설정, 글쓰기, 소개 페이지처럼 서로 다른 정보 구조나 작업 맥락을 구분합니다."
        ></mm-text-block>
        <mm-text-block
          level="3"
          heading="Surface contrast"
          description="폼, 카드, 편집 영역처럼 독립된 작업 단위를 강조합니다."
        ></mm-text-block>
        <mm-text-block
          level="3"
          heading="Centered content"
          description="가운데 정렬된 콘텐츠 모듈의 대비로 사용자의 주의를 환기합니다."
        ></mm-text-block>
      </mm-grid>

      <br />

      <mm-text-list
        texts='[
          "사용자의 화면 크기를 한정하지 마세요. 새로운 플랫폼이나 새로운 디바이스가 출시되더라도 빠르게 대응할 수 있어야 합니다. 특정 디바이스에 최적화하거나 종속되지 않고 환경에 구애받지 않는 일관된 경험과 인터페이스를 설계한다는 태도.",
          "왜 디자이너들은 작업판의 크기 정의를 어려워 하는가? 375px 등의 고정된 가로 크기는 의미가 없다. 마찬가지로 디자인 툴에서 자동으로 말줄임표를 만든다는 식의 솔루션은 아무 문제도 해결할 수 없다. 말줄임표가 발생하면 레이블의 의미를 전달하지 못 하기 때문이다. 엄격한 writing 가이드가 유아이 툴의 자동화보다 중요하다.",
        ]'
      ></mm-text-list>
    </mm-flex>

    <mm-flex direction="column" gap="3">
      <mm-text size="24" weight="bold" as="h3">Interactive signifiers</mm-text>
      <mm-paragraph>
        사용자가 특정 요소를 누르거나 이동할 수 있음 일관된 시각적 단서로 파악합니다.
      </mm-paragraph>

      <mm-grid columns="3">
        <mm-surface variant="elevated">
          <mm-paragraph>
            <b>elevated 오브젝트</b>
            는 클릭할 수 있다. 또는 오브젝트 내부에 클릭할 수 있는 요소가 존재한다.
          </mm-paragraph>
        </mm-surface>
        <mm-surface variant="filled">
          <mm-paragraph>
            <b>연한 회색 배경의 오브젝트</b>
            내부에는 클릭 가능한 액션이 존재한다.
          </mm-paragraph>
        </mm-surface>
        <mm-surface variant="ghost">
          <mm-paragraph>
            <mm-link href="#">브랜드 컬러 텍스트</mm-link>
            는 클릭할 수 있다. 이미지는 클릭할 수 있다?
          </mm-paragraph>
        </mm-surface>
      </mm-grid>

      <br />
      <mm-feature-group columns="4">
        <mm-feature
          heading="Interactive - action"
          description="누르면 실행되고 닫힙니다. Menu가 이 유형입니다."
        ></mm-feature>
        <mm-feature
          heading="Interactive - selection"
          description="누른 뒤에도 선택 상태가 남습니다. ListBox가 이 유형입니다."
        ></mm-feature>
      </mm-feature-group>
    </mm-flex>

    <mm-content-section heading="Action States">
      <mm-grid columns="4" gap="4">
        <style>
          .demo-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            height: var(--size-32);
            padding: 0 var(--space-3);
            border: var(--border);
            border-radius: var(--radius);
            background: var(--background-subtle-color);
            font-family: var(--font-family);
            font-size: inherit;
            font-weight: var(--font-weight-bold);
            color: var(--foreground-color);
            cursor: pointer;
            outline: none;
          }

          .demo-btn.is-hover {
            border-color: var(--background-strong-color);
          }

          .demo-btn.is-focus {
            outline: var(--interaction-focus-outline);
            outline-offset: 2px;
          }

          .demo-btn.is-active {
            background: var(--interaction-active-background-color);
            box-shadow: 0 0 0 3px var(--color-interaction-active-ring),
              inset 0 0 0 2px var(--foreground-color-on-solid);
          }

          .demo-btn.is-disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }

          .demo-btn.is-dragged {
            opacity: 0.6;
            cursor: grabbing;
          }
        </style>
        <mm-flex direction="column" gap="3">
          <mm-text>Hover</mm-text>
          <button class="demo-btn is-hover">Button</button>
        </mm-flex>
        <mm-flex direction="column" gap="3">
          <mm-text>Focus</mm-text>
          <button class="demo-btn is-focus">Button</button>
        </mm-flex>
        <mm-flex direction="column" gap="3">
          <mm-text>Active</mm-text>
          <button class="demo-btn is-active">Button</button>
        </mm-flex>
        <mm-flex direction="column" gap="3">
          <mm-text>Disabled</mm-text>
          <button class="demo-btn is-disabled">Button</button>
        </mm-flex>
        <mm-flex direction="column" gap="3">
          <mm-text>Dragging</mm-text>
          <button class="demo-btn is-dragged">Button</button>
        </mm-flex>
        <mm-flex direction="column" gap="3">
          <mm-text>Loading</mm-text>
          <button class="demo-btn">
            <mm-typing-indicator color="var(--background-strong-color)"></mm-typing-indicator>
          </button>
        </mm-flex>
      </mm-grid>
    </mm-content-section>

    <mm-content-section heading="Selection States">
      <mm-paragraph>WCAG - 색상만으로 상태를 전달하지 말 것</mm-paragraph>
      <mm-grid columns="3" gap="3">
        <mm-flex direction="column" gap="2">
          <div
            class="swatch-chip"
            style="background: var(--interaction-selected-background-color)"
          ></div>
          <mm-caption>--interaction-selected-background-color</mm-caption>
        </mm-flex>
        <mm-flex direction="column" gap="2">
          <div
            class="swatch-chip"
            style="background: var(--interaction-selected-foreground-color)"
          ></div>
          <mm-caption>--interaction-selected-foreground-color</mm-caption>
        </mm-flex>
        <mm-flex direction="column" gap="2">
          <div
            class="swatch-chip"
            style="background: var(--interaction-selected-background-color)"
          ></div>
          <mm-caption>--interaction-selected-background-color</mm-caption>
        </mm-flex>
      </mm-grid>

      <style>
        .swatch-chip {
          height: var(--size-48);
          border: var(--border);
          border-radius: var(--radius);
        }
      </style>
    </mm-content-section>

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

    <mm-component-references>
      <mm-link href="https://m3.material.io/foundations/layout/breakpoints/overview">
        MD3 breakpoints (aka responsive layout)
      </mm-link>
      <mm-link href="https://react.dev/learn/preserving-and-resetting-state">
        preserving-and-resstting-state 상태 보존 key. 이게 트리 구조를 위한 것이지 map 함수를 위한
        것은 아니었다..
      </mm-link>
      <mm-link external href="https://developer.apple.com/documentation/technologies">
        Apple technologies
      </mm-link>
      <mm-link external href="https://developer.android.com/reference">
        Android API reference
      </mm-link>
      <mm-link external href="https://www.digitala11y.com/">Digital A11Y</mm-link>
      <mm-link external href="https://www.w3.org/WAI/ARIA/apg/">
        ARIA Authoring Practices Guide
      </mm-link>
      <mm-link external href="https://en.wikipedia.org/wiki/Universal_design">
        Universal design
      </mm-link>
      <mm-link external href="https://html.spec.whatwg.org/">HTME spec</mm-link>
      <mm-link external href="https://www.sitemaps.org/protocol.html">
        sitemaps.org/protocol
      </mm-link>
      <mm-link external href="https://w3c.github.io/wcag/understanding/target-size-minimum.html ">
        w3c - target-size-minimum (desktop 24px 이상)
      </mm-link>
      <mm-link
        external
        href="https://developer.apple.com/design/human-interface-guidelines/components/layout-and-organization/disclosure-controls"
      >
        disclosure-controls
      </mm-link>
      <mm-link external href="https://developer.apple.com/kr/design/tips/">
        UI 디자인 기본 원칙
      </mm-link>
      <mm-link external href="https://m3.material.io/foundations/interaction-states">
        MD interaction-states
      </mm-link>
      <mm-link external href="https://simplicable.com/new/visual-information">
        Visual Information
      </mm-link>
      <mm-link external href="https://m3.material.io/blog/building-with-m3-expressive">
        Building with M3 Expressive
      </mm-link>
    </mm-component-references>
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
