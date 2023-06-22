export function makeStyleSheet(name) {
  const link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('href', `/public/stylesheets/components/${name}.css`)

  return link
}
