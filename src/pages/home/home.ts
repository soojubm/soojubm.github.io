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

const sharedStyleRows = html`
  <tr>
    <th scope="row"><mm-code>list-item.styles</mm-code></th>
    <td>8</td>
    <td>
      <mm-code>interactiveRowStyles</mm-code>
      : 눌리는 행의 hover·포커스·선택·비활성 스킨. menu-item 계열과 사이드바·검색 목록이 이 위에
      선다
    </td>
  </tr>
  <tr>
    <th scope="row"><mm-code>dot.styles</mm-code></th>
    <td>6</td>
    <td>
      <mm-code>dotStyles</mm-code>
      와 크기·tone 단계: 점 모양과 조합 컴포넌트가 고르는 단계
    </td>
  </tr>
  <tr>
    <th scope="row"><mm-code>surface.styles</mm-code></th>
    <td>7</td>
    <td>
      <mm-code>surfaceBaseStyles</mm-code>
      : 면 선언. faq·banner·radio card·code-block·pager·token-item·color-token이 자기 요소에 얹는다
    </td>
  </tr>
  <tr>
    <th scope="row"><mm-code>input.styles</mm-code></th>
    <td>5</td>
    <td>
      <mm-code>visuallyHiddenInputStyles</mm-code>
      : radio·checkbox가 네이티브 input을 숨기는 조각. 입력 필드 스타일은 input 계열 안에서만 쓴다
    </td>
  </tr>
  <tr>
    <th scope="row"><mm-code>tag.styles</mm-code></th>
    <td>5</td>
    <td>
      <mm-code>TagTone</mm-code>
      : tone 이름과 색. dot·chart가 tag와 같은 색을 맞출 때 쓴다
    </td>
  </tr>
  <tr>
    <th scope="row"><mm-code>button.styles</mm-code></th>
    <td>4</td>
    <td>
      <mm-code>buttonBaseStyles</mm-code>
      ·
      <mm-code>buttonSelectedStyles</mm-code>
      : 버튼 골격과 눌림 스킨. icon-button 스타일이 이 위에 서서 아이콘 버튼 계열까지 퍼진다
    </td>
  </tr>
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

const main = html`
  <mm-main>
    <mm-flex direction="column" gap="section">
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
      </div>

      <mm-surface>
        <mm-flex direction="column" gap="3">
          <mm-text size="24" weight="bold" as="h2">TODO</mm-text>
          <mm-text-list
            .texts=${[
              '모바일 anchored overlay 전환 검토: 좁은 화면에서 popover를 바텀 시트로 바꿀지 정한다. 터치 타겟과 화면 가장자리 잘림에는 유리하지만, 시트 안에서 열리는 popover가 시트 위 시트가 되어 "모달 표면은 얕게 유지한다"와 부딪친다. 트리거 규약도 popover는 slot="trigger", sheet는 aria-controls로 달라서 한 컴포넌트가 둘을 오가려면 규약부터 맞춰야 한다. 스크롤 컨테이너 잘림은 이 전환으로 해결되지 않으므로 별건으로 다룬다.',
            ]}
          ></mm-text-list>
        </mm-flex>
      </mm-surface>

      <mm-content-section-list>
        <mm-content-section heading="디자인 시스템에 대한 생각">
          <mm-paragraph>틀릴 수도 있지만 오랫동안 고민한 것들.</mm-paragraph>

          <mm-content-section-list>
            ${designSystemThoughts.map(
              ({ heading, body }) => html`
                <mm-content-section heading-level="3" heading=${heading}>
                  <mm-paragraph>${body}</mm-paragraph>
                </mm-content-section>
              `,
            )}
          </mm-content-section-list>
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

          <mm-content-section heading-level="3" heading="페이지 설명">
            <mm-text-list
              variant="check"
              .texts=${[
                '컴포넌트 페이지 설명은 무엇인지, 어떻게 동작하는지, 사용자에게 어떤 이득인지 순서로 쓴다.',
              ]}
            ></mm-text-list>
          </mm-content-section>
        </mm-content-section>

        <mm-content-section heading="Code Conventions">
          <mm-text-list
            .texts=${[
              '이벤트 핸들러 메서드는 handle 뒤에 대상과 이벤트 종류를 이어 붙인다. 예: handleFilesChange, handleRemoveClick',
              "host의 role이 항상 같은 값이면 connectedCallback에서 setAttribute('role', ...)로 고정하고, 소비자마다 달라질 수 있을 때만 reflect되는 role prop으로 공개한다.",
              '그룹/합성 컴포넌트는 자식의 change를 그대로 흘려보내지 않고 stopPropagation으로 끊은 뒤 자기 단위의 change로 다시 발행한다.',
              'render() 안의 조건부 DOM 조각이 커지면 render*() helper로 분리하고, render()에는 각 helper를 직접 나열한다.',
              'render*() 이름은 상태를 다시 중계하지 않고 실제 조각의 의미를 드러낸다. 예: renderContent()가 아니라 renderImage()',
              '파생 컴포넌트는 기반의 성격에 따라 조합 방식을 고른다. 상호작용·접근성 의미가 없는 기반은 그대로 렌더해 prop으로 단계를 고르고, 상호작용과 접근성 이름을 가진 기반은 공유 스타일·템플릿 조각을 조합한다. 후자를 렌더하면 shadow가 한 단계 깊어지고 이름·상태·이벤트를 안쪽으로 중계해야 하기 때문이다. 예: mm-current-indicator는 mm-dot을 렌더하고, mm-dismiss-button은 iconButtonStyles와 renderIconAction을 조합한다.',
            ]}
          ></mm-text-list>
          <mm-table
            .rows=${sharedStyleRows}
            caption="계열 밖에서 재사용되는 스타일 모듈"
            .columns=${[
              { label: '모듈', width: '160px' },
              { label: '밖에서 쓰는 곳', width: '120px' },
              { label: '재사용하는 것', width: '560px' },
            ]}
          ></mm-table>
        </mm-content-section>

        <mm-content-section heading="Accessibility Notes">
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
        </mm-content-section>
      </mm-content-section-list>

      <mm-component-references .items=${componentReferences}></mm-component-references>
      <mm-component-references
        heading="보완 영역"
        .items=${supplementaryReferences}
      ></mm-component-references>

      <mm-content-section heading="React로 옮긴 MoreMenu 패턴">
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
      </mm-content-section>
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
