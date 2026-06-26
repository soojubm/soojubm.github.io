import { renderLayout } from '../../layouts/base-layouts'
import main from './index.html'
import './home.css'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main, { footer: true })

  setupCarousel()
})

function setupCarousel() {
  const container = document.querySelector<HTMLElement>('.js-carousel')
  if (!container) return

  const viewer = container.querySelector<HTMLElement>('.js-carousel-viewer')
  const listItems = container.querySelectorAll<HTMLElement>('.js-carousel-viewer > *')
  const prevButton = container.querySelector<HTMLElement>('.js-carousel-prev')
  const nextButton = container.querySelector<HTMLElement>('.js-carousel-next')

  if (!viewer || !listItems.length || !prevButton || !nextButton) return

  const displayPrevButton = (value: 'flex' | 'none') => {
    prevButton.style.display = value
  }

  const toPrev = () => {
    viewer.scrollLeft -= listItems[0].offsetWidth
  }
  const toNext = () => {
    viewer.scrollLeft += listItems[0].offsetWidth
  }
  const scroll = () => {
    displayPrevButton(viewer.scrollLeft === 0 ? 'none' : 'flex')
  }

  prevButton.addEventListener('click', toPrev)
  nextButton.addEventListener('click', toNext)
  viewer.addEventListener('scroll', scroll)

  scroll()
}
