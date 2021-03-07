// @ts-nocheck
import { pushBrowserHistory } from './utils/browserUtils'

const routes = [
  { name: 'root', path: '/' },
  { name: 'home', path: '/home' },
  { name: 'design', path: '/design' },
  { name: 'profile', path: '/profile' },
  { name: 'post', path: '/post' },
]
const currentPath = window.location.pathname
// type routeType = {
//   name: string
//   path: string
// }
const routePage = async () => {
  const view = document.getElementById('view')
  if (!view) return

  let hash = window.location.hash.substring(1)
  const uri = hash ? `/views/${hash}.html` : '/views/design.html'
  const response = await fetch(uri)
    .then(response => response.text())
    .then(html => view.innerHTML = html)
    .catch(error => console.warn('router: ', error))

  window.scrollTo(0, 0)

  if(currentPath === '/test') {
    const response = await fetch('/views/profile.html')
    .then(response => response.text())
    .then(html => view.innerHTML = html)
    .catch(error => console.warn('router: ', error))
  }

  // const activeRoutes = document.querySelectorAll('[route]')
  // activeRoutes.forEach(route => route.addEventListener('click', navigate, false))
  function navigate(event) {
    const route = event.target.attributes[0].value
    const routeInfo = routes.filter(item => item.path === route)[0]
    // if (!routeInfo) {
    //   pushBrowserHistory({}, '', 'error')
    //   view.innerHTML = 'no route exists'
    // } else {
    // }
     // const isRootPage = currentPath === '/'
    pushBrowserHistory({}, '', routeInfo.path)

    // if (isRootPage) {
    // } else {
    //   const route = routes.filter(item => item.path === currentPath)
    //   if (!route) view.innerHTML = '404'

    //   view.innerHTML = `${route.name}`
    // }

    // event.preventDefault()
    // const page = window.location.pathname.substring(1)
    // const uri = page ? `/views/${page}.html` : '/views/design.html'
    // const response = fetch(uri)
    //   .then(response => response.text())
    //   .then(html => view.innerHTML = html)
  }
}

export default routePage

// const navigate = (event) => {
// 	const route = findCurrentTarget.attributes[0].value;
// 	const routeInfo = myFirstRouter.routes.find(r => r.path === route);
// 	if(!routeInfo) {
// 		view.innerHTML = 'No route exists with this path';
// };

// window.addEventListener('popstate', function(event) {
// 	if (history.state && history.state.id === 'homepage') {}
// }, false);




