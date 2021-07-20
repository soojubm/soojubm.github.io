// import { removeElementClassname } from '../utils/elementUtils'

type Parameter = {
  selector: string
  // activeClassname: string
}

// 결국에는 부모, 혹은 도큐먼트에만 클래스 토글하는 것이 좋다.
// 이벤트 위임 활용하자.

// 모듈화가 심하면 디버깅이 어렵고 이벤트 제거가 어려우 ㄴ듯.

// 1. 하나만 토글
// 2. 형제들 토글 event.target.name , is(true) siblings.remove
// 3. 저 멀리 있는 거 토글
// 4. accordion, hamberger, filter,
// 아코디언 타겟만 열고 다른 거 닫는 경우가 있고 클릭할 때 마다 닫는 경우가 있다.
// 버튼만 클릭할 수도 있고 전체 박스를 클릭할 수도 있다.

function toggleClass({ selector: trigger }: Parameter) {
  const triggers = document.querySelectorAll(trigger)
  // const activeClassname = 'is-active'
  const ACTIVE_CLASS = 'is-active'

  let isHamburgerClicked

  if (!triggers) return

  triggers.forEach(element =>
    element.addEventListener('click', event => {
      event.preventDefault()
      // event.stopPropagation()

      toggle(element)
      // refector: for 5번 도는..
      // clickEventTarget이 아닌
      // triggers.forEach(trigger => {
      const isSelf = event.target === element
      if (isSelf) return

      removeElementClassname(element)
      // })
    }),
  )

  // clickOutbound
  // document.addEventListener('click', event => {
  //   triggers.forEach(element => {
  //     console.log(element)
  //     const element2 = <Element>element.parentNode
  //     if (element2.classList.contains('is-active')) {
  //       // alert()
  //     }

  //     const target = event.target as HTMLElement

  //     if (element.contains(target)) return
  //     reset()
  //   })
  // })
  // console.log('event target is: ', event.target, )
  // isHamburgerClicked = false,
  // }

  // document.addEventListener('mousedown', handleClickOutside)

  // document.body.addEventListener('click', reset)

  function reset() {
    triggers.forEach(trigger => removeElementClassname(trigger))
  }

  function toggle(element) {
    element.setAttribute('aria-expanded', `${element.classList.contains(ACTIVE_CLASS)}`)
    element.parentNode.classList.toggle(ACTIVE_CLASS)

    // const triggerNextElement = element?.nextElementSibling as HTMLElement
    // triggerNextElement.addEventListener('click', event => event.stopPropagation())
  }
  function removeElementClassname(element) {
    element.parentNode.classList.remove(ACTIVE_CLASS)
    element.setAttribute('aria-expanded', 'true')
  }
  // clickOutbound() {},
}

export default toggleClass
