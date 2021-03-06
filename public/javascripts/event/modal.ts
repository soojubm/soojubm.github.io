//TODO: 모달 밖의 컨텐츠에 aria-hidden 모달의 위치는 바디 안에?
//var abc = window.innerWidth - document.body.clientWidth;
// require('./modal.scss');

type Parameter = {
  selector: string
}

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

const modal = ({ selector: trigger }: Parameter) => ({
  initialize() {},
  modals: document.querySelectorAll<HTMLElement>(trigger),
  modalContainer: document.querySelector<HTMLElement>('#modal'),
  setEvent() {
    document.removeEventListener('click', this.backHistory)
    if (!this.modals) return

    this.modals.forEach(modal =>
      modal.addEventListener('click', event => {
        event.stopPropagation()
        event.preventDefault()

        const modalId = modal.dataset.modal
        const uri = `/views/${modalId}.html`
        fetch(uri).then(response => {
          if (response.ok) return response.text()
          else return Promise.reject(response)
        }).then(html => {
          if (!this.modalContainer) return

          this.modalContainer.innerHTML = html
          document.body.classList.remove('is-modal-visible')

          const { pageYOffset } = window
          this.showModal(pageYOffset)
          this.setHistory(modalId)

          const isShown = document.body.classList.contains('is-modal-visible')
          if (isShown) {
            document.querySelector('.js-modal-close')?.addEventListener('click', event => event.stopPropagation())
            document.querySelector('.js-modal-close')?.addEventListener('click', this.backHistory)
            document.querySelector('.modal-dim')?.addEventListener('click', this.backHistory)
            // document.addEventListener('click', this.backHistory)
          }
          document.addEventListener('keydown', event => {
            const isKeyEsc = event.keyCode === 27
            if (isKeyEsc) this.backHistory()
          }, true)
          // document.addEventListener('click', this.backHistory)

          window.addEventListener('popstate', () => this.clearModal(this.modalContainer, pageYOffset))
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
  setHistory(modalUrl) {
    const state = { name: 'tester' }
    const title = 'dd'
    const url = modalUrl
    history.pushState(state, title, url)
  },
  backHistory() {
    history.back()
  },
})

export default modal
