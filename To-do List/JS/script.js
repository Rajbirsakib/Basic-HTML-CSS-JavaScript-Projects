
let todos=[];

// dom element

const todoList= document.getElementById("todoList");
const todoForm = document.getElementById("todoForm");
const countTodo= document.getElementById("countTodo");

let myStatus = "all";

todoForm.addEventListener("submit", function(e){
    e.preventDefault();
    const isEmpty= e.target.todo.value;
    if(isEmpty===""){
        window.alert("Must me give one character.");
        return;
    }

    addTodo(e);

    displayTodo(todoList);
    e.target.reset();
})

function displayTodo(domElement){
    let html="";
    const filterTodos = filterByTodoStatus(myStatus);
    if(filterTodos.length>0){
        filterTodos.forEach((todo) =>{
            html +=`
            <div class="shadow p-4 m-2 flex gap-3 cursor-pointer hover:shadow-xl relative group/item">
                            <div>
                                <input 
                                onclick="changeStatus(${todo.id})"
                                type="checkbox"
                                ${todo.status == "complete" && "checked=true"} "click remove"
                                class="w-4 h-4 accent-teal-500 rounded-lg cursor-pointer">
                            </div>
                            <div class="px-4">${todo.id}</div>
                            
                            <div class="px-4 mx-4">
                                <span id="todoText-${todo.id}" ondblclick="editTodo(${todo.id})">${todo.text}</span>
                                <input 
                                    id="editInput-${todo.id}" 
                                    class="hidden w-4/10 bg-zinc-100 rounded-lg outline-2 outline-offset-1 focus:outline-teal-400 caret-teal-500" 
                                    type="text" 
                                    value="${todo.text}" 
                                    onblur="updateTodoText(${todo.id})"
                                    onkeydown="handleEnterKey(event, ${todo.id})">
                            </div>
                            <div class="flex gap-7 text-xl absolute right-10 invisible group-hover/item:visible">
                                <i onclick="editTodo(${todo.id})" class="fa-solid fa-pen-to-square"></i>
                                <i onclick="removeTodo(${todo.id})" class="fa-solid fa-trash"></i>
                            </div>
                        </div>
            `;
        });
        domElement.innerHTML = html;
    }
    else{
        domElement.innerHTML = "<p>No Todo found...</p>";
    }

    countTodo.innerText = `Total ToDo = ${filterTodos.length}`;
}

function addTodo(e){
    const text= e.target.todo.value;
    const todo = {
        id: idGenerate(todos),
        text: text,
        status: "incomplete",
    };

    todos.push(todo);
}

function idGenerate(todoArray){
    let initailId = 0;
    todoArray.forEach(todo =>{
        if(todo.id > initailId){
            initailId= todo.id;
        }
    });

    return initailId + 1;
}

function removeTodo(id){
    const remainingTodo = todos.filter(todo=> todo.id != id);
    todos = remainingTodo;
    displayTodo(todoList);
}

function changeStatus(id){
    const updatedTodo= todos.map(todo=>{
        if(todo.id == id){
            return{
                ...todo,
                status: todo.status== "complete" ? "incomplete": "complete"
            };
        }
        return todo;

        // if(!todo.id == id){
        //     return todo;
        // }
        // else{
        //     return{
        //         ...todo,
        //         status: todo.status== "complete" ? "incomplete": "complete"
        //     };
        // }
    });

    todos= updatedTodo;
}

function sortByTodoStatus(statusText, activeElement){
    const preActiveElement = document.querySelector("#activeBar .active");
    myStatus= statusText;
    preActiveElement.classList.remove("active");

    activeElement.classList.add("active");
    displayTodo(todoList);
}

function filterByTodoStatus(status){
    if(status=="all") return todos;
    if(status=="complete"){
        return todos.filter((todo) => todo.status == "complete")
    }
    if(status=="incomplete"){
        return todos.filter((todo) => todo.status == "incomplete")
    }
}

function editTodo(id) {
    const textElement = document.getElementById(`todoText-${id}`);
    const inputElement = document.getElementById(`editInput-${id}`);
    textElement.classList.add("hidden");
    inputElement.classList.remove("hidden");
    inputElement.focus();
}

function updateTodoText(id) {
    const inputElement = document.getElementById(`editInput-${id}`);
    const newText = inputElement.value.trim();

    if (newText) {
        todos = todos.map((todo) =>
            todo.id === id ? { ...todo, text: newText } : todo
        );
    }

    displayTodo(todoList);
}

function handleEnterKey(event, id) {
    if (event.key === "Enter") {
        updateTodoText(id);
    }
}

function clearAllTodos() {
    todos = [];
    displayTodo(todoList);
}

displayTodo(todoList);