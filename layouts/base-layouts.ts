import '../src/components/navbar/navbar'
import '../src/components/footer/footer'

// 컴포넌트 페이지용 임시
import '../src/stylesheets/shared.css'

export const renderLayout = (
  content: string,
  options: { footer?: boolean; closeSidebar?: boolean } = {},
) => {
  if (options.closeSidebar) {
    document.body.classList.remove('is-menu-opened')
  }

  return `
    <mm-navbar></mm-navbar>
    ${content}
    <mm-radius-picker></mm-radius-picker>
    ${options.footer ? '<mm-footer></mm-footer>' : ''}
  `
}
