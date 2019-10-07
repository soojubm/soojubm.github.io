import { autoExpand } from './utils';

export const attachFile = () => {
	document.addEventListener('change', event => {
		const target = event.target;

		if (!target.closest('.js-file-input')) return;
		const fileInput = document.querySelector('.js-file-input');
		const fileSubmit = document.querySelector('.js-file-submit');
		const attachmentList = document.querySelector('.js-file-attachment-list');
		const attachmentHelper = document.querySelector('.js-file-attachment-helper');
		let attachedfiles;
		let fileList = [];

		// TODO: 여러번 반복해서 올렸을 때 filelist 누적되는지?
		// TODO: 동일한 파일을 업로드 했을 때 체크
		// TODO: 삭제했을 때 fileList에서 삭제
		// fileInput.files는 쌓이지 않음.

		const validFileType = file => {
			const fileTypes = ['image/jpeg', 'image/gif', 'image/png'];
			console.log(fileTypes.indexOf(file.type));

			if (fileTypes.indexOf(file.type) > -1) return true;
		};
		const returnFileSize = size => {
			if (size < 1024) return size + 'bytes';
			else if (size >= 1024 && size < 1048576) return (size / 1024).toFixed(2) + 'KB';
			else return (size / 1048576).toFixed(2) + 'MB';
		};

		attachedfiles = target.files;
		// attachedfiles = fileInput.files;
		console.log('attachedfiles', attachedfiles);

		if (attachedfiles.length === 0) {
			attachmentHelper.style.display = 'block';
		} else {
			attachmentHelper.style.display = 'none';
			for (var i = 0; i < attachedfiles.length; i++) {
				console.log('attachedfiles[i]', attachedfiles[i]);

				// 190428 test filelist array

				if (validFileType(attachedfiles[i])) {
					const template = `
            <figure class="file-attachment-item">
              <img class="file-attachment-item-image" src=${window.URL.createObjectURL(attachedfiles[i])} alt="">
              <b class="file-attachment-item-name" href="#">${attachedfiles[i].name}</b>
              <small class="file-attachment-item-size" >${returnFileSize(attachedfiles[i].size)}</small>
              <button class="file-attachment-item-delete js-remove-this" type="button"><i class="icon-x"></i></button>
            </figure>`;
					attachmentList.innerHTML = template + attachmentList.innerHTML;
					//attachmentList.appendChild(template);
				} else {
					alert('파일타입 jpeg pjpeg png 중 하나가 아니야~');
				}
			}
		}
		/*
    document.addEventListener('click', (event) => {
      if(event.target.closest('.js-remove-this')){ // 함수로
        event.target.closest('.js-remove-this').parentNode.remove();
        if(attachedfiles.length === 1) attachmentHelper.style.display = 'block';
      }
    }, true);
    */
		/*
    // 190428 file ajax
    fileSubmit.addEventListener('submit', (event) => {
      event.preventDefault();
      fileList.forEach(function(file){
        sendFile(file);
        console.log(fileList);
        console.log(attachedfiles);
      });
    });
    sendFile = function(file) {
      var formData = new FormData();
      console.log('formData', formData);
      var request = new XMLHttpRequest();

      formData.set('file', file);
      request.open('post', '');
      request.send(formData);
    };
    */
	});
};



document.addEventListener('input', event => {
	// tagName과 nodeName은 텍스트 노드를 각각 undefined와 #text 반환한다.
	const target = event.target;
	target.nodeName.toLowerCase() === 'textarea' && autoExpand(target);

	const byteElement = document.querySelector('.textfield-byte b');

	var string = undefined;
	for(var j=0; j<10000; j++) {
		string += 'This is 아무의미없는 문자열';
	}
	var stringByteLength = 0;
	if(target.nodeName.toLowerCase() === 'textarea') {
		string = target.value;
		stringByteLength = string.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g,'$&$1$2').length;
		if(target.value.length > 30 || target.value.length > 45) {
			console.log('30byte제한');
			target.value = target.value.slice(0, target.value.length);
		}
		byteElement.innerHTML = stringByteLength;
	}
});


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

	const increaseElement = document.querySelector('.js-number-input');

	document.addEventListener('keydown', event => {
		if (!event.target.closest('.js-number-input')) return;
		const eventKeyCode = event.keyCode;
		eventKeyCode >= 48 || eventKeyCode <= 57 || event.preventDefault();
		eventKeyCode === 69 && event.preventDefault();
		eventKeyCode === 189 && event.preventDefault();
		eventKeyCode === 187 && event.preventDefault();
		eventKeyCode === 190 && event.preventDefault();
		//event.target.value.length === 0 && event.keyCode === 48 && event.preventDefault();

		document.addEventListener('keyup', () => {
			// click 이벤트에서도 함수로 만들어서 적용
			const isFirstPlacedZero = /(^0+)/.test(event.target.value);
			const isMaximum = Number(event.target.value) >= 300;
			const isLength = event.target.value.length > 3;

			if (isFirstPlacedZero) event.target.value = '0';
			if (isLength) event.target.value = event.target.value.slice(0, 3);
			if (isMaximum) event.target.value = '300';
		});
	});

	document.addEventListener('click', event => {
		const target = event.target;
		const minValue = 0;
		const maxValue = 10;
		let targetInput;
		if (target.closest('.js-variation-decrement')) {
			targetInput = target.parentNode.querySelector('.js-variation-input');
			if (targetInput.value <= minValue) {
				target.classList.add('is-disabled');
				return;
			}
			--targetInput.value;
			// TODO: target 클래스 토글이 안 되므니다
			console.log('target', target);
		}
		if (target.closest('.js-variation-increment')) {
			targetInput = target.parentNode.querySelector('.js-variation-input');
			if (targetInput.value >= maxValue) {
				target.classList.add('is-disabled');
				return;
			}
			++targetInput.value;

			// targetInput.value < maxValue + 1 && target.classList.remove('is-disabled');
			/*
			let targetInputValue = parseInt(eventTargetInput.value);
			targetInputValue > minValue && eventTargetInput.value--;
			targetInputValue === minValue + 1 && eventTarget.classList.add('is-disabled');
			targetInputValue < maxValue + 1 && eventTargetIncrement.classList.remove('is-disabled');
			*/
			/*
			const eventTargetParentElement = eventTarget.parentNode;
			const eventTargetInput = eventTargetParentElement.querySelector('.js-variation-input');
			const eventTargetDecrement = eventTargetParentElement.querySelector('.js-variation-decrement');
			const eventTargetIncrement = eventTargetParentElement.querySelector('.js-variation-increment');
			let targetInputValue = parseInt(eventTargetInput.value);
			targetInputValue < maxValue ? eventTargetInput.value++ : targetInputValue;
			targetInputValue === maxValue - 1 && eventTarget.classList.add('is-disabled');
			targetInputValue > minValue - 1 ? eventTargetDecrement.classList.remove('is-disabled') : targetInputValue;
			*/
		}
	});
};


export const checkAllcheckbox = ({checkAllElement, checkElements}) => {
	const checkAll = document.querySelector(checkAllElement);
	const checkItems = document.querySelectorAll(checkElements);
	let checkedCount = 0;

	if(!checkAll || !checkItems) return;

	checkItems.forEach(checkItem => {
		checkItem.addEventListener('change', () => {
			checkItem.checked ? checkedCount++ : checkedCount--;
			checkedCount === checkItems.length ? checkAll.checked = true : checkAll.checked = false;

			checkAll.indeterminate = checkedCount > 0 && checkedCount < checkItems.length;
			console.log(checkAll.indeterminate);
		});
	});

	checkAll.addEventListener('change', () => {
		checkItems.forEach(checkItem => {
			checkAll.checked ? checkItem.checked = true : checkItem.checked = false;
		});
	});
};

// var otherCheckbox = document.querySelector('input[value="other"]');
// var otherText = document.querySelector('input[id="otherValue"]');
// otherText.style.visibility = 'hidden';

// otherCheckbox.onchange = function() {
// 	if (otherCheckbox.checked) {
// 		otherText.style.visibility = 'visible';
// 		otherText.value = '';
// 	} else {
// 		otherText.style.visibility = 'hidden';
// 	}
// };