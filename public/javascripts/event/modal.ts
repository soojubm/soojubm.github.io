//TODO: 모달 밖의 컨텐츠에 aria-hidden 모달의 위치는 바디 안에?
//var abc = window.innerWidth - document.body.clientWidth;
// require('./modal.scss');

type Parameter = {
  selector: string
}

const modal = ({ selector: trigger }: Parameter) => ({
  initialize() {},
  modals: document.querySelectorAll<HTMLElement>(trigger),
  modalContainer: document.querySelector<HTMLElement>('#modal'),
  setEvent() {
    document.removeEventListener('click', this.backHistory)
    if (!this.modals) return

    this.modals.forEach(modal => modal.addEventListener('click', event => {
      event.stopPropagation()
      event.preventDefault()
      
      const id = modal.dataset.modal
      const uri = `/views/${id}.html`
      fetch(uri)
        .then(response => {
          if (response.ok) return response.text()
          else return Promise.reject(response)
        })
        .then(html => {
          if(!this.modalContainer) return

          const { pageYOffset } = window

          document.body.classList.remove('is-modal-visible')

          this.modalContainer.innerHTML = html
          this.setModal(pageYOffset)
          this.setHistory(id)

          const isOpened = document.body.classList.contains('is-modal-visible')
          if(isOpened) {
            document.querySelector('.js-modal-close')?.addEventListener('click', event => event.stopPropagation())
            document.querySelector('.js-modal-close')?.addEventListener('click', this.backHistory)
            document.querySelector('.modal-dim')?.addEventListener('click', this.backHistory)
            // document.addEventListener('click', this.backHistory)
          }
          // 이벤트 remove해줘야함
          document.addEventListener('keydown', event => {
            const isKeyEsc = event.keyCode === 27
            if(!isKeyEsc) return
            this.backHistory()
          })

          // document.addEventListener('click', this.backHistory)

          window.addEventListener('popstate', () => {
            if(!isOpened) return
            this.clearModal(this.modalContainer, pageYOffset)
          })

          const modalDialog = modal.querySelector<HTMLElement>('.modal-dialog')
          modalDialog?.addEventListener('click', event => event.stopPropagation())
          modalDialog?.addEventListener('click', event => event.stopPropagation())
        })
        .catch(error => console.warn('modal Error'))
      }),
    )
  },
  setModal(pageYOffset) {
    document.body.classList.add('is-modal-visible')
    document.body.classList.add('body-lock')
    document.body.style.top = `-${pageYOffset}px`
  },
  clearModal(container, pageYOffset) {
    document.body.classList.remove('is-modal-visible')
    document.body.classList.remove('body-lock')

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
  }
})

export default modal
