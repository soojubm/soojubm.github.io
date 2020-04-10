// mobile/postsView.js

const postsView = {
  init (el) {
    if (!el) throw Error('el')
    this.el = el
    this.data = []
    return this
  },
  setData (data) {
    this.data = data
    return this
  },
  render () {
    this.el.innerHTML = this.html()
  },
  html () {
    return this.data.reduce((html, post) => {
      html += `
        <h2>${post.title}</h2>
        <article>${this.text(post.text)}</article>
       `
      return html
    }, '<div>') + '</div>'
  },
  text (post) {
    return post.substring(0, 100) + '...'
  }
}

export default postsView

// mobile/index.html
import postView from './postView.js

postsView.init(document.querySelector('#app'))
api.fetch().then(data => {
  postView.setData(data).render()
})