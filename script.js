window.addEventListener("load", () => {
    const ulTodo = document.querySelector("#ulTodo");
    const addTodo = document.querySelector("#buttonTodo");
    const inputTodo = document.querySelector("#inputTodo");

    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    if (todos) {
        todos.forEach((todo) => renderTodo(todo));
    }

    addTodo.addEventListener("click", (e) => {
        inputTodo.value === ""
            ? inputTodo.setAttribute(
                  "placeholder",
                  "You have to type something..."
              )
            : createTodo(inputTodo.value);
    });
    inputTodo.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            createTodo(inputTodo.value);
        }
    });

    function renderTodo(todo) {
        const newTodo = document.createElement("span");
        const doneBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");
        const todoListItem = document.createElement("li");

        todoListItem.innerText = todo.content;
        deleteBtn.innerText = "Delete";
        doneBtn.innerText = "Done";

        newTodo.append(todoListItem, doneBtn, deleteBtn);
        ulTodo.appendChild(newTodo);
        window.localStorage.setItem("todos", JSON.stringify(todos));
        inputTodo.value = "";

        doneBtn.addEventListener("click", (e) => {
            e.target.parentNode.firstChild.classList.toggle("doneToggle");
            updateLocalStorage(e.target.parentNode.firstChild.textContent);
        });

        deleteBtn.addEventListener("click", (e) => {
            e.target.parentNode.remove();
            deleteFromLocalStorage(e.target.parentNode.firstChild.textContent);
        });
    }

    function createTodo(text) {
        const todo = {
            content: `${text}`,
            state: false,
            timeID: Date.now(),
        };
        todos.push(todo);
        renderTodo(todo);
    }

    function deleteFromLocalStorage(todo) {
        let temp = JSON.parse(window.localStorage.getItem("todos", todos));
        temp = temp.filter((e) => e.content !== todo);
        window.localStorage.clear();
        window.localStorage.setItem("todos", JSON.stringify(temp));
    }

    function updateLocalStorage(todo) {
        let temp = JSON.parse(window.localStorage.getItem("todos", todos));
        temp.map((e) => {
            if (e.content === todo) e.state = !e.state;
        });
        window.localStorage.clear();
        window.localStorage.setItem("todos", JSON.stringify(temp));
    }
});
