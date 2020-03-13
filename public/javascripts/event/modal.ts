import close from './close'

//TODO: 모달 밖의 컨텐츠에 aria-hidden 모달의 위치는 바디 안에?
//var abc = window.innerWidth - document.body.clientWidth;
type Parameter = {
  selector: string
}

const modal = ({ selector: trigger }: Parameter) => ({
  modals: document.querySelectorAll(trigger),
  modalDialog: document.querySelector('.modal-dialog'),
  pageY: 0,
  setEvent() {
    if (!this.modals) return

    this.modals.forEach(modal =>
      modal.addEventListener('click', event => {
        event.stopPropagation()
        event.preventDefault()

        const { nextElementSibling } = modal
        const closeTrigger = nextElementSibling?.querySelector('.js-modal-close')
        if(!nextElementSibling || !closeTrigger) return

        this.pageY = window.pageYOffset

        this.showModal(nextElementSibling)
        document.addEventListener('click', () => this.closeModal(nextElementSibling))
        closeTrigger?.addEventListener('click', () => this.closeModal(nextElementSibling))
        // window.onpopstate = history.onpushstate = function(e) {
        //   const isModal = window.location.href.split('/').pop().indexOf('modal') === -1
        //   if(isModal) {
        //     this.closeModal(nextElementSibling);
        //   }
        // }

        // window.addEventListener('popstate', function(event) {
        //   if (history.state && history.state.id === 'modal') {
        //     alert()
        //     closeModal(nextElementSibling);
        //   }
        // }, false);
      })
    )
    this.modalDialog?.addEventListener('click', event => event.stopPropagation())
  },
  showModal(element) {
    element?.classList.add('is-visible')
    this.lockBody(this.pageY)
  },
  closeModal(element) {
    const isOpened = element?.classList.contains('is-visible')
    if (!isOpened) return

    element?.classList.remove('is-visible')
    this.unlockBody(this.pageY)
    // window.history.back()
  },
  lockBody(pageY) {
    document.body.classList.add('body-lock')
    document.body.style.top = `-${pageY}px`
  },
  unlockBody(pageY) {
    document.body.classList.remove('body-lock')
    window.scrollTo(0, pageY)
  }
})

export default modal
