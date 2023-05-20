import { pushBrowserHistory } from './utils/browserUtils'
type routeType = {
  name: string
  path: string
}
export const routes = [
  { name: '디자인시스템', path: '/' },
  { name: '홈', path: '/home' },
  { name: '소개', path: '/about' },
  { name: '디자인시스템', path: '/design' },
  { name: '컴포넌트', path: '/components' },

  { name: '사용자프로필', path: '/profile' },
  { name: '포스트', path: '/post' },
  { name: '영화', path: '/cake' },
  { name: '상품명', path: '/product' },
  { name: '주문서', path: '/checkout' },

  { name: '로그인', path: '/login' },
  { name: '회원가입', path: '/signup' },
  { name: '비밀번호찾기', path: '/forgot' },
  { name: '설정', path: '/setting' },
]

const currentPath = window.location.pathname

const routePage = async () => {
  let currentPath = window.location.hash.substring(1) // fast than .replace('#', '')
  let uri = currentPath ? `/views/${currentPath}.html` : '/views/design.html'

  // const navigators = document.querySelectorAll('.navbar-menu a')
  // navigators.forEach(navigator => {
  //   navigator.addEventListener('click', event => {
  //     let currentPath
  //     // event.preventDefault()
  //     if (event.target instanceof HTMLAnchorElement) {
  //       console.log('navigator', event.target.getAttribute('href')!.substring(1), uri)
  //       currentPath = event.target.getAttribute('href')!.substring(1)
  //     }

  //     window.history.pushState(undefined, '타이틀', `/${currentPath}`)
  //   })
  // })

  try {
    const page = await fetchPage(uri)
    renderPage(page)
  } catch (error) {
    console.warn('router: ', error)
  }
}

export async function fetchPage(uri) {
  const response = await fetch(uri)
  if (!response.ok) throw 'Something went wrong.'

  const html = await response.text()
  return html
}

function renderPage(content) {
  const view = document.querySelector('#view')
  if (!view) return

  view.innerHTML = content
  // view.insertAdjacentHTML('afterbegin', html);

  window.scrollTo(0, 0)
}

export default routePage

// popstate / pushState() - 같은 페이지라면 실행하지 않음.

// const activeRoutes = document.querySelectorAll('[route]')
// activeRoutes.forEach(route => route.addEventListener('click', navigate, false))
// const route = routes.filter(item => item.path === currentPath)
// if (!route) {
//   pushBrowserHistory({}, '', 'error')
//   view.innerHTML = 'no route exists'
// }
// pushBrowserHistory({}, '', routeInfo.path)
