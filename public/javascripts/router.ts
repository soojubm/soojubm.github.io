// @ts-nocheck
import { pushBrowserHistory } from './utils/browserUtils'
// type routeType = {
//   name: string
//   path: string
// }
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
  const view = document.getElementById('view')
  if (!view) return

  let hash = window.location.hash.substring(1) // fast than .replace('#', '')
  const uri = hash ? `/views/${hash}.html` : '/views/design.html'

  try {
    const response = await fetch(uri)
    if (!response.ok) throw 'Something went wrong.'
    
    const html = await response.text()
    view.innerHTML = html

    window.scrollTo(0, 0)

    // https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch
    // fetch(url, {
    //   method: 'POST', // or 'PUT'
    //   body: JSON.stringify(data), // data can be `string` or {object}!
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then(res => res.json())
    //   .then(response => console.log('Success:', JSON.stringify(response)))
    //   .catch(error => console.error('Error:', error))

    //     var parser = new DOMParser()
    //     var doc = parser.parseFromString(html, 'text/html')
    //     var img = doc.querySelector('img')

    // view.insertAdjacentHTML('afterbegin', html);
  } catch (error) {
    console.warn('router: ', error)
  }
}

export default routePage

// const activeRoutes = document.querySelectorAll('[route]')
// activeRoutes.forEach(route => route.addEventListener('click', navigate, false))
//   const route = routes.filter(item => item.path === currentPath)
function navigate(event) {
  const route = event.target.attributes[0].value
  const routeInfo = routes.filter(item => item.path === route)[0]
  // 	const routeInfo = myFirstRouter.routes.find(r => r.path === route);
  // if (!routeInfo) {
  //   pushBrowserHistory({}, '', 'error')
  //   view.innerHTML = 'no route exists'
  // }
  pushBrowserHistory({}, '', routeInfo.path)
}
