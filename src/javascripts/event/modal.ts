type Parameter = {
  selector?: string
}

type ModalId = string

export type ModalController = ReturnType<typeof createModalController>

export function createModalController() {
  const modalContainer = getModalContainer()
  let previousActiveElement: HTMLElement | null
  let previousPageYOffset: number | null

  function getModalContainer() {
    const existingContainer = document.querySelector<HTMLElement>('#modal')
    if (existingContainer) return existingContainer

    const container = document.createElement('aside')
    container.id = 'modal'
    document.body.append(container)
    return container
  }

  function connect(selector: string) {
    const modalTriggers = document.querySelectorAll<HTMLElement>(selector)
    modalTriggers.forEach(trigger => trigger.addEventListener('click', handleTriggerClick))
  }

  function handleTriggerClick(event: MouseEvent) {
    event.preventDefault()
    const trigger = event.currentTarget as HTMLElement
    const modalId = trigger.dataset.modal || trigger.getAttribute('modal')
    if (modalId) open(modalId)
  }

  async function open(modalId: ModalId) {
    try {
      openShell()
      const endpoint = `/pages/patterns/profile/${modalId}.html`
      const response = await fetch(endpoint)
      if (!response.ok) throw new Error(`Failed to load ${endpoint}`)
      const html = await response.text()

      modalContainer.innerHTML = html
      previousActiveElement = document.activeElement as HTMLElement
    } catch (error) {
      console.error('Error fetching modal data:', error)
      close()
    }
  }

  function closeModalTemp(event: MouseEvent) {
    const target = event.target as HTMLElement
    const path = event.composedPath()

    const isClickOutsideModal = target.classList.contains('modal') // 모달 외부 클릭 여부
    const isModalCloseElement = target.classList.contains('js-modal-close') // 닫기 버튼 클릭 여부
    const isClickOutsideSheet = target.localName === 'mm-sheet'
    const hasSheetHeader = path.some(
      element => element instanceof HTMLElement && element.localName === 'mm-sheet-header',
    )
    const hasCloseButton = path.some(
      element =>
        element instanceof HTMLButtonElement && element.getAttribute('aria-label') === '닫기',
    )
    const isSheetCloseElement = hasSheetHeader && hasCloseButton

    if (isClickOutsideModal || isModalCloseElement || isClickOutsideSheet || isSheetCloseElement) {
      close()
    }
  }

  function openShell() {
    previousPageYOffset = window.pageYOffset || window.scrollY
    document.body.classList.add('is-modal-visible', 'lock-scroll')
    document.body.style.top = `-${previousPageYOffset}px`

    document.addEventListener('keydown', handleKeyDown)
    modalContainer.addEventListener('click', closeModalTemp)
    modalContainer.addEventListener('sheetclose', close)
  }

  function close() {
    document.body.classList.remove('is-modal-visible', 'lock-scroll')
    if (previousPageYOffset !== null) {
      window.scrollTo(0, previousPageYOffset)
    }
    modalContainer.innerHTML = ''

    previousActiveElement?.focus()

    document.removeEventListener('keydown', handleKeyDown)
    modalContainer.removeEventListener('click', closeModalTemp)
    modalContainer.removeEventListener('sheetclose', close)
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      close()
    }
  }

  return { connect, open, close }
}

function setupModal({ selector }: Parameter = {}) {
  const controller = createModalController()
  if (selector) controller.connect(selector)
  return controller
}

export default setupModal

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

//   const isOutside = !event.target.closest('.modal-inner')

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
