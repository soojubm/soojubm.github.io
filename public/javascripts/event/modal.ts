//TODO: 모달 밖의 컨텐츠에 aria-hidden 모달의 위치는 바디 안에?
//var abc = window.innerWidth - document.body.clientWidth;
// require('./modal.scss');

import { pushBrowserHistory } from '../utils/browserUtils'

type Parameter = {
  selector: string
}


const modal = ({ selector: trigger }: Parameter) => ({
  modalTriggers: document.querySelectorAll<HTMLElement>(trigger),
  modalContainer: document.querySelector<HTMLElement>('#modal'),
  initialize() {
    if (!this.modalTriggers) return

    document.removeEventListener('click', this.backHistory)

    this.modalTriggers.forEach(modalElement => 
      modalElement.querySelector('.card-more')?.addEventListener('click', event => {
        event.stopPropagation()
        event.preventDefault()
      })
    )

    this.modalTriggers.forEach(modalElement =>
      modalElement.addEventListener('click', event => {
        event.stopPropagation()
        event.preventDefault()


        // event target
        console.log('ttt', event.target, modalElement)
        const modalId = modalElement.dataset.modal
        const uri = `/views/${modalId}.html`
        // const response = await fetch(uri)
        fetch(uri).then(response => {
          if (response.ok) return response.text()
          else return Promise.reject(response)
        }).then(html => {
          if (!this.modalContainer) return

          this.modalContainer.innerHTML = html
          this.showModal(window.pageYOffset)
          pushBrowserHistory({}, '', modalId)

          const isShown = document.body.classList.contains('is-modal-visible')
          if(!isShown) return

          const closeElement = this.modalContainer.querySelector('.js-modal-close')
          // const dimElement = this.modalContainer.querySelector('.modal-dim')

          closeElement?.addEventListener('click', event => event.stopPropagation())
          this.modalContainer?.querySelector('.modal-dialog')?.addEventListener('click', event => event.stopPropagation())
          closeElement?.addEventListener('click', this.backHistory)
          this.modalContainer.addEventListener('click', this.backHistory)
          // dimElement?.addEventListener('click', this.backHistory)

          window.addEventListener('popstate', () => this.clearModal(this.modalContainer, pageYOffset))
          document.addEventListener('keydown', event => {
            const isKeyEsc = event.keyCode === 27
            if (isKeyEsc) this.backHistory()
          }, true)
          
        }).catch(error => console.warn('modal Error'))
      }),
    )
  },
  showModal(pageYOffset) {
    document.body.classList.add('is-modal-visible')
    document.body.classList.add('body-lock') // todo import 
    document.body.style.top = `-${pageYOffset}px`
  },
  clearModal(container, pageYOffset) {
    document.body.classList.remove('is-modal-visible')
    document.body.classList.remove('body-lock')  // todo import 

    container.innerHTML = ''
    window.scrollTo(0, pageYOffset)
  },
  backHistory() {
    history.back()
  },
})

export default modal






const getOptions = data => {
  return {
    method: 'POST',
    body: JSON.stringify(data || {}),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }
}

const getData = (url, data) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then(response => {
    if (response.ok) return response.json()
    return Promise.reject(response)
  })
}