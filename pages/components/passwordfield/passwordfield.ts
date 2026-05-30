import { renderDocumentLayout } from '../../../layouts/document-layout'
// import main from './index.html'

// document.addEventListener('DOMContentLoaded', () => {
//   document.body.innerHTML = renderDocumentLayout(main)
// })

document.addEventListener('DOMContentLoaded', () => {
  const passwordTest = document.querySelector('.js-password-test')
  passwordTest?.addEventListener('keyup', validatePasswordTest)

  function validatePasswordTest(event) {
    const { value } = event.target

    const bodyElement = document.body

    bodyElement.classList.toggle('is-valid1', value.length > 12 && value.length < 18)
    // 영문소문자/영문대문자/숫자포함
    bodyElement.classList.toggle('is-valid2', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(value))

    bodyElement.classList.toggle(
      'is-valid3',
      /[!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]/g.test(value),
    )
    // 동일한 문자 6개 연속
    bodyElement.classList.toggle(
      'is-valid4',
      /([A-Za-z0-9`~!@#\$%\^&\*\(\)\{\}\[\]\-_=\+\\|;:'"<>,\./\?])\1{5,}/g.test(value),
    )
  }

  document.addEventListener('click', revealPassword)
  function revealPassword(event) {
    const targetElement = event.target.closest('.js-view-password') as any
    if (!targetElement) return

    const inputElement = targetElement.parentNode.querySelector('input')
    const isPasswordType = inputElement.getAttribute('type') === 'password'
    const inputType = isPasswordType ? 'text' : 'password'

    inputElement.setAttribute('type', inputType)
  }
})
