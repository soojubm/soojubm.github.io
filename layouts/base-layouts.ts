import navbar from '/src/components/navbar/navbar.html'
import footer from '/src/components/footer/footer.html'

// 컴포넌트 페이지용 임시
import '/src/stylesheets/shared.css'

export const renderLayout = (
  content: string,
  options: { footer?: boolean; closeSidebar?: boolean } = {},
) => {
  if (options.closeSidebar) {
    document.body.classList.remove('is-menu-opened')
  }

  return `
    ${navbar}
    ${content}
    <aside id="modal"></aside>
    ${options.footer ? footer : ''}
  `
}
