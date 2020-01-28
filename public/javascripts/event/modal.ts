//TODO: 모달 밖의 컨텐츠에 aria-hidden 모달의 위치는 바디 안에?
//var abc = window.innerWidth - document.body.clientWidth;
type Parameter = {
  selector: string
}

const modal = ({ selector: trigger }: Parameter) => {
  const modals = document.querySelectorAll(trigger)
  if (!modals) return

  let pageY = 0

  modals.forEach(modal =>
    modal.addEventListener('click', event => {
      event.stopPropagation()
      event.preventDefault()

      const { nextElementSibling } = modal
      pageY = window.pageYOffset
      
      nextElementSibling?.classList.add('is-visible')
      setLockBody()
      
      document.addEventListener('click', closeModal)
      nextElementSibling?.querySelector('.js-modal-close')?.addEventListener('click', closeModal)

      function closeModal() {
        const isOpened = nextElementSibling?.classList.contains('is-visible')
        if (!isOpened) return

        nextElementSibling?.classList.remove('is-visible')
        setUnlockBody()
      }
    })
  )

  const modalDialog = document.querySelectorAll('.modal-dialog')
  modalDialog.forEach(element => element.addEventListener('click', event => event.stopPropagation()))

  function setLockBody() {
    document.body.classList.add('body-lock')
    document.body.style.top = `-${pageY}px`
  }

  function setUnlockBody() {
    document.body.classList.remove('body-lock')
    window.scrollTo(0, pageY)
  }
}

export default modal
