import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentReferenceItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'

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
    external: true,
  },
  {
    href: 'https://elements.ai-sdk.dev/components/attachments',
    label: 'AI SDK Elements - Attachments',
    external: true,
  },
  {
    href: 'https://seed-design.io/react/components/attachment-display-field',
    label: 'Seed Design - Attachment Display Field',
    external: true,
  },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'label', type: "string = '파일 업로드'" },
  { name: 'description', type: 'string', optional: true },
  { name: 'accept', type: 'string', optional: true },
  { name: 'multiple', type: 'boolean = false', optional: true },
  { name: 'capture', type: 'boolean = false', optional: true },
  { name: 'change', type: 'CustomEvent detail: files', kind: 'event' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Input - file',
    description:
      '자유 입력 대신 파일을 첨부받고, 첨부한 목록을 보여주며 개별로 제거합니다. 선택 상태는 uploader가 스스로 소유하고 바뀔 때 change로 알립니다.',
  },
  {
    heading: 'Feedback',
    description:
      '허용 형식과 용량은 description으로 미리 알리고, 선택 결과는 첨부 목록과 상태 텍스트로 전달합니다. 실패는 별도의 에러 메시지로 설명합니다.',
  },
]

const main = html`
  <mm-main>
    <mm-flex justify-content="between" align-items="start" gap="3">
      <mm-page-header
        heading="File Uploader"
        description="파일을 첨부하고 첨부한 목록을 관리하는 입력 컨트롤입니다. 첨부 버튼과 파일 목록을 한 단위로 묶어 허용 형식을 미리 알리고 파일마다 제거할 수 있게 하므로, 사용자는 무엇을 올렸는지 확인하며 제출 전에 첨부를 바로잡을 수 있습니다."
      ></mm-page-header>
      <mm-copy-page-button></mm-copy-page-button>
    </mm-flex>

    <mm-component-example>
      <mm-file-uploader
        description="Only .jpg and .png files. 500kb max file size."
        accept=".jpg,.png"
        multiple
      ></mm-file-uploader>
    </mm-component-example>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-guide .features=${componentFeatures}>
      <mm-text-list
        .texts=${[
          '미리보기가 의미 있는 이미지는 썸네일로, 그 외 파일은 유형과 크기로 표현합니다.',
          '여러 파일을 받는 맥락에서만 multiple을, 즉석 촬영이 필요한 맥락에서만 capture를 켭니다.',
          '이미지 업로드와 문서 업로드는 accept와 안내 문구로 구분해 기대를 좁힙니다.',
        ]}
      ></mm-text-list>
    </mm-component-guide>

    <mm-component-anatomy
      .parts=${[
        '첨부 버튼 — 파일 선택 대화상자를 여는 트리거(label).',
        '상태 텍스트 — 허용 조건(description)과 현재 선택 개수를 함께 전달합니다.',
        '첨부 목록 — 첨부한 파일을 유형·크기와 함께 보여주고 개별로 제거합니다.',
      ]}
      .code=${'<mm-file-uploader label="사진 업로드" accept=".jpg,.png" multiple></mm-file-uploader>'}
    >
      <mm-file-uploader label="사진 업로드" accept=".jpg,.png" multiple></mm-file-uploader>
    </mm-component-anatomy>

    <mm-component-section
      heading="AttachmentButton"
      description="숨긴 파일 입력을 감싼 트리거입니다. accept·multiple·capture로 선택 범위를 정하고, 고른 파일을 change로 올립니다."
    >
      <mm-attachment-button label="파일 선택" accept=".jpg,.png" multiple></mm-attachment-button>
    </mm-component-section>

    <mm-component-section
      heading="AttachmentItem"
      description="첨부한 파일 하나를 미리보기·이름·크기로 보여주고, 삭제 버튼으로 remove를 알립니다. 이미지가 아니면 유형에 맞는 대체 아이콘을 씁니다. progress(0–100)가 있는 동안은 업로드 중으로 보고, 크기 대신 진행률을 보여주며 삭제 버튼이 업로드 취소를 맡습니다. error가 있으면 실패 사유를 알리고, 썸네일 위의 재업로드 버튼으로 retry를 알립니다."
    >
      <mm-flex gap="2">
        <mm-attachment-item
          file-name="sample-photo.png"
          file-size="70.4 KB"
          type="image/png"
        ></mm-attachment-item>
        <mm-attachment-item
          file-name="sample-document.pdf"
          file-size="46.9 KB"
          type="application/pdf"
        ></mm-attachment-item>
        <mm-attachment-item
          file-name="sample-video.mp4"
          file-size="1.1 MB"
          type="video/mp4"
          progress="45"
        ></mm-attachment-item>
        <mm-attachment-item
          file-name="sample-report.pdf"
          file-size="2.4 MB"
          type="application/pdf"
          error="업로드 실패"
        ></mm-attachment-item>
      </mm-flex>
    </mm-component-section>

    <mm-component-section heading="Drag and Drop Area" description="TODO">
      <mm-paragraph color="light">
        파일을 끌어다 놓아 첨부하는 영역. dragenter·dragover·drop을 uploader가 받아 첨부 버튼과 같은
        경로로 파일을 올리고, 드래그 중 상태를 시각적으로 알린다.
      </mm-paragraph>
    </mm-component-section>

    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-references .items=${componentReferences}></mm-component-references>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
