import close from './close'

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
      const closeTrigger = nextElementSibling?.querySelector('.js-modal-close')
      pageY = window.pageYOffset
      
      showModal(nextElementSibling)

      controlHistory()
      window.onpopstate = history.onpushstate = function() {
        if(window.location.href.split('/').pop().indexOf('modal') === -1) {
          // 마지막 segment가 cards라면 모달이 아닌 리스트인 상태이어야한다.
          closeModal(nextElementSibling); // 현재의 모달을 닫는다.
        }
      }
      
      document.addEventListener('click', () => closeModal(nextElementSibling))
      closeTrigger?.addEventListener('click', () => closeModal(nextElementSibling))

    })
  )
  
  const modalDialog = document.querySelectorAll('.modal-dialog')
  modalDialog.forEach(element => element.addEventListener('click', event => event.stopPropagation()))

  function controlHistory() {
    const state = { 'page_id': 1, 'user_id': 5 }
    const title = ''
    const url = 'hello-world.html'

    history.pushState(state, title, url)
  }
  function showModal(element) {
    element?.classList.add('is-visible')
    lockBody()
  }
  function closeModal(element) {
    const isOpened = element?.classList.contains('is-visible')
    if (!isOpened) return

    element?.classList.remove('is-visible')
    unlockBody()
  }
  
  function lockBody() {
    document.body.classList.add('body-lock')
    document.body.style.top = `-${pageY}px`
  }

  function unlockBody() {
    document.body.classList.remove('body-lock')
    setScrollY(pageY)
  }

  function setScrollY(pageY) {
    window.scrollTo(0, pageY)
  }
}

export default modal
