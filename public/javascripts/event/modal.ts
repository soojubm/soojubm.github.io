//TODO: 모달 밖의 컨텐츠에 aria-hidden 모달의 위치는 바디 안에?
//var abc = window.innerWidth - document.body.clientWidth;
type Parameter = {
  selector: string
}

const modal = ({ selector: trigger }: Parameter) => ({
  initialize() {},
  modals: document.querySelectorAll<HTMLElement>(trigger),
  modalContainer: document.querySelector<HTMLElement>('#modal'),
  setEvent() {
    // require('./modal.scss');
    document.removeEventListener('click', this.backHistory)
    if (!this.modals) return

    this.modals.forEach(modal => modal.addEventListener('click', event => {
      event.stopPropagation()
      event.preventDefault()
      
      fetch(`/views/${modal.dataset.modal}.html`)
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

          document.querySelector('.js-modal-close')?.addEventListener('click', this.backHistory)

          // 이벤트 remove해줘야함
          // document.addEventListener('keydown', event => {
          //   const isKeyEsc = event.keyCode === 27
          //   if(!isKeyEsc) return
          //   this.backHistory()
          // })
          document.addEventListener('click', () => {
            if(!document.body.classList.contains('is-modal-visible')) return
            this.backHistory()
          })

          // document.addEventListener('click', this.backHistory)

          window.addEventListener('popstate', () => {
            if(!document.body.classList.contains('is-modal-visible')) return
            this.clearModal(this.modalContainer, pageYOffset)
          })

          const modalDialog = document.querySelector<HTMLElement>('.modal-dialog')
          if(!modalDialog) return
          modalDialog.addEventListener('click', event => event.stopPropagation())
        })
        .catch(error => console.warn('modal Error'))
      }),
    )
  },
  setModal(pageYOffset) {
    this.setHistory()

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
  setHistory() {
    const state = { name: 'tester' }
    const title = 'dd'
    const url = '/modal'
    history.pushState(state, title, url)
  },
  backHistory() {
    history.back()
  }
})

export default modal
