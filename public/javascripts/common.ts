window.addEventListener('DOMContentLoaded', detectOnline)
window.addEventListener('online', detectOnline)
window.addEventListener('offline', detectOnline)

function detectOnline() {
  const offlineElement = document.querySelector('.js-offline') as HTMLElement
  if (!offlineElement) return

  const isOnline = navigator.onLine

  offlineElement.hidden = !isOnline
}
