import '../src/components/navbar/navbar'
import '../src/components/footer/footer'
import './fixed-bottom'
import './fixed-top'

// 컴포넌트 페이지용 임시
import '../src/stylesheets/shared.css'

export const renderLayout = (
  content: string,
  options: { footer?: boolean; closeSidebar?: boolean; navbar?: boolean } = {},
) => {
  const navbar = options.navbar ?? true

  return `
    ${navbar ? `<mm-navbar${options.closeSidebar ? ' sidebar-collapsed' : ''}></mm-navbar>` : ''}
    ${content}
    ${options.footer ? '<mm-footer></mm-footer>' : ''}
  `
}
