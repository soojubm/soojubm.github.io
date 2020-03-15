// @ts-ignore

//TODO: 모달 밖의 컨텐츠에 aria-hidden 모달의 위치는 바디 안에?
//var abc = window.innerWidth - document.body.clientWidth;
type Parameter = {
  selector: string
}

const modal = ({ selector: trigger }: Parameter) => ({
  // init(element) {
  //   if(!element) throw Error('element')
  // },
  modals: document.querySelectorAll(trigger),

  setEvent() {
    if (!this.modals) return

    this.modals.forEach(modal =>
      modal.addEventListener('click', event => {
        event.stopPropagation()
        event.preventDefault()

        const { nextElementSibling } = modal
        const closeTrigger = nextElementSibling?.querySelector('.js-modal-close')
        if(!nextElementSibling || !closeTrigger) return

        const { pageYOffset } = window

        this.showModal(nextElementSibling, pageYOffset)
        closeTrigger.addEventListener('click', this.backHistory)

        const state = { name: 'tester' }
        const title = 'dd'
        const url = 'modal'
        history.pushState(state, title, url)

        window.addEventListener('popstate', () => {
          this.closeModal(nextElementSibling, pageYOffset)
        });
        document.addEventListener('click', this.backHistory)
      })
    )
    const modalDialog = document.querySelectorAll('.modal-dialog')
    modalDialog.forEach(element => {
      element.addEventListener('click', event => event.stopPropagation())
    })
  },
  backHistory() {
    history.back()
  },
  showModal(element, pageYOffset) {
    element?.classList.add('is-visible')
    this.lockBody(pageYOffset)
  },
  closeModal(element, pageYOffset) {
    const isOpened = element.classList.contains('is-visible')
    if (!isOpened) return

    element.classList.remove('is-visible')
    this.unlockBody(pageYOffset)
  },
  lockBody(pageYOffset) {
    document.body.classList.add('body-lock')
    document.body.style.top = `-${pageYOffset}px`
  },
  unlockBody(pageYOffset) {
    document.body.classList.remove('body-lock')
    window.scrollTo(0, pageYOffset)
  }
})

export default modal
