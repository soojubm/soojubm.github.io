// @ts-nocheck
// mobile/postsView.js

const postsView = {
  init(el) {
    if (!el) throw Error('el')
    this.el = el
    this.data = []
    return this
  },
  setData(data) {
    this.data = data
    return this
  },
  render() {
    this.el.innerHTML = this.html()
  },
  html() {
    return (
      this.data.reduce((html, post) => {
        html += `
        <h2>${post.title}</h2>
        <article>${this.text(post.text)}</article>
       `
        return html
      }, '<div>') + '</div>'
    )
  },
  text(post) {
    return post.substring(0, 100) + '...'
  },
}

export default postsView

postsView.init(document.querySelector('#app'))
api.fetch().then(data => {
  postView.setData(data).render()
})

class HTTPError extends Error {
  constructor(statusCode: number, message?: string) {
    super(message) // 반드시 호출해야함
    this.name = `HTTPError`
    this.statusCode = statusCode
  }
}
const fetchPosts = async () => {
  const response = await fetch(`/api/posts`)
  if (response.ok) {
    return await response.json()
  } else {
    throw new HTTPError(response.status, response.statusText)
  }
}
const renderPosts = async () => {
  try {
    const posts = await fetchPosts()
    // Do something with posts
  } catch (e) {
    console.error(e.statusCode) // <- 컴파일 에러
    if (e instanceof HTTPError) {
      alert(`fetching posts failed, error code is ${e.statusCode}`) // 이건 정상
    }
  }
}

// 포스트를 가져온 다음
// 만들어진 순서 역순으로 정리를 하고
// `타이틀 - 작가명` 으로 `title` 필드를 수정해준 다음
// 만약 에러가 발생한다면 얼럿을 표시해준다
// 에러가 없다면 그 값을 posts 라는 변수에 할당한다
const posts = await getPosts()
  .map(posts => posts.slice().sort((a, b) => b.createdAt - a.createdAt))
  .map(sortedPosts =>
    posts.map(post => ({
      ...post,
      title: `${post.title} - ${post.author}`,
    })),
  )
  .get(e => e.showAlert())

function attachKeyUpEvent() {
  loginForm.addEventListener('keyup', function(event) {
    const nodeName = event.target.nodeName
    const inputProps = event.target

    if (nodeName === 'INPUT') {
      validateForm(inputProps)
    }
  })
}

// Function receives an input with its properties
function validateForm(inputProps) {
  const inputName = inputProps.name
  const verifyInputName = {
    username: validationRules().username,
    password: validationRules().password,
  }

  return verifyInputName[inputName](inputProps)
}

// function manipulateValidationMsg(validationData) {
//   const { inputProps, action } = validationData;
//   const elementValidationMsg = inputProps.nextElementSibling;
//   const validationMsgClasses = elementValidationMsg.classList;
//   const removeClass = () =>
//       validationMsgClasses.remove('hide')

//   const addClass = () =>
//       validationMsgClasses.add('hide')

//   return action === 'hide' ? addClass() : removeClass();

function fastGoodbye() {
  const container = document.querySelector('')
  while (container?.firstChild) {
    container.removeChild(container.firstChild)
  }

  container?.innerHTML = 'this is slow~~'
}

/**
 * Create an intersection observer
 * @param  {Node}     elem     The element to observe
 * @param  {Function} callback The callback function to run
 * @param  {Object}   options  The options, if any
 */
function createIntersectionObserver(elem, callback, options) {
  let observer = new IntersectionObserver(callback, options || {})
  observer.observe(elem)
  return observer
}

function createIntersectionObserver2(selectors, callback, options) {
  if (
    'IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype
  ) {
    const elements = [].slice.call(document.querySelectorAll(selectors))
    const options = {
      root: null,
      rootMargin: '0px 0px 0px 0px',
      threshold: 0.1,
    }
    let observer = new IntersectionObserver(callback, options)

    elements.forEach(element => observer.observe(element))
  }
}

/**
 * Log the entry and if it's in the viewport
 * @param  {Array} entries The intersecting elements
 */
function log(entries) {
  let [entry] = entries
  console.log(entries)
  console.log(entry.target)
  console.log(entry.isIntersecting)
}

// Setup our observer options
let options = {
  rootMargin: '150px',
}

// The elements to observe
let div1 = document.querySelector('#div-1')
let div2 = document.querySelector('#div-2')

// Create an observer for each one
createIntersectionObserver(div1, log, options)

// This uses the same callback, but no options
createIntersectionObserver(div2, log)

// Create an immutable copy
let evenMoreSandwiches = Array.from(sandwiches)

// Add a few sandwiches
sandwiches.push('italian', 'blt')

// logs ["turkey", "ham", "pb&j", "italian", "blt"]
console.log(sandwiches)

// logs ["turkey", "ham", "pb&j"]
console.log(evenMoreSandwiches)

// Create an immutable copy
let evenMoreLunch = Object.assign({}, lunch)

// Add a snack
lunch.snack = 'cookies'

// Logs {sandwich: 'turkey', drink: soda, snack: 'cookies'}
console.log(lunch)

// Logs {sandwich: 'turkey', drink: soda}
console.log(evenMoreLunch)

ReactGA.initialize(process.env.REACT_APP_TRACKING_ID, { debug: true })
const history = createBrowserHistory()
history.listen((location: any) => {
  ReactGA.set({ page: location.pathname }) // Update the user's current page
  ReactGA.pageview(location.pathname) // Record a pageview for the given page
})

var pagItems = document.querySelectorAll('.pagination__item')

for (var i = 0; i < pagItems.length; i++) {
  var counter = i + 1
  var string = 'Page ' + counter

  if (pagItems[i].getAttribute('aria-current')) {
    string = 'Page ' + counter + ', Current Page'
  }

  pagItems[i].setAttribute('aria-label', string)
}

class scrollbox {
  constructor() {
    this.scrollBarWidth = 0
    this.measureScrollbarWidth()
  }

  measureScrollbarWidth() {
    let scrollbox = document.createElement('div')
    scrollbox.style.overflow = 'scroll'

    document.body.appendChild(scrollbox)

    this.scrollBarWidth = scrollbox.offsetWidth - scrollbox.clientWidth

    document.body.removeChild(scrollbox)
  }

  get width() {
    return this.scrollBarWidth
  }
}

let scrollbox = new TempScrollBox()
console.log(scrollbox.width) //-> 17 (Windows, Chrome)

// var scrollDiv = document.createElement("div");
// scrollDiv.className = "scrollbar-measure";
// document.body.appendChild(scrollDiv);

// var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
// console.warn(scrollbarWidth); // Mac:  15

// document.body.removeChild(scrollDiv);

// function insertCallback(parent, funcname, callback, ...args) {
//   let oldFunc = parent[funcname] ? parent[funcname] : function() { }
//   parent[funcname] = function () {
//       oldFunc.apply(this, arguments)
//       return callback(...args)
//   }
// }

// function notifyAnalytics(l) {
//   let newPage = l.pathname + l.hash
//   gtag('config', 'UA-83531239-1', { 'page_path': newPage });
// }

// insertCallback(window.history, "pushState", notify_analytics, location)
// insertCallback(window.history, "replaceState", notify_analytics, location)

// function trackOutboundLink(url) {
//   gtag('event', 'click', {
//     'event_category': 'outbound',
//     'event_label': url,
//     'transport_type': 'beacon',
//     'event_callback': function() { document.location = url; }
//   });
// }

// const link = document.createElement('link');
// link.setAttribute('rel', 'stylesheet');
// link.setAttribute('href', '');
// document.head.appendChild(link);
