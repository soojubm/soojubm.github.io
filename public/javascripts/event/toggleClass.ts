// import { removeElementClassname } from '../utils/elementUtils'

type Parameter = {
  selector: string
  // activeClassname: string
}

// 결국에는 부모, 혹은 도큐먼트에만 클래스 토글하는 것이 좋다.
// 이벤트 위임 활용하자.

//  심하면 디버깅이 어렵고 이벤트 제거가 어려우 ㄴ듯.

// 1. 하나만 토글
// 2. 형제들 토글 event.target.name , is(true) siblings.remove
// 3. 저 멀리 있는 거 토글
// 4. accordion, hamberger, filter,
// 아코디언 타겟만 열고 다른 거 닫는 경우가 있고 클릭할 때 마다 닫는 경우가 있다.
// 버튼만 클릭할 수도 있고 전체 박스를 클릭할 수도 있다.

// 다른 클래스를 닫게 하려면 하나로 써야..

function toggleClass({ selector: trigger }: Parameter) {
  const triggers = document.querySelectorAll(trigger)
  if (!triggers) return

  const ACTIVE_CLASS = 'is-active'

  triggers.forEach(element =>
    element.addEventListener('click', event => {
      event.preventDefault()
      event.stopPropagation()

      const target = event.target as HTMLElement

      if (target.classList.contains(ACTIVE_CLASS)) {
      }

      triggers.forEach(trigger => {
        if (target === trigger) return
        removeElementClassname(trigger)
      })

      toggle(element)

      // refector: for 5번 도는..
      // clickEventTarget이 아닌
      // triggers.forEach(trigger => {
      //   const isSelf = event.target === trigger

      //   console.log(event.target)

      //   if (isSelf) return

      //   removeElementClassname(trigger)
      // })
    }),
  )

  document.body.addEventListener('click', reset)

  function toggleClassname(element) {
    element.classList.toggle(ACTIVE_CLASS)

    // if (event?.target.closest('.test')) {
    //   event.target.classList.toggle(ACTIVE_CLASS)
    // }

    // const target = event.target
    // const hasElementSibling = target.nodeName === target.nextElementSibling
    // hasElementSibling && target.nextElementSibling.classList.remove(ACTIVE_CLASS)
  }

  function reset() {
    triggers.forEach(trigger => removeElementClassname(trigger))
  }

  function toggle(element) {
    element.setAttribute('aria-expanded', `${element.classList.contains(ACTIVE_CLASS)}`)
    element.classList.toggle(ACTIVE_CLASS)
    // element.parentNode.classList.toggle(ACTIVE_CLASS)

    const triggerNextElement = element?.nextElementSibling as HTMLElement
    triggerNextElement.classList.toggle(ACTIVE_CLASS)

    console.log('@@@@', element.nodeName, element.nextElementSibling)

    triggerNextElement.addEventListener('click', event => event.stopPropagation())
  }
  function removeElementClassname(element) {
    element.classList.remove(ACTIVE_CLASS)

    const triggerNextElement = element?.nextElementSibling as HTMLElement
    triggerNextElement.classList.remove(ACTIVE_CLASS)
    // element.parentNode.classList.remove(ACTIVE_CLASS)
    element.setAttribute('aria-expanded', 'true')
  }
  // clickOutbound() {},
}

export default toggleClass
