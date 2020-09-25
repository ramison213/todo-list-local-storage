const $newTaskField = document.querySelector('#new-task-field');
const $hideBtn = document.querySelector('#hide-btn');
const $addBtn = document.querySelector('#add-btn');
const $inputWarning = document.querySelector('.input-warning');
const $list = document.querySelector('#list-task');

let tasksList = [];

if (localStorage.tasks) {
    tasksList = JSON.parse(localStorage.tasks);
    renderTasks(tasksList);
}

// button  "Add"

$addBtn.addEventListener('click', () => {
	if ($newTaskField.value.trim() === '') {
        $inputWarning.style.display = 'block';
        $newTaskField.value = '';
        $newTaskField.focus();
		return;
    }

    let newTask = {
        id: `f${(+new Date).toString(16)}`,
        text: $newTaskField.value,
        isDone: false
    }

    $inputWarning.style.display = 'none';
    tasksList.push(newTask);
    $newTaskField.value = '';
    $newTaskField.focus();

    renderTasks(tasksList);
    saveToLocal();
})

// button "Done", "Remove"

$list.addEventListener('click', event => {
    const elem = event.target;

	if (elem.classList.contains('rem-btn')) {
        let elemId = elem.closest('.task').id;
        let taskIndex = tasksList.findIndex(task => task.id === elemId);
        tasksList.splice(taskIndex, 1);

        renderTasks(tasksList);
        saveToLocal();
    }

	if (elem.classList.contains('done-btn')) {
        let elemId = elem.closest('.task').id;
        let taskIndex = tasksList.findIndex(task => task.id === elemId);
        tasksList[taskIndex].isDone = !tasksList[taskIndex].isDone;

        renderTasks(tasksList);
        saveToLocal();
	}
})

$hideBtn.addEventListener('click', () => {
    $hideBtn.classList.toggle('hide-btn-active');
    $list.classList.toggle('done-item-hidden');
})

function saveToLocal() {
    localStorage.tasks = JSON.stringify(tasksList);
}

function renderTasks(tasks) {
    $list.innerHTML = '';
    tasks.forEach((task, i) => {
        $list.innerHTML += `
        <li class="task ${ task.isDone ? 'done' : '' }" id="${ task.id }">
            <i>${ task.text }</i>
            <span class="done-btn"></span>
            <span class="rem-btn"></span>
        </li>
        `;
    })
}
