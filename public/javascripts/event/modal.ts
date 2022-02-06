//TODO: 모달 밖의 컨텐츠에 aria-hidden 모달의 위치는 바디 안에?
//var abc = window.innerWidth - document.body.clientWidth;
// require('./modal.scss');

import { pushBrowserHistory } from '../utils/browserUtils'

type Parameter = {
  selector: string
}

// 각각에 이벤트를 건다면, forEach로 걸기?
// modalClose가 여러개.
// 어떤 버튼을 클릭해도 닫아야 함.
// 페이지 / 다이얼로그

// 라우팅 될 때 마다 실행이 되니까.

// toggleClass 어떤 이벤트인지 개발자 도구로 알 수 가 없네

// 확인버튼에 포커스, 혹은 입력필드에 포커스
// 닫았을 때 이전 포커스
// 다이얼로그 안에서만 탭이 돌아야
// 마우스로 가능한 context menus는 키보드로도 되어야
// 비모달 다이얼로그를 위해서 열려 있는 다이얼로그와 메인 페이지간에 포커스를 이동시킬 수 있는 전역 키보드 단축키가 필요하다는 점을 유의하십시오.

function modal({ selector: trigger }: Parameter) {
  const modalTriggers = document.querySelectorAll<HTMLElement>(trigger)
  const modalContainer = document.querySelector<HTMLElement>('#modal')
  // const modalDialog = modalContainer.querySelector('.modal-dialog')
  // const closeElement = modalContainer.querySelector('.js-modal-close')
  let previousActiveElement
  let previousPageYOffset

  if (!modalTriggers || !modalContainer) return

  modalTriggers.forEach(modalTrigger =>
    modalTrigger.addEventListener('click', event => {
      event.preventDefault()

      fetchData(modalTrigger)
      openModal(window.pageYOffset)

      // 모달이 열려 있을 때만
      document.addEventListener('keydown', checkCloseDialog)
      window.addEventListener('popstate', closeModal)
      modalContainer?.addEventListener('click', temp)
    }),
  )

  //const isOutside = !event.target.closest('.modal-inner');
  async function fetchData(modalTrigger: any) {
    try {
      const modalId = modalTrigger.dataset.modal
      const endpoint = `/views/${modalId}.html`
      const response = await fetch(endpoint)
      if (!response.ok) throw 'Something went wrong.'

      const html = await response.text()

      modalContainer!.innerHTML = html
      previousActiveElement = document.activeElement
      // todo
      pushBrowserHistory({}, '', `/#profile/${modalId}`)

      // modalContainer.querySelector('button').focus()
    } catch (error) {}
  }

  function temp(event) {
    // modalContainer!.innerHTML = ''
    const target = event.target as HTMLElement
    if (target.classList.contains('modal')) backHistory()
    if (target.classList.contains('js-modal-close')) backHistory()
  }

  function openModal(pageYOffset) {
    document.body.classList.add('is-modal-visible', 'body-lock')
    document.body.style.top = `-${pageYOffset}px`
  }

  function closeModal() {
    // cleanup Events
    document.removeEventListener('keydown', checkCloseDialog)
    modalContainer?.removeEventListener('click', temp)
    window.removeEventListener('popstate', closeModal)

    document.body.classList.remove('is-modal-visible', 'body-lock')

    modalContainer!.innerHTML = ''
    window.scrollTo(0, window.pageYOffset)

    // previousActiveElement.focus()
  }

  function checkCloseDialog(event) {
    const isKeyEsc = event.keyCode === 27
    if (isKeyEsc) backHistory()
  }

  function backHistory() {
    history.back()
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
