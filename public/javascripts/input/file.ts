// TODO: 여러번 반복해서 올렸을 때 filelist 누적되는지?
// TODO: 동일한 파일을 업로드 했을 때 체크, 삭제했을 때 fileList에서 삭제, fileInput.files는 쌓이지 않음.
const attachFile = () => {
  const fileInput = document.querySelector<HTMLInputElement>('.js-file-input')
  if (!fileInput) return
  // const fileSubmit = document.querySelector('.js-file-submit');
  fileInput.addEventListener('change', () => attach(fileInput))
}

function attach(fileInput: HTMLInputElement) {
  const { files } = fileInput
  const attachmentList = document.querySelector<HTMLElement>('.js-file-attachment-list')
  const attachmentHelper = document.querySelector<HTMLElement>('.js-file-attachment-helper')
  if (!files || !attachmentList || !attachmentHelper) return

  attachmentHelper.style.display = files.length !== 0 ? 'none' : 'block'

  Array.from(files).forEach(file => {
    if (!validFileType(file)) return alert('파일타입 jpeg pjpeg png 중 하나가 아니야~')

    const fileTemplate = `
			<a class="file-attachment-item" href="">
				<figure class="file-attachment-item-image"><img src=${window.URL.createObjectURL(file)} alt=${file.name}></figure>
				<b class="file-attachment-item-name" href="#">${file.name}</b>
				<small class="file-attachment-item-size" >${returnFileSize(file.size)}</small>
				<button class="file-attachment-item-delete js-remove-this"><i class="icon-x"></i></button>
			</a>`

    attachmentList.innerHTML += fileTemplate
    // attachmentList.append(fileTemplate);
  })
}

function validFileType(file) {
  const fileTypes = ['image/jpeg', 'image/gif', 'image/png']
  const isValid = fileTypes.indexOf(file.type) > -1
  // const isValid = fileTypes.includes(file.type);

  if (isValid) return true
}

function returnFileSize(size) {
  const isBytes = size < 1024
  const isKiloBytes = size >= 1024 && size < 1048576

  if (isBytes) return `${size}bytes`
  else if (isKiloBytes) return `${(size / 1024).toFixed(2)}KB`
  else return `${(size / 1048576).toFixed(2)}MB`
}

export default attachFile

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
