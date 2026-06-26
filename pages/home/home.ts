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

  // 슬라이드 한 칸 = 슬라이드 폭 + 사이 간격. 항목이 하나면 폭만 사용한다.
  const step = () =>
    listItems.length > 1
      ? listItems[1].offsetLeft - listItems[0].offsetLeft
      : listItems[0].offsetWidth

  const maxScrollLeft = () => viewer.scrollWidth - viewer.clientWidth

  const syncArrows = (left = viewer.scrollLeft) => {
    prevButton.style.visibility = left <= 0 ? 'hidden' : 'visible'
    nextButton.style.visibility = left >= maxScrollLeft() ? 'hidden' : 'visible'
  }

  const scrollToOffset = (offset: number) => {
    const target = Math.max(0, Math.min(offset, maxScrollLeft()))
    viewer.scrollLeft = target
    syncArrows(target)
  }

  prevButton.addEventListener('click', () => scrollToOffset(viewer.scrollLeft - step()))
  nextButton.addEventListener('click', () => scrollToOffset(viewer.scrollLeft + step()))
  viewer.addEventListener('scroll', () => syncArrows())

  syncArrows()
  // 슬라이드 레이아웃이 확정된 직후, 이후 크기 변경 시마다 화살표 노출을 다시 계산한다.
  setTimeout(() => syncArrows())
  new ResizeObserver(() => syncArrows()).observe(listItems[0])
}
