// import { removeElementClassname } from '../utils/elementUtils'

type Parameter = {
  selector: string
  // activeClassname: string
  // isClickOutbound: boolean
}

// 결국에는 부모, 혹은 도큐먼트에만 클래스 토글하는 것이 좋을까?
// 1. 하나만 토글 open/close
// 2. 형제들 토글 event.target.name , is(true) siblings.remove
// 3. 저 멀리 있는 거 토글 => panel이 다음에 오지 않을 수도 있음. 다음에 있으면 a 없으면 b. panel 지정하기
// 4. hamberger, filter, popover(dropdown)

const ACTIVE_CLASS = 'is-active'

// todo 칩은 밖을 클릭했을 때 없애면 안 됨.
// const chip = document.querySelector('.js-chip')
// const chips = chip?.querySelectorAll('button')

//   chips.forEach(element => element.addEventListener('click', () => active(element))

// function active(eTemp) {
//   chips?.forEach(element => element.classList.remove('is-active'))
//   eTemp.classList.add('is-active') // this
// }

function toggleElement({ selector: trigger }: Parameter) {
  const triggers = document.querySelectorAll(trigger)

  triggers.forEach(element =>
    element.addEventListener('click', event => {
      event.preventDefault()
      event.stopPropagation()

      const target = event.target as HTMLElement

      triggers.forEach(trigger => {
        if (target === trigger) return
        removeClassname(trigger)
      })
      toggleClassname(element)
    }),
  )

  // clickOutbound() {}
  document.addEventListener('click', () => triggers.forEach(trigger => removeClassname(trigger)))

  // if (target.classList.contains(ACTIVE_CLASS)) {}
  // const hasElementSibling = target.nodeName === target.nextElementSibling
  // target.nextElementSibling.classList.remove(ACTIVE_CLASS)
  // element.parentNode.classList.toggle(ACTIVE_CLASS)
  // const triggerNextElement = element?.nextElementSibling as HTMLElement
  // triggerNextElement.classList.toggle(ACTIVE_CLASS)
  // function resetClassname() {}
}

function toggleClassname(element) {
  element.classList.toggle(ACTIVE_CLASS)
  element.setAttribute('aria-expanded', `${element.classList.contains(ACTIVE_CLASS)}`)

  element?.nextElementSibling.addEventListener('click', event => event.stopPropagation())
}

function removeClassname(element) {
  element.classList.remove(ACTIVE_CLASS)
  element.setAttribute('aria-expanded', 'true')
}

export default toggleElement
