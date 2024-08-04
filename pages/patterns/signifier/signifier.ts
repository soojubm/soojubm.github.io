import footer from '/public/components/footer/footer.html'
import navbar from '/public/components/navbar/navbar.html'

import main from './signifier.html'
import '/pages/components/components.css'
import '/pages/patterns/tokens/tokens.css'
// TODO : 웹팩 등에서 경로가 수정되었을 때 그런데 왜 여기서 토큰 css를 가져옴 애초에? 공통된 css를 ㅂㄴ리`

import '/public/stylesheets/shared.css'

document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('beforeend', navbar)
  document.body.insertAdjacentHTML('beforeend', main)
  document.body.insertAdjacentHTML('beforeend', footer)
})
