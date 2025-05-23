// @ts-nocheck

// 포스트를 가져온 다음
// 만들어진 순서 역순으로 정리를 하고
// `타이틀 - 작가명` 으로 `title` 필드를 수정해준 다음
// 만약 에러가 발생한다면 얼럿을 표시해준다
// 에러가 없다면 그 값을 posts 라는 변수에 할당한다

function slugify(sentence, lowercase) {
  if (lowercase) {
    return sentence.replace(/\s/g, '-').toLowerCase()
  } else {
    return sentence.replace(/\s/g, '-')
  }
}

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
  loginForm.addEventListener('keyup', function (event) {
    const nodeName = event.target.nodeName
    const inputProps = event.target

    if (nodeName === 'INPUT') validateForm(inputProps)
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

const history = createBrowserHistory()

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

// (function addPointerClasses() {
//   var is_touch_event = false;

//   function hasMouse() {
//       if(is_touch_event === false) {
//           document.documentElement.classList.add('mouse');
//           document.body.removeEventListener('mousemove', hasMouse);
//       }
//   }

//   document.body.addEventListener('mousemove', hasMouse);
//   document.body.addEventListener('touchstart', function ()  {
//       is_touch_event = true;
//   });
//   document.body.addEventListener('touchend', function ()  {
//       is_touch_event = false;
//   });
//   document.body.addEventListener('click', function ()  {
//       if(is_touch_event) is_touch_event = false;
//   });
//   function isTouchDevice() {
//       try {
//           document.createEvent('TouchEvent');
//           return true;
//       } catch (e) {
//           return false;
//       }
//   }

//   if(isTouchDevice()) document.documentElement.classList.add('touch');
// })();

const spanElem = document.querySelector('span')
function navigateLink(e) {
  const isNavigateAction = e.type === 'click' || e.key === 'Enter'
  if (!isNavigateAction) return

  let ref = e.target == null ? e.srcElement : e.target
  if (ref) {
    window.open(ref.getAttribute('data-href'), '_blank')
  }
}
spanElem.addEventListener('click', navigateLink)
spanElem.addEventListener('keydown', navigateLink)

textboxEle.addEventListener('keydown', function (e) {
  const isCapsLockOn = e.getModifierState('CapsLock')

  messageEle.innerHTML = isCapsLockOn ? 'Caps lock is ON' : ''
  messageEle.style.display = isCapsLockOn ? 'block' : 'none'
})

textboxEle.addEventListener('keypress', function (e) {
  const isMac = /Mac/.test(navigator.platform)
  const keyCode = e.keyCode || e.which

  // Is the _Shift_ key pressed?
  const shiftKey = e.shiftKey || keyCode === 16

  // Get the pressed character
  const s = String.fromCharCode(keyCode)
  const isCapsLockOn =
    (s.toUpperCase() === s && s.toLowerCase() !== s && !(shiftKey && isMac)) ||
    (s.toUpperCase() !== s && s.toLowerCase() === s && shiftKey)

  messageEle.innerHTML = isCapsLockOn ? 'Caps lock is ON' : ''
  messageEle.style.display = isCapsLockOn ? 'block' : 'none'
})

// Promise.all([
// 	fetch('https://jsonplaceholder.typicode.com/posts'),
// 	fetch('https://jsonplaceholder.typicode.com/users')
// ])
// .then(responses => {
// 	return responses.map(response => {
// 		return response.json();
// 	});

// typescript
// type TextEditorBlockProps {
//   width: number;
//   height: number;
//   top: number;
//   left: number;
//   parentStyle?: ParentStyle; // It defines area where component can't escape. If you don't define it, then your component can move in all screen.
//   unit: string;
//   // Initial- props are options just for first rendering.
//   initialFontSize?: number; // default: 0.22
//   initialFontColor?: string; // default: "black"
//   initialFontStyle?: InitialFontStyle; // default: ""
//   initialText?: string; // default: ""
//   initialFontName?: string; // default: ""
// }

// type ParentStyle {
//   width: number;
//   height: number;
// }

// type InitialFontStyle = "twin-color-text" | "box-text" | "down-side-text" | "out-line-text" | "bubble-shadow-text";
// type InitialFontName = "andada-pro" | "bebas-nenu" | "montecarlo" | "roboto" | "stix-two-text" | "style-script";

// <div>
//   <div class="js-counter1" data-number="54">54%</div>
//   <div class="js-counter2" data-number="80">80%</div>
// </div>

// <i class="cursor"></i>

// <div class="countdown">
//   <div class="days">
//     <div class="days-value js-days"></div>
//     <div class="days-label">days</div>
//   </div>
//   <div class="hours">
//     <div class="hours-value js-hours"></div>
//     <div class="hours-label">hours</div>
//   </div>
//   <div class="minutes">
//     <div class="minutes-value js-minutes"></div>
//     <div class="minutes-label">minutes</div>
//   </div>
//   <div class="seconds">
//     <div class="seconds-value js-seconds"></div>
//     <div class="seconds-label">seconds</div>
//   </div>
// </div>

var renderTime = function () {
  var time = new Date()
  document.querySelector('.clock')?.textContent = time.toLocaleString(
    navigator.language || 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    },
  )
  // time.toLocaleString(navigator.language || 'en-US', {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true});
}
renderTime()
setInterval(renderTime, 1000)

function calculateReadTime() {
  const readTimeElement = document.querySelector<HTMLElement>('.post-head')
  const postContent = document.querySelector<HTMLElement>('.post-body-paragraph')
  if (!postContent || !readTimeElement) return

  const text = postContent?.textContent || postContent?.innerText
  let textLength = text.split(' ').length || 1
  const wordsPerMinute = 200
  let value = Math.ceil(textLength / wordsPerMinute)
  const result = `${value} min read`
  console.log(result)

  readTimeElement.innerText = result
}

// !
// How long you want the animation to take, in ms
const animationDuration = 2000
// Calculate how long each ‘frame’ should last if we want to update the animation 60 times per second
const frameDuration = 1000 / 60
// Use that to calculate how many frames we need to complete the animation
const totalFrames = Math.round(animationDuration / frameDuration)
// An ease-out function that slows the count as it progresses
const easeOutQuad = t => t * (2 - t)

// The animation function, which takes an Element
const animateCountUp = el => {
  let frame = 0
  const countTo = parseInt(el.innerHTML, 10)
  // Start the animation running 60 times per second
  const counter = setInterval(() => {
    frame++
    // Calculate our progress as a value between 0 and 1
    // Pass that value to our easing function to get our
    // progress on a curve
    const progress = easeOutQuad(frame / totalFrames)
    // Use the progress value to calculate the current count
    const currentCount = Math.round(countTo * progress)

    // If the current count has changed, update the element
    if (parseInt(el.innerHTML, 10) !== currentCount) {
      el.innerHTML = currentCount
    }

    // If we’ve reached our last frame, stop the animation
    if (frame === totalFrames) {
      clearInterval(counter)
    }
  }, frameDuration)
}

const runAnimations = () => {
  const countupEls = document.querySelectorAll('.countup')
  countupEls.forEach(animateCountUp)
}

// ! star
// <div id="star"></div>
// <div id="display-star-value"></div>
// body {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   height: 100vh;
// }

// .fa {
//   font-size: 40px;
// }

// .fa-star-o:before {
//   content: "\f006";
//   color: #5f6368;
// }

// .fa-star:before {
//   content: "\f005";
//   color: #d56e0c;
// }

function Star(el, count, callback) {
  let active = -1
  const element = document.querySelector(el)
  const fragment = document.createDocumentFragment()

  for (let i = 1; i <= count; i++) {
    const iElem = document.createElement('i')
    iElem.classList.add('fa')
    iElem.classList.add('fa-star-o')
    iElem.dataset.ratingVal = i
    fragment.appendChild(iElem)
  }
  element.appendChild(fragment)

  element.addEventListener('mouseover', onMouseOver)
  element.addEventListener('click', onClick)
  element.addEventListener('mouseleave', onMouseLeave)

  function onMouseOver(e) {
    const ratingVal = e.target.dataset.ratingVal
    if (!ratingVal) return

    fill(ratingVal)
  }

  function fill(ratingVal) {
    for (let i = 0; i < count; i++) {
      if (i < ratingVal) {
        element.children[i].classList.add('fa-star')
      } else {
        element.children[i].classList.remove('fa-star')
      }

      // element.children[i].classList.toggle('fa-star', i < ratingVal)
    }
  }

  function onMouseLeave(e) {
    fill(active)
  }

  function onClick(e) {
    active = e.target.dataset.ratingVal
    fill(active)
    callback(active)
  }
}

function getStar(value) {
  document.getElementById('display-star-value').innerHTML = value
}

Star('#star', 5, getStar)

// const hash = window.location.hash
// const navbarItem = document.querySelector(`[href="${hash}"]`)
// navbarItem?.classList.add('is-active')

// data-soojubm-width
// setDataPrefix

function authMiddleware(req, res, next) {
  const authToken = req.headers.authorization

  if (!authToken) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (authToken !== 'secret-token') {
    return res.status(401).json({ error: 'Invalid token' })
  }

  if (req.query.admin === 'true') {
    req.isAdmin = true
  }

  next()
}

// ------

function authMiddleware(req, res, next) {
  checkAuthValidTokenAdmin(req, res, next)
}

function checkAuthValidTokenAdmin(req, res, next) {
  const authToken = req.headers.authorization

  if (!authToken) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  checkValidTokenAdmin(req, res, next)
}

function checkValidTokenAdmin(req, res, next) {
  const authToken = req.headers.authorization

  if (authToken !== 'secret-token') {
    return res.status(401).json({ error: 'Invalid token' })
  }

  checkAdmin(req, res, next)
}

function checkAdmin(req, res, next) {
  if (req.query.admin === 'true') {
    req.isAdmin = true
  }

  next()
}

// mapping
const removeAllChildren = e => {
  while (e.firstElementChild) {
    e.removeChild(e.firstElementChild)
  }
}

const renderArticles = (e, articles) => {
  // Always clean up the element so you can reuse the function
  removeAllChildren(e)
  e.append(
    ...articles.map(({ description, title }) => {
      const a = document.createElement('article')
      const t = document.createElement('h2')
      const p = document.createElement('p')
      t.textContent = title
      p.textContent = description
      a.append(t, p)
      return a
    }),
  )
}

renderArticles(document.querySelector('#articles'), [
  {
    title: 'List of my favorite lemons',
    description: 'Number 5 will surprise you!',
  },
  {
    title: 'What I think about cantaloupes',
    description: "That's a very silly name, is it even a real thing?",
  },
])

// wesbos.com/javascript/10-harder-practice-exercises/57-shopping-form-with-custom-events-delegation-and-localstorage/
https: function handleSumit(e) {
  const item = {
    id: Date.now(),
    name: e.target.item.value,
    complete: false,
  }
  isTemplateSpan.push(item)
}
