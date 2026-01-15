
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        createTask()
    })

})

function createTask() {
    const input = document.getElementById('input-add')
    const taskList = document.getElementById('task-list')

    const inputAdd = input.value.trim()
    if (inputAdd === '') return

    const li = document.createElement('li')
    li.classList.add('task-item')

    const label = document.createElement('label')
    label.classList.add('label-checkbox')

    const span = document.createElement('span')
    span.classList.add('span-item')

    li.appendChild(label)
    span.textContent = inputAdd
    li.appendChild(span)
    input.value = ''
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox';
    checkbox.name = 'input-checkbox'
    checkbox.classList.add('input-checkbox')

    label.appendChild(checkbox)


    const button = document.createElement('button')
    button.type = 'button'

    const image = document.createElement('img')
    image.src = "assets/images/trash-2.svg"
    image.classList.add('image-trash')

    button.appendChild(image)

    li.appendChild(button)

    taskList.appendChild(li)
}