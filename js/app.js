const list = document.querySelector('.task-list')

const checkbox = document.createElement('input')
checkbox.type = 'checkbox';
checkbox.name = 'input-checkbox'
// checkbox.checked = true
checkbox.classList.add('input-checkbox')

const label = document.createElement('label')
label.classList.add('label-checkbox')


const image = document.createElement('img')
image.src = "assets/images/trash-2.svg" 
image.classList.add('image-trash')

const li = document.createElement('li')
li.textContent = 'teste'

li.classList.add('task-item')
const item = document.querySelector('.task-item')

if (checkbox.checked === true) {
    li.classList.add('input-checked')
}

list.append(label)
label.appendChild(checkbox)
list.append(li)
list.appendChild(image)

