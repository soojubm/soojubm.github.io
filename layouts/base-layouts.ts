import navbar from '/src/components/navbar/navbar.html'
import footer from '/src/components/footer/footer.html'

// 컴포넌트 페이지용 임시
import '/pages/components/components.css'
import '/src/stylesheets/shared.css'

export const renderLayout = (content: string) => {
  return `
    ${navbar}
    ${content}
  `
}
