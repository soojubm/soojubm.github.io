import { renderDocumentLayout } from '../../../layouts/document-layout'
import main from './index.html'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderDocumentLayout(main)

  setupPlayground()
})

function setupPlayground() {
  const button = document.getElementById('playground-button')
  if (!button) return

  const bind = (id: string, apply: (value: string) => void) => {
    const control = document.getElementById(id)
    control?.addEventListener('change', event => {
      apply((event as CustomEvent<{ value: string }>).detail.value)
    })
  }

  bind('variant-control', value => button.setAttribute('variant', value))
  bind('size-control', value => button.setAttribute('size', value))
  bind('disabled-control', value => button.toggleAttribute('disabled', value === 'true'))
}
