import './dashboard.css'

import main from './index.html'
import { renderLayout } from '../../../layouts/base-layouts'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main)
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
