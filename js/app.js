
document.addEventListener('DOMContentLoaded', () => {
    let contador = 0
    const form = document.getElementById('task-form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        createTask(contador)
        contador++
    })

})

function createTask(contador) {
    const input = document.getElementById('input-add')
    const taskList = document.getElementById('task-list')
    let index = 'task-' + contador

    const inputAdd = input.value.trim()
    if (inputAdd === '') return

    const li = document.createElement('li')
    li.classList.add('task-item')

    const label = document.createElement('label')
    label.classList.add('label-checkbox')
    label.htmlFor = index

    const span = document.createElement('span')
    span.classList.add('span-item')

    li.appendChild(label)
    span.textContent = inputAdd
    input.value = ''

    const checkbox = document.createElement('input')

    checkbox.addEventListener('change', () => {
        saveTasks()
    })

    checkbox.id = index
    checkbox.type = 'checkbox';
    checkbox.name = 'input-checkbox'
    checkbox.classList.add('input-checkbox')

    label.appendChild(checkbox)
    label.appendChild(span)


    const button = document.createElement('button')
    button.type = 'button'
    button.ariaLabel = 'Deletar'

    const image = document.createElement('img')
    image.src = "assets/images/trash-2.svg"
    image.classList.add('image-trash')
    image.title = 'trash/lixeira/deletar'

    button.appendChild(image)

    li.appendChild(button)

    taskList.appendChild(li)
    saveTasks()

    button.addEventListener('click', () => {
        const li = button.parentElement
        li.remove()
        saveTasks()
    })
}

function saveTasks() {
    const tasks = []

    document.querySelectorAll('.task-item').forEach(li => {
        const text = li.querySelector('.span-item').textContent
        const completed = li.querySelector('.input-checkbox').checked

        tasks.push({text, completed})
    })

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function loadTasks() {
    localStorage.getItem('tasks', JSON.parse())
}