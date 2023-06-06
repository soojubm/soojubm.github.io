window.addEventListener('orientationChange', () => console.log('orientatoinChange'))
window.addEventListener('load', () => console.log('loaded!'))
window.addEventListener('beforeunload', () => '저장되지 않은 변경사항이 있습니다. 정말 페이지를 떠나실 건 가요?')

// `unload` 이벤트는 안정적으로 실행되지 않으며 이 이벤트를 리스닝하면 뒤로-앞으로 캐시와 같은 브라우저 최적화 기능을 사용하지 못할 수 있습니다. `pagehide` 또는 `visibilitychange` 이벤트를 대신 사용하세요. 자세히 알아보기
// window.addEventListener('unload', () => console.log('unload event'))
// https://web.dev/bfcache/?utm_source=lighthouse&utm_medium=devtools#never-use-the-unload-event

document.addEventListener('readystatechange', () => console.log(document.readyState))

// 2222.02.02 menu에서 제거 navbar-menu-item has-submenu js-hover-trigger
function mouseenterElement(event) {
  // mouseover 버블링.closest.여러번실행 / mouseenter 한번실행.closestdksehla
  const ACTIVE_CLASSNAME = 'is-active'
  const targetElement = event.target.closest('.js-hover-trigger')

  // todo hoverelement
  // todo mouseout vs else
  if (targetElement) {
    targetElement.setAttribute('aria-expanded', 'true')
    document.body.classList.add(ACTIVE_CLASSNAME)
  } else {
    if (!document.body.classList.contains(ACTIVE_CLASSNAME)) return
    // hoverElement?.setAttribute('aria-expanded', 'true')
    document.body.classList.remove(ACTIVE_CLASSNAME)
  }
}

let currentPage = 1
const DATA_PER_PAGE = 10
const lastPage = 10

function fetchData(currentPage) {
  const list = document.querySelector('.footer')
  if (!list) return

  for (let i = (currentPage - 1) * DATA_PER_PAGE + 1; i <= currentPage * DATA_PER_PAGE; i++) {
    const li = document.createElement('li')
    li.textContent = `${currentPage}페이지 : ${i}번째 데이터`
    list.appendChild(li)
  }
}

class Body {
  bodyElement: HTMLBodyElement | null

  constructor(selector) {
    this.bodyElement = document.querySelector(selector)
  }

  getElement() {
    console.log(this.bodyElement)
  }

  toggleClass(classNames) {
    this.bodyElement?.classList.toggle(classNames)
  }
}

const test1 = new Body('body')
// console.log('@@@@@', test1.getElement())
// test1.toggleClass('fuck')
