const carousel = () => {
  const conatiner = document.querySelector<HTMLElement>('.js-carousel')
  if (!conatiner) return

  const viewer = conatiner.querySelector<HTMLElement>('.js-carousel-viewer')

  const listItems = conatiner.querySelectorAll<HTMLElement>('.js-carousel-viewer > *')

  const prevButton = conatiner.querySelector<HTMLElement>('.js-carousel-prev')
  const nextButton = conatiner.querySelector<HTMLElement>('.js-carousel-next')

  if (!viewer || !listItems || !prevButton || !nextButton) return

  console.log('prevButton', prevButton)

  document.addEventListener('DOMContentLoaded', initialize)

  nextButton.addEventListener('click', toNext)
  prevButton.addEventListener('click', toPrev)

  // const dots = conatiner.querySelectorAll<HTMLElement>('.carousel-dots-dot')
  // if (!dots) return
  // dots.forEach(element => element.addEventListener('click', () => {}))

  viewer.addEventListener('scroll', scroll)

  function initialize() {
    const isFirst = viewer!.scrollLeft === 0
    if (!isFirst) return

    displayPrevButton('none')
  }
  function scroll() {
    // console.log(viewer?.scrollLeft)
    const { scrollLeft } = viewer as HTMLElement

    // scrollLeft 는 left 가 변경이 되는 것인지.

    scrollLeft === 0 ? displayPrevButton('none') : displayPrevButton('flex')
    // prevButton!.hidden = scrollLeft === 0
  }

  function displayPrevButton(value: 'flex' | 'none') {
    prevButton!.style.display = value
  }

  function toPrev() {
    viewer!.scrollLeft -= listItems[0].offsetWidth
  }
  function toNext() {
    viewer!.scrollLeft += listItems[0].offsetWidth
  }

  // let sum = 0
  // listItems.forEach(item => (sum += item.offsetWidth))
  // const categoryContainerWidth = viewer.offsetWidth
  // if(sum > categoryContainerWidth) {}
  // const ttt = 100 + 'px';
  // document.querySelector('.carousel-viewer').style.transform += 'translateX('+ttt+')';
}

export default carousel

// const slideWidth = slidesEl.offsetWidth;
// const overallWidth = slidesEl.scrollWidth; // = slideWidth * numSlides

// function navigate(direction) {
//     const x = calculateNewPosition(direction);
//     slidesEl.style.transform = `translateX(${x}px)`;
// }

// function calculateNewPosition(direction) {
//     const str = slidesEl.style.transform;
//     const x = str ? parseInt(str.match(/-?(\d+)/g)) : 0;

//     if (direction === "forward") {
//         const atLastSlide = x === -overallWidth + slideWidth;
//         // Non-looping carousel: Stops at last slide
//         return atLastSlide ? x : x - slideWidth;
//         // Looping carousel: Transitions from last slide to first slide
//         // return atLastSlide ? 0 : x-slideWidth;
//     } else if (direction === "backward") {
//         const atFirstSlide = x === 0;
//         // Non-looping carousel: Stops at first slide
//         return atFirstSlide ? x : x + slideWidth;
//         // Looping carousel: Transitions from first slide to last slide
//         // return atFirstSlide ? -overallWidth + slideWidth : x + slideWidth;
//     }
// }
// })();

// function startSlider() {
//   current = slider.querySelector('.current') || slides.firstElementChild
//   prev = current.previousElementSibling || slides.lastElementChild
//   next = current.nextElementSibling || slides.firstElementChild
//   console.log({ current, prev, next })
// }

// function applyClasses() {
//   current.classList.add('current');
//   prev.classList.add('prev');
//   next.classList.add('next');
// }

// prevButton.addEventListener('click', () => move('back'))
// nextButton.addEventListener('click', move)
// if (direction === "back") {
//   [prev, current, next] = [
//     // get the prev slide, if there is none, get the last slide from the entire slider for wrapping
//     prev.previousElementSibling || slides.lastElementChild,
//     prev,
//     current,
//   ];
// } else {
//   [prev, current, next] = [
//     current,
//     next,
//     // get the next slide or if its at the end, loop around and grab the first
//     next.nextElementSibling || slides.firstElementChild,
//   ];
// }
