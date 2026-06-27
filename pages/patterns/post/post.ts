import './post.css'

import { renderLayout } from '../../../layouts/base-layouts'
import { hideNavbar } from '@/utils/navbar'
import main from './index.html'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main, { closeSidebar: true })
})

document.addEventListener('DOMContentLoaded', () => {
  hideNavbar()

  function scrollProgress() {
    const containerElement = document.querySelector<HTMLElement>('.post')
    const progressBar = document.querySelector<HTMLElement>('.post-head-progress')
    if (!containerElement || !progressBar) return

    const scrollPercent = `${
      (window.pageYOffset / (containerElement.scrollHeight - window.innerHeight)) * 100
    }%`
    progressBar.style.width = scrollPercent
  }

  function focusComment() {
    const commentWrite = document.querySelector<HTMLElement>('.js-comment-write')
    const commentTextfield = document.querySelectorAll<HTMLElement>('.js-comment-textfield')
    if (!commentWrite || !commentTextfield) return

    commentTextfield.forEach(element =>
      element.addEventListener('focus', () => commentWrite.classList.add('is-focused')),
    )
  }
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
