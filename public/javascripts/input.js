import { autoExpand } from './utils';


// TODO: 여러번 반복해서 올렸을 때 filelist 누적되는지?
// TODO: 동일한 파일을 업로드 했을 때 체크, 삭제했을 때 fileList에서 삭제, fileInput.files는 쌓이지 않음.
export const attachFile = () => {
	const fileInput = document.querySelector('.js-file-input');
	if(!fileInput) return;
	
	const fileSubmit = document.querySelector('.js-file-submit');
	const attachmentList = document.querySelector('.js-file-attachment-list');
	const attachmentHelper = document.querySelector('.js-file-attachment-helper');
	let attachedfiles;
	let fileTemplate;

	fileInput.addEventListener('change', attach);

	function attach() {
		attachedfiles = fileInput.files;
		const hasFile = attachedfiles.length === 0;
		attachmentHelper.style.display = hasFile ? 'block' : 'none';
		console.log('attachedfiles', attachedfiles);
		
		Array.from(attachedfiles).forEach(file => {
			if(!validFileType(file)) return alert('파일타입 jpeg pjpeg png 중 하나가 아니야~');
			fileTemplate = `
				<a class="file-attachment-item" href="">
					<figure class="file-attachment-item-image"><img src=${window.URL.createObjectURL(file)} alt=${file.name}></figure>
					<b class="file-attachment-item-name" href="#">${file.name}</b>
					<small class="file-attachment-item-size" >${returnFileSize(file.size)}</small>
					<button class="file-attachment-item-delete js-remove-this" type="button"><i class="icon-x"></i></button>
				</a>`;
			attachmentList.innerHTML += fileTemplate;
			// attachmentList.innerHTML = fileTemplate + attachmentList.innerHTML;
			// attachmentList.append(fileTemplate);
		});
	}

	// fileSubmit.addEventListener('submit', (event) => {
	// 	event.preventDefault();
	// 	fileList.forEach(file => {
	// 		sendFile(file);
	// 	});
	// });
	function validFileType(file) {
		const fileTypes = ['image/jpeg', 'image/gif', 'image/png'];
		// const isValid = fileTypes.includes(file.type);
		if(fileTypes.indexOf(file.type) > -1) return true; // includes
	}
	function validFileSize(file) {}
	function returnFileSize(size) {
		const isBytes = size < 1024;
		const isKiloBytes = size >= 1024 && size < 1048576;
		if(isBytes) return size + 'bytes';
		else if(isKiloBytes) return (size / 1024).toFixed(2) + 'KB';
		else return (size / 1048576).toFixed(2) + 'MB';
	}
	function sendFile(file) {
		const formData = new FormData();
		const request = new XMLHttpRequest();

		formData.set('file', file);
		request.open('post', '');
		request.send(formData);
	}
};


// document.addEventListener('click', event => {
// 	const target = event.target;
// 	const minValue = 0;
// 	const maxValue = 10;
// 	let targetInput;
// 	if (target.closest('.js-variation-decrement')) {
// 		targetInput = target.parentNode.querySelector('.js-variation-input');
// 		if (targetInput.value <= minValue) {
// 			target.classList.add('is-disabled');
// 			return;
// 		}
// 		--targetInput.value;
// 		// TODO: target 클래스 토글이 안 되므니다
// 		console.log('target', target);
// 	}
// 	if (target.closest('.js-variation-increment')) {
// 		targetInput = target.parentNode.querySelector('.js-variation-input');
// 		if (targetInput.value >= maxValue) {
// 			target.classList.add('is-disabled');
// 			return;
// 		}
// 		++targetInput.value;

// 		// targetInput.value < maxValue + 1 && target.classList.remove('is-disabled');
// 		/*
// 		let targetInputValue = parseInt(eventTargetInput.value);
// 		targetInputValue > minValue && eventTargetInput.value--;
// 		targetInputValue === minValue + 1 && eventTarget.classList.add('is-disabled');
// 		targetInputValue < maxValue + 1 && eventTargetIncrement.classList.remove('is-disabled');
// 		*/
// 		/*
// 		const eventTargetParentElement = eventTarget.parentNode;
// 		const eventTargetInput = eventTargetParentElement.querySelector('.js-variation-input');
// 		const eventTargetDecrement = eventTargetParentElement.querySelector('.js-variation-decrement');
// 		const eventTargetIncrement = eventTargetParentElement.querySelector('.js-variation-increment');
// 		let targetInputValue = parseInt(eventTargetInput.value);
// 		targetInputValue < maxValue ? eventTargetInput.value++ : targetInputValue;
// 		targetInputValue === maxValue - 1 && eventTarget.classList.add('is-disabled');
// 		targetInputValue > minValue - 1 ? eventTargetDecrement.classList.remove('is-disabled') : targetInputValue;
// 		*/
// 	}
// });


export const inputVariation = () => {
	const variation = document.querySelector('.js-variation');
	const input = variation.querySelector('.js-variation-input');
	const decrement = variation.querySelector('.js-variation-decrement');
	const increment = variation.querySelector('.js-variation-increment');

	let value = input.value;
	const MIN_VALUE = 0;
	const MAX_VALUE = 10;
	let	isMinimun;
	let isMaximum;
	// const	isMinimun = Number(value) <= MIN_VALUE;
	// const isMaximum = Number(value) >= MAX_VALUE;

	// if(isMinimun) setDisableDecrement();
	// if(isMaximum) setDisableIecrement();

	decrement.addEventListener('click', event => {
		isMinimun = Number(value) <= MIN_VALUE;
		isMaximum = Number(value) >= MAX_VALUE;
		if(isMinimun) {
			decrement.classList.add('is-disabled');
			return;
		}
		if(!isMaximum) {
			increment.classList.remove('is-disabled');
		}
		
		value = Number(value) - 1;
	});
	increment.addEventListener('click', event => {
		isMinimun = Number(value) <= MIN_VALUE;
		isMaximum = Number(value) >= MAX_VALUE;
		console.log(isMinimun, isMaximum, value);
		if(isMaximum) {
			increment.classList.add('is-disabled');
			return;
		}
		if(!isMinimun) {
			decrement.classList.remove('is-disabled');
		}

		value = Number(value) + 1;
	});

	function setDisableDecrement() {
		decrement.classList.add('is-disabled');
		return;
	}
	function setDisableIecrement() {
		decrement.classList.add('is-disabled');
		return;
	}
};

export const inputTextarea = () => {
};

// tagName과 nodeName은 텍스트 노드를 각각 undefined와 #text 반환한다.

const BYTE_MAXIMUM = 30;
document.addEventListener('input', event => {
	const target = event.target;
	const byteElement = document.querySelector('.textfield-byte b');

	const isTextarea = target.nodeName.toLowerCase() === 'textarea';
	if(!isTextarea) return;

	let stringByteLength = 0;

	autoExpand(target);

	const string = target.value;
	const isMaximum = string.length > BYTE_MAXIMUM;

	// 한글 3BYTE
	stringByteLength = string.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g,'$&$1$2').length;
	byteElement.innerText = stringByteLength;

	if(isMaximum) target.parentNode.classList.add('is-invalid');

	// string = string.slice(0, string.length);

});

function setStringBytes() {}

export const inputNumber = () => {
	// document.addEventListener('keydown', (event) => {
	// 	console.log('keydown: ', event.target.value);
	// 	console.log('keydown - keycode: ', event.keyCode);
	// });
	// document.addEventListener('keypress', (event) => {
	// 	console.log('keypress: ', event.target.value);
	// 	console.log('keypress - keycode: ', event.keyCode);
	// });
	// document.addEventListener('keyup', (event) => {
	// 	console.log('keyup: ', event.target.value);
	// 	console.log('keyup - keycode: ', event.keyCode);
	// });
	// document.addEventListener('change', (event) => {
	// 	console.log('change: ', event.target.value);
	// 	console.log('change - keycode: ', event.keyCode);
	// });
	// document.addEventListener('input', (event) => {
	// 	console.log('input: ', event.target.value);
	// 	console.log('input - keycode: ', event.keyCode);
	// });


	document.addEventListener('keydown', event => {
		const { target } = event;
		const inNumberInput = target.closest('.js-number-input');
		if (!inNumberInput) return;

		setInputOnlyNumbers();
		document.addEventListener('keyup', setLimitNumber);

		function setInputOnlyNumbers() {
			const keyCode = event.keyCode;
			// todo 정규 표현식으로
			keyCode >= 48 || keyCode <= 57 || event.preventDefault();
			keyCode === 69 && event.preventDefault();
			keyCode === 189 && event.preventDefault();
			keyCode === 187 && event.preventDefault();
			keyCode === 190 && event.preventDefault();
			// target.value.length === 0 && keyCode === 48 && event.preventDefault();
		}
		function setLimitNumber() {
			const MAXIMUM = 300;
			const MINIMUN = 0;
			const isFirstPlacedZero = /(^0+)/.test(target.value);
			const isMaximum = Number(target.value) >= MAXIMUM;
			const isLength = event.target.value.length > MINIMUN;

			if(isFirstPlacedZero) event.target.value = MINIMUN;
			if(isLength) event.target.value = event.target.value.slice(0, 3);
			if(isMaximum) event.target.value = MAXIMUM;
		}
	});

	
	
};

export const checkAllcheckbox = ({checkAllElement, checkElements}) => {
	const checkAll = document.querySelector(checkAllElement);
	const checkItems = document.querySelectorAll(checkElements);
	if(!checkAll || !checkItems) return;

	checkAll.addEventListener('change', setCheckAll);
	checkItems.forEach(checkItem => checkItem.addEventListener('change', setCheckEach));
	// document.addEventListener('DOMContentLoaded', setCheckEach);

	function setCheckEach() {
		const check = Array.from(checkItems);
		const isCheckedEvery = check.every(checkItem => checkItem.checked);
		const isCheckedSome = check.some(checkItem => checkItem.checked);

		checkAll.checked = isCheckedEvery;
		checkAll.indeterminate = isCheckedSome && !isCheckedEvery;
		checkAll.dataset.indeterminate = isCheckedSome && !isCheckedEvery;
	}
	
	function setCheckAll() {
		checkItems.forEach(checkItem => {
			checkItem.checked = checkAll.checked;
			checkAll.indeterminate = false;
			checkAll.dataset.indeterminate = false;
		});
	}
};




// function checkFileSize() {
//   var FS = document.getElementById("FS");
//   var files = FS.files;
//   if (files.length === 0) return;

//   // If there is (at least) one file selected
//      if (files[0].size > 75 * 1024) { // Check the constraint
//        FS.setCustomValidity("The selected file must not be larger than 75 kB");
//        return;
//      }
//   // No custom constraint violation
//   FS.setCustomValidity("");
// }