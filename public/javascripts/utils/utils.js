export function backHistory() {}

export const isScrollEnd = () => window.innerHeight + window.pageYOffset >= document.body.offsetHeight
export const isViewportSmall = () => window.matchMedia('(min-width:888px)').matches

function getCookie(name) {
  let value = `; ${document.cookie}`
  let parts = value.split(`; ${name}=`)
  if (parts.length === 2)
    return parts
      .pop()
      .split(';')
      .shift()
}

const download = () => {
  // <a href="/path/to/file" download>Download</a>
  const link = document.createElement('a')
  link.download = 'file name'
  link.href = '/path/to/file'

  document.body.appendChild(link)
  link.click()

  document.body.removeChild(link)

  // const data = JSON.stringify({ 'message': 'Hello Word' });
  // const blob = new Blob([data], { type: 'application/json' });
  // // Create new URL
  // const url = window.URL.createObjectURL(blob);
  // // Create a link and trigger the download
  // ...
  // // Free the URL created above
  // window.URL.revokeObjectURL(url);
}

const siblings = [].slice.call(parent.children).filter(function(child) {
  return child !== ele
})
