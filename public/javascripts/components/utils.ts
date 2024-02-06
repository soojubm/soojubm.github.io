export function makeStyleSheet(name) {
  const link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('href', `/public/components/${name}/${name}.css`)

  return link
}
export function inheritStyle(shadow, container) {
  const style = shadow.getAttribute('style')
  container.setAttribute('style', style || '')
}

export function setSlotElement(container, name: string) {
  const slotElement = document.createElement('slot')
  slotElement.name = name

  container.appendChild(slotElement)
}

// TODO 8.23 여기까지 사용 중.

export function importStyle(url) {
  var pretty = document.createElement('link')
  pretty.href = url
  document.body.appendChild(pretty)

  return pretty
}

export function importScript(url) {
  const script = document.createElement('script')
  script.src = url
  script.async = true
  // script.type = 'module';

  script.onload = () => {
    console.log('Script loaded successfuly')
    const box = document.getElementById('box')
    box!.textContent = 'The script has loaded.'
  }

  script.onerror = () => {
    console.log('Error occurred while loading script')
  }

  document.body.appendChild(script)
}
