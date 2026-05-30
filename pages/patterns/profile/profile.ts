import { renderLayout } from '../../../layouts/base-layouts'
import { hideNavbar } from '../../../src/javascripts/common/navbar'
import setupModal from '../../../src/javascripts/event/modal'
import main from './index.html'

import './profile.css'

type PortfolioItemOpenEvent = CustomEvent<{ modal: string }>
type ViewModeChangeEvent = CustomEvent<{ mode: 'grid' | 'list' }>
type SortChangeEvent = CustomEvent<{ order: 'latest' | 'oldest' }>

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main, { closeSidebar: true })
  hideNavbar()

  const modal = setupModal()
  document.addEventListener('portfolio-item-open', event => {
    const modalId = (event as PortfolioItemOpenEvent).detail.modal
    modal.open(modalId)
  })

  document.addEventListener('view-mode-change', handleViewModeChange)
  document.addEventListener('sort-change', handleSortChange)
})

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

// {
//   name: 'button',
//   role: action',
//   description: '',
//   aka: ['string', 'string'],
//   features: [],
//   bestPractices: [],
//   props: { name: '', size: ''}
//   relatedComponents: [],
//   useCases: [],
// }
