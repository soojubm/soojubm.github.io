import { renderLayout } from '../../../layouts/base-layouts'
import main from './index.html'

interface MenuItemRadioGroupChangeDetail {
  value: string
  name: string
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main)

  const radioGroup = document.querySelector<HTMLElement>('#theme-group')

  radioGroup?.addEventListener('change', event => {
    const { value } = (event as CustomEvent<MenuItemRadioGroupChangeDetail>).detail
    document.body.classList.toggle('dark-mode', value === 'dark')
  })
})
