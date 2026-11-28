import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentReferenceItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'

import soojubmImage from '@/images/soojubm.png'
import { componentPropsOf } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'button.html', label: 'Button' },
  { href: 'tag.html', label: 'Tag' },
  { href: 'input.html', label: 'Input' },
]

const componentReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file',
    label: 'MDN - input type="file"',
  },
  {
    href: 'https://elements.ai-sdk.dev/components/attachments',
    label: 'AI SDK Elements - Attachments',
  },
  {
    href: 'https://seed-design.io/react/components/attachment-display-field',
    label: 'Seed Design - Attachment Display Field',
  },
]

const componentProps: ComponentPropItemData[] = [
  ...componentPropsOf('fff-file-uploader'),
  { name: 'change', type: 'CustomEvent detail: files', kind: 'event' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Input - file',
    description: '자유 입력 대신 파일을 첨부받고, 첨부한 목록을 보여주며 개별로 제거합니다.',
  },
  {
    heading: 'Feedback',
    description:
      '허용 형식은 accept, 용량은 max-size로 미리 알리고, 선택 결과는 첨부 목록과 상태 텍스트로 전달합니다. 실패는 별도의 에러 메시지로 설명합니다.',
  },
]

const exampleCode = `<fff-file-uploader accept=".jpg,.png" max-size="500kb" multiple></fff-file-uploader>`

const main = html`
  <fff-main>
    <fff-page-header
      heading="File Uploader"
      description="파일을 첨부하고 첨부한 목록을 관리하는 입력 컨트롤입니다. 첨부 버튼과 파일 목록을 한 단위로 묶어 허용 형식을 미리 알리고 파일마다 제거할 수 있게 하므로, 사용자는 무엇을 올렸는지 확인하며 제출 전에 첨부를 바로잡을 수 있습니다."
    ></fff-page-header>

    <fff-component-example>
      <fff-file-uploader accept=".jpg,.png" max-size="500kb" multiple></fff-file-uploader>
    </fff-component-example>
    <fff-component-code .code=${exampleCode}></fff-component-code>

    <fff-component-props .props=${componentProps}></fff-component-props>

    <fff-component-feature-list .features=${componentFeatures}></fff-component-feature-list>

    <fff-component-guide>
      <fff-content-section
        heading-level="3"
        heading="이미지 업로드와 문서 업로드는 어떻게 다른가요?"
        description="TODO"
      ></fff-content-section>
    </fff-component-guide>

    <fff-component-section
      heading="AttachmentItemList"
      description="미리보기가 의미 있는 이미지는 썸네일로, 그 외 파일은 유형과 크기로 표현합니다."
    >
      <fff-attachment-item-list heading="첨부한 파일">
        <fff-attachment-item
          file-name="sample-photo.png"
          file-size="70.4 KB"
          preview-url=${soojubmImage}
          type="image/png"
        ></fff-attachment-item>
        <fff-attachment-item
          file-name="sample-document.pdf"
          file-size="46.9 KB"
          type="application/pdf"
        ></fff-attachment-item>
        <fff-attachment-item
          file-name="sample-video.mp4"
          file-size="1.1 MB"
          type="video/mp4"
          progress="45"
        ></fff-attachment-item>
        <fff-attachment-item
          file-name="sample-report.pdf"
          file-size="2.4 MB"
          type="application/pdf"
          error="업로드 실패"
        ></fff-attachment-item>
      </fff-attachment-item-list>
    </fff-component-section>

    <fff-component-section heading="Drag and Drop Area" description="TODO">
      <fff-paragraph color="light">
        파일을 끌어다 놓아 첨부하는 영역입니다. 드래그하는 동안에는 놓을 수 있다는 상태를 보여
        줍니다.
      </fff-paragraph>
    </fff-component-section>

    <fff-component-related .items=${relatedComponents}></fff-component-related>

    <fff-component-references .items=${componentReferences}></fff-component-references>

    <fff-component-pager></fff-component-pager>
  </fff-main>
`

renderPage(main)
