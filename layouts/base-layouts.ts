import '../src/components/navbar/navbar'
import '../src/components/footer/footer'

// 컴포넌트 페이지용 임시
import '../src/stylesheets/shared.css'

export const renderLayout = (
  content: string,
  options: { footer?: boolean; closeSidebar?: boolean } = {},
) => {
  return `
    <mm-navbar${options.closeSidebar ? ' sidebar-collapsed' : ''}></mm-navbar>
    ${content}
    ${options.footer ? '<mm-footer></mm-footer>' : ''}
  `
}
