import { html, render } from 'lit'

import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import main from './index.html'
import { renderLayout } from '../../layouts/base-layouts'
import { ScrollSpyController } from '../../src/controllers/scroll-spy-controller'
import './home.css'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main, { footer: true })

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
