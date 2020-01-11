//TODO: 모달 밖의 컨텐츠에 aria-hidden 모달의 위치는 바디 안에?
//var abc = window.innerWidth - document.body.clientWidth;
type Parameter = {
  selector: string
}

const modal = ({ selector: trigger }) => {
  const { body } = document
  let pageY = 0
  const modals = document.querySelectorAll(trigger)
  if (!modals) return

  modals.forEach(modal =>
    modal.addEventListener('click', event => {
      event.stopPropagation()
      modal.nextElementSibling.classList.add('is-visible')
      pageY = window.pageYOffset
      setLockBody()
      document.addEventListener('click', closeModal)

      function closeModal() {
        const isOpened = modal.nextElementSibling.classList.contains('is-visible')
        if (!isOpened) return

        modal.nextElementSibling.classList.remove('is-visible')
        body.classList.remove('body-lock')
        window.scrollTo(0, pageY)
      }
    }),
  )

  const modalDialog = document.querySelectorAll('.modal-dialog')
  modalDialog.forEach(element => element.addEventListener('click', event => event.stopPropagation()))

  function setLockBody() {
    body.classList.add('body-lock')
    body.style.top = `-${pageY}px`
  }
}

export default modal
