import main from './index.html'
import { renderDocumentLayout } from '../../../layouts/document-layout'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderDocumentLayout(main)
  initIconIndicators()
})

function initIconIndicators() {
  const picker = document.getElementById('icon-category-picker')
  if (!picker) return

  picker.addEventListener('change', (e: Event) => {
    const detail = (e as CustomEvent).detail
    const category = detail?.values?.[0]
    if (!category) return

    document.querySelectorAll<HTMLElement>('[id^="icon-section-"]').forEach(el => {
      el.hidden = true
    })

    const section = document.getElementById(`icon-section-${category}`)
    if (section) section.hidden = false
  })
}
