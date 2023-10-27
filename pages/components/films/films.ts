import footer from '/public/components/footer/footer.html'
import navbar from '/public/components/navbar/navbar.html'

import main from './films.html'
import '/pages/components/components.css'

import '/public/stylesheets/shared.css'

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('main')!.innerHTML = navbar + main + footer

  renderComponent()

  async function renderComponent() {
    const endpoint = `/pages/components/films/films.json`

    try {
      const response = await fetch(endpoint)
      // const response2 = await fetch(`/pages/components/films/films_old.json`)
      if (!response.ok) throw 'Something went wrong.'

      const responseText = await response.json()

      const test = responseText
        ?.map(item => {
          return `<article style="min-width:100px;border:var(--border);padding:var(--space-3);border-radius:12px;position:relative">
          <small style="display:block;line-height:18px;"><time>${item.releasedate}</time></small>
          <p style="margin:var(--space-1) 0 0 0"><b>${item.titlekorean}</b></p>
          <p style="margin-top:-.25rem;"><small>${item.titleenglish}</small></p>
          <p style="margin-top:var(--space-1);">${item.director}</p>
          <small style="position:absolute;right:var(--space-3);top:var(--space-3);">${item.country}</small>
        </article>`
        })
        .join(' ')

      document.querySelector('.group')!.innerHTML = test
      document.querySelector('.length')!.innerHTML = responseText.length
    } catch (error) {
      console.log(error)
    }
  }
})

// async function renderComponent(componentName) {
//   const selector = `#${componentName}`
//   const endpoint = `/views/components/${componentName}.html`

//   try {
//     const response = await fetch(endpoint)
//     if (!response.ok) throw 'Something went wrong.'

//     const responseText = await response.text()

//     parentElement.innerHTML = responseText
//   } catch (error) {
//     console.log(error)
//   }
// }
