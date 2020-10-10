// @ts-nocheck


const routes = [
  { name: 'root', path: '/' },
  { name: 'home', path: '/home' },
  { name: 'design', path: '/design' },
  { name: 'profile', path: '/profile' },
  { name: 'blog', path: '/blog' },
]
const currentPath = window.location.pathname

const routePage = async () => {
  const view = document.getElementById('view')
  if (!view) return

  type routeType = {
    name: string,
    path: string
  }

  const activeRoutes = Array.from(document.querySelectorAll('[route]'))
  function navigate(event) {
    const route = event.target.attributes[0].value
    const routeInfo = routes.filter(item => item.path === route)[0]
    if(!routeInfo) {
      window.history.pushState({} , '', 'error')
      view.innerHTML = 'no route exists'
    }
    else {
      window.history.pushState({name: 'tester'}, 'name', routeInfo.path)
      view.innerHTML = `${routeInfo.name}`
    }
  }

  activeRoutes.forEach((route) => {
    route.addEventListener('click', navigate, flase)
  })

  if(currentPath === '/') {
    console.log('root page')
  } else {
    const route = routes.filter(item => item.path === currentPath)
    if(!route) view.innerHTML = '404'

    view.innerHTML = `${route.name}`
  }

  // todo 유틸
  function setHistory(uri) {
    const state = { name: 'tester' }
    const title = 'dd'
    const url = uri
    history.pushState(state, title, uri)
  }

  let hash = window.location.hash.substring(1)
  const uri = hash ? `/views/${hash}.html` : '/views/design.html'
  const response = await fetch(uri)
    .then(response => response.text())
    .then(html => (view.innerHTML = html))
    .catch(error => console.warn('router: ', error))

  // setHistory(hash)
  window.scrollTo(0, 0)

  return response
}

export default routePage

// hash 말고 클릭하는 순간에 값을 알아야 함. data attr or hash

// var activeRoutes = Array.from(document.querySelectorAll('[href]'));
// activeRoutes.forEach(route => route.addEventListener('click', navigate));

// const navigate = (event) => {
// 	const route = findCurrentTarget.attributes[0].value;
// 	const routeInfo = myFirstRouter.routes.find(r => r.path === route);
// 	if(!routeInfo) {
// 		//window.history.pushState({}, '', 'error');
// 		view.innerHTML = 'No route exists with this path';
// };

// 	body: 'title=' + encodeURIComponent('My awesome new article') + '&body=' + encodeURIComponent('This is the text of my article'),
// 	referrer: 'no-referrer'

// const parser = new DOMParser();
// const doc = parser.parseFromString(html, 'text/html');
// view.innerHTML = new XMLSerializer().serializeToString(doc);

// window.addEventListener('popstate', function(event) {
// 	if (history.state && history.state.id === 'homepage') {}
// }, false);
