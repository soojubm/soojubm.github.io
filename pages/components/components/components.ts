import footer from '/public/components/footer/footer.html'
import navbar from '/public/components/navbar/navbar.html'

import main from './components.html'
import '../components.css'

import '/public/stylesheets/shared.css'
// import '/public/stylesheets/components/pagination.css'
import '/public/stylesheets/components/form.css'

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('main')!.innerHTML = navbar + main + footer

  // TODO: 여러번 반복해서 올렸을 때 filelist 누적되는지?
  // TODO: 동일한 파일을 업로드 했을 때 체크, 삭제했을 때 fileList에서 삭제, fileInput.files는 쌓이지 않음.
  const attachFile = () => {
    const fileInput = document.querySelector<HTMLInputElement>('.js-file-input')
    if (!fileInput) return
    // const fileSubmit = document.querySelector('.js-file-submit');
    fileInput.addEventListener('change', () => attach(fileInput))
  }

  attachFile()

  function attach(fileInput: HTMLInputElement) {
    const { files } = fileInput
    const attachmentList = document.querySelector<HTMLElement>('.js-file-attachment-list')
    const attachmentHelper = document.querySelector<HTMLElement>('.js-file-attachment-helper')
    if (!files || !attachmentList || !attachmentHelper) return

    attachmentHelper.style.display = files.length !== 0 ? 'none' : 'block'

    Array.from(files).forEach(file => {
      if (!validFileType(file)) return alert('파일타입 jpeg pjpeg png 중 하나가 아니야~')

      const fileTemplate = `
			<div class="file-attachment-item">
				<figure class="file-attachment-item-image"><img src=${window.URL.createObjectURL(file)} alt=${
        file.name
      }></figure>
				<b class="file-attachment-item-name">${file.name}</b>
				<small class="file-attachment-item-size" >${returnFileSize(file.size)}</small>
				<button class="file-attachment-item-delete js-remove-this"><span class="material-symbols-outlined">close</span></button>
			</div>`

      attachmentList.innerHTML += fileTemplate
    })
  }

  function validFileType(file) {
    const fileTypes = ['image/jpeg', 'image/gif', 'image/png']
    const isValid = fileTypes.indexOf(file.type) > -1

    return isValid
  }

  function returnFileSize(size) {
    const isBytes = size < 1024
    const isKiloBytes = size >= 1024 && size < 1048576

    if (isBytes) return `${size}bytes`
    else if (isKiloBytes) return `${(size / 1024).toFixed(2)}KB`
    else return `${(size / 1048576).toFixed(2)}MB`
  }

  // fileSubmit.addEventListener('submit', (event) => {
  // 	event.preventDefault();
  // 	fileList.forEach(file => {
  // 		sendFile(file);
  // 	});
  // });

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
