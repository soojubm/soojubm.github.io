import './checkout.css'
import main from './index.html'
import { renderLayout } from '../../../layouts/base-layouts'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main, { closeSidebar: true })
})

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
