import footer from '/public/components/footer/footer.html'
import navbar from '/public/components/navbar/navbar.html'

import main from './auth.html'
import '/public/stylesheets/pages/authentication.css'

import '/public/stylesheets/shared.css'
import '/pages/components/components.css'

document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('beforeend', navbar)
  document.body.insertAdjacentHTML('beforeend', main)
  document.body.insertAdjacentHTML('beforeend', footer)

  // function createCustomer() {
  //   let billingEmail = document.querySelector('#email')?.value as HTMLElement
  //   return fetch('/create-customer', {
  //     method: 'post',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       email: billingEmail,
  //     }),
  //   })
  //     .then(response => {
  //       return response.json()
  //     })
  //     .then(result => {
  //       // result.customer.id is used to map back to the customer object
  //       // result.setupIntent.client_secret is used to create the payment method
  //       return result
  //     })
  // }
  let signupForm = document.getElementById('signup-form')
  // signupForm.addEventListener('submit', function (evt) {
  //   evt.preventDefault()
  //   // Create Stripe customer
  //   createCustomer().then(result => {
  //     customer = result.customer
  //   })
  // })

  // event.error.message
  const validations = {
    length: false,
  }

  const bodyElement = document.body

  const passwordTest = document.querySelector('.js-password-test')
  passwordTest?.addEventListener('keyup', validatePasswordTest)

  function validatePasswordTest(event) {
    const { value } = event.target

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

  // alert(formatPhoneNumber('010-3121-7045'))
})

// stripe dash
function formatPhoneNumber(number: string) {
  let update = ''
  for (var i = 0; i < number.length; i++) {
    var changed = number.charAt(i).replace('-', '')
    update += changed
  }
  return update
}

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
