import footer from '/public/components/footer/footer.html'
import navbar from '/public/components/navbar/navbar.html'

import main from './post.html'
import './post.css'

import '/public/stylesheets/shared.css'
import '/pages/components/components.css'

document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('beforeend', navbar)
  document.body.insertAdjacentHTML('beforeend', main)
  document.body.insertAdjacentHTML('beforeend', footer)

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
