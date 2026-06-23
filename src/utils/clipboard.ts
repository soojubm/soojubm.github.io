/**
 * 텍스트를 클립보드에 복사한다.
 *
 * navigator.clipboard를 우선 사용하고, 실패하면 임시 textarea + execCommand로 폴백한다.
 * 성공 여부를 boolean으로 반환한다.
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return copyWithFallback(text)
  }
}

const copyWithFallback = (text: string): boolean => {
  try {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'absolute'
    textarea.style.left = '-9999px'
    document.body.append(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    return true
  } catch {
    return false
  }
}
