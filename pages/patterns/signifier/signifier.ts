import { renderDocumentLayout } from '../../../layouts/document-layout'
import main from './index.html'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderDocumentLayout(main)
  initInteractionStateDemo()
  initIconIndicators()
})

function initInteractionStateDemo() {
  const allStateClasses = ['is-hover', 'is-focus', 'is-active', 'is-disabled']

  function applyState(value: string) {
    const btn = document.getElementById('demo-button') as HTMLButtonElement | null
    const link = document.getElementById('demo-link') as HTMLAnchorElement | null
    const loader = document.getElementById('demo-loader') as HTMLElement | null

    if (!btn || !link || !loader) return

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
    } else {
      btn.classList.add('is-' + value)
      link.classList.add('is-' + value)
    }
  }

  const picker = document.getElementById('interaction-state-picker')
  if (!picker) return

  applyState('hover')

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
