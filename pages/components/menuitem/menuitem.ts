import main from './index.html'
import { renderDocumentLayout } from '../../../layouts/document-layout'

interface MenuItemRadioGroupChangeDetail {
  value: string
  name: string
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderDocumentLayout(main)

  const radioGroup = document.querySelector<HTMLElement>('#theme-group')

  radioGroup?.addEventListener('change', event => {
    const { value } = (event as CustomEvent<MenuItemRadioGroupChangeDetail>).detail
    document.body.classList.toggle('dark-mode', value === 'dark')
  })
})
