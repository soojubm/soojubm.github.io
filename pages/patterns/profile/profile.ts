import type Sheet from '@/components/sheet/sheet'

import main from './index.html'
import { renderLayout } from '../../../layouts/base-layouts'

import './profile.css'

type PortfolioItemOpenEvent = CustomEvent<{ modal: string }>
type ViewModeEvent = CustomEvent<{ value: 'grid' | 'list' }>
type SortEvent = CustomEvent<{ value: 'latest' | 'oldest' }>

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main, { closeSidebar: true })

  setupPortfolioModal()
  document.querySelector('mm-view-mode-switcher')?.addEventListener('change', handleViewMode)
  document.querySelector('mm-sort-picker')?.addEventListener('change', handleSort)
})

/** mm-portfolio-item의 portfolio-item-open 이벤트를 mm-sheet 컴포넌트 open()에 연결한다. */
function setupPortfolioModal() {
  document.addEventListener('portfolio-item-open', event => {
    const { modal } = (event as PortfolioItemOpenEvent).detail
    const sheet = document.querySelector<Sheet>(`#sheet-${modal}`)
    sheet?.open()
  })
}

function handleViewMode(event: Event) {
  const target = event.target as HTMLElement
  const viewModeEvent = event as ViewModeEvent
  const containerElement = target.closest<HTMLElement>('.profile-body')
  const isList = viewModeEvent.detail.value === 'list'

  containerElement?.classList.toggle('list', isList)
  containerElement?.querySelectorAll('mm-grid').forEach(gridElement => {
    gridElement.setAttribute('columns', isList ? '1' : '3')
  })
}

function handleSort(event: Event) {
  const target = event.target as HTMLElement
  const sortEvent = event as SortEvent
  const containerElement = target.closest<HTMLElement>('.profile-body')

  containerElement?.querySelectorAll<HTMLElement>('mm-grid').forEach(gridElement => {
    const items = Array.from(gridElement.querySelectorAll<HTMLElement>('mm-portfolio-item'))
    items
      .sort((a, b) => {
        const aDate = Date.parse(a.getAttribute('date') ?? '')
        const bDate = Date.parse(b.getAttribute('date') ?? '')
        return sortEvent.detail.value === 'latest' ? bDate - aDate : aDate - bDate
      })
      .forEach(item => gridElement.append(item))
  })
}
