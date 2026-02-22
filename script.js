let data = [];
let index = 1;

let todoInput = document.querySelector(".todo-input");
let ul = document.querySelector("ul")
let progressContainer = document.querySelector(".progress-clear-container")
let todoContainer = document.querySelector(".todos-container")
let mainTodoContainer = document.querySelector(".main-todo-container")

document.addEventListener("DOMContentLoaded", (event) => {
    progressContainer.insertAdjacentHTML("beforeend", `<p class="list-stats">No item </p>`)
})


function render(todo) {
    ul.insertAdjacentHTML("beforeend",
        `<li data-id = "${todo.id}">
          <div class="radio-label-container">
            <label>
            <input type="checkbox" class="checkbox" ${todo.complete ? "checked" : ""}>
            <span class="${todo.complete ? "completed" : ""}">${todo.data}</span>
            </label>
          </div>
         <button class="del-btn"><img src="./images/icon-cross.svg" alt=""></button>
        </li>`);
    progressContainer.innerHTML = `<p class="list-stats"> ${data.length} item left </p> <button class="clear-btn">Clear Completed </button>`
}


function deleteTodo(id, li) {
    data = data.filter((item) => item.id != id);
    console.log(data);
    li.remove();
    progressContainer.innerHTML = data.length > 0
        ? `<p class="list-stats">${data.length} item left</p> <button class="clear-btn">Clear Completed </button>`
        : `<p class="list-stats">No item</p>`;

}

function addTodo(input) {
    if (!input.value.trim()) return
    let todo = { id: index, data: input.value.trim(), complete: false }
    index++;
    data.push(todo)
    render(todo)
    // console.log(data);

    input.value = ""
}

function completed(event) {
    if (event.target.classList.contains("checkbox")) {
        let span = event.target.closest("label").querySelector("span");
        span.classList.toggle("completed");
        let id = event.target.closest("li").dataset.id;

        if (event.target.checked) {
            // move from data to completedData
            data = data.map((item) => {
                if (item.id == id) {
                    return { ...item, complete: true }
                }
                return item;
            })

        } else {
            data = data.map((item) => {
                if (item.id == id) {
                    return { ...item, complete: false }
                }
                return item;
            })
        }

        progressContainer.innerHTML = data.length > 0

            ? `<p class="list-stats">${data.length} item left</p> <button class="clear-btn">Clear Completed </button>`
            : `<p class="list-stats">No item</p>`;
    }
}

function clearComplete() {
    ul.innerHTML = ""
    data.forEach((item) => {
        if (!item.complete) {
            render(item)
        }
    })

}

function showComplete() {
    ul.innerHTML = ""
    data.forEach((item) => {
        if (item.complete) {
            render(item)
        }
    })
}

function showActive() {
    ul.innerHTML = ""
    data.forEach((item) => {
        if (!item.complete) {
            render(item)
        }
    })
}

function showAll() {
    ul.innerHTML = "";
    data.forEach((item) => {
        render(item)
    })
}


todoInput.addEventListener("keydown", (event) => {
    if (event.code === "Enter") {
        addTodo(todoInput)
    }

})

ul.addEventListener("change", (event) => {
    completed(event)

})

ul.addEventListener("click", (event) => {
    let btn = event.target.closest("button")
    if (btn) {
        let li = btn.closest("li");
        let id = li.dataset.id;
        deleteTodo(id, li)
    }
})



mainTodoContainer.addEventListener("click", (event) => {
    let btn = event.target.closest("button");
    if (!btn) return;
    switch (btn.className) {
        case "show-all":
            showAll()
            break;
        case "show-active":
            showActive()
            break;
        case "show-comp":
            showComplete()
            break;
        case "clear-btn":
            clearComplete()
            break;
    }
})
