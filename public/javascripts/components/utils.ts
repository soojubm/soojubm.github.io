export function makeStyleSheet(name) {
  const link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('href', `/public/stylesheets/components/${name}.css`)

  return link
}

export function importScript(url) {
  var pretty = document.createElement('link')
  pretty.href = url
  document.body.appendChild(pretty)
}
