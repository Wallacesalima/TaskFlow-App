// Task List App
// - Criação, edição e remoção de tarefas
// - Persistência via localStorage
// - Interações feitas apenas com JavaScript puro


// Inicializa a aplicação após o carregamento do DOM
// Responsável por carregar tarefas salvas e registrar eventos do formulário
document.addEventListener('DOMContentLoaded', () => {

    loadTasks()

    const form = document.getElementById('task-form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()

        const input = document.getElementById('input-add')
        const inputAdd = input.value.trim()
        if (inputAdd === '') return

        const li = createTaskElement(inputAdd)
        bindTaskEvents(li)

        input.value = ''
        input.focus()

        addTaskToDOM(li)
        saveTasks()
    })
})

// Cria o elemento <li> de uma tarefa
// Retorna o nó pronto para receber eventos e ser inserido no DOM
function createTaskElement(data) {

    const li = document.createElement('li')
    li.classList.add('task-item')

    const label = document.createElement('label')
    label.classList.add('label-checkbox')

    const span = document.createElement('span')
    span.classList.add('span-item')

    li.appendChild(label)
    span.textContent = data
    span.title = 'Duplo clique para editar'

    const checkbox = document.createElement('input')

    checkbox.type = 'checkbox';
    checkbox.name = 'input-checkbox'
    checkbox.classList.add('input-checkbox')


    label.appendChild(checkbox)
    li.appendChild(span)

    const button = document.createElement('button')
    button.type = 'button'
    button.ariaLabel = 'Deletar'
    button.classList.add('button-delete')

    const svgTrash = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>'

    button.innerHTML = svgTrash
    
    // svg.classList.add('image-trash')

    // const image = document.createElement('img')
    // image.src = "assets/images/trash-2.svg"
    // image.classList.add('image-trash')
    // image.title = 'trash/lixeira/deletar'

    // button.appendChild(svgTrash)

    li.appendChild(button)

    return li
}

function bindCompletionAndDeleteEvents(li) {
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

// Permite edição inline da tarefa (double click)
// Substitui o span por um input temporário
function editTask(li) {
    const span = li.querySelector('.span-item')

    span.addEventListener('dblclick', () => {
        const textSpan = span.textContent
        const inputEdit = document.createElement('input')
        inputEdit.classList.add('inputEdit')
        inputEdit.value = textSpan

        span.replaceWith(inputEdit)
        inputEdit.focus()

        // Finaliza edição ao pressionar Enter ou perder o foco
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

// Centraliza o vínculo de todos os comportamentos da tarefa
function bindTaskEvents(li) {
    bindCompletionAndDeleteEvents(li)
    editTask(li)
}


function addTaskToDOM(li) {
    const taskList = document.getElementById('task-list')
    taskList.appendChild(li)
}

// Salva o estado atual das tarefas no localStorage
// Armazena texto e status de conclusão
function saveTasks() {
    const tasks = []

    document.querySelectorAll('.task-item').forEach(li => {
        const text = li.querySelector('.span-item').textContent
        const completed = li.querySelector('.input-checkbox').checked

        tasks.push({ text, completed })
    })

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Reconstrói a lista de tarefas a partir do localStorage
// Mantém estado de conclusão e eventos
function loadTasks() {
    const tasks = localStorage.getItem('tasks')
    const listTasks = JSON.parse(tasks) || []


    listTasks.forEach(task => {
        const text = task.text
        const status = task.completed


        const li = createTaskElement(text)

        bindTaskEvents(li)

        const checkbok = li.querySelector('.input-checkbox')
        checkbok.checked = status

        addTaskToDOM(li)
    })
}
