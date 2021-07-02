
// let todoItems =  [];

function renderTodo(text) {
  const item = { id: todoItems.length + 1, text: text }

  const li = document.createElement('li')
  const todoDelete = document.createElement('button')
  // todoDelete.classList.add('text-button');
  todoDelete.setAttribute('type', 'button')
  todoDelete.innerHTML = '<i class="icon-close" />'

  const todoCheck = document.createElement('input')
  const todoCheckLabel = document.createElement('label')
  todoCheck.setAttribute('type', 'checkbox')
  todoCheck.setAttribute('id', item.id)
  todoCheckLabel.innerText = `${item.id} :: ${text}`
  todoCheckLabel.setAttribute('for', item.id)

  li.appendChild(todoDelete)
  li.appendChild(todoCheck)
  li.appendChild(todoCheckLabel)

  todoList.appendChild(li)
  todoItems.push(item)
  // 체크박스 상태 저장안됨

  localStorage.setItem('todoItems', JSON.stringify(todoItems))
  todoListInput.value = ''

  todoDelete.addEventListener('click', deleteTodo)

  function deleteTodo() {
    event.target.parentNode.remove()
    const deletedItems = todoItems.filter(item => {
      return parseInt(event.target.nextElementSibling.id) !== item.id
    })
    todoItems = deletedItems

    localStorage.setItem('todoItems', JSON.stringify(todoItems))
  }
}

todoClear.addEventListener('click', () => {
  todoList.innerHTML = ''
  localStorage.removeItem('todoItems')
})

// todo.addEventListener('submit', event => {
// 	event.preventDefault();
// 	if(todoListInput.value.length < 1) return alert('입력해주세용');
// 	renderTodo(todoListInput.value);
// 	// todoList.innerHTML += `<li><input id=ab type=checkbox><label for=ab>${todoListInput.value}</label></li>`;
// });

// const getLocalStorage = localStorage.getItem('todoListItems');
// if(getLocalStorage){
// 	const abc = JSON.parse(getLocalStorage);
// 	abc.forEach(function(item){
// 		renderTodo(item.text);
// 	});
// }

/*
document.addEventListener('click', (event) => {

	const item = event.target.closest('.js-todo input');
	if(item) {
		if(item.checked) {
			item.parentNode.className = 'completed';
			item.checked = true;
		} else {
			item.parentNode.className = '';
			item.checked = false;
		}
		localStorage.setItem('todoListItems1', todoList.innerHTML);
	}
});
*/
