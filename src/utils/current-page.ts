export function getCurrentPageId() {
  return window.location.pathname.split('/').pop()?.replace('.html', '') || 'index'
}
