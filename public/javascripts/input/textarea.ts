const inputTextarea = () => {
  // tagName과 nodeName은 텍스트 노드를 각각 undefined와 #text 반환한다.
  document.addEventListener('input', event => {
    const { target }: any = event
    if (target) return

    const isTextarea = target.nodeName.toLowerCase() === 'textarea'
    if (!isTextarea) return

    const BYTE_MAXIMUM = 30

    const byteElement = document.querySelector<HTMLElement>('.textfield-byte b')
    if (!byteElement) return

    const stringByteLength = target?.value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, '$&$1$2').length || 0 // || 0 임시
    byteElement.innerText = stringByteLength

    const isMaximum = stringByteLength > BYTE_MAXIMUM
    target.parentNode.classList.toggle('is-invalid', isMaximum)

    // autoExpand(target)
  })
}

const autoExpand = field => {
  // doesnt work
  field.style.height = 'inherit'

  const computed = window.getComputedStyle(field)
  const height = field.scrollHeight + parseInt(computed.getPropertyValue('border-top-width'))
  field.style.height = `${height}px`
}

export default inputTextarea
