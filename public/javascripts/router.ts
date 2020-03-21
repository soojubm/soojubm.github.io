// 비동기 함수는 리턴을 해야한다. 프로미스를 반환.
const routePage = () => {
  let { hash } = window.location
  const page = hash ? `/views/${hash.substring(1)}.html` : '/views/profile.html'
  console.log(history.state)
  return fetch(page)
    .then(response => {
      // 404 || 500
      if (response.ok) return response.text()
      else return Promise.reject(response)
    })
    .then(html => {
      const view = document.getElementById('view')
      if (!view) return

      view.innerHTML = html
      window.scrollTo(0, 0);
      // window.history.pushState({ name: 'tester' }, 'dd', hash.substring(1));
    })
    .catch(error => console.warn('router: ', error))
}

export default routePage

// hash 말고 클릭하는 순간에 값을 알아야 함. data attr or hash
// const Router = (name, routes) => {
// 	return { name: name, routes: routes };
// };
// var activeRoutes = Array.from(document.querySelectorAll('[href]'));
// activeRoutes.forEach(route => route.addEventListener('click', navigate));
// const myFirstRouter = new Router('myFirstRouter', [
// 	{ path: '/', name: 'index' },
// ]);
// const navigate = (event) => {
// 	const route = findCurrentTarget.attributes[0].value;
// 	const routeInfo = myFirstRouter.routes.find(r => r.path === route);
// 	if(!routeInfo) {
// 		//window.history.pushState({}, '', 'error');
// 		view.innerHTML = 'No route exists with this path';
// 	} else {
// 		window.history.pushState({ name: 'tester' }, '', routeInfo.path);
// 		fetch(`/views/${routeInfo.name}.html`)
// 			.then(res => res.text())
// 			.then(html => view.innerHTML = html)
// 			.catch(error => console.log('Failed to fetch page: ', error));
// 	}
// };

// {
// 	method: 'POST',
// 	body: 'title=' + encodeURIComponent('My awesome new article') + '&body=' + encodeURIComponent('This is the text of my article'),
// 	header: {
// 		'Content-Type': 'application/json'
// 	},
// 	referrer: 'no-referrer'
// }
// const parser = new DOMParser();
// const doc = parser.parseFromString(html, 'text/html');
// view.innerHTML = new XMLSerializer().serializeToString(doc);
// response.text() // response.json()
// toLowerCase() 해주기

// window.addEventListener('popstate', function (event) {
// 	if (history.state && history.state.id === 'homepage') {
// 			// Render new content for the hompage
// 	}
// }, false);

// replaceState