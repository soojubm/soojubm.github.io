import footer from '/public/components/footer/footer.html'
import navbar from '/public/components/navbar/navbar.html'

import main from './films.html'
import '/pages/components/components.css'

import '/public/stylesheets/shared.css'

document.addEventListener('DOMContentLoaded', async () => {
  document.body.insertAdjacentHTML('beforeend', navbar)
  document.body.insertAdjacentHTML('beforeend', main)
  document.body.insertAdjacentHTML('beforeend', footer)

  await fetchAndDisplay('')

  const filterButtons = document.querySelectorAll('.js-button')
  filterButtons.forEach(item => {
    console.log(item, 'button')

    item!.addEventListener('click', event => {
      const target = event.target as HTMLElement

      alert()

      fetchAndDisplay(target.dataset.value)
    })
  })
})

async function fetchAndDisplay(value) {
  const films = await fetchFilms()

  const uniqueCountries = [...new Set(films.map(item => item.country))]

  const html = uniqueCountries.map(item => {
    return `
      <button class="js-button" data-value=${item}>${item}</button>
    `
  })

  document.querySelector('.js-filter')!.innerHTML = html.join(' ')

  const data = films.filter(item => item.country === value)

  displayFilms(value.length > 0 ? data : films)
}

function displayFilms(data) {
  const html = data?.map(
    item =>
      `
      <article style="min-width:100px;border:var(--border);padding:var(--space-3);border-radius:12px;position:relative">
        <div style="display:flex;justify-content:space-between;gap:1rem;">
          <time style="font-size:var(--font-size-small);">${item.releasedate}</time>
          <small>${item.country}</small>
        </div>
        <p style="margin:var(--space-1) 0 0 0"><b>${item.titlekorean}</b></p>
        <small style="display:block;">${item.titleenglish}</small>
        <p style="margin-top:var(--space-2);">${item.director}</p>
      </article>
    `,
  )

  document.querySelector('.group')!.innerHTML = html.join(' ')
  document.querySelector('.length')!.innerHTML = data.length
}

async function fetchFilms() {
  try {
    // const res = await fetch(`${proxy}${baseEndpoint}?q=${query}`)
    const endpoint = `/pages/components/films/films.json`
    const response = await fetch(endpoint)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

// async function handleSubmit(event) {
//   event.preventDefault()
//   const el = event.currentTarget
//   fetchAndDisplay(form.query.value)
// }
// async function fetchAndDisplay(query) {
//   // turn the form off
//   form.submit.disabled = true
//   // submit the search
//   const recipes = await fetchRecipes(query)
//   console.log(recipes)
//   form.submit.disabled = false
//   displayRecipes(recipes.results)
// }

// const filters = {
//   sarcastic(letter, index) {
//     console.log(letter, index);
//     return letter;
//   },
//   funky() {},
//   unable() {},
// };
// function transformText(text) {
//   // take the text, and loop over each letter
//   const mod = Array.from(text).map(filters.sarcastic);
//   console.log(mod);
//   result.textContent = text;
// }
// textarea.addEventListener("input", (e) => transformText(e.target.value));

// const filter = document.querySelector('[name="filter"]:checked').value;
// console.log(filter);

// try catch / response?.ok

// let response;

// try {
//   response = await fetch('https://httpbin.org/status/429');
// } catch (error) {
//   console.log('There was an error', error);
// }

// // Uses the 'optional chaining' operator
// if (response?.ok) {
//   console.log('Use the response here!');
// } else {
//   console.log(`HTTP Response Code: ${response?.status}`)
// }
