import { renderDocumentLayout } from '../../../layouts/document-layout'
import main from './index.html'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderDocumentLayout(main)
  initInteractionStateDemo()
  initIconIndicators()
})

function initInteractionStateDemo() {
  const states: Record<string, { label: string; description: string; icon: string }> = {
    default: {
      label: 'Default',
      description: '아무런 상호작용이 없는 기본 상태입니다.',
      icon: 'cursor-pointer',
    },
    hover: {
      label: 'Hover',
      description: '포인터가 요소 위에 위치해 있으며 상호작용 가능함을 나타냅니다.',
      icon: 'password-cursor',
    },
    focus: {
      label: 'Focus',
      description: '키보드 또는 프로그램적 탐색으로 요소가 포커스를 받은 상태입니다.',
      icon: 'frame-alt-empty',
    },
    active: {
      label: 'Active',
      description: '요소가 눌리는 중인 상태입니다. 사용자의 입력에 즉각 반응합니다.',
      icon: 'mouse-button-left',
    },
    disabled: {
      label: 'Disabled',
      description: '현재 사용할 수 없는 상태입니다.',
      icon: 'lock',
    },
    loading: {
      label: 'Loading',
      description: '작업이 진행 중이며 결과가 아직 확정되지 않은 상태입니다.',
      icon: 'refresh',
    },
  }

  const allStateClasses = ['is-hover', 'is-focus', 'is-active', 'is-disabled']

  function applyState(value: string) {
    const btn = document.getElementById('demo-button') as HTMLButtonElement | null
    const link = document.getElementById('demo-link') as HTMLAnchorElement | null
    const loader = document.getElementById('demo-loader') as HTMLElement | null
    const desc = document.getElementById('interaction-state-desc')

    if (!btn || !link || !loader || !desc) return

    allStateClasses.forEach(cls => {
      btn.classList.remove(cls)
      link.classList.remove(cls)
    })

    btn.style.display = ''
    link.style.display = ''
    loader.style.display = 'none'

    if (value === 'loading') {
      btn.style.display = 'none'
      link.style.display = 'none'
      loader.style.display = ''
    } else if (value !== 'default') {
      btn.classList.add('is-' + value)
      link.classList.add('is-' + value)
    }

    const s = states[value]
    if (!s) return
    desc.setAttribute('label', s.label)
    desc.setAttribute('description', s.description)
    desc.setAttribute('icon', s.icon)
  }

  const picker = document.getElementById('interaction-state-picker')
  if (!picker) return

  picker.addEventListener('change', (e: Event) => {
    const detail = (e as CustomEvent).detail
    if (detail?.selected?.length > 0) applyState(detail.selected[0])
  })
}

function initIconIndicators() {
  const picker = document.getElementById('icon-category-picker')
  if (!picker) return

  picker.addEventListener('change', (e: Event) => {
    const detail = (e as CustomEvent).detail
    const category = detail?.selected?.[0]
    if (!category) return

    document.querySelectorAll<HTMLElement>('[id^="icon-section-"]').forEach(el => {
      el.hidden = true
    })

    const section = document.getElementById(`icon-section-${category}`)
    if (section) section.hidden = false
  })
}
