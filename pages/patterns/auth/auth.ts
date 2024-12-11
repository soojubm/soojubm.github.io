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
