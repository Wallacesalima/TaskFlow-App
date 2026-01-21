
document.addEventListener('DOMContentLoaded', () => {
    // let contador = 0 

    loadTasks()

    const form = document.getElementById('task-form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()

        const input = document.getElementById('input-add')
        // let index = 'task-' + contador
        const inputAdd = input.value.trim()
        if (inputAdd === '') return

        const li = createTaskElement(inputAdd)
        editTask(li)

        input.value = ''
        input.focus()

        attachTaskEvents(li)
        addTaskToDOM(li)
        saveTasks()
    })
})

function createTaskElement(data) {

    const li = document.createElement('li')
    li.classList.add('task-item')

    const label = document.createElement('label')
    label.classList.add('label-checkbox')
    // label.htmlFor = index

    const span = document.createElement('span')
    span.classList.add('span-item')

    li.appendChild(label)
    span.textContent = data

    const checkbox = document.createElement('input')

    // checkbox.id = index
    checkbox.type = 'checkbox';
    checkbox.name = 'input-checkbox'
    checkbox.classList.add('input-checkbox')


    label.appendChild(checkbox)
    li.appendChild(span)


    const button = document.createElement('button')
    button.type = 'button'
    button.ariaLabel = 'Deletar'
    button.classList.add('button-delete')

    const image = document.createElement('img')
    image.src = "assets/images/trash-2.svg"
    image.classList.add('image-trash')
    image.title = 'trash/lixeira/deletar'

    button.appendChild(image)

    li.appendChild(button)

    return li
}

function attachTaskEvents(li) {
    const checkbok = li.querySelector('.input-checkbox')
    const button = li.querySelector('.button-delete')

    checkbok.addEventListener('change', () => {
        saveTasks()
    })

    button.addEventListener('click', () => {
        button.parentElement.remove()
        saveTasks()
    })

}

function editTask(li) {
    const span = li.querySelector('.span-item')

    span.addEventListener('dblclick', () => {
        const textSpan = span.textContent
        const inputEdit = document.createElement('input')
        inputEdit.value = textSpan

        span.replaceWith(inputEdit)
        inputEdit.focus()

        const finishEdit = () => {
            if (inputEdit.value === '') return alert('Tarefa Vazia!!!')
            span.textContent = inputEdit.value
            inputEdit.replaceWith(span)
            saveTasks()
        }

        inputEdit.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') finishEdit()
        })

        inputEdit.addEventListener('blur', finishEdit)
    })
}

function addTaskToDOM(li) {
    const taskList = document.getElementById('task-list')
    taskList.appendChild(li)
}

function saveTasks() {
    const tasks = []

    document.querySelectorAll('.task-item').forEach(li => {
        const text = li.querySelector('.span-item').textContent
        const completed = li.querySelector('.input-checkbox').checked

        tasks.push({ text, completed })
    })

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function loadTasks() {
    const tasks = localStorage.getItem('tasks')
    const listTasks = JSON.parse(tasks) || []


    listTasks.forEach(task => {
        const text = task.text
        const status = task.completed


        const li = createTaskElement(text)
        attachTaskEvents(li)
        const checkbok = li.querySelector('.input-checkbox')
        checkbok.checked = status
        editTask(li)
        addTaskToDOM(li)
    })
}
