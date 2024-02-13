//var abc = window.innerWidth - document.body.clientWidth;

import { pushBrowserHistory, backHistory } from '../utils/browserUtils'

type Parameter = {
  selector: string
}
type modalId = 'newneek' | 'woolf' | 'lettering' | 'etc-works' | any

// toggleClass 어떤 이벤트인지 개발자 도구로 알 수 가 없네

// 비모달 다이얼로그를 위해서
// 열려 있는 다이얼로그와 메인 페이지간에 포커스를 이동시킬 수 있는
// 전역 키보드 단축키가 필요하다는 점을 유의하십시오.

// ! 모달을 닫았을 때 이전 엘리먼트로 포커스
// TODO 어떤 버튼을 클릭해도 닫아야 함. (확인/취소)
// TODO 모달 밖의 컨텐츠에 aria-hidden 모달의 위치는 바디 안에?
// TODO 다이얼로그 안에서만 탭이 돌아야
// TODO 지금 라우팅에서 history를 저장할 때의 문제.

function modal({ selector: trigger }: Parameter) {
  const modalTriggers = document.querySelectorAll<HTMLElement>(trigger)
  const modalContainer = document.querySelector<HTMLElement>('#modal')
  // const modalDialog = modalContainer.querySelector('.modal-dialog')
  // const closeElement = modalContainer.querySelector('.js-modal-close')
  let previousActiveElement
  let previousPageYOffset

  // const isOpened = document.body.classList.contains('is-modal-visible')
  //const isOutside = !event.target.closest('.modal-inner');

  modalTriggers.forEach(trigger => trigger.addEventListener('click', handleTriggerClick))

  function handleTriggerClick(event) {
    event.preventDefault()
    const modalId = event.currentTarget.dataset.modal

    openModal()
    fetchData(modalId)
  }

  async function fetchData(modalId: modalId) {
    try {
      const endpoint = `/pages/patterns/profile/${modalId}.html`
      const response = await fetch(endpoint)
      const html = await response.text()

      modalContainer!.innerHTML = html
      previousActiveElement = document.activeElement
      // pushBrowserHistory({}, '', `/#profile/modal/${modalId}`)
      // modalContainer.querySelector('button').focus()
    } catch (error) {
      throw 'Something went wrong.'
    }
  }

  function closeModalTemp(event) {
    const target = event.target as HTMLElement
    const isCloseElement =
      target.classList.contains('modal') || target.classList.contains('js-modal-close')
    // if (isCloseElement) backHistory()

    if (isCloseElement) closeModal()
  }

  function openModal() {
    previousPageYOffset = window.pageYOffset || window.scrollY
    document.body.classList.add('is-modal-visible', 'lock-scroll')
    document.body.style.top = `-${previousPageYOffset}px`

    document.addEventListener('keydown', handleKeyDown)
    modalContainer!.addEventListener('click', closeModalTemp)
  }

  function closeModal() {
    document.body.classList.remove('is-modal-visible', 'lock-scroll')
    window.scrollTo(0, previousPageYOffset)
    modalContainer!.innerHTML = ''

    previousActiveElement.focus()

    document.removeEventListener('keydown', handleKeyDown)
    modalContainer?.removeEventListener('click', closeModalTemp)
  }
  function handleKeyDown(event) {
    const isKeyEsc = event.keyCode === 27 // Escape
    if (isKeyEsc) backHistory()
  }
}

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

// function handleCardButtonClick(event) {
//   const button = event.currentTarget;
//   const card = button.closest('.card');
//   // Grab the image src
//   const imgSrc = card.querySelector('img').src;
//   const desc = card.dataset.description;
//   const name = card.querySelector('h2').textContent;
//   // populate the modal with the new info
//   modalInner.innerHTML = `
//     <img  src="${imgSrc.replace('200', '600')}" alt="${name}" />
//     <p>${desc}</p>
//   `;

//   modalOuter.classList.add('open');
// }

// modalOuter.addEventListener('click', function (event) {
//   const isOutside = !event.target.closest('.modal-inner')
//   if (isOutside) {
//     closeModal()
//   }
// })

// <div class="modal">
//   <div class="modalInner">
//     <button aria-label="Previous Photo" class="prev">←</button>
//     <figure>
//       <img src="./images/kith-hoodie.jpg" />
//       <figcaption>
//         <h2>Test Title</h2>
//         <p>
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
//           dignissimos obcaecati nisi placeat eaque voluptate,
//           exercitationem eius? Non, iusto provident itaque, voluptate
//           labore a alias officia, amet sunt pariatur praesentium tenetur
//           voluptatibus dolores mollitia quasi aliquid assumenda possimus
//           maiores exercitationem!
//         </p>
//       </figcaption>
//     </figure>
//     <button class="next" aria-label="Next Photo">→</button>
//   </div>
// </div>
// if (modal.matches(".open")) {
//   console.info("Modal already open");
//   return;
// }

// function showNextImage() {
//   showImage(currentImage.nextElementSibling || gallery.firstElementChild);
// }

// function showPrevImage() {
//   showImage(currentImage.prevElementSibling || gallery.lastElementChild);
// }

// const images = Array.from(gallery.querySelectorAll('img'));
// console.log(images);

// function showImage(el) {
//   if (!el) {
//     console.info('no image to show')
//     return
//   }
//   // update the modal with this info
//   console.log(el)
// }
// images.forEach(image => image.addEventListener('click', handleImageClick));
// images.forEach(image => image.addEventListener('click', (e)=> showImage(e.currentTarget)));
// modal.querySelector('img').src = el.src;
// image:not(.active) {
//   display: none;
// }
