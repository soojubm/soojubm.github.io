import footer from '/public/components/footer/footer.html'
import navbar from '/public/components/navbar/navbar.html'

import main from './components.html'
import '../components.css'

import '/public/stylesheets/shared.css'
import '/public/stylesheets/components/form.css'

document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('beforeend', navbar)
  document.body.insertAdjacentHTML('beforeend', main)
  document.body.insertAdjacentHTML('beforeend', footer)

  // TODO: 반복해서 올렸을 때 filelist의 누적 또는 리셋
  // TODO: 동일한 파일의 업로드
  // 삭제했을 때 fileList에서 삭제
  // fileInput.files는 쌓이지 않음.

  let fileList = {}

  const attachFile = () => {
    const fileInput = document.querySelector<HTMLInputElement>('.js-file-input')
    if (!fileInput) return

    fileInput.addEventListener('change', event => {
      renderAttachments(fileInput.files)

      fileList = { ...fileList, ...fileInput.files }

      console.log('fileList:', { ...fileList }, { ...fileInput.files })
    })
  }
  attachFile()

  function renderAttachments(files: any) {
    const attachmentList = document.querySelector<HTMLElement>('.js-file-attachment-list')
    const attachmentHelper = document.querySelector<HTMLElement>('.js-file-attachment-helper')
    if (!files || !attachmentList || !attachmentHelper) return

    attachmentHelper.style.display = files.length === 0 ? 'block' : 'none'

    Array.from(files).forEach((file: any) => {
      if (!validFileType(file)) return alert('파일타입 jpeg pjpeg png 중 하나가 아니야~')

      const fileTemplate = `
        <div style="width:100px">
          <figure>
            <img src=${window.URL.createObjectURL(file)} alt=${file.name}>
          </figure>
          <b">${file.name}</b>
          <small>${returnFileSize(file.size)}</small>
          <button class="js-remove-this">close</button>
        </div>
      `
      attachmentList.innerHTML += fileTemplate
    })
  }

  function validFileType(file) {
    const fileTypes = ['image/jpeg', 'image/gif', 'image/png']
    const isValid = fileTypes.includes(file.type)

    return isValid
  }

  function returnFileSize(size: number) {
    const isBytes = size < 1024
    const isKiloBytes = size >= 1024 && size < 1048576

    if (isBytes) return `${size}bytes`
    else if (isKiloBytes) return `${(size / 1024).toFixed(2)}KB`
    else return `${(size / 1048576).toFixed(2)}MB`
  }

  // fileSubmit.addEventListener('submit', (event) => {
  // 	event.preventDefault();
  // 	fileList.forEach(file => sendFile(file))
  // }

  // function validFileSize(file) {
  // 	attachedfiles = file.files;
  // 	if(attachedfiles.length === 0) return;

  // 	if(attachedfiles[0].size > 75 * 1024) {
  // 		fileInput.setCustomValidity('The selected file must not be larger than 75 kB');
  // 		return;
  // 	}
  // 	fileInput.setCustomValidity('');
  // }

  // function sendFile(file) {
  // 	const formData = new FormData();
  // 	const request = new XMLHttpRequest();

  // 	formData.set('file', file);
  // 	request.open('post', '');
  // 	request.send(formData);
  // }
})

// {
//   name: 'button',
//   role: action',
//   description: '',
//   aka: ['string', 'string'],
//   features: [],
//   bestPractices: [],
//   props: { name: '', size: ''}
//   relatedComponents: [],
//   useCases: [],
// }

// const upload = function(fileEle, backendUrl) {
//     return new Promise(function(resolve, reject) {
//         // Get the list of selected files
//         const files = fileEle.files;

//         // Create a new FormData
//         const formData = new FormData();

//         // Loop over the files
//         [].forEach.call(files, function(file) {
//             formData.append(fileEle.name, file, file.name);
//         });

//         // Create new Ajax request
//         const req = new XMLHttpRequest();
//         req.open('POST', backendUrl, true);

//         // Handle the events
//         req.onload = function() {
//             if (req.status >= 200 && req.status < 400) {
//                 resolve(req.responseText);
//             }
//         };
//         req.onerror = function() {
//             reject();
//         };

//         // Send it
//         req.send(formData);
//     });
// };
// <input type="file" id="upload" multiple />
// const fileEle = document.getElementById('upload');

// upload(fileEle, '/path/to/back-end').then(function(response) {
//     // `response` is what we got from the back-end
//     // We can parse it if the server returns a JSON
//     const data = JSON.parse(response);
//     ...
// });
