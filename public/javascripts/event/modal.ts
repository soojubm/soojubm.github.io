//var abc = window.innerWidth - document.body.clientWidth;
// require('./modal.scss');

import { pushBrowserHistory, backHistory } from '../utils/browserUtils'

type Parameter = {
  selector: string
}
type modalId = 'newneek' | 'woolf' | 'lettering' | 'etc-works' | any

// toggleClass 어떤 이벤트인지 개발자 도구로 알 수 가 없네

// 마우스로 가능한 context menus는 키보드로도 되어야
// 비모달 다이얼로그를 위해서
// 열려 있는 다이얼로그와 메인 페이지간에 포커스를 이동시킬 수 있는
// 전역 키보드 단축키가 필요하다는 점을 유의하십시오.

// ! 모달을 닫았을 때 이전 엘리먼트로 포커스
// TODO 어떤 버튼을 클릭해도 닫아야 함. (확인/취소)
// TODO 모달 밖의 컨텐츠에 aria-hidden 모달의 위치는 바디 안에?
// TODO 다이얼로그 안에서만 탭이 돌아야
// TODO 지금 라우팅에서 history를 저장할 때의 문제.
// ! spa에서 모달은 결

function modal({ selector: trigger }: Parameter) {
  const modalTriggers = document.querySelectorAll<HTMLElement>(trigger)
  const modalContainer = document.querySelector<HTMLElement>('#modal')
  // const modalDialog = modalContainer.querySelector('.modal-dialog')
  // const closeElement = modalContainer.querySelector('.js-modal-close')
  let previousActiveElement
  let previousPageYOffset

  const isOpened = document.body.classList.contains('is-modal-visible')
  //const isOutside = !event.target.closest('.modal-inner');

  modalTriggers.forEach(trigger =>
    trigger.addEventListener('click', event => {
      event.preventDefault()

      const modalId = trigger.dataset.modal
      fetchData(modalId)

      openModal()

      // window.addEventListener('popstate', closeModal)
      document.addEventListener('keydown', checkCloseDialog)

      modalContainer!.addEventListener('click', closeModalTemp)
    }),
  )

  async function fetchData(modalId: modalId) {
    try {
      const endpoint = `/views/${modalId}.html`
      const response = await fetch(endpoint)
      if (!response.ok) throw 'Something went wrong.'

      const html = await response.text()

      modalContainer!.innerHTML = html

      // pushBrowserHistory({}, '', `/#profile/modal/${modalId}`)
      previousActiveElement = document.activeElement
      // modalContainer.querySelector('button').focus()
    } catch (error) {}
  }

  function closeModalTemp(event) {
    const target = event.target as HTMLElement
    const isCloseElement = target.classList.contains('modal') || target.classList.contains('js-modal-close')
    // if (isCloseElement) backHistory()

    if (isCloseElement) closeModal()
  }

  function openModal() {
    previousPageYOffset = window.pageYOffset
    document.body.classList.add('is-modal-visible', 'lock-scroll')
    document.body.style.top = `-${previousPageYOffset}px`
  }
  function closeModal() {
    document.body.classList.remove('is-modal-visible', 'lock-scroll')

    modalContainer!.innerHTML = ''
    window.scrollTo(0, previousPageYOffset)

    previousActiveElement.focus()

    // cleanup Events
    document.removeEventListener('keydown', checkCloseDialog)
    modalContainer?.removeEventListener('click', closeModalTemp)
    // window.removeEventListener('popstate', closeModal)
  }
  function checkCloseDialog(event) {
    const isKeyEsc = event.keyCode === 27
    if (isKeyEsc) backHistory()
  }
}

// modalTriggers.forEach(modalElement =>
//   modalElement.querySelector('.card-more')?.addEventListener('click', event => {
//     event.stopPropagation()
//     event.preventDefault()
//   }),
// )

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

// <fieldset role="dialog" aria-labelledby="dialog1Title" aria-describedby="dialog1Desc">
//   <legend>
//     <span id="dialog1Title">Your personal details were successfully updated.</span>
//     <span id="dialog1Desc">You can change your details at any time in the user account section.</span>
//   </legend>

//   <button>Close</button>
// </fieldset>
