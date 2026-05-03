// export const isIEBrowser = !!document.documentMode

// const isIe = function() {
//   const ua = window.navigator.userAgent;
//   return ua.indexOf('MSIE') > -1 || ua.indexOf('Trident') > -1;
// };

const isBrowser = typeof window === 'object' && typeof document === 'object'
const isMacBrowser = /Mac|iPod|iPhone|iPad/.test(navigator.platform)
const isMobile = function () {
  const match = window.matchMedia('(pointer:coarse)')
  return match && match.matches
}
