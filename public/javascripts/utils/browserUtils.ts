export function pushBrowserHistory(state = {}, title = '', url = '') {
  history.pushState(state, title, url)
}

export function backHistory() {
  history.back()
}
