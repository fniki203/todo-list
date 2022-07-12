//Selectors

const addBtn = document.querySelector('.add');
const todoList = document.querySelector('.todo-list');
const todoInput = document.querySelector('#new');
const clearAll = document.querySelector('.clear-all');
const listType =  document.querySelector('.list-type')


//Event Listeners

addBtn.addEventListener('click', toAdd);
todoList.addEventListener('click', delTodo);
clearAll.addEventListener('click', clrAll);
listType.addEventListener('click', showList);

//Functions

function toAdd(e) {
    e.preventDefault();
    if (todoInput.value === '') {
        var popup = document.getElementById("myPopup");
        popup.classList.toggle("show");
    }
    else{
        var popup = document.getElementById("myPopup");
        popup.classList.remove("show");

        const todoLi = document.createElement('li');
        const newTodo = document.createElement('div');
        newTodo.classList.add('item');
        todoLi.appendChild(newTodo);
    
        const completedBtn = document.createElement('button');
        completedBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="complete-btn bi bi-check-circle-fill pipa" viewBox="0 0 16 16"> <path class="complete-btn" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" /> </svg>';
        completedBtn.classList.add('btn-outside-part', 'check');
        newTodo.appendChild(completedBtn);

        const todoContent = document.createElement('input');
        todoContent.value = todoInput.value;
        todoContent.classList.add('item-content', 'outline-off');
        todoContent.setAttribute('maxlength', 30);
        todoContent.setAttribute('readonly', true);
        newTodo.appendChild(todoContent);

        const deleteBtn = document.createElement('div');
        deleteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="delete-btn bi bi-x-circle-fill delete-icon" viewBox="0 0 16 16"> <path class="delete-btn" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" /> </svg>';
        deleteBtn.classList.add('delete');
        newTodo.appendChild(deleteBtn);

        const editBtn = document.createElement('div');
        editBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="edit-btn bi bi-pencil-square edit-icon" viewBox="0 0 16 16"> <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" /> <path fill-rule="evenodd" class="edit-btn" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" /> </svg>';
        editBtn.classList.add('edit');
        newTodo.appendChild(editBtn);

        todoList.appendChild(todoLi);
        todoInput.value = '';
    }
}

function delTodo (e) {
    const item = e.target;
    if (item.classList[0] === "delete-btn") {
        const todo = e.target.parentElement.parentElement.parentElement;
        todo.remove();
    };
    if (item.classList[0] === "complete-btn") {
        const todo = e.target.parentElement.parentElement;
        todo.classList.toggle('strikethrough')
    }
    if (item.classList[0] === "btn-outside-part") {
        const todo = e.target.parentElement;
        todo.classList.toggle('strikethrough')
    }
    if (item.classList[0] === "edit-btn") {
        const todo = e.target.parentElement.previousElementSibling.previousElementSibling;
        todo.removeAttribute('readonly');
        todo.classList.remove('outline-off')
        todo.focus();
        todo.addEventListener('change', function () {
            todo.setAttribute('readonly', true);
            todo.classList.toggle('outline-off')  
        })
    }
    
}

function clrAll () {
    todoList.innerHTML = '';
}

function showList (e) {
    const listType = e.target;
    if (listType.id === 'completed') {
        const items = document.querySelectorAll('.item')
        for (item of items) {
            if (item.classList.contains('strikethrough')) {
            item.style.display = 'block';
            }
            else {
            item.style.display = 'none';
            }
        }
    }
    if (listType.id === 'active') {
        const items = document.querySelectorAll('.item')
        for (item of items) {
            if (!item.classList.contains('strikethrough')) {
                item.style.display = 'block';
            }
            else {
                item.style.display = 'none';
            }
        }
    }
    if (listType.id === 'all') {
        const items = document.querySelectorAll('.item');
        for (item of items) {
            item.style.display = 'block'
        }
    }
}