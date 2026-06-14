import { renderLayout } from '../../../layouts/base-layouts'
import { hideNavbar } from '../../../src/utils/navbar'
import main from './index.html'
import type Sheet from '../../../src/components/sheet/sheet'

import './profile.css'

type PortfolioItemOpenEvent = CustomEvent<{ modal: string }>
type ViewModeChangeEvent = CustomEvent<{ mode: 'grid' | 'list' }>
type SortChangeEvent = CustomEvent<{ order: 'latest' | 'oldest' }>

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main, { closeSidebar: true })
  hideNavbar()

  setupPortfolioModal()
  document.addEventListener('view-mode-change', handleViewModeChange)
  document.addEventListener('sort-change', handleSortChange)
})

/** mm-portfolio-item의 portfolio-item-open 이벤트를 mm-sheet 컴포넌트 open()에 연결한다. */
function setupPortfolioModal() {
  document.addEventListener('portfolio-item-open', event => {
    const { modal } = (event as PortfolioItemOpenEvent).detail
    const sheet = document.querySelector<Sheet>(`#sheet-${modal}`)
    sheet?.open()
  })
}

function handleViewModeChange(event: Event) {
  const target = event.target as HTMLElement
  const viewModeEvent = event as ViewModeChangeEvent
  const containerElement = target.closest<HTMLElement>('.profile-body')
  containerElement?.classList.toggle('list', viewModeEvent.detail.mode === 'list')
}

function handleSortChange(event: Event) {
  const target = event.target as HTMLElement
  const sortEvent = event as SortChangeEvent
  const containerElement = target.closest<HTMLElement>('.profile-body')

  containerElement?.querySelectorAll<HTMLElement>('.portfolio-grid').forEach(gridElement => {
    const items = Array.from(gridElement.querySelectorAll<HTMLElement>('mm-portfolio-item'))
    items
      .sort((a, b) => {
        const aDate = Date.parse(a.getAttribute('date') ?? '')
        const bDate = Date.parse(b.getAttribute('date') ?? '')
        return sortEvent.detail.order === 'latest' ? bDate - aDate : aDate - bDate
      })
      .forEach(item => gridElement.append(item))
  })
}
