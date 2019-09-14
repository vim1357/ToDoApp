
const inputElement = document.getElementById('input')
const ulElement = document.getElementById('list')
const actionPanel1 = document.getElementById('actionPanel1')
const actionPanel2 = document.getElementById('actionPanel2')

let todoList = []
actionPanel2.style.display = 'none'


inputElement.addEventListener('keydown', event => {
    if((event.key === 'Enter' || event.keyCode === 13) &&(inputElement.value)) {
        todoList.unshift({
            content: inputElement.value,
            done: false,
            selected: false
        })
        inputElement.value = ''
        saveToDo()
        upgradeView()
    }
})

function upgradeView  () {
    ulElement.innerHTML = ''

    // for (const todoItem of todoList) {
    for( let index = 0; index < todoList.length; index++) {
        
        const todoItem = todoList[index]
    
        const liElement = document.createElement('li')
        liElement.className = 'list-group-item'

        ulElement.append(liElement)

        const divElement = document.createElement('div')
        divElement.className = 'form-group form-check'
        liElement.append(divElement)

        const checkboxElement = document.createElement('input')
        divElement.append(checkboxElement)
        checkboxElement.type = 'checkbox'
        checkboxElement.className = 'form-check-input'
        checkboxElement.id = 'todoItem' + index
        checkboxElement.checked = todoItem.selected

        const labelElement = document.createElement('label')
        divElement.append(labelElement)
        labelElement.className = 'form-check-label'
        if(todoItem.done) {
            labelElement.className +=' todoDone'
        }
        labelElement.setAttribute('for', 'todoItem' + index)
        labelElement.innerText = todoItem.content

        if(!todoItem.done) {
            const buttonDoneElement = document.createElement('button')
            divElement.append(buttonDoneElement)
            buttonDoneElement.type = 'button'
            buttonDoneElement.className = 'btn btn-outline-success'
            buttonDoneElement.innerText = 'Press to complete'
            buttonDoneElement.style = 'float: right'

            buttonDoneElement.addEventListener('click', () => {
                todoItem.done = !todoItem.done
                saveToDo()
                upgradeView()
            })
        } 
        
        else {
            const buttonRemoveElement = document.createElement('button')
            divElement.append(buttonRemoveElement)
            buttonRemoveElement.type = 'button'
            buttonRemoveElement.className = 'btn btn-danger'
            buttonRemoveElement.innerText = 'Remove'
            buttonRemoveElement.style = 'float: right'

            buttonRemoveElement.addEventListener('click', () => {
                todoList = todoList.filter(currentTodoItem => currentTodoItem !==todoItem)
                saveToDo()
                upgradeView()
            })
        }

        checkboxElement.addEventListener('change', () => {
            todoItem.selected = checkboxElement.checked
            upgradeView()
        })
       
    }  
    
    const someSelected = todoList.some(todoItem => todoItem.selected)
    if(someSelected) {
        actionPanel1.style.display = 'none'
        actionPanel2.style.display = 'block'
    } 
    else {
        actionPanel1.style.display = 'flex'
        actionPanel2.style.display = 'none'
    }
}

const doneActionButton = document.getElementById('doneAction').addEventListener('click', () => {
    for (const todoItem of todoList) {
        if(todoItem.selected){
            todoItem.done = true
            todoItem.selected = false
        }
    }
    saveToDo()
    upgradeView()
})
const restoreActionButton = document.getElementById('restoreAction').addEventListener('click', () => {
    for (const todoItem of todoList) {
        if(todoItem.selected){
            todoItem.done = false
            todoItem.selected = false
        }
    }
    saveToDo()
    upgradeView()
})
const removeActionButton = document.getElementById('removeAction').addEventListener('click', () => {
    todoList = todoList.filter(todoItem => !todoItem.selected)
    saveToDo()
    upgradeView()
})

const selectAllButton = document.getElementById('test').addEventListener('click', () => {
    for (const todoItem of todoList) {
        todoItem.selected = true
        }
        saveToDo()
    upgradeView()
})

const addButton = document.getElementById('addToList').addEventListener('click', () => {
    {
        if(inputElement.value) {
        todoList.unshift({
            content: inputElement.value,
            done: false,
            selected: false
        })
        inputElement.value = ''
        saveToDo()
        upgradeView()
    }
}
})

//Хранение данных

function saveToDo() {
    var saved = JSON.stringify(todoList)
    localStorage.setItem("saved", saved)
}

function fromToDo() {
    var saved = localStorage.getItem("saved")
    todoList = JSON.parse(saved)
    if (!todoList) {
        todoList = []    
    } 
}

fromToDo()
upgradeView()